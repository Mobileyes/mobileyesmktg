# Mobileyes Platform — Steering

## Project Overview
Mobileyes is a live video gaming talent agency platform. One codebase, one Vercel deployment, one domain (mobileyes.live). Two experiences: public site for creators/brands, admin platform for Joel (founder).

## Architecture — Full Google Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Google Firestore (NoSQL)
- **Auth**: Firebase Auth (Google OAuth — admin only)
- **Storage**: Firebase Storage (media kits, agreements, invoices)
- **Email**: Resend (campaign briefs, invoices, payment confirmations)
- **Gmail Integration**: googleapis SDK (inbox sync from campaigns@)
- **Analytics**: PostHog (public + admin events)
- **Deployment**: Vercel
- **NO SQL. NO PRISMA. NO SUPABASE.**

## Key Principles
1. **No clarification questions** — proceed with best judgment
2. **Mobileyes branding only** — Gamefluence Pty Ltd appears ONLY in footer small print and invoice small print
3. **Navy + white + electric blue** — brand colours throughout
4. **Joel's voice** — direct, industry-insider, never corporate
5. **14-day payment** — the core differentiator, referenced everywhere
6. **MBL IDs** — every entity gets a Mobileyes ID (MBL-CR-XXXXX, MBL-CAMP-XXXXX, MBL-INV-XXXXX, MBL-PAY-XXXXX)

## Firestore Collections
- `creators` — talent roster
- `campaigns` — campaign tickets
- `campaignCreators` — join records (creator assigned to campaign)
- `invoices` — client invoices
- `payments` — creator payments
- `inboxBriefs` — Gmail ingestion
- `dossiers` — pre-outreach creator research (Fabulate pipeline)
- `counters` — atomic counters for MBL ID generation

## Route Structure
- `/` — Public home page
- `/about`, `/brands`, `/creators`, `/talent`, `/news`, `/contact`, `/privacy`, `/terms` — Public pages
- `/login` — Firebase Auth Google sign-in (admin only)
- `/admin` — Protected admin dashboard
- `/admin/inbox` — Gmail ingestion from campaigns@
- `/admin/creators` — Creator CRM
- `/admin/campaigns` — Campaign ticket system
- `/admin/billing` — Financial dashboard
- `/admin/analytics` — PostHog + business metrics

## Fabulate Integration
- Fabulate (Nath/Lisa) sends campaign briefs and creator referrals
- System auto-recognises @fabulate.com.au emails
- Extracts creator handles from email body
- Creates dossier records with research data
- Presents pre-outreach intel in admin before Joel reaches out

## Legal
- Trading name: Mobileyes
- Legal entity: Gamefluence Pty Ltd (ACN 696 199 461)
- Footer: "Mobileyes is a trading name of Gamefluence Pty Ltd (ACN 696 199 461). Registered in Australia. Sydney, NSW. admin@mobileyes.live"
