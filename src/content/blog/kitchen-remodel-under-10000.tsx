import Link from "next/link";

export default function Body() {
  return (
    <>
      <p className="lead">
        <strong>
          You can&apos;t do a full kitchen remodel for $10,000, but you can do a
          real cosmetic refresh.
        </strong>{" "}
        In the Twin Cities, $10,000 covers a focused update &mdash; paint or
        reface existing cabinets, new countertops, an updated faucet and
        lighting, hardware, and a backsplash &mdash; as long as the layout and
        appliances stay put and the cabinet boxes are sound.
      </p>

      <h2>A Realistic $10,000 Kitchen Refresh</h2>
      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Update
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Typical cost
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cabinet painting (pro) or new doors", "$3,000–$5,000"],
              ["Laminate or entry quartz counters", "$2,000–$3,500"],
              ["Tile backsplash (material + labor)", "$1,200–$2,500"],
              ["New faucet, sink, hardware", "$600–$1,200"],
              ["Updated lighting (in place)", "$500–$1,200"],
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
      <p>
        Pick two or three of these rather than all of them, and $10,000 makes a
        tired kitchen look dramatically newer. The visual win usually comes from
        cabinets and counters, so prioritize those.
      </p>

      <h2>What $10,000 Will Not Do</h2>
      <ul>
        <li>Replace cabinet boxes (new cabinets start around $9,000 alone)</li>
        <li>Move the sink, range, or fridge to a new location</li>
        <li>Remove a wall or change the layout</li>
        <li>Include a new appliance package</li>
        <li>Add a structural island with plumbing or power</li>
      </ul>

      <h2>How to Stretch $10,000</h2>
      <p>
        Painting solid existing cabinets instead of replacing them is the single
        biggest saver &mdash; it preserves the most expensive component you
        already own. Keep appliances where they are to avoid plumbing and
        electrical work, choose a value countertop (the latest laminates look far
        better than they used to), and do the labor-light items yourself
        (hardware, painting walls) while leaving counters, tile, and electrical
        to the pros.
      </p>
      <p>
        If your cabinets are failing or you want a new layout, $10,000
        won&apos;t get you there &mdash; budget $30,000+ for a layout-in-place
        remodel. See whether your goals fit a refresh or a full remodel in our{" "}
        <Link href="/blog/kitchen-remodel-cost-minneapolis">
          Minneapolis kitchen remodel cost guide
        </Link>{" "}
        and our breakdown of{" "}
        <Link href="/blog/is-30000-enough-kitchen-remodel">
          whether $30,000 is enough for a kitchen remodel
        </Link>
        .
      </p>

      <h2>The Bottom Line</h2>
      <p>
        $10,000 buys a smart cosmetic refresh, not a remodel &mdash; and for many
        Twin Cities kitchens with good bones, a refresh is exactly the right
        call. Want help deciding where to spend it?{" "}
        <Link href="/tools/kitchen-remodel-cost-calculator">
          Run the calculator
        </Link>{" "}
        or <Link href="/contact">get a free quote</Link>.
      </p>
    </>
  );
}
