---
inclusion: auto
---

# Attribution Engine — Steering Doc v1.0

Cross-platform server-to-server (S2S) attribution for Mobileyes and Gamefluence.
This file governs how we track, attribute, and report creator-driven conversions.

## Architecture

```
Creator posts content (YouTube/TikTok/Twitch/Kick/Discord)
    ↓
User clicks tracking link (UTM / OneLink / promo code / Discord invite)
    ↓
User converts (install / purchase / signup / join server)
    ↓
Brand's system fires webhook → mobileyes.live/api/webhooks/*
    ↓
Our Performance Engine records the conversion
    ↓
We fire S2S events back to ad networks (so brand sees it in THEIR dashboards)
    ↓
Creator gets attributed → paid within 4 days
```

## Supported Platforms & Attribution Methods

### YouTube
- **Tracking:** UTM links in video description + pinned comment
- **Format:** `?utm_source=youtube&utm_medium=influencer&utm_campaign=MBL-CAMP-XXXXX&utm_content=CREATOR_HANDLE`
- **S2S:** Google Ads Offline Conversions (brand provides conversion action ID)
- **Measurement:** Views, clicks (via UTM), installs/purchases (via webhook)

### TikTok
- **Tracking:** UTM link in bio + TikTok Pixel click ID (ttclid)
- **Format:** Same UTM structure. Bio link → landing page with ttclid capture.
- **S2S:** TikTok Events API (brand provides access_token + pixel_code)
- **Measurement:** Views, profile visits, link clicks, installs (via S2S)
- **Note:** TikTok doesn't allow clickable links in video captions. Must use bio link or TikTok Shop.

### Twitch
- **Tracking:** UTM links in chat, panels, channel points redemption
- **Format:** Same UTM structure + Twitch extension tracking where available
- **S2S:** Via AppsFlyer/Adjust postback (brand's MMP handles Twitch attribution)
- **Measurement:** Live viewers during sponsored segment, chat engagement, link clicks

### Kick
- **Tracking:** UTM links in chat, bio panel
- **Format:** Same UTM structure
- **S2S:** Same as Twitch — brand's MMP handles postback
- **Measurement:** Live viewers, chat engagement, link clicks
- **Note:** Kick API is less mature. Manual tracking may be needed for some metrics.

### Discord
- **Tracking:** Custom invite links with tracking params, promo codes, role-gated content
- **Format:** `discord.gg/INVITE_CODE?utm_source=discord&utm_campaign=MBL-CAMP-XXXXX`
- **S2S:** Discord doesn't have a conversion API. Track via:
  - Custom bot that logs join source (invite code → creator attribution)
  - Promo code redemption within Discord (bot-managed)
  - Role assignment tracking (who joined via which creator's link)
- **JP context:** JP has just joined Discord. Run influencer ads featuring our creators within Discord. Track via unique invite codes per creator.
- **Measurement:** Server joins, role acquisitions, message engagement, promo redemptions

### Instagram
- **Tracking:** UTM link in bio (one link only), story swipe-ups, Reels
- **S2S:** Meta Conversions API (CAPI) — same as Facebook
- **Measurement:** Story views, link clicks, profile visits

## S2S Partner Configuration

Each campaign can have multiple S2S configs. The BRAND provides credentials:

| Partner | What they provide | What we send |
|---------|------------------|--------------|
| AppsFlyer | Postback URL (already built) | We receive postbacks at /api/webhooks/appsflyer |
| TikTok Events API | access_token + pixel_code | We POST conversion events to their API |
| Meta CAPI | access_token + pixel_id | We POST conversion events to Graph API |
| Google Ads | OAuth + conversion_action_id | We upload offline conversions |
| Adjust | app_token + event_tokens | We POST to s2s.adjust.com |
| Singular | api_key | We POST to s2s.singular.net |

## UTM Structure (standard across all platforms)

```
utm_source:   platform (youtube, tiktok, twitch, kick, discord, instagram)
utm_medium:   influencer
utm_campaign: MBL-CAMP-XXXXX (our campaign ID)
utm_content:  creator_handle (lowercase, no @)
utm_term:     (optional) content_type (stream, video, short, post)
```

## Promo Code Structure

```
FORMAT:  CREATOR-CAMPID
EXAMPLE: NINJA-00001
RULES:   Time-limited (48hr default), max uses (100 default), creator-attributed
```

## AppsFlyer OneLink Structure

```
pid:         mobileyes
c:           MBL-CAMP-XXXXX
af_adset:    creator_handle
af_ad:       platform_creator (e.g. youtube_ninja)
af_channel:  platform (youtube, tiktok, twitch, kick)
```

## Discord-Specific Attribution (for JP + influencer ads)

### Flow:
1. Create unique Discord invite per creator (e.g. discord.gg/mb-ninja)
2. Creator promotes the invite in their content
3. Our Discord bot tracks which invite code each new member used
4. Attribute the join to the creator
5. Track downstream activity (purchases via promo codes, role upgrades)

### Discord Bot Requirements:
- Track invite code usage (which creator's link)
- Log member joins with source attribution
- Manage promo code redemption (#promo-codes channel)
- Report engagement metrics per creator's referrals

### Discord Ad Strategy (JP):
- Run ads within Discord featuring our managed creators
- Ads drive to: server join (via tracked invite) or mobileyes.live/creator
- Track: ad impressions → server joins → campaign conversions

## Reporting

Every campaign gets a post-campaign report with:
- Per-creator breakdown (clicks, conversions, revenue, ROAS)
- Platform comparison (which platform drove best results)
- Attribution source split (UTM vs promo code vs OneLink vs S2S)
- Cost per conversion by creator
- Comparison vs paid media benchmarks

## Webhook Endpoints (live)

| Endpoint | Purpose | Status |
|----------|---------|--------|
| /api/webhooks/appsflyer | Receive app install/event postbacks | ✅ Live |
| /api/webhooks/conversions | Generic conversion webhook (promo codes, purchases) | ✅ Live |
| /api/webhooks/resend | Email delivery tracking | ✅ Live |

## Implementation Notes

- S2S events fire AFTER we record the conversion in our own system
- Brand credentials stored per-campaign (not global)
- All S2S calls are async — don't block the webhook response
- Log all S2S attempts for debugging (success/fail per partner)
- Hashing required for PII sent to Meta CAPI (SHA256)
- TikTok Events API requires Unix timestamp (seconds, not ms)
