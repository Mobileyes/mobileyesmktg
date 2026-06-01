---
inclusion: auto
---

# Mobileyes Brand Steering — v1.0 (from Brand Book May 2026)

NEVER ask for clarification on anything in the spec files.
NEVER reference Gamefluence or gamefluenceai.com anywhere.
NEVER add white element inside the MBIcon core — pure red only.
Proceed with best judgment. Confirm zero TS errors after each change.

## Brand Identity
- **Position:** LIVE VIDEO TALENT AGENCY
- **Tagline:** AU-first talent representation. Fabulate pipeline. 4-day payment. Human creators, premium briefs.
- **Hero copy:** Represent. Perform. Get paid.
- **Founder:** Joel Kirk · Gamefluence Pty Ltd · ACN 696 199 461

## Stack
Next.js 14 App Router + TypeScript strict + Tailwind CSS + Space Grotesk

## Colour System (5 tokens)
- Deep navy: #0B0F2E — Primary bg, nav, hero, all surfaces
- Electric blue: #3B82F6 — Primary CTA (Apply Now), hero accent
- REC red: #EF4444 — Icon, REC dot, live indicator
- Dark-red container: #1A0008 — Icon container only (warm, not cold)
- White: #FFFFFF — Wordmark, all body text on dark

## Typography
- Typeface: Space Grotesk (shared with Gamefluence)
- Display/Hero: 800 weight, -1px letter-spacing
- Logo: MOBILEYES all caps, Space Grotesk 800, +0.03em tracking
- Section title: 700 weight, -0.3px
- Body: 400 weight, default spacing
- Mono/Labels: Space Mono 400 (MBL-CAMP-00042 etc.)

## Logo Rules
- Icon: MBIcon — solid red radial core (NO white inside), red→orange rings
- Container: #1A0008 (dark-red tinted) — warm, not cold black
- Wordmark: MOBILEYES all caps, white always on dark
- Scale: 16px = solid red core only (favicon). 28px = inner ring appears. 44px+ = full three-layer mark.

## Component Rules
- Background: #0B0F2E — NOT #0D0D0D (navy, not near-black)
- Nav: height 52px fixed, bg #0B0F2E, border-bottom 1px solid #1E2A5E
- NO white line above nav. body { background: #0B0F2E; margin: 0; }
- Primary CTA: bg-[#3B82F6] text-white (Apply Now, Submit brief)
- Email: admin@mobileyes.live ONLY — no talent@ or campaigns@ in public-facing code

## Brief Form Rules
- Field order: name FIRST, then company
- Campaign type: 'Creator campaigns' is the selected default option
- UA conditional: show app name, CPI, platform when type=ua or both
- Route: all submissions → admin@mobileyes.live
- Helper text: "Defaults to Creator — change if you need UA or both"

## Brand Rules — DO
- White wordmark on dark surfaces always
- Icon always in its dark container (#1A0008)
- Space Grotesk for all text
- Progress bars: blue fill
- 16px minimum clear space around logo

## Brand Rules — NEVER
- Green (#1DB954) anywhere
- White element inside Mobileyes icon core — no YouTube look
- Icon on white/coloured/gradient background without dark container
- Any typeface other than Space Grotesk (system-ui for email only)
- White line or background bleed above nav
- Gamefluence mentioned on Mobileyes site or codebase

## Implementation Tasks (from Brand Book Section 07)
- M-01: Replace dot with MBIcon recording pulse (MBIcon.tsx + MobileyesLogo.tsx)
- M-02: Fix header — remove white line above nav
- M-03: Fix brief form — name first, creator default
- M-04: Add UA conditional fields to brief form
- M-05: Email routing — admin@ only
- M-06: Add platform media kit logos to talent section
