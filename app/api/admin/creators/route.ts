import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCreators, createCreator } from '@/lib/db'

// GET /api/admin/creators
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as 'APPLICANT' | 'ACTIVE' | 'PAUSED' | 'INACTIVE' | null

    const creators = await getCreators(status ?? undefined)
    return NextResponse.json(creators)
  } catch (err) {
    console.error('Error fetching creators:', err)
    return NextResponse.json({ error: 'Failed to fetch creators' }, { status: 500 })
  }
}

// POST /api/admin/creators
export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()

    const creator = await createCreator({
      fullName: body.fullName,
      email: body.email,
      platform: body.platform,
      handleUrl: body.handleUrl,
      followerCount: body.followerCount,
      avgViews: body.avgViews ?? null,
      sessionLength: body.sessionLength ?? null,
      audienceLocation: body.audienceLocation,
      contentNiche: body.contentNiche ?? [],
      gamingGenres: body.gamingGenres ?? [],
      rateCard: body.rateCard ?? null,
      status: 'APPLICANT',
      notes: body.notes ?? null,
    })

    return NextResponse.json(creator, { status: 201 })
  } catch (err) {
    console.error('Error creating creator:', err)
    return NextResponse.json({ error: 'Failed to create creator' }, { status: 500 })
  }
}
