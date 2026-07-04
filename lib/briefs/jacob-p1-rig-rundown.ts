/**
 * REVERSE BRIEF — P1 Sim × JacobTaborOz
 * 
 * Pilot campaign: Custom flight sim rig rundown video
 * Creator: Jacob (JacobTaborOz) — DCS / Flight Simulation
 * Brand partner: P1 Sim Rigs (via Neil)
 * 
 * Context from call (Jul 3 2026):
 * - Jacob creates professional DCS (Digital Combat Simulator) content
 * - 11 years Air Force avionics technician — real-world expertise
 * - Primary platform: YouTube (monetized), also Instagram + TikTok
 * - Cadence: 1 long-form video every 1-2 months (quality over quantity)
 * - Previous bad experience with Thrustmaster (too prescriptive, hand-cam requirement)
 * - Wants authentic integrations — no generic ads, audience trust is priority
 * - Affiliate links preferred as low-risk monetization
 * - Based in Port Stephens / Newcastle area, NSW
 * - Full-time defense contractor — content is a passion project
 * - Open to face reveal but prefers to time it with career transition
 */

export const JACOB_P1_REVERSE_BRIEF = {
  // ─── BRIEF METADATA ─────────────────────────────────
  briefId: 'MBL-BRIEF-P1-JACOB-001',
  title: 'Flight Sim Rig Rundown — P1 × JacobTaborOz',
  version: '1.0',
  createdDate: '2026-07-04',
  status: 'DRAFT' as const,

  // ─── FOR NEIL / P1 ──────────────────────────────────
  brandContact: {
    name: 'Neil',
    company: 'P1 Sim Rigs',
    website: 'https://p1simrigs.com',
    role: 'Founder / Mobileyes Partner',
  },

  // ─── CREATOR ────────────────────────────────────────
  creator: {
    name: 'Jacob',
    handle: 'JacobTaborOz',
    platforms: ['YouTube', 'Instagram', 'TikTok'],
    primaryPlatform: 'YouTube',
    niche: 'Flight Simulation (DCS)',
    audienceDemo: 'Flight sim enthusiasts, aviation professionals, military sim community',
    audienceLocation: 'Australia (primary), Global (English-speaking sim community)',
    uniqueAngle: '11 years Air Force avionics technician — brings real-world aircraft expertise to sim content. Not a general gamer — a subject matter expert.',
  },

  // ─── CAMPAIGN CONCEPT ───────────────────────────────
  concept: {
    title: 'Custom Flight Sim Rig Rundown',
    format: 'Long-form YouTube video (8-15 min)',
    description: `
Jacob showcases a custom P1 flight simulation rig built specifically for DCS.
The video walks through:
- The rig frame/cockpit setup
- Mounted peripherals (HOTAS, pedals, MFDs)
- How each component maps to real aircraft controls (Jacob's military expertise)
- Gameplay footage showing the rig in action during a DCS mission
- Honest assessment of build quality, comfort, and sim accuracy

Integration style: Organic, expert review. Not a scripted ad.
Jacob uses his real-world aviation knowledge to evaluate whether the rig
replicates actual cockpit ergonomics. This is the kind of content his audience trusts.
    `.trim(),
    callToAction: 'Affiliate link in description + pinned comment. Promo code for viewers.',
  },

  // ─── DELIVERABLES ───────────────────────────────────
  deliverables: [
    {
      platform: 'YouTube',
      format: 'Long-form video',
      duration: '8-15 minutes',
      description: 'Full rig rundown with DCS gameplay demonstration',
      dueDate: 'TBD — flexible, 4-8 weeks from rig delivery',
    },
    {
      platform: 'YouTube Shorts / TikTok / Instagram Reels',
      format: 'Short-form clips',
      duration: '30-60 seconds',
      description: '2-3 short clips cut from the main video (optional, creator discretion)',
      dueDate: 'Within 1 week of main video',
    },
  ],

  // ─── COMMERCIAL TERMS ───────────────────────────────
  commercials: {
    model: 'Affiliate + Product',
    productProvided: 'P1 sim rig (custom flight sim configuration)',
    affiliateCommission: 'TBD — standard % on sales via creator link/code',
    promoCode: 'JACOB-P1 (or similar — creator-specific)',
    creatorFee: 'To be discussed — may be product-only for pilot, or small retainer',
    agencyCommission: '20% on any cash fee (not on product value)',
    paymentTerms: '4 days from content approval (Mobileyes standard)',
    exclusivity: 'Non-exclusive. Jacob can work with other sim hardware brands.',
  },

  // ─── CREATIVE GUIDELINES ────────────────────────────
  creativeGuidelines: {
    doList: [
      'Use your real aviation knowledge to evaluate the rig authentically',
      'Reference how components map to real aircraft (F-16, A-10, etc.)',
      'Show actual DCS gameplay on the rig — immersion matters',
      'Be honest about pros and cons — audience trusts your expertise',
      'Mention P1 naturally within the flow of the review',
      'Include affiliate link in description and pinned comment',
    ],
    dontList: [
      'No scripted reads — keep it conversational and expert-led',
      'No obligation for face reveal (can show hands/rig/screen)',
      'No requirement for hand-cam or awkward filming setups',
      'No multi-video commitment — this is a single pilot project',
      'No tight deadline pressure — quality over speed',
    ],
    toneOfVoice: 'Expert, authentic, detailed. Like a military briefing meets gear review.',
  },

  // ─── ATTRIBUTION & TRACKING ─────────────────────────
  attribution: {
    utmLink: 'https://p1simrigs.com/?utm_source=youtube&utm_medium=influencer&utm_campaign=mbl-brief-p1-jacob-001&utm_content=jacobtaboroz',
    promoCode: 'JACOB-P1',
    trackingMethod: 'UTM + promo code redemption via P1 Shopify',
    conversionWebhook: 'POST https://mobileyes.live/api/webhooks/conversions',
    reportingCadence: 'Weekly sales report from P1 for first 30 days post-publish',
  },

  // ─── TIMELINE ───────────────────────────────────────
  timeline: {
    phase1: {
      title: 'Agreement & Setup',
      tasks: [
        'Jacob signs non-exclusive agreement (20% commission)',
        'Neil confirms rig spec for flight sim configuration',
        'P1 creates promo code JACOB-P1 in Shopify',
        'Mobileyes sets up UTM tracking + conversion webhook',
      ],
      duration: 'Week 1-2',
    },
    phase2: {
      title: 'Rig Delivery & Testing',
      tasks: [
        'P1 ships custom rig to Jacob (Port Stephens, NSW)',
        'Jacob assembles and tests rig with DCS',
        'Jacob plans video structure (no Mobileyes scripting)',
      ],
      duration: 'Week 3-5',
    },
    phase3: {
      title: 'Content Production',
      tasks: [
        'Jacob records rig rundown video at own pace',
        'Jacob cuts short-form clips if desired (optional)',
        'Jacob uploads — shares draft link with Joel for brief compliance check only',
      ],
      duration: 'Week 5-8 (flexible)',
    },
    phase4: {
      title: 'Launch & Tracking',
      tasks: [
        'Video goes live with affiliate link + promo code',
        'Mobileyes tracks conversions for 30 days',
        'Report shared with Neil/P1 and Jacob',
        'Evaluate pilot success → discuss ongoing relationship',
      ],
      duration: 'Week 8-12',
    },
  },

  // ─── SUCCESS METRICS ────────────────────────────────
  successMetrics: {
    primary: 'Promo code redemptions / affiliate conversions (sales)',
    secondary: [
      'Video views (first 30 days)',
      'Engagement rate (likes, comments — especially flight sim community engagement)',
      'Click-through rate on affiliate link',
      'Audience sentiment (comment quality — are flight sim enthusiasts engaging?)',
    ],
    pilotSuccess: 'Any validated sales within 30 days = successful pilot. This proves the model works for sim hardware + expert creator content.',
  },

  // ─── NOTES FOR NEIL ─────────────────────────────────
  notesForNeil: `
This is a pilot project. Low-risk for P1:
- Product seeding only (unless you want to add a cash fee — Jacob is flexible)
- Non-exclusive — you can run other creators simultaneously
- Full tracking so you'll see exactly what conversions this drives
- Jacob has real military aviation expertise which makes his reviews uniquely credible

What we need from P1:
1. Confirm the custom rig spec (flight sim optimized)
2. Create promo code (JACOB-P1) in your Shopify
3. (Optional) Shopify webhook to our conversion endpoint for real-time tracking
4. Ship rig to Jacob (Port Stephens, NSW)

I'll handle everything else — agreement with Jacob, tracking setup, content review, reporting.
  `.trim(),
}

export type ReverseBrief = typeof JACOB_P1_REVERSE_BRIEF
