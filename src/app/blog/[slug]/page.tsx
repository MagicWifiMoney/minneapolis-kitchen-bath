import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, blogPostBySlug } from "@/data/blog";
import { blogBodyBySlug } from "@/content/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { FAQSection } from "@/components/FAQSection";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  if (!post) return {};
  const url = `https://minneapoliskitchenandbath.com/blog/${post.slug}`;

  return {
    title: post.metaTitle ?? post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: post.canonical ?? url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  const Body = blogBodyBySlug[slug];
  if (!post || !Body) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image
      ? [post.image]
      : [`https://minneapoliskitchenandbath.com/blog/${post.slug}/opengraph-image`],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Organization",
      name: "Minneapolis Kitchen & Bath",
      url: "https://minneapoliskitchenandbath.com",
      sameAs: ["https://minneapoliskitchenandbath.com/about"],
    },
    publisher: {
      "@type": "Organization",
      name: "Minneapolis Kitchen & Bath",
      logo: {
        "@type": "ImageObject",
        url: "https://minneapoliskitchenandbath.com/opengraph-image",
      },
    },
    mainEntityOfPage: `https://minneapoliskitchenandbath.com/blog/${post.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://minneapoliskitchenandbath.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://minneapoliskitchenandbath.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://minneapoliskitchenandbath.com/blog/${post.slug}` },
    ],
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  const related = (post.relatedSlugs ?? [])
    .map((s) => blogPostBySlug[s])
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.title },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.description}
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
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
            <span>{post.author}</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <Body />
        </div>

        <div className="mt-12 p-8 bg-gray-900 text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">
            Get a Free Quote for Your Project
          </h2>
          <p className="text-gray-300 mb-6">
            Serving Minneapolis, St. Paul, Edina, Minnetonka, Eden Prairie &amp;
            the entire Twin Cities metro. Most quotes delivered within 48 hours.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Request a Free Quote →
          </Link>
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <FAQSection faqs={post.faqs} heading="Frequently Asked Questions" />
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <div className="font-semibold text-gray-900">{p.title}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {p.excerpt}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <CTA
        heading="Ready to start your remodel?"
        subheading="Free in-home consultation. Detailed fixed-price quotes."
        variant="blue"
      />
    </>
  );
}
