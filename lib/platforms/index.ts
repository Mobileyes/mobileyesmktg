/**
 * Platform Integrations
 * 
 * Connects to streaming platform APIs to:
 * 1. Detect stream completion
 * 2. Ingest creator bios and audience metrics
 * 3. Pull performance data for campaign analytics
 * 4. Feed pitch deck and creator brief generation
 * 
 * Priority order: YouTube > Twitch > Kick > TikTok > Instagram
 */

import { fetchYouTubeChannel, fetchRecentVideos, calculateEngagementRate } from './youtube'

export type PlatformType = 'YouTube' | 'Twitch' | 'Kick' | 'TikTok' | 'Instagram'

export interface PlatformCreatorData {
  platform: PlatformType
  handle: string
  displayName: string
  bio: string | null
  profileImageUrl: string | null
  bannerImageUrl: string | null
  followerCount: number
  subscriberCount: number | null
  totalViews: number | null
  avgViewers: number | null
  isLive: boolean
  lastStreamDate: string | null
  topCategories: string[]
  audienceGeo: Record<string, number> | null
}

export interface StreamEvent {
  platform: PlatformType
  streamId: string
  creatorHandle: string
  title: string
  startedAt: string
  endedAt: string | null
  isLive: boolean
  viewerCount: number
  peakViewers: number
  category: string | null
}

/**
 * Fetch creator data from a platform
 * Routes to the correct platform API based on type
 */
export async function fetchCreatorData(platform: PlatformType, handle: string): Promise<PlatformCreatorData | null> {
  switch (platform) {
    case 'YouTube':
      return fetchYouTubeCreator(handle)
    case 'Twitch':
      return fetchTwitchCreator(handle)
    case 'Kick':
      return fetchKickCreator(handle)
    case 'TikTok':
      return fetchTikTokCreator(handle)
    case 'Instagram':
      return fetchInstagramCreator(handle)
    default:
      return null
  }
}

/**
 * Check if a creator's stream has completed
 * Used to trigger post-stream analytics collection
 */
export async function checkStreamCompletion(platform: PlatformType, handle: string): Promise<StreamEvent | null> {
  switch (platform) {
    case 'YouTube':
      return checkYouTubeStreamCompletion(handle)
    case 'Twitch':
      return checkTwitchStreamCompletion(handle)
    case 'Kick':
      return checkKickStreamCompletion(handle)
    default:
      return null
  }
}

// ─── YOUTUBE ───────────────────────────────────────────
// Uses YouTube Data API v3 (free tier: 10,000 units/day)
async function fetchYouTubeCreator(handle: string): Promise<PlatformCreatorData | null> {
  const channel = await fetchYouTubeChannel(handle)
  if (!channel) return null

  const videos = await fetchRecentVideos(channel.id, 10)
  const engagementRate = calculateEngagementRate(videos, channel.subscriberCount)
  const avgViews = videos.length > 0
    ? Math.round(videos.reduce((sum, v) => sum + v.viewCount, 0) / videos.length)
    : null

  // Check if any recent videos are live content
  const hasLiveContent = videos.some(v => v.isLiveContent)
  const lastLiveVideo = videos.find(v => v.isLiveContent)

  return {
    platform: 'YouTube',
    handle: channel.handle,
    displayName: channel.title,
    bio: channel.description,
    profileImageUrl: channel.thumbnailUrl,
    bannerImageUrl: channel.bannerUrl,
    followerCount: channel.subscriberCount,
    subscriberCount: channel.subscriberCount,
    totalViews: channel.viewCount,
    avgViewers: avgViews,
    isLive: false, // YouTube doesn't expose this in channel data — checked via stream completion
    lastStreamDate: lastLiveVideo?.publishedAt ?? null,
    topCategories: ['Gaming'],
    audienceGeo: null,
  }
}

async function checkYouTubeStreamCompletion(handle: string): Promise<StreamEvent | null> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey || apiKey === 'PLACEHOLDER') return null

  try {
    // First get channel ID from handle
    const channel = await fetchYouTubeChannel(handle)
    if (!channel) return null

    const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

    // Check for active live broadcasts
    const liveResponse = await fetch(
      `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channel.id}&type=video&eventType=live&key=${apiKey}`
    )
    if (liveResponse.ok) {
      const liveData = await liveResponse.json()
      if (liveData.items && liveData.items.length > 0) {
        const liveVideo = liveData.items[0]
        // Currently live
        return {
          platform: 'YouTube',
          streamId: liveVideo.id.videoId,
          creatorHandle: handle,
          title: liveVideo.snippet.title,
          startedAt: liveVideo.snippet.publishedAt,
          endedAt: null,
          isLive: true,
          viewerCount: 0, // Would need liveStreamingDetails for concurrent viewers
          peakViewers: 0,
          category: liveVideo.snippet.categoryId ?? null,
        }
      }
    }

    // Check for recently completed broadcasts (last 2 hours)
    const completedResponse = await fetch(
      `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channel.id}&type=video&eventType=completed&order=date&maxResults=1&key=${apiKey}`
    )
    if (!completedResponse.ok) return null
    const completedData = await completedResponse.json()

    if (!completedData.items || completedData.items.length === 0) return null

    const recentStream = completedData.items[0]
    const publishedAt = new Date(recentStream.snippet.publishedAt)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)

    // Only return if stream ended within last 2 hours
    if (publishedAt < twoHoursAgo) return null

    // Get video details for viewer stats
    const videoResponse = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=statistics,liveStreamingDetails&id=${recentStream.id.videoId}&key=${apiKey}`
    )
    let viewCount = 0
    let concurrentViewers = 0
    let actualStartTime: string | null = null
    let actualEndTime: string | null = null

    if (videoResponse.ok) {
      const videoData = await videoResponse.json()
      if (videoData.items && videoData.items.length > 0) {
        const video = videoData.items[0]
        viewCount = parseInt(video.statistics?.viewCount ?? '0', 10)
        concurrentViewers = parseInt(video.liveStreamingDetails?.concurrentViewers ?? '0', 10)
        actualStartTime = video.liveStreamingDetails?.actualStartTime ?? null
        actualEndTime = video.liveStreamingDetails?.actualEndTime ?? null
      }
    }

    return {
      platform: 'YouTube',
      streamId: recentStream.id.videoId,
      creatorHandle: handle,
      title: recentStream.snippet.title,
      startedAt: actualStartTime ?? recentStream.snippet.publishedAt,
      endedAt: actualEndTime ?? new Date().toISOString(),
      isLive: false,
      viewerCount: viewCount,
      peakViewers: concurrentViewers || viewCount,
      category: null,
    }
  } catch (error) {
    console.error(`Failed to check YouTube stream completion for ${handle}:`, error)
    return null
  }
}

// ─── TWITCH ────────────────────────────────────────────
// Uses Twitch Helix API (requires Client ID + OAuth token)
async function fetchTwitchCreator(handle: string): Promise<PlatformCreatorData | null> {
  const { fetchTwitchUser, getTwitchStream, getTwitchFollowerCount } = await import('./twitch')

  const user = await fetchTwitchUser(handle)
  if (!user) return null

  const followerCount = await getTwitchFollowerCount(user.id)
  const stream = await getTwitchStream(handle)

  return {
    platform: 'Twitch',
    handle: user.login,
    displayName: user.displayName,
    bio: user.description,
    profileImageUrl: user.profileImageUrl,
    bannerImageUrl: user.offlineImageUrl,
    followerCount,
    subscriberCount: null,
    totalViews: user.viewCount,
    avgViewers: stream?.viewerCount ?? null,
    isLive: !!stream,
    lastStreamDate: stream?.startedAt ?? null,
    topCategories: stream?.gameName ? [stream.gameName] : ['Gaming'],
    audienceGeo: null,
  }
}

async function checkTwitchStreamCompletion(handle: string): Promise<StreamEvent | null> {
  const { getTwitchStream } = await import('./twitch')

  const stream = await getTwitchStream(handle)

  if (stream) {
    // Currently live
    return {
      platform: 'Twitch',
      streamId: stream.id,
      creatorHandle: handle,
      title: stream.title,
      startedAt: stream.startedAt,
      endedAt: null,
      isLive: true,
      viewerCount: stream.viewerCount,
      peakViewers: stream.viewerCount,
      category: stream.gameName,
    }
  }

  // Not live — if wasLive was true, the stream-monitor will detect completion
  return null
}

// ─── KICK ──────────────────────────────────────────────
// Kick API (public endpoints, no auth required)
async function fetchKickCreator(handle: string): Promise<PlatformCreatorData | null> {
  const { fetchKickChannel, getKickLivestream } = await import('./kick')

  const channel = await fetchKickChannel(handle)
  if (!channel) return null

  const livestream = await getKickLivestream(handle)

  return {
    platform: 'Kick',
    handle: channel.slug,
    displayName: channel.username,
    bio: channel.bio,
    profileImageUrl: channel.profilePic,
    bannerImageUrl: channel.bannerImage,
    followerCount: channel.followersCount,
    subscriberCount: null,
    totalViews: null,
    avgViewers: livestream?.viewerCount ?? null,
    isLive: livestream?.isLive ?? false,
    lastStreamDate: livestream?.startedAt ?? null,
    topCategories: channel.recentCategories.length > 0 ? channel.recentCategories : ['Gaming'],
    audienceGeo: null,
  }
}

async function checkKickStreamCompletion(handle: string): Promise<StreamEvent | null> {
  const { getKickLivestream } = await import('./kick')

  const livestream = await getKickLivestream(handle)

  if (livestream?.isLive) {
    return {
      platform: 'Kick',
      streamId: `kick-${handle}-${Date.now()}`,
      creatorHandle: handle,
      title: livestream.title ?? 'Live Stream',
      startedAt: livestream.startedAt ?? new Date().toISOString(),
      endedAt: null,
      isLive: true,
      viewerCount: livestream.viewerCount,
      peakViewers: livestream.viewerCount,
      category: livestream.category,
    }
  }

  // Not live — stream-monitor handles the transition detection
  return null
}

// ─── TIKTOK ────────────────────────────────────────────
async function fetchTikTokCreator(handle: string): Promise<PlatformCreatorData | null> {
  // TikTok Research API or third-party (Modash, HypeAuditor)
  // TikTok's official API requires business verification
  
  return {
    platform: 'TikTok',
    handle,
    displayName: handle,
    bio: null,
    profileImageUrl: null,
    bannerImageUrl: null,
    followerCount: 0,
    subscriberCount: null,
    totalViews: null,
    avgViewers: null,
    isLive: false,
    lastStreamDate: null,
    topCategories: ['Gaming'],
    audienceGeo: null,
  }
}

// ─── INSTAGRAM ─────────────────────────────────────────
async function fetchInstagramCreator(handle: string): Promise<PlatformCreatorData | null> {
  // Instagram Graph API (requires Facebook Business verification)
  
  return {
    platform: 'Instagram',
    handle,
    displayName: handle,
    bio: null,
    profileImageUrl: null,
    bannerImageUrl: null,
    followerCount: 0,
    subscriberCount: null,
    totalViews: null,
    avgViewers: null,
    isLive: false,
    lastStreamDate: null,
    topCategories: ['Gaming'],
    audienceGeo: null,
  }
}
