import { NextResponse } from 'next/server'
import { createCreator } from '@/lib/db'
import { trackAdminEvent } from '@/lib/posthog'
import { creatorApplicationSchema, checkRateLimit } from '@/lib/validation'
import { resend, EMAIL_FROM } from '@/lib/resend'

// POST /api/public/apply — creator application
// Data goes to: 1) Firestore (creator record) 2) Admin email notification 3) PostHog event
export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    const { allowed } = checkRateLimit(`apply:${ip}`)
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const parsed = creatorApplicationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data

    // 1. Save to Firestore
    const creator = await createCreator({
      fullName: data.fullName,
      email: data.email,
      platform: data.platform,
      handleUrl: data.handleUrl,
      followerCount: data.followerCount,
      avgViews: data.avgViews ?? null,
      sessionLength: data.sessionLength ?? null,
      audienceLocation: data.audienceLocation,
      contentNiche: data.contentNiche,
      gamingGenres: data.gamingGenres,
      rateCard: null,
      status: 'APPLICANT',
      notes: data.whyJoin ?? null,
    })

    // 2. Send notification to admin@mobileyes.live (lands in Google Workspace)
    try {
      await resend.emails.send({
        from: EMAIL_FROM.talent,
        to: process.env.ADMIN_EMAIL ?? 'admin@mobileyes.live',
        subject: `[New Application] ${data.fullName} — ${data.platform} (${data.followerCount.toLocaleString()} followers)`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px;">
            <h2 style="color: #1e293b;">New Creator Application</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Name</td><td>${data.fullName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email</td><td>${data.email}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Platform</td><td>${data.platform}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Channel</td><td><a href="${data.handleUrl}">${data.handleUrl}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Followers</td><td>${data.followerCount.toLocaleString()}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Location</td><td>${data.audienceLocation}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Niche</td><td>${data.contentNiche.join(', ')}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Genres</td><td>${data.gamingGenres.join(', ')}</td></tr>
              ${data.whyJoin ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Why Mobileyes</td><td>${data.whyJoin}</td></tr>` : ''}
            </table>
            <p style="margin-top: 24px; color: #64748b; font-size: 12px;">
              MBL ID: ${creator.mblId} · Review in admin: /admin/creators
            </p>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('Failed to send admin notification:', emailErr)
      // Don't fail the request if email fails — data is saved in Firestore
    }

    // 3. Track event
    trackAdminEvent('creator_application_submitted', {
      mblId: creator.mblId,
      platform: data.platform,
      audienceLocation: data.audienceLocation,
      followerCount: data.followerCount,
    })

    return NextResponse.json({ success: true, id: creator.id }, { status: 201 })
  } catch (err) {
    console.error('Error processing application:', err)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
