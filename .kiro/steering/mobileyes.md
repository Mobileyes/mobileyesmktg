---
inclusion: auto
---

# Mobileyes Platform — Steering

## Project Overview
Mobileyes is a live video gaming talent agency platform. One codebase, one Vercel deployment, one domain (mobileyes.live). Two experiences: public site for creators/brands, admin platform for Joel (founder).

## Architecture — Full Google Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Google Firestore (NoSQL)
- **Auth**: Firebase Auth (Google OAuth — admin only)
- **Storage**: Firebase Storage
- **Email**: Resend
- **Gmail Integration**: googleapis SDK (inbox sync from campaigns@)
- **Analytics**: PostHog
- **Attribution**: UTM + AppsFlyer OneLink + Promo Codes
- **Deployment**: Vercel (mobileyes.live)
- **NO SQL. NO PRISMA. Full Google stack.**

## Key Principles
1. **No clarification questions** — proceed with best judgment
2. **Never use "level up"** — use "leverage" instead
3. **Mobileyes branding only** — Gamefluence only in legal small print
4. **Navy + white + electric blue** — brand colours
5. **Joel's voice** — direct, industry-insider, never corporate
6. **4-day payment** — the core differentiator
7. **MBL IDs** — MBL-CR-XXXXX, MBL-CAMP-XXXXX, MBL-INV-XXXXX, MBL-PAY-XXXXX
8. **Platform priority**: YouTube > Twitch > Kick > TikTok > Instagram
9. **Markets**: ANZ + APAC (AU, NZ, VN, TH, ID, PH)

## Agentic Intelligence System
5 agents power the platform:
- Market Intelligence (StreamCharts, StreamElements, Sensor Tower)
- Outreach Agent (insight-powered personalised messages)
- Finance Agent (opportunity prioritisation, pipeline value)
- Creator Matching (audience overlap, fit scoring, pitch decks)
- Competitive Intelligence (market share, gaps, first-mover opportunities)

## Fabulate Integration
- Auto-recognises @fabulate.com.au emails (Nath/Lisa)
- Extracts creator handles → scrapes profiles → creates dossiers
- Presents pre-outreach intel before Joel reaches out

## Email Addresses
- admin@mobileyes.live — general admin, invoices
- talent@mobileyes.live — creator comms, briefs (set up later)
- campaigns@mobileyes.live — inbound briefs (set up later)

## Legal
- Trading name: Mobileyes
- Entity: Gamefluence Pty Ltd (ACN 696 199 461)
- Footer only: "Mobileyes is a trading name of Gamefluence Pty Ltd (ACN 696 199 461). Sydney, Australia."

## Deploy
- `npx vercel deploy --prod --yes` from project root
- Site: https://mobileyes.live
- Admin: https://mobileyes.live/admin
