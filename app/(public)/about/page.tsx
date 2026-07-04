import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Mobileyes — Joel Kirk | 20 Years Gaming, Media & Creator Marketing',
  description:
    'Founded by Joel Kirk. Career spanning IGN, Myspace, InMobi, King, Activision Blizzard, AppsFlyer, and AWS. Live streaming talent agency representing creators across YouTube, Twitch, Kick, TikTok, Instagram and OnlyFans in Australia and APAC.',
  keywords: [
    'Joel Kirk', 'Mobileyes', 'gaming talent agency', 'creator marketing',
    'streaming creators Australia', 'influencer agency Sydney',
    'Twitch talent management', 'Kick creators', 'OnlyFans management',
    'IGN', 'Activision Blizzard', 'AppsFlyer', 'AWS gaming',
    'live streaming agency APAC', 'creator economy Australia',
  ],
  openGraph: {
    title: 'About Mobileyes — Joel Kirk | 20 Years in Gaming & Creator Marketing',
    description: 'From IGN and Myspace to AWS and Kick. Joel Kirk built Mobileyes because the talent agency model was broken.',
    url: 'https://mobileyes.live/about',
    type: 'profile',
  },
}

export default function AboutPage() {
  return (
    <div>
      {/* Structured Data — Person + Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            mainEntity: {
              '@type': 'Person',
              name: 'Joel Kirk',
              jobTitle: 'Founder',
              worksFor: {
                '@type': 'Organization',
                name: 'Mobileyes',
                url: 'https://mobileyes.live',
                description: 'Live streaming talent agency — Sydney, Australia',
              },
              knowsAbout: ['Gaming', 'Creator Marketing', 'Live Streaming', 'Influencer Marketing', 'Performance Marketing', 'Mobile Video', 'Attribution'],
              alumniOf: [
                { '@type': 'Organization', name: 'IGN' },
                { '@type': 'Organization', name: 'Myspace' },
                { '@type': 'Organization', name: 'InMobi' },
                { '@type': 'Organization', name: 'King' },
                { '@type': 'Organization', name: 'Activision Blizzard' },
                { '@type': 'Organization', name: 'AppsFlyer' },
                { '@type': 'Organization', name: 'Amazon Web Services (AWS)' },
              ],
              url: 'https://mobileyes.live/about',
              sameAs: [
                'https://www.tiktok.com/@mobileyes.live',
                'https://www.linkedin.com/in/joelamoskirk',
              ],
            },
          }),
        }}
      />
      {/* Hero */}
      <section className="text-white py-32 px-6 relative overflow-hidden" style={{ background: '#0B0F2E' }}>
        <div className="relative max-w-5xl mx-auto">
          <p className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#3B82F6' }}>About Mobileyes</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            20 years of digital campaigns. Now on the creator&apos;s side.
          </h1>
          <p className="text-xl max-w-3xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Two decades running digital campaigns across gaming, media, and performance marketing — from IGN to AWS.
            We saw what was broken in creator representation. Mobileyes is the fix.
          </p>
        </div>
      </section>

      {/* The Problem / Solution */}
      <section className="py-32 px-6" style={{ background: '#0B0F2E' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* The Problem */}
            <div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}>
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">The industry problem</h2>
              <div className="space-y-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <p>
                  Streaming creators get booked poorly, paid late, briefed badly, and measured with meaningless metrics.
                </p>
                <p>
                  Brands send 4-page scripts and wonder why the content feels fake. Agencies take 30% and pay creators in 45–60 days. Creators chase invoices while trying to entertain live audiences.
                </p>
                <p>
                  The result: stressed creators, underperforming campaigns, and brands who think influencer marketing doesn&apos;t work.
                </p>
              </div>
            </div>
            
            {/* The Solution */}
            <div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">The Mobileyes model</h2>
              <div className="space-y-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <p>
                  <strong className="text-white">4-day payment.</strong> Content approved → paid in 4 days. We work directly with platforms and carry the float. No exceptions.
                </p>
                <p>
                  <strong className="text-white">Brief-first, not script-first.</strong> We write the brief. The brief gives the creator the brand truth and lets them translate it into their voice.
                </p>
                <p>
                  <strong className="text-white">Selective matching.</strong> Not every campaign fits every creator. One wrong brand association costs more in audience trust than the fee is worth.
                </p>
                <p>
                  <strong className="text-white">Real analytics.</strong> Full-funnel tracking from impression to engagement to conversion. No vanity metrics. No inflated numbers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Joel — Founder section with photo placeholder */}
      <section className="py-32 px-6" style={{ backgroundColor: '#111633' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Joel's photo */}
            <div className="lg:col-span-2">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative" style={{ backgroundColor: '#1E2A5E' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/joel-kirk.jpg"
                  alt="Joel Kirk — Founder of Mobileyes"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Bio */}
            <div className="lg:col-span-3">
              <p className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: '#3B82F6' }}>Our Team</p>
              <h2 className="text-4xl font-bold text-white mb-6">Joel Kirk</h2>
              <div className="space-y-4 leading-relaxed text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <p>
                  20 years across gaming, media, social networks, and performance marketing. The kind of career where you see the same problems repeat at every level — and eventually decide to fix them yourself.
                </p>
                <p>
                  Started in gaming media and social networking at <strong className="text-white">IGN</strong> and <strong className="text-white">Myspace</strong> in the mid-2000s — before &ldquo;creator economy&rdquo; was a term. Built the global <a href="https://www.inmobi.com/blog/doing-mobile-video-right-vlog-part-3" target="_blank" rel="noopener" className="text-blue-400 hover:underline">&ldquo;Doing Mobile Video Right&rdquo;</a> go-to-market at <strong className="text-white">InMobi</strong> from New York to the world. Contributed to the <a href="https://www.iab.com/guidelines/opt-in-value-exchange-advertising-playbook-for-brands/" target="_blank" rel="noopener" className="text-blue-400 hover:underline">IAB Opt-In Value Exchange Advertising Playbook</a> — the industry standard for rewarded video advertising.
                </p>
                <p>
                  Moved into mobile gaming marketing at <strong className="text-white">King</strong>. Ran influencer and UA campaigns at <strong className="text-white">Activision Blizzard</strong> — including work on <a href="https://www.activisionblizzardmedia.com/insights/blogs/2023/11/iab-uk-gaming-upfronts-2023-recap" target="_blank" rel="noopener" className="text-blue-400 hover:underline">IAB Gaming Upfronts</a> with brands like Nestle and KitKat across Candy Crush, delivering <a href="https://www.iabuk.com/member-content/capturing-focus-driving-results-why-gaming-matters-more-ever" target="_blank" rel="noopener" className="text-blue-400 hover:underline">99% viewability and 100% eyes-on attention</a> — and oversaw marketing through the combination of three of the largest gaming brands in history into one entity.
                </p>
                <p>
                  Built attribution frameworks at <strong className="text-white">AppsFlyer</strong> — including the <a href="https://www.thedrum.com/industryinsights/2022/09/19/how-halfbrick-increased-user-acquisition-98-midst-competitive-gaming" target="_blank" rel="noopener" className="text-blue-400 hover:underline">Halfbrick Studios case study</a> (98% UA growth through efficient media buying and attribution for a gaming brand with over a billion downloads, published in The Drum).
                </p>
                <p>
                  Led gaming partnerships at <strong className="text-white">AWS</strong>: earned 9 figures in gaming revenue. Signed a 4-game contract with Amazon Prime Gaming for an Australian studio. Built mobile campaigns on Amazon Fire devices for streaming platform Kick. Leveraged Twitch infrastructure at AWS to help build Kick alongside its founding team — nobody else did this. Worked directly with Kick leadership at DreamHack, and leveraged AI and data at AWS to deliver a 95% query performance improvement for Easygo (parent company of Kick and Stake) across their global gaming data platform.
                </p>
                <p>
                  At every stage, the same pattern: great creators being underserved by agencies that didn&apos;t understand the content, the audience, or the economics.
                </p>
                <p className="text-white font-medium">
                  Mobileyes is the agency I wished existed when I was booking creators from the brand side. Professional briefs. Fast payment. Real data. Selective representation.
                </p>
              </div>
              
              {/* Career timeline */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { company: 'Fox / Myspace', role: 'Social Media Sales' },
                  { company: 'IGN', role: 'Gaming Media' },
                  { company: 'Fairfax Media', role: 'Digital Advertising' },
                  { company: 'InMobi', role: 'Mobile Video GTM (NY)' },
                  { company: 'King', role: 'Mobile Gaming (NY)' },
                  { company: 'Activision Blizzard', role: 'Marketing & IAB' },
                  { company: 'Fabulate', role: 'Agency Growth' },
                  { company: 'AppsFlyer', role: 'Attribution & Growth' },
                  { company: 'AWS', role: 'Gaming & AI Partnerships' },
                  { company: 'Mobileyes', role: 'Founder' },
                ].map((item) => (
                  <div key={item.company} className="p-4 rounded-xl" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}>
                    <p className="font-semibold text-white text-sm">{item.company}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.role}</p>
                  </div>
                ))}
              </div>

              {/* Career photos */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { src: '/joel-ny.jpg', caption: 'New York — InMobi' },
                  { src: '/joel-king.jpg', caption: 'King — GDC' },
                  { src: '/joel-gdc-aws.jpg', caption: 'GDC — AWS Gaming' },
                  { src: '/joel-gdc-igea.jpg', caption: 'IGEA Australia exhibition at GDC (AWS sponsored)' },
                ].map((photo) => (
                  <div key={photo.src} className="relative rounded-xl overflow-hidden aspect-[4/3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                      <p className="text-[10px] text-white font-medium">{photo.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6" style={{ background: '#0B0F2E' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/joel-kirk.jpg" alt="Joel Kirk" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-white">Joel Kirk</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Founder & Managing Director</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#1E2A5E' }}>
                <span className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>S</span>
              </div>
              <h3 className="font-bold text-white">Sarah</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Operations</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#1E2A5E' }}>
                <span className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>H</span>
              </div>
              <h3 className="font-bold text-white">Heidi</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 text-white" style={{ backgroundColor: '#111633' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16">How we operate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Transparency', desc: 'Creators know their fee upfront. Brands know the commission. No hidden margins, no surprise deductions.' },
              { title: 'Speed', desc: '4-day payment. 24-hour brief response. 48-hour campaign analytics. We move fast because creators and brands both deserve it.' },
              { title: 'Selectivity', desc: 'We say no to campaigns that don\'t fit. Fewer, better campaigns means higher quality content and stronger brand outcomes.' },
              { title: 'Data-driven', desc: 'Every campaign is tracked end-to-end. Reach, engagement, watch time, conversions. Real numbers, not vanity metrics.' },
            ].map((value) => (
              <div key={value.title} className="pl-6" style={{ borderLeft: '2px solid #3B82F6' }}>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: '#0B0F2E' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Want to work with us?</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Whether you are a creator or a brand looking for authentic content partnerships.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/creators" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors">
              Creator Application
            </Link>
            <Link href="/brands" className="px-6 py-3 text-white rounded-xl font-semibold hover:opacity-80 transition-colors" style={{ border: '1px solid #1E2A5E' }}>
              Submit a Brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
