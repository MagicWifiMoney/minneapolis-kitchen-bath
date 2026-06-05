import { localBusinessGraph } from "@/data/business";

// Site-wide layered JSON-LD: a WebSite node plus the foundational
// HomeAndConstructionBusiness (LocalBusiness) node with geo, detailed hours,
// contact point, area served, and a Service offer catalog. Other pages
// reference this business by @id to form one connected graph.
export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessGraph()) }}
    />
  );
}
