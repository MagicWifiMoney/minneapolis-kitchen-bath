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
  {
    slug: "kenwood-tudor",
    serviceSlug: "kitchen-remodeling",
    serviceUrlSegment: "kitchen-remodeling",
    citySlug: "minneapolis",
    cityName: "Minneapolis",
    neighborhoodName: "Kenwood",
    homeStyle: "Tudor",
    metaTitle: "Kenwood Tudor Kitchen Remodeling | Minneapolis, MN",
    metaDescription:
      "Kitchen remodeling for grand Tudor Revival homes in Kenwood, Minneapolis. Period-correct cabinetry, butler's pantry revival, and high-end finishes near Lake of the Isles.",
    h1: "Kenwood Tudor Kitchen Remodeling",
    intro:
      "Kenwood is home to some of the grandest Tudor Revivals in Minneapolis, set on the wooded blocks between Lake of the Isles and Cedar Lake. Remodeling a kitchen in one of these 1910s-1930s homes is a higher-end, more detailed job than a typical suburban renovation. We have completed multiple Kenwood kitchen remodels, opening closed formal floor plans, matching original quarter-sawn oak millwork, reviving butler's pantries, and delivering the finish level these homes and homeowners expect.",
  },
  {
    slug: "longfellow-bungalow",
    serviceSlug: "kitchen-remodeling",
    serviceUrlSegment: "kitchen-remodeling",
    citySlug: "minneapolis",
    cityName: "Minneapolis",
    neighborhoodName: "Longfellow",
    homeStyle: "Bungalow",
    metaTitle: "Longfellow Bungalow Kitchen Remodeling | Minneapolis, MN",
    metaDescription:
      "Kitchen remodeling for 1920s Craftsman bungalows in Longfellow, Minneapolis. Opening cramped kitchens to the dining room while preserving built-ins, trim, and bungalow character.",
    h1: "Longfellow Bungalow Kitchen Remodeling",
    intro:
      "Longfellow, the neighborhood between Hiawatha and the Mississippi River near Minnehaha Falls, is full of classic 1920s Craftsman bungalows. Their original kitchens are small, closed off, and built for a different era. We have completed multiple Longfellow bungalow kitchens, opening the wall to the dining room, preserving original Douglas fir trim and built-ins, and adding modern storage and function without erasing the home's Arts and Crafts character.",
  },
  {
    slug: "crocus-hill-victorian",
    serviceSlug: "bathroom-remodeling",
    serviceUrlSegment: "bathroom-remodeling",
    citySlug: "saint-paul",
    cityName: "Saint Paul",
    neighborhoodName: "Crocus Hill",
    homeStyle: "Victorian",
    metaTitle: "Crocus Hill Victorian Bathroom Remodeling | Saint Paul, MN",
    metaDescription:
      "Bathroom remodeling for Crocus Hill Victorian homes in Saint Paul. Period-correct tile, Schluter waterproofing in century-old houses, heated floors, and Heritage Preservation experience.",
    h1: "Crocus Hill Victorian Bathroom Remodeling",
    intro:
      "Crocus Hill is one of Saint Paul's most distinguished historic neighborhoods, with ornate 1880s-1900s Victorians on the bluff near Summit Avenue. Bathrooms in these homes are often tiny, original, or carved out of former closets and back bedrooms. We have completed multiple Crocus Hill Victorian bathroom remodels, sourcing period-correct tile, waterproofing tile showers in 120-year-old walls, navigating Heritage Preservation review, and delivering the finish quality these homes deserve.",
  },
  {
    slug: "highland-park-cape-cod",
    serviceSlug: "kitchen-remodeling",
    serviceUrlSegment: "kitchen-remodeling",
    citySlug: "saint-paul",
    cityName: "Saint Paul",
    neighborhoodName: "Highland Park",
    homeStyle: "Cape Cod",
    metaTitle: "Highland Park Cape Cod Kitchen Remodeling | Saint Paul, MN",
    metaDescription:
      "Kitchen remodeling for 1940s-1950s Cape Cod and post-war homes in Highland Park, Saint Paul. Opening compact kitchens, removing soffits, panel upgrades, and family-friendly design.",
    h1: "Highland Park Cape Cod Kitchen Remodeling",
    intro:
      "Highland Park is one of Saint Paul's most established family neighborhoods, built largely with 1940s and 1950s Cape Cods, story-and-a-halfs, and ramblers. Their kitchens are typically compact and closed off, with soffits hiding post-war ductwork. We have completed multiple Highland Park kitchen remodels, opening kitchens to dining rooms and back porches, removing soffits, upgrading dated panels and wiring, and designing for the way Highland Park families actually live.",
  },
  {
    slug: "morningside-tudor",
    serviceSlug: "bathroom-remodeling",
    serviceUrlSegment: "bathroom-remodeling",
    citySlug: "edina",
    cityName: "Edina",
    neighborhoodName: "Morningside",
    homeStyle: "Tudor",
    metaTitle: "Morningside Tudor Bathroom Remodeling | Edina, MN",
    metaDescription:
      "Bathroom remodeling for 1920s-1940s Tudors in Morningside, Edina. Period-correct tile, Schluter waterproofing in older homes, heated floors, and finish quality Edina buyers expect.",
    h1: "Morningside Tudor Bathroom Remodeling",
    intro:
      "Morningside is an older, walkable pocket of Edina bordering southwest Minneapolis, full of 1920s-1940s Tudors and bungalows on character-rich blocks. The original single full bath is usually small and dated. We have completed multiple Morningside bathroom remodels, carving out ensuites and powder rooms, balancing period-correct tile with modern function, waterproofing tile showers in old plaster walls, and adding heated floors for Minnesota winters.",
  },
  {
    slug: "indian-hills-midcentury",
    serviceSlug: "kitchen-remodeling",
    serviceUrlSegment: "kitchen-remodeling",
    citySlug: "edina",
    cityName: "Edina",
    neighborhoodName: "Indian Hills",
    homeStyle: "Mid-Century Modern",
    metaTitle: "Indian Hills Mid-Century Kitchen Remodeling | Edina, MN",
    metaDescription:
      "Kitchen remodeling for mid-century modern homes in Indian Hills, Edina. Updating slab cabinetry and vaulted, beamed kitchens to feel current without erasing their mid-century character.",
    h1: "Indian Hills Mid-Century Modern Kitchen Remodeling",
    intro:
      "Indian Hills is one of Edina's most upscale and wooded neighborhoods, full of architect-designed mid-century moderns, split-levels, and walkouts set into rolling terrain. Their kitchens reward a careful hand: the goal is to feel current without erasing the warm wood, horizontal lines, and beamed ceilings that make these homes special. We have completed multiple Indian Hills kitchen remodels, opening galley layouts to great rooms, integrating panel-ready appliances, and respecting the mid-century design language while adding modern function.",
  },
];

export const neighborhoodPageBySlug = Object.fromEntries(
  neighborhoodPages.map((n) => [`${n.serviceUrlSegment}/${n.citySlug}/${n.slug}`, n]),
);
