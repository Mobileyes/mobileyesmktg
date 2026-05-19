import { PostHog } from 'posthog-node'

// Server-side PostHog client for admin events
let posthogClient: PostHog | null = null

export function getPostHogServer(): PostHog {
  if (!posthogClient) {
    posthogClient = new PostHog(process.env.POSTHOG_KEY ?? '', {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    })
  }
  return posthogClient
}

// Admin event tracking
export function trackAdminEvent(
  event: string,
  properties?: Record<string, unknown>
) {
  const posthog = getPostHogServer()
  posthog.capture({
    distinctId: process.env.ADMIN_EMAIL ?? 'admin',
    event,
    properties: {
      source: 'admin',
      ...properties,
    },
  })
}

// Specific admin events
export function trackCreatorAccepted(mblId: string, creatorName: string) {
  trackAdminEvent('creator_accepted', { mblId, creatorName })
}

export function trackCampaignCreated(mblId: string, title: string, source: string) {
  trackAdminEvent('campaign_created', { mblId, title, source })
}

export function trackBriefSentToCreators(campaignId: string, creatorCount: number) {
  trackAdminEvent('brief_sent_to_creators', { campaignId, creatorCount })
}

export function trackInvoiceGenerated(invoiceId: string, amount: number) {
  trackAdminEvent('invoice_generated', { invoiceId, amount })
}

export function trackInvoicePaid(invoiceId: string, amount: number) {
  trackAdminEvent('invoice_paid', { invoiceId, amount })
}

export function trackCreatorPaymentSent(paymentId: string, amount: number) {
  trackAdminEvent('creator_payment_sent', { paymentId, amount })
}
