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
    const campaignTypeLabel = data.campaignType === 'ua' ? 'UA' : data.campaignType === 'both' ? 'Creator + UA' : 'Creator'
    const campaign = await createCampaign({
      title: `${data.companyName} — ${campaignTypeLabel} Brief`,
      clientName: data.companyName,
      clientEmail: data.email,
      source: 'DIRECT',
      objective: data.campaignType ?? data.objective ?? 'Creator campaigns',
      markets: data.targetMarket ? [data.targetMarket] : (data.markets ?? []),
      budgetRange: data.budget,
      briefDetails: data.briefDetails ?? null,
      status: 'DRAFT',
      campaignFee: null,
      commissionPct: 25,
      startDate: null,
      endDate: null,
      notes: `Contact: ${data.contactName}${data.phone ? `\nPhone: ${data.phone}` : ''}\nCampaign type: ${campaignTypeLabel}${data.appName ? `\nApp: ${data.appName}` : ''}${data.targetCPI ? `\nTarget CPI: ${data.targetCPI}` : ''}${data.appPlatform && data.campaignType !== 'creator' ? `\nPlatform: ${data.appPlatform}` : ''}`,
      inboxMessageId: null,
    })

    // 2. Send notification to admin@mobileyes.live
    try {
      await resend.emails.send({
        from: EMAIL_FROM.admin,
        to: process.env.ADMIN_EMAIL ?? 'admin@mobileyes.live', // M-05: admin@ only
        subject: `[New Brief] ${data.companyName} — ${campaignTypeLabel} (${data.budget})`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px;">
            <h2 style="color: #1e293b;">New Brand Brief Submitted</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Contact</td><td>${data.contactName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Company</td><td>${data.companyName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
              ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone</td><td>${data.phone}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Campaign Type</td><td>${campaignTypeLabel}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Market</td><td>${data.targetMarket || (data.markets ?? []).join(', ')}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Budget</td><td>${data.budget}</td></tr>
              ${data.appName ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">App Name</td><td>${data.appName}</td></tr>` : ''}
              ${data.targetCPI ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Target CPI</td><td>${data.targetCPI}</td></tr>` : ''}
              ${data.appPlatform && data.campaignType !== 'creator' ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">App Platform</td><td>${data.appPlatform}</td></tr>` : ''}
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
