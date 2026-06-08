/**
 * Campaign Report Generator
 * 
 * Produces branded analytics exports for outreach and post-campaign reporting.
 * Includes proof-of-delivery (screenshots, transcripts, attribution detection)
 * alongside performance metrics and attribution data.
 * 
 * Export formats: JSON, CSV, PDF (via @react-pdf/renderer)
 * Used for: brand outreach decks, post-campaign wrap reports, invoice support docs
 */

import type { Campaign, CampaignCreator } from './db/types'
import type { ContentVerification } from './db/verifications'
import type { StreamAnalytics } from './db/analytics'
import { compareToPaidUA, generateReportBenchmarks } from './gaming-benchmarks'

// ─── REPORT TYPES ─────────────────────────────────────

export interface CampaignReportExport {
  // Header
  campaign: {
    mblId: string
    title: string
    clientName: string
    clientEmail: string
    objective: string
    markets: string[]
    startDate: string | null
    endDate: string | null
    status: string
  }
  generatedAt: string
  generatedBy: 'Mobileyes' | 'Gamefluence'

  // Summary metrics
  summary: {
    totalCreators: number
    verifiedDeliverables: number
    pendingVerifications: number
    totalViews: number
    totalEngagement: number
    avgEngagementRate: number
    totalConversions: number
    totalRevenue: number
    roas: number | null
    utmLinksDetected: number
    promoCodesDetected: number
    brandMentionsConfirmed: number
    avgTalkingPointCoverage: number // percentage
  }

  // Individual verification proofs
  verifications: VerificationProof[]

  // Performance analytics per creator
  analytics: CreatorPerformanceRow[]

  // Attribution tracking
  attribution: AttributionSummary

  // Benchmark comparison (Gamefluence: vs paid UA)
  benchmarks: {
    cpiVsIndustry: number
    roasVsIndustry: number
    engagementVsIndustry: number
    comparisons: {
      metric: string
      ourValue: number
      industryAvg: number
      percentageBetter: number
      source: string
    }[]
  } | null

  // Creators
  creators: CreatorDeliverable[]
}

export interface VerificationProof {
  creatorHandle: string
  platform: string
  contentUrl: string
  contentTitle: string | null
  publishedAt: string | null
  detectedAt: string

  // Proof assets
  screenshotUrl: string | null
  screenshotTimestamp: number | null
  transcriptExcerpt: string | null

  // Detection results
  utmLinkDetected: boolean
  utmLinkUrl: string | null
  utmLinkLocation: string | null
  promoCodeDetected: boolean
  promoCode: string | null
  promoCodeLocation: string | null
  brandMentionDetected: boolean
  brandMentionMethod: string | null
  talkingPointsMatched: string[]
  talkingPointsTotal: number

  // Metrics at detection
  viewCountAtDetection: number | null
  likesAtDetection: number | null
  commentsAtDetection: number | null

  // Status
  status: string
  approvedAt: string | null
}

export interface CreatorPerformanceRow {
  creatorHandle: string
  platform: string
  contentType: string
  contentUrl: string | null
  totalViews: number | null
  peakViewers: number | null
  avgViewers: number | null
  likes: number | null
  comments: number | null
  shares: number | null
  engagementRate: number | null
  clickThroughRate: number | null
  conversions: number | null
  revenue: number | null
  roas: number | null
  collectedAt: string
}

export interface AttributionSummary {
  totalUtmClicks: number | null
  totalPromoRedemptions: number | null
  s2sEventsFired: number
  conversionWindows: {
    '7day': { conversions: number; revenue: number }
    '14day': { conversions: number; revenue: number }
    '28day': { conversions: number; revenue: number }
  }
  platforms: {
    platform: string
    conversions: number
    revenue: number
  }[]
}

export interface CreatorDeliverable {
  creatorHandle: string
  platform: string
  fee: number
  status: string
  contentUrl: string | null
  verified: boolean
  approvedAt: string | null
  paymentDueAt: string | null
}

// ─── REPORT GENERATION ────────────────────────────────

export function generateCampaignReportData(
  campaign: Campaign,
  creators: CampaignCreator[],
  verifications: ContentVerification[],
  analytics: StreamAnalytics[]
): CampaignReportExport {
  // Build verification proofs
  const verificationProofs: VerificationProof[] = verifications.map((v) => ({
    creatorHandle: v.creatorHandle,
    platform: v.platform,
    contentUrl: v.contentUrl,
    contentTitle: v.contentTitle,
    publishedAt: v.publishedAt,
    detectedAt: v.detectedAt,
    screenshotUrl: v.screenshotUrl,
    screenshotTimestamp: v.screenshotTimestamp,
    transcriptExcerpt: v.transcriptExcerpt,
    utmLinkDetected: v.utmLinkDetected,
    utmLinkUrl: v.utmLinkUrl,
    utmLinkLocation: v.utmLinkLocation,
    promoCodeDetected: v.promoCodeDetected,
    promoCode: v.promoCode,
    promoCodeLocation: v.promoCodeLocation,
    brandMentionDetected: v.brandMentionDetected,
    brandMentionMethod: v.brandMentionMethod,
    talkingPointsMatched: v.talkingPointsMatched,
    talkingPointsTotal: v.talkingPointsTotal,
    viewCountAtDetection: v.viewCountAtDetection,
    likesAtDetection: v.likesAtDetection,
    commentsAtDetection: v.commentsAtDetection,
    status: v.status,
    approvedAt: v.approvedAt,
  }))

  // Build performance rows from analytics
  const performanceRows: CreatorPerformanceRow[] = analytics.map((a) => ({
    creatorHandle: '', // Will be enriched below
    platform: a.platform,
    contentType: a.contentType,
    contentUrl: a.contentUrl,
    totalViews: a.totalViews,
    peakViewers: a.peakViewers,
    avgViewers: a.avgViewers,
    likes: a.likes,
    comments: a.comments,
    shares: a.shares,
    engagementRate: a.engagementRate,
    clickThroughRate: a.clickThroughRate,
    conversions: a.conversions,
    revenue: null,
    roas: null,
    collectedAt: a.collectedAt,
  }))

  // Calculate summary metrics
  const approvedVerifications = verifications.filter((v) => v.status === 'APPROVED')
  const totalViews = verifications.reduce((sum, v) => sum + (v.viewCountAtDetection ?? 0), 0)
  const totalLikes = verifications.reduce((sum, v) => sum + (v.likesAtDetection ?? 0), 0)
  const totalComments = verifications.reduce((sum, v) => sum + (v.commentsAtDetection ?? 0), 0)
  const totalEngagement = totalLikes + totalComments
  const avgEngagementRate = totalViews > 0 ? (totalEngagement / totalViews) * 100 : 0

  const utmCount = verifications.filter((v) => v.utmLinkDetected).length
  const promoCount = verifications.filter((v) => v.promoCodeDetected).length
  const brandMentions = verifications.filter((v) => v.brandMentionDetected).length

  const avgTalkingPointCoverage = verifications.length > 0
    ? verifications.reduce((sum, v) => {
        if (v.talkingPointsTotal === 0) return sum
        return sum + (v.talkingPointsMatched.length / v.talkingPointsTotal) * 100
      }, 0) / verifications.length
    : 0

  // Build creator deliverable list
  const creatorDeliverables: CreatorDeliverable[] = creators.map((cc) => {
    const verification = verifications.find((v) => v.campaignCreatorId === cc.id)
    return {
      creatorHandle: '', // Would be enriched with creator lookup
      platform: '',
      fee: cc.creatorFee,
      status: cc.status,
      contentUrl: cc.contentUrl,
      verified: verification?.status === 'APPROVED',
      approvedAt: verification?.approvedAt ?? null,
      paymentDueAt: verification?.paymentDueAt ?? null,
    }
  })

  // Determine branding based on campaign context
  const brand: 'Mobileyes' | 'Gamefluence' = campaign.objective?.toLowerCase().includes('gaming')
    ? 'Gamefluence'
    : 'Mobileyes'

  // Generate benchmark comparisons for Gamefluence campaigns
  let benchmarks: CampaignReportExport['benchmarks'] = null
  if (brand === 'Gamefluence') {
    const category = campaign.objective?.toLowerCase().includes('mobile')
      ? 'Mobile Gaming' as const
      : 'Mobile Gaming' as const // default to mobile
    const market = campaign.markets.includes('AU') || campaign.markets.includes('NZ')
      ? 'ANZ'
      : 'APAC'

    const reportBenchmarks = generateReportBenchmarks({
      category,
      market,
      // These would be populated from actual campaign conversion data
      cpi: undefined,
      roas: undefined,
      engagementRate: avgEngagementRate > 0 ? avgEngagementRate : undefined,
    })

    const comparisons = compareToPaidUA({
      category,
      market,
      campaignMetrics: {
        ctr: avgEngagementRate > 0 ? avgEngagementRate : undefined,
      },
    })

    benchmarks = {
      ...reportBenchmarks,
      comparisons,
    }
  }

  return {
    campaign: {
      mblId: campaign.mblId,
      title: campaign.title,
      clientName: campaign.clientName,
      clientEmail: campaign.clientEmail,
      objective: campaign.objective,
      markets: campaign.markets,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      status: campaign.status,
    },
    generatedAt: new Date().toISOString(),
    generatedBy: brand,
    summary: {
      totalCreators: creators.length,
      verifiedDeliverables: approvedVerifications.length,
      pendingVerifications: verifications.filter((v) => v.status === 'PENDING').length,
      totalViews,
      totalEngagement,
      avgEngagementRate: Math.round(avgEngagementRate * 10) / 10,
      totalConversions: analytics.reduce((sum, a) => sum + (a.conversions ?? 0), 0),
      totalRevenue: 0, // Populated from performance engine
      roas: null,
      utmLinksDetected: utmCount,
      promoCodesDetected: promoCount,
      brandMentionsConfirmed: brandMentions,
      avgTalkingPointCoverage: Math.round(avgTalkingPointCoverage),
    },
    verifications: verificationProofs,
    analytics: performanceRows,
    attribution: {
      totalUtmClicks: null, // Populated from PostHog/GA4
      totalPromoRedemptions: null, // Populated from conversion webhooks
      s2sEventsFired: 0,
      conversionWindows: {
        '7day': { conversions: 0, revenue: 0 },
        '14day': { conversions: 0, revenue: 0 },
        '28day': { conversions: 0, revenue: 0 },
      },
      platforms: [],
    },
    benchmarks,
    creators: creatorDeliverables,
  }
}
