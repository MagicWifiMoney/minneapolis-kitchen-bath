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
  {
    slug: "general-contractor",
    urlSegment: "general-contractor",
    name: "General Contractor",
    shortName: "General Contractor",
    icon: "🔨",
    tagline: "Licensed general contractor for Twin Cities home projects",
    hero: "One contract, one project manager, every trade coordinated.",
    description:
      "Licensed general contractor services for Twin Cities homeowners. We pull permits, schedule trades, manage budgets, and handle inspections under a single fixed-price contract. Kitchens, baths, basements, additions, and whole-house remodels.",
    metaTitleTemplate: (city) =>
      `General Contractor in ${city}, MN | Licensed & Insured`,
    metaDescriptionTemplate: (city) =>
      `Licensed general contractor serving ${city}, Minnesota. Kitchens, baths, basements, additions. Permits pulled, trades managed, fixed-price quotes. Free in-home consultation.`,
    h1Template: (city) => `General Contractor in ${city}, MN`,
    whatsIncluded: [
      "Licensed Minnesota general contractor (MN-BC# on file)",
      "Permit pulling and city inspections under one contract",
      "Trade coordination: plumbing, electrical, HVAC, framing, drywall, tile, paint",
      "Fixed-price quotes (no time-and-materials surprises)",
      "Single point of contact through entire project",
      "Daily on-site project manager",
      "Insurance coverage: general liability and workers comp",
      "Lien waivers and final close-out paperwork",
    ],
    process: [
      { step: "Discovery call", detail: "We walk the project, talk through scope, and set expectations on budget and timeline." },
      { step: "Scope of work + quote", detail: "Detailed written scope, line-item budget, and fixed-price quote within 5-10 business days." },
      { step: "Contract + permits", detail: "Signed contract, permits pulled, trades scheduled, material orders placed." },
      { step: "Construction", detail: "Daily on-site PM, weekly status meetings, end-of-week clean-up and progress photos." },
      { step: "Final inspections + close-out", detail: "Punch list, final inspections, warranty paperwork, care instructions." },
    ],
    priceRange: [
      { tier: "Small projects", range: "$15,000-$60,000", description: "Single-room remodels, basement finishes, smaller additions." },
      { tier: "Mid-range", range: "$60,000-$200,000", description: "Multi-room remodels, kitchens, primary baths, larger basements." },
      { tier: "Major projects", range: "$200,000-$800,000+", description: "Whole-home remodels, large additions, structural reconfigurations." },
    ],
    faqs: [
      {
        question: "What does a general contractor actually do?",
        answer:
          "A licensed general contractor coordinates everything on a construction project under one contract: pulling permits, hiring and scheduling trades, ordering materials, managing budget and timeline, handling inspections, and warrantying the finished work. You get one phone number and one fixed-price quote instead of juggling separate plumbers, electricians, and carpenters.",
      },
      {
        question: "Do I need a general contractor for a kitchen or bath remodel?",
        answer:
          "For most kitchen and bath remodels in the Twin Cities, yes. If the project involves plumbing relocation, electrical work, permits, or more than one trade, a licensed GC keeps the project on schedule and on budget. Smaller cosmetic projects (paint, hardware swaps) can be DIY or single-trade.",
      },
      {
        question: "What is the markup on a general contractor?",
        answer:
          "Most reputable Twin Cities general contractors run a 15-25% overhead and profit margin on top of direct cost (labor, materials, sub trades). That covers project management, insurance, warranty, and permits. Lower than that usually means corners are being cut somewhere.",
      },
      {
        question: "How is a general contractor different from a handyman?",
        answer:
          "A licensed general contractor carries a state license, general liability and workers comp insurance, can pull permits, and is legally responsible for the work of every sub trade on the project. A handyman is suitable for small repairs but cannot pull permits in Minneapolis or Saint Paul for plumbing, electrical, or structural work.",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `Licensed general contractor for ${city} homeowners. Kitchens, baths, basements, and whole-house remodels under one contract. ${localAngle}`,
    relatedServiceSlugs: ["kitchen-remodeling", "bathroom-remodeling", "full-gut"],
    isCityPageEnabled: true,
  },
  {
    slug: "schluter-certified-shower-installer",
    urlSegment: "schluter-certified-shower-installer",
    name: "Schluter-Certified Shower Installation",
    shortName: "Schluter Showers",
    icon: "🚿",
    tagline: "Schluter-Kerdi waterproofing on every tile shower",
    hero: "The waterproofing system that does not leak. On every shower we build.",
    description:
      "We are a Schluter-trained shower installer serving the Twin Cities. Every tile shower we build uses a Schluter-Kerdi sheet membrane system over foam or cement board, with bonded Kerdi-Drain assemblies. No exceptions, no shortcuts, no green-board-and-mortar.",
    metaTitleTemplate: (city) =>
      `Schluter Certified Shower Installer in ${city}, MN`,
    metaDescriptionTemplate: (city) =>
      `Schluter-Kerdi tile shower installation in ${city}, MN. Sheet membrane waterproofing, Kerdi-Drain assemblies, custom tile, niches, benches, frameless glass.`,
    h1Template: (city) => `Schluter Certified Shower Installer in ${city}, MN`,
    whatsIncluded: [
      "Schluter-Kerdi sheet membrane waterproofing on every wall",
      "Kerdi-Drain bonded drain assembly",
      "Kerdi-Board foam panels or Hardi cement board substrate",
      "Custom tile shower walls and floor",
      "Recessed niches with Kerdi-Board pre-fab niches",
      "Benches, curbs, and curbless thresholds",
      "Frameless glass or fixed-panel enclosures",
      "Heated tile floor option",
      "Lifetime workmanship warranty on waterproofing",
    ],
    process: [
      { step: "Consultation + tile selection", detail: "We measure the shower, walk through tile and glass options, and finalize layout." },
      { step: "Demo + substrate", detail: "Remove existing shower down to studs. Install Kerdi-Board or cement board with all seams and corners detailed." },
      { step: "Waterproofing", detail: "Apply Kerdi membrane to every wall and the floor, lap into the Kerdi-Drain assembly. Test pan with a 24-hour flood test before tile." },
      { step: "Tile + grout", detail: "Set tile, grout, seal natural stone if applicable. Install glass and trim." },
      { step: "Final walk-through", detail: "Care instructions, warranty paperwork, and final inspection." },
    ],
    priceRange: [
      { tier: "Basic Schluter shower", range: "$6,000-$12,000", description: "Subway tile or basic porcelain, standard 3x5 footprint, no niche." },
      { tier: "Mid-range custom tile", range: "$12,000-$25,000", description: "Larger format tile, niche, bench, curbless conversion." },
      { tier: "High-end custom", range: "$25,000-$50,000+", description: "Designer tile, fully tiled wet-room, frameless glass, heated floor, multiple niches." },
    ],
    faqs: [
      {
        question: "What is Schluter and why does it matter?",
        answer:
          "Schluter Systems makes a sheet-membrane waterproofing system (Kerdi) that is bonded directly behind tile. It is the gold-standard residential shower waterproofing method in 2026. Done correctly, a Schluter shower is essentially waterproof for the life of the tile. Most Twin Cities shower leaks we tear out were built with the old mortar-bed-and-pan method, which fails after 10-20 years.",
      },
      {
        question: "How is Schluter different from RedGard?",
        answer:
          "RedGard is a paint-on liquid waterproofing membrane. It works when applied correctly, but installer technique matters: too thin and it fails. Schluter-Kerdi is a sheet membrane glued to the substrate. It is harder to install wrong because thickness is uniform. Both are accepted by the Tile Council of North America. We prefer Kerdi for consistency.",
      },
      {
        question: "Can you do curbless showers with Schluter?",
        answer:
          "Yes. Schluter makes pre-pitched curbless shower trays (Kerdi-Shower-LT) and linear drain assemblies (Kerdi-Line) specifically for curbless construction. Every curbless shower we install in the Twin Cities uses this system.",
      },
      {
        question: "How much does a Schluter shower cost compared to a regular tile shower?",
        answer:
          "The waterproofing system itself adds $800-$2,500 to a tile shower install compared to standard cement-board-and-liquid. The labor difference is minimal. The total cost is dominated by tile choice and shower size, not the waterproofing system.",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `Schluter-Kerdi tile shower installation for ${city} bathrooms. Every shower waterproofed to the highest residential standard available. ${localAngle}`,
    relatedServiceSlugs: ["bathroom-remodeling", "tile-flooring"],
    isCityPageEnabled: true,
  },
  {
    slug: "basement-remodeling",
    urlSegment: "basement-remodeling",
    name: "Basement Remodeling",
    shortName: "Basement Remodel",
    icon: "🏚️",
    tagline: "Finished basements, basement bathrooms, in-law suites",
    hero: "Convert unfinished or dated basements into livable square footage.",
    description:
      "Full basement remodeling for Twin Cities homes. Basement bathroom adds, egress windows, in-law suites, home theaters, kids&apos; play spaces, and wet bars. We handle waterproofing, framing, electrical, plumbing, HVAC adjustments, and finish carpentry under one contract.",
    metaTitleTemplate: (city) =>
      `Basement Remodeling in ${city}, MN | Finished Basements & Basement Baths`,
    metaDescriptionTemplate: (city) =>
      `Basement remodeling contractors serving ${city}, Minnesota. Finished basements, basement bathrooms, in-law suites, egress windows. Licensed & insured. Free in-home quotes.`,
    h1Template: (city) => `Basement Remodeling in ${city}, MN`,
    whatsIncluded: [
      "Moisture and drainage assessment before framing",
      "Egress window installation when adding bedrooms",
      "Framing, insulation, drywall, paint",
      "Electrical and lighting design",
      "Basement bathroom rough-in and finish",
      "HVAC supply and return adjustments",
      "Flooring (LVP standard, carpet, or tile)",
      "Wet bar, fireplace, theater room build-out as needed",
      "Permits and inspections",
    ],
    process: [
      { step: "Discovery + moisture check", detail: "We walk the basement, check for moisture history, evaluate ceiling height and structural elements." },
      { step: "Design + scope", detail: "Layout drawings, electrical plan, finish selections, fixed-price quote within 7-10 business days." },
      { step: "Pre-construction", detail: "Permits pulled, materials ordered, egress window scheduled if needed." },
      { step: "Construction", detail: "Framing through finish typically runs 6-12 weeks depending on scope." },
      { step: "Close-out", detail: "Final inspections, punch list, warranty paperwork." },
    ],
    priceRange: [
      { tier: "Basic finish", range: "$35,000-$75,000", description: "Open rec room, paint, LVP flooring, recessed lighting, no bathroom." },
      { tier: "Mid-range w/ bath", range: "$75,000-$150,000", description: "Finish + full basement bathroom + bedroom w/ egress." },
      { tier: "High-end / in-law suite", range: "$150,000-$300,000+", description: "Full suite, kitchenette, full bath, wet bar, theater, premium finishes." },
    ],
    faqs: [
      {
        question: "Do I need an egress window to add a basement bedroom?",
        answer:
          "Yes. Minnesota residential code requires an egress window in every basement sleeping room. Egress windows in the Twin Cities typically run $4,000-$8,000 installed depending on whether the existing window opening can be enlarged or a new opening needs to be cut.",
      },
      {
        question: "Should I waterproof before finishing my basement?",
        answer:
          "If you have ANY history of water intrusion (efflorescence on the walls, damp spots, sump pump cycling frequently), yes. Address the source first: regrade exterior, extend downspouts, repair foundation cracks, install interior drain tile if needed. Finishing over an active moisture problem destroys the finish within 2-5 years.",
      },
      {
        question: "What ceiling height do I need to finish a basement?",
        answer:
          "Minnesota code requires a minimum 7-foot finished ceiling height in habitable rooms. Some Twin Cities pre-war homes have basements with only 6&apos;6&quot; to 7&apos; of clearance, which means lowering the slab or accepting non-habitable status (storage only).",
      },
      {
        question: "How long does a basement remodel take?",
        answer:
          "Basic finish jobs run 6-10 weeks. Adding a basement bathroom adds 2-4 weeks. Full in-law suites with kitchenettes can run 14-20 weeks. Material lead times on cabinets and flooring add to the total.",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `Basement remodeling for ${city} homes. Finished basements, basement baths, in-law suites, and egress installations. ${localAngle}`,
    relatedServiceSlugs: ["bathroom-remodeling", "general-contractor", "full-gut"],
    isCityPageEnabled: false,
  },
  {
    slug: "whole-house-remodel",
    urlSegment: "whole-house-remodel",
    name: "Whole-House Remodel",
    shortName: "Whole-House Remodel",
    icon: "🏡",
    tagline: "Multi-room and full-home remodels under one contract",
    hero: "When two rooms is not enough. Single-contract whole-house renovation.",
    description:
      "Whole-house remodels for Twin Cities homes. Multi-room kitchen + bath + living combinations, open-concept conversions, second-story additions, and historic-home modernizations. Single project manager, single fixed-price contract, every trade coordinated.",
    metaTitleTemplate: (city) =>
      `Whole-House Remodel Contractors in ${city}, MN`,
    metaDescriptionTemplate: (city) =>
      `Whole-house remodel contractors serving ${city}, Minnesota. Multi-room renovations, open-concept conversions, second-story additions. Licensed general contractor.`,
    h1Template: (city) => `Whole-House Remodel in ${city}, MN`,
    whatsIncluded: [
      "Multi-room scope: kitchens, baths, living spaces, basements",
      "Open-concept wall removal with structural engineering",
      "Second-story additions or pop-tops",
      "MEP rough-in (plumbing, electrical, HVAC)",
      "Drywall, insulation, paint throughout",
      "Trim, doors, finish carpentry across the home",
      "Permits and inspections under one contract",
      "Single project manager from start to finish",
      "Coordination with structural engineers and architects as needed",
    ],
    process: [
      { step: "Discovery", detail: "Full walk-through, scope identification, structural feasibility check." },
      { step: "Design + scope", detail: "Design drawings, engineering review for structural changes, finish selections, fixed-price quote." },
      { step: "Pre-construction", detail: "Permits pulled, materials ordered, sub trades scheduled, demo plan set." },
      { step: "Construction", detail: "Single on-site project manager, weekly status meetings, daily clean-up, sequenced trade scheduling." },
      { step: "Close-out", detail: "Final inspections, full punch list, warranty paperwork, care instructions." },
    ],
    priceRange: [
      { tier: "Two-room scope", range: "$80,000-$200,000", description: "Kitchen + primary bath, or kitchen + basement, or similar two-room scope." },
      { tier: "First-floor conversion", range: "$150,000-$400,000+", description: "Open-concept conversion, kitchen + dining + living, plus structural changes." },
      { tier: "Whole-home gut", range: "$300,000-$1,000,000+", description: "Top-to-bottom interior renovation, multiple bathrooms, structural reconfigurations." },
    ],
    faqs: [
      {
        question: "Do I need an architect for a whole-house remodel?",
        answer:
          "If the project involves structural changes (removing load-bearing walls, second-story additions, foundation work), yes. For straightforward multi-room remodels without structural reconfiguration, a designer is usually sufficient. We work with several Twin Cities architects and can recommend one.",
      },
      {
        question: "Can I live in my home during a whole-house remodel?",
        answer:
          "Sometimes. If we can phase the work room by room, yes. For full-floor gut renovations or projects with major HVAC/electrical work, most homeowners move out for 8-16 weeks. We help plan the phasing and temporary housing logistics during pre-construction.",
      },
      {
        question: "How long does a whole-house remodel take?",
        answer:
          "Two-room scope projects run 12-20 weeks on-site. First-floor conversions run 16-28 weeks. Full whole-home gut renovations run 6-14 months depending on scope. Add 4-12 weeks of design + material lead time before construction starts.",
      },
      {
        question: "What is the markup on a whole-house remodel?",
        answer:
          "Reputable Twin Cities general contractors charge a 15-25% overhead and profit margin on top of direct cost. On a $300,000 whole-house remodel, that means roughly $45,000-$75,000 of the total goes to project management, insurance, warranty, and overhead. Lower than that range typically means corners are being cut.",
      },
    ],
    cityIntroTemplate: (city, localAngle) =>
      `Whole-house remodels for ${city} homes. Multi-room scope under a single fixed-price contract with one project manager from start to finish. ${localAngle}`,
    relatedServiceSlugs: ["kitchen-remodeling", "bathroom-remodeling", "general-contractor", "full-gut"],
    isCityPageEnabled: false,
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
export const serviceByUrlSegment = Object.fromEntries(services.map((s) => [s.urlSegment, s]));
