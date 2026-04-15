import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Minneapolis Kitchen & Bath serves the entire Twin Cities metro — Minneapolis, Saint Paul, Edina, Bloomington, Plymouth, Minnetonka, Eden Prairie, and more.",
};

const areas = [
  {
    city: "Minneapolis",
    desc: "Our home base. We work throughout all Minneapolis neighborhoods from Kenwood to Northeast.",
  },
  {
    city: "Saint Paul",
    desc: "Full service in Saint Paul and surrounding areas including Highland Park, Summit Hill, and Lowertown.",
  },
  {
    city: "Edina",
    desc: "Serving Edina homeowners with premium kitchen and bathroom renovations.",
  },
  {
    city: "Bloomington",
    desc: "Kitchen and bath remodeling for Bloomington homes, from established neighborhoods to new construction.",
  },
  {
    city: "Plymouth",
    desc: "Serving Plymouth with the same quality and care as our Minneapolis work.",
  },
  {
    city: "Minnetonka",
    desc: "Beautiful lakeside homes deserve beautiful kitchens and baths. We serve all of Minnetonka.",
  },
  {
    city: "Eden Prairie",
    desc: "Full kitchen and bathroom remodeling services for Eden Prairie residents.",
  },
  {
    city: "Wayzata",
    desc: "Premium remodeling for Wayzata and Lake Minnetonka area homeowners.",
  },
  {
    city: "Maple Grove",
    desc: "Serving Maple Grove with full-service kitchen and bathroom remodeling.",
  },
  {
    city: "Eagan",
    desc: "Quality remodeling services for Eagan homeowners on the south side of the metro.",
  },
  {
    city: "Burnsville",
    desc: "Kitchen and bath renovations for Burnsville homes.",
  },
  {
    city: "Richfield",
    desc: "Serving Richfield, just minutes from Minneapolis.",
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Service Areas</h1>
          <p className="text-slate-300 text-lg">
            We serve the entire Twin Cities metro — from Minneapolis and Saint Paul to the suburbs.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-slate-600 mb-10 max-w-2xl">
            Minneapolis Kitchen & Bath is based in Minneapolis and serves homeowners throughout the
            Twin Cities metro. Not sure if we serve your area? Contact us — if you&apos;re within 45
            minutes of downtown Minneapolis, the answer is almost certainly yes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((area) => (
              <div key={area.city} className="border border-slate-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-slate-900 mb-1">{area.city}</h2>
                <p className="text-sm text-slate-600">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Don&apos;t see your city?</h2>
          <p className="text-blue-100 mb-6">
            We likely still serve your area. Reach out and we&apos;ll confirm.
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
