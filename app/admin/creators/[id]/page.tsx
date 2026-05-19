'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Edit,
  Send,
  Pause,
  DollarSign,
  Megaphone,
  FileText,
  Save,
} from 'lucide-react'
import { cn, getStatusColor, formatCurrency, formatDate } from '@/lib/utils'

// This would come from the API in production
const PLACEHOLDER_CREATOR = {
  id: 'placeholder',
  mblId: 'MBL-CR-00001',
  fullName: 'Example Creator',
  email: 'creator@example.com',
  platform: 'TikTok',
  handleUrl: 'https://tiktok.com/@example',
  followerCount: 150000,
  avgViews: 45000,
  sessionLength: '2-4hrs',
  audienceLocation: 'Australia',
  contentNiche: ['Gaming', 'Entertainment'],
  gamingGenres: ['FPS', 'Battle Royale'],
  rateCard: { tiktok: 1200, youtube: 2500, twitch: 800 },
  status: 'ACTIVE' as const,
  notes: '',
  totalCampaigns: 0,
  totalEarned: 0,
  commissionGenerated: 0,
  campaigns: [] as Array<{
    mblId: string
    title: string
    clientName: string
    fee: number
    status: string
    date: string
  }>,
  payments: [] as Array<{
    mblId: string
    amount: number
    status: string
    paidAt: string | null
  }>,
}

export default function CreatorProfilePage() {
  const creator = PLACEHOLDER_CREATOR
  const [notes, setNotes] = useState(creator.notes)
  const [rateCard, setRateCard] = useState(
    JSON.stringify(creator.rateCard, null, 2)
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveNotes = async () => {
    setIsSaving(true)
    // API call would go here
    setTimeout(() => setIsSaving(false), 500)
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/creators"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Creators
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {creator.fullName}
            </h1>
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusColor(creator.status)
              )}
            >
              {creator.status}
            </span>
          </div>
          <p className="text-gray-500 mt-1 font-mono text-sm">
            {creator.mblId}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {creator.platform} · {creator.handleUrl}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Send className="w-4 h-4" />
            Send Brief
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Pause className="w-4 h-4" />
            Pause
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Lifetime Campaigns</p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {creator.totalCampaigns}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Fees Received</p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {formatCurrency(creator.totalEarned)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Commission Generated</p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {formatCurrency(creator.commissionGenerated)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Followers</p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {creator.followerCount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column — Rate Card + Notes */}
        <div className="space-y-6">
          {/* Rate Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Rate Card
            </h3>
            <textarea
              value={rateCard}
              onChange={(e) => setRateCard(e.target.value)}
              className="w-full h-32 text-sm font-mono border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <button className="mt-2 flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900">
              <Save className="w-3 h-3" />
              Save Rate Card
            </button>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="Relationship notes, preferences, availability..."
              className="w-full h-40 text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
            {isSaving && (
              <p className="text-xs text-gray-400 mt-1">Saving...</p>
            )}
          </div>

          {/* Creator Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Details
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Location</dt>
                <dd className="text-gray-900">{creator.audienceLocation}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Niche</dt>
                <dd className="text-gray-900">
                  {creator.contentNiche.join(', ')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Genres</dt>
                <dd className="text-gray-900">
                  {creator.gamingGenres.join(', ')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Avg Views</dt>
                <dd className="text-gray-900">
                  {creator.avgViews?.toLocaleString() ?? '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Session Length</dt>
                <dd className="text-gray-900">
                  {creator.sessionLength ?? '—'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right column — Campaign + Payment History */}
        <div className="col-span-2 space-y-6">
          {/* Campaign History */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900">
                Campaign History
              </h3>
            </div>
            {creator.campaigns.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                No campaigns yet
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Campaign
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Client
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Fee
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {creator.campaigns.map((campaign) => (
                    <tr key={campaign.mblId}>
                      <td className="py-2 text-sm font-mono text-gray-600">
                        {campaign.mblId}
                      </td>
                      <td className="py-2 text-sm text-gray-700">
                        {campaign.clientName}
                      </td>
                      <td className="py-2 text-sm text-gray-700">
                        {formatCurrency(campaign.fee)}
                      </td>
                      <td className="py-2">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                            getStatusColor(campaign.status)
                          )}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-2 text-sm text-gray-500">
                        {formatDate(campaign.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900">
                Payment History
              </h3>
            </div>
            {creator.payments.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                No payments yet
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Payment ID
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Amount
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2">
                      Paid Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {creator.payments.map((payment) => (
                    <tr key={payment.mblId}>
                      <td className="py-2 text-sm font-mono text-gray-600">
                        {payment.mblId}
                      </td>
                      <td className="py-2 text-sm text-gray-700">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="py-2">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                            getStatusColor(payment.status)
                          )}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-2 text-sm text-gray-500">
                        {payment.paidAt ? formatDate(payment.paidAt) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Files */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900">Files</h3>
            </div>
            <p className="text-sm text-gray-500 py-4 text-center">
              No files uploaded. Signed agreements will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
