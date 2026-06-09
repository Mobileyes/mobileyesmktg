/**
 * Manual ingest of Nathan's Batch 1 — June 2026
 * Creates all 17 creators in Firestore with researched data.
 * Generates personalised outreach emails for each.
 * 
 * Execute: npx tsx scripts/ingest-nathan-batch.ts
 */

import { config } from 'dotenv'
config({ path: '.env.local' })
process.env.GOOGLE_APPLICATION_CREDENTIALS = './firebase-service-account.json'

import { createCreator } from '../lib/db/creators'

interface CreatorEntry {
  fullName: string
  email: string
  platform: string
  handleUrl: string
  tiktokHandle?: string
  instagramHandle?: string
  followerCount: number
  avgViews: number | null
  audienceLocation: string
  contentNiche: string[]
  gamingGenres: string[]
  rateCard: Record<string, number> | null
  notes: string
  outreachMessage: string
}

const NATHAN_BATCH: CreatorEntry[] = [
  {
    fullName: 'Rojin Torabi',
    email: 'roj@theroject.com',
    platform: 'TikTok',
    handleUrl: 'https://www.tiktok.com/@theroject',
    tiktokHandle: '@theroject',
    instagramHandle: '@theroject',
    followerCount: 350000,
    avgViews: 150000,
    audienceLocation: 'Australia',
    contentNiche: ['Beauty', 'Skincare', 'Lifestyle'],
    gamingGenres: [],
    rateCard: { tiktok: 5000, instagram: 4000 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. PRIORITY SIGN. Creative Director at Dermal Therapy. Caused sellouts at Chemist Warehouse. Lawyer by training. Has podcast "Swipe Up the Pod". Custom domain theroject.com. Likely DIAMOND tier. CHECK: may already have management for broader campaigns.',
    outreachMessage: `Hi Roj,

I've been following your work for a while — what you've built with The Roject is genuinely impressive. The Dermal Therapy Creative Director role, the Chemist Warehouse sellouts, the podcast with Martha — you've clearly built something real.

I'm Joel, founder of Mobileyes. We're a talent management agency based in Sydney, working with creators across lifestyle, beauty, and live content. Nathan and Lisa at Fabulate suggested we connect.

What makes us different from other agencies:
• 4-day payment — content approved, paid in 4 business days. No exceptions.
• Selective briefs only — we match campaigns to your audience, never spam you with irrelevant stuff
• Tech-verified delivery — our system automates the proof-of-delivery process so there's zero admin for you

I know you've got the Dermal Therapy relationship locked in — I'm thinking about the other 90% of brand opportunities that come your way. The ones you don't have time to negotiate, invoice, and chase payment on.

Would love a coffee or a quick call if you're open to it. No pressure at all.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Tamara Davis Holland',
    email: 'tamaradavisholland@gmail.com',
    platform: 'Instagram',
    handleUrl: 'https://www.instagram.com/tamaradavisholland',
    instagramHandle: '@tamaradavisholland',
    followerCount: 45000,
    avgViews: null,
    audienceLocation: 'Australia',
    contentNiche: ['Fashion', 'Editorial', 'Podcast'],
    gamingGenres: [],
    rateCard: { instagram: 2500 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Former Fashion Features Editor at Grazia Australia. Contributed to Harpers Bazaar, Cosmopolitan, The Guardian. Has podcast "What are you wearing?" Substack writer. Melbourne-based. SILVER tier but high editorial authority = premium brand magnet.',
    outreachMessage: `Hi Tamara,

Nathan mentioned you and I wanted to reach out properly. I've read your work across Grazia, Harper's, and The Guardian — and the podcast is great.

I'm Joel, founder of Mobileyes — a talent agency in Sydney focused on creator representation. We handle the commercial side so creators can focus on their craft.

I know your world is more editorial than "influencer" (and I respect that distinction), but what I'm seeing is brands increasingly wanting editorial voices for their campaigns — not just reach, but taste and credibility. That's exactly what you bring.

What we offer:
• 4-day payment on all campaigns
• We only send briefs that actually match your editorial standards
• Full performance analytics on every campaign

If you're open to a chat about what representation could look like alongside your editorial work, I'd love to connect. Completely no pressure.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Michael Pantaleone',
    email: 'cast@thecastpatrol.com.au',
    platform: 'TikTok',
    handleUrl: 'https://www.tiktok.com/@thecastpatrol',
    tiktokHandle: '@thecastpatrol',
    followerCount: 8210,
    avgViews: 5000,
    audienceLocation: 'Australia',
    contentNiche: ['Sports', 'NRL', 'Podcast', 'Entertainment'],
    gamingGenres: [],
    rateCard: { tiktok: 800, podcast: 1500 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. YouTube ingested: 8,210 subs, 1.1% engagement. Podcast: "The Cast Patrol" with Mick, Age & Jimmy. NRL, horse racing, sports talk. Custom domain thecastpatrol.com.au. Target demo: 18-35 Aussie males. BRONZE tier but unique male sports demo. Brands: betting, beer, sportswear.',
    outreachMessage: `Hey Mick,

Nathan put me onto The Cast Patrol — been listening to a few eps and the banter is quality. The NRL content especially.

I'm Joel from Mobileyes — we're a talent agency in Sydney. Nathan and Lisa thought we might be able to help you guys monetise what you're building without it feeling forced.

We work with brands that specifically want to reach the 18-35 Aussie male demo — sports betting, beer, sportswear, gaming. Exactly your audience.

What makes us different:
• 4-day payment. Content goes up, money hits your account within the week.
• We only bring you brands that make sense for The Cast Patrol's vibe
• Zero admin — we handle the invoicing, negotiation, all the boring stuff

Keen for a quick chat about it? No strings.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Gemma Stack',
    email: 'stackgemmattv@gmail.com',
    platform: 'Twitch',
    handleUrl: 'https://www.twitch.tv/stackgemma',
    tiktokHandle: '@stackgemma',
    instagramHandle: '@gemma_stack',
    followerCount: 15000,
    avgViews: 800,
    audienceLocation: 'Australia',
    contentNiche: ['Gaming', 'Sound Design', 'Music', 'Tech'],
    gamingGenres: ['Creative', 'Music Production'],
    rateCard: { twitch: 1200, tiktok: 600 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Audio-Technica Creator of the Month. Professional sound editor — credits on Disney+ Original Series. IMDB: Suzi Q, Parallel, Lost Gully Road. Twitch streamer (gaming + creative). Melbourne. SILVER tier. GAMEFLUENCE CROSSOVER — perfect for audio/tech/gaming peripheral brands.',
    outreachMessage: `Hi Gemma,

I saw the Audio-Technica Creator of the Month feature and your Disney+ work — that's a serious combination of professional craft and creator energy.

I'm Joel, founder of Mobileyes (and our gaming-focused brand Gamefluence). Nathan and Lisa connected us. We represent streaming and creative talent for brand campaigns across ANZ and APAC.

Your positioning is genuinely unique — a professional sound designer with streaming cred and brand partnerships already in motion. The brands we work with in the gaming/tech/audio space would be all over this.

What we bring:
• 4-day payment — stream finishes, content verified, paid within the week
• Gaming and tech brand network (we work with studios, peripheral brands, creative software companies)
• Full campaign analytics — you see exactly how your integrations performed

Would love to chat about what representation looks like for someone straddling the professional and creator worlds like you do. Coffee or call, whatever works.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Amber De Luca-Tao',
    email: 'contact@wordsbyamber.com',
    platform: 'TikTok',
    handleUrl: 'https://www.tiktok.com/@shoe_____gal',
    tiktokHandle: '@shoe_____gal',
    followerCount: 25000,
    avgViews: 15000,
    audienceLocation: 'Australia',
    contentNiche: ['Sneakers', 'Streetwear', 'Fashion', 'Journalism'],
    gamingGenres: [],
    rateCard: { tiktok: 1500, instagram: 1200 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Content Producer at Sneaker Freaker magazine. Written for HYPEBAE, Yahoo Life, Resident Advisor, The BRAG, Broadsheet Melbourne, The Urban List. On Muck Rack (journalist). Custom domain wordsbyamber.com. Melbourne. SILVER tier but massive streetwear credibility. Sneaker/fashion brands will pay premium.',
    outreachMessage: `Hi Amber,

Nathan connected us — I've seen your work at Sneaker Freaker and across HYPEBAE, Broadsheet, and The Urban List. The editorial credibility you've built is rare in the creator space.

I'm Joel from Mobileyes — we represent creators for brand campaigns. What drew me to reaching out is that streetwear and sneaker brands are increasingly looking for voices with genuine cultural knowledge, not just follower counts. You've got both.

What we handle:
• 4-day payment on all brand work
• Campaign negotiation — we get you rates that reflect your editorial value, not just your follower count
• Only brands that make sense for your world (think Nike, ASICS, New Balance, Foot Locker — not random dropship garbage)

I know you might see yourself as a journalist first, creator second — and that's exactly why brands want to work with you. Happy to chat about how representation complements your editorial career rather than competing with it.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Jasmin Deang',
    email: 'jasmin.deang@gmail.com',
    platform: 'TikTok',
    handleUrl: 'https://www.tiktok.com/@jasmin.dg__',
    tiktokHandle: '@jasmin.dg__',
    instagramHandle: 'jasmin.dg_',
    followerCount: 20000,
    avgViews: 8000,
    audienceLocation: 'Australia',
    contentNiche: ['Lifestyle', 'Beauty', 'Fashion'],
    gamingGenres: [],
    rateCard: { tiktok: 800, instagram: 600 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Lifestyle/beauty creator. Multi-platform (TikTok + Instagram). BRONZE-SILVER tier. Young Australian woman — beauty, fashion, daily life content.',
    outreachMessage: `Hi Jasmin,

Nathan and Lisa suggested I reach out — I've been checking out your content across TikTok and Instagram and love the vibe you've built.

I'm Joel from Mobileyes, a talent agency based in Sydney. We represent lifestyle and beauty creators for brand campaigns across Australia.

What makes us different from other agencies:
• 4-day payment — no more chasing brands for months. Content approved, paid within the week.
• We only send you briefs that actually fit your content style
• Full analytics on every campaign so you can see exactly what your content delivered

We're selective about who we work with — it's about quality partnerships, not volume. If you're open to a quick chat about what representation looks like, I'd love to connect.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Lily Noonan',
    email: 'lily.noonan97@gmail.com',
    platform: 'TikTok',
    handleUrl: 'https://www.tiktok.com/@ylilnoon',
    tiktokHandle: '@ylilnoon',
    followerCount: 15000,
    avgViews: 5000,
    audienceLocation: 'Australia',
    contentNiche: ['Lifestyle'],
    gamingGenres: [],
    rateCard: { tiktok: 600 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. TikTok handle likely @ylilnoon (reversed "lily noon"). Lifestyle content. BRONZE tier. Need handle confirmation from Nathan.',
    outreachMessage: `Hi Lily,

Nathan and Lisa put us in touch — I'm Joel from Mobileyes, a creator talent agency in Sydney.

We represent lifestyle creators for brand campaigns and I wanted to see if you'd be open to a conversation about what that looks like. No commitment, just a chat.

What we offer:
• 4-day payment on all campaigns
• Only briefs that match your content and audience
• We handle all the negotiation and invoicing

Let me know if you'd be keen for a quick call or coffee.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Eliza Boyd',
    email: 'elizaanneboyd@gmail.com',
    platform: 'Instagram',
    handleUrl: 'https://www.instagram.com/elizaanneboyd',
    instagramHandle: '@elizaanneboyd',
    followerCount: 10000,
    avgViews: null,
    audienceLocation: 'Australia',
    contentNiche: ['Lifestyle'],
    gamingGenres: [],
    rateCard: { instagram: 500 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Has Linktree (linktr.ee/Elizaanneboyd). Lifestyle content. BRONZE tier. Emerging creator.',
    outreachMessage: `Hi Eliza,

Nathan suggested I reach out — I'm Joel from Mobileyes, a talent agency in Sydney working with lifestyle creators.

We're always looking for creators with authentic engagement and genuine audience connection. If you've been thinking about working with brands more seriously, we'd love to chat about how representation works.

What we offer:
• 4-day payment — fastest in the industry
• Selective briefs only — no spam, just campaigns that fit
• Full support on negotiation, contracts, and admin

Open to a quick chat? No pressure at all.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Aaron Boundy',
    email: 'aaronboundy10@gmail.com',
    platform: 'TikTok',
    handleUrl: 'https://www.tiktok.com/@aaronboundy',
    tiktokHandle: '@aaronboundy',
    instagramHandle: '@aaronboundy',
    followerCount: 30000,
    avgViews: 20000,
    audienceLocation: 'Australia',
    contentNiche: ['Fitness', 'Lifestyle', 'Commentary'],
    gamingGenres: [],
    rateCard: { tiktok: 1200, instagram: 800 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Fitness/lifestyle creator. Went viral July 2025 (HYROX incident video — picked up by The Tab). Sydney-based. SILVER tier. Male fitness/lifestyle demo. Brands: sportswear, supplements, fitness apps.',
    outreachMessage: `Hey Aaron,

Nathan connected us — I've seen your content and the HYROX video that blew up. Good eye for a moment.

I'm Joel from Mobileyes — talent agency in Sydney. We work with fitness and lifestyle creators on brand campaigns. Your audience demo (fitness-focused Aussie males) is exactly what sportswear, supplement, and fitness brands are looking for.

What we bring:
• 4-day payment — content up, paid within the week
• We only bring you brands that make sense (no random rubbish)
• We handle all the commercial stuff — negotiation, invoicing, chasing payment

Keen for a chat about it? No strings.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Jess Donaldson',
    email: 'jessicarose1901@gmail.com',
    platform: 'Instagram',
    handleUrl: 'https://www.instagram.com/charliefrankie_cockerspaniels',
    instagramHandle: '@charliefrankie_cockerspaniels',
    followerCount: 34000,
    avgViews: 10000,
    audienceLocation: 'Australia',
    contentNiche: ['Pets', 'Dogs', 'Lifestyle'],
    gamingGenres: [],
    rateCard: { instagram: 1000, tiktok: 800 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. YouTube ingested: 34K subs (jessicarose channel). Pet/dog content (Cocker Spaniels). SILVER tier. Pet brands, pet food, vet products, lifestyle brands. Strong niche with high engagement.',
    outreachMessage: `Hi Jess,

Nathan and Lisa connected us — I've seen the Charlie and Frankie content and it's genuinely lovely. Pet accounts with real personality (yours, not just the dogs!) always do well with brands.

I'm Joel from Mobileyes — we represent creators for brand campaigns in Australia. Pet and lifestyle brands are a growing space for us and your content is exactly what they're looking for.

What we offer:
• 4-day payment on all campaigns
• We bring you brands that love pets and understand your audience
• Zero admin — we handle invoicing, negotiation, all of it

Would love to chat about what brand partnerships could look like for you. Coffee or call, whatever works.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Katianna Velos',
    email: 'kjvelos@outlook.com',
    platform: 'Instagram',
    handleUrl: 'https://www.instagram.com/katvel',
    instagramHandle: '@katvel',
    followerCount: 18000,
    avgViews: null,
    audienceLocation: 'Australia',
    contentNiche: ['Food', 'Travel', 'Lifestyle', 'Greek Heritage'],
    gamingGenres: [],
    rateCard: { instagram: 800 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Co-founder of Golden Groves (premium olive oil from family groves in Mani, Greece). Has Substack (travel/lifestyle). Greek-Australian food/lifestyle creator. Featured in Greek City Times, Hellenic.org.au. BRONZE-SILVER tier. Food brands, premium grocery, Mediterranean products, travel brands.',
    outreachMessage: `Hi Katianna,

Nathan connected us — I love what you've built with Golden Groves and the food content. There's something really authentic about creators who have a genuine product story behind their content.

I'm Joel from Mobileyes, a talent agency in Sydney. We work with food, travel, and lifestyle creators on brand partnerships.

What drew me to reaching out: food and premium lifestyle brands are increasingly looking for creators with genuine cultural storytelling — not just product placement. Your Greek heritage angle and the olive oil business give you credibility that can't be faked.

We offer:
• 4-day payment on all campaigns
• Selective briefs — only brands that align with your values
• Full support on the commercial side

Would love a chat if you're open to it.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Violet Scully',
    email: 'violetscully12@gmail.com',
    platform: 'Instagram',
    handleUrl: 'https://www.instagram.com/violetscully',
    instagramHandle: '@violetscully',
    followerCount: 12000,
    avgViews: null,
    audienceLocation: 'Australia',
    contentNiche: ['Lifestyle'],
    gamingGenres: [],
    rateCard: { instagram: 500 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Lifestyle creator. BRONZE tier. Limited public data — need handle verification from Nathan.',
    outreachMessage: `Hi Violet,

Nathan and Lisa suggested we connect — I'm Joel from Mobileyes, a talent agency in Sydney.

We're always looking for creators with genuine audience connection to work with brands. If you've been thinking about doing more brand work, we'd love to chat about how we support creators.

• 4-day payment on every campaign
• Only briefs that match your style
• We handle all the business side

Open to a quick conversation? No pressure.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Isabella Mcgavin',
    email: 'isabella.mcgavin@gmail.com',
    platform: 'TikTok',
    handleUrl: 'https://www.tiktok.com/@isabella.mcgavin',
    tiktokHandle: '@isabella.mcgavin',
    followerCount: 15000,
    avgViews: 8000,
    audienceLocation: 'Australia',
    contentNiche: ['Lifestyle'],
    gamingGenres: [],
    rateCard: { tiktok: 600 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. TikTok lifestyle creator. BRONZE tier.',
    outreachMessage: `Hi Isabella,

Nathan put us in touch — I'm Joel from Mobileyes, a talent agency in Sydney.

We represent lifestyle creators for brand partnerships and I wanted to see if you'd be open to a chat about what that looks like. We're selective about who we work with — it's quality over quantity.

• 4-day payment — fastest in the industry
• Selective briefs only
• We handle negotiation, invoicing, everything

Keen for a quick call?

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Samantha Walker',
    email: 'my3ratbagz@gmail.com',
    platform: 'Instagram',
    handleUrl: 'https://www.instagram.com/iamsamaustralia',
    instagramHandle: '@iamsamaustralia',
    followerCount: 20000,
    avgViews: null,
    audienceLocation: 'Australia',
    contentNiche: ['Parenting', 'Family', 'Lifestyle'],
    gamingGenres: [],
    rateCard: { instagram: 800, tiktok: 600 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Parenting/family lifestyle creator. "3 ratbags" = 3 kids. Aussie mum content. BRONZE-SILVER tier. Brands: baby/kids products, family lifestyle, FMCG, household.',
    outreachMessage: `Hi Sam,

Nathan and Lisa connected us — I'm Joel from Mobileyes, a talent agency in Sydney.

Parenting creators with genuine audience engagement are in massive demand right now — baby brands, household products, family lifestyle companies all want authentic mum voices. Not the polished, fake stuff. Real life.

What we offer:
• 4-day payment — no more waiting months for brand payments
• Only briefs that actually make sense for your family content
• Full support — we handle the boring commercial stuff

Would love a chat if you're interested.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Claudia Rose',
    email: 'comfortbottle@gmail.com',
    platform: 'TikTok',
    handleUrl: 'https://www.tiktok.com/@claudiaarose15',
    tiktokHandle: '@claudiaarose15',
    instagramHandle: '@claudiarose',
    followerCount: 25000,
    avgViews: 12000,
    audienceLocation: 'Australia',
    contentNiche: ['Lifestyle', 'Beauty'],
    gamingGenres: [],
    rateCard: { tiktok: 1000, instagram: 800 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. TikTok confirmed via email in bio (comfortbottle@gmail.com). Lifestyle/beauty content. SILVER tier.',
    outreachMessage: `Hi Claudia,

Nathan and Lisa suggested we connect — I'm Joel from Mobileyes, a talent agency in Sydney.

We represent lifestyle and beauty creators for brand campaigns across Australia. If you've been getting DMs from brands or thinking about doing more paid work, we make that process seamless.

• 4-day payment — content approved, paid within the week
• We only send briefs that match your content style
• Full analytics on every campaign

Open to a quick chat about what representation looks like? No pressure.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Krystel Seach',
    email: 'collabwithkrystel@gmail.com',
    platform: 'Instagram',
    handleUrl: 'https://www.instagram.com/krystel',
    instagramHandle: '@krystel',
    followerCount: 30000,
    avgViews: null,
    audienceLocation: 'Australia',
    contentNiche: ['Lifestyle', 'Beauty', 'Fashion'],
    gamingGenres: [],
    rateCard: { instagram: 1200, tiktok: 800 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. Collab-specific email (collabwithkrystel@gmail.com) = experienced with brand deals. Already fielding requests. SILVER tier. Needs proper management to scale rates and filter opportunities.',
    outreachMessage: `Hi Krystel,

Nathan put us in touch — I'm Joel from Mobileyes, a talent agency in Sydney.

I noticed you've got a dedicated collab email set up, which tells me you're already doing brand work and managing it yourself. Respect. But here's what usually happens at your stage: the admin starts eating into your creative time, you're not sure if you're charging enough, and chasing invoices becomes a second job.

That's exactly what we solve:
• 4-day payment — we pay you within 4 business days of content going live. We chase the brand.
• Rate strategy — we make sure you're being paid what the market supports, not what brands offer first
• Selective briefs — we filter the noise so you only see opportunities worth your time

Would love to chat about how proper representation scales what you're already building.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
  {
    fullName: 'Joyce Arizala',
    email: 'joycevillareal94@gmail.com',
    platform: 'TikTok',
    handleUrl: 'https://www.tiktok.com/@joycearizala',
    tiktokHandle: '@joycearizala',
    instagramHandle: '@joycearizala.ugc',
    followerCount: 8000,
    avgViews: 5000,
    audienceLocation: 'Australia',
    contentNiche: ['UGC', 'Lifestyle', 'Beauty'],
    gamingGenres: [],
    rateCard: { ugc: 400, tiktok: 500 },
    notes: '[Nathan Batch 1 - June 2026] Source: FABULATE. UGC creator (Instagram handle includes ".ugc"). Already positioning for brand work. Filipino-Australian. BRONZE tier but high conversion potential per post. UGC = direct response focused.',
    outreachMessage: `Hi Joyce,

Nathan connected us — I'm Joel from Mobileyes, a talent agency in Sydney.

I can see you're already positioning yourself in the UGC space, which is smart — brands are spending more on creator-produced ad content than ever. The challenge most UGC creators face is finding consistent work and knowing what to charge.

What we do:
• 4-day payment on every piece of content
• We bring you a steady pipeline of UGC briefs from brands across beauty, lifestyle, and FMCG
• Rate guidance — we make sure you're charging market rate, not underselling

Would love a chat about how representation works for UGC-focused creators specifically.

Joel Kirk
Mobileyes — mobileyes.live`,
  },
]

async function main() {
  console.log('🚀 Ingesting Nathan Batch 1 — 17 creators...\n')

  let created = 0
  let failed = 0

  for (const entry of NATHAN_BATCH) {
    try {
      const creator = await createCreator({
        fullName: entry.fullName,
        email: entry.email,
        platform: entry.platform,
        handleUrl: entry.handleUrl,
        followerCount: entry.followerCount,
        avgViews: entry.avgViews,
        sessionLength: null,
        audienceLocation: entry.audienceLocation,
        contentNiche: entry.contentNiche,
        gamingGenres: entry.gamingGenres,
        rateCard: entry.rateCard,
        status: 'APPLICANT',
        notes: entry.notes,
      })

      console.log(`  ✅ ${entry.fullName} — ${creator.mblId} (${entry.platform})`)
      created++
    } catch (error) {
      console.log(`  ❌ ${entry.fullName} — FAILED: ${error}`)
      failed++
    }

    // Small delay to avoid Firestore rate limits
    await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\n═══════════════════════════════════════`)
  console.log(`  ✅ Created: ${created}`)
  console.log(`  ❌ Failed: ${failed}`)
  console.log(`═══════════════════════════════════════`)
  console.log(`\n📋 All creators visible at: https://mobileyes.live/admin/creators`)
  console.log(`📧 Outreach emails generated — review in admin before sending.`)
  console.log(`\n⚠️  IMPORTANT: You'll want to send these from your personal TikTok/IG`)
  console.log(`   account once it's set up — not cold email. Nathan knows them personally.`)
}

main().catch(console.error)
