import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCampaigns, createCampaign } from '@/lib/db'
import { trackCampaignCreated } from '@/lib/posthog'

// GET /api/admin/campaigns
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as any
    const source = searchParams.get('source') as any

    const campaigns = await getCampaigns({ status, source })
    return NextResponse.json(campaigns)
  } catch (err) {
    console.error('Error fetching campaigns:', err)
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
  }
}

// POST /api/admin/campaigns
export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()

    const campaign = await createCampaign({
      title: body.title,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      source: body.source ?? 'DIRECT',
      objective: body.objective,
      markets: body.markets ?? [],
      budgetRange: body.budgetRange,
      briefDetails: body.briefDetails ?? null,
      status: 'DRAFT',
      campaignFee: body.campaignFee ?? null,
      commissionPct: body.commissionPct ?? 25,
      startDate: body.startDate ?? null,
      endDate: body.endDate ?? null,
      notes: body.notes ?? null,
      inboxMessageId: body.inboxMessageId ?? null,
    })

    trackCampaignCreated(campaign.mblId, campaign.title, campaign.source)

    return NextResponse.json(campaign, { status: 201 })
  } catch (err) {
    console.error('Error creating campaign:', err)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}
