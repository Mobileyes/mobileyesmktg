import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import {
  TOP_SPENDING_BRANDS,
  PLATFORM_TRENDS,
  CAMPAIGN_TYPE_TRENDS,
  SEASONAL_PATTERNS,
  GAMING_INFLUENCER_MARKET,
  getYouTubeTrendingGaming,
  getTwitchTopGames,
} from '@/lib/market-trends'

// GET /api/admin/trends — market trends data
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section') // 'live' for real-time data

    if (section === 'live') {
      // Fetch live data from YouTube + Twitch
      const [youtubeTrending, twitchTopGames] = await Promise.all([
        getYouTubeTrendingGaming(),
        getTwitchTopGames(),
      ])

      return NextResponse.json({ youtubeTrending, twitchTopGames })
    }

    // Return all static + benchmark data
    return NextResponse.json({
      market: GAMING_INFLUENCER_MARKET,
      topSpenders: TOP_SPENDING_BRANDS,
      platforms: PLATFORM_TRENDS,
      campaignTypes: CAMPAIGN_TYPE_TRENDS,
      seasonalPatterns: SEASONAL_PATTERNS,
    })
  } catch (err) {
    console.error('Trends API error:', err)
    return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 })
  }
}
