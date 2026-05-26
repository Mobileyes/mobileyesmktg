import { NextResponse } from 'next/server'
import { handlePromoRedemption, ingestConversion } from '@/lib/performance-engine'

// POST /api/webhooks/conversions — generic conversion webhook
// Brands can send conversion data here (promo codes, purchases, signups)
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Handle promo code redemptions
    if (data.type === 'promo_redemption' || data.promoCode) {
      const event = await handlePromoRedemption({
        promoCode: data.promoCode ?? data.promo_code ?? data.code,
        orderValue: parseFloat(data.orderValue ?? data.order_value ?? data.value ?? '0'),
        currency: data.currency ?? 'AUD',
        market: data.market ?? data.country ?? 'AU',
        timestamp: data.timestamp ?? new Date().toISOString(),
      })
      return NextResponse.json({ received: true, eventId: event?.id ?? null })
    }

    // Handle generic conversion events
    if (data.type === 'conversion' || data.event_name) {
      const event = await ingestConversion({
        campaignId: data.campaignId ?? data.campaign_id ?? '',
        creatorId: data.creatorId ?? data.creator_id ?? '',
        creatorHandle: data.creatorHandle ?? data.creator_handle ?? data.utm_content ?? '',
        platform: data.platform ?? data.utm_source ?? 'unknown',
        eventType: data.eventType ?? 'CUSTOM',
        eventName: data.event_name ?? data.eventName ?? 'conversion',
        eventValue: data.value ? parseFloat(data.value) : null,
        currency: data.currency ?? 'AUD',
        attributionSource: 'MANUAL',
        attributionWindow: data.attribution_window ?? 'unknown',
        market: data.market ?? data.country ?? 'AU',
        deviceType: data.device ?? null,
        timestamp: data.timestamp ?? new Date().toISOString(),
        isFraud: false,
        fraudReason: null,
        isValidated: false,
      })
      return NextResponse.json({ received: true, eventId: event.id })
    }

    return NextResponse.json({ error: 'Unknown conversion type' }, { status: 400 })
  } catch (err) {
    console.error('Conversion webhook error:', err)
    return NextResponse.json({ error: 'Failed to process conversion' }, { status: 500 })
  }
}
