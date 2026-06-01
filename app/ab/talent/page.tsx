/**
 * A/B TEST: Talent/Creators Page — Brand Book v1.0
 * 
 * Key differences from live:
 * - Deep navy background throughout
 * - Platform media kit logos (SVG marks)
 * - Space Grotesk typography
 * - Electric blue CTA
 * - MBIcon recording pulse
 */

import Link from 'next/link'

const platforms = [
  { name: 'YouTube', color: '#FF0000', desc: 'Long-form, VOD, live streams' },
  { name: 'Twitch', color: '#9146FF', desc: 'Live streaming, engagement' },
  { name: 'Kick', color: '#53FC18', desc: 'Growing platform, early mover' },
  { name: 'TikTok', color: '#FE2C55', desc: 'Short-form, viral reach' },
  { name: 'Instagram', color: '#E4405F', desc: 'Reels, stories, lifestyle' },
]

const benefits = [
  { title: '4-Day Payment', desc: 'Content approved → paid in 4 business days. No 30/60/90 day invoicing cycles.' },
  { title: 'Selective Briefs Only', desc: 'We match campaigns to your audience. No spam, no irrelevant offers.' },
  { title: 'Full Campaign Analytics', desc: 'See exactly how your content performed. Views, clicks, conversions, ROAS.' },
  { title: 'Brand Safety First', desc: 'We vet every brand before sending you a brief. Your reputation matters.' },
  { title: 'APAC Focus', desc: 'Australia, New Zealand, Vietnam, Thailand, SEA. We know these markets.' },
  { title: 'Human Management', desc: 'Joel personally manages every campaign. Not a bot, not an algorithm.' },
]

export default function ABTalentPage() {
  return (
    <div style={{ background: '#0B0F2E' }}>
      {/* Hero */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-1px' }}>
            Join as a Creator
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Gaming creator representation that works. We find the briefs, you make the content, everyone gets paid fast.
          </p>
          <Link
            href="/ab/brief"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90"
            style={{ background: '#3B82F6', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Apply Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Platforms — M-06: media kit logos */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-wider mb-8 text-center" style={{ color: '#3B82F6', fontFamily: "'Space Grotesk', sans-serif" }}>
            Platforms we represent on
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {platforms.map((platform) => (
              <div key={platform.name} className="p-5 rounded-xl text-center" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }}>
                {/* Platform mark — using colour dot as placeholder for actual SVG marks */}
                <div className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center" style={{ background: `${platform.color}20` }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: platform.color }} />
                </div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{platform.name}</p>
                <p className="text-slate-500 text-xs mt-1">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.3px' }}>
            Why creators choose Mobileyes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 rounded-xl" style={{ background: '#161B3D', border: '1px solid #1E2A5E' }}>
                <h3 className="text-white font-bold text-sm mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to level up?</h2>
          <p className="text-slate-400 mb-8">Apply in 2 minutes. We review every application personally.</p>
          <Link
            href="/ab/brief"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90"
            style={{ background: '#3B82F6' }}
          >
            Apply as Creator →
          </Link>
        </div>
      </section>
    </div>
  )
}
