import type { Metadata } from "next";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Kitchen Remodel Cost Calculator (Twin Cities) | Minneapolis Kitchen & Bath",
  description:
    "Free kitchen remodel cost calculator for Minneapolis, Saint Paul, and Twin Cities suburbs. Get low, mid, and high estimates by size, finish tier, scope, and city.",
  alternates: {
    canonical: "https://minneapoliskitchenandbath.com/tools/kitchen-remodel-cost-calculator",
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kitchen Remodel Cost Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://minneapoliskitchenandbath.com/tools/kitchen-remodel-cost-calculator",
  description:
    "Estimate kitchen remodel costs in the Twin Cities by kitchen size, finish tier, scope of work, and city.",
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
      name: "Kitchen Remodel Cost Calculator",
      item: "https://minneapoliskitchenandbath.com/tools/kitchen-remodel-cost-calculator",
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
      <Calculator />
    </>
  );
}
