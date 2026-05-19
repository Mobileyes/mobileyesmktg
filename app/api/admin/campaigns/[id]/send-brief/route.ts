import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCampaign, getCampaignCreators, updateCampaignCreator, updateCampaign, getCreator } from '@/lib/db'
import { sendCampaignBriefEmail } from '@/lib/resend'
import { trackBriefSentToCreators } from '@/lib/posthog'
import { formatDate } from '@/lib/utils'

// POST /api/admin/campaigns/[id]/send-brief
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

    const campaignCreators = await getCampaignCreators(id)
    const assigned = campaignCreators.filter((cc) => cc.status === 'ASSIGNED')

    if (assigned.length === 0) {
      return NextResponse.json({ error: 'No assigned creators to send brief to' }, { status: 400 })
    }

    const results = []
    for (const cc of assigned) {
      try {
        const creator = await getCreator(cc.creatorId)
        if (!creator) continue

        await sendCampaignBriefEmail({
          to: creator.email,
          creatorName: creator.fullName,
          campaignId: campaign.mblId,
          campaignTitle: campaign.title,
          clientName: campaign.clientName,
          fee: cc.creatorFee,
          contentDueDate: cc.contentDueAt ? formatDate(cc.contentDueAt) : 'TBC',
          platform: creator.platform,
          briefDetails: campaign.briefDetails ?? 'Brief details to follow.',
        })

        await updateCampaignCreator(cc.id, {
          status: 'BRIEFED',
          briefSentAt: new Date().toISOString(),
        })

        results.push({ creatorId: creator.mblId, sent: true })
      } catch (emailErr) {
        console.error(`Failed to send brief to creator ${cc.creatorId}:`, emailErr)
        results.push({ creatorId: cc.creatorId, sent: false })
      }
    }

    await updateCampaign(id, { status: 'SENT' })
    trackBriefSentToCreators(campaign.mblId, assigned.length)

    return NextResponse.json({ success: true, campaignId: campaign.mblId, results })
  } catch (err) {
    console.error('Error sending briefs:', err)
    return NextResponse.json({ error: 'Failed to send briefs' }, { status: 500 })
  }
}
