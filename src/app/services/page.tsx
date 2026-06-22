import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { getServiceIcon } from "@/lib/service-icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Kitchen remodeling, bathroom renovations, custom cabinetry, countertops, tile, and full gut renovations across the Twin Cities. See pricing and our process.",
  alternates: { canonical: "https://minneapoliskitchenandbath.com/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Full-service kitchen and bathroom remodeling for Twin Cities homeowners. Licensed, insured, and locally based in Minneapolis."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services" },
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto grid gap-6">
          {services.map((service) => {
            const Icon = getServiceIcon(service.slug);
            return (
              <article
                key={service.slug}
                className="border border-stone-200/80 rounded-2xl p-6 sm:p-8 hover:border-teal-200 hover:shadow-lg hover:shadow-stone-200/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-stone-900">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-teal-800 transition-colors"
                      >
                        {service.name}
                      </Link>
                    </h2>
                    <p className="text-stone-500 mt-1">{service.tagline}</p>
                  </div>
                </div>
                <p className="text-stone-600 mb-5 leading-relaxed">{service.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {service.whatsIncluded.slice(0, 6).map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-stone-700"
                    >
                      <Check className="w-4 h-4 text-teal-600 shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-800 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-stone-100 text-stone-800 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-stone-200 transition-colors"
                  >
                    Get a quote
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 border-y border-stone-200/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-stone-900 mb-4">
            Services by City
          </h2>
          <p className="text-stone-600 mb-8 max-w-3xl">
            See pricing and local information for kitchen and bathroom remodeling in your
            specific Twin Cities suburb.
          </p>
          {services
            .filter((s) => s.isCityPageEnabled)
            .map((s) => (
              <div key={s.slug} className="mb-8">
                <h3 className="text-lg font-semibold text-stone-900 mb-3">
                  {s.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Link
                      key={`${s.slug}-${c.slug}`}
                      href={`/${s.urlSegment}/${c.slug}`}
                      className="px-3 py-1.5 rounded-full bg-white border border-stone-200 text-sm text-stone-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                    >
                      {s.shortName} in {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      <CTA
        heading="Ready to start your project?"
        variant="white"
      />
    </>
  );
}
