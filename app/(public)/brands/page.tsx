'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BrandsPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    objective: '',
    markets: [] as string[],
    budget: '',
    platforms: [] as string[],
    timeline: '',
    briefDetails: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
      <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Brief Received</h1>
          
          {/* Countdown promise */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-lg font-bold text-slate-900">Response within 24 hours</p>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our fast outreach promise: we&apos;ll review your brief and respond with tailored talent recommendations matched to your requirements — including audience data, engagement metrics, and campaign fit scores.
            </p>
          </div>

          <div className="space-y-3 text-left bg-slate-50 rounded-xl p-5 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">What happens next</p>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-blue-600">1</span>
              <p className="text-sm text-slate-700">We review your brief and match creators from our verified roster</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-blue-600">2</span>
              <p className="text-sm text-slate-700">You receive a curated shortlist with analytics, rates, and audience data</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-blue-600">3</span>
              <p className="text-sm text-slate-700">We handle the brief, the creator, and the campaign — you get results</p>
            </div>
          </div>

          <Link href="/" className="inline-block mt-8 text-blue-600 font-medium hover:text-blue-700">
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">For Brands & Agencies</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Gaming campaigns that actually perform.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            20 years of gaming industry experience. Curated creator roster. Full-funnel analytics. 
            Submit a brief and we&apos;ll match you with the right creators for your audience.
          </p>
        </div>
      </section>

      {/* Why Mobileyes for brands */}
      <section className="py-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: '20+', label: 'Years gaming industry experience' },
              { stat: '4 day', label: 'Creator payment (they perform better)' },
              { stat: '100%', label: 'Real audience — no bots, no fakes' },
              { stat: '48hr', label: 'Campaign analytics delivery' },
            ].map((item) => (
              <div key={item.label} className="text-center p-6 rounded-xl bg-slate-50">
                <p className="text-2xl font-bold text-slate-900">{item.stat}</p>
                <p className="text-slate-500 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Submit a Campaign Brief</h2>
          <p className="text-slate-500 mb-10">
            Tell us what you need. We&apos;ll come back with creator recommendations within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
                <input type="text" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Contact Name *</label>
                <input type="text" required value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Objective *</label>
              <select required value={formData.objective} onChange={(e) => setFormData({ ...formData, objective: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option value="">Select objective</option>
                <option value="UA">User Acquisition (UA)</option>
                <option value="Awareness">Brand Awareness</option>
                <option value="Live Commerce">Live Commerce</option>
                <option value="Retention">Retention / Re-engagement</option>
                <option value="Launch">Game / Product Launch</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Target Markets *</label>
              <div className="flex flex-wrap gap-2">
                {['Australia', 'Vietnam', 'Thailand', 'Indonesia', 'Philippines', 'Japan', 'Korea', 'Global'].map((market) => (
                  <label key={market} className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all ${formData.markets.includes(market) ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    <input type="checkbox" className="sr-only" checked={formData.markets.includes(market)} onChange={(e) => { if (e.target.checked) { setFormData({ ...formData, markets: [...formData.markets, market] }) } else { setFormData({ ...formData, markets: formData.markets.filter((m) => m !== market) }) } }} />
                    {market}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range *</label>
              <select required value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option value="">Select budget</option>
                <option value="$2,000 - $5,000">$2,000 – $5,000 AUD</option>
                <option value="$5,000 - $10,000">$5,000 – $10,000 AUD</option>
                <option value="$10,000 - $25,000">$10,000 – $25,000 AUD</option>
                <option value="$25,000 - $50,000">$25,000 – $50,000 AUD</option>
                <option value="$50,000+">$50,000+ AUD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Preferred Platforms</label>
              <div className="flex flex-wrap gap-2">
                {['TikTok', 'YouTube', 'Twitch', 'Kick', 'Instagram'].map((platform) => (
                  <label key={platform} className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all ${formData.platforms.includes(platform) ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    <input type="checkbox" className="sr-only" checked={formData.platforms.includes(platform)} onChange={(e) => { if (e.target.checked) { setFormData({ ...formData, platforms: [...formData.platforms, platform] }) } else { setFormData({ ...formData, platforms: formData.platforms.filter((p) => p !== platform) }) } }} />
                    {platform}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Timeline</label>
              <input type="text" placeholder="e.g. Content live by August 2026" value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Brief Details</label>
              <textarea rows={5} placeholder="What are you promoting? Target audience? Key messages? Any specific creator requirements or platforms? The more detail you provide, the better we can match talent to your campaign." value={formData.briefDetails} onChange={(e) => setFormData({ ...formData, briefDetails: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
              <p className="text-xs text-slate-400 mt-2">We respond within 24 hours with tailored creator recommendations matched to your brief.</p>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 text-lg">
              {isSubmitting ? 'Submitting...' : 'Submit Brief'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
