/**
 * Partners Collection — Firestore
 * 
 * Partners are referral sources / brand contacts who bring campaigns.
 * Examples: Neil (P1 Sim), Fabulate, SideShare, direct brand contacts.
 * 
 * Partners get:
 * - Their own dashboard (token-secured)
 * - Visibility into campaigns they've referred
 * - Conversion/sales tracking for their brands
 * - Optional referral commission tracking
 */

import { COLLECTIONS } from './collections'

async function getDb() {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  return getAdminDb()
}

// ─── TYPES ────────────────────────────────────────────

export type PartnerTier = 'STANDARD' | 'ADVANCED' | 'ENTERPRISE'
export type PartnerStatus = 'ACTIVE' | 'INVITED' | 'INACTIVE'

export interface Partner {
  id: string
  name: string
  company: string
  email: string
  tier: PartnerTier
  status: PartnerStatus
  // What they can see
  campaignIds: string[] // campaigns they're associated with
  creatorIds: string[] // creators they referred or are assigned to their campaigns
  // Commercials
  referralCommissionPct: number | null // e.g. 5% of campaign revenue for referrals
  totalReferralEarnings: number
  // Dashboard access
  dashboardToken: string | null // signed JWT for /partner/[token]
  lastLoginAt: string | null
  // Metadata
  tags: string[] // e.g. ['SIM-RACING', 'HARDWARE', 'P1']
  notes: string | null
  createdAt: string
  updatedAt: string
}

// ─── CRUD ─────────────────────────────────────────────

const PARTNERS_COL = 'partners'

export async function getPartners(): Promise<Partner[]> {
  const db = await getDb()
  const snapshot = await db.collection(PARTNERS_COL).orderBy('createdAt', 'desc').get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Partner))
}

export async function getPartner(id: string): Promise<Partner | null> {
  const db = await getDb()
  const doc = await db.collection(PARTNERS_COL).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as Partner
}

export async function getPartnerByEmail(email: string): Promise<Partner | null> {
  const db = await getDb()
  const snapshot = await db.collection(PARTNERS_COL).where('email', '==', email).limit(1).get()
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as Partner
}

export async function createPartner(data: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Partner> {
  const db = await getDb()
  const now = new Date().toISOString()
  const record = { ...data, createdAt: now, updatedAt: now }
  const docRef = await db.collection(PARTNERS_COL).add(record)
  return { id: docRef.id, ...record }
}

export async function updatePartner(id: string, data: Partial<Omit<Partner, 'id' | 'createdAt'>>): Promise<Partner | null> {
  const db = await getDb()
  const ref = db.collection(PARTNERS_COL).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null
  await ref.update({ ...data, updatedAt: new Date().toISOString() })
  const updated = await ref.get()
  return { id: updated.id, ...updated.data() } as Partner
}

export async function addCampaignToPartner(partnerId: string, campaignId: string): Promise<void> {
  const db = await getDb()
  const ref = db.collection(PARTNERS_COL).doc(partnerId)
  const doc = await ref.get()
  if (!doc.exists) return
  const existing = (doc.data()?.campaignIds ?? []) as string[]
  if (!existing.includes(campaignId)) {
    await ref.update({ campaignIds: [...existing, campaignId], updatedAt: new Date().toISOString() })
  }
}

export async function addCreatorToPartner(partnerId: string, creatorId: string): Promise<void> {
  const db = await getDb()
  const ref = db.collection(PARTNERS_COL).doc(partnerId)
  const doc = await ref.get()
  if (!doc.exists) return
  const existing = (doc.data()?.creatorIds ?? []) as string[]
  if (!existing.includes(creatorId)) {
    await ref.update({ creatorIds: [...existing, creatorId], updatedAt: new Date().toISOString() })
  }
}
