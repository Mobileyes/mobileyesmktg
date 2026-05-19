import Link from 'next/link'
import { notFound } from 'next/navigation'

// Article content database
const articles: Record<string, { title: string; date: string; category: string; content: string }> = {
  'attention-economy-streaming-creators-trusted-communities': {
    title: 'The Attention Economy Has Shifted — Streaming Creators Are Building Trusted Communities With High-Retention Audiences',
    date: '2026-05-19',
    category: 'Industry',
    content: `
The influencer marketing industry has a trust problem. Brands are spending more than ever on creator partnerships, but the metrics they are measuring — follower counts, impressions, CPMs — tell them almost nothing about whether the campaign actually worked.

Meanwhile, a different kind of creator is quietly building something far more valuable: trusted communities with high-retention audiences who show up consistently, engage authentically, and act on recommendations because they trust the person making them.

These are live streaming creators. And they are the most undervalued channel in performance marketing today.

## Attention is the new impression

An impression means someone's screen displayed your ad. It tells you nothing about whether they noticed, cared, or remembered. A TikTok view counts at 1 second. A YouTube pre-roll counts at 30 seconds or a click. These are not attention metrics — they are delivery confirmations.

A live stream viewer who watches for 45 minutes is giving you something fundamentally different. They are choosing to be there. They are engaged in real-time chat. They are part of a community that returns daily or weekly. When that creator mentions a product, it lands differently than a scripted integration in a 60-second video.

This is not theory. The data from our first campaigns at Mobileyes shows:

- **Average watch time of 24+ minutes** for sponsored stream segments (vs 8 seconds for paid social)
- **Engagement rates of 6–12%** in live chat during brand moments (vs 1–3% on static posts)
- **Click-through rates 3–5x higher** when creators use limited codes vs standard UTM links
- **Retention audiences** — viewers who return to the same creator weekly — convert at 2x the rate of new viewers

## Community trust drives performance attribution

The old model: brand pays creator → creator posts content → brand measures impressions → brand declares success or failure based on CPM.

The Mobileyes model: brand partners with creator → creator integrates brand into their community context → audience engages because they trust the creator → limited codes drive trackable performance → brand sees real attribution from awareness through to conversion.

The difference is trust. A streaming creator who has built a community over months or years has earned something that no amount of paid media can buy: the benefit of the doubt. When they recommend something, their audience listens — not because of production quality or scripting, but because of relationship.

## Limited codes: the bridge between awareness and attribution

One of the most effective mechanisms we deploy at Mobileyes is the limited code model. Instead of generic discount codes that leak across the internet, we work with brands to create:

- **Time-limited codes** that are only active during the stream window
- **Creator-specific codes** that attribute directly to the individual
- **Tiered codes** that reward the community (first 100 uses get a better deal)

This creates urgency, rewards the live audience, and gives brands clean attribution data. We can tell you exactly how many conversions came from a specific creator's stream, at what time, and what the cost per acquisition was.

For brands focused on performance — UA managers, growth teams, CMOs with ROAS targets — this is the missing piece. Influencer marketing that actually shows up in your attribution model.

## ANZ and APAC: the opportunity

The APAC gaming creator market is growing faster than any other region. In Australia and New Zealand, brands are still underinvesting in creator partnerships relative to the audience size and engagement levels available.

In Vietnam, Thailand, and Indonesia, live commerce through gaming creators is already a proven channel. The playbook exists — it just hasn't been properly adapted for ANZ brands yet.

Mobileyes operates across both markets. We represent creators in Australia and APAC, and we work with brands who want to reach gaming audiences authentically across the region. The combination of ANZ brand budgets and APAC creator reach is where the next wave of growth sits.

## The fake influence problem

Let's be direct: a significant portion of the influencer marketing industry is built on inflated numbers. Bought followers. Bot engagement. Fake view counts. Agencies that don't audit their rosters because the numbers look better unaudited.

Live streaming is inherently resistant to this. You cannot fake 500 concurrent viewers having a real-time conversation in chat. You cannot bot a 45-minute average watch time. You cannot inflate engagement when the engagement is visible, live, and timestamped.

This is why we focus on streaming creators. The metrics are real because the audience is real. And real audiences drive real results for brands.

## What this means for brands

If you are a brand or agency evaluating gaming creator partnerships in 2026, here is what we recommend:

1. **Prioritise retention over reach.** A creator with 20,000 loyal viewers who return weekly is more valuable than one with 500,000 followers who get 2% engagement.

2. **Invest in live formats.** Sponsored streams, live commerce integrations, and real-time community moments outperform scripted video integrations for both awareness and conversion.

3. **Demand real attribution.** Limited codes, tracked links, and post-campaign analytics should be standard. If your agency cannot provide this, they are not measuring what matters.

4. **Think APAC.** The gaming audience in Vietnam, Thailand, and Indonesia is massive, engaged, and underserved by quality brand partnerships. First-mover advantage is real.

5. **Pay creators fast.** This is not altruism — it is performance optimisation. Creators who are not stressed about payment produce better content. 4-day payment is our standard because it directly improves campaign outcomes.

## The Mobileyes position

We built Mobileyes specifically for this moment. The convergence of:

- Live streaming becoming the dominant gaming content format
- Brands demanding real attribution from influencer spend
- Audiences rejecting fake influence and rewarding authenticity
- APAC gaming markets reaching critical mass for brand investment

Our roster is curated. Our briefs are written for the creator's voice, not the brand's script. Our analytics track the full funnel. And our creators get paid in 4 days because that is what professional representation looks like.

If you are a brand looking to reach gaming audiences authentically — or a creator looking for representation that actually works — we should talk.

---

*Joel Kirk is the founder of Mobileyes, a live video gaming talent agency based in Sydney, Australia. Previously at IGN, King, Activision Blizzard, AppsFlyer, and AWS.*
    `,
  },
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    notFound()
  }

  return (
    <div>
      {/* Article Header */}
      <section className="bg-slate-950 text-white py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
            Back to News
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">
              {article.category}
            </span>
            <time className="text-sm text-slate-400">
              {new Date(article.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-slate-900
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-p:text-slate-700 prose-p:leading-relaxed
            prose-li:text-slate-700
            prose-strong:text-slate-900
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          ">
            {article.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i}>{line.replace('## ', '')}</h2>
              }
              if (line.startsWith('- **')) {
                const match = line.match(/- \*\*(.+?)\*\*(.*)/)
                if (match) {
                  return (
                    <div key={i} className="flex items-start gap-3 my-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                      <p className="text-slate-700"><strong className="text-slate-900">{match[1]}</strong>{match[2]}</p>
                    </div>
                  )
                }
              }
              if (line.startsWith('---')) {
                return <hr key={i} className="my-12 border-slate-200" />
              }
              if (line.trim() === '') return null
              if (line.startsWith('*') && line.endsWith('*')) {
                return <p key={i} className="text-slate-500 italic text-base">{line.replace(/\*/g, '')}</p>
              }
              // Numbered list items
              if (/^\d+\./.test(line.trim())) {
                const match = line.match(/^\d+\.\s+\*\*(.+?)\*\*(.*)/)
                if (match) {
                  return (
                    <div key={i} className="flex items-start gap-3 my-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">{line.match(/^(\d+)/)?.[1]}</span>
                      </div>
                      <p className="text-slate-700"><strong className="text-slate-900">{match[1]}</strong>{match[2]}</p>
                    </div>
                  )
                }
              }
              return <p key={i}>{line}</p>
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Want to work with Mobileyes?</h3>
            <p className="text-slate-600 mb-6">Whether you are a creator or a brand — let&apos;s talk.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/creators" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors">
                Creator Application
              </Link>
              <Link href="/brands" className="px-6 py-3 border border-slate-200 text-slate-900 rounded-xl font-semibold hover:bg-white transition-colors">
                Submit a Brief
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
