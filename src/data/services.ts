export type Service = {
  slug: string;
  name: string;
  shortName: string;
  // For URL: /[urlSegment]/[city]
  urlSegment: string; // e.g. "kitchen-remodeling"
  metaTitleTemplate: (city: string) => string;
  metaDescriptionTemplate: (city: string) => string;
  h1Template: (city: string) => string;
  tagline: string;
  hero: string;
  description: string;
  whatsIncluded: string[];
  process: { step: string; detail: string }[];
  priceRange: { tier: string; range: string; description: string }[];
  faqs: { question: string; answer: string }[];
  cityIntroTemplate: (city: string, localAngle: string) => string;
  relatedServiceSlugs: string[];
  // For local commercial intent pages
  isCityPageEnabled: boolean;
  icon: string;
};

export const services: Service[] = [
  {
    slug: "kitchen-remodeling",
    urlSegment: "kitchen-remodeling",
    name: "Kitchen Remodeling",
    shortName: "Kitchen Remodel",
    icon: "🍳",
    tagline: "Custom kitchen renovations for Twin Cities homes",
    hero: "From cosmetic refreshes to full gut renovations — built right, on schedule.",
    description:
      "Full-service kitchen remodeling for homeowners across the Minneapolis–Saint Paul metro. We handle layout planning, demo, plumbing rough-in, electrical, drywall, cabinets, counters, backsplash, flooring, and appliance installation under one contract.",
    metaTitleTemplate: (city) =>
      `Kitchen Remodeling in ${city}, MN | Licensed Contractors`,
    metaDescriptionTemplate: (city) =>
      `Trusted kitchen remodeling contractors serving ${city}, Minnesota. Custom design, transparent pricing, licensed & insured. Free quotes. See real ${city} project costs.`,
    h1Template: (city) => `Kitchen Remodeling in ${city}, MN`,
    whatsIncluded: [
      "In-home consultation and design",
      "Detailed scope and fixed-price quote",
      "Permit pulling and city inspections",
      "Demo and disposal",
      "Plumbing and electrical rough-in",
      "Custom or semi-custom cabinetry",
      "Countertop fabrication and installation",
      "Tile backsplash",
      "Hardwood, LVP, or tile flooring",
      "Appliance installation and gas hookups",
      "Final punch list and walk-through",
    ],
    process: [
      { step: "Free consultation", detail: "30–60 minutes in your home. We measure, listen, and identify your must-haves vs. nice-to-haves." },
      { step: "Design + quote", detail: "Within 5–10 business days you receive design concepts, finish samples, and a detailed, itemized fixed-price quote." },
      { step: "Contract + scheduling", detail: "Signed contract, materials ordered, project start date locked in. Most kitchens have a 4–10 week material lead time depending on cabinets." },
      { step: "Construction", detail: "Daily on-site project manager. Demo through final install typically takes 4–10 weeks once materials arrive. Daily clean-up. Weekly status updates." },
      { step: "Final walk-through", detail: "We walk the kitchen with you, address every punch-list item, and provide care instructions and warranty paperwork." },
    ],
    priceRange: [
      { tier: "Budget refresh", range: "$15,000–$30,000", description: "Cabinet refacing or painting, new countertops, updated hardware and fixtures, no layout changes." },
      { tier: "Mid-range remodel", range: "$35,000–$75,000", description: "Semi-custom cabinets, quartz counters, tile backsplash, new appliances, minor layout adjustments." },
      { tier: "High-end custom", range: "$80,000–$150,000+", description: "Custom cabinetry, premium appliances (Wolf, Sub-Zero), structural changes, custom tile, designer fixtures." },
    ],
    faqs: [
      {
        question: "How long does a kitchen remodel take?",
        answer:
          "Most kitchen remodels take 6–12 weeks of on-site work, plus 4–10 weeks of design and material lead time. Full custom cabinetry can push the timeline to 14–16 weeks total. We hand you a calendar with milestones at contract signing.",
      },
      {
        question: "Can I live in my home during a kitchen remodel?",
        answer:
          "Yes — most clients do. We seal the work area with plastic, set up a temporary kitchen (microwave, fridge, induction burner) in another room, and clean up daily. If you're doing a full gut with structural changes, expect 2–4 weeks where the space is unusable.",
      },
      {
        question: "Do I need permits?",
        answer:
          "Almost certainly. Any kitchen work involving plumbing relocation, new electrical circuits, structural changes (wall removal), or projects over $1,000–$5,000 (varies by city) requires a permit. We pull all permits and manage inspections.",
      },
      {
        question: "Will you work with my designer or architect?",
        answer:
          "Absolutely. We collaborate regularly with kitchen designers, interior designers, and architects. We can also handle full design in-house if you don't already have a designer.",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `We've completed kitchen remodels for ${city} homeowners across every tier — from budget refreshes to high-end custom builds. ${localAngle}`,
    relatedServiceSlugs: ["bathroom-remodeling", "custom-cabinetry", "countertops"],
    isCityPageEnabled: true,
  },
  {
    slug: "bathroom-remodeling",
    urlSegment: "bathroom-remodeling",
    name: "Bathroom Remodeling",
    shortName: "Bathroom Remodel",
    icon: "🛁",
    tagline: "Beautiful, functional bathrooms for Twin Cities homes",
    hero: "Powder rooms, family baths, primary suites — we remodel them all.",
    description:
      "Full bathroom remodels for homes throughout the Minneapolis metro. We specialize in tile showers, freestanding tubs, double vanities, and layout reconfigurations that turn cramped bathrooms into functional spaces.",
    metaTitleTemplate: (city) =>
      `Bathroom Remodeling in ${city}, MN | Licensed Contractors`,
    metaDescriptionTemplate: (city) =>
      `Bathroom remodeling contractors serving ${city}, MN. Tile showers, vanities, freestanding tubs, full reconfigurations. Licensed & insured. Free in-home quotes.`,
    h1Template: (city) => `Bathroom Remodeling in ${city}, MN`,
    whatsIncluded: [
      "In-home consultation and 3D design",
      "Permit pulling and inspections",
      "Demo and disposal",
      "Plumbing and electrical updates",
      "Custom tile shower or tub surround",
      "Vanity, mirror, and lighting install",
      "Fixture and faucet installation",
      "Heated floor systems (optional)",
      "Tile, LVP, or stone flooring",
      "Final punch list and warranty",
    ],
    process: [
      { step: "Free consultation", detail: "We measure the space, discuss layout options, and walk through inspirations." },
      { step: "Design + quote", detail: "3D renderings, finish samples, and a detailed fixed-price quote within 5–10 business days." },
      { step: "Contract + scheduling", detail: "Materials ordered, start date locked. Most bathrooms have 2–4 weeks material lead time." },
      { step: "Construction", detail: "Bathroom remodels typically take 3–6 weeks on-site. Daily clean-up, plastic isolation, weekly progress updates." },
      { step: "Final walk-through", detail: "Punch list, warranty paperwork, fixture and tile care instructions." },
    ],
    priceRange: [
      { tier: "Powder room / half bath", range: "$8,000–$18,000", description: "New vanity, toilet, fixtures, flooring, lighting. No tile shower." },
      { tier: "Full hall bath", range: "$18,000–$45,000", description: "Tub-to-shower conversion or new tile surround, vanity, toilet, fixtures, tile floor, lighting." },
      { tier: "Primary suite bathroom", range: "$45,000–$100,000+", description: "Custom tile shower, freestanding tub, double vanity, separate WC, premium fixtures, heated floors." },
    ],
    faqs: [
      {
        question: "How long does a bathroom remodel take?",
        answer:
          "Powder rooms take 1–2 weeks. Hall bathrooms take 3–4 weeks. Primary suite bathrooms with custom tile work take 4–6 weeks of on-site work. Add 2–4 weeks of material lead time before construction starts.",
      },
      {
        question: "What does a bathroom remodel actually cost in Minneapolis?",
        answer:
          "In the Twin Cities metro in 2026, expect $8,000–$18,000 for a powder room refresh, $18,000–$45,000 for a full hall bathroom, and $45,000–$100,000+ for a primary suite bathroom with custom tile and premium fixtures.",
      },
      {
        question: "Can you convert my tub to a walk-in shower?",
        answer:
          "Yes — tub-to-shower conversions are one of our most common bathroom projects in the Twin Cities. Expect $8,000–$15,000 for a basic tub-to-shower swap with a fiberglass surround, $15,000–$30,000+ for a fully tiled walk-in shower with niche, bench, and frameless glass.",
      },
      {
        question: "Will you waterproof the shower properly?",
        answer:
          "Every tile shower we build uses a proper waterproofing system — either Schluter-Kerdi or RedGard liquid membrane — over cement board or foam panels. We don't use the green drywall and mortar method (which is how most leaky showers were built before 2010).",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `Bathroom remodels for ${city} homeowners — from cramped 1950s hall baths to luxury primary suites. ${localAngle}`,
    relatedServiceSlugs: ["kitchen-remodeling", "tile-flooring", "custom-cabinetry"],
    isCityPageEnabled: true,
  },
  {
    slug: "custom-cabinetry",
    urlSegment: "custom-cabinetry",
    name: "Custom Cabinetry",
    shortName: "Cabinetry",
    icon: "🪵",
    tagline: "Built-to-order cabinetry for any room in your home",
    hero: "Maximize every inch with cabinetry built specifically for your space.",
    description:
      "We design and install custom and semi-custom cabinetry for kitchens, bathrooms, mudrooms, laundry rooms, home offices, and built-ins. Painted, stained, and natural finishes available.",
    metaTitleTemplate: (city) =>
      `Custom Cabinetry in ${city}, MN | Kitchen & Built-In Cabinets`,
    metaDescriptionTemplate: (city) =>
      `Custom and semi-custom cabinetry for ${city}, MN homes. Kitchen, bathroom, mudroom, and built-in cabinets. Painted and stained finishes. Free design consultation.`,
    h1Template: (city) => `Custom Cabinetry in ${city}, MN`,
    whatsIncluded: [
      "In-home measurements and design",
      "CAD layout and 3D renderings",
      "Cabinet box construction (plywood standard)",
      "Door style, paint or stain finish selection",
      "Soft-close hardware on all doors and drawers",
      "Pull-out shelves, drawer organizers, lazy susans",
      "Installation and final adjustments",
    ],
    process: [
      { step: "Design consultation", detail: "We measure the space and walk through door styles, finishes, hardware, and storage features." },
      { step: "CAD + 3D renderings", detail: "Detailed shop drawings and 3D renderings so you can see exactly what you're getting before fabrication." },
      { step: "Fabrication", detail: "Custom cabinets take 6–10 weeks to build. Semi-custom takes 4–6 weeks. We order on contract signing." },
      { step: "Installation", detail: "1–3 days of installation for a typical kitchen. Soft-close, level, plumb, and beautifully finished." },
    ],
    priceRange: [
      { tier: "Semi-custom (Schuler, Diamond)", range: "$8,000–$25,000", description: "Pre-set door styles and finishes, made-to-order sizing. Best value for most kitchens." },
      { tier: "Full custom (local cabinetmakers)", range: "$25,000–$60,000+", description: "Any size, finish, door style, or species. Inset doors available. Best for high-end projects." },
      { tier: "Built-ins (bookshelves, mudroom, office)", range: "$3,000–$15,000", description: "Single-room built-ins like fireplace surrounds, office walls, mudroom lockers." },
    ],
    faqs: [
      {
        question: "What's the difference between semi-custom and full custom cabinets?",
        answer:
          "Semi-custom cabinets are made-to-order in standard sizes (typically 3-inch increments) with a set selection of door styles, finishes, and species. Full custom cabinets are built to any dimension in any door style, species, and finish — including inset doors and unusual heights or depths.",
      },
      {
        question: "How long do custom cabinets take to make?",
        answer:
          "Semi-custom cabinets take 4–6 weeks from order. Full custom takes 6–10 weeks. Plan to order cabinets immediately on contract signing — they're almost always the longest lead-time item in a remodel.",
      },
      {
        question: "Should I paint or stain my cabinets?",
        answer:
          "Painted cabinets (especially white and off-white) are the most popular choice in the Twin Cities right now and pair well with quartz. Stained cabinets (walnut, white oak) are coming back strong for warmer kitchens. Both perform equally well — pick what fits your style.",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `Custom and semi-custom cabinetry for ${city} kitchens, bathrooms, mudrooms, and built-ins. ${localAngle}`,
    relatedServiceSlugs: ["kitchen-remodeling", "countertops"],
    isCityPageEnabled: true,
  },
  {
    slug: "countertops",
    urlSegment: "countertops",
    name: "Countertops",
    shortName: "Countertops",
    icon: "✨",
    tagline: "Quartz, granite, marble, and more — sourced and installed",
    hero: "Premium countertop materials, expertly templated and installed.",
    description:
      "We source and install quartz, granite, marble, quartzite, and butcher block countertops for kitchens, bathrooms, and laundry rooms. Includes templating, fabrication, edge profiles, and seam sealing.",
    metaTitleTemplate: (city) =>
      `Countertop Installation in ${city}, MN | Quartz, Granite, Marble`,
    metaDescriptionTemplate: (city) =>
      `Premium countertops for ${city}, MN homes. Quartz, granite, marble, quartzite, butcher block. Expert templating and installation. Free in-home quotes.`,
    h1Template: (city) => `Countertop Installation in ${city}, MN`,
    whatsIncluded: [
      "Slab selection at our fabricator partners",
      "Digital templating",
      "Custom fabrication and edge profile",
      "Sink and faucet cutouts",
      "Installation and seam joining",
      "Sealing (for natural stone)",
    ],
    process: [
      { step: "Slab selection", detail: "Visit a fabricator showroom to pick the exact slab. We schedule and accompany you." },
      { step: "Templating", detail: "Digital templating happens after cabinets are installed. Takes 1–2 hours." },
      { step: "Fabrication", detail: "10–14 days from template to install for most materials." },
      { step: "Installation", detail: "Half-day install for a typical kitchen. Seam location chosen for minimum visibility." },
    ],
    priceRange: [
      { tier: "Quartz", range: "$55–$95/sq ft installed", description: "Cambria, Silestone, MSI. Engineered, low-maintenance, the most popular choice." },
      { tier: "Granite", range: "$45–$85/sq ft installed", description: "Natural stone, unique patterns, very durable." },
      { tier: "Quartzite", range: "$80–$140/sq ft installed", description: "Natural stone that mimics marble's look but is much more durable." },
      { tier: "Marble", range: "$75–$150/sq ft installed", description: "Stunning but soft — best for low-use surfaces (baths, bars, hutches)." },
      { tier: "Butcher block", range: "$30–$60/sq ft installed", description: "Warm and traditional. Requires occasional oiling." },
    ],
    faqs: [
      {
        question: "Should I choose quartz or granite?",
        answer:
          "Quartz is the more popular choice for most Minneapolis kitchens — it's engineered, non-porous, doesn't need sealing, and offers consistent patterns. Granite is the better choice if you want a one-of-a-kind natural stone look and don't mind annual sealing. Both are extremely durable.",
      },
      {
        question: "How much do countertops cost for a typical Minneapolis kitchen?",
        answer:
          "A typical Twin Cities kitchen has 30–45 sq ft of countertops. Expect $2,000–$4,000 for quartz, $1,500–$3,500 for granite, $2,500–$5,500 for quartzite, and $1,000–$2,500 for butcher block — all installed.",
      },
      {
        question: "Is Cambria worth the price premium?",
        answer:
          "Cambria is Minnesota-made (Le Sueur, MN) and often priced competitively in the Twin Cities — sometimes cheaper than imported quartz brands. The quality is excellent, the warranty is strong, and supporting a local manufacturer is a real plus. We install Cambria regularly.",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `Countertop sourcing and installation for ${city} kitchens and baths. ${localAngle}`,
    relatedServiceSlugs: ["kitchen-remodeling", "custom-cabinetry"],
    isCityPageEnabled: true,
  },
  {
    slug: "tile-flooring",
    urlSegment: "tile-flooring",
    name: "Tile & Flooring",
    shortName: "Tile & Floors",
    icon: "🟦",
    tagline: "Expert tile setting and flooring installation",
    hero: "Floors, showers, backsplashes — waterproofed and built to last.",
    description:
      "Tile setting and flooring installation for kitchens, bathrooms, mudrooms, and entryways. We install tile, hardwood, LVP, and heated floor systems. Every wet area gets a real waterproofing system.",
    metaTitleTemplate: (city) =>
      `Tile & Flooring Installation in ${city}, MN`,
    metaDescriptionTemplate: (city) =>
      `Professional tile and flooring installation for ${city}, MN. Showers, backsplashes, floors, heated floor systems. Schluter-certified installers. Free quotes.`,
    h1Template: (city) => `Tile & Flooring in ${city}, MN`,
    whatsIncluded: [
      "Subfloor prep and leveling",
      "Schluter waterproofing for showers",
      "Tile, hardwood, or LVP installation",
      "Heated floor systems",
      "Grouting and sealing",
      "Transition pieces and finish trim",
    ],
    process: [
      { step: "Material selection", detail: "We help you choose tile or flooring that fits your style and budget." },
      { step: "Subfloor prep", detail: "We level, repair, and prep the subfloor before any tile or flooring is installed." },
      { step: "Installation", detail: "Tile floors: 2–4 days. Showers: 3–5 days. Hardwood/LVP: 1–3 days. Heated floors add 1 day." },
      { step: "Grout and seal", detail: "Grouting on day 2, sealing on day 3 for natural stone." },
    ],
    priceRange: [
      { tier: "Tile floor (labor)", range: "$12–$20/sq ft", description: "Standard porcelain or ceramic floor tile installation." },
      { tier: "Backsplash (labor)", range: "$15–$30/sq ft", description: "Subway, mosaic, or large-format backsplash." },
      { tier: "Tile shower (labor + waterproofing)", range: "$4,000–$10,000", description: "Full Schluter waterproofing, niches, benches, full tile install." },
      { tier: "Hardwood install (labor)", range: "$4–$8/sq ft", description: "Nail-down or glue-down hardwood." },
      { tier: "LVP install (labor)", range: "$2–$5/sq ft", description: "Click-lock luxury vinyl plank." },
      { tier: "Heated floor (system + install)", range: "$10–$20/sq ft", description: "Electric in-floor heat with smart thermostat." },
    ],
    faqs: [
      {
        question: "Do you waterproof showers properly?",
        answer:
          "Yes — every tile shower we install uses a real waterproofing system. Our standard is Schluter-Kerdi (a sheet membrane over foam or cement board). For shower pans we use Schluter-Kerdi shower trays. We do not use the old green-board-and-mortar method, which is the primary cause of leaking showers in homes built before 2010.",
      },
      {
        question: "Is heated floor worth it?",
        answer:
          "For bathrooms — absolutely. The marginal cost is $800–$2,000 added to a tile floor install, and you'll appreciate it every cold Minnesota morning. For kitchens it's nice-to-have but less impactful since you usually wear shoes there.",
      },
      {
        question: "Hardwood or LVP in a Minnesota home?",
        answer:
          "Hardwood is still our recommendation for living spaces in Twin Cities homes — it adds resale value and looks great. LVP makes sense for basements (moisture resistance), mudrooms (durability), and laundry rooms. We don't recommend laminate anymore — LVP performs better at a similar price.",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `Tile setting and flooring installation for ${city} homes. ${localAngle}`,
    relatedServiceSlugs: ["bathroom-remodeling", "kitchen-remodeling"],
    isCityPageEnabled: false,
  },
  {
    slug: "full-gut",
    urlSegment: "full-gut-renovations",
    name: "Full Gut Renovations",
    shortName: "Full Gut",
    icon: "🏗️",
    tagline: "Single-contract full-home renovations",
    hero: "When you're starting from scratch — we manage every trade under one roof.",
    description:
      "Full gut renovations of kitchens, bathrooms, and multi-room projects. Single contract, single project manager, all trades coordinated. Includes demo, structural work, MEP rough-in, drywall, and full finish.",
    metaTitleTemplate: (city) =>
      `Full Gut Renovation Contractors in ${city}, MN`,
    metaDescriptionTemplate: (city) =>
      `Full-home gut renovations in ${city}, MN. Single-contract project management for demo, structural, MEP, and finish work. Licensed general contractor.`,
    h1Template: (city) => `Full Gut Renovations in ${city}, MN`,
    whatsIncluded: [
      "Demolition and disposal",
      "Structural changes (wall removal, beams)",
      "Plumbing rough-in and finish",
      "Electrical rough-in and finish",
      "HVAC adjustments",
      "Drywall, insulation, paint",
      "Cabinets, counters, tile",
      "Trim, doors, finish hardware",
      "Permits and inspections under one number",
    ],
    process: [
      { step: "Discovery", detail: "We walk the project, identify scope, and discuss must-haves." },
      { step: "Design + scope", detail: "Detailed scope of work, drawings, finish selections, fixed-price quote." },
      { step: "Pre-construction", detail: "Permits pulled, materials ordered, trades scheduled, start date set." },
      { step: "Construction", detail: "Single on-site project manager coordinates all trades. Weekly status meetings." },
      { step: "Close-out", detail: "Final inspections, punch list, warranty paperwork, care instructions." },
    ],
    priceRange: [
      { tier: "Kitchen + bath gut", range: "$80,000–$200,000", description: "Two-room gut with structural changes." },
      { tier: "First-floor gut", range: "$150,000–$400,000+", description: "Kitchen, baths, living spaces — open concept conversion." },
      { tier: "Whole-home gut", range: "$300,000–$800,000+", description: "Top-to-bottom interior renovation." },
    ],
    faqs: [
      {
        question: "Do I need an architect for a gut renovation?",
        answer:
          "If you're removing structural walls or significantly changing layouts, yes — you'll need engineered plans for the permit. We work with several local architects and can recommend one, or work with your existing architect. For straightforward gut renovations without structural changes, a designer is usually sufficient.",
      },
      {
        question: "How long does a full gut take?",
        answer:
          "A two-room (kitchen + bath) gut typically runs 12–16 weeks of on-site work. A first-floor gut with open-concept conversion is usually 16–24 weeks. Whole-home gut renovations are 6–12 months depending on scope.",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `Full gut renovations for ${city} homes — single contract, single project manager, all trades coordinated. ${localAngle}`,
    relatedServiceSlugs: ["kitchen-remodeling", "bathroom-remodeling"],
    isCityPageEnabled: false,
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
export const serviceByUrlSegment = Object.fromEntries(services.map((s) => [s.urlSegment, s]));
