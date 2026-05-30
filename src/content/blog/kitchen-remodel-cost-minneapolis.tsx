import Link from "next/link";

export default function Body() {
  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10 not-prose">
        <h2 className="text-lg font-semibold text-amber-900 mb-3">
          📊 2026 Minneapolis Kitchen Remodel Cost Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              tier: "Budget Refresh",
              range: "$15,000–$30,000",
              desc: "Cabinet paint/reface, new countertops, updated hardware & fixtures",
            },
            {
              tier: "Mid-Range Full Remodel",
              range: "$35,000–$75,000",
              desc: "Semi-custom cabinets, quartz countertops, new appliances, tile backsplash",
            },
            {
              tier: "High-End Custom",
              range: "$80,000–$150,000+",
              desc: "Custom cabinetry, premium appliances, structural changes, custom tile",
            },
          ].map((t) => (
            <div
              key={t.tier}
              className="bg-white rounded-lg p-4 border border-amber-100"
            >
              <div className="font-bold text-gray-900 mb-1">{t.tier}</div>
              <div className="text-2xl font-bold text-amber-700 mb-2">
                {t.range}
              </div>
              <div className="text-sm text-gray-600">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <h2>What Drives Kitchen Remodel Costs in the Twin Cities?</h2>
      <p>
        Minneapolis kitchen remodel costs have increased 12–18% since 2023 due
        to persistent labor shortages in the trades and elevated material
        costs. Competition among contractors has stabilized slightly in 2026,
        and lead times for cabinets have improved from the 16-week delays seen
        in 2024.
      </p>
      <p>
        The five biggest cost drivers for any kitchen remodel in the metro
        area are: <strong>cabinets</strong> (30–40% of budget),{" "}
        <strong>labor</strong> (20–35%), <strong>countertops</strong>{" "}
        (10–15%), <strong>appliances</strong> (10–15%), and{" "}
        <strong>flooring &amp; tile</strong> (8–12%).
      </p>

      <h2>Cabinet Costs in Minneapolis (2026)</h2>
      <p>
        Cabinets are almost always the single largest line item. Here&apos;s
        what to expect in the Minneapolis market:
      </p>
      <div className="not-prose overflow-x-auto mb-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Cabinet Type
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Cost Range (installed)
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Best For
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Stock / Ready-to-Assemble", "$3,000–$8,000", "Budget remodels, rental properties"],
              ["Semi-Custom", "$8,000–$25,000", "Most homeowner remodels"],
              ["Custom", "$25,000–$60,000+", "High-end finishes, unusual layouts"],
              ["Cabinet Refacing", "$4,000–$9,000", "Good bones, tight budget"],
            ].map(([type, cost, best]) => (
              <tr key={type} className="border-b border-gray-200">
                <td className="p-3 border border-gray-200 font-medium">
                  {type}
                </td>
                <td className="p-3 border border-gray-200 text-green-700 font-semibold">
                  {cost}
                </td>
                <td className="p-3 border border-gray-200 text-gray-600">
                  {best}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        For more detail on choosing the right brand and tier, see our guide on{" "}
        <Link href="/blog/kitchen-cabinet-brands-twin-cities">
          the best kitchen cabinet brands for Minneapolis homes
        </Link>
        .
      </p>

      <h2>Countertop Costs in the Twin Cities</h2>
      <p>
        Countertop costs vary widely based on material choice. Quartz has
        overtaken granite as the most popular choice in Minneapolis remodels
        due to its durability and low maintenance:
      </p>
      <ul>
        <li>
          <strong>Quartz (Silestone, Cambria, MSI):</strong> $55–$95/sq ft
          installed. Cambria is Minnesota-made and often priced competitively
          locally — $65–$85/sq ft.
        </li>
        <li>
          <strong>Granite:</strong> $45–$85/sq ft installed. Prices have
          softened as quartz demand grew.
        </li>
        <li>
          <strong>Butcher block:</strong> $30–$60/sq ft installed. Popular in
          farmhouse-style Twin Cities homes.
        </li>
        <li>
          <strong>Marble:</strong> $75–$150/sq ft installed. High maintenance —
          less common in family kitchens.
        </li>
        <li>
          <strong>Laminate:</strong> $15–$35/sq ft installed. Significant
          improvement in quality since 2020; good budget option.
        </li>
      </ul>
      <p>
        Still deciding? Our{" "}
        <Link href="/blog/quartz-vs-granite-countertops">
          quartz vs. granite countertop guide
        </Link>{" "}
        compares the two head-to-head for Twin Cities kitchens.
      </p>

      <h2>Labor Costs for Minneapolis Kitchen Remodels</h2>
      <p>
        Labor is one of the most variable costs and the hardest to predict.
        In the Twin Cities market in 2026:
      </p>
      <ul>
        <li>
          <strong>General contractor markup:</strong> 15–25% over subcontractor
          costs
        </li>
        <li>
          <strong>Plumber:</strong> $150–$250/hr (relocating sink or adding
          island plumbing adds $2,000–$5,000)
        </li>
        <li>
          <strong>Electrician:</strong> $120–$200/hr (GFCI outlets,
          under-cabinet lighting, island circuits)
        </li>
        <li>
          <strong>Tile setter:</strong> $12–$20/sq ft labor only
        </li>
        <li>
          <strong>Cabinet installer:</strong> $75–$150/hr or $250–$500/linear
          foot
        </li>
      </ul>

      <h2>How to Get Accurate Quotes in Minneapolis</h2>
      <p>
        The most reliable way to price your project is to get 3 detailed bids
        from licensed contractors who specialize in kitchen remodels (not
        handymen or general residential contractors). Ask each to bid the
        same scope of work and include:
      </p>
      <ol>
        <li>Itemized labor and material costs</li>
        <li>Cabinet brand, line, and finish</li>
        <li>Countertop material, thickness, and edge profile</li>
        <li>
          Permit costs (required for electrical, plumbing, and structural work
          in Hennepin County — see our{" "}
          <Link href="/blog/minneapolis-kitchen-remodel-permits">
            Minneapolis remodel permits guide
          </Link>
          )
        </li>
        <li>Timeline and payment schedule</li>
      </ol>
      <p>
        Be skeptical of any quote that comes in more than 25% below the others
        — it usually means something is missing from scope or the contractor
        is cutting corners on materials.
      </p>

      <h2>Is It Worth Remodeling a Kitchen in Minneapolis?</h2>
      <p>
        From a pure ROI perspective, a mid-range kitchen remodel in Minneapolis
        returns approximately 70–75 cents on the dollar at resale, according
        to Remodeling Magazine&apos;s 2025 Cost vs. Value report for the
        Minneapolis metro. That&apos;s slightly above the national average.
      </p>
      <p>
        However, ROI alone misses a key point: in competitive neighborhoods
        like Edina, Minnetonka, Wayzata, and parts of St. Paul, an updated
        kitchen can be the difference between a home selling in days vs.
        sitting for months. The intangible value of daily enjoyment of a
        beautiful kitchen also matters.
      </p>

      <h2>Get a Detailed Quote for Your Kitchen Remodel</h2>
      <p>
        Minneapolis Kitchen &amp; Bath provides free, no-obligation quotes for
        kitchen remodeling projects throughout the Twin Cities metro —
        including Minneapolis, St. Paul, Edina, Minnetonka, Eden Prairie,
        Wayzata, and surrounding communities. We pull permits, manage trades,
        and finish on the timeline we promise.
      </p>
    </>
  );
}
