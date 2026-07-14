'use client'

import { ExternalLink, Handshake, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const PARTNERS = [
  {
    name: 'Fabulate (Nathan & Lisa)',
    type: 'Creator Pipeline',
    status: 'ACTIVE',
    value: 'Sends us unrepresented creator leads. 17 outreached this batch. Source of lifestyle/fashion/beauty/UGC talent.',
    website: null,
    action: '/admin/fabulate',
    actionLabel: 'View Pipeline',
  },
  {
    name: 'Meltwater (Dean)',
    type: 'Data & Measurement Partner',
    status: 'PITCHING',
    value: 'Social listening at scale. Share of voice tracking. Sentiment analysis. Co-branded GCAP report. Gaming vertical case study for their sales team.',
    website: 'https://meltwater.com',
    action: null,
    actionLabel: null,
  },
  {
    name: 'Google',
    type: 'Measurement Framework Alignment',
    status: 'TARGET',
    value: 'Google launched new social influence measurement. Align Gamefluence Score with their framework for credibility. Google Trends API for search lift data. YouTube deep analytics. Via Dean/Meltwater connection.',
    website: 'https://trends.google.com',
    action: null,
    actionLabel: null,
  },
  {
    name: 'Gamefluence',
    type: 'Performance Brand (Internal)',
    status: 'ACTIVE',
    value: 'Gaming-focused brand for creator campaigns + measurement. Gamefluence Score = the measurement product. GCAP presentation vehicle. YouTube channel planned.',
    website: 'https://gamefluence.com.au',
    action: null,
    actionLabel: null,
  },
  {
    name: 'AppsFlyer',
    type: 'Attribution Technology',
    status: 'ACTIVE',
    value: 'MMP for install attribution. OneLink for event activations (QR → install → attribution). S2S postbacks. Princess Polly case study relationship. Joel is ex-AppsFlyer.',
    website: 'https://appsflyer.com',
    action: null,
    actionLabel: null,
  },
  {
    name: 'SideShare (Tim connection)',
    type: 'Campaign Marketplace',
    status: 'EXPLORING',
    value: 'Platform similar to Fabulate. Tim mentioned this as a product he saw. Potential additional brief source or comparison for positioning.',
    website: null,
    action: null,
    actionLabel: null,
  },
  {
    name: 'Screen Agencies',
    type: 'Government Funding Bodies',
    status: 'TARGET',
    value: 'Screen Australia, Screen NSW, Film Victoria, Screen Queensland. They fund games and need ROI proof. Gamefluence Score = their accountability metric. Revenue model: they fund the campaign as part of marketing support.',
    website: null,
    action: null,
    actionLabel: null,
  },
]

export default function PartnersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
          <p className="text-gray-500 mt-1">Strategic partnerships, data providers, and pipeline sources</p>
        </div>
      </div>

      <div className="space-y-4">
        {PARTNERS.map((partner) => (
          <div key={partner.name} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center",
                partner.status === 'ACTIVE' ? 'bg-emerald-100' :
                partner.status === 'PITCHING' ? 'bg-amber-100' :
                'bg-gray-100'
              )}>
                <Handshake className={cn("w-5 h-5",
                  partner.status === 'ACTIVE' ? 'text-emerald-600' :
                  partner.status === 'PITCHING' ? 'text-amber-600' :
                  'text-gray-500'
                )} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{partner.name}</h3>
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold",
                    partner.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' :
                    partner.status === 'PITCHING' ? 'bg-amber-50 text-amber-700' :
                    partner.status === 'EXPLORING' ? 'bg-blue-50 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  )}>{partner.status}</span>
                  <span className="text-[10px] text-gray-400">{partner.type}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 max-w-xl">{partner.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {partner.website && (
                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 rounded">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {partner.action && (
                <a href={partner.action} className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800">
                  {partner.actionLabel}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
