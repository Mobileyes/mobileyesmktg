/**
 * Discord Integration
 * 
 * Tracks creator-attributed server joins and engagement.
 * Used for:
 * 1. Creator-driven community growth (unique invite codes per creator)
 * 2. Influencer ads within Discord (JP's strategy)
 * 3. Promo code redemption tracking
 * 4. Managed creator private server (#briefs-available, #payments)
 * 
 * Discord doesn't have a conversion API — attribution is tracked via:
 * - Unique invite codes (one per creator per campaign)
 * - Bot-managed promo code redemption
 * - Role assignment tracking
 */

export interface DiscordInvite {
  code: string
  creatorHandle: string
  campaignId: string
  guildId: string
  channelId: string
  maxUses: number | null
  expiresAt: string | null
  uses: number
  createdAt: string
}

export interface DiscordJoinEvent {
  memberId: string
  memberName: string
  guildId: string
  inviteCode: string
  creatorHandle: string // attributed creator
  campaignId: string
  joinedAt: string
}

export interface DiscordPromoRedemption {
  memberId: string
  memberName: string
  promoCode: string
  creatorHandle: string
  campaignId: string
  redeemedAt: string
  value: number | null // if tied to a purchase
}

/**
 * Generate a tracked Discord invite URL for a creator
 * Each creator gets a unique invite code for attribution
 */
export function generateTrackedInviteUrl(params: {
  baseInvite: string // e.g. discord.gg/mobileyes
  creatorHandle: string
  campaignId: string
}): string {
  // Discord invites are created via the Discord API (bot)
  // This generates the tracking format we use
  return `https://discord.gg/mb-${params.creatorHandle.toLowerCase()}`
}

/**
 * Build UTM-tracked Discord link (for external tracking)
 * Used when driving traffic FROM Discord to external sites
 */
export function buildDiscordUTMLink(params: {
  destinationUrl: string
  creatorHandle: string
  campaignId: string
  contentType?: string // 'ad', 'post', 'promo'
}): string {
  const url = new URL(params.destinationUrl)
  url.searchParams.set('utm_source', 'discord')
  url.searchParams.set('utm_medium', 'influencer')
  url.searchParams.set('utm_campaign', params.campaignId)
  url.searchParams.set('utm_content', params.creatorHandle)
  if (params.contentType) url.searchParams.set('utm_term', params.contentType)
  return url.toString()
}

/**
 * Discord Ad Attribution (JP's strategy)
 * 
 * Flow:
 * 1. Create ad creative featuring managed creator
 * 2. Ad targets Discord users (via Discord Ads or in-server promotion)
 * 3. CTA: Join server (tracked invite) or visit site (UTM link)
 * 4. Track: impression → click → join/visit → conversion
 * 
 * Metrics we can track:
 * - Server joins attributed to each ad/creator
 * - Time from join to first interaction
 * - Promo code redemptions from Discord members
 * - Role upgrades (free → premium)
 */
export interface DiscordAdCampaign {
  id: string
  campaignId: string // MBL-CAMP-XXXXX
  creatorHandle: string // creator featured in the ad
  adType: 'SERVER_AD' | 'IN_CHANNEL' | 'DM_CAMPAIGN' | 'EXTERNAL'
  targetGuildId: string
  trackedInviteCode: string
  utmLink: string | null
  impressions: number
  clicks: number
  joins: number
  conversions: number
  spend: number // ad spend
  startDate: string
  endDate: string | null
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETE'
}

/**
 * Calculate Discord campaign performance
 */
export function calculateDiscordMetrics(campaign: DiscordAdCampaign): {
  cpc: number // cost per click
  cpj: number // cost per join
  cpa: number // cost per acquisition/conversion
  joinRate: number // clicks → joins %
  conversionRate: number // joins → conversions %
} {
  return {
    cpc: campaign.clicks > 0 ? campaign.spend / campaign.clicks : 0,
    cpj: campaign.joins > 0 ? campaign.spend / campaign.joins : 0,
    cpa: campaign.conversions > 0 ? campaign.spend / campaign.conversions : 0,
    joinRate: campaign.clicks > 0 ? (campaign.joins / campaign.clicks) * 100 : 0,
    conversionRate: campaign.joins > 0 ? (campaign.conversions / campaign.joins) * 100 : 0,
  }
}
