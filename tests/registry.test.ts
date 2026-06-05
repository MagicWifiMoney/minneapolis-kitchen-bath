import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { blogPosts } from "@/data/blog";
import { blogBodyBySlug } from "@/content/blog";
import { neighborhoodPages } from "@/data/neighborhoods";
import { neighborhoodBodyByKey } from "@/content/neighborhoods";

const contentDir = (p: string) =>
  fileURLToPath(new URL(`../src/content/${p}`, import.meta.url));

describe("blog content registry", () => {
  it("every blog post has a registered body component", () => {
    for (const p of blogPosts) {
      expect(blogBodyBySlug[p.slug], `missing body for ${p.slug}`).toBeDefined();
    }
  });

  it("every registered body maps to a real post (no orphan components)", () => {
    for (const slug of Object.keys(blogBodyBySlug)) {
      expect(
        blogPosts.some((p) => p.slug === slug),
        `orphan body component: ${slug}`,
      ).toBe(true);
    }
  });

  it("every blog post has a body file on disk", () => {
    for (const p of blogPosts) {
      expect(
        existsSync(contentDir(`blog/${p.slug}.tsx`)),
        `missing file src/content/blog/${p.slug}.tsx`,
      ).toBe(true);
    }
  });
});

describe("neighborhood content registry", () => {
  it("every neighborhood page has a registered body under its composite key", () => {
    for (const n of neighborhoodPages) {
      const key = `${n.serviceUrlSegment}/${n.citySlug}/${n.slug}`;
      expect(neighborhoodBodyByKey[key], `missing body for ${key}`).toBeDefined();
    }
  });

  it("every registered neighborhood body maps to a real page", () => {
    const keys = new Set(
      neighborhoodPages.map(
        (n) => `${n.serviceUrlSegment}/${n.citySlug}/${n.slug}`,
      ),
    );
    for (const key of Object.keys(neighborhoodBodyByKey)) {
      expect(keys.has(key), `orphan neighborhood body: ${key}`).toBe(true);
    }
  });

  it("every neighborhood page has a body file on disk", () => {
    for (const n of neighborhoodPages) {
      expect(
        existsSync(contentDir(`neighborhoods/${n.slug}.tsx`)),
        `missing file src/content/neighborhoods/${n.slug}.tsx`,
      ).toBe(true);
    }
  });
});
