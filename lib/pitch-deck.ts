/**
 * Pitch Deck & Creator Brief Generation
 * 
 * Generates professional creator decks for brands using:
 * - Creator profile data (ingested from platforms)
 * - Campaign analytics history
 * - Audience metrics
 * - Rate card information
 * 
 * Used when:
 * 1. Fabulate sends a creator referral → auto-generate dossier
 * 2. Brand requests creator recommendations → generate pitch deck
 * 3. Creator applies → generate internal assessment
 */

import { getCreatorProfile, getCreatorPerformanceSummary } from './db/analytics'
import { getCreator, getCreatorCampaigns } from './db'

export interface CreatorDeckData {
  // Creator basics
  name: string
  mblId: string
  platform: string
  handle: string
  profileImageUrl: string | null
  bio: string | null

  // Audience metrics
  followers: number
  avgViews: number | null
  engagementRate: number | null
  audienceLocation: string
  audienceGeo: Record<string, number> | null
  audienceAge: Record<string, number> | null

  // Performance history
  totalCampaigns: number
  avgReach: number
  avgEngagement: number
  avgWatchTime: number
  platforms: string[]

  // Content profile
  contentNiche: string[]
  gamingGenres: string[]
  topGames: string[]

  // Commercial
  rateCard: Record<string, number> | null
  suggestedRate: number | null

  // Quality signals
  brandSafetyScore: number | null
  contentQualityScore: number | null
  communityTrustIndicators: string[]
}

/**
 * Generate a full creator deck for brand presentation
 */
export async function generateCreatorDeck(creatorId: string): Promise<CreatorDeckData | null> {
  const creator = await getCreator(creatorId)
  if (!creator) return null

  const profile = await getCreatorProfile(creatorId)
  const performance = await getCreatorPerformanceSummary(creatorId)
  const campaigns = await getCreatorCampaigns(creatorId)

  // Build community trust indicators
  const trustIndicators: string[] = []
  if (performance.avgEngagement > 5) trustIndicators.push('High engagement rate (>5%)')
  if (performance.avgWatchTime > 20) trustIndicators.push('Strong watch time (>20 min avg)')
  if (performance.totalCampaigns > 3) trustIndicators.push('Proven campaign track record')
  if (creator.followerCount > 50000) trustIndicators.push('Established audience (50K+)')

  return {
    name: creator.fullName,
    mblId: creator.mblId,
    platform: creator.platform,
    handle: creator.handleUrl,
    profileImageUrl: profile?.profileImageUrl ?? null,
    bio: profile?.bio ?? null,

    followers: creator.followerCount,
    avgViews: creator.avgViews,
    engagementRate: performance.avgEngagement || null,
    audienceLocation: creator.audienceLocation,
    audienceGeo: null, // From platform API
    audienceAge: null, // From platform API

    totalCampaigns: performance.totalCampaigns,
    avgReach: performance.avgReach,
    avgEngagement: performance.avgEngagement,
    avgWatchTime: performance.avgWatchTime,
    platforms: performance.platforms,

    contentNiche: creator.contentNiche,
    gamingGenres: creator.gamingGenres,
    topGames: profile?.topGames ?? [],

    rateCard: creator.rateCard as Record<string, number> | null,
    suggestedRate: calculateSuggestedRate(creator.followerCount, performance.avgEngagement),

    brandSafetyScore: profile?.brandSafetyScore ?? null,
    contentQualityScore: profile?.contentQualityScore ?? null,
    communityTrustIndicators: trustIndicators,
  }
}

/**
 * Calculate a suggested rate based on follower count and engagement
 * This is a starting point — Joel adjusts based on market knowledge
 */
function calculateSuggestedRate(followers: number, engagementRate: number): number {
  // Base rate per 1000 followers (AUD)
  const baseRatePer1K = 8 // $8 per 1K followers as baseline

  // Engagement multiplier (higher engagement = higher rate)
  let engagementMultiplier = 1
  if (engagementRate > 10) engagementMultiplier = 2.0
  else if (engagementRate > 7) engagementMultiplier = 1.7
  else if (engagementRate > 5) engagementMultiplier = 1.4
  else if (engagementRate > 3) engagementMultiplier = 1.2

  const suggestedRate = (followers / 1000) * baseRatePer1K * engagementMultiplier

  // Floor and ceiling
  return Math.max(500, Math.min(suggestedRate, 50000))
}

/**
 * Generate a brief response for Fabulate referrals
 * Quick assessment of whether a creator is a good fit
 */
export async function generateQuickAssessment(creatorId: string, campaignContext?: {
  objective: string
  markets: string[]
  budget: string
}): Promise<{
  fit: 'STRONG' | 'MODERATE' | 'WEAK'
  reasons: string[]
  suggestedFee: number | null
  nextSteps: string[]
}> {
  const deck = await generateCreatorDeck(creatorId)
  if (!deck) {
    return { fit: 'WEAK', reasons: ['Creator not found'], suggestedFee: null, nextSteps: [] }
  }

  const reasons: string[] = []
  let fitScore = 50

  // Check audience location match
  if (campaignContext?.markets.some(m => deck.audienceLocation.toLowerCase().includes(m.toLowerCase()))) {
    fitScore += 20
    reasons.push(`Audience location matches target market (${deck.audienceLocation})`)
  }

  // Check engagement
  if (deck.avgEngagement > 5) {
    fitScore += 15
    reasons.push(`Strong engagement rate (${deck.avgEngagement}%)`)
  }

  // Check track record
  if (deck.totalCampaigns > 0) {
    fitScore += 10
    reasons.push(`${deck.totalCampaigns} previous campaigns completed`)
  }

  // Check follower count
  if (deck.followers > 10000) {
    fitScore += 10
    reasons.push(`Established audience (${deck.followers.toLocaleString()} followers)`)
  }

  const fit = fitScore >= 75 ? 'STRONG' : fitScore >= 55 ? 'MODERATE' : 'WEAK'

  const nextSteps = fit === 'STRONG'
    ? ['Send brief to creator', 'Confirm rate card', 'Schedule campaign dates']
    : fit === 'MODERATE'
    ? ['Review creator content manually', 'Check audience overlap', 'Discuss with Fabulate']
    : ['Pass on this creator', 'Request alternative from Fabulate']

  return {
    fit,
    reasons,
    suggestedFee: deck.suggestedRate,
    nextSteps,
  }
}
