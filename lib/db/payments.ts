import { COLLECTIONS } from './collections'
import { generatePaymentId } from './mbl-id'
import type { Payment, PaymentStatus } from './types'

async function getDb() {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  return getAdminDb()
}

export async function getPayments(filters?: { status?: PaymentStatus; creatorId?: string; campaignId?: string }): Promise<Payment[]> {
  const db = await getDb()
  let query: FirebaseFirestore.Query = db.collection(COLLECTIONS.payments).orderBy('createdAt', 'desc')
  if (filters?.status) query = query.where('status', '==', filters.status)
  if (filters?.creatorId) query = query.where('creatorId', '==', filters.creatorId)
  if (filters?.campaignId) query = query.where('campaignId', '==', filters.campaignId)
  const snapshot = await query.get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Payment))
}

export async function getPayment(id: string): Promise<Payment | null> {
  const db = await getDb()
  const doc = await db.collection(COLLECTIONS.payments).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as Payment
}

export async function createPayment(data: { creatorId: string; campaignId: string; amount: number; currency?: string; method?: string }): Promise<Payment> {
  const db = await getDb()
  const mblId = await generatePaymentId()
  const now = new Date().toISOString()
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 4)

  const payment: Omit<Payment, 'id'> = {
    mblId,
    creatorId: data.creatorId,
    campaignId: data.campaignId,
    amount: data.amount,
    currency: data.currency ?? 'AUD',
    status: 'PENDING',
    dueAt: dueDate.toISOString(),
    paidAt: null,
    method: data.method ?? null,
    reference: null,
    createdAt: now,
  }

  const docRef = await db.collection(COLLECTIONS.payments).add(payment)
  return { id: docRef.id, ...payment }
}

export async function markPaymentPaid(id: string, data: { method: string; reference?: string }): Promise<void> {
  const db = await getDb()
  await db.collection(COLLECTIONS.payments).doc(id).update({
    status: 'PAID',
    paidAt: new Date().toISOString(),
    method: data.method,
    reference: data.reference ?? null,
  })
}

export async function getPendingPayments(): Promise<Payment[]> {
  const db = await getDb()
  const snapshot = await db.collection(COLLECTIONS.payments).where('status', '==', 'PENDING').orderBy('dueAt', 'asc').get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Payment))
}

export async function getPaymentMetrics(startDate?: string): Promise<{ totalPaid: number; outstandingToCreators: number }> {
  const db = await getDb()
  let paidQuery: FirebaseFirestore.Query = db.collection(COLLECTIONS.payments).where('status', '==', 'PAID')
  if (startDate) paidQuery = paidQuery.where('paidAt', '>=', startDate)
  const paidSnapshot = await paidQuery.get()
  const totalPaid = paidSnapshot.docs.reduce((sum, doc) => sum + (doc.data().amount ?? 0), 0)

  const pendingSnapshot = await db.collection(COLLECTIONS.payments).where('status', '==', 'PENDING').get()
  const outstandingToCreators = pendingSnapshot.docs.reduce((sum, doc) => sum + (doc.data().amount ?? 0), 0)

  return { totalPaid, outstandingToCreators }
}
