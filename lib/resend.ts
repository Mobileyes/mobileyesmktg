import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

// Email sender addresses
export const EMAIL_FROM = {
  admin: process.env.RESEND_FROM_ADMIN ?? 'admin@mobileyes.live',
  talent: process.env.RESEND_FROM_TALENT ?? 'talent@mobileyes.live',
  campaigns: process.env.RESEND_FROM_CAMPAIGNS ?? 'campaigns@mobileyes.live',
}

// Email templates
export async function sendCreatorWelcomeEmail(params: {
  to: string
  creatorName: string
  mblId: string
}) {
  return resend.emails.send({
    from: EMAIL_FROM.talent,
    to: params.to,
    subject: `Welcome to Mobileyes — your creator ID is ${params.mblId}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e293b; padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">MOBILEYES</h1>
        </div>
        <div style="padding: 32px;">
          <p>Hi ${params.creatorName},</p>
          <p>Welcome to Mobileyes. You've been accepted into our managed creator roster.</p>
          <p><strong>Your Mobileyes Creator ID: ${params.mblId}</strong></p>
          <p>Here's what happens next:</p>
          <ul>
            <li>We'll match you with campaign briefs that fit your audience and content style</li>
            <li>You'll receive briefs directly to this email with full details, deliverables, and your fee</li>
            <li>Payment is processed within <strong>4 days</strong> of content approval — no exceptions</li>
          </ul>
          <p>If you have questions at any time, reply directly to this email.</p>
          <p>Looking forward to working together.</p>
          <p>Joel Kirk<br/>Mobileyes — <a href="https://mobileyes.live">mobileyes.live</a></p>
        </div>
        <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
          Mobileyes is a trading name of Gamefluence Pty Ltd (ACN 696 199 461)
        </div>
      </div>
    `,
  })
}

export async function sendCampaignBriefEmail(params: {
  to: string
  creatorName: string
  campaignId: string
  campaignTitle: string
  clientName: string
  fee: number
  contentDueDate: string
  platform: string
  briefDetails: string
}) {
  return resend.emails.send({
    from: EMAIL_FROM.talent,
    to: params.to,
    subject: `[${params.campaignId}] New campaign brief — ${params.campaignTitle}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e293b; padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">MOBILEYES</h1>
        </div>
        <div style="padding: 32px;">
          <p>Hi ${params.creatorName},</p>
          <p>We have a campaign for you. Please review the details below.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Campaign ID:</td><td>${params.campaignId}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Client:</td><td>${params.clientName} (confidential — do not reference publicly)</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Campaign title:</td><td>${params.campaignTitle}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Your fee:</td><td>$${params.fee.toLocaleString()} AUD</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Content due:</td><td>${params.contentDueDate}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Platform:</td><td>${params.platform}</td></tr>
          </table>
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <h3 style="margin-top: 0;">Brief:</h3>
            <p>${params.briefDetails}</p>
          </div>
          <p><strong>To accept this campaign:</strong> reply to this email with 'Accepted — ${params.campaignId}'</p>
          <p><strong>To deliver content:</strong> reply with your content link and 'Delivered — ${params.campaignId}'</p>
          <p style="margin-top: 24px;">Payment will be processed within 4 days of content approval.<br/>Questions: reply directly to this email.</p>
          <p>Joel Kirk<br/>Mobileyes — <a href="https://mobileyes.live">mobileyes.live</a></p>
        </div>
        <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
          Mobileyes is a trading name of Gamefluence Pty Ltd (ACN 696 199 461)
        </div>
      </div>
    `,
  })
}

export async function sendInvoiceEmail(params: {
  to: string
  clientName: string
  invoiceId: string
  campaignTitle: string
  amount: number
  pdfBuffer?: Buffer
}) {
  return resend.emails.send({
    from: EMAIL_FROM.admin,
    to: params.to,
    subject: `Invoice ${params.invoiceId} — ${params.campaignTitle} — Mobileyes`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e293b; padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">MOBILEYES</h1>
        </div>
        <div style="padding: 32px;">
          <p>Hi ${params.clientName},</p>
          <p>Please find attached the invoice for campaign: ${params.campaignTitle}</p>
          <p><strong>Invoice: ${params.invoiceId}</strong><br/>
          Amount: $${params.amount.toLocaleString()} AUD<br/>
          Payment terms: 4 days from issue date</p>
          <p>Bank details are included on the invoice. If you have any questions, reply to this email.</p>
          <p>Joel Kirk<br/>Mobileyes — <a href="https://mobileyes.live">mobileyes.live</a></p>
        </div>
        <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
          Invoices issued by Gamefluence Pty Ltd trading as Mobileyes (ACN 696 199 461)
        </div>
      </div>
    `,
    ...(params.pdfBuffer
      ? {
          attachments: [
            {
              filename: `${params.invoiceId}.pdf`,
              content: params.pdfBuffer,
            },
          ],
        }
      : {}),
  })
}

export async function sendPaymentConfirmationEmail(params: {
  to: string
  creatorName: string
  paymentId: string
  campaignId: string
  amount: number
  method: string
}) {
  return resend.emails.send({
    from: EMAIL_FROM.admin,
    to: params.to,
    subject: `Payment sent — ${params.paymentId} — Mobileyes`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e293b; padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">MOBILEYES</h1>
        </div>
        <div style="padding: 32px;">
          <p>Hi ${params.creatorName},</p>
          <p>Your payment has been processed.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Payment ID:</td><td>${params.paymentId}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Campaign:</td><td>${params.campaignId}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Amount:</td><td>$${params.amount.toLocaleString()} AUD</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Method:</td><td>${params.method}</td></tr>
          </table>
          <p>Funds should arrive within 1–2 business days depending on your bank.</p>
          <p>Joel Kirk<br/>Mobileyes — <a href="https://mobileyes.live">mobileyes.live</a></p>
        </div>
        <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
          Mobileyes is a trading name of Gamefluence Pty Ltd (ACN 696 199 461)
        </div>
      </div>
    `,
  })
}
