export type BlogPostMeta = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  keywords?: string[];
  excerpt: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  readTime: string;
  author: string;
  category: "cost-guides" | "design-trends" | "how-to" | "buying-guides" | "local-guides";
  // Internal-linking hint
  relatedSlugs?: string[];
  // Optional FAQ schema entries for the post
  faqs?: { question: string; answer: string }[];
  // Optional featured image
  image?: string;
  // External canonical url for de-duping
  canonical?: string;
};

// Note: post body is rendered via /blog/[slug]/page.tsx using a switch on slug
// to avoid forcing MDX/runtime markdown — keeps build static and zero-deps.
export const blogPosts: BlogPostMeta[] = [
  {
    slug: "kitchen-remodel-cost-minneapolis",
    title:
      "How Much Does a Kitchen Remodel Cost in Minneapolis? (2026 Guide)",
    description:
      "Minneapolis kitchen remodel costs in 2026: budget refreshes from $15,000, mid-range $35,000–$75,000, high-end $80,000+. Detailed breakdown by cabinet, countertop, appliance, and labor costs in the Twin Cities.",
    keywords: [
      "kitchen remodel cost Minneapolis",
      "kitchen renovation cost Twin Cities",
      "how much kitchen remodel Minneapolis",
      "kitchen remodeling prices Minnesota",
      "Minneapolis kitchen contractor cost",
    ],
    excerpt:
      "A breakdown of kitchen remodeling costs in the Twin Cities — from budget refreshes to full gut renovations.",
    date: "2026-03-15",
    readTime: "8 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "cost-guides",
    relatedSlugs: [
      "bathroom-remodel-cost-minneapolis",
      "quartz-vs-granite-countertops",
      "kitchen-remodel-timeline-twin-cities",
    ],
  },
  {
    slug: "bathroom-remodel-cost-minneapolis",
    title:
      "How Much Does a Bathroom Remodel Cost in Minneapolis? (2026 Guide)",
    description:
      "Real 2026 bathroom remodel costs for Minneapolis homeowners: $8K–$18K powder rooms, $18K–$45K hall baths, $45K–$100K+ primary suites. Includes tile shower, vanity, and fixture costs.",
    keywords: [
      "bathroom remodel cost Minneapolis",
      "bathroom renovation cost Twin Cities",
      "average bathroom remodel cost MN",
      "primary bathroom remodel cost Minneapolis",
    ],
    excerpt:
      "Bathroom remodel pricing in the Twin Cities — from powder room refreshes to luxury primary suites.",
    date: "2026-04-05",
    readTime: "7 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "cost-guides",
    relatedSlugs: [
      "kitchen-remodel-cost-minneapolis",
      "bathroom-tile-trends-2026",
    ],
  },
  {
    slug: "quartz-vs-granite-countertops",
    title:
      "Quartz vs. Granite Countertops: Which Is Right for Your Minneapolis Kitchen?",
    description:
      "A practical Minneapolis-specific comparison of quartz and granite countertops — durability, cost, maintenance, resale impact, and which Twin Cities kitchens benefit from each.",
    keywords: [
      "quartz vs granite Minneapolis",
      "quartz vs granite countertops",
      "best countertop kitchen Minneapolis",
      "Cambria countertops Minnesota",
    ],
    excerpt:
      "A practical guide comparing quartz and granite countertops for Twin Cities homeowners — durability, cost, and maintenance.",
    date: "2026-02-15",
    readTime: "6 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: [
      "kitchen-remodel-cost-minneapolis",
      "kitchen-cabinet-brands-twin-cities",
    ],
  },
  {
    slug: "bathroom-tile-trends-2026",
    title: "Bathroom Tile Trends We're Seeing in Minneapolis Homes (2026)",
    description:
      "Large format tile, zellige, warm neutrals, fluted feature walls. The bathroom tile trends Twin Cities homeowners are actually choosing in 2026 — and which will age well.",
    keywords: [
      "bathroom tile trends 2026",
      "Minneapolis bathroom design trends",
      "zellige tile Twin Cities",
      "large format tile bathroom",
    ],
    excerpt:
      "Large format tiles, zellige, and warm neutrals are dominating bathroom remodels in Minneapolis this year.",
    date: "2026-03-01",
    readTime: "5 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "design-trends",
    relatedSlugs: [
      "bathroom-remodel-cost-minneapolis",
      "quartz-vs-granite-countertops",
    ],
  },
  {
    slug: "kitchen-remodel-timeline-twin-cities",
    title:
      "Kitchen Remodel Timeline: How Long Does It Really Take in the Twin Cities?",
    description:
      "A realistic week-by-week kitchen remodel timeline for Minneapolis homeowners: design (2–4 weeks), permits (1–3 weeks), cabinets (6–10 weeks), and construction (4–10 weeks).",
    keywords: [
      "kitchen remodel timeline Minneapolis",
      "how long does kitchen remodel take",
      "kitchen renovation schedule MN",
    ],
    excerpt:
      "A week-by-week breakdown of how long a kitchen remodel really takes in Minneapolis — design through final punch list.",
    date: "2026-04-12",
    readTime: "6 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "how-to",
    relatedSlugs: [
      "kitchen-remodel-cost-minneapolis",
      "minneapolis-kitchen-remodel-permits",
    ],
  },
  {
    slug: "minneapolis-kitchen-remodel-permits",
    title:
      "Kitchen Remodel Permits in Minneapolis & the Twin Cities: What You Actually Need",
    description:
      "What permits you actually need for a kitchen or bathroom remodel in Minneapolis, Saint Paul, Edina, Bloomington, and surrounding suburbs. Costs, lead times, and inspection schedules.",
    keywords: [
      "kitchen remodel permit Minneapolis",
      "bathroom remodel permit Twin Cities",
      "do I need a permit kitchen remodel MN",
    ],
    excerpt:
      "A no-nonsense guide to what permits you actually need for a remodel in Minneapolis, Saint Paul, and the surrounding suburbs.",
    date: "2026-04-20",
    readTime: "5 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "how-to",
    relatedSlugs: [
      "kitchen-remodel-cost-minneapolis",
      "kitchen-remodel-timeline-twin-cities",
    ],
  },
  {
    slug: "kitchen-cabinet-brands-twin-cities",
    title:
      "The Best Kitchen Cabinet Brands for Minneapolis Homes (2026 Buying Guide)",
    description:
      "An honest comparison of kitchen cabinet brands available in the Twin Cities — Cambria, Schuler, Diamond, Kraftmaid, custom local shops. Pricing tiers, lead times, and which fits which kitchen.",
    keywords: [
      "best kitchen cabinet brands Minneapolis",
      "Schuler vs Diamond cabinets",
      "Kraftmaid cabinets Twin Cities",
      "custom cabinets Minneapolis",
    ],
    excerpt:
      "A contractor's honest take on the best cabinet brands available in the Twin Cities — and which works for which kind of kitchen.",
    date: "2026-05-01",
    readTime: "7 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: [
      "kitchen-remodel-cost-minneapolis",
      "quartz-vs-granite-countertops",
    ],
  },
  {
    slug: "kitchen-remodel-roi-minneapolis",
    title: "Kitchen Remodel ROI in Minneapolis: What You Actually Get Back at Resale",
    description:
      "Real Minneapolis kitchen remodel ROI data for 2026 — mid-range remodels return 70–75%, minor refreshes return 85%+. Which improvements add the most resale value in the Twin Cities market.",
    keywords: [
      "kitchen remodel ROI Minneapolis",
      "kitchen renovation resale value Twin Cities",
      "what kitchen upgrades add value MN",
    ],
    excerpt:
      "What a kitchen remodel actually returns at resale in the Twin Cities — and which upgrades pay back the most.",
    date: "2026-05-18",
    readTime: "6 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: [
      "kitchen-remodel-cost-minneapolis",
      "kitchen-cabinet-brands-twin-cities",
    ],
  },
  {
    slug: "small-bathroom-remodel-ideas-minneapolis",
    title:
      "Small Bathroom Remodel Ideas for Minneapolis Homes (That Actually Work)",
    description:
      "Practical small bathroom remodel ideas for Minneapolis bungalows, post-war ramblers, and Saint Paul cape cods. Maximize a 30–50 sq ft hall bath with the right layout, tile, and storage.",
    keywords: [
      "small bathroom remodel Minneapolis",
      "tiny bathroom ideas Twin Cities",
      "bungalow bathroom remodel MN",
    ],
    excerpt:
      "Real ideas for the cramped 30–50 sq ft hall bathrooms common in Minneapolis bungalows and ramblers.",
    date: "2026-05-25",
    readTime: "6 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "design-trends",
    relatedSlugs: [
      "bathroom-remodel-cost-minneapolis",
      "bathroom-tile-trends-2026",
    ],
  },
  {
    slug: "best-time-to-remodel-minnesota",
    title:
      "When Is the Best Time of Year to Remodel a Kitchen or Bath in Minnesota?",
    description:
      "Why winter is actually the best season to remodel a kitchen or bathroom in Minnesota — contractor availability, lead times, and pricing patterns across the Twin Cities.",
    keywords: [
      "best time to remodel kitchen Minnesota",
      "winter remodel Minneapolis",
      "when to start kitchen remodel MN",
    ],
    excerpt:
      "Counterintuitively, winter is often the best season to remodel a kitchen or bathroom in Minnesota. Here's why.",
    date: "2026-05-10",
    readTime: "4 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "local-guides",
    relatedSlugs: [
      "kitchen-remodel-timeline-twin-cities",
      "kitchen-remodel-cost-minneapolis",
    ],
  },
  {
    slug: "tub-to-shower-conversion-cost-minneapolis",
    title: "Tub to Shower Conversion Cost in Minneapolis (2026 Guide)",
    description:
      "What a tub-to-shower conversion actually costs in the Twin Cities. Fiberglass surrounds from $8K, mid-range tile $15K-$30K, full custom tile with frameless glass $25K-$45K+.",
    keywords: [
      "tub to shower conversion cost",
      "tub to shower conversion cost minneapolis",
      "tub to shower conversion twin cities",
      "convert tub to shower mn",
    ],
    excerpt:
      "A real-world cost breakdown for converting your tub to a shower in Minneapolis. Plumbing, tile, glass, and resale considerations.",
    date: "2026-05-28",
    readTime: "8 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "cost-guides",
    relatedSlugs: [
      "bathroom-remodel-cost-minneapolis",
      "curbless-shower-design-guide",
      "tile-shower-waterproofing-guide",
    ],
  },
  {
    slug: "curbless-shower-design-guide",
    title: "Curbless Shower Design Guide: Costs, Drainage, Waterproofing (Twin Cities 2026)",
    description:
      "A complete curbless shower guide for Minneapolis homes. Linear drains, Schluter waterproofing, glass options, costs $12K-$35K, and when not to do it.",
    keywords: [
      "curbless shower",
      "curbless shower design",
      "curbless shower minneapolis",
      "linear drain shower twin cities",
    ],
    excerpt:
      "Curbless showers have taken over Twin Cities primary baths. Drainage, waterproofing, glass, and real cost ranges.",
    date: "2026-05-28",
    readTime: "9 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "design-trends",
    relatedSlugs: [
      "walk-in-shower-no-door",
      "tile-shower-waterproofing-guide",
      "bathroom-remodel-cost-minneapolis",
    ],
  },
  {
    slug: "tile-shower-waterproofing-guide",
    title: "Tile Shower Waterproofing: Schluter, RedGard, and Why It Matters (2026)",
    description:
      "Schluter-Kerdi vs RedGard vs Wedi: how Twin Cities tile showers should actually be waterproofed in 2026. What to ask your contractor.",
    keywords: [
      "tile shower waterproofing",
      "schluter kerdi minneapolis",
      "redgard vs schluter",
      "shower waterproofing twin cities",
    ],
    excerpt:
      "Old green-board showers leak. Modern Schluter-Kerdi and liquid membranes do not. A guide to systems, costs, and how to vet a contractor.",
    date: "2026-05-28",
    readTime: "8 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "how-to",
    relatedSlugs: [
      "curbless-shower-design-guide",
      "bathroom-tile-trends-2026",
      "bathroom-remodel-cost-minneapolis",
    ],
  },
  {
    slug: "walk-in-shower-no-door",
    title: "Walk-In Shower With No Door: When It Works, When It Doesn't",
    description:
      "Doorless walk-in showers in Twin Cities primary baths. Minimum sizing, splash control, heated floor pairing, and when an enclosed shower is the better call.",
    keywords: [
      "walk in shower no door",
      "doorless walk in shower",
      "open shower design",
      "wet room twin cities",
    ],
    excerpt:
      "Doorless showers are gorgeous in the right primary bath and miserable in the wrong one. A guide to making the call.",
    date: "2026-05-28",
    readTime: "7 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "design-trends",
    relatedSlugs: [
      "curbless-shower-design-guide",
      "bathroom-remodel-cost-minneapolis",
      "bathroom-tile-trends-2026",
    ],
  },
  {
    slug: "heated-bathroom-floor-cost-minnesota",
    title: "Heated Bathroom Floor Cost in Minnesota (2026)",
    description:
      "Real heated bathroom floor costs for Twin Cities homes. Powder rooms $800-$1,500, hall baths $1,500-$3,000, primary suites $3,000-$6,000. Electric vs hydronic, smart thermostats, install process.",
    keywords: [
      "heated bathroom floor cost",
      "heated tile floor minneapolis",
      "schluter ditra heat cost",
      "in floor heat bathroom mn",
    ],
    excerpt: "What heated bathroom floors actually cost in Minnesota homes, plus electric vs hydronic and what to expect on install day.",
    date: "2026-05-28",
    readTime: "7 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "cost-guides",
    relatedSlugs: ["bathroom-remodel-cost-minneapolis", "curbless-shower-design-guide", "tile-shower-waterproofing-guide"],
  },
  {
    slug: "kitchen-island-cost-guide",
    title: "Kitchen Island Cost in Minneapolis: Adding, Resizing, or Upgrading (2026)",
    description:
      "What a kitchen island actually costs in the Twin Cities. Small add $4K-$8K, mid-range $8K-$18K, large with prep sink $18K-$40K+. Plumbing, electrical, and clearance details.",
    keywords: ["kitchen island cost", "kitchen island cost minneapolis", "add kitchen island twin cities"],
    excerpt: "A real-world cost breakdown for adding, resizing, or upgrading a kitchen island in Twin Cities homes.",
    date: "2026-05-28",
    readTime: "8 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "cost-guides",
    relatedSlugs: ["kitchen-remodel-cost-minneapolis", "quartz-vs-granite-countertops", "best-kitchen-cabinet-brands-2026"],
  },
  {
    slug: "crystal-cabinets-minnesota-review",
    title: "Crystal Cabinets Review: A Minnesota-Made Cabinet Brand Worth Knowing",
    description:
      "An honest review of Crystal Cabinet Works, a Princeton, MN cabinet manufacturer. Lines, quality markers, lead times, dealers, and where Crystal fits vs Schuler, Diamond, and KraftMaid in Twin Cities kitchens.",
    keywords: ["crystal cabinets minnesota", "crystal cabinet works review", "minnesota made cabinets", "crystal cabinets twin cities"],
    excerpt: "Crystal Cabinet Works is one of the few cabinet brands made right here in Minnesota. A contractor's honest take on lines, quality, and value.",
    date: "2026-05-28",
    readTime: "8 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: ["best-kitchen-cabinet-brands-2026", "kitchen-cabinet-brands-twin-cities", "kitchen-remodel-cost-minneapolis"],
  },
  {
    slug: "best-kitchen-cabinet-brands-2026",
    title: "Best Kitchen Cabinet Brands for Twin Cities Homes (2026 Buying Guide)",
    description:
      "An honest 2026 buying guide to the best kitchen cabinet brands for Twin Cities kitchens. Crystal, Schuler, Diamond, KraftMaid, Wellborn, Showplace, IKEA scored against a 5-marker quality rubric.",
    keywords: ["best kitchen cabinet brands", "best cabinets minneapolis", "cabinet brand comparison 2026", "kitchen cabinet brands twin cities"],
    excerpt: "A rubric-driven comparison of the kitchen cabinet brands available to Twin Cities homeowners in 2026.",
    date: "2026-05-28",
    readTime: "12 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: ["crystal-cabinets-minnesota-review", "kitchen-cabinet-brands-twin-cities", "kitchen-remodel-cost-minneapolis"],
  },
  {
    slug: "small-bathroom-layout-ideas",
    title: "Small Bathroom Layout Ideas for Minneapolis Homes (Bungalows, Ramblers, Cape Cods)",
    description:
      "Practical small bathroom layout ideas for Twin Cities homes. Five reconfigurations for 5x7, 5x8, and 6x8 bathrooms common in Minneapolis bungalows, post-war ramblers, and Saint Paul Cape Cods.",
    keywords: ["small bathroom layout", "small bathroom ideas minneapolis", "bungalow bathroom layout", "rambler bathroom remodel"],
    excerpt: "Real layout reconfigurations for the cramped hall baths common in Minneapolis bungalows and ramblers.",
    date: "2026-05-28",
    readTime: "9 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "design-trends",
    relatedSlugs: ["small-bathroom-remodel-ideas-minneapolis", "bathroom-remodel-cost-minneapolis", "tub-to-shower-conversion-cost-minneapolis"],
  },
  {
    slug: "remodel-vs-renovation",
    title: "Remodel vs Renovation: What's the Real Difference?",
    description:
      "Remodel vs renovation: renovations refresh the same layout. Remodels change layout, structure, or function. Cost, permit, and resale differences for Twin Cities kitchens and baths.",
    keywords: ["remodel vs renovation", "what is remodeling vs renovation", "renovation vs remodel cost"],
    excerpt: "A short explainer on the difference between a renovation and a remodel, with real Twin Cities examples and cost differences.",
    date: "2026-05-28",
    readTime: "6 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: ["kitchen-remodel-cost-minneapolis", "bathroom-remodel-cost-minneapolis", "30-percent-rule-remodeling"],
  },
  {
    slug: "wet-room-design-guide",
    title: "Wet Room Design Guide (Twin Cities 2026)",
    description:
      "A complete wet room design guide for Twin Cities primary baths. Drainage, Schluter waterproofing, tile, glass, heated floors, and cost ranges $25K-$70K+.",
    keywords: ["wet room design", "wet room bathroom", "wet room minneapolis", "wet room cost twin cities"],
    excerpt: "Wet rooms are the next step beyond curbless showers. A guide to drainage, waterproofing, and when they work.",
    date: "2026-05-28",
    readTime: "9 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "design-trends",
    relatedSlugs: ["curbless-shower-design-guide", "walk-in-shower-no-door", "tile-shower-waterproofing-guide"],
  },
  {
    slug: "diy-kitchen-remodel-what-to-hire-out",
    title: "DIY Kitchen Remodel: What to Do Yourself, What to Hire Out (Honest Contractor Advice)",
    description:
      "An honest contractor guide to DIY kitchen remodels. What you can do safely (paint, hardware, IKEA assembly), what looks DIY but isn't (cabinet install), and what must be hired out (gas, electrical, plumbing).",
    keywords: ["diy kitchen remodel", "diy kitchen remodel cost", "what can i diy kitchen remodel"],
    excerpt: "A realistic split of what to DIY vs what to hire a licensed pro for in a Twin Cities kitchen remodel.",
    date: "2026-05-28",
    readTime: "8 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "how-to",
    relatedSlugs: ["kitchen-remodel-cost-minneapolis", "minneapolis-kitchen-remodel-permits", "kitchen-remodel-timeline-twin-cities"],
  },
  {
    slug: "cambria-quartz-minnesota-made-guide",
    title: "Cambria Quartz: A Complete Guide to Minnesota's Hometown Countertop Brand",
    description:
      "Cambria is the Minnesota-made quartz countertop brand. A complete guide to collections, pricing, the most-installed Twin Cities designs, and why local homeowners pick Cambria.",
    keywords: ["cambria countertops review", "cambria quartz minnesota", "best cambria designs", "cambria vs silestone"],
    excerpt: "Cambria is made in Le Sueur, Minnesota. A contractor's guide to collections, designs, pricing, and why Twin Cities kitchens choose Cambria.",
    date: "2026-05-28",
    readTime: "10 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: ["quartz-vs-granite-countertops", "kitchen-remodel-cost-minneapolis", "best-kitchen-cabinet-brands-2026"],
  },
  {
    slug: "kitchen-remodel-financing-minneapolis",
    title: "Kitchen Remodel Financing in Minneapolis: 7 Real Options Compared",
    description:
      "Seven kitchen remodel financing options compared for Minneapolis homeowners: HELOC, home equity loan, cash-out refi, personal loans, FHA 203k, HomeStyle, and 0% promo cards.",
    keywords: ["kitchen remodel financing", "kitchen remodel loan minneapolis", "heloc kitchen remodel", "fha 203k twin cities"],
    excerpt: "Cash, HELOC, home equity loan, refinance, personal loan, 203k, or HomeStyle? A real-world comparison for Twin Cities kitchen remodels.",
    date: "2026-05-28",
    readTime: "9 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: ["kitchen-remodel-cost-minneapolis", "30-percent-rule-remodeling", "realistic-budget-kitchen-remodel"],
  },
  {
    slug: "realistic-budget-kitchen-remodel",
    title: "What Is a Realistic Budget for a Kitchen Remodel? (2026)",
    description:
      "A realistic kitchen remodel budget runs 5-15% of home value. Twin Cities ranges: Minneapolis $17K-$52K, Edina $30K-$92K, Wayzata $46K-$140K. Allocation breakdown and tier-by-tier scope.",
    keywords: ["realistic budget kitchen remodel", "what is a realistic budget for a kitchen remodel", "kitchen remodel budget twin cities", "is 30000 enough kitchen remodel"],
    excerpt: "What a realistic kitchen remodel budget looks like in the Twin Cities by home value tier, plus the allocation breakdown by category.",
    date: "2026-05-28",
    readTime: "8 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: ["kitchen-remodel-cost-minneapolis", "30-percent-rule-remodeling", "kitchen-remodel-financing-minneapolis"],
  },
  {
    slug: "30-percent-rule-remodeling",
    title: "The 30% Rule in Remodeling: What It Actually Means",
    description:
      "The 30% rule says don't spend more than 30% of your home's value on a single remodel. How it applies to Twin Cities kitchens and baths, with concrete numbers.",
    keywords: [
      "30 percent rule remodeling",
      "what is the 30 percent rule remodeling",
      "remodeling budget rule of thumb",
      "kitchen remodel budget rule",
    ],
    excerpt:
      "A simple budget heuristic that keeps remodels from torpedoing resale. How the 30% rule plays out in Minneapolis, Edina, and Wayzata homes.",
    date: "2026-05-28",
    readTime: "6 min read",
    author: "Minneapolis Kitchen & Bath team",
    category: "buying-guides",
    relatedSlugs: [
      "kitchen-remodel-cost-minneapolis",
      "bathroom-remodel-cost-minneapolis",
      "kitchen-remodel-roi-minneapolis",
    ],
  },
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((p) => [p.slug, p])
);
