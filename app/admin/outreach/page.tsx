'use client'

import { useState } from 'react'
import { Send, Mail, Users, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function OutreachPage() {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [fromAlias, setFromAlias] = useState('admin')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentHistory, setSentHistory] = useState<Array<{ to: string; subject: string; time: string }>>([])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/outreach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, message, fromAlias }),
      })

      if (res.ok) {
        setSent(true)
        setSentHistory(prev => [{ to, subject, time: new Date().toLocaleTimeString() }, ...prev])
        // Reset form after 2 seconds
        setTimeout(() => {
          setSent(false)
          setTo('')
          setSubject('')
          setMessage('')
        }, 2000)
      } else {
        const data = await res.json()
        setError(data.error ?? 'Failed to send')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setSending(false)
    }
  }

  // Quick templates
  const templates = [
    {
      label: 'Creator Outreach',
      icon: Users,
      subject: 'Brand campaign opportunities — Mobileyes',
      message: `Hi [Name],\n\nI came across your content and wanted to reach out.\n\nI'm Joel, founder of Mobileyes — a gaming talent agency based in Sydney. We represent streaming creators for brand campaigns across Australia and APAC.\n\nWhat makes us different:\n• 4-day payment (content approved → paid in 4 days)\n• Selective briefs only — matched to your audience\n• Full campaign analytics\n\nWould you be open to a quick chat?\n\nJoel Kirk\nMobileyes — mobileyes.live`,
    },
    {
      label: 'Brand Outreach',
      icon: Building2,
      subject: 'Gaming creators for [Brand] — Mobileyes',
      message: `Hi,\n\nI'm Joel Kirk, founder of Mobileyes — a gaming talent agency representing live streaming creators across ANZ and APAC.\n\nI'm reaching out because I believe there's a strong fit between [Brand] and our creator roster.\n\nWhat we deliver:\n• Curated gaming creators with verified, bot-free audiences\n• Full-funnel attribution (UTM + OneLink + promo codes)\n• Campaign analytics within 48 hours\n• 4-day creator payment (they perform better when paid fast)\n\nWould a 15-minute call this week work?\n\nJoel Kirk\nFounder, Mobileyes\nmobileyes.live`,
    },
    {
      label: 'Follow Up',
      icon: Mail,
      subject: 'Re: [Previous Subject]',
      message: `Hi [Name],\n\nJust following up on my previous message. Would love to connect if you have a few minutes this week.\n\nHappy to share more details on how we work and what campaigns we currently have in the pipeline.\n\nJoel Kirk\nMobileyes — mobileyes.live`,
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outreach</h1>
          <p className="text-gray-500 mt-1">Send emails to creators, brands, and agencies directly from the platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSend} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Compose Email</h3>

            {sent && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                ✓ Email sent successfully
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {/* From selector */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
              <div className="flex gap-2">
                {[
                  { value: 'admin', label: 'admin@mobileyes.live' },
                  { value: 'talent', label: 'talent@mobileyes.live' },
                  { value: 'campaigns', label: 'campaigns@mobileyes.live' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFromAlias(opt.value)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                      fromAlias === opt.value
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
                placeholder="recipient@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="Email subject..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={12}
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
              {sending ? 'Sending...' : 'Send Email'}
            </button>
          </form>
        </div>

        {/* Templates + History */}
        <div className="space-y-6">
          {/* Quick Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Templates</h3>
            <div className="space-y-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.label}
                  onClick={() => { setSubject(tpl.subject); setMessage(tpl.message) }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors text-left"
                >
                  <tpl.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{tpl.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sent History (this session) */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Sent This Session</h3>
            {sentHistory.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No emails sent yet</p>
            ) : (
              <div className="space-y-2">
                {sentHistory.map((item, i) => (
                  <div key={i} className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-700 truncate">{item.to}</p>
                    <p className="text-xs text-gray-500 truncate">{item.subject}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
