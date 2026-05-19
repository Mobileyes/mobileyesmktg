import Link from 'next/link'

const articles = [
  {
    slug: 'attention-economy-streaming-creators-trusted-communities',
    title: 'The Attention Economy Has Shifted — Streaming Creators Are Building Trusted Communities With High-Retention Audiences',
    excerpt: 'In a market saturated with fake influence and bot-driven metrics, live streaming creators are emerging as the most authentic channel for brand growth. Here is why attention, retention, and community trust are the new performance metrics.',
    date: '2026-05-19',
    category: 'Industry',
    featured: true,
  },
  {
    slug: 'mobileyes-launch',
    title: 'Mobileyes Launches — A New Model for Gaming Creator Representation in ANZ and APAC',
    excerpt: 'After 20 years across IGN, King, Activision Blizzard, AppsFlyer, and AWS, Joel Kirk launches Mobileyes to fix the three things that matter most in creator representation: brief quality, payment speed, and campaign-creator match.',
    date: '2026-05-19',
    category: 'Company',
    featured: false,
  },
  {
    slug: 'apac-gaming-creator-market-2026',
    title: 'APAC Gaming Creator Market 2026 — What ANZ Brands Need to Know About Vietnam, Thailand, and Indonesia',
    excerpt: 'The APAC gaming creator market is growing faster than any other region. Vietnamese creators dominate TikTok gaming. Thai streamers are pioneering live commerce. Here is what Australian and New Zealand brands should understand.',
    date: '2026-05-26',
    category: 'Market Intelligence',
    featured: false,
  },
  {
    slug: '4-day-payment-why-it-matters',
    title: 'Why 4-Day Payment Changes Everything for Gaming Creators and Campaign Quality',
    excerpt: 'The industry standard is 30–60 days. We pay in 4. Here is why faster payment directly correlates with better content quality, higher engagement, and stronger brand outcomes.',
    date: '2026-06-02',
    category: 'Creator Economy',
    featured: false,
  },
  {
    slug: 'youtube-gaming-brand-partnerships-2026',
    title: 'YouTube Gaming in 2026 — Why Long-Form Creator Partnerships Outperform Paid Media for Awareness and Affinity',
    excerpt: 'YouTube gaming creators deliver something paid media cannot: sustained attention, genuine community trust, and audience retention that drives real brand affinity. The data from our first campaigns proves it.',
    date: '2026-06-09',
    category: 'Platform Strategy',
    featured: false,
  },
]

export default function NewsPage() {
  const featured = articles.find((a) => a.featured)
  const rest = articles.filter((a) => !a.featured)

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">News & Insights</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Industry intelligence from the inside.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Creator economy insights, APAC market intelligence, and platform strategy — from someone who has been in the room for 20 years.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16 px-6 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto">
            <Link href={`/news/${featured.slug}`} className="group block">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-10 border border-slate-200 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(featured.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight mb-4">
                  {featured.title}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 mt-6 text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                  Read article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Article List */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-0 divide-y divide-slate-100">
            {rest.map((article) => (
              <article key={article.slug} className="py-8 first:pt-0 last:pb-0">
                <Link href={`/news/${article.slug}`} className="group block">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                      {article.category}
                    </span>
                    <time className="text-xs text-slate-400">
                      {new Date(article.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">{article.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
