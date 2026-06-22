import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Kitchen & Bath Remodeling Blog",
  description:
    "Cost guides, design trends, and how-to articles for Minneapolis kitchen and bathroom remodeling projects. From the team at Minneapolis Kitchen & Bath.",
  alternates: { canonical: "https://minneapoliskitchenandbath.com/blog" },
};

const categoryLabels: Record<string, string> = {
  "cost-guides": "Cost Guides",
  "design-trends": "Design Trends",
  "how-to": "How-To",
  "buying-guides": "Buying Guides",
  "local-guides": "Local Guides",
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  const byCategory = sorted.reduce<Record<string, typeof blogPosts>>(
    (acc, p) => {
      (acc[p.category] ||= []).push(p);
      return acc;
    },
    {},
  );

  return (
    <>
      <PageHero
        title="Remodeling Tips & Resources"
        subtitle="Practical guides for Twin Cities homeowners planning kitchen and bathroom projects — pricing, timelines, permits, design trends, and more."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog" },
        ]}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-stone-900 mb-6">
            Latest articles
          </h2>
          <div className="grid gap-5">
            {sorted.map((post) => (
              <article
                key={post.slug}
                className="border border-stone-200/80 rounded-2xl p-6 hover:border-teal-200 hover:shadow-lg hover:shadow-stone-200/50 transition-all"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span className="px-2.5 py-0.5 bg-stone-100 rounded-full text-xs font-semibold text-stone-600">
                    {categoryLabels[post.category] ?? post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-teal-800 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-stone-600 leading-relaxed">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                >
                  Read more
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-stone-900 mb-6">
            Browse by topic
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(byCategory).map(([cat, posts]) => (
              <div
                key={cat}
                className="bg-white rounded-2xl border border-stone-200/80 p-5"
              >
                <h3 className="font-semibold text-stone-900 mb-3">
                  {categoryLabels[cat] ?? cat}
                </h3>
                <ul className="space-y-2">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="text-sm text-stone-600 hover:text-teal-700 transition-colors leading-snug"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
