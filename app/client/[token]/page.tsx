'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  ShieldCheck,
  ExternalLink,
  Image,
  FileAudio,
  TrendingUp,
  Eye,
  ThumbsUp,
  Download,
  CheckCircle,
  Clock,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Client-Facing Campaign Dashboard
 * 
 * Read-only view for brand clients to see:
 * - Campaign verification status and proof-of-delivery
 * - Screenshots + transcript excerpts
 * - Performance metrics (views, engagement, conversions)
 * - Attribution data
 * 
 * Access via secure token link (no login required).
 * URL: /client/[token] — token maps to a campaignId
 * 
 * Branded as either Mobileyes or Gamefluence depending on campaign type.
 */

interface CampaignReport {
  campaign: {
    mblId: string
    title: string
    clientName: string
    objective: string
    markets: string[]
    startDate: string | null
    endDate: string | null
    status: string
  }
  generatedAt: string
  generatedBy: 'Mobileyes' | 'Gamefluence'
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
    avgTalkingPointCoverage: number
  }
  verifications: any[]
  analytics: any[]
  attribution: any
}

export default function ClientDashboard() {
  const params = useParams()
  const token = params.token as string

  const [report, setReport] = useState<CampaignReport | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReport = async () => {
    try {
      const response = await fetch(`/api/client/${token}`)
      if (response.ok) {
        const data = await response.json()
        setReport(data)
      } else if (response.status === 404) {
        setError('Campaign not found or link expired.')
      } else {
        setError('Failed to load campaign data.')
      }
    } catch {
      setError('Failed to load campaign data.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchReport()
  }, [token])

  const handleDownloadCsv = async () => {
    try {
      const response = await fetch(`/api/client/${token}?format=csv`)
      if (!response.ok) return
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `campaign-report-${report?.campaign.mblId ?? 'report'}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 text-lg">{error ?? 'Something went wrong.'}</p>
        </div>
      </div>
    )
  }

  const isGamefluence = report.generatedBy === 'Gamefluence'
  const brandColor = isGamefluence ? 'violet' : 'slate'
  const brandName = isGamefluence ? 'Gamefluence' : 'Mobileyes'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={cn(
        'border-b px-8 py-5',
        isGamefluence ? 'bg-violet-950 border-violet-800' : 'bg-slate-900 border-slate-700'
      )}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className={cn(
              'text-xs font-medium uppercase tracking-wider mb-1',
              isGamefluence ? 'text-violet-300' : 'text-slate-400'
            )}>
              {brandName} — Campaign Report
            </p>
            <h1 className="text-xl font-bold text-white">{report.campaign.title}</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {report.campaign.clientName} · {report.campaign.markets.join(', ')}
            </p>
          </div>
          <button
            onClick={handleDownloadCsv}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
              isGamefluence
                ? 'bg-violet-600 text-white hover:bg-violet-500'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            )}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <SummaryCard
            icon={<Eye className="w-5 h-5" />}
            label="Total Views"
            value={report.summary.totalViews.toLocaleString()}
            brandColor={brandColor}
          />
          <SummaryCard
            icon={<ThumbsUp className="w-5 h-5" />}
            label="Engagement Rate"
            value={`${report.summary.avgEngagementRate}%`}
            brandColor={brandColor}
          />
          <SummaryCard
            icon={<ShieldCheck className="w-5 h-5" />}
            label="Verified Deliverables"
            value={`${report.summary.verifiedDeliverables}/${report.summary.totalCreators}`}
            brandColor={brandColor}
          />
          <SummaryCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Conversions"
            value={report.summary.totalConversions.toLocaleString()}
            brandColor={brandColor}
          />
        </div>

        {/* Attribution Detection Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Attribution Detection
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-2xl font-bold text-gray-900">{report.summary.utmLinksDetected}</p>
              <p className="text-xs text-gray-500">UTM Links Detected</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{report.summary.promoCodesDetected}</p>
              <p className="text-xs text-gray-500">Promo Codes Detected</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{report.summary.brandMentionsConfirmed}</p>
              <p className="text-xs text-gray-500">Brand Mentions Confirmed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{report.summary.avgTalkingPointCoverage}%</p>
              <p className="text-xs text-gray-500">Talking Point Coverage</p>
            </div>
          </div>
        </div>

        {/* Verified Integrations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Verified Integrations — Proof of Delivery
          </h2>

          {report.verifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              Content verification in progress. Results will appear here once creators publish.
            </p>
          ) : (
            <div className="space-y-4">
              {report.verifications.map((v: any, idx: number) => (
                <div key={idx} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{v.creatorHandle}</p>
                        <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          {v.platform}
                        </span>
                        {v.status === 'APPROVED' && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                            <CheckCircle className="w-2.5 h-2.5" /> Verified
                          </span>
                        )}
                        {v.status === 'PENDING' && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                            <Clock className="w-2.5 h-2.5" /> In Review
                          </span>
                        )}
                      </div>
                      <a
                        href={v.contentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                      >
                        {v.contentTitle ?? 'View Content'}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="text-right">
                      {v.viewCountAtDetection != null && (
                        <p className="text-sm font-semibold text-gray-900">
                          {v.viewCountAtDetection.toLocaleString()} views
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400">
                        {v.publishedAt ? new Date(v.publishedAt).toLocaleDateString() : ''}
                      </p>
                    </div>
                  </div>

                  {/* Evidence */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {v.screenshotUrl && (
                      <div className="bg-gray-50 rounded border border-gray-100 p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Image className="w-3 h-3 text-gray-400" />
                          <span className="text-[10px] font-medium text-gray-500">SCREENSHOT PROOF</span>
                        </div>
                        <img
                          src={v.screenshotUrl}
                          alt="Integration proof"
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                    )}
                    {v.transcriptExcerpt && (
                      <div className="bg-gray-50 rounded border border-gray-100 p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <FileAudio className="w-3 h-3 text-gray-400" />
                          <span className="text-[10px] font-medium text-gray-500">TRANSCRIPT PROOF</span>
                        </div>
                        <p className="text-[11px] text-gray-700 leading-relaxed line-clamp-4">
                          &ldquo;{v.transcriptExcerpt}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Detection Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {v.utmLinkDetected && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                        UTM Link ✓
                      </span>
                    )}
                    {v.promoCodeDetected && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-medium">
                        Promo: {v.promoCode}
                      </span>
                    )}
                    {v.brandMentionDetected && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-medium">
                        Brand Mentioned ({v.brandMentionMethod})
                      </span>
                    )}
                    {v.talkingPointsMatched?.length > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
                        {v.talkingPointsMatched.length}/{v.talkingPointsTotal} Talking Points
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Performance Metrics */}
        {report.analytics.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Performance Metrics</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 pb-2">Creator</th>
                  <th className="text-left text-xs font-medium text-gray-500 pb-2">Platform</th>
                  <th className="text-left text-xs font-medium text-gray-500 pb-2">Type</th>
                  <th className="text-right text-xs font-medium text-gray-500 pb-2">Views</th>
                  <th className="text-right text-xs font-medium text-gray-500 pb-2">Engagement</th>
                  <th className="text-right text-xs font-medium text-gray-500 pb-2">CTR</th>
                  <th className="text-right text-xs font-medium text-gray-500 pb-2">Conversions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {report.analytics.map((a: any, idx: number) => (
                  <tr key={idx}>
                    <td className="py-2 text-sm text-gray-900">{a.creatorHandle || '—'}</td>
                    <td className="py-2 text-sm text-gray-600">{a.platform}</td>
                    <td className="py-2 text-sm text-gray-600">{a.contentType}</td>
                    <td className="py-2 text-sm text-gray-900 text-right">
                      {a.totalViews?.toLocaleString() ?? '—'}
                    </td>
                    <td className="py-2 text-sm text-gray-900 text-right">
                      {a.engagementRate != null ? `${a.engagementRate}%` : '—'}
                    </td>
                    <td className="py-2 text-sm text-gray-900 text-right">
                      {a.clickThroughRate != null ? `${a.clickThroughRate}%` : '—'}
                    </td>
                    <td className="py-2 text-sm text-gray-900 text-right">
                      {a.conversions ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Report generated by {brandName} · {new Date(report.generatedAt).toLocaleDateString()}
          </p>
          <p className="text-[10px] text-gray-300 mt-1">
            Integration verification powered by automated content detection technology.
          </p>
        </div>
      </main>
    </div>
  )
}

function SummaryCard({
  icon,
  label,
  value,
  brandColor,
}: {
  icon: React.ReactNode
  label: string
  value: string
  brandColor: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={cn(
        'w-8 h-8 rounded-lg flex items-center justify-center mb-3',
        brandColor === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-600'
      )}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  )
}
