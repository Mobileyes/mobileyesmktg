<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the Mobileyes Next.js App Router project. Both `posthog-js` (client-side) and `posthog-node` (server-side) were already installed; the integration adds client-side initialization, a reverse proxy, user identification on admin login, and four new event captures that fill gaps in the existing tracking.

**Key changes made:**

- Created `instrumentation-client.ts` — initialises PostHog client-side using the Next.js 15.3+ pattern, with exception capture enabled for error tracking and the `/ingest` reverse proxy as the API host.
- Updated `next.config.ts` — added `/ingest/*`, `/ingest/static/*`, and `/ingest/array/*` rewrites so analytics requests are proxied through the app domain (better ad-blocker resilience, no third-party requests in the browser).
- Set `NEXT_PUBLIC_POSTHOG_KEY` in `.env.local` with the project public token; `NEXT_PUBLIC_POSTHOG_HOST` was already present and has been updated to the correct value.

| Event | Description | File |
|---|---|---|
| `creator_application_started` | Creator began filling the application form (first field focus) | `app/(public)/creators/page.tsx` |
| `brand_brief_started` | Brand/agency began filling the campaign brief form (first field focus) | `app/(public)/brands/page.tsx` |
| `creator_captured` | Creator lead captured in the field via quick-capture form (events like Supanova), with platform, tier, context, and follower count | `app/api/public/creator-capture/route.ts` |
| `admin_logged_in` | Admin successfully authenticated into the platform (server-side) | `app/api/auth/session/route.ts` |
| `posthog.identify()` | Admin user identified in PostHog on successful login, linking client-side session to `admin@mobileyes.live` | `app/login/page.tsx` |

**Existing events already tracked (not duplicated):**

`creator_application_submitted`, `creator_accepted`, `campaign_created`, `brief_sent_to_creators`, `invoice_generated`, `invoice_paid`, `creator_payment_sent`, `outreach_email_sent`, `contact_form_submitted`, `brand_brief_submitted`

## Next steps

We've built a dashboard and five insights to keep an eye on key business metrics:

- [Analytics basics dashboard](https://us.posthog.com/project/453813/dashboard/1667861)
- [Creator Acquisition Funnel](https://us.posthog.com/project/453813/insights/oD83Hp6Y) — application started → submitted → accepted
- [Brand Brief Funnel](https://us.posthog.com/project/453813/insights/w7xlh5XG) — brief started → submitted
- [Creator Captures (Event Pipeline)](https://us.posthog.com/project/453813/insights/ZXkWX4xr) — field lead captures over time
- [Pipeline Volume](https://us.posthog.com/project/453813/insights/6ZxCVvLk) — creator applications + brand briefs per week
- [Revenue Events](https://us.posthog.com/project/453813/insights/sD8LPXSz) — invoices generated vs paid

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
