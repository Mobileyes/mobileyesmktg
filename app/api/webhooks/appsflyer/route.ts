import { NextResponse } from 'next/server'
import { handleAppsFlyerPostback } from '@/lib/performance-engine'

// POST /api/webhooks/appsflyer — receive AppsFlyer postback data
// Configure in AppsFlyer: postback URL = https://mobileyes.live/api/webhooks/appsflyer
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Process the postback
    const event = await handleAppsFlyerPostback({
      event_name: data.event_name ?? data.event_type ?? 'install',
      event_value: data.event_value ?? data.event_revenue ?? null,
      media_source: data.media_source ?? data.pid ?? '',
      campaign: data.campaign ?? data.c ?? '',
      adset: data.adset ?? data.af_adset ?? '',
      ad: data.ad ?? data.af_ad ?? '',
      country_code: data.country_code ?? data.geo ?? '',
      platform: data.platform ?? '',
      event_time: data.event_time ?? new Date().toISOString(),
      is_retargeting: data.is_retargeting === 'true' || data.is_retargeting === true,
    })

    if (event) {
      return NextResponse.json({ received: true, eventId: event.id })
    }

    return NextResponse.json({ received: true, attributed: false })
  } catch (err) {
    console.error('AppsFlyer postback error:', err)
    return NextResponse.json({ error: 'Failed to process postback' }, { status: 500 })
  }
}
