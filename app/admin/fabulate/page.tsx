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
  const [showSkipModal, setShowSkipModal] = useState(false)
  const [skipReason, setSkipReason] = useState('')
  const [skippedCreators, setSkippedCreators] = useState<Array<{ name: string; email: string; reason: string }>>([])

  // Queue system — persisted to localStorage
  const [queue, setQueue] = useState<Array<{ name: string; email: string; subject: string; message: string; status: 'queued' | 'sending' | 'sent' | 'failed'; messageId?: string; error?: string }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fabulate_queue')
      if (saved) return JSON.parse(saved)
    }
    return []
  })
  const [batchSending, setBatchSending] = useState(false)
  const [previewEmail, setPreviewEmail] = useState<string | null>(null)

  // Persist queue to localStorage on every change
  const updateQueue = (newQueue: typeof queue) => {
    setQueue(newQueue)
    if (typeof window !== 'undefined') {
      localStorage.setItem('fabulate_queue', JSON.stringify(newQueue))
    }
  }

  const handleCloseCreator = () => {
    if (!selectedCreator) return
    // If not queued, ask why we're skipping
    if (!queue.some(q => q.email === selectedCreator.email)) {
      setShowSkipModal(true)
    } else {
      setSelectedCreator(null)
    }
  }

  const handleConfirmSkip = () => {
    if (!selectedCreator || !skipReason.trim()) return
    setSkippedCreators(prev => [...prev, { name: selectedCreator.name, email: selectedCreator.email, reason: skipReason }])
    setShowSkipModal(false)
    setSkipReason('')
    setSelectedCreator(null)
  }

  const handleAddToQueue = () => {
    if (!selectedCreator || !personalNote.trim()) return
    // Build the final message with the personal note properly inserted at the top
    const messageLines = outreachMessage.split('\n')
    // Remove the placeholder line and insert the personal note after "Hi [Name],"
    const finalLines = messageLines.filter(line => !line.includes('[YOUR PERSONAL NOTE'))
    // Insert personal note after the greeting (line 0 is "Hi Name,")
    finalLines.splice(1, 0, '', personalNote.trim(), '')
    const finalMessage = finalLines.join('\n')
    
    updateQueue([...queue, {
      name: selectedCreator.name,
      email: selectedCreator.email,
      subject: `Your ${selectedCreator.tiktok ? 'TikTok' : 'Instagram'} content — Mobileyes representation`,
      message: finalMessage,
      status: 'queued',
    }])
    setSent(true)
    setSentTo('Added to queue')
  }

  const handleRemoveFromQueue = (email: string) => {
    updateQueue(queue.filter(q => q.email !== email))
  }

  const handleSendAll = async () => {
    if (queue.length === 0 || batchSending) return
    // Safety check — don't send anything with placeholder text
    const hasPlaceholders = queue.some(q => q.message.includes('[YOUR PERSONAL NOTE'))
    if (hasPlaceholders) {
      alert('ERROR: Some messages still contain placeholder text. Remove them from queue and re-add with a proper opening line.')
      return
    }
    setBatchSending(true)

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i]
      if (item.status !== 'queued') continue

      updateQueue(queue.map((q, idx) => idx === i ? { ...q, status: 'sending' as const } : q))

      try {
        const res = await fetch('/api/admin/outreach/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            to: item.email,
            subject: item.subject,
            message: item.message,
            fromAlias: 'talent',
          }),
        })
        if (res.ok) {
          const data = await res.json()
          updateQueue(queue.map((q, idx) => idx === i ? { ...q, status: 'sent' as const, messageId: data.messageId || 'confirmed' } : q))
        } else {
          const data = await res.json().catch(() => ({ error: 'Unknown error' }))
          updateQueue(queue.map((q, idx) => idx === i ? { ...q, status: 'failed' as const, error: data.error } : q))
        }
      } catch (err) {
        updateQueue(queue.map((q, idx) => idx === i ? { ...q, status: 'failed' as const, error: 'Network error' } : q))
      }

      // Small delay between sends to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    setBatchSending(false)
  }

  // Individual send (keep for one-offs)
  const handleSend = async () => {
    if (!selectedCreator || sending || sent || !personalNote.trim()) return
    setSending(true)
    setSendError(null)
    // Build final message with personal note properly inserted
    const messageLines = outreachMessage.split('\n')
    const finalLines = messageLines.filter(line => !line.includes('[YOUR PERSONAL NOTE'))
    finalLines.splice(1, 0, '', personalNote.trim(), '')
    const finalMessage = finalLines.join('\n')
    try {
      const res = await fetch('/api/admin/outreach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          to: selectedCreator.email,
          subject: `Your ${selectedCreator.tiktok ? 'TikTok' : 'Instagram'} content — Mobileyes representation`,
          message: finalMessage,
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
          <p className="text-2xl font-bold text-emerald-600">{queue.filter(q => q.status === 'sent').length}</p>
          <p className="text-xs text-gray-500">Sent</p>
        </div>
      </div>

      {/* Send Queue */}
      {queue.length > 0 && (
        <div className="bg-white rounded-xl border border-blue-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-900">Send Queue ({queue.filter(q => q.status === 'queued').length} ready)</h3>
            </div>
            <button
              onClick={handleSendAll}
              disabled={batchSending || queue.filter(q => q.status === 'queued').length === 0}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                batchSending ? "bg-blue-400 text-white cursor-wait" :
                queue.filter(q => q.status === 'queued').length === 0 ? "bg-gray-200 text-gray-500" :
                "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              <Send className="w-3.5 h-3.5" />
              {batchSending ? 'Sending...' : `Approve & Send All (${queue.filter(q => q.status === 'queued').length})`}
            </button>
          </div>
          <div className="space-y-2">
            {queue.map((item, idx) => (
              <div key={idx} className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-xs",
                item.status === 'queued' ? 'bg-blue-50 border border-blue-100' :
                item.status === 'sending' ? 'bg-amber-50 border border-amber-100' :
                item.status === 'sent' ? 'bg-emerald-50 border border-emerald-100' :
                'bg-red-50 border border-red-100'
              )}>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    item.status === 'queued' ? 'bg-blue-500' :
                    item.status === 'sending' ? 'bg-amber-500 animate-pulse' :
                    item.status === 'sent' ? 'bg-emerald-500' :
                    'bg-red-500'
                  )} />
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-gray-500">{item.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === 'sent' && <span className="text-emerald-700 font-medium">✓ Sent ({item.messageId})</span>}
                  {item.status === 'failed' && <span className="text-red-700">✗ {item.error}</span>}
                  {item.status === 'sending' && <span className="text-amber-700">Sending...</span>}
                  {item.status === 'queued' && (
                    <button onClick={() => handleRemoveFromQueue(item.email)} className="text-red-500 hover:text-red-700 font-medium">Remove</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creator List */}
        <div className="lg:col-span-2 space-y-3">
          {FABULATE_CREATORS.map((creator, idx) => {
            const statusConfig = getStatusConfig(creator.status)
            const isSelected = selectedCreator?.email === creator.email
            const isQueued = queue.some(q => q.email === creator.email)
            const isSkipped = skippedCreators.some(s => s.email === creator.email)
            const skipInfo = skippedCreators.find(s => s.email === creator.email)
            return (
              <div
                key={idx}
                onClick={() => handleSelectCreator(creator)}
                className={cn(
                  'bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md',
                  isSelected ? 'border-blue-300 shadow-md ring-1 ring-blue-200' : isQueued ? 'border-emerald-300 bg-emerald-50/30' : isSkipped ? 'border-gray-300 bg-gray-50 opacity-60' : 'border-gray-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", isQueued ? "bg-emerald-600" : isSkipped ? "bg-gray-400" : "")} style={!isQueued && !isSkipped ? { background: 'linear-gradient(135deg, #1E293B, #334155)' } : undefined}>
                      {isQueued ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : isSkipped ? (
                        <span className="text-xs text-white">—</span>
                      ) : (
                        <span className="text-xs font-bold text-white">{creator.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{creator.name}</p>
                        {isSkipped && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-500">{skipInfo?.reason}</span>}
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Outreach — {selectedCreator.name}</h3>
                </div>
                <button onClick={handleCloseCreator} className="text-gray-400 hover:text-red-500 transition-colors" title="Close / Skip">
                  ✕
                </button>
              </div>

              {/* Skip Modal */}
              {showSkipModal && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs font-semibold text-amber-800 mb-2">Why are we skipping {selectedCreator.name}?</p>
                  <select value={skipReason} onChange={(e) => setSkipReason(e.target.value)} className="w-full px-3 py-2 border border-amber-200 rounded-lg text-xs text-gray-900 mb-2 bg-white">
                    <option value="">Select reason...</option>
                    <option value="Already repped by agency">Already repped by agency</option>
                    <option value="Brand safety concern">Brand safety concern</option>
                    <option value="Too small / not enough reach">Too small / not enough reach</option>
                    <option value="Wrong niche for current briefs">Wrong niche for current briefs</option>
                    <option value="Content quality not a fit">Content quality not a fit</option>
                    <option value="Couldnt find their profile">Couldn&apos;t find their profile</option>
                    <option value="Come back to later">Come back to later</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="flex gap-2">
                    <button onClick={handleConfirmSkip} disabled={!skipReason.trim()} className="flex-1 px-3 py-2 bg-amber-600 text-white rounded-lg text-xs font-medium disabled:opacity-50">Confirm Skip</button>
                    <button onClick={() => setShowSkipModal(false)} className="px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600">Cancel</button>
                  </div>
                </div>
              )}

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
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Opening Line (goes at the top of your email)</p>
                  <button
                    onClick={() => {
                      // Shorten the note to be more direct
                      const short = personalNote.split('.')[0] + '.' 
                      setPersonalNote(short.length > 20 ? short : personalNote.substring(0, 80) + '...')
                    }}
                    className="text-[10px] text-blue-600 hover:text-blue-700 font-medium"
                  >
                    ↻ Make shorter
                  </button>
                </div>
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
                  onClick={handleAddToQueue}
                  disabled={sent || !personalNote.trim() || queue.some(q => q.email === selectedCreator?.email)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors",
                    sent || queue.some(q => q.email === selectedCreator?.email) ? "bg-emerald-600 text-white cursor-not-allowed" :
                    !personalNote.trim() ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
                    "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  <Send className="w-4 h-4" />
                  {queue.some(q => q.email === selectedCreator?.email) ? '✓ In Queue' : sent ? '✓ Queued' : 'Add to Queue'}
                </button>
                <button
                  onClick={handleSend}
                  disabled={sending || sent || !personalNote.trim()}
                  className={cn(
                    "flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors",
                    sending ? "bg-amber-500 text-white cursor-wait" :
                    sent ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
                    !personalNote.trim() ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
                    "bg-gray-800 text-white hover:bg-gray-700"
                  )}
                >
                  {sending ? '...' : 'Send Now'}
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
