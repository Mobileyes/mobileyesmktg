/**
 * Content Verification Records — Firestore Collection
 * 
 * Stores proof-of-delivery for each creator's campaign content:
 * - Screenshot of the attribution (UTM link, pinned comment, overlay)
 * - Transcript excerpt proving brand mention
 * - Detected UTM/promo codes
 * - View count at time of detection
 * - Approval status and payment trigger timestamps
 */

import { COLLECTIONS } from './collections'

async function getDb() {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  return getAdminDb()
}

// ─── TYPES ────────────────────────────────────────────

export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_REVIEW'

export interface ContentVerification {
  id: string
  campaignId: string
  campaignCreatorId: string
  creatorId: string
  creatorHandle: string
  platform: 'YouTube' | 'Twitch' | 'Kick' | 'TikTok' | 'Instagram'

  // Content detection
  contentUrl: string
  contentTitle: string | null
  detectedAt: string // ISO — when our system first detected the content
  publishedAt: string | null // ISO — when the content went live

  // Attribution proof
  screenshotUrl: string | null // URL to stored screenshot of the attribution moment
  screenshotTimestamp: number | null // seconds into video where attribution appears
  transcriptExcerpt: string | null // the relevant section mentioning the brand
  transcriptFullUrl: string | null // link to full transcript if stored

  // UTM / Promo detection
  utmLinkDetected: boolean
  utmLinkUrl: string | null // the actual UTM link found
  utmLinkLocation: 'DESCRIPTION' | 'PINNED_COMMENT' | 'BIO_LINK' | 'CHAT' | 'OVERLAY' | null
  promoCodeDetected: boolean
  promoCode: string | null
  promoCodeLocation: 'DESCRIPTION' | 'PINNED_COMMENT' | 'VERBAL' | 'OVERLAY' | 'CHAT' | null

  // Brand mention verification
  brandMentionDetected: boolean
  brandMentionMethod: 'TRANSCRIPT' | 'TITLE' | 'HASHTAG' | 'DESCRIPTION' | 'VISUAL' | null
  talkingPointsMatched: string[] // which brief talking points were mentioned
  talkingPointsTotal: number // total talking points in the brief

  // Metrics at time of detection
  viewCountAtDetection: number | null
  likesAtDetection: number | null
  commentsAtDetection: number | null

  // Approval workflow
  status: VerificationStatus
  reviewedBy: string | null // 'joel' or admin ID
  reviewedAt: string | null
  reviewNotes: string | null
  approvedAt: string | null // triggers 4-day payment clock

  // Payment trigger
  paymentDueAt: string | null // approvedAt + 4 days
  paymentTriggered: boolean

  // Metadata
  createdAt: string
  updatedAt: string
}

// ─── CRUD ─────────────────────────────────────────────

const VERIFICATION_COLLECTION = COLLECTIONS.contentVerifications

export async function createVerification(
  data: Omit<ContentVerification, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ContentVerification> {
  const db = await getDb()
  const now = new Date().toISOString()
  const record = { ...data, createdAt: now, updatedAt: now }
  const docRef = await db.collection(VERIFICATION_COLLECTION).add(record)
  return { id: docRef.id, ...record }
}

export async function getVerification(id: string): Promise<ContentVerification | null> {
  const db = await getDb()
  const doc = await db.collection(VERIFICATION_COLLECTION).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as ContentVerification
}

export async function updateVerification(
  id: string,
  data: Partial<Omit<ContentVerification, 'id' | 'createdAt'>>
): Promise<void> {
  const db = await getDb()
  await db.collection(VERIFICATION_COLLECTION).doc(id).update({
    ...data,
    updatedAt: new Date().toISOString(),
  })
}

export async function getVerificationsForCampaign(
  campaignId: string
): Promise<ContentVerification[]> {
  const db = await getDb()
  const snapshot = await db
    .collection(VERIFICATION_COLLECTION)
    .where('campaignId', '==', campaignId)
    .orderBy('detectedAt', 'desc')
    .get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ContentVerification))
}

export async function getPendingVerifications(): Promise<ContentVerification[]> {
  const db = await getDb()
  const snapshot = await db
    .collection(VERIFICATION_COLLECTION)
    .where('status', '==', 'PENDING')
    .orderBy('detectedAt', 'desc')
    .get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ContentVerification))
}

export async function approveVerification(
  id: string,
  reviewedBy: string,
  notes?: string
): Promise<ContentVerification | null> {
  const db = await getDb()
  const now = new Date().toISOString()
  const paymentDue = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()

  await db.collection(VERIFICATION_COLLECTION).doc(id).update({
    status: 'APPROVED',
    reviewedBy,
    reviewedAt: now,
    reviewNotes: notes ?? null,
    approvedAt: now,
    paymentDueAt: paymentDue,
    paymentTriggered: false,
    updatedAt: now,
  })

  return getVerification(id)
}

export async function rejectVerification(
  id: string,
  reviewedBy: string,
  notes: string
): Promise<void> {
  const db = await getDb()
  const now = new Date().toISOString()

  await db.collection(VERIFICATION_COLLECTION).doc(id).update({
    status: 'REJECTED',
    reviewedBy,
    reviewedAt: now,
    reviewNotes: notes,
    updatedAt: now,
  })
}

export async function getVerificationsReadyForPayment(): Promise<ContentVerification[]> {
  const db = await getDb()
  const now = new Date().toISOString()
  const snapshot = await db
    .collection(VERIFICATION_COLLECTION)
    .where('status', '==', 'APPROVED')
    .where('paymentTriggered', '==', false)
    .where('paymentDueAt', '<=', now)
    .get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ContentVerification))
}
