/**
 * Kick Platform Integration
 * Public API — no authentication required for basic data
 */

export interface KickChannel {
  id: number
  slug: string
  username: string
  bio: string | null
  profilePic: string | null
  bannerImage: string | null
  followersCount: number
  isLive: boolean
  currentViewers: number | null
  recentCategories: string[]
  verified: boolean
}

export interface KickLivestream {
  isLive: boolean
  title: string | null
  viewerCount: number
  startedAt: string | null
  category: string | null
  thumbnailUrl: string | null
}

/**
 * Fetch a Kick channel's profile data
 */
export async function fetchKickChannel(handle: string): Promise<KickChannel | null> {
  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${handle}`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 }, // cache for 1 hour
    })

    if (!response.ok) return null

    const data = await response.json()

    return {
      id: data.id,
      slug: data.slug,
      username: data.user?.username ?? handle,
      bio: data.user?.bio ?? null,
      profilePic: data.user?.profile_pic ?? null,
      bannerImage: data.banner_image?.url ?? null,
      followersCount: data.followers_count ?? 0,
      isLive: data.livestream !== null,
      currentViewers: data.livestream?.viewer_count ?? null,
      recentCategories: data.recent_categories?.map((c: any) => c.name) ?? [],
      verified: data.verified ?? false,
    }
  } catch (error) {
    console.error(`Failed to fetch Kick channel ${handle}:`, error)
    return null
  }
}

/**
 * Check if a Kick streamer is currently live
 */
export async function getKickLivestream(handle: string): Promise<KickLivestream | null> {
  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${handle}/livestream`, {
      headers: { 'Accept': 'application/json' },
    })

    if (!response.ok) return { isLive: false, title: null, viewerCount: 0, startedAt: null, category: null, thumbnailUrl: null }

    const data = await response.json()

    if (!data || !data.data) {
      return { isLive: false, title: null, viewerCount: 0, startedAt: null, category: null, thumbnailUrl: null }
    }

    return {
      isLive: true,
      title: data.data.session_title ?? null,
      viewerCount: data.data.viewer_count ?? 0,
      startedAt: data.data.created_at ?? null,
      category: data.data.categories?.[0]?.name ?? null,
      thumbnailUrl: data.data.thumbnail?.url ?? null,
    }
  } catch (error) {
    console.error(`Failed to fetch Kick livestream for ${handle}:`, error)
    return null
  }
}
