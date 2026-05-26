/**
 * Attribution & Measurement
 * 
 * Tracks campaign performance through:
 * 1. UTM parameters (standard web attribution)
 * 2. AppsFlyer OneLink (deep link attribution for app installs)
 * 3. Creator-specific tracking codes
 * 4. Conversion events (form submissions, clicks, installs)
 * 
 * Every campaign gets:
 * - Unique UTM tags per creator
 * - AppsFlyer OneLink with creator attribution
 * - Limited-time promo codes for conversion tracking
 */

export interface CampaignAttribution {
  campaignId: string // MBL-CAMP-XXXXX
  creatorId: string // MBL-CR-XXXXX
  creatorHandle: string
  platform: string

  // UTM Parameters
  utmSource: string // e.g. 'twitch', 'youtube', 'tiktok', 'kick'
  utmMedium: string // e.g. 'influencer', 'live_stream', 'video'
  utmCampaign: string // e.g. 'mbl-camp-00001'
  utmContent: string // e.g. creator handle
  utmTerm: string | null // optional keyword

  // Full tracking URL
  trackingUrl: string

  // AppsFlyer OneLink
  oneLinkUrl: string | null
  oneLinkId: string | null
  appsFlyerMediaSource: string // 'mobileyes'
  appsFlyerCampaign: string
  appsFlyerAdset: string // creator handle
  appsFlyerAd: string // content piece identifier

  // Promo/Discount Code
  promoCode: string | null
  promoCodeExpiry: string | null
  promoCodeMaxUses: number | null

  // Results (populated after campaign)
  clicks: number
  impressions: number
  installs: number | null
  conversions: number
  revenue: number | null
  costPerClick: number | null
  costPerInstall: number | null
  costPerConversion: number | null
  roas: number | null // return on ad spend
}

/**
 * Generate UTM tracking URL for a creator's campaign content
 */
export function generateTrackingUrl(params: {
  baseUrl: string
  campaignId: string
  creatorHandle: string
  platform: string
  contentType?: string
}): string {
  const utmParams = new URLSearchParams({
    utm_source: params.platform.toLowerCase(),
    utm_medium: 'influencer',
    utm_campaign: params.campaignId.toLowerCase(),
    utm_content: params.creatorHandle.toLowerCase(),
  })

  return `${params.baseUrl}?${utmParams.toString()}`
}

/**
 * Generate AppsFlyer OneLink URL for app install attribution
 */
export function generateOneLinkUrl(params: {
  oneLinkTemplate: string // e.g. 'https://mobileyes.onelink.me/abc123'
  campaignId: string
  creatorHandle: string
  platform: string
  deepLinkValue?: string
}): string {
  const afParams = new URLSearchParams({
    pid: 'mobileyes', // media source
    c: params.campaignId, // campaign
    af_adset: params.creatorHandle, // adset = creator
    af_ad: `${params.platform}_${params.creatorHandle}`, // ad = platform_creator
    af_channel: params.platform.toLowerCase(),
    ...(params.deepLinkValue ? { deep_link_value: params.deepLinkValue } : {}),
  })

  return `${params.oneLinkTemplate}?${afParams.toString()}`
}

/**
 * Generate a time-limited promo code for a creator's campaign
 * Format: CREATOR-CAMPAIGN (e.g. NINJA-MBL001)
 */
export function generatePromoCode(params: {
  creatorHandle: string
  campaignId: string
  expiryHours?: number
  maxUses?: number
}): {
  code: string
  expiry: string
  maxUses: number
} {
  const shortHandle = params.creatorHandle.substring(0, 6).toUpperCase()
  const shortCampaign = params.campaignId.replace('MBL-CAMP-', '').substring(0, 5)
  const code = `${shortHandle}-${shortCampaign}`

  const expiry = new Date()
  expiry.setHours(expiry.getHours() + (params.expiryHours ?? 48))

  return {
    code,
    expiry: expiry.toISOString(),
    maxUses: params.maxUses ?? 100,
  }
}

/**
 * Generate full attribution package for a campaign-creator assignment
 * This is what gets sent to the brand and used in the brief
 */
export function generateAttributionPackage(params: {
  baseUrl: string
  oneLinkTemplate?: string
  campaignId: string
  creatorHandle: string
  platform: string
  includePromoCode?: boolean
  promoExpiryHours?: number
}): {
  trackingUrl: string
  oneLinkUrl: string | null
  promoCode: string | null
  promoExpiry: string | null
  utmParams: Record<string, string>
} {
  const trackingUrl = generateTrackingUrl({
    baseUrl: params.baseUrl,
    campaignId: params.campaignId,
    creatorHandle: params.creatorHandle,
    platform: params.platform,
  })

  const oneLinkUrl = params.oneLinkTemplate
    ? generateOneLinkUrl({
        oneLinkTemplate: params.oneLinkTemplate,
        campaignId: params.campaignId,
        creatorHandle: params.creatorHandle,
        platform: params.platform,
      })
    : null

  let promoCode: string | null = null
  let promoExpiry: string | null = null

  if (params.includePromoCode) {
    const promo = generatePromoCode({
      creatorHandle: params.creatorHandle,
      campaignId: params.campaignId,
      expiryHours: params.promoExpiryHours,
    })
    promoCode = promo.code
    promoExpiry = promo.expiry
  }

  return {
    trackingUrl,
    oneLinkUrl,
    promoCode,
    promoExpiry,
    utmParams: {
      utm_source: params.platform.toLowerCase(),
      utm_medium: 'influencer',
      utm_campaign: params.campaignId.toLowerCase(),
      utm_content: params.creatorHandle.toLowerCase(),
    },
  }
}

/**
 * Parse UTM parameters from an incoming request URL
 * Used to attribute form submissions and page views to creators
 */
export function parseUtmParams(url: string): Record<string, string> | null {
  try {
    const parsed = new URL(url)
    const utmSource = parsed.searchParams.get('utm_source')
    const utmMedium = parsed.searchParams.get('utm_medium')
    const utmCampaign = parsed.searchParams.get('utm_campaign')
    const utmContent = parsed.searchParams.get('utm_content')
    const utmTerm = parsed.searchParams.get('utm_term')

    if (!utmSource && !utmCampaign) return null

    return {
      ...(utmSource ? { utm_source: utmSource } : {}),
      ...(utmMedium ? { utm_medium: utmMedium } : {}),
      ...(utmCampaign ? { utm_campaign: utmCampaign } : {}),
      ...(utmContent ? { utm_content: utmContent } : {}),
      ...(utmTerm ? { utm_term: utmTerm } : {}),
    }
  } catch {
    return null
  }
}
