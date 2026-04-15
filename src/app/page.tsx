import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minneapolis Kitchen & Bath | Remodeling Contractors",
  description:
    "Minneapolis Kitchen & Bath — trusted local remodeling contractors for kitchens and bathrooms across the Twin Cities. Get a free quote today.",
};

const services = [
  {
    title: "Kitchen Remodeling",
    description:
      "Full kitchen renovations from cabinet replacement to complete gut-and-rebuild. Custom designs for every budget.",
    icon: "🍳",
  },
  {
    title: "Bathroom Remodeling",
    description:
      "Transform your bathroom with new tile, fixtures, vanities, and layouts. From powder rooms to master suites.",
    icon: "🛁",
  },
  {
    title: "Custom Cabinetry",
    description:
      "Made-to-order cabinetry for kitchens, bathrooms, and beyond. Maximize storage and elevate your space.",
    icon: "🪵",
  },
  {
    title: "Countertops",
    description:
      "Quartz, granite, marble, and butcher block. We source and install premium countertops to fit your vision.",
    icon: "✨",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Twin Cities Kitchen & Bath Remodeling
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Trusted local contractors serving Minneapolis, Saint Paul, and the surrounding metro.
            Quality craftsmanship, transparent pricing, and zero surprises.
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

      {/* Services preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What We Do</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              From concept to completion, we handle every aspect of your kitchen or bathroom
              remodel with licensed, insured professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="p-6 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="text-blue-600 font-medium hover:underline">
              See all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Minneapolis Kitchen & Bath?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Licensed & Insured", desc: "Full licensing and liability insurance on every job. Your home is protected." },
              { title: "Local Experts", desc: "We know Twin Cities homes inside and out. Minneapolis winters demand materials that last." },
              { title: "Transparent Pricing", desc: "Detailed quotes before work begins. No surprise line items when the job is done." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your space?</h2>
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
