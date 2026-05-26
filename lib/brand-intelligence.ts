/**
 * Brand Intelligence Engine
 * 
 * Scrapes and aggregates brand campaign data to help Joel:
 * 1. Identify which brands are running influencer campaigns
 * 2. Find their media/creative agencies
 * 3. Understand campaign timing and seasonality
 * 4. Determine optimal outreach windows
 * 5. Match creators to brand audiences
 * 
 * Data sources:
 * - Web search (brand + "influencer campaign" + year)
 * - LinkedIn (brand marketing team, agency relationships)
 * - Customer success stories (case studies on agency sites)
 * - Social media (sponsored content tags)
 * - Press releases (campaign announcements)
 */

export interface BrandIntelligence {
  id: string
  brandName: string
  industry: string
  website: string | null

  // Agency relationships
  mediaAgency: string | null
  creativeAgency: string | null
  influencerAgency: string | null // current representation
  agencySource: string | null // where we found this info

  // Campaign history
  knownCampaigns: BrandCampaignHistory[]
  campaignSeasonality: CampaignSeason[] // when they typically run campaigns
  estimatedAnnualBudget: string | null // 'Low ($10-50K)', 'Mid ($50-200K)', 'High ($200K+)'

  // Outreach intelligence
  bestOutreachMonth: string | null // e.g. 'March' (3 months before typical Q2 campaign)
  decisionMakers: DecisionMaker[]
  previousCreators: string[] // creators they've worked with before

  // Fit assessment
  relevantPlatforms: string[] // which platforms they've used
  targetAudience: string | null
  gamingRelevance: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN'
  mobileyesFit: string | null // why we're a good match

  // Metadata
  lastResearched: string
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  notes: string | null
}

export interface BrandCampaignHistory {
  title: string
  date: string // approximate
  platform: string
  creators: string[] // known creators involved
  type: string // 'Sponsored Stream', 'Video Integration', 'Live Commerce', etc.
  source: string // where we found this info
  estimatedBudget: string | null
}

export interface CampaignSeason {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  months: string[]
  likelihood: 'HIGH' | 'MEDIUM' | 'LOW'
  reason: string // e.g. 'Game launch window', 'Holiday season', 'Back to school'
}

export interface DecisionMaker {
  name: string
  title: string
  company: string // brand or agency
  linkedInUrl: string | null
  email: string | null
}

/**
 * Research a brand — scrapes web for campaign intelligence
 * In production, this would use web search APIs + scraping
 */
export async function researchBrand(brandName: string): Promise<BrandIntelligence> {
  // This is the framework — actual implementation would use:
  // 1. Web search API (Google Custom Search or similar)
  // 2. LinkedIn API (for decision makers)
  // 3. Social media APIs (for sponsored content detection)
  
  // For now, returns structured placeholder that the UI can display
  return {
    id: `brand_${brandName.toLowerCase().replace(/\s+/g, '_')}`,
    brandName,
    industry: 'Unknown',
    website: null,
    mediaAgency: null,
    creativeAgency: null,
    influencerAgency: null,
    agencySource: null,
    knownCampaigns: [],
    campaignSeasonality: [],
    estimatedAnnualBudget: null,
    bestOutreachMonth: null,
    decisionMakers: [],
    previousCreators: [],
    relevantPlatforms: [],
    targetAudience: null,
    gamingRelevance: 'UNKNOWN',
    mobileyesFit: null,
    lastResearched: new Date().toISOString(),
    confidence: 'LOW',
    notes: `Research pending for ${brandName}. Connect web search API for auto-enrichment.`,
  }
}

/**
 * Identify campaign seasonality patterns for a brand
 * Based on historical campaign data
 */
export function analyzeCampaignSeasonality(campaigns: BrandCampaignHistory[]): CampaignSeason[] {
  if (campaigns.length === 0) return []

  const quarterCounts: Record<string, number> = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 }

  campaigns.forEach((c) => {
    const month = new Date(c.date).getMonth()
    if (month < 3) quarterCounts.Q1++
    else if (month < 6) quarterCounts.Q2++
    else if (month < 9) quarterCounts.Q3++
    else quarterCounts.Q4++
  })

  const total = campaigns.length
  const seasons: CampaignSeason[] = []

  Object.entries(quarterCounts).forEach(([quarter, count]) => {
    const ratio = count / total
    seasons.push({
      quarter: quarter as CampaignSeason['quarter'],
      months: getQuarterMonths(quarter),
      likelihood: ratio > 0.4 ? 'HIGH' : ratio > 0.2 ? 'MEDIUM' : 'LOW',
      reason: `${count} of ${total} known campaigns ran in ${quarter}`,
    })
  })

  return seasons
}

function getQuarterMonths(quarter: string): string[] {
  switch (quarter) {
    case 'Q1': return ['January', 'February', 'March']
    case 'Q2': return ['April', 'May', 'June']
    case 'Q3': return ['July', 'August', 'September']
    case 'Q4': return ['October', 'November', 'December']
    default: return []
  }
}

/**
 * Suggest optimal outreach timing
 * Rule: outreach 2-3 months before their typical campaign window
 */
export function suggestOutreachTiming(seasonality: CampaignSeason[]): string | null {
  const highLikelihood = seasonality.find((s) => s.likelihood === 'HIGH')
  if (!highLikelihood) return null

  const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  
  const campaignStartMonth = monthIndex.indexOf(highLikelihood.months[0])
  const outreachMonth = (campaignStartMonth - 2 + 12) % 12

  return `${monthIndex[outreachMonth]} (2 months before their ${highLikelihood.quarter} campaign window)`
}

/**
 * Match creators to a brand based on audience overlap and content fit
 */
export function suggestCreatorsForBrand(brand: BrandIntelligence, creators: Array<{
  id: string
  mblId: string
  fullName: string
  platform: string
  contentNiche: string[]
  audienceLocation: string
  followerCount: number
}>): Array<{
  creatorId: string
  mblId: string
  name: string
  fitReason: string
  score: number
}> {
  return creators
    .map((creator) => {
      let score = 0
      const reasons: string[] = []

      // Platform match
      if (brand.relevantPlatforms.includes(creator.platform)) {
        score += 30
        reasons.push(`Active on ${creator.platform} (brand's preferred platform)`)
      }

      // Gaming relevance
      if (brand.gamingRelevance === 'HIGH' && creator.contentNiche.includes('Gaming')) {
        score += 25
        reasons.push('Gaming content creator — high brand relevance')
      }

      // Audience size
      if (creator.followerCount > 50000) {
        score += 15
        reasons.push(`${creator.followerCount.toLocaleString()} followers`)
      }

      // Not previously used by this brand (fresh audience)
      if (!brand.previousCreators.includes(creator.fullName)) {
        score += 10
        reasons.push('Fresh audience — not previously used by this brand')
      }

      return {
        creatorId: creator.id,
        mblId: creator.mblId,
        name: creator.fullName,
        fitReason: reasons.join('. '),
        score,
      }
    })
    .filter((r) => r.score > 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}
