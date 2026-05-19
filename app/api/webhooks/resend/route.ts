import { NextResponse } from 'next/server'
import { trackAdminEvent } from '@/lib/posthog'

// POST /api/webhooks/resend — handle Resend webhook events
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    switch (type) {
      case 'email.delivered':
        trackAdminEvent('email_delivered', { to: data.to, subject: data.subject })
        break
      case 'email.opened':
        trackAdminEvent('email_opened', { to: data.to, subject: data.subject })
        break
      case 'email.clicked':
        trackAdminEvent('email_clicked', { to: data.to, subject: data.subject, url: data.click?.url })
        break
      case 'email.bounced':
        trackAdminEvent('email_bounced', { to: data.to, subject: data.subject })
        if (data.subject?.includes('MBL-CAMP-')) {
          console.error(`ALERT: Creator brief email bounced — ${data.to} — ${data.subject}`)
        }
        break
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Resend webhook error:', err)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
