import { NextResponse } from 'next/server'
import { createCampaign } from '@/lib/db'
import { trackAdminEvent } from '@/lib/posthog'
import { brandBriefSchema, checkRateLimit } from '@/lib/validation'
import { resend, EMAIL_FROM } from '@/lib/resend'

// POST /api/public/brief — brand brief submission
// Data goes to: 1) Firestore (campaign record) 2) Admin email notification 3) PostHog event
export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    const { allowed } = checkRateLimit(`brief:${ip}`)
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const parsed = brandBriefSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data

    // 1. Save to Firestore as a campaign
    const campaign = await createCampaign({
      title: `${data.companyName} — Inbound Brief`,
      clientName: data.companyName,
      clientEmail: data.email,
      source: 'DIRECT',
      objective: data.objective,
      markets: data.markets,
      budgetRange: data.budget,
      briefDetails: data.briefDetails ?? null,
      status: 'DRAFT',
      campaignFee: null,
      commissionPct: 25,
      startDate: null,
      endDate: null,
      notes: `Contact: ${data.contactName}\nTimeline: ${data.timeline ?? 'Not specified'}\nPlatforms: ${data.platforms.join(', ')}`,
      inboxMessageId: null,
    })

    // 2. Send notification to admin@mobileyes.live
    try {
      await resend.emails.send({
        from: EMAIL_FROM.admin,
        to: process.env.ADMIN_EMAIL ?? 'admin@mobileyes.live',
        subject: `[New Brief] ${data.companyName} — ${data.objective} (${data.budget})`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px;">
            <h2 style="color: #1e293b;">New Brand Brief Submitted</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Company</td><td>${data.companyName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Contact</td><td>${data.contactName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Objective</td><td>${data.objective}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Markets</td><td>${data.markets.join(', ')}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Budget</td><td>${data.budget}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Platforms</td><td>${data.platforms.join(', ') || 'Any'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Timeline</td><td>${data.timeline ?? 'Not specified'}</td></tr>
              ${data.briefDetails ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Details</td><td>${data.briefDetails}</td></tr>` : ''}
            </table>
            <p style="margin-top: 24px; color: #64748b; font-size: 12px;">
              Campaign ID: ${campaign.mblId} · Review in admin: /admin/campaigns
            </p>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('Failed to send admin notification:', emailErr)
    }

    // 3. Track event
    trackAdminEvent('brand_brief_submitted', {
      mblId: campaign.mblId,
      companyName: data.companyName,
      objective: data.objective,
      budget: data.budget,
    })

    return NextResponse.json({ success: true, id: campaign.id }, { status: 201 })
  } catch (err) {
    console.error('Error processing brief:', err)
    return NextResponse.json({ error: 'Failed to submit brief' }, { status: 500 })
  }
}
