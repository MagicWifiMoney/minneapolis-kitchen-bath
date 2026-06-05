import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  serviceByUrlSegment,
  services,
} from "@/data/services";
import { cities, cityBySlug } from "@/data/cities";
import { blogPostBySlug } from "@/data/blog";
import { neighborhoodPages } from "@/data/neighborhoods";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { CTA } from "@/components/CTA";
import { RelatedLinks } from "@/components/RelatedLinks";

type RouteParams = { service: string; city: string };

// Curated planning guides per service so each city page links out to relevant
// blog content (helps users plan, and gives these pages real internal links).
const SERVICE_GUIDE_SLUGS: Record<string, string[]> = {
  "kitchen-remodeling": [
    "kitchen-remodel-cost-minneapolis",
    "kitchen-remodel-timeline-twin-cities",
    "minneapolis-kitchen-remodel-permits",
  ],
  "bathroom-remodeling": [
    "bathroom-remodel-cost-minneapolis",
    "bathroom-tile-trends-2026",
    "small-bathroom-remodel-ideas-minneapolis",
  ],
  "custom-cabinetry": [
    "best-kitchen-cabinet-brands-2026",
    "kitchen-cabinet-brands-twin-cities",
    "crystal-cabinets-minnesota-review",
  ],
  countertops: [
    "quartz-vs-granite-countertops",
    "cambria-quartz-minnesota-made-guide",
    "kitchen-remodel-cost-minneapolis",
  ],
  "general-contractor": [
    "remodel-vs-renovation",
    "30-percent-rule-remodeling",
    "realistic-budget-kitchen-remodel",
  ],
  "schluter-showers": [
    "tile-shower-waterproofing-guide",
    "curbless-shower-design-guide",
    "walk-in-shower-no-door",
  ],
};

export async function generateStaticParams(): Promise<RouteParams[]> {
  const enabledServices = services.filter((s) => s.isCityPageEnabled);
  const params: RouteParams[] = [];
  for (const svc of enabledServices) {
    for (const c of cities) {
      params.push({ service: svc.urlSegment, city: c.slug });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { service: serviceSeg, city: citySlug } = await params;
  const service = serviceByUrlSegment[serviceSeg];
  const city = cityBySlug[citySlug];
  if (!service || !city || !service.isCityPageEnabled) return {};

  const url = `https://minneapoliskitchenandbath.com/${service.urlSegment}/${city.slug}`;
  const title = service.metaTitleTemplate(city.name);
  const description = service.metaDescriptionTemplate(city.name);

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${city.name}`,
      `${service.shortName.toLowerCase()} ${city.name} MN`,
      `${city.name} ${service.shortName.toLowerCase()} contractor`,
      `best ${service.shortName.toLowerCase()} ${city.name}`,
      `${service.name.toLowerCase()} cost ${city.name}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { service: serviceSeg, city: citySlug } = await params;
  const service = serviceByUrlSegment[serviceSeg];
  const city = cityBySlug[citySlug];
  if (!service || !city || !service.isCityPageEnabled) notFound();

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `https://minneapoliskitchenandbath.com/${service.urlSegment}/${city.slug}#business`,
    name: `Minneapolis Kitchen & Bath — ${service.shortName} in ${city.name}`,
    url: `https://minneapoliskitchenandbath.com/${service.urlSegment}/${city.slug}`,
    telephone: "+16125550000",
    email: "hello@minneapoliskitchenandbath.com",
    description: service.metaDescriptionTemplate(city.name),
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: "MN",
        addressCountry: "US",
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lng,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Minneapolis",
      addressRegion: "MN",
      postalCode: "55401",
      addressCountry: "US",
    },
    priceRange: "$$",
    image: "https://minneapoliskitchenandbath.com/opengraph-image",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://minneapoliskitchenandbath.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://minneapoliskitchenandbath.com/service-areas" },
      { "@type": "ListItem", position: 3, name: city.name, item: `https://minneapoliskitchenandbath.com/service-areas/${city.slug}` },
      { "@type": "ListItem", position: 4, name: `${service.shortName} in ${city.name}`, item: `https://minneapoliskitchenandbath.com/${service.urlSegment}/${city.slug}` },
    ],
  };

  // City-localized FAQs — reused for both the visible section and the JSON-LD
  // so the structured data always matches the rendered text.
  const localizedFaqs = (service.faqs ?? []).map((f) => ({
    question: f.question.replace("Minneapolis", city.name),
    answer: f.answer.replace(/Minneapolis|Twin Cities/g, city.name),
  }));

  const faqSchema = localizedFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localizedFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  const serviceIntro = service.cityIntroTemplate(city.name, city.localAngle);
  const guideLinks = (SERVICE_GUIDE_SLUGS[service.slug] ?? [])
    .map((s) => blogPostBySlug[s])
    .filter(Boolean)
    .map((p) => ({
      href: `/blog/${p.slug}`,
      title: p.title,
      description: p.excerpt,
    }));
  // Neighborhood-specific guides for this exact service + city, so the deep
  // long-form pages are discoverable (and not orphaned in the sitemap alone).
  const neighborhoodGuides = neighborhoodPages
    .filter(
      (n) =>
        n.serviceUrlSegment === service.urlSegment && n.citySlug === city.slug,
    )
    .map((n) => ({
      href: `/${n.serviceUrlSegment}/${n.citySlug}/${n.slug}`,
      title: `${n.neighborhoodName} ${n.homeStyle} ${service.shortName}`,
      description: n.metaDescription,
    }));
  const relatedServices = service.relatedServiceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter(Boolean) as typeof services;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Service Areas", href: "/service-areas" },
              { name: city.name, href: `/service-areas/${city.slug}` },
              { name: service.shortName },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {service.h1Template(city.name)}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {service.hero}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href={`/services/${service.slug}`}
              className="bg-white/10 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-colors"
            >
              About {service.shortName}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro + local angle */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            {serviceIntro}
          </p>
          <p className="text-slate-700 leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            What&apos;s Included in a {city.name} {service.shortName}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.whatsIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-slate-700"
              >
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            {city.name} {service.shortName} Cost Ranges (2026)
          </h2>
          <p className="text-slate-600 mb-6 max-w-3xl">
            Real pricing tiers based on actual {city.name}-area projects.
            {city.medianHomeValue > 500000
              ? ` ${city.name} budgets typically run in the mid-to-high range, given the ${"$" +
                  city.medianHomeValue.toLocaleString()} median home value.`
              : ` ${city.name}'s median home value of ${"$" +
                  city.medianHomeValue.toLocaleString()} supports the mid-range tier most commonly.`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.priceRange.map((t) => (
              <div
                key={t.tier}
                className="bg-white border border-slate-200 rounded-lg p-5"
              >
                <div className="font-semibold text-slate-900 mb-1">{t.tier}</div>
                <div className="text-2xl font-bold text-blue-700 mb-2">
                  {t.range}
                </div>
                <div className="text-sm text-slate-600">{t.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Our Process
          </h2>
          <ol className="space-y-4">
            {service.process.map((p, i) => (
              <li
                key={p.step}
                className="flex gap-4 bg-white border border-slate-200 rounded-lg p-5"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-slate-900 mb-1">
                    {p.step}
                  </div>
                  <div className="text-slate-700">{p.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Local detail: neighborhoods + home styles + permits */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            About Remodeling in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Neighborhoods we serve in {city.name}
              </h3>
              <p className="text-slate-700">
                {city.neighborhoods.join(", ")}
                {city.zip.length > 0 && (
                  <>
                    {" "}
                    — covering ZIP codes{" "}
                    {city.zip.slice(0, 8).join(", ")}
                    {city.zip.length > 8 ? "…" : ""}.
                  </>
                )}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Typical {city.name} homes
              </h3>
              <p className="text-slate-700">
                {city.homeStyles.join(", ")}.
              </p>
            </div>
          </div>
          <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-amber-900 mb-2">
              {city.name} permit notes
            </h3>
            <p className="text-amber-900/90 text-sm leading-relaxed">
              {city.permitNote}
              {city.permitOfficeUrl && (
                <>
                  {" "}
                  <a
                    href={city.permitOfficeUrl}
                    target="_blank"
                    rel="noopener nofollow"
                    className="underline hover:text-amber-700"
                  >
                    {city.name} permit office →
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={localizedFaqs}
        heading={`${city.name} ${service.shortName} FAQs`}
        withSchema={false}
      />

      <CTA
        heading={`Ready to start your ${city.name} ${service.shortName.toLowerCase()}?`}
        subheading={`Free in-home consultation and quote. Most ${city.name} quotes delivered within 48 hours.`}
      />

      {neighborhoodGuides.length > 0 && (
        <RelatedLinks
          heading={`${city.name} neighborhood ${service.shortName.toLowerCase()} guides`}
          links={neighborhoodGuides}
          columns={neighborhoodGuides.length >= 3 ? 3 : 2}
        />
      )}

      {guideLinks.length > 0 && (
        <RelatedLinks
          heading={`${city.name} ${service.shortName.toLowerCase()} planning guides`}
          links={guideLinks}
        />
      )}

      <RelatedLinks
        heading={`Related services in ${city.name}`}
        links={[
          ...relatedServices
            .filter((s) => s.isCityPageEnabled)
            .map((s) => ({
              href: `/${s.urlSegment}/${city.slug}`,
              title: `${s.shortName} in ${city.name}`,
              description: s.tagline,
            })),
          ...relatedServices
            .filter((s) => !s.isCityPageEnabled)
            .map((s) => ({
              href: `/services/${s.slug}`,
              title: s.name,
              description: s.tagline,
            })),
          {
            href: `/service-areas/${city.slug}`,
            title: `All services in ${city.name}`,
            description: `Everything we do in ${city.name}, MN`,
          },
        ]}
      />
    </>
  );
}
