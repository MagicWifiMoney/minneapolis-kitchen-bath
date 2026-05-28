import Link from "next/link";

export default function Body() {
  return (
    <>
      <p>
        Kitchen remodels are one of the highest-ROI home improvements you can
        make in the Minneapolis metro — but the actual return varies more
        than national averages suggest. Here&apos;s what Twin Cities
        homeowners are actually getting back at resale in 2026, broken down
        by remodel scope and neighborhood.
      </p>

      <h2>2026 ROI Summary (Minneapolis Metro)</h2>
      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Remodel Type
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Typical Cost
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Resale Recovery
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                ROI
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Minor refresh (paint, hardware, counters)", "$15,000–$25,000", "$13,000–$22,000", "85–90%"],
              ["Mid-range full remodel", "$45,000–$70,000", "$32,000–$52,000", "70–75%"],
              ["High-end custom remodel", "$90,000–$150,000+", "$50,000–$90,000", "55–60%"],
              ["Adding a kitchen (basement, ADU)", "$35,000–$70,000", "$60,000–$120,000+", "150–170%"],
            ].map(([type, cost, recover, roi]) => (
              <tr key={type} className="border-b border-gray-200">
                <td className="p-3 border border-gray-200 font-medium">
                  {type}
                </td>
                <td className="p-3 border border-gray-200">{cost}</td>
                <td className="p-3 border border-gray-200">{recover}</td>
                <td className="p-3 border border-gray-200 text-green-700 font-semibold">
                  {roi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-2">
          Based on Remodeling Magazine 2025 Cost vs. Value (Minneapolis MSA)
          and local real-estate transaction data.
        </p>
      </div>

      <h2>Why Minor Refreshes Beat Full Remodels on ROI</h2>
      <p>
        A $20,000 cabinet-paint-and-counter swap routinely returns 85–90% at
        resale, while a $100,000 custom remodel might return 55%. Buyers
        don&apos;t pay you back for premium finishes they wouldn&apos;t have
        picked themselves — they pay you for a kitchen that doesn&apos;t need
        to be redone.
      </p>
      <p>
        If your kitchen looks dated but functions well, a refresh is almost
        always better ROI than a full remodel. If your kitchen functions
        poorly (wrong layout, bad workflow, no island where one belongs),
        the full remodel is worth it for the daily quality-of-life
        improvement — just don&apos;t expect to get all the money back at
        sale.
      </p>

      <h2>Neighborhood-by-Neighborhood Variation</h2>
      <p>
        ROI varies significantly by neighborhood:
      </p>
      <ul>
        <li>
          <strong>Edina, Minnetonka, Wayzata:</strong> Buyers expect updated
          kitchens. An old kitchen actively hurts your sale. ROI is closer
          to 80% on mid-range remodels because the alternative is selling
          for $30K–$50K below comps. Strongly worth doing.
        </li>
        <li>
          <strong>Minneapolis (Linden Hills, Kenwood, Northeast):</strong>{" "}
          Buyers value original character — they want a renovated kitchen,
          but not at the expense of the rest of the house feeling
          out-of-period. Stay tasteful and ROI is strong (75%+).
        </li>
        <li>
          <strong>Bloomington, Eagan, Burnsville:</strong> Mid-market buyers
          care about updated kitchens but won&apos;t pay luxury prices.
          Mid-range remodel returns 70–75%; high-end finishes lose money
          relative to the neighborhood comp ceiling.
        </li>
        <li>
          <strong>Plymouth, Maple Grove, Eden Prairie:</strong> Recent-build
          suburbs where buyers expect contemporary finishes. Updating dated
          1990s–2000s kitchens returns strongly (~80%).
        </li>
      </ul>

      <h2>The Highest-ROI Specific Upgrades</h2>
      <p>
        Within a remodel, some line items return more than others:
      </p>
      <ol>
        <li>
          <strong>Cabinet doors + paint (existing boxes):</strong> 95%+
          ROI. Refacing $5,000 of cabinets often adds $5,000–$8,000 of
          perceived value.
        </li>
        <li>
          <strong>Quartz countertops over laminate:</strong> 80–90% ROI.
          Buyers immediately notice and value this.
        </li>
        <li>
          <strong>Hardwood floor (or LVP) replacing vinyl/linoleum:</strong>{" "}
          85% ROI.
        </li>
        <li>
          <strong>Updated fixtures and lighting:</strong> 90%+ ROI. Cheapest
          upgrade with biggest visual impact.
        </li>
        <li>
          <strong>Range hood (visible, not microwave-over-range):</strong>{" "}
          70%+ ROI. Signals &quot;real cooking happens here.&quot;
        </li>
        <li>
          <strong>Island addition (where layout permits):</strong> 75–80%
          ROI. Buyers love kitchens with islands.
        </li>
      </ol>

      <h2>Lower-ROI Upgrades (Do These for Yourself, Not Resale)</h2>
      <ul>
        <li>
          <strong>Pro-grade Sub-Zero / Wolf appliance suite ($30K+):</strong>{" "}
          Buyers won&apos;t pay you back. Worth it only if you cook seriously
          and plan to stay 7+ years.
        </li>
        <li>
          <strong>Custom inset cabinetry over semi-custom:</strong> Beautiful
          but $15–$25K premium that buyers rarely recognize.
        </li>
        <li>
          <strong>Top-tier counters (Calacatta marble, exotic quartzite):</strong>{" "}
          A $12K countertop reads the same to most buyers as a $6K
          countertop.
        </li>
        <li>
          <strong>Smart-home integration:</strong> Buyers expect basics
          (smart thermostat, video doorbell), don&apos;t pay for premium
          systems.
        </li>
      </ul>

      <h2>Adding a Kitchen Is the ROI Outlier</h2>
      <p>
        The most lopsided ROI play in the Twin Cities is{" "}
        <strong>adding a kitchen where one didn&apos;t exist</strong> — most
        commonly in basements (legal ADU conversion) or detached
        accessory units. A $50,000 basement kitchen + bath conversion in
        Minneapolis routinely adds $80,000–$120,000+ to home value because
        it converts a basement into a legal rental or ADU.
      </p>
      <p>
        Minneapolis ADU rules (changed in 2018, expanded in 2023) make this
        especially attractive in the city proper. Saint Paul allows ADUs
        too with somewhat tighter restrictions.
      </p>

      <h2>Timeline From Remodel to Sale</h2>
      <p>
        ROI depreciates surprisingly slowly. A kitchen remodel done within
        the last 10 years still reads as &quot;updated&quot; to most buyers,
        and even 15-year-old remodels in classic styles (white shaker,
        quartz) still hold most of their value.
      </p>
      <p>
        Where ROI drops fast: trend-heavy remodels (heavy oak panelling,
        polished granite islands, gloss white euro-style) age in 5–7 years
        and need to be redone before sale. Stick to classic finishes if
        you&apos;re remodeling within 5 years of a planned sale.
      </p>

      <p>
        For the full cost picture, see our{" "}
        <Link href="/blog/kitchen-remodel-cost-minneapolis">
          Minneapolis kitchen remodel cost guide
        </Link>{" "}
        and our{" "}
        <Link href="/blog/kitchen-cabinet-brands-twin-cities">
          cabinet brands buying guide
        </Link>
        .
      </p>
    </>
  );
}
