/**
 * Fabulate Integration
 * 
 * Recognises inbound emails from Fabulate (Nath/Lisa) and triggers
 * creator research + brief generation workflow.
 * 
 * Flow:
 * 1. Email arrives from @fabulate.com.au domain
 * 2. System flags it as FABULATE source
 * 3. Extracts creator handles/names from email body
 * 4. Runs creator research (public data scraping)
 * 5. Generates a pre-outreach creator dossier
 * 6. Presents in admin with pricing recommendations
 */

// Known Fabulate contacts
export const FABULATE_CONTACTS = [
  { name: 'Nath', email: 'nath@fabulate.com.au' },
  { name: 'Lisa', email: 'lisa@fabulate.com.au' },
  // Add more as needed
]

export const FABULATE_DOMAIN = 'fabulate.com.au'

/**
 * Check if an email is from Fabulate
 */
export function isFabulateEmail(from: string): boolean {
  const emailLower = from.toLowerCase()
  return emailLower.includes(FABULATE_DOMAIN)
}

/**
 * Extract creator handles from email body
 * Looks for common patterns: @handle, tiktok.com/@handle, youtube.com/@handle, twitch.tv/handle
 */
export function extractCreatorHandles(body: string): CreatorHandle[] {
  const handles: CreatorHandle[] = []

  // TikTok handles
  const tiktokRegex = /(?:tiktok\.com\/@|@)([\w.]+)/gi
  let match
  while ((match = tiktokRegex.exec(body)) !== null) {
    handles.push({ platform: 'TikTok', handle: match[1], url: `https://tiktok.com/@${match[1]}` })
  }

  // YouTube handles
  const youtubeRegex = /(?:youtube\.com\/@|youtube\.com\/channel\/)([\w-]+)/gi
  while ((match = youtubeRegex.exec(body)) !== null) {
    handles.push({ platform: 'YouTube', handle: match[1], url: `https://youtube.com/@${match[1]}` })
  }

  // Twitch handles
  const twitchRegex = /(?:twitch\.tv\/)([\w]+)/gi
  while ((match = twitchRegex.exec(body)) !== null) {
    handles.push({ platform: 'Twitch', handle: match[1], url: `https://twitch.tv/${match[1]}` })
  }

  // Kick handles
  const kickRegex = /(?:kick\.com\/)([\w]+)/gi
  while ((match = kickRegex.exec(body)) !== null) {
    handles.push({ platform: 'Kick', handle: match[1], url: `https://kick.com/${match[1]}` })
  }

  // Instagram handles
  const instaRegex = /(?:instagram\.com\/)([\w.]+)/gi
  while ((match = instaRegex.exec(body)) !== null) {
    handles.push({ platform: 'Instagram', handle: match[1], url: `https://instagram.com/${match[1]}` })
  }

  return handles
}

export type CreatorHandle = {
  platform: string
  handle: string
  url: string
}

export type CreatorResearchData = {
  handle: CreatorHandle
  followerCount: number | null
  avgViews: number | null
  engagementRate: number | null
  audienceLocation: string | null
  contentNiche: string[]
  recentBrandDeals: string[]
  estimatedRate: RateEstimate | null
  notes: string
}

export type RateEstimate = {
  low: number
  mid: number
  high: number
  currency: string
  basis: string // e.g. 'per video', 'per stream hour', 'per post'
}

/**
 * Research a creator based on their handle
 * In production, this would call social media APIs or scraping services.
 * For now, it structures the data model and provides a framework for enrichment.
 */
export async function researchCreator(handle: CreatorHandle): Promise<CreatorResearchData> {
  // This is the framework — actual API integrations would go here:
  // - TikTok: TikTok Research API or third-party (Modash, HypeAuditor)
  // - YouTube: YouTube Data API v3 (free tier)
  // - Twitch: Twitch Helix API
  // - Instagram: Instagram Graph API or third-party
  
  // For now, return a structured placeholder that the admin UI can display
  return {
    handle,
    followerCount: null,
    avgViews: null,
    engagementRate: null,
    audienceLocation: null,
    contentNiche: [],
    recentBrandDeals: [],
    estimatedRate: null,
    notes: `Research pending for ${handle.platform} creator @${handle.handle}. Connect platform APIs for auto-enrichment.`,
  }
}

/**
 * Generate a pre-outreach creator dossier
 * This is what Joel sees before reaching out to the creator
 */
export function generateCreatorDossier(
  research: CreatorResearchData,
  campaignContext?: {
    clientName: string
    objective: string
    budget: string
    markets: string[]
  }
): CreatorDossier {
  const rateRecommendation = research.estimatedRate
    ? `Estimated rate: $${research.estimatedRate.low}–$${research.estimatedRate.high} AUD ${research.estimatedRate.basis}`
    : 'Rate data unavailable — manual research required'

  const fitScore = calculateFitScore(research, campaignContext)

  return {
    creator: research,
    rateRecommendation,
    fitScore,
    outreachReady: research.followerCount !== null,
    suggestedFee: research.estimatedRate?.mid ?? null,
    briefingNotes: generateBriefingNotes(research, campaignContext),
    redFlags: identifyRedFlags(research),
  }
}

export type CreatorDossier = {
  creator: CreatorResearchData
  rateRecommendation: string
  fitScore: number // 0-100
  outreachReady: boolean
  suggestedFee: number | null
  briefingNotes: string[]
  redFlags: string[]
}

/**
 * Calculate how well a creator fits a campaign
 */
function calculateFitScore(
  research: CreatorResearchData,
  campaignContext?: {
    clientName: string
    objective: string
    budget: string
    markets: string[]
  }
): number {
  if (!campaignContext) return 50 // neutral if no campaign context

  let score = 50

  // Audience location match
  if (
    research.audienceLocation &&
    campaignContext.markets.some((m) =>
      research.audienceLocation!.toLowerCase().includes(m.toLowerCase())
    )
  ) {
    score += 20
  }

  // Has engagement data
  if (research.engagementRate && research.engagementRate > 3) {
    score += 15
  }

  // Has follower data
  if (research.followerCount && research.followerCount > 10000) {
    score += 10
  }

  // Content niche relevance (gaming = always relevant for Mobileyes)
  if (
    research.contentNiche.some((n) =>
      ['gaming', 'streaming', 'esports', 'live'].includes(n.toLowerCase())
    )
  ) {
    score += 15
  }

  return Math.min(score, 100)
}

/**
 * Generate briefing notes for Joel before outreach
 */
function generateBriefingNotes(
  research: CreatorResearchData,
  campaignContext?: {
    clientName: string
    objective: string
    budget: string
    markets: string[]
  }
): string[] {
  const notes: string[] = []

  if (research.followerCount) {
    notes.push(`Follower count: ${research.followerCount.toLocaleString()}`)
  }
  if (research.avgViews) {
    notes.push(`Average views: ${research.avgViews.toLocaleString()}`)
  }
  if (research.engagementRate) {
    notes.push(`Engagement rate: ${research.engagementRate.toFixed(1)}%`)
  }
  if (research.audienceLocation) {
    notes.push(`Primary audience: ${research.audienceLocation}`)
  }
  if (research.contentNiche.length > 0) {
    notes.push(`Content niche: ${research.contentNiche.join(', ')}`)
  }
  if (research.recentBrandDeals.length > 0) {
    notes.push(`Recent brand deals: ${research.recentBrandDeals.join(', ')}`)
  }
  if (research.estimatedRate) {
    notes.push(
      `Rate estimate: $${research.estimatedRate.low}–$${research.estimatedRate.high} AUD ${research.estimatedRate.basis}`
    )
  }

  if (campaignContext) {
    notes.push(`Campaign: ${campaignContext.clientName} — ${campaignContext.objective}`)
    notes.push(`Budget: ${campaignContext.budget}`)
  }

  return notes
}

/**
 * Identify potential red flags before outreach
 */
function identifyRedFlags(research: CreatorResearchData): string[] {
  const flags: string[] = []

  if (research.engagementRate && research.engagementRate < 1) {
    flags.push('Low engagement rate (<1%) — possible bot followers')
  }
  if (research.followerCount && research.avgViews) {
    const viewRate = research.avgViews / research.followerCount
    if (viewRate < 0.01) {
      flags.push('Very low view-to-follower ratio — audience may be inactive')
    }
  }

  return flags
}
