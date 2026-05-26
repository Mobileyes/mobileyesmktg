import Link from 'next/link'

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">Services</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Beyond talent. Full-funnel growth.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Mobileyes combines managed creator talent with verified user acquisition expertise and audience incrementality measurement — built on 20 years across gaming publishers and performance platforms.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Talent Management */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Creator Talent Management</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Managed representation for gaming and streaming creators. Selective briefs, 4-day payment, and full campaign analytics.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>YouTube, Twitch, Kick, TikTok creators</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>ANZ + APAC coverage</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Bot-free verified audiences</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>4-day creator payment</li>
              </ul>
            </div>

            {/* User Acquisition */}
            <div className="p-8 rounded-2xl border-2 border-blue-200 bg-blue-50/30">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">User Acquisition & Growth</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Leveraging our background building audiences for King, Activision Blizzard, and AppsFlyer — we expand beyond talent into verified user acquisition and audience incrementality partnerships with proven, unbiased results across various platforms and publishers.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Full-funnel attribution (AppsFlyer OneLink + UTM + promo codes)</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Audience incrementality measurement</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Cross-platform performance comparison</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Proven results across gaming publishers globally</li>
              </ul>
            </div>

            {/* Campaign Analytics */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Campaign Analytics & Reporting</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Every campaign gets full performance reporting within 48 hours. Reach, engagement, watch time, conversions, and ROI — compared against industry benchmarks.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>Post-campaign reports within 48 hours</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>Per-creator performance breakdown</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>ROAS, CPI, CPA, LTV tracking</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>Branded PDF reports for stakeholders</li>
              </ul>
            </div>

            {/* APAC Expansion */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🌏</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">APAC Market Expansion</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Deep relationships and on-ground presence across the fastest-growing gaming markets. We help brands reach new audiences authentically through local creators.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
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
      <section className="py-24 px-6 bg-slate-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to grow?</h2>
          <p className="text-slate-600 mb-8">
            Whether you need creator talent, user acquisition support, or full-funnel campaign management — let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/brands" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors">
              Submit a Brief
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-slate-200 text-slate-900 rounded-xl font-semibold hover:bg-white transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
