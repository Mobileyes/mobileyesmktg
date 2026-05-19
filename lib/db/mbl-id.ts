import { COLLECTIONS, COUNTER_IDS } from './collections'

/**
 * MBL ID Generation using Firestore counters
 * Uses atomic increment to guarantee unique sequential IDs.
 */

async function getNextId(counterDocId: string, prefix: string): Promise<string> {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  const db = getAdminDb()
  const counterRef = db.collection(COLLECTIONS.counters).doc(counterDocId)

  const newId = await db.runTransaction(async (transaction) => {
    const counterDoc = await transaction.get(counterRef)

    if (!counterDoc.exists) {
      transaction.set(counterRef, { current: 1 })
      return 1
    }

    const current = counterDoc.data()?.current ?? 0
    const next = current + 1
    transaction.update(counterRef, { current: next })
    return next
  })

  return `MBL-${prefix}-${String(newId).padStart(5, '0')}`
}

export async function generateCreatorId(): Promise<string> {
  return getNextId(COUNTER_IDS.creator, 'CR')
}

export async function generateCampaignId(): Promise<string> {
  return getNextId(COUNTER_IDS.campaign, 'CAMP')
}

export async function generateInvoiceId(): Promise<string> {
  return getNextId(COUNTER_IDS.invoice, 'INV')
}

export async function generatePaymentId(): Promise<string> {
  return getNextId(COUNTER_IDS.payment, 'PAY')
}
