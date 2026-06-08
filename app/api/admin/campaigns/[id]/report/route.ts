import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCampaign, getCampaignCreators } from '@/lib/db'
import { getVerificationsForCampaign } from '@/lib/db/verifications'
import { getCampaignAnalytics } from '@/lib/db/analytics'
import { generateCampaignReportData, type CampaignReportExport } from '@/lib/campaign-report'
import { buildCsvRow, sanitizeCsvCell } from '@/lib/csv-sanitize'

/**
 * GET /api/admin/campaigns/[id]/report?format=json|csv|pdf
 * 
 * Branded campaign analytics report — exportable proof-of-delivery.
 * Includes:
 * - Verification proof (screenshots, transcript excerpts, UTM/promo detection)
 * - Performance metrics (views, engagement, conversions)
 * - Attribution data (click tracking, S2S events, conversion windows)
 * 
 * Formats:
 * - json: Full structured data
 * - csv: Tabular export for spreadsheet analysis
 * - pdf: Branded report document (Mobileyes/Gamefluence branded)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') ?? 'json'

    const campaign = await getCampaign(id)
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    const creators = await getCampaignCreators(id)
    const verifications = await getVerificationsForCampaign(id)
    const analytics = await getCampaignAnalytics(id)

    const reportData = generateCampaignReportData(campaign, creators, verifications, analytics)

    switch (format) {
      case 'csv':
        return generateCsvResponse(reportData)
      case 'pdf':
        return generatePdfResponse(reportData)
      default:
        return NextResponse.json(reportData)
    }
  } catch (err) {
    console.error('Error generating campaign report:', err)
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}

function generateCsvResponse(report: CampaignReportExport): Response {
  const rows: string[] = []

  // Header
  rows.push('Campaign Report: ' + report.campaign.title)
  rows.push('Client: ' + report.campaign.clientName)
  rows.push('Report Generated: ' + report.generatedAt)
  rows.push('')

  // Summary metrics
  rows.push('=== CAMPAIGN SUMMARY ===')
  rows.push(`Total Creators,${report.summary.totalCreators}`)
  rows.push(`Verified Deliverables,${report.summary.verifiedDeliverables}`)
  rows.push(`Total Views,${report.summary.totalViews}`)
  rows.push(`Total Engagement,${report.summary.totalEngagement}`)
  rows.push(`Avg Engagement Rate,${report.summary.avgEngagementRate}%`)
  rows.push('')

  // Verification proof table
  rows.push('=== VERIFIED INTEGRATIONS ===')
  rows.push('Creator,Platform,Content URL,Published,Views at Detection,UTM Detected,Promo Detected,Brand Mentioned,Talking Points Matched,Screenshot,Transcript Excerpt,Status,Approved At')

  for (const v of report.verifications) {
    rows.push(buildCsvRow([
      v.creatorHandle,
      v.platform,
      v.contentUrl,
      v.publishedAt ?? '',
      v.viewCountAtDetection,
      v.utmLinkDetected ? 'YES' : 'NO',
      v.promoCodeDetected ? 'YES' : 'NO',
      v.brandMentionDetected ? 'YES' : 'NO',
      `${v.talkingPointsMatched.length}/${v.talkingPointsTotal}`,
      v.screenshotUrl ?? '',
      sanitizeCsvCell(v.transcriptExcerpt),
      v.status,
      v.approvedAt ?? '',
    ]))
  }

  rows.push('')

  // Performance table
  rows.push('=== PERFORMANCE METRICS ===')
  rows.push('Creator,Platform,Content Type,Views,Engagement Rate,Click Through Rate,Conversions,Revenue,ROAS')

  for (const a of report.analytics) {
    rows.push(buildCsvRow([
      a.creatorHandle ?? '',
      a.platform,
      a.contentType,
      a.totalViews,
      a.engagementRate != null ? `${a.engagementRate}%` : '',
      a.clickThroughRate != null ? `${a.clickThroughRate}%` : '',
      a.conversions,
      a.revenue,
      a.roas,
    ]))
  }

  const csv = rows.join('\n')
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="campaign-report-${report.campaign.mblId}.csv"`,
    },
  })
}

function generatePdfResponse(report: CampaignReportExport): Response {
  // For PDF generation, return structured data that the frontend can render
  // using @react-pdf/renderer (already installed in the project).
  // The actual PDF rendering happens client-side or via a separate serverless function.
  // Here we return the data structured for the PDF template.
  return NextResponse.json({
    ...report,
    _format: 'pdf',
    _message: 'Use /admin/campaigns/[id]/report/download for PDF binary. This endpoint returns structured data for client-side rendering.',
  })
}
