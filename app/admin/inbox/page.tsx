'use client'

import { useState, useEffect } from 'react'
import { Mail, RefreshCw, Megaphone, X, ChevronDown } from 'lucide-react'
import { cn, getStatusColor, formatDateTime } from '@/lib/utils'

type InboxBrief = {
  id: string
  gmailMessageId: string
  from: string
  subject: string
  bodyPreview: string
  receivedAt: string
  status: 'UNREAD' | 'READ' | 'CONVERTED' | 'DISMISSED'
  campaignId: string | null
}

export default function InboxPage() {
  const [briefs, setBriefs] = useState<InboxBrief[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBriefs()
  }, [])

  const fetchBriefs = async () => {
    try {
      const response = await fetch('/api/admin/inbox')
      if (response.ok) {
        const data = await response.json()
        setBriefs(data)
      }
    } catch (error) {
      console.error('Failed to fetch briefs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      await fetch('/api/admin/inbox/sync')
      await fetchBriefs()
    } catch (error) {
      console.error('Sync failed:', error)
    } finally {
      setIsSyncing(false)
    }
  }

  const handleDismiss = async (briefId: string) => {
    try {
      await fetch('/api/admin/inbox', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: briefId, status: 'DISMISSED' }),
      })
      setBriefs(briefs.map(b => b.id === briefId ? { ...b, status: 'DISMISSED' as const } : b))
    } catch (error) {
      console.error('Failed to dismiss:', error)
    }
  }

  const handleConvert = async (briefId: string) => {
    const brief = briefs.find(b => b.id === briefId)
    if (!brief) return

    try {
      // Create campaign from brief
      const campaignResponse = await fetch('/api/admin/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: brief.subject,
          clientName: brief.from.split('<')[0].trim() || brief.from,
          clientEmail: brief.from.match(/<(.+)>/)?.[1] || '',
          source: 'INBOUND_EMAIL',
          objective: '',
          markets: ['Australia'],
          budgetRange: '',
          inboxMessageId: brief.gmailMessageId,
        }),
      })

      if (campaignResponse.ok) {
        const campaign = await campaignResponse.json()
        // Mark brief as converted
        await fetch('/api/admin/inbox', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: briefId, status: 'CONVERTED', campaignId: campaign.id }),
        })
        setBriefs(briefs.map(b => b.id === briefId ? { ...b, status: 'CONVERTED' as const, campaignId: campaign.id } : b))
      }
    } catch (error) {
      console.error('Failed to convert:', error)
    }
  }

  const unreadCount = briefs.filter((b) => b.status === 'UNREAD').length

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-gray-500 mt-1">
            Inbound briefs from campaigns@mobileyes.live
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            className={cn('w-4 h-4', isSyncing && 'animate-spin')}
          />
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
          <Mail className="w-4 h-4" />
          {unreadCount} unread
        </div>
        <p className="text-sm text-gray-500">
          Auto-syncs every 15 minutes via Vercel cron
        </p>
      </div>

      {/* Brief List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {briefs.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              No briefs in inbox. Emails sent to campaigns@mobileyes.live will
              appear here after Gmail sync is configured.
            </p>
            <button
              onClick={handleSync}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700"
            >
              Trigger manual sync
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {briefs.map((brief) => (
              <div key={brief.id}>
                <div
                  className={cn(
                    'flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors',
                    brief.status === 'UNREAD' && 'bg-blue-50/30'
                  )}
                  onClick={() =>
                    setExpandedId(expandedId === brief.id ? null : brief.id)
                  }
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(brief.status)
                        )}
                      >
                        {brief.status}
                      </span>
                      <p
                        className={cn(
                          'text-sm truncate',
                          brief.status === 'UNREAD'
                            ? 'font-semibold text-gray-900'
                            : 'text-gray-700'
                        )}
                      >
                        {brief.subject}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      From: {brief.from} ·{' '}
                      {formatDateTime(brief.receivedAt)}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-gray-400 transition-transform',
                      expandedId === brief.id && 'rotate-180'
                    )}
                  />
                </div>

                {/* Expanded content */}
                {expandedId === brief.id && (
                  <div className="px-6 pb-4 bg-gray-50 border-t border-gray-100">
                    <div className="py-4">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {brief.bodyPreview}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {brief.status !== 'CONVERTED' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleConvert(brief.id) }}
                          className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800"
                        >
                          <Megaphone className="w-4 h-4" />
                          Convert to Campaign
                        </button>
                      )}
                      {brief.status !== 'DISMISSED' &&
                        brief.status !== 'CONVERTED' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDismiss(brief.id) }}
                            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-red-600 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                            Dismiss
                          </button>
                        )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
