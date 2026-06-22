import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";

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
      <PageHero
        title="Service Areas"
        subtitle="We serve the entire Twin Cities metro — from Minneapolis and Saint Paul to the surrounding suburbs."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Service Areas" },
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-stone-600 mb-10 max-w-3xl text-lg">
            Minneapolis Kitchen &amp; Bath is based in Minneapolis and serves
            homeowners throughout the Twin Cities metro. Click any city for
            detailed local information, typical home styles, permit notes, and
            pricing for that area.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="group block border border-stone-200/80 rounded-2xl p-5 hover:border-teal-200 hover:shadow-lg hover:shadow-stone-200/50 transition-all"
              >
                <h2 className="text-lg font-semibold text-stone-900 group-hover:text-teal-800 transition-colors mb-1">
                  {c.name}
                </h2>
                <p className="text-sm text-stone-500 mb-2">
                  {c.county} County · {c.drivingTimeFromMpls}
                </p>
                <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed">
                  {c.localAngle}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-teal-700">
                  See {c.name} services
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 border-y border-stone-200/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-stone-900 mb-2">
            Find a specific service in your city
          </h2>
          <p className="text-stone-600 mb-8 max-w-3xl">
            Detailed pricing, permits, and process for the most-requested
            remodeling services in each Twin Cities suburb.
          </p>
          {enabledServices.map((s) => (
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
        heading="Don't see your city?"
        subheading="If you're within 45 minutes of downtown Minneapolis, we likely still serve your area."
        buttonLabel="Contact Us"
        variant="white"
      />
    </>
  );
}
