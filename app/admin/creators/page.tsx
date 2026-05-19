'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, UserPlus, Eye, Pause, Edit } from 'lucide-react'
import { cn, getStatusColor, formatCurrency } from '@/lib/utils'

// Types matching Prisma schema
type Creator = {
  id: string
  mblId: string
  fullName: string
  email: string
  platform: string
  handleUrl: string
  followerCount: number
  status: 'APPLICANT' | 'ACTIVE' | 'PAUSED' | 'INACTIVE'
  contentNiche: string[]
  audienceLocation: string
  totalCampaigns: number
  totalEarned: number
  commissionGenerated: number
  lastCampaignDate: string | null
}

// Placeholder data — will be replaced with API calls
const PLACEHOLDER_CREATORS: Creator[] = []

export default function CreatorsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [platformFilter, setPlatformFilter] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'applicants'>('all')

  const creators = PLACEHOLDER_CREATORS

  const filteredCreators = creators.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false
    if (platformFilter !== 'ALL' && c.platform !== platformFilter) return false
    if (activeTab === 'applicants' && c.status !== 'APPLICANT') return false
    if (
      searchQuery &&
      !c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Creator CRM</h1>
          <p className="text-gray-500 mt-1">
            Manage talent roster, rate cards, and performance
          </p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          <UserPlus className="w-4 h-4" />
          Add Creator
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('all')}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            activeTab === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          All Creators
        </button>
        <button
          onClick={() => setActiveTab('applicants')}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            activeTab === 'applicants'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          Applicants
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="APPLICANT">Applicant</option>
          <option value="PAUSED">Paused</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="ALL">All Platforms</option>
          <option value="TikTok">TikTok</option>
          <option value="YouTube">YouTube</option>
          <option value="Twitch">Twitch</option>
          <option value="Kick">Kick</option>
          <option value="Instagram">Instagram</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  MBL ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Followers
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Campaigns
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total Earned
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCreators.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-gray-500 text-sm"
                  >
                    {creators.length === 0
                      ? 'No creators yet. Creator applications from the public site will appear here.'
                      : 'No creators match your filters.'}
                  </td>
                </tr>
              ) : (
                filteredCreators.map((creator) => (
                  <tr
                    key={creator.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">
                      {creator.mblId}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {creator.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{creator.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {creator.platform}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {creator.followerCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(creator.status)
                        )}
                      >
                        {creator.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {creator.totalCampaigns}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatCurrency(creator.totalEarned)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatCurrency(creator.commissionGenerated)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/creators/${creator.id}`}
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded"
                          title="View profile"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded"
                          title="Edit rate card"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-gray-400 hover:text-orange-600 rounded"
                          title="Pause"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
