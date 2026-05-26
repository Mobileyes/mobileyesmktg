import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { discoverCreators } from '@/lib/talent-discovery'

// GET /api/admin/discover/search — search for creators across platforms
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get('game') ?? undefined
    const genre = searchParams.get('genre') ?? undefined
    const platform = searchParams.get('platform') ?? undefined
    const market = searchParams.get('market') ?? undefined
    const minFollowers = searchParams.get('minFollowers')
      ? parseInt(searchParams.get('minFollowers')!, 10)
      : undefined
    const maxFollowers = searchParams.get('maxFollowers')
      ? parseInt(searchParams.get('maxFollowers')!, 10)
      : undefined
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!, 10)
      : 10

    const results = await discoverCreators({
      game,
      genre,
      platform,
      market,
      minFollowers,
      maxFollowers,
      limit,
    })

    return NextResponse.json({ results, count: results.length })
  } catch (err) {
    console.error('Discovery search error:', err)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
