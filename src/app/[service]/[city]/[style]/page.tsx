import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { neighborhoodPages, neighborhoodPageBySlug } from "@/data/neighborhoods";
import { serviceByUrlSegment } from "@/data/services";
import { cityBySlug } from "@/data/cities";
import { neighborhoodBodyByKey } from "@/content/neighborhoods";
import { PageHero } from "@/components/PageHero";
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

      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: city.name, href: `/service-areas/${city.slug}` },
          { name: service.shortName, href: `/${serviceSeg}/${citySlug}` },
          { name: page.neighborhoodName },
        ]}
        title={page.h1}
        subtitle={page.intro}
        actions={[
          { label: "Get a Free Quote", href: "/contact" },
          { label: `${service.shortName} in ${city.name}`, href: `/${serviceSeg}/${citySlug}`, variant: "secondary" },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="prose prose-lg prose-site max-w-none">
          <Body />
        </div>
      </article>

      <CTA
        heading={`Planning a ${service.shortName.toLowerCase()} in ${page.neighborhoodName}?`}
        subheading="Free in-home consultation. Fixed-price quotes within 5-10 business days."
        variant="white"
      />
    </>
  );
}
