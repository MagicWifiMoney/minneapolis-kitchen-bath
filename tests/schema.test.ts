import { describe, it, expect } from "vitest";
import {
  localBusinessGraph,
  openingHoursSpecification,
  businessRef,
  business,
  ORG_ID,
  WEBSITE_ID,
} from "@/data/business";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

type Node = Record<string, unknown>;

function nodeByType(graph: Node[], type: string): Node {
  const n = graph.find((g) => g["@type"] === type);
  if (!n) throw new Error(`graph missing @type ${type}`);
  return n;
}

describe("local business graph", () => {
  const graph = localBusinessGraph()["@graph"] as Node[];
  const biz = nodeByType(graph, "HomeAndConstructionBusiness");
  const site = nodeByType(graph, "WebSite");

  it("is a connected graph: WebSite publisher references the business @id", () => {
    expect(site["@id"]).toBe(WEBSITE_ID);
    expect(biz["@id"]).toBe(ORG_ID);
    expect(site.publisher).toEqual(businessRef);
    expect(businessRef["@id"]).toBe(ORG_ID);
  });

  it("includes GeoCoordinates and detailed OpeningHoursSpecification", () => {
    const geo = biz.geo as Node;
    expect(geo["@type"]).toBe("GeoCoordinates");
    expect(typeof geo.latitude).toBe("number");
    expect(typeof geo.longitude).toBe("number");

    const hours = biz.openingHoursSpecification as Node[];
    expect(hours.length).toBeGreaterThan(0);
    for (const h of hours) {
      expect(h["@type"]).toBe("OpeningHoursSpecification");
      expect(Array.isArray(h.dayOfWeek)).toBe(true);
      expect(h.opens).toMatch(/^\d{2}:\d{2}$/);
      expect(h.closes).toMatch(/^\d{2}:\d{2}$/);
    }
  });

  it("offers every service and knows about each (Service layer)", () => {
    const offers = biz.makesOffer as Node[];
    expect(offers.length).toBe(services.length);
    const catalog = biz.hasOfferCatalog as Node;
    expect((catalog.itemListElement as Node[]).length).toBe(services.length);
    expect((biz.knowsAbout as string[]).length).toBe(services.length);
  });

  it("serves every city", () => {
    expect((biz.areaServed as Node[]).length).toBe(cities.length);
  });

  it("omits the streetAddress when none is configured (no invented address)", () => {
    const addr = biz.address as Node;
    if (!business.address.streetAddress) {
      expect(addr.streetAddress).toBeUndefined();
    }
  });

  it("does NOT emit review/aggregateRating schema unless real data is set", () => {
    // Honesty guard: fabricated ratings violate Google policy. This test fails
    // loudly if reviews are enabled without backing data being intentional.
    if (!business.aggregateRating) {
      expect(biz.aggregateRating).toBeUndefined();
    }
    if (business.reviews.length === 0) {
      expect(biz.review).toBeUndefined();
    }
  });

  it("openingHoursSpecification helper matches the business hours", () => {
    expect(openingHoursSpecification().length).toBe(business.openingHours.length);
  });
});
