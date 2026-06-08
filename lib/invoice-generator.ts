/**
 * INVOICE GENERATOR
 * 
 * Generates branded invoices for Mobileyes campaigns.
 * Adapted for live video/streaming talent model:
 * - Per-stream-hour invoicing (rate × actual hours from stream monitor)
 * - Service day rate invoicing
 * - Hybrid campaign invoicing (stream + VOD package)
 * - Fabulate pipeline invoicing (pass-through or marked up)
 * - Automatic commission calculation (20%)
 * 
 * Supports:
 * - Brand invoices (what we charge the client)
 * - Creator payment summaries (what we pay the talent)
 * - Tax invoice format (GST-compliant for Australian entities)
 * 
 * Integrates with:
 * - @react-pdf/renderer for PDF generation
 * - Resend for email delivery
 * - Firestore for storage
 */

import { createInvoice } from './db/invoices'
import { createPayment } from './db/payments'
import type { Campaign } from './db/types'
import type { Integration, BillingModel, IntegrationState } from './integration-tracker'

// ─── TYPES ────────────────────────────────────────────

export interface InvoiceLineItem {
  description: string
  platform: string
  creatorHandle: string
  quantity: number
  unit: string // 'hours', 'videos', 'days', 'streams'
  unitRate: number
  amount: number
  notes?: string
}

export interface GeneratedInvoice {
  // Header
  invoiceNumber: string // MBL-INV-XXXXX
  invoiceDate: string
  dueDate: string
  entity: 'Mobileyes Pty Ltd'
  abn: string

  // Client
  billTo: {
    name: string
    email: string
    company?: string
    address?: string
  }

  // Campaign reference
  campaignRef: string // MBL-CAMP-XXXXX
  campaignTitle: string

  // Line items
  lineItems: InvoiceLineItem[]

  // Totals
  subtotal: number
  gstAmount: number // 10% GST for Australian entities
  totalAmount: number
  currency: string

  // Payment
  paymentTerms: string
  bankDetails: {
    bankName: string
    accountName: string
    bsb: string
    accountNumber: string
  } | null

  // Status
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE'
}

export interface CreatorPaymentSummary {
  creatorHandle: string
  creatorName: string
  platform: string
  campaignRef: string
  campaignTitle: string
  brandName: string

  // Billing breakdown
  billingModel: BillingModel
  rate: number
  rateBasis: string
  quantity: number // hours, days, videos
  grossFee: number
  commissionPct: number
  commissionAmount: number
  netPayout: number

  // Timeline
  deliveredAt: string | null
  verifiedAt: string | null
  approvedAt: string | null
  paymentDueAt: string | null

  // Verification proof
  verificationProof: {
    contentUrl: string | null
    screenshotUrl: string | null
    transcriptExcerpt: string | null
    streamDuration: string | null
  }
}

// ─── BRAND INVOICE GENERATION ─────────────────────────

/**
 * Generate a brand invoice for a campaign.
 * Calculates line items from all creator integrations.
 */
export async function generateBrandInvoice(params: {
  campaign: Campaign
  integrations: Integration[]
  includeGst: boolean
}): Promise<GeneratedInvoice> {
  const { campaign, integrations, includeGst } = params

  // Build line items from integrations
  const lineItems: InvoiceLineItem[] = integrations
    .filter((i) => i.state === 'APPROVED' || i.state === 'PAID')
    .map((integration) => buildLineItem(integration))

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const gstAmount = includeGst ? Math.round(subtotal * 0.1 * 100) / 100 : 0
  const totalAmount = subtotal + gstAmount

  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 14) // 14-day payment terms for brands

  const invoice: GeneratedInvoice = {
    invoiceNumber: '', // Will be set by createInvoice
    invoiceDate: new Date().toISOString(),
    dueDate: dueDate.toISOString(),
    entity: 'Mobileyes Pty Ltd',
    abn: process.env.MOBILEYES_ABN ?? '[ABN]',
    billTo: {
      name: campaign.clientName,
      email: campaign.clientEmail,
      company: campaign.clientName,
    },
    campaignRef: campaign.mblId,
    campaignTitle: campaign.title,
    lineItems,
    subtotal,
    gstAmount,
    totalAmount,
    currency: 'AUD',
    paymentTerms: 'NET 14 — Payment due within 14 days of invoice date.',
    bankDetails: {
      bankName: process.env.BANK_NAME ?? '[BANK]',
      accountName: 'Mobileyes Pty Ltd',
      bsb: process.env.BANK_BSB ?? '[BSB]',
      accountNumber: process.env.BANK_ACCOUNT ?? '[ACCOUNT]',
    },
    status: 'DRAFT',
  }

  // Save to database
  const dbInvoice = await createInvoice({
    campaignId: campaign.id,
    invoiceTo: campaign.clientName,
    invoiceEmail: campaign.clientEmail,
    amount: totalAmount,
    currency: 'AUD',
  })

  invoice.invoiceNumber = dbInvoice.mblId

  return invoice
}

/**
 * Build a single line item from an integration record.
 */
function buildLineItem(integration: Integration): InvoiceLineItem {
  switch (integration.billingModel) {
    case 'PER_STREAM_HOUR': {
      const hours = integration.actualHours ?? integration.estimatedHours ?? 1
      return {
        description: `Live stream integration — ${integration.creatorHandle}`,
        platform: integration.platform,
        creatorHandle: integration.creatorHandle,
        quantity: hours,
        unit: 'hours',
        unitRate: integration.agreedRate,
        amount: Math.round(integration.agreedRate * hours * 100) / 100,
        notes: integration.actualDurationMinutes
          ? `Actual duration: ${integration.actualDurationMinutes} minutes`
          : undefined,
      }
    }

    case 'SERVICE_DAY': {
      const days = integration.actualHours
        ? Math.ceil(integration.actualHours / 8)
        : 1
      return {
        description: `Service day — ${integration.creatorHandle} (${integration.platform} stream)`,
        platform: integration.platform,
        creatorHandle: integration.creatorHandle,
        quantity: days,
        unit: 'days',
        unitRate: integration.agreedRate,
        amount: integration.agreedRate * days,
        notes: integration.actualHours
          ? `${integration.actualHours} hours across ${days} service day(s)`
          : undefined,
      }
    }

    case 'PER_VIDEO': {
      return {
        description: `Video integration — ${integration.creatorHandle} (${integration.platform})`,
        platform: integration.platform,
        creatorHandle: integration.creatorHandle,
        quantity: 1,
        unit: 'videos',
        unitRate: integration.agreedRate,
        amount: integration.agreedRate,
      }
    }

    case 'HYBRID': {
      return {
        description: `Campaign package — ${integration.creatorHandle} (stream + VOD)`,
        platform: integration.platform,
        creatorHandle: integration.creatorHandle,
        quantity: 1,
        unit: 'package',
        unitRate: integration.totalFee ?? integration.agreedRate,
        amount: integration.totalFee ?? integration.agreedRate,
        notes: 'Hybrid package: live stream + video deliverable(s)',
      }
    }

    case 'FLAT_FEE':
    default: {
      return {
        description: `Brand integration — ${integration.creatorHandle} (${integration.platform})`,
        platform: integration.platform,
        creatorHandle: integration.creatorHandle,
        quantity: 1,
        unit: 'integration',
        unitRate: integration.agreedRate,
        amount: integration.agreedRate,
      }
    }
  }
}

// ─── CREATOR PAYMENT GENERATION ───────────────────────

/**
 * Generate a creator payment summary and trigger payment.
 * Called after Joel approves the verification.
 */
export async function generateCreatorPayment(params: {
  integration: Integration
  creatorName: string
  verificationProof?: {
    contentUrl: string | null
    screenshotUrl: string | null
    transcriptExcerpt: string | null
  }
}): Promise<CreatorPaymentSummary> {
  const { integration, creatorName, verificationProof } = params

  const grossFee = integration.totalFee ?? integration.agreedRate
  const commissionAmount = Math.round(grossFee * (integration.commissionPct / 100) * 100) / 100
  const netPayout = grossFee - commissionAmount

  // Determine quantity based on billing model
  let quantity = 1
  if (integration.billingModel === 'PER_STREAM_HOUR') {
    quantity = integration.actualHours ?? 1
  } else if (integration.billingModel === 'SERVICE_DAY') {
    quantity = integration.actualHours ? Math.ceil(integration.actualHours / 8) : 1
  }

  // Create payment record in database
  await createPayment({
    creatorId: integration.creatorId,
    campaignId: integration.campaignId,
    amount: netPayout,
    currency: 'AUD',
  })

  return {
    creatorHandle: integration.creatorHandle,
    creatorName,
    platform: integration.platform,
    campaignRef: integration.campaignId,
    campaignTitle: integration.campaignTitle,
    brandName: integration.brandName,
    billingModel: integration.billingModel,
    rate: integration.agreedRate,
    rateBasis: integration.rateBasis,
    quantity,
    grossFee,
    commissionPct: integration.commissionPct,
    commissionAmount,
    netPayout,
    deliveredAt: integration.deliveredAt,
    verifiedAt: integration.verifiedAt,
    approvedAt: integration.approvedAt,
    paymentDueAt: integration.paymentDueAt,
    verificationProof: {
      contentUrl: verificationProof?.contentUrl ?? integration.contentUrl,
      screenshotUrl: verificationProof?.screenshotUrl ?? null,
      transcriptExcerpt: verificationProof?.transcriptExcerpt ?? null,
      streamDuration: integration.actualDurationMinutes
        ? `${Math.floor(integration.actualDurationMinutes / 60)}h ${integration.actualDurationMinutes % 60}m`
        : null,
    },
  }
}

// ─── FABULATE PIPELINE INVOICING ──────────────────────

/**
 * Generate invoice for a Fabulate-sourced campaign.
 * Fabulate deals have specific commission structures:
 * - Standard: 20% commission (same as direct)
 * - Volume: May negotiate lower commission for high-volume Fabulate campaigns
 */
export async function generateFabulateInvoice(params: {
  campaign: Campaign
  integrations: Integration[]
  fabulateCommissionOverride?: number // if Fabulate negotiated a different rate
}): Promise<GeneratedInvoice> {
  // Fabulate campaigns are invoiced the same way, just tracked separately
  return generateBrandInvoice({
    campaign: params.campaign,
    integrations: params.integrations,
    includeGst: true, // Fabulate is Australian, always include GST
  })
}

// ─── BATCH INVOICE GENERATION ─────────────────────────

/**
 * Generate invoices for all approved campaigns that haven't been invoiced yet.
 * Called from admin or via cron after payment approvals.
 */
export async function generatePendingInvoices(): Promise<{
  generated: number
  campaigns: string[]
  errors: string[]
}> {
  const { getCampaigns, getCampaignCreators } = await import('./db')

  const approvedCampaigns = await getCampaigns({ status: 'APPROVED' })
  const generated: string[] = []
  const errors: string[] = []

  for (const campaign of approvedCampaigns) {
    try {
      const creators = await getCampaignCreators(campaign.id)
      const approvedCreators = creators.filter((c) => c.status === 'APPROVED')

      if (approvedCreators.length === 0) continue

      // Build integration objects from campaign creators
      const integrations: Integration[] = approvedCreators.map((cc) => ({
        id: cc.id,
        campaignId: campaign.id,
        campaignCreatorId: cc.id,
        creatorId: cc.creatorId,
        creatorHandle: '',
        platform: 'YouTube' as Integration['platform'],
        state: 'APPROVED' as IntegrationState,
        stateHistory: [],
        brandName: campaign.clientName,
        campaignTitle: campaign.title,
        source: campaign.source as Integration['source'],
        billingModel: 'FLAT_FEE' as BillingModel,
        agreedRate: cc.creatorFee,
        rateBasis: 'per campaign',
        estimatedHours: null,
        actualHours: null,
        totalFee: cc.creatorFee,
        commissionPct: 20,
        commissionAmount: Math.round(cc.creatorFee * 0.2 * 100) / 100,
        talentPayout: cc.creatorFee - Math.round(cc.creatorFee * 0.2 * 100) / 100,
        scheduledDate: null,
        scheduledStartTime: null,
        scheduledDuration: null,
        contentUrl: cc.contentUrl,
        deliveredAt: null,
        streamStartedAt: null,
        streamEndedAt: null,
        actualDurationMinutes: null,
        verificationId: null,
        verifiedAt: null,
        approvedAt: cc.approvedAt,
        paymentDueAt: null,
        paidAt: null,
        paymentId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))

      await generateBrandInvoice({
        campaign,
        integrations,
        includeGst: true,
      })

      generated.push(campaign.mblId)
    } catch (error) {
      errors.push(`${campaign.mblId}: ${String(error)}`)
    }
  }

  return { generated: generated.length, campaigns: generated, errors }
}

// ─── PDF DATA STRUCTURE ───────────────────────────────

/**
 * Structure invoice data for @react-pdf/renderer template.
 * The frontend PDF component consumes this structure.
 */
export function formatInvoiceForPdf(invoice: GeneratedInvoice): {
  header: Record<string, string>
  billTo: Record<string, string>
  lineItems: Record<string, string | number>[]
  totals: Record<string, string>
  footer: Record<string, string>
} {
  return {
    header: {
      invoiceNumber: invoice.invoiceNumber,
      date: new Date(invoice.invoiceDate).toLocaleDateString('en-AU'),
      dueDate: new Date(invoice.dueDate).toLocaleDateString('en-AU'),
      entity: invoice.entity,
      abn: invoice.abn,
    },
    billTo: {
      name: invoice.billTo.name,
      email: invoice.billTo.email,
      company: invoice.billTo.company ?? '',
      reference: `Campaign: ${invoice.campaignRef} — ${invoice.campaignTitle}`,
    },
    lineItems: invoice.lineItems.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      rate: `$${item.unitRate.toFixed(2)}`,
      amount: `$${item.amount.toFixed(2)}`,
      notes: item.notes ?? '',
    })),
    totals: {
      subtotal: `$${invoice.subtotal.toFixed(2)}`,
      gst: invoice.gstAmount > 0 ? `$${invoice.gstAmount.toFixed(2)}` : '—',
      total: `$${invoice.totalAmount.toFixed(2)} ${invoice.currency}`,
    },
    footer: {
      paymentTerms: invoice.paymentTerms,
      bankName: invoice.bankDetails?.bankName ?? '',
      accountName: invoice.bankDetails?.accountName ?? '',
      bsb: invoice.bankDetails?.bsb ?? '',
      accountNumber: invoice.bankDetails?.accountNumber ?? '',
    },
  }
}
