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
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((p) => [p.slug, p])
);
