import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, FileSearch } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Remodeling Tools & Calculators",
  description:
    "Free Twin Cities remodeling tools — kitchen and bathroom cost calculators and a permit lookup guide for Minneapolis metro cities.",
  alternates: { canonical: "https://minneapoliskitchenandbath.com/tools" },
};

const tools = [
  {
    href: "/tools/kitchen-remodel-cost-calculator",
    title: "Kitchen Remodel Cost Calculator",
    description:
      "Estimate low, mid, and high kitchen remodel costs by size, finish tier, scope, and city.",
    icon: Calculator,
  },
  {
    href: "/tools/bathroom-remodel-cost-calculator",
    title: "Bathroom Remodel Cost Calculator",
    description:
      "Ballpark bathroom remodel costs for powder rooms, hall baths, and primary suites.",
    icon: Calculator,
  },
  {
    href: "/tools/permit-lookup-twin-cities",
    title: "Twin Cities Permit Lookup",
    description:
      "Permit requirements and local building department links for Twin Cities suburbs.",
    icon: FileSearch,
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHero
        title="Remodeling Tools"
        subtitle="Free calculators and local guides to help you plan your Twin Cities kitchen or bathroom project."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Tools" },
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto grid gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex gap-4 p-6 rounded-2xl border border-stone-200/80 hover:border-teal-200 hover:shadow-lg hover:shadow-stone-200/50 transition-all"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                <tool.icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-stone-900 group-hover:text-teal-800 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-stone-500 mt-1 leading-relaxed">
                  {tool.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-teal-700">
                  Open tool
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
