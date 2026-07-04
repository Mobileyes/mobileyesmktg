import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCreator } from '@/lib/db'
import { onboardCreator } from '@/lib/creator-onboarding'

/**
 * POST /api/admin/creators/[id]/onboard
 * 
 * Triggered when Joel confirms a creator has signed.
 * Runs the full onboarding flow:
 * - Updates status to ACTIVE
 * - Sends welcome email
 * - Notifies admin with tags
 * - Registers in collabs engine
 * 
 * Body: {
 *   commissionPct: number (default 20),
 *   source: string (e.g. 'DIRECT', 'REFERRAL-NEIL'),
 *   tags: string[] (e.g. ['SIGNED', 'FLIGHT-SIM', 'DCS']),
 *   desiredBrands?: string[],
 *   notes?: string
 * }
 */
export async function POST(
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

    const body = await request.json()

    const result = await onboardCreator({
      creator,
      commissionPct: body.commissionPct ?? 20,
      source: body.source ?? 'DIRECT',
      tags: body.tags ?? ['SIGNED'],
      desiredBrands: body.desiredBrands,
      notes: body.notes,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      mblId: creator.mblId,
      welcomeEmailId: result.welcomeEmailId,
      adminNotificationId: result.adminNotificationId,
    })
  } catch (err) {
    console.error('Error onboarding creator:', err)
    return NextResponse.json({ error: 'Onboarding failed' }, { status: 500 })
  }
}
