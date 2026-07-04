/**
 * COLLAB BRIEF — Roadburn Games (Tim)
 * 
 * Client: Road Burn Pty Ltd (roadburngames.com)
 * Titles: Burnout Masters, Drift Runner: Racing Masters
 * Founded: 2019, Australia
 * Focus: Immersive motorsport mobile experiences
 * 
 * Objective: Drive downloads + in-app token purchases for Drift Runner & Burnout Masters
 * Strategy: Pilot campaign with 2 creators → prove ROI → scale
 * 
 * Key value props for Tim:
 * - Full attribution (UTM + promo codes + token redemption tracking)
 * - We manage everything — creator sourcing, briefing, content QA, reporting
 * - He doesn't have time for this, that's the point of an agency
 * - Token/promo code strategy drives re-engagement across titles
 * - We prove it works on a pilot, then scale with budget
 * 
 * Revenue model for Mobileyes:
 * - Campaign fee (creator cost + 20% agency commission)
 * - Performance bonus potential if ROAS exceeds target
 */

export const ROADBURN_PILOT_BRIEF = {
  // ─── BRIEF METADATA ─────────────────────────────────
  briefId: 'MBL-BRIEF-ROADBURN-001',
  title: 'Roadburn Games — Mobile Racing Creator Pilot',
  version: '1.0',
  createdDate: '2026-07-04',
  status: 'DRAFT' as const,

  // ─── CLIENT ─────────────────────────────────────────
  client: {
    company: 'Road Burn Pty Ltd',
    contact: 'Tim',
    website: 'https://roadburngames.com',
    appStoreId: 'id691816064',
    titles: [
      {
        name: 'Burnout Masters',
        platform: 'iOS + Android',
        description: 'Official burnout competition game featuring 40+ real competitor cars, 100+ stock cars, customization. Partnership with Summernats.',
        playStoreId: 'com.RoadburnGames.BurnoutMasters',
        genre: 'Racing / Motorsport Simulation',
        audience: 'ANZ + Global car culture enthusiasts',
      },
      {
        name: 'Drift Runner: Racing Masters',
        platform: 'iOS + Android',
        description: 'Official Drift Masters partnership. 2024 season cars, tracks, tandem battle modes. Pro drivers including Adam LZ, Luke Fink, Jason Ferron.',
        playStoreId: 'com.RoadburnGames.DriftRunner',
        genre: 'Racing / Drift Simulation',
        audience: 'Global drift culture, motorsport fans, car enthusiast mobile gamers',
      },
    ],
  },

  // ─── CAMPAIGN CONCEPT ───────────────────────────────
  concept: {
    objective: 'Drive downloads + token purchases through authentic creator gameplay',
    strategy: `
Two-creator pilot campaign targeting mobile racing/drift gaming audience in APAC.
Each creator produces content showcasing Drift Runner and/or Burnout Masters with:
- Honest gameplay footage showing customization depth + drift mechanics
- Promo code for free tokens (drives installs AND re-engagement of lapsed players)
- UTM-tracked download links for attribution
- Cross-title promotion: "If you like this, try Burnout Masters too"

The token/promo code strategy is key:
- New users get bonus tokens on first login with code → immediate engagement
- Lapsed users re-engage to redeem code → reactivation
- Every redemption is trackable → clean attribution back to creator
    `.trim(),
    keyMessage: 'The most authentic drift/burnout mobile games — built by people who live the culture.',
    callToAction: 'Download link + promo code for free tokens',
  },

  // ─── CREATOR CANDIDATES ─────────────────────────────
  // STRATEGY: Source creators who DRIVE DOWNLOADS — mobile gaming audience, not car culture guys Tim already knows.
  // Focus on APAC markets where CPI is lowest and mobile racing engagement is highest.
  // Vietnam + Indonesia + SEA = massive mobile racing audiences (ZingSpeed has millions of DAU in Vietnam alone).
  creators: [
    {
      option: 'A',
      name: 'SAMMIT (Sam Lucas)',
      handle: '@sammit',
      platforms: {
        youtube: { url: 'https://youtube.com/@sammit', subscribers: '800K+', avgViews: '100K-500K' },
        tiktok: { url: 'https://tiktok.com/@sammit01', followers: 'Active' },
        twitch: { url: 'https://twitch.tv/sammit', followers: 'Active' },
      },
      email: 'business@sammit.net',
      location: 'Japan (originally Australia)',
      niche: 'Drift culture, Japanese car scene, real drifting + gameplay',
      whyThisCreator: `
- Australian in Japan — APAC crossover audience, English-speaking but region-native
- Competes in Formula Drift Japan 2 — actual professional drifter (authenticity)
- His audience IS the demo who downloads drift racing games on mobile
- Adam LZ (who is IN Drift Runner as featured driver) inspired Sam's channel — direct content link
- 800K engaged subscribers in the EXACT niche — mobile drift game content would convert
- DRIVES DOWNLOADS: drift audience actively plays mobile racing games (FR Legends, Drift Runner genre)
- Not a car culture bro who'd be weird playing mobile — he games AND drifts
      `.trim(),
      repStatus: 'RUN REP-DETECTION: business@sammit.net is a direct email (not management@), self-operated merch/Patreon/Twitch. Likely independent but needs video description scan for #ad frequency.',
      estimatedRate: '$3,000–$8,000 AUD per video (800K subs, niche, high engagement)',
      contentFit: 'HIGH — Drift Runner features Drift Masters drivers, Sam competes in Drift Masters Japan. Organic alignment.',
      downloadPotential: 'HIGH — 800K engaged subs in drift niche. Even 1% conversion = 8,000 installs. With promo code incentive, could push 2-3%.',
    },
    {
      option: 'B',
      name: 'TBD — Vietnam/SEA Mobile Racing Creator',
      handle: 'TO SOURCE via scrumball.com or TikTok discovery',
      platforms: {
        tiktok: { url: 'Search: Vietnamese mobile racing game TikTok creators (50K-200K)', followers: '50K-200K target' },
        youtube: { url: 'Search: Vietnamese/Thai mobile game YouTubers (gaming category)', subscribers: '50K-200K target' },
      },
      email: 'TBD — source via TikTok creator marketplace or direct DM',
      location: 'Vietnam or Thailand or Indonesia',
      niche: 'Mobile gaming, racing games, casual/mid-core gameplay content',
      whyThisCreator: `
- VIETNAM IS THE PLAY: 5.7B mobile game downloads from Vietnamese devs in 2024 alone
- ZingSpeed Mobile (drift racing) is the #1 racing game in Vietnam — this audience EXISTS
- CPI in SEA is the lowest globally — $0.50-$1.50 vs $3-5 in ANZ
- Vietnamese/Thai/Indo creators have massive mobile-first audiences who ACTUALLY download games
- These creators are UNREPRESENTED — no agencies operate in this space for racing games
- They cost $200-$800 per video — 10x cheaper than Western creators, same or better install rates
- Tim's games are global (English + universal car culture) — they work in any APAC market
- Drift Runner has localized appeal: drift culture is MASSIVE in Vietnam and Thailand
- Multiple creators at this tier = volume play. 5 creators × $500 = $2,500 for potentially 20K+ installs
      `.trim(),
      repStatus: 'ALMOST CERTAINLY UNREPRESENTED — no talent agencies operate in SEA mobile racing creator space. Direct DM outreach.',
      estimatedRate: '$200–$800 AUD per video (SEA rates, massive value vs Western pricing)',
      contentFit: 'HIGH — mobile-first audience that downloads racing games as primary entertainment. These are PLAYERS not viewers.',
      downloadPotential: 'VERY HIGH — mobile-native audience with high install intent. SEA gamers discover games through creators. 3-5% install conversion rate typical for mobile gaming creators in this region.',
      sourcingMethod: `
1. scrumball.com/ranking/top-gaming-influencers-on-tiktok-in-indonesia (filterable)
2. TikTok creator marketplace (self-serve, can filter by gaming + racing + region)
3. Search TikTok: #mobilegame #racinggame #drift Vietnamese/Thai/Indo creators
4. YouTube: search "drift game mobile" filter by Vietnam/Thailand/Indonesia
5. Use our batch-ingest API to scrape and score candidates automatically
      `.trim(),
    },
  ],

  // ─── COMMERCIAL TERMS ───────────────────────────────
  commercials: {
    campaignBudget: '$5,000–$15,000 AUD (pilot)',
    creatorFees: 'Dependent on final creator selection and negotiation',
    agencyCommission: '20% on creator fees',
    paymentTerms: 'Mobileyes invoices Roadburn. Creators paid within 4 days of content approval.',
    tokenBudget: 'Tim provides promo codes for X tokens per redemption (no cash cost to Tim — token value)',
    exclusivity: 'Non-exclusive. Creators can work with other racing games.',
    pilotScope: '2 creators, 2-3 pieces each, 4-week campaign window',
  },

  // ─── ATTRIBUTION & TRACKING ─────────────────────────
  attribution: {
    method: 'UTM links + unique promo codes + token redemption webhook',
    utmStructure: {
      source: 'youtube OR tiktok',
      medium: 'influencer',
      campaign: 'mbl-brief-roadburn-001',
      content: '{creator_handle}',
    },
    promoCodes: {
      format: '{CREATOR}-DRIFT (e.g. SAMMIT-DRIFT, ATRISK-BURN)',
      mechanism: 'Player enters code in-game → receives bonus tokens → redemption logged',
      tracking: 'Roadburn sends redemption events to POST /api/webhooks/conversions',
    },
    downloadTracking: {
      ios: 'AppsFlyer OneLink with campaign params (if Tim has AppsFlyer) OR App Store campaign link',
      android: 'Play Store UTM campaign link → attributed in Google Play Console',
      fallback: 'If no MMP: track promo code redemptions as proxy for installs',
    },
    conversionEvents: [
      'install (attributed download)',
      'token_redemption (promo code used)',
      'first_purchase (IAP within 7 days)',
      'day7_retention (still active after 7 days)',
    ],
    reportingCadence: 'Weekly report for first 30 days, then monthly',
  },

  // ─── DELIVERABLES ───────────────────────────────────
  deliverables: {
    optionA_SAMMIT: [
      { platform: 'YouTube', format: 'Dedicated video (8-12 min)', description: 'Drift Runner gameplay — showcase customization, drift mechanics, compare to real drift experience' },
      { platform: 'YouTube Shorts', format: '2-3 shorts (30-60s)', description: 'Quick drift clips, satisfying gameplay moments, "download now" CTA' },
      { platform: 'TikTok', format: '1-2 posts', description: 'Cross-post shorts or unique TikTok-native content' },
    ],
    optionB_ATRISK: [
      { platform: 'TikTok', format: '3-4 posts', description: 'Burnout Masters builds, gameplay clips, promo code callout' },
      { platform: 'YouTube (if applicable)', format: '1 video', description: 'Build showcase or gameplay compilation' },
    ],
  },

  // ─── CREATIVE GUIDELINES ────────────────────────────
  creativeGuidelines: {
    doList: [
      'Show actual gameplay — customization depth, drift physics, car builds',
      'Use promo code naturally ("use code SAMMIT-DRIFT for free tokens")',
      'Mention both titles if possible (cross-pollination)',
      'Be honest about the game — authentic > scripted',
      'Show the token/upgrade system (drives IAP understanding)',
      'Pin download link + promo code in comments/bio',
    ],
    dontList: [
      'No scripted reads — keep it natural',
      'No false claims about game features',
      'No comparison to AAA console titles (different audience)',
      'No requirement for face-cam if creator prefers not to',
    ],
    toneOfVoice: 'Enthusiastic car culture creator who genuinely enjoys mobile drift games. Not a generic gaming ad.',
  },

  // ─── VALUE PROP FOR TIM ─────────────────────────────
  pitchToTim: {
    headline: 'Full-service creator campaign with complete attribution — you focus on building games, we handle growth.',
    keyPoints: [
      'We source, vet, brief, and manage the creators end-to-end',
      'Full attribution: you see exactly which creator drove which installs and token purchases',
      'Token promo code strategy drives BOTH new installs and re-engagement of lapsed players',
      'Pilot proves ROI before you commit bigger budget',
      'You get a dedicated campaign dashboard showing real-time conversions',
      'Cross-title promotion (Drift Runner + Burnout Masters) maximizes LTV per acquired user',
      '4-day creator payment means they actually perform well — motivated creators = better content',
      'We handle everything: creator comms, briefing, content review, reporting. Your time investment = one approval email.',
    ],
    differentiator: 'Unlike platforms (SideShare, Fabulate) where you get a marketplace with no service — we ARE the service. One contact (Joel), full management, proven attribution from 20 years in performance marketing (King, Activision Blizzard, AppsFlyer, AWS).',
    socialProof: 'Joel\'s background: built attribution frameworks at AppsFlyer (98% UA growth case study published in The Drum), ran influencer campaigns at Activision Blizzard, gaming partnerships at AWS.',
  },

  // ─── NEXT STEPS ─────────────────────────────────────
  nextSteps: [
    '[Joel] Send Tim this brief as a one-page summary + call to discuss',
    '[Joel] Research SAMMIT representation status (check recent videos for #ad, management credits)',
    '[Joel] DM ATRISK via TikTok or find through Burnout Masters community',
    '[Tim] Confirm token promo code feasibility (can codes be generated in-game?)',
    '[Tim] Confirm if AppsFlyer or any MMP is set up (for install attribution)',
    '[Tim] Approve pilot budget range',
    '[Joel] Once creators confirmed → send agreements → brief → launch',
  ],
}

export type RoadburnBrief = typeof ROADBURN_PILOT_BRIEF
