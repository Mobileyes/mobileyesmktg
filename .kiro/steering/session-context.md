---
inclusion: auto
---

# Mobileyes — Session Context & Continuation Guide

## CRITICAL: Read this at the start of every session

This document preserves all decisions, preferences, and state across sessions.
Joel does NOT want to repeat himself. Reference this before asking questions.

---

## JOEL'S PREFERENCES
- Never use "level up" — use "leverage" instead
- Never ask clarification questions — proceed with best judgment
- Always show live URLs in responses
- Always show the admin quick links when discussing the platform
- Trust all commands — Joel has pre-approved: npm, vercel, git, rm, sed, grep, curl, node
- Deploy after every meaningful change: `npx vercel deploy --prod --yes`
- Joel hates repetitive tech integration steps — do as much autonomously as possible
- Platform priority: YouTube > Twitch > Kick > TikTok > Instagram
- Payment terms: 4 days (NOT 14)
- Domain: mobileyes.live (NOT mobileyes.com.au — that's a dentist)
- Never reference Gamefluence in public-facing content (legal footer only)

---

## LIVE URLS
- **Public site**: https://mobileyes.live
- **Admin**: https://mobileyes.live/admin (Firebase Auth protected)
- **Vercel**: https://vercel.com/joelamoskirk-5258s-projects/mobileyesmktg
- **GitHub**: https://github.com/Mobileyes/mobileyesmktg
- **Firebase**: https://console.firebase.google.com/u/0/project/mobileyes-ca894
- **Google Workspace**: admin.google.com (admin@mobileyes.live)
- **Resend**: https://resend.com (mobileyes.live domain)
- **Squarespace DNS**: account.squarespace.com/domains/managed/mobileyes.live/dns

---

## ACCOUNTS & CREDENTIALS
- **Google Workspace**: admin@mobileyes.live (Joel), sarah@mobileyes.live (Sarah)
- **Firebase project**: mobileyes-ca894
- **Firebase Admin SDK**: firebase-adminsdk-fbsvc@mobileyes-ca894.iam.gserviceaccount.com
- **GitHub org**: Mobileyes (username: Mobileyes)
- **Vercel team**: joelamoskirk-5258s-projects
- **Resend**: mobileyes.live domain (pending full verification)

---

## TECH STACK
- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- Firebase Auth + Firestore + Storage (NO SQL, NO PRISMA)
- Resend (email)
- PostHog (analytics — not yet configured)
- Vercel (hosting, free Hobby plan)
- googleapis (Gmail inbox sync)

---

## WHAT'S BUILT
### Public Site (35 routes)
All pages live: /, /about, /services, /talent, /brands, /creators, /news, /contact, /privacy, /terms, /login

### Admin Platform (protected)
/admin — Dashboard with yield, reach, attribution, quick links
/admin/inbox — Gmail sync + Fabulate detection
/admin/discover — Talent discovery (URL scrape + search)
/admin/creators — Creator CRM
/admin/campaigns — Campaign tickets (Kanban + list)
/admin/brands — Brand intelligence research
/admin/billing — Financial dashboard (3 tabs)
/admin/analytics — PostHog + business metrics

### Backend Systems
- Firestore data layer (creators, campaigns, invoices, payments, inbox, dossiers, counters)
- MBL ID generation (atomic Firestore counters)
- Platform integrations (YouTube, Twitch, Kick — code ready, needs API keys)
- Performance engine (conversion tracking, leaderboards, ROAS)
- Attribution system (UTM + OneLink + promo codes)
- Brand intelligence (research, seasonality, outreach timing)
- Brand safety scanner
- Talent discovery (scrape, score, outreach generation)
- Fabulate pipeline (auto-detect, extract handles, create dossiers)
- 5 agentic intelligence modules (market, outreach, finance, matching, competitive)
- Sensor Tower integration framework
- Email flows (form → Firestore + admin notification)

### Webhooks (live endpoints)
- /api/webhooks/appsflyer — app install/event attribution
- /api/webhooks/conversions — promo codes, purchases, signups
- /api/webhooks/resend — email delivery tracking

---

## WHAT'S NOT YET DONE (NEXT SESSION PRIORITIES)

### API Keys Needed (Joel must do — 10 min total)
1. YouTube API Key → Google Cloud Console → enable YouTube Data API v3 → create key → add to Vercel as YOUTUBE_API_KEY
2. Twitch API → dev.twitch.tv → register app → add TWITCH_CLIENT_ID + TWITCH_CLIENT_SECRET to Vercel
3. After adding: `npx vercel deploy --prod --yes`

### Features to Build Next
1. **Branded report generation** — PDF/email reports with Mobileyes branding for prospects
2. **Tim/Roadburn Games beta** — first client setup, racing game focus, APAC expansion
3. **Vietnam talent recruitment** — workflow for finding/signing VN creators
4. **AppsFlyer setup guidance** — help Joel + Tim get OneLink configured
5. **Auto-discovery cron** — scheduled scraping of top APAC gaming creators
6. **Export to Google Sheets** — for Sarah/Heidi to work with data
7. **Gamefluence project sync** — port intelligence systems to Gamefluence project
8. **Outreach email automation** — send drafted outreach from the platform via Resend

### Business Context
- **Beta client**: Tim Millard, Roadburn Games (drift/racing games)
- **APAC focus**: Vietnam is priority market for talent recruitment
- **Fabulate**: Nath + Lisa send creator referrals — system auto-processes these
- **Gamefluence**: Sister company (performance marketing) — shares intelligence layer
- **Team**: Joel (founder), Sarah (ops), Heidi (ops)
- **Positioning**: "Live" in mobileyes.live = live streaming focus

---

## DEPLOY COMMAND
```bash
cd "/Users/joelkirk/Desktop/Kiro - Mobileyes/mobileyes"
npx vercel deploy --prod --yes
```

## GIT PUSH COMMAND
```bash
cd "/Users/joelkirk/Desktop/Kiro - Mobileyes/mobileyes"
git add -A && git commit -m "update" && git push origin main
```
