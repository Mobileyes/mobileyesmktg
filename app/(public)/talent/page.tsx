import Link from 'next/link'

export default function TalentPage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-white py-32 px-6 relative overflow-hidden" style={{ background: '#0B0F2E' }}>
        <div className="relative max-w-5xl mx-auto">
          <p className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#3B82F6' }}>Our Talent</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Curated streaming creators across ANZ and APAC.
          </h1>
          <p className="text-xl max-w-3xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Every creator on our roster is personally managed and selectively matched to campaigns. 
            Real audiences. Real engagement. No bots. No fakes.
          </p>
        </div>
      </section>

      {/* Platform Focus */}
      <section className="py-24 px-6" style={{ background: '#0B0F2E' }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: '#3B82F6' }}>Platforms</p>
            <h2 className="text-3xl font-bold text-white">
              Stream-first. Video-native. Community-driven.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* YouTube — Primary */}
            <div className="p-8 rounded-2xl relative" style={{ border: '2px solid #3B82F6', backgroundColor: 'rgba(59,130,246,0.05)' }}>
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: 'rgba(59,130,246,0.2)', color: '#3B82F6' }}>Primary</div>
              <div className="text-4xl mb-4">▶️</div>
              <h3 className="text-xl font-bold text-white mb-3">YouTube Gaming</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Long-form gaming content, live streams, reviews, and deep-dive brand partnerships. 
                High watch time, strong SEO, and audiences that return for every upload.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#1E2A5E', color: 'rgba(255,255,255,0.7)' }}>Long-form</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#1E2A5E', color: 'rgba(255,255,255,0.7)' }}>Live streams</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#1E2A5E', color: 'rgba(255,255,255,0.7)' }}>High retention</span>
              </div>
            </div>

            {/* Twitch */}
            <div className="p-8 rounded-2xl hover:border-purple-500/30 transition-colors" style={{ border: '1px solid #1E2A5E' }}>
              <div className="text-4xl mb-4">🟣</div>
              <h3 className="text-xl font-bold text-white mb-3">Twitch</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Live streaming powerhouse. Real-time community engagement, sponsored streams, 
                and live commerce integrations with audiences that watch for hours.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Live only</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Chat engagement</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Community</span>
              </div>
            </div>

            {/* Kick */}
            <div className="p-8 rounded-2xl hover:border-green-500/30 transition-colors" style={{ border: '1px solid #1E2A5E' }}>
              <div className="text-4xl mb-4">🟢</div>
              <h3 className="text-xl font-bold text-white mb-3">Kick</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                The fastest-growing live streaming platform. Higher creator revenue share attracts 
                top talent. Early-mover advantage for brands in the streaming space.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Growing fast</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Streaming-first</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>High energy</span>
              </div>
            </div>

            {/* TikTok */}
            <div className="p-8 rounded-2xl hover:border-pink-500/30 transition-colors" style={{ border: '1px solid #1E2A5E' }}>
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-white mb-3">TikTok</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Short-form clips, reactions, and viral brand integrations. 
                Massive reach for awareness campaigns targeting 18–30 audiences.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Short-form</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Viral reach</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Gen Z</span>
              </div>
            </div>

            {/* Instagram */}
            <div className="p-8 rounded-2xl hover:border-orange-500/30 transition-colors" style={{ border: '1px solid #1E2A5E' }}>
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold text-white mb-3">Instagram</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Reels, stories, and feed posts for lifestyle content. 
                Strong for brand affinity and cross-platform amplification.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Reels</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Stories</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#111633', color: 'rgba(255,255,255,0.7)' }}>Lifestyle</span>
              </div>
            </div>

            {/* Multi-platform */}
            <div className="p-8 rounded-2xl" style={{ border: '1px dashed #1E2A5E', backgroundColor: '#111633' }}>
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Platform</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Many of our creators operate across multiple platforms. We coordinate campaigns 
                that leverage each platform&apos;s strengths for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-24 px-6" style={{ backgroundColor: '#111633' }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: '#3B82F6' }}>Markets</p>
            <h2 className="text-3xl font-bold text-white">ANZ and APAC coverage</h2>
            <p className="mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
              We represent creators and run campaigns across the fastest-growing streaming markets in the world.
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
              <div key={market.name} className="p-4 rounded-xl text-center" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}>
                <span className="text-3xl">{market.flag}</span>
                <p className="font-semibold text-white text-sm mt-2">{market.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{market.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy note */}
      <section className="py-16 px-6" style={{ background: '#0B0F2E' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-2xl" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
            <h3 className="text-lg font-bold text-white mb-3">Why we don&apos;t publicly list our roster</h3>
            <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Our creators are matched to campaigns privately to protect their commercial relationships 
              and ensure brands get exclusive access. Send us a brief and we&apos;ll match you with tailored talent 
              that fits your audience, market, and objectives — with full analytics on each creator.
            </p>
            <Link href="/brands" className="inline-flex items-center gap-2 mt-6 font-medium hover:opacity-80" style={{ color: '#3B82F6' }}>
              Send a brief — we&apos;ll match your requirements
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
