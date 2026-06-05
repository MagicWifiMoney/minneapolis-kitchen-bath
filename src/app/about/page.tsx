import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "About Minneapolis Kitchen & Bath | Twin Cities Remodelers",
  description:
    "Locally owned kitchen and bathroom remodelers serving the Minneapolis–Saint Paul metro. Licensed, insured, fixed-price quotes, and a single project lead from demo to punch list.",
  alternates: {
    canonical: "https://minneapoliskitchenandbath.com/about",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Minneapolis Kitchen & Bath",
  url: "https://minneapoliskitchenandbath.com/about",
  mainEntity: {
    "@type": "HomeAndConstructionBusiness",
    name: "Minneapolis Kitchen & Bath",
    url: "https://minneapoliskitchenandbath.com",
    email: "hello@minneapoliskitchenandbath.com",
    telephone: "+16125550000",
    areaServed: "Minneapolis–Saint Paul metro, Minnesota",
    knowsAbout: [
      "Kitchen remodeling",
      "Bathroom remodeling",
      "Custom cabinetry",
      "Countertop installation",
      "Tile showers and waterproofing",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Minneapolis",
      addressRegion: "MN",
      postalCode: "55401",
      addressCountry: "US",
    },
  },
};

const stats = [
  { value: "100%", label: "Licensed & insured in Minnesota" },
  { value: "48 hrs", label: "Typical turnaround on a written quote" },
  { value: "17", label: "Twin Cities cities served" },
  { value: "1", label: "Dedicated project lead per job" },
];

const values = [
  {
    title: "Fixed-price, itemized quotes",
    body: "You get a detailed, line-item proposal before any work begins — cabinet brand and line, countertop material and edge, fixtures, tile, labor, and permit costs all spelled out. No vague allowances that balloon mid-project.",
  },
  {
    title: "One project lead, start to finish",
    body: "Every job is run by a single dedicated lead who coordinates scheduling, trades, inspections, and quality checks from demo day to the final punch list. You always know who to call.",
  },
  {
    title: "We pull every permit",
    body: "We handle building, plumbing, electrical, and mechanical permits and manage every inspection. Unpermitted work causes real problems at resale, so we do it right the first time.",
  },
  {
    title: "Built for Minnesota homes",
    body: "We know what's behind the walls of a 1920s Minneapolis bungalow, an Edina mid-century, or a Wayzata lakefront — knob-and-tube wiring, galvanized plumbing, plaster, and the hard water that chews through fixtures. We budget for it up front.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "About" }]}
          />
          <h1 className="text-4xl font-bold mb-4">
            About Minneapolis Kitchen &amp; Bath
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Locally owned remodelers who treat your home like our own — focused
            on the two rooms that matter most to how you live and what your
            house is worth.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-700">
                {s.value}
              </div>
              <div className="text-sm text-slate-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h2>Who We Are</h2>
          <p>
            Minneapolis Kitchen &amp; Bath is a locally owned remodeling company
            serving homeowners across the Twin Cities metro — from Minneapolis
            and Saint Paul out to Edina, Minnetonka, Eden Prairie, Plymouth,
            Maple Grove, and Wayzata. We specialize in kitchen and bathroom
            renovations, the two rooms that matter most to buyers, sellers, and
            everyday life.
          </p>
          <p>
            We&apos;re deliberately not a do-everything general contractor. By
            staying focused on kitchens and baths, our crews and trade partners
            do the same kind of work week after week — which is exactly why the
            tile is straight, the cabinets are plumb, and the waterproofing is
            done to spec.
          </p>

          <h2>Our Approach</h2>
          <p>
            Great remodeling starts with great listening. Before we swing a
            hammer, we sit down in your home to understand how you actually use
            the space, what your goals are, and what your budget looks like.
            Then we design a project that hits all three and put it in writing
            as a fixed-price proposal.
          </p>
          <p>
            During construction, a single project lead coordinates scheduling,
            subcontractors, inspections, and quality checks from demolition to
            the final walkthrough. You get one point of contact, a shared
            decision tracker, and honest updates when something behind the wall
            turns out differently than expected.
          </p>

          <h2>Licensed, Insured &amp; Accountable</h2>
          <p>
            We hold a Minnesota residential building contractor license and
            carry full general liability and workers&apos; compensation
            insurance on every job. Our subcontractors are vetted, insured, and
            held to the same standards we hold ourselves to. We pull permits and
            manage inspections for every project that requires them — which, for
            most kitchen and bath remodels, means all of them.
          </p>

          <h2>What We Do</h2>
          <p>
            Explore our <Link href="/services">full list of services</Link> —
            including{" "}
            <Link href="/services/kitchen-remodeling">kitchen remodeling</Link>,{" "}
            <Link href="/services/bathroom-remodeling">
              bathroom remodeling
            </Link>
            , <Link href="/services/custom-cabinetry">custom cabinetry</Link>,
            and <Link href="/services/countertops">countertops</Link> — or find
            pricing and permit details for your city on our{" "}
            <Link href="/service-areas">service areas</Link> pages.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            How We&apos;re Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-slate-200 rounded-lg p-6"
              >
                <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        heading="Ready to get started?"
        subheading="Free in-home consultation and a detailed fixed-price quote, usually within 48 hours."
        variant="blue"
      />
    </>
  );
}
