import { NextResponse } from 'next/server'
import { createCampaign } from '@/lib/db'
import { trackAdminEvent } from '@/lib/posthog'
import { brandBriefSchema, checkRateLimit } from '@/lib/validation'

// POST /api/public/brief — brand brief submission (public, rate-limited, validated)
export async function POST(request: Request) {
  try {
    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    const { allowed } = checkRateLimit(`brief:${ip}`)
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
    }

    const body = await request.json()

    // Validate input
    const parsed = brandBriefSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data

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

    trackAdminEvent('brand_brief_submitted', {
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
