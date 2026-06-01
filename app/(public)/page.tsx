import Link from 'next/link'
import { MBIcon } from '@/components/brand/MBIcon'

export default function HomePage() {
  return (
    <div style={{ background: '#0B0F2E' }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#0B0F2E' }}>
        {/* Subtle ring pattern background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rings" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="40" fill="none" stroke="#EF4444" strokeWidth="0.5" strokeDasharray="4 8" />
                <circle cx="60" cy="60" r="25" fill="none" stroke="#F97316" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rings)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="max-w-4xl">
            {/* Live indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <MBIcon size={16} />
              <span className="text-sm font-medium" style={{ color: '#EF4444' }}>Live streaming talent — Sydney, AU</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8 text-white" style={{ letterSpacing: '-1px' }}>
              <span className="block">Represent.</span>
              <span className="block" style={{ color: '#3B82F6' }}>Perform.</span>
              <span className="block">Get paid.</span>
            </h1>

            <p className="text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Creator representation that works. Better briefs. 4-day payment.
              Selective campaigns across Australia and APAC.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/creators"
                className="group px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-all text-lg inline-flex items-center gap-2"
                style={{ backgroundColor: '#3B82F6' }}
              >
                Apply as Creator
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/brands"
                className="px-8 py-4 text-white rounded-xl font-semibold hover:bg-white/5 transition-all text-lg"
                style={{ border: '1px solid #1E2A5E' }}
              >
                Submit a Brief
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12" style={{ borderTop: '1px solid #1E2A5E' }}>
            <div>
              <p className="text-4xl font-bold text-white">4</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Day payment guarantee</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">20+</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Years in the industry</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">AU</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>& APAC coverage</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">Live</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Stream-first creators</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-32 px-6" style={{ background: '#0B0F2E' }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: '#3B82F6' }}>What we do</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ letterSpacing: '-0.3px' }}>
              The agency model, rebuilt for live streaming creators.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '4-Day Payment', desc: 'Content approved? Paid in 4 days. We carry the float. No chasing invoices while you stream.', icon: '⚡' },
              { title: 'Selective Briefs', desc: 'Not every campaign fits every creator. We match on audience, content style, and brand alignment.', icon: '🎯' },
              { title: 'AU + APAC Reach', desc: 'Deep brand relationships across Australia, Vietnam, Thailand, and the broader APAC market. Local knowledge, regional scale.', icon: '🌏' },
            ].map((card) => (
              <div key={card.title} className="p-8 rounded-2xl" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
                <span className="text-2xl mb-4 block">{card.icon}</span>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Creators — Process */}
      <section className="py-32 px-6" style={{ background: '#080C24' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: '#3B82F6' }}>For creators</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Your content. Your audience. Our infrastructure.
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              We handle the business so you can focus on creating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Apply', desc: 'Submit your profile. We review every application personally.' },
              { num: '02', title: 'Get Matched', desc: 'We send you briefs that fit your audience and content style.' },
              { num: '03', title: 'Create', desc: 'Deliver content on your terms. No scripts. Your voice.' },
              { num: '04', title: 'Get Paid', desc: '4 days from content approval. Direct to your account.' },
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-2xl" style={{ backgroundColor: '#0F1330', border: '1px solid #1E2A5E' }}>
                <p className="font-mono text-sm mb-4" style={{ color: '#3B82F6' }}>{step.num}</p>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/creators"
              className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-semibold text-lg"
              style={{ backgroundColor: '#3B82F6' }}
            >
              Apply Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 px-6" style={{ background: '#0B0F2E', borderTop: '1px solid #1E2A5E' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-wider mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>Platforms we represent across</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            {['YouTube', 'Twitch', 'Kick', 'TikTok', 'Instagram'].map((platform) => (
              <span key={platform} className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>{platform}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#080C24' }}>
        <div className="relative max-w-4xl mx-auto text-center">
          <MBIcon size={64} className="mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to level up your streaming career?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Whether you&apos;re a creator looking for representation or a brand looking for authentic live content — let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/creators" className="px-8 py-4 text-white rounded-xl font-semibold text-lg" style={{ backgroundColor: '#3B82F6' }}>
              Creator Application
            </Link>
            <Link href="/brands" className="px-8 py-4 text-white rounded-xl font-semibold text-lg" style={{ border: '1px solid #1E2A5E' }}>
              Brand Brief
            </Link>
          </div>
          <p className="mt-8 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            admin@mobileyes.live · 2 business day response
          </p>
        </div>
      </section>
    </div>
  )
}
