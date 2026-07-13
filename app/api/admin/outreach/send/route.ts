import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { resend, EMAIL_FROM } from '@/lib/resend'
import { trackAdminEvent } from '@/lib/posthog'

// POST /api/admin/outreach/send — send outreach email from admin
export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    const { to, subject, message, fromAlias, replyTo } = body

    if (!to || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields: to, subject, message' }, { status: 400 })
    }

    // Determine sender
    const from = fromAlias === 'joel'
      ? EMAIL_FROM.joel
      : fromAlias === 'talent'
      ? EMAIL_FROM.talent
      : fromAlias === 'campaigns'
      ? EMAIL_FROM.campaigns
      : EMAIL_FROM.admin

    // Send via Resend
    const result = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      replyTo: replyTo || from,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="padding: 0 0 24px 0;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 24px;">
            <p style="margin: 0; font-size: 12px; color: #64748b;">
              Sent via Mobileyes · <a href="https://mobileyes.live" style="color: #3b82f6;">mobileyes.live</a>
            </p>
          </div>
        </div>
      `,
    })

    // Track the outreach
    trackAdminEvent('outreach_email_sent', {
      to,
      subject,
      fromAlias: fromAlias || 'admin',
    })

    return NextResponse.json({ success: true, messageId: result.data?.id })
  } catch (err: any) {
    console.error('Outreach send error:', err?.message)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
