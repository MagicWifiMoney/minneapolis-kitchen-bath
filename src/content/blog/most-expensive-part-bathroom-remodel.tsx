import Link from "next/link";

export default function Body() {
  return (
    <>
      <p className="lead">
        <strong>
          The tiled shower is the most expensive part of a bathroom remodel.
        </strong>{" "}
        Between waterproofing, tile material, and the slow, skilled labor it
        takes to set tile correctly, a custom tile shower routinely accounts for
        30&ndash;50% of a Twin Cities bathroom budget. Labor overall &mdash;
        across plumbing, tile, and electrical &mdash; is the real driver, which
        is why a small bathroom can still cost a lot.
      </p>

      <h2>Where the Money Goes</h2>
      <p>
        Bathrooms are plumbing-dense and tile-heavy in a tiny footprint, so cost
        is concentrated in a few high-skill items rather than spread across
        square footage:
      </p>

      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Element
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Share of budget
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Why it costs
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Tiled shower + waterproofing", "30–50%", "Skilled labor, waterproofing system, tile"],
              ["Labor (plumbing, tile, electrical)", "25–35%", "Trade rates of $120–$250/hr"],
              ["Vanity + countertop", "15–20%", "Cabinetry and stone top"],
              ["Plumbing fixtures + relocation", "10–15%", "Moving drains/supply adds $1,500–$4,000"],
              ["Flooring + finishes", "8–12%", "Tile, paint, trim, accessories"],
            ].map(([el, share, why]) => (
              <tr key={el} className="border-b border-gray-200 align-top">
                <td className="p-3 border border-gray-200 font-medium">{el}</td>
                <td className="p-3 border border-gray-200 text-green-700 font-semibold">
                  {share}
                </td>
                <td className="p-3 border border-gray-200 text-gray-600">{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Why the Shower Dominates</h2>
      <p>
        A real tile shower is built in layers: a waterproofing system (we use
        Schluter-Kerdi), a sloped pan, then tile set by hand. A standard alcove
        tile shower runs $8,000&ndash;$15,000; a walk-in with a bench and niche
        runs $12,000&ndash;$25,000; and a curbless (zero-entry) shower with
        frameless glass can reach $25,000&ndash;$50,000+. Pattern complexity
        &mdash; herringbone, chevron, mosaics &mdash; adds 20&ndash;40% to tile
        labor on top of that.
      </p>
      <p>
        This is also the part you least want to cut corners on. A shower that
        leaks behind the tile is the most expensive failure in the house. Our{" "}
        <Link href="/blog/tile-shower-waterproofing-guide">
          tile shower waterproofing guide
        </Link>{" "}
        explains why the hidden layer matters more than the tile you see.
      </p>

      <h2>Where to Save Instead</h2>
      <ul>
        <li>
          Use an affordable field tile ($5&ndash;$8/sq ft) and spend on one
          accent rather than premium tile everywhere.
        </li>
        <li>
          Keep fixtures in place &mdash; relocating a toilet flange or drain adds
          $1,500&ndash;$4,000.
        </li>
        <li>
          Choose a $500&ndash;$700 one-piece toilet; it performs like a $1,200
          one.
        </li>
        <li>
          Splurge on the waterproofing and the exhaust fan; save on the mirror
          and accessories you can upgrade later.
        </li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>
        Budget the tiled shower as the headline cost of any bathroom remodel,
        and treat its waterproofing as non-negotiable. For full pricing by
        bathroom type, see our{" "}
        <Link href="/blog/bathroom-remodel-cost-minneapolis">
          Minneapolis bathroom remodel cost guide
        </Link>{" "}
        or estimate your project with the{" "}
        <Link href="/tools/bathroom-remodel-cost-calculator">
          bathroom remodel cost calculator
        </Link>
        . Ready for a real number?{" "}
        <Link href="/contact">Request a free quote</Link>.
      </p>
    </>
  );
}
