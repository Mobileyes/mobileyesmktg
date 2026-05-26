/**
 * FINANCE AGENT (CFO Lens)
 * 
 * Tells Joel and the team WHERE to spend their time for maximum ROI.
 * Prioritises opportunities by expected revenue, likelihood of close,
 * and effort required.
 * 
 * Key questions this agent answers:
 * - Which brands should we outreach to THIS WEEK?
 * - Which creators are generating the most commission?
 * - Where are the recurring revenue opportunities?
 * - What's our pipeline worth and when will it convert?
 * - Which markets/categories should we invest more time in?
 */

import type { AgentInsight } from './index'

// ─── OPPORTUNITY SCORING ──────────────────────────────

export interface ScoredOpportunity {
  id: string
  type: 'BRAND_OUTREACH' | 'CREATOR_SIGN' | 'CAMPAIGN_UPSELL' | 'RENEWAL'
  name: string
  description: string

  // Financial metrics
  estimatedRevenue: number // AUD
  estimatedCommission: number // our take
  probability: number // 0-100% likelihood of closing
  expectedValue: number // revenue × probability
  timeToClose: number // estimated days

  // Effort metrics
  effortLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  hoursRequired: number
  revenuePerHour: number // expectedValue / hoursRequired

  // Timing
  urgency: 'NOW' | 'THIS_WEEK' | 'THIS_MONTH' | 'NEXT_QUARTER'
  reason: string // why this timing
  expiresAt: string | null // some opportunities are time-sensitive

  // Context
  brand: string | null
  creator: string | null
  campaign: string | null
  market: string
  category: string
}

// ─── PIPELINE ANALYTICS ───────────────────────────────

export interface PipelineMetrics {
  // Current pipeline
  totalPipelineValue: number
  weightedPipelineValue: number // adjusted for probability
  opportunityCount: number

  // By stage
  byStage: Array<{
    stage: string
    count: number
    value: number
    avgDaysInStage: number
  }>

  // By market
  byMarket: Array<{
    market: string
    value: number
    count: number
    avgDealSize: number
  }>

  // By category
  byCategory: Array<{
    category: string
    value: number
    count: number
    winRate: number
  }>

  // Forecasts
  thisMonthForecast: number
  nextMonthForecast: number
  quarterForecast: number

  // Efficiency
  avgRevenuePerCreator: number
  avgCommissionPerCampaign: number
  avgTimeToClose: number // days
  winRate: number // % of outreach that converts
}

// ─── RECURRING REVENUE DETECTION ──────────────────────

export interface RecurringOpportunity {
  brandName: string
  lastCampaignDate: string
  campaignFrequency: string // 'monthly', 'quarterly', 'biannual', 'annual'
  avgCampaignValue: number
  nextExpectedDate: string
  daysUntilOutreach: number // when to contact them
  confidence: number
  historicalCampaigns: number
}

// ─── AGENT FUNCTIONS ──────────────────────────────────

/**
 * Score and rank all current opportunities
 * Returns prioritised list of where to spend time
 */
export async function rankOpportunities(): Promise<ScoredOpportunity[]> {
  // Would pull from:
  // 1. Active brand research (brand-intelligence.ts)
  // 2. Detected sponsorships (market-intelligence.ts)
  // 3. Existing pipeline (campaigns in DRAFT/BRIEFING status)
  // 4. Creator applications pending review
  // 5. Recurring campaign patterns
  
  return []
}

/**
 * Identify recurring revenue opportunities
 * Brands that campaign regularly = predictable revenue
 */
export async function findRecurringOpportunities(): Promise<RecurringOpportunity[]> {
  // Would analyze:
  // 1. Historical campaign data (our own)
  // 2. StreamCharts sponsorship frequency per brand
  // 3. Seasonal patterns (game updates, events, holidays)
  // 4. Brand marketing calendars (if available)
  
  return []
}

/**
 * Calculate where agents should focus this week
 * Balances short-term revenue with long-term relationship building
 */
export function generateWeeklyPriorities(opportunities: ScoredOpportunity[]): {
  mustDo: ScoredOpportunity[] // highest urgency + value
  shouldDo: ScoredOpportunity[] // high value, less urgent
  couldDo: ScoredOpportunity[] // lower priority but still valuable
  totalExpectedValue: number
} {
  const sorted = [...opportunities].sort((a, b) => b.revenuePerHour - a.revenuePerHour)

  const mustDo = sorted.filter(o => o.urgency === 'NOW' || (o.urgency === 'THIS_WEEK' && o.expectedValue > 5000))
  const shouldDo = sorted.filter(o => o.urgency === 'THIS_WEEK' && o.expectedValue <= 5000)
  const couldDo = sorted.filter(o => o.urgency === 'THIS_MONTH')

  return {
    mustDo: mustDo.slice(0, 5),
    shouldDo: shouldDo.slice(0, 5),
    couldDo: couldDo.slice(0, 5),
    totalExpectedValue: sorted.reduce((sum, o) => sum + o.expectedValue, 0),
  }
}

/**
 * Generate financial insights for the dashboard
 */
export async function generateFinanceInsights(): Promise<AgentInsight[]> {
  const insights: AgentInsight[] = []

  // Would generate insights like:
  // "Brand X ran 4 campaigns last year, next one expected in 6 weeks — outreach now"
  // "Creator Y is generating 3x avg commission — consider similar profile recruitment"
  // "APAC market growing 40% YoY — increase creator recruitment in VN/TH"
  // "Q4 campaign window opening in 8 weeks — 12 brands in pipeline need outreach"

  return insights
}

/**
 * Calculate the value of adding a new creator to the roster
 * Used to prioritise creator recruitment
 */
export function calculateCreatorValue(params: {
  followers: number
  engagementRate: number
  platform: string
  market: string
  contentNiche: string
  estimatedCampaignsPerYear: number
}): {
  estimatedAnnualRevenue: number
  estimatedAnnualCommission: number
  paybackPeriod: string // how quickly they generate revenue
  rosterGap: boolean // do we need this type of creator?
} {
  // Base rate calculation
  const baseRatePerCampaign = (params.followers / 1000) * 8 * (params.engagementRate > 5 ? 1.5 : 1)
  const annualRevenue = baseRatePerCampaign * params.estimatedCampaignsPerYear
  const annualCommission = annualRevenue * 0.25

  return {
    estimatedAnnualRevenue: Math.round(annualRevenue),
    estimatedAnnualCommission: Math.round(annualCommission),
    paybackPeriod: annualCommission > 5000 ? '1-2 months' : annualCommission > 2000 ? '3-4 months' : '6+ months',
    rosterGap: true, // would check against current roster composition
  }
}
