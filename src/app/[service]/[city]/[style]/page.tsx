import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { neighborhoodPages, neighborhoodPageBySlug } from "@/data/neighborhoods";
import { serviceByUrlSegment } from "@/data/services";
import { cityBySlug } from "@/data/cities";
import { neighborhoodBodyByKey } from "@/content/neighborhoods";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";

type RouteParams = { service: string; city: string; style: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return neighborhoodPages.map((n) => ({
    service: n.serviceUrlSegment,
    city: n.citySlug,
    style: n.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { service, city, style } = await params;
  const page = neighborhoodPageBySlug[`${service}/${city}/${style}`];
  if (!page) return {};
  const url = `https://minneapoliskitchenandbath.com/${service}/${city}/${style}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "article",
    },
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { service: serviceSeg, city: citySlug, style } = await params;
  const page = neighborhoodPageBySlug[`${serviceSeg}/${citySlug}/${style}`];
  const Body = neighborhoodBodyByKey[`${serviceSeg}/${citySlug}/${style}`];
  const service = serviceByUrlSegment[serviceSeg];
  const city = cityBySlug[citySlug];
  if (!page || !Body || !service || !city) notFound();

  const url = `https://minneapoliskitchenandbath.com/${serviceSeg}/${citySlug}/${style}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${url}#business`,
    name: `Minneapolis Kitchen & Bath — ${service.shortName} in ${page.neighborhoodName}`,
    url,
    telephone: "+16126882413",
    email: "hello@minneapoliskitchenandbath.com",
    description: page.metaDescription,
    areaServed: {
      "@type": "Place",
      name: `${page.neighborhoodName}, ${city.name}, MN`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lng,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Minneapolis",
      addressRegion: "MN",
      postalCode: "55401",
      addressCountry: "US",
    },
    priceRange: "$$$",
    image: "https://minneapoliskitchenandbath.com/og-image.jpg",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://minneapoliskitchenandbath.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://minneapoliskitchenandbath.com/service-areas" },
      { "@type": "ListItem", position: 3, name: city.name, item: `https://minneapoliskitchenandbath.com/service-areas/${city.slug}` },
      { "@type": "ListItem", position: 4, name: `${service.shortName} in ${city.name}`, item: `https://minneapoliskitchenandbath.com/${serviceSeg}/${citySlug}` },
      { "@type": "ListItem", position: 5, name: page.neighborhoodName, item: url },
    ],
  };

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

      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Service Areas", href: "/service-areas" },
              { name: city.name, href: `/service-areas/${city.slug}` },
              { name: service.shortName, href: `/${serviceSeg}/${citySlug}` },
              { name: page.neighborhoodName },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{page.h1}</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {page.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href={`/${serviceSeg}/${citySlug}`}
              className="bg-white/10 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-colors"
            >
              {service.shortName} in {city.name}
            </Link>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <Body />
        </div>
      </article>

      <CTA
        heading={`Planning a ${service.shortName.toLowerCase()} in ${page.neighborhoodName}?`}
        subheading="Free in-home consultation. Fixed-price quotes within 5-10 business days."
        variant="blue"
      />
    </>
  );
}
