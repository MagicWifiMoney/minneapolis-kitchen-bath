import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Kitchen and bathroom remodeling tips, trends, and guides from Minneapolis Kitchen & Bath.",
};

// Placeholder posts — will be populated with real content
const posts = [
  {
    slug: "kitchen-remodel-cost-minneapolis",
    title: "How Much Does a Kitchen Remodel Cost in Minneapolis?",
    excerpt:
      "A breakdown of kitchen remodeling costs in the Twin Cities — from budget refreshes to full gut renovations.",
    date: "2026-03-15",
    readTime: "6 min read",
  },
  {
    slug: "bathroom-tile-trends-2026",
    title: "Bathroom Tile Trends We're Seeing in 2026",
    excerpt:
      "Large format tiles, zellige, and warm neutrals are dominating bathroom remodels in Minneapolis this year.",
    date: "2026-03-01",
    readTime: "4 min read",
  },
  {
    slug: "quartz-vs-granite-countertops",
    title: "Quartz vs. Granite: Which Countertop Is Right for Your Kitchen?",
    excerpt:
      "A practical guide comparing quartz and granite countertops for Twin Cities homeowners — durability, cost, and maintenance.",
    date: "2026-02-15",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Remodeling Tips & Resources</h1>
          <p className="text-slate-300 text-lg">
            Practical guides for Twin Cities homeowners planning kitchen and bathroom projects.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-600">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
