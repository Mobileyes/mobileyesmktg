'use client'

import { useState } from 'react'
import { Search, Building2, Calendar, Users, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react'

export default function BrandIntelligencePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    setIsSearching(true)
    
    // In production, this calls /api/admin/brands/research
    // For now, show the UI structure
    setTimeout(() => {
      setResults({
        brandName: searchQuery,
        status: 'pending',
        message: 'Connect web search API for live brand research. Structure is ready.',
      })
      setIsSearching(false)
    }, 1500)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Brand Intelligence</h1>
        <p className="text-gray-500 mt-1">
          Research brands, find agencies, identify campaign windows, and match creators
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a brand (e.g. 'Big Ant Studios', 'Riot Games', 'HoYoverse')..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {isSearching ? 'Researching...' : 'Research Brand'}
          </button>
        </form>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Brand Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{results.brandName}</h2>
                <p className="text-sm text-gray-500">Brand research results</p>
              </div>
            </div>

            {results.status === 'pending' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                {results.message}
              </div>
            )}
          </div>

          {/* Intelligence Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Agency Relationships */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900">Agency Relationships</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Media Agency</span>
                  <span className="text-sm text-gray-400">Pending research</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Creative Agency</span>
                  <span className="text-sm text-gray-400">Pending research</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-500">Influencer Agency</span>
                  <span className="text-sm text-gray-400">Pending research</span>
                </div>
              </div>
            </div>

            {/* Campaign Seasonality */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-green-500" />
                <h3 className="text-sm font-semibold text-gray-900">Campaign Seasonality</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
                  <div key={q} className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500">{q}</p>
                    <p className="text-lg font-bold text-gray-300 mt-1">—</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Best outreach window: Pending analysis
              </p>
            </div>

            {/* Known Campaigns */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <h3 className="text-sm font-semibold text-gray-900">Known Campaigns</h3>
              </div>
              <div className="text-sm text-gray-400 py-4 text-center">
                Campaign history will appear after web research completes
              </div>
            </div>

            {/* Creator Matches */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-semibold text-gray-900">Suggested Creators</h3>
              </div>
              <div className="text-sm text-gray-400 py-4 text-center">
                Creator matches will appear based on brand audience and platform preferences
              </div>
            </div>
          </div>

          {/* Decision Makers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ExternalLink className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-semibold text-gray-900">Decision Makers (LinkedIn)</h3>
            </div>
            <div className="text-sm text-gray-400 py-4 text-center">
              Marketing team contacts will appear after LinkedIn research
            </div>
          </div>
        </div>
      )}

      {/* Saved Brands */}
      {!results && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Saved Brand Research</h3>
          <div className="text-sm text-gray-400 py-8 text-center">
            Research a brand above to start building your intelligence database.
            <br />
            Saved research will appear here for quick reference.
          </div>
        </div>
      )}
    </div>
  )
}
