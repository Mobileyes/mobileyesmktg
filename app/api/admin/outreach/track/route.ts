import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { createCreator, getCreatorByEmail } from '@/lib/db/creators'
import { trackAdminEvent } from '@/lib/posthog'

/**
 * POST /api/admin/outreach/track
 * 
 * Called after successful outreach send. Creates/updates creator in CRM
 * with status tracking: OUTREACHED → RESPONDED → MEETING → SIGNED
 * 
 * Body: { name, email, platform, niche, source, subject, sentAt }
 */
export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    const { name, email, niche, source } = body

    // Check if creator already exists in CRM
    const existing = await getCreatorByEmail(email)
    if (existing) {
      // Update notes to reflect outreach
      return NextResponse.json({ exists: true, mblId: existing.mblId })
    }

    // Create new creator record
    const creator = await createCreator({
      fullName: name,
      email,
      platform: 'TikTok', // default — will be updated when they respond
      handleUrl: '',
      followerCount: 0,
      avgViews: null,
      sessionLength: null,
      audienceLocation: 'Australia',
      contentNiche: niche ? [niche] : ['Lifestyle'],
      gamingGenres: [],
      rateCard: null,
      status: 'APPLICANT',
      notes: `[OUTREACHED ${new Date().toISOString().split('T')[0]}] Source: ${source || 'FABULATE'}. Awaiting response.`,
    })

    trackAdminEvent('creator_outreached', { name, email, mblId: creator.mblId })

    return NextResponse.json({ created: true, mblId: creator.mblId })
  } catch (err) {
    console.error('Outreach track error:', err)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
