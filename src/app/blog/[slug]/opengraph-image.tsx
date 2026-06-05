import { notFound } from "next/navigation";
import { blogPosts, blogPostBySlug } from "@/data/blog";
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Minneapolis Kitchen & Bath blog article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Mirror the page so an OG image is statically generated for every post.
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  if (!post) notFound();

  return renderOgImage({
    eyebrow: "Minneapolis Kitchen & Bath · Guide",
    title: post.title,
    subtitle: post.readTime,
  });
}
