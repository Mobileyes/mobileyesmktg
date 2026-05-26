import Link from 'next/link'

export default function TalentPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">Our Talent</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Curated gaming creators across ANZ and APAC.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Every creator on our roster is personally managed and selectively matched to campaigns. 
            Real audiences. Real engagement. No bots. No fakes.
          </p>
        </div>
      </section>

      {/* Platform Focus */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Platforms</p>
            <h2 className="text-3xl font-bold text-slate-900">
              Stream-first. Video-native. Community-driven.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* YouTube — Primary */}
            <div className="p-8 rounded-2xl border-2 border-blue-200 bg-blue-50/30 relative">
              <div className="absolute top-4 right-4 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">Primary</div>
              <div className="text-4xl mb-4">▶️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">YouTube Gaming</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Long-form gaming content, live streams, reviews, and deep-dive brand partnerships. 
                High watch time, strong SEO, and audiences that return for every upload.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white rounded text-xs text-slate-600">Long-form</span>
                <span className="px-2 py-1 bg-white rounded text-xs text-slate-600">Live streams</span>
                <span className="px-2 py-1 bg-white rounded text-xs text-slate-600">High retention</span>
              </div>
            </div>

            {/* Twitch */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-purple-200 transition-colors">
              <div className="text-4xl mb-4">🟣</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Twitch</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Live streaming powerhouse. Real-time community engagement, sponsored streams, 
                and live commerce integrations with audiences that watch for hours.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Live only</span>
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Chat engagement</span>
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Community</span>
              </div>
            </div>

            {/* Kick */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-green-200 transition-colors">
              <div className="text-4xl mb-4">🟢</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kick</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                The fastest-growing live streaming platform. Higher creator revenue share attracts 
                top talent. Early-mover advantage for brands in the gaming space.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Growing fast</span>
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Gaming-first</span>
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">High energy</span>
              </div>
            </div>

            {/* TikTok */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-pink-200 transition-colors">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">TikTok</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Short-form gaming clips, reactions, and viral brand integrations. 
                Massive reach for awareness campaigns targeting 18–30 gaming audiences.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Short-form</span>
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Viral reach</span>
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Gen Z</span>
              </div>
            </div>

            {/* Instagram */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-orange-200 transition-colors">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instagram</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Reels, stories, and feed posts for gaming lifestyle content. 
                Strong for brand affinity and cross-platform amplification.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Reels</span>
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Stories</span>
                <span className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600">Lifestyle</span>
              </div>
            </div>

            {/* Multi-platform */}
            <div className="p-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Platform</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Many of our creators operate across multiple platforms. We coordinate campaigns 
                that leverage each platform&apos;s strengths for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Markets</p>
            <h2 className="text-3xl font-bold text-slate-900">ANZ and APAC coverage</h2>
            <p className="text-slate-600 mt-3">
              We represent creators and run campaigns across the fastest-growing gaming markets in the world.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { flag: '🇦🇺', name: 'Australia', status: 'Active' },
              { flag: '🇳🇿', name: 'New Zealand', status: 'Active' },
              { flag: '🇻🇳', name: 'Vietnam', status: 'Active' },
              { flag: '🇹🇭', name: 'Thailand', status: 'Growing' },
              { flag: '🇮🇩', name: 'Indonesia', status: 'Growing' },
              { flag: '🇵🇭', name: 'Philippines', status: 'Growing' },
            ].map((market) => (
              <div key={market.name} className="p-4 bg-white rounded-xl border border-slate-200 text-center">
                <span className="text-3xl">{market.flag}</span>
                <p className="font-semibold text-slate-900 text-sm mt-2">{market.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{market.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy note */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Why we don&apos;t publicly list our roster</h3>
            <p className="text-slate-600 leading-relaxed">
              Our creators are matched to campaigns privately to protect their commercial relationships 
              and ensure brands get exclusive access. Send us a brief and we&apos;ll match you with tailored talent 
              that fits your audience, market, and objectives — with full analytics on each creator.
            </p>
            <Link href="/brands" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-medium hover:text-blue-700">
              Send a brief — we&apos;ll match your requirements
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
