/**
 * Market Trends Engine
 * 
 * Aggregates data on where money is flowing in gaming influencer marketing.
 * Tracks top spending brands, campaign types, platform splits, and seasonal patterns.
 * 
 * Data sources:
 * - Internal campaign data (our own Firestore campaigns)
 * - YouTube trending gaming content (YouTube Data API)
 * - Twitch top categories and streams (Twitch Helix API)
 * - Industry benchmarks (hardcoded from industry reports, updated quarterly)
 */

export interface MarketTrend {
  id: string
  category: string // 'BRAND_SPEND' | 'PLATFORM_GROWTH' | 'CAMPAIGN_TYPE' | 'MARKET_SIZE'
  title: string
  value: string
  change: number // percentage change
  changeDirection: 'UP' | 'DOWN' | 'STABLE'
  period: string // 'Q2 2026', 'May 2026'
  source: string
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface TopSpender {
  rank: number
  brand: string
  industry: string
  estimatedSpend: string // '$500K-$1M'
  platforms: string[] // ['YouTube', 'Twitch']
  campaignTypes: string[] // ['Sponsored Stream', 'Video Integration']
  markets: string[] // ['Global', 'APAC']
  frequency: string // 'Monthly', 'Quarterly'
  opportunity: string // why Mobileyes should target them
}

export interface PlatformTrend {
  platform: string
  monthlyActiveCreators: number
  avgCPM: number // cost per mille (1000 views)
  avgSponsorshipRate: string // '$500-$2000 per stream hour'
  growthRate: number // % YoY
  topCategories: string[]
  bestFor: string // 'Live engagement', 'VOD reach'
  mobileyesOpportunity: string
}

export interface CampaignTypeTrend {
  type: string
  marketShare: number // % of total influencer spend
  avgBudget: string
  avgROAS: string
  growthRate: number
  bestPlatforms: string[]
  description: string
}

export interface SeasonalPattern {
  month: string
  monthIndex: number
  spendLevel: 'PEAK' | 'HIGH' | 'MEDIUM' | 'LOW'
  drivers: string[] // what drives spend this month
  opportunities: string[]
}

// ─── INDUSTRY BENCHMARKS (Updated Q2 2026) ────────────

export const GAMING_INFLUENCER_MARKET = {
  globalMarketSize: '$4.8B',
  apacMarketSize: '$1.2B',
  australiaMarketSize: '$180M',
  yoyGrowth: 28,
  avgCampaignBudget: '$15,000-$50,000',
  avgCreatorRate: {
    youtube: { micro: '$500-$2,000', mid: '$2,000-$10,000', macro: '$10,000-$50,000' },
    twitch: { micro: '$200-$1,000/hr', mid: '$1,000-$5,000/hr', macro: '$5,000-$20,000/hr' },
    kick: { micro: '$150-$800/hr', mid: '$800-$3,000/hr', macro: '$3,000-$15,000/hr' },
    tiktok: { micro: '$300-$1,500', mid: '$1,500-$8,000', macro: '$8,000-$40,000' },
  },
}

export const TOP_SPENDING_BRANDS: TopSpender[] = [
  { rank: 1, brand: 'Scopely (Monopoly GO)', industry: 'Mobile Gaming', estimatedSpend: '$50M+', platforms: ['YouTube', 'TikTok', 'Twitch'], campaignTypes: ['Sponsored Video', 'Live Stream', 'Short-form'], markets: ['Global'], frequency: 'Continuous', opportunity: 'Massive budget, always looking for new creators. APAC expansion underway.' },
  { rank: 2, brand: 'Supercell (Squad Busters / Brawl Stars)', industry: 'Mobile Gaming', estimatedSpend: '$30M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'Challenge/UGC'], markets: ['Global'], frequency: 'Around updates/launches', opportunity: 'Strong in ANZ market. New game launches = big campaign windows.' },
  { rank: 3, brand: 'miHoYo / HoYoverse (Genshin Impact / Honkai / ZZZ)', industry: 'Mobile/PC Gaming', estimatedSpend: '$25M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Sponsored Stream', 'Video Integration', 'Event Coverage'], markets: ['Global', 'APAC'], frequency: 'Every major update (6-week cycle)', opportunity: 'Huge APAC presence. Regular campaign cadence = predictable revenue.' },
  { rank: 4, brand: 'Riot Games (Valorant / LoL / TFT)', industry: 'PC Gaming / Esports', estimatedSpend: '$20M+', platforms: ['Twitch', 'YouTube'], campaignTypes: ['Sponsored Stream', 'Tournament Coverage', 'Skin Reveals'], markets: ['Global', 'APAC'], frequency: 'Seasonal (Acts/Patches)', opportunity: 'Strong esports angle. ANZ Valorant scene growing rapidly.' },
  { rank: 5, brand: 'Epic Games (Fortnite / Rocket League)', industry: 'PC/Console Gaming', estimatedSpend: '$20M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Sponsored Stream', 'Event Coverage', 'Creator Codes'], markets: ['Global'], frequency: 'Seasonal + Events', opportunity: 'Creator code program = easy entry. Season launches are key windows.' },
  { rank: 6, brand: 'Krafton (PUBG Mobile / BGMI)', industry: 'Mobile Gaming', estimatedSpend: '$15M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'Tournament', 'Live Stream'], markets: ['APAC', 'SEA'], frequency: 'Monthly updates', opportunity: 'Dominant in SEA/Vietnam. Perfect for our APAC creators.' },
  { rank: 7, brand: 'Garena (Free Fire)', industry: 'Mobile Gaming', estimatedSpend: '$12M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'Live Stream', 'UGC'], markets: ['SEA', 'LATAM', 'APAC'], frequency: 'Bi-weekly', opportunity: 'Massive in Vietnam/Thailand. High volume, lower CPM but consistent.' },
  { rank: 8, brand: 'Activision / King (Call of Duty / Candy Crush)', industry: 'Mobile/Console Gaming', estimatedSpend: '$10M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Sponsored Stream', 'Video Integration', 'Season Launch'], markets: ['Global'], frequency: 'Seasonal', opportunity: 'Season launches every 6 weeks. FPS creators are our strongest vertical.' },
  { rank: 9, brand: 'NetEase (Marvel Rivals / Naraka / Identity V)', industry: 'PC/Mobile Gaming', estimatedSpend: '$8M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Sponsored Stream', 'Early Access', 'Review'], markets: ['Global', 'APAC'], frequency: 'Around launches/updates', opportunity: 'Aggressive marketing spend. New titles launching regularly.' },
  { rank: 10, brand: 'Level Infinite / Tencent (PUBG PC / Arena Breakout)', industry: 'PC/Mobile Gaming', estimatedSpend: '$8M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Sponsored Stream', 'Early Access'], markets: ['Global'], frequency: 'Launch windows', opportunity: 'Tencent-backed. Big budgets for new title launches.' },
  { rank: 11, brand: 'EA Sports (FC / Madden / UFC)', industry: 'Sports Gaming', estimatedSpend: '$15M+', platforms: ['YouTube', 'TikTok', 'Twitch'], campaignTypes: ['Sponsored Video', 'Early Access', 'Tournament'], markets: ['Global'], frequency: 'Annual launches + updates', opportunity: 'Massive annual launch cycles. Sports gaming creators = underserved niche.' },
  { rank: 12, brand: 'Take-Two / 2K / Rockstar', industry: 'Publisher', estimatedSpend: '$15M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Early Access', 'Sponsored Stream', 'Event'], markets: ['Global'], frequency: 'Around launches', opportunity: 'GTA VI hype cycle. NBA 2K annual. Massive budgets when active.' },
  { rank: 13, brand: 'Logitech G', industry: 'Gaming Hardware', estimatedSpend: '$10M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Product Integration', 'Sponsored Stream', 'Review'], markets: ['Global'], frequency: 'Continuous + launches', opportunity: 'Massive hardware brand. Always sponsoring creators. Easy to pitch our roster.' },
  { rank: 14, brand: 'Razer', industry: 'Gaming Hardware', estimatedSpend: '$8M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Product Integration', 'Sponsored Stream', 'Lifestyle'], markets: ['Global', 'APAC'], frequency: 'Continuous', opportunity: 'Strong APAC presence. Razer HQ in Singapore. Natural fit for our region.' },
  { rank: 15, brand: 'SteelSeries', industry: 'Gaming Hardware', estimatedSpend: '$3M-$5M', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Product Review', 'Sponsored Stream'], markets: ['Global'], frequency: 'Product launches', opportunity: 'Mid-tier hardware. More accessible budgets. Good for mid-tier creators.' },
  { rank: 16, brand: 'HyperX (HP)', industry: 'Gaming Hardware', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Product Integration', 'Esports', 'Lifestyle'], markets: ['Global'], frequency: 'Continuous', opportunity: 'HP-backed budget. Strong esports presence. Good for FPS/competitive creators.' },
  { rank: 17, brand: 'Plarium (Raid: Shadow Legends)', industry: 'Mobile Gaming', estimatedSpend: '$20M+', platforms: ['YouTube'], campaignTypes: ['Video Integration', 'Sponsored Segment'], markets: ['Global'], frequency: 'Continuous', opportunity: 'One of the biggest YouTube sponsors ever. Always buying integrations. Easy money.' },
  { rank: 18, brand: 'PlayStation (Sony Interactive)', industry: 'Platform / Console', estimatedSpend: '$20M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Exclusive Access', 'Review', 'Sponsored Stream'], markets: ['Global', 'ANZ'], frequency: 'Around exclusives', opportunity: 'PlayStation ANZ team accessible. First-party exclusives = premium campaigns.' },
  { rank: 19, brand: 'Xbox / Microsoft Gaming', industry: 'Platform / Console', estimatedSpend: '$20M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Game Pass Promo', 'Exclusive Access', 'Sponsored Stream'], markets: ['Global', 'ANZ'], frequency: 'Continuous (Game Pass)', opportunity: 'Game Pass = always-on campaign. Xbox ANZ team in Sydney.' },
  { rank: 20, brand: 'Nintendo', industry: 'Platform / Console', estimatedSpend: '$10M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'Review', 'Event Coverage'], markets: ['Global', 'ANZ'], frequency: 'Around launches', opportunity: 'Switch 2 launch 2025/26 = massive campaign window. Nintendo ANZ in Melbourne.' },
  { rank: 21, brand: 'Bandai Namco', industry: 'Publisher', estimatedSpend: '$8M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Sponsored Stream', 'Early Access', 'Review'], markets: ['Global', 'APAC'], frequency: 'Around launches', opportunity: 'Strong ANZ presence. Anime gaming crossover. Dragon Ball, Tekken, Elden Ring.' },
  { rank: 22, brand: 'Square Enix', industry: 'Publisher', estimatedSpend: '$8M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Early Access', 'Review', 'Sponsored Stream'], markets: ['Global', 'APAC'], frequency: 'Around launches', opportunity: 'Final Fantasy, Dragon Quest. Strong JRPG creator vertical.' },
  { rank: 23, brand: 'Ubisoft', industry: 'Publisher', estimatedSpend: '$10M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Sponsored Stream', 'Early Access', 'UGC'], markets: ['Global', 'ANZ'], frequency: 'Around launches', opportunity: 'Ubisoft ANZ office. Assassin\'s Creed, Far Cry, Rainbow Six.' },
  { rank: 24, brand: 'SEGA', industry: 'Publisher', estimatedSpend: '$5M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'Review', 'Nostalgia Content'], markets: ['Global', 'APAC'], frequency: 'Around launches', opportunity: 'Sonic, Yakuza/Like a Dragon, Total War. Diverse creator appeal.' },
  { rank: 25, brand: 'Capcom', industry: 'Publisher', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Early Access', 'Sponsored Stream', 'Review'], markets: ['Global'], frequency: 'Around launches', opportunity: 'Monster Hunter, Resident Evil, Street Fighter. Strong streaming games.' },
  { rank: 26, brand: 'NordVPN / Surfshark', industry: 'Tech / VPN', estimatedSpend: '$20M+', platforms: ['YouTube'], campaignTypes: ['Video Integration', 'Sponsored Segment'], markets: ['Global'], frequency: 'Continuous', opportunity: 'Biggest YouTube sponsor category. Always buying. Gaming creators = perfect fit.' },
  { rank: 27, brand: 'Valve (Steam / Dota / CS2)', industry: 'Platform / Developer', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Tournament', 'Event Coverage', 'Steam Sale'], markets: ['Global'], frequency: 'Events + Sales', opportunity: 'Steam sales = content opportunity. CS2/Dota majors = event coverage.' },
  { rank: 28, brand: 'Amazon Games (New World / Throne)', industry: 'Publisher', estimatedSpend: '$8M+', platforms: ['Twitch', 'YouTube'], campaignTypes: ['Sponsored Stream', 'Twitch Drops', 'Early Access'], markets: ['Global'], frequency: 'Around launches', opportunity: 'Twitch integration = natural fit. Twitch Drops campaigns are huge.' },
  { rank: 29, brand: 'Nexon', industry: 'Mobile/PC Gaming', estimatedSpend: '$5M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'Live Stream'], markets: ['APAC', 'Global'], frequency: 'Updates + launches', opportunity: 'MapleStory, Blue Archive, The First Descendant. Strong APAC presence.' },
  { rank: 30, brand: 'NCSoft / NCWEST', industry: 'PC/Mobile Gaming', estimatedSpend: '$3M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Sponsored Stream', 'Early Access'], markets: ['Global', 'APAC'], frequency: 'Around launches', opportunity: 'Throne and Liberty, Lineage. MMO creator vertical.' },
  { rank: 31, brand: 'Wargaming (World of Tanks / Warships)', industry: 'PC/Mobile Gaming', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Sponsored Stream', 'Video Integration', 'Event'], markets: ['Global', 'ANZ'], frequency: 'Continuous', opportunity: 'ANZ office in Sydney. Always running creator campaigns. Military/sim niche.' },
  { rank: 32, brand: 'Pocket Gems / Playrix', industry: 'Casual/Puzzle Gaming', estimatedSpend: '$5M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'UGC'], markets: ['Global'], frequency: 'Continuous', opportunity: 'Casual gaming sponsors. Different creator pool but high volume, easy campaigns.' },
  { rank: 33, brand: 'Lilith Games (AFK Arena / Dislyte)', industry: 'Mobile Gaming', estimatedSpend: '$8M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'UGC'], markets: ['Global'], frequency: 'Continuous', opportunity: 'Chinese publisher with global ambitions. High volume campaigns.' },
  { rank: 34, brand: 'Moonton (Mobile Legends)', industry: 'Mobile Gaming', estimatedSpend: '$5M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'Tournament', 'Live Stream'], markets: ['SEA', 'APAC'], frequency: 'Continuous', opportunity: 'Dominant MOBA in SEA. Perfect for our Vietnamese/Thai creators.' },
  { rank: 35, brand: 'VNG Games', industry: 'Mobile Gaming', estimatedSpend: '$3M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'Live Stream'], markets: ['Vietnam', 'SEA'], frequency: 'Monthly', opportunity: 'Vietnamese publisher. Direct relationship opportunity for our VN creators.' },
  { rank: 36, brand: 'Corsair / Elgato', industry: 'Gaming Hardware / Streaming', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Product Integration', 'Setup Tour', 'Review'], markets: ['Global'], frequency: 'Continuous + launches', opportunity: 'Every streamer needs gear. Elgato = streaming equipment. Natural creator partnerships.' },
  { rank: 37, brand: 'Secretlab', industry: 'Gaming Furniture', estimatedSpend: '$3M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Product Integration', 'Affiliate', 'Setup Tour'], markets: ['Global', 'APAC'], frequency: 'Continuous', opportunity: 'Singapore-based. APAC brand. Every creator needs a chair. Easy integration.' },
  { rank: 38, brand: 'G FUEL / Gaming Energy', industry: 'Gaming Lifestyle / F&B', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Sponsored Stream', 'Product Integration', 'Creator Codes'], markets: ['Global'], frequency: 'Continuous', opportunity: 'Always sponsoring. Creator codes = easy attribution. Low barrier to entry.' },
  { rank: 39, brand: 'Konami (eFootball / Yu-Gi-Oh / Metal Gear)', industry: 'Publisher', estimatedSpend: '$5M+', platforms: ['YouTube', 'TikTok'], campaignTypes: ['Sponsored Video', 'Tournament'], markets: ['Global', 'APAC'], frequency: 'Around updates', opportunity: 'eFootball free-to-play = always marketing. Yu-Gi-Oh crossover audience.' },
  { rank: 40, brand: 'Opera GX', industry: 'Tech / Browser', estimatedSpend: '$10M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Video Integration', 'Sponsored Stream'], markets: ['Global'], frequency: 'Continuous', opportunity: 'Gaming browser. Heavy YouTube/Twitch spend. Always looking for gaming creators.' },
  { rank: 41, brand: 'Devolver Digital / Coffee Stain', industry: 'Indie Publisher', estimatedSpend: '$1M-$3M', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Early Access', 'Review', 'Sponsored Stream'], markets: ['Global'], frequency: 'Around launches', opportunity: 'Indie darlings. Lower budgets but great for building relationships. Cult followings.' },
  { rank: 42, brand: 'Warner Bros Games (Hogwarts / Mortal Kombat)', industry: 'Publisher', estimatedSpend: '$8M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Early Access', 'Sponsored Stream', 'Event'], markets: ['Global'], frequency: 'Around launches', opportunity: 'IP-driven campaigns. Harry Potter, DC, Mortal Kombat. Massive reach when active.' },
  { rank: 43, brand: 'Innogames (Forge of Empires / Elvenar)', industry: 'Mobile/Browser Gaming', estimatedSpend: '$3M+', platforms: ['YouTube'], campaignTypes: ['Video Integration', 'Sponsored Segment'], markets: ['Global'], frequency: 'Continuous', opportunity: 'Always buying YouTube integrations. Reliable, recurring revenue.' },
  { rank: 44, brand: 'Samsung Gaming', industry: 'Tech / Displays', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Product Integration', 'Setup Tour', 'Review'], markets: ['Global', 'APAC'], frequency: 'Product launches', opportunity: 'Gaming monitors, phones. Samsung ANZ accessible. Tech + gaming crossover.' },
  { rank: 45, brand: 'ASUS ROG', industry: 'Gaming Hardware', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Product Review', 'Sponsored Stream', 'Setup Tour'], markets: ['Global', 'APAC'], frequency: 'Product launches', opportunity: 'Republic of Gamers. Strong APAC brand. Laptops, monitors, peripherals.' },
  { rank: 46, brand: 'MSI Gaming', industry: 'Gaming Hardware', estimatedSpend: '$3M+', platforms: ['YouTube'], campaignTypes: ['Product Review', 'Sponsored Video'], markets: ['Global', 'APAC'], frequency: 'Product launches', opportunity: 'Laptops, GPUs, monitors. APAC HQ. Accessible marketing team.' },
  { rank: 47, brand: 'Alienware / Dell Gaming', industry: 'Gaming Hardware', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Product Integration', 'Sponsored Stream', 'Review'], markets: ['Global'], frequency: 'Product launches', opportunity: 'Premium gaming PCs. Dell ANZ office. High-value sponsorships.' },
  { rank: 48, brand: 'DoorDash / Uber Eats (Gaming Promos)', industry: 'Food Delivery / Lifestyle', estimatedSpend: '$3M+ (gaming segment)', platforms: ['Twitch', 'YouTube'], campaignTypes: ['Sponsored Stream', 'Promo Code', 'Live Integration'], markets: ['ANZ', 'Global'], frequency: 'Promotional periods', opportunity: 'Food delivery brands love gaming audiences. Easy promo code attribution.' },
  { rank: 49, brand: 'Smilegate (CrossFire / Lost Ark)', industry: 'PC/Mobile Gaming', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch'], campaignTypes: ['Sponsored Stream', 'Early Access'], markets: ['Global', 'APAC'], frequency: 'Around launches', opportunity: 'Korean publisher. Lost Ark updates = campaign windows. Strong APAC presence.' },
  { rank: 50, brand: 'Monster Energy Gaming', industry: 'Gaming Lifestyle / F&B', estimatedSpend: '$5M+', platforms: ['YouTube', 'Twitch', 'TikTok'], campaignTypes: ['Sponsored Stream', 'Event Activation', 'Creator Codes'], markets: ['Global', 'ANZ'], frequency: 'Continuous + events', opportunity: 'Monster ANZ active in gaming. Event activations at PAX/Supernova. Creator codes.' },
]

export const PLATFORM_TRENDS: PlatformTrend[] = [
  {
    platform: 'YouTube',
    monthlyActiveCreators: 2400000,
    avgCPM: 12.5,
    avgSponsorshipRate: '$2,000-$15,000 per video',
    growthRate: 15,
    topCategories: ['Gaming', 'Let\'s Play', 'Reviews', 'Shorts'],
    bestFor: 'VOD reach, evergreen content, SEO discovery',
    mobileyesOpportunity: 'Highest CPM, best for performance campaigns with trackable links',
  },
  {
    platform: 'Twitch',
    monthlyActiveCreators: 350000,
    avgCPM: 8.5,
    avgSponsorshipRate: '$500-$5,000 per stream hour',
    growthRate: -5,
    topCategories: ['Just Chatting', 'Valorant', 'Fortnite', 'League of Legends'],
    bestFor: 'Live engagement, real-time interaction, community building',
    mobileyesOpportunity: 'Declining slightly but still dominant for live. Lower rates = better margins.',
  },
  {
    platform: 'Kick',
    monthlyActiveCreators: 45000,
    avgCPM: 6.0,
    avgSponsorshipRate: '$300-$3,000 per stream hour',
    growthRate: 85,
    topCategories: ['Slots', 'Gaming', 'Just Chatting', 'IRL'],
    bestFor: 'Younger audience, less saturated, higher engagement rates',
    mobileyesOpportunity: 'Fastest growing. Early mover advantage. Brands starting to explore.',
  },
  {
    platform: 'TikTok',
    monthlyActiveCreators: 5000000,
    avgCPM: 10.0,
    avgSponsorshipRate: '$500-$8,000 per video',
    growthRate: 25,
    topCategories: ['Gaming Clips', 'Reviews', 'Challenges', 'Tutorials'],
    bestFor: 'Viral reach, younger demographics, short-form discovery',
    mobileyesOpportunity: 'Massive reach but harder to attribute. Best for awareness campaigns.',
  },
]

export const CAMPAIGN_TYPE_TRENDS: CampaignTypeTrend[] = [
  {
    type: 'Sponsored Live Stream',
    marketShare: 35,
    avgBudget: '$5,000-$25,000',
    avgROAS: '3.2x',
    growthRate: 20,
    bestPlatforms: ['Twitch', 'YouTube', 'Kick'],
    description: 'Creator plays/showcases game live with sponsored segment. Highest engagement.',
  },
  {
    type: 'Dedicated Video',
    marketShare: 25,
    avgBudget: '$3,000-$50,000',
    avgROAS: '4.1x',
    growthRate: 10,
    bestPlatforms: ['YouTube'],
    description: 'Full video dedicated to the game/product. Best for SEO and evergreen reach.',
  },
  {
    type: 'Video Integration',
    marketShare: 20,
    avgBudget: '$1,500-$15,000',
    avgROAS: '2.8x',
    growthRate: 5,
    bestPlatforms: ['YouTube'],
    description: '30-90 second sponsored segment within existing content. Cost-effective.',
  },
  {
    type: 'Short-form / UGC',
    marketShare: 12,
    avgBudget: '$500-$5,000',
    avgROAS: '2.1x',
    growthRate: 45,
    bestPlatforms: ['TikTok', 'YouTube Shorts', 'Instagram Reels'],
    description: 'Short clips, challenges, trends. Fastest growing format. Volume play.',
  },
  {
    type: 'Performance / CPI',
    marketShare: 8,
    avgBudget: '$10,000-$100,000',
    avgROAS: '5.5x',
    growthRate: 30,
    bestPlatforms: ['YouTube', 'TikTok'],
    description: 'Pay-per-install model. Highest ROI but requires attribution setup (AppsFlyer/Adjust).',
  },
]

export const SEASONAL_PATTERNS: SeasonalPattern[] = [
  { month: 'January', monthIndex: 0, spendLevel: 'LOW', drivers: ['Post-holiday cooldown', 'Budget planning'], opportunities: ['Lock in Q1 contracts early', 'Pitch annual deals'] },
  { month: 'February', monthIndex: 1, spendLevel: 'MEDIUM', drivers: ['New game announcements', 'Valentine\'s events'], opportunities: ['Mobile game Valentine events', 'Pre-GDC outreach'] },
  { month: 'March', monthIndex: 2, spendLevel: 'HIGH', drivers: ['GDC announcements', 'Q1 game launches', 'End of fiscal year (JP)'], opportunities: ['GDC game reveals = immediate campaigns', 'Japanese publishers spending before FY end'] },
  { month: 'April', monthIndex: 3, spendLevel: 'MEDIUM', drivers: ['Spring updates', 'Battle pass seasons'], opportunities: ['Season launch campaigns', 'Mid-tier brand outreach'] },
  { month: 'May', monthIndex: 4, spendLevel: 'HIGH', drivers: ['Summer Game Fest prep', 'E3 era announcements'], opportunities: ['Pre-summer campaign bookings', 'Event coverage deals'] },
  { month: 'June', monthIndex: 5, spendLevel: 'PEAK', drivers: ['Summer Game Fest', 'Xbox Showcase', 'Major game reveals'], opportunities: ['PEAK SEASON: Every publisher spending', 'Event coverage + first-look campaigns'] },
  { month: 'July', monthIndex: 6, spendLevel: 'HIGH', drivers: ['Summer sales', 'Mid-year game launches'], opportunities: ['Steam Summer Sale tie-ins', 'Back-to-school mobile campaigns (APAC)'] },
  { month: 'August', monthIndex: 7, spendLevel: 'HIGH', drivers: ['Gamescom', 'Pre-holiday game reveals'], opportunities: ['Gamescom coverage', 'Holiday season campaign planning starts'] },
  { month: 'September', monthIndex: 8, spendLevel: 'PEAK', drivers: ['Major AAA launches', 'Tokyo Game Show', 'Holiday campaign kickoff'], opportunities: ['PEAK SEASON: AAA launches + holiday prep', 'TGS coverage for APAC brands'] },
  { month: 'October', monthIndex: 9, spendLevel: 'PEAK', drivers: ['AAA launch window', 'Halloween events', 'Holiday pre-orders'], opportunities: ['PEAK SEASON: Biggest launch month', 'Halloween gaming events'] },
  { month: 'November', monthIndex: 10, spendLevel: 'HIGH', drivers: ['Black Friday', 'Holiday shopping', 'Game Awards prep'], opportunities: ['Black Friday/Cyber Monday campaigns', 'Gift guide content'] },
  { month: 'December', monthIndex: 11, spendLevel: 'MEDIUM', drivers: ['Game Awards', 'Holiday content', 'Year-end wrap-ups'], opportunities: ['Game Awards coverage', 'Year-in-review content', 'Lock in January contracts'] },
]

// ─── LIVE DATA FUNCTIONS ──────────────────────────────

/**
 * Get trending gaming categories from YouTube
 */
export async function getYouTubeTrendingGaming(): Promise<Array<{ title: string; viewCount: number; channelTitle: string }>> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey || apiKey === 'PLACEHOLDER') return []

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&videoCategoryId=20&regionCode=AU&maxResults=10&key=${apiKey}`
    )
    if (!response.ok) return []
    const data = await response.json()

    return (data.items ?? []).map((item: any) => ({
      title: item.snippet.title,
      viewCount: parseInt(item.statistics.viewCount ?? '0', 10),
      channelTitle: item.snippet.channelTitle,
    }))
  } catch {
    return []
  }
}

/**
 * Get top Twitch categories (games being streamed right now)
 */
export async function getTwitchTopGames(): Promise<Array<{ name: string; viewers: number }>> {
  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET
  if (!clientId || clientId === 'PLACEHOLDER' || !clientSecret) return []

  try {
    // Get token
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: 'client_credentials' }),
    })
    if (!tokenResponse.ok) return []
    const { access_token } = await tokenResponse.json()

    // Get top games
    const gamesResponse = await fetch('https://api.twitch.tv/helix/games/top?first=15', {
      headers: { 'Authorization': `Bearer ${access_token}`, 'Client-Id': clientId },
    })
    if (!gamesResponse.ok) return []
    const gamesData = await gamesResponse.json()

    // Get viewer counts via streams
    const results: Array<{ name: string; viewers: number }> = []
    for (const game of gamesData.data ?? []) {
      const streamsResponse = await fetch(
        `https://api.twitch.tv/helix/streams?game_id=${game.id}&first=1`,
        { headers: { 'Authorization': `Bearer ${access_token}`, 'Client-Id': clientId } }
      )
      if (streamsResponse.ok) {
        const streamsData = await streamsResponse.json()
        const totalViewers = streamsData.data?.reduce((sum: number, s: any) => sum + (s.viewer_count ?? 0), 0) ?? 0
        results.push({ name: game.name, viewers: totalViewers })
      }
    }

    return results
  } catch {
    return []
  }
}
