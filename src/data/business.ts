import { cities } from "./cities";
import { services } from "./services";

// Single source of truth for the business's identity (NAP), hours, geo, and
// structured-data graph. Centralizing this keeps the JSON-LD consistent across
// every page and is the foundation the page-level schemas reference by @id.

export const BASE_URL = "https://minneapoliskitchenandbath.com";

// Stable @id anchors so the various schema nodes can cross-reference each other
// to form one connected graph (the "layered schema" approach).
export const ORG_ID = `${BASE_URL}/#business`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

type AggregateRating = {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
};

type Review = {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished?: string; // YYYY-MM-DD
};

export const business = {
  name: "Minneapolis Kitchen & Bath",
  legalName: "Minneapolis Kitchen & Bath",
  description:
    "Trusted local remodeling contractors for kitchens and bathrooms across the Twin Cities metro area. Licensed, insured, and fixed-price.",
  url: BASE_URL,
  telephone: "+16125550000", // TODO: replace placeholder with the real business line
  email: "hello@minneapoliskitchenandbath.com",
  priceRange: "$$",
  image: `${BASE_URL}/opengraph-image`,
  logo: `${BASE_URL}/opengraph-image`,

  address: {
    // streetAddress intentionally omitted until a real address is available —
    // an invented street address would be worse than none for local SEO.
    streetAddress: "" as string,
    addressLocality: "Minneapolis",
    addressRegion: "MN",
    postalCode: "55401",
    addressCountry: "US",
  },

  geo: { latitude: 44.9778, longitude: -93.265 },

  // Detailed opening hours. Only hours we actually know are listed; weekend/
  // appointment hours can be added here when confirmed.
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],

  // Social / external profiles. Fill in when claimed (Google Business Profile,
  // Houzz, Yelp, Facebook, etc.) so `sameAs` strengthens entity recognition.
  sameAs: [] as string[],

  // HONEST BY DEFAULT: review schema is emitted ONLY when real data is supplied.
  // Fabricating ratings violates Google's policy and is removed/penalized.
  // To enable, set this to e.g. { ratingValue: 4.9, reviewCount: 84 } backed by
  // real, on-page (or platform-verifiable) reviews, and optionally add `reviews`.
  aggregateRating: null as AggregateRating | null,
  reviews: [] as Review[],
};

/** Detailed OpeningHoursSpecification array for schema.org. */
export function openingHoursSpecification() {
  return business.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

/** PostalAddress node, omitting streetAddress when we don't have a real one. */
export function postalAddress() {
  const a = business.address;
  return {
    "@type": "PostalAddress",
    ...(a.streetAddress ? { streetAddress: a.streetAddress } : {}),
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    postalCode: a.postalCode,
    addressCountry: a.addressCountry,
  };
}

/** A lightweight reference to the central LocalBusiness node for page schemas. */
export const businessRef = { "@id": ORG_ID };

/**
 * The layered LocalBusiness graph rendered site-wide. Combines:
 * WebSite -> LocalBusiness (foundation) with GeoCoordinates, detailed
 * OpeningHoursSpecification, contactPoint, areaServed, sameAs, knowsAbout, and a
 * Service offer catalog (makesOffer / hasOfferCatalog). Review/aggregateRating
 * is included only when real data is present.
 */
export function localBusinessGraph() {
  const offers = services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      "@id": `${BASE_URL}/services/${s.slug}#service`,
      name: s.name,
      url: `${BASE_URL}/services/${s.slug}`,
    },
  }));

  const localBusiness: Record<string, unknown> = {
    "@type": "HomeAndConstructionBusiness",
    "@id": ORG_ID,
    name: business.name,
    legalName: business.legalName,
    url: business.url,
    description: business.description,
    telephone: business.telephone,
    email: business.email,
    image: business.image,
    logo: business.logo,
    priceRange: business.priceRange,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${business.geo.latitude},${business.geo.longitude}`,
    openingHoursSpecification: openingHoursSpecification(),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: business.telephone,
      email: business.email,
      areaServed: "US-MN",
      availableLanguage: ["English"],
    },
    areaServed: cities.map((c) => ({
      "@type": "City",
      name: c.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: c.name,
        addressRegion: "MN",
        addressCountry: "US",
      },
    })),
    knowsAbout: services.map((s) => s.name),
    makesOffer: offers,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Remodeling Services",
      itemListElement: offers,
    },
  };

  if (business.sameAs.length > 0) {
    localBusiness.sameAs = business.sameAs;
  }

  // Honest review layer — only when real data exists.
  if (business.aggregateRating) {
    localBusiness.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: business.aggregateRating.ratingValue,
      reviewCount: business.aggregateRating.reviewCount,
      bestRating: business.aggregateRating.bestRating ?? 5,
      worstRating: business.aggregateRating.worstRating ?? 1,
    };
  }
  if (business.reviews.length > 0) {
    localBusiness.review = business.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    }));
  }

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: business.url,
    name: business.name,
    publisher: businessRef,
    inLanguage: "en-US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, localBusiness],
  };
}
