/**
 * PERFORMANCE ENGINE
 * 
 * The core of what makes Gamefluence + Mobileyes valuable:
 * Tracking which creators ACTUALLY drive conversions, revenue, and ROI.
 * 
 * This engine ingests conversion data from multiple sources and builds
 * a performance leaderboard that informs:
 * - Which creators to book for performance campaigns
 * - What rates are justified by actual results
 * - Where to increase/decrease spend
 * - Which markets and platforms deliver best ROAS
 * 
 * Data sources for conversion tracking:
 * - AppsFlyer postbacks (app installs, in-app events, revenue)
 * - Google Ads conversion pixel (web conversions)
 * - Facebook/Meta CAPI (server-side conversions)
 * - Shopify/ecommerce webhooks (purchases via promo codes)
 * - Brand-provided conversion data (manual upload)
 * - UTM-attributed conversions (from our own tracking)
 */

// ─── CONVERSION DATA INGESTION ────────────────────────

export interface ConversionEvent {
  id: string
  // Attribution
  campaignId: string // MBL-CAMP-XXXXX
  creatorId: string // MBL-CR-XXXXX
  creatorHandle: string
  platform: string

  // Event details
  eventType: 'INSTALL' | 'PURCHASE' | 'SIGNUP' | 'LEAD' | 'CUSTOM'
  eventName: string // e.g. 'app_install', 'purchase', 'level_10', 'subscription'
  eventValue: number | null // revenue in AUD
  currency: string

  // Attribution source
  attributionSource: 'APPSFLYER' | 'GOOGLE_ADS' | 'META_CAPI' | 'SHOPIFY' | 'UTM' | 'PROMO_CODE' | 'MANUAL'
  attributionWindow: string // '7d_click', '1d_view', '28d_click'

  // Context
  market: string // country code
  deviceType: string | null // 'ios', 'android', 'web'
  timestamp: string

  // Validation
  isFraud: boolean
  fraudReason: string | null
  isValidated: boolean
}

// ─── CREATOR PERFORMANCE LEADERBOARD ──────────────────

export interface CreatorPerformanceCard {
  creatorId: string
  creatorHandle: string
  mblId: string
  platform: string
  market: string

  // Volume metrics
  totalCampaigns: number
  totalImpressions: number
  totalClicks: number
  totalInstalls: number
  totalPurchases: number
  totalRevenue: number // AUD generated for brands

  // Efficiency metrics
  avgCPI: number | null // cost per install
  avgCPA: number | null // cost per acquisition/purchase
  avgCPC: number | null // cost per click
  avgROAS: number | null // return on ad spend
  avgCTR: number | null // click-through rate
  conversionRate: number | null // clicks → conversions

  // Financial metrics (Mobileyes perspective)
  totalCreatorFees: number // what we paid the creator
  totalBrandRevenue: number // what brands paid us
  totalCommission: number // our margin
  marginPercentage: number // commission / brand revenue
  yieldPerCampaign: number // avg commission per campaign
  lifetimeValue: number // total commission generated

  // Ranking
  overallRank: number
  rankByROAS: number
  rankByVolume: number
  rankByMargin: number
  tier: 'S' | 'A' | 'B' | 'C' | 'D' // performance tier

  // Trends
  performanceTrend: 'IMPROVING' | 'STABLE' | 'DECLINING'
  lastCampaignDate: string
  avgTimeBetweenCampaigns: number // days
}

// ─── CAMPAIGN PERFORMANCE COMPARISON ──────────────────

export interface CampaignPerformanceReport {
  campaignId: string
  mblId: string
  brandName: string
  objective: string

  // Spend
  totalBudget: number
  totalCreatorFees: number
  mobileyesCommission: number
  costPerCreator: number

  // Results
  totalReach: number
  totalEngagement: number
  totalClicks: number
  totalConversions: number
  totalRevenue: number

  // Efficiency
  cpm: number // cost per 1000 impressions
  cpc: number // cost per click
  cpa: number // cost per acquisition
  roas: number // return on ad spend
  engagementRate: number

  // Comparison
  vsBenchmark: {
    cpiVsIndustry: number // % better/worse than industry avg
    roasVsIndustry: number
    engagementVsIndustry: number
  }
  vsOtherChannels: {
    vsPaidSocial: { metric: string; ourPerformance: number; paidSocial: number }[]
    vsPaidSearch: { metric: string; ourPerformance: number; paidSearch: number }[]
  }

  // Per-creator breakdown
  creatorBreakdown: Array<{
    creatorId: string
    creatorHandle: string
    spend: number
    conversions: number
    revenue: number
    roas: number
    rank: number
  }>
}

// ─── MARKET & PLATFORM LEADERBOARDS ───────────────────

export interface MarketLeaderboard {
  market: string
  totalCampaigns: number
  totalRevenue: number
  totalCommission: number
  avgROAS: number
  topCreators: Array<{ handle: string; revenue: number; roas: number }>
  topBrands: Array<{ name: string; spend: number; campaigns: number }>
  growthRate: number // YoY
}

export interface PlatformLeaderboard {
  platform: string
  totalCampaigns: number
  totalRevenue: number
  avgROAS: number
  avgEngagement: number
  avgCPI: number | null
  topPerformers: Array<{ handle: string; revenue: number; roas: number }>
  bestFor: string[] // 'awareness', 'installs', 'purchases', 'engagement'
}

// ─── ENGINE FUNCTIONS ─────────────────────────────────

/**
 * Ingest a conversion event from any source
 */
export async function ingestConversion(event: Omit<ConversionEvent, 'id'>): Promise<ConversionEvent> {
  // Would save to Firestore 'conversions' collection
  // and update the creator's performance card
  const id = `conv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  return { id, ...event }
}

/**
 * Build/update a creator's performance card from all their conversion data
 */
export async function buildCreatorPerformanceCard(creatorId: string): Promise<CreatorPerformanceCard | null> {
  // Would aggregate all conversions for this creator
  // Calculate all metrics
  // Update their ranking
  return null
}

/**
 * Get the full creator leaderboard sorted by chosen metric
 */
export async function getCreatorLeaderboard(params: {
  sortBy: 'roas' | 'revenue' | 'margin' | 'volume' | 'overall'
  market?: string
  platform?: string
  timeframe?: string // 'last_30d', 'last_90d', 'last_year', 'all_time'
  limit?: number
}): Promise<CreatorPerformanceCard[]> {
  // Would query Firestore for all creator performance cards
  // Sort by requested metric
  // Filter by market/platform if specified
  return []
}

/**
 * Generate a campaign performance report
 */
export async function generateCampaignReport(campaignId: string): Promise<CampaignPerformanceReport | null> {
  // Would aggregate all conversion events for this campaign
  // Calculate per-creator breakdown
  // Compare to benchmarks
  return null
}

/**
 * Get market-level performance data
 */
export async function getMarketLeaderboards(): Promise<MarketLeaderboard[]> {
  // Would aggregate performance by market
  return []
}

/**
 * Get platform-level performance data
 */
export async function getPlatformLeaderboards(): Promise<PlatformLeaderboard[]> {
  // Would aggregate performance by platform
  return []
}

/**
 * AppsFlyer postback handler
 * Receives install/event data and attributes to creator
 */
export async function handleAppsFlyerPostback(data: {
  event_name: string
  event_value: string | null
  media_source: string // should be 'mobileyes'
  campaign: string // MBL-CAMP-XXXXX
  adset: string // creator handle
  ad: string // platform_creator
  country_code: string
  platform: string // 'ios' or 'android'
  event_time: string
  is_retargeting: boolean
}): Promise<ConversionEvent | null> {
  // Only process events attributed to us
  if (data.media_source !== 'mobileyes') return null

  const event: Omit<ConversionEvent, 'id'> = {
    campaignId: data.campaign,
    creatorId: '', // resolve from adset (creator handle)
    creatorHandle: data.adset,
    platform: data.ad.split('_')[0] || 'unknown',
    eventType: data.event_name === 'install' ? 'INSTALL' : data.event_name.includes('purchase') ? 'PURCHASE' : 'CUSTOM',
    eventName: data.event_name,
    eventValue: data.event_value ? parseFloat(data.event_value) : null,
    currency: 'AUD',
    attributionSource: 'APPSFLYER',
    attributionWindow: '7d_click',
    market: data.country_code,
    deviceType: data.platform,
    timestamp: data.event_time,
    isFraud: false,
    fraudReason: null,
    isValidated: true,
  }

  return ingestConversion(event)
}

/**
 * Promo code redemption handler
 * When a brand reports promo code usage, attribute to creator
 */
export async function handlePromoRedemption(data: {
  promoCode: string // CREATOR-CAMPID format
  orderValue: number
  currency: string
  market: string
  timestamp: string
}): Promise<ConversionEvent | null> {
  // Parse promo code to extract creator and campaign
  const parts = data.promoCode.split('-')
  if (parts.length < 2) return null

  const event: Omit<ConversionEvent, 'id'> = {
    campaignId: '', // resolve from promo code
    creatorId: '',
    creatorHandle: parts[0].toLowerCase(),
    platform: 'unknown',
    eventType: 'PURCHASE',
    eventName: 'promo_purchase',
    eventValue: data.orderValue,
    currency: data.currency,
    attributionSource: 'PROMO_CODE',
    attributionWindow: 'promo_window',
    market: data.market,
    deviceType: null,
    timestamp: data.timestamp,
    isFraud: false,
    fraudReason: null,
    isValidated: true,
  }

  return ingestConversion(event)
}
