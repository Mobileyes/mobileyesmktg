import Link from 'next/link'

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 opacity-90" />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">About Mobileyes</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Built by someone who sat on both sides of the table.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            20 years in gaming. Every major publisher. Every type of campaign. 
            We started Mobileyes because the model was broken and we knew exactly how to fix it.
          </p>
        </div>
      </section>

      {/* The Problem / Solution */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* The Problem */}
            <div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The industry problem</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Gaming creators get booked poorly, paid late, briefed badly, and measured with meaningless metrics.
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
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The Mobileyes model</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900">4-day payment.</strong> Content approved → paid in 4 days. We work directly with platforms and carry the float. No exceptions.
                </p>
                <p>
                  <strong className="text-slate-900">Brief-first, not script-first.</strong> We write the brief. The brief gives the creator the brand truth and lets them translate it into their voice.
                </p>
                <p>
                  <strong className="text-slate-900">Selective matching.</strong> Not every campaign fits every creator. One wrong brand association costs more in audience trust than the fee is worth.
                </p>
                <p>
                  <strong className="text-slate-900">Real analytics.</strong> Full-funnel tracking from impression to engagement to conversion. No vanity metrics. No inflated numbers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Joel — Founder section with photo placeholder */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Joel's photo */}
            <div className="lg:col-span-2">
              <div className="aspect-[4/5] bg-slate-200 rounded-3xl overflow-hidden relative">
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
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Founder</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Joel Kirk</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  20 years across gaming, media, and performance marketing. The kind of career where you see the same problems repeat at every level — and eventually decide to fix them yourself.
                </p>
                <p>
                  Started in gaming media at IGN. Moved into mobile gaming marketing at King. Ran influencer and UA campaigns at Activision Blizzard. Built attribution frameworks at AppsFlyer. Led gaming partnerships at AWS.
                </p>
                <p>
                  At every stage, the same pattern: great gaming creators being underserved by agencies that didn&apos;t understand the content, the audience, or the economics.
                </p>
                <p>
                  Mobileyes is the agency I wished existed when I was booking creators from the brand side. Professional briefs. Fast payment. Real data. Selective representation.
                </p>
              </div>
              
              {/* Career timeline */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { company: 'IGN', role: 'Gaming Media' },
                  { company: 'King', role: 'Mobile Gaming' },
                  { company: 'Activision Blizzard', role: 'Influencer & UA' },
                  { company: 'AppsFlyer', role: 'Attribution' },
                  { company: 'AWS', role: 'Gaming Partnerships' },
                  { company: 'Mobileyes', role: 'Founder' },
                ].map((item) => (
                  <div key={item.company} className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="font-semibold text-slate-900 text-sm">{item.company}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{item.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team — Sarah & Heidi placeholders */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-400">JK</span>
              </div>
              <h3 className="font-bold text-slate-900">Joel Kirk</h3>
              <p className="text-slate-500 text-sm">Founder & Managing Director</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-400">S</span>
              </div>
              <h3 className="font-bold text-slate-900">Sarah</h3>
              <p className="text-slate-500 text-sm">Operations</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-400">H</span>
              </div>
              <h3 className="font-bold text-slate-900">Heidi</h3>
              <p className="text-slate-500 text-sm">Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16">How we operate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Transparency', desc: 'Creators know their fee upfront. Brands know the commission. No hidden margins, no surprise deductions.' },
              { title: 'Speed', desc: '4-day payment. 24-hour brief response. 48-hour campaign analytics. We move fast because creators and brands both deserve it.' },
              { title: 'Selectivity', desc: 'We say no to campaigns that don\'t fit. Fewer, better campaigns means higher quality content and stronger brand outcomes.' },
              { title: 'Data-driven', desc: 'Every campaign is tracked end-to-end. Reach, engagement, watch time, conversions. Real numbers, not vanity metrics.' },
            ].map((value) => (
              <div key={value.title} className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Want to work with us?</h2>
          <p className="text-slate-600 mb-8">
            Whether you are a gaming creator or a brand looking for authentic content partnerships.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/creators" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
              Creator Application
            </Link>
            <Link href="/brands" className="px-6 py-3 border border-slate-200 text-slate-900 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
              Submit a Brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
