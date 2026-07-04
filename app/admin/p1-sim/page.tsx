'use client'

import { useState } from 'react'
import { Car, Users, DollarSign, Link2, BarChart3, Target, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'overview' | 'brands' | 'creators' | 'attribution' | 'strategy'

const SIM_RACING_BRANDS = [
  { name: 'P1 Sim Rigs', type: 'Hardware (Rigs/Cockpits)', spend: '$500K-$2M', status: 'ACTIVE - Neil Connection', platforms: ['YouTube', 'Twitch'], opportunity: 'Direct relationship via Neil. Influencer identified. Need to set up management + UTM/promo code attribution for their Shopify store.', priority: 'IMMEDIATE', website: 'https://p1simrigs.com' },
  { name: 'Fanatec / Endor AG', type: 'Hardware (Wheels/Pedals)', spend: '$2M-$5M', status: 'TARGET', platforms: ['YouTube', 'Twitch'], opportunity: 'Premium sim racing hardware. Same creator pool as P1. Pitch as package deal.', priority: 'HIGH', website: 'https://fanatec.com' },
  { name: 'Thrustmaster', type: 'Hardware (Wheels/Pedals)', spend: '$2M-$4M', status: 'TARGET', platforms: ['YouTube', 'Twitch'], opportunity: 'Mid-range sim hardware. Broader audience than Fanatec. Good for mid-tier creators.', priority: 'HIGH', website: 'https://thrustmaster.com' },
  { name: 'Logitech G (Racing)', type: 'Hardware (Wheels/Pedals)', spend: '$3M+ (racing segment)', status: 'TARGET', platforms: ['YouTube', 'Twitch', 'TikTok'], opportunity: 'Entry-level sim racing. G29/G923 are gateway products. Massive audience.', priority: 'MEDIUM', website: 'https://logitechg.com' },
  { name: 'iRacing', type: 'Software (Sim Platform)', spend: '$1M-$3M', status: 'TARGET', platforms: ['YouTube', 'Twitch'], opportunity: 'Premium sim racing platform. Esports angle. Season launches = campaign windows.', priority: 'HIGH', website: 'https://iracing.com' },
  { name: 'Assetto Corsa / Kunos', type: 'Software (Sim Platform)', spend: '$500K-$1M', status: 'TARGET', platforms: ['YouTube'], opportunity: 'Assetto Corsa EVO launch = massive campaign window. Sim racing content growing fast.', priority: 'MEDIUM', website: 'https://assettocorsa.gg' },
  { name: 'rFactor / Studio 397', type: 'Software (Sim Platform)', spend: '$300K-$800K', status: 'TARGET', platforms: ['YouTube'], opportunity: 'Hardcore sim audience. Smaller but dedicated. Good for niche creators.', priority: 'LOW', website: 'https://rfactor.net' },
  { name: 'Gran Turismo / Polyphony', type: 'Software (Console Sim)', spend: '$5M+', status: 'TARGET', platforms: ['YouTube', 'TikTok'], opportunity: 'PlayStation exclusive. Massive audience. GT7 updates = campaign windows.', priority: 'HIGH', website: 'https://gran-turismo.com' },
  { name: 'Forza / Turn 10', type: 'Software (Console Sim)', spend: '$5M+', status: 'TARGET', platforms: ['YouTube', 'Twitch'], opportunity: 'Xbox/PC. Forza Motorsport + Horizon. Broader racing audience.', priority: 'HIGH', website: 'https://forza.net' },
  { name: 'Simucube', type: 'Hardware (Direct Drive)', spend: '$500K-$1M', status: 'TARGET', platforms: ['YouTube'], opportunity: 'Ultra-premium direct drive wheels. Small but high-value audience.', priority: 'LOW', website: 'https://simucube.com' },
  { name: 'Moza Racing', type: 'Hardware (Wheels/Bases)', spend: '$1M-$3M', status: 'TARGET', platforms: ['YouTube', 'TikTok'], opportunity: 'Fast-growing Chinese brand disrupting Fanatec. Aggressive marketing spend.', priority: 'HIGH', website: 'https://mozaracing.com' },
  { name: 'Next Level Racing', type: 'Hardware (Rigs/Cockpits)', spend: '$500K-$1M', status: 'TARGET', platforms: ['YouTube'], opportunity: 'Direct competitor to P1. Could pitch our creators to both. ANZ brand.', priority: 'MEDIUM', website: 'https://nextlevelracing.com' },
  { name: 'Trak Racer', type: 'Hardware (Rigs/Cockpits)', spend: '$300K-$800K', status: 'TARGET', platforms: ['YouTube'], opportunity: 'Australian sim racing brand. Local connection. Accessible marketing team.', priority: 'MEDIUM', website: 'https://trakracer.com' },
  { name: 'Playseat', type: 'Hardware (Rigs/Cockpits)', spend: '$500K-$1M', status: 'TARGET', platforms: ['YouTube'], opportunity: 'Entry-level rigs. Broader audience. Good for lifestyle/casual racing content.', priority: 'LOW', website: 'https://playseat.com' },
  { name: 'Simagic', type: 'Hardware (Direct Drive)', spend: '$500K-$1M', status: 'TARGET', platforms: ['YouTube'], opportunity: 'Mid-premium direct drive. Growing fast. Chinese brand with global push.', priority: 'MEDIUM', website: 'https://simagic.com' },
]

const SIM_RACING_CREATORS = [
  { name: 'JacobTaborOz', platform: 'YouTube', followers: 'Growing', niche: 'Flight Sim (DCS) / Military Aviation', note: '🟢 SIGNED — Pilot campaign active. 11yr Air Force avionics tech. Authentic expert content. Port Stephens NSW. Non-exclusive, 20% commission. Affiliate model. Rig rundown video in production with P1.' },
  { name: 'Jimmy Broadbent', platform: 'YouTube', followers: '850K', niche: 'Sim Racing / Comedy', note: 'UK-based. Biggest sim racing YouTuber. Would be a dream signing.' },
  { name: 'Boosted Media', platform: 'YouTube', followers: '280K', niche: 'Sim Racing Hardware Reviews', note: 'Australian! Hardware review focused. Perfect for P1/Fanatec campaigns.' },
  { name: 'Dan Suzuki', platform: 'YouTube', followers: '200K', niche: 'Sim Racing / F1', note: 'F1 + sim racing crossover. Good for broader racing audience.' },
  { name: 'Dave Cam', platform: 'YouTube/Twitch', followers: '150K', niche: 'iRacing / Competitive', note: 'iRacing focused. Competitive sim racing. Good for esports angle.' },
  { name: 'Ermin Hamidovic', platform: 'YouTube', followers: '120K', niche: 'Sim Racing Tech', note: 'Technical deep-dives. Perfect for hardware brands wanting detailed reviews.' },
  { name: 'SimRacing604', platform: 'YouTube', followers: '90K', niche: 'Sim Racing Builds', note: 'Rig builds and setup content. Perfect for P1/Next Level Racing.' },
  { name: 'Karl Gosling', platform: 'YouTube', followers: '60K', niche: 'Sim Racing / Aussie', note: 'Australian sim racer. Local talent for ANZ campaigns.' },
]

export default function P1SimDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <Car className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">P1 Sim Racing Vertical</h1>
            <p className="text-gray-500 mt-0.5">Neil&apos;s sim racing opportunity — dedicated pipeline</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500">Sim Racing Market</p>
          <p className="text-xl font-bold text-gray-900 mt-1">$2.1B</p>
          <p className="text-xs text-green-600">+32% YoY (hardware + software)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500">Target Brands</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{SIM_RACING_BRANDS.length}</p>
          <p className="text-xs text-gray-400">Hardware + Software</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500">Creator Pool</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{SIM_RACING_CREATORS.length}</p>
          <p className="text-xs text-gray-400">Identified sim racing creators</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500">Attribution</p>
          <p className="text-xl font-bold text-gray-900 mt-1">UTM + Promo</p>
          <p className="text-xs text-gray-400">E-commerce tracking (no AppsFlyer needed)</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {(['overview', 'brands', 'creators', 'attribution', 'strategy'] as Tab[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize', activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600')}>
            {tab}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-red-200 p-6">
            <h3 className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-2"><Zap className="w-4 h-4" />Immediate Action — P1 Sim Rigs</h3>
            <p className="text-sm text-gray-700 mb-3">Neil has a direct connection to P1. JacobTaborOz (flight sim / DCS) is signed — pilot campaign in motion.</p>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="font-bold text-green-600 mt-0.5">✓</span>Creator identified &amp; signed: JacobTaborOz (DCS / flight sim, YouTube)</li>
              <li className="flex items-start gap-2"><span className="font-bold text-green-600 mt-0.5">✓</span>Agreement: Non-exclusive, 20% commission, affiliate model</li>
              <li className="flex items-start gap-2"><span className="font-bold text-red-600 mt-0.5">3.</span>Brief Neil: Confirm rig spec (flight sim configuration) for Jacob</li>
              <li className="flex items-start gap-2"><span className="font-bold text-red-600 mt-0.5">4.</span>P1 creates promo code JACOB-P1 in Shopify</li>
              <li className="flex items-start gap-2"><span className="font-bold text-red-600 mt-0.5">5.</span>Set up conversion webhook from P1&apos;s store → our platform</li>
              <li className="flex items-start gap-2"><span className="font-bold text-red-600 mt-0.5">6.</span>Ship rig to Jacob (Port Stephens, NSW) — he records at own pace</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Why Sim Racing is a Gold Mine</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-600">• Market growing 32% YoY — faster than general gaming</p>
                <p className="text-gray-600">• High-value products ($500-$10,000) = high commission potential</p>
                <p className="text-gray-600">• Underserved by agencies — no one specialises in this</p>
                <p className="text-gray-600">• Loyal, engaged audience — high conversion rates</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">• Multiple revenue streams: hardware, software, esports</p>
                <p className="text-gray-600">• Cross-sell opportunity: rig → wheel → pedals → monitor</p>
                <p className="text-gray-600">• F1 popularity driving mainstream interest</p>
                <p className="text-gray-600">• ANZ brands (Trak Racer, Next Level Racing) = local advantage</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brands */}
      {activeTab === 'brands' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Brand</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Est. Spend</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Priority</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Opportunity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SIM_RACING_BRANDS.map((brand) => (
                <tr key={brand.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                    <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline">{brand.website}</a>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{brand.type}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-700">{brand.spend}</td>
                  <td className="px-4 py-3"><span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', brand.status.includes('ACTIVE') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600')}>{brand.status}</span></td>
                  <td className="px-4 py-3"><span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', brand.priority === 'IMMEDIATE' ? 'bg-red-100 text-red-700' : brand.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' : brand.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600')}>{brand.priority}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-xs">{brand.opportunity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Creators */}
      {activeTab === 'creators' && (
        <div className="space-y-3">
          {SIM_RACING_CREATORS.map((creator) => (
            <div key={creator.name} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{creator.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{creator.platform} · {creator.followers} · {creator.niche}</p>
                <p className="text-xs text-gray-400 mt-1">{creator.note}</p>
              </div>
              <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800">Research</button>
            </div>
          ))}
        </div>
      )}

      {/* Attribution */}
      {activeTab === 'attribution' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2"><Link2 className="w-4 h-4 text-blue-500" />Attribution Setup for P1 (E-commerce)</h3>
            <p className="text-sm text-gray-600 mb-4">Since P1 sells physical products via Shopify/e-commerce (not app installs), we use UTM links + promo codes. No AppsFlyer needed.</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-2">UTM Link Structure</p>
                <code className="text-xs text-gray-700 block bg-white p-3 rounded border border-gray-200">
                  https://p1simrigs.com/?utm_source=youtube&utm_medium=influencer&utm_campaign=mbl-camp-XXXXX&utm_content=CREATOR_HANDLE
                </code>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-2">Promo Code Format</p>
                <code className="text-xs text-gray-700 block bg-white p-3 rounded border border-gray-200">
                  CREATOR-P1 (e.g. JIMMY-P1, BOOSTED-P1)
                </code>
                <p className="text-xs text-gray-400 mt-2">Time-limited, creator-specific. P1 configures in Shopify, we track redemptions.</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-2">Conversion Webhook</p>
                <code className="text-xs text-gray-700 block bg-white p-3 rounded border border-gray-200">
                  POST https://mobileyes.live/api/webhooks/conversions
                </code>
                <p className="text-xs text-gray-400 mt-2">P1 sends order data when promo code is used. We attribute to creator automatically.</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-medium text-blue-700 mb-1">What P1 needs to do:</p>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• Add GA4 or Shopify analytics (to track UTM conversions)</li>
                  <li>• Create promo codes in Shopify for each creator</li>
                  <li>• (Optional) Set up Shopify webhook to POST to our conversions endpoint</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Strategy */}
      {activeTab === 'strategy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Sim Racing Go-to-Market Strategy</h3>
            <div className="space-y-4">
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Phase 1: P1 Proof of Concept (Now)</p>
                <p className="text-xs text-gray-500 mt-1">Land P1 via Neil. Set up one creator. Prove attribution works. Generate case study.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Phase 2: Expand Creator Pool (Month 2-3)</p>
                <p className="text-xs text-gray-500 mt-1">Sign 3-5 sim racing creators. Offer P1 a multi-creator campaign. Approach Moza Racing + Fanatec.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Phase 3: Vertical Dominance (Month 4-6)</p>
                <p className="text-xs text-gray-500 mt-1">Become THE sim racing influencer agency. Pitch to all 15 brands. Cross-sell hardware + software campaigns.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Phase 4: Esports Integration (Month 6+)</p>
                <p className="text-xs text-gray-500 mt-1">iRacing esports, Gran Turismo championships. Position creators for tournament coverage + sponsorships.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Neil Action Items</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>☐ Confirm the rig spec — flight sim optimized configuration for Jacob (DCS / HOTAS / MFDs)</li>
              <li>☐ Confirm shipping details to Port Stephens, NSW</li>
              <li>☐ Create promo code JACOB-P1 in P1 Shopify</li>
              <li>☐ (Optional) Set up Shopify webhook to POST conversions to our endpoint</li>
              <li>☐ Discuss if Neil wants a referral cut or just the P1 sales uplift</li>
              <li>☐ Confirm content schedule expectations (Jacob produces 1 video per 1-2 months)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
