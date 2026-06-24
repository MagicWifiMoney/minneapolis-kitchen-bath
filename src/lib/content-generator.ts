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

export interface PAAEntry {
  question: string;
  answer: string;
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

  // Section 3 Content (Conditional comparison section)
  let subGuideHtml = "";
  let subGuideTitle = "";
  let subGuideId = "sub-guide";

  if (service.slug === "kitchen-remodeling") {
    subGuideTitle = `3. Kitchen Layouts & Design Styles in ${city.name}`;
    subGuideId = "kitchen-styles";
    subGuideHtml = `
      <p>
        When remodeling a kitchen in <strong>${city.name}</strong>, choosing the right design style involves balancing your home's architectural character with your personal aesthetic. In the Twin Cities, we see four primary design styles:
      </p>
      <div class="space-y-6 my-6 not-prose">
        <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/60 shadow-xs">
          <h4 class="font-display font-semibold text-stone-950 text-base mb-2">1. Transitional Kitchens (Highly Recommended)</h4>
          <p class="text-stone-600 text-sm mb-3">
            The most popular style in ${city.name}, transitional kitchens bridge the gap between traditional craftsman elements and clean, modern styles. They typically combine classic shaker cabinet doors with contemporary quartz countertops, sleek cabinet pulls, and modern stainless appliances.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-stone-100 pt-3">
            <div class="text-stone-700"><strong>Pros:</strong> Highly timeless, matches older pre-war homes (Tudors, bungalows) as well as newer builds, maximizes resale value.</div>
            <div class="text-stone-700"><strong>Cons:</strong> Can feel overly neutral if not accented with warm wood or textured tiles.</div>
          </div>
        </div>
        
        <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/60 shadow-xs">
          <h4 class="font-display font-semibold text-stone-950 text-base mb-2">2. Modern & Minimalist Kitchens</h4>
          <p class="text-stone-600 text-sm mb-3">
            Characterized by slab-front cabinet doors (often in natural oak, walnut, or high-gloss paint), handleless cabinets, integrated panel-ready appliances, and waterfall-edge island countertops.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-stone-100 pt-3">
            <div class="text-stone-700"><strong>Pros:</strong> Clean lines, visually uncluttered, extremely easy to wipe down and maintain.</div>
            <div class="text-stone-700"><strong>Cons:</strong> Requires high discipline to keep counters clear, can feel clinical without warm lighting.</div>
          </div>
        </div>

        <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/60 shadow-xs">
          <h4 class="font-display font-semibold text-stone-950 text-base mb-2">3. Classic & Historic Kitchens</h4>
          <p class="text-stone-600 text-sm mb-3">
            Designed to honor local pre-war architecture. Typically features flush-inset cabinet doors with exposed hinges, classic crown molding, warm stained wood cabinets (walnut, cherry), and fireclay farmhouse apron-front sinks.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-stone-100 pt-3">
            <div class="text-stone-700"><strong>Pros:</strong> Fits the historic soul of ${city.name}'s pre-1940 bungalows and Queen Annes, ages beautifully.</div>
            <div class="text-stone-700"><strong>Cons:</strong> Cabinet fabrication costs are higher, less compatible with extremely open layouts.</div>
          </div>
        </div>

        <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/60 shadow-xs">
          <h4 class="font-display font-semibold text-stone-950 text-base mb-2">4. Modern Farmhouse Kitchens</h4>
          <p class="text-stone-600 text-sm mb-3">
            Combines rustic elements—like open reclaimed wood shelving and apron-front fireclay sinks—with clean shaker cabinets, subway tile, and high-contrast matte black plumbing fixtures.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-stone-100 pt-3">
            <div class="text-stone-700"><strong>Pros:</strong> Warm, casual, highly photogenic, blends new finishes with rustic charm.</div>
            <div class="text-stone-700"><strong>Cons:</strong> Open shelving requires neat organization and collects dust, some elements can feel dated quickly.</div>
          </div>
        </div>
      </div>
    `;
  } else if (service.slug === "bathroom-remodeling") {
    subGuideTitle = `3. Bathroom Reconfiguration & Layout Options in ${city.name}`;
    subGuideId = "bathroom-layouts";
    subGuideHtml = `
      <p>
        Remodeling a bathroom in <strong>${city.name}</strong> involves deciding on layout reconfigurations and fixture choices that enhance your daily comfort and maximize your home's equity. Here are the pros and cons of the most highly requested bathroom features:
      </p>
      <div class="space-y-6 my-6 not-prose">
        <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/60 shadow-xs">
          <h4 class="font-display font-semibold text-stone-950 text-base mb-2">1. Curbless / Zero-Entry Walk-In Showers</h4>
          <p class="text-stone-600 text-sm mb-3">
            Removing the shower curb to create a single, continuous floor plane. Utilizes a pre-pitched subfloor, Schluter-Kerdi waterproofing systems, and a modern linear drain.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-stone-100 pt-3">
            <div class="text-stone-700"><strong>Pros:</strong> Stunning modern aesthetic, makes small bathrooms feel larger, highly accessible (ADA friendly).</div>
            <div class="text-stone-700"><strong>Cons:</strong> Requires structural modifications (notching floor joists or lowering the subfloor) which adds $2,500–$5,000 to labor costs.</div>
          </div>
        </div>

        <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/60 shadow-xs">
          <h4 class="font-display font-semibold text-stone-950 text-base mb-2">2. Tub-to-Shower Conversions</h4>
          <p class="text-stone-600 text-sm mb-3">
            Replacing a standard 60-inch tub/shower combo unit with a dedicated walk-in tile shower.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-stone-100 pt-3">
            <div class="text-stone-700"><strong>Pros:</strong> Makes daily use much more comfortable, open look, highly desired by buyers looking for modern finishes.</div>
            <div class="text-stone-700"><strong>Cons:</strong> Removing the only bathtub in a home can make it harder to sell to families with young children in the future.</div>
          </div>
        </div>

        <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/60 shadow-xs">
          <h4 class="font-display font-semibold text-stone-950 text-base mb-2">3. Integrated Wet-Rooms</h4>
          <p class="text-stone-600 text-sm mb-3">
            Enclosing both a freestanding soaking tub and a walk-in shower within a single, fully waterproofed glass enclosure.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-stone-100 pt-3">
            <div class="text-stone-700"><strong>Pros:</strong> High-end spa vibe, keeps water and steam completely contained, efficient use of large footprints.</div>
            <div class="text-stone-700"><strong>Cons:</strong> Higher cost due to double the tile square footage and advanced waterproofing prep.</div>
          </div>
        </div>

        <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/60 shadow-xs">
          <h4 class="font-display font-semibold text-stone-950 text-base mb-2">4. Heated Tile Floors (In-Floor Electric Heat)</h4>
          <p class="text-stone-600 text-sm mb-3">
            Installing electric heating cables embedded in the tile thinset, controlled by a dedicated smart programmable thermostat.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-stone-100 pt-3">
            <div class="text-stone-700"><strong>Pros:</strong> Extremely comfortable during cold Minnesota winters, dries floor tiles quickly, low electricity draw.</div>
            <div class="text-stone-700"><strong>Cons:</strong> Can only be installed during a full gut remodel when the floor tile is removed.</div>
          </div>
        </div>
      </div>
    `;
  } else if (service.slug === "countertops") {
    subGuideTitle = `3. Countertop Material Comparison: Costs, Pros & Cons`;
    subGuideId = "countertop-materials";
    subGuideHtml = `
      <p>
        Sourcing the right countertop involves comparing material costs, durability parameters, and maintenance guidelines. Here is a comprehensive comparison guide of the primary countertop options we install in <strong>${city.name}</strong>:
      </p>
      <div class="overflow-x-auto my-6 not-prose">
        <table class="min-w-full divide-y divide-stone-200 border border-stone-200 rounded-2xl overflow-hidden text-sm">
          <thead class="bg-stone-50">
            <tr>
              <th class="px-4 py-3 text-left font-semibold text-stone-900">Material</th>
              <th class="px-4 py-3 text-left font-semibold text-stone-900">Est. Cost (Installed)</th>
              <th class="px-4 py-3 text-left font-semibold text-stone-900">Durability</th>
              <th class="px-4 py-3 text-left font-semibold text-stone-900">Maintenance</th>
              <th class="px-4 py-3 text-left font-semibold text-stone-900">Pros & Cons</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-200 bg-white text-stone-700">
            <tr>
              <td class="px-4 py-3 font-semibold text-stone-900">Quartz (e.g., Cambria)</td>
              <td class="px-4 py-3 text-teal-700 font-medium font-mono">$60 – $145 / sq ft</td>
              <td class="px-4 py-3">Very High (Scratch & stain resistant)</td>
              <td class="px-4 py-3">Low (Non-porous, no sealing needed)</td>
              <td class="px-4 py-3 text-xs leading-relaxed">
                <strong>Pros:</strong> Extremely durable, uniform patterns, local Minnesota manufacturing.<br/>
                <strong>Cons:</strong> Not heat proof (can burn from hot pans).
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-stone-900">Granite</td>
              <td class="px-4 py-3 text-teal-700 font-medium font-mono">$50 – $130 / sq ft</td>
              <td class="px-4 py-3">High (Heat resistant)</td>
              <td class="px-4 py-3">Medium (Requires annual sealing)</td>
              <td class="px-4 py-3 text-xs leading-relaxed">
                <strong>Pros:</strong> Natural stone look, unique slabs, highly heat resistant.<br/>
                <strong>Cons:</strong> Porous, can stain if not sealed regularly.
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-stone-900">Quartzite</td>
              <td class="px-4 py-3 text-teal-700 font-medium font-mono">$85 – $180 / sq ft</td>
              <td class="px-4 py-3">Very High (Harder than granite)</td>
              <td class="px-4 py-3">Medium (Requires regular sealing)</td>
              <td class="px-4 py-3 text-xs leading-relaxed">
                <strong>Pros:</strong> Looks like marble but performs like granite.<br/>
                <strong>Cons:</strong> Expensive fabrication and slab costs.
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-stone-900">Marble</td>
              <td class="px-4 py-3 text-teal-700 font-medium font-mono">$75 – $200 / sq ft</td>
              <td class="px-4 py-3">Medium (Soft, susceptible to acids)</td>
              <td class="px-4 py-3">High (Easy to etch and scratch)</td>
              <td class="px-4 py-3 text-xs leading-relaxed">
                <strong>Pros:</strong> Unmatched luxury look, classic patina.<br/>
                <strong>Cons:</strong> Stains easily, high maintenance.
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-stone-900">Butcher Block</td>
              <td class="px-4 py-3 text-teal-700 font-medium font-mono">$30 – $80 / sq ft</td>
              <td class="px-4 py-3">Medium (Can dent and scratch)</td>
              <td class="px-4 py-3">High (Needs mineral oil/waxing)</td>
              <td class="px-4 py-3 text-xs leading-relaxed">
                <strong>Pros:</strong> Warm wood aesthetic, affordable, soft surface.<br/>
                <strong>Cons:</strong> Susceptible to water damage and knife cuts.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // Section 4 Content (Cost)
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

  // Section 5 Content (Trends)
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

  // Section 6 Content (Permits)
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

  const sections: ContentSection[] = [
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
  ];

  if (subGuideHtml) {
    sections.push({
      title: subGuideTitle,
      id: subGuideId,
      htmlContent: subGuideHtml,
    });
  }

  sections.push(
    {
      title: `${subGuideHtml ? "4." : "3."} 2026 Budget Planning & Cost Drivers in ${city.name}`,
      id: "budget-planning",
      htmlContent: section3Html,
    },
    {
      title: `${subGuideHtml ? "5." : "4."} 2026 Remodeling Trends in ${city.name}, MN`,
      id: "remodeling-trends",
      htmlContent: section4Html,
    },
    {
      title: `${subGuideHtml ? "6." : "5."} Building Codes, Permits, and Inspections in ${city.name}`,
      id: "building-codes",
      htmlContent: section5Html,
    }
  );

  return sections;
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

// Generates high-value dynamic PAA (People Also Ask) questions and answers targeting local keywords
export function getPAAQuestions(city: City, service: Service): PAAEntry[] {
  if (service.slug === "kitchen-remodeling") {
    return [
      {
        question: `Do I need to move out during a kitchen remodel in ${city.name}?`,
        answer: `Usually no. Most ${city.name} homeowners choose to live in their home during construction. We seal off the kitchen using zippered plastic barrier walls, set up specialized HEPA air scrubbers to capture dust, and establish a temporary kitchen zone (refrigerator, microwave, and induction hotplate) in another room. However, expect 2–3 weeks of high noise and a few days of utility shut-offs during electrical and plumbing rough-ins.`
      },
      {
        question: `How does removing a load-bearing wall affect kitchen remodel cost in ${city.name}?`,
        answer: `Removing a load-bearing wall to open up a kitchen floor plan in ${city.name} typically adds $5,000–$12,000 to your budget. This covers structural engineering calculations, temporary shoring walls, an engineered LVL beam, and foundation/footing reinforcements. It also requires a structural building permit and a visit from the ${city.name} building inspector to sign off on the framing before drywall.`
      },
      {
        question: `What is the typical permit fee for kitchen remodeling in ${city.name}?`,
        answer: `In ${city.name}, building permit fees are calculated as a percentage of the project valuation (labor and material costs). For a $50,000 kitchen remodel, permit fees typically range between $600 and $1,200, which includes structural, plumbing, and electrical permit filings. As your licensed general contractor, we manage the entire permit application and inspection scheduling process.`
      },
      {
        question: `What kitchen layout adds the most resale value to a ${city.name} home?`,
        answer: `An open-concept L-shaped layout with a large central island is the highest-value layout for Twin Cities buyers in 2026. This layout removes barriers to the living room, establishes a central family hub, and supports high-end finishes like Cambria quartz and custom cabinetry. It increases buyer appeal and resale ROI, especially in older neighborhoods with closed-off layouts.`
      }
    ];
  }

  if (service.slug === "bathroom-remodeling") {
    return [
      {
        question: `Is a curbless walk-in shower worth the extra cost in ${city.name}?`,
        answer: `Yes, for many ${city.name} homeowners, it is. The seamless, zero-entry design makes the bathroom feel much larger and provides excellent accessibility for aging-in-place. While the specialized plumbing and subfloor modifications add $2,500–$5,000, it is a premium feature that substantially increases home resale value and is highly sought after in premium tier markets.`
      },
      {
        question: `Should I keep a tub or convert it to a shower for resale value in ${city.name}?`,
        answer: `We recommend retaining at least one bathtub in your home for resale value. Twin Cities buyers with young children typically require a tub. However, converting a cramped hall bath tub-shower combo into a large walk-in tile shower is an excellent upgrade if you have a second bathroom in the home with a tub.`
      },
      {
        question: `How long does a master bathroom remodel typically take?`,
        answer: `A primary suite bathroom remodel typically takes 4–6 weeks of active on-site construction. This timeline is driven by structural layout shifts, new plumbing lines, and custom tile work (which requires proper mortar curing times and waterproofing inspection sign-off from the city).`
      },
      {
        question: `What is the most durable flooring for a ${city.name} bathroom?`,
        answer: `Porcelain tile is the gold standard for bathroom floors due to its moisture resistance, durability, and compatibility with in-floor heating cables. If you are looking for an affordable alternative, Luxury Vinyl Plank (LVP) is also popular, but porcelain tile offers the highest long-term durability and resale return.`
      }
    ];
  }

  if (service.slug === "countertops") {
    return [
      {
        question: `Is Cambria quartz actually made in Minnesota?`,
        answer: `Yes! Cambria is headquartered in Eden Prairie, MN, and its primary quartz fabrication facility is located in Le Sueur, MN. Choosing Cambria supports a local Minnesota manufacturer, provides an excellent lifetime warranty, and ensures fast lead times in the Twin Cities metro compared to imported brands.`
      },
      {
        question: `How often do natural stone countertops need to be sealed in ${city.name}?`,
        answer: `Natural stones like granite and quartzite should be sealed once every 12 to 18 months to prevent staining. Slabs in high-use areas (near sinks and cooktops) benefit from more frequent sealing. You can perform a simple 'water drop test': if water drops do not bead up but soak into the stone after 10 minutes, it is time to reapply sealer.`
      },
      {
        question: `What is the difference between quartz and quartzite?`,
        answer: `Quartz is an engineered stone made from roughly 90–93% natural quartz crystals bonded with resins and pigments, making it completely non-porous and maintenance-free. Quartzite is a 100% natural metamorphic rock cut from quarries. Quartzite resembles marble but is harder than granite, requiring regular sealing.`
      },
      {
        question: `What countertop edge profile is the most popular in 2026?`,
        answer: `The eased edge (a flat edge with slightly rounded corners) is the most popular profile in 2026 for its clean, modern, and transitional look. For high-end kitchens, waterfall edges (where the stone flows down the side of the island to the floor) are also highly requested.`
      }
    ];
  }

  if (service.slug === "custom-cabinetry") {
    return [
      {
        question: `What is the lead time for custom cabinets in the Twin Cities?`,
        answer: `Typical lead times for custom cabinets built by local Twin Cities cabinet workshops range from 6 to 10 weeks from final design approval. Semi-custom cabinet lines take 4 to 6 weeks. We recommend finalizing your cabinet layout and placing the order immediately on contract signing, as cabinets are the longest lead-time item.`
      },
      {
        question: `Should I choose painted or stained wood cabinets in ${city.name}?`,
        answer: `Both are highly popular in 2026. Painted cabinets (especially warm whites, taupes, and soft greens) offer a clean, transitional look. Stained cabinets (particularly natural rift-sawn white oak and walnut) are making a strong comeback for a warmer, organic modern aesthetic. Many local designers are combining both in a 'two-tone' design (stained wood islands with painted perimeter cabinets).`
      },
      {
        question: `Are plywood cabinet boxes better than particle board?`,
        answer: `Yes. We use all-plywood cabinet box construction as our standard. Plywood is more durable, holds screws and fasteners tighter over time, and is significantly more resistant to moisture damage (which is crucial under kitchen sinks and near bathroom plumbing).`
      },
      {
        question: `What features make cabinets feel truly custom?`,
        answer: `Custom cabinet features include flush-inset doors, solid wood dovetail drawer boxes, heavy-duty soft-close drawer slides, integrated pull-out trash cans, spice drawer inserts, and custom appliance panels that match the cabinetry.`
      }
    ];
  }

  if (service.slug === "schluter-certified-shower-installer") {
    return [
      {
        question: `What makes a Schluter shower waterproof?`,
        answer: `A Schluter shower uses a continuous sheet-membrane system (Schluter-Kerdi) bonded to the walls and floor before tile installation. This membrane is completely vapor-tight and directs all moisture into the bonded Kerdi-Drain. It replaces the old cement-board-and-liquid method, which is prone to installer errors and leaking.`
      },
      {
        question: `How long is the warranty on a Schluter shower?`,
        answer: `Schluter Systems offers a 10-Year or Lifetime Limited Warranty on their complete waterproofing system when installed by trained installers in accordance with their guidelines. Because our crew is Schluter-trained, your shower waterproofing is backed by this strong manufacturer warranty.`
      },
      {
        question: `Can I have a curbless shower in a second-floor bathroom?`,
        answer: `Yes. We regularly install curbless showers on upper levels. We recess the subfloor by cutting and sistering the joists under structural engineering guidance, allowing the tile to sit flush with the surrounding floor. Full waterproofing is applied to the entire bathroom floor to protect the level below.`
      },
      {
        question: `How much does a Schluter waterproofing system add to tile shower cost?`,
        answer: `The Schluter membrane and tray materials typically add $800–$1,800 to the total cost compared to standard cement-board-and-mud-pan construction. However, it saves labor hours and provides absolute protection against structural rot, making it a highly cost-effective investment.`
      }
    ];
  }

  // general-contractor or fallback
  return [
    {
      question: `How do I verify a general contractor's license in Minnesota?`,
      answer: `You can verify any contractor's license status online through the Minnesota Department of Labor and Industry (DLI) website. Our license number is BC764981. Verifying the license ensures the contractor is active, bonded, and has no unresolved enforcement actions.`
    },
    {
      question: `What is the difference between a design-build firm and a general contractor?`,
      answer: `A design-build firm manages your entire project from initial design and layout blueprints through permitting, material sourcing, and construction. A traditional general contractor expects you to provide the architectural plans first, which they then build. Our design-build model keeps everything under one contract, reducing communication errors.`
    },
    {
      question: `Do I need a general contractor for a simple bathroom remodel?`,
      answer: `For cosmetic refreshes (replacing a vanity and painting), a handyman or specialized trade is sufficient. However, if the project involves gutting the room, replacing a tub, moving plumbing lines, adding new electrical outlets, or structural changes, a licensed GC is required to pull the master building permit and coordinate the trades.`
    },
    {
      question: `What insurance coverage should my contractor have in ${city.name}?`,
      answer: `Your contractor must carry active General Liability insurance (at least $1,000,000 to cover property damage) and full Workers' Compensation insurance (to cover any injuries on site). Minneapolis Kitchen & Bath carries a $2,000,000 liability policy and full workers' comp, and we provide proof of insurance before starting any work.`
    }
  ];
}
