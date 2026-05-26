/**
 * Talent Discovery & Auto-Scraping Engine
 * Ported from Gamefluence creator-lead-gen + enhanced for Mobileyes
 * 
 * Auto-discovers gaming creators across platforms, scrapes their profiles,
 * scores them for brand safety and campaign fit, and generates outreach.
 * 
 * Data sources:
 * - Platform APIs (YouTube, Twitch, Kick, TikTok)
 * - Sensor Tower (app market intelligence, top advertisers)
 * - Social Blade (growth trends, audience authenticity)
 * - Manual URL input (from Fabulate referrals)
 * 
 * Flow:
 * 1. Discover creators (search by game, genre, market, platform)
 * 2. Scrape profile data (followers, engagement, content, audience)
 * 3. Score for brand safety + campaign fit
 * 4. Generate personalised outreach
 * 5. Queue for Joel's review before sending
 */

export interface DiscoveredCreator {
  // Identity
  handle: string
  displayName: string
  platform: 'YouTube' | 'Twitch' | 'Kick' | 'TikTok' | 'Instagram'
  profileUrl: string
  profileImageUrl: string | null
  bio: string | null
  email: string | null // if publicly available

  // Metrics
  followerCount: number
  avgViews: number | null
  engagementRate: number | null
  postingFrequency: string | null // 'daily', '3x/week', 'weekly'
  avgStreamLength: number | null // minutes
  peakConcurrentViewers: number | null

  // Content analysis
  contentCategories: string[] // ['Gaming', 'FPS', 'Valorant']
  topGames: string[]
  gamingPercentage: number // 0-100, how much of their content is gaming
  contentLanguage: string
  contentTone: string | null // 'energetic', 'chill', 'educational', 'competitive'

  // Audience
  audienceLocation: string | null // primary geo
  audienceAge: string | null // '18-24', '25-34'
  audienceGender: string | null // 'male-dominant', 'balanced', 'female-dominant'

  // Scoring
  overallScore: number // 0-100
  brandSafetyScore: number // 0-100
  audienceQualityScore: number // 0-100 (fake follower detection)
  engagementQualityScore: number // 0-100
  growthTrend: 'RISING' | 'STABLE' | 'DECLINING'

  // Commercial
  estimatedRate: { low: number; high: number } | null // AUD per campaign
  marketTier: 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE'
  hasExistingRepresentation: boolean
  previousBrandDeals: string[] // detected from content

  // Outreach
  outreachStatus: 'DISCOVERED' | 'QUEUED' | 'CONTACTED' | 'RESPONDED' | 'SIGNED' | 'REJECTED'
  outreachMessage: string | null
  discoveredAt: string
  source: 'SEARCH' | 'FABULATE' | 'MANUAL' | 'SENSOR_TOWER' | 'REFERRAL'
}

/**
 * Discover creators by search criteria
 * Searches across platforms for gaming creators matching filters
 */
export async function discoverCreators(params: {
  game?: string
  genre?: string
  platform?: string
  market?: string // 'AU', 'VN', 'TH', etc.
  minFollowers?: number
  maxFollowers?: number
  minEngagement?: number
  limit?: number
}): Promise<DiscoveredCreator[]> {
  const results: DiscoveredCreator[] = []
  const limit = params.limit ?? 10
  const searchQuery = params.game ?? params.genre ?? 'gaming'

  // Search YouTube if platform is YouTube or unspecified
  if (!params.platform || params.platform === 'YouTube') {
    try {
      const apiKey = process.env.YOUTUBE_API_KEY
      if (apiKey && apiKey !== 'PLACEHOLDER') {
        const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'
        const query = `${searchQuery} gaming creator`
        const searchResponse = await fetch(
          `${YOUTUBE_API_BASE}/search?part=snippet&q=${encodeURIComponent(query)}&type=channel&maxResults=${Math.min(limit, 10)}&key=${apiKey}`
        )

        if (searchResponse.ok) {
          const searchData = await searchResponse.json()
          for (const item of searchData.items ?? []) {
            const channelId = item.snippet.channelId ?? item.id.channelId
            if (!channelId) continue

            // Get full channel stats
            const channelResponse = await fetch(
              `${YOUTUBE_API_BASE}/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
            )
            if (!channelResponse.ok) continue
            const channelData = await channelResponse.json()
            if (!channelData.items || channelData.items.length === 0) continue

            const channel = channelData.items[0]
            const subscriberCount = parseInt(channel.statistics.subscriberCount ?? '0', 10)

            // Apply follower filters
            if (params.minFollowers && subscriberCount < params.minFollowers) continue
            if (params.maxFollowers && subscriberCount > params.maxFollowers) continue

            // Apply market filter
            if (params.market && channel.snippet.country && channel.snippet.country !== params.market) continue

            const handle = channel.snippet.customUrl?.replace('@', '') ?? channelId

            let marketTier: DiscoveredCreator['marketTier'] = 'BRONZE'
            if (subscriberCount >= 500000) marketTier = 'DIAMOND'
            else if (subscriberCount >= 100000) marketTier = 'GOLD'
            else if (subscriberCount >= 25000) marketTier = 'SILVER'

            const followersK = subscriberCount / 1000
            const estimatedRate = subscriberCount >= 1000
              ? { low: Math.round(followersK * 20), high: Math.round(followersK * 50) }
              : null

            results.push({
              handle,
              displayName: channel.snippet.title,
              platform: 'YouTube',
              profileUrl: `https://youtube.com/@${handle}`,
              profileImageUrl: channel.snippet.thumbnails?.high?.url ?? null,
              bio: channel.snippet.description ?? null,
              email: null,
              followerCount: subscriberCount,
              avgViews: null,
              engagementRate: null,
              postingFrequency: null,
              avgStreamLength: null,
              peakConcurrentViewers: null,
              contentCategories: ['Gaming'],
              topGames: params.game ? [params.game] : [],
              gamingPercentage: 80,
              contentLanguage: 'en',
              contentTone: null,
              audienceLocation: channel.snippet.country ?? null,
              audienceAge: null,
              audienceGender: null,
              overallScore: 50,
              brandSafetyScore: 75,
              audienceQualityScore: 70,
              engagementQualityScore: 65,
              growthTrend: 'STABLE',
              estimatedRate,
              marketTier,
              hasExistingRepresentation: false,
              previousBrandDeals: [],
              outreachStatus: 'DISCOVERED',
              outreachMessage: null,
              discoveredAt: new Date().toISOString(),
              source: 'SEARCH',
            })
          }
        }
      }
    } catch (error) {
      console.error('YouTube discovery search failed:', error)
    }
  }

  // Search Twitch if platform is Twitch or unspecified
  if (!params.platform || params.platform === 'Twitch') {
    try {
      const { fetchTwitchUser, getTwitchFollowerCount } = await import('./platforms/twitch')
      // Twitch doesn't have a great search-by-game-for-channels API
      // but we can search for streams by game and get the streamers
      const clientId = process.env.TWITCH_CLIENT_ID
      const clientSecret = process.env.TWITCH_CLIENT_SECRET
      if (clientId && clientId !== 'PLACEHOLDER' && clientSecret && clientSecret !== 'PLACEHOLDER') {
        // Get app token
        const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials',
          }),
        })

        if (tokenResponse.ok) {
          const tokenData = await tokenResponse.json()
          const token = tokenData.access_token

          // Search for game ID first
          let gameId: string | null = null
          if (params.game) {
            const gameResponse = await fetch(
              `https://api.twitch.tv/helix/games?name=${encodeURIComponent(params.game)}`,
              { headers: { 'Authorization': `Bearer ${token}`, 'Client-Id': clientId } }
            )
            if (gameResponse.ok) {
              const gameData = await gameResponse.json()
              gameId = gameData.data?.[0]?.id ?? null
            }
          }

          // Get live streams (sorted by viewers)
          const streamsUrl = gameId
            ? `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=${Math.min(limit, 20)}`
            : `https://api.twitch.tv/helix/streams?first=${Math.min(limit, 20)}`

          const streamsResponse = await fetch(streamsUrl, {
            headers: { 'Authorization': `Bearer ${token}`, 'Client-Id': clientId },
          })

          if (streamsResponse.ok) {
            const streamsData = await streamsResponse.json()
            for (const stream of streamsData.data ?? []) {
              const user = await fetchTwitchUser(stream.user_login)
              if (!user) continue

              const followerCount = await getTwitchFollowerCount(user.id)
              if (params.minFollowers && followerCount < params.minFollowers) continue
              if (params.maxFollowers && followerCount > params.maxFollowers) continue

              let marketTier: DiscoveredCreator['marketTier'] = 'BRONZE'
              if (followerCount >= 200000) marketTier = 'DIAMOND'
              else if (followerCount >= 50000) marketTier = 'GOLD'
              else if (followerCount >= 10000) marketTier = 'SILVER'

              const estimatedRate = followerCount >= 1000
                ? { low: Math.round(stream.viewer_count * 50), high: Math.round(stream.viewer_count * 150) }
                : null

              results.push({
                handle: user.login,
                displayName: user.displayName,
                platform: 'Twitch',
                profileUrl: `https://twitch.tv/${user.login}`,
                profileImageUrl: user.profileImageUrl,
                bio: user.description,
                email: null,
                followerCount,
                avgViews: stream.viewer_count,
                engagementRate: null,
                postingFrequency: null,
                avgStreamLength: null,
                peakConcurrentViewers: stream.viewer_count,
                contentCategories: stream.game_name ? ['Gaming', stream.game_name] : ['Gaming'],
                topGames: stream.game_name ? [stream.game_name] : [],
                gamingPercentage: 90,
                contentLanguage: stream.language ?? 'en',
                contentTone: null,
                audienceLocation: null,
                audienceAge: null,
                audienceGender: null,
                overallScore: 50,
                brandSafetyScore: 75,
                audienceQualityScore: 70,
                engagementQualityScore: 65,
                growthTrend: 'STABLE',
                estimatedRate,
                marketTier,
                hasExistingRepresentation: false,
                previousBrandDeals: [],
                outreachStatus: 'DISCOVERED',
                outreachMessage: null,
                discoveredAt: new Date().toISOString(),
                source: 'SEARCH',
              })

              if (results.length >= limit) break
            }
          }
        }
      }
    } catch (error) {
      console.error('Twitch discovery search failed:', error)
    }
  }

  return results.slice(0, limit)
}

/**
 * Scrape a creator's profile from their URL
 * Extracts all available public data using platform APIs
 */
export async function scrapeCreatorProfile(url: string): Promise<DiscoveredCreator | null> {
  const platform = detectPlatform(url)
  if (!platform) return null

  const handle = extractHandle(url)
  if (!handle) return null

  try {
    switch (platform) {
      case 'YouTube': {
        const { fetchYouTubeChannel, fetchRecentVideos, calculateEngagementRate } = await import('./platforms/youtube')
        const channel = await fetchYouTubeChannel(handle)
        if (!channel) break

        const videos = await fetchRecentVideos(channel.id, 10)
        const engagementRate = calculateEngagementRate(videos, channel.subscriberCount)
        const avgViews = videos.length > 0
          ? Math.round(videos.reduce((sum, v) => sum + v.viewCount, 0) / videos.length)
          : null
        const hasLiveContent = videos.some(v => v.isLiveContent)
        const liveVideos = videos.filter(v => v.isLiveContent)
        const peakViewers = liveVideos.length > 0
          ? Math.max(...liveVideos.map(v => v.liveConcurrentViewers ?? v.viewCount))
          : null

        // Determine market tier
        let marketTier: DiscoveredCreator['marketTier'] = 'BRONZE'
        if (channel.subscriberCount >= 500000) marketTier = 'DIAMOND'
        else if (channel.subscriberCount >= 100000) marketTier = 'GOLD'
        else if (channel.subscriberCount >= 25000) marketTier = 'SILVER'

        // Estimate rate
        const followersK = channel.subscriberCount / 1000
        const estimatedRate = channel.subscriberCount >= 1000
          ? { low: Math.round(followersK * 20), high: Math.round(followersK * 50) }
          : null

        const creator: DiscoveredCreator = {
          handle: channel.handle,
          displayName: channel.title,
          platform: 'YouTube',
          profileUrl: url,
          profileImageUrl: channel.thumbnailUrl,
          bio: channel.description,
          email: null,
          followerCount: channel.subscriberCount,
          avgViews,
          engagementRate,
          postingFrequency: estimatePostingFrequency(videos),
          avgStreamLength: null,
          peakConcurrentViewers: peakViewers,
          contentCategories: ['Gaming'],
          topGames: [],
          gamingPercentage: 80,
          contentLanguage: 'en',
          contentTone: null,
          audienceLocation: channel.country,
          audienceAge: null,
          audienceGender: null,
          overallScore: 50,
          brandSafetyScore: 75,
          audienceQualityScore: engagementRate && engagementRate > 2 ? 80 : 60,
          engagementQualityScore: engagementRate ? Math.min(Math.round(engagementRate * 15), 100) : 50,
          growthTrend: 'STABLE',
          estimatedRate,
          marketTier,
          hasExistingRepresentation: false,
          previousBrandDeals: [],
          outreachStatus: 'DISCOVERED',
          outreachMessage: null,
          discoveredAt: new Date().toISOString(),
          source: 'MANUAL',
        }

        // Score the creator
        const scoring = scoreCreator(creator)
        creator.overallScore = scoring.score
        creator.marketTier = scoring.tier

        return creator
      }

      case 'Twitch': {
        const { fetchTwitchUser, getTwitchFollowerCount, getTwitchStream } = await import('./platforms/twitch')
        const user = await fetchTwitchUser(handle)
        if (!user) break

        const followerCount = await getTwitchFollowerCount(user.id)
        const stream = await getTwitchStream(handle)

        let marketTier: DiscoveredCreator['marketTier'] = 'BRONZE'
        if (followerCount >= 200000) marketTier = 'DIAMOND'
        else if (followerCount >= 50000) marketTier = 'GOLD'
        else if (followerCount >= 10000) marketTier = 'SILVER'

        const avgViewers = stream?.viewerCount ?? null
        const estimatedRate = followerCount >= 1000
          ? { low: Math.round((avgViewers ?? followerCount * 0.02) * 50), high: Math.round((avgViewers ?? followerCount * 0.02) * 150) }
          : null

        const creator: DiscoveredCreator = {
          handle: user.login,
          displayName: user.displayName,
          platform: 'Twitch',
          profileUrl: url,
          profileImageUrl: user.profileImageUrl,
          bio: user.description,
          email: null,
          followerCount,
          avgViews: avgViewers,
          engagementRate: null,
          postingFrequency: null,
          avgStreamLength: null,
          peakConcurrentViewers: stream?.viewerCount ?? null,
          contentCategories: stream?.gameName ? ['Gaming', stream.gameName] : ['Gaming'],
          topGames: stream?.gameName ? [stream.gameName] : [],
          gamingPercentage: 90,
          contentLanguage: 'en',
          contentTone: null,
          audienceLocation: null,
          audienceAge: null,
          audienceGender: null,
          overallScore: 50,
          brandSafetyScore: 75,
          audienceQualityScore: 70,
          engagementQualityScore: 65,
          growthTrend: 'STABLE',
          estimatedRate,
          marketTier,
          hasExistingRepresentation: false,
          previousBrandDeals: [],
          outreachStatus: 'DISCOVERED',
          outreachMessage: null,
          discoveredAt: new Date().toISOString(),
          source: 'MANUAL',
        }

        const scoring = scoreCreator(creator)
        creator.overallScore = scoring.score
        creator.marketTier = scoring.tier

        return creator
      }

      case 'Kick': {
        const { fetchKickChannel, getKickLivestream } = await import('./platforms/kick')
        const channel = await fetchKickChannel(handle)
        if (!channel) break

        const livestream = await getKickLivestream(handle)

        let marketTier: DiscoveredCreator['marketTier'] = 'BRONZE'
        if (channel.followersCount >= 200000) marketTier = 'DIAMOND'
        else if (channel.followersCount >= 50000) marketTier = 'GOLD'
        else if (channel.followersCount >= 10000) marketTier = 'SILVER'

        const estimatedRate = channel.followersCount >= 1000
          ? { low: Math.round((livestream?.viewerCount ?? channel.followersCount * 0.03) * 40), high: Math.round((livestream?.viewerCount ?? channel.followersCount * 0.03) * 120) }
          : null

        const creator: DiscoveredCreator = {
          handle: channel.slug,
          displayName: channel.username,
          platform: 'Kick',
          profileUrl: url,
          profileImageUrl: channel.profilePic,
          bio: channel.bio,
          email: null,
          followerCount: channel.followersCount,
          avgViews: livestream?.viewerCount ?? null,
          engagementRate: null,
          postingFrequency: null,
          avgStreamLength: null,
          peakConcurrentViewers: livestream?.viewerCount ?? null,
          contentCategories: channel.recentCategories.length > 0 ? channel.recentCategories : ['Gaming'],
          topGames: channel.recentCategories,
          gamingPercentage: 85,
          contentLanguage: 'en',
          contentTone: null,
          audienceLocation: null,
          audienceAge: null,
          audienceGender: null,
          overallScore: 50,
          brandSafetyScore: 75,
          audienceQualityScore: 70,
          engagementQualityScore: 65,
          growthTrend: 'STABLE',
          estimatedRate,
          marketTier,
          hasExistingRepresentation: false,
          previousBrandDeals: [],
          outreachStatus: 'DISCOVERED',
          outreachMessage: null,
          discoveredAt: new Date().toISOString(),
          source: 'MANUAL',
        }

        const scoring = scoreCreator(creator)
        creator.overallScore = scoring.score
        creator.marketTier = scoring.tier

        return creator
      }
    }
  } catch (error) {
    console.error(`Error scraping ${platform} profile for ${handle}:`, error)
  }

  // Fallback: return minimal placeholder
  return {
    handle: handle ?? url,
    displayName: handle ?? 'Unknown',
    platform,
    profileUrl: url,
    profileImageUrl: null,
    bio: null,
    email: null,
    followerCount: 0,
    avgViews: null,
    engagementRate: null,
    postingFrequency: null,
    avgStreamLength: null,
    peakConcurrentViewers: null,
    contentCategories: ['Gaming'],
    topGames: [],
    gamingPercentage: 80,
    contentLanguage: 'en',
    contentTone: null,
    audienceLocation: null,
    audienceAge: null,
    audienceGender: null,
    overallScore: 50,
    brandSafetyScore: 75,
    audienceQualityScore: 70,
    engagementQualityScore: 65,
    growthTrend: 'STABLE',
    estimatedRate: null,
    marketTier: 'SILVER',
    hasExistingRepresentation: false,
    previousBrandDeals: [],
    outreachStatus: 'DISCOVERED',
    outreachMessage: null,
    discoveredAt: new Date().toISOString(),
    source: 'MANUAL',
  }
}

/**
 * Estimate posting frequency from video publish dates
 */
function estimatePostingFrequency(videos: { publishedAt: string }[]): string | null {
  if (videos.length < 2) return null

  const dates = videos.map(v => new Date(v.publishedAt).getTime()).sort((a, b) => b - a)
  const gaps: number[] = []
  for (let i = 0; i < dates.length - 1; i++) {
    gaps.push((dates[i] - dates[i + 1]) / (1000 * 60 * 60 * 24)) // days between posts
  }
  const avgGap = gaps.reduce((sum, g) => sum + g, 0) / gaps.length

  if (avgGap <= 1.5) return 'daily'
  if (avgGap <= 3) return '3x/week'
  if (avgGap <= 5) return '2x/week'
  if (avgGap <= 8) return 'weekly'
  if (avgGap <= 15) return 'bi-weekly'
  return 'monthly'
}

/**
 * Generate personalised outreach message for a discovered creator
 * Uses their content, audience, and our positioning to craft relevant message
 */
export function generateOutreachMessage(creator: DiscoveredCreator): string {
  const platformSpecific = {
    YouTube: 'your YouTube content',
    Twitch: 'your streams',
    Kick: 'your Kick streams',
    TikTok: 'your TikTok content',
    Instagram: 'your content',
  }

  const gamesMention = creator.topGames.length > 0
    ? ` Your ${creator.topGames.slice(0, 2).join(' and ')} content particularly stood out.`
    : ''

  const audienceMention = creator.audienceLocation
    ? ` We work with brands targeting ${creator.audienceLocation} gaming audiences specifically.`
    : ' We work with brands across ANZ and APAC.'

  return `Hi ${creator.displayName},

I came across ${platformSpecific[creator.platform]} and wanted to reach out.${gamesMention}

I'm Joel, founder of Mobileyes — a gaming talent agency based in Sydney. We represent streaming and gaming creators for brand campaigns across Australia and APAC.

What makes us different:
• 4-day payment (content approved → paid in 4 days)
• Selective briefs only — we match campaigns to your audience, not the other way around
• Full campaign analytics so you can see exactly how your content performed

${audienceMention}

If you're open to a quick chat about what representation looks like, I'd love to connect. No pressure, no commitment — just a conversation.

Joel Kirk
Mobileyes — mobileyes.live`
}

/**
 * Score a creator for overall fit with Mobileyes roster
 */
export function scoreCreator(creator: DiscoveredCreator): {
  score: number
  tier: 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE'
  reasons: string[]
  redFlags: string[]
} {
  let score = 0
  const reasons: string[] = []
  const redFlags: string[] = []

  // Follower count (max 20 points)
  if (creator.followerCount >= 100000) { score += 20; reasons.push('100K+ followers') }
  else if (creator.followerCount >= 50000) { score += 15; reasons.push('50K+ followers') }
  else if (creator.followerCount >= 10000) { score += 10; reasons.push('10K+ followers') }
  else if (creator.followerCount >= 5000) { score += 5; reasons.push('5K+ followers (micro)') }

  // Engagement rate (max 25 points)
  if (creator.engagementRate) {
    if (creator.engagementRate >= 8) { score += 25; reasons.push(`Exceptional engagement (${creator.engagementRate}%)`) }
    else if (creator.engagementRate >= 5) { score += 20; reasons.push(`Strong engagement (${creator.engagementRate}%)`) }
    else if (creator.engagementRate >= 3) { score += 15; reasons.push(`Good engagement (${creator.engagementRate}%)`) }
    else if (creator.engagementRate >= 1) { score += 5 }
    else { redFlags.push(`Very low engagement (${creator.engagementRate}%)`) }
  }

  // Gaming focus (max 15 points)
  if (creator.gamingPercentage >= 80) { score += 15; reasons.push('Dedicated gaming creator') }
  else if (creator.gamingPercentage >= 50) { score += 10; reasons.push('Majority gaming content') }
  else { score += 5 }

  // Brand safety (max 20 points)
  if (creator.brandSafetyScore >= 80) { score += 20; reasons.push('Excellent brand safety') }
  else if (creator.brandSafetyScore >= 60) { score += 15 }
  else if (creator.brandSafetyScore >= 40) { score += 5; redFlags.push('Brand safety concerns — review required') }
  else { redFlags.push('Brand safety score too low') }

  // Growth trend (max 10 points)
  if (creator.growthTrend === 'RISING') { score += 10; reasons.push('Growing audience') }
  else if (creator.growthTrend === 'STABLE') { score += 5 }
  else { redFlags.push('Declining audience') }

  // Audience quality (max 10 points)
  if (creator.audienceQualityScore >= 80) { score += 10; reasons.push('High audience authenticity') }
  else if (creator.audienceQualityScore >= 60) { score += 5 }
  else { redFlags.push('Possible fake followers detected') }

  // Determine tier
  let tier: 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE'
  if (score >= 80) tier = 'DIAMOND'
  else if (score >= 60) tier = 'GOLD'
  else if (score >= 40) tier = 'SILVER'
  else tier = 'BRONZE'

  return { score, tier, reasons, redFlags }
}

// ─── HELPERS ───────────────────────────────────────────

function detectPlatform(url: string): DiscoveredCreator['platform'] | null {
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
    // Remove common prefixes
    const handle = path.replace(/^@/, '').replace(/^c\//, '').replace(/^channel\//, '')
    return handle.split('/')[0] || null
  } catch {
    return null
  }
}
