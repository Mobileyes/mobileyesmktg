import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getPayment, markPaymentPaid, getCreator } from '@/lib/db'
import { sendPaymentConfirmationEmail } from '@/lib/resend'
import { trackCreatorPaymentSent } from '@/lib/posthog'

// POST /api/admin/payments/[id]/mark-paid
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()
    const payment = await getPayment(id)

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    await markPaymentPaid(id, {
      method: body.method ?? 'Bank transfer',
      reference: body.reference,
    })

    // Send confirmation email to creator
    const creator = await getCreator(payment.creatorId)
    if (creator) {
      await sendPaymentConfirmationEmail({
        to: creator.email,
        creatorName: creator.fullName,
        paymentId: payment.mblId,
        campaignId: payment.campaignId,
        amount: payment.amount,
        method: body.method ?? 'Bank transfer',
      })
    }

    trackCreatorPaymentSent(payment.mblId, payment.amount)

    return NextResponse.json({ success: true, paymentId: payment.mblId })
  } catch (err) {
    console.error('Error marking payment paid:', err)
    return NextResponse.json({ error: 'Failed to mark payment paid' }, { status: 500 })
  }
}
