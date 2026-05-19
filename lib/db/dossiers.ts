import { COLLECTIONS } from './collections'
import type { CreatorDossier } from './types'

async function getDb() {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  return getAdminDb()
}

export async function getDossiers(campaignId?: string): Promise<CreatorDossier[]> {
  const db = await getDb()
  let query: FirebaseFirestore.Query = db.collection(COLLECTIONS.dossiers).orderBy('researchedAt', 'desc')
  if (campaignId) query = query.where('campaignId', '==', campaignId)
  const snapshot = await query.get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CreatorDossier))
}

export async function getDossier(id: string): Promise<CreatorDossier | null> {
  const db = await getDb()
  const doc = await db.collection(COLLECTIONS.dossiers).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as CreatorDossier
}

export async function createDossier(data: Omit<CreatorDossier, 'id'>): Promise<CreatorDossier> {
  const db = await getDb()
  const docRef = await db.collection(COLLECTIONS.dossiers).add(data)
  return { id: docRef.id, ...data }
}

export async function updateDossier(id: string, data: Partial<Omit<CreatorDossier, 'id'>>): Promise<void> {
  const db = await getDb()
  await db.collection(COLLECTIONS.dossiers).doc(id).update(data)
}

export async function getDossiersByInboxBrief(inboxBriefId: string): Promise<CreatorDossier[]> {
  const db = await getDb()
  const snapshot = await db.collection(COLLECTIONS.dossiers).where('inboxBriefId', '==', inboxBriefId).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CreatorDossier))
}
