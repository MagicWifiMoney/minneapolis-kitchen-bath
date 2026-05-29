import { cities } from "@/data/cities";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://minneapoliskitchenandbath.com/#business",
    name: "Minneapolis Kitchen & Bath",
    url: "https://minneapoliskitchenandbath.com",
    telephone: "+16125550000",
    email: "hello@minneapoliskitchenandbath.com",
    description:
      "Trusted local remodeling contractors for kitchens and bathrooms across the Twin Cities metro area.",
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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Minneapolis",
      addressRegion: "MN",
      postalCode: "55401",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.9778,
      longitude: -93.265,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    image: "https://minneapoliskitchenandbath.com/og-image.jpg",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
