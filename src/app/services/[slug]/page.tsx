import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, serviceBySlug } from "@/data/services";
import { cities } from "@/data/cities";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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

      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: service.name },
            ]}
          />
          <div className="text-4xl mb-3">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {service.name} in the Twin Cities
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {service.tagline}. {service.hero}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/service-areas"
              className="bg-white/10 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-colors"
            >
              See Service Areas
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-700 text-lg leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            What&apos;s included
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
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            {service.name} cost ranges (2026, Twin Cities)
          </h2>
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
            Our process
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

      <FAQSection
        faqs={service.faqs}
        heading={`${service.name} FAQs`}
        withSchema={false}
      />

      {service.isCityPageEnabled && (
        <section className="py-12 px-4 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {service.name} by city
            </h2>
            <p className="text-slate-600 mb-6">
              We serve the entire Twin Cities metro. Find detailed pricing and
              local information for your city:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${service.urlSegment}/${c.slug}`}
                  className="block px-4 py-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-medium text-slate-900">
                    {c.name}
                  </div>
                  <div className="text-xs text-slate-500">
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
