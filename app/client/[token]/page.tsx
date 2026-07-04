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
  CheckCircle2,
  Clock,
  BarChart3,
  Activity,
  Zap,
  ArrowUpRight,
  Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'

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

  useEffect(() => {
    if (token) fetchReport()
  }, [token])

  const fetchReport = async () => {
    try {
      const response = await fetch(`/api/client/${token}`)
      if (response.ok) {
        setReport(await response.json())
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0E1A' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}>
            <Activity className="w-6 h-6 text-white animate-pulse" />
          </div>
          <p className="text-sm text-slate-400">Loading campaign report...</p>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0E1A' }}>
        <div className="text-center max-w-md px-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
            <Zap className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-white text-lg font-medium mb-2">Link Expired</p>
          <p className="text-slate-400 text-sm">{error}</p>
          <a href="mailto:admin@mobileyes.live" className="inline-block mt-6 px-5 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}>
            Request New Link
          </a>
        </div>
      </div>
    )
  }

  const isGamefluence = report.generatedBy === 'Gamefluence'
  const brandGradient = isGamefluence
    ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)'
    : 'linear-gradient(135deg, #3B82F6, #1D4ED8)'

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <header style={{ background: '#0A0E1A' }}>
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: brandGradient }}>
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: isGamefluence ? '#A78BFA' : '#60A5FA' }}>
                  {report.generatedBy} Campaign Report
                </p>
                <h1 className="text-lg font-bold text-white mt-0.5">{report.campaign.title}</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  {report.campaign.clientName} · {report.campaign.markets.join(', ')} · {report.campaign.mblId}
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
              style={{ background: brandGradient }}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* Hero KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-8">
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Total Reach</span>
              </div>
              <p className="text-2xl font-bold text-white">{report.summary.totalViews.toLocaleString()}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <ThumbsUp className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Engagement</span>
              </div>
              <p className="text-2xl font-bold text-white">{report.summary.avgEngagementRate}%</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Verified</span>
              </div>
              <p className="text-2xl font-bold text-white">{report.summary.verifiedDeliverables}/{report.summary.totalCreators}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <Target className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Conversions</span>
              </div>
              <p className="text-2xl font-bold text-white">{report.summary.totalConversions.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 space-y-6">
        {/* Attribution Detection */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Attribution Detection</h2>
              <p className="text-xs text-gray-500">Automated proof-of-delivery across all integrations</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <AttributionMetric label="UTM Links" value={report.summary.utmLinksDetected} total={report.summary.totalCreators} />
            <AttributionMetric label="Promo Codes" value={report.summary.promoCodesDetected} total={report.summary.totalCreators} />
            <AttributionMetric label="Brand Mentions" value={report.summary.brandMentionsConfirmed} total={report.summary.totalCreators} />
            <AttributionMetric label="Talking Points" value={`${report.summary.avgTalkingPointCoverage}%`} total={null} />
          </div>
        </div>

        {/* Verified Integrations */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Verified Integrations</h2>
                <p className="text-xs text-gray-500">Proof-of-delivery with screenshots, transcripts, and attribution</p>
              </div>
            </div>
          </div>

          {report.verifications.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gray-50">
                <ShieldCheck className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm text-gray-500 font-medium">Verification in progress</p>
              <p className="text-xs text-gray-400 mt-1">Results will appear here once creators publish content.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {report.verifications.map((v: any, idx: number) => (
                <div key={idx} className="px-6 py-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#0A0E1A' }}>
                        <span className="text-xs font-bold text-white">{(v.creatorHandle || '?').charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">{v.creatorHandle}</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{v.platform}</span>
                          {v.status === 'APPROVED' && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                          {v.status === 'PENDING' && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">
                              <Clock className="w-2.5 h-2.5" /> In Review
                            </span>
                          )}
                        </div>
                        <a href={v.contentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-0.5">
                          {v.contentTitle ?? 'View Content'} <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                    {v.viewCountAtDetection != null && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{v.viewCountAtDetection.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Views</p>
                      </div>
                    )}
                  </div>

                  {/* Evidence */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {v.screenshotUrl && (
                      <div className="rounded-xl border border-gray-100 p-3" style={{ background: '#FAFBFC' }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Image className="w-3 h-3 text-gray-400" />
                          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Screenshot Proof</span>
                        </div>
                        <img src={v.screenshotUrl} alt="Integration proof" className="w-full h-28 object-cover rounded-lg" />
                      </div>
                    )}
                    {v.transcriptExcerpt && (
                      <div className="rounded-xl border border-gray-100 p-3" style={{ background: '#FAFBFC' }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <FileAudio className="w-3 h-3 text-gray-400" />
                          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Transcript Proof</span>
                        </div>
                        <p className="text-[11px] text-gray-700 leading-relaxed line-clamp-4 italic">
                          &ldquo;{v.transcriptExcerpt}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Detection Tags */}
                  <div className="flex flex-wrap gap-2">
                    {v.utmLinkDetected && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        <CheckCircle2 className="w-3 h-3" /> UTM Link · {v.utmLinkLocation}
                      </span>
                    )}
                    {v.promoCodeDetected && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-100">
                        <CheckCircle2 className="w-3 h-3" /> Promo: {v.promoCode}
                      </span>
                    )}
                    {v.brandMentionDetected && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3" /> Brand Mentioned · {v.brandMentionMethod}
                      </span>
                    )}
                    {v.talkingPointsMatched?.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                        <CheckCircle2 className="w-3 h-3" /> {v.talkingPointsMatched.length}/{v.talkingPointsTotal} Talking Points
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Performance Table */}
        {report.analytics.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Performance Metrics</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100" style={{ background: '#FAFBFC' }}>
                    <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Creator</th>
                    <th className="text-left px-4 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Platform</th>
                    <th className="text-right px-4 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="text-right px-4 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Engagement</th>
                    <th className="text-right px-4 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">CTR</th>
                    <th className="text-right px-6 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Conversions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {report.analytics.map((a: any, idx: number) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-3.5 text-sm font-medium text-gray-900">{a.creatorHandle || '—'}</td>
                      <td className="px-4 py-3.5 text-sm text-gray-600">{a.platform}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 text-right">{a.totalViews?.toLocaleString() ?? '—'}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 text-right">{a.engagementRate != null ? `${a.engagementRate}%` : '—'}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 text-right">{a.clickThroughRate != null ? `${a.clickThroughRate}%` : '—'}</td>
                      <td className="px-6 py-3.5 text-sm font-semibold text-gray-900 text-right">{a.conversions ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: '#0A0E1A' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #EF4444, #B91C1C)' }} />
            </div>
            <span className="text-xs font-semibold text-gray-400 tracking-wide">{report.generatedBy.toUpperCase()}</span>
          </div>
          <p className="text-[11px] text-gray-400">
            Report generated {new Date(report.generatedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })} · Automated verification technology
          </p>
        </div>
      </footer>
    </div>
  )
}

function AttributionMetric({ label, value, total }: { label: string; value: string | number; total: number | null }) {
  const percentage = total && typeof value === 'number' && total > 0 ? Math.round((value / total) * 100) : null
  return (
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      {percentage !== null && (
        <div className="mt-2">
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${Math.min(percentage, 100)}%` }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">{percentage}% of creators</p>
        </div>
      )}
    </div>
  )
}
