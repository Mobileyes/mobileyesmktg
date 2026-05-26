import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { fetchYouTubeChannel, fetchRecentVideos, calculateEngagementRate } from '@/lib/platforms/youtube'
import { fetchTwitchUser, getTwitchStream, getTwitchFollowerCount } from '@/lib/platforms/twitch'
import { fetchKickChannel, getKickLivestream } from '@/lib/platforms/kick'

// POST /api/admin/discover/scrape — scrape a creator profile from URL
export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { url } = await request.json()
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

    const platform = detectPlatform(url)
    const handle = extractHandle(url)

    if (!platform || !handle) {
      return NextResponse.json({ error: 'Could not detect platform or handle from URL' }, { status: 400 })
    }

    let result: any = null

    switch (platform) {
      case 'YouTube': {
        const channel = await fetchYouTubeChannel(handle)
        if (channel) {
          const videos = await fetchRecentVideos(channel.id, 10)
          const engagementRate = calculateEngagementRate(videos, channel.subscriberCount)
          const avgViews = videos.length > 0
            ? Math.round(videos.reduce((sum, v) => sum + v.viewCount, 0) / videos.length)
            : null

          result = {
            platform: 'YouTube',
            handle: channel.handle,
            displayName: channel.title,
            bio: channel.description,
            profileImageUrl: channel.thumbnailUrl,
            followerCount: channel.subscriberCount,
            totalViews: channel.viewCount,
            videoCount: channel.videoCount,
            avgViews,
            engagementRate,
            country: channel.country,
            recentVideos: videos.slice(0, 5).map(v => ({ title: v.title, views: v.viewCount, isLive: v.isLiveContent })),
            hasLiveContent: videos.some(v => v.isLiveContent),
            scraped: true,
          }
        }
        break
      }

      case 'Twitch': {
        const user = await fetchTwitchUser(handle)
        if (user) {
          const followerCount = await getTwitchFollowerCount(user.id)
          const stream = await getTwitchStream(handle)

          result = {
            platform: 'Twitch',
            handle: user.login,
            displayName: user.displayName,
            bio: user.description,
            profileImageUrl: user.profileImageUrl,
            followerCount,
            totalViews: user.viewCount,
            broadcasterType: user.broadcasterType,
            isLive: !!stream,
            currentViewers: stream?.viewerCount ?? null,
            currentGame: stream?.gameName ?? null,
            streamTitle: stream?.title ?? null,
            scraped: true,
          }
        }
        break
      }

      case 'Kick': {
        const channel = await fetchKickChannel(handle)
        if (channel) {
          const livestream = await getKickLivestream(handle)

          result = {
            platform: 'Kick',
            handle: channel.slug,
            displayName: channel.username,
            bio: channel.bio,
            profileImageUrl: channel.profilePic,
            followerCount: channel.followersCount,
            isLive: livestream?.isLive ?? false,
            currentViewers: livestream?.viewerCount ?? null,
            currentCategory: livestream?.category ?? null,
            recentCategories: channel.recentCategories,
            verified: channel.verified,
            scraped: true,
          }
        }
        break
      }

      default:
        return NextResponse.json({ error: `Platform ${platform} not yet supported for scraping` }, { status: 400 })
    }

    if (!result) {
      return NextResponse.json({
        error: `Could not find ${platform} profile for "${handle}". Check the URL or API credentials.`,
        platform,
        handle,
        scraped: false,
      }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('Scrape error:', err)
    return NextResponse.json({ error: 'Scrape failed' }, { status: 500 })
  }
}

function detectPlatform(url: string): string | null {
  const lower = url.toLowerCase()
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube'
  if (lower.includes('twitch.tv')) return 'Twitch'
  if (lower.includes('kick.com')) return 'Kick'
  if (lower.includes('tiktok.com')) return 'TikTok'
  if (lower.includes('instagram.com')) return 'Instagram'
  return null
}

function extractHandle(url: string): string | null {
  try {
    const parsed = new URL(url)
    const path = parsed.pathname.replace(/^\//, '').replace(/\/$/, '')
    return path.replace(/^@/, '').replace(/^c\//, '').replace(/^channel\//, '').split('/')[0] || null
  } catch {
    return url // treat as raw handle
  }
}
