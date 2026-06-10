# CLEANUP REPORT — Minneapolis Kitchen & Bath

Generated 2026-06-09 by claude-code.

## TECHNICAL SEO

Audit of all public pages (~165 URLs: home, about, contact, 10 service pages, 17 city pages, 102 service-city pages, 4 neighborhood pages, 26 blog posts, 3 tools).

### Fixed in this pass
- **Missing OG image (was a live 404).** `src/app/layout.tsx`, the LocalBusiness schema, blog posts, and all programmatic city/style pages reference `https://minneapoliskitchenandbath.com/og-image.jpg`, but no such file existed. Added `src/app/og-image.jpg/route.tsx`, a build-time-generated 1200x630 image served at that exact URL (verified 200, `image/png`). All 8 existing references now resolve without touching them.
- **Missing canonical tags on `/about` and `/contact`.** Every other page had one. Added `alternates.canonical` to both (verified in rendered HTML).

### Already in good shape (no action taken)
- Unique title + meta description on every page, via static metadata or `generateMetadata` driven by the data files.
- Open Graph + Twitter card tags site-wide via the root layout, with per-page OG on blog and programmatic pages.
- Exactly one `<h1>` per page, headings descend logically (h1 then h2 then h3).
- No `<img>` elements anywhere (the site is text/CSS only), so no alt-text issues exist.
- `robots.ts` generates a correct robots.txt: allows everything except `/api/`, declares the sitemap.
- `sitemap.ts` generates sitemap.xml covering all page types, with real lastModified dates on blog posts.
- Canonicals all point to live, self-referencing URLs. Blog data supports an external `canonical` field for syndicated posts; none currently in use.
- All internal links resolve. Hardcoded blog links match slugs in `src/data/blog.ts`; dynamic links are generated from the same data files that generate the routes, so they cannot drift.
- Schema markup is extensive: site-wide `HomeAndConstructionBusiness` (LocalBusiness subtype) with areaServed driven by the cities data, plus BreadcrumbList and FAQPage JSON-LD components used across pages.

### Noted, not fixed (judgment calls, out of scope per instructions)
- Many page titles exceed 60 characters once the ` | Minneapolis Kitchen & Bath` template suffix is appended (the suffix alone is 30 chars). Titles are unique and descriptive; shortening them means rewriting copy.
- The LocalBusiness schema `telephone` is `+16125550000`, a 555 placeholder (see Marketing below).
- `sameAs` in the LocalBusiness schema is an empty array. Real profile URLs would strengthen the entity, but inventing them is not an option.

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
- **Exists:** contact form on `/contact` (posts to `/api/contact` via Resend), "Get a Free Quote" CTAs in the header, homepage hero, homepage footer CTA, and on the tools pages. Phone links in header and footer.
- **Missing:** no email capture anywhere. A reader who finishes a cost guide has no option besides "request a quote," which is too big an ask at research stage. The calculators collect project details and then throw the answer away; they are the natural place to offer "email me my estimate" and they currently capture nothing.
- **Broken in spirit:** every phone link is `tel:+16125550000`, a 555 placeholder. Anyone who taps to call gets nothing. Same number is in the LocalBusiness schema.

### Quick wins, ranked by effort
1. **Replace the placeholder phone number** in Header, Footer, and LocalBusinessSchema with a real one (even a tracking number). Minutes of work; right now the primary conversion path for mobile users is a dead number.
2. **Set the real GTM container ID.** `NEXT_PUBLIC_GTM_ID` falls back to `GTM-XXXXXXX`, so if the env var is not set in Vercel, the site has no analytics and no conversion tracking at all. Verify in Vercel env settings.
3. **Add Google Business Profile and any social URLs to `sameAs`** in the schema once they exist.
4. **Add "email me my estimate" to both calculators.** The form infrastructure (Resend) already exists; this turns the highest-intent traffic on the site into a lead list.
5. **Add 3 to 5 real project photos and 2 to 3 testimonials** to the homepage and top service pages. Highest impact item on this list, but requires real assets from Jake, not code.
6. **Beef up the top 6 to 8 city pages** (Minneapolis, Saint Paul, Edina, Minnetonka, Eden Prairie, Plymouth) with genuinely local detail before adding any more programmatic breadth. More thin pages will not help until the existing ones can rank.
