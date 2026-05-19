import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCampaign, updateCampaign, getCampaignCreators } from '@/lib/db'

// GET /api/admin/campaigns/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = await params
    const campaign = await getCampaign(id)

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    const creators = await getCampaignCreators(id)

    return NextResponse.json({ ...campaign, creators })
  } catch (err) {
    console.error('Error fetching campaign:', err)
    return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 })
  }
}

// PATCH /api/admin/campaigns/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()

    const campaign = await updateCampaign(id, body)
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    return NextResponse.json(campaign)
  } catch (err) {
    console.error('Error updating campaign:', err)
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 })
  }
}
