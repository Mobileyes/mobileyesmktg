import { NextResponse } from 'next/server'
import { ingestConversion } from '@/lib/performance-engine'

// POST /api/webhooks/discord — receive Discord bot events
// Bot sends: member joins (with invite code), promo redemptions, engagement events
export async function POST(request: Request) {
  try {
    const data = await request.json()

    switch (data.type) {
      case 'member_join': {
        // A member joined via a tracked creator invite
        // Attribute the join to the creator
        const event = await ingestConversion({
          campaignId: data.campaignId ?? '',
          creatorId: data.creatorId ?? '',
          creatorHandle: data.creatorHandle ?? '',
          platform: 'discord',
          eventType: 'SIGNUP',
          eventName: 'discord_join',
          eventValue: null,
          currency: 'AUD',
          attributionSource: 'UTM',
          attributionWindow: 'direct',
          market: data.market ?? 'AU',
          deviceType: null,
          timestamp: data.joinedAt ?? new Date().toISOString(),
          isFraud: false,
          fraudReason: null,
          isValidated: true,
        })
        return NextResponse.json({ received: true, eventId: event.id })
      }

      case 'promo_redemption': {
        // A member redeemed a promo code in Discord
        const event = await ingestConversion({
          campaignId: data.campaignId ?? '',
          creatorId: data.creatorId ?? '',
          creatorHandle: data.creatorHandle ?? '',
          platform: 'discord',
          eventType: 'PURCHASE',
          eventName: 'promo_redemption',
          eventValue: data.value ? parseFloat(data.value) : null,
          currency: data.currency ?? 'AUD',
          attributionSource: 'PROMO_CODE',
          attributionWindow: 'direct',
          market: data.market ?? 'AU',
          deviceType: null,
          timestamp: data.redeemedAt ?? new Date().toISOString(),
          isFraud: false,
          fraudReason: null,
          isValidated: true,
        })
        return NextResponse.json({ received: true, eventId: event.id })
      }

      case 'engagement': {
        // Track engagement metrics (messages, reactions, voice time)
        // Lightweight — just log for now
        return NextResponse.json({ received: true, tracked: true })
      }

      default:
        return NextResponse.json({ received: true, unhandled: true })
    }
  } catch (err) {
    console.error('Discord webhook error:', err)
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}
