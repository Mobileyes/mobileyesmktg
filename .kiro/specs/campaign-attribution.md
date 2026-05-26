# Campaign Attribution

## Goal
Track every campaign from impression to conversion with full creator-level attribution.

## Attribution Methods
1. **UTM Parameters** — unique per creator per campaign, tracked via PostHog/GA4
2. **AppsFlyer OneLink** — deep link attribution for app install campaigns
3. **Promo Codes** — time-limited, creator-specific, trackable redemptions
4. **Pixel/Postback** — for brands with their own attribution (pass data back)

## UTM Structure
- utm_source: platform (youtube, twitch, kick, tiktok)
- utm_medium: influencer
- utm_campaign: mbl-camp-xxxxx
- utm_content: creator_handle

## OneLink Structure
- pid: mobileyes
- c: campaign_id
- af_adset: creator_handle
- af_ad: platform_creator
- af_channel: platform

## Promo Code Format
- CREATOR-CAMPID (e.g. NINJA-00001)
- Time-limited (48hr default, configurable)
- Max uses (100 default, configurable)
- Creator-attributed in reporting

## Reporting
- Clicks, impressions, installs per creator
- Cost per click, cost per install, cost per conversion
- ROAS calculation per creator
- Comparison vs paid media benchmarks

## Success Criteria
- Every campaign brief includes tracking URLs + promo codes
- Post-campaign report generated within 48 hours
- Full attribution chain visible in admin dashboard
