import { COLLECTIONS } from './collections'
import { generateCampaignId } from './mbl-id'
import type { Campaign, CampaignStatus, CampaignSource, CampaignCreator } from './types'

async function getDb() {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  return getAdminDb()
}

export async function getCampaigns(filters?: {
  status?: CampaignStatus
  source?: CampaignSource
}): Promise<Campaign[]> {
  const db = await getDb()
  let query: FirebaseFirestore.Query = db.collection(COLLECTIONS.campaigns).orderBy('createdAt', 'desc')
  if (filters?.status) query = query.where('status', '==', filters.status)
  if (filters?.source) query = query.where('source', '==', filters.source)
  const snapshot = await query.get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Campaign))
}

export async function getCampaign(id: string): Promise<Campaign | null> {
  const db = await getDb()
  const doc = await db.collection(COLLECTIONS.campaigns).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as Campaign
}

export async function createCampaign(
  data: Omit<Campaign, 'id' | 'mblId' | 'createdAt' | 'updatedAt'>
): Promise<Campaign> {
  const db = await getDb()
  const mblId = await generateCampaignId()
  const now = new Date().toISOString()
  const campaign: Omit<Campaign, 'id'> = { ...data, mblId, createdAt: now, updatedAt: now }
  const docRef = await db.collection(COLLECTIONS.campaigns).add(campaign)
  return { id: docRef.id, ...campaign }
}

export async function updateCampaign(
  id: string,
  data: Partial<Omit<Campaign, 'id' | 'mblId' | 'createdAt'>>
): Promise<Campaign | null> {
  const db = await getDb()
  const ref = db.collection(COLLECTIONS.campaigns).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null
  await ref.update({ ...data, updatedAt: new Date().toISOString() })
  const updated = await ref.get()
  return { id: updated.id, ...updated.data() } as Campaign
}

export async function getCampaignCreators(campaignId: string): Promise<CampaignCreator[]> {
  const db = await getDb()
  const snapshot = await db.collection(COLLECTIONS.campaignCreators).where('campaignId', '==', campaignId).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CampaignCreator))
}

export async function assignCreatorToCampaign(data: {
  campaignId: string
  creatorId: string
  creatorFee: number
  contentDueAt?: string
}): Promise<CampaignCreator> {
  const db = await getDb()
  const record: Omit<CampaignCreator, 'id'> = {
    campaignId: data.campaignId,
    creatorId: data.creatorId,
    creatorFee: data.creatorFee,
    contentDueAt: data.contentDueAt ?? null,
    briefSentAt: null,
    contentUrl: null,
    approvedAt: null,
    status: 'ASSIGNED',
  }
  const docRef = await db.collection(COLLECTIONS.campaignCreators).add(record)
  return { id: docRef.id, ...record }
}

export async function updateCampaignCreator(
  id: string,
  data: Partial<Omit<CampaignCreator, 'id' | 'campaignId' | 'creatorId'>>
): Promise<void> {
  const db = await getDb()
  await db.collection(COLLECTIONS.campaignCreators).doc(id).update(data)
}

export async function getCreatorCampaigns(creatorId: string): Promise<CampaignCreator[]> {
  const db = await getDb()
  const snapshot = await db.collection(COLLECTIONS.campaignCreators).where('creatorId', '==', creatorId).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CampaignCreator))
}

export async function getOpenCampaigns(): Promise<Campaign[]> {
  const db = await getDb()
  const snapshot = await db.collection(COLLECTIONS.campaigns)
    .where('status', 'not-in', ['COMPLETE'])
    .orderBy('createdAt', 'desc')
    .get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Campaign))
}
