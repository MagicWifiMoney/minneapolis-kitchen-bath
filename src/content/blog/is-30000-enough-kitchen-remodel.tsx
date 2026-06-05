import Link from "next/link";

export default function Body() {
  return (
    <>
      <p className="lead">
        <strong>
          Yes &mdash; $30,000 is enough for a budget-to-lower-mid kitchen
          remodel in the Twin Cities, but not a full gut of a large kitchen.
        </strong>{" "}
        At $30K you can do a genuine refresh of a small-to-average kitchen:
        semi-custom or refaced cabinets, quartz or laminate counters, new
        appliances, a tile backsplash, and updated lighting &mdash; as long as
        you keep the existing layout. Move walls, relocate plumbing, or add
        custom cabinetry and you&apos;ll push past $30,000 quickly.
      </p>

      <h2>What $30,000 Buys in a Minneapolis Kitchen</h2>
      <p>
        The single biggest factor is whether you keep the layout. Plumbing and
        electrical relocation, wall removal, and structural work are where
        budgets blow up. Hold the footprint and $30K goes a long way. Here&apos;s
        a realistic allocation for a roughly 150 sq ft kitchen:
      </p>

      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Line item
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Typical spend
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cabinets (semi-custom or refacing)", "$9,000–$14,000"],
              ["Countertops (quartz or laminate)", "$2,500–$4,500"],
              ["Appliances (mid-range package)", "$4,000–$6,000"],
              ["Backsplash + tile labor", "$1,500–$3,000"],
              ["Sink, faucet, disposal", "$700–$1,500"],
              ["Lighting + electrical (in place)", "$1,500–$3,000"],
              ["Flooring (if included)", "$2,000–$4,000"],
              ["Paint, hardware, permits, misc.", "$1,500–$3,000"],
            ].map(([item, cost]) => (
              <tr key={item} className="border-b border-gray-200">
                <td className="p-3 border border-gray-200 font-medium">{item}</td>
                <td className="p-3 border border-gray-200 text-green-700 font-semibold">
                  {cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>What $30,000 Will Not Cover</h2>
      <ul>
        <li>Full custom cabinetry (that alone often runs $25,000+)</li>
        <li>Moving the sink, range, or refrigerator to a new wall</li>
        <li>Removing a load-bearing wall to open the kitchen</li>
        <li>High-end appliance packages (Sub-Zero, Wolf, Thermador)</li>
        <li>A large island with added plumbing or electrical</li>
      </ul>

      <h2>How to Make $30K Go Further</h2>
      <p>
        Reface or paint solid existing cabinets instead of replacing the boxes,
        keep the appliances in their current locations, choose a Minnesota-made
        quartz like Cambria at the value end, and avoid trendy tile patterns
        that add labor. If your cabinets are sound, refacing can save
        $5,000&ndash;$10,000 versus new boxes.
      </p>
      <p>
        Want a number tailored to your kitchen&apos;s size, finish level, and
        city? Try our{" "}
        <Link href="/tools/kitchen-remodel-cost-calculator">
          kitchen remodel cost calculator
        </Link>
        , and for the full tier-by-tier breakdown see our{" "}
        <Link href="/blog/kitchen-remodel-cost-minneapolis">
          Minneapolis kitchen remodel cost guide
        </Link>
        . If you&apos;re deciding on counters, our{" "}
        <Link href="/blog/quartz-vs-granite-countertops">
          quartz vs. granite comparison
        </Link>{" "}
        breaks down the value end of each.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        $30,000 is a real budget for a layout-in-place kitchen refresh in the
        Twin Cities &mdash; enough to noticeably modernize an average kitchen and
        protect resale value. For a full gut with custom cabinetry or a new
        layout, plan on $45,000 and up. Not sure which camp your project is in?{" "}
        <Link href="/contact">Get a free quote</Link> and we&apos;ll give you an
        honest read before you commit.
      </p>
    </>
  );
}
