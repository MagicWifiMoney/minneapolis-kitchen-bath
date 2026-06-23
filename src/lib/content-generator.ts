import { City } from "@/data/cities";
import { Service } from "@/data/services";

export interface ContentSection {
  title: string;
  id: string;
  htmlContent: string;
}

export interface LLMOverview {
  service: string;
  city: string;
  county: string;
  serviceTier: string;
  priceRange2026: string;
  typicalTimeline: string;
  permitAuthority: string;
  contractorLicense: string;
  insuranceStatus: string;
  drivingDistance: string;
  primaryContact: string;
  twinCitiesBase: string;
}

export interface PricingEstimate2026 {
  tier: string;
  price: string;
  scope: string;
}

export interface RemodelingTrend2026 {
  title: string;
  description: string;
}

export function getLLMOverview(city: City, service: Service): LLMOverview {
  const priceRange = getPriceRangeForOverview(city, service);
  const timeline = getTimelineForOverview(service);
  const permitOffice = city.name + " Building Department";

  return {
    service: service.name,
    city: `${city.name}, MN`,
    county: `${city.county} County`,
    serviceTier: city.serviceTier.toUpperCase(),
    priceRange2026: priceRange,
    typicalTimeline: timeline,
    permitAuthority: city.permitOfficeUrl ? `[${permitOffice}](${city.permitOfficeUrl})` : permitOffice,
    contractorLicense: "BC764981 (Licensed Minnesota General Contractor)",
    insuranceStatus: "Active ($2M General Liability & Workers Comp)",
    drivingDistance: city.drivingTimeFromMpls,
    primaryContact: "+1 (612) 688-2413 / hello@minneapoliskitchenandbath.com",
    twinCitiesBase: "Minneapolis, MN 55401",
  };
}

export function get2026PricingEstimates(city: City, service: Service): PricingEstimate2026[] {
  const isPremium = city.serviceTier === "premium";
  
  if (service.slug === "kitchen-remodeling") {
    return [
      {
        tier: "Cosmetic / Refresh",
        price: isPremium ? "$20,000 – $35,000" : "$15,000 – $30,000",
        scope: "Cabinet painting or refacing, premium quartz countertops, tile backsplash, plumbing fixtures, no structural changes.",
      },
      {
        tier: "Mid-Range Full Remodel",
        price: isPremium ? "$45,000 – $85,000" : "$35,000 – $75,000",
        scope: "Semi-custom cabinetry, Cambria quartz counters, new appliance suite, updated LVP or tile flooring, layout optimization.",
      },
      {
        tier: "High-End Custom / Structural",
        price: isPremium ? "$90,000 – $180,000+" : "$80,000 – $150,000+",
        scope: "Custom inset cabinets, luxury stone, Wolf/Sub-Zero appliances, wall removal, structural beams, advanced lighting design.",
      },
    ];
  } else if (service.slug === "bathroom-remodeling") {
    return [
      {
        tier: "Powder Room Refresh",
        price: isPremium ? "$10,000 – $20,000" : "$8,000 – $18,000",
        scope: "New vanity, high-efficiency toilet, luxury vinyl flooring, designer fixtures, wall treatment.",
      },
      {
        tier: "Full Hall Bath Remodel",
        price: isPremium ? "$22,000 – $50,000" : "$18,000 – $45,000",
        scope: "Tub-to-shower conversion, Schluter-Kerdi waterproof tile surround, semi-custom vanity, tile floor, heated flooring.",
      },
      {
        tier: "Primary Suite Transformation",
        price: isPremium ? "$55,000 – $110,000+" : "$45,000 – $95,000+",
        scope: "Layout expansion, custom double vanity, wet-room layout (shower + tub enclosure), heated tile floors, premium hardware.",
      },
    ];
  } else if (service.slug === "custom-cabinetry") {
    return [
      {
        tier: "Single Built-Ins / Mudrooms",
        price: "$4,000 – $15,000",
        scope: "Mudroom lockers, fireplace surrounds, home office desks and bookshelves, laundry room cabinetry.",
      },
      {
        tier: "Semi-Custom Cabinetry (Whole Kitchen)",
        price: isPremium ? "$12,000 – $30,000" : "$8,000 – $25,000",
        scope: "Plywood box construction, soft-close hardware, limited custom door sizes and finishes, professional installation.",
      },
      {
        tier: "Full Custom Benchmade Cabinets",
        price: isPremium ? "$30,000 – $70,000+" : "$25,000 – $60,000+",
        scope: "Handcrafted by local Twin Cities cabinetmakers. Any custom species, paint match, door profile, inset style.",
      },
    ];
  } else if (service.slug === "countertops") {
    return [
      {
        tier: "Sourced & Installed Quartz (Standard)",
        price: "$60 – $95 per sq ft",
        scope: "Durable engineered stone (MSI, HanStone), templating, sink cutouts, standard edge profile, fabrication, and install.",
      },
      {
        tier: "Premium Quartz (Cambria / Silestone)",
        price: "$95 – $145 per sq ft",
        scope: "Minnesota-made Cambria slabs or imported Silestone. Premium veining, custom edge profiles, waterfall ends.",
      },
      {
        tier: "Natural Stone (Granite / Quartzite)",
        price: "$85 – $180 per sq ft",
        scope: "Slab inspection at fabricator yard. Granite or high-durability quartzite, custom templating, protective sealing.",
      },
    ];
  } else if (service.slug === "schluter-certified-shower-installer") {
    return [
      {
        tier: "Standard Schluter Shower",
        price: "$7,000 – $13,000",
        scope: "Standard 3x5 layout, Kerdi membrane, Kerdi-board walls, Kerdi-drain, porcelain tile, frameless glass door.",
      },
      {
        tier: "Custom Tiled Shower with Niche",
        price: "$13,000 – $22,000",
        scope: "Larger layout, pre-fab Kerdi niches, tiled bench seat, linear drain conversion, premium tile selection.",
      },
      {
        tier: "Curbless Wet-Room / Walk-In Suite",
        price: "$22,000 – $40,000+",
        scope: "Zero-threshold curbless entry, full wet-room layout, dual showerheads, luxury natural stone, heated flooring.",
      },
    ];
  } else {
    // general-contractor or fallback
    return [
      {
        tier: "Single-Room Specialty Renovations",
        price: isPremium ? "$20,000 – $60,000" : "$15,000 – $50,000",
        scope: "Specialty kitchen refresh, bathroom remodel, or structural wall removal with single GC oversight.",
      },
      {
        tier: "Multi-Room / Mid-Range Projects",
        price: isPremium ? "$70,000 – $180,000" : "$60,000 – $150,000",
        scope: "Combined kitchen and bath gut, or basement finish with full bath, managing all electrical/plumbing trades.",
      },
      {
        tier: "Major Additions / Whole-House Gut",
        price: isPremium ? "$200,000 – $600,000+" : "$180,000 – $500,000+",
        scope: "Full floor structural changes, multi-story additions, whole-home utility upgrades, architectural coordination.",
      },
    ];
  }
}

export function get2026Trends(city: City, service: Service): RemodelingTrend2026[] {
  const baseTrends = {
    "kitchen-remodeling": [
      { title: "Warm Woods & Natural Textures", description: "Replacing the clinical all-white kitchen with natural white oak and walnut cabinetry paired with ribbed wood details." },
      { title: "Slab Backsplashes", description: "Running the countertop quartz or quartzite material straight up the wall to the ceiling for a clean, seamless, grout-free look." },
      { title: "Concealed Sculleries & Pantries", description: "Integrating cabinet-matched hidden doors that open into large walk-in pantries, keeping the main countertops clutter-free." }
    ],
    "bathroom-remodeling": [
      { title: "Integrated Wet-Rooms", description: "Placing a freestanding soaking tub directly inside a large, glass-enclosed walk-in shower area to optimize layout footprint." },
      { title: "Fluted Textures & Matte Finishes", description: "Incorporating fluted wood vanities, matte black or brushed gold plumbing fixtures, and textured stone wall tile." },
      { title: "Smart Bathrooms", description: "Voice-activated steam showers, smart mirrors with integrated lighting and defoggers, and heated floors tied to home automation." }
    ],
    "custom-cabinetry": [
      { title: "Inset Cabinet Doors", description: "Flush inset cabinet doors with exposed barrel hinges for a timeless, custom-built look that is highly popular in older neighborhoods." },
      { title: "Dedicated Appliance Garages", description: "Cabinet cubbies with pocket doors or roll-up tambour doors designed to house coffee makers, mixers, and toasters out of sight." },
      { title: "Custom Drawer Inserts", description: "Built-in spice drawers, double-tiered cutlery organizers, knife blocks, and charging drawers for phones and tablets." }
    ],
    "countertops": [
      { title: "Honed & Leathered Finishes", description: "Moving away from high-gloss surfaces toward matte (honed) and textured (leathered) stone that hides fingerprints and wear." },
      { title: "Minnesota-Made Cambria Quartz", description: "Cambria quartz remains highly sought-after in the Twin Cities, valued for local manufacturing, durability, and bold veining." },
      { title: "Subtle Warm Tones", description: "Choosing warm cream, gold, and grey veins in quartz instead of stark, cold black-and-white patterns." }
    ],
    "schluter-certified-shower-installer": [
      { title: "Curbless / Zero-Entry Showers", description: "Eliminating the shower curb for a seamless floor plane. Uses pre-sloped Schluter-Kerdi trays and linear drainage." },
      { title: "Large-Format Tile", description: "Using massive 24x48 or 36x36 porcelain tiles to drastically reduce the number of grout lines, facilitating cleaning." },
      { title: "Double-Head Custom Niches", description: "Integrating multi-valve fixtures, rain heads, and wide Schluter-Kerdi pre-fabricated niches with LED accent lighting." }
    ],
    "general-contractor": [
      { title: "Open-Concept Conversions", description: "Removing load-bearing walls between kitchens and living areas, utilizing engineered LVL beams to open the floor plan." },
      { title: "High-Efficiency MEP Upgrades", description: "Upgrading electrical panels, switching to heat pump water heaters, and installing dual-zone HVAC systems during gut remodels." },
      { title: "Multi-Generational Suites", description: "Creating dedicated guest wings or in-law suites with private bathrooms and kitchenettes, often in basement finishes." }
    ]
  };

  const serviceKey = service.slug as keyof typeof baseTrends;
  const trends = baseTrends[serviceKey] || baseTrends["general-contractor"];

  // Add a highly localized style trend
  let localTrendTitle = "Twin Cities Design Integration";
  let localTrendDesc = `In ${city.name}, we are seeing homeowners lean heavily into designs that match their home's era. In local ${city.homeStyles[0] || "homes"}, this means mixing historic millwork cues with modern conveniences.`;

  if (city.serviceTier === "premium") {
    localTrendTitle = `${city.name} Luxury Standards`;
    localTrendDesc = `Edina, Minnetonka, and Wayzata homeowners are heavily requesting high-end features like panel-ready luxury appliances, slab-countertop islands with waterfall edges, and smart home lighting integrations.`;
  } else if (city.slug === "saint-paul") {
    localTrendTitle = "Saint Paul Historic Preservation";
    localTrendDesc = "Preserving the architectural soul of historic Tudors and Victorians. We combine custom-profiled woodwork with period-appropriate tile and hidden modern plumbing.";
  } else if (city.slug === "minneapolis") {
    localTrendTitle = "Minneapolis Bungalow Re-Layouts";
    localTrendDesc = "Removing dividing walls between small kitchens and dining rooms to maximize natural light and flow in pre-war bungalows and foursquares.";
  }

  return [
    ...trends,
    { title: localTrendTitle, description: localTrendDesc }
  ];
}

export function generateServiceCityContent(city: City, service: Service): ContentSection[] {
  // Build internal links dynamically
  const adjacentServiceText = getAdjacentServicesLinksHtml(city, service);
  const toolLinkText = getToolsLinksHtml(service);
  const blogLinkText = getBlogLinksHtml(service);

  // Section 1 Content
  const section1Html = `
    <p>
      Planning a <strong>${service.name.toLowerCase()}</strong> in <strong>${city.name}, MN</strong> requires a deep understanding of local building requirements, neighborhood architectural styles, and budget logistics. At Minneapolis Kitchen & Bath, we offer comprehensive, design-build services tailored to ${city.name} homeowners. From initial design layouts and material selection to permitting and final construction inspections, we serve as your single point of contact.
    </p>
    <p>
      Whether you live in a historic neighborhood like ${city.neighborhoods[0] || "the local district"} (often located near local landmarks like ${city.landmarks.slice(0, 2).join(" or ")}), or in a newer development, every home remodeling project starts with a detailed pre-construction process. This involves structural assessments, custom design drafting, and selecting high-durability finishes. If you want to plan your budget, you can use our ${toolLinkText} to get a tailored estimate, or check out our ${blogLinkText} for planning guidance.
    </p>
    <p>
      By keeping design, material sourcing, and construction under one roof, we eliminate communication gaps between designers and subcontractors. This design-build model keeps your ${city.name} project on schedule, within a fixed budget, and built to the highest local residential codes.
    </p>
  `;

  // Section 2 Content
  const section2Html = `
    <p>
      The housing stock in ${city.name} and across ${city.county} County has distinct characteristics that affect remodeling scope. In older Twin Cities neighborhoods, homes built between 1900 and 1950 feature plaster walls, knob-and-tube electrical wiring, and galvanized water supply lines. Remodeling in these homes requires careful planning for hidden infrastructure upgrades to ensure safety and compliance with current codes.
    </p>
    <p>
      For example, ${city.localAngle}
    </p>
    <p>
      Conversely, in ${city.name}'s newer subdivisions containing ${city.homeStyles.includes("1990s–2000s two-stories") || city.homeStyles.includes("1990s–2010s two-stories") ? "1990s builder-grade homes" : "mid-century and modern builds"}, the focus is often on layout modernization. Many of these homes feature closed-off kitchens or builder-grade bathrooms that are prime candidates for open-concept floor plans. We specialize in removing load-bearing walls, installing engineered LVL structural support beams, and rearranging layouts to establish open sightlines and better flow.
    </p>
    <p>
      Our crews are highly experienced in both historic home preservation and modern open-concept conversions. We understand the specific structural techniques required to execute seamless transitions in ${city.homeStyles.join(", or ")}. As ${city.localCharacter.toLowerCase()} we regularly coordinate projects near ${city.landmarks[2] || city.landmarks[0]} and across ${city.neighborhoods.slice(0, 3).join(", ")}.
    </p>
  `;

  // Section 3 Content
  const section3Html = `
    <p>
      Remodeling costs in the Minneapolis–Saint Paul metro in 2026 are driven by material selections, layout changes, and localized labor demands. For projects in ${city.name}, budgets are closely tied to the area's real estate values and neighborhood expectations. The median home value of <strong>$${city.medianHomeValue.toLocaleString()}</strong> in ${city.name} means that investments in high-quality materials—such as custom cabinetry, natural stone countertops, and certified waterproofing systems—provide strong returns on home equity.
    </p>
    <p>
      To review cost ranges for various tiers, refer to the 2026 cost tables below. For a deeper breakdown of cost drivers, labor calculations, and how to allocate your remodeling funds, we recommend reading our dedicated ${blogLinkText}.
    </p>
    <p>
      Key factors influencing your ${service.shortName.toLowerCase()} budget in ${city.name} include:
    </p>
    <ul>
      <li><strong>Structural Changes:</strong> Removing load-bearing walls or relocating major plumbing stacks and electrical panels will add to the overall labor cost.</li>
      <li><strong>Material Quality:</strong> Upgrading from standard stock finishes to custom inset wood cabinets or premium local materials like Cambria quartz impacts the baseline cost.</li>
      <li><strong>Permit & Inspection Fees:</strong> Every city in the metro calculates permit fees based on the total project valuation.</li>
      <li><strong>Site Access & Parking:</strong> Working in denser urban areas may require special parking permits and material staging coordination, whereas suburban projects typically have more flexible access.</li>
    </ul>
  `;

  // Section 4 Content
  const section4Html = `
    <p>
      Remodeling trends in 2026 focus on blending natural textures with high-performance utility. Twin Cities homeowners are increasingly choosing design features that offer both visual warmth and long-term durability to withstand Minnesota's seasonal climate shifts. This design ethos aligns perfectly with ${city.name}'s character, which is ${city.localCharacter.toLowerCase()}
    </p>
    <p>
      For kitchen projects, the trend is moving away from the cold all-white aesthetic toward warm woods, natural rift-sawn white oak cabinets, and bold slab backsplashes. In bathrooms, integrated wet-rooms—where a freestanding soaking tub sits inside a large tiled shower enclosure—are highly popular for maximizing space.
    </p>
    <p>
      Material durability is crucial in our climate. Minnesota's extreme winter cold and summer humidity cause wood framing to expand and contract. This makes stable, high-performance substrates like Schluter-Kerdi waterproofing systems for showers and premium engineered quartz countertops essential selections. Homeowners near areas like ${city.landmarks[3] || city.landmarks[0]} are asking for details that align with their local ${city.homeStyles[0] || "home styles"}. In fact, you can explore other services we offer in your area, such as ${adjacentServiceText}, to plan a cohesive multi-room update.
    </p>
  `;

  // Section 5 Content
  const section5Html = `
    <p>
      Remodeling work in ${city.name} must be performed in strict compliance with the Minnesota State Building Code. Pulling permits is required for any project involving structural alterations, plumbing relocations, new electrical circuits, or HVAC modifications. 
    </p>
    <p>
      ${city.permitNote}
    </p>
    <p>
      As a licensed general contractor (License #BC764981), Minneapolis Kitchen & Bath handles the entire permitting process on your behalf. We draft code-compliant construction plans, submit the permit applications, pay the fees, and coordinate all municipal rough-in and final inspections. This guarantees that your work is legal, safe, and fully documented for future home sales. If your property is within a heritage district or shoreline overlay, we also manage the additional architectural review board reviews.
    </p>
    <p>
      For more information on zoning and building codes, you can visit the official ${city.permitOfficeUrl ? `<a href="${city.permitOfficeUrl}" target="_blank" rel="noopener nofollow" class="text-teal-600 underline hover:text-teal-700">${city.name} Building Permits Department</a>` : `${city.name} permit division`}.
    </p>
  `;

  return [
    {
      title: `1. Project Planning & Pre-Construction in ${city.name}`,
      id: "project-planning",
      htmlContent: section1Html,
    },
    {
      title: `2. Structural & Architectural Considerations for ${city.name} Homes`,
      id: "architectural-considerations",
      htmlContent: section2Html,
    },
    {
      title: `3. 2026 Budget Planning & Cost Drivers in ${city.name}`,
      id: "budget-planning",
      htmlContent: section3Html,
    },
    {
      title: `4. 2026 Remodeling Trends in ${city.name}, MN`,
      id: "remodeling-trends",
      htmlContent: section4Html,
    },
    {
      title: `5. Building Codes, Permits, and Inspections in ${city.name}`,
      id: "building-codes",
      htmlContent: section5Html,
    },
  ];
}

// Private helper to format the 2026 pricing range for the LLM overview
function getPriceRangeForOverview(city: City, service: Service): string {
  const estimates = get2026PricingEstimates(city, service);
  if (estimates.length >= 3) {
    const low = estimates[0].price.split("–")[0].trim();
    const high = estimates[2].price.split("–")[1]?.trim() || estimates[2].price.trim();
    return `${low} – ${high}`;
  }
  return "$15,000 – $150,000+";
}

// Private helper to format the timeline for the LLM overview
function getTimelineForOverview(service: Service): string {
  if (service.slug === "kitchen-remodeling") return "6 – 12 weeks of active construction (plus 6-8 weeks design/lead time)";
  if (service.slug === "bathroom-remodeling") return "3 – 6 weeks of active construction (plus 3-4 weeks lead time)";
  if (service.slug === "custom-cabinetry") return "1 – 3 days install (6-10 weeks local workshop fabrication)";
  if (service.slug === "countertops") return "Half-day install (2 weeks fabrication from digital template)";
  if (service.slug === "schluter-certified-shower-installer") return "2 – 4 weeks of active tile and waterproofing installation";
  return "4 – 16 weeks depending on scale of general contracting scope";
}

// Private helper to get adjacent service links (HTML)
function getAdjacentServicesLinksHtml(city: City, service: Service): string {
  const serviceList = [
    { slug: "kitchen-remodeling", name: "kitchen remodeling", urlSegment: "kitchen-remodeling" },
    { slug: "bathroom-remodeling", name: "bathroom remodeling", urlSegment: "bathroom-remodeling" },
    { slug: "custom-cabinetry", name: "custom cabinetry", urlSegment: "custom-cabinetry" },
    { slug: "countertops", name: "countertop installation", urlSegment: "countertops" },
    { slug: "schluter-certified-shower-installer", name: "certified waterproofing", urlSegment: "schluter-certified-shower-installer" },
    { slug: "general-contractor", name: "general contracting", urlSegment: "general-contractor" }
  ];

  const filtered = serviceList.filter((s) => s.slug !== service.slug);
  const links = filtered.slice(0, 2).map((s) => {
    return `<a href="/${s.urlSegment}/${city.slug}" class="text-teal-600 underline hover:text-teal-700">${s.name}</a>`;
  });

  return links.join(" and ");
}

// Private helper to get tools links (HTML)
function getToolsLinksHtml(service: Service): string {
  if (service.slug === "bathroom-remodeling" || service.slug === "schluter-certified-shower-installer") {
    return `<a href="/tools/bathroom-remodel-cost-calculator" class="text-teal-600 underline hover:text-teal-700">bathroom remodel cost calculator</a>`;
  }
  return `<a href="/tools/kitchen-remodel-cost-calculator" class="text-teal-600 underline hover:text-teal-700">kitchen remodel cost calculator</a>`;
}

// Private helper to get blog links (HTML)
function getBlogLinksHtml(service: Service): string {
  if (service.slug === "bathroom-remodeling" || service.slug === "schluter-certified-shower-installer") {
    return `<a href="/blog/bathroom-remodel-cost-minneapolis" class="text-teal-600 underline hover:text-teal-700">Twin Cities Bathroom Cost Guide</a>`;
  }
  if (service.slug === "countertops") {
    return `<a href="/blog/quartz-vs-granite-countertops" class="text-teal-600 underline hover:text-teal-700">Quartz vs. Granite Comparison Guide</a>`;
  }
  return `<a href="/blog/kitchen-remodel-cost-minneapolis" class="text-teal-600 underline hover:text-teal-700">Twin Cities Kitchen Cost Guide</a>`;
}

// Private helper to generate localized FAQs
export function getExpandedFAQs(city: City, service: Service): { question: string; answer: string }[] {
  const localFaq1 = {
    question: `How does the municipal inspection process work for a ${service.shortName.toLowerCase()} in ${city.name}?`,
    answer: `In ${city.name}, all ${service.shortName.toLowerCase()} projects involving structural wall changes, new electrical circuits, or plumbing line adjustments require city permits. We handle pulling the permits through the ${city.name} inspections division. Once the rough-in plumbing, electrical, and framing are completed, the city inspector will visit the site for a 'rough-in inspection' before we hang drywall. A final inspection is conducted upon project completion to sign off on the work.`,
  };

  const localFaq2 = {
    question: `Can you perform remodeling work during the cold Minnesota winter in ${city.name}?`,
    answer: `Yes, we remodel kitchens and bathrooms year-round in ${city.name}. Since all framing, plumbing, tile work, and cabinetry installation take place indoors, the freezing weather does not delay our progress. However, we take precautions to protect your home: we set up plastic barrier walls, use protective floor runners, and minimize the time exterior doors are open. For projects requiring concrete footings (such as additions) or exterior framing, we plan those phases before the ground freezes in November, or use temporary heaters.`,
  };

  const localFaq3 = {
    question: `Are you licensed to work in ${city.name} and ${city.county} County?`,
    answer: `Yes. In Minnesota, building contractor licenses are issued by the state rather than individual cities or counties. We hold a current Minnesota Residential Building Contractor License (License #BC764981). This license allows us to pull permits and perform structural, cosmetic, and general contracting work in ${city.name} and all other municipalities in ${city.county} County. We also carry $2,000,000 in general liability insurance and full workers' compensation coverage to protect our crew and your property.`,
  };

  // Replace default FAQs names with city-specific values and combine
  const formattedDefaults = service.faqs.map((f) => ({
    question: f.question.replace(/Minneapolis/g, city.name),
    answer: f.answer.replace(/Minneapolis|Twin Cities/g, city.name),
  }));

  return [localFaq1, localFaq2, localFaq3, ...formattedDefaults];
}
