# Minneapolis Kitchen & Bath

Marketing and lead-generation website for a Twin Cities kitchen and bathroom remodeling company. Live at [minneapoliskitchenandbath.com](https://minneapoliskitchenandbath.com).

Built with Next.js (App Router), React, Tailwind CSS v4, and TypeScript. All pages are statically generated; the only server code is the contact form API route, which sends email via Resend.

## What the site contains

Roughly 165 statically generated pages, all driven by data files in `src/data/`:

- Core pages: home, about, services, service areas, blog index, contact
- 10 service pages (`/services/[slug]`)
- 17 city pages (`/service-areas/[city]`)
- 102 programmatic service-city pages (`/[service]/[city]`) for the 6 city-enabled services
- 4 neighborhood/style pages (`/[service]/[city]/[style]`)
- 26 blog posts (`/blog/[slug]`)
- 3 interactive tools: kitchen cost calculator, bathroom cost calculator, Twin Cities permit lookup

SEO infrastructure: generated `robots.txt` and `sitemap.xml`, canonical tags on every page, site-wide LocalBusiness JSON-LD plus per-page Breadcrumb and FAQ schema, Open Graph and Twitter cards, a build-time generated `/og-image.jpg`, and `public/llms.txt`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerender)
```

Environment variables (set in Vercel for production):

- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager container ID (falls back to a placeholder if unset)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - GSC verification token
- `RESEND_API_KEY` - used by `/api/contact` to deliver contact form submissions

## Deploying

Production deploys come from `git push origin main` only. The Vercel project (`giebz/minneapoliskitchenandbath`) auto-builds on push. Never deploy with the Vercel CLI; see `CLAUDE.md` for why.

## Repo layout

- `src/app/` - routes (App Router)
- `src/components/` - shared components (Header, Footer, schema, contact form, etc.)
- `src/data/` - cities, services, neighborhoods, and blog content that drive the programmatic pages and sitemap
- `marketing/` - off-site marketing playbooks and notes (not deployed)
- `research/` - SEO research artifacts and reports (not deployed)
- `scripts/` - operational scripts

## Current state

The site is live and indexed (sitemap submitted to Google Search Console, URLs submitted to IndexNow). Content is text-only so far: there are no project photos, testimonials, or email capture yet. See `CLEANUP_REPORT.md` and `CHANGELOG.md` for recent audit findings and history.
