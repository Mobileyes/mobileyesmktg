/**
 * Market Trends Engine
 * 
 * Aggregates data on where money is flowing in gaming influencer marketing.
 * Tracks top spending brands, campaign types, platform splits, and seasonal patterns.
 * 
 * Data sources:
 * - Internal campaign data (our own Firestore campaigns)
 * - YouTube trending gaming content (YouTube Data API)
 * - Twitch top categories and streams (Twitch Helix API)
 * - Industry benchmarks (hardcoded from industry reports, updated quarterly)
 */

export interface MarketTrend {
  id: string
  category: string // 'BRAND_SPEND' | 'PLATFORM_GROWTH' | 'CAMPAIGN_TYPE' | 'MARKET_SIZE'
  title: string
  value: string
  change: number // percentage change
  changeDirection: 'UP' | 'DOWN' | 'STABLE'
  period: string // 'Q2 2026', 'May 2026'
  source: string
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface TopSpender {
  rank: number
  brand: string
  industry: string
  estimatedSpend: string // '$500K-$1M'
  platforms: string[] // ['YouTube', 'Twitch']
  campaignTypes: string[] // ['Sponsored Stream', 'Video Integration']
  markets: string[] // ['Global', 'APAC']
  frequency: string // 'Monthly', 'Quarterly'
  opportunity: string // why Mobileyes should target them
}

export interface PlatformTrend {
  platform: string
  monthlyActiveCreators: number
  avgCPM: number // cost per mille (1000 views)
  avgSponsorshipRate: string // '$500-$2000 per stream hour'
  growthRate: number // % YoY
  topCategories: string[]
  bestFor: string // 'Live engagement', 'VOD reach'
  mobileyesOpportunity: string
}

export interface CampaignTypeTrend {
  type: string
  marketShare: number // % of total influencer spend
  avgBudget: string
  avgROAS: string
  growthRate: number
  bestPlatforms: string[]
  description: string
}

export interface SeasonalPattern {
  month: string
  monthIndex: number
  spendLevel: 'PEAK' | 'HIGH' | 'MEDIUM' | 'LOW'
  drivers: string[] // what drives spend this month
  opportunities: string[]
}

// ─── INDUSTRY BENCHMARKS (Updated Q2 2026) ────────────

export const GAMING_INFLUENCER_MARKET = {
  globalMarketSize: '$4.8B',
  apacMarketSize: '$1.2B',
  australiaMarketSize: '$180M',
  yoyGrowth: 28,
  avgCampaignBudget: '$15,000-$50,000',
  avgCreatorRate: {
    youtube: { micro: '$500-$2,000', mid: '$2,000-$10,000', macro: '$10,000-$50,000' },
    twitch: { micro: '$200-$1,000/hr', mid: '$1,000-$5,000/hr', macro: '$5,000-$20,000/hr' },
    kick: { micro: '$150-$800/hr', mid: '$800-$3,000/hr', macro: '$3,000-$15,000/hr' },
    tiktok: { micro: '$300-$1,500', mid: '$1,500-$8,000', macro: '$8,000-$40,000' },
  },
}

export const TOP_SPENDING_BRANDS: TopSpender[] = [
  {
    rank: 1,
    brand: 'Scopely (Monopoly GO)',
    industry: 'Mobile Gaming',
    estimatedSpend: '$50M+',
    platforms: ['YouTube', 'TikTok', 'Twitch'],
    campaignTypes: ['Sponsored Video', 'Live Stream', 'Short-form'],
    markets: ['Global'],
    frequency: 'Continuous',
    opportunity: 'Massive budget, always looking for new creators. APAC expansion underway.',
  },
  {
    rank: 2,
    brand: 'Supercell (Squad Busters / Brawl Stars)',
    industry: 'Mobile Gaming',
    estimatedSpend: '$30M+',
    platforms: ['YouTube', 'TikTok'],
    campaignTypes: ['Sponsored Video', 'Challenge/UGC'],
    markets: ['Global'],
    frequency: 'Around updates/launches',
    opportunity: 'Strong in ANZ market. New game launches = big campaign windows.',
  },
  {
    rank: 3,
    brand: 'miHoYo (Genshin Impact / Honkai)',
    industry: 'Mobile/PC Gaming',
    estimatedSpend: '$25M+',
    platforms: ['YouTube', 'Twitch', 'TikTok'],
    campaignTypes: ['Sponsored Stream', 'Video Integration', 'Event Coverage'],
    markets: ['Global', 'APAC'],
    frequency: 'Every major update (6-week cycle)',
    opportunity: 'Huge APAC presence. Regular campaign cadence = predictable revenue.',
  },
  {
    rank: 4,
    brand: 'Riot Games (Valorant / LoL)',
    industry: 'PC Gaming / Esports',
    estimatedSpend: '$20M+',
    platforms: ['Twitch', 'YouTube'],
    campaignTypes: ['Sponsored Stream', 'Tournament Coverage', 'Skin Reveals'],
    markets: ['Global', 'APAC'],
    frequency: 'Seasonal (Acts/Patches)',
    opportunity: 'Strong esports angle. ANZ Valorant scene growing rapidly.',
  },
  {
    rank: 5,
    brand: 'Epic Games (Fortnite)',
    industry: 'PC/Console Gaming',
    estimatedSpend: '$20M+',
    platforms: ['YouTube', 'Twitch', 'TikTok'],
    campaignTypes: ['Sponsored Stream', 'Event Coverage', 'Creator Codes'],
    markets: ['Global'],
    frequency: 'Seasonal + Events',
    opportunity: 'Creator code program = easy entry. Season launches are key windows.',
  },
  {
    rank: 6,
    brand: 'Krafton (PUBG Mobile)',
    industry: 'Mobile Gaming',
    estimatedSpend: '$15M+',
    platforms: ['YouTube', 'TikTok'],
    campaignTypes: ['Sponsored Video', 'Tournament', 'Live Stream'],
    markets: ['APAC', 'SEA'],
    frequency: 'Monthly updates',
    opportunity: 'Dominant in SEA/Vietnam. Perfect for our APAC creators.',
  },
  {
    rank: 7,
    brand: 'Garena (Free Fire)',
    industry: 'Mobile Gaming',
    estimatedSpend: '$12M+',
    platforms: ['YouTube', 'TikTok'],
    campaignTypes: ['Sponsored Video', 'Live Stream', 'UGC'],
    markets: ['SEA', 'LATAM', 'APAC'],
    frequency: 'Bi-weekly',
    opportunity: 'Massive in Vietnam/Thailand. High volume, lower CPM but consistent.',
  },
  {
    rank: 8,
    brand: 'Activision (Call of Duty Mobile)',
    industry: 'Mobile/Console Gaming',
    estimatedSpend: '$10M+',
    platforms: ['YouTube', 'Twitch', 'TikTok'],
    campaignTypes: ['Sponsored Stream', 'Video Integration', 'Season Launch'],
    markets: ['Global'],
    frequency: 'Seasonal',
    opportunity: 'Season launches every 6 weeks. FPS creators are our strongest vertical.',
  },
  {
    rank: 9,
    brand: 'NetEase (Marvel Rivals / Naraka)',
    industry: 'PC/Mobile Gaming',
    estimatedSpend: '$8M+',
    platforms: ['YouTube', 'Twitch'],
    campaignTypes: ['Sponsored Stream', 'Early Access', 'Review'],
    markets: ['Global', 'APAC'],
    frequency: 'Around launches/updates',
    opportunity: 'Aggressive marketing spend. New titles launching regularly.',
  },
  {
    rank: 10,
    brand: 'Level Infinite (PUBG PC / Arena Breakout)',
    industry: 'PC/Mobile Gaming',
    estimatedSpend: '$8M+',
    platforms: ['YouTube', 'Twitch'],
    campaignTypes: ['Sponsored Stream', 'Early Access'],
    markets: ['Global'],
    frequency: 'Launch windows',
    opportunity: 'Tencent-backed. Big budgets for new title launches.',
  },
]

export const PLATFORM_TRENDS: PlatformTrend[] = [
  {
    platform: 'YouTube',
    monthlyActiveCreators: 2400000,
    avgCPM: 12.5,
    avgSponsorshipRate: '$2,000-$15,000 per video',
    growthRate: 15,
    topCategories: ['Gaming', 'Let\'s Play', 'Reviews', 'Shorts'],
    bestFor: 'VOD reach, evergreen content, SEO discovery',
    mobileyesOpportunity: 'Highest CPM, best for performance campaigns with trackable links',
  },
  {
    platform: 'Twitch',
    monthlyActiveCreators: 350000,
    avgCPM: 8.5,
    avgSponsorshipRate: '$500-$5,000 per stream hour',
    growthRate: -5,
    topCategories: ['Just Chatting', 'Valorant', 'Fortnite', 'League of Legends'],
    bestFor: 'Live engagement, real-time interaction, community building',
    mobileyesOpportunity: 'Declining slightly but still dominant for live. Lower rates = better margins.',
  },
  {
    platform: 'Kick',
    monthlyActiveCreators: 45000,
    avgCPM: 6.0,
    avgSponsorshipRate: '$300-$3,000 per stream hour',
    growthRate: 85,
    topCategories: ['Slots', 'Gaming', 'Just Chatting', 'IRL'],
    bestFor: 'Younger audience, less saturated, higher engagement rates',
    mobileyesOpportunity: 'Fastest growing. Early mover advantage. Brands starting to explore.',
  },
  {
    platform: 'TikTok',
    monthlyActiveCreators: 5000000,
    avgCPM: 10.0,
    avgSponsorshipRate: '$500-$8,000 per video',
    growthRate: 25,
    topCategories: ['Gaming Clips', 'Reviews', 'Challenges', 'Tutorials'],
    bestFor: 'Viral reach, younger demographics, short-form discovery',
    mobileyesOpportunity: 'Massive reach but harder to attribute. Best for awareness campaigns.',
  },
]

export const CAMPAIGN_TYPE_TRENDS: CampaignTypeTrend[] = [
  {
    type: 'Sponsored Live Stream',
    marketShare: 35,
    avgBudget: '$5,000-$25,000',
    avgROAS: '3.2x',
    growthRate: 20,
    bestPlatforms: ['Twitch', 'YouTube', 'Kick'],
    description: 'Creator plays/showcases game live with sponsored segment. Highest engagement.',
  },
  {
    type: 'Dedicated Video',
    marketShare: 25,
    avgBudget: '$3,000-$50,000',
    avgROAS: '4.1x',
    growthRate: 10,
    bestPlatforms: ['YouTube'],
    description: 'Full video dedicated to the game/product. Best for SEO and evergreen reach.',
  },
  {
    type: 'Video Integration',
    marketShare: 20,
    avgBudget: '$1,500-$15,000',
    avgROAS: '2.8x',
    growthRate: 5,
    bestPlatforms: ['YouTube'],
    description: '30-90 second sponsored segment within existing content. Cost-effective.',
  },
  {
    type: 'Short-form / UGC',
    marketShare: 12,
    avgBudget: '$500-$5,000',
    avgROAS: '2.1x',
    growthRate: 45,
    bestPlatforms: ['TikTok', 'YouTube Shorts', 'Instagram Reels'],
    description: 'Short clips, challenges, trends. Fastest growing format. Volume play.',
  },
  {
    type: 'Performance / CPI',
    marketShare: 8,
    avgBudget: '$10,000-$100,000',
    avgROAS: '5.5x',
    growthRate: 30,
    bestPlatforms: ['YouTube', 'TikTok'],
    description: 'Pay-per-install model. Highest ROI but requires attribution setup (AppsFlyer/Adjust).',
  },
]

export const SEASONAL_PATTERNS: SeasonalPattern[] = [
  { month: 'January', monthIndex: 0, spendLevel: 'LOW', drivers: ['Post-holiday cooldown', 'Budget planning'], opportunities: ['Lock in Q1 contracts early', 'Pitch annual deals'] },
  { month: 'February', monthIndex: 1, spendLevel: 'MEDIUM', drivers: ['New game announcements', 'Valentine\'s events'], opportunities: ['Mobile game Valentine events', 'Pre-GDC outreach'] },
  { month: 'March', monthIndex: 2, spendLevel: 'HIGH', drivers: ['GDC announcements', 'Q1 game launches', 'End of fiscal year (JP)'], opportunities: ['GDC game reveals = immediate campaigns', 'Japanese publishers spending before FY end'] },
  { month: 'April', monthIndex: 3, spendLevel: 'MEDIUM', drivers: ['Spring updates', 'Battle pass seasons'], opportunities: ['Season launch campaigns', 'Mid-tier brand outreach'] },
  { month: 'May', monthIndex: 4, spendLevel: 'HIGH', drivers: ['Summer Game Fest prep', 'E3 era announcements'], opportunities: ['Pre-summer campaign bookings', 'Event coverage deals'] },
  { month: 'June', monthIndex: 5, spendLevel: 'PEAK', drivers: ['Summer Game Fest', 'Xbox Showcase', 'Major game reveals'], opportunities: ['PEAK SEASON: Every publisher spending', 'Event coverage + first-look campaigns'] },
  { month: 'July', monthIndex: 6, spendLevel: 'HIGH', drivers: ['Summer sales', 'Mid-year game launches'], opportunities: ['Steam Summer Sale tie-ins', 'Back-to-school mobile campaigns (APAC)'] },
  { month: 'August', monthIndex: 7, spendLevel: 'HIGH', drivers: ['Gamescom', 'Pre-holiday game reveals'], opportunities: ['Gamescom coverage', 'Holiday season campaign planning starts'] },
  { month: 'September', monthIndex: 8, spendLevel: 'PEAK', drivers: ['Major AAA launches', 'Tokyo Game Show', 'Holiday campaign kickoff'], opportunities: ['PEAK SEASON: AAA launches + holiday prep', 'TGS coverage for APAC brands'] },
  { month: 'October', monthIndex: 9, spendLevel: 'PEAK', drivers: ['AAA launch window', 'Halloween events', 'Holiday pre-orders'], opportunities: ['PEAK SEASON: Biggest launch month', 'Halloween gaming events'] },
  { month: 'November', monthIndex: 10, spendLevel: 'HIGH', drivers: ['Black Friday', 'Holiday shopping', 'Game Awards prep'], opportunities: ['Black Friday/Cyber Monday campaigns', 'Gift guide content'] },
  { month: 'December', monthIndex: 11, spendLevel: 'MEDIUM', drivers: ['Game Awards', 'Holiday content', 'Year-end wrap-ups'], opportunities: ['Game Awards coverage', 'Year-in-review content', 'Lock in January contracts'] },
]

// ─── LIVE DATA FUNCTIONS ──────────────────────────────

/**
 * Get trending gaming categories from YouTube
 */
export async function getYouTubeTrendingGaming(): Promise<Array<{ title: string; viewCount: number; channelTitle: string }>> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey || apiKey === 'PLACEHOLDER') return []

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&videoCategoryId=20&regionCode=AU&maxResults=10&key=${apiKey}`
    )
    if (!response.ok) return []
    const data = await response.json()

    return (data.items ?? []).map((item: any) => ({
      title: item.snippet.title,
      viewCount: parseInt(item.statistics.viewCount ?? '0', 10),
      channelTitle: item.snippet.channelTitle,
    }))
  } catch {
    return []
  }
}

/**
 * Get top Twitch categories (games being streamed right now)
 */
export async function getTwitchTopGames(): Promise<Array<{ name: string; viewers: number }>> {
  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET
  if (!clientId || clientId === 'PLACEHOLDER' || !clientSecret) return []

  try {
    // Get token
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: 'client_credentials' }),
    })
    if (!tokenResponse.ok) return []
    const { access_token } = await tokenResponse.json()

    // Get top games
    const gamesResponse = await fetch('https://api.twitch.tv/helix/games/top?first=15', {
      headers: { 'Authorization': `Bearer ${access_token}`, 'Client-Id': clientId },
    })
    if (!gamesResponse.ok) return []
    const gamesData = await gamesResponse.json()

    // Get viewer counts via streams
    const results: Array<{ name: string; viewers: number }> = []
    for (const game of gamesData.data ?? []) {
      const streamsResponse = await fetch(
        `https://api.twitch.tv/helix/streams?game_id=${game.id}&first=1`,
        { headers: { 'Authorization': `Bearer ${access_token}`, 'Client-Id': clientId } }
      )
      if (streamsResponse.ok) {
        const streamsData = await streamsResponse.json()
        const totalViewers = streamsData.data?.reduce((sum: number, s: any) => sum + (s.viewer_count ?? 0), 0) ?? 0
        results.push({ name: game.name, viewers: totalViewers })
      }
    }

    return results
  } catch {
    return []
  }
}
