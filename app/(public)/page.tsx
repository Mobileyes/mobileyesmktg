import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero — Full viewport, bold statement */}
      <section className="relative min-h-screen bg-slate-950 text-white flex items-center overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 opacity-90" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">Live gaming talent agency — Sydney, Australia</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              <span className="block">Represent.</span>
              <span className="block text-blue-400">Perform.</span>
              <span className="block">Get paid.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 leading-relaxed">
              Gaming creator representation that works. Better briefs. 4-day payment. 
              Selective campaigns across Australia and APAC.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/creators"
                className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all text-lg inline-flex items-center gap-2"
              >
                Apply as Creator
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/brands"
                className="px-8 py-4 border border-slate-600 text-white rounded-xl font-semibold hover:bg-white/5 hover:border-slate-400 transition-all text-lg"
              >
                Submit a Brief
              </Link>
            </div>
          </div>
          
          {/* Stats strip */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12">
            <div>
              <p className="text-4xl font-bold text-white">4</p>
              <p className="text-slate-400 text-sm mt-1">Day payment guarantee</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">20+</p>
              <p className="text-slate-400 text-sm mt-1">Years gaming industry</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">AU</p>
              <p className="text-slate-400 text-sm mt-1">& APAC coverage</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">Live</p>
              <p className="text-slate-400 text-sm mt-1">Stream-first creators</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do — Clean cards */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">What we do</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              The agency model, rebuilt for live gaming creators.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">4-Day Payment</h3>
              <p className="text-slate-600 leading-relaxed">
                Content approved? Paid in 4 days. We work directly with platforms and carry the float. No chasing invoices while you stream.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Selective Briefs</h3>
              <p className="text-slate-600 leading-relaxed">
                Not every campaign fits every creator. We match on audience, content style, and brand alignment. Quality over volume, always.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AU + APAC Reach</h3>
              <p className="text-slate-600 leading-relaxed">
                Deep brand relationships across Australia, Vietnam, Thailand, and the broader APAC gaming market. Local knowledge, regional scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Brands — Split layout */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">For brands</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Campaigns that perform. Creators who deliver.
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                20 years across King, Activision Blizzard, AppsFlyer, and AWS taught us what makes influencer campaigns actually work — and what kills them.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  'Brief-first approach — your brand truth, their authentic voice',
                  'Full-funnel tracking from impression to install to retention',
                  'Curated gaming roster — no bots, no fake engagement',
                  'Campaign analytics delivered within 48 hours of completion',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
              
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
              >
                Submit a Brief
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            
            {/* Founder card */}
            <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-20 h-20 bg-slate-700 rounded-2xl mb-6 flex items-center justify-center">
                  {/* Placeholder for Joel's photo */}
                  <span className="text-2xl font-bold text-slate-400">JK</span>
                </div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Founder</p>
                <h3 className="text-2xl font-bold mb-4">Joel Kirk</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  20 years in gaming, media, and performance marketing. Built Mobileyes because gaming creators deserve better briefs, faster payment, and representation that understands both sides of the table.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['IGN', 'King', 'Activision Blizzard', 'AppsFlyer', 'AWS'].map((company) => (
                    <span key={company} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Creators — Dark section */}
      <section className="py-32 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">For creators</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Your content. Your audience. Our infrastructure.
            </h2>
            <p className="text-xl text-slate-300">
              We handle the business so you can focus on what you do best — creating content and building community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '01', title: 'Apply', desc: 'Submit your profile. We review every application personally.' },
              { number: '02', title: 'Get Matched', desc: 'We send you briefs that fit your audience and content style.' },
              { number: '03', title: 'Create', desc: 'Deliver content on your terms. No scripts. Your voice.' },
              { number: '04', title: 'Get Paid', desc: '4 days from content approval. Direct to your account.' },
            ].map((step) => (
              <div key={step.number} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-blue-400 font-mono text-sm mb-4">{step.number}</p>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/creators"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors text-lg"
            >
              Apply Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Analytics Preview — The sell */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mock analytics dashboard */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-slate-400 font-mono">mobileyes.live/analytics</span>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-500 font-medium">Stream Reach</span>
                    <span className="text-xs text-green-600 font-medium">+23%</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">142,800</p>
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">Engagement Rate</span>
                    <p className="text-xl font-bold text-slate-900 mt-1">8.4%</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">Avg Watch Time</span>
                    <p className="text-xl font-bold text-slate-900 mt-1">24m</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Campaign Performance</span>
                  <div className="flex items-end gap-1 mt-2 h-16">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 95, 75, 88, 92].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-100 rounded-sm relative" style={{ height: `${h}%` }}>
                        <div className="absolute inset-x-0 bottom-0 bg-blue-500 rounded-sm" style={{ height: `${h * 0.7}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Creator Analytics</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Know exactly how your content performed.
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Every managed creator gets access to campaign analytics — reach, engagement, watch time, and performance metrics delivered after every stream and campaign.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                In a market full of fake influence and inflated numbers, we track what actually matters: real viewers, real engagement, real results for brands. This is your proof of value.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Reach & Impressions', 'Engagement Rate', 'Watch Time', 'Audience Demographics', 'Campaign ROI', 'Growth Tracking'].map((metric) => (
                  <span key={metric} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-700 font-medium">
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-8">Platforms we represent across</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60">
            {['YouTube', 'Twitch', 'Kick', 'TikTok', 'Instagram'].map((platform) => (
              <span key={platform} className="text-2xl font-bold text-slate-400">{platform}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to level up your creator career?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Whether you are a creator looking for professional representation or a brand looking for authentic gaming content — let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/creators"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors text-lg"
            >
              Creator Application
            </Link>
            <Link
              href="/brands"
              className="px-8 py-4 border border-slate-600 text-white rounded-xl font-semibold hover:bg-white/5 transition-colors text-lg"
            >
              Brand Brief
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 text-slate-400 hover:text-white transition-colors text-lg font-medium"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
