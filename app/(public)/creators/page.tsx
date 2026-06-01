'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CreatorsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    platform: '',
    handleUrl: '',
    followerCount: '',
    avgViews: '',
    sessionLength: '',
    audienceLocation: '',
    contentNiche: [] as string[],
    gamingGenres: [] as string[],
    whyJoin: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/public/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Application Received</h1>
          <p className="text-slate-600 text-lg">
            We review every application personally. If there&apos;s a fit, you&apos;ll hear from us within 48 hours.
          </p>
          <Link href="/" className="inline-block mt-8 text-blue-600 font-medium hover:text-blue-700">
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
          <p className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#3B82F6' }}>For Creators</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
            Professional representation for live streaming creators.
          </h1>
          <p className="text-xl max-w-3xl mb-12" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Better briefs. 4-day payment. Selective campaigns that fit your audience.
            We handle the business so you can focus on content.
          </p>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg">
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
              <p className="text-3xl font-bold" style={{ color: '#3B82F6' }}>4</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Day payment</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <p className="text-3xl font-bold text-green-400">25%</p>
              <p className="text-slate-400 text-xs mt-1">Commission</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <p className="text-3xl font-bold text-purple-400">APAC</p>
              <p className="text-slate-400 text-xs mt-1">Campaigns</p>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">What managed creators get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '4-day payment', desc: 'Content approved → paid in 4 days. We work directly with platforms and carry the float. No chasing. No excuses.' },
              { title: 'Selective briefs only', desc: 'Only campaigns that match your audience and content style. We say no to bad fits so you never have to.' },
              { title: 'Campaign analytics in 48hrs', desc: 'Full performance data delivered within 48 hours — reach, engagement, watch time, conversions. Your proof of value.' },
              { title: 'Rate card management', desc: 'We negotiate your rates and ensure you are fairly compensated. Transparent commission. No hidden fees.' },
              { title: 'Bot-free transparency', desc: 'We verify audience authenticity for every creator on our roster. Real audiences = real results = better briefs for you.' },
              { title: 'ANZ + APAC campaigns', desc: 'Access to brand campaigns across Australia, New Zealand, Vietnam, Thailand, and the broader APAC gaming market.' },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Apply to Join</h2>
          <p className="text-slate-500 mb-10">
            We review every application. If there&apos;s a fit, you&apos;ll hear from us within 48 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Platform *</label>
                <select required value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white">
                  <option value="">Select platform</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Twitch">Twitch</option>
                  <option value="Kick">Kick</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Channel URL *</label>
                <input type="url" required placeholder="https://..." value={formData.handleUrl} onChange={(e) => setFormData({ ...formData, handleUrl: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Follower Count *</label>
                <input type="number" required placeholder="e.g. 50000" value={formData.followerCount} onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Avg Views</label>
                <input type="number" placeholder="e.g. 15000" value={formData.avgViews} onChange={(e) => setFormData({ ...formData, avgViews: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Audience Location *</label>
                <select required value={formData.audienceLocation} onChange={(e) => setFormData({ ...formData, audienceLocation: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white">
                  <option value="">Primary audience</option>
                  <option value="Australia">Australia</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Global">Global / Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Stream Session Length</label>
                <select value={formData.sessionLength} onChange={(e) => setFormData({ ...formData, sessionLength: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white">
                  <option value="">If applicable</option>
                  <option value="1-2hrs">1–2 hours</option>
                  <option value="2-4hrs">2–4 hours</option>
                  <option value="4-6hrs">4–6 hours</option>
                  <option value="6+hrs">6+ hours</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Content Niche *</label>
              <div className="flex flex-wrap gap-2">
                {['Gaming', 'Entertainment', 'Esports', 'Live Streaming', 'Tech', 'Lifestyle', 'Comedy'].map((niche) => (
                  <label key={niche} className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all ${formData.contentNiche.includes(niche) ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    <input type="checkbox" className="sr-only" checked={formData.contentNiche.includes(niche)} onChange={(e) => { if (e.target.checked) { setFormData({ ...formData, contentNiche: [...formData.contentNiche, niche] }) } else { setFormData({ ...formData, contentNiche: formData.contentNiche.filter((n) => n !== niche) }) } }} />
                    {niche}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Gaming Genres</label>
              <div className="flex flex-wrap gap-2">
                {['FPS', 'Battle Royale', 'RPG', 'MOBA', 'Sports', 'Racing', 'Strategy', 'Indie', 'Horror', 'Simulation'].map((genre) => (
                  <label key={genre} className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all ${formData.gamingGenres.includes(genre) ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    <input type="checkbox" className="sr-only" checked={formData.gamingGenres.includes(genre)} onChange={(e) => { if (e.target.checked) { setFormData({ ...formData, gamingGenres: [...formData.gamingGenres, genre] }) } else { setFormData({ ...formData, gamingGenres: formData.gamingGenres.filter((g) => g !== genre) }) } }} />
                    {genre}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Why Mobileyes?</label>
              <textarea rows={4} placeholder="What are you looking for in representation?" value={formData.whyJoin} onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 text-lg">
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>

            <p className="text-xs text-slate-400 text-center">
              By submitting, you agree to our <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link> and <Link href="/terms" className="underline hover:text-slate-600">Terms</Link>.
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}
