import LeadCapture from "../components/LeadCapture";
import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { blogPosts } from "@/data/blog";
import { FAQSection } from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Minneapolis Kitchen & Bath | Twin Cities Remodeling Contractors",
  description:
    "Trusted Twin Cities kitchen and bathroom remodeling contractors. Custom kitchens from $35K, full baths from $18K. Licensed, insured, free in-home quotes across the Minneapolis metro.",
  alternates: { canonical: "https://minneapoliskitchenandbath.com" },
};

const homepageFAQs = [
  {
    question: "How much does a kitchen remodel cost in Minneapolis?",
    answer:
      "Most Minneapolis kitchen remodels in 2026 fall in three tiers: $15,000–$30,000 for a budget refresh (cabinet paint or refacing, new counters, hardware), $35,000–$75,000 for a mid-range full remodel (semi-custom cabinets, quartz counters, new appliances), and $80,000–$150,000+ for high-end custom kitchens. See our complete Minneapolis kitchen remodel cost guide for detailed breakdowns.",
  },
  {
    question: "How much does a bathroom remodel cost in the Twin Cities?",
    answer:
      "Powder rooms run $8,000–$18,000. Full hall bathrooms with tile showers run $18,000–$45,000. Primary suite bathrooms with custom tile, freestanding tubs, and double vanities run $45,000–$100,000+.",
  },
  {
    question: "What cities does Minneapolis Kitchen & Bath serve?",
    answer:
      "We serve the entire Twin Cities metro — Minneapolis, Saint Paul, Edina, Bloomington, Minnetonka, Eden Prairie, Plymouth, Wayzata, Maple Grove, Eagan, Burnsville, Richfield, and surrounding communities within a 45-minute drive of downtown Minneapolis.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes — we hold a Minnesota residential building contractor license, carry full general liability and workers' compensation insurance, and pull permits for every project that requires them.",
  },
  {
    question: "How long does a kitchen remodel take?",
    answer:
      "Most Twin Cities kitchen remodels take 6–12 weeks of on-site work, plus 4–10 weeks of cabinet and material lead time before construction starts. Total project timeline is typically 3–6 months from contract signing to cooking in your new kitchen.",
  },
  {
    question: "Do I need a permit to remodel my kitchen or bathroom?",
    answer:
      "Almost certainly. Any project involving plumbing relocation, new electrical circuits, structural changes, or work over $1,000–$5,000 (varies by city) requires a permit in Minneapolis, Saint Paul, and surrounding suburbs. We pull permits and manage inspections for every job that needs them.",
  },
];

export default function HomePage() {
  const recentPosts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Twin Cities Kitchen &amp; Bath Remodeling
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Trusted local contractors serving Minneapolis, Saint Paul, and the
            surrounding metro. Quality craftsmanship, transparent pricing, and
            zero surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="bg-white/10 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              What We Do
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              From concept to completion, we handle every aspect of your
              kitchen or bathroom remodel with licensed, insured professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="p-6 border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all block"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-600">{service.tagline}</p>
                <div className="mt-3 text-sm text-blue-600 font-medium">
                  Learn more →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas — internal linking gold */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Serving the Twin Cities Metro
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Find pricing, permit details, and local information for your
              specific city.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-w-5xl mx-auto">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="text-center px-3 py-3 bg-white rounded-md border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-700 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/service-areas"
              className="text-blue-600 font-medium hover:underline"
            >
              See all service areas →
            </Link>
          </div>
        </div>
      </section>

      
      {/* Lead Capture Section */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Planning a remodel?</h2>
              <p className="text-lg text-slate-600 mb-6">
                Don't start your project without knowing the local market rates. Download our 
                comprehensive 2026 Cost Guide to see what homeowners in the Twin Cities are 
                paying for quality renovations.
              </p>
              <ul className="space-y-3">
                {[
                  "Average costs for Kitchens & Baths",
                  "Material lead time estimates",
                  "Local permit requirements checklist"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-700 font-medium">
                    <span className="text-blue-600">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <LeadCapture />
          </div>
        </div>
      </section>
\n      {/* Why choose us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Minneapolis Kitchen &amp; Bath?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Licensed & Insured",
                desc: "Minnesota residential building contractor license, full liability and workers' comp insurance.",
              },
              {
                title: "Local Experts",
                desc: "We know Twin Cities homes inside and out — Minneapolis bungalows, Edina mid-centuries, Wayzata lakefronts.",
              },
              {
                title: "Fixed-Price Quotes",
                desc: "Detailed itemized quotes before work begins. No surprise line items when the job is done.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured blog content */}
      <section className="py-16 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Planning Your Project
              </h2>
              <p className="text-slate-600">
                Real cost data and remodeling guides for Twin Cities homes.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-blue-600 font-medium hover:underline"
            >
              All articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block bg-white p-6 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                  {p.readTime}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600">{p.excerpt}</p>
                <div className="mt-3 text-sm text-blue-600 font-medium">
                  Read article →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={homepageFAQs} />

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform your space?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Contact us today for a free, no-obligation consultation and quote.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors inline-block"
          >
            Get Your Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
