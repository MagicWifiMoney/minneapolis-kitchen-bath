import Link from "next/link";

export default function Body() {
  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10 not-prose">
        <h2 className="text-lg font-semibold text-amber-900 mb-3">
          📊 2026 Minneapolis Bathroom Remodel Cost Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              tier: "Powder Room / Half Bath",
              range: "$8,000–$18,000",
              desc: "New vanity, toilet, fixtures, flooring, lighting. No tile shower.",
            },
            {
              tier: "Full Hall Bath",
              range: "$18,000–$45,000",
              desc: "Tile shower or tub surround, vanity, toilet, fixtures, tile floor, lighting.",
            },
            {
              tier: "Primary Suite",
              range: "$45,000–$100,000+",
              desc: "Custom tile shower, freestanding tub, double vanity, premium fixtures, heated floors.",
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

      <h2>What Bathroom Remodels Actually Cost in the Twin Cities</h2>
      <p>
        Bathroom remodels are smaller in square footage than kitchens, but
        they&apos;re plumbing-dense, tile-heavy, and detail-oriented — which
        means the per-square-foot cost is often <em>higher</em> than a
        kitchen. A 45 sq ft hall bathroom can easily cost $25,000 once you
        include a tiled shower, new fixtures, and proper waterproofing.
      </p>
      <p>
        The five biggest cost drivers in a Minneapolis bathroom remodel are:{" "}
        <strong>tile work and waterproofing</strong> (25–35% of budget),{" "}
        <strong>labor</strong> (25–35%), <strong>vanity and fixtures</strong>{" "}
        (15–20%), <strong>plumbing</strong> (10–15%), and{" "}
        <strong>flooring</strong> (8–12%).
      </p>

      <h2>Tile Shower Cost in Minneapolis (2026)</h2>
      <p>
        A real tile shower — built on a Schluter-Kerdi or similar
        waterproofing system, not the old green-board and mortar method —
        runs $4,000–$10,000 in labor alone in the Twin Cities. Add materials:
      </p>
      <ul>
        <li>
          <strong>Standard 36&quot;×60&quot; alcove tile shower:</strong>{" "}
          $8,000–$15,000 total (mid-range tile, no niche)
        </li>
        <li>
          <strong>Walk-in tile shower with bench &amp; niche:</strong>{" "}
          $12,000–$25,000 total
        </li>
        <li>
          <strong>Large walk-in primary shower with frameless glass:</strong>{" "}
          $20,000–$45,000 total
        </li>
        <li>
          <strong>Curbless walk-in (zero-entry) shower:</strong>{" "}
          $25,000–$50,000+ total
        </li>
      </ul>
      <p>
        The biggest variable is tile choice and pattern complexity. Standard
        white subway tile in a running bond pattern runs $4–$8/sq ft for
        materials. Large-format porcelain or zellige can hit $15–$30+/sq ft.
        Pattern complexity (herringbone, chevron, mosaics) adds 20–40% to
        labor.
      </p>

      <h2>Vanity Costs</h2>
      <div className="not-prose overflow-x-auto mb-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Vanity Type
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Total Installed
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Big-box prefab single (30–36\")", "$800–$2,000", "Solid surface or laminate top included"],
              ["Mid-range prefab single", "$1,500–$3,500", "Better drawer construction, real stone top"],
              ["Semi-custom single", "$3,000–$7,000", "Choice of paint/stain, dovetail drawers"],
              ["Custom single", "$5,000–$12,000+", "Inset doors, any species and finish"],
              ["Custom double", "$9,000–$22,000+", "Most common in primary suites"],
            ].map(([type, cost, note]) => (
              <tr key={type} className="border-b border-gray-200">
                <td className="p-3 border border-gray-200 font-medium">
                  {type}
                </td>
                <td className="p-3 border border-gray-200 text-green-700 font-semibold">
                  {cost}
                </td>
                <td className="p-3 border border-gray-200 text-gray-600">
                  {note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Fixtures, Faucets &amp; Lighting</h2>
      <p>
        Plumbing fixtures and lighting are the easiest place to save or splurge
        in a bathroom remodel. Twin Cities homeowners typically budget:
      </p>
      <ul>
        <li>
          <strong>Toilet:</strong> $300–$1,200 (one-piece elongated, $500–$700
          is the sweet spot)
        </li>
        <li>
          <strong>Vanity faucet:</strong> $150–$600 each (Delta, Moen,
          Brizo, Kohler)
        </li>
        <li>
          <strong>Shower system:</strong> $400–$2,000 (basic to thermostatic
          rain head + handheld combos)
        </li>
        <li>
          <strong>Freestanding tub:</strong> $1,200–$4,500 (acrylic) or
          $4,000–$10,000+ (stone resin or cast iron)
        </li>
        <li>
          <strong>Bath fan:</strong> $200–$600 (Panasonic WhisperGreen is the
          standard upgrade)
        </li>
        <li>
          <strong>Vanity lighting + fixtures:</strong> $400–$1,500 total
        </li>
      </ul>

      <h2>Labor Costs for Minneapolis Bathroom Remodels</h2>
      <p>
        Bathroom labor in the Twin Cities market in 2026:
      </p>
      <ul>
        <li>
          <strong>Plumber:</strong> $150–$250/hr. Relocating drains or moving
          a toilet flange can add $1,500–$4,000.
        </li>
        <li>
          <strong>Electrician:</strong> $120–$200/hr. New GFCI circuits and
          fan/light wiring usually run $600–$1,500 per bath.
        </li>
        <li>
          <strong>Tile setter:</strong> $12–$25/sq ft labor only (more for
          complex patterns, herringbone, or stone)
        </li>
        <li>
          <strong>Waterproofing system (Schluter-Kerdi):</strong>{" "}
          $1,500–$3,500 in materials and install for a typical shower
        </li>
      </ul>

      <h2>How Long Does a Minneapolis Bathroom Remodel Take?</h2>
      <p>
        Once materials are in:
      </p>
      <ul>
        <li>
          <strong>Powder room:</strong> 1–2 weeks of on-site work
        </li>
        <li>
          <strong>Full hall bath:</strong> 3–4 weeks
        </li>
        <li>
          <strong>Primary suite with tiled shower &amp; tub:</strong> 4–6
          weeks
        </li>
      </ul>
      <p>
        Add 2–4 weeks of material lead time (longer if custom vanity is
        involved) for total project timelines of 5–10 weeks.
      </p>

      <h2>Where to Save and Where to Splurge</h2>
      <p>
        After hundreds of Twin Cities bathrooms, here&apos;s where the money
        actually matters and where you can pull back without anyone noticing.
      </p>
      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Splurge here
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Save here
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Waterproofing & the shower valve — failures here are catastrophic and behind tile",
                "Field tile — a $5/sq ft porcelain looks great next to a pricier accent",
              ],
              [
                "An accurate, well-installed exhaust fan (Panasonic) — moisture is the enemy in MN",
                "Toilet — a $500–$700 elongated one-piece performs like a $1,200 one",
              ],
              [
                "Vanity drawers & soft-close hardware you touch daily",
                "Mirror & accessories — easy to upgrade later for a fraction of the cost",
              ],
            ].map(([splurge, save]) => (
              <tr key={splurge} className="border-b border-gray-200 align-top">
                <td className="p-3 border border-gray-200 text-gray-700">
                  {splurge}
                </td>
                <td className="p-3 border border-gray-200 text-gray-700">
                  {save}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Want a number tailored to your size, finish level, and city? Try our{" "}
        <Link href="/tools/bathroom-remodel-cost-calculator">
          bathroom remodel cost calculator
        </Link>{" "}
        for a low/mid/high estimate in under a minute.
      </p>

      <h2>Bathroom Remodel ROI in Minneapolis</h2>
      <p>
        Mid-range bathroom remodels return approximately 65–70% of cost at
        resale in the Minneapolis metro, per Remodeling Magazine&apos;s
        2025 Cost vs. Value. Adding a primary suite bathroom where there
        wasn&apos;t one (e.g., creating an ensuite from a closet adjacent to
        the primary bedroom) routinely returns over 100% of cost in
        higher-end neighborhoods like Edina, Minnetonka, and Wayzata.
      </p>

      <h2>Ready to Plan Your Bathroom Remodel?</h2>
      <p>
        We provide detailed, fixed-price bathroom remodel quotes throughout
        the Twin Cities. Most quotes are delivered within 48 hours of an
        in-home consultation. Check{" "}
        <Link href="/services/bathroom-remodeling">
          our bathroom remodeling page
        </Link>{" "}
        for our full process, or{" "}
        <Link href="/blog/bathroom-tile-trends-2026">
          see what tile trends we&apos;re installing
        </Link>{" "}
        in 2026.
      </p>
    </>
  );
}
