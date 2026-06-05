import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, cityBySlug } from "@/data/cities";
import { services } from "@/data/services";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { RelatedLinks } from "@/components/RelatedLinks";
import { FAQSection } from "@/components/FAQSection";

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = cityBySlug[slug];
  if (!city) return {};

  const title = `Kitchen & Bath Remodeling in ${city.name}, MN`;
  const description = `Trusted kitchen and bathroom remodeling contractors serving ${city.name}, MN. Custom cabinetry, countertops, tile work, and full renovations. Licensed, insured, and locally based.`;
  const url = `https://minneapoliskitchenandbath.com/service-areas/${city.slug}`;

  return {
    title,
    description,
    keywords: [
      `kitchen remodel ${city.name}`,
      `bathroom remodel ${city.name}`,
      `${city.name} remodeling contractor`,
      `${city.name} kitchen and bath`,
      `${city.name} MN renovation`,
    ],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function CityServiceAreaPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = cityBySlug[slug];
  if (!city) notFound();

  const serviceLinks = services.map((s) => ({
    href: s.isCityPageEnabled
      ? `/${s.urlSegment}/${city.slug}`
      : `/services/${s.slug}`,
    title: s.isCityPageEnabled
      ? `${s.shortName} in ${city.name}`
      : s.name,
    description: s.tagline,
  }));

  const faqs = [
    {
      question: `Do you offer kitchen and bathroom remodeling in ${city.name}?`,
      answer: `Yes — we serve ${city.name} regularly and have completed many projects there. ${city.drivingTimeFromMpls} from our Minneapolis base, ${city.name} is well within our core service area.`,
    },
    {
      question: `What does a kitchen remodel cost in ${city.name}?`,
      answer: `${city.name} kitchen remodels typically run $${
        city.serviceTier === "premium" ? "45,000" : "30,000"
      }–$${
        city.serviceTier === "premium" ? "150,000+" : "85,000"
      } depending on scope. Budget refreshes start around $15,000–$30,000; mid-range remodels are $35,000–$75,000; high-end custom kitchens run $80,000+. The median home value of $${city.medianHomeValue.toLocaleString()} in ${city.name} supports ${
        city.serviceTier === "premium"
          ? "mid-range to high-end"
          : "budget to mid-range"
      } remodels most commonly.`,
    },
    {
      question: `Do I need a permit to remodel a kitchen or bathroom in ${city.name}?`,
      answer: city.permitNote,
    },
    {
      question: `How long will my ${city.name} remodel take?`,
      answer: `Kitchen remodels take 6–12 weeks of on-site work plus 4–10 weeks of material lead time. Bathrooms take 3–6 weeks on-site plus 2–4 weeks lead time. We provide a detailed schedule at contract signing.`,
    },
  ];

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `https://minneapoliskitchenandbath.com/service-areas/${city.slug}#business`,
    name: `Minneapolis Kitchen & Bath — Serving ${city.name}, MN`,
    url: `https://minneapoliskitchenandbath.com/service-areas/${city.slug}`,
    telephone: "+16125550000",
    email: "hello@minneapoliskitchenandbath.com",
    description: `Kitchen and bathroom remodeling contractors serving ${city.name}, MN. Licensed, insured, locally based in the Twin Cities.`,
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
    priceRange: "$$",
    image: "https://minneapoliskitchenandbath.com/opengraph-image",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Service Areas", href: "/service-areas" },
              { name: city.name },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kitchen & Bath Remodeling in {city.name}, MN
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Licensed, insured remodeling contractors serving {city.name},{" "}
            {city.county} County. {city.drivingTimeFromMpls} from our
            Minneapolis base.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="bg-white/10 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-colors"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Intro & local angle */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Remodeling in {city.name}
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-4">
            {city.localAngle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 not-prose">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                Population
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {city.population.toLocaleString()}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                Median home value
              </div>
              <div className="text-2xl font-bold text-slate-900">
                ${city.medianHomeValue.toLocaleString()}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                County
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {city.county}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services available in this city */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Services we offer in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block p-5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="font-semibold text-slate-900">{l.title}</div>
                {l.description && (
                  <div className="text-sm text-slate-600 mt-1">
                    {l.description}
                  </div>
                )}
                <div className="mt-2 text-sm text-blue-600 font-medium">
                  Learn more →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods + home styles */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {city.name} neighborhoods we serve
            </h3>
            <ul className="grid grid-cols-2 gap-1 text-slate-700">
              {city.neighborhoods.map((n) => (
                <li key={n} className="text-sm">
                  · {n}
                </li>
              ))}
            </ul>
            {city.zip.length > 0 && (
              <p className="text-xs text-slate-500 mt-3">
                ZIP codes: {city.zip.join(", ")}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Common {city.name} home styles
            </h3>
            <ul className="space-y-1 text-slate-700">
              {city.homeStyles.map((s) => (
                <li key={s} className="text-sm">
                  · {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Permits */}
      <section className="py-12 px-4 bg-amber-50 border-y border-amber-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-900 mb-3">
            Permits in {city.name}
          </h2>
          <p className="text-amber-900/90 leading-relaxed">{city.permitNote}</p>
          {city.permitOfficeUrl && (
            <a
              href={city.permitOfficeUrl}
              target="_blank"
              rel="noopener nofollow"
              className="inline-block mt-3 text-amber-900 underline hover:text-amber-700"
            >
              {city.name} permit office →
            </a>
          )}
        </div>
      </section>

      <FAQSection faqs={faqs} heading={`${city.name} Remodeling FAQs`} />

      <CTA
        heading={`Get a free quote for your ${city.name} remodel`}
        subheading="Most in-home consultations scheduled within 7 business days."
      />

      <RelatedLinks
        heading="Other Twin Cities areas we serve"
        links={cities
          .filter((c) => c.slug !== city.slug)
          .slice(0, 9)
          .map((c) => ({
            href: `/service-areas/${c.slug}`,
            title: c.name,
            description: `Kitchen & bath remodeling in ${c.name}, MN`,
          }))}
      />
    </>
  );
}
