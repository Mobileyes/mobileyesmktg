/**
 * Gaming Performance Benchmarks
 * 
 * Gamefluence's competitive edge: proving creator campaigns outperform
 * paid UA channels (paid social, paid search, app store ads).
 * 
 * These benchmarks are used in:
 * - Client-facing campaign reports (vs industry comparison)
 * - Pitch decks ("our creators deliver 3x better CPI than paid UA")
 * - Performance engine reporting (vsBenchmark fields)
 * 
 * Data sources:
 * - AppsFlyer benchmarks (published industry reports)
 * - Singular ROI Index
 * - Sensor Tower market data
 * - Our own historical campaign data
 * 
 * Updated quarterly from public industry reports.
 */

export interface GamingBenchmark {
  category: string
  market: string
  platform: string
  metrics: {
    avgCPI: number // cost per install (USD)
    avgCPA: number // cost per acquisition/purchase
    avgCTR: number // click-through rate %
    avgRetentionD1: number // day 1 retention %
    avgRetentionD7: number // day 7 retention %
    avgROAS: number // 30-day ROAS
    avgIPM: number // installs per mille (per 1000 impressions)
  }
  source: string
  lastUpdated: string
}

// ─── INDUSTRY BENCHMARKS (Q1 2026) ───────────────────

export const PAID_UA_BENCHMARKS: GamingBenchmark[] = [
  // Mobile gaming — APAC
  {
    category: 'Mobile Gaming',
    market: 'APAC',
    platform: 'Meta Ads',
    metrics: {
      avgCPI: 2.80,
      avgCPA: 45.00,
      avgCTR: 1.2,
      avgRetentionD1: 28,
      avgRetentionD7: 12,
      avgROAS: 0.8,
      avgIPM: 8.5,
    },
    source: 'AppsFlyer Performance Index 2025',
    lastUpdated: '2026-01-15',
  },
  {
    category: 'Mobile Gaming',
    market: 'APAC',
    platform: 'Google Ads',
    metrics: {
      avgCPI: 1.90,
      avgCPA: 38.00,
      avgCTR: 0.9,
      avgRetentionD1: 25,
      avgRetentionD7: 10,
      avgROAS: 0.95,
      avgIPM: 6.2,
    },
    source: 'Singular ROI Index 2025',
    lastUpdated: '2026-01-15',
  },
  {
    category: 'Mobile Gaming',
    market: 'APAC',
    platform: 'TikTok Ads',
    metrics: {
      avgCPI: 2.10,
      avgCPA: 42.00,
      avgCTR: 1.8,
      avgRetentionD1: 22,
      avgRetentionD7: 9,
      avgROAS: 0.7,
      avgIPM: 12.0,
    },
    source: 'TikTok Gaming Vertical Report 2025',
    lastUpdated: '2026-01-15',
  },
  {
    category: 'Mobile Gaming',
    market: 'APAC',
    platform: 'Apple Search Ads',
    metrics: {
      avgCPI: 3.50,
      avgCPA: 55.00,
      avgCTR: 7.5,
      avgRetentionD1: 35,
      avgRetentionD7: 18,
      avgROAS: 1.2,
      avgIPM: 45.0,
    },
    source: 'Sensor Tower State of Mobile 2025',
    lastUpdated: '2026-01-15',
  },
  // Mobile gaming — ANZ
  {
    category: 'Mobile Gaming',
    market: 'ANZ',
    platform: 'Meta Ads',
    metrics: {
      avgCPI: 4.20,
      avgCPA: 62.00,
      avgCTR: 1.0,
      avgRetentionD1: 30,
      avgRetentionD7: 14,
      avgROAS: 0.75,
      avgIPM: 7.0,
    },
    source: 'AppsFlyer Performance Index 2025',
    lastUpdated: '2026-01-15',
  },
  {
    category: 'Mobile Gaming',
    market: 'ANZ',
    platform: 'Google Ads',
    metrics: {
      avgCPI: 3.10,
      avgCPA: 52.00,
      avgCTR: 0.8,
      avgRetentionD1: 27,
      avgRetentionD7: 11,
      avgROAS: 0.9,
      avgIPM: 5.5,
    },
    source: 'Singular ROI Index 2025',
    lastUpdated: '2026-01-15',
  },
  // PC/Console Gaming
  {
    category: 'PC/Console Gaming',
    market: 'Global',
    platform: 'Twitch Ads',
    metrics: {
      avgCPI: 8.50, // CPI for wishlists/downloads
      avgCPA: 85.00,
      avgCTR: 0.4,
      avgRetentionD1: 45,
      avgRetentionD7: 25,
      avgROAS: 0.5,
      avgIPM: 3.0,
    },
    source: 'StreamElements State of Streaming 2025',
    lastUpdated: '2026-01-15',
  },
  {
    category: 'PC/Console Gaming',
    market: 'Global',
    platform: 'YouTube Ads',
    metrics: {
      avgCPI: 5.80,
      avgCPA: 72.00,
      avgCTR: 0.6,
      avgRetentionD1: 40,
      avgRetentionD7: 20,
      avgROAS: 0.65,
      avgIPM: 4.5,
    },
    source: 'Newzoo Global Games Market Report 2025',
    lastUpdated: '2026-01-15',
  },
]

// ─── GAMEFLUENCE CREATOR BENCHMARKS ───────────────────
// Based on our own historical campaign data

export const CREATOR_CAMPAIGN_BENCHMARKS: GamingBenchmark[] = [
  {
    category: 'Mobile Gaming',
    market: 'APAC',
    platform: 'Creator (YouTube)',
    metrics: {
      avgCPI: 0.85, // Significantly lower than paid UA
      avgCPA: 18.00,
      avgCTR: 4.2, // Higher trust = higher CTR
      avgRetentionD1: 38, // Better quality users
      avgRetentionD7: 19,
      avgROAS: 2.8, // 2.8x return
      avgIPM: 25.0,
    },
    source: 'Gamefluence Internal Data (n=47 campaigns)',
    lastUpdated: '2026-04-01',
  },
  {
    category: 'Mobile Gaming',
    market: 'APAC',
    platform: 'Creator (TikTok)',
    metrics: {
      avgCPI: 0.65,
      avgCPA: 14.00,
      avgCTR: 5.8,
      avgRetentionD1: 32,
      avgRetentionD7: 15,
      avgROAS: 3.2,
      avgIPM: 35.0,
    },
    source: 'Gamefluence Internal Data (n=31 campaigns)',
    lastUpdated: '2026-04-01',
  },
  {
    category: 'Mobile Gaming',
    market: 'APAC',
    platform: 'Creator (Twitch/Kick)',
    metrics: {
      avgCPI: 1.10,
      avgCPA: 22.00,
      avgCTR: 3.5,
      avgRetentionD1: 42,
      avgRetentionD7: 22,
      avgROAS: 2.1,
      avgIPM: 18.0,
    },
    source: 'Gamefluence Internal Data (n=28 campaigns)',
    lastUpdated: '2026-04-01',
  },
  {
    category: 'PC/Console Gaming',
    market: 'Global',
    platform: 'Creator (YouTube)',
    metrics: {
      avgCPI: 2.20,
      avgCPA: 35.00,
      avgCTR: 3.8,
      avgRetentionD1: 52,
      avgRetentionD7: 30,
      avgROAS: 1.8,
      avgIPM: 15.0,
    },
    source: 'Gamefluence Internal Data (n=19 campaigns)',
    lastUpdated: '2026-04-01',
  },
]

// ─── COMPARISON FUNCTIONS ─────────────────────────────

export interface BenchmarkComparison {
  metric: string
  ourValue: number
  industryAvg: number
  percentageBetter: number // positive = we're better
  source: string
}

/**
 * Compare a campaign's performance against paid UA benchmarks.
 * Returns an array of comparisons for key metrics.
 */
export function compareToPaidUA(params: {
  category: 'Mobile Gaming' | 'PC/Console Gaming'
  market: string
  campaignMetrics: {
    cpi?: number
    cpa?: number
    ctr?: number
    retentionD1?: number
    retentionD7?: number
    roas?: number
  }
}): BenchmarkComparison[] {
  const comparisons: BenchmarkComparison[] = []

  // Get relevant benchmarks for this category/market
  const relevantBenchmarks = PAID_UA_BENCHMARKS.filter(
    (b) =>
      b.category === params.category &&
      (b.market === params.market || b.market === 'Global')
  )

  if (relevantBenchmarks.length === 0) return comparisons

  // Calculate industry averages across all paid channels
  const avgMetrics = {
    avgCPI: avg(relevantBenchmarks.map((b) => b.metrics.avgCPI)),
    avgCPA: avg(relevantBenchmarks.map((b) => b.metrics.avgCPA)),
    avgCTR: avg(relevantBenchmarks.map((b) => b.metrics.avgCTR)),
    avgRetentionD1: avg(relevantBenchmarks.map((b) => b.metrics.avgRetentionD1)),
    avgRetentionD7: avg(relevantBenchmarks.map((b) => b.metrics.avgRetentionD7)),
    avgROAS: avg(relevantBenchmarks.map((b) => b.metrics.avgROAS)),
  }

  // CPI comparison (lower is better)
  if (params.campaignMetrics.cpi != null) {
    const pctBetter = ((avgMetrics.avgCPI - params.campaignMetrics.cpi) / avgMetrics.avgCPI) * 100
    comparisons.push({
      metric: 'Cost Per Install',
      ourValue: params.campaignMetrics.cpi,
      industryAvg: avgMetrics.avgCPI,
      percentageBetter: Math.round(pctBetter),
      source: `Avg across ${relevantBenchmarks.length} paid channels`,
    })
  }

  // CPA comparison (lower is better)
  if (params.campaignMetrics.cpa != null) {
    const pctBetter = ((avgMetrics.avgCPA - params.campaignMetrics.cpa) / avgMetrics.avgCPA) * 100
    comparisons.push({
      metric: 'Cost Per Acquisition',
      ourValue: params.campaignMetrics.cpa,
      industryAvg: avgMetrics.avgCPA,
      percentageBetter: Math.round(pctBetter),
      source: `Avg across ${relevantBenchmarks.length} paid channels`,
    })
  }

  // CTR comparison (higher is better)
  if (params.campaignMetrics.ctr != null) {
    const pctBetter = ((params.campaignMetrics.ctr - avgMetrics.avgCTR) / avgMetrics.avgCTR) * 100
    comparisons.push({
      metric: 'Click-Through Rate',
      ourValue: params.campaignMetrics.ctr,
      industryAvg: avgMetrics.avgCTR,
      percentageBetter: Math.round(pctBetter),
      source: `Avg across ${relevantBenchmarks.length} paid channels`,
    })
  }

  // Retention D1 comparison (higher is better)
  if (params.campaignMetrics.retentionD1 != null) {
    const pctBetter =
      ((params.campaignMetrics.retentionD1 - avgMetrics.avgRetentionD1) / avgMetrics.avgRetentionD1) * 100
    comparisons.push({
      metric: 'Day 1 Retention',
      ourValue: params.campaignMetrics.retentionD1,
      industryAvg: avgMetrics.avgRetentionD1,
      percentageBetter: Math.round(pctBetter),
      source: `Avg across ${relevantBenchmarks.length} paid channels`,
    })
  }

  // ROAS comparison (higher is better)
  if (params.campaignMetrics.roas != null) {
    const pctBetter = ((params.campaignMetrics.roas - avgMetrics.avgROAS) / avgMetrics.avgROAS) * 100
    comparisons.push({
      metric: 'Return on Ad Spend',
      ourValue: params.campaignMetrics.roas,
      industryAvg: avgMetrics.avgROAS,
      percentageBetter: Math.round(pctBetter),
      source: `Avg across ${relevantBenchmarks.length} paid channels`,
    })
  }

  return comparisons
}

/**
 * Get the pitch headline for a market/category combination.
 * Used in pitch decks and outreach emails.
 */
export function getPitchBenchmarkHeadline(
  category: 'Mobile Gaming' | 'PC/Console Gaming',
  market: string
): string {
  const creatorBenchmarks = CREATOR_CAMPAIGN_BENCHMARKS.filter(
    (b) => b.category === category
  )
  const paidBenchmarks = PAID_UA_BENCHMARKS.filter(
    (b) => b.category === category && (b.market === market || b.market === 'Global')
  )

  if (creatorBenchmarks.length === 0 || paidBenchmarks.length === 0) {
    return 'Creator campaigns deliver measurably better performance than paid UA.'
  }

  const creatorCPI = avg(creatorBenchmarks.map((b) => b.metrics.avgCPI))
  const paidCPI = avg(paidBenchmarks.map((b) => b.metrics.avgCPI))
  const multiplier = Math.round((paidCPI / creatorCPI) * 10) / 10

  const creatorROAS = avg(creatorBenchmarks.map((b) => b.metrics.avgROAS))
  const paidROAS = avg(paidBenchmarks.map((b) => b.metrics.avgROAS))
  const roasMultiplier = Math.round((creatorROAS / paidROAS) * 10) / 10

  return `${multiplier}x cheaper installs, ${roasMultiplier}x better ROAS vs paid UA in ${market}.`
}

/**
 * Generate benchmark data for campaign report vsBenchmark fields.
 */
export function generateReportBenchmarks(params: {
  category: 'Mobile Gaming' | 'PC/Console Gaming'
  market: string
  cpi?: number
  roas?: number
  engagementRate?: number
}): {
  cpiVsIndustry: number
  roasVsIndustry: number
  engagementVsIndustry: number
} {
  const benchmarks = PAID_UA_BENCHMARKS.filter(
    (b) => b.category === params.category && (b.market === params.market || b.market === 'Global')
  )

  const avgCPI = avg(benchmarks.map((b) => b.metrics.avgCPI))
  const avgROAS = avg(benchmarks.map((b) => b.metrics.avgROAS))
  const avgCTR = avg(benchmarks.map((b) => b.metrics.avgCTR)) // using CTR as engagement proxy

  return {
    cpiVsIndustry: params.cpi && avgCPI
      ? Math.round(((avgCPI - params.cpi) / avgCPI) * 100)
      : 0,
    roasVsIndustry: params.roas && avgROAS
      ? Math.round(((params.roas - avgROAS) / avgROAS) * 100)
      : 0,
    engagementVsIndustry: params.engagementRate && avgCTR
      ? Math.round(((params.engagementRate - avgCTR) / avgCTR) * 100)
      : 0,
  }
}

function avg(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length
}
