---
inclusion: auto
---

# Platform API Integration Guide

## YouTube Data API v3
- **Status**: Ready to connect
- **Cost**: Free (10,000 units/day)
- **Env var**: `YOUTUBE_API_KEY`
- **Endpoints used**:
  - `GET /youtube/v3/channels?part=snippet,statistics&forHandle={handle}` — creator profile
  - `GET /youtube/v3/search?part=snippet&channelId={id}&type=video&eventType=completed` — recent streams
  - `GET /youtube/v3/videos?part=statistics,liveStreamingDetails&id={id}` — video/stream metrics

## Twitch Helix API
- **Status**: Ready to connect
- **Cost**: Free
- **Env vars**: `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`
- **Endpoints used**:
  - `GET /helix/users?login={handle}` — creator profile
  - `GET /helix/streams?user_login={handle}` — live status
  - `GET /helix/videos?user_id={id}&type=archive` — recent VODs
  - `GET /helix/channels?broadcaster_id={id}` — channel info

## Kick API
- **Status**: Public endpoints available (no auth needed for basic data)
- **Cost**: Free
- **Endpoints used**:
  - `GET https://kick.com/api/v2/channels/{handle}` — creator profile
  - `GET https://kick.com/api/v2/channels/{handle}/livestream` — live status

## StreamCharts
- **Status**: Pending (contact Ana for API access)
- **Value**: Active sponsorship detection, top streamers by game, hours watched
- **Manual fallback**: Web scraping of public leaderboards

## StreamElements
- **Status**: Public leaderboards available
- **Value**: Streamer rankings, trending categories
- **Endpoint**: `GET https://api.streamelements.com/kappa/v2/channels/{id}/stats`
