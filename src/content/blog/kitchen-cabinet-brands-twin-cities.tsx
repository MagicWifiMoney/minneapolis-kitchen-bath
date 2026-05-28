import Link from "next/link";

export default function Body() {
  return (
    <>
      <p>
        Cabinets are the single biggest cost in a kitchen remodel — typically
        30–40% of the budget — and the choice you have the most options on.
        Here&apos;s an honest contractor&apos;s take on the cabinet brands
        available in the Twin Cities, organized by price tier and including
        what we actually recommend.
      </p>

      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Tier
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Brand
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Cost (avg kitchen)
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Lead time
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Budget", "IKEA Sektion", "$3,500–$8,000", "2–4 weeks"],
              ["Budget", "Home Depot in-stock", "$3,000–$7,000", "1–2 weeks"],
              ["Budget+", "KraftMaid (HD/Lowe's)", "$8,000–$18,000", "5–7 weeks"],
              ["Mid-range", "Schuler (Lowe's)", "$10,000–$22,000", "6–8 weeks"],
              ["Mid-range", "Diamond / Yorktowne", "$10,000–$22,000", "5–7 weeks"],
              ["Mid-range+", "Showplace", "$12,000–$26,000", "6–8 weeks"],
              ["Premium", "Wood-Mode / Brookhaven", "$25,000–$50,000", "8–12 weeks"],
              ["Premium", "Plain English / deVOL", "$40,000–$100,000+", "12–20 weeks"],
              ["Premium", "Local custom (e.g., StyleCraft)", "$25,000–$60,000", "6–10 weeks"],
            ].map(([tier, brand, cost, lead]) => (
              <tr key={brand} className="border-b border-gray-200">
                <td className="p-3 border border-gray-200 font-medium text-gray-600">
                  {tier}
                </td>
                <td className="p-3 border border-gray-200 font-semibold">
                  {brand}
                </td>
                <td className="p-3 border border-gray-200 text-green-700 font-semibold">
                  {cost}
                </td>
                <td className="p-3 border border-gray-200 text-gray-600">
                  {lead}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Budget Tier ($3,000–$8,000)</h2>
      <h3>IKEA Sektion</h3>
      <p>
        Genuinely better than its reputation. Frameless boxes, soft-close
        Blum hardware, dozens of door styles via aftermarket fronts
        (Semihandmade, Kokeena). Best for: rental properties, basement
        kitchens, ADUs, or homeowners with strong DIY skills. Limitations:
        cabinet sizing is on a strict 15&quot;/20&quot;/30&quot;/40&quot;
        module, so layouts have to flex to the cabinet rather than the
        cabinet to the layout.
      </p>
      <h3>Home Depot in-stock (Hampton Bay, Diamond Now)</h3>
      <p>
        Available immediately off the shelf. Lower-end MDF construction.
        Reasonable for very tight budgets, but the finishes and hardware
        feel cheap within a few years. We&apos;d skip these unless budget
        is the absolute driver.
      </p>

      <h2>Mid-Range ($10,000–$25,000)</h2>
      <p>
        This is where most Twin Cities kitchens land. The big mid-range
        brands are all owned by MasterBrand or Cabinetworks Group, with
        similar construction and quality. The differences are in door
        styles, finish options, and which big box retailer carries them.
      </p>
      <h3>Schuler (Lowe&apos;s)</h3>
      <p>
        Our most-recommended mid-range option. Full-overlay or inset options,
        good finish quality, decent paint, and Lowe&apos;s pricing is often
        competitive. 6–8 week lead times are reliable.
      </p>
      <h3>Diamond / Yorktowne (independent dealers)</h3>
      <p>
        Similar quality to Schuler, sometimes with better pricing through
        independent dealers. Diamond has been our go-to for budget-conscious
        clients who still want painted shaker.
      </p>
      <h3>KraftMaid (Home Depot)</h3>
      <p>
        Very wide door style and color selection. Quality is good but
        sometimes inconsistent — we&apos;ve had occasional finish issues.
        Customer service through Home Depot can be slow to resolve issues.
      </p>
      <h3>Showplace</h3>
      <p>
        A small step up from Schuler and Diamond. Better hardware
        (BLUM soft-close standard), more finish options. Worth the premium
        if budget allows.
      </p>

      <h2>Premium ($25,000–$100,000+)</h2>
      <h3>Local custom shops</h3>
      <p>
        Several Twin Cities custom cabinet shops produce exceptional work
        at premium-but-not-insane pricing. StyleCraft Custom Cabinetry
        (Vadnais Heights), Northland Cabinets, and a handful of smaller
        custom builders compete favorably with semi-custom brands for
        kitchens that need true custom dimensions or inset doors. Lead times
        are usually 6–10 weeks — faster than national premium brands.
      </p>
      <h3>Wood-Mode / Brookhaven</h3>
      <p>
        The classic American premium brand. Excellent build quality,
        beautiful finishes, broad selection. Brookhaven is the slightly more
        affordable line of Wood-Mode. Available through several Twin Cities
        showrooms. Lead times are long (10–12 weeks).
      </p>
      <h3>Plain English &amp; deVOL</h3>
      <p>
        UK-imported &quot;English cottage&quot; style cabinetry. Stunning
        and unique, but expensive ($40K–$100K+ for a kitchen), and lead
        times are 4–5 months. Worth it for the very specific aesthetic, but
        most clients can get 90% of the look with a local custom shop and a
        bench-style mullion door.
      </p>

      <h2>What to Skip</h2>
      <ul>
        <li>
          <strong>Builder-grade unbranded cabinets from kitchen showrooms.</strong>{" "}
          Often re-badged imports from China or Vietnam. Hard to get
          replacement parts.
        </li>
        <li>
          <strong>RTA (Ready-to-Assemble) online-only brands.</strong>{" "}
          The savings disappear once you factor in install complexity and
          warranty risk.
        </li>
        <li>
          <strong>&quot;Refacing&quot; on cabinets older than 25 years.</strong>{" "}
          The boxes are usually too tired to be worth the door investment.
          Just replace.
        </li>
      </ul>

      <h2>Quick Decision Framework</h2>
      <ul>
        <li>
          Budget under $40K total kitchen → <strong>IKEA + Semihandmade
          fronts</strong> or <strong>Diamond</strong>
        </li>
        <li>
          Mid-range $40–80K total kitchen → <strong>Schuler</strong> or{" "}
          <strong>Showplace</strong>
        </li>
        <li>
          Inset doors, unusual sizes, $80K+ total kitchen →{" "}
          <strong>Local custom shop</strong>
        </li>
        <li>
          Top-of-market, $150K+ total kitchen →{" "}
          <strong>Wood-Mode</strong> or specialty UK import
        </li>
      </ul>

      <p>
        See our{" "}
        <Link href="/blog/kitchen-remodel-cost-minneapolis">
          Minneapolis kitchen remodel cost guide
        </Link>{" "}
        for how cabinet cost fits the overall budget, or{" "}
        <Link href="/services/custom-cabinetry">our custom cabinetry page</Link>{" "}
        for our process and partners.
      </p>
    </>
  );
}
