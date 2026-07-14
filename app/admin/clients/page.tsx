'use client'

import Link from 'next/link'
import { Building2, Car, ExternalLink, DollarSign, Users, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const CLIENTS = [
  {
    name: 'Roadburn Games (Tim)',
    company: 'Road Burn Pty Ltd',
    contact: 'Tim Millard',
    email: 'TBD — via SideShare intro',
    website: 'https://roadburngames.com',
    status: 'PITCHING',
    tier: 'HIGH',
    games: ['Drift Runner: Racing Masters', 'Burnout Masters'],
    totalInstalls: '1M-5M combined',
    monthlyBudgetTarget: '$10,000-$20,000 AUD/month',
    brief: '/admin/roadburn',
    notes: 'Has budget. Needs 10K+ monthly for this to work. Meltwater case study angle qualifies him. Drift Masters partnership = event tie-ins. Ask about: total UA spend, promo code capability, AppsFlyer, retention data.',
    events: ['Drift Masters 2026 (7 rounds)', 'Summernats 2027 (Burnout Masters official game)', 'GCAP Oct 2026 (case study presentation)'],
    discoveryNeeds: [
      'Monthly UA budget currently?',
      'What does he need to make per month to justify spend?',
      'Where does he want to spend his time? (building games vs marketing)',
      'Promo code system — does it exist?',
      'AppsFlyer or any MMP?',
      'What success looks like in prior markets?',
      'In-app ads running? (rewarded video = additional revenue layer)',
    ],
  },
  {
    name: 'P1 Sim Rigs (Neil)',
    company: 'P1 Sim Rigs',
    contact: 'Neil',
    email: 'TBD — via direct relationship',
    website: 'https://p1simrigs.com',
    status: 'PILOT',
    tier: 'MEDIUM',
    games: [],
    totalInstalls: 'N/A — e-commerce',
    monthlyBudgetTarget: '$2,000-$5,000 AUD/month (affiliate model)',
    brief: '/admin/p1-sim',
    notes: 'Focus on HIGH-VALUE rigs ($3K-$15K). Flight sim + dream builds. Jacob is signed and ready. Affiliate 5-10% commission per sale. One $5K rig sale = $500 commission. Need Neil to confirm: rig spec, promo code JACOB-P1, shipping to Jacob.',
    events: ['Flight Sim Expo', 'DreamHack'],
    discoveryNeeds: [
      'Average order value?',
      'Monthly rig sales currently?',
      'Best-selling product tier?',
      'Profit margin per rig?',
      'Open to 10% affiliate commission?',
      'Shopify webhook capability?',
      'Flight sim config cost (full build)?',
    ],
  },
]

export default function ClientsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1">Active and prospective brand clients</p>
        </div>
      </div>

      <div className="space-y-6">
        {CLIENTS.map((client) => (
          <div key={client.name} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", client.tier === 'HIGH' ? 'bg-blue-100' : 'bg-gray-100')}>
                  <Building2 className={cn("w-5 h-5", client.tier === 'HIGH' ? 'text-blue-600' : 'text-gray-600')} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{client.name}</h3>
                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold", client.status === 'PITCHING' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700')}>{client.status}</span>
                  </div>
                  <p className="text-xs text-gray-500">{client.contact} · {client.company}</p>
                </div>
              </div>
              <Link href={client.brief} className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800">
                View Campaign <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-[10px] font-semibold text-gray-500 uppercase">Monthly Budget Target</p>
                <p className="text-sm font-bold text-gray-900 mt-1">{client.monthlyBudgetTarget}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-[10px] font-semibold text-gray-500 uppercase">Total Installs / Revenue</p>
                <p className="text-sm font-bold text-gray-900 mt-1">{client.totalInstalls}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-[10px] font-semibold text-gray-500 uppercase">Website</p>
                <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 inline-block">{client.website.replace('https://', '')}</a>
              </div>
            </div>

            {client.games.length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Games / Products</p>
                <div className="flex gap-2">{client.games.map(g => <span key={g} className="px-2 py-1 rounded text-xs bg-blue-50 text-blue-700">{g}</span>)}</div>
              </div>
            )}

            <div className="mb-4">
              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Events Calendar</p>
              <div className="flex flex-wrap gap-2">{client.events.map(e => <span key={e} className="px-2 py-1 rounded text-xs bg-violet-50 text-violet-700">{e}</span>)}</div>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Discovery Questions (qualify the deal)</p>
              <ul className="space-y-1">{client.discoveryNeeds.map((q, i) => <li key={i} className="text-xs text-gray-600 flex items-start gap-2"><span className="text-gray-400">☐</span>{q}</li>)}</ul>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-800">{client.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
