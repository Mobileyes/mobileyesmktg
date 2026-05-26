/**
 * MOBILEYES AGENTIC INTELLIGENCE SYSTEM
 * 
 * A suite of specialised AI agents that power outreach, market intelligence,
 * and campaign planning for both Mobileyes (talent) and Gamefluence (performance).
 * 
 * AGENTS:
 * 
 * 1. MARKET INTELLIGENCE AGENT
 *    - Ingests StreamCharts, StreamElements, Sensor Tower data
 *    - Identifies which brands are spending, where, and with whom
 *    - Tracks campaign seasonality and timing patterns
 *    - Monitors new game launches and product releases
 * 
 * 2. OUTREACH AGENT (Marketing)
 *    - Generates personalised outreach powered by real-time insights
 *    - Uses download data, revenue, ROAS, LTV to show value proposition
 *    - Identifies decision makers and optimal contact timing
 *    - Tracks outreach pipeline and response rates
 * 
 * 3. FINANCE AGENT (CFO lens)
 *    - Identifies where agents should spend time (highest ROI opportunities)
 *    - Tracks brand budgets, seasonal patterns, recurring campaigns
 *    - Calculates potential commission and revenue per opportunity
 *    - Prioritises pipeline by expected value
 * 
 * 4. CREATOR MATCHING AGENT (CPO lens)
 *    - Matches creators to brand opportunities based on audience overlap
 *    - Scores fit using engagement, audience geo, content niche, brand safety
 *    - Generates pitch decks with performance data
 *    - Identifies gaps in roster (markets/genres we need more creators for)
 * 
 * 5. COMPETITIVE INTELLIGENCE AGENT (CISO/Strategy lens)
 *    - Tracks competitor agencies and their creator rosters
 *    - Monitors market share by region and category
 *    - Identifies underserved niches and first-mover opportunities
 *    - Alerts on competitive threats
 * 
 * DATA SOURCES:
 * - StreamCharts (streamcharts.com) — brand sponsorships, top streamers, hours watched
 * - StreamElements — leaderboards, live data, trending categories
 * - Sensor Tower — app downloads, revenue, ad spend, top advertisers
 * - Social Blade — growth trends, audience authenticity
 * - Facebook Ad Library — active ad campaigns
 * - TikTok Creative Center — branded content
 * - LinkedIn — decision makers, agency relationships
 * - App Store / Google Play — new releases, updates
 */

export type AgentType = 
  | 'MARKET_INTELLIGENCE'
  | 'OUTREACH'
  | 'FINANCE'
  | 'CREATOR_MATCHING'
  | 'COMPETITIVE_INTELLIGENCE'

export interface AgentInsight {
  id: string
  agentType: AgentType
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  title: string
  summary: string
  details: string
  actionRequired: boolean
  suggestedAction: string | null
  dataSource: string
  confidence: number // 0-100
  relevantBrands: string[]
  relevantCreators: string[]
  estimatedValue: number | null // AUD potential revenue
  timing: string | null // when to act
  createdAt: string
  expiresAt: string | null // some insights are time-sensitive
  status: 'NEW' | 'REVIEWED' | 'ACTIONED' | 'DISMISSED'
}

export interface AgentTask {
  id: string
  agentType: AgentType
  taskType: string
  status: 'QUEUED' | 'RUNNING' | 'COMPLETE' | 'FAILED'
  input: Record<string, unknown>
  output: Record<string, unknown> | null
  startedAt: string | null
  completedAt: string | null
  error: string | null
}

export interface OutreachMessage {
  id: string
  targetType: 'BRAND' | 'CREATOR' | 'AGENCY'
  targetName: string
  targetEmail: string | null
  targetLinkedIn: string | null
  subject: string
  body: string
  insightBasis: string // what data powered this message
  estimatedValue: number | null
  status: 'DRAFT' | 'APPROVED' | 'SENT' | 'RESPONDED' | 'CONVERTED'
  createdAt: string
  sentAt: string | null
}
