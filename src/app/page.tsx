import LeadCapture from "../components/LeadCapture";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { blogPosts } from "@/data/blog";
import { FAQSection } from "@/components/FAQSection";
import { getServiceIcon } from "@/lib/service-icons";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  MapPin,
  Shield,
  Star,
  Users,
} from "lucide-react";

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

const showcaseProjects = [
  {
    title: "Edina Mid-Century Kitchen",
    detail: "Semi-custom cabinets · Quartz · $68K",
    image:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80&auto=format&fit=crop",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Wayzata Primary Bath",
    detail: "Curbless shower · Heated tile",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80&auto=format&fit=crop",
    span: "",
  },
  {
    title: "Minneapolis Bungalow Bath",
    detail: "Tub-to-shower · Custom tile",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop",
    span: "",
  },
];

const trustItems = [
  { icon: Shield, label: "Licensed & insured" },
  { icon: BadgeCheck, label: "Fixed-price quotes" },
  { icon: MapPin, label: "17+ Twin Cities cities" },
  { icon: Star, label: "Local specialists" },
];

const whyUs = [
  {
    title: "Licensed & Insured",
    desc: "Minnesota residential building contractor license, full liability and workers' comp insurance.",
    icon: Shield,
  },
  {
    title: "Local Experts",
    desc: "We know Twin Cities homes inside and out — Minneapolis bungalows, Edina mid-centuries, Wayzata lakefronts.",
    icon: Users,
  },
  {
    title: "Fixed-Price Quotes",
    desc: "Detailed itemized quotes before work begins. No surprise line items when the job is done.",
    icon: BadgeCheck,
  },
];

export default function HomePage() {
  const recentPosts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const featuredServices = services.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-pattern border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-semibold tracking-wide uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                Twin Cities · Kitchen & Bath
              </div>
              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-stone-900 leading-[1.1] tracking-tight mb-6"
              >
                Remodeling done right,{" "}
                <span className="text-teal-700">without the surprises</span>
              </h1>
              <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-8 max-w-xl">
                Trusted local contractors for kitchen and bathroom renovations
                across Minneapolis, Saint Paul, and the metro. Transparent
                pricing, licensed crews, and craftsmanship you can see.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-teal-700 text-white px-7 py-3.5 rounded-xl text-base font-semibold hover:bg-teal-800 transition-colors shadow-lg shadow-teal-700/20"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-white text-stone-800 px-7 py-3.5 rounded-xl text-base font-semibold border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors"
                >
                  View Services
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-stone-600">
                {trustItems.map((item) => (
                  <span
                    key={item.label}
                    className="flex items-center gap-2 font-medium"
                  >
                    <item.icon
                      className="w-4 h-4 text-teal-600 shrink-0"
                      strokeWidth={2.25}
                    />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-stone-300/40 ring-1 ring-stone-200/80 aspect-[4/3] lg:aspect-auto lg:h-[520px]">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop"
                  alt="Modern kitchen remodel with white cabinets and natural light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-2 sm:left-4 bg-white rounded-2xl shadow-xl shadow-stone-200/80 border border-stone-100 p-4 sm:p-5 max-w-[220px]">
                <p className="text-2xl font-display font-semibold text-stone-900">
                  $35K–$75K
                </p>
                <p className="text-sm text-stone-500 mt-0.5">
                  Typical mid-range kitchen remodel
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                Recent work
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
                Spaces we&apos;ve transformed
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              Start your project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[180px]">
            {showcaseProjects.map((project) => (
              <div
                key={project.title}
                className={`group relative rounded-2xl overflow-hidden ring-1 ring-stone-200/80 ${project.span}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-semibold text-lg leading-tight">
                    {project.title}
                  </p>
                  <p className="text-stone-300 text-sm mt-1">{project.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
              Our services
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight mb-4">
              Everything for your kitchen &amp; bath
            </h2>
            <p className="text-stone-600 text-lg">
              From concept to completion with licensed, insured professionals
              under one contract.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((service) => {
              const Icon = getServiceIcon(service.slug);
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex gap-4 p-6 bg-white rounded-2xl border border-stone-200/80 hover:border-teal-200 hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 group-hover:bg-teal-100 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-stone-900 mb-1 group-hover:text-teal-800 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed">
                      {service.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-teal-700">
                      Learn more
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-teal-700 transition-colors"
            >
              View all {services.length} services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
              Service areas
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight mb-4">
              Serving the Twin Cities metro
            </h2>
            <p className="text-stone-600 text-lg">
              Local pricing, permit details, and remodeling guides for your
              city.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="px-4 py-2.5 bg-stone-50 rounded-full border border-stone-200 text-sm font-medium text-stone-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              See all service areas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 border-y border-stone-200/60">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                Free resource
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight mb-4">
                Planning a remodel?
              </h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Download our 2026 Cost Guide to see what Twin Cities homeowners
                are paying for quality kitchen and bathroom renovations.
              </p>
              <ul className="space-y-4">
                {[
                  "Average costs for kitchens & baths",
                  "Material lead time estimates",
                  "Local permit requirements checklist",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-stone-700 font-medium"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <LeadCapture />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
              Why choose us
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
              Minneapolis Kitchen &amp; Bath
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="text-center p-8 rounded-2xl bg-stone-50 border border-stone-200/80"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-stone-200 text-teal-700 mb-5 shadow-sm">
                  <item.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                Resources
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight mb-2">
                Planning your project
              </h2>
              <p className="text-stone-600">
                Real cost data and remodeling guides for Twin Cities homes.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              All articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block bg-white p-6 rounded-2xl border border-stone-200/80 hover:border-teal-200 hover:shadow-lg hover:shadow-stone-200/50 transition-all"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                  {p.readTime}
                </div>
                <h3 className="font-semibold text-stone-900 mb-2 leading-snug group-hover:text-teal-800 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {p.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-teal-700">
                  Read article
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={homepageFAQs} />

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-stone-200/60">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 to-teal-800 px-8 py-14 sm:px-12 sm:py-16 text-center shadow-xl shadow-teal-900/20">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4 tracking-tight">
                Ready to transform your space?
              </h2>
              <p className="text-teal-100 mb-8 text-lg max-w-xl mx-auto">
                Free, no-obligation consultation and quote. We respond within
                one business day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-teal-800 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-teal-50 transition-colors"
                >
                  Get Your Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+16126882413"
                  className="inline-flex items-center justify-center gap-2 bg-teal-600/40 text-white px-8 py-3.5 rounded-xl text-base font-semibold border border-white/20 hover:bg-teal-600/60 transition-colors"
                >
                  Call (612) 688-2413
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
