import { NextResponse } from 'next/server'
import {
  getVerificationsReadyForPayment,
  updateVerification,
} from '@/lib/db/verifications'

/**
 * GET /api/admin/verifications/payments
 * 
 * Vercel cron job — runs daily.
 * Checks for approved verifications where the 4-day payment clock has expired.
 * Triggers automatic payment processing (or flags for manual if no bank details).
 * 
 * Add to vercel.json:
 * { "crons": [{ "path": "/api/admin/verifications/payments", "schedule": "0 9 * * *" }] }
 */
export async function GET(request: Request) {
  // Verify cron secret
  // FAIL-CLOSED: if CRON_SECRET is not configured, reject all requests
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    console.error('CRON_SECRET not configured — payment processing endpoint disabled')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const readyForPayment = await getVerificationsReadyForPayment()

    if (readyForPayment.length === 0) {
      return NextResponse.json({ processed: 0, message: 'No payments due' })
    }

    const processed: string[] = []
    const flagged: string[] = []

    for (const verification of readyForPayment) {
      try {
        // Check if creator has bank details
        const { getCreator } = await import('@/lib/db/creators')
        const creator = await getCreator(verification.creatorId)

        if (!creator) {
          flagged.push(`${verification.creatorHandle}: Creator not found`)
          continue
        }

        // TODO: Check creator's bank details from payment provider (Airwallex)
        // For now, create a payment record and mark as PENDING
        const { createPayment } = await import('@/lib/db/payments')
        const { getCampaignCreators } = await import('@/lib/db')

        // Get the fee for this creator on this campaign
        const campaignCreators = await getCampaignCreators(verification.campaignId)
        const cc = campaignCreators.find((c) => c.id === verification.campaignCreatorId)
        const fee = cc?.creatorFee ?? 0

        if (fee === 0) {
          flagged.push(`${verification.creatorHandle}: No fee set`)
          continue
        }

        // Create payment record
        await createPayment({
          creatorId: verification.creatorId,
          campaignId: verification.campaignId,
          amount: fee,
          currency: 'AUD',
        })

        // Mark verification as payment triggered
        await updateVerification(verification.id, { paymentTriggered: true })

        // Update campaign creator status
        const { updateCampaignCreator } = await import('@/lib/db/campaigns')
        if (cc) {
          await updateCampaignCreator(cc.id, { status: 'APPROVED', approvedAt: verification.approvedAt })
        }

        processed.push(verification.creatorHandle)
      } catch (error) {
        flagged.push(`${verification.creatorHandle}: ${String(error)}`)
      }
    }

    return NextResponse.json({
      processed: processed.length,
      flagged: flagged.length,
      details: { processed, flagged },
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Payment processing error:', err)
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 })
  }
}
