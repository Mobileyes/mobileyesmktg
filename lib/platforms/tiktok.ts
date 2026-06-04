/**
 * TikTok Integration
 * 
 * TikTok's official Research API requires business verification.
 * Until verified, we use public profile endpoints where available
 * and flag TikTok leads for manual research.
 * 
 * Status:
 * - Public API: Limited (no official public endpoints)
 * - Research API: Requires application at developers.tiktok.com
 * - Workaround: Use oembed endpoint for basic profile data
 * - S2S: TikTok Events API for conversion postbacks
 * 
 * TODO: Apply for TikTok Research API (business verification)
 * TODO: Once approved, implement full profile + video scraping
 */

export interface TikTokProfile {
  handle: string
  displayName: string | null
  followerCount: number | null
  videoCount: number | null
  bio: string | null
  verified: boolean
  scraped: boolean
}

/**
 * Attempt to fetch basic TikTok profile data
 * Uses the oembed endpoint which returns limited data
 */
export async function fetchTikTokProfile(handle: string): Promise<TikTokProfile> {
  const cleanHandle = handle.replace('@', '')

  try {
    // TikTok oembed gives us basic video data — we can infer the profile exists
    const oembedUrl = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${cleanHandle}`
    const response = await fetch(oembedUrl)

    if (response.ok) {
      const data = await response.json()
      return {
        handle: cleanHandle,
        displayName: data.author_name ?? cleanHandle,
        followerCount: null, // oembed doesn't expose this
        videoCount: null,
        bio: null,
        verified: false,
        scraped: true, // we confirmed the profile exists
      }
    }
  } catch (error) {
    console.error(`TikTok oembed failed for ${handle}:`, error)
  }

  return {
    handle: cleanHandle,
    displayName: cleanHandle,
    followerCount: null,
    videoCount: null,
    bio: null,
    verified: false,
    scraped: false,
  }
}

/**
 * TikTok Events API — Server-to-Server (S2S) Attribution
 * 
 * Sends conversion events directly from our server to TikTok's server.
 * Used when a creator-driven campaign results in a measurable action
 * (install, purchase, signup) and we need to report it back to TikTok Ads.
 * 
 * Requires: TikTok Ads Manager access token + pixel ID from the brand
 * The BRAND provides these credentials, not us.
 * 
 * Docs: https://business-api.tiktok.com/portal/docs?id=1741601162187777
 */
export interface TikTokS2SEvent {
  eventName: string // 'CompletePayment', 'AddToCart', 'Registration', 'AppInstall'
  eventTime: number // unix timestamp
  eventId: string // unique dedup ID
  user: {
    externalId?: string // hashed user identifier
    ipAddress?: string
    userAgent?: string
    ttclid?: string // TikTok click ID from URL param
  }
  properties: {
    currency?: string
    value?: number
    contentId?: string
    contentType?: string
    query?: string
  }
}

/**
 * Send conversion event to TikTok Events API (S2S)
 * Brand provides their access_token + pixel_id
 */
export async function sendTikTokS2SEvent(params: {
  accessToken: string // brand's TikTok Ads access token
  pixelId: string // brand's pixel ID
  event: TikTokS2SEvent
}): Promise<boolean> {
  try {
    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': params.accessToken,
      },
      body: JSON.stringify({
        pixel_code: params.pixelId,
        event: params.event.eventName,
        event_id: params.event.eventId,
        timestamp: new Date(params.event.eventTime * 1000).toISOString(),
        context: {
          user: params.event.user,
          page: {},
        },
        properties: params.event.properties,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('TikTok S2S event failed:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('TikTok S2S error:', error)
    return false
  }
}
