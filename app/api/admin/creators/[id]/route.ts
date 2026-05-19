import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCreator, updateCreator } from '@/lib/db'

// GET /api/admin/creators/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = await params
    const creator = await getCreator(id)

    if (!creator) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    return NextResponse.json(creator)
  } catch (err) {
    console.error('Error fetching creator:', err)
    return NextResponse.json({ error: 'Failed to fetch creator' }, { status: 500 })
  }
}

// PATCH /api/admin/creators/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()

    const creator = await updateCreator(id, body)
    if (!creator) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    return NextResponse.json(creator)
  } catch (err) {
    console.error('Error updating creator:', err)
    return NextResponse.json({ error: 'Failed to update creator' }, { status: 500 })
  }
}
