/**
 * NEIL × KICK × GAMEFLUENCE — Master Strategy
 * 
 * This is the big play: Joel + Neil + Kick + P1 + Gamefluence
 * 
 * Core thesis: Use the DreamHack/Kick relationship (Joel + Neil were there with
 * the Kick founding team) to position Gamefluence as Kicks content agency partner.
 * Neil provides hardware (P1 rigs), Joel provides talent + measurement, Kick provides
 * distribution + payment. Everyone wins.
 * 
 * Revenue streams:
 * 1. Affiliate sales (P1 rigs via creator content)
 * 2. Kick content agency fees (paid to produce/manage creator content)
 * 3. P1 sponsored streams (Neil pays upfront, recoups via affiliate)
 * 4. Giveaway campaigns (drives views, P1 covers rig cost or at-cost to Joel)
 * 5. Gamefluence Score licensing (brands pay to measure their sponsored streams)
 * 6. Clipping tool affiliate (clips → social → affiliate links → sales)
 */

export const NEIL_KICK_STRATEGY = {
  // ─── THE RELATIONSHIP ─────────────────────────────────
  relationship: {
    history: 'Joel + Neil went to DreamHack with the Kick founding team. Partied with them. Direct relationship with Kick leadership.',
    leverage: 'Nobody else has this. Joel literally helped build Kick at AWS (Twitch infrastructure). Knows the team personally. This is a moat.',
    neilRole: 'Hardware partner. P1 rigs are the set dressing for premium streaming setups. Every sponsored stream needs a rig.',
    joelRole: 'Talent agency + content measurement. Brings the creators, manages the campaigns, measures the results.',
    kickNeed: 'Content. Always content. Kick needs creators streaming, needs brands spending, needs viewership growing. They need a content agency partner who gets gaming.',
  },

  // ─── GAMEFLUENCE ON KICK ──────────────────────────────
  gamefluenceChannel: {
    platform: 'Kick (primary) + multicast to YouTube, TikTok, Twitch',
    concept: 'Gamefluence branded channel — gaming reviews, creator showcases, sponsored streams, rig builds, game launches',
    contentTypes: [
      'Sponsored game streams (paid by publishers/studios)',
      'P1 rig build streams (sponsored by Neil, affiliate-driven)',
      'Creator showcase streams (featuring managed talent)',
      'Game review streams (Gamefluence Score live — rate games on stream)',
      'Tournament/community events (P1 rigs as prizes)',
      'The Hot Lap road trip series (see below)',
    ],
    monetization: [
      'Kick creator payouts (viewership-based)',
      'Brand sponsorships (per-stream fees)',
      'Affiliate links in chat/description (P1, peripherals, games)',
      'Gamefluence Score licensing (brands pay to be scored on stream)',
    ],
    multicast: 'Stream simultaneously to Kick + YouTube + TikTok Live + Twitch using OBS multistream or Restream. Maximum reach, single production.',
  },

  // ─── KICK CONTENT AGENCY PLAY ─────────────────────────
  kickAgencyPitch: {
    what: 'Position Gamefluence as Kicks go-to content agency for gaming brands.',
    how: [
      'Manage a roster of Kick streamers for brand campaigns',
      'Produce sponsored stream content (brief → talent → stream → clips → reporting)',
      'Provide Gamefluence Score measurement for every campaign',
      'Drive viewership to Kick via social clips (TikTok, YouTube Shorts, IG Reels)',
      'Help Kick influence whats popular — curate which games/brands get streamed',
    ],
    revenue: 'Agency fee per campaign (20% commission) + content production fee + Kick creator payouts',
    differentiator: 'Joel literally helped build Kick at AWS. Nobody else has this relationship + measurement capability.',
    pitchToKick: 'We bring brands + talent + measurement. You provide the platform + payouts. We make Kick the go-to for gaming creator campaigns in APAC.',
  },

  // ─── P1 SPONSORED STREAMS ─────────────────────────────
  p1SponsoredStreams: {
    model: 'Neil sponsors streams (covers rig cost or cash fee). Streams feature P1 rigs prominently. Affiliate links in chat drive sales. Neil recoups via sales.',
    economics: {
      rigCostToNeil: '$2,500-$5,000 (at cost or wholesale)',
      streamFee: '$500-$2,000 per stream (paid to creator)',
      affiliateCommission: '5-10% per sale driven',
      breakEven: '1-2 rig sales per stream covers all costs',
      upside: 'Each stream is evergreen content on YouTube — keeps selling for months',
    },
    giveaways: {
      concept: 'P1 rig giveaway on stream. Viewers must follow/subscribe/share to enter. Drives massive engagement.',
      costToNeil: 'One rig at cost (~$1,500-$2,500)',
      value: '10K-50K new followers/viewers per giveaway + content that lives forever',
      frequency: 'Monthly giveaway = consistent content calendar',
    },
    rigsAtCost: 'Joel can buy rigs at cost from Neil for content production. Use as set pieces for Gamefluence streams. Tax deductible as business equipment.',
  },

  // ─── CLIPPING TOOL → AFFILIATE SALES ──────────────────
  clippingStrategy: {
    what: 'Use automated clipping tools (StreamLadder, Eklipse, or custom) to cut best moments from streams into short-form clips.',
    distribution: 'TikTok, YouTube Shorts, Instagram Reels, Twitter/X — all with affiliate links',
    affiliateIntegration: [
      'Pin affiliate link in comments on every clip',
      'Linktree/bio link to P1 + game download links',
      'Promo codes spoken on stream get repeated in clip captions',
      'QR codes in stream overlays → OneLink → attributed',
    ],
    revenue: 'Each clip is a mini-ad that drives affiliate sales 24/7. One good stream = 10-20 clips = months of passive affiliate income.',
    scale: 'Train managed creators to clip their own content. Gamefluence becomes the distribution engine.',
  },

  // ─── THE HOT LAP — P1 STANDALONE CONTENT PROPERTY ────
  theHotLap: {
    concept: 'Joel picks up a P1 rig from Neil, drives it down the coast to GCAP/PAX Melbourne, stopping at gaming creators along the way. Branded road trip content series. STANDALONE P1 property.',
    route: [
      { stop: 'Neils place (P1 HQ)', location: 'North of Sydney / Newcastle area', activity: 'Pick up the rig. Film the build. Interview Neil about P1.', content: 'Episode 1: The Rig' },
      { stop: 'Central Coast', location: 'Central Coast NSW', activity: 'Visit Simon + Mike from Kids From Next Door / LFG Gaming. Set up rig. They play.', content: 'Episode 2: The OGs' },
      { stop: 'Sydney', location: 'Sydney', activity: 'Quick stop. Meet a creator. Film reaction to the rig.', content: 'Episode 3: The City' },
      { stop: 'Canberra', location: 'Canberra', activity: 'Flight sim creators. DCS content. Maybe Jacob if hes nearby (Port Stephens).', content: 'Episode 4: The Sims' },
      { stop: 'Melbourne', location: 'Melbourne', activity: 'Arrive at GCAP. Set up rig at the event. Tim plays his own game on a P1 rig. Present Gamefluence Score.', content: 'Episode 5: The Finish Line' },
    ],
    sponsors: ['P1 Sim Rigs (primary — provides the rig)', 'Roadburn Games (Tim — game featured)', 'Potentially: Logitech, Fanatec, or peripheral brand for co-sponsor'],
    platforms: 'YouTube series (5 episodes) + TikTok/Shorts clips from each stop + live streams at each stop on Kick',
    budget: 'Fuel + accommodation (~$1,500-$2,000). Rig provided by Neil. Content = Joel + phone/camera.',
    gcapTiming: 'October 2026. Arrive in Melbourne for GCAP with the rig, full content series already published. Present at GCAP with the case study.',
    year2Evolution: 'Year 2 becomes a fully funded production — pitch to all state screen agencies. Each state pays $5-10K for their segment. Full crew, higher production value. Called "The Hot Lap" proper.',
    topGearSegment: {
      concept: 'Neil donates a sim racing rig AND a flight sim rig as competition prizes. We USE them the entire trip — setting them up at every stop, filming people playing, creating challenges. At the final stop (GCAP/PAX), we give them away live on stage or on stream to competition winners.',
      format: 'Top Gear-style challenges at each stop: "Can this flight sim veteran beat this racing sim pro on a P1 rig?" Lap times, head-to-heads, ridiculous challenges. Entertainment content, not just reviews.',
      rigsOnTheRoad: ['1x P1 Flight Sim Rig (HOTAS, pedals, MFDs — the dream DCS setup)', '1x P1 Racing Sim Rig (direct drive, triple monitor ready — the dream racing setup)'],
      competitionMechanic: 'Viewers enter throughout the series. Each episode teases the giveaway. Final episode = live draw at GCAP/PAX. Massive engagement driver across all episodes.',
      neilCost: 'Two rigs at cost (~$5K-$10K total). Return: massive brand exposure across 5+ episodes, every gaming creator they visit plays on P1, content lives forever on YouTube.',
      contentStyle: 'Top Gear meets gaming: banter, challenges, rivalries between sim racers and flight simmers, ridiculous scenarios (can you drift a flight sim rig? can a DCS pilot win a racing lap?). Fun, entertaining, shareable.',
    },
  },

  // ─── PATHWAY TO PAX — MAJOR CONTENT SERIES ────────────
  pathwayToPax: {
    concept: 'Full QLD-to-Melbourne content creation tour tied to PAX Aus. Stop at every gaming studio, creator, and key part of the gaming economy. Year 1 version of The Hot Lap concept — proves it works before seeking full government/state funding.',
    routeExpanded: [
      { region: 'Queensland', stops: 'Brisbane/Gold Coast game studios, screen agency meetings, local creators' },
      { region: 'Northern NSW', stops: 'Neil/P1 (pick up rig), Newcastle gaming community' },
      { region: 'Central Coast', stops: 'Simon, Mike (Kids From Next Door), LFG Gaming' },
      { region: 'Sydney', stops: 'Gaming studios, brand meetings, creator content days' },
      { region: 'Canberra', stops: 'Flight sim creators (Jacob/DCS), indie devs, government gaming contacts' },
      { region: 'Regional VIC', stops: 'Studios along the way, smaller creator meetups' },
      { region: 'Melbourne', stops: 'GCAP + PAX Aus — arrive with full content series, present Gamefluence Score, P1 rig demo' },
    ],
    contentOutput: [
      'Gamefluence podcast episodes (recorded at each stop)',
      'Mobileyes creator features (sign talent along the route)',
      'YouTube series (episodic, each stop = 1 episode)',
      'TikTok/Shorts clips from every meeting',
      'Live streams on Kick at key stops',
      'P1 rig featured throughout (in-car, set up at studios, demo at events)',
    ],
    fundingStrategy: {
      year1: 'Self-funded or light sponsor (P1 covers rig, fuel ~$3K). Content proves the concept.',
      year2: 'Pitch to ALL state screen agencies. Each state contributes $5-10K for their segment. Total: $30-50K. Full production crew.',
      governmentAngle: 'Screen Australia / state agencies fund as "gaming industry development content" — showcases AU game studios, creates employment, promotes sector internationally.',
      brandSponsors: ['P1 (hardware)', 'Logitech/Fanatec (peripherals)', 'Game studios (featured stops)', 'AppsFlyer (attribution demo)', 'Energy drink (travel content)'],
    },
  },

  // ─── HOW TO INFLUENCE WHATS POPULAR ON KICK ───────────
  influencingKick: {
    strategy: 'If Gamefluence becomes Kicks content agency, we influence what games get streamed, what brands get featured, what becomes trending.',
    tactics: [
      'Curate "Gamefluence Picks" — featured games/brands we recommend to our creators',
      'Coordinate simultaneous streams — 5+ creators play the same game on the same day = trending',
      'Leaderboard campaigns — who can get the best Gamefluence Score on a game = competitive content',
      'Brand deals flow through us — we decide which creators get which briefs',
      'P1 rig placements — every sponsored stream features a P1 rig in shot = free brand exposure for Neil',
    ],
    value: 'Control the content pipeline = control what gets popular. Brands pay us to make their games/products trending on Kick.',
  },

  // ─── REVENUE SUMMARY ──────────────────────────────────
  revenueStreams: {
    affiliate: { monthly: '$2,000-$10,000', source: 'P1 rig sales + game downloads via creator content' },
    kickAgency: { monthly: '$5,000-$20,000', source: 'Brand campaign fees for managed Kick content' },
    p1Sponsorship: { monthly: '$2,000-$5,000', source: 'Neil pays for sponsored streams (recoups via sales)' },
    gamefluenceScore: { monthly: '$1,000-$5,000', source: 'Brands pay for campaign measurement' },
    kickPayouts: { monthly: '$500-$3,000', source: 'Kick creator payouts for Gamefluence channel viewership' },
    totalPotential: { monthly: '$10,500-$43,000', annual: '$126,000-$516,000' },
  },
}
