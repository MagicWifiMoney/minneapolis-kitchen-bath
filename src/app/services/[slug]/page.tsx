import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, serviceBySlug } from "@/data/services";
import { cities } from "@/data/cities";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { CTA } from "@/components/CTA";
import { RelatedLinks } from "@/components/RelatedLinks";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) return {};

  const title = `${service.name} in Minneapolis & Twin Cities | Free Quote`;
  const description =
    service.metaDescriptionTemplate("Minneapolis").replace(
      "Trusted ",
      "Trusted Twin Cities "
    );
  const url = `https://minneapoliskitchenandbath.com/services/${service.slug}`;
  return {
    title,
    description,
    keywords: [
      service.name.toLowerCase() + " Minneapolis",
      service.name.toLowerCase() + " Twin Cities",
      service.name.toLowerCase() + " Minnesota",
      service.shortName.toLowerCase() + " contractor MN",
    ],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Minneapolis Kitchen & Bath",
      url: "https://minneapoliskitchenandbath.com",
      areaServed: cities.map((c) => ({
        "@type": "City",
        name: c.name,
      })),
    },
    areaServed: cities.map((c) => c.name).join(", "),
    description: service.description,
    offers: service.priceRange.map((p) => ({
      "@type": "Offer",
      name: p.tier,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: p.range,
        priceCurrency: "USD",
      },
      description: p.description,
    })),
  };

  const related = service.relatedServiceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter(Boolean) as typeof services;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://minneapoliskitchenandbath.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://minneapoliskitchenandbath.com/services" },
      { "@type": "ListItem", position: 3, name: service.name, item: `https://minneapoliskitchenandbath.com/services/${service.slug}` },
    ],
  };

  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
          { name: "Services", href: "/services" },
          { name: service.name },
        ]}
        title={`${service.name} in the Twin Cities`}
        subtitle={`${service.tagline}. ${service.hero}`}
        actions={[
          { label: "Get a Free Quote", href: "/contact" },
          { label: "See Service Areas", href: "/service-areas", variant: "secondary" },
        ]}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-stone-700 text-lg leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-12 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-6">
            What&apos;s included
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.whatsIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-stone-700"
              >
                <span className="text-teal-600 font-display font-semibold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-6">
            {service.name} cost ranges (2026, Twin Cities)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.priceRange.map((t) => (
              <div
                key={t.tier}
                className="bg-white border border-stone-200 rounded-2xl p-5"
              >
                <div className="font-semibold text-stone-900 mb-1">{t.tier}</div>
                <div className="text-2xl font-display font-semibold text-teal-700 mb-2">
                  {t.range}
                </div>
                <div className="text-sm text-stone-600">{t.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-6">
            Our process
          </h2>
          <ol className="space-y-4">
            {service.process.map((p, i) => (
              <li
                key={p.step}
                className="flex gap-4 bg-white border border-stone-200 rounded-2xl p-5"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-600 text-white font-display font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-stone-900 mb-1">
                    {p.step}
                  </div>
                  <div className="text-stone-700">{p.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQSection
        faqs={service.faqs}
        heading={`${service.name} FAQs`}
      />

      {service.isCityPageEnabled && (
        <section className="py-12 px-4 bg-white border-t border-stone-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-2">
              {service.name} by city
            </h2>
            <p className="text-stone-600 mb-6">
              We serve the entire Twin Cities metro. Find detailed pricing and
              local information for your city:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${service.urlSegment}/${c.slug}`}
                  className="block px-4 py-3 rounded-2xl border border-stone-200 hover:border-teal-400 hover:bg-teal-50 transition-colors"
                >
                  <div className="font-medium text-stone-900">
                    {c.name}
                  </div>
                  <div className="text-xs text-stone-500">
                    {service.shortName} in {c.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        heading={`Get a free ${service.shortName.toLowerCase()} quote`}
        subheading="Most quotes delivered within 48 hours. Serving the entire Twin Cities metro."
      />

      {related.length > 0 && (
        <RelatedLinks
          heading="Related services"
          links={related.map((s) => ({
            href: `/services/${s.slug}`,
            title: s.name,
            description: s.tagline,
          }))}
        />
      )}
    </>
  );
}
