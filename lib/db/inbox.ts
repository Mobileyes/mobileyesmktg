import { COLLECTIONS } from './collections'
import type { InboxBrief, InboxStatus } from './types'
import { isFabulateEmail, extractCreatorHandles } from '@/lib/fabulate'

async function getDb() {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  return getAdminDb()
}

export async function getInboxBriefs(status?: InboxStatus): Promise<InboxBrief[]> {
  const db = await getDb()
  let query: FirebaseFirestore.Query = db.collection(COLLECTIONS.inboxBriefs).orderBy('receivedAt', 'desc')
  if (status) query = query.where('status', '==', status)
  const snapshot = await query.get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as InboxBrief))
}

export async function getInboxBrief(id: string): Promise<InboxBrief | null> {
  const db = await getDb()
  const doc = await db.collection(COLLECTIONS.inboxBriefs).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as InboxBrief
}

export async function briefExistsByGmailId(gmailMessageId: string): Promise<boolean> {
  const db = await getDb()
  const snapshot = await db.collection(COLLECTIONS.inboxBriefs).where('gmailMessageId', '==', gmailMessageId).limit(1).get()
  return !snapshot.empty
}

export async function createInboxBrief(data: {
  gmailMessageId: string
  from: string
  subject: string
  bodyPreview: string
  receivedAt: string
}): Promise<InboxBrief> {
  const db = await getDb()
  const fabulate = isFabulateEmail(data.from)
  const handles = extractCreatorHandles(data.bodyPreview)

  const brief: Omit<InboxBrief, 'id'> = {
    ...data,
    status: 'UNREAD',
    campaignId: null,
    isFabulate: fabulate,
    extractedHandles: handles,
  }

  const docRef = await db.collection(COLLECTIONS.inboxBriefs).add(brief)
  return { id: docRef.id, ...brief }
}

export async function updateInboxBrief(id: string, data: Partial<Omit<InboxBrief, 'id' | 'gmailMessageId'>>): Promise<void> {
  const db = await getDb()
  await db.collection(COLLECTIONS.inboxBriefs).doc(id).update(data)
}

export async function convertBriefToCampaign(briefId: string, campaignId: string): Promise<void> {
  const db = await getDb()
  await db.collection(COLLECTIONS.inboxBriefs).doc(briefId).update({ status: 'CONVERTED', campaignId })
}

export async function getUnreadCount(): Promise<number> {
  const db = await getDb()
  const snapshot = await db.collection(COLLECTIONS.inboxBriefs).where('status', '==', 'UNREAD').get()
  return snapshot.size
}
