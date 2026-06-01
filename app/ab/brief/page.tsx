/**
 * A/B TEST: Brief Form — Brand Book v1.0
 * 
 * Key differences from live:
 * - Name FIRST, then company (not company first)
 * - Creator campaigns selected by default
 * - UA fields reveal conditionally
 * - All submissions → admin@mobileyes.live
 * - Deep navy background, electric blue submit button
 * - Space Grotesk typography
 */

'use client'

import { useState } from 'react'

export default function ABBriefPage() {
  const [campaignType, setCampaignType] = useState('creator')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Would POST to /api/public/brief
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen px-6 py-20" style={{ background: '#0B0F2E' }}>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.3px' }}>
          Submit a campaign brief
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Tell us about your campaign. We&apos;ll match you with the right creators.
        </p>

        {submitted ? (
          <div className="p-8 rounded-xl text-center" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }}>
            <p className="text-white text-lg font-semibold mb-2">Brief received ✓</p>
            <p className="text-slate-400 text-sm">We&apos;ll respond within 2 business days to admin@mobileyes.live</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name FIRST, then Company — Brand Book rule M-03 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Your name *</label>
                <input type="text" required placeholder="Joel Kirk" className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }} />
                <p className="text-[10px] text-slate-500 mt-1">↑ Name before company</p>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Company / Brand *</label>
                <input type="text" required placeholder="Acme Games" className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Email *</label>
                <input type="email" required placeholder="joel@acme.com" className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }} />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Phone</label>
                <input type="tel" placeholder="+61 4XX XXX XXX" className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }} />
              </div>
            </div>

            {/* Campaign type — Creator selected by default (M-03) */}
            <div>
              <label className="block text-sm text-slate-300 mb-1.5 font-medium">Campaign type *</label>
              <select
                value={campaignType}
                onChange={(e) => setCampaignType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ background: '#161B3D', border: '1px solid #1E2A5E' }}
              >
                <option value="creator">Creator campaigns — influencer content, brand deals, live stream activations</option>
                <option value="ua">User acquisition — app installs, CPI campaigns, performance marketing</option>
                <option value="both">Both — creator + UA combined</option>
              </select>
              <p className="text-[10px] text-slate-500 mt-1">↑ Defaults to Creator — change if you need UA</p>
            </div>

            {/* UA conditional fields — M-04 */}
            {(campaignType === 'ua' || campaignType === 'both') && (
              <div className="space-y-4 p-4 rounded-lg transition-all" style={{ background: '#1A1F3D', border: '1px solid #2E3A6E' }}>
                <p className="text-xs text-blue-400 font-medium">UA Campaign Details</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">App name</label>
                    <input type="text" placeholder="My Game" className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-slate-500" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Target CPI</label>
                    <input type="text" placeholder="$2.50" className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-slate-500" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Platform</label>
                  <select className="w-full px-3 py-2 rounded-lg text-sm text-white" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }}>
                    <option>iOS</option>
                    <option>Android</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Target market</label>
                <select className="w-full px-4 py-3 rounded-lg text-sm text-white" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }}>
                  <option>Australia</option>
                  <option>New Zealand</option>
                  <option>APAC</option>
                  <option>SEA</option>
                  <option>Global</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Budget</label>
                <select className="w-full px-4 py-3 rounded-lg text-sm text-white" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }}>
                  <option>Under $5K</option>
                  <option>$5K – $10K</option>
                  <option>$10K – $25K</option>
                  <option>$25K – $50K</option>
                  <option>$50K+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1.5 font-medium">Brief details</label>
              <textarea rows={4} placeholder="Tell us about your campaign goals, timeline, and any specific creators you have in mind..." className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }} />
            </div>

            {/* Submit — Electric blue, NOT gradient */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: '#3B82F6', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit brief →'}
            </button>
            <p className="text-center text-xs text-slate-500">→ admin@mobileyes.live · 2 business day response</p>
          </form>
        )}
      </div>
    </div>
  )
}
