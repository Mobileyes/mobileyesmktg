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
  suggestedOpener: string
}

const FABULATE_CREATORS: FabulateCreator[] = [
  {
    name: 'Claudia Rose',
    email: 'comfortbottle@gmail.com',
    tiktok: 'https://www.google.com/search?q=%22claudia+rose%22+australia+tiktok+creator',
    instagram: 'https://www.google.com/search?q=%22claudia+rose%22+australia+instagram+creator',
    niche: '⚠️ Adult/OF Creator — repped by Luxe Agency. Gaming crossover = incremental revenue for her.',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Saw your work with Luxe Agency — you\'re clearly well-managed for adult brands. But with GTA 6 dropping, gaming brands are actively seeking crossover talent with engaged audiences. This would be incremental for you — new revenue, different brands, no conflict with your existing agency.',
  },
  {
    name: 'Tamara Holland',
    email: 'tamaradavisholland@gmail.com',
    tiktok: null,
    instagram: 'https://www.google.com/search?q=%22tamara+davis+holland%22+instagram+fashion+editor',
    niche: 'Fashion Media / Journalist — ex-fashion editor, "What Are You Wearing?" podcast, Substack (Fash Chat)',
    estimatedFollowers: 'Media influence — editorial reach over follower count',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Love the \'What Are You Wearing?\' podcast — your fashion editorial eye is exactly the kind of taste-making brands want behind their creator campaigns.',
  },
  {
    name: 'Rojin Torabi',
    email: 'roj@theroject.com',
    tiktok: 'https://www.tiktok.com/@theroject',
    instagram: 'https://www.instagram.com/theroject/',
    niche: 'Beauty / Skincare — Dermal Therapy Creative Director, lawyer, @theroject. MAJOR creator.',
    estimatedFollowers: '100K+ (caused Dermal Therapy stockouts)',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'The Dermal Therapy Creative Director role is a serious flex — you literally caused a product stockout from one TikTok. That kind of conversion power is exactly what our brand partners are looking for.',
  },
  {
    name: 'Michael Pantaleone',
    email: 'cast@thecastpatrol.com.au',
    tiktok: 'https://www.tiktok.com/@thecastpatrolpodcast',
    instagram: 'https://www.google.com/search?q=%22the+cast+patrol%22+instagram+nrl',
    niche: 'Sports / NRL Podcast — "The Cast Patrol" (NRL tips, betting, sports talk)',
    estimatedFollowers: 'Podcast audience — TikTok clips for reach',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'The Cast Patrol NRL content is quality — your audience is engaged and the sports betting angle shows they act on recommendations. Brands in gaming and sports want that.',
  },
  {
    name: 'Jasmin Deang',
    email: 'jasmin.deang@gmail.com',
    tiktok: 'https://www.tiktok.com/search?q=jasmin.dg__',
    instagram: 'https://www.google.com/search?q=%22jasmin+deang%22+OR+%22jasmin.dg_%22+instagram+australia',
    niche: 'Creator — micro, @jasmin.dg__ on TikTok. Verify niche from content.',
    estimatedFollowers: 'Micro — TBD',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Checked your TikTok — your content style is clean and authentic. Brands are looking for exactly that kind of natural integration right now.',
  },
  {
    name: 'Lily Noonan',
    email: 'lily.noonan97@gmail.com',
    tiktok: 'https://www.tiktok.com/@lilynoonanx',
    instagram: 'https://www.google.com/search?q=%22lily+noonan%22+instagram+australia+creator',
    niche: 'Lifestyle — micro-creator (@lilynoonanx on TikTok)',
    estimatedFollowers: 'Micro — TBD',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Your TikTok content has a natural, relatable vibe that brands are specifically seeking right now — authentic over polished.',
  },
  {
    name: 'Eliza Boyd',
    email: 'elizaanneboyd@gmail.com',
    tiktok: null,
    instagram: 'https://www.google.com/search?q=%22eliza+anne+boyd%22+instagram+australia',
    niche: 'Creator — verify niche after profile review',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Looked through your Linktree — your content portfolio shows real versatility. Brands want creators who can adapt their style to different briefs.',
  },
  {
    name: 'Aaron Boundy',
    email: 'aaronboundy10@gmail.com',
    tiktok: 'https://www.tiktok.com/@aaronboundy',
    instagram: 'https://www.google.com/search?q=%22aaron+boundy%22+instagram+australia',
    niche: 'Creator — active on TikTok (@aaronboundy), has Linktree. Verify niche from content.',
    estimatedFollowers: 'TBD — active poster, verify from TikTok',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Checked your TikTok — you\'ve got a natural energy that works well for brand content. Your engagement rate suggests your audience trusts your recommendations.',
  },
  {
    name: 'Jess Donaldson',
    email: 'jessicarose1901@gmail.com',
    tiktok: null,
    instagram: 'https://www.google.com/search?q=%22charlie+frankie+sonny%22+cocker+spaniels+instagram',
    niche: 'Pets (Cocker Spaniels)',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'The Cocker Spaniel content is adorable and clearly resonates — pet brands and family lifestyle brands are actively looking for this kind of authentic content right now.',
  },
  {
    name: 'Katianna Velos',
    email: 'kjvelos@outlook.com',
    tiktok: null,
    instagram: 'https://www.google.com/search?q=%22katianna+velos%22+golden+groves+instagram',
    niche: 'Food / Entrepreneur — co-founder Golden Groves (Greek olive oil), cooking content. Featured in TimeOut, Greek City Times.',
    estimatedFollowers: 'TBD — food/entrepreneur audience',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Golden Groves is a beautiful brand — the way you\'ve built a food/lifestyle presence around real family heritage is exactly what premium FMCG brands want to partner with.',
  },
  {
    name: 'Amber De Luca Tao',
    email: 'contact@wordsbyamber.com',
    tiktok: 'https://www.google.com/search?q=%22amber+de+luca-tao%22+tiktok+sneaker+freaker',
    instagram: 'https://www.google.com/search?q=%22amber+de+luca-tao%22+instagram+sneaker+freaker',
    niche: 'Fashion Journalism / Sneakers — Content Producer at Sneaker Freaker (wordsbyamber.com)',
    estimatedFollowers: 'Writer/journalist — influence via editorial, not follower count',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Your work at Sneaker Freaker shows serious editorial chops — brands want that kind of credibility behind their creator content, especially in fashion and streetwear.',
  },
  {
    name: 'Violet Scully',
    email: 'violetscully12@gmail.com',
    tiktok: null,
    instagram: 'https://www.google.com/search?q=%22violet+scully%22+instagram+australia+creator',
    niche: 'Creator — verify niche after profile review',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Your content caught our eye — we\'ve got brands looking for authentic Australian creators in your space right now.',
  },
  {
    name: 'Isabella McGavin',
    email: 'isabella.mcgavin@gmail.com',
    tiktok: 'https://www.google.com/search?q=%22isabella+mcgavin%22+tiktok+ugc+creator',
    instagram: 'https://linktr.ee/createdbyisabella',
    niche: 'UGC Creator (Linktree: createdbyisabella)',
    estimatedFollowers: 'UGC — portfolio-based, not follower-driven',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Checked your UGC portfolio (createdbyisabella) — your work is clean and brand-ready. We\'ve got briefs coming in that would suit your style perfectly.',
  },
  {
    name: 'Samantha Walker',
    email: 'my3ratbagz@gmail.com',
    tiktok: null,
    instagram: 'https://www.google.com/search?q=%22my3ratbagz%22+OR+%22i+am+sam+australia%22+instagram',
    niche: 'Parenting / Family (my3ratbagz)',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Your parenting content resonates — mum/family brands are consistently our most active brief category right now and your audience is exactly who they want to reach.',
  },
  {
    name: 'Gemma Stack',
    email: 'stackgemmattv@gmail.com',
    tiktok: 'https://www.google.com/search?q=%22gemma+stack%22+twitch+streamer+tiktok',
    instagram: 'https://www.google.com/search?q=%22gemma+stack%22+instagram+streamer+audio',
    niche: 'Gaming / Streaming / Audio — Twitch streamer, sound editor (Disney+), Audio-Technica featured',
    estimatedFollowers: 'TBD — Twitch community-focused',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Your Twitch streaming + the Disney+ sound editing work is a seriously unique combo — gaming and audio brands would love to work with someone who actually understands both sides.',
  },
  {
    name: 'Krystel Seach',
    email: 'collabwithkrystel@gmail.com',
    tiktok: null,
    instagram: 'https://collabstr.com/krysperise',
    niche: 'Beauty / Lifestyle — @krysperise on Collabstr. "Warm, simple, authentic — beauty, lifestyle, honest storytelling."',
    estimatedFollowers: 'Micro-creator — collab-focused',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Love your Collabstr profile — \'warm, simple, authentic\' is exactly the creative brief we hear from brands every week. Your beauty and lifestyle work stands out.',
  },
  {
    name: 'Joyce Arizala',
    email: 'joycevillareal94@gmail.com',
    tiktok: 'https://www.google.com/search?q=%22joyce+arizala%22+tiktok',
    instagram: 'https://www.google.com/search?q=%22joycearizala%22+instagram+ugc',
    niche: 'UGC Creator',
    estimatedFollowers: 'TBD — research needed',
    status: 'TO_RESEARCH',
    outreachDraft: '',
    suggestedOpener: 'Your UGC portfolio on Beacons shows solid brand-ready content — we\'ve got active briefs from DTC and lifestyle brands that would be a strong fit for your style.',
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
  const [personalNote, setPersonalNote] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sentTo, setSentTo] = useState('')
  const [messageId, setMessageId] = useState('')
  const [sendError, setSendError] = useState<string | null>(null)

  const handleSelectCreator = (creator: FabulateCreator) => {
    setSelectedCreator(creator)
    setSent(false)
    setSentTo('')
    setMessageId('')
    setSendError(null)
    setPersonalNote(creator.suggestedOpener || '')
    // Auto-generate outreach personalised to their niche
    const nicheIntro = creator.niche.includes('verify') ? 'your content' :
      creator.niche.includes('Adult') || creator.niche.includes('OF') ? 'your content' :
      creator.niche.includes('UGC') ? 'your UGC portfolio' :
      creator.niche.includes('Gaming') && creator.niche.includes('FPS') ? 'your FPS gameplay content' :
      creator.niche.includes('Gaming') && creator.niche.includes('Racing') ? 'your racing/drift gaming content' :
      creator.niche.includes('Gaming') && creator.niche.includes('Mobile') ? 'your mobile gaming content' :
      creator.niche.includes('Gaming') && creator.niche.includes('Streaming') ? 'your streams — solid community engagement' :
      creator.niche.includes('Gaming') ? 'your gaming content' :
      creator.niche.includes('Esports') ? 'your esports content' :
      creator.niche.includes('Parenting') || creator.niche.includes('Family') ? 'your family content' :
      creator.niche.includes('Fashion') || creator.niche.includes('Shoes') ? 'your fashion content' :
      creator.niche.includes('Beauty') ? 'your beauty content' :
      creator.niche.includes('Pets') ? 'your pet content' :
      creator.niche.includes('Comedy') || creator.niche.includes('Entertainment') ? 'your content' :
      creator.niche.includes('Fitness') ? 'your fitness content' :
      creator.niche.includes('Tech') ? 'your tech content' :
      'your content'

    const brandExamples = creator.niche.includes('verify') ? 'brands across lifestyle, fashion, beauty, gaming, and consumer products' :
      creator.niche.includes('Adult') || creator.niche.includes('OF') ? 'gaming and entertainment brands' :
      creator.niche.includes('Gaming') && creator.niche.includes('Racing') ? 'gaming hardware brands and racing game studios (think sim rigs, controllers, and mobile racing titles)' :
      creator.niche.includes('Gaming') && creator.niche.includes('FPS') ? 'gaming peripherals, energy drinks, and FPS game publishers' :
      creator.niche.includes('Gaming') && creator.niche.includes('Mobile') ? 'mobile game studios running UA campaigns — they need authentic gameplay content that drives installs' :
      creator.niche.includes('Gaming') && creator.niche.includes('Streaming') ? 'gaming brands, hardware companies, and game studios looking for live integration campaigns' :
      creator.niche.includes('Gaming') || creator.niche.includes('Esports') ? 'gaming studios, hardware brands, and publishers looking for creator campaigns across APAC' :
      creator.niche.includes('Fashion') || creator.niche.includes('Shoes') ? 'fashion, retail, and lifestyle brands' :
      creator.niche.includes('Beauty') ? 'beauty, skincare, and wellness brands' :
      creator.niche.includes('Parenting') || creator.niche.includes('Family') || creator.niche.includes('Pets') ? 'family, FMCG, and lifestyle brands' :
      creator.niche.includes('UGC') ? 'e-commerce and direct-to-consumer brands' :
      creator.niche.includes('Fitness') ? 'health, fitness, and activewear brands' :
      creator.niche.includes('Tech') ? 'tech, SaaS, and consumer electronics brands' :
      'brands across lifestyle, fashion, beauty, gaming, and consumer products'

    // OF/Adult creator gets a different outreach angle — gaming crossover
    const isAdultCreator = creator.niche.includes('Adult') || creator.niche.includes('OF')

    if (isAdultCreator) {
      setOutreachMessage(`Hi ${creator.name.split(' ')[0]},

[YOUR PERSONAL NOTE — reference something specific about their content/audience]

I'm Joel — founder of Mobileyes, a creator agency based in Sydney. We represent talent for brand campaigns across gaming, entertainment, and lifestyle.

Quick question for you: with GTA 6 coming out, would you consider doing any cross-collabs with a team for gaming campaigns? Or are you looking to only work with adult brands?

This will help me get you the right briefs — we work with gaming studios, entertainment brands, and lifestyle companies who are actively looking for creators with engaged audiences regardless of niche.

Would love to organise a quick Google Meet to chat about what this could look like. No commitment — just exploring if there's a fit.

Joel Kirk
Mobileyes — mobileyes.live
admin@mobileyes.live`)
    } else {
      setOutreachMessage(`Hi ${creator.name.split(' ')[0]},

[YOUR PERSONAL NOTE — reference something specific you saw in their content after clicking their profile links above]

I'm Joel — founder of Mobileyes, a creator agency based in Sydney. We represent talent for brand campaigns across Australia and APAC.

I'm reaching out because we've got briefs coming in from ${brandExamples} that would be a strong fit for ${nicheIntro}. We're selective about who we work with — we only reach out when we genuinely see a match.

How we work:
• Briefs come to you with the fee upfront — no guessing, no negotiation back-and-forth
• 4-day payment once content is approved (we carry the float, you get paid fast)
• Non-exclusive — work with us when it suits you, no lock-in
• We handle the brand relationship, contracts, and reporting — you just create

We're hearing from brands right now looking for authentic Australian creators in your space. Would you be open to a quick chat about what this looks like?

No pressure either way — just wanted to put it on your radar.

Joel Kirk
Mobileyes — mobileyes.live
admin@mobileyes.live`)
    }
  }

  const handleSend = async () => {
    if (!selectedCreator || sending || sent) return
    setSending(true)
    setSendError(null)
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
      if (res.ok) {
        const data = await res.json()
        setSent(true)
        setSentTo(selectedCreator.email)
        setMessageId(data.messageId || 'confirmed')
      } else {
        const data = await res.json().catch(() => ({ error: 'Unknown error' }))
        setSendError(data.error || `Failed (${res.status})`)
      }
    } catch (err) {
      setSendError('Network error — check connection')
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
                        Find TikTok <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    {creator.instagram && (
                      <a href={creator.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="px-2 py-1 rounded text-[10px] font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1">
                        Find IG <ExternalLink className="w-2.5 h-2.5" />
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
                  <CheckCircle2 className="w-4 h-4" /> <strong>Sent!</strong> Email delivered to {sentTo}. Message ID: {messageId}
                </div>
              )}

              {sendError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 mb-4">
                  ❌ <strong>Failed:</strong> {sendError}
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

              <div className="mb-3">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Opening Line (goes at the top of your email)</p>
                <p className="text-[10px] text-gray-400 mb-1">Check their profile first, then write 1-2 lines about what stood out. This replaces the [YOUR PERSONAL NOTE] placeholder in the message below.</p>
                <textarea
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  rows={3}
                  placeholder="e.g. Saw your recent Bonds collab — the styling felt natural and your audience clearly engaged. That's exactly the kind of content our brands are after."
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none bg-amber-50/50"
                />
              </div>

              <div className="mb-4">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Email Preview</p>
                <textarea
                  value={outreachMessage}
                  onChange={(e) => setOutreachMessage(e.target.value)}
                  rows={14}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSend}
                  disabled={sending || sent || !personalNote.trim()}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors",
                    sent ? "bg-emerald-600 text-white cursor-not-allowed" :
                    sending ? "bg-blue-400 text-white cursor-wait" :
                    !personalNote.trim() ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
                    "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Sending via Resend...' : sent ? '✓ Sent — Check Resend Dashboard' : 'Review & Send'}
                </button>
              </div>
              {!personalNote.trim() && (
                <p className="text-[10px] text-amber-600 mt-2 text-center">⚠️ Write your opening line first — check their profiles, then reference what stood out</p>
              )}
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
// Force rebuild 1783581499
