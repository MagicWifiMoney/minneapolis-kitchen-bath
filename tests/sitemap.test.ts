import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { neighborhoodPages } from "@/data/neighborhoods";

const BASE = "https://minneapoliskitchenandbath.com";

describe("sitemap", () => {
  const entries = sitemap();

  it("contains the expected total number of URLs", () => {
    const cityEnabled = services.filter((s) => s.isCityPageEnabled).length;
    const expected =
      6 + // static pages
      services.length +
      cities.length +
      cityEnabled * cities.length +
      neighborhoodPages.length +
      blogPosts.length;
    expect(entries.length).toBe(expected);
  });

  it("has no duplicate URLs", () => {
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("every URL is absolute and uses the canonical domain", () => {
    for (const e of entries) {
      expect(e.url.startsWith(`${BASE}/`) || e.url === BASE).toBe(true);
    }
  });

  it("priorities are within the valid 0..1 range", () => {
    for (const e of entries) {
      if (e.priority !== undefined) {
        expect(e.priority).toBeGreaterThanOrEqual(0);
        expect(e.priority).toBeLessThanOrEqual(1);
      }
    }
  });

  it("includes the homepage and every blog post", () => {
    const urls = new Set(entries.map((e) => e.url));
    expect(urls.has(BASE)).toBe(true);
    for (const p of blogPosts) {
      expect(urls.has(`${BASE}/blog/${p.slug}`), p.slug).toBe(true);
    }
  });
});
