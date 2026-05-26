'use client'

import { useState } from 'react'
import { Search, UserPlus, Globe, Shield, TrendingUp, Star, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TalentDiscoveryPage() {
  const [searchUrl, setSearchUrl] = useState('')
  const [searchType, setSearchType] = useState<'url' | 'search'>('url')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [filters, setFilters] = useState({
    platform: 'ALL',
    market: 'ALL',
    minFollowers: '',
    game: '',
  })

  const handleUrlScrape = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchUrl.trim()) return
    setIsSearching(true)
    try {
      const response = await fetch('/api/admin/discover/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: searchUrl.trim() }),
      })
      const data = await response.json()
      if (response.ok && data.scraped) {
        setResults([data])
      } else {
        setResults([{
          handle: searchUrl.split('/').pop() || searchUrl,
          platform: detectPlatformFromUrl(searchUrl),
          status: 'error',
          message: data.error || 'Could not scrape profile. Check the URL or API credentials.',
        }])
      }
    } catch (err) {
      setResults([{
        handle: searchUrl.split('/').pop() || searchUrl,
        platform: detectPlatformFromUrl(searchUrl),
        status: 'error',
        message: 'Network error — check connection.',
      }])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    setIsSearching(true)
    try {
      const params = new URLSearchParams({ game: searchQuery.trim() })
      if (filters.platform !== 'ALL') params.set('platform', filters.platform)
      if (filters.market !== 'ALL') params.set('market', filters.market)
      if (filters.minFollowers) params.set('minFollowers', filters.minFollowers)

      const response = await fetch(`/api/admin/discover/search?${params.toString()}`)
      const data = await response.json()
      setResults(Array.isArray(data.results) ? data.results : [])
    } catch (err) {
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Talent Discovery</h1>
        <p className="text-gray-500 mt-1">
          Find, scrape, score, and outreach gaming creators across all platforms
        </p>
      </div>

      {/* Search Mode Toggle */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setSearchType('url')}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            searchType === 'url' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
          )}
        >
          Scrape by URL
        </button>
        <button
          onClick={() => setSearchType('search')}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            searchType === 'search' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
          )}
        >
          Search & Discover
        </button>
      </div>

      {/* URL Scrape */}
      {searchType === 'url' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Scrape Creator Profile</h3>
          <p className="text-xs text-gray-500 mb-4">
            Paste a YouTube, Twitch, Kick, TikTok, or Instagram URL to auto-scrape their profile data
          </p>
          <form onSubmit={handleUrlScrape} className="flex gap-3">
            <input
              type="url"
              value={searchUrl}
              onChange={(e) => setSearchUrl(e.target.value)}
              placeholder="https://youtube.com/@creator or https://twitch.tv/creator..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 disabled:opacity-50"
            >
              {isSearching ? 'Scraping...' : 'Scrape Profile'}
            </button>
          </form>
        </div>
      )}

      {/* Search & Discover */}
      {searchType === 'search' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Discover Creators</h3>
          <p className="text-xs text-gray-500 mb-4">
            Search by game, genre, or keyword across all platforms
          </p>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by game (e.g. 'Valorant'), genre, or keyword..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Discover'}
              </button>
            </div>
            <div className="flex gap-3">
              <select value={filters.platform} onChange={(e) => setFilters({...filters, platform: e.target.value})} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="ALL">All Platforms</option>
                <option value="YouTube">YouTube</option>
                <option value="Twitch">Twitch</option>
                <option value="Kick">Kick</option>
                <option value="TikTok">TikTok</option>
              </select>
              <select value={filters.market} onChange={(e) => setFilters({...filters, market: e.target.value})} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="ALL">All Markets</option>
                <option value="AU">Australia</option>
                <option value="NZ">New Zealand</option>
                <option value="VN">Vietnam</option>
                <option value="TH">Thailand</option>
                <option value="ID">Indonesia</option>
                <option value="APAC">APAC (All)</option>
              </select>
              <input
                type="number"
                value={filters.minFollowers}
                onChange={(e) => setFilters({...filters, minFollowers: e.target.value})}
                placeholder="Min followers"
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-32"
              />
            </div>
          </form>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {result.profileImageUrl ? (
                    <img src={result.profileImageUrl} alt={result.displayName || result.handle} className="w-14 h-14 rounded-xl object-cover" />
                  ) : (
                    <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{result.displayName || `@${result.handle}`}</h3>
                    <p className="text-sm text-gray-500">{result.platform} {result.country ? `• ${result.country}` : ''}</p>
                    {result.bio && <p className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-md">{result.bio}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100">
                    <UserPlus className="w-3 h-3" />
                    Add to Roster
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100">
                    <Shield className="w-3 h-3" />
                    Safety Check
                  </button>
                </div>
              </div>

              {result.status === 'error' && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {result.message}
                </div>
              )}

              {/* Score cards with real data */}
              <div className="mt-4 grid grid-cols-5 gap-3">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Followers</p>
                  <p className="text-sm font-bold text-gray-900">
                    {result.followerCount ? formatNumber(result.followerCount) : '—'}
                  </p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Avg Views</p>
                  <p className="text-sm font-bold text-gray-900">
                    {result.avgViews ? formatNumber(result.avgViews) : '—'}
                  </p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Engagement</p>
                  <p className="text-sm font-bold text-gray-900">
                    {result.engagementRate ? `${result.engagementRate}%` : '—'}
                  </p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Live Content</p>
                  <p className="text-sm font-bold text-gray-900">
                    {result.hasLiveContent ? '✓ Yes' : result.isLive ? '🔴 Live' : '—'}
                  </p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Videos</p>
                  <p className="text-sm font-bold text-gray-900">
                    {result.videoCount ? formatNumber(result.videoCount) : '—'}
                  </p>
                </div>
              </div>

              {/* Recent videos preview */}
              {result.recentVideos && result.recentVideos.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Recent Content</p>
                  <div className="space-y-1">
                    {result.recentVideos.slice(0, 3).map((video: any, vi: number) => (
                      <div key={vi} className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 rounded px-3 py-1.5">
                        <span className="truncate max-w-xs">{video.title}</span>
                        <span className="text-gray-400 ml-2 whitespace-nowrap">
                          {video.isLive && '🔴 '}{formatNumber(video.views)} views
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {results.length === 0 && !isSearching && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover Gaming Talent</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Paste a creator URL to scrape their profile, or search by game/genre to discover new talent across YouTube, Twitch, Kick, and TikTok.
          </p>
        </div>
      )}
    </div>
  )
}

function detectPlatformFromUrl(url: string): string {
  if (url.includes('youtube')) return 'YouTube'
  if (url.includes('twitch')) return 'Twitch'
  if (url.includes('kick')) return 'Kick'
  if (url.includes('tiktok')) return 'TikTok'
  if (url.includes('instagram')) return 'Instagram'
  return 'Unknown'
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
