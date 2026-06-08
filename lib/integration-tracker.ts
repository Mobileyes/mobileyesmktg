/**
 * INTEGRATION TRACKER
 * 
 * Tracks the lifecycle of each campaign integration from brief → delivery → payment.
 * Adapted for live video/streaming talent model:
 * - Service day rates (per-stream-hour billing)
 * - Fabulate pipeline campaign tracking
 * - Kick/Twitch/YouTube Live specific state management
 * 
 * This is the source of truth for "where is each integration right now?"
 * Powers the admin dashboard, payment triggers, and client reporting.
 * 
 * Integration States:
 * BRIEF_RECEIVED → TALENT_MATCHED → RATE_NEGOTIATED → ACCEPTED →
 * BRIEF_SENT → SCHEDULED → LIVE → DELIVERED → VERIFIED → APPROVED → PAID
 */

import type { PlatformType } from './platforms'

// ─── TYPES ────────────────────────────────────────────

export type IntegrationState =
  | 'BRIEF_RECEIVED'
  | 'TALENT_MATCHED'
  | 'RATE_NEGOTIATED'
  | 'ACCEPTED'
  | 'BRIEF_SENT'
  | 'SCHEDULED'
  | 'LIVE'
  | 'DELIVERED'
  | 'VERIFIED'
  | 'APPROVED'
  | 'PAID'
  | 'CANCELLED'
  | 'DISPUTED'

export type BillingModel = 'PER_STREAM_HOUR' | 'PER_VIDEO' | 'SERVICE_DAY' | 'FLAT_FEE' | 'HYBRID'

export interface Integration {
  id: string
  campaignId: string
  campaignCreatorId: string
  creatorId: string
  creatorHandle: string
  platform: PlatformType

  // State
  state: IntegrationState
  stateHistory: StateTransition[]

  // Campaign details
  brandName: string
  campaignTitle: string
  source: 'FABULATE' | 'DIRECT' | 'INBOUND_EMAIL' | 'OTHER'

  // Billing
  billingModel: BillingModel
  agreedRate: number // AUD
  rateBasis: string // 'per hour', 'per video', 'per day'
  estimatedHours: number | null // for per-hour billing
  actualHours: number | null // logged after stream
  totalFee: number | null // calculated after delivery
  commissionPct: number // default 20
  commissionAmount: number | null
  talentPayout: number | null

  // Scheduling
  scheduledDate: string | null
  scheduledStartTime: string | null
  scheduledDuration: number | null // minutes

  // Delivery
  contentUrl: string | null
  deliveredAt: string | null
  streamStartedAt: string | null
  streamEndedAt: string | null
  actualDurationMinutes: number | null

  // Verification
  verificationId: string | null
  verifiedAt: string | null
  approvedAt: string | null

  // Payment
  paymentDueAt: string | null
  paidAt: string | null
  paymentId: string | null

  // Metadata
  createdAt: string
  updatedAt: string
}

export interface StateTransition {
  from: IntegrationState
  to: IntegrationState
  timestamp: string
  triggeredBy: 'SYSTEM' | 'JOEL' | 'TALENT' | 'BRAND'
  notes: string | null
}

// ─── STATE MACHINE ────────────────────────────────────

const VALID_TRANSITIONS: Record<IntegrationState, IntegrationState[]> = {
  BRIEF_RECEIVED: ['TALENT_MATCHED', 'CANCELLED'],
  TALENT_MATCHED: ['RATE_NEGOTIATED', 'CANCELLED'],
  RATE_NEGOTIATED: ['ACCEPTED', 'CANCELLED'],
  ACCEPTED: ['BRIEF_SENT', 'CANCELLED'],
  BRIEF_SENT: ['SCHEDULED', 'LIVE', 'DELIVERED', 'CANCELLED'],
  SCHEDULED: ['LIVE', 'DELIVERED', 'CANCELLED'],
  LIVE: ['DELIVERED'],
  DELIVERED: ['VERIFIED', 'DISPUTED'],
  VERIFIED: ['APPROVED', 'DISPUTED'],
  APPROVED: ['PAID'],
  PAID: [],
  CANCELLED: [],
  DISPUTED: ['VERIFIED', 'CANCELLED'],
}

/**
 * Transition an integration to a new state.
 * Validates the transition is allowed and records history.
 */
export function transitionState(
  integration: Integration,
  newState: IntegrationState,
  triggeredBy: StateTransition['triggeredBy'],
  notes?: string
): Integration {
  const allowedTransitions = VALID_TRANSITIONS[integration.state]

  if (!allowedTransitions.includes(newState)) {
    throw new Error(
      `Invalid state transition: ${integration.state} → ${newState}. Allowed: ${allowedTransitions.join(', ')}`
    )
  }

  const transition: StateTransition = {
    from: integration.state,
    to: newState,
    timestamp: new Date().toISOString(),
    triggeredBy,
    notes: notes ?? null,
  }

  const updated: Integration = {
    ...integration,
    state: newState,
    stateHistory: [...integration.stateHistory, transition],
    updatedAt: new Date().toISOString(),
  }

  // Apply state-specific side effects
  switch (newState) {
    case 'LIVE':
      updated.streamStartedAt = updated.streamStartedAt ?? new Date().toISOString()
      break
    case 'DELIVERED':
      updated.deliveredAt = new Date().toISOString()
      if (updated.streamStartedAt && !updated.streamEndedAt) {
        updated.streamEndedAt = new Date().toISOString()
      }
      // Calculate actual duration and fee for per-hour billing
      if (updated.billingModel === 'PER_STREAM_HOUR' && updated.streamStartedAt && updated.streamEndedAt) {
        const durationMs = new Date(updated.streamEndedAt).getTime() - new Date(updated.streamStartedAt).getTime()
        updated.actualDurationMinutes = Math.round(durationMs / 60000)
        updated.actualHours = Math.round((durationMs / 3600000) * 10) / 10
        updated.totalFee = Math.round(updated.agreedRate * updated.actualHours * 100) / 100
        updated.commissionAmount = Math.round(updated.totalFee * (updated.commissionPct / 100) * 100) / 100
        updated.talentPayout = updated.totalFee - updated.commissionAmount
      }
      break
    case 'APPROVED':
      updated.approvedAt = new Date().toISOString()
      // 4 business day payment clock starts
      updated.paymentDueAt = calculatePaymentDueDate(new Date()).toISOString()
      // Calculate final fee if not already set
      if (!updated.totalFee) {
        updated.totalFee = updated.agreedRate // flat fee or per-video
        updated.commissionAmount = Math.round(updated.totalFee * (updated.commissionPct / 100) * 100) / 100
        updated.talentPayout = updated.totalFee - updated.commissionAmount
      }
      break
    case 'PAID':
      updated.paidAt = new Date().toISOString()
      break
  }

  return updated
}

// ─── BILLING CALCULATIONS ─────────────────────────────

/**
 * Calculate the total fee for a service day rate integration.
 * Service day = 6-8 hours of streaming/content.
 */
export function calculateServiceDayFee(params: {
  dayRate: number
  days: number
  overtimeHours?: number
  overtimeRate?: number // defaults to dayRate / 8 * 1.5
}): {
  baseFee: number
  overtimeFee: number
  totalFee: number
  commission: number
  talentPayout: number
} {
  const baseFee = params.dayRate * params.days
  const hourlyRate = params.overtimeRate ?? (params.dayRate / 8) * 1.5
  const overtimeFee = (params.overtimeHours ?? 0) * hourlyRate
  const totalFee = baseFee + overtimeFee
  const commission = Math.round(totalFee * 0.2 * 100) / 100
  const talentPayout = totalFee - commission

  return { baseFee, overtimeFee, totalFee, commission, talentPayout }
}

/**
 * Calculate the total fee for a per-stream-hour integration.
 * Based on actual stream duration detected by the monitoring system.
 */
export function calculateStreamHourFee(params: {
  hourlyRate: number
  actualMinutes: number
  minimumHours?: number // guaranteed minimum (e.g., 2 hours)
}): {
  actualHours: number
  billedHours: number
  totalFee: number
  commission: number
  talentPayout: number
} {
  const actualHours = Math.round((params.actualMinutes / 60) * 10) / 10
  const billedHours = Math.max(actualHours, params.minimumHours ?? 0)
  const totalFee = Math.round(params.hourlyRate * billedHours * 100) / 100
  const commission = Math.round(totalFee * 0.2 * 100) / 100
  const talentPayout = totalFee - commission

  return { actualHours, billedHours, totalFee, commission, talentPayout }
}

/**
 * Calculate fee for a hybrid campaign (stream + VOD deliverables).
 */
export function calculateHybridFee(params: {
  streamRate: number
  streamHours: number
  videoRate: number
  videoCount: number
  bonuses?: { name: string; amount: number }[]
}): {
  streamFee: number
  videoFee: number
  bonusFee: number
  totalFee: number
  commission: number
  talentPayout: number
} {
  const streamFee = params.streamRate * params.streamHours
  const videoFee = params.videoRate * params.videoCount
  const bonusFee = (params.bonuses ?? []).reduce((sum, b) => sum + b.amount, 0)
  const totalFee = streamFee + videoFee + bonusFee
  const commission = Math.round(totalFee * 0.2 * 100) / 100
  const talentPayout = totalFee - commission

  return { streamFee, videoFee, bonusFee, totalFee, commission, talentPayout }
}

// ─── FABULATE PIPELINE TRACKING ───────────────────────

/**
 * Create a new integration from a Fabulate pipeline campaign.
 * Fabulate briefs come through email → get auto-detected → create integration record.
 */
export function createFabulateIntegration(params: {
  campaignId: string
  campaignCreatorId: string
  creatorId: string
  creatorHandle: string
  platform: PlatformType
  brandName: string
  campaignTitle: string
  billingModel: BillingModel
  agreedRate: number
  rateBasis: string
  estimatedHours?: number
  scheduledDate?: string
}): Integration {
  const now = new Date().toISOString()

  return {
    id: `int_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    campaignId: params.campaignId,
    campaignCreatorId: params.campaignCreatorId,
    creatorId: params.creatorId,
    creatorHandle: params.creatorHandle,
    platform: params.platform,
    state: 'BRIEF_RECEIVED',
    stateHistory: [{
      from: 'BRIEF_RECEIVED' as IntegrationState,
      to: 'BRIEF_RECEIVED' as IntegrationState,
      timestamp: now,
      triggeredBy: 'SYSTEM',
      notes: 'Created from Fabulate pipeline',
    }],
    brandName: params.brandName,
    campaignTitle: params.campaignTitle,
    source: 'FABULATE',
    billingModel: params.billingModel,
    agreedRate: params.agreedRate,
    rateBasis: params.rateBasis,
    estimatedHours: params.estimatedHours ?? null,
    actualHours: null,
    totalFee: null,
    commissionPct: 20,
    commissionAmount: null,
    talentPayout: null,
    scheduledDate: params.scheduledDate ?? null,
    scheduledStartTime: null,
    scheduledDuration: null,
    contentUrl: null,
    deliveredAt: null,
    streamStartedAt: null,
    streamEndedAt: null,
    actualDurationMinutes: null,
    verificationId: null,
    verifiedAt: null,
    approvedAt: null,
    paymentDueAt: null,
    paidAt: null,
    paymentId: null,
    createdAt: now,
    updatedAt: now,
  }
}

// ─── STREAM-SPECIFIC TRACKING ─────────────────────────

/**
 * Handle stream going live — update integration state.
 * Called by stream-monitor when it detects the creator is live.
 */
export function handleStreamLive(
  integration: Integration,
  streamUrl: string
): Integration {
  const updated = transitionState(integration, 'LIVE', 'SYSTEM', 'Stream detected as live')
  updated.contentUrl = streamUrl
  updated.streamStartedAt = new Date().toISOString()
  return updated
}

/**
 * Handle stream ending — update integration state and calculate fee.
 * Called by stream-monitor when it detects the stream has ended.
 */
export function handleStreamEnded(
  integration: Integration,
  endedAt?: string
): Integration {
  const updated = transitionState(integration, 'DELIVERED', 'SYSTEM', 'Stream ended — delivered')
  updated.streamEndedAt = endedAt ?? new Date().toISOString()

  // Recalculate duration and fee
  if (updated.streamStartedAt && updated.streamEndedAt) {
    const durationMs = new Date(updated.streamEndedAt).getTime() - new Date(updated.streamStartedAt).getTime()
    updated.actualDurationMinutes = Math.round(durationMs / 60000)
    updated.actualHours = Math.round((durationMs / 3600000) * 10) / 10

    if (updated.billingModel === 'PER_STREAM_HOUR') {
      const billedHours = Math.max(updated.actualHours, 1) // minimum 1 hour
      updated.totalFee = Math.round(updated.agreedRate * billedHours * 100) / 100
      updated.commissionAmount = Math.round(updated.totalFee * (updated.commissionPct / 100) * 100) / 100
      updated.talentPayout = updated.totalFee - updated.commissionAmount
    } else if (updated.billingModel === 'SERVICE_DAY') {
      // Service day: full day rate regardless of duration (within 6-8hr range)
      const days = Math.ceil(updated.actualHours / 8)
      updated.totalFee = updated.agreedRate * days
      updated.commissionAmount = Math.round(updated.totalFee * (updated.commissionPct / 100) * 100) / 100
      updated.talentPayout = updated.totalFee - updated.commissionAmount
    }
  }

  return updated
}

/**
 * Handle verification completion — link to verification record.
 */
export function handleVerificationComplete(
  integration: Integration,
  verificationId: string
): Integration {
  const updated = transitionState(integration, 'VERIFIED', 'SYSTEM', 'Auto-verified by system')
  updated.verificationId = verificationId
  updated.verifiedAt = new Date().toISOString()
  return updated
}

// ─── HELPERS ──────────────────────────────────────────

/**
 * Calculate payment due date (4 business days from approval).
 * Skips weekends (Saturday/Sunday).
 */
function calculatePaymentDueDate(fromDate: Date): Date {
  const due = new Date(fromDate)
  let businessDays = 0

  while (businessDays < 4) {
    due.setDate(due.getDate() + 1)
    const day = due.getDay()
    if (day !== 0 && day !== 6) {
      // Not Sunday (0) or Saturday (6)
      businessDays++
    }
  }

  return due
}

/**
 * Get a human-readable summary of an integration's current state.
 */
export function getIntegrationSummary(integration: Integration): string {
  switch (integration.state) {
    case 'BRIEF_RECEIVED':
      return `Brief received from ${integration.source}. Awaiting talent match.`
    case 'TALENT_MATCHED':
      return `Matched to ${integration.creatorHandle}. Rate negotiation in progress.`
    case 'RATE_NEGOTIATED':
      return `Rate agreed: $${integration.agreedRate} ${integration.rateBasis}. Awaiting acceptance.`
    case 'ACCEPTED':
      return `${integration.creatorHandle} accepted. Sending brief.`
    case 'BRIEF_SENT':
      return `Brief sent to ${integration.creatorHandle}. Awaiting content.`
    case 'SCHEDULED':
      return `Scheduled for ${integration.scheduledDate ?? 'TBD'}.`
    case 'LIVE':
      return `🔴 LIVE NOW — ${integration.creatorHandle} streaming.`
    case 'DELIVERED':
      return `Content delivered. ${integration.actualHours ? `${integration.actualHours}hrs streamed.` : ''} Awaiting verification.`
    case 'VERIFIED':
      return `Tech-verified ✓. Awaiting Joel's approval.`
    case 'APPROVED':
      return `Approved. Payment due ${integration.paymentDueAt ? new Date(integration.paymentDueAt).toLocaleDateString() : 'TBD'}.`
    case 'PAID':
      return `✓ Complete. Paid $${integration.talentPayout} to ${integration.creatorHandle}.`
    case 'CANCELLED':
      return `Cancelled.`
    case 'DISPUTED':
      return `⚠️ Disputed — manual review required.`
    default:
      return integration.state
  }
}
