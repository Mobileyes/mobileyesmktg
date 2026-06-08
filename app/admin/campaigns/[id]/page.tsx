'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Send,
  FileText,
  UserPlus,
  CheckCircle,
  Clock,
  ShieldCheck,
  ExternalLink,
  Image,
  FileAudio,
  Download,
  XCircle,
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
  const params = useParams()
  const campaignId = params.id as string

  const [campaign, setCampaign] = useState<any>(null)
  const [verifications, setVerifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/admin/campaigns/${campaignId}`)
      if (response.ok) {
        const data = await response.json()
        setCampaign(data)
      }
    } catch (err) {
      console.error('Failed to fetch campaign:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchVerifications = async () => {
    try {
      const response = await fetch(`/api/admin/verifications?campaignId=${campaignId}`)
      if (response.ok) {
        const data = await response.json()
        setVerifications(data)
      }
    } catch (err) {
      console.error('Failed to fetch verifications:', err)
    }
  }

  useEffect(() => {
    if (campaignId) {
      fetchCampaign()
      fetchVerifications()
    }
  }, [campaignId])

  const updateStatus = async (newStatus: string) => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/admin/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (response.ok) {
        setCampaign({ ...campaign, status: newStatus })
      }
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const updateNotes = async (notes: string) => {
    try {
      await fetch(`/api/admin/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })
    } catch (err) {
      console.error('Failed to save notes:', err)
    }
  }

  const handleSendBrief = async () => {
    try {
      const response = await fetch(`/api/admin/campaigns/${campaignId}/send-brief`, {
        method: 'POST',
      })
      if (response.ok) {
        setCampaign({ ...campaign, status: 'SENT' })
      }
    } catch (err) {
      console.error('Failed to send brief:', err)
    }
  }

  const handleGenerateInvoice = async () => {
    try {
      const response = await fetch(`/api/admin/campaigns/${campaignId}/generate-invoice`, {
        method: 'POST',
      })
      if (response.ok) {
        await fetchCampaign() // refresh to get new invoice
      }
    } catch (err) {
      console.error('Failed to generate invoice:', err)
    }
  }

  const handleApproveVerification = async (verificationId: string) => {
    try {
      const response = await fetch('/api/admin/verifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: verificationId, action: 'approve' }),
      })
      if (response.ok) {
        await fetchVerifications()
      }
    } catch (err) {
      console.error('Failed to approve verification:', err)
    }
  }

  const handleRejectVerification = async (verificationId: string) => {
    const notes = window.prompt('Rejection reason:')
    if (!notes) return
    try {
      const response = await fetch('/api/admin/verifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: verificationId, action: 'reject', notes }),
      })
      if (response.ok) {
        await fetchVerifications()
      }
    } catch (err) {
      console.error('Failed to reject verification:', err)
    }
  }

  const handleExportReport = async (format: 'csv' | 'json' | 'pdf') => {
    try {
      const response = await fetch(`/api/admin/campaigns/${campaignId}/report?format=${format}`)
      if (!response.ok) return

      if (format === 'csv') {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `campaign-report-${campaign?.mblId ?? campaignId}.csv`
        a.click()
        URL.revokeObjectURL(url)
      } else {
        const data = await response.json()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `campaign-report-${campaign?.mblId ?? campaignId}.json`
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      console.error('Failed to export report:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Campaign not found</p>
        <Link href="/admin/campaigns" className="text-blue-600 text-sm mt-2 inline-block">Back to campaigns</Link>
      </div>
    )
  }

  const commissionAud = campaign.campaignFee
    ? (campaign.campaignFee * campaign.commissionPct) / 100
    : 0
  const totalCreatorFees = (campaign.creators ?? []).reduce(
    (sum: number, c: any) => sum + (c.fee || 0),
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
          <button
            onClick={handleSendBrief}
            disabled={campaign.status !== 'BRIEFING' && campaign.status !== 'DRAFT'}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            Send Brief
          </button>
          <button
            onClick={handleGenerateInvoice}
            disabled={campaign.status !== 'APPROVED'}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-4 h-4" />
            Generate Invoice
          </button>
          {/* Advance status */}
          {CAMPAIGN_STATUS_FLOW.indexOf(campaign.status) < CAMPAIGN_STATUS_FLOW.length - 1 && (
            <button
              onClick={() => {
                const currentIdx = CAMPAIGN_STATUS_FLOW.indexOf(campaign.status)
                if (currentIdx < CAMPAIGN_STATUS_FLOW.length - 1) {
                  updateStatus(CAMPAIGN_STATUS_FLOW[currentIdx + 1])
                }
              }}
              disabled={isSaving}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              Advance →
            </button>
          )}
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
                  {campaign.creators.map((creator: any) => (
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
                  {campaign.invoices.map((invoice: any) => (
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

          {/* Integration Verification Queue */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Integration Verification
                </h3>
                {verifications.filter((v: any) => v.status === 'PENDING').length > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {verifications.filter((v: any) => v.status === 'PENDING').length} pending
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportReport('csv')}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <Download className="w-3 h-3" />
                  CSV
                </button>
                <button
                  onClick={() => handleExportReport('json')}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <Download className="w-3 h-3" />
                  JSON
                </button>
                <button
                  onClick={() => handleExportReport('pdf')}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 border border-blue-200 rounded hover:bg-blue-50"
                >
                  <FileText className="w-3 h-3" />
                  Report
                </button>
              </div>
            </div>

            {verifications.length === 0 ? (
              <div className="text-center py-8">
                <ShieldCheck className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  No verifications yet. Content will be auto-detected once creators publish.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {verifications.map((v: any) => (
                  <div
                    key={v.id}
                    className={cn(
                      'border rounded-lg p-4',
                      v.status === 'PENDING' && 'border-amber-200 bg-amber-50/30',
                      v.status === 'APPROVED' && 'border-green-200 bg-green-50/30',
                      v.status === 'REJECTED' && 'border-red-200 bg-red-50/30'
                    )}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            {v.creatorHandle}
                          </p>
                          <span className="text-xs text-gray-500">{v.platform}</span>
                          <span
                            className={cn(
                              'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium',
                              v.status === 'PENDING' && 'bg-amber-100 text-amber-700',
                              v.status === 'APPROVED' && 'bg-green-100 text-green-700',
                              v.status === 'REJECTED' && 'bg-red-100 text-red-700'
                            )}
                          >
                            {v.status}
                          </span>
                        </div>
                        <a
                          href={v.contentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          {v.contentTitle ?? v.contentUrl}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          Detected {v.detectedAt ? formatDate(v.detectedAt) : '—'}
                        </p>
                        {v.viewCountAtDetection != null && (
                          <p className="text-xs text-gray-600 font-medium">
                            {v.viewCountAtDetection.toLocaleString()} views
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Evidence Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {/* Screenshot */}
                      <div className="bg-white rounded border border-gray-100 p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Image className="w-3 h-3 text-gray-400" />
                          <span className="text-[10px] font-medium text-gray-500 uppercase">
                            Screenshot
                          </span>
                        </div>
                        {v.screenshotUrl ? (
                          <a href={v.screenshotUrl} target="_blank" rel="noopener noreferrer">
                            <img
                              src={v.screenshotUrl}
                              alt="Integration screenshot"
                              className="w-full h-20 object-cover rounded"
                            />
                          </a>
                        ) : (
                          <p className="text-[10px] text-gray-400 italic">No screenshot captured</p>
                        )}
                      </div>

                      {/* Transcript */}
                      <div className="bg-white rounded border border-gray-100 p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <FileAudio className="w-3 h-3 text-gray-400" />
                          <span className="text-[10px] font-medium text-gray-500 uppercase">
                            Transcript
                          </span>
                        </div>
                        {v.transcriptExcerpt ? (
                          <p className="text-[10px] text-gray-700 line-clamp-4 leading-relaxed">
                            {v.transcriptExcerpt}
                          </p>
                        ) : (
                          <p className="text-[10px] text-gray-400 italic">No transcript available</p>
                        )}
                      </div>
                    </div>

                    {/* Detection Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {v.utmLinkDetected && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                          UTM ✓ {v.utmLinkLocation}
                        </span>
                      )}
                      {v.promoCodeDetected && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-700">
                          Promo: {v.promoCode} ({v.promoCodeLocation})
                        </span>
                      )}
                      {v.brandMentionDetected && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700">
                          Brand ✓ {v.brandMentionMethod}
                        </span>
                      )}
                      {v.talkingPointsMatched?.length > 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700">
                          Talking Points: {v.talkingPointsMatched.length}/{v.talkingPointsTotal}
                        </span>
                      )}
                      {!v.utmLinkDetected && !v.promoCodeDetected && !v.brandMentionDetected && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-700">
                          No attribution detected
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    {v.status === 'PENDING' && (
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => handleApproveVerification(v.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Approve → Start 4-Day Clock
                        </button>
                        <button
                          onClick={() => handleRejectVerification(v.id)}
                          className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 rounded text-xs font-medium hover:bg-red-50"
                        >
                          <XCircle className="w-3 h-3" />
                          Reject
                        </button>
                      </div>
                    )}

                    {v.status === 'APPROVED' && v.paymentDueAt && (
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        <Clock className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-700">
                          Payment due {formatDate(v.paymentDueAt)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
              onBlur={(e) => updateNotes(e.target.value)}
              placeholder="Campaign notes..."
              className="w-full h-32 text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
