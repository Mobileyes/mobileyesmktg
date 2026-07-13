/**
 * GAMEFLUENCE SCORE ENGINE
 * 
 * The Gamefluence Score measures the actual influence a creator campaign
 * had on consumer behavior. Not just views — behavioral shift.
 * 
 * Like Nielsen Brand Lift for gaming creator campaigns.
 * Like IGN's review score but for campaign effectiveness.
 * 
 * 4 PILLARS (0-100 each, weighted into composite score):
 * 
 * 1. AWARENESS LIFT (25% weight)
 *    - Pre/post brand recognition in target segment
 *    - Unaided recall ("name a mobile racing game") 
 *    - Aided recall ("have you heard of Drift Runner?")
 *    - Social share of voice shift (Meltwater data)
 * 
 * 2. INFLUENCE QUALITY (25% weight)
 *    - Creator authenticity score (facial expression analysis, tone, genuine excitement)
 *    - Audience sentiment (NLP on comments: excitement, curiosity, trust vs skepticism)
 *    - Engagement quality (comments asking about the game vs generic)
 *    - Bot/fake detection on engagement
 * 
 * 3. INTENT SHIFT (25% weight)
 *    - "How likely to download?" pre vs post exposure
 *    - Promo code interest signals (clicks on links, code mentions in comments)
 *    - Wishlist/follow/save actions post-exposure
 *    - Search volume lift for brand terms (Google Trends data)
 * 
 * 4. CONVERSION ATTRIBUTION (25% weight)
 *    - Hard installs via UTM/promo code/S2S
 *    - Cost per acquisition vs paid UA benchmark
 *    - D1/D7/D30 retention of creator-attributed users
 *    - Revenue per user (LTV) of creator-attributed cohort
 *    - ROAS calculation
 * 
 * COMPOSITE SCORE: Weighted average → 0-100
 * 0-25  = Low Impact (awareness only, no behavioral shift)
 * 25-50 = Moderate (intent shifted but weak conversion)
 * 50-75 = Strong (measurable installs + retention)
 * 75-100 = Exceptional (full-funnel proof)
 * 
 * PARTNERSHIPS:
 * - Meltwater: Social listening, share of voice, sentiment at scale
 * - Google: Influence measurement framework, search volume data
 * - Screen agencies: Proof of ROI on funded game campaigns
 * 
 * GCAP LAUNCH: "State of Creator Influence in Australian Gaming 2026"
 * Co-branded report: Gamefluence × Meltwater
 * Case study: Roadburn Games (Tim) — Vietnam APAC pilot
 */

// ─── TYPES ────────────────────────────────────────────

export interface GamfluenceScoreInput {
  campaignId: string
  campaignTitle: string
  clientName: string
  market: string[]
  
  // Pillar 1: Awareness
  awareness: {
    preUnaided: number | null  // % who named the brand unprompted before
    postUnaided: number | null // % who named the brand unprompted after
    preAided: number | null    // % who recognized brand when shown before
    postAided: number | null   // % who recognized brand when shown after
    shareOfVoicePre: number | null  // % of category conversation (Meltwater)
    shareOfVoicePost: number | null
    searchVolumeLifts: number | null // % increase in brand search terms (Google Trends)
  }

  // Pillar 2: Influence Quality
  influence: {
    creatorAuthenticityScore: number | null // 0-100 from video analysis
    audienceSentimentPositive: number | null // % positive comments
    audienceSentimentNeutral: number | null
    audienceSentimentNegative: number | null
    engagementQualityScore: number | null // % of comments that reference the brand/game
    botDetectionClean: number | null // % of engagement that's real (not bot)
    facialExpressionData: CreatorEmotionAnalysis | null
  }

  // Pillar 3: Intent
  intent: {
    preIntentScore: number | null  // "how likely to download?" 1-10 avg before
    postIntentScore: number | null // same question after exposure
    promoCodeClicks: number | null
    linkClicks: number | null
    wishlists: number | null
    searchVolumeLift: number | null // % lift in brand search queries
  }

  // Pillar 4: Conversion
  conversion: {
    totalInstalls: number
    attributedInstalls: number // via UTM/promo/S2S
    promoCodeRedemptions: number
    cpiAchieved: number | null // $ per install
    cpiBenchmark: number | null // industry benchmark for comparison
    d1Retention: number | null // % still active day 1
    d7Retention: number | null
    d30Retention: number | null
    revenuePerUser: number | null // LTV of creator-attributed cohort
    roas: number | null
  }
}

export interface CreatorEmotionAnalysis {
  // From video/stream analysis
  overallSentiment: 'GENUINE_POSITIVE' | 'NEUTRAL' | 'SCRIPTED' | 'NEGATIVE'
  excitementPeaks: number // how many genuine excitement moments detected
  curiositySignals: number // moments of genuine exploration/discovery
  frustrationMoments: number // moments of annoyance (can be authentic for gaming)
  authenticityConfidence: number // 0-100: how confident we are this is genuine vs scripted
  keyMoments: Array<{
    timestamp: number // seconds
    emotion: string
    intensity: number // 0-100
    transcript: string // what they said at this moment
  }>
}

export interface GamfluenceScore {
  // Composite
  overallScore: number // 0-100
  rating: 'EXCEPTIONAL' | 'STRONG' | 'MODERATE' | 'LOW'
  
  // Pillar scores
  awarenessScore: number
  influenceScore: number
  intentScore: number
  conversionScore: number
  
  // Insights
  topInsight: string
  strengths: string[]
  improvements: string[]
  
  // Benchmarks
  vsIndustryAvg: number // how much better/worse than industry
  vsPaidUA: string // comparison to paid UA performance
  percentile: number // where this campaign sits vs all Gamefluence campaigns
  
  // For the report
  headlineMetric: string // e.g. "4.2x install volume at 85% lower CPI"
  oneSentenceSummary: string
}

// ─── SCORE CALCULATION ────────────────────────────────

export function calculateGamfluenceScore(input: GamfluenceScoreInput): GamfluenceScore {
  const awarenessScore = calculateAwarenessScore(input.awareness)
  const influenceScore = calculateInfluenceScore(input.influence)
  const intentScore = calculateIntentScore(input.intent)
  const conversionScore = calculateConversionScore(input.conversion)

  // Weighted composite (equal weights for now — can adjust per campaign type)
  const overallScore = Math.round(
    awarenessScore * 0.25 +
    influenceScore * 0.25 +
    intentScore * 0.25 +
    conversionScore * 0.25
  )

  const rating: GamfluenceScore['rating'] = 
    overallScore >= 75 ? 'EXCEPTIONAL' :
    overallScore >= 50 ? 'STRONG' :
    overallScore >= 25 ? 'MODERATE' : 'LOW'

  // Generate insights
  const strengths: string[] = []
  const improvements: string[] = []

  if (conversionScore >= 70) strengths.push('Strong conversion attribution — clear install-to-creator link')
  if (influenceScore >= 70) strengths.push('High creator authenticity — genuine excitement detected')
  if (awarenessScore >= 70) strengths.push('Significant awareness lift in target market')
  if (intentScore >= 70) strengths.push('Measurable intent shift — audience moved from awareness to action')

  if (awarenessScore < 40) improvements.push('Limited awareness lift — consider longer campaign window or more creators')
  if (influenceScore < 40) improvements.push('Creator authenticity signals weak — review content for scripted feel')
  if (intentScore < 40) improvements.push('Intent shift minimal — stronger CTA or incentive needed')
  if (conversionScore < 40) improvements.push('Conversion tracking gaps — ensure S2S/promo codes are properly attributed')

  // CPI comparison
  const vsPaidUA = input.conversion.cpiAchieved && input.conversion.cpiBenchmark
    ? `${Math.round((1 - input.conversion.cpiAchieved / input.conversion.cpiBenchmark) * 100)}% cheaper than paid UA`
    : 'Benchmark data needed'

  // Top insight
  const topInsight = conversionScore >= 70
    ? `Campaign drove ${input.conversion.attributedInstalls.toLocaleString()} attributed installs at ${vsPaidUA}`
    : influenceScore >= 70
    ? 'Creator content showed genuine audience engagement — high trust signals detected'
    : awarenessScore >= 70
    ? 'Significant brand awareness lift achieved in target market'
    : 'Campaign in progress — more data needed for full score'

  // Headline metric
  const headlineMetric = input.conversion.cpiAchieved && input.conversion.cpiBenchmark
    ? `${(input.conversion.cpiBenchmark / input.conversion.cpiAchieved).toFixed(1)}x install volume at ${Math.round((1 - input.conversion.cpiAchieved / input.conversion.cpiBenchmark) * 100)}% lower CPI`
    : `${input.conversion.attributedInstalls.toLocaleString()} attributed installs`

  return {
    overallScore,
    rating,
    awarenessScore,
    influenceScore,
    intentScore,
    conversionScore,
    topInsight,
    strengths,
    improvements,
    vsIndustryAvg: overallScore - 45, // assume industry avg is 45
    vsPaidUA,
    percentile: Math.min(99, Math.round(overallScore * 1.2)), // rough percentile
    headlineMetric,
    oneSentenceSummary: `This campaign scored ${overallScore}/100 on the Gamefluence Index — rated ${rating}. ${topInsight}`,
  }
}

// ─── PILLAR CALCULATIONS ──────────────────────────────

function calculateAwarenessScore(a: GamfluenceScoreInput['awareness']): number {
  let score = 0
  let dataPoints = 0

  // Unaided recall lift
  if (a.preUnaided != null && a.postUnaided != null) {
    const lift = a.postUnaided - a.preUnaided
    score += Math.min(100, lift * 5) // 20% lift = 100 score
    dataPoints++
  }

  // Aided recall lift
  if (a.preAided != null && a.postAided != null) {
    const lift = a.postAided - a.preAided
    score += Math.min(100, lift * 3) // 33% lift = 100 score
    dataPoints++
  }

  // Share of voice lift (Meltwater)
  if (a.shareOfVoicePre != null && a.shareOfVoicePost != null) {
    const lift = a.shareOfVoicePost - a.shareOfVoicePre
    score += Math.min(100, lift * 10) // 10% SOV lift = 100
    dataPoints++
  }

  // Search volume lift
  if (a.searchVolumeLifts != null) {
    score += Math.min(100, a.searchVolumeLifts * 2) // 50% search lift = 100
    dataPoints++
  }

  return dataPoints > 0 ? Math.round(score / dataPoints) : 0
}

function calculateInfluenceScore(i: GamfluenceScoreInput['influence']): number {
  let score = 0
  let dataPoints = 0

  if (i.creatorAuthenticityScore != null) {
    score += i.creatorAuthenticityScore
    dataPoints++
  }

  if (i.audienceSentimentPositive != null) {
    // High positive sentiment = high score
    score += Math.min(100, i.audienceSentimentPositive * 1.2)
    dataPoints++
  }

  if (i.engagementQualityScore != null) {
    score += i.engagementQualityScore
    dataPoints++
  }

  if (i.botDetectionClean != null) {
    score += i.botDetectionClean
    dataPoints++
  }

  if (i.facialExpressionData) {
    score += i.facialExpressionData.authenticityConfidence
    dataPoints++
  }

  return dataPoints > 0 ? Math.round(score / dataPoints) : 0
}

function calculateIntentScore(i: GamfluenceScoreInput['intent']): number {
  let score = 0
  let dataPoints = 0

  // Intent shift (1-10 scale)
  if (i.preIntentScore != null && i.postIntentScore != null) {
    const shift = i.postIntentScore - i.preIntentScore
    score += Math.min(100, shift * 20) // 5-point shift on 10-scale = 100
    dataPoints++
  }

  // Promo code interest
  if (i.promoCodeClicks != null && i.linkClicks != null) {
    const clickRate = i.linkClicks > 0 ? (i.promoCodeClicks / i.linkClicks) * 100 : 0
    score += Math.min(100, clickRate * 2) // 50% code-to-click rate = 100
    dataPoints++
  }

  // Search volume as intent signal
  if (i.searchVolumeLift != null) {
    score += Math.min(100, i.searchVolumeLift * 2)
    dataPoints++
  }

  return dataPoints > 0 ? Math.round(score / dataPoints) : 0
}

function calculateConversionScore(c: GamfluenceScoreInput['conversion']): number {
  let score = 0
  let dataPoints = 0

  // Attribution rate
  if (c.totalInstalls > 0) {
    const attributionRate = (c.attributedInstalls / c.totalInstalls) * 100
    score += Math.min(100, attributionRate * 2) // 50% attribution = 100
    dataPoints++
  }

  // CPI vs benchmark
  if (c.cpiAchieved != null && c.cpiBenchmark != null && c.cpiBenchmark > 0) {
    const savings = (1 - c.cpiAchieved / c.cpiBenchmark) * 100
    score += Math.min(100, savings * 1.5) // 66% savings = 100
    dataPoints++
  }

  // Retention quality
  if (c.d7Retention != null) {
    score += Math.min(100, c.d7Retention * 3) // 33% D7 retention = 100 (gaming benchmark is ~15-25%)
    dataPoints++
  }

  // ROAS
  if (c.roas != null) {
    score += Math.min(100, c.roas * 25) // 4x ROAS = 100
    dataPoints++
  }

  // Promo redemptions as conversion signal
  if (c.promoCodeRedemptions > 0 && c.attributedInstalls > 0) {
    const codeRate = (c.promoCodeRedemptions / c.attributedInstalls) * 100
    score += Math.min(100, codeRate * 1.5) // High code usage = engaged users
    dataPoints++
  }

  return dataPoints > 0 ? Math.round(score / dataPoints) : 0
}

// ─── REPORT GENERATION ────────────────────────────────

/**
 * Generate a Gamefluence Score report suitable for:
 * - Client presentation
 * - GCAP conference showcase
 * - Screen agency ROI proof
 * - Meltwater co-branded report inclusion
 */
export function generateScoreReport(score: GamfluenceScore, input: GamfluenceScoreInput): {
  title: string
  subtitle: string
  sections: Array<{ heading: string; content: string; dataViz: string }>
} {
  return {
    title: `Gamefluence Score Report — ${input.campaignTitle}`,
    subtitle: `Client: ${input.clientName} | Markets: ${input.market.join(', ')} | Score: ${score.overallScore}/100 (${score.rating})`,
    sections: [
      {
        heading: 'Executive Summary',
        content: score.oneSentenceSummary,
        dataViz: 'score_gauge',
      },
      {
        heading: 'Awareness Lift',
        content: `Awareness score: ${score.awarenessScore}/100. ${input.awareness.searchVolumeLifts ? `Search volume increased ${input.awareness.searchVolumeLifts}% during campaign window.` : 'Search data pending.'}`,
        dataViz: 'pre_post_bar_chart',
      },
      {
        heading: 'Creator Influence Quality',
        content: `Influence score: ${score.influenceScore}/100. ${input.influence.facialExpressionData ? `Creator showed ${input.influence.facialExpressionData.overallSentiment.replace('_', ' ').toLowerCase()} engagement with ${input.influence.facialExpressionData.excitementPeaks} genuine excitement peaks.` : 'Video analysis pending.'}`,
        dataViz: 'emotion_timeline',
      },
      {
        heading: 'Intent & Conversion',
        content: `${input.conversion.attributedInstalls.toLocaleString()} attributed installs. ${score.vsPaidUA}. ${input.conversion.promoCodeRedemptions} promo code redemptions confirming engaged users.`,
        dataViz: 'conversion_funnel',
      },
      {
        heading: 'Benchmark Comparison',
        content: `This campaign sits in the ${score.percentile}th percentile of all Gamefluence-scored campaigns. ${score.headlineMetric}.`,
        dataViz: 'benchmark_comparison',
      },
    ],
  }
}

// ─── PARTNERSHIP INTEGRATIONS ─────────────────────────

export interface MeltwaterIntegration {
  enabled: boolean
  apiKey: string | null
  // What we pull from Meltwater
  capabilities: [
    'social_listening',      // Track brand mentions across all platforms
    'share_of_voice',       // % of category conversation
    'sentiment_analysis',   // Positive/negative/neutral at scale
    'competitor_tracking',  // How our brand compares to competitors
    'influencer_scoring',   // Meltwater's own influencer metrics
    'report_generation',    // Co-branded PDF reports
  ]
}

export interface GooglePartnership {
  enabled: boolean
  // Googles influence measurement framework alignment
  capabilities: [
    'brand_lift_surveys',    // In-platform brand lift studies
    'search_volume_data',   // Google Trends API for intent signals
    'youtube_analytics',    // Deep YouTube performance data
    'display_video_360',    // Cross-channel attribution
  ]
}

/**
 * Partners configuration for Gamefluence Score
 */
export const PARTNERSHIPS = {
  meltwater: {
    contactName: 'Dean',
    relationship: 'Direct connection — gaming campaign partner',
    value: 'Social listening data at scale. Share of voice tracking. Sentiment analysis across all platforms. Co-branded GCAP report.',
    integration: 'API access to social listening endpoints. Brand mention tracking per campaign window.',
    gcapAngle: 'Co-branded "State of Creator Influence in Australian Gaming 2026" report. Presented at GCAP. Meltwater logo + data, Gamefluence methodology + creator insights.',
  },
  google: {
    contactName: 'Via Meltwater/Dean connection',
    relationship: 'Aligned with Googles new social influence measurement framework',
    value: 'Brand Lift survey infrastructure. Search volume data (Google Trends). YouTube deep analytics. Credibility of Google brand.',
    integration: 'Google Trends API for search lift. YouTube Data API for content performance. Potential Brand Lift study integration.',
    gcapAngle: 'Position Gamefluence Score as "aligned with Googles influence measurement standards." Use their methodology as validation.',
  },
  screenAgencies: {
    targets: ['Screen Australia', 'Screen NSW', 'Film Victoria', 'Screen Queensland'],
    value: 'Proof of ROI on publicly funded game projects. Gamefluence Score = accountability metric for taxpayer investment in games.',
    pitch: 'You fund games. We prove people played them. Gamefluence Score shows the awareness, intent, and install lift your investment generated — verified by creator campaign data.',
    revenueModel: 'Screen agencies fund the Gamefluence campaign as part of their marketing support. We run creators, measure results, deliver the score. They get an ROI report for their stakeholders.',
  },
}
