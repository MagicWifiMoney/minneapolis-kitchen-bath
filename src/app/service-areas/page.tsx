import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/data/cities";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Service Areas — Twin Cities",
  description:
    "Minneapolis Kitchen & Bath serves the entire Twin Cities metro — Minneapolis, Saint Paul, Edina, Bloomington, Plymouth, Minnetonka, Eden Prairie, Wayzata, Maple Grove, Eagan, Burnsville, and Richfield.",
  alternates: {
    canonical: "https://minneapoliskitchenandbath.com/service-areas",
  },
};

export default function ServiceAreasPage() {
  const enabledServices = services.filter((s) => s.isCityPageEnabled);

  return (
    <>
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Service Areas</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            We serve the entire Twin Cities metro — from Minneapolis and Saint
            Paul to the surrounding suburbs.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-slate-600 mb-10 max-w-3xl">
            Minneapolis Kitchen &amp; Bath is based in Minneapolis and serves
            homeowners throughout the Twin Cities metro. Click any city for
            detailed local information, typical home styles, permit notes,
            and pricing for that area.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="block border border-slate-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <h2 className="text-lg font-semibold text-slate-900 mb-1">
                  {c.name}
                </h2>
                <p className="text-sm text-slate-500 mb-2">
                  {c.county} County · {c.drivingTimeFromMpls}
                </p>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {c.localAngle}
                </p>
                <div className="mt-3 text-sm font-medium text-blue-600">
                  See {c.name} services →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service x City matrix for SEO crawl & user navigation */}
      <section className="py-12 px-4 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Find a specific service in your city
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Detailed pricing, permits, and process for the most-requested
            remodeling services in each Twin Cities suburb.
          </p>
          {enabledServices.map((s) => (
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
          <h2 className="text-2xl font-bold mb-4">
            Don&apos;t see your city?
          </h2>
          <p className="text-blue-100 mb-6">
            We likely still serve your area — if you&apos;re within 45 minutes
            of downtown Minneapolis, the answer is almost certainly yes.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
