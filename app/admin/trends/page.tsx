'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, DollarSign, Globe, Zap, BarChart3, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'overview' | 'brands' | 'platforms' | 'campaigns' | 'seasonal'

export default function MarketTrendsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [data, setData] = useState<any>(null)
  const [liveData, setLiveData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTrends()
  }, [])

  const fetchTrends = async () => {
    try {
      const [trendsRes, liveRes] = await Promise.all([
        fetch('/api/admin/trends'),
        fetch('/api/admin/trends?section=live'),
      ])
      if (trendsRes.ok) setData(await trendsRes.json())
      if (liveRes.ok) setLiveData(await liveRes.json())
    } catch (err) {
      console.error('Failed to fetch trends:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div></div>
  }

  const market = data?.market
  const currentMonth = new Date().getMonth()
  const currentSeason = data?.seasonalPatterns?.[currentMonth]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Market Trends</h1>
        <p className="text-gray-500 mt-1">Where the money is in gaming influencer marketing</p>
      </div>

      {/* Market Overview Cards */}
      {market && (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <p className="text-xs text-gray-500">Global Market</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{market.globalMarketSize}</p>
            <p className="text-xs text-green-600 mt-1">+{market.yoyGrowth}% YoY</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <p className="text-xs text-gray-500">APAC Market</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{market.apacMarketSize}</p>
            <p className="text-xs text-gray-400 mt-1">Our primary region</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <p className="text-xs text-gray-500">Australia</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{market.australiaMarketSize}</p>
            <p className="text-xs text-gray-400 mt-1">Home market</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              <p className="text-xs text-gray-500">Current Season</p>
            </div>
            <p className="text-lg font-bold text-gray-900">{currentSeason?.spendLevel}</p>
            <p className="text-xs text-gray-400 mt-1">{currentSeason?.month}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {(['overview', 'brands', 'platforms', 'campaigns', 'seasonal'] as Tab[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize', activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600')}>
            {tab === 'campaigns' ? 'Campaign Types' : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Live Trending */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-500" />
                Trending on YouTube Gaming (AU)
              </h3>
              {liveData?.youtubeTrending?.length > 0 ? (
                <div className="space-y-2">
                  {liveData.youtubeTrending.slice(0, 8).map((video: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 truncate max-w-xs">{video.title}</span>
                      <span className="text-gray-400 text-xs whitespace-nowrap ml-2">{formatNumber(video.viewCount)} views</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Loading live data...</p>
              )}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-500" />
                Top Twitch Categories (Live)
              </h3>
              {liveData?.twitchTopGames?.length > 0 ? (
                <div className="space-y-2">
                  {liveData.twitchTopGames.slice(0, 10).map((game: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{game.name}</span>
                      <span className="text-gray-400 text-xs">{formatNumber(game.viewers)} viewers</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Loading live data...</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Average Creator Rates (AUD)</h3>
            {market && (
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(market.avgCreatorRate).map(([platform, tiers]: [string, any]) => (
                  <div key={platform} className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase">{platform}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-gray-400">Micro</span><span className="text-gray-700">{tiers.micro}</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-400">Mid</span><span className="text-gray-700">{tiers.mid}</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-400">Macro</span><span className="text-gray-700">{tiers.macro}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'brands' && data?.topSpenders && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Brand</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Industry</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Est. Spend</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Platforms</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Frequency</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Opportunity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.topSpenders.map((brand: any) => (
                <tr key={brand.rank} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-bold text-gray-400">{brand.rank}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{brand.brand}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{brand.industry}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-700">{brand.estimatedSpend}</td>
                  <td className="px-4 py-3"><div className="flex gap-1 flex-wrap">{brand.platforms.map((p: string) => <span key={p} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600">{p}</span>)}</div></td>
                  <td className="px-4 py-3 text-xs text-gray-600">{brand.frequency}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-xs">{brand.opportunity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'platforms' && data?.platforms && (
        <div className="grid grid-cols-2 gap-6">
          {data.platforms.map((platform: any) => (
            <div key={platform.platform} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{platform.platform}</h3>
                <span className={cn('text-sm font-medium', platform.growthRate > 0 ? 'text-green-600' : 'text-red-600')}>
                  {platform.growthRate > 0 ? '+' : ''}{platform.growthRate}% YoY
                </span>
              </div>
              <dl className="space-y-3">
                <div className="flex justify-between"><dt className="text-sm text-gray-500">Active Creators</dt><dd className="text-sm font-medium">{formatNumber(platform.monthlyActiveCreators)}</dd></div>
                <div className="flex justify-between"><dt className="text-sm text-gray-500">Avg CPM</dt><dd className="text-sm font-medium">${platform.avgCPM}</dd></div>
                <div className="flex justify-between"><dt className="text-sm text-gray-500">Sponsorship Rate</dt><dd className="text-sm font-medium">{platform.avgSponsorshipRate}</dd></div>
                <div className="flex justify-between"><dt className="text-sm text-gray-500">Best For</dt><dd className="text-sm text-gray-700">{platform.bestFor}</dd></div>
              </dl>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Top Categories</p>
                <div className="flex gap-1 flex-wrap">{platform.topCategories.map((c: string) => <span key={c} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">{c}</span>)}</div>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700"><strong>Mobileyes angle:</strong> {platform.mobileyesOpportunity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'campaigns' && data?.campaignTypes && (
        <div className="space-y-4">
          {data.campaignTypes.map((type: any) => (
            <div key={type.type} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">{type.type}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{type.marketShare}% market share</span>
                  <span className={cn('text-xs font-medium', type.growthRate > 20 ? 'text-green-600' : 'text-gray-600')}>+{type.growthRate}% growth</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{type.description}</p>
              <div className="flex items-center gap-6 text-xs">
                <span className="text-gray-500">Avg Budget: <strong className="text-gray-700">{type.avgBudget}</strong></span>
                <span className="text-gray-500">Avg ROAS: <strong className="text-green-700">{type.avgROAS}</strong></span>
                <span className="text-gray-500">Best on: {type.bestPlatforms.join(', ')}</span>
              </div>
              {/* Visual bar for market share */}
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-700 rounded-full" style={{ width: `${type.marketShare}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'seasonal' && data?.seasonalPatterns && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-6">Annual Spend Cycle — When Brands Spend</h3>
          <div className="grid grid-cols-12 gap-2 mb-6">
            {data.seasonalPatterns.map((month: any) => {
              const height = month.spendLevel === 'PEAK' ? 'h-32' : month.spendLevel === 'HIGH' ? 'h-24' : month.spendLevel === 'MEDIUM' ? 'h-16' : 'h-8'
              const color = month.spendLevel === 'PEAK' ? 'bg-green-500' : month.spendLevel === 'HIGH' ? 'bg-green-300' : month.spendLevel === 'MEDIUM' ? 'bg-yellow-300' : 'bg-gray-200'
              const isCurrent = month.monthIndex === currentMonth
              return (
                <div key={month.month} className="flex flex-col items-center justify-end">
                  <div className={cn(height, 'w-full rounded-t-md transition-all', color, isCurrent && 'ring-2 ring-blue-500')} />
                  <p className={cn('text-[10px] mt-1', isCurrent ? 'font-bold text-blue-600' : 'text-gray-400')}>{month.month.slice(0, 3)}</p>
                </div>
              )
            })}
          </div>
          <div className="space-y-3">
            {data.seasonalPatterns.map((month: any) => (
              <div key={month.month} className={cn('flex items-start gap-4 p-3 rounded-lg', month.monthIndex === currentMonth ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50')}>
                <div className="w-20 flex-shrink-0">
                  <p className="text-sm font-medium text-gray-900">{month.month}</p>
                  <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                    month.spendLevel === 'PEAK' ? 'bg-green-100 text-green-700' :
                    month.spendLevel === 'HIGH' ? 'bg-green-50 text-green-600' :
                    month.spendLevel === 'MEDIUM' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-500'
                  )}>{month.spendLevel}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{month.drivers.join(' · ')}</p>
                  <p className="text-xs text-blue-600 mt-1">{month.opportunities.join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
