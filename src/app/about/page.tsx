import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Minneapolis Kitchen & Bath — local remodeling experts serving the Twin Cities metro since day one.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Minneapolis Kitchen & Bath</h1>
          <p className="text-slate-300 text-lg">
            Local remodelers who treat your home like our own.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h2>Who We Are</h2>
          <p>
            Minneapolis Kitchen & Bath is a locally owned remodeling company serving homeowners
            across the Twin Cities metro. We specialize in kitchen and bathroom renovations — the
            two rooms that matter most to buyers, sellers, and everyday life.
          </p>

          <h2>Our Approach</h2>
          <p>
            We believe great remodeling starts with great listening. Before we swing a hammer, we
            sit down with you to understand how you use your space, what your goals are, and what
            your budget looks like. Then we design a project that hits all three.
          </p>
          <p>
            Every project is managed by a dedicated project lead who coordinates scheduling,
            subcontractors, and quality checks from demo to punch list.
          </p>

          <h2>Licensed & Insured</h2>
          <p>
            We are fully licensed in the state of Minnesota and carry full general liability
            insurance on every job. Our subcontractors are vetted, insured, and held to the same
            standards we hold ourselves to.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-block"
          >
            Request a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
