/**
 * Firestore Collection References
 * Central place for all collection names.
 */

export const COLLECTIONS = {
  creators: 'creators',
  campaigns: 'campaigns',
  campaignCreators: 'campaignCreators',
  invoices: 'invoices',
  payments: 'payments',
  inboxBriefs: 'inboxBriefs',
  dossiers: 'dossiers',
  counters: 'counters',
  streamAnalytics: 'streamAnalytics',
  creatorProfiles: 'creatorProfiles',
  contentVerifications: 'contentVerifications',
} as const

// Counter document IDs (for MBL ID generation)
export const COUNTER_IDS = {
  creator: 'creator_counter',
  campaign: 'campaign_counter',
  invoice: 'invoice_counter',
  payment: 'payment_counter',
} as const
