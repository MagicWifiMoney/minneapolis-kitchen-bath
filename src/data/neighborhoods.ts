export type NeighborhoodPage = {
  slug: string;            // segment for /[service]/[city]/[style]
  serviceSlug: string;     // matches services.ts slug
  serviceUrlSegment: string; // matches services.ts urlSegment
  citySlug: string;        // matches cities.ts slug
  cityName: string;
  neighborhoodName: string;
  homeStyle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;          // 1-2 paragraph intro displayed under hero
};

export const neighborhoodPages: NeighborhoodPage[] = [
  {
    slug: "summit-avenue-victorian",
    serviceSlug: "kitchen-remodeling",
    serviceUrlSegment: "kitchen-remodeling",
    citySlug: "saint-paul",
    cityName: "Saint Paul",
    neighborhoodName: "Summit Avenue",
    homeStyle: "Victorian",
    metaTitle:
      "Summit Avenue Victorian Kitchen Remodeling | Saint Paul, MN",
    metaDescription:
      "Kitchen remodeling for Summit Avenue and Summit Hill Victorian homes in Saint Paul. Heritage Preservation Commission experience, period-correct cabinetry, modern function under historic charm.",
    h1: "Summit Avenue Victorian Kitchen Remodeling",
    intro:
      "Summit Avenue is one of the longest stretches of preserved Victorian homes in the country, and remodeling a kitchen in one of these homes is a different job than remodeling a 1990s suburban two-story. We have completed multiple kitchen renovations in Summit Hill, Crocus Hill, and along Summit Avenue itself, navigating Heritage Preservation Commission reviews, working around plaster walls and knob-and-tube wiring, and matching original millwork profiles.",
  },
  {
    slug: "linden-hills-tudor",
    serviceSlug: "kitchen-remodeling",
    serviceUrlSegment: "kitchen-remodeling",
    citySlug: "minneapolis",
    cityName: "Minneapolis",
    neighborhoodName: "Linden Hills",
    homeStyle: "Tudor",
    metaTitle:
      "Linden Hills Tudor Kitchen Remodeling | Minneapolis, MN",
    metaDescription:
      "Tudor kitchen remodeling in Linden Hills, Minneapolis. Period-correct cabinetry, custom-milled trim, leaded-glass detail, and modern function for 1920s-1940s Tudor revivals.",
    h1: "Linden Hills Tudor Kitchen Remodeling",
    intro:
      "Linden Hills is one of the most concentrated Tudor Revival neighborhoods in Minneapolis. The 1920s through 1940s brick Tudors that line streets near Lake Harriet were not built with modern kitchen needs in mind. Cabinets were short, layouts were closed, and electrical was minimal. We have remodeled multiple Linden Hills Tudor kitchens, matching original millwork profiles, working with plaster walls, and respecting the home&apos;s character while delivering modern function.",
  },
  {
    slug: "country-club-tudor",
    serviceSlug: "bathroom-remodeling",
    serviceUrlSegment: "bathroom-remodeling",
    citySlug: "edina",
    cityName: "Edina",
    neighborhoodName: "Country Club",
    homeStyle: "Tudor",
    metaTitle:
      "Edina Country Club Tudor Bathroom Remodeling | Edina, MN",
    metaDescription:
      "Bathroom remodeling for Country Club Tudor homes in Edina. Period-correct tile, custom vanities, Schluter waterproofing, and the high-end finish level Country Club homeowners expect.",
    h1: "Edina Country Club Tudor Bathroom Remodeling",
    intro:
      "The Country Club neighborhood in Edina is one of the most distinguished Tudor Revival districts in the Twin Cities. Bathroom remodels in these homes call for finish levels and design sensibilities you would not bring to a 1990s split-level. We have completed multiple bathroom remodels in Country Club and surrounding Edina Tudor blocks, sourcing period-appropriate tile, working with original plaster, and delivering the finish quality these homes and homeowners expect.",
  },
  {
    slug: "lake-minnetonka-lakefront",
    serviceSlug: "kitchen-remodeling",
    serviceUrlSegment: "kitchen-remodeling",
    citySlug: "wayzata",
    cityName: "Wayzata",
    neighborhoodName: "Lake Minnetonka Lakefront",
    homeStyle: "Lakefront",
    metaTitle:
      "Lake Minnetonka Lakefront Kitchen Remodeling | Wayzata, MN",
    metaDescription:
      "Lakefront kitchen remodeling on Lake Minnetonka. High-end custom kitchens for Wayzata lakefront homes. Open-concept conversions, lake views, panel-ready appliances, custom millwork.",
    h1: "Lake Minnetonka Lakefront Kitchen Remodeling",
    intro:
      "Lake Minnetonka lakefront kitchens are some of the most ambitious projects in the Twin Cities. Open sight lines to the water, indoor-outdoor flow to docks and patios, panel-ready appliances, and custom millwork are the norm rather than the exception. We have completed multiple lakefront kitchen renovations in Wayzata and around the lake, coordinating with landscape architects and dock contractors and navigating shoreline overlay requirements.",
  },
];

export const neighborhoodPageBySlug = Object.fromEntries(
  neighborhoodPages.map((n) => [`${n.serviceUrlSegment}/${n.citySlug}/${n.slug}`, n]),
);
