import Link from 'next/link'

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-white py-32 px-6 relative overflow-hidden" style={{ background: '#0B0F2E' }}>
        <div className="relative max-w-5xl mx-auto">
          <p className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#3B82F6' }}>Services</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Beyond talent. Full-funnel growth.
          </h1>
          <p className="text-xl max-w-3xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Mobileyes combines managed creator talent with verified user acquisition expertise and audience incrementality measurement — built on 20 years across gaming publishers and performance platforms.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6" style={{ background: '#0B0F2E' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Talent Management */}
            <div className="p-8 rounded-2xl hover:border-blue-500/30 transition-colors" style={{ border: '1px solid #1E2A5E' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Creator Talent Management</h3>
              <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Managed representation for live streaming creators. Selective briefs, 4-day payment, and full campaign analytics.
              </p>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#3B82F6' }}>•</span>YouTube, Twitch, Kick, TikTok creators</li>
                <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#3B82F6' }}>•</span>ANZ + APAC coverage</li>
                <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#3B82F6' }}>•</span>Bot-free verified audiences</li>
                <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#3B82F6' }}>•</span>4-day creator payment</li>
              </ul>
            </div>

            {/* User Acquisition */}
            <div className="p-8 rounded-2xl" style={{ border: '2px solid #3B82F6', backgroundColor: 'rgba(59,130,246,0.05)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(59,130,246,0.15)' }}>
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">User Acquisition & Growth</h3>
              <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Leveraging our background building audiences for King, Activision Blizzard, and AppsFlyer — we expand beyond talent into verified user acquisition and audience incrementality partnerships with proven, unbiased results across various platforms and publishers.
              </p>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#3B82F6' }}>•</span>Full-funnel attribution (AppsFlyer OneLink + UTM + promo codes)</li>
                <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#3B82F6' }}>•</span>Audience incrementality measurement</li>
                <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#3B82F6' }}>•</span>Cross-platform performance comparison</li>
                <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#3B82F6' }}>•</span>Proven results across gaming publishers globally</li>
              </ul>
            </div>

            {/* Campaign Analytics */}
            <div className="p-8 rounded-2xl hover:border-blue-500/30 transition-colors" style={{ border: '1px solid #1E2A5E' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(34,197,94,0.1)' }}>
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Campaign Analytics & Reporting</h3>
              <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Every campaign gets full performance reporting within 48 hours. Reach, engagement, watch time, conversions, and ROI — compared against industry benchmarks.
              </p>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>Post-campaign reports within 48 hours</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>Per-creator performance breakdown</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>ROAS, CPI, CPA, LTV tracking</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>Branded PDF reports for stakeholders</li>
              </ul>
            </div>

            {/* APAC Expansion */}
            <div className="p-8 rounded-2xl hover:border-blue-500/30 transition-colors" style={{ border: '1px solid #1E2A5E' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(168,85,247,0.1)' }}>
                <span className="text-2xl">🌏</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">APAC Market Expansion</h3>
              <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Deep relationships and on-ground presence across the fastest-growing streaming markets. We help brands reach new audiences authentically through local creators.
              </p>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <li className="flex items-start gap-2"><span className="text-purple-500 mt-0.5">•</span>Australia, New Zealand, Vietnam, Thailand, Indonesia</li>
                <li className="flex items-start gap-2"><span className="text-purple-500 mt-0.5">•</span>Local creator recruitment and management</li>
                <li className="flex items-start gap-2"><span className="text-purple-500 mt-0.5">•</span>Market intelligence and audience insights</li>
                <li className="flex items-start gap-2"><span className="text-purple-500 mt-0.5">•</span>Live commerce and streaming campaigns</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: '#111633' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to grow?</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Whether you need creator talent, user acquisition support, or full-funnel campaign management — let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/brands" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors">
              Submit a Brief
            </Link>
            <Link href="/contact" className="px-6 py-3 text-white rounded-xl font-semibold hover:opacity-80 transition-colors" style={{ border: '1px solid #1E2A5E' }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
