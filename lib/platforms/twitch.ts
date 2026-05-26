/**
 * Twitch Helix API Integration
 * Requires: TWITCH_CLIENT_ID + TWITCH_CLIENT_SECRET env vars
 * Free tier: 800 requests/minute
 */

const TWITCH_API_BASE = 'https://api.twitch.tv/helix'
const TWITCH_AUTH_URL = 'https://id.twitch.tv/oauth2/token'

let cachedToken: { token: string; expiresAt: number } | null = null

/**
 * Get an app access token for Twitch API
 */
async function getTwitchToken(): Promise<string | null> {
  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET

  if (!clientId || !clientSecret || clientId === 'PLACEHOLDER') {
    console.warn('Twitch API credentials not configured')
    return null
  }

  // Return cached token if still valid
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token
  }

  try {
    const response = await fetch(TWITCH_AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    })

    if (!response.ok) return null
    const data = await response.json()

    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000, // refresh 60s early
    }

    return cachedToken.token
  } catch (error) {
    console.error('Failed to get Twitch token:', error)
    return null
  }
}

export interface TwitchUser {
  id: string
  login: string
  displayName: string
  description: string | null
  profileImageUrl: string | null
  offlineImageUrl: string | null
  viewCount: number
  createdAt: string
  broadcasterType: string // 'partner', 'affiliate', ''
}

export interface TwitchStream {
  id: string
  userId: string
  userName: string
  title: string
  viewerCount: number
  startedAt: string
  gameName: string | null
  gameId: string | null
  thumbnailUrl: string | null
  isMature: boolean
}

export interface TwitchChannel {
  broadcasterId: string
  broadcasterName: string
  gameName: string | null
  title: string
  tags: string[]
}

/**
 * Fetch a Twitch user by login name
 */
export async function fetchTwitchUser(login: string): Promise<TwitchUser | null> {
  const token = await getTwitchToken()
  if (!token) return null

  try {
    const response = await fetch(`${TWITCH_API_BASE}/users?login=${login}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID!,
      },
    })

    if (!response.ok) return null
    const data = await response.json()
    if (!data.data || data.data.length === 0) return null

    const user = data.data[0]
    return {
      id: user.id,
      login: user.login,
      displayName: user.display_name,
      description: user.description || null,
      profileImageUrl: user.profile_image_url || null,
      offlineImageUrl: user.offline_image_url || null,
      viewCount: user.view_count ?? 0,
      createdAt: user.created_at,
      broadcasterType: user.broadcaster_type ?? '',
    }
  } catch (error) {
    console.error(`Failed to fetch Twitch user ${login}:`, error)
    return null
  }
}

/**
 * Check if a Twitch user is currently live
 */
export async function getTwitchStream(login: string): Promise<TwitchStream | null> {
  const token = await getTwitchToken()
  if (!token) return null

  try {
    const response = await fetch(`${TWITCH_API_BASE}/streams?user_login=${login}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID!,
      },
    })

    if (!response.ok) return null
    const data = await response.json()
    if (!data.data || data.data.length === 0) return null

    const stream = data.data[0]
    return {
      id: stream.id,
      userId: stream.user_id,
      userName: stream.user_name,
      title: stream.title,
      viewerCount: stream.viewer_count,
      startedAt: stream.started_at,
      gameName: stream.game_name || null,
      gameId: stream.game_id || null,
      thumbnailUrl: stream.thumbnail_url || null,
      isMature: stream.is_mature ?? false,
    }
  } catch (error) {
    console.error(`Failed to fetch Twitch stream for ${login}:`, error)
    return null
  }
}

/**
 * Get follower count for a Twitch user
 */
export async function getTwitchFollowerCount(broadcasterId: string): Promise<number> {
  const token = await getTwitchToken()
  if (!token) return 0

  try {
    const response = await fetch(`${TWITCH_API_BASE}/channels/followers?broadcaster_id=${broadcasterId}&first=1`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID!,
      },
    })

    if (!response.ok) return 0
    const data = await response.json()
    return data.total ?? 0
  } catch (error) {
    console.error(`Failed to fetch follower count:`, error)
    return 0
  }
}
