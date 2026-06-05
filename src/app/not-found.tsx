import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Minneapolis Kitchen & Bath",
  description:
    "We couldn't find that page. Browse our remodeling services, service areas, and planning guides for the Twin Cities.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-3">
          404
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          We couldn&apos;t find that page
        </h1>
        <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          The page may have moved or never existed. Here are some good places to
          pick back up &mdash; or reach out and we&apos;ll point you in the right
          direction.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/"
            className="bg-blue-600 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="bg-white/10 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-colors"
          >
            Get a free quote
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            {
              href: "/services",
              title: "Our services",
              desc: "Kitchen, bath, cabinetry, countertops & more.",
            },
            {
              href: "/service-areas",
              title: "Service areas",
              desc: "Pricing & permit details for your Twin Cities city.",
            },
            {
              href: "/blog",
              title: "Planning guides",
              desc: "Real cost data and remodeling advice.",
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block p-5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-400 transition-colors"
            >
              <div className="font-semibold mb-1">{c.title}</div>
              <div className="text-sm text-slate-400">{c.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
