/**
 * Stream Monitor
 * 
 * Monitors managed creators' streams to detect completion.
 * When a stream ends, triggers analytics collection and
 * notifies the admin platform.
 * 
 * This runs as a Vercel cron job every 5 minutes.
 * 
 * Flow:
 * 1. Get all ACTIVE creators with active campaigns
 * 2. Check each creator's stream status on their platform
 * 3. If stream was live and is now offline → stream completed
 * 4. Trigger analytics collection for that stream
 * 5. Update campaign status and notify admin
 */

import { checkStreamCompletion, type PlatformType } from './index'
import { saveStreamAnalytics } from '@/lib/db/analytics'

export interface MonitoredCreator {
  creatorId: string
  platform: PlatformType
  handle: string
  campaignId: string
  campaignCreatorId: string
  wasLive: boolean // tracked in memory/db between checks
}

/**
 * Check all monitored creators for stream completion
 * Called by: /api/admin/streams/check (Vercel cron every 5 mins)
 */
export async function checkAllStreams(creators: MonitoredCreator[]): Promise<{
  completed: string[]
  stillLive: string[]
  offline: string[]
}> {
  const completed: string[] = []
  const stillLive: string[] = []
  const offline: string[] = []

  for (const creator of creators) {
    try {
      const streamEvent = await checkStreamCompletion(creator.platform, creator.handle)

      if (streamEvent?.isLive) {
        stillLive.push(creator.handle)
      } else if (creator.wasLive && !streamEvent?.isLive) {
        // Was live, now offline → stream completed
        completed.push(creator.handle)

        // Save initial analytics record (will be enriched later)
        if (streamEvent) {
          await saveStreamAnalytics({
            creatorId: creator.creatorId,
            campaignId: creator.campaignId,
            campaignCreatorId: creator.campaignCreatorId,
            platform: creator.platform,
            contentType: 'LIVE_STREAM',
            contentUrl: null,
            streamStartedAt: streamEvent.startedAt,
            streamEndedAt: streamEvent.endedAt,
            streamDurationMinutes: streamEvent.endedAt
              ? Math.round(
                  (new Date(streamEvent.endedAt).getTime() - new Date(streamEvent.startedAt).getTime()) / 60000
                )
              : null,
            streamCompleted: true,
            peakViewers: streamEvent.peakViewers,
            avgViewers: streamEvent.viewerCount,
            totalViews: null,
            uniqueViewers: null,
            impressions: null,
            chatMessages: null,
            likes: null,
            shares: null,
            comments: null,
            engagementRate: null,
            avgWatchTimeMinutes: null,
            audienceGeo: null,
            audienceAge: null,
            audienceGender: null,
            newFollowersGained: null,
            clickThroughRate: null,
            linkClicks: null,
            conversions: null,
            conversionRate: null,
            costPerView: null,
            costPerEngagement: null,
            collectedAt: new Date().toISOString(),
            source: `${creator.platform.toUpperCase()}_API` as any,
            status: 'PARTIAL',
          })
        }
      } else {
        offline.push(creator.handle)
      }
    } catch (err) {
      console.error(`Error checking stream for ${creator.handle}:`, err)
      offline.push(creator.handle)
    }
  }

  return { completed, stillLive, offline }
}
