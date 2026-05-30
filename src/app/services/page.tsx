import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Kitchen remodeling, bathroom renovations, custom cabinetry, countertops, tile, and full gut renovations across the Twin Cities. See pricing and our process.",
  alternates: { canonical: "https://minneapoliskitchenandbath.com/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-slate-300 text-lg max-w-3xl">
            Full-service kitchen and bathroom remodeling for Twin Cities
            homeowners. Licensed, insured, and locally based in Minneapolis.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid gap-6">
          {services.map((service) => (
            <article
              key={service.slug}
              className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    <Link
                      href={`/services/${service.slug}`}
                      className="hover:text-blue-700"
                    >
                      {service.name}
                    </Link>
                  </h2>
                </div>
              </div>
              <p className="text-slate-600 mb-4">{service.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-5">
                {service.whatsIncluded.slice(0, 6).map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <span className="text-blue-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Learn more
                </Link>
                <Link
                  href="/contact"
                  className="bg-slate-100 text-slate-900 px-5 py-2 rounded-md text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  Get a quote
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* City-based landing pages for top services */}
      <section className="py-16 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Services by City
          </h2>
          <p className="text-slate-600 mb-6 max-w-3xl">
            See pricing and local information for kitchen and bathroom
            remodeling in your specific Twin Cities suburb.
          </p>
          {services
            .filter((s) => s.isCityPageEnabled)
            .map((s) => (
              <div key={s.slug} className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {s.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {cities.map((c) => (
                    <Link
                      key={`${s.slug}-${c.slug}`}
                      href={`/${s.urlSegment}/${c.slug}`}
                      className="text-sm text-blue-700 hover:underline hover:text-blue-900"
                    >
                      {s.shortName} in {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="py-12 px-4 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to start your project?</h2>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-block"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
