/**
 * REPRESENTATION DETECTION ENGINE
 * 
 * Scans a creator's public profile and recent content for signals
 * that they have existing management/agency representation.
 * 
 * Detection signals:
 * 1. Email patterns in bio/about (management@, booking@, agent@)
 * 2. "Managed by" or "Represented by" text in about section
 * 3. #ad, #sponsored, #partner hashtags in recent videos (brand deal history)
 * 4. Specific agency names in description (UTA, WME, Night Media, etc.)
 * 5. Multiple sponsored videos in recent uploads (suggests deal flow = managed)
 * 6. Linktree/bio link to management page
 * 
 * Returns:
 * - hasExistingRepresentation: boolean (confident signal)
 * - representationConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE'
 * - signals: what we detected
 * - previousBrandDeals: brand names found in sponsored content
 * - directContactAvailable: boolean (business email found)
 * - directEmail: the email if found
 */

// ─── TYPES ────────────────────────────────────────────

export interface RepDetectionResult {
  hasExistingRepresentation: boolean
  representationConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE'
  signals: RepSignal[]
  previousBrandDeals: string[]
  directContactAvailable: boolean
  directEmail: string | null
  agencyName: string | null
  notes: string
}

export interface RepSignal {
  type: 'MANAGEMENT_EMAIL' | 'AGENCY_MENTION' | 'SPONSORED_CONTENT' | 'BIO_INDICATOR' | 'MULTI_BRAND_DEALS' | 'DIRECT_EMAIL'
  source: string // where we found it (bio, description, video title, etc.)
  detail: string // what exactly we found
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
}

// ─── KNOWN AGENCIES ───────────────────────────────────

const KNOWN_AGENCIES = [
  'UTA', 'WME', 'CAA', 'ICM', 'Paradigm',
  'Night Media', 'Loaded', 'Evolved', 'Click Management',
  'Studio71', 'Fullscreen', 'Machinima', 'BroadbandTV', 'BBTV',
  'Bent Pixels', 'Freedom!', 'Curse', 'Maker Studios',
  'Viral Nation', 'NeoReach', 'Obviously', 'Grin',
  'Influencer Marketing Factory', 'Captiv8', 'AspireIQ',
  'CreatorIQ', 'Whalar', 'Village Marketing',
  // APAC specific
  'Genflow', 'IEC Games', 'One Digital', 'Social Soup',
  'Vamp', 'Tribe', 'The Right Fit', 'Collabstr',
]

const MANAGEMENT_EMAIL_PATTERNS = [
  /management@/i, /booking@/i, /agent@/i, /mgmt@/i,
  /talent@/i, /inquiries@/i, /collab@/i, /partnerships@/i,
  /pr@/i, /press@/i,
]

const DIRECT_EMAIL_PATTERNS = [
  /business@/i, /contact@/i, /hello@/i, /info@/i,
  /\w+@gmail\.com/i, /\w+@outlook\.com/i, /\w+@hotmail\.com/i,
]

const SPONSORED_INDICATORS = [
  '#ad', '#sponsored', '#partner', '#paid', '#brandpartner',
  '#gifted', '#collab', '#advertisement',
  'paid partnership', 'sponsored by', 'in partnership with',
  'this video is sponsored', 'thanks to', 'brought to you by',
]

const BIO_REP_INDICATORS = [
  'managed by', 'represented by', 'signed to', 'agency:',
  'management:', 'booking:', 'for business inquiries contact my management',
  'all inquiries through', 'reach out to my team',
]

// ─── MAIN DETECTION FUNCTION ──────────────────────────

/**
 * Detect if a creator has existing representation.
 * 
 * Inputs:
 * - bio: their channel/profile about text
 * - recentVideoDescriptions: descriptions from their last 5-10 videos
 * - recentVideoTitles: titles from recent videos
 * - channelEmails: any emails found on their channel/profile
 */
export function detectRepresentation(params: {
  bio: string | null
  recentVideoDescriptions: string[]
  recentVideoTitles: string[]
  channelEmails: string[]
  linksInBio: string[]
}): RepDetectionResult {
  const { bio, recentVideoDescriptions, recentVideoTitles, channelEmails, linksInBio } = params
  const signals: RepSignal[] = []
  const brandDeals: string[] = []
  let directEmail: string | null = null
  let agencyName: string | null = null

  // 1. Check emails for management vs direct patterns
  for (const email of channelEmails) {
    const isManagementEmail = MANAGEMENT_EMAIL_PATTERNS.some(p => p.test(email))
    const isDirectEmail = DIRECT_EMAIL_PATTERNS.some(p => p.test(email))

    if (isManagementEmail) {
      signals.push({
        type: 'MANAGEMENT_EMAIL',
        source: 'channel_email',
        detail: email,
        confidence: 'HIGH',
      })
    } else if (isDirectEmail) {
      directEmail = email
      signals.push({
        type: 'DIRECT_EMAIL',
        source: 'channel_email',
        detail: email,
        confidence: 'MEDIUM',
      })
    }
  }

  // 2. Check bio for agency mentions and rep indicators
  const bioText = (bio ?? '').toLowerCase()
  for (const indicator of BIO_REP_INDICATORS) {
    if (bioText.includes(indicator.toLowerCase())) {
      signals.push({
        type: 'BIO_INDICATOR',
        source: 'bio',
        detail: indicator,
        confidence: 'HIGH',
      })
    }
  }

  for (const agency of KNOWN_AGENCIES) {
    if (bioText.includes(agency.toLowerCase())) {
      agencyName = agency
      signals.push({
        type: 'AGENCY_MENTION',
        source: 'bio',
        detail: agency,
        confidence: 'HIGH',
      })
    }
  }

  // 3. Check recent content for sponsored indicators
  let sponsoredCount = 0
  const allDescriptions = recentVideoDescriptions.join(' ').toLowerCase()
  const allTitles = recentVideoTitles.join(' ').toLowerCase()

  for (const indicator of SPONSORED_INDICATORS) {
    const indicatorLower = indicator.toLowerCase()

    // Count occurrences in descriptions
    for (const desc of recentVideoDescriptions) {
      if (desc.toLowerCase().includes(indicatorLower)) {
        sponsoredCount++
        // Try to extract brand name (word after "sponsored by" or "thanks to")
        const brandMatch = desc.match(new RegExp(`(?:${indicator.replace('#', '\\#')})\\s+([A-Z][\\w\\s]+)`, 'i'))
        if (brandMatch) {
          brandDeals.push(brandMatch[1].trim())
        }
        break // count once per description
      }
    }

    // Check titles
    if (allTitles.includes(indicatorLower)) {
      signals.push({
        type: 'SPONSORED_CONTENT',
        source: 'video_title',
        detail: indicator,
        confidence: 'MEDIUM',
      })
    }
  }

  if (sponsoredCount > 0) {
    signals.push({
      type: 'SPONSORED_CONTENT',
      source: 'video_descriptions',
      detail: `${sponsoredCount} sponsored videos detected in recent uploads`,
      confidence: sponsoredCount >= 3 ? 'HIGH' : 'MEDIUM',
    })
  }

  if (sponsoredCount >= 4) {
    signals.push({
      type: 'MULTI_BRAND_DEALS',
      source: 'video_descriptions',
      detail: `${sponsoredCount} brand deals in recent content — consistent deal flow suggests management`,
      confidence: 'HIGH',
    })
  }

  // 4. Check links for management pages
  for (const link of linksInBio) {
    const linkLower = link.toLowerCase()
    if (linkLower.includes('management') || linkLower.includes('talent') || linkLower.includes('agency')) {
      signals.push({
        type: 'BIO_INDICATOR',
        source: 'links',
        detail: link,
        confidence: 'HIGH',
      })
    }
  }

  // 5. Check for agency names in descriptions (some creators credit their agency)
  for (const agency of KNOWN_AGENCIES) {
    if (allDescriptions.includes(agency.toLowerCase())) {
      agencyName = agencyName ?? agency
      signals.push({
        type: 'AGENCY_MENTION',
        source: 'video_descriptions',
        detail: agency,
        confidence: 'MEDIUM',
      })
    }
  }

  // ─── CALCULATE RESULT ───────────────────────────────

  const highConfidenceSignals = signals.filter(s => s.confidence === 'HIGH')
  const mediumConfidenceSignals = signals.filter(s => s.confidence === 'MEDIUM')

  let hasExistingRepresentation = false
  let representationConfidence: RepDetectionResult['representationConfidence'] = 'NONE'

  if (highConfidenceSignals.length >= 2) {
    hasExistingRepresentation = true
    representationConfidence = 'HIGH'
  } else if (highConfidenceSignals.length === 1) {
    hasExistingRepresentation = true
    representationConfidence = 'MEDIUM'
  } else if (mediumConfidenceSignals.length >= 3) {
    hasExistingRepresentation = true
    representationConfidence = 'MEDIUM'
  } else if (mediumConfidenceSignals.length >= 1) {
    representationConfidence = 'LOW'
  }

  // Override: if we found a direct business email AND no management email,
  // they're likely self-managed even if they have brand deals
  if (directEmail && !signals.some(s => s.type === 'MANAGEMENT_EMAIL') && !signals.some(s => s.type === 'AGENCY_MENTION')) {
    if (representationConfidence === 'MEDIUM' && sponsoredCount < 5) {
      hasExistingRepresentation = false
      representationConfidence = 'LOW'
    }
  }

  // Build notes
  const notes = buildNotes(signals, directEmail, agencyName, sponsoredCount)

  return {
    hasExistingRepresentation,
    representationConfidence,
    signals,
    previousBrandDeals: [...new Set(brandDeals)],
    directContactAvailable: !!directEmail,
    directEmail,
    agencyName,
    notes,
  }
}

function buildNotes(signals: RepSignal[], directEmail: string | null, agencyName: string | null, sponsoredCount: number): string {
  const parts: string[] = []

  if (agencyName) {
    parts.push(`Agency detected: ${agencyName}`)
  }

  if (directEmail) {
    parts.push(`Direct contact: ${directEmail}`)
  }

  if (sponsoredCount > 0) {
    parts.push(`${sponsoredCount} sponsored videos in recent content`)
  }

  if (signals.length === 0) {
    parts.push('No representation signals detected — likely independent/self-managed')
  }

  return parts.join('. ')
}

// ─── CONVENIENCE WRAPPER ──────────────────────────────

/**
 * Quick check from just a bio and email list.
 * Used in batch processing where we don't have video descriptions yet.
 */
export function quickRepCheck(bio: string | null, emails: string[]): {
  likelyManaged: boolean
  confidence: string
  reason: string
} {
  const result = detectRepresentation({
    bio,
    recentVideoDescriptions: [],
    recentVideoTitles: [],
    channelEmails: emails,
    linksInBio: [],
  })

  return {
    likelyManaged: result.hasExistingRepresentation,
    confidence: result.representationConfidence,
    reason: result.notes,
  }
}
