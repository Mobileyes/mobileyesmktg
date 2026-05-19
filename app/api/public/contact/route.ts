import { NextResponse } from 'next/server'
import { resend, EMAIL_FROM } from '@/lib/resend'
import { trackAdminEvent } from '@/lib/posthog'
import { contactFormSchema, checkRateLimit } from '@/lib/validation'

// POST /api/public/contact — contact form submission
export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    const { allowed } = checkRateLimit(`contact:${ip}`, 3) // 3 per hour
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const parsed = contactFormSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Forward to admin email
    await resend.emails.send({
      from: EMAIL_FROM.admin,
      to: process.env.ADMIN_EMAIL ?? 'admin@mobileyes.live',
      replyTo: data.email,
      subject: `[Contact Form] ${data.subject}`,
      html: `
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr/>
        <p>${data.message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    trackAdminEvent('contact_form_submitted', { subject: data.subject })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error processing contact form:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
