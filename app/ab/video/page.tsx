'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { MobileyesLogo, MBIcon } from '@/components/brand/MBIcon'

/**
 * A/B Test: Video Hero Homepage
 * 
 * Full-bleed autoplay video background with responsive source switching.
 * Desktop: 16:9 loop. Mobile: 9:16 loop. Poster frames for instant paint.
 * Navy gradient scrim for headline legibility over desaturated B&W + red footage.
 * 
 * URL: /ab/video
 */

export default function ABVideoHeroPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      video.pause()
      return
    }

    // Responsive source switching
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

    // Set initial source
    setVideoSource(mobileQuery.matches)

    // Listen for viewport changes (rotation, resize)
    const handler = (e: MediaQueryListEvent) => setVideoSource(e.matches)
    mobileQuery.addEventListener('change', handler)

    return () => mobileQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div style={{ background: '#0B0F2E' }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 max-w-7xl mx-auto py-4"
      >
        <MobileyesLogo size={26} />
        <div className="flex items-center gap-6">
          <Link href="/creators" className="text-sm text-white/70 hover:text-white transition-colors hidden md:block">For Creators</Link>
          <Link href="/brands" className="text-sm text-white/70 hover:text-white transition-colors hidden md:block">For Brands</Link>
          <Link href="/creators" className="px-4 py-2 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: '#3B82F6' }}>
            Apply Now
          </Link>
        </div>
      </nav>

      {/* Hero with Video Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video Background */}
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

        {/* Legibility Scrim — navy gradient that fades video into page */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: 'linear-gradient(180deg, rgba(11,15,46,0.55) 0%, rgba(11,15,46,0.70) 50%, rgba(11,15,46,0.85) 75%, #0B0F2E 100%)',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="max-w-4xl">
            {/* Live indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)', backdropFilter: 'blur(8px)' }}>
              <MBIcon size={16} />
              <span className="text-sm font-medium" style={{ color: '#EF4444' }}>Live streaming talent — Sydney, AU</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[0.85] mb-8 text-white" style={{ letterSpacing: '-1px' }}>
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
                className="px-8 py-4 text-sm font-medium text-center transition-all rounded-xl"
                style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Submit a brand brief →
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
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

      {/* Below the fold — social proof / what we do */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}>
              <svg className="w-5 h-5" style={{ color: '#EF4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Tech-Verified Delivery</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Automated proof-of-delivery. Screenshots, transcripts, UTM tracking — no more trust-based verification.
            </p>
          </div>
          <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
              <svg className="w-5 h-5" style={{ color: '#3B82F6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">4-Day Payment</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Content approved → paid in 4 business days. We bear the credit risk. Creators get paid regardless.
            </p>
          </div>
          <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <svg className="w-5 h-5" style={{ color: '#FFFFFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real Attribution Data</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              S2S conversion tracking, UTM attribution, performance benchmarks vs paid UA. Proof, not promises.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
