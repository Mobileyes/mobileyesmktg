import { NextResponse } from 'next/server'
import { fetchYouTubeChannel, fetchRecentVideos, calculateEngagementRate } from '@/lib/platforms/youtube'
import { fetchTwitchUser, getTwitchFollowerCount } from '@/lib/platforms/twitch'
import { fetchKickChannel } from '@/lib/platforms/kick'

// POST /api/public/creator-capture — quick lead capture + auto-research
// Used from mobileyes.live/creator (mobile lead capture at events)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, url, notes, context } = body

    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 })
    }

    // Detect platform from URL
    const platform = detectPlatform(url)
    const handle = extractHandle(url)

    if (!platform || !handle) {
      return NextResponse.json({ error: 'Could not detect platform from URL' }, { status: 400 })
    }

    let result: any = {
      handle,
      platform,
      displayName: name || handle,
      followerCount: null,
      engagementRate: null,
      avgViews: null,
      scraped: false,
      context,
      notes,
      capturedAt: new Date().toISOString(),
    }

    // Auto-scrape based on platform
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
            ...result,
            displayName: channel.title,
            followerCount: channel.subscriberCount,
            engagementRate,
            avgViews,
            totalViews: channel.viewCount,
            videoCount: channel.videoCount,
            country: channel.country,
            hasLiveContent: videos.some(v => v.isLiveContent),
            recentVideos: videos.slice(0, 3).map(v => v.title),
            scraped: true,
          }
        }
        break
      }

      case 'Twitch': {
        const user = await fetchTwitchUser(handle)
        if (user) {
          const followerCount = await getTwitchFollowerCount(user.id)
          result = {
            ...result,
            displayName: user.displayName,
            followerCount,
            broadcasterType: user.broadcasterType,
            scraped: true,
          }
        }
        break
      }

      case 'Kick': {
        const channel = await fetchKickChannel(handle)
        if (channel) {
          result = {
            ...result,
            displayName: channel.username,
            followerCount: channel.followersCount,
            verified: channel.verified,
            recentCategories: channel.recentCategories,
            scraped: true,
          }
        }
        break
      }

      case 'TikTok': {
        // TikTok doesn't have a public API we can scrape without auth
        // Store the lead and flag for manual research
        result = {
          ...result,
          displayName: name || handle,
          scraped: false,
          researchNote: 'TikTok requires manual research or Research API access. Lead captured for follow-up.',
        }
        break
      }

      case 'Instagram': {
        result = {
          ...result,
          displayName: name || handle,
          scraped: false,
          researchNote: 'Instagram requires Graph API access. Lead captured for follow-up.',
        }
        break
      }
    }

    // Determine creator tier based on followers
    if (result.followerCount) {
      if (result.followerCount >= 500000) result.tier = 'DIAMOND'
      else if (result.followerCount >= 100000) result.tier = 'GOLD'
      else if (result.followerCount >= 25000) result.tier = 'SILVER'
      else if (result.followerCount >= 5000) result.tier = 'BRONZE'
      else result.tier = 'MICRO'
    }

    // TODO: Save to Firestore as CreatorDossier when db is connected
    // For now, return the scraped data immediately

    return NextResponse.json(result)
  } catch (err) {
    console.error('Creator capture error:', err)
    return NextResponse.json({ error: 'Capture failed' }, { status: 500 })
  }
}

function detectPlatform(url: string): string | null {
  const lower = url.toLowerCase()
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube'
  if (lower.includes('twitch.tv')) return 'Twitch'
  if (lower.includes('kick.com')) return 'Kick'
  if (lower.includes('tiktok.com')) return 'TikTok'
  if (lower.includes('instagram.com')) return 'Instagram'
  // Handle bare handles — assume YouTube if no platform detected
  if (!lower.includes('.') && !lower.includes('/')) return 'YouTube'
  return null
}

function extractHandle(url: string): string | null {
  try {
    // If it's just a handle without a URL
    if (!url.includes('/') && !url.includes('.')) return url.replace('@', '')

    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`)
    const path = parsed.pathname.replace(/^\//, '').replace(/\/$/, '')
    return path.replace(/^@/, '').replace(/^c\//, '').replace(/^channel\//, '').split('/')[0] || null
  } catch {
    return url.replace('@', '')
  }
}
