/**
 * YouTube Data API v3 Integration
 * Requires: YOUTUBE_API_KEY env var
 * Free tier: 10,000 units/day
 */

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

export interface YouTubeChannel {
  id: string
  handle: string
  title: string
  description: string | null
  thumbnailUrl: string | null
  bannerUrl: string | null
  subscriberCount: number
  videoCount: number
  viewCount: number
  country: string | null
  customUrl: string | null
  publishedAt: string
}

export interface YouTubeVideo {
  id: string
  title: string
  publishedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  duration: string | null
  isLiveContent: boolean
  liveConcurrentViewers: number | null
}

/**
 * Fetch a YouTube channel by handle or custom URL
 */
export async function fetchYouTubeChannel(handle: string): Promise<YouTubeChannel | null> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey || apiKey === 'PLACEHOLDER') {
    console.warn('YouTube API key not configured')
    return null
  }

  try {
    // Try by handle first
    const cleanHandle = handle.replace('@', '')
    const response = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=snippet,statistics,brandingSettings&forHandle=${cleanHandle}&key=${apiKey}`
    )

    if (!response.ok) return null
    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      // Try by custom URL
      const searchResponse = await fetch(
        `${YOUTUBE_API_BASE}/search?part=snippet&q=${cleanHandle}&type=channel&key=${apiKey}`
      )
      if (!searchResponse.ok) return null
      const searchData = await searchResponse.json()
      if (!searchData.items || searchData.items.length === 0) return null

      // Get full channel data
      const channelId = searchData.items[0].snippet.channelId
      const channelResponse = await fetch(
        `${YOUTUBE_API_BASE}/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${apiKey}`
      )
      if (!channelResponse.ok) return null
      const channelData = await channelResponse.json()
      if (!channelData.items || channelData.items.length === 0) return null
      data.items = channelData.items
    }

    const channel = data.items[0]
    return {
      id: channel.id,
      handle: cleanHandle,
      title: channel.snippet.title,
      description: channel.snippet.description ?? null,
      thumbnailUrl: channel.snippet.thumbnails?.high?.url ?? null,
      bannerUrl: channel.brandingSettings?.image?.bannerExternalUrl ?? null,
      subscriberCount: parseInt(channel.statistics.subscriberCount ?? '0', 10),
      videoCount: parseInt(channel.statistics.videoCount ?? '0', 10),
      viewCount: parseInt(channel.statistics.viewCount ?? '0', 10),
      country: channel.snippet.country ?? null,
      customUrl: channel.snippet.customUrl ?? null,
      publishedAt: channel.snippet.publishedAt,
    }
  } catch (error) {
    console.error(`Failed to fetch YouTube channel ${handle}:`, error)
    return null
  }
}

/**
 * Fetch recent videos for a YouTube channel (for engagement calculation)
 */
export async function fetchRecentVideos(channelId: string, maxResults = 10): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey || apiKey === 'PLACEHOLDER') return []

  try {
    // Get recent video IDs
    const searchResponse = await fetch(
      `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=${maxResults}&key=${apiKey}`
    )
    if (!searchResponse.ok) return []
    const searchData = await searchResponse.json()

    if (!searchData.items || searchData.items.length === 0) return []

    // Get full video stats
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',')
    const videosResponse = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=statistics,contentDetails,liveStreamingDetails&id=${videoIds}&key=${apiKey}`
    )
    if (!videosResponse.ok) return []
    const videosData = await videosResponse.json()

    return videosData.items.map((video: any) => ({
      id: video.id,
      title: searchData.items.find((s: any) => s.id.videoId === video.id)?.snippet?.title ?? '',
      publishedAt: searchData.items.find((s: any) => s.id.videoId === video.id)?.snippet?.publishedAt ?? '',
      viewCount: parseInt(video.statistics.viewCount ?? '0', 10),
      likeCount: parseInt(video.statistics.likeCount ?? '0', 10),
      commentCount: parseInt(video.statistics.commentCount ?? '0', 10),
      duration: video.contentDetails?.duration ?? null,
      isLiveContent: !!video.liveStreamingDetails,
      liveConcurrentViewers: video.liveStreamingDetails?.concurrentViewers
        ? parseInt(video.liveStreamingDetails.concurrentViewers, 10)
        : null,
    }))
  } catch (error) {
    console.error(`Failed to fetch videos for channel ${channelId}:`, error)
    return []
  }
}

/**
 * Calculate engagement rate from recent videos
 */
export function calculateEngagementRate(videos: YouTubeVideo[], subscriberCount: number): number {
  if (videos.length === 0 || subscriberCount === 0) return 0

  const totalEngagement = videos.reduce(
    (sum, v) => sum + v.likeCount + v.commentCount,
    0
  )
  const avgEngagement = totalEngagement / videos.length
  return Math.round((avgEngagement / subscriberCount) * 100 * 10) / 10
}
