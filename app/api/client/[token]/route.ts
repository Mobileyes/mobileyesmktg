import { NextResponse } from 'next/server'
import { getCampaign, getCampaignCreators } from '@/lib/db'
import { getVerificationsForCampaign } from '@/lib/db/verifications'
import { getCampaignAnalytics } from '@/lib/db/analytics'
import { generateCampaignReportData } from '@/lib/campaign-report'
import { verifyClientToken } from '@/lib/client-token'

/**
 * GET /api/client/[token]
 * 
 * Public (token-secured) endpoint for brand clients to view their campaign report.
 * Token is a signed JWT with 30-day expiry and HMAC-SHA256 signature.
 * 
 * No authentication required — security is via cryptographic signature.
 * Used by both Mobileyes and Gamefluence branded client dashboards.
 * 
 * Optional ?format=csv for export.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format')

    // Verify signed token and extract campaign ID
    const campaignId = await verifyClientToken(token)
    if (!campaignId) {
      return NextResponse.json({ error: 'Invalid or expired link' }, { status: 404 })
    }

    const campaign = await getCampaign(campaignId)
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    const creators = await getCampaignCreators(campaignId)
    const verifications = await getVerificationsForCampaign(campaignId)
    const analytics = await getCampaignAnalytics(campaignId)

    const report = generateCampaignReportData(campaign, creators, verifications, analytics)

    // Strip internal data — clients don't see fees, payment timelines, or emails
    const clientReport = {
      campaign: {
        mblId: report.campaign.mblId,
        title: report.campaign.title,
        clientName: report.campaign.clientName,
        objective: report.campaign.objective,
        markets: report.campaign.markets,
        startDate: report.campaign.startDate,
        endDate: report.campaign.endDate,
        status: report.campaign.status,
      },
      generatedAt: report.generatedAt,
      generatedBy: report.generatedBy,
      summary: report.summary,
      verifications: report.verifications.map((v) => ({
        creatorHandle: v.creatorHandle,
        platform: v.platform,
        contentUrl: v.contentUrl,
        contentTitle: v.contentTitle,
        publishedAt: v.publishedAt,
        detectedAt: v.detectedAt,
        screenshotUrl: v.screenshotUrl,
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
      })),
      analytics: report.analytics.map((a) => ({
        creatorHandle: a.creatorHandle,
        platform: a.platform,
        contentType: a.contentType,
        totalViews: a.totalViews,
        engagementRate: a.engagementRate,
        clickThroughRate: a.clickThroughRate,
        conversions: a.conversions,
        roas: a.roas,
      })),
      attribution: report.attribution,
    }

    if (format === 'csv') {
      return generateClientCsv(clientReport, campaign.mblId)
    }

    return NextResponse.json(clientReport)
  } catch (err) {
    console.error('Client report error:', err)
    return NextResponse.json({ error: 'Failed to load report' }, { status: 500 })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateClientCsv(report: any, mblId: string): Response {
  const rows: string[] = []

  rows.push(`Campaign: ${report.campaign.title}`)
  rows.push(`Client: ${report.campaign.clientName}`)
  rows.push(`Generated: ${report.generatedAt}`)
  rows.push(`Powered by: ${report.generatedBy}`)
  rows.push('')

  rows.push('=== SUMMARY ===')
  rows.push(`Total Creators,${report.summary.totalCreators}`)
  rows.push(`Verified Deliverables,${report.summary.verifiedDeliverables}`)
  rows.push(`Total Views,${report.summary.totalViews}`)
  rows.push(`Avg Engagement Rate,${report.summary.avgEngagementRate}%`)
  rows.push(`Brand Mentions Confirmed,${report.summary.brandMentionsConfirmed}`)
  rows.push(`Talking Point Coverage,${report.summary.avgTalkingPointCoverage}%`)
  rows.push('')

  rows.push('=== VERIFIED INTEGRATIONS ===')
  rows.push('Creator,Platform,Content URL,Views,UTM,Promo,Brand Mention,Talking Points,Screenshot,Transcript,Status')

  for (const v of report.verifications) {
    rows.push([
      v.creatorHandle,
      v.platform,
      v.contentUrl,
      String(v.viewCountAtDetection ?? ''),
      v.utmLinkDetected ? 'YES' : 'NO',
      v.promoCodeDetected ? `YES (${v.promoCode})` : 'NO',
      v.brandMentionDetected ? `YES (${v.brandMentionMethod})` : 'NO',
      `${v.talkingPointsMatched?.length ?? 0}/${v.talkingPointsTotal ?? 0}`,
      v.screenshotUrl ?? '',
      `"${(v.transcriptExcerpt ?? '').replace(/"/g, '""')}"`,
      v.status,
    ].join(','))
  }

  const csv = rows.join('\n')
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="campaign-report-${mblId}.csv"`,
    },
  })
}
