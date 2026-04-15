import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Kitchen remodeling, bathroom renovations, custom cabinetry, countertops, and more. See all services from Minneapolis Kitchen & Bath.",
};

const services = [
  {
    title: "Kitchen Remodeling",
    slug: "kitchen-remodeling",
    description:
      "Full kitchen renovations from cabinet replacement to complete gut-and-rebuild. We handle layout planning, demo, plumbing rough-in, electrical, drywall, cabinets, counters, backsplash, flooring, and appliance install.",
    highlights: [
      "Custom and semi-custom cabinetry",
      "Countertop fabrication and install",
      "Tile backsplash",
      "Lighting design",
      "Appliance hookups",
    ],
  },
  {
    title: "Bathroom Remodeling",
    slug: "bathroom-remodeling",
    description:
      "Transform any bathroom from powder room to master suite. We specialize in tile showers, soaking tubs, double vanities, and full layout redesigns.",
    highlights: [
      "Walk-in and tiled showers",
      "Soaking and freestanding tubs",
      "Vanity and fixture replacement",
      "Heated floor installation",
      "Exhaust fan and lighting",
    ],
  },
  {
    title: "Custom Cabinetry",
    slug: "custom-cabinetry",
    description:
      "Made-to-order cabinetry for kitchens, bathrooms, mudrooms, laundry rooms, and home offices. Maximize every inch with storage designed for your space.",
    highlights: [
      "Full custom and semi-custom builds",
      "Painted and stained finishes",
      "Soft-close hardware",
      "Pull-out shelves and organizers",
    ],
  },
  {
    title: "Countertops",
    slug: "countertops",
    description:
      "We source and install premium countertops for kitchens and bathrooms. Quartz, granite, marble, quartzite, and butcher block available.",
    highlights: [
      "Quartz and engineered stone",
      "Natural granite and marble",
      "Butcher block and wood",
      "Template and fabrication included",
    ],
  },
  {
    title: "Tile & Flooring",
    slug: "tile-flooring",
    description:
      "Expert tile setting for floors, showers, backsplashes, and feature walls. We also install hardwood, LVP, and heated floor systems.",
    highlights: [
      "Large format tile",
      "Mosaic and decorative tile",
      "Hardwood and LVP",
      "Radiant heated floors",
    ],
  },
  {
    title: "Full Gut Renovations",
    slug: "full-gut",
    description:
      "Starting from scratch? We manage complete gut renovations — demo, structural changes, MEP rough-in, and full finish work — under one contract.",
    highlights: [
      "Single-contract project management",
      "Structural wall removal",
      "Plumbing and electrical relocation",
      "Permit pulling and inspections",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-slate-300 text-lg">
            Full-service kitchen and bathroom remodeling for Twin Cities homeowners.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid gap-8">
          {services.map((service) => (
            <div key={service.slug} className="border border-slate-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h2>
              <p className="text-slate-600 mb-4">{service.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="text-blue-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
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
