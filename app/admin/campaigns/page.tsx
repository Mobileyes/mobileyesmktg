'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, List, LayoutGrid, Filter } from 'lucide-react'
import { cn, getStatusColor, formatCurrency } from '@/lib/utils'

const CAMPAIGN_STATUSES = [
  'DRAFT',
  'BRIEFING',
  'SENT',
  'IN_PROGRESS',
  'REVIEW',
  'APPROVED',
  'INVOICED',
  'PAID',
  'COMPLETE',
]

type Campaign = {
  id: string
  mblId: string
  title: string
  clientName: string
  source: string
  status: string
  campaignFee: number | null
  commissionPct: number
  creatorCount: number
  startDate: string | null
  endDate: string | null
}

export default function CampaignsPage() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('list')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [sourceFilter, setSourceFilter] = useState<string>('ALL')

  // Placeholder — will be API-driven
  const campaigns: Campaign[] = []

  const filteredCampaigns = campaigns.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false
    if (sourceFilter !== 'ALL' && c.source !== sourceFilter) return false
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500 mt-1">
            Campaign tickets from brief to completion
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'kanban'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="ALL">All Statuses</option>
          {CAMPAIGN_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace('_', ' ')}
            </option>
          ))}
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="ALL">All Sources</option>
          <option value="FABULATE">Fabulate</option>
          <option value="DIRECT">Direct</option>
          <option value="INBOUND_EMAIL">Inbound Email</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {CAMPAIGN_STATUSES.map((status) => {
            const statusCampaigns = filteredCampaigns.filter(
              (c) => c.status === status
            )
            return (
              <div
                key={status}
                className="flex-shrink-0 w-72 bg-gray-50 rounded-xl p-3"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusColor(status)
                    )}
                  >
                    {status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-400">
                    {statusCampaigns.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {statusCampaigns.map((campaign) => (
                    <Link
                      key={campaign.id}
                      href={`/admin/campaigns/${campaign.id}`}
                      className="block bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-shadow"
                    >
                      <p className="text-xs font-mono text-gray-400">
                        {campaign.mblId}
                      </p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {campaign.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {campaign.clientName}
                      </p>
                      {campaign.campaignFee && (
                        <p className="text-xs text-gray-600 mt-2">
                          {formatCurrency(campaign.campaignFee)}
                        </p>
                      )}
                    </Link>
                  ))}
                  {statusCampaigns.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-4">
                      No campaigns
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  MBL ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Creators
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-gray-500 text-sm"
                  >
                    No campaigns yet. Create one from the inbox or manually.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">
                      <Link
                        href={`/admin/campaigns/${campaign.id}`}
                        className="hover:text-slate-900"
                      >
                        {campaign.mblId}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {campaign.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {campaign.clientName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {campaign.source}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {campaign.campaignFee
                        ? formatCurrency(campaign.campaignFee)
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {campaign.creatorCount}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(campaign.status)
                        )}
                      >
                        {campaign.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
