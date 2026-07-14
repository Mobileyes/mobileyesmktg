/**
 * REVENUE MODELS — Roadburn Games + P1 Sim Rigs
 * 
 * Used for:
 * - Qualifying campaign value for Joel's pitches
 * - Discovery questions for Tim and Neil
 * - Annual revenue projections based on known data
 * - Gamefluence Score benchmarking
 */

// ─── ROADBURN GAMES (TIM) ─────────────────────────────

export const ROADBURN_REVENUE_MODEL = {
  // Known data points
  known: {
    burnoutMastersInstalls: '1M-5M (Play Store badge: 1M+)',
    driftRunnerInstalls: 'Newer title — est 100K-500K',
    combinedInstalls: '1.5M-5.5M lifetime',
    monthlyOrganicInstalls: '5,000-15,000 (estimated from update cadence)',
    monetization: 'IAP (in-app purchases) + Ads (rewarded video + interstitial)',
    markets: 'Primarily ANZ + Global (English)',
  },

  // Industry benchmarks for racing games
  benchmarks: {
    avgRevenuePerInstall: { low: 0.30, mid: 0.80, high: 1.50, currency: 'USD', note: 'Racing games ARPI typically $0.30-$1.50 depending on IAP depth' },
    avgIAPConversionRate: { low: 2, mid: 4, high: 8, unit: '%', note: 'Racing games: 2-8% of players make a purchase' },
    avgRevenuePerPayingUser: { low: 5, mid: 15, high: 40, currency: 'USD', note: 'ARPPU for casual racing: $5-$40' },
    d1Retention: { low: 25, mid: 35, high: 45, unit: '%', note: 'Racing genre D1 benchmark' },
    d7Retention: { low: 10, mid: 15, high: 22, unit: '%', note: 'Racing genre D7 benchmark' },
    d30Retention: { low: 3, mid: 7, high: 12, unit: '%', note: 'Racing genre D30 benchmark' },
    adRevenuePerDAU: { low: 0.02, mid: 0.05, high: 0.10, currency: 'USD', note: 'Ad ARPDAU for racing games' },
  },

  // Modelled annual revenue (conservative → aggressive)
  projectedAnnualRevenue: {
    conservative: {
      assumption: '1.5M lifetime installs, $0.30 ARPI, 5K monthly organic',
      iapRevenue: 450000, // 1.5M × $0.30
      adRevenue: 180000, // est 10K DAU × $0.05 × 365
      total: 630000,
      currency: 'USD',
    },
    moderate: {
      assumption: '3M lifetime installs, $0.80 ARPI, 10K monthly organic',
      iapRevenue: 2400000,
      adRevenue: 365000,
      total: 2765000,
      currency: 'USD',
    },
    aggressive: {
      assumption: '5M installs, $1.50 ARPI, 15K monthly organic + creator campaigns',
      iapRevenue: 7500000,
      adRevenue: 547000,
      total: 8047000,
      currency: 'USD',
    },
  },

  // What our campaign adds (annual projection if sustained)
  ourImpact: {
    pilotInstalls: { low: 34000, high: 87000 },
    pilotCost: { low: 3340, high: 7700, currency: 'AUD' },
    pilotRevenue: { low: 10200, high: 130500, currency: 'USD', note: '34K-87K installs × $0.30-$1.50 ARPI' },
    annualizedIfRepeatedMonthly: {
      installs: { low: 408000, high: 1044000 },
      revenue: { low: 122400, high: 1566000, currency: 'USD' },
      cost: { low: 40080, high: 92400, currency: 'AUD' },
      roas: { low: 3.1, high: 16.9, note: 'Revenue / Cost' },
    },
  },

  // Discovery questions for Tim
  discoveryQuestions: [
    'What is your current monthly ad revenue across both titles? (gives us baseline)',
    'What percentage of players make an IAP? (tells us conversion quality)',
    'What is your average revenue per paying user? (sizes the opportunity)',
    'How much are you currently spending on paid UA (Meta/Google/TikTok ads)?',
    'What is your D7 and D30 retention? (tells us if creator users will stick)',
    'Do you have AppsFlyer or any MMP set up? (attribution capability)',
    'What does success look like for you in 3 months? (installs? revenue? new markets?)',
    'Would you be open to sharing Firebase analytics with us for campaign measurement?',
    'Are you running rewarded video ads in-game? (we can benchmark attention metrics)',
    'What is your total game dev budget annually? (helps us size our % of spend)',
    'Have you tried influencer campaigns before? What worked/didn\\'t?',
    'Do you have a token/promo code system we can use for attribution?',
  ],

  // Where we add value
  valueProposition: {
    timesSaved: 'We handle all creator sourcing, outreach, briefing, content QA, and payment. Tim focuses on building games.',
    marketExpansion: 'Open Vietnam, Indonesia, Thailand, Philippines — markets Tim has zero presence in today.',
    attributionClarity: 'Full-funnel tracking: promo codes → installs → retention → revenue per creator.',
    gamefluenceScore: 'Benchmark his campaigns against industry, prove which creators drive real LTV not just installs.',
    inAppAds: 'If Tim runs rewarded video, we can potentially integrate creator content INTO the ad waterfall — creators promote the game AND their content runs as rewarded video inside it.',
    scalePath: '10 creators/month for 3 months = 30 creators activated. At $0.09-$0.23 CPI that could deliver 300K-1M+ installs annually.',
  },

  // 3-month scale plan
  threeMonthPlan: {
    month1: {
      title: 'Pilot — Prove the Model',
      creators: 10,
      markets: ['Vietnam', 'Indonesia', 'Thailand', 'Philippines'],
      expectedInstalls: '34,000-87,000',
      budget: '$3,340-$7,700 AUD',
      kpis: ['CPI < $0.25', 'D7 retention > 12%', 'Promo code redemption > 50%'],
    },
    month2: {
      title: 'Optimize & Expand',
      creators: 15,
      markets: ['Vietnam', 'Indonesia', 'Thailand', 'Philippines', 'Malaysia'],
      expectedInstalls: '50,000-130,000',
      budget: '$5,000-$12,000 AUD',
      kpis: ['CPI < $0.20', 'Identify top 3 performers', 'A/B test content formats'],
    },
    month3: {
      title: 'Scale Winners',
      creators: 20,
      markets: ['All SEA', 'India (test)', 'LATAM (test)'],
      expectedInstalls: '80,000-200,000',
      budget: '$8,000-$20,000 AUD',
      kpis: ['Sustained CPI < $0.20', 'ROAS > 3x', 'Tim\\'s revenue up 20%+ from creator cohort'],
    },
  },
}

// ─── P1 SIM RIGS (NEIL) ──────────────────────────────

export const P1_REVENUE_MODEL = {
  // Known data points
  known: {
    productRange: 'Sim racing rigs + flight sim configurations',
    priceRange: {
      entry: { price: 800, currency: 'AUD', product: 'Basic frame/cockpit' },
      mid: { price: 2500, currency: 'AUD', product: 'Full rig with wheel mount, seat, pedal plate' },
      premium: { price: 5000, currency: 'AUD', product: 'Triple monitor rig, flight sim config with HOTAS mounts' },
      ultimate: { price: 15000, currency: 'AUD', product: 'Full turnkey with peripherals, direct drive, motion' },
      custom: { price: 55000, currency: 'AUD', product: 'Ultimate custom build (P1 Ultimate Turnkey reference: $54,999 USD)' },
    },
    salesChannel: 'E-commerce (Shopify), direct sales for custom builds',
    market: 'Australia + NZ primarily, growing international',
  },

  // Revenue modelling
  projectedScenarios: {
    conservative: {
      assumption: '5 rig sales/month avg at $2,500 AOV',
      monthlyRevenue: 12500,
      annualRevenue: 150000,
      currency: 'AUD',
    },
    moderate: {
      assumption: '10 rig sales/month avg at $3,500 AOV (mix of mid+premium)',
      monthlyRevenue: 35000,
      annualRevenue: 420000,
      currency: 'AUD',
    },
    aggressive: {
      assumption: '15 rig sales/month at $4,000 AOV + 2 custom builds/quarter at $15K',
      monthlyRevenue: 70000,
      annualRevenue: 840000,
      currency: 'AUD',
    },
  },

  // Our focus: HIGH-VALUE rigs (flight sim + dream builds)
  strategyFocus: {
    why: 'Higher AOV = higher commission per sale. One $5K flight sim rig sale = 10x the commission of an entry rig.',
    targetProducts: ['Flight sim configurations ($3,000-$15,000)', 'Racing sim dream builds ($5,000-$15,000)', 'Custom turnkey ($15,000+)'],
    targetAudience: ['DCS players (like Jacob)', 'Flight sim enthusiasts', 'Sim racing hobbyists with budget', 'Content creators building streaming rigs'],
    affiliateModel: {
      commissionRate: '5-10% on referred sales (industry standard for hardware affiliates)',
      perSaleLow: 150, // 5% on $3K rig
      perSaleMid: 500, // 10% on $5K rig
      perSaleHigh: 1500, // 10% on $15K rig
      currency: 'AUD',
    },
  },

  // What good looks like for Neil
  successMetrics: {
    month1: '2-3 attributed rig sales from Jacob\\'s content (est $5K-$15K revenue for Neil)',
    month3: '5-10 rig sales/month from creator content (est $15K-$50K/month)',
    month6: '10-20 rig sales/month + repeat purchases (peripherals, upgrades)',
    annual: 'Creator channel drives 30-50% of online sales ($150K-$400K attributed)',
  },

  // Discovery questions for Neil
  discoveryQuestions: [
    'What is your average order value? (helps us target the right rig tier)',
    'How many rigs do you sell per month currently?',
    'What is your best-selling product? (racing or flight sim?)',
    'What is your profit margin per rig? (helps size affiliate commission)',
    'Do you have repeat customers? (peripherals, upgrades = LTV play)',
    'What is your current marketing spend? (tells us budget context)',
    'Which rig configuration would you want Jacob to feature? (flight sim dream build?)',
    'Are you open to a 10% affiliate commission on referred sales?',
    'Can you set up a Shopify webhook for conversion tracking?',
    'What does the flight sim rig config cost? (HOTAS, pedals, MFDs, frame)',
  ],

  // Our recommendation: focus on expensive rigs
  recommendation: `
Focus creator campaigns on flight sim and premium racing rigs ($3,000-$15,000+).
NOT entry-level. Here's why:

1. Higher AOV = higher commission per sale (10% of $5K = $500 vs 10% of $800 = $80)
2. Flight sim audience (DCS players) are HIGH-INTENT buyers — they already spend $1K+ on HOTAS/peripherals
3. Jacob's military aviation expertise makes the flight sim content uniquely credible
4. Less price-sensitive audience — they're buying a dream rig, not comparison shopping
5. Content lasts forever — a rig review video keeps selling for 2-3 years on YouTube
6. Sim racing dream builds = aspirational content that drives engagement + saves for later purchase

The media strategy: Jacob produces ONE killer flight sim rig video → drives ongoing sales for months.
Then we add racing sim creators (Boosted Media, SAMMIT) for the racing rig side.
  `,
}

export type RevenueModel = typeof ROADBURN_REVENUE_MODEL | typeof P1_REVENUE_MODEL
