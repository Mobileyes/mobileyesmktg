import { COLLECTIONS } from './collections'

async function getDb() {
  const { getAdminDb } = await import('@/lib/firebase-admin')
  return getAdminDb()
}

/**
 * Stream/Campaign Analytics
 * Tracks performance metrics for each creator's campaign content.
 * This is the data that powers:
 * - Creator analytics dashboard (what they see)
 * - Brand campaign reports (what brands get)
 * - Pitch decks (what we use to sell)
 */

export interface StreamAnalytics {
  id: string
  creatorId: string
  campaignId: string
  campaignCreatorId: string
  platform: string // TikTok, YouTube, Twitch, Kick
  contentType: 'LIVE_STREAM' | 'VIDEO' | 'SHORT' | 'POST'
  contentUrl: string | null

  // Stream completion detection
  streamStartedAt: string | null
  streamEndedAt: string | null
  streamDurationMinutes: number | null
  streamCompleted: boolean

  // Reach metrics
  peakViewers: number | null
  avgViewers: number | null
  totalViews: number | null
  uniqueViewers: number | null
  impressions: number | null

  // Engagement metrics
  chatMessages: number | null
  likes: number | null
  shares: number | null
  comments: number | null
  engagementRate: number | null // (interactions / views) * 100
  avgWatchTimeMinutes: number | null

  // Audience metrics (from platform APIs)
  audienceGeo: Record<string, number> | null // { 'AU': 45, 'VN': 20, 'US': 15 }
  audienceAge: Record<string, number> | null // { '18-24': 35, '25-34': 40 }
  audienceGender: Record<string, number> | null // { 'male': 65, 'female': 30, 'other': 5 }
  newFollowersGained: number | null

  // Performance / conversion metrics (for brand campaigns)
  clickThroughRate: number | null
  linkClicks: number | null
  conversions: number | null
  conversionRate: number | null
  costPerView: number | null // campaign fee / total views
  costPerEngagement: number | null // campaign fee / total engagements

  // Metadata
  collectedAt: string
  source: 'MANUAL' | 'TWITCH_API' | 'YOUTUBE_API' | 'TIKTOK_API' | 'KICK_API'
  status: 'PENDING' | 'PARTIAL' | 'COMPLETE'
}

export interface CreatorProfile {
  id: string
  creatorId: string
  // Ingested from platform bios
  bio: string | null
  profileImageUrl: string | null
  bannerImageUrl: string | null
  // Aggregated metrics (updated periodically)
  totalFollowers: number
  totalViews: number
  avgEngagementRate: number
  topGames: string[]
  streamSchedule: string | null
  // For pitch decks
  audienceSummary: string | null
  brandSafetyScore: number | null // 0-100
  contentQualityScore: number | null // 0-100
  lastUpdated: string
}

/**
 * Save stream analytics after a campaign stream/content is completed
 */
export async function saveStreamAnalytics(data: Omit<StreamAnalytics, 'id'>): Promise<StreamAnalytics> {
  const db = await getDb()
  const docRef = await db.collection('streamAnalytics').add(data)
  return { id: docRef.id, ...data }
}

/**
 * Get analytics for a specific campaign
 */
export async function getCampaignAnalytics(campaignId: string): Promise<StreamAnalytics[]> {
  const db = await getDb()
  const snapshot = await db.collection('streamAnalytics')
    .where('campaignId', '==', campaignId)
    .orderBy('collectedAt', 'desc')
    .get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as StreamAnalytics))
}

/**
 * Get analytics for a specific creator (their personal dashboard)
 */
export async function getCreatorAnalytics(creatorId: string): Promise<StreamAnalytics[]> {
  const db = await getDb()
  const snapshot = await db.collection('streamAnalytics')
    .where('creatorId', '==', creatorId)
    .orderBy('collectedAt', 'desc')
    .limit(50)
    .get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as StreamAnalytics))
}

/**
 * Get aggregated performance for a creator (for pitch decks)
 */
export async function getCreatorPerformanceSummary(creatorId: string): Promise<{
  totalCampaigns: number
  avgReach: number
  avgEngagement: number
  avgWatchTime: number
  totalViews: number
  platforms: string[]
}> {
  const analytics = await getCreatorAnalytics(creatorId)

  if (analytics.length === 0) {
    return { totalCampaigns: 0, avgReach: 0, avgEngagement: 0, avgWatchTime: 0, totalViews: 0, platforms: [] }
  }

  const totalViews = analytics.reduce((sum, a) => sum + (a.totalViews ?? 0), 0)
  const avgEngagement = analytics.reduce((sum, a) => sum + (a.engagementRate ?? 0), 0) / analytics.length
  const avgWatchTime = analytics.reduce((sum, a) => sum + (a.avgWatchTimeMinutes ?? 0), 0) / analytics.length
  const avgReach = totalViews / analytics.length
  const platforms = [...new Set(analytics.map((a) => a.platform))]

  return {
    totalCampaigns: analytics.length,
    avgReach: Math.round(avgReach),
    avgEngagement: Math.round(avgEngagement * 10) / 10,
    avgWatchTime: Math.round(avgWatchTime),
    totalViews,
    platforms,
  }
}

/**
 * Save/update creator profile (ingested from platform APIs)
 */
export async function upsertCreatorProfile(creatorId: string, data: Partial<Omit<CreatorProfile, 'id' | 'creatorId'>>): Promise<void> {
  const db = await getDb()
  const snapshot = await db.collection('creatorProfiles')
    .where('creatorId', '==', creatorId)
    .limit(1)
    .get()

  if (snapshot.empty) {
    await db.collection('creatorProfiles').add({
      creatorId,
      ...data,
      lastUpdated: new Date().toISOString(),
    })
  } else {
    await snapshot.docs[0].ref.update({
      ...data,
      lastUpdated: new Date().toISOString(),
    })
  }
}

/**
 * Get creator profile for pitch deck generation
 */
export async function getCreatorProfile(creatorId: string): Promise<CreatorProfile | null> {
  const db = await getDb()
  const snapshot = await db.collection('creatorProfiles')
    .where('creatorId', '==', creatorId)
    .limit(1)
    .get()
  if (snapshot.empty) return null
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as CreatorProfile
}
