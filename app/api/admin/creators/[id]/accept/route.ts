import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCreator, acceptCreator } from '@/lib/db'
import { sendCreatorWelcomeEmail } from '@/lib/resend'
import { trackCreatorAccepted } from '@/lib/posthog'

// POST /api/admin/creators/[id]/accept
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

    if (creator.status !== 'APPLICANT') {
      return NextResponse.json({ error: 'Creator is not an applicant' }, { status: 400 })
    }

    const updatedCreator = await acceptCreator(id)
    if (!updatedCreator) {
      return NextResponse.json({ error: 'Failed to accept creator' }, { status: 500 })
    }

    // Send welcome email
    await sendCreatorWelcomeEmail({
      to: updatedCreator.email,
      creatorName: updatedCreator.fullName,
      mblId: updatedCreator.mblId,
    })

    // Track event
    trackCreatorAccepted(updatedCreator.mblId, updatedCreator.fullName)

    return NextResponse.json(updatedCreator)
  } catch (err) {
    console.error('Error accepting creator:', err)
    return NextResponse.json({ error: 'Failed to accept creator' }, { status: 500 })
  }
}
