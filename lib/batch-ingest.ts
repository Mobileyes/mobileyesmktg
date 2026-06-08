/**
 * BATCH INGEST ENGINE
 * 
 * Takes a list of emails, URLs, or handles and:
 * 1. Classifies each entry (email, URL, or raw handle)
 * 2. Extracts searchable username from email
 * 3. Searches YouTube → Twitch → Kick for matching profiles
 * 4. Scrapes full profile data when found
 * 5. Scores and assigns market tier
 * 6. Creates creator record in Firestore CRM
 * 7. Generates personalised outreach (queued for Joel's approval)
 * 
 * Designed for Nathan's Fabulate pipeline: receives a spreadsheet of
 * un-repped creator emails, resolves them to platform profiles automatically.
 */

import { scrapeCreatorProfile, scoreCreator, generateOutreachMessage, type DiscoveredCreator } from './talent-discovery'
import { createCreator, getCreatorByEmail } from './db/creators'
import { fetchYouTubeChannel } from './platforms/youtube'

// ─── TYPES ────────────────────────────────────────────

export type EntryType = 'EMAIL' | 'URL' | 'HANDLE'

export type BatchIngestStatus = 'MATCHED' | 'CREATED' | 'NOT_FOUND' | 'ALREADY_EXISTS' | 'ERROR'

export interface BatchIngestResult {
  input: string
  inputType: EntryType
  status: BatchIngestStatus
  // What we found
  matchedPlatform: string | null
  matchedHandle: string | null
  matchedUrl: string | null
  // Scraped data
  followerCount: number | null
  avgViews: number | null
  engagementRate: number | null
  marketTier: string | null
  estimatedRate: string | null
  score: number | null
  // CRM
  creatorId: string | null
  mblId: string | null
  // Outreach
  outreachGenerated: boolean
  outreachMessage: string | null
  // Errors
  error: string | null
}

// ─── MAIN BATCH FUNCTION ──────────────────────────────

export async function batchIngestCreators(
  entries: string[],
  source: string,
  batchName: string
): Promise<BatchIngestResult[]> {
  const results: BatchIngestResult[] = []

  for (const entry of entries) {
    const trimmed = entry.trim()
    if (!trimmed) continue

    try {
      const result = await processEntry(trimmed, source, batchName)
      results.push(result)
    } catch (error) {
      results.push({
        input: trimmed,
        inputType: classifyEntry(trimmed),
        status: 'ERROR',
        matchedPlatform: null,
        matchedHandle: null,
        matchedUrl: null,
        followerCount: null,
        avgViews: null,
        engagementRate: null,
        marketTier: null,
        estimatedRate: null,
        score: null,
        creatorId: null,
        mblId: null,
        outreachGenerated: false,
        outreachMessage: null,
        error: String(error),
      })
    }

    // Rate limit: 500ms between entries to avoid API throttling
    await sleep(500)
  }

  return results
}

// ─── ENTRY PROCESSING ─────────────────────────────────

async function processEntry(
  entry: string,
  source: string,
  batchName: string
): Promise<BatchIngestResult> {
  const entryType = classifyEntry(entry)

  const baseResult: BatchIngestResult = {
    input: entry,
    inputType: entryType,
    status: 'NOT_FOUND',
    matchedPlatform: null,
    matchedHandle: null,
    matchedUrl: null,
    followerCount: null,
    avgViews: null,
    engagementRate: null,
    marketTier: null,
    estimatedRate: null,
    score: null,
    creatorId: null,
    mblId: null,
    outreachGenerated: false,
    outreachMessage: null,
    error: null,
  }

  // Check if already in CRM (by email)
  if (entryType === 'EMAIL') {
    const existing = await getCreatorByEmail(entry)
    if (existing) {
      return {
        ...baseResult,
        status: 'ALREADY_EXISTS',
        matchedHandle: existing.handleUrl,
        creatorId: existing.id,
        mblId: existing.mblId,
      }
    }
  }

  // Try to find platform profile
  let creator: DiscoveredCreator | null = null

  switch (entryType) {
    case 'URL':
      // Direct URL — scrape it
      creator = await scrapeCreatorProfile(entry)
      break

    case 'EMAIL':
      // Extract username and search platforms
      creator = await resolveEmailToProfile(entry)
      break

    case 'HANDLE':
      // Search platforms for this handle
      creator = await resolveHandleToProfile(entry)
      break
  }

  if (!creator || creator.followerCount === 0) {
    return {
      ...baseResult,
      error: entryType === 'EMAIL'
        ? 'Could not match email to any platform profile. Try providing a URL or handle.'
        : 'Profile not found or has no public data.',
    }
  }

  // Score the creator
  const scoring = scoreCreator(creator)

  // Create CRM record
  const crmCreator = await createCreator({
    fullName: creator.displayName,
    email: entryType === 'EMAIL' ? entry : (creator.email ?? ''),
    platform: creator.platform,
    handleUrl: creator.profileUrl,
    followerCount: creator.followerCount,
    avgViews: creator.avgViews,
    sessionLength: creator.avgStreamLength
      ? `${Math.round(creator.avgStreamLength / 60)}hrs`
      : null,
    audienceLocation: creator.audienceLocation ?? 'Unknown',
    contentNiche: creator.contentCategories,
    gamingGenres: creator.topGames,
    rateCard: creator.estimatedRate
      ? { [creator.platform.toLowerCase()]: creator.estimatedRate.high }
      : null,
    status: 'APPLICANT',
    notes: `[${batchName}] Source: ${source}. Score: ${scoring.score}/100 (${scoring.tier}). ${scoring.reasons.join('. ')}${scoring.redFlags.length > 0 ? ' ⚠️ ' + scoring.redFlags.join('. ') : ''}`,
  })

  // Generate outreach
  const outreachMessage = generateOutreachMessage(creator)

  return {
    input: entry,
    inputType: entryType,
    status: 'CREATED',
    matchedPlatform: creator.platform,
    matchedHandle: creator.handle,
    matchedUrl: creator.profileUrl,
    followerCount: creator.followerCount,
    avgViews: creator.avgViews,
    engagementRate: creator.engagementRate,
    marketTier: scoring.tier,
    estimatedRate: creator.estimatedRate
      ? `$${creator.estimatedRate.low}–$${creator.estimatedRate.high} AUD`
      : null,
    score: scoring.score,
    creatorId: crmCreator.id,
    mblId: crmCreator.mblId,
    outreachGenerated: true,
    outreachMessage: outreachMessage,
    error: null,
  }
}

// ─── EMAIL → PLATFORM RESOLUTION ─────────────────────

/**
 * Attempt to resolve an email address to a platform profile.
 * 
 * Strategy:
 * 1. Extract username from email (before @)
 * 2. Clean it (remove dots, numbers, common suffixes)
 * 3. Search YouTube for channel matching username
 * 4. Search Twitch for user matching username
 * 5. Search Kick for channel matching username
 * 6. Return best match (highest follower count)
 */
async function resolveEmailToProfile(email: string): Promise<DiscoveredCreator | null> {
  const username = extractUsernameFromEmail(email)
  if (!username) return null

  // Generate search variants from the email username
  const variants = generateSearchVariants(username)

  for (const variant of variants) {
    // Try YouTube first (largest platform, best API)
    const ytCreator = await searchYouTube(variant)
    if (ytCreator && ytCreator.followerCount >= 1000) {
      return ytCreator
    }

    // Try Twitch
    const twitchCreator = await searchTwitch(variant)
    if (twitchCreator && twitchCreator.followerCount >= 500) {
      return twitchCreator
    }

    // Try Kick
    const kickCreator = await searchKick(variant)
    if (kickCreator && kickCreator.followerCount >= 500) {
      return kickCreator
    }
  }

  return null
}

/**
 * Resolve a raw handle to a platform profile.
 * Searches all platforms and returns the best match.
 */
async function resolveHandleToProfile(handle: string): Promise<DiscoveredCreator | null> {
  const clean = handle.replace('@', '').trim()

  // Try all platforms
  const ytCreator = await searchYouTube(clean)
  if (ytCreator && ytCreator.followerCount >= 1000) return ytCreator

  const twitchCreator = await searchTwitch(clean)
  if (twitchCreator && twitchCreator.followerCount >= 500) return twitchCreator

  const kickCreator = await searchKick(clean)
  if (kickCreator && kickCreator.followerCount >= 500) return kickCreator

  // Return YouTube result even if small (it's the most common)
  return ytCreator ?? twitchCreator ?? kickCreator ?? null
}

// ─── PLATFORM SEARCH FUNCTIONS ────────────────────────

async function searchYouTube(handle: string): Promise<DiscoveredCreator | null> {
  try {
    const channel = await fetchYouTubeChannel(handle)
    if (!channel) return null

    // Use the full scraper for complete data
    return await scrapeCreatorProfile(`https://youtube.com/@${channel.handle}`)
  } catch {
    return null
  }
}

async function searchTwitch(handle: string): Promise<DiscoveredCreator | null> {
  try {
    return await scrapeCreatorProfile(`https://twitch.tv/${handle}`)
  } catch {
    return null
  }
}

async function searchKick(handle: string): Promise<DiscoveredCreator | null> {
  try {
    return await scrapeCreatorProfile(`https://kick.com/${handle}`)
  } catch {
    return null
  }
}

// ─── EMAIL PARSING HELPERS ────────────────────────────

/**
 * Extract the likely platform username from an email address.
 * 
 * Examples:
 * - coolstreamer99@gmail.com → coolstreamer99, coolstreamer
 * - john.gaming@outlook.com → johngaming, john
 * - xNightfallx@hotmail.com → xNightfallx
 * - business@creatorname.com → creatorname (from domain)
 */
function extractUsernameFromEmail(email: string): string | null {
  const lower = email.toLowerCase().trim()
  const atIndex = lower.indexOf('@')
  if (atIndex < 1) return null

  const localPart = lower.slice(0, atIndex)
  const domain = lower.slice(atIndex + 1)

  // If custom domain (not gmail/outlook/hotmail/yahoo), the domain IS the brand
  const genericDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com', 'protonmail.com', 'live.com', 'me.com']
  if (!genericDomains.includes(domain)) {
    // Custom domain — extract name from domain (e.g., mail@creatorname.com → creatorname)
    const domainName = domain.split('.')[0]
    if (domainName.length >= 3) return domainName
  }

  // Clean the local part
  return localPart
    .replace(/[._]/g, '') // remove dots and underscores for primary variant
}

/**
 * Generate search variants from an email username.
 * Tries multiple variations to increase match rate.
 * 
 * Input: coolstreamer99
 * Output: ['coolstreamer99', 'coolstreamer', 'cool_streamer']
 */
function generateSearchVariants(username: string): string[] {
  const variants: string[] = [username]

  // Remove trailing numbers (gaming handles often drop these)
  const withoutNumbers = username.replace(/\d+$/, '')
  if (withoutNumbers.length >= 3 && withoutNumbers !== username) {
    variants.push(withoutNumbers)
  }

  // Remove common email suffixes
  const suffixes = ['gaming', 'tv', 'gg', 'live', 'stream', 'plays', 'official']
  for (const suffix of suffixes) {
    if (username.endsWith(suffix) && username.length > suffix.length + 2) {
      variants.push(username.slice(0, -suffix.length))
    }
  }

  // Try with underscores reintroduced at camelCase boundaries
  const camelSplit = username.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
  if (camelSplit !== username) {
    variants.push(camelSplit)
  }

  // Deduplicate
  return [...new Set(variants)]
}

// ─── ENTRY CLASSIFICATION ─────────────────────────────

function classifyEntry(entry: string): EntryType {
  const trimmed = entry.trim()

  // URL detection
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return 'URL'
  if (trimmed.includes('youtube.com') || trimmed.includes('twitch.tv') || trimmed.includes('kick.com') || trimmed.includes('tiktok.com')) return 'URL'

  // Email detection
  if (trimmed.includes('@') && trimmed.includes('.') && !trimmed.startsWith('@')) return 'EMAIL'

  // Everything else is a handle
  return 'HANDLE'
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
