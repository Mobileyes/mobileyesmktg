'use client'

import { useState } from 'react'
import { MBIcon } from '@/components/brand/MBIcon'

export default function CreatorCapturePage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    url: '',
    notes: '',
    context: 'event', // 'event' | 'referral' | 'inbound'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.url && !formData.name) return
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/public/creator-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setResult(data)
      } else {
        setError(data.error || 'Failed to capture')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0B0F2E' }}>
        <div className="w-full max-w-sm text-center">
          <MBIcon size={48} className="mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Captured ✓</h1>
          {result.scraped && (
            <div className="mt-4 p-4 rounded-xl text-left" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
              <p className="text-sm font-medium text-white">{result.displayName || result.handle}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{result.platform} · {result.followerCount ? `${(result.followerCount / 1000).toFixed(1)}K followers` : 'Processing...'}</p>
              {result.engagementRate && <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Engagement: {result.engagementRate}%</p>}
            </div>
          )}
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Lead added to pipeline. Review in admin.
          </p>
          <button onClick={() => { setResult(null); setFormData({ name: '', company: '', url: '', notes: '', context: 'event' }) }} className="mt-6 px-6 py-2 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: '#3B82F6' }}>
            Capture Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0B0F2E' }}>
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <MBIcon size={36} className="mx-auto mb-3" />
          <h1 className="text-lg font-bold text-white">Quick Capture</h1>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Drop a URL — we research automatically</p>
        </div>

        {/* Form — optimised for one-handed phone use */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5 rounded-2xl" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
          {error && <p className="text-xs text-red-400 p-2 rounded" style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}>{error}</p>}

          {/* URL is the primary field — paste a link, we do the rest */}
          <div>
            <label className="block text-xs font-medium text-white mb-1">Profile URL *</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="youtube.com/@creator or twitch.tv/name"
              required
              autoFocus
              className="w-full px-3 py-3 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Their name"
                className="w-full px-3 py-2.5 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1">Context</label>
              <select
                value={formData.context}
                onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}
              >
                <option value="event">Event</option>
                <option value="referral">Referral</option>
                <option value="inbound">Inbound</option>
                <option value="discovery">Discovery</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1">Notes (optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Met at Supanova, interested in brand deals, plays Valorant..."
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#3B82F6' }}
          >
            {isSubmitting ? 'Researching...' : 'Capture & Research →'}
          </button>
        </form>
      </div>
    </div>
  )
}
