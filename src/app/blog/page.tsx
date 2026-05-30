import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

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

  // Group by category for the in-page index
  const byCategory = sorted.reduce<Record<string, typeof blogPosts>>(
    (acc, p) => {
      (acc[p.category] ||= []).push(p);
      return acc;
    },
    {},
  );

  return (
    <>
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Remodeling Tips &amp; Resources
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Practical guides for Twin Cities homeowners planning kitchen and
            bathroom projects — pricing, timelines, permits, design trends,
            and more.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Latest articles
          </h2>
          <div className="grid gap-6">
            {sorted.map((post) => (
              <article
                key={post.slug}
                className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-2">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium text-slate-700">
                    {categoryLabels[post.category] ?? post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-600">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Browse by topic
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(byCategory).map(([cat, posts]) => (
              <div
                key={cat}
                className="bg-white rounded-lg border border-slate-200 p-5"
              >
                <h3 className="font-semibold text-slate-900 mb-3">
                  {categoryLabels[cat] ?? cat}
                </h3>
                <ul className="space-y-1.5">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="text-sm text-blue-700 hover:underline"
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
