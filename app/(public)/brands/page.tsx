'use client'

import { useState } from 'react'
import Link from 'next/link'

type CampaignType = 'creator' | 'ua' | 'both'

export default function BrandsPage() {
  const [formData, setFormData] = useState({
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    campaignType: 'creator' as CampaignType,
    targetMarket: 'Australia',
    budget: '$10K – $25K',
    briefDetails: '',
    // UA conditional fields
    appName: '',
    targetCPI: '',
    appPlatform: 'Both',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const showUAFields = formData.campaignType === 'ua' || formData.campaignType === 'both'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/public/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0B0F2E' }}>
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <svg className="w-10 h-10" style={{ color: '#3B82F6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Brief Received</h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            We&apos;ll review your brief and respond within 2 business days with tailored creator recommendations.
          </p>
          <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              → admin@mobileyes.live · 2 business day response
            </p>
          </div>
          <Link href="/" className="font-medium hover:opacity-80" style={{ color: '#3B82F6' }}>
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#0B0F2E' }}>
      {/* Hero */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#0B0F2E' }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#3B82F6' }}>For Brands & Agencies</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
            Creator campaigns you can actually measure.
          </h1>
          <p className="text-xl max-w-3xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            20 years across King, Activision Blizzard, AppsFlyer, and AWS. Curated creator roster.
            Full-funnel attribution. Submit a brief and we&apos;ll match you with the right talent.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6" style={{ borderTop: '1px solid #1E2A5E', borderBottom: '1px solid #1E2A5E' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: '20+', label: 'Years industry experience' },
            { stat: '4 day', label: 'Creator payment (they perform better)' },
            { stat: '100%', label: 'Real audience — no bots, no fakes' },
            { stat: '48hr', label: 'Campaign analytics delivery' },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 rounded-xl" style={{ backgroundColor: '#111633' }}>
              <p className="text-2xl font-bold text-white">{item.stat}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">Submit a campaign brief</h2>
          <p className="mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Tell us what you need. We respond within 2 business days.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
            {/* M-03: Name FIRST, then company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Your name *</label>
                <input type="text" required value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} placeholder="Joel Kirk" className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Company / Brand *</label>
                <input type="text" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="Acme Games" className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="joel@acme.com" className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
              </div>
            </div>

            {/* M-03: Campaign type with Creator as default */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Campaign type *</label>
              <select value={formData.campaignType} onChange={(e) => setFormData({ ...formData, campaignType: e.target.value as CampaignType })} className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}>
                <option value="creator">Creator campaigns — influencer content, brand deals, live stream activations</option>
                <option value="ua">User Acquisition (UA) — app installs, CPI campaigns</option>
                <option value="both">Both — creator content + UA performance</option>
              </select>
              <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Defaults to Creator — change if you need UA or both</p>
            </div>

            {/* M-04: UA conditional fields */}
            {showUAFields && (
              <div className="space-y-4 p-4 rounded-xl transition-all" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: '#3B82F6' }}>UA Campaign Details</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">App name</label>
                    <input type="text" value={formData.appName} onChange={(e) => setFormData({ ...formData, appName: e.target.value })} placeholder="My Game" className="w-full px-3 py-2 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">Target CPI</label>
                    <input type="text" value={formData.targetCPI} onChange={(e) => setFormData({ ...formData, targetCPI: e.target.value })} placeholder="$2.50 AUD" className="w-full px-3 py-2 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">Platform</label>
                    <select value={formData.appPlatform} onChange={(e) => setFormData({ ...formData, appPlatform: e.target.value })} className="w-full px-3 py-2 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}>
                      <option value="iOS">iOS</option>
                      <option value="Android">Android</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Target market</label>
                <select value={formData.targetMarket} onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })} className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}>
                  <option value="Australia">Australia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="APAC">APAC (All)</option>
                  <option value="Global">Global</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Budget</label>
                <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}>
                  <option value="$2K – $5K">$2K – $5K</option>
                  <option value="$5K – $10K">$5K – $10K</option>
                  <option value="$10K – $25K">$10K – $25K</option>
                  <option value="$25K – $50K">$25K – $50K</option>
                  <option value="$50K+">$50K+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Brief details</label>
              <textarea rows={4} value={formData.briefDetails} onChange={(e) => setFormData({ ...formData, briefDetails: e.target.value })} placeholder="What are you promoting? Target audience? Key messages? Any specific creator requirements?" className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-lg" style={{ backgroundColor: '#3B82F6' }}>
              {isSubmitting ? 'Submitting...' : 'Submit brief →'}
            </button>

            <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              → admin@mobileyes.live · 2 business day response
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}
