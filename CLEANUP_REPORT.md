# CLEANUP REPORT — Minneapolis Kitchen & Bath

Generated 2026-06-09 by claude-code. Covers the one-time cleanup pass plus the technical SEO pass run the same day.

## FIXED

- Added the missing `/og-image.jpg` (it was referenced in 8 places, including the LocalBusiness schema and every page's OG tags, but returned 404 in production); now generated at build time at that exact URL. Shipped to main, verified live.
- Added canonical tags to `/about` and `/contact`, the only two pages missing them. Shipped to main, verified live.
- Replaced the placeholder phone number (612) 555-0000 with the real number (612) 688-2413 in all 11 code locations: header, footer, contact page, and every JSON-LD telephone field. Shipped to main, verified live. (Done at Jake's request mid-session.)
- Updated the stale placeholder phone in `public/llms.txt` to the real number.
- Installed the missing `lucide-react` dependency locally; the build was failing on `src/components/LeadCapture.tsx` because a remote commit added the import without the package being installed here.
- Deleted `README_TEMP.md`, a leftover one-line stub.
- Rewrote `README.md`; it was the untouched create-next-app boilerplate and described nothing about the actual project (wrong font, wrong paths, generic deploy advice that contradicts this repo's git-only deploy rule).
- Deleted 5 unused create-next-app default SVGs from `public/` (file, globe, next, vercel, window); nothing referenced them and they were shipping to production.
- Deleted 5 stale research artifacts (`internal-linking-fixes.json`, `internal-linking-report.md`, `schema-suggestions.md`, `schema-coverage-report.md`, `schema-fraud-flags.md`): the linking audit ran against route templates instead of real pages, the schema suggestions used the wrong domain and recommended things that now exist, and all are regenerable from the scripts in `scripts/`.
- Added the missing Article and BreadcrumbList JSON-LD to the flagship static post `/blog/kitchen-remodel-cost-minneapolis` (the one real gap the stale schema report pointed at; every other blog post already had both via the `[slug]` template). Verified rendering.
- Committed `scripts/vercel-should-build.sh` (the Vercel build-skip helper was untracked) and gitignored `research/*.log`.

## BLOCKED

- Nothing. Dependencies installed, the production build passes, and all pages prerender. No fix hit the 3-attempt limit.

## SKIPPED

- `AGENTS.md` is locally a symlink to `~/AGENTS.md` (git shows a typechange against the committed 5-line Next.js note). Left untouched: it looks like deliberate local setup, and committing a symlink to an absolute home-directory path would break the repo anywhere else.
- Untracked `research/index-submit.log` and `scripts/vercel-should-build.sh` left as-is; they predate this pass and appear to be in active use by other tooling.
- Page titles that exceed 60 characters once the ` | Minneapolis Kitchen & Bath` template suffix (30 chars) is appended. Titles are unique and descriptive; shortening them means rewriting copy, which was out of scope.
- The empty `sameAs: []` in the LocalBusiness schema. Real profile URLs (Google Business Profile, Houzz, etc.) would help, but inventing URLs is worse than leaving it empty.
- `NEXT_PUBLIC_GTM_ID` falls back to `GTM-XXXXXXX` in code. Whether the real ID is set is a Vercel env question, not a code fix; flagged below instead.
- The 102 programmatic service-city pages and 4 neighborhood pages are thin and template-driven, but thinning or rewriting them is content strategy, explicitly out of scope.
- No alt-text work was needed: the site contains zero `<img>` elements (text and CSS only).
- Everything else on the SEO checklist already passed: unique titles/descriptions on all ~165 pages, OG/Twitter cards site-wide, one H1 per page with logical heading order, correct robots.txt and sitemap.xml, self-referencing canonicals, all internal links resolving (dynamic links are generated from the same data files as the routes), and extensive JSON-LD (LocalBusiness, BreadcrumbList, FAQPage).

## MARKETING OPPORTUNITIES

Observations only. Nothing below was changed.

### What the site targets
Twin Cities homeowners researching kitchen and bathroom remodels, at two intent levels: research intent (26 blog posts on costs, timelines, permits, materials; 3 interactive cost/permit tools) and hire intent (service pages, 17 city pages, 102 programmatic service-city pages, 4 neighborhood pages). The strategy is local SEO dominance for "kitchen/bathroom remodel + [city]" queries, with cost transparency as the hook. Pricing is unusually upfront for a contractor site (tiered cost ranges on the homepage FAQ, dedicated cost guides, two calculators), which is a genuine differentiator.

### Obvious content gaps
- **Zero photos.** The entire site has no images: no project gallery, no before/after, no team photo. Remodeling is the most visual purchase category there is; every competitor with a phone camera beats this. This is the single largest gap.
- **No testimonials or reviews anywhere.** No review schema, no quotes, no Google review embed. For a high-ticket trust purchase, social proof is absent.
- **No project/portfolio case studies.** The blog explains costs well but never shows "here is a real Edina kitchen we did for $62K and how it went," which is the content that converts researchers into callers.
- **Services with no supporting blog content:** basement remodeling, whole-house remodel, and Schluter-certified shower installation have service pages but little or no blog coverage driving traffic to them (the shower/waterproofing posts come closest).

### Thin pages unlikely to rank
- The 102 `[service]/[city]` programmatic pages and 4 neighborhood/style pages are template-generated from the same data. City pages for smaller suburbs (for example Wayzata, Richfield) likely differ only in the city name and a few data points. Google treats near-duplicate location pages as doorway pages; the 6 to 8 highest-opportunity city pages would benefit from genuinely local content (local permit quirks, housing stock, completed projects) and the long tail may never rank as-is.
- The 4 neighborhood pages are a thin layer on top of an already-thin layer.

### Lead capture
- **Exists:** contact form on `/contact` (posts to `/api/contact` via Resend), "Get a Free Quote" CTAs in the header, homepage hero, homepage footer CTA, and on the tools pages. Phone links in header and footer (now a real number).
- **Missing:** no email capture anywhere. A reader who finishes a cost guide has no option besides "request a quote," which is too big an ask at research stage. The calculators collect project details and then throw the answer away; they are the natural place to offer "email me my estimate" and they currently capture nothing. (A `LeadCapture` component recently appeared in the codebase, so this may already be in progress.)

### Quick wins, ranked by effort
1. **Set the real GTM container ID.** `NEXT_PUBLIC_GTM_ID` falls back to `GTM-XXXXXXX`, so if the env var is not set in Vercel, the site has no analytics and no conversion tracking at all. Verify in Vercel env settings.
2. **Add Google Business Profile and any social URLs to `sameAs`** in the schema once they exist.
3. **Add "email me my estimate" to both calculators.** The form infrastructure (Resend) already exists; this turns the highest-intent traffic on the site into a lead list.
4. **Add 3 to 5 real project photos and 2 to 3 testimonials** to the homepage and top service pages. Highest impact item on this list, but requires real assets from Jake, not code.
5. **Beef up the top 6 to 8 city pages** (Minneapolis, Saint Paul, Edina, Minnetonka, Eden Prairie, Plymouth) with genuinely local detail before adding any more programmatic breadth. More thin pages will not help until the existing ones can rank.
