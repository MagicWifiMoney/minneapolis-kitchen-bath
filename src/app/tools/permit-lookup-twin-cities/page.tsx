import type { Metadata } from "next";
import PermitLookup from "./PermitLookup";

export const metadata: Metadata = {
  title: "Twin Cities Remodel Permit Lookup | Minneapolis Kitchen & Bath",
  description:
    "Look up remodel permit requirements, offices, and typical lead times across Minneapolis, Saint Paul, Edina, and 9 more Twin Cities suburbs.",
  alternates: {
    canonical: "https://minneapoliskitchenandbath.com/tools/permit-lookup-twin-cities",
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Twin Cities Remodel Permit Lookup",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://minneapoliskitchenandbath.com/tools/permit-lookup-twin-cities",
  description:
    "Find the right permit office, typical lead time, and local notes for kitchen, bath, basement, and whole-house remodels across the Twin Cities.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://minneapoliskitchenandbath.com" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://minneapoliskitchenandbath.com/tools" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Twin Cities Remodel Permit Lookup",
      item: "https://minneapoliskitchenandbath.com/tools/permit-lookup-twin-cities",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PermitLookup />
    </>
  );
}
