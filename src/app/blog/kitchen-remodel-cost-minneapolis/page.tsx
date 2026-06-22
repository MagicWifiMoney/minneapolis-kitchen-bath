import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InlineCta } from "@/components/InlineCta";

export const metadata: Metadata = {
  title: "How Much Does a Kitchen Remodel Cost in Minneapolis? (2026 Guide)",
  description:
    "Minneapolis kitchen remodel costs in 2026: budget refreshes from $15,000, mid-range $35,000–$75,000, high-end $80,000+. Detailed breakdown by cabinet, countertop, appliance, and labor costs in the Twin Cities.",
  keywords: [
    "kitchen remodel cost Minneapolis",
    "kitchen renovation cost Twin Cities",
    "how much kitchen remodel Minneapolis",
    "kitchen remodeling prices Minnesota",
    "Minneapolis kitchen contractor cost",
  ],
  openGraph: {
    title: "How Much Does a Kitchen Remodel Cost in Minneapolis? (2026 Guide)",
    description:
      "Real 2026 cost data for Minneapolis kitchen remodels — from $15K budget refreshes to $100K+ custom kitchens. Includes labor rates, material costs, and timeline estimates.",
    type: "article",
    url: "https://minneapoliskitchenandbath.com/blog/kitchen-remodel-cost-minneapolis",
  },
  alternates: {
    canonical:
      "https://minneapoliskitchenandbath.com/blog/kitchen-remodel-cost-minneapolis",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Does a Kitchen Remodel Cost in Minneapolis? (2026 Guide)",
  description:
    "Minneapolis kitchen remodel costs in 2026: budget refreshes from $15,000, mid-range $35,000–$75,000, high-end $80,000+. Detailed breakdown by cabinet, countertop, appliance, and labor costs in the Twin Cities.",
  image: ["https://minneapoliskitchenandbath.com/og-image.jpg"],
  datePublished: "2026-03-15",
  dateModified: "2026-03-15",
  author: {
    "@type": "Organization",
    name: "Minneapolis Kitchen & Bath",
    url: "https://minneapoliskitchenandbath.com",
    sameAs: ["https://minneapoliskitchenandbath.com/about"],
  },
  publisher: {
    "@type": "Organization",
    name: "Minneapolis Kitchen & Bath",
    logo: {
      "@type": "ImageObject",
      url: "https://minneapoliskitchenandbath.com/og-image.jpg",
    },
  },
  mainEntityOfPage:
    "https://minneapoliskitchenandbath.com/blog/kitchen-remodel-cost-minneapolis",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://minneapoliskitchenandbath.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://minneapoliskitchenandbath.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "How Much Does a Kitchen Remodel Cost in Minneapolis? (2026 Guide)",
      item: "https://minneapoliskitchenandbath.com/blog/kitchen-remodel-cost-minneapolis",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a kitchen remodel cost in Minneapolis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A kitchen remodel in Minneapolis typically costs $15,000–$100,000+. Budget remodels (cabinet refacing, new appliances, countertop swap) run $15,000–$30,000. Mid-range full remodels with semi-custom cabinets and quartz countertops run $35,000–$75,000. High-end custom kitchens with custom cabinetry, premium appliances, and structural changes start at $80,000.",
      },
    },
    {
      "@type": "Question",
      name: "What is the biggest cost in a kitchen remodel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cabinets are typically the largest single cost, representing 30–40% of the total kitchen remodel budget. In Minneapolis, stock cabinets run $3,000–$8,000, semi-custom $8,000–$25,000, and full custom cabinets $25,000–$50,000+.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a kitchen remodel take in the Twin Cities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most kitchen remodels in the Twin Cities take 6–12 weeks from demolition to completion. Simple cosmetic updates (countertops + backsplash) can be done in 2–3 weeks. Full gut renovations with custom cabinetry typically take 10–16 weeks due to cabinet lead times.",
      },
    },
    {
      "@type": "Question",
      name: "Does a kitchen remodel add value in Minneapolis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — a mid-range kitchen remodel in the Minneapolis metro returns approximately 70–80% of its cost at resale, according to Remodeling Magazine's Cost vs. Value report. High-end remodels typically return 50–60% but significantly improve your ability to sell quickly in competitive markets like Edina, Minnetonka, and Wayzata.",
      },
    },
  ],
};

export default function KitchenRemodelCostMinneapolis() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="bg-hero-pattern border-b border-stone-200/60">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <header>
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: "Kitchen Remodel Cost Minneapolis" },
              ]}
            />
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 mb-4 leading-tight tracking-tight">
              How Much Does a Kitchen Remodel Cost in Minneapolis? (2026 Guide)
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Real cost data from Twin Cities projects — from $15,000 budget
              refreshes to $100,000+ custom kitchens. Updated for 2026 material
              and labor prices.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-stone-500">
              <time dateTime="2026-03-15">March 15, 2026</time>
              <span>·</span>
              <span>8 min read</span>
              <span>·</span>
              <span>Minneapolis Kitchen &amp; Bath team</span>
            </div>
          </header>
        </article>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="prose prose-lg prose-site max-w-none">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 not-prose">
            <h2 className="text-lg font-semibold text-amber-900 mb-3">
              📊 2026 Minneapolis Kitchen Remodel Cost Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  tier: "Budget Refresh",
                  range: "$15,000–$30,000",
                  desc: "Cabinet paint/reface, new countertops, updated hardware & fixtures",
                },
                {
                  tier: "Mid-Range Full Remodel",
                  range: "$35,000–$75,000",
                  desc: "Semi-custom cabinets, quartz countertops, new appliances, tile backsplash",
                },
                {
                  tier: "High-End Custom",
                  range: "$80,000–$150,000+",
                  desc: "Custom cabinetry, premium appliances, structural changes, custom tile",
                },
              ].map((t) => (
                <div key={t.tier} className="bg-white rounded-xl p-4 border border-amber-100">
                  <div className="font-semibold text-stone-900 mb-1">{t.tier}</div>
                  <div className="text-2xl font-semibold text-amber-700 mb-2">{t.range}</div>
                  <div className="text-sm text-stone-600">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <h2>What Drives Kitchen Remodel Costs in the Twin Cities?</h2>
          <p>
            Minneapolis kitchen remodel costs have increased 12–18% since 2023
            due to persistent labor shortages in the trades and elevated material
            costs. However, competition among contractors has stabilized slightly
            in 2026, and lead times for cabinets have improved from the 16-week
            delays seen in 2024.
          </p>
          <p>
            The five biggest cost drivers for any kitchen remodel in the metro
            area are: <strong>cabinets</strong> (30–40% of budget),{" "}
            <strong>labor</strong> (20–35%), <strong>countertops</strong>{" "}
            (10–15%), <strong>appliances</strong> (10–15%), and{" "}
            <strong>flooring &amp; tile</strong> (8–12%).
          </p>

          <h2>Cabinet Costs in Minneapolis (2026)</h2>
          <p>
            Cabinets are almost always the single largest line item. Here&apos;s what
            to expect in the Minneapolis market:
          </p>
          <div className="not-prose overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-stone-100">
                  <th className="text-left p-3 font-semibold border border-stone-200">Cabinet Type</th>
                  <th className="text-left p-3 font-semibold border border-stone-200">Cost Range (installed)</th>
                  <th className="text-left p-3 font-semibold border border-stone-200">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Stock / Ready-to-Assemble", "$3,000–$8,000", "Budget remodels, rental properties"],
                  ["Semi-Custom", "$8,000–$25,000", "Most homeowner remodels"],
                  ["Custom", "$25,000–$60,000+", "High-end finishes, unusual layouts"],
                  ["Cabinet Refacing", "$4,000–$9,000", "Good bones, tight budget"],
                ].map(([type, cost, best]) => (
                  <tr key={type} className="border-b border-stone-200">
                    <td className="p-3 border border-stone-200 font-medium">{type}</td>
                    <td className="p-3 border border-stone-200 text-teal-700 font-semibold">{cost}</td>
                    <td className="p-3 border border-stone-200 text-stone-600">{best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Countertop Costs in the Twin Cities</h2>
          <p>
            Countertop costs vary widely based on material choice. Quartz has
            overtaken granite as the most popular choice in Minneapolis remodels
            due to its durability and low maintenance:
          </p>
          <ul>
            <li>
              <strong>Quartz (Silestone, Cambria, MSI):</strong> $55–$95/sq ft
              installed. Cambria is Minnesota-made and often priced competitively
              locally — $65–$85/sq ft.
            </li>
            <li>
              <strong>Granite:</strong> $45–$85/sq ft installed. Prices have
              softened as quartz demand grew.
            </li>
            <li>
              <strong>Butcher block:</strong> $30–$60/sq ft installed. Popular
              in farmhouse-style Twin Cities homes.
            </li>
            <li>
              <strong>Marble:</strong> $75–$150/sq ft installed. High
              maintenance — less common in family kitchens.
            </li>
            <li>
              <strong>Laminate:</strong> $15–$35/sq ft installed. Significant
              improvement in quality since 2020; good budget option.
            </li>
          </ul>
          <p>
            For a typical 30-40 sq ft of countertop, expect to spend
            $1,800–$3,800 for laminate, $1,800–$3,800 for butcher block,
            $1,800–$3,400 for granite, and $2,200–$3,800 for quartz.
          </p>

          <h2>Labor Costs for Minneapolis Kitchen Remodels</h2>
          <p>
            Labor is one of the most variable costs and the hardest to predict.
            In the Twin Cities market in 2026:
          </p>
          <ul>
            <li>
              <strong>General contractor markup:</strong> 15–25% over
              subcontractor costs
            </li>
            <li>
              <strong>Plumber:</strong> $150–$250/hr (relocating sink or adding
              island plumbing adds $2,000–$5,000)
            </li>
            <li>
              <strong>Electrician:</strong> $120–$200/hr (GFCI outlets, under-cabinet lighting, island circuits)
            </li>
            <li>
              <strong>Tile setter:</strong> $12–$20/sq ft labor only
            </li>
            <li>
              <strong>Cabinet installer:</strong> $75–$150/hr or
              $250–$500/linear foot
            </li>
          </ul>

          <h2>How to Get Accurate Quotes in Minneapolis</h2>
          <p>
            The most reliable way to price your project is to get 3 detailed
            bids from licensed contractors who specialize in kitchen remodels
            (not handymen or general residential contractors). Ask each to bid
            the same scope of work and include:
          </p>
          <ol>
            <li>Itemized labor and material costs</li>
            <li>Cabinet brand, line, and finish</li>
            <li>Countertop material, thickness, and edge profile</li>
            <li>Permit costs (required for electrical, plumbing, and structural work in Hennepin County)</li>
            <li>Timeline and payment schedule</li>
          </ol>
          <p>
            Be skeptical of any quote that comes in more than 25% below the
            others — it usually means something is missing from scope or the
            contractor is cutting corners on materials.
          </p>

          <h2>Is It Worth Remodeling a Kitchen in Minneapolis?</h2>
          <p>
            From a pure ROI perspective, a mid-range kitchen remodel in
            Minneapolis returns approximately 70–75 cents on the dollar at
            resale, according to Remodeling Magazine&apos;s 2025 Cost vs. Value
            report for the Minneapolis metro. That&apos;s slightly above the national
            average.
          </p>
          <p>
            However, ROI alone misses a key point: in competitive neighborhoods
            like Edina, Minnetonka, Wayzata, and parts of St. Paul, an updated
            kitchen can be the difference between a home selling in days vs.
            sitting for months. The intangible value of daily enjoyment of a
            beautiful kitchen also matters.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-6 not-prose">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="border border-stone-200/80 rounded-2xl p-6 bg-stone-50/50">
                <h3 className="font-semibold text-stone-900 mb-2">{q.name}</h3>
                <p className="text-stone-600">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>

          <h2>Ready to Get a Quote?</h2>
          <p>
            Minneapolis Kitchen &amp; Bath provides free, no-obligation quotes
            for kitchen remodeling projects throughout the Twin Cities metro —
            including Minneapolis, St. Paul, Edina, Minnetonka, Eden Prairie,
            Wayzata, and surrounding communities.
          </p>
        </div>

        <InlineCta
          heading="Get Your Free Kitchen Remodel Quote"
          subheading="Serving Minneapolis, St. Paul, Edina, Minnetonka & the Twin Cities metro. Most quotes delivered within 48 hours."
        />

        <div className="mt-10 border-t border-stone-200 pt-10">
          <h2 className="font-display text-xl font-semibold text-stone-900 mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/bathroom-tile-trends-2026" className="group block p-5 border border-stone-200/80 rounded-2xl hover:border-teal-200 transition-colors">
              <div className="font-semibold text-stone-900 group-hover:text-teal-800">Bathroom Tile Trends 2026</div>
              <div className="text-sm text-stone-500 mt-1">What Minneapolis homeowners are choosing this year</div>
            </Link>
            <Link href="/blog/quartz-vs-granite-countertops" className="group block p-5 border border-stone-200/80 rounded-2xl hover:border-teal-200 transition-colors">
              <div className="font-semibold text-stone-900 group-hover:text-teal-800">Quartz vs. Granite Countertops</div>
              <div className="text-sm text-stone-500 mt-1">Which is right for your Minneapolis kitchen?</div>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
