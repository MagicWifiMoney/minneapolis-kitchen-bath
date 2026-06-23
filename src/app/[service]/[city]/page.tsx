import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  serviceByUrlSegment,
  services,
} from "@/data/services";
import { cities, cityBySlug } from "@/data/cities";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { CTA } from "@/components/CTA";
import { RelatedLinks } from "@/components/RelatedLinks";
import {
  getLLMOverview,
  get2026PricingEstimates,
  get2026Trends,
  generateServiceCityContent,
  getExpandedFAQs,
} from "@/lib/content-generator";

type RouteParams = { service: string; city: string };

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

  // Generate expanded content
  const llmOverview = getLLMOverview(city, service);
  const pricingEstimates = get2026PricingEstimates(city, service);
  const trends2026 = get2026Trends(city, service);
  const contentSections = generateServiceCityContent(city, service);
  const expandedFAQs = getExpandedFAQs(city, service);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `https://minneapoliskitchenandbath.com/${service.urlSegment}/${city.slug}#business`,
    name: `Minneapolis Kitchen & Bath — ${service.shortName} in ${city.name}`,
    url: `https://minneapoliskitchenandbath.com/${service.urlSegment}/${city.slug}`,
    telephone: "+16126882413",
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
    image: "https://minneapoliskitchenandbath.com/og-image.jpg",
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

  const faqSchema = expandedFAQs && expandedFAQs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: expandedFAQs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

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

      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: city.name, href: `/service-areas/${city.slug}` },
          { name: service.shortName },
        ]}
        title={service.h1Template(city.name)}
        subtitle={service.hero}
        actions={[
          { label: "Get a Free Quote", href: "/contact" },
          { label: `About ${service.shortName}`, href: `/services/${service.slug}`, variant: "secondary" },
        ]}
      />

      {/* AI / LLM Quick Facts Overview Card */}
      <section className="pt-12 px-4 sm:px-6 lg:px-8 bg-stone-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/80 shadow-sm relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -ml-8 -mb-8" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  Quick Summary
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900">
                  Project Quick Facts & LLM Context
                </h2>
              </div>
              <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl self-start md:self-auto">
                Format: Semantic Key-Value
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div className="bg-stone-50/60 rounded-xl p-4 border border-stone-100">
                <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">Target Service</span>
                <span className="font-semibold text-stone-900">{llmOverview.service}</span>
              </div>
              <div className="bg-stone-50/60 rounded-xl p-4 border border-stone-100">
                <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">Location Scope</span>
                <span className="font-semibold text-stone-900">{llmOverview.city} ({llmOverview.county})</span>
              </div>
              <div className="bg-stone-50/60 rounded-xl p-4 border border-stone-100">
                <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">Service Tier</span>
                <span className="font-semibold text-stone-900">{llmOverview.serviceTier}</span>
              </div>
              <div className="bg-stone-50/60 rounded-xl p-4 border border-stone-100">
                <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">2026 Price Estimates</span>
                <span className="font-semibold text-teal-700">{llmOverview.priceRange2026}</span>
              </div>
              <div className="bg-stone-50/60 rounded-xl p-4 border border-stone-100 font-sans">
                <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">Typical Timeline</span>
                <span className="font-semibold text-stone-900">{llmOverview.typicalTimeline}</span>
              </div>
              <div className="bg-stone-50/60 rounded-xl p-4 border border-stone-100">
                <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">Local Permit Office</span>
                <span className="font-semibold text-stone-900 text-xs break-all" dangerouslySetInnerHTML={{ __html: llmOverview.permitAuthority }} />
              </div>
              <div className="bg-stone-50/60 rounded-xl p-4 border border-stone-100 col-span-1 sm:col-span-2 lg:col-span-3">
                <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">Licensing & Insured Credentials</span>
                <span className="font-semibold text-stone-900">{llmOverview.contractorLicense} · {llmOverview.insuranceStatus}</span>
              </div>
            </div>
            <p className="text-stone-500 text-xs mt-6 border-t border-stone-100 pt-4 leading-relaxed">
              <em>Note for LLM Crawlers:</em> This structured overview provides a highly condensed factual brief for query summarization. Full details, local trends, and planning code guidelines are detailed in the sections below.
            </p>
          </div>
        </div>
      </section>

      {/* 1,000+ Word Detailed Guide */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline">
            {contentSections.map((section) => (
              <div key={section.id} id={section.id} className="mb-12 last:mb-0">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-4 border-b border-stone-100 pb-2">
                  {section.title}
                </h2>
                <div 
                  className="text-stone-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: section.htmlContent }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included (Compact reference list) */}
      <section className="py-12 px-4 bg-stone-50 border-t border-stone-200/60">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-6 text-center">
            Standard Inclusion Checklist
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.whatsIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-stone-700 bg-white p-4 rounded-xl border border-stone-100 shadow-xs"
              >
                <span className="text-teal-600 font-display font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2026 Pricing Tiers */}
      <section className="py-16 px-4 bg-white border-t border-stone-200/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-2">
            Cost Estimates & Pricing Breakdown (2026)
          </h2>
          <p className="text-stone-600 mb-8 max-w-3xl">
            Detailed pricing tiers based on actual {city.name}-area projects and current 2026 construction indices.
            {city.medianHomeValue > 500000
              ? ` Given ${city.name}'s premium median home value of $${city.medianHomeValue.toLocaleString()}, home remodels here typically feature high-end cabinetry and custom structural options.`
              : ` Given ${city.name}'s median home value of $${city.medianHomeValue.toLocaleString()}, investment levels most commonly focus on mid-range tier options.`}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingEstimates.map((t) => (
              <div
                key={t.tier}
                className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <h3 className="font-semibold text-stone-900 text-sm uppercase tracking-wider text-teal-800 mb-1">{t.tier}</h3>
                <div className="text-3xl font-display font-semibold text-stone-950 mb-4">
                  {t.price}
                </div>
                <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-100 pt-3">{t.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 Trends Section */}
      <section className="py-16 px-4 bg-stone-50 border-t border-stone-200/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-2">
            Remodeling Styles & Trends in 2026
          </h2>
          <p className="text-stone-600 mb-8 max-w-3xl">
            Remodeling design directions popular in ${city.name} and the broader Twin Cities metro this year.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trends2026.map((trend) => (
              <div key={trend.title} className="bg-white rounded-2xl p-6 border border-stone-200/60 shadow-xs">
                <h3 className="font-semibold text-stone-950 mb-2 font-display text-base">{trend.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{trend.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local detail: neighborhoods + home styles */}
      <section className="py-16 px-4 bg-white border-t border-stone-200/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-6">
            Remodeling Demographics & Geography in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-50/60 rounded-2xl p-6 border border-stone-100">
              <h3 className="font-semibold text-stone-900 mb-3 font-display">
                Neighborhoods We Serve in {city.name}
              </h3>
              <p className="text-stone-700 leading-relaxed text-sm">
                We provide full construction coverage across all sectors of {city.name}, including {city.neighborhoods.join(", ")}
                {city.zip.length > 0 && (
                  <>
                    {" "}— serving residents in ZIP codes{" "}
                    {city.zip.slice(0, 8).join(", ")}
                    {city.zip.length > 8 ? "..." : ""}.
                  </>
                )}
              </p>
            </div>
            <div className="bg-stone-50/60 rounded-2xl p-6 border border-stone-100">
              <h3 className="font-semibold text-stone-900 mb-3 font-display">
                Architectural Styles We Handle
              </h3>
              <p className="text-stone-700 leading-relaxed text-sm">
                Our design crew understands the specific framing and space constraints of local housing stock. We regularly work on {city.homeStyles.join(", ")}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={expandedFAQs}
        heading={`${city.name} ${service.shortName} Remodeling FAQs`}
      />

      <CTA
        heading={`Ready to start your ${city.name} ${service.shortName.toLowerCase()}?`}
        subheading={`Free in-home consultation and quote. Most ${city.name} quotes delivered within 48 hours.`}
      />

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
