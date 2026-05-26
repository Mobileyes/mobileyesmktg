# Talent Discovery Pipeline

## Goal
Auto-discover, scrape, score, and outreach gaming creators across YouTube, Twitch, Kick, and TikTok.

## Workflow
1. **Discover** — Search platforms by game, genre, market, or ingest from Fabulate referral
2. **Scrape** — Pull profile data: followers, engagement, content, audience demographics
3. **Score** — Brand safety (0-100), audience quality, engagement quality, growth trend
4. **Research** — Check for existing representation, previous brand deals, red flags
5. **Generate Outreach** — Personalised message based on their content and our active campaigns
6. **Queue for Review** — Joel reviews before any outreach is sent
7. **Track** — Monitor response, follow-up, conversion to signed creator

## Data Sources
- YouTube Data API v3 (free, 10K units/day)
- Twitch Helix API (free, needs Client ID)
- Kick API (public endpoints)
- TikTok Research API (requires business verification)
- Social Blade (paid API for growth/authenticity)
- StreamCharts (Ana contact — sponsorship detection)

## Success Criteria
- Creator profile scraped within 30 seconds of URL input
- Brand safety score generated automatically
- Outreach message generated with personalised insights
- Full pipeline visible in /admin/discover
