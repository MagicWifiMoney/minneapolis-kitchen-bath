import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, blogPostBySlug } from "@/data/blog";
import { blogBodyBySlug } from "@/content/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { FAQSection } from "@/components/FAQSection";
import { InlineCta } from "@/components/InlineCta";

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
      images: [post.image ?? "/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image ?? "/og-image.jpg"],
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
      : ["https://minneapoliskitchenandbath.com/og-image.jpg"],
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
        url: "https://minneapoliskitchenandbath.com/og-image.jpg",
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

      <div className="bg-hero-pattern border-b border-stone-200/60">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <header>
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: post.title },
              ]}
            />
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 mb-4 leading-tight tracking-tight">
              {post.title}
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              {post.description}
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-stone-500">
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
        </article>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="prose prose-lg prose-site max-w-none">
          <Body />
        </div>

        <InlineCta
          heading="Get a Free Quote for Your Project"
          subheading="Serving Minneapolis, St. Paul, Edina, Minnetonka, Eden Prairie & the entire Twin Cities metro. Most quotes delivered within 48 hours."
        />

        {post.faqs && post.faqs.length > 0 && (
          <FAQSection faqs={post.faqs} heading="Frequently Asked Questions" />
        )}

        {related.length > 0 && (
          <div className="mt-12 border-t border-stone-200 pt-10">
            <h2 className="font-display text-xl font-semibold text-stone-900 mb-5">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block p-5 border border-stone-200/80 rounded-2xl hover:border-teal-200 hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-stone-900 group-hover:text-teal-800 transition-colors">
                    {p.title}
                  </div>
                  <div className="text-sm text-stone-500 mt-1 leading-relaxed">
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
        variant="white"
      />
    </>
  );
}
