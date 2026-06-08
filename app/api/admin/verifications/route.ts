import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import {
  getPendingVerifications,
  getVerificationsForCampaign,
  approveVerification,
  rejectVerification,
} from '@/lib/db/verifications'

/**
 * GET /api/admin/verifications
 * 
 * Returns pending verifications for Joel's review queue.
 * Optional ?campaignId= filter to get verifications for a specific campaign.
 */
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaignId')

    const verifications = campaignId
      ? await getVerificationsForCampaign(campaignId)
      : await getPendingVerifications()

    return NextResponse.json(verifications)
  } catch (err) {
    console.error('Error fetching verifications:', err)
    return NextResponse.json({ error: 'Failed to fetch verifications' }, { status: 500 })
  }
}

/**
 * POST /api/admin/verifications
 * 
 * Approve or reject a verification.
 * Body: { id, action: 'approve' | 'reject', notes?: string }
 * 
 * On approve: starts 4-day payment clock.
 */
export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    const { id, action, notes } = body

    if (!id || !action) {
      return NextResponse.json({ error: 'Missing id or action' }, { status: 400 })
    }

    if (action === 'approve') {
      const verification = await approveVerification(id, 'joel', notes)
      if (!verification) {
        return NextResponse.json({ error: 'Verification not found' }, { status: 404 })
      }

      // TODO: Trigger attribution auto-capture
      // - Record content URL, publish timestamp, initial views, platform
      // - Start UTM click tracking (GA4/PostHog)
      // - Fire S2S events to brand's ad networks
      // - Begin tracking conversions over 7/14/28 day windows

      return NextResponse.json({
        success: true,
        verification,
        message: `Approved. Payment due by ${verification.paymentDueAt}`,
      })
    }

    if (action === 'reject') {
      if (!notes) {
        return NextResponse.json({ error: 'Rejection requires notes' }, { status: 400 })
      }
      await rejectVerification(id, 'joel', notes)
      return NextResponse.json({ success: true, message: 'Verification rejected' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    console.error('Error processing verification:', err)
    return NextResponse.json({ error: 'Failed to process verification' }, { status: 500 })
  }
}
