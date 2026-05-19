/**
 * Firestore Document Types
 * These mirror the Prisma schema but for Firestore (NoSQL).
 * Collections: creators, campaigns, campaignCreators, invoices, payments, inboxBriefs
 */

// ─── CREATOR ───────────────────────────────────────────
export type CreatorStatus = 'APPLICANT' | 'ACTIVE' | 'PAUSED' | 'INACTIVE'

export interface Creator {
  id: string
  mblId: string // MBL-CR-00001
  fullName: string
  email: string
  platform: string // TikTok, YouTube, Twitch, Kick, Instagram
  handleUrl: string
  followerCount: number
  avgViews: number | null
  sessionLength: string | null // '1-2hrs', '2-4hrs' etc
  audienceLocation: string // 'Australia', 'Vietnam' etc
  contentNiche: string[] // ['Gaming', 'Entertainment']
  gamingGenres: string[] // ['FPS', 'RPG']
  rateCard: Record<string, number> | null // { tiktok: 1200, youtube: 2500 }
  status: CreatorStatus
  notes: string | null
  createdAt: string // ISO date
  updatedAt: string // ISO date
}

// ─── CAMPAIGN ──────────────────────────────────────────
export type CampaignSource = 'FABULATE' | 'DIRECT' | 'INBOUND_EMAIL' | 'OTHER'

export type CampaignStatus =
  | 'DRAFT'
  | 'BRIEFING'
  | 'SENT'
  | 'IN_PROGRESS'
  | 'REVIEW'
  | 'APPROVED'
  | 'INVOICED'
  | 'PAID'
  | 'COMPLETE'

export interface Campaign {
  id: string
  mblId: string // MBL-CAMP-00001
  title: string
  clientName: string
  clientEmail: string
  source: CampaignSource
  objective: string
  markets: string[]
  budgetRange: string
  briefDetails: string | null
  status: CampaignStatus
  campaignFee: number | null // total fee charged to client
  commissionPct: number // default 25
  startDate: string | null // ISO date
  endDate: string | null // ISO date
  notes: string | null
  inboxMessageId: string | null // Gmail message ID if inbound
  createdAt: string
  updatedAt: string
}

// ─── CAMPAIGN-CREATOR JOIN ─────────────────────────────
export type CampaignCreatorStatus =
  | 'ASSIGNED'
  | 'BRIEFED'
  | 'IN_PROGRESS'
  | 'DELIVERED'
  | 'APPROVED'
  | 'PAID'

export interface CampaignCreator {
  id: string
  campaignId: string
  creatorId: string
  creatorFee: number // fee paid TO creator
  briefSentAt: string | null
  contentDueAt: string | null
  contentUrl: string | null // delivered content link
  approvedAt: string | null
  status: CampaignCreatorStatus
}

// ─── INVOICE ───────────────────────────────────────────
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'VOID'

export interface Invoice {
  id: string
  mblId: string // MBL-INV-00001
  campaignId: string
  invoiceTo: string // client name
  invoiceEmail: string
  amount: number
  currency: string // default 'AUD'
  status: InvoiceStatus
  issuedAt: string | null
  dueAt: string | null
  paidAt: string | null
  pdfUrl: string | null
  createdAt: string
}

// ─── PAYMENT (to creators) ─────────────────────────────
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED'

export interface Payment {
  id: string
  mblId: string // MBL-PAY-00001
  creatorId: string
  campaignId: string
  amount: number
  currency: string // default 'AUD'
  status: PaymentStatus
  dueAt: string // always within 4 days of content approval
  paidAt: string | null
  method: string | null // Airwallex, bank transfer
  reference: string | null // Airwallex transaction ID
  createdAt: string
}

// ─── BRIEF INBOX (from Gmail ingestion) ────────────────
export type InboxStatus = 'UNREAD' | 'READ' | 'CONVERTED' | 'DISMISSED'

export interface InboxBrief {
  id: string
  gmailMessageId: string
  from: string
  subject: string
  bodyPreview: string
  receivedAt: string
  status: InboxStatus
  campaignId: string | null // set when converted to campaign
  isFabulate: boolean // auto-detected from sender domain
  extractedHandles: Array<{ platform: string; handle: string; url: string }>
}

// ─── CREATOR DOSSIER (pre-outreach research) ───────────
export interface CreatorDossier {
  id: string
  creatorHandle: string
  platform: string
  handleUrl: string
  followerCount: number | null
  avgViews: number | null
  engagementRate: number | null
  audienceLocation: string | null
  contentNiche: string[]
  recentBrandDeals: string[]
  estimatedRateLow: number | null
  estimatedRateHigh: number | null
  rateBasis: string | null // 'per video', 'per stream hour'
  fitScore: number // 0-100
  redFlags: string[]
  briefingNotes: string[]
  campaignId: string | null // linked campaign if from Fabulate
  inboxBriefId: string | null
  researchedAt: string
  status: 'PENDING' | 'COMPLETE' | 'FAILED'
}

// ─── COUNTERS (for MBL ID generation) ─────────────────
export interface Counter {
  current: number
}
