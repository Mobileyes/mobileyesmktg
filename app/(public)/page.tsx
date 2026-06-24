'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { MBIcon } from '@/components/brand/MBIcon'

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      video.pause()
      return
    }

    const mobileQuery = window.matchMedia('(max-width: 767px)')

    function setVideoSource(isMobile: boolean) {
      if (!video) return
      const src = isMobile
        ? '/video/Mobileyes_Web_9x16_MobileHeroLoop_Muted_NoCard.mp4'
        : '/video/Mobileyes_Web_16x9_HeroLoop_Muted_NoCard.mp4'
      const poster = isMobile
        ? '/img/Web_Poster_9x16.jpg'
        : '/img/Web_Poster_16x9.jpg'

      if (video.src !== window.location.origin + src) {
        video.src = src
        video.poster = poster
        video.load()
        video.play().catch(() => {})
      }
    }

    setVideoSource(mobileQuery.matches)
    const handler = (e: MediaQueryListEvent) => setVideoSource(e.matches)
    mobileQuery.addEventListener('change', handler)
    return () => mobileQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div style={{ background: '#0B0F2E' }}>
      {/* Hero — Video Background */}
      <section className="relative min-h-[100svh] md:min-h-[90vh] flex items-end md:items-center overflow-hidden" style={{ background: '#0B0F2E' }}>
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/Web_Poster_16x9.jpg"
          src="/video/Mobileyes_Web_16x9_HeroLoop_Muted_NoCard.mp4"
          style={{ zIndex: 0 }}
        />

        {/* Scrim */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: 'linear-gradient(180deg, rgba(11,15,46,0.4) 0%, rgba(11,15,46,0.6) 40%, rgba(11,15,46,0.85) 75%, #0B0F2E 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-32 w-full">
          <div className="max-w-4xl">
            {/* Live indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(26, 0, 8, 0.7)', border: '1px solid rgba(239, 68, 68, 0.4)', backdropFilter: 'blur(8px)' }}>
              <MBIcon size={16} />
              <span className="text-sm font-medium" style={{ color: '#EF4444' }}>Live streaming talent — Sydney, AU</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[0.9] mb-6 text-white" style={{ letterSpacing: '-1px' }}>
              <span className="block">Represent.</span>
              <span className="block" style={{ color: '#3B82F6' }}>Perform.</span>
              <span className="block">Get paid.</span>
            </h1>

            <p className="text-lg md:text-2xl max-w-2xl mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Better briefs. 4-day payment. Real data. Creator representation
              built for live streaming across Australia and APAC.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/creators"
                className="group px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-all text-lg inline-flex items-center justify-center gap-2"
                style={{ backgroundColor: '#3B82F6' }}
              >
                Apply as Creator
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/brands"
                className="group px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-all text-lg inline-flex items-center justify-center gap-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)' }}
              >
                Submit a Brand Brief
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">4</p>
              <p className="text-xs md:text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Day payment guarantee</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">20+</p>
              <p className="text-xs md:text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Years in the industry</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">AU</p>
              <p className="text-xs md:text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>& APAC coverage</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">Live</p>
              <p className="text-xs md:text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Stream-first creators</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>Founded by 20 years across</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-center">
            {['IGN', 'Myspace', 'InMobi', 'King', 'Activision Blizzard', 'AppsFlyer', 'AWS'].map((company) => (
              <span key={company} className="text-base md:text-xl font-bold tracking-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-32 px-6" style={{ background: '#0B0F2E' }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10 md:mb-16">
            <p className="font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: '#3B82F6' }}>What we do</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={{ letterSpacing: '-0.3px' }}>
              The agency model, rebuilt for live streaming creators.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: '4-Day Payment', desc: 'Content approved? Paid in 4 days. We carry the float. No chasing invoices while you stream.', icon: '⚡' },
              { title: 'Selective Briefs', desc: 'Not every campaign fits every creator. We match on audience, content style, and brand alignment.', icon: '🎯' },
              { title: 'AU + APAC Reach', desc: 'Deep brand relationships across Australia, Vietnam, Thailand, and the broader APAC market.', icon: '🌏' },
            ].map((card) => (
              <div key={card.title} className="p-6 md:p-8 rounded-2xl" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
                <span className="text-2xl mb-3 block">{card.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Creators — Process */}
      <section className="py-20 md:py-32 px-6" style={{ background: '#080C24' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <p className="font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: '#3B82F6' }}>For creators</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Your content. Your audience. Our infrastructure.
            </h2>
            <p className="text-base md:text-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              We handle the business so you can focus on creating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { num: '01', title: 'Apply', desc: 'Submit your profile. We review every application personally.' },
              { num: '02', title: 'Get Matched', desc: 'We send you briefs that fit your audience and content style.' },
              { num: '03', title: 'Create', desc: 'Deliver content on your terms. No scripts. Your voice.' },
              { num: '04', title: 'Get Paid', desc: '4 days from content approval. Direct to your account.' },
            ].map((step) => (
              <div key={step.num} className="flex md:block items-start gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl" style={{ backgroundColor: '#0F1330', border: '1px solid #1E2A5E' }}>
                <p className="font-mono text-sm md:mb-4 flex-shrink-0" style={{ color: '#3B82F6' }}>{step.num}</p>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
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
      <section className="py-12 md:py-20 px-6" style={{ background: '#0B0F2E', borderTop: '1px solid #1E2A5E' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-medium uppercase tracking-wider mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Platforms we represent across</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-16 items-center">
            {['YouTube', 'Twitch', 'Kick', 'TikTok', 'Instagram', 'OnlyFans'].map((platform) => (
              <span key={platform} className="text-lg md:text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>{platform}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ background: '#080C24' }}>
        <div className="relative max-w-3xl mx-auto text-center">
          <MBIcon size={44} className="mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Get paid in 4 days, not 45.
          </h2>
          <p className="text-base md:text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Better briefs. Real data. Selective campaigns. Whether you&apos;re a creator or a brand — we built this because the old model was broken.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/creators" className="px-8 py-4 text-white rounded-xl font-semibold text-lg w-full sm:w-auto text-center" style={{ backgroundColor: '#3B82F6' }}>
              Creator Application
            </Link>
            <Link href="/brands" className="px-8 py-4 text-white rounded-xl font-semibold text-lg w-full sm:w-auto text-center" style={{ border: '1px solid #1E2A5E' }}>
              Brand Brief
            </Link>
          </div>
          <p className="mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            admin@mobileyes.live · 2 business day response
          </p>
        </div>
      </section>
    </div>
  )
}
