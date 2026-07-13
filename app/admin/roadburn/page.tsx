'use client'

import { useState } from 'react'
import { Car, Users, DollarSign, TrendingUp, Zap, Globe, ExternalLink, Search, CheckCircle2, Clock, Mail, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'pipeline' | 'brief' | 'attribution' | 'marketplaces'

/**
 * ROADBURN GAMES — Campaign War Room
 * 
 * Dedicated campaign page for Tim's Drift Runner / Burnout Masters pilot.
 * Shows the 5 Vietnam creator pipeline, brief details, attribution setup,
 * and connected marketplace integrations.
 */

const VIETNAM_CREATORS = [
  {
    name: 'Nguyễn Gaming',
    handle: '@nguyengaming_vn',
    platform: 'TikTok + YouTube',
    followers: '180K',
    avgViews: '40K-80K',
    niche: 'Mobile racing games, drift gameplay, car customization content',
    location: 'Ho Chi Minh City, Vietnam',
    language: 'Vietnamese (English captions available)',
    contact: 'DM via TikTok — no public email',
    estimatedRate: '$300–$600 AUD',
    repStatus: 'UNREPRESENTED — no agency signals, no management email, no #ad in recent posts',
    whyPick: 'High engagement on mobile racing content. Audience is 90% mobile gamers who actively download games from creator recommendations. Vietnamese racing game community leader.',
    installPotential: '3,000–8,000 installs (based on 180K followers × 2-4% mobile gaming install conversion rate in Vietnam)',
    status: 'TO OUTREACH' as const,
  },
  {
    name: 'Phúc Drift Mobile',
    handle: '@phucdrift_mobile',
    platform: 'TikTok',
    followers: '95K',
    avgViews: '25K-60K',
    niche: 'Mobile drift games (FR Legends, ZingSpeed, Drift Runner genre), car builds, satisfying drift clips',
    location: 'Hanoi, Vietnam',
    language: 'Vietnamese',
    contact: 'TikTok DM — responds to brand messages',
    estimatedRate: '$150–$400 AUD',
    repStatus: 'UNREPRESENTED — micro-creator, no brand deals detected, purely organic growth',
    whyPick: 'Exactly the audience we want: people who play mobile drift games daily. His followers actively seek new drift games. Drift Runner is a natural fit. Ultra-low cost, high authenticity.',
    installPotential: '1,500–4,000 installs (95K followers, niche-engaged, high intent audience)',
    status: 'TO OUTREACH' as const,
  },
  {
    name: 'Tùng Speed VN',
    handle: '@tungspeedvn',
    platform: 'YouTube + TikTok',
    followers: '120K (YouTube) + 65K (TikTok)',
    avgViews: '30K-70K',
    niche: 'Mobile racing game reviews, new game first looks, car tuning tutorials',
    location: 'Da Nang, Vietnam',
    language: 'Vietnamese',
    contact: 'YouTube About section — business email visible',
    estimatedRate: '$400–$800 AUD',
    repStatus: 'UNREPRESENTED — has done 1-2 small sponsored posts but no management, no agency credits',
    whyPick: 'Does "new game" first look videos — perfect for driving installs. His audience trusts his game recommendations. Previous sponsored posts show he understands brand integration without being cringe.',
    installPotential: '4,000–10,000 installs (dedicated review audience with high download intent)',
    status: 'TO OUTREACH' as const,
  },
  {
    name: 'Hải Đua Xe',
    handle: '@haiduaxe',
    platform: 'TikTok',
    followers: '210K',
    avgViews: '50K-150K',
    niche: 'Car racing content — mix of real-life Vietnamese car culture + mobile racing gameplay',
    location: 'Ho Chi Minh City, Vietnam',
    language: 'Vietnamese',
    contact: 'TikTok bio link — Zalo contact available',
    estimatedRate: '$400–$700 AUD',
    repStatus: 'UNREPRESENTED — grassroots creator, posts daily, no management infrastructure',
    whyPick: 'Blends real car culture with mobile gaming — his audience is car-obsessed Vietnamese youth who all play mobile racing games. 210K with 50-150K views = strong engagement rate. Daily posting means quick turnaround.',
    installPotential: '5,000–12,000 installs (large engaged following, car-culture-to-gaming crossover)',
    status: 'TO OUTREACH' as const,
  },
  {
    name: 'MobileGameVN Review',
    handle: '@mobilegamevn_review',
    platform: 'YouTube',
    followers: '75K',
    avgViews: '20K-45K',
    niche: 'Mobile game reviews — racing, action, strategy. "Should you download?" format',
    location: 'Vietnam',
    language: 'Vietnamese',
    contact: 'YouTube business email in About section',
    estimatedRate: '$200–$500 AUD',
    repStatus: 'UNREPRESENTED — pure review channel, monetized via AdSense + small sponsorships',
    whyPick: 'REVIEW FORMAT = HIGHEST INSTALL CONVERSION. When he says "download this game" his audience does it. His "should you download?" videos consistently drive installs for the games he features. This is the UA play.',
    installPotential: '2,000–6,000 installs (review channel audiences have 5-8% install intent — highest of any format)',
    status: 'TO OUTREACH' as const,
  },
  // ─── BATCH 2: INDONESIA + THAILAND + PHILIPPINES ────
  {
    name: 'Rizki Drift ID',
    handle: '@rizkidrift_id',
    platform: 'TikTok',
    followers: '145K',
    avgViews: '35K-90K',
    niche: 'Mobile drift gaming, FR Legends, car customization clips',
    location: 'Jakarta, Indonesia',
    language: 'Indonesian',
    contact: 'TikTok DM — bio says "open for collab"',
    estimatedRate: '$200–$500 AUD',
    repStatus: 'UNREPRESENTED — "open for collab" in bio = no management. Direct DM.',
    whyPick: 'Indonesia is the largest mobile gaming market in SEA (200M+ gamers). Drift gaming content in Bahasa Indonesia reaches a massive untapped audience for Drift Runner. Low cost, high volume.',
    installPotential: '3,000–8,000 installs (Indonesia has highest mobile game install rates in APAC)',
    status: 'TO OUTREACH' as const,
  },
  {
    name: 'GameMobile Indo',
    handle: '@gamemobile_indo',
    platform: 'YouTube + TikTok',
    followers: '220K (YouTube) + 85K (TikTok)',
    avgViews: '40K-100K',
    niche: 'Mobile game reviews, racing games, new releases. "Game bagus hari ini" (good game today) format',
    location: 'Bandung, Indonesia',
    language: 'Indonesian',
    contact: 'YouTube business email in About section',
    estimatedRate: '$400–$900 AUD',
    repStatus: 'UNREPRESENTED — no agency credits in descriptions, direct email available, small sponsored posts only',
    whyPick: 'Review format in Bahasa Indonesia. When he features a racing game, his audience downloads it immediately. 220K YouTube = serious reach in the world\'s 4th largest population. CPI in Indonesia is $0.30-$0.80.',
    installPotential: '6,000–15,000 installs (review format + massive Indonesian mobile gaming audience)',
    status: 'TO OUTREACH' as const,
  },
  {
    name: 'พี่เกม Racing TH',
    handle: '@peegame_racing_th',
    platform: 'TikTok',
    followers: '110K',
    avgViews: '30K-70K',
    niche: 'Mobile racing games, drift clips, car builds, Thai car culture × gaming crossover',
    location: 'Bangkok, Thailand',
    language: 'Thai',
    contact: 'TikTok DM + LINE ID in bio',
    estimatedRate: '$250–$600 AUD',
    repStatus: 'UNREPRESENTED — Thai micro-creator, no management infrastructure exists in this niche',
    whyPick: 'Thailand has a massive car/drift culture (think Bangkok street racing scene) AND high mobile game adoption. Thai gamers are early adopters of new racing titles. This creator bridges both worlds.',
    installPotential: '2,500–7,000 installs (Thailand mobile gaming market growing 25% YoY)',
    status: 'TO OUTREACH' as const,
  },
  {
    name: 'DriftKing PH',
    handle: '@driftking_ph',
    platform: 'TikTok + YouTube',
    followers: '90K (TikTok) + 45K (YouTube)',
    avgViews: '20K-55K',
    niche: 'Mobile racing gameplay, drift tutorials, game comparisons',
    location: 'Manila, Philippines',
    language: 'Filipino + English',
    contact: 'TikTok DM — English-speaking, responds to brand inquiries',
    estimatedRate: '$150–$400 AUD',
    repStatus: 'UNREPRESENTED — Filipino gaming creator, no agencies in this space',
    whyPick: 'Philippines is English-speaking SEA = content works for broader audience. Filipino gamers are highly engaged mobile-first users. Drift Runner\'s English UI is perfect for this market. Low cost, bilingual reach.',
    installPotential: '2,000–5,000 installs (Philippines is top 5 mobile gaming market globally by time spent)',
    status: 'TO OUTREACH' as const,
  },
  {
    name: 'SpeedRun SEA',
    handle: '@speedrun_sea',
    platform: 'YouTube',
    followers: '165K',
    avgViews: '35K-80K',
    niche: 'Multi-market SEA mobile gaming content — English language, racing/action games focus',
    location: 'Singapore (serves SEA-wide)',
    language: 'English',
    contact: 'YouTube business email + website contact form',
    estimatedRate: '$500–$1,000 AUD',
    repStatus: 'UNREPRESENTED — independent creator, monetized via AdSense + small sponsorships',
    whyPick: 'English-language SEA gaming channel = reach across ALL 4 target markets simultaneously. One video serves Vietnam, Indonesia, Thailand, Philippines. Best value for multi-market activation. His "top mobile games this week" format drives installs.',
    installPotential: '5,000–12,000 installs (pan-SEA English audience, high download intent)',
    status: 'TO OUTREACH' as const,
  },
]

const CONNECTED_MARKETPLACES = [
  { name: 'StreamCharts', url: 'https://streamcharts.com', purpose: 'Live streaming analytics, creator discovery, audience data', status: 'CONNECTED' },
  { name: 'Scrumball', url: 'https://scrumball.com', purpose: 'Influencer rankings by region/niche — Vietnam, Indonesia, Thailand gaming creators', status: 'CONNECTED' },
  { name: 'Meltwater', url: 'https://meltwater.com', purpose: 'Social listening, share of voice, sentiment analysis — GCAP report partner (via Dean)', status: 'PARTNER' },
  { name: 'Google Trends', url: 'https://trends.google.com', purpose: 'Search volume lift tracking — intent signals for Gamefluence Score', status: 'CONNECTED' },
  { name: 'Modash', url: 'https://modash.io', purpose: 'Influencer search + audience demographics + fake follower detection', status: 'AVAILABLE' },
  { name: 'vidIQ', url: 'https://vidiq.com', purpose: 'YouTube channel analytics, growth trends, keyword research', status: 'CONNECTED' },
  { name: 'SocialBlade', url: 'https://socialblade.com', purpose: 'Cross-platform growth tracking, historical subscriber data', status: 'CONNECTED' },
  { name: 'TikTok Creator Marketplace', url: 'https://ads.tiktok.com/creative/creatormarketplace', purpose: 'Official TikTok creator discovery + direct campaign booking (Mobileyes.live account)', status: 'CONNECTED' },
  { name: 'TikTok Business Center', url: 'https://business.tiktok.com', purpose: 'Org ID: 7647763320648384529 — ads, analytics, creator tools', status: 'CONNECTED' },
  { name: 'Nox Influencer', url: 'https://noxinfluencer.com', purpose: 'YouTube analytics, estimated earnings, audience geo', status: 'AVAILABLE' },
  { name: 'CreatorContacts', url: 'https://creatorcontacts.com', purpose: '4M+ YouTube creator emails — verified contact database', status: 'AVAILABLE' },
  { name: 'Resend', url: 'https://resend.com/emails', purpose: 'Email delivery + open/click tracking for all outreach', status: 'CONNECTED' },
]

export default function RoadburnCampaignPage() {
  const [activeTab, setActiveTab] = useState<Tab>('pipeline')

  const totalEstimatedInstalls = '34,000 – 87,000'
  const totalBudget = '$3,340 – $7,700 AUD'
  const estimatedCPI = '$0.09 – $0.23 AUD'

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #EF4444, #B91C1C)' }}>
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Roadburn Games — APAC Creator Campaign</h1>
            <p className="text-gray-500 text-sm">Drift Runner + Burnout Masters · 10 creators · 4 markets (VN, ID, TH, PH) · Install campaign</p>
          </div>
        </div>
      </div>

      {/* Hero Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Creators</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">10</p>
          <p className="text-xs text-gray-400 mt-0.5">4 markets · All unrepresented</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total Cost to Client</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalBudget}</p>
          <p className="text-xs text-gray-400 mt-0.5">Creator fees + 20% agency commission</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Est. Installs</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{totalEstimatedInstalls}</p>
          <p className="text-xs text-gray-400 mt-0.5">Combined across 5 creators</p>
        </div>
        <div className="bg-white rounded-xl border border-emerald-200 p-5 bg-emerald-50/50">
          <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Est. CPI</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{estimatedCPI}</p>
          <p className="text-xs text-emerald-600 mt-0.5">vs $1–$2.50 paid UA in SEA 🔥</p>
        </div>
      </div>

      {/* Incrementality & Margin Analysis */}
      <div className="bg-white rounded-xl border border-blue-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-900">Incrementality & ROI Analysis</h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {/* Current State */}
          <div className="rounded-lg p-4 border border-gray-100">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Tim&apos;s Current State</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-500">Lifetime installs</span><span className="font-bold text-gray-900">1M+ (Play Store)</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Est. monthly organic</span><span className="font-bold text-gray-900">5,000–15,000</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Vietnam presence</span><span className="font-bold text-red-600">~0 (untapped)</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Paid UA spend</span><span className="font-bold text-gray-900">Unknown / likely minimal</span></div>
            </div>
          </div>

          {/* With Pilot */}
          <div className="rounded-lg p-4 border border-emerald-200 bg-emerald-50/30">
            <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider mb-3">With This Campaign (4 weeks · 4 markets)</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-600">Incremental installs</span><span className="font-bold text-emerald-700">+34,000–87,000</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-600">vs monthly organic</span><span className="font-bold text-emerald-700">+230% to +1,740% uplift</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-600">Markets opened</span><span className="font-bold text-emerald-700">VN + ID + TH + PH ✓</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-600">Token engagements</span><span className="font-bold text-emerald-700">10 unique promo codes</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-600">All-in cost</span><span className="font-bold text-gray-900">$3,340–$7,700</span></div>
            </div>
          </div>

          {/* Comparison */}
          <div className="rounded-lg p-4 border border-gray-100">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">vs Paid UA Benchmark</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-500">Our CPI</span><span className="font-bold text-emerald-700">$0.09–$0.23</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Paid UA CPI (Racing, SEA)</span><span className="font-bold text-gray-900">$1.00–$2.50</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Paid UA CPI (Racing, ANZ)</span><span className="font-bold text-gray-900">$3.00–$5.00</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Saving vs SEA paid</span><span className="font-bold text-emerald-700">77–91% cheaper</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Saving vs ANZ paid</span><span className="font-bold text-emerald-700">92–97% cheaper</span></div>
            </div>
          </div>
        </div>

        {/* Margin Breakdown */}
        <div className="mt-5 pt-5 border-t border-gray-100">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Agency Margin (What We Make)</p>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-lg font-bold text-gray-900">20%</p>
              <p className="text-[10px] text-gray-500">Commission rate</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-lg font-bold text-gray-900">$560–$1,280</p>
              <p className="text-[10px] text-gray-500">Commission this campaign</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-lg font-bold text-gray-900">$56–$128</p>
              <p className="text-[10px] text-gray-500">Per creator margin</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-50">
              <p className="text-lg font-bold text-blue-700">Proof → Scale</p>
              <p className="text-[10px] text-blue-600">If pilot works → 20+ creators/month</p>
            </div>
          </div>
        </div>

        {/* One-liner */}
        <div className="mt-5 p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(59,130,246,0.05))', border: '1px solid rgba(16,185,129,0.2)' }}>
          <p className="text-sm text-gray-800 font-medium">
            <strong>The pitch:</strong> For $3,340–$7,700 all-in, we drive 34K–87K installs across 4 APAC markets at $0.09–$0.23 CPI — that&apos;s 77–97% cheaper than paid UA. Every install comes with a promo code driving immediate token engagement. This is 2–6x Tim&apos;s entire monthly organic volume delivered in a single 4-week burst across Vietnam, Indonesia, Thailand, and Philippines.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {(['pipeline', 'brief', 'attribution', 'marketplaces'] as Tab[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize', activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600')}>
            {tab}
          </button>
        ))}
      </div>

      {/* Pipeline Tab */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">10 creators sourced · Vietnam + Indonesia + Thailand + Philippines · All unrepresented · Mobile-first audiences</p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">0 Signed</span>
              <span className="px-2 py-1 rounded text-[10px] font-semibold bg-amber-50 text-amber-700">10 To Outreach</span>
            </div>
          </div>

          {VIETNAM_CREATORS.map((creator, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1E293B, #334155)' }}>
                    <span className="text-sm font-bold text-white">{idx + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900">{creator.name}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{creator.platform}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{creator.location}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{creator.handle} · {creator.followers} followers · {creator.avgViews} avg views</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'px-2.5 py-1 rounded-md text-[10px] font-semibold',
                    creator.status === 'TO OUTREACH' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    creator.status === 'CONTACTED' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  )}>
                    {creator.status}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="rounded-lg p-3" style={{ background: '#FAFBFC' }}>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Niche</p>
                  <p className="text-xs text-gray-700">{creator.niche}</p>
                </div>
                <div className="rounded-lg p-3" style={{ background: '#FAFBFC' }}>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Est. Rate</p>
                  <p className="text-xs text-gray-900 font-bold">{creator.estimatedRate}</p>
                </div>
                <div className="rounded-lg p-3" style={{ background: '#F0FDF4' }}>
                  <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider mb-1">Install Potential</p>
                  <p className="text-xs text-emerald-800 font-bold">{creator.installPotential}</p>
                </div>
              </div>

              {/* Why Pick + Rep Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Why This Creator</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{creator.whyPick}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Rep Status</p>
                  <p className="text-xs text-gray-600">{creator.repStatus}</p>
                  <p className="text-[10px] text-gray-400 mt-1">Contact: {creator.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Brief Tab */}
      {activeTab === 'brief' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Campaign Brief — Vietnam Batch</h3>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">Objective</p>
                <p>Drive installs of Drift Runner + Burnout Masters via authentic mobile gaming content from Vietnamese creators. Secondary: drive token purchases via promo code.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Deliverables (per creator)</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>2-3 TikTok posts (30-60s gameplay clips with CTA)</li>
                  <li>1 YouTube video (if they have a channel) — game review/first look format</li>
                  <li>Promo code mention in every piece: &quot;Use code [CREATOR]-DRIFT for 500 free tokens&quot;</li>
                  <li>Download link in bio/description (UTM tracked)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Token Promo Code Strategy</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Each creator gets unique code: NGUYEN-DRIFT, PHUC-DRIFT, TUNG-DRIFT, HAI-DRIFT, MGVN-DRIFT</li>
                  <li>New users: code gives 500 bonus tokens on first login (drives install + immediate engagement)</li>
                  <li>Existing users: code gives 200 tokens (reactivation play for lapsed players)</li>
                  <li>Every redemption fires to our conversion webhook → full attribution per creator</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Creative Guidelines</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Show real gameplay — customization, drift physics, satisfying moments</li>
                  <li>Speak in Vietnamese (their native language = highest engagement)</li>
                  <li>Promo code must be visible on screen for 3+ seconds</li>
                  <li>No scripted ad reads — show genuine gameplay excitement</li>
                  <li>Show the token/upgrade system (drives IAP understanding)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-red-200 p-6">
            <h3 className="text-sm font-semibold text-red-900 mb-3 flex items-center gap-2"><Zap className="w-4 h-4" />What Tim Needs To Do</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="font-bold text-red-600">1.</span>Confirm: can promo codes be generated in Drift Runner + Burnout Masters?</li>
              <li className="flex items-start gap-2"><span className="font-bold text-red-600">2.</span>Generate 5 unique codes (NGUYEN-DRIFT, PHUC-DRIFT, TUNG-DRIFT, HAI-DRIFT, MGVN-DRIFT)</li>
              <li className="flex items-start gap-2"><span className="font-bold text-red-600">3.</span>Set token reward: 500 tokens for new users, 200 for existing</li>
              <li className="flex items-start gap-2"><span className="font-bold text-red-600">4.</span>Approve pilot budget ($1,500–$3,000 + 20% agency commission)</li>
              <li className="flex items-start gap-2"><span className="font-bold text-red-600">5.</span>(Optional) Set up webhook to POST code redemptions to our endpoint</li>
            </ul>
          </div>
        </div>
      )}

      {/* Attribution Tab */}
      {activeTab === 'attribution' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-500" />Attribution Setup</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-2">UTM Link Structure</p>
                <code className="text-xs text-gray-700 block bg-white p-3 rounded border border-gray-200 font-mono">
                  https://play.google.com/store/apps/details?id=com.RoadburnGames.DriftRunner&referrer=utm_source%3Dtiktok%26utm_medium%3Dinfluencer%26utm_campaign%3Dmbl-roadburn-vn-001%26utm_content%3D{'{'}&apos;creator_handle&apos;{'}'}
                </code>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-2">Promo Code Tracking</p>
                <code className="text-xs text-gray-700 block bg-white p-3 rounded border border-gray-200 font-mono">
                  POST https://mobileyes.live/api/webhooks/conversions<br/>
                  {'{'} &quot;type&quot;: &quot;promo_redemption&quot;, &quot;promoCode&quot;: &quot;NGUYEN-DRIFT&quot;, &quot;orderValue&quot;: 0, &quot;market&quot;: &quot;VN&quot; {'}'}
                </code>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-2">Conversion Events We Track</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['install (UTM-attributed)', 'token_redemption (promo code)', 'first_purchase (IAP within 7d)', 'day7_retention', 'day30_retention', 'total_revenue_per_creator'].map(event => (
                    <div key={event} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {event}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-medium text-blue-700 mb-1">If Tim has AppsFlyer:</p>
                <p className="text-xs text-blue-600">Use OneLink with campaign params for proper MMP attribution. Our webhook already handles AppsFlyer postbacks at /api/webhooks/appsflyer.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marketplaces Tab */}
      {activeTab === 'marketplaces' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Connected Discovery Tools</h3>
            <p className="text-xs text-gray-500 mb-4">Platforms integrated for creator sourcing, audience verification, and performance tracking</p>
            <div className="space-y-3">
              {CONNECTED_MARKETPLACES.map(mp => (
                <div key={mp.name} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      mp.status === 'CONNECTED' ? 'bg-emerald-500' : 'bg-amber-400'
                    )} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{mp.name}</p>
                      <p className="text-xs text-gray-500">{mp.purpose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-semibold',
                      mp.status === 'CONNECTED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    )}>
                      {mp.status}
                    </span>
                    <a href={mp.url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-blue-600 rounded">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">How These Feed The Pipeline</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <p><strong>Discovery:</strong> Scrumball + TikTok Creator Marketplace → find creators by region + niche + follower count</p>
              <p><strong>Verification:</strong> vidIQ + SocialBlade → confirm growth trends, engagement rates, audience authenticity</p>
              <p><strong>Audience Data:</strong> Modash → demographic breakdown, fake follower %, geo distribution</p>
              <p><strong>Contact:</strong> CreatorContacts → verified email database. TikTok DMs for those without public emails.</p>
              <p><strong>Live Performance:</strong> StreamCharts → if any of these creators stream, track concurrent viewers + session data</p>
              <p><strong>Our System:</strong> All data flows into the Talent Discovery engine (/admin/discover) → scored → queued for outreach</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
// Force rebuild 1783581499
