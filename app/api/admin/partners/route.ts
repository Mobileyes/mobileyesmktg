import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getPartners, createPartner } from '@/lib/db/partners'
import { signPartnerToken } from '@/lib/partner-token'

/**
 * GET /api/admin/partners — list all partners
 * POST /api/admin/partners — create a new partner + generate dashboard token
 */

export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const partners = await getPartners()
    return NextResponse.json(partners)
  } catch (err) {
    console.error('Error fetching partners:', err)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()

    // Create the partner first to get an ID
    const partner = await createPartner({
      name: body.name,
      company: body.company,
      email: body.email,
      tier: body.tier ?? 'STANDARD',
      status: 'ACTIVE',
      campaignIds: body.campaignIds ?? [],
      creatorIds: body.creatorIds ?? [],
      referralCommissionPct: body.referralCommissionPct ?? null,
      totalReferralEarnings: 0,
      dashboardToken: null,
      lastLoginAt: null,
      tags: body.tags ?? [],
      notes: body.notes ?? null,
    })

    // Generate dashboard token
    const token = await signPartnerToken(partner.id)

    // Update partner with token
    const { updatePartner } = await import('@/lib/db/partners')
    await updatePartner(partner.id, { dashboardToken: token })

    const dashboardUrl = `https://mobileyes.live/partner/${token}`

    return NextResponse.json({
      ...partner,
      dashboardToken: token,
      dashboardUrl,
    }, { status: 201 })
  } catch (err) {
    console.error('Error creating partner:', err)
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 })
  }
}
