/**
 * CREATOR ONBOARDING ENGINE
 * 
 * Triggered when a creator signs their agreement and transitions to ACTIVE.
 * Handles the full "welcome aboard" flow:
 * 
 * 1. Send branded welcome email with:
 *    - MBL Creator ID
 *    - Contact details (admin@mobileyes.live)
 *    - What happens next (briefs, payment cycle, communication)
 *    - Desired brands questionnaire prompt
 * 
 * 2. Notify admin (Joel) with:
 *    - Creator details + signed tag
 *    - Content preferences/desired brands
 *    - Suggested first campaign matches
 * 
 * 3. Tag creator in CRM:
 *    - Status → ACTIVE
 *    - Tag: SIGNED
 *    - Tag: source (e.g., DIRECT, REFERRAL-NEIL, etc.)
 * 
 * This is the foundation of the "collabs engine" — once signed,
 * the creator is matchable against incoming brand briefs.
 */

import { resend, EMAIL_FROM } from '@/lib/resend'
import { wrapEmail } from '@/lib/email-templates'
import { updateCreator } from '@/lib/db/creators'
import { trackAdminEvent } from '@/lib/posthog'
import type { Creator } from '@/lib/db/types'

// ─── TYPES ────────────────────────────────────────────

export interface OnboardingParams {
  creator: Creator
  commissionPct: number // e.g. 20
  source: string // e.g. 'DIRECT', 'REFERRAL-NEIL', 'P1-SIM'
  tags: string[] // e.g. ['SIGNED', 'FLIGHT-SIM', 'DCS']
  desiredBrands?: string[] // brands they'd like to work with
  notes?: string // any context from the signing call
}

export interface OnboardingResult {
  success: boolean
  welcomeEmailId: string | null
  adminNotificationId: string | null
  error: string | null
}

// ─── MAIN ONBOARDING FUNCTION ─────────────────────────

export async function onboardCreator(params: OnboardingParams): Promise<OnboardingResult> {
  const { creator, commissionPct, source, tags, desiredBrands, notes } = params

  try {
    // 1. Update creator status + tags in CRM
    await updateCreator(creator.id, {
      status: 'ACTIVE',
      notes: [
        creator.notes ?? '',
        `[SIGNED ${new Date().toISOString().split('T')[0]}]`,
        `Source: ${source}`,
        `Commission: ${commissionPct}%`,
        `Tags: ${tags.join(', ')}`,
        desiredBrands?.length ? `Desired brands: ${desiredBrands.join(', ')}` : '',
        notes ? `Notes: ${notes}` : '',
      ].filter(Boolean).join('\n'),
    })

    // 2. Send welcome email to creator
    const welcomeResult = await sendOnboardingWelcomeEmail({
      to: creator.email,
      creatorName: creator.fullName,
      mblId: creator.mblId,
      platform: creator.platform,
      commissionPct,
    })

    // 3. Send admin notification
    const adminResult = await sendAdminOnboardingNotification({
      creator,
      source,
      tags,
      commissionPct,
      desiredBrands,
      notes,
    })

    // 4. Track event
    trackAdminEvent('creator_onboarded', {
      creatorId: creator.id,
      mblId: creator.mblId,
      creatorName: creator.fullName,
      platform: creator.platform,
      source,
      tags,
      commissionPct,
    })

    return {
      success: true,
      welcomeEmailId: welcomeResult ?? null,
      adminNotificationId: adminResult ?? null,
      error: null,
    }
  } catch (err) {
    console.error('Onboarding failed:', err)
    return {
      success: false,
      welcomeEmailId: null,
      adminNotificationId: null,
      error: String(err),
    }
  }
}

// ─── WELCOME EMAIL ────────────────────────────────────

async function sendOnboardingWelcomeEmail(params: {
  to: string
  creatorName: string
  mblId: string
  platform: string
  commissionPct: number
}): Promise<string | null> {
  const { to, creatorName, mblId, platform, commissionPct } = params

  const body = `
<p>Hi ${creatorName},</p>

<p>Welcome to Mobileyes. You're now on our managed creator roster.</p>

<p><strong>Your Creator ID: ${mblId}</strong></p>

<div style="background: #f8fafc; padding: 16px 20px; border-radius: 8px; margin: 20px 0; border-left: 3px solid #3B82F6;">
  <p style="margin: 0 0 8px 0; font-weight: bold;">What happens next:</p>
  <ul style="margin: 0; padding-left: 20px;">
    <li>We'll match you with campaign briefs that fit your content and audience</li>
    <li>Briefs come directly to this email — full details, deliverables, and your fee upfront</li>
    <li>Payment is processed within <strong>4 days</strong> of content approval — no exceptions</li>
    <li>Our commission is ${commissionPct}% — transparent, no hidden fees</li>
  </ul>
</div>

<div style="background: #f0fdf4; padding: 16px 20px; border-radius: 8px; margin: 20px 0; border-left: 3px solid #22c55e;">
  <p style="margin: 0 0 8px 0; font-weight: bold;">Your key contacts:</p>
  <ul style="margin: 0; padding-left: 20px;">
    <li><strong>Joel Kirk</strong> — Founder & your primary contact</li>
    <li><strong>Email:</strong> admin@mobileyes.live (reply to any email from us)</li>
    <li><strong>Response time:</strong> Within 24 hours on weekdays</li>
  </ul>
</div>

<p><strong>One thing from you:</strong> If you have specific brands you'd love to work with, or categories you want to avoid, reply to this email with a quick list. It helps us match you to the right campaigns faster.</p>

<p>Looking forward to working together.</p>

<p>Joel Kirk<br/>Mobileyes — <a href="https://mobileyes.live">mobileyes.live</a></p>
  `.trim()

  const html = wrapEmail(body, 'standard')

  const result = await resend.emails.send({
    from: EMAIL_FROM.talent,
    to,
    subject: `Welcome to Mobileyes — your creator ID is ${mblId}`,
    html,
  })

  return result.data?.id ?? null
}

// ─── ADMIN NOTIFICATION ───────────────────────────────

async function sendAdminOnboardingNotification(params: {
  creator: Creator
  source: string
  tags: string[]
  commissionPct: number
  desiredBrands?: string[]
  notes?: string
}): Promise<string | null> {
  const { creator, source, tags, commissionPct, desiredBrands, notes } = params

  const body = `
<p><strong>🎉 NEW CREATOR SIGNED — ${creator.fullName}</strong></p>

<table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
  <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Creator ID:</td><td>${creator.mblId}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Name:</td><td>${creator.fullName}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td>${creator.email}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Platform:</td><td>${creator.platform}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Channel:</td><td><a href="${creator.handleUrl}">${creator.handleUrl}</a></td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Followers:</td><td>${creator.followerCount.toLocaleString()}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Location:</td><td>${creator.audienceLocation}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Niche:</td><td>${creator.contentNiche.join(', ')}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Commission:</td><td>${commissionPct}%</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Source:</td><td>${source}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Tags:</td><td><strong>${tags.join(', ')}</strong></td></tr>
  ${desiredBrands?.length ? `<tr><td style="padding: 6px 0; font-weight: bold;">Desired brands:</td><td>${desiredBrands.join(', ')}</td></tr>` : ''}
  ${notes ? `<tr><td style="padding: 6px 0; font-weight: bold;">Notes:</td><td>${notes}</td></tr>` : ''}
</table>

<p style="background: #eff6ff; padding: 12px 16px; border-radius: 6px; border: 1px solid #bfdbfe;">
  <strong>Action:</strong> Creator is now matchable in the collabs engine. Check inbox for brand brief matches.
</p>
  `.trim()

  const html = wrapEmail(body, 'standard')

  const result = await resend.emails.send({
    from: EMAIL_FROM.admin,
    to: 'admin@mobileyes.live',
    subject: `[SIGNED] ${creator.fullName} — ${creator.platform} — ${tags.join(', ')}`,
    html,
  })

  return result.data?.id ?? null
}
