import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getInboxBriefs, updateInboxBrief, convertBriefToCampaign } from '@/lib/db'

// GET /api/admin/inbox — list inbox briefs
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as any
    const briefs = await getInboxBriefs(status || undefined)
    return NextResponse.json(briefs)
  } catch (err) {
    console.error('Error fetching inbox briefs:', err)
    return NextResponse.json({ error: 'Failed to fetch briefs' }, { status: 500 })
  }
}

// PATCH /api/admin/inbox — update brief status
export async function PATCH(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    const { id, status, campaignId } = body

    if (!id) return NextResponse.json({ error: 'Brief ID required' }, { status: 400 })

    if (status === 'CONVERTED' && campaignId) {
      await convertBriefToCampaign(id, campaignId)
    } else if (status) {
      await updateInboxBrief(id, { status })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error updating inbox brief:', err)
    return NextResponse.json({ error: 'Failed to update brief' }, { status: 500 })
  }
}
