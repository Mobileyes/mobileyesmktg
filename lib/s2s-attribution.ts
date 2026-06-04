/**
 * Server-to-Server (S2S) Attribution Engine
 * 
 * Sends conversion data directly from Mobileyes servers to ad network servers.
 * This bypasses client-side pixels and works even when cookies are blocked.
 * 
 * Supported partners:
 * - AppsFlyer (postback already built at /api/webhooks/appsflyer)
 * - TikTok Events API (S2S)
 * - Meta Conversions API (CAPI)
 * - Google Ads Offline Conversions
 * - Adjust (callback URL)
 * - Singular (S2S postback)
 * 
 * Flow:
 * 1. Creator drives user to brand's product (via UTM link / OneLink / promo code)
 * 2. User converts (install, purchase, signup)
 * 3. Brand's system fires webhook to us (or we detect via promo code)
 * 4. We record the conversion in our performance engine
 * 5. We ALSO fire S2S events back to the relevant ad networks
 *    (so the brand's ad reporting shows creator-attributed conversions)
 * 
 * Why this matters:
 * - Proves creator campaign ROI in the brand's own dashboards
 * - Brands see the data in AppsFlyer/TikTok Ads/Meta without trusting our numbers
 * - Makes us look like a performance partner, not just a talent booker
 */

export type S2SPartner = 'APPSFLYER' | 'TIKTOK' | 'META' | 'GOOGLE_ADS' | 'ADJUST' | 'SINGULAR'

export interface S2SConfig {
  partner: S2SPartner
  // Brand provides these credentials per campaign
  accessToken?: string // Meta CAPI, TikTok Events API
  pixelId?: string // Meta Pixel, TikTok Pixel
  appId?: string // AppsFlyer app ID
  conversionActionId?: string // Google Ads
  adjustAppToken?: string
  singularApiKey?: string
  // Our config
  enabled: boolean
  campaignId: string // MBL-CAMP-XXXXX
}

export interface S2SConversion {
  eventName: string // 'install', 'purchase', 'signup', 'add_to_cart'
  eventValue: number | null // revenue in AUD
  currency: string
  timestamp: string // ISO
  // Attribution
  campaignId: string
  creatorId: string
  creatorHandle: string
  platform: string // which platform the creator posted on
  // User identifiers (brand provides what they have)
  userId?: string
  ipAddress?: string
  userAgent?: string
  clickId?: string // ttclid, fbclid, gclid, etc.
}

/**
 * Fire S2S conversion to all configured partners for a campaign
 */
export async function fireS2SConversions(
  conversion: S2SConversion,
  configs: S2SConfig[]
): Promise<{ partner: S2SPartner; success: boolean; error?: string }[]> {
  const results: { partner: S2SPartner; success: boolean; error?: string }[] = []

  for (const config of configs) {
    if (!config.enabled) continue

    try {
      switch (config.partner) {
        case 'TIKTOK': {
          if (!config.accessToken || !config.pixelId) break
          const { sendTikTokS2SEvent } = await import('./platforms/tiktok')
          const success = await sendTikTokS2SEvent({
            accessToken: config.accessToken,
            pixelId: config.pixelId,
            event: {
              eventName: mapEventName(conversion.eventName, 'TIKTOK'),
              eventTime: Math.floor(new Date(conversion.timestamp).getTime() / 1000),
              eventId: `${conversion.campaignId}-${conversion.creatorId}-${Date.now()}`,
              user: {
                externalId: conversion.userId,
                ipAddress: conversion.ipAddress,
                userAgent: conversion.userAgent,
                ttclid: conversion.clickId,
              },
              properties: {
                currency: conversion.currency,
                value: conversion.eventValue ?? undefined,
              },
            },
          })
          results.push({ partner: 'TIKTOK', success })
          break
        }

        case 'META': {
          if (!config.accessToken || !config.pixelId) break
          const success = await sendMetaCAPI(config, conversion)
          results.push({ partner: 'META', success })
          break
        }

        case 'GOOGLE_ADS': {
          // Google Ads Offline Conversions require OAuth + conversion action ID
          // Placeholder — implement when a brand needs it
          results.push({ partner: 'GOOGLE_ADS', success: false, error: 'Not yet implemented' })
          break
        }

        case 'ADJUST': {
          if (!config.adjustAppToken) break
          const success = await sendAdjustCallback(config, conversion)
          results.push({ partner: 'ADJUST', success })
          break
        }

        case 'SINGULAR': {
          if (!config.singularApiKey) break
          const success = await sendSingularPostback(config, conversion)
          results.push({ partner: 'SINGULAR', success })
          break
        }

        default:
          results.push({ partner: config.partner, success: false, error: 'Unknown partner' })
      }
    } catch (error) {
      results.push({ partner: config.partner, success: false, error: String(error) })
    }
  }

  return results
}

/**
 * Meta Conversions API (CAPI) — S2S
 */
async function sendMetaCAPI(config: S2SConfig, conversion: S2SConversion): Promise<boolean> {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${config.pixelId}/events?access_token=${config.accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            event_name: mapEventName(conversion.eventName, 'META'),
            event_time: Math.floor(new Date(conversion.timestamp).getTime() / 1000),
            event_id: `${conversion.campaignId}-${Date.now()}`,
            action_source: 'website',
            user_data: {
              external_id: conversion.userId ? [hashSHA256(conversion.userId)] : undefined,
              client_ip_address: conversion.ipAddress,
              client_user_agent: conversion.userAgent,
              fbc: conversion.clickId, // fbclid
            },
            custom_data: {
              currency: conversion.currency,
              value: conversion.eventValue,
              content_name: conversion.campaignId,
            },
          }],
        }),
      }
    )
    return response.ok
  } catch {
    return false
  }
}

/**
 * Adjust S2S Callback
 */
async function sendAdjustCallback(config: S2SConfig, conversion: S2SConversion): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      app_token: config.adjustAppToken!,
      event_token: conversion.eventName,
      s2s: '1',
      campaign: conversion.campaignId,
      adgroup: conversion.creatorHandle,
      creative: conversion.platform,
      ...(conversion.eventValue ? { revenue: String(conversion.eventValue), currency: conversion.currency } : {}),
    })
    const response = await fetch(`https://s2s.adjust.com/event?${params.toString()}`)
    return response.ok
  } catch {
    return false
  }
}

/**
 * Singular S2S Postback
 */
async function sendSingularPostback(config: S2SConfig, conversion: S2SConversion): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      a: config.singularApiKey!,
      e: conversion.eventName,
      p: conversion.platform,
      i: conversion.campaignId,
      ...(conversion.eventValue ? { amt: String(conversion.eventValue), cur: conversion.currency } : {}),
    })
    const response = await fetch(`https://s2s.singular.net/api/v1/evt?${params.toString()}`)
    return response.ok
  } catch {
    return false
  }
}

/**
 * Map generic event names to partner-specific names
 */
function mapEventName(event: string, partner: S2SPartner): string {
  const maps: Record<S2SPartner, Record<string, string>> = {
    TIKTOK: { install: 'AppInstall', purchase: 'CompletePayment', signup: 'Registration', add_to_cart: 'AddToCart' },
    META: { install: 'Purchase', purchase: 'Purchase', signup: 'CompleteRegistration', add_to_cart: 'AddToCart' },
    GOOGLE_ADS: { install: 'install', purchase: 'purchase', signup: 'sign_up' },
    APPSFLYER: { install: 'install', purchase: 'af_purchase', signup: 'af_complete_registration' },
    ADJUST: { install: 'install', purchase: 'purchase', signup: 'registration' },
    SINGULAR: { install: 'install', purchase: 'revenue', signup: 'registration' },
  }
  return maps[partner]?.[event] ?? event
}

/**
 * SHA256 hash for PII (required by Meta CAPI)
 */
function hashSHA256(value: string): string {
  // In production, use crypto.subtle or node crypto
  // For now, return a placeholder — implement with actual hashing
  return value // TODO: implement actual SHA256
}
