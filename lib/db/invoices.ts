import { COLLECTIONS } from './collections'
import { generateInvoiceId } from './mbl-id'
import type { Invoice, InvoiceStatus } from './types'

async function getDb() {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  return getAdminDb()
}

export async function getInvoices(filters?: { status?: InvoiceStatus; campaignId?: string }): Promise<Invoice[]> {
  const db = await getDb()
  let query: FirebaseFirestore.Query = db.collection(COLLECTIONS.invoices).orderBy('createdAt', 'desc')
  if (filters?.status) query = query.where('status', '==', filters.status)
  if (filters?.campaignId) query = query.where('campaignId', '==', filters.campaignId)
  const snapshot = await query.get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Invoice))
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  const db = await getDb()
  const doc = await db.collection(COLLECTIONS.invoices).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as Invoice
}

export async function createInvoice(data: {
  campaignId: string
  invoiceTo: string
  invoiceEmail: string
  amount: number
  currency?: string
}): Promise<Invoice> {
  const db = await getDb()
  const mblId = await generateInvoiceId()
  const now = new Date().toISOString()
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 4)

  const invoice: Omit<Invoice, 'id'> = {
    mblId,
    campaignId: data.campaignId,
    invoiceTo: data.invoiceTo,
    invoiceEmail: data.invoiceEmail,
    amount: data.amount,
    currency: data.currency ?? 'AUD',
    status: 'DRAFT',
    issuedAt: now,
    dueAt: dueDate.toISOString(),
    paidAt: null,
    pdfUrl: null,
    createdAt: now,
  }

  const docRef = await db.collection(COLLECTIONS.invoices).add(invoice)
  return { id: docRef.id, ...invoice }
}

export async function updateInvoice(id: string, data: Partial<Omit<Invoice, 'id' | 'mblId' | 'createdAt'>>): Promise<void> {
  const db = await getDb()
  await db.collection(COLLECTIONS.invoices).doc(id).update(data)
}

export async function getOutstandingInvoices(): Promise<Invoice[]> {
  const db = await getDb()
  const snapshot = await db.collection(COLLECTIONS.invoices).where('status', '==', 'SENT').orderBy('dueAt', 'asc').get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Invoice))
}

export async function getBillingMetrics(startDate?: string): Promise<{ grossBillings: number; outstandingFromClients: number }> {
  const db = await getDb()
  let paidQuery: FirebaseFirestore.Query = db.collection(COLLECTIONS.invoices).where('status', '==', 'PAID')
  if (startDate) paidQuery = paidQuery.where('paidAt', '>=', startDate)
  const paidSnapshot = await paidQuery.get()
  const grossBillings = paidSnapshot.docs.reduce((sum, doc) => sum + (doc.data().amount ?? 0), 0)

  const outstandingSnapshot = await db.collection(COLLECTIONS.invoices).where('status', '==', 'SENT').get()
  const outstandingFromClients = outstandingSnapshot.docs.reduce((sum, doc) => sum + (doc.data().amount ?? 0), 0)

  return { grossBillings, outstandingFromClients }
}
