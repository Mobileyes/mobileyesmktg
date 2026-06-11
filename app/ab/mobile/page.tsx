'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { MBIcon } from '@/components/brand/MBIcon'

/**
 * Mobile Landing Page — Mobileyes
 * 
 * Designed for portrait phones. Full viewport video hero.
 * Everything stacked vertically, thumb-friendly CTAs,
 * minimal chrome, maximum impact.
 * 
 * URL: /ab/mobile
 */

export default function MobileLandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      video.pause()
      return
    }

    video.play().catch(() => {})
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#0B0F2E' }}>
      {/* Full-viewport Video Hero */}
      <section className="relative h-screen flex flex-col justify-end overflow-hidden">
        {/* Video — fills entire screen */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/Web_Poster_9x16.jpg"
          src="/video/Mobileyes_Web_9x16_MobileHeroLoop_Muted_NoCard.mp4"
          style={{ zIndex: 0 }}
        />

        {/* Gradient scrim — heavier at bottom where text lives */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: 'linear-gradient(180deg, rgba(11,15,46,0.2) 0%, rgba(11,15,46,0.4) 40%, rgba(11,15,46,0.85) 75%, #0B0F2E 100%)',
          }}
        />

        {/* Top bar — logo + pill */}
        <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-14 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MBIcon size={20} />
            <span className="text-white font-extrabold text-sm tracking-wide">MOBILEYES</span>
          </div>
          <div className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <span className="text-[11px] font-medium" style={{ color: '#EF4444' }}>● LIVE</span>
          </div>
        </div>

        {/* Bottom content — headline + CTAs */}
        <div className="relative z-10 px-5 pb-10">
          <h1 className="text-[44px] font-extrabold tracking-tight leading-[0.9] mb-4 text-white">
            <span className="block">Represent.</span>
            <span className="block" style={{ color: '#3B82F6' }}>Perform.</span>
            <span className="block">Get paid.</span>
          </h1>

          <p className="text-[15px] leading-relaxed mb-8 max-w-[280px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            4-day payment. Better briefs. Real data. Live streaming talent — Sydney & APAC.
          </p>

          {/* Primary CTA — full width, thumb-friendly */}
          <Link
            href="/creators"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-white text-[16px] mb-3"
            style={{ backgroundColor: '#3B82F6' }}
          >
            Apply as Creator
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/brands"
            className="flex items-center justify-center w-full py-3.5 rounded-2xl font-medium text-[14px]"
            style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Submit a brand brief
          </Link>
        </div>
      </section>

      {/* Section 2 — Value Props (swipe to discover) */}
      <section className="px-5 py-12">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-6" style={{ color: '#EF4444' }}>
          Why creators choose us
        </p>

        <div className="space-y-4">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(59,130,246,0.15)' }}>
                <span className="text-lg">💰</span>
              </div>
              <h3 className="text-[15px] font-bold text-white">4-Day Payment</h3>
            </div>
            <p className="text-[13px] leading-relaxed pl-11" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Content approved → paid in 4 business days. We bear the credit risk. You never chase an invoice.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(239,68,68,0.15)' }}>
                <span className="text-lg">🎯</span>
              </div>
              <h3 className="text-[15px] font-bold text-white">Selective Briefs Only</h3>
            </div>
            <p className="text-[13px] leading-relaxed pl-11" style={{ color: 'rgba(255,255,255,0.55)' }}>
              We match campaigns to your audience. No spray-and-pray. Every brief is relevant or it doesn't reach you.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <span className="text-lg">📊</span>
              </div>
              <h3 className="text-[15px] font-bold text-white">Tech-Verified Delivery</h3>
            </div>
            <p className="text-[13px] leading-relaxed pl-11" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Automated proof-of-delivery. Screenshots, transcripts, attribution tracking. Brands trust the data, you get paid faster.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Social proof / numbers */}
      <section className="px-5 py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-3xl font-bold text-white">4</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Day payment</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">20+</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Years experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">AU</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>& APAC markets</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">Live</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Stream-first</p>
          </div>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-8 pt-4" style={{ background: 'linear-gradient(180deg, transparent 0%, #0B0F2E 40%)' }}>
        <Link
          href="/creators"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-white text-[15px]"
          style={{ backgroundColor: '#3B82F6', boxShadow: '0 4px 24px rgba(59, 130, 246, 0.4)' }}
        >
          Apply as Creator
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>
    </div>
  )
}
