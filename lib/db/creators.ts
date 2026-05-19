import { COLLECTIONS } from './collections'
import { generateCreatorId } from './mbl-id'
import type { Creator, CreatorStatus } from './types'

async function getDb() {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  return getAdminDb()
}

const creatorsCol = () => COLLECTIONS.creators

export async function getCreators(status?: CreatorStatus): Promise<Creator[]> {
  const db = await getDb()
  let query: FirebaseFirestore.Query = db.collection(creatorsCol()).orderBy('createdAt', 'desc')
  if (status) {
    query = query.where('status', '==', status)
  }
  const snapshot = await query.get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Creator))
}

export async function getCreator(id: string): Promise<Creator | null> {
  const db = await getDb()
  const doc = await db.collection(creatorsCol()).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as Creator
}

export async function getCreatorByEmail(email: string): Promise<Creator | null> {
  const db = await getDb()
  const snapshot = await db.collection(creatorsCol()).where('email', '==', email).limit(1).get()
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as Creator
}

export async function createCreator(
  data: Omit<Creator, 'id' | 'mblId' | 'createdAt' | 'updatedAt'>
): Promise<Creator> {
  const db = await getDb()
  const mblId = await generateCreatorId()
  const now = new Date().toISOString()

  const creator: Omit<Creator, 'id'> = {
    ...data,
    mblId,
    createdAt: now,
    updatedAt: now,
  }

  const docRef = await db.collection(creatorsCol()).add(creator)
  return { id: docRef.id, ...creator }
}

export async function updateCreator(
  id: string,
  data: Partial<Omit<Creator, 'id' | 'mblId' | 'createdAt'>>
): Promise<Creator | null> {
  const db = await getDb()
  const ref = db.collection(creatorsCol()).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null

  await ref.update({ ...data, updatedAt: new Date().toISOString() })
  const updated = await ref.get()
  return { id: updated.id, ...updated.data() } as Creator
}

export async function acceptCreator(id: string): Promise<Creator | null> {
  return updateCreator(id, { status: 'ACTIVE' })
}

export async function searchCreators(query: string): Promise<Creator[]> {
  const all = await getCreators()
  const lowerQuery = query.toLowerCase()
  return all.filter(
    (c) =>
      c.fullName.toLowerCase().includes(lowerQuery) ||
      c.email.toLowerCase().includes(lowerQuery) ||
      c.mblId.toLowerCase().includes(lowerQuery)
  )
}

export async function getCreatorsByFilter(filters: {
  platform?: string
  audienceLocation?: string
  status?: CreatorStatus
  contentNiche?: string
}): Promise<Creator[]> {
  const db = await getDb()
  let query: FirebaseFirestore.Query = db.collection(creatorsCol())

  if (filters.status) query = query.where('status', '==', filters.status)
  if (filters.platform) query = query.where('platform', '==', filters.platform)
  if (filters.audienceLocation) query = query.where('audienceLocation', '==', filters.audienceLocation)

  const snapshot = await query.get()
  let results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Creator))

  if (filters.contentNiche) {
    results = results.filter((c) =>
      c.contentNiche.some((n) => n.toLowerCase().includes(filters.contentNiche!.toLowerCase()))
    )
  }

  return results
}
