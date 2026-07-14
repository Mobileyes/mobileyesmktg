/**
 * MARKET CPI BENCHMARKS — Paid UA Baseline (2026)
 * 
 * Source: Adjust Gaming App Insights 2026, FoxData, Sensor Tower SEA Report
 * 
 * These are PAID UA rates (Meta/Google/TikTok ads).
 * Our creator campaigns deliver at a fraction of these costs.
 * The gap between paid UA CPI and our creator CPI = the value we deliver.
 * 
 * Used for: Tim pitch, campaign ROI modelling, Gamefluence Score benchmarks
 */

export const PAID_UA_CPI_BENCHMARKS = {
  // Global averages
  global: {
    blendedAvg: 0.56, // USD, Adjust 2026 (up 30% YoY)
    ios: { casual: 1.50, midcore: 4.90, racing: 2.80 },
    android: { casual: 0.80, midcore: 2.50, racing: 1.60 },
    source: 'Adjust Gaming App Insights 2026 + FoxData',
  },

  // By region (USD) — what Tim would pay via Meta/Google ads
  byRegion: {
    northAmerica: { avg: 4.90, racing: 3.50, casual: 2.20, note: 'Most expensive market globally' },
    australia: { avg: 3.20, racing: 2.50, casual: 1.80, note: 'ANZ premium — smaller market' },
    europe: { avg: 2.80, racing: 2.00, casual: 1.50, note: 'Western Europe' },
    vietnam: { avg: 0.35, racing: 0.25, casual: 0.15, note: 'Cheapest quality market in APAC' },
    indonesia: { avg: 0.45, racing: 0.30, casual: 0.20, note: 'Largest SEA market by downloads (870M in Q1 2025)' },
    thailand: { avg: 0.55, racing: 0.40, casual: 0.25, note: 'Growing market, good retention' },
    philippines: { avg: 0.40, racing: 0.30, casual: 0.20, note: 'English-speaking, high engagement' },
    india: { avg: 0.15, racing: 0.10, casual: 0.08, note: 'Ultra-cheap but lower LTV' },
    japan: { avg: 4.50, racing: 3.80, casual: 2.50, note: 'Premium market, high LTV' },
  },

  // Our creator campaign CPI vs paid UA
  comparison: {
    ourCPI: { low: 0.09, high: 0.23, currency: 'AUD', note: 'Gamefluence/Mobileyes creator campaigns' },
    vsPaidUASEA: { savingsPercent: '54-82%', note: 'vs $0.25-$0.55 paid UA in SEA markets' },
    vsPaidUAANZ: { savingsPercent: '91-96%', note: 'vs $1.80-$3.20 paid UA in Australia' },
    vsPaidUAGlobal: { savingsPercent: '77-84%', note: 'vs $0.56 global blended average' },
  },

  // Budget recommendation for Tim
  budgetRecommendation: {
    minimum: {
      monthly: 10000, currency: 'AUD',
      note: 'Minimum to run 10 creators/month across 4 markets and measure properly',
      expectedInstalls: '34,000-87,000/month',
      expectedCPI: '$0.09-$0.23',
    },
    recommended: {
      monthly: 20000, currency: 'AUD',
      note: '15-20 creators/month, expand to 5+ markets, A/B test content formats',
      expectedInstalls: '70,000-170,000/month',
      expectedCPI: '$0.12-$0.28',
    },
    scale: {
      monthly: 40000, currency: 'AUD',
      note: '30+ creators/month, all SEA + India test, always-on campaign',
      expectedInstalls: '150,000-350,000/month',
      expectedCPI: '$0.11-$0.27',
    },
    context: 'For comparison: $10K/month on Meta ads in SEA would deliver ~18,000-40,000 installs at $0.25-$0.55 CPI. Same budget via creators delivers 2-4x the volume at lower CPI with better retention.',
  },
}

// Tim drifting events relevant to Drift Runner activation
export const DRIFT_EVENTS_2026 = [
  {
    event: 'Drift Masters Round 1 — Vallelunga, Rome',
    date: 'TBD (2026 season)',
    relevance: 'Drift Runner features official Drift Masters. In-game event tie-in opportunity.',
    activation: 'Creator content around the round. Promo code tied to the event. In-app event banner.',
  },
  {
    event: 'Drift Masters Round 2 — Jarama, Madrid',
    date: 'TBD (2026 season)',
    relevance: 'Second round — momentum building. Good for "mid-season" campaign push.',
    activation: 'Creator challenge: beat the Jarama track time in Drift Runner. Leaderboard + promo code.',
  },
  {
    event: 'Drift Masters Finland — Ahvenisto',
    date: 'July 2026',
    relevance: 'Current event window. Could time creator content to align.',
    activation: 'Midnight sun drift content. Creators play Drift Runner with Finland track (if available).',
  },
  {
    event: 'Drift Masters Grand Finale — Warsaw (Red Bull)',
    date: 'Late 2026',
    relevance: 'BIGGEST event of the year. Red Bull involvement = massive reach.',
    activation: 'Major campaign push. All creators post around Grand Finale weekend. In-app event with exclusive car/skin. AppsFlyer OneLink for event-specific attribution.',
  },
  {
    event: 'Gumball 3000 — Miami to Mexico City',
    date: 'June 5-10, 2026',
    relevance: 'If Tim or Drift Runner has any Gumball connection. Car culture crossover audience.',
    activation: 'Content tie-in if theres a licensing angle. Otherwise use as inspiration for in-game event.',
  },
  {
    event: 'Summernats — Canberra',
    date: 'January 2027 (next edition)',
    relevance: 'Burnout Masters is the OFFICIAL Summernats game. Major activation window.',
    activation: 'Creator campaign timed to Summernats week. Promo codes. IRL × digital crossover. AppsFlyer OneLink with QR codes at the event.',
  },
  {
    event: 'GCAP — Melbourne',
    date: 'October 2026 (TBC)',
    relevance: 'Gamefluence Score launch. Tim case study presentation. Meltwater co-branded report.',
    activation: 'Present campaign results. Network with screen agencies. Potentially activate AppsFlyer OneLink demo at the event booth.',
  },
]

// AppsFlyer OneLink event activation strategy
export const ONELINK_EVENT_STRATEGY = {
  what: 'AppsFlyer OneLink creates smart links that route users to the right app store AND track attribution. Perfect for events.',
  howItWorks: [
    'Generate unique OneLink per event (e.g. onelink.mobileyes.live/summernats2027)',
    'QR code printed on signage/merch at the event',
    'Users scan → routes to App Store/Play Store → installs attributed to that event',
    'Promo code pre-loaded in the deep link → user gets bonus tokens on first launch',
    'Full funnel: scan → install → first open → token redemption → D7 retention all tracked',
  ],
  costToTim: 'Zero if he already has AppsFlyer. If not, basic plan is ~$500/month.',
  value: 'Proves IRL events drive digital installs. Essential for Summernats × Burnout Masters.',
}
