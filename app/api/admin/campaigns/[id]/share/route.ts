import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCampaign } from '@/lib/db'
import { signClientToken } from '@/lib/client-token'

/**
 * POST /api/admin/campaigns/[id]/share
 * 
 * Generate a secure client-facing report link.
 * Token is a cryptographically signed JWT with expiry.
 * 
 * Returns a URL like: https://mobileyes.live/client/{token}
 * Brand clients can view verification proofs + performance without logging in.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = await params

    const campaign = await getCampaign(id)
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    // Generate signed JWT token with 30-day expiry
    const token = await signClientToken(id)

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mobileyes.live'
    const clientUrl = `${baseUrl}/client/${token}`

    return NextResponse.json({
      url: clientUrl,
      token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      campaign: {
        mblId: campaign.mblId,
        title: campaign.title,
        clientName: campaign.clientName,
      },
    })
  } catch (err) {
    console.error('Error generating share link:', err)
    return NextResponse.json({ error: 'Failed to generate link' }, { status: 500 })
  }
}
