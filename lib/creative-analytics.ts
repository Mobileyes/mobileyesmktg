/**
 * Creative Analytics Engine
 * 
 * Tracks performance at the CREATIVE level — not just which creator performed,
 * but which type of content, format, hook, and style drove the best results.
 * 
 * This answers:
 * - Which content format converts best? (live stream vs VOD vs short-form vs post)
 * - Which hooks/openings drive highest retention?
 * - What's the optimal video length per platform?
 * - Do branded intros hurt or help?
 * - Which CTA placement converts best? (beginning, middle, end, pinned comment)
 * - What game/content category drives best ROAS per brand?
 * 
 * Data flows:
 * 1. Campaign brief specifies creative format + requirements
 * 2. Creator delivers content → we tag it with creative metadata
 * 3. Performance engine tracks conversions attributed to that content
 * 4. Creative analytics correlates format/style with outcomes
 * 5. Insights feed back into brief generation + creator matching
 */

export interface CreativeAsset {
  id: string
  campaignId: string
  creatorId: string
  creatorHandle: string
  platform: string

  // Content metadata
  contentUrl: string
  contentType: 'LIVE_STREAM' | 'VOD_VIDEO' | 'SHORT_FORM' | 'STORY' | 'POST' | 'REEL' | 'DISCORD_POST'
  format: 'DEDICATED' | 'INTEGRATION' | 'MENTION' | 'REVIEW' | 'UNBOXING' | 'TUTORIAL' | 'CHALLENGE' | 'REACTION' | 'LIVE_PLAY'
  
  // Creative attributes
  duration: number | null // seconds (null for posts/stories)
  hookType: 'DIRECT_PITCH' | 'STORY_FIRST' | 'QUESTION' | 'CONTROVERSY' | 'DEMO_FIRST' | 'RESULT_FIRST' | 'NONE'
  ctaPlacement: 'OPENING' | 'MIDDLE' | 'CLOSING' | 'PINNED_COMMENT' | 'BIO_LINK' | 'OVERLAY' | 'MULTIPLE'
  ctaType: 'LINK_CLICK' | 'PROMO_CODE' | 'APP_DOWNLOAD' | 'SIGN_UP' | 'VISIT_SITE' | 'JOIN_DISCORD'
  brandedIntro: boolean // did the creator use a branded opening?
  scriptLevel: 'FULLY_SCRIPTED' | 'TALKING_POINTS' | 'BRIEF_ONLY' | 'ORGANIC' // how much direction was given
  disclosureType: '#AD' | '#SPONSORED' | 'VERBAL' | 'NONE' // FTC/AU disclosure
  thumbnailType: 'BRANDED' | 'CREATOR_STYLE' | 'CLICKBAIT' | 'MINIMAL'
  
  // Content category
  contentCategory: string // 'Gaming', 'IRL', 'Just Chatting', 'Review', 'Tutorial'
  gameTitle: string | null // if gaming content, which game
  language: string
  tone: 'ENERGETIC' | 'CHILL' | 'EDUCATIONAL' | 'COMEDIC' | 'SERIOUS' | 'HYPE'

  // Performance metrics (populated after campaign)
  views: number | null
  likes: number | null
  comments: number | null
  shares: number | null
  watchTime: number | null // total watch hours
  avgWatchDuration: number | null // seconds
  retentionAt30s: number | null // % still watching at 30s
  retentionAt60s: number | null // % still watching at 60s
  clickThroughRate: number | null // % who clicked CTA
  conversionRate: number | null // % who converted after click
  conversions: number | null
  revenue: number | null // attributed revenue
  roas: number | null // return on ad spend
  cpa: number | null // cost per acquisition
  cpm: number | null // cost per 1000 views

  // Timestamps
  publishedAt: string
  collectedAt: string | null
}

export interface CreativeInsight {
  id: string
  insightType: 'FORMAT' | 'HOOK' | 'CTA' | 'DURATION' | 'SCRIPT' | 'PLATFORM' | 'CATEGORY'
  title: string
  finding: string
  dataPoints: number // how many creatives this is based on
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  recommendation: string // what to do with this insight
  metrics: {
    avgCTR: number
    avgConversionRate: number
    avgROAS: number
    sampleSize: number
  }
}

// ─── ANALYSIS FUNCTIONS ──────────────────────────────

/**
 * Analyse which content formats drive best performance
 */
export function analyseByFormat(creatives: CreativeAsset[]): {
  format: string
  count: number
  avgViews: number
  avgCTR: number
  avgConversion: number
  avgROAS: number
}[] {
  const grouped = groupBy(creatives, 'contentType')
  return Object.entries(grouped).map(([format, items]) => ({
    format,
    count: items.length,
    avgViews: avg(items.map(i => i.views ?? 0)),
    avgCTR: avg(items.map(i => i.clickThroughRate ?? 0)),
    avgConversion: avg(items.map(i => i.conversionRate ?? 0)),
    avgROAS: avg(items.map(i => i.roas ?? 0)),
  })).sort((a, b) => b.avgROAS - a.avgROAS)
}

/**
 * Analyse which hook types drive best retention
 */
export function analyseByHook(creatives: CreativeAsset[]): {
  hookType: string
  count: number
  avgRetention30s: number
  avgRetention60s: number
  avgCTR: number
}[] {
  const grouped = groupBy(creatives, 'hookType')
  return Object.entries(grouped).map(([hook, items]) => ({
    hookType: hook,
    count: items.length,
    avgRetention30s: avg(items.map(i => i.retentionAt30s ?? 0)),
    avgRetention60s: avg(items.map(i => i.retentionAt60s ?? 0)),
    avgCTR: avg(items.map(i => i.clickThroughRate ?? 0)),
  })).sort((a, b) => b.avgRetention30s - a.avgRetention30s)
}

/**
 * Analyse CTA placement effectiveness
 */
export function analyseByCTAPlacement(creatives: CreativeAsset[]): {
  placement: string
  count: number
  avgCTR: number
  avgConversion: number
}[] {
  const grouped = groupBy(creatives, 'ctaPlacement')
  return Object.entries(grouped).map(([placement, items]) => ({
    placement,
    count: items.length,
    avgCTR: avg(items.map(i => i.clickThroughRate ?? 0)),
    avgConversion: avg(items.map(i => i.conversionRate ?? 0)),
  })).sort((a, b) => b.avgCTR - a.avgCTR)
}

/**
 * Analyse optimal duration by platform
 */
export function analyseByDuration(creatives: CreativeAsset[]): {
  platform: string
  optimalDurationRange: string
  avgPerformance: number
  topPerformers: { duration: number; roas: number }[]
}[] {
  const byPlatform = groupBy(creatives.filter(c => c.duration), 'platform')
  return Object.entries(byPlatform).map(([platform, items]) => {
    const sorted = items.sort((a, b) => (b.roas ?? 0) - (a.roas ?? 0))
    const top5 = sorted.slice(0, 5)
    const durations = top5.map(i => i.duration!).filter(Boolean)
    const minDur = Math.min(...durations)
    const maxDur = Math.max(...durations)

    return {
      platform,
      optimalDurationRange: `${Math.round(minDur / 60)}-${Math.round(maxDur / 60)} min`,
      avgPerformance: avg(top5.map(i => i.roas ?? 0)),
      topPerformers: top5.map(i => ({ duration: i.duration!, roas: i.roas ?? 0 })),
    }
  })
}

/**
 * Analyse script level vs performance
 * Does more direction help or hurt?
 */
export function analyseByScriptLevel(creatives: CreativeAsset[]): {
  scriptLevel: string
  count: number
  avgEngagement: number // likes + comments / views
  avgCTR: number
  avgROAS: number
  verdict: string
}[] {
  const grouped = groupBy(creatives, 'scriptLevel')
  return Object.entries(grouped).map(([level, items]) => {
    const avgEng = avg(items.map(i => {
      if (!i.views || i.views === 0) return 0
      return ((i.likes ?? 0) + (i.comments ?? 0)) / i.views * 100
    }))
    const avgCTR = avg(items.map(i => i.clickThroughRate ?? 0))
    const avgROAS = avg(items.map(i => i.roas ?? 0))

    let verdict = ''
    if (level === 'ORGANIC' && avgEng > 5) verdict = 'High engagement — authentic feel resonates'
    else if (level === 'BRIEF_ONLY' && avgROAS > 3) verdict = 'Best balance — direction without over-scripting'
    else if (level === 'FULLY_SCRIPTED' && avgCTR > 2) verdict = 'Strong CTA delivery but may feel less authentic'
    else verdict = 'Insufficient data for conclusion'

    return { scriptLevel: level, count: items.length, avgEngagement: avgEng, avgCTR, avgROAS, verdict }
  }).sort((a, b) => b.avgROAS - a.avgROAS)
}

/**
 * Generate creative insights from performance data
 * These feed into brief generation and creator matching
 */
export function generateCreativeInsights(creatives: CreativeAsset[]): CreativeInsight[] {
  const insights: CreativeInsight[] = []

  // Format insights
  const formatAnalysis = analyseByFormat(creatives)
  if (formatAnalysis.length > 1) {
    const best = formatAnalysis[0]
    insights.push({
      id: `insight-format-${Date.now()}`,
      insightType: 'FORMAT',
      title: `${best.format} delivers highest ROAS`,
      finding: `${best.format} content averages ${best.avgROAS.toFixed(1)}x ROAS across ${best.count} campaigns — outperforming other formats.`,
      dataPoints: best.count,
      confidence: best.count >= 10 ? 'HIGH' : best.count >= 5 ? 'MEDIUM' : 'LOW',
      recommendation: `Prioritise ${best.format} in future campaign briefs. Pitch this format to brands.`,
      metrics: { avgCTR: best.avgCTR, avgConversionRate: best.avgConversion, avgROAS: best.avgROAS, sampleSize: best.count },
    })
  }

  // Hook insights
  const hookAnalysis = analyseByHook(creatives)
  if (hookAnalysis.length > 1) {
    const best = hookAnalysis[0]
    insights.push({
      id: `insight-hook-${Date.now()}`,
      insightType: 'HOOK',
      title: `"${best.hookType}" hooks retain best`,
      finding: `${best.hookType} openings retain ${best.avgRetention30s.toFixed(0)}% at 30 seconds — ${(best.avgRetention30s - hookAnalysis[hookAnalysis.length - 1].avgRetention30s).toFixed(0)}% better than worst performer.`,
      dataPoints: best.count,
      confidence: best.count >= 8 ? 'HIGH' : 'MEDIUM',
      recommendation: `Include "${best.hookType}" as suggested opening style in creator briefs.`,
      metrics: { avgCTR: best.avgCTR, avgConversionRate: 0, avgROAS: 0, sampleSize: best.count },
    })
  }

  // CTA placement insights
  const ctaAnalysis = analyseByCTAPlacement(creatives)
  if (ctaAnalysis.length > 1) {
    const best = ctaAnalysis[0]
    insights.push({
      id: `insight-cta-${Date.now()}`,
      insightType: 'CTA',
      title: `${best.placement} CTA placement converts best`,
      finding: `CTAs placed at ${best.placement} average ${best.avgCTR.toFixed(1)}% CTR — ${(best.avgCTR - ctaAnalysis[ctaAnalysis.length - 1].avgCTR).toFixed(1)}% higher than worst position.`,
      dataPoints: best.count,
      confidence: best.count >= 10 ? 'HIGH' : 'MEDIUM',
      recommendation: `Brief creators to place primary CTA at ${best.placement}. Include as a non-negotiable in campaign specs.`,
      metrics: { avgCTR: best.avgCTR, avgConversionRate: best.avgConversion, avgROAS: 0, sampleSize: best.count },
    })
  }

  return insights
}

// ─── HELPERS ──────────────────────────────────────────

function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const k = String(item[key] ?? 'unknown')
    if (!acc[k]) acc[k] = []
    acc[k].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

function avg(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length
}
