import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { batchIngestCreators, type BatchIngestResult } from '@/lib/batch-ingest'

/**
 * POST /api/admin/creators/batch
 * 
 * Batch ingest creators from a list of emails, handles, or URLs.
 * System attempts to:
 * 1. Extract platform handle from email username
 * 2. Search YouTube/Twitch/Kick for matching profiles
 * 3. Scrape full profile data (followers, engagement, tier)
 * 4. Create creator records in CRM
 * 5. Generate personalised outreach emails (queued for approval)
 * 
 * Body: { entries: string[], source?: string, batchName?: string }
 * entries can be: emails, URLs, or raw handles
 */
export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    const entries: string[] = body.entries ?? []
    const source = body.source ?? 'FABULATE'
    const batchName = body.batchName ?? `Batch ${new Date().toLocaleDateString()}`

    if (entries.length === 0) {
      return NextResponse.json({ error: 'No entries provided' }, { status: 400 })
    }

    if (entries.length > 100) {
      return NextResponse.json({ error: 'Max 100 entries per batch' }, { status: 400 })
    }

    const results = await batchIngestCreators(entries, source, batchName)

    return NextResponse.json({
      batchName,
      total: entries.length,
      matched: results.filter((r) => r.status === 'MATCHED').length,
      created: results.filter((r) => r.status === 'CREATED').length,
      failed: results.filter((r) => r.status === 'NOT_FOUND').length,
      alreadyExists: results.filter((r) => r.status === 'ALREADY_EXISTS').length,
      results,
    })
  } catch (err) {
    console.error('Batch ingest error:', err)
    return NextResponse.json({ error: 'Batch ingest failed' }, { status: 500 })
  }
}
