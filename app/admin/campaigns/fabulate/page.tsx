'use client'

import { useState } from 'react'
import { Users, Mail, Send, ExternalLink, TrendingUp, Eye, CheckCircle2, Clock, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * FABULATE PIPELINE — Nathan/Lisa Independent Creators
 * 
 * Pre-loaded batch from Fabulate spreadsheet.
 * All creators are Australian, lifestyle/fashion/family niche.
 * Source: Nathan & Lisa @ Fabulate
 * 
 * Purpose: Content creators for brand campaigns (mummy, lifestyle, fashion, beauty)
 * Perfect for: Princess Polly-tier brands, FMCG, family brands, beauty/skincare
 */

type CreatorStatus = 'TO_RESEARCH' | 'RESEARCHED' | 'OUTREACH_READY' | 'CONTACTED' | 'RESPONDED' | 'SIGNED'

interface FabulateCreator {
  name: string
  email: string
  tiktok: string | null
  instagram: string | null
  niche: string
  estimatedFollowers: string
  status: CreatorStatus
  outreachDraft: string
}

const FABULATE_CREATORS: FabulateCreator[] = [
  {
    name: 'Claudia Rose',
    email: 'comfortbottle@gmail.com',
    tiktok: 'https://www.tiktok.com/@claudia',
    instagram: 'https://www.instagram.com/claudiarose',
    niche: 'Lifestyle / Family',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Tamara Holland',
    email: 'tamaradavisholland@gmail.com',
    tiktok: null,
    instagram: 'https://www.instagram.com/tamaradavisholland',
    niche: 'Lifestyle / Fashion',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Rojin Torabi',
    email: 'roj@theroject.com',
    tiktok: null,
    instagram: 'https://www.instagram.com/rojintorabi',
    niche: 'Lifestyle / Content',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Michael Pantaleone',
    email: 'cast@thecastpatrol.com.au',
    tiktok: 'https://www.tiktok.com/@thecastpatrol',
    instagram: null,
    niche: 'Entertainment / Comedy',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Jasmin Deang',
    email: 'jasmin.deang@gmail.com',
    tiktok: 'https://www.tiktok.com/@jasmin.dg__',
    instagram: 'https://www.instagram.com/jasmin.dg_',
    niche: 'Lifestyle / Beauty',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Lily Noonan',
    email: 'lily.noonan97@gmail.com',
    tiktok: 'https://www.tiktok.com/@lily',
    instagram: null,
    niche: 'Lifestyle',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Eliza Boyd',
    email: 'elizaanneboyd@gmail.com',
    tiktok: null,
    instagram: 'https://www.instagram.com/elizaanneboyd',
    niche: 'Lifestyle / Fashion',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Aaron Boundy',
    email: 'aaronboundy10@gmail.com',
    tiktok: null,
    instagram: 'https://www.instagram.com/aaronboundy',
    niche: 'Lifestyle / Fitness',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Jess Donaldson',
    email: 'jessicarose1901@gmail.com',
    tiktok: null,
    instagram: 'https://www.instagram.com/charliefrankie_cockerspaniels',
    niche: 'Pets / Family',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Katianna Velos',
    email: 'kjvelos@outlook.com',
    tiktok: null,
    instagram: 'https://www.instagram.com/katvel',
    niche: 'Lifestyle / Fashion',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Amber De Luca Tao',
    email: 'contact@wordsbyamber.com',
    tiktok: 'https://www.tiktok.com/@shoe_____gal',
    instagram: null,
    niche: 'Fashion / Shoes / Content Writing',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Violet Scully',
    email: 'violetscully12@gmail.com',
    tiktok: null,
    instagram: 'https://www.instagram.com/violetscully',
    niche: 'Lifestyle',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Isabella McGavin',
    email: 'isabella.mcgavin@gmail.com',
    tiktok: 'https://www.tiktok.com/@isabella.mcgavin',
    instagram: null,
    niche: 'Lifestyle / Beauty',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Samantha Walker',
    email: 'my3ratbagz@gmail.com',
    tiktok: null,
    instagram: 'https://www.instagram.com/iamsamaustralia',
    niche: 'Parenting / Family / Mummy',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Gemma Stack',
    email: 'stackgemmattv@gmail.com',
    tiktok: 'https://www.tiktok.com/@stackgemma',
    instagram: 'https://www.instagram.com/gemmastack',
    niche: 'Lifestyle / Entertainment',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Krystel Seach',
    email: 'collabwithkrystel@gmail.com',
    tiktok: null,
    instagram: 'https://www.instagram.com/krystel',
    niche: 'Lifestyle / Fashion / Collabs',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
  {
    name: 'Joyce Arizala',
    email: 'joycevillareal94@gmail.com',
    tiktok: 'https://www.tiktok.com/@joycearizala',
    instagram: 'https://www.instagram.com/joycearizala.ugc',
    niche: 'UGC / Lifestyle',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
  },
]

function getStatusConfig(status: CreatorStatus) {
  switch (status) {
    case 'TO_RESEARCH': return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'To Research' }
    case 'RESEARCHED': return { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Researched' }
    case 'OUTREACH_READY': return { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Outreach Ready' }
    case 'CONTACTED': return { bg: 'bg-violet-50', text: 'text-violet-700', label: 'Contacted' }
    case 'RESPONDED': return { bg: 'bg-sky-50', text: 'text-sky-700', label: 'Responded' }
    case 'SIGNED': return { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Signed' }
  }
}

export default function FabulatePipelinePage() {
  const [selectedCreator, setSelectedCreator] = useState<FabulateCreator | null>(null)
  const [outreachMessage, setOutreachMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSelectCreator = (creator: FabulateCreator) => {
    setSelectedCreator(creator)
    setSent(false)
    // Auto-generate outreach
    setOutreachMessage(`Hi ${creator.name.split(' ')[0]},

I came across your content and wanted to reach out.

I'm Joel, founder of Mobileyes — a talent agency representing creators for brand campaigns across Australia and APAC.

What makes us different:
• 4-day payment (content approved → paid in 4 days, no exceptions)
• Selective briefs only — matched to your audience and style
• Full campaign analytics — you see exactly how your content performed
• No lock-in — non-exclusive, work with us when it suits you

We're currently working with brands in lifestyle, fashion, beauty, and family — and your content caught our attention as a great fit.

Would you be open to a quick chat about what representation looks like?

Joel Kirk
Mobileyes — mobileyes.live
admin@mobileyes.live`)
  }

  const handleSend = async () => {
    if (!selectedCreator) return
    setSending(true)
    try {
      const res = await fetch('/api/admin/outreach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedCreator.email,
          subject: `Your ${selectedCreator.tiktok ? 'TikTok' : 'Instagram'} content — Mobileyes representation`,
          message: outreachMessage,
          fromAlias: 'talent',
        }),
      })
      if (res.ok) setSent(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-violet-100">
            <Users className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fabulate Pipeline — Independent Creators</h1>
            <p className="text-gray-500 text-sm">Source: Nathan &amp; Lisa · 17 creators · Lifestyle / Family / Fashion / UGC</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-2xl font-bold text-gray-900">{FABULATE_CREATORS.length}</p>
          <p className="text-xs text-gray-500">Total Creators</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-2xl font-bold text-gray-900">{FABULATE_CREATORS.filter(c => c.tiktok).length}</p>
          <p className="text-xs text-gray-500">Have TikTok</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-2xl font-bold text-gray-900">{FABULATE_CREATORS.filter(c => c.instagram).length}</p>
          <p className="text-xs text-gray-500">Have Instagram</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-2xl font-bold text-emerald-600">0</p>
          <p className="text-xs text-gray-500">Outreached</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creator List */}
        <div className="lg:col-span-2 space-y-3">
          {FABULATE_CREATORS.map((creator, idx) => {
            const statusConfig = getStatusConfig(creator.status)
            const isSelected = selectedCreator?.email === creator.email
            return (
              <div
                key={idx}
                onClick={() => handleSelectCreator(creator)}
                className={cn(
                  'bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md',
                  isSelected ? 'border-blue-300 shadow-md ring-1 ring-blue-200' : 'border-gray-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1E293B, #334155)' }}>
                      <span className="text-xs font-bold text-white">{creator.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{creator.name}</p>
                        <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold', statusConfig.bg, statusConfig.text)}>
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{creator.niche} · {creator.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {creator.tiktok && (
                      <a href={creator.tiktok} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="px-2 py-1 rounded text-[10px] font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1">
                        TikTok <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    {creator.instagram && (
                      <a href={creator.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="px-2 py-1 rounded text-[10px] font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1">
                        IG <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Outreach Panel */}
        <div className="space-y-4">
          {selectedCreator ? (
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-900">Outreach — {selectedCreator.name}</h3>
              </div>

              {sent && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Email sent to {selectedCreator.email}
                </div>
              )}

              <div className="mb-3">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">To</p>
                <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">{selectedCreator.email}</p>
              </div>

              <div className="mb-3">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Subject</p>
                <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded">Your {selectedCreator.tiktok ? 'TikTok' : 'Instagram'} content — Mobileyes representation</p>
              </div>

              <div className="mb-3">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Profiles</p>
                <div className="flex gap-2">
                  {selectedCreator.tiktok && (
                    <a href={selectedCreator.tiktok} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      TikTok <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {selectedCreator.instagram && (
                    <a href={selectedCreator.instagram} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      Instagram <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Message</p>
                <textarea
                  value={outreachMessage}
                  onChange={(e) => setOutreachMessage(e.target.value)}
                  rows={14}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                onClick={handleSend}
                disabled={sending || sent}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
                {sending ? 'Sending...' : sent ? 'Sent ✓' : 'Send Outreach Email'}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Mail className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-medium">Select a creator to preview &amp; send outreach</p>
              <p className="text-xs text-gray-400 mt-1">Click any creator on the left to load their profile and pre-filled email</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
