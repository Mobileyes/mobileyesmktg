import { NextResponse } from 'next/server'
import { getCampaigns, getCampaignCreators, getCreator } from '@/lib/db'
import { checkAllStreams, type MonitoredCreator } from '@/lib/platforms/stream-monitor'
import type { PlatformType } from '@/lib/platforms'

// GET /api/admin/streams/check — cron job to detect stream completions
// Called every 5 minutes by Vercel cron
export async function GET() {
  try {
    // Get all active campaigns (IN_PROGRESS status = creators are streaming)
    const campaigns = await getCampaigns({ status: 'IN_PROGRESS' })

    if (campaigns.length === 0) {
      return NextResponse.json({ checked: 0, message: 'No active campaigns' })
    }

    // Build list of creators to monitor
    const monitored: MonitoredCreator[] = []

    for (const campaign of campaigns) {
      const campaignCreators = await getCampaignCreators(campaign.id)
      const activeCreators = campaignCreators.filter(
        (cc) => cc.status === 'BRIEFED' || cc.status === 'IN_PROGRESS'
      )

      for (const cc of activeCreators) {
        const creator = await getCreator(cc.creatorId)
        if (!creator) continue

        monitored.push({
          creatorId: creator.id,
          platform: creator.platform as PlatformType,
          handle: creator.handleUrl.split('/').pop() ?? creator.handleUrl,
          campaignId: campaign.id,
          campaignCreatorId: cc.id,
          wasLive: cc.status === 'IN_PROGRESS', // If status is IN_PROGRESS, they were streaming
        })
      }
    }

    if (monitored.length === 0) {
      return NextResponse.json({ checked: 0, message: 'No creators to monitor' })
    }

    const results = await checkAllStreams(monitored)

    return NextResponse.json({
      checked: monitored.length,
      ...results,
    })
  } catch (err) {
    console.error('Stream check error:', err)
    return NextResponse.json({ error: 'Stream check failed' }, { status: 500 })
  }
}
