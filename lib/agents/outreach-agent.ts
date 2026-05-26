/**
 * OUTREACH AGENT (Marketing CMO Lens)
 * 
 * Generates personalised outreach messages powered by real-time market data.
 * Every message is backed by specific insights — download numbers, revenue data,
 * ROAS benchmarks, LTV potential — so the outreach shows immediate value.
 * 
 * For BRANDS: "Here's why our creators will drive results for your game"
 * For CREATORS: "Here's why joining Mobileyes will grow your career"
 * For AGENCIES: "Here's how we complement your existing roster"
 */

import type { OutreachMessage, AgentInsight } from './index'

// ─── BRAND OUTREACH ───────────────────────────────────

export interface BrandOutreachContext {
  brandName: string
  gameName: string | null
  // Sensor Tower / market data
  monthlyDownloads: number | null
  monthlyRevenue: number | null
  topMarkets: string[]
  currentAdSpend: number | null
  // StreamCharts data
  currentInfluencerSpend: boolean
  competitorCreators: string[] // who their competitors are using
  // Our value prop
  relevantCreators: Array<{
    name: string
    platform: string
    followers: number
    engagementRate: number
    audienceOverlap: number // % overlap with brand's target
  }>
  // Timing
  isNewRelease: boolean
  isSeasonalWindow: boolean
  lastCampaignDate: string | null
}

/**
 * Generate a brand outreach message powered by market insights
 */
export function generateBrandOutreach(context: BrandOutreachContext) {
  const insights: string[] = []

  // Build insight-driven value props
  if (context.monthlyDownloads) {
    insights.push(`${context.brandName} is seeing ${formatNumber(context.monthlyDownloads)} monthly downloads`)
  }
  if (context.competitorCreators.length > 0) {
    insights.push(`Your competitors are already using creators like ${context.competitorCreators.slice(0, 2).join(' and ')}`)
  }
  if (context.isNewRelease) {
    insights.push(`With your recent launch, creator content can drive sustained organic growth beyond the initial UA spike`)
  }
  if (context.relevantCreators.length > 0) {
    const topCreator = context.relevantCreators[0]
    insights.push(`We have ${context.relevantCreators.length} creators with direct audience overlap — including ${topCreator.name} (${formatNumber(topCreator.followers)} followers, ${topCreator.engagementRate}% engagement)`)
  }

  const insightBlock = insights.length > 0
    ? `\n\nWhy now:\n${insights.map(i => `• ${i}`).join('\n')}`
    : ''

  const body = `Hi,

I'm Joel Kirk, founder of Mobileyes — a gaming talent agency representing live streaming creators across ANZ and APAC.

I'm reaching out because I believe there's a strong fit between ${context.brandName} and our creator roster.${insightBlock}

What we deliver:
• Curated gaming creators with verified, bot-free audiences
• Full-funnel attribution (UTM + OneLink + promo codes)
• Campaign analytics within 48 hours of completion
• 4-day creator payment (they perform better when paid fast)

${context.relevantCreators.length > 0 ? "I would love to share a shortlist of " + context.relevantCreators.length + " creators who match your audience profile — with full analytics on each." : "I would love to discuss how our roster could support your next campaign."}

Would a 15-minute call this week work?

Joel Kirk
Founder, Mobileyes
mobileyes.live`

  const estimatedValue = context.currentAdSpend
    ? Math.round(context.currentAdSpend * 0.1) // estimate 10% of their spend as our opportunity
    : null

  return {
    id: `outreach_${Date.now()}`,
    targetType: 'BRAND',
    targetName: context.brandName,
    targetEmail: null,
    targetLinkedIn: null,
    subject: context.isNewRelease
      ? `${context.brandName} — creator campaign opportunity for your launch`
      : `Gaming creators for ${context.brandName} — Mobileyes`,
    body,
    insightBasis: insights.join('; '),
    estimatedValue,
    status: 'DRAFT',
    createdAt: new Date().toISOString(),
    sentAt: null,
  }
}

// ─── CREATOR OUTREACH ─────────────────────────────────

export interface CreatorOutreachContext {
  creatorName: string
  platform: string
  handle: string
  followers: number
  topGames: string[]
  engagementRate: number | null
  // What we can offer them
  relevantCampaigns: number // active campaigns that match their profile
  estimatedEarnings: number | null // what they could earn with us per month
  // Competitive intel
  hasExistingAgency: boolean
  currentAgency: string | null
}

/**
 * Generate a creator outreach message
 */
export function generateCreatorOutreach(context: CreatorOutreachContext): OutreachMessage {
  const valueProps: string[] = []

  if (context.relevantCampaigns > 0) {
    valueProps.push(`We currently have ${context.relevantCampaigns} active campaign${context.relevantCampaigns > 1 ? 's' : ''} that match your audience profile`)
  }
  if (context.estimatedEarnings) {
    valueProps.push(`Based on your audience size and engagement, we estimate $${formatNumber(context.estimatedEarnings)} AUD/month in campaign revenue`)
  }
  if (context.topGames.length > 0) {
    valueProps.push(`Your ${context.topGames[0]} content is exactly what brands in our pipeline are looking for`)
  }

  const body = `Hi ${context.creatorName},

I came across your ${context.platform} content and wanted to reach out.

I'm Joel, founder of Mobileyes — a gaming talent agency based in Sydney. We represent streaming creators for brand campaigns across Australia and APAC.

${valueProps.length > 0 ? `Why I'm reaching out now:\n${valueProps.map(v => `• ${v}`).join('\n')}\n\n` : ''}What makes us different:
• 4-day payment (content approved → paid in 4 days, not 30-60)
• Selective briefs only — matched to your audience, never spray-and-pray
• Full campaign analytics so you can see your impact
• 25% commission, transparent, no hidden fees

${context.hasExistingAgency ? "I know you may already have representation — happy to chat about what a non-exclusive arrangement could look like." : "No commitment required — just a conversation about what representation could look like for you."}

Interested in a quick chat?

Joel Kirk
Mobileyes — mobileyes.live`

  return {
    id: `outreach_${Date.now()}`,
    targetType: 'CREATOR',
    targetName: context.creatorName,
    targetEmail: null,
    targetLinkedIn: null,
    subject: `${context.creatorName} — brand campaign opportunities (Mobileyes)`,
    body,
    insightBasis: valueProps.join('; '),
    estimatedValue: context.estimatedEarnings ? Math.round(context.estimatedEarnings * 0.25 * 12) : null, // annual commission
    status: 'DRAFT',
    createdAt: new Date().toISOString(),
    sentAt: null,
  }
}

// ─── AGENCY OUTREACH ──────────────────────────────────

/**
 * Generate outreach to agencies (for partnership/referral relationships)
 */
export function generateAgencyOutreach(params: {
  agencyName: string
  theirClients: string[]
  ourStrength: string // what we bring that they don't have
}): OutreachMessage {
  const body = `Hi,

I'm Joel Kirk, founder of Mobileyes — a gaming-focused talent agency in Sydney.

I noticed ${params.agencyName} works with ${params.theirClients.slice(0, 2).join(' and ')} — we have a roster of gaming and streaming creators that could complement your campaigns in the ANZ and APAC market.

${params.ourStrength}

Would be great to explore a referral or partnership arrangement. Happy to share our roster and discuss how we might work together.

Joel Kirk
Mobileyes — mobileyes.live`

  return {
    id: `outreach_${Date.now()}`,
    targetType: 'AGENCY',
    targetName: params.agencyName,
    targetEmail: null,
    targetLinkedIn: null,
    subject: `Gaming creator partnership — Mobileyes × ${params.agencyName}`,
    body,
    insightBasis: `Agency works with: ${params.theirClients.join(', ')}`,
    estimatedValue: null,
    status: 'DRAFT',
    createdAt: new Date().toISOString(),
    sentAt: null,
  }
}

// ─── HELPERS ──────────────────────────────────────────

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
  return n.toString()
}
