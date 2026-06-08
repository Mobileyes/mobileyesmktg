import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { runVerification, type VerificationBrief } from '@/lib/verification-engine'
import { getCampaigns, getCampaignCreators } from '@/lib/db'
import type { PlatformType } from '@/lib/platforms'

/**
 * YouTube PubSubHubbub (WebSub) Webhook
 * 
 * Subscribes to YouTube channel uploads via PubSubHubbub.
 * When a managed creator uploads a new video, YouTube pushes
 * an Atom feed entry to this endpoint.
 * 
 * Subscribe URL: https://pubsubhubbub.appspot.com/subscribe
 * Topic: https://www.youtube.com/xml/feeds/videos.xml?channel_id={CHANNEL_ID}
 * Callback: https://mobileyes.live/api/webhooks/youtube
 * Secret: YOUTUBE_WEBHOOK_SECRET env var (used for HMAC verification)
 * 
 * Flow:
 * 1. YouTube sends POST with Atom XML containing new video
 * 2. We verify the X-Hub-Signature HMAC-SHA1 header
 * 3. We parse the video ID and channel ID
 * 4. Match to active campaign/creator
 * 5. Trigger full verification pipeline
 */

const MAX_BODY_SIZE = 64 * 1024 // 64KB — PubSub payloads are small

// GET — Hub verification (required for PubSubHubbub subscription)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // PubSubHubbub sends a verification challenge
  const challenge = searchParams.get('hub.challenge')
  const mode = searchParams.get('hub.mode')
  const topic = searchParams.get('hub.topic')

  if (mode === 'subscribe' || mode === 'unsubscribe') {
    console.log(`YouTube PubSub ${mode} verified for topic: ${topic}`)
    // Return the challenge to confirm subscription
    return new Response(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  return NextResponse.json({ status: 'ok' })
}

// POST — Receive new video notification
export async function POST(request: Request) {
  try {
    const body = await request.text()

    // Enforce body size limit to prevent ReDoS/memory exhaustion
    if (body.length > MAX_BODY_SIZE) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
    }

    // Verify HMAC-SHA1 signature from YouTube
    const webhookSecret = process.env.YOUTUBE_WEBHOOK_SECRET
    if (webhookSecret) {
      const signature = request.headers.get('x-hub-signature')
      if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 403 })
      }

      const expectedSig = 'sha1=' + createHmac('sha1', webhookSecret).update(body).digest('hex')
      if (signature !== expectedSig) {
        console.error('[YouTube Webhook] Invalid signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
      }
    }

    // Parse Atom XML to extract video ID and channel ID
    const videoId = extractFromXml(body, 'yt:videoId')
    const channelId = extractFromXml(body, 'yt:channelId')
    const videoTitle = extractFromXml(body, 'title')
    const published = extractFromXml(body, 'published')

    if (!videoId || !channelId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // Validate video ID format (YouTube IDs are 11 alphanumeric chars)
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return NextResponse.json({ error: 'Invalid video ID format' }, { status: 400 })
    }

    if (!videoId || !channelId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    console.log(`[YouTube Webhook] New video detected: ${videoId} from channel ${channelId}`)

    // Find active campaign for this channel
    const brief = await matchChannelToCampaign(channelId, videoId, videoTitle, published)

    if (brief) {
      // Trigger async verification (don't block the webhook response)
      runVerification(brief).catch((err) =>
        console.error(`Verification failed for ${videoId}:`, err)
      )
    }

    return NextResponse.json({ received: true, videoId, channelId })
  } catch (err) {
    console.error('YouTube webhook error:', err)
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}

/**
 * Match a YouTube channel ID to an active campaign creator.
 * Returns a VerificationBrief if a match is found.
 */
async function matchChannelToCampaign(
  channelId: string,
  _videoId: string,
  _videoTitle: string | null,
  _published: string | null
): Promise<VerificationBrief | null> {
  try {
    const { getCreator } = await import('@/lib/db/creators')

    // Get campaigns expecting content (SENT or IN_PROGRESS)
    const sentCampaigns = await getCampaigns({ status: 'SENT' })
    const inProgressCampaigns = await getCampaigns({ status: 'IN_PROGRESS' })
    const campaigns = [...sentCampaigns, ...inProgressCampaigns]

    for (const campaign of campaigns) {
      const creators = await getCampaignCreators(campaign.id)

      for (const cc of creators) {
        if (cc.status === 'APPROVED' || cc.status === 'PAID') continue

        const creator = await getCreator(cc.creatorId)
        if (!creator || creator.platform !== 'YouTube') continue

        // Match by channel ID stored in handleUrl
        // Handle URLs like https://youtube.com/@handle or channel IDs
        const handle = creator.handleUrl.split('/').pop()?.replace('@', '') ?? ''

        // We need to check if this channel ID matches this creator
        // In production, store YouTube channel IDs in the creator record
        // For now, we trigger verification and let it validate
        if (creator.handleUrl.includes(channelId) || handle === channelId) {
          return {
            campaignId: campaign.id,
            campaignCreatorId: cc.id,
            creatorId: creator.id,
            creatorHandle: handle,
            platform: 'YouTube' as PlatformType,
            channelId,
            brandName: campaign.clientName,
            talkingPoints: campaign.briefDetails
              ? extractTalkingPoints(campaign.briefDetails)
              : [],
          }
        }
      }
    }
  } catch (error) {
    console.error('Error matching channel to campaign:', error)
  }

  return null
}

/**
 * Simple XML tag value extraction (no XML parser dependency needed)
 */
function extractFromXml(xml: string, tag: string): string | null {
  // Match both <tag>value</tag> and <ns:tag>value</ns:tag>
  const regex = new RegExp(`<(?:[\\w]+:)?${tag}[^>]*>([^<]+)<\\/(?:[\\w]+:)?${tag}>`, 'i')
  const match = xml.match(regex)
  return match ? match[1].trim() : null
}

function extractTalkingPoints(briefDetails: string): string[] {
  const lines = briefDetails.split('\n').filter((l) => l.trim().length > 0)
  const points: string[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (/^[-•*]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed)) {
      points.push(trimmed.replace(/^[-•*\d.)]+\s*/, ''))
    }
  }
  if (points.length === 0) {
    return briefDetails.split(/[.!?]+/).filter((s) => s.trim().length > 20).slice(0, 5).map((s) => s.trim())
  }
  return points
}
