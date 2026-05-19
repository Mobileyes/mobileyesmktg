import { NextResponse } from 'next/server'
import { createCreator } from '@/lib/db'
import { trackAdminEvent } from '@/lib/posthog'
import { creatorApplicationSchema, checkRateLimit } from '@/lib/validation'

// POST /api/public/apply — creator application (public, rate-limited, validated)
export async function POST(request: Request) {
  try {
    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    const { allowed } = checkRateLimit(`apply:${ip}`)
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
    }

    const body = await request.json()

    // Validate input
    const parsed = creatorApplicationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data

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

    trackAdminEvent('creator_application_submitted', {
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
