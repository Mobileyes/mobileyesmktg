'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Send,
  FileText,
  DollarSign,
  UserPlus,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { cn, getStatusColor, formatCurrency, formatDate } from '@/lib/utils'

const CAMPAIGN_STATUS_FLOW = [
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

export default function CampaignDetailPage() {
  // Placeholder data — will be API-driven
  const campaign = {
    id: 'placeholder',
    mblId: 'MBL-CAMP-00001',
    title: 'Example Campaign',
    clientName: 'Example Brand',
    clientEmail: 'brand@example.com',
    source: 'DIRECT',
    objective: 'Awareness',
    markets: ['Australia'],
    budgetRange: '$5,000 - $10,000',
    briefDetails: 'Campaign brief details will appear here...',
    status: 'DRAFT',
    campaignFee: 8000,
    commissionPct: 25,
    startDate: null as string | null,
    endDate: null as string | null,
    notes: '',
    creators: [] as Array<{
      id: string
      mblId: string
      fullName: string
      platform: string
      fee: number
      status: string
      briefSentAt: string | null
      contentUrl: string | null
    }>,
    invoices: [] as Array<{
      mblId: string
      amount: number
      status: string
      issuedAt: string | null
    }>,
  }

  const commissionAud = campaign.campaignFee
    ? (campaign.campaignFee * campaign.commissionPct) / 100
    : 0
  const totalCreatorFees = campaign.creators.reduce(
    (sum, c) => sum + c.fee,
    0
  )

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/campaigns"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Campaigns
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {campaign.title}
            </h1>
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusColor(campaign.status)
              )}
            >
              {campaign.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-gray-500 mt-1 font-mono text-sm">
            {campaign.mblId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            <Send className="w-4 h-4" />
            Send Brief
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <FileText className="w-4 h-4" />
            Generate Invoice
          </button>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Campaign Progress
        </h3>
        <div className="flex items-center gap-1">
          {CAMPAIGN_STATUS_FLOW.map((status, index) => {
            const currentIndex = CAMPAIGN_STATUS_FLOW.indexOf(campaign.status)
            const isComplete = index < currentIndex
            const isCurrent = index === currentIndex
            return (
              <div key={status} className="flex items-center flex-1">
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium',
                    isComplete && 'bg-green-100 text-green-700',
                    isCurrent && 'bg-blue-600 text-white',
                    !isComplete && !isCurrent && 'bg-gray-100 text-gray-400'
                  )}
                >
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < CAMPAIGN_STATUS_FLOW.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-1',
                      index < currentIndex ? 'bg-green-300' : 'bg-gray-200'
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="flex justify-between mt-2">
          {CAMPAIGN_STATUS_FLOW.map((status) => (
            <span key={status} className="text-[10px] text-gray-400 text-center flex-1">
              {status.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left — Campaign Details */}
        <div className="col-span-2 space-y-6">
          {/* Brief Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Brief Details
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Client</p>
                <p className="text-sm text-gray-900">{campaign.clientName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Source</p>
                <p className="text-sm text-gray-900">{campaign.source}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Objective</p>
                <p className="text-sm text-gray-900">{campaign.objective}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Markets</p>
                <p className="text-sm text-gray-900">
                  {campaign.markets.join(', ')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Budget Range</p>
                <p className="text-sm text-gray-900">{campaign.budgetRange}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Client Email</p>
                <p className="text-sm text-gray-900">{campaign.clientEmail}</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-500 mb-2">Brief</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {campaign.briefDetails || 'No brief details added yet.'}
              </p>
            </div>
          </div>

          {/* Assigned Creators */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Assigned Creators
              </h3>
              <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                <UserPlus className="w-4 h-4" />
                Assign Creator
              </button>
            </div>
            {campaign.creators.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                No creators assigned. Search and add creators from the CRM.
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Creator
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Platform
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Fee
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {campaign.creators.map((creator) => (
                    <tr key={creator.id}>
                      <td className="py-2">
                        <p className="text-sm font-medium text-gray-900">
                          {creator.fullName}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          {creator.mblId}
                        </p>
                      </td>
                      <td className="py-2 text-sm text-gray-700">
                        {creator.platform}
                      </td>
                      <td className="py-2 text-sm text-gray-700">
                        {formatCurrency(creator.fee)}
                      </td>
                      <td className="py-2">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                            getStatusColor(creator.status)
                          )}
                        >
                          {creator.status}
                        </span>
                      </td>
                      <td className="py-2">
                        <button className="text-xs text-green-600 hover:text-green-700">
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {campaign.creators.length > 0 && (
              <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between text-sm">
                <span className="text-gray-500">Total creator fees:</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(totalCreatorFees)}
                </span>
              </div>
            )}
          </div>

          {/* Invoices */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Invoices</h3>
            </div>
            {campaign.invoices.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                No invoices generated yet.
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Invoice
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Amount
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Issued
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.invoices.map((invoice) => (
                    <tr key={invoice.mblId}>
                      <td className="py-2 text-sm font-mono text-gray-600">
                        {invoice.mblId}
                      </td>
                      <td className="py-2 text-sm text-gray-700">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="py-2">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                            getStatusColor(invoice.status)
                          )}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-2 text-sm text-gray-500">
                        {invoice.issuedAt ? formatDate(invoice.issuedAt) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right — Financials + Notes */}
        <div className="space-y-6">
          {/* Financial Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Financials
            </h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Campaign Fee</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {campaign.campaignFee
                    ? formatCurrency(campaign.campaignFee)
                    : '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Commission %</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {campaign.commissionPct}%
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3">
                <dt className="text-sm text-gray-500">Commission AUD</dt>
                <dd className="text-sm font-bold text-green-700">
                  {formatCurrency(commissionAud)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Total Creator Fees</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formatCurrency(totalCreatorFees)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Timeline
            </h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Start Date</dt>
                <dd className="text-sm text-gray-900">
                  {campaign.startDate ? formatDate(campaign.startDate) : '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">End Date</dt>
                <dd className="text-sm text-gray-900">
                  {campaign.endDate ? formatDate(campaign.endDate) : '—'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Notes</h3>
            <textarea
              defaultValue={campaign.notes}
              placeholder="Campaign notes..."
              className="w-full h-32 text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
