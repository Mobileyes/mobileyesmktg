/**
 * Outreach Queue
 * 
 * Generates brand-voice outreach emails and queues them for Joel's approval.
 * NOTHING sends without explicit approval via the admin UI.
 * 
 * Flow:
 * 1. System generates outreach (from event planner, brand intel, or manual trigger)
 * 2. Email queued in Firestore with status DRAFT
 * 3. Joel reviews in /admin/outreach → approves or edits
 * 4. On approval → sends via Resend
 * 5. Tracks delivery/open/click via webhook
 */

export interface QueuedOutreach {
  id: string
  // Target
  targetName: string
  targetCompany: string
  targetEmail: string
  targetType: 'BRAND' | 'CREATOR' | 'AGENCY' | 'PARTNER'
  // Content
  subject: string
  body: string // HTML
  // Context
  reason: string // why we're reaching out
  dataPoints: string[] // specific insights used
  eventId: string | null // if tied to an event
  campaignId: string | null // if tied to a campaign
  // Status
  status: 'DRAFT' | 'APPROVED' | 'SENT' | 'DELIVERED' | 'OPENED' | 'CLICKED' | 'RESPONDED' | 'REJECTED'
  // Tracking
  resendMessageId: string | null
  createdAt: string
  approvedAt: string | null
  sentAt: string | null
  openedAt: string | null
}

/**
 * Generate a brand outreach email using approved voice
 * Per comms strategy: direct, warm, industry-fluent, specific data points
 */
export function generateBrandOutreach(params: {
  contactName: string
  companyName: string
  recentActivity: string // what they've been doing (launch, campaign, hire)
  dataPoint: string // specific market data relevant to them
  ourAngle: string // why Mobileyes is relevant to them
  eventContext?: string // if meeting at an event
}): { subject: string; body: string } {
  const subject = params.eventContext
    ? `${params.eventContext} — creator campaigns for ${params.companyName}`
    : `APAC creators for ${params.companyName}`

  const eventLine = params.eventContext
    ? `\n<p>I noticed ${params.companyName} is attending ${params.eventContext} — wanted to connect beforehand.</p>`
    : ''

  const body = `
<p>Hi ${params.contactName},</p>
${eventLine}
<p>${params.recentActivity}</p>

<p>${params.dataPoint}</p>

<p>${params.ourAngle}</p>

<p>We're a lean, senior team — I've spent 20 years across King, Activision Blizzard, AppsFlyer, and AWS, so I've been on your side of the table. Happy to share how we're approaching creator campaigns differently if useful.</p>

<p>Open to a quick chat this week?</p>

<p>Joel</p>
  `.trim()

  return { subject, body }
}

/**
 * Generate a creator recruitment email
 * Per comms strategy: respect their craft, specific about why we're reaching out
 */
export function generateCreatorOutreach(params: {
  creatorName: string
  platform: string
  specificContent: string // what we noticed about their content
  audienceNote: string // what we know about their audience
}): { subject: string; body: string } {
  const subject = `Your ${params.platform} content — Mobileyes representation`

  const body = `
<p>Hi ${params.creatorName},</p>

<p>I came across ${params.specificContent} and wanted to reach out.</p>

<p>I'm Joel — founder of Mobileyes, a live streaming talent agency based in Sydney. We represent creators for brand campaigns across Australia and APAC.</p>

<p>${params.audienceNote}</p>

<p>What makes us different:</p>
<ul>
  <li><strong>4-day payment</strong> — content approved → paid in 4 days, no exceptions</li>
  <li><strong>Selective briefs only</strong> — we match campaigns to your audience, not the other way around</li>
  <li><strong>Full analytics</strong> — you see exactly how your content performed</li>
</ul>

<p>No commitment, no pressure — just a conversation about what representation looks like if you're open to it.</p>

<p>Joel</p>
  `.trim()

  return { subject, body }
}

/**
 * Generate a post-event follow-up email
 * Per comms strategy: reference the conversation, attach deck, low-commitment CTA
 */
export function generateEventFollowUp(params: {
  contactName: string
  companyName: string
  eventName: string
  conversationNote: string // what you discussed
  nextStep: string // proposed next action
}): { subject: string; body: string } {
  const subject = `Good meeting at ${params.eventName} — ${params.companyName} × Mobileyes`

  const body = `
<p>Hi ${params.contactName},</p>

<p>Great connecting at ${params.eventName}. ${params.conversationNote}</p>

<p>As discussed, I've attached our overview deck. The short version: we broker creator campaigns with full attribution, vetted talent, and 4-day creator payment (which means they actually perform well on camera).</p>

<p>${params.nextStep}</p>

<p>Let me know what works for you.</p>

<p>Joel</p>
  `.trim()

  return { subject, body }
}
