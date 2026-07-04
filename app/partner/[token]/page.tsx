'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  BarChart3,
  Users,
  Megaphone,
  Eye,
  ShieldCheck,
  Tag,
  DollarSign,
  ExternalLink,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Zap,
  Activity,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PartnerData {
  partner: {
    name: string
    company: string
    tier: string
    tags: string[]
  }
  summary: {
    totalCampaigns: number
    activeCampaigns: number
    totalCreators: number
    totalViews: number
    totalVerified: number
    totalPromoRedemptions: number
    referralEarnings: number
  }
  campaigns: Array<{
    id: string
    mblId: string
    title: string
    status: string
    creatorsCount: number
    totalViews: number
    verificationsApproved: number
    verificationsPending: number
    promoCodesDetected: number
    utmLinksDetected: number
    startDate: string | null
    endDate: string | null
  }>
  creators: Array<{
    id: string
    mblId: string
    fullName: string
    platform: string
    handleUrl: string
    followerCount: number
    status: string
    contentNiche: string[]
  }>
}

export default function PartnerDashboard() {
  const params = useParams()
  const token = params.token as string

  const [data, setData] = useState<PartnerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'creators'>('overview')

  useEffect(() => {
    if (token) fetchData()
  }, [token])

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/partner/${token}`)
      if (res.ok) {
        setData(await res.json())
      } else if (res.status === 401) {
        setError('This link has expired. Contact admin@mobileyes.live for a new one.')
      } else {
        setError('Failed to load dashboard.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0E1A' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}>
            <Activity className="w-6 h-6 text-white animate-pulse" />
          </div>
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0E1A' }}>
        <div className="text-center max-w-md px-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
            <Zap className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-white text-lg font-medium mb-2">Access Denied</p>
          <p className="text-slate-400 text-sm">{error ?? 'Something went wrong.'}</p>
          <a href="mailto:admin@mobileyes.live" className="inline-block mt-6 px-5 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}>
            Contact Support
          </a>
        </div>
      </div>
    )
  }

  const tierGradient = data.partner.tier === 'ENTERPRISE' ? 'linear-gradient(135deg, #F59E0B, #D97706)' :
    data.partner.tier === 'ADVANCED' ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' :
    'linear-gradient(135deg, #3B82F6, #1D4ED8)'

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Premium Header */}
      <header style={{ background: '#0A0E1A' }}>
        <div className="max-w-7xl mx-auto px-8 pt-8 pb-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: tierGradient }}>
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-white">{data.partner.company}</h1>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-white/80" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    {data.partner.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Partner Analytics · Real-time campaign intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {data.partner.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide uppercase" style={{ background: 'rgba(59,130,246,0.1)', color: '#60A5FA' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Metric — the big win number */}
          <div className="pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Primary KPI */}
              <div className="lg:col-span-1 rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(29,78,216,0.06))', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">Revenue Generated</span>
                </div>
                <p className="text-4xl font-bold text-white tracking-tight">
                  ${data.summary.referralEarnings.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 mt-2">Total attributed revenue from your campaigns</p>
              </div>

              {/* Secondary KPIs */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                <HeroStat label="Campaigns" value={data.summary.totalCampaigns} icon={<Megaphone className="w-3.5 h-3.5" />} />
                <HeroStat label="Creators" value={data.summary.totalCreators} icon={<Users className="w-3.5 h-3.5" />} />
                <HeroStat label="Total Views" value={formatCompact(data.summary.totalViews)} icon={<Eye className="w-3.5 h-3.5" />} />
                <HeroStat label="Promo Uses" value={data.summary.totalPromoRedemptions} icon={<Tag className="w-3.5 h-3.5" />} />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0.5">
            {(['overview', 'campaigns', 'creators'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-5 py-3 text-sm font-medium transition-all capitalize relative',
                  activeTab === tab
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-300'
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ background: '#3B82F6' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Performance Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PerformanceCard
                title="Verified Deliverables"
                value={data.summary.totalVerified}
                subtitle="Content verified with proof-of-delivery"
                icon={<ShieldCheck className="w-5 h-5" />}
                accent="emerald"
              />
              <PerformanceCard
                title="Active Campaigns"
                value={data.summary.activeCampaigns}
                subtitle="Currently in progress"
                icon={<Activity className="w-5 h-5" />}
                accent="blue"
              />
              <PerformanceCard
                title="Attribution Rate"
                value={data.summary.totalVerified > 0 ? '100%' : '—'}
                subtitle="UTM + promo code detection"
                icon={<TrendingUp className="w-5 h-5" />}
                accent="violet"
              />
            </div>

            {/* Campaign Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Campaign Pipeline</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Live status across all your campaigns</p>
                  </div>
                  <span className="text-xs text-gray-400">Updated in real-time</span>
                </div>
              </div>
              {data.campaigns.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gray-50">
                    <Megaphone className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">No campaigns yet</p>
                  <p className="text-xs text-gray-400 mt-1">Campaigns will appear here once briefed and assigned.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {data.campaigns.map(campaign => (
                    <div key={campaign.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-2 h-2 rounded-full',
                          campaign.status === 'COMPLETE' || campaign.status === 'PAID' ? 'bg-emerald-500' :
                          campaign.status === 'IN_PROGRESS' || campaign.status === 'SENT' ? 'bg-blue-500 animate-pulse' :
                          'bg-gray-300'
                        )} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{campaign.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{campaign.mblId} · {campaign.creatorsCount} creator{campaign.creatorsCount !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{campaign.totalViews.toLocaleString()}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Views</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{campaign.promoCodesDetected}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Conversions</p>
                        </div>
                        <div className="text-right">
                          {campaign.verificationsApproved > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </span>
                          ) : campaign.verificationsPending > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-700">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-gray-50 text-gray-500">
                              In Progress
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">All Campaigns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100" style={{ background: '#FAFBFC' }}>
                    <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="text-left px-4 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-center px-4 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Creators</th>
                    <th className="text-right px-4 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="text-right px-4 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">UTM Clicks</th>
                    <th className="text-right px-4 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Promo Uses</th>
                    <th className="text-right px-6 py-3.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.campaigns.length === 0 ? (
                    <tr><td colSpan={7} className="px-6 py-16 text-center text-gray-400 text-sm">No campaigns yet.</td></tr>
                  ) : (
                    data.campaigns.map(c => (
                      <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{c.title}</p>
                          <p className="text-[11px] text-gray-400 font-mono mt-0.5">{c.mblId}</p>
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-sm font-semibold text-gray-900">{c.creatorsCount}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-sm font-semibold text-gray-900">{c.totalViews.toLocaleString()}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-sm font-semibold text-gray-900">{c.utmLinksDetected}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-sm font-semibold text-gray-900">{c.promoCodesDetected}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {c.verificationsApproved > 0 ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {c.verificationsApproved} verified
                            </span>
                          ) : c.verificationsPending > 0 ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                              <Clock className="w-3.5 h-3.5" /> {c.verificationsPending} pending
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Creators Tab */}
        {activeTab === 'creators' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Creator Roster</h3>
                <p className="text-xs text-gray-500 mt-0.5">Creators assigned to your campaigns</p>
              </div>
              <span className="text-xs text-gray-400">{data.creators.length} creator{data.creators.length !== 1 ? 's' : ''}</span>
            </div>
            {data.creators.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gray-50">
                  <Users className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-sm text-gray-500 font-medium">No creators assigned yet</p>
                <p className="text-xs text-gray-400 mt-1">Creators will appear here once campaigns are live.</p>
              </div>
            ) : (
              data.creators.map(creator => (
                <div key={creator.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1E293B, #334155)' }}>
                      <span className="text-sm font-bold text-white">{creator.fullName.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-gray-900">{creator.fullName}</h3>
                        {creator.status === 'ACTIVE' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {creator.platform} · {creator.followerCount.toLocaleString()} followers · {creator.contentNiche.join(', ')}
                      </p>
                    </div>
                  </div>
                  <a
                    href={creator.handleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    View Channel <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))
            )}
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
            <span className="text-xs font-semibold text-gray-400 tracking-wide">MOBILEYES</span>
          </div>
          <p className="text-[11px] text-gray-400">
            Questions? <a href="mailto:admin@mobileyes.live" className="text-blue-500 hover:text-blue-600">admin@mobileyes.live</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

// ─── COMPONENTS ───────────────────────────────────────

function HeroStat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-slate-500">{icon}</span>
        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  )
}

function PerformanceCard({ title, value, subtitle, icon, accent }: {
  title: string; value: string | number; subtitle: string; icon: React.ReactNode; accent: string
}) {
  const accentMap: Record<string, { bg: string; iconBg: string; iconColor: string }> = {
    emerald: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    violet: { bg: 'bg-violet-50', iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
  }
  const colors = accentMap[accent] ?? accentMap.blue
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4', colors.iconBg, colors.iconColor)}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">{title}</p>
      <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; dot: string }> = {
    COMPLETE: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    PAID: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    IN_PROGRESS: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    SENT: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    REVIEW: { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
    APPROVED: { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
    DRAFT: { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' },
    BRIEFING: { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' },
  }
  const c = config[status] ?? config.DRAFT
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold', c.bg, c.text)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', c.dot)} />
      {status.replace('_', ' ')}
    </span>
  )
}

function formatCompact(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}
