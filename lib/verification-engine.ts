/**
 * INTEGRATION VERIFICATION ENGINE
 * 
 * Automated content verification system that:
 * 1. Monitors managed creator channels for new content
 * 2. Auto-scrapes the attribution layer (UTM, promo, transcript, hashtags)
 * 3. Takes screenshots of the integration as proof
 * 4. Pulls transcripts and searches for brand mentions + talking points
 * 5. Queues everything for Joel's approval → triggers 4-day payment clock
 * 
 * Defensible tech: "We verify deliverables with technology, not trust."
 * 
 * Supported platforms:
 * - YouTube: description UTM, pinned comment, captions/transcript, screenshot
 * - Twitch/Kick: VOD title, chat log promo mentions, stream title brand tag
 * - TikTok: bio link, hashtags, caption text
 * 
 * Used by BOTH Mobileyes and Gamefluence.
 */

import { fetchYouTubeChannel, fetchRecentVideos } from './platforms/youtube'
import { createVerification, type ContentVerification } from './db/verifications'
import type { PlatformType } from './platforms'

// ─── TYPES ────────────────────────────────────────────

export interface VerificationBrief {
  campaignId: string
  campaignCreatorId: string
  creatorId: string
  creatorHandle: string
  platform: PlatformType
  channelId?: string // YouTube channel ID if known
  // What to look for
  brandName: string
  utmLink?: string // expected UTM link
  promoCode?: string // expected promo code
  talkingPoints: string[] // key messages from the brief
  hashtags?: string[] // expected hashtags (TikTok/Instagram)
}

export interface DetectedContent {
  contentUrl: string
  contentTitle: string | null
  publishedAt: string | null
  platform: PlatformType
  videoId?: string
}

export interface AttributionScrapeResult {
  // UTM link
  utmLinkDetected: boolean
  utmLinkUrl: string | null
  utmLinkLocation: ContentVerification['utmLinkLocation']
  // Promo code
  promoCodeDetected: boolean
  promoCode: string | null
  promoCodeLocation: ContentVerification['promoCodeLocation']
  // Brand mention
  brandMentionDetected: boolean
  brandMentionMethod: ContentVerification['brandMentionMethod']
  // Talking points
  talkingPointsMatched: string[]
  // Transcript
  transcriptExcerpt: string | null
  // Metrics
  viewCount: number | null
  likeCount: number | null
  commentCount: number | null
}

export interface ScreenshotResult {
  screenshotUrl: string | null
  screenshotTimestamp: number | null // seconds
}

// ─── MAIN VERIFICATION FLOW ──────────────────────────

/**
 * Run full verification for a creator's campaign content.
 * Called when new content is detected (via cron or webhook).
 * 
 * Flow:
 * 1. Detect new content on the creator's channel
 * 2. Scrape attribution layer (UTM, promo, description, transcript)
 * 3. Capture screenshot of the integration moment
 * 4. Create verification record queued for approval
 */
export async function runVerification(brief: VerificationBrief): Promise<ContentVerification | null> {
  // Step 1: Detect content
  const content = await detectNewContent(brief)
  if (!content) return null

  // Step 2: Scrape attribution
  const attribution = await scrapeAttribution(content, brief)

  // Step 3: Screenshot the attribution moment
  const screenshot = await captureIntegrationScreenshot(content, brief)

  // Step 4: Create verification record
  const verification = await createVerification({
    campaignId: brief.campaignId,
    campaignCreatorId: brief.campaignCreatorId,
    creatorId: brief.creatorId,
    creatorHandle: brief.creatorHandle,
    platform: brief.platform,
    contentUrl: content.contentUrl,
    contentTitle: content.contentTitle,
    detectedAt: new Date().toISOString(),
    publishedAt: content.publishedAt,
    screenshotUrl: screenshot.screenshotUrl,
    screenshotTimestamp: screenshot.screenshotTimestamp,
    transcriptExcerpt: attribution.transcriptExcerpt,
    transcriptFullUrl: null,
    utmLinkDetected: attribution.utmLinkDetected,
    utmLinkUrl: attribution.utmLinkUrl,
    utmLinkLocation: attribution.utmLinkLocation,
    promoCodeDetected: attribution.promoCodeDetected,
    promoCode: attribution.promoCode,
    promoCodeLocation: attribution.promoCodeLocation,
    brandMentionDetected: attribution.brandMentionDetected,
    brandMentionMethod: attribution.brandMentionMethod,
    talkingPointsMatched: attribution.talkingPointsMatched,
    talkingPointsTotal: brief.talkingPoints.length,
    viewCountAtDetection: attribution.viewCount,
    likesAtDetection: attribution.likeCount,
    commentsAtDetection: attribution.commentCount,
    status: 'PENDING',
    reviewedBy: null,
    reviewedAt: null,
    reviewNotes: null,
    approvedAt: null,
    paymentDueAt: null,
    paymentTriggered: false,
  })

  return verification
}

// ─── CONTENT DETECTION ────────────────────────────────

/**
 * Detect new content on a creator's channel.
 * Routes to the correct platform detector.
 */
async function detectNewContent(brief: VerificationBrief): Promise<DetectedContent | null> {
  switch (brief.platform) {
    case 'YouTube':
      return detectYouTubeContent(brief)
    case 'Twitch':
      return detectTwitchContent(brief)
    case 'Kick':
      return detectKickContent(brief)
    case 'TikTok':
      return detectTikTokContent(brief)
    default:
      return null
  }
}

async function detectYouTubeContent(brief: VerificationBrief): Promise<DetectedContent | null> {
  const channel = await fetchYouTubeChannel(brief.creatorHandle)
  if (!channel) return null

  const videos = await fetchRecentVideos(channel.id, 5)
  if (videos.length === 0) return null

  // Look for videos published in the last 48 hours (campaign window)
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000)
  const recentVideos = videos.filter((v) => new Date(v.publishedAt) > cutoff)

  if (recentVideos.length === 0) return null

  // Return the most recent video
  const latest = recentVideos[0]
  return {
    contentUrl: `https://www.youtube.com/watch?v=${latest.id}`,
    contentTitle: latest.title,
    publishedAt: latest.publishedAt,
    platform: 'YouTube',
    videoId: latest.id,
  }
}

async function detectTwitchContent(brief: VerificationBrief): Promise<DetectedContent | null> {
  // Twitch VODs are detected via stream-monitor when stream ends
  // This checks for existing VODs from recent streams
  const { fetchTwitchUser } = await import('./platforms/twitch')
  const user = await fetchTwitchUser(brief.creatorHandle)
  if (!user) return null

  // Check for recent VODs via Twitch API
  const token = await getTwitchToken()
  if (!token) return null

  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/videos?user_id=${user.id}&type=archive&first=3`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Client-Id': process.env.TWITCH_CLIENT_ID!,
        },
      }
    )
    if (!response.ok) return null
    const data = await response.json()
    if (!data.data || data.data.length === 0) return null

    // Check if any VOD is from last 48 hours
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000)
    const recent = data.data.find((v: Record<string, unknown>) => new Date(v.created_at as string) > cutoff)
    if (!recent) return null

    return {
      contentUrl: recent.url,
      contentTitle: recent.title,
      publishedAt: recent.created_at,
      platform: 'Twitch',
      videoId: recent.id,
    }
  } catch {
    return null
  }
}

async function detectKickContent(brief: VerificationBrief): Promise<DetectedContent | null> {
  // Kick doesn't have a VOD API — check if they have recent clips/streams
  const { fetchKickChannel } = await import('./platforms/kick')
  const channel = await fetchKickChannel(brief.creatorHandle)
  if (!channel) return null

  // Kick channel URL as content reference — stream detected via stream-monitor
  if (channel.isLive) {
    return {
      contentUrl: `https://kick.com/${brief.creatorHandle}`,
      contentTitle: null,
      publishedAt: new Date().toISOString(),
      platform: 'Kick',
    }
  }

  return null
}

async function detectTikTokContent(brief: VerificationBrief): Promise<DetectedContent | null> {
  // TikTok detection — check via oembed for latest video
  // Full implementation requires TikTok Research API
  const cleanHandle = brief.creatorHandle.replace('@', '')

  try {
    // Use oembed to confirm profile exists; actual video detection
    // requires Research API or manual URL input from creator
    const oembedUrl = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${cleanHandle}`
    const response = await fetch(oembedUrl)
    if (!response.ok) return null

    // TikTok doesn't expose a feed API publicly
    // Content URL will be provided by creator or detected via webhook
    return null
  } catch {
    return null
  }
}

// ─── ATTRIBUTION SCRAPING ─────────────────────────────

/**
 * Scrape the attribution layer of detected content.
 * Checks description, pinned comments, transcript, title, hashtags.
 */
async function scrapeAttribution(
  content: DetectedContent,
  brief: VerificationBrief
): Promise<AttributionScrapeResult> {
  switch (content.platform) {
    case 'YouTube':
      return scrapeYouTubeAttribution(content, brief)
    case 'Twitch':
      return scrapeTwitchAttribution(content, brief)
    case 'Kick':
      return scrapeKickAttribution(content, brief)
    case 'TikTok':
      return scrapeTikTokAttribution(content, brief)
    default:
      return emptyAttributionResult()
  }
}

async function scrapeYouTubeAttribution(
  content: DetectedContent,
  brief: VerificationBrief
): Promise<AttributionScrapeResult> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey || apiKey === 'PLACEHOLDER' || !content.videoId) {
    return emptyAttributionResult()
  }

  const result: AttributionScrapeResult = {
    utmLinkDetected: false,
    utmLinkUrl: null,
    utmLinkLocation: null,
    promoCodeDetected: false,
    promoCode: null,
    promoCodeLocation: null,
    brandMentionDetected: false,
    brandMentionMethod: null,
    talkingPointsMatched: [],
    transcriptExcerpt: null,
    viewCount: null,
    likeCount: null,
    commentCount: null,
  }

  try {
    // 1. Get video details (description, stats)
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${content.videoId}&key=${apiKey}`
    )
    if (videoResponse.ok) {
      const videoData = await videoResponse.json()
      if (videoData.items && videoData.items.length > 0) {
        const video = videoData.items[0]
        const description: string = video.snippet.description ?? ''
        const title: string = video.snippet.title ?? ''

        // Check description for UTM link
        if (brief.utmLink) {
          const utmDomain = extractDomain(brief.utmLink)
          if (description.includes(brief.utmLink) || description.includes(utmDomain)) {
            result.utmLinkDetected = true
            result.utmLinkUrl = extractUrl(description, utmDomain) ?? brief.utmLink
            result.utmLinkLocation = 'DESCRIPTION'
          }
        }

        // Check description for promo code
        if (brief.promoCode) {
          if (description.toLowerCase().includes(brief.promoCode.toLowerCase())) {
            result.promoCodeDetected = true
            result.promoCode = brief.promoCode
            result.promoCodeLocation = 'DESCRIPTION'
          }
        }

        // Check title for brand mention
        if (title.toLowerCase().includes(brief.brandName.toLowerCase())) {
          result.brandMentionDetected = true
          result.brandMentionMethod = 'TITLE'
        }

        // Check description for brand mention
        if (!result.brandMentionDetected && description.toLowerCase().includes(brief.brandName.toLowerCase())) {
          result.brandMentionDetected = true
          result.brandMentionMethod = 'DESCRIPTION'
        }

        // Stats
        result.viewCount = parseInt(video.statistics?.viewCount ?? '0', 10)
        result.likeCount = parseInt(video.statistics?.likeCount ?? '0', 10)
        result.commentCount = parseInt(video.statistics?.commentCount ?? '0', 10)
      }
    }

    // 2. Check pinned comment for UTM/promo
    const commentsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${content.videoId}&order=relevance&maxResults=5&key=${apiKey}`
    )
    if (commentsResponse.ok) {
      const commentsData = await commentsResponse.json()
      const comments = commentsData.items ?? []

      for (const thread of comments) {
        const comment = thread.snippet?.topLevelComment?.snippet
        if (!comment) continue
        const text: string = comment.textDisplay ?? ''
        const isCreatorComment = comment.authorChannelId?.value === thread.snippet?.channelId

        // Pinned comments from the creator are most relevant
        if (isCreatorComment || comments.indexOf(thread) === 0) {
          if (brief.utmLink && !result.utmLinkDetected) {
            const utmDomain = extractDomain(brief.utmLink)
            if (text.includes(brief.utmLink) || text.includes(utmDomain)) {
              result.utmLinkDetected = true
              result.utmLinkUrl = extractUrl(text, utmDomain) ?? brief.utmLink
              result.utmLinkLocation = 'PINNED_COMMENT'
            }
          }
          if (brief.promoCode && !result.promoCodeDetected) {
            if (text.toLowerCase().includes(brief.promoCode.toLowerCase())) {
              result.promoCodeDetected = true
              result.promoCode = brief.promoCode
              result.promoCodeLocation = 'PINNED_COMMENT'
            }
          }
        }
      }
    }

    // 3. Pull transcript/captions for brand mention + talking points
    const transcript = await fetchYouTubeTranscript(content.videoId, apiKey)
    if (transcript) {
      const transcriptLower = transcript.toLowerCase()
      const brandLower = brief.brandName.toLowerCase()

      // Check for brand name in transcript
      if (transcriptLower.includes(brandLower)) {
        result.brandMentionDetected = true
        result.brandMentionMethod = result.brandMentionMethod ?? 'TRANSCRIPT'

        // Extract the surrounding context (200 chars around first mention)
        const idx = transcriptLower.indexOf(brandLower)
        const start = Math.max(0, idx - 100)
        const end = Math.min(transcript.length, idx + brief.brandName.length + 100)
        result.transcriptExcerpt = `...${transcript.slice(start, end)}...`
      }

      // Check for promo code in transcript (verbal mention)
      if (brief.promoCode && !result.promoCodeDetected) {
        if (transcriptLower.includes(brief.promoCode.toLowerCase())) {
          result.promoCodeDetected = true
          result.promoCode = brief.promoCode
          result.promoCodeLocation = 'VERBAL'
        }
      }

      // Check talking points
      for (const point of brief.talkingPoints) {
        // Fuzzy match: check if key words from the talking point appear in transcript
        const keywords = point.toLowerCase().split(' ').filter((w) => w.length > 4)
        const matchCount = keywords.filter((kw) => transcriptLower.includes(kw)).length
        if (keywords.length > 0 && matchCount / keywords.length >= 0.6) {
          result.talkingPointsMatched.push(point)
        }
      }

      // If no brand mention excerpt yet, get transcript excerpt around talking point match
      if (!result.transcriptExcerpt && result.talkingPointsMatched.length > 0) {
        const firstPoint = result.talkingPointsMatched[0].toLowerCase().split(' ').filter((w) => w.length > 4)[0]
        if (firstPoint) {
          const idx = transcriptLower.indexOf(firstPoint)
          if (idx >= 0) {
            const start = Math.max(0, idx - 80)
            const end = Math.min(transcript.length, idx + 120)
            result.transcriptExcerpt = `...${transcript.slice(start, end)}...`
          }
        }
      }
    }
  } catch (error) {
    console.error(`YouTube attribution scrape failed for ${content.videoId}:`, error)
  }

  return result
}

async function scrapeTwitchAttribution(
  content: DetectedContent,
  brief: VerificationBrief
): Promise<AttributionScrapeResult> {
  const result = emptyAttributionResult()

  try {
    // Check VOD title for brand tag
    if (content.contentTitle) {
      const titleLower = content.contentTitle.toLowerCase()
      if (titleLower.includes(brief.brandName.toLowerCase())) {
        result.brandMentionDetected = true
        result.brandMentionMethod = 'TITLE'
      }
      // Check for #ad or #sponsored tags in title
      if (brief.promoCode && titleLower.includes(brief.promoCode.toLowerCase())) {
        result.promoCodeDetected = true
        result.promoCode = brief.promoCode
        result.promoCodeLocation = 'DESCRIPTION'
      }
    }

    // Check stream panels/chat for promo code mentions
    // Twitch chat log requires EventSub or third-party logging
    // For now, check channel info panels
    const token = await getTwitchToken()
    if (token && content.videoId) {
      // Get VOD markers/description if available
      const response = await fetch(
        `https://api.twitch.tv/helix/videos?id=${content.videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID!,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        if (data.data?.[0]) {
          const vod = data.data[0]
          result.viewCount = vod.view_count ?? null

          // Check VOD description
          const desc = (vod.description ?? '').toLowerCase()
          if (brief.utmLink && desc.includes(extractDomain(brief.utmLink))) {
            result.utmLinkDetected = true
            result.utmLinkUrl = brief.utmLink
            result.utmLinkLocation = 'DESCRIPTION'
          }
        }
      }
    }
  } catch (error) {
    console.error(`Twitch attribution scrape failed:`, error)
  }

  return result
}

async function scrapeKickAttribution(
  content: DetectedContent,
  brief: VerificationBrief
): Promise<AttributionScrapeResult> {
  const result = emptyAttributionResult()

  // Check stream title for brand mention
  if (content.contentTitle) {
    const titleLower = content.contentTitle.toLowerCase()
    if (titleLower.includes(brief.brandName.toLowerCase())) {
      result.brandMentionDetected = true
      result.brandMentionMethod = 'TITLE'
    }
  }

  // Kick chat API — check for promo code mentions
  // Kick's API is limited; chat log analysis requires websocket connection during stream
  // This will be enhanced when we have real-time chat capture

  return result
}

async function scrapeTikTokAttribution(
  content: DetectedContent,
  brief: VerificationBrief
): Promise<AttributionScrapeResult> {
  const result = emptyAttributionResult()

  // Check hashtags and bio link
  // TikTok Research API required for full implementation
  if (brief.hashtags && brief.hashtags.length > 0) {
    // Would check video caption/hashtags via Research API
    // For now, mark as needing manual review
  }

  // Check content title/caption for brand mention
  if (content.contentTitle) {
    const captionLower = content.contentTitle.toLowerCase()
    if (captionLower.includes(brief.brandName.toLowerCase())) {
      result.brandMentionDetected = true
      result.brandMentionMethod = 'HASHTAG'
    }
    // Check for hashtag brand tags
    if (brief.hashtags) {
      for (const tag of brief.hashtags) {
        if (captionLower.includes(tag.toLowerCase().replace('#', ''))) {
          result.brandMentionDetected = true
          result.brandMentionMethod = 'HASHTAG'
          break
        }
      }
    }
  }

  return result
}

// ─── YOUTUBE TRANSCRIPT ───────────────────────────────

/**
 * Fetch YouTube video transcript/captions.
 * Uses YouTube Data API to get caption track, then fetches the text.
 * Falls back to auto-generated captions if manual ones aren't available.
 */
async function fetchYouTubeTranscript(videoId: string, apiKey: string): Promise<string | null> {
  try {
    // Get available caption tracks
    const captionsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`
    )

    if (!captionsResponse.ok) return null
    const captionsData = await captionsResponse.json()
    const tracks = captionsData.items ?? []

    if (tracks.length === 0) return null

    // Prefer English auto-generated or manual captions
    const preferredTrack =
      tracks.find((t: Record<string, Record<string, string>>) => t.snippet.language === 'en' && t.snippet.trackKind === 'standard') ??
      tracks.find((t: Record<string, Record<string, string>>) => t.snippet.language === 'en' && t.snippet.trackKind === 'ASR') ??
      tracks.find((t: Record<string, Record<string, string>>) => t.snippet.trackKind === 'ASR') ??
      tracks[0]

    if (!preferredTrack) return null

    // Note: Downloading caption content requires OAuth2 with the channel owner's permission.
    // For auto-generated captions on public videos, we use the timedtext endpoint as fallback.
    const transcriptUrl = `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=srv3`
    const transcriptResponse = await fetch(transcriptUrl)

    if (!transcriptResponse.ok) {
      // Try auto-generated
      const autoUrl = `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&kind=asr&fmt=srv3`
      const autoResponse = await fetch(autoUrl)
      if (!autoResponse.ok) return null
      const autoXml = await autoResponse.text()
      return parseTranscriptXml(autoXml)
    }

    const xml = await transcriptResponse.text()
    return parseTranscriptXml(xml)
  } catch (error) {
    console.error(`Failed to fetch transcript for ${videoId}:`, error)
    return null
  }
}

/**
 * Parse YouTube's timed text XML into plain text
 */
function parseTranscriptXml(xml: string): string | null {
  if (!xml || xml.length < 50) return null

  // Simple XML text extraction — strip tags, decode entities
  const textContent = xml
    .replace(/<[^>]+>/g, ' ') // strip XML tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

  return textContent.length > 0 ? textContent : null
}

// ─── SCREENSHOT CAPTURE ───────────────────────────────

/**
 * Capture a screenshot of the integration moment.
 * 
 * For YouTube: generates a thumbnail URL at a specific timestamp
 * For live platforms: captures the stream frame at detection time
 * 
 * In production, this would use a headless browser (Puppeteer/Playwright)
 * running on a serverless function to capture the actual frame.
 * For now, we use YouTube's video thumbnail at the detected timestamp.
 */
async function captureIntegrationScreenshot(
  content: DetectedContent,
  _brief: VerificationBrief
): Promise<ScreenshotResult> {
  switch (content.platform) {
    case 'YouTube':
      return captureYouTubeScreenshot(content)
    case 'Twitch':
      return captureTwitchScreenshot(content)
    case 'Kick':
      return captureKickScreenshot(content)
    default:
      return { screenshotUrl: null, screenshotTimestamp: null }
  }
}

async function captureYouTubeScreenshot(content: DetectedContent): Promise<ScreenshotResult> {
  if (!content.videoId) return { screenshotUrl: null, screenshotTimestamp: null }

  // YouTube provides thumbnail images at various qualities
  // For proof-of-delivery, we capture the video thumbnail (maxres if available)
  // A more sophisticated version would use Puppeteer to screenshot at the brand mention timestamp
  const screenshotUrl = `https://i.ytimg.com/vi/${content.videoId}/maxresdefault.jpg`

  // TODO: In production, use a serverless function with Puppeteer to:
  // 1. Navigate to the video at the timestamp where brand is mentioned
  // 2. Take a full screenshot of the player showing the integration
  // 3. Upload to Firebase Storage and return the URL
  // For now, use the video's high-res thumbnail as placeholder proof

  return {
    screenshotUrl,
    screenshotTimestamp: null, // will be set when we have timestamp-based capture
  }
}

async function captureTwitchScreenshot(content: DetectedContent): Promise<ScreenshotResult> {
  // Twitch VODs have thumbnail URLs with timestamp support
  // Format: {thumbnail_url} with %{width} and %{height} replacements
  if (!content.videoId) return { screenshotUrl: null, screenshotTimestamp: null }

  const token = await getTwitchToken()
  if (!token) return { screenshotUrl: null, screenshotTimestamp: null }

  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/videos?id=${content.videoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Client-Id': process.env.TWITCH_CLIENT_ID!,
        },
      }
    )
    if (!response.ok) return { screenshotUrl: null, screenshotTimestamp: null }
    const data = await response.json()
    const vod = data.data?.[0]
    if (!vod?.thumbnail_url) return { screenshotUrl: null, screenshotTimestamp: null }

    // Replace width/height placeholders
    const thumbnailUrl = vod.thumbnail_url
      .replace('%{width}', '1920')
      .replace('%{height}', '1080')

    return {
      screenshotUrl: thumbnailUrl,
      screenshotTimestamp: null,
    }
  } catch {
    return { screenshotUrl: null, screenshotTimestamp: null }
  }
}

async function captureKickScreenshot(content: DetectedContent): Promise<ScreenshotResult> {
  // Kick stream thumbnails available from channel data
  const { fetchKickChannel } = await import('./platforms/kick')
  const channel = await fetchKickChannel(content.contentUrl.split('/').pop() ?? '')

  return {
    screenshotUrl: channel?.bannerImage ?? null,
    screenshotTimestamp: null,
  }
}

// ─── BATCH VERIFICATION (CRON) ────────────────────────

/**
 * Run verification checks for all active campaigns with SENT status.
 * Called by Vercel cron every 15 minutes.
 * 
 * Checks each creator assigned to active campaigns for new content,
 * then runs the full verification pipeline.
 */
export async function runBatchVerification(): Promise<{
  checked: number
  verified: number
  errors: string[]
}> {
  const { getCampaigns, getCampaignCreators } = await import('./db')
  const { getCreator } = await import('./db/creators')

  let checked = 0
  let verified = 0
  const errors: string[] = []

  // Get campaigns in SENT or IN_PROGRESS status (content expected)
  const sentCampaigns = await getCampaigns({ status: 'SENT' })
  const inProgressCampaigns = await getCampaigns({ status: 'IN_PROGRESS' })
  const campaigns = [...sentCampaigns, ...inProgressCampaigns]

  for (const campaign of campaigns) {
    const creators = await getCampaignCreators(campaign.id)

    for (const cc of creators) {
      // Only check creators who haven't been verified yet
      if (cc.status === 'APPROVED' || cc.status === 'PAID') continue

      const creator = await getCreator(cc.creatorId)
      if (!creator) continue

      checked++

      try {
        const brief: VerificationBrief = {
          campaignId: campaign.id,
          campaignCreatorId: cc.id,
          creatorId: creator.id,
          creatorHandle: extractHandle(creator.handleUrl),
          platform: creator.platform as PlatformType,
          brandName: campaign.clientName,
          utmLink: undefined, // TODO: store UTM link in campaign brief
          promoCode: undefined, // TODO: store promo code in campaign brief
          talkingPoints: campaign.briefDetails
            ? extractTalkingPoints(campaign.briefDetails)
            : [],
        }

        const verification = await runVerification(brief)
        if (verification) {
          verified++
        }
      } catch (error) {
        errors.push(`${creator.handleUrl}: ${String(error)}`)
      }
    }
  }

  return { checked, verified, errors }
}

// ─── HELPERS ──────────────────────────────────────────

function emptyAttributionResult(): AttributionScrapeResult {
  return {
    utmLinkDetected: false,
    utmLinkUrl: null,
    utmLinkLocation: null,
    promoCodeDetected: false,
    promoCode: null,
    promoCodeLocation: null,
    brandMentionDetected: false,
    brandMentionMethod: null,
    talkingPointsMatched: [],
    transcriptExcerpt: null,
    viewCount: null,
    likeCount: null,
    commentCount: null,
  }
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

function extractUrl(text: string, domain: string): string | null {
  // Find a URL containing the domain in the text
  const urlRegex = /https?:\/\/[^\s<>"]+/g
  const urls = text.match(urlRegex) ?? []
  return urls.find((u) => u.includes(domain)) ?? null
}

function extractHandle(handleUrl: string): string {
  // Extract handle from URL (e.g., https://youtube.com/@handle → handle)
  const parts = handleUrl.replace(/\/$/, '').split('/')
  const last = parts[parts.length - 1]
  return last.replace('@', '')
}

function extractTalkingPoints(briefDetails: string): string[] {
  // Extract talking points from brief text
  // Look for bullet points, numbered lists, or key sentences
  const lines = briefDetails.split('\n').filter((l) => l.trim().length > 0)
  const points: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    // Detect list items (bullets, numbers, dashes)
    if (/^[-•*]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed)) {
      points.push(trimmed.replace(/^[-•*\d.)]+\s*/, ''))
    }
  }

  // If no list items found, use sentences that look like talking points
  if (points.length === 0) {
    const sentences = briefDetails.split(/[.!?]+/).filter((s) => s.trim().length > 20)
    return sentences.slice(0, 5).map((s) => s.trim())
  }

  return points
}

/**
 * Get Twitch auth token with in-memory caching.
 * Tokens last ~60 days, so we cache until near-expiry.
 */
let _cachedTwitchToken: { token: string; expiresAt: number } | null = null

async function getTwitchToken(): Promise<string | null> {
  // Return cached token if still valid (with 60s buffer)
  if (_cachedTwitchToken && Date.now() < _cachedTwitchToken.expiresAt - 60000) {
    return _cachedTwitchToken.token
  }

  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET
  if (!clientId || !clientSecret || clientId === 'PLACEHOLDER') return null

  try {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
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

    _cachedTwitchToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 120) * 1000,
    }

    return _cachedTwitchToken.token
  } catch {
    return null
  }
}
