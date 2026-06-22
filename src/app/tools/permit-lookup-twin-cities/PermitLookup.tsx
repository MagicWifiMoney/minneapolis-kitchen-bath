"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cities } from "@/data/cities";

type ProjectType = "Kitchen" | "Bath" | "Basement" | "Whole-House" | "Other";

const PROJECT_TYPES: ProjectType[] = ["Kitchen", "Bath", "Basement", "Whole-House", "Other"];

// Base lead time weeks per city slug (rough guesses 1&ndash;4 weeks baseline)
const CITY_BASE_WEEKS: Record<string, number> = {
  "minneapolis": 3,
  "saint-paul": 3,
  "edina": 4,
  "minnetonka": 2,
  "wayzata": 4,
  "eden-prairie": 2,
  "bloomington": 2,
  "plymouth": 2,
  "maple-grove": 2,
  "eagan": 2,
  "burnsville": 2,
  "richfield": 1,
};

// Project-type adjustment (added weeks)
const PROJECT_ADJUST: Record<ProjectType, number> = {
  Kitchen: 0,
  Bath: 0,
  Basement: 1,
  "Whole-House": 2,
  Other: 0,
};

const PROJECT_MESSAGE: Record<ProjectType, string> = {
  Kitchen:
    "Most kitchen remodels in this city require a building permit plus plumbing and electrical sub-permits. Cabinet swaps without layout changes sometimes qualify for a simpler over-the-counter permit.",
  Bath:
    "Bath remodels almost always pull plumbing and electrical permits in addition to the base building permit, especially if you&apos;re moving fixtures or adding GFCI circuits.",
  Basement:
    "Basement finishes trigger egress window, framing, plumbing, electrical, and mechanical reviews. Expect more inspection visits than a kitchen or bath of the same size.",
  "Whole-House":
    "Whole-house remodels often require a master plan review and may involve zoning sign-off on top of standard building permits. Plan for a longer pre-construction window.",
  Other:
    "Permit scope varies. Call the city office below before assuming you can skip a permit &mdash; unpermitted work shows up on resale inspections and can stall a sale.",
};

const FAQS = [
  {
    q: "Do I really need a permit for a kitchen or bath remodel in Minneapolis?",
    a: "Yes, in almost every case. Minneapolis requires a remodeling permit for any work involving plumbing, electrical, structural changes, or projects over $1,000. A pure cosmetic refresh (paint, hardware swap) can be permit-free, but the moment you touch a drain line or a circuit, you&apos;re in permit territory.",
  },
  {
    q: "How long does it take to get a remodel permit in Saint Paul?",
    a: "Saint Paul DSI typically turns around standard residential remodel permits in 2 to 3 weeks. Heritage Preservation district properties (Summit Hill, Crocus Hill, parts of Mac-Groveland) can add another 2 to 4 weeks for HPC review on anything visible from the street.",
  },
  {
    q: "Why are Edina permit fees higher than Minneapolis?",
    a: "Edina calculates building permit fees as a percentage of total project valuation, and the city&apos;s typical project valuations skew higher because of finish-level expectations. A $100,000 kitchen in Edina will pay more in permit fees than the same scope in Minneapolis or Saint Paul.",
  },
  {
    q: "Can my contractor pull the permit, or do I have to?",
    a: "Across Twin Cities cities, a licensed contractor can and should pull the permit on a remodel. Homeowner-pulled permits make the homeowner liable for code compliance and inspection scheduling. We always pull permits in our company&apos;s name on full-scope projects.",
  },
  {
    q: "What happens if I skip the permit?",
    a: "Two problems. First, an unpermitted remodel will be flagged on a future home inspection and can derail a sale or refinance. Second, if anything goes wrong (water damage, electrical fire) homeowners insurance can deny the claim on unpermitted work. The permit cost is small insurance against both.",
  },
];

export default function PermitLookup() {
  const [slug, setSlug] = useState(cities[0].slug);
  const [project, setProject] = useState<ProjectType>("Kitchen");

  const city = useMemo(() => cities.find((c) => c.slug === slug) ?? cities[0], [slug]);

  const leadWeeks = useMemo(() => {
    const base = CITY_BASE_WEEKS[city.slug] ?? 2;
    return base + PROJECT_ADJUST[project];
  }, [city, project]);

  const leadRange = `${leadWeeks} to ${leadWeeks + 2} weeks`;

  return (
    <main className="bg-white text-stone-900">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <nav className="mb-6 text-sm text-stone-500">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-teal-700">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-800">Permit Lookup</span>
        </nav>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Twin Cities Remodel Permit Lookup
        </h1>
        <p className="mt-3 text-lg text-teal-700">
          Find the right office, fee structure, and lead time for your city.
        </p>

        <section className="prose prose-site mt-8 max-w-none">
          <p>
            Every Minneapolis remodel permit lives at a different desk. The City of Minneapolis pulls
            permits through CPED. Saint Paul runs through DSI. Edina, Wayzata, Minnetonka, Plymouth,
            and the rest of the metro each have their own Building Inspections division with their
            own fee tables, review timelines, and quirks. Homeowners planning a kitchen, bath,
            basement, or whole-house remodel routinely underestimate how much the permit step shapes
            the overall project schedule.
          </p>
          <p>
            Permits matter for three reasons. First, they&apos;re a legal requirement on almost any
            work that touches plumbing, electrical, structural framing, or mechanical systems. Skip
            the permit and you create a paper trail problem that surfaces on the next home
            inspection, refinance appraisal, or insurance claim. Second, the permit triggers
            mandatory inspections at framing, rough-in, and final stages. Those inspections catch
            real safety issues like missing GFCI circuits, undersized vent stacks, or load-bearing
            walls cut without a header. Third, permit lead time is real schedule time. Minneapolis
            and Saint Paul typically clear standard residential remodel permits in 2 to 3 weeks.
            Edina and Wayzata often run longer because of higher review volume and finish-level
            expectations. Lake Minnetonka properties in Wayzata, Minnetonka, and the shoreline
            overlay can stretch permit timelines another 2 to 4 weeks when the project touches
            anything within 1,000 feet of the water.
          </p>
          <p>
            Use the lookup below to find the right office for your city, get the local permit note,
            click straight through to the city portal, and see a rough lead-time guess for your
            specific project type. Then call us and we&apos;ll pull the permit in our name as part of
            a full-service remodel.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-stone-200/80 bg-stone-50 p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-stone-700">City</label>
              <select
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-3 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-teal-500 focus:outline-none"
              >
                {cities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">Project type</label>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {PROJECT_TYPES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProject(p)}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      project === p
                        ? "border-teal-600 bg-teal-50 text-teal-800"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-stone-200/80 bg-stone-50 p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-semibold text-stone-900">{city.name}</h2>
            <span className="text-sm text-stone-500">{city.county} County</span>
          </div>

          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-stone-400">Driving time from Minneapolis</dt>
              <dd className="mt-1 text-sm text-stone-800">{city.drivingTimeFromMpls}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-stone-400">Permit office</dt>
              <dd className="mt-1 text-sm">
                {city.permitOfficeUrl ? (
                  <a
                    href={city.permitOfficeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:text-teal-700 underline"
                  >
                    Visit {city.name} permit portal
                  </a>
                ) : (
                  <span className="text-stone-500">Contact city hall directly</span>
                )}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-stone-400">Local permit note</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-800">{city.permitNote}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-8 rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-8">
          <div className="text-xs uppercase tracking-wide text-teal-700">
            Recommendation &mdash; {project} remodel in {city.name}
          </div>
          <p className="mt-3 text-lg font-semibold text-stone-900">
            For your remodel scope, expect permits to take {leadRange} in this city.
          </p>
          <p
            className="mt-3 text-sm leading-relaxed text-stone-700"
            dangerouslySetInnerHTML={{ __html: PROJECT_MESSAGE[project] }}
          />
        </section>

        <section className="mt-10 rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-stone-900">
            We&apos;ll pull the permit for you
          </h2>
          <p className="mt-2 text-stone-700">
            On every full-scope remodel we manage permits, inspections, and the city schedule so you don&apos;t have to.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Talk to a Twin Cities remodeler
          </Link>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-stone-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-stone-200/80 bg-stone-50 p-5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-stone-900">
                  {f.q}
                </summary>
                <p
                  className="mt-3 text-sm leading-relaxed text-stone-700"
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
