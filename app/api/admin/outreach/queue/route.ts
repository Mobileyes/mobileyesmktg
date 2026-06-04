import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { resend, EMAIL_FROM } from '@/lib/resend'
import { wrapEmail } from '@/lib/email-templates'
import { trackAdminEvent } from '@/lib/posthog'
import {
  generateBrandOutreach,
  generateCreatorOutreach,
  generateEventFollowUp,
} from '@/lib/outreach-queue'

// In-memory queue for now (would be Firestore in production)
// TODO: migrate to Firestore collection 'outreachQueue'
let outreachQueue: any[] = []

// GET /api/admin/outreach/queue — list queued outreach
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  return NextResponse.json({ queue: outreachQueue })
}

// POST /api/admin/outreach/queue — generate + queue, or approve + send
export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'generate_brand': {
        const { contactName, companyName, email, recentActivity, dataPoint, ourAngle, eventContext } = body
        const generated = generateBrandOutreach({ contactName, companyName, recentActivity, dataPoint, ourAngle, eventContext })
        const queued = {
          id: `oq-${Date.now()}`,
          targetName: contactName,
          targetCompany: companyName,
          targetEmail: email,
          targetType: 'BRAND',
          subject: generated.subject,
          body: generated.body,
          reason: recentActivity,
          dataPoints: [dataPoint],
          eventId: null,
          campaignId: null,
          status: 'DRAFT',
          resendMessageId: null,
          createdAt: new Date().toISOString(),
          approvedAt: null,
          sentAt: null,
          openedAt: null,
        }
        outreachQueue.push(queued)
        return NextResponse.json({ success: true, queued })
      }

      case 'generate_creator': {
        const { creatorName, platform, email, specificContent, audienceNote } = body
        const generated = generateCreatorOutreach({ creatorName, platform, specificContent, audienceNote })
        const queued = {
          id: `oq-${Date.now()}`,
          targetName: creatorName,
          targetCompany: platform,
          targetEmail: email,
          targetType: 'CREATOR',
          subject: generated.subject,
          body: generated.body,
          reason: specificContent,
          dataPoints: [audienceNote],
          eventId: null,
          campaignId: null,
          status: 'DRAFT',
          resendMessageId: null,
          createdAt: new Date().toISOString(),
          approvedAt: null,
          sentAt: null,
          openedAt: null,
        }
        outreachQueue.push(queued)
        return NextResponse.json({ success: true, queued })
      }

      case 'approve_send': {
        // Joel approves → send immediately
        const { id, editedSubject, editedBody } = body
        const item = outreachQueue.find(q => q.id === id)
        if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })

        const subject = editedSubject || item.subject
        const emailBody = editedBody || item.body
        const html = wrapEmail(emailBody, 'standard')

        const result = await resend.emails.send({
          from: EMAIL_FROM.admin,
          to: item.targetEmail,
          subject,
          html,
        })

        item.status = 'SENT'
        item.approvedAt = new Date().toISOString()
        item.sentAt = new Date().toISOString()
        item.resendMessageId = result.data?.id ?? null
        item.subject = subject
        item.body = emailBody

        trackAdminEvent('outreach_approved_sent', {
          targetName: item.targetName,
          targetCompany: item.targetCompany,
          subject,
        })

        return NextResponse.json({ success: true, messageId: result.data?.id })
      }

      case 'reject': {
        const { id } = body
        outreachQueue = outreachQueue.filter(q => q.id !== id)
        return NextResponse.json({ success: true })
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }
  } catch (err) {
    console.error('Outreach queue error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
