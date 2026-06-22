import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Minneapolis Kitchen & Bath — local remodeling experts serving the Twin Cities metro since day one.",
  alternates: { canonical: "https://minneapoliskitchenandbath.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Minneapolis Kitchen & Bath"
        subtitle="Local remodelers who treat your home like our own."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About" },
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto prose prose-lg prose-site">
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

      <CTA
        heading="Ready to get started?"
        subheading="Free in-home consultation and fixed-price quotes."
        buttonLabel="Request a Free Quote"
        variant="white"
      />
    </>
  );
}
