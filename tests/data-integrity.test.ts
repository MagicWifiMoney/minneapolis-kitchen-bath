import { describe, it, expect } from "vitest";
import { cities, cityBySlug } from "@/data/cities";
import { services, serviceBySlug, serviceByUrlSegment } from "@/data/services";
import { blogPosts, blogPostBySlug } from "@/data/blog";
import { neighborhoodPages } from "@/data/neighborhoods";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("cities data", () => {
  it("has unique slugs", () => {
    const slugs = cities.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every city has the required local fields populated", () => {
    for (const c of cities) {
      expect(c.slug, c.name).toMatch(slugPattern);
      expect(c.name.length).toBeGreaterThan(0);
      expect(c.zip.length, `${c.name} should list ZIPs`).toBeGreaterThan(0);
      expect(c.neighborhoods.length, `${c.name} neighborhoods`).toBeGreaterThan(0);
      expect(Number.isFinite(c.lat), `${c.name} lat`).toBe(true);
      expect(Number.isFinite(c.lng), `${c.name} lng`).toBe(true);
      expect(c.medianHomeValue, `${c.name} median value`).toBeGreaterThan(0);
    }
  });

  it("cityBySlug resolves every city", () => {
    for (const c of cities) expect(cityBySlug[c.slug]).toBe(c);
  });
});

describe("services data", () => {
  it("has unique slugs and url segments", () => {
    const slugs = services.map((s) => s.slug);
    const segs = services.map((s) => s.urlSegment);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(segs).size).toBe(segs.length);
  });

  it("relatedServiceSlugs all resolve to real services", () => {
    for (const s of services) {
      for (const rel of s.relatedServiceSlugs) {
        expect(serviceBySlug[rel], `${s.slug} -> ${rel}`).toBeDefined();
      }
    }
  });

  it("city-enabled services define FAQs and pricing tiers", () => {
    for (const s of services.filter((x) => x.isCityPageEnabled)) {
      expect(s.faqs.length, `${s.slug} faqs`).toBeGreaterThan(0);
      expect(s.priceRange.length, `${s.slug} priceRange`).toBeGreaterThan(0);
    }
  });

  it("lookup maps resolve every service", () => {
    for (const s of services) {
      expect(serviceBySlug[s.slug]).toBe(s);
      expect(serviceByUrlSegment[s.urlSegment]).toBe(s);
    }
  });
});

describe("blog data", () => {
  it("has unique slugs", () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("relatedSlugs all resolve to real posts (no broken internal links)", () => {
    for (const p of blogPosts) {
      for (const rel of p.relatedSlugs ?? []) {
        expect(blogPostBySlug[rel], `${p.slug} -> ${rel}`).toBeDefined();
      }
    }
  });

  it("every FAQ entry has a non-empty question and answer", () => {
    for (const p of blogPosts) {
      for (const f of p.faqs ?? []) {
        expect(f.question.trim().length, p.slug).toBeGreaterThan(0);
        expect(f.answer.trim().length, p.slug).toBeGreaterThan(0);
      }
    }
  });

  it("dates are valid ISO dates", () => {
    for (const p of blogPosts) {
      expect(Number.isNaN(Date.parse(p.date)), `${p.slug} date`).toBe(false);
      if (p.updated) {
        expect(Number.isNaN(Date.parse(p.updated)), `${p.slug} updated`).toBe(false);
      }
    }
  });
});

describe("neighborhood pages", () => {
  it("reference a real service (by slug and urlSegment) and a real city", () => {
    for (const n of neighborhoodPages) {
      expect(serviceBySlug[n.serviceSlug], `${n.slug} service`).toBeDefined();
      expect(serviceByUrlSegment[n.serviceUrlSegment], `${n.slug} segment`).toBeDefined();
      expect(cityBySlug[n.citySlug], `${n.slug} city`).toBeDefined();
    }
  });

  it("only attach to city-enabled services (so the parent route exists)", () => {
    for (const n of neighborhoodPages) {
      expect(
        serviceByUrlSegment[n.serviceUrlSegment]?.isCityPageEnabled,
        `${n.slug} parent service must be city-enabled`,
      ).toBe(true);
    }
  });

  it("have unique composite route keys", () => {
    const keys = neighborhoodPages.map(
      (n) => `${n.serviceUrlSegment}/${n.citySlug}/${n.slug}`,
    );
    expect(new Set(keys).size).toBe(keys.length);
  });
});
