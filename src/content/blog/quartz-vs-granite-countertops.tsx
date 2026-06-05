import Link from "next/link";

export default function Body() {
  return (
    <>
      <p>
        If you&apos;re planning a kitchen remodel in Minneapolis or the Twin
        Cities, the countertop decision usually comes down to two materials:
        <strong> quartz</strong> (engineered stone like Cambria, Silestone,
        MSI) and <strong>granite</strong> (natural stone). Both are
        excellent, but they fit different kitchens and homeowners. Here&apos;s
        a head-to-head comparison based on what we actually see installed in
        Twin Cities homes.
      </p>

      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Factor
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Quartz
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Granite
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cost installed", "$55–$95/sq ft", "$45–$85/sq ft"],
              ["Maintenance", "None (non-porous)", "Annual sealing recommended"],
              ["Heat resistance", "Avoid pots over 300°F", "Excellent — set hot pans directly"],
              ["Stain resistance", "Excellent", "Good with sealer; can stain"],
              ["Scratch resistance", "Excellent", "Excellent"],
              ["Pattern consistency", "Consistent (engineered)", "Each slab unique"],
              ["Color options", "Hundreds", "Limited by quarry"],
              ["Outdoor use", "No (UV fades)", "Yes"],
              ["Resale appeal in MN", "Strong", "Strong"],
              ["Local sourcing", "Cambria (MN-made)", "Imported"],
            ].map(([factor, q, g]) => (
              <tr key={factor} className="border-b border-gray-200">
                <td className="p-3 border border-gray-200 font-medium">
                  {factor}
                </td>
                <td className="p-3 border border-gray-200 text-gray-700">
                  {q}
                </td>
                <td className="p-3 border border-gray-200 text-gray-700">
                  {g}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>What Is Quartz, Actually?</h2>
      <p>
        Despite the name, quartz countertops are <em>not</em> solid quartz.
        They&apos;re engineered stone — typically 90–93% crushed natural
        quartz aggregate bound with 7–10% polymer resin and pigment, then
        pressed and cured into slabs. The result is non-porous (no sealing
        ever), highly stain-resistant, and visually consistent.
      </p>
      <p>
        The big names in the Minneapolis market are <strong>Cambria</strong>{" "}
        (made in Le Sueur, MN — a real local advantage),{" "}
        <strong>Silestone</strong>, and <strong>MSI Q-Quartz</strong>.
        Imported brands like Caesarstone and Hanstone are also available but
        less common locally.
      </p>

      <h2>What Is Granite, Actually?</h2>
      <p>
        Granite is 100% natural stone, quarried in massive blocks (most
        coming to the Twin Cities from Brazil, India, and Italy), then sliced
        into slabs and polished. Because it&apos;s natural, every slab is
        unique — you actually pick the specific slab your countertops will
        come from at the fabricator&apos;s yard.
      </p>
      <p>
        Granite is porous, which means it needs sealing — typically once a
        year for the first few years, then every 2–3 years after. It&apos;s
        also more heat-resistant than quartz (no resin to soften), so you can
        actually set a hot pot directly on it.
      </p>

      <h2>When to Choose Quartz</h2>
      <p>You should pick quartz if:</p>
      <ul>
        <li>You want zero maintenance and never want to think about sealing</li>
        <li>You want consistent patterning (especially for waterfall edges or large islands)</li>
        <li>You&apos;re committed to a specific color or look (white with grey veining, solid colors, etc.)</li>
        <li>You have kids and need maximum stain resistance against grape juice, wine, turmeric</li>
        <li>You want to support a Minnesota-made product (Cambria)</li>
      </ul>

      <h2>When to Choose Granite</h2>
      <p>You should pick granite if:</p>
      <ul>
        <li>
          You love natural stone — the variability, the depth, the &quot;wow
          slab&quot; moment in a kitchen
        </li>
        <li>You routinely cook with very hot pans straight off the stove</li>
        <li>
          You have an outdoor kitchen or 3-season porch (quartz can&apos;t go
          outside — UV breaks down the resin)
        </li>
        <li>
          You want a unique look — granite slabs are one-of-a-kind, and
          you&apos;ll be the only kitchen with yours
        </li>
        <li>You&apos;re budget-conscious and want premium-looking stone at the lower end of the range</li>
      </ul>

      <h2>What About Quartzite?</h2>
      <p>
        Quartzite (not quartz!) is a third option that&apos;s grown
        significantly in popularity in Twin Cities kitchens. It&apos;s a
        natural metamorphic stone that looks similar to marble but is much
        harder. It needs sealing like granite, but the look — soft veining,
        white-to-grey palette — is closer to marble. Expect $80–$140/sq ft
        installed.
      </p>
      <p>
        We&apos;re installing more quartzite every year in Edina, Wayzata,
        and Minnetonka kitchens where homeowners want a marble look without
        the marble fragility.
      </p>

      <h2>What It Actually Costs for a Real Twin Cities Kitchen</h2>
      <p>
        Per-square-foot numbers are useful for comparison, but they hide what
        you&apos;ll actually write a check for. A typical Twin Cities kitchen
        has <strong>40&ndash;55 square feet</strong> of countertop once you
        count the perimeter runs plus an island. Here&apos;s how that translates
        installed, including fabrication, edge profile, cutouts, and a standard
        undermount sink cutout.
      </p>

      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Material
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                ~45 sq ft kitchen
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                With a large island (~60 sq ft)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Quartz (Cambria / Silestone)", "$3,000–$4,300", "$4,000–$5,700"],
              ["Granite", "$2,400–$3,800", "$3,200–$5,100"],
              ["Quartzite", "$3,600–$6,300", "$4,800–$8,400"],
              ["Butcher block (perimeter) + stone island", "$2,200–$3,500", "—"],
            ].map(([m, a, b]) => (
              <tr key={m} className="border-b border-gray-200">
                <td className="p-3 border border-gray-200 font-medium">{m}</td>
                <td className="p-3 border border-gray-200 text-gray-700">{a}</td>
                <td className="p-3 border border-gray-200 text-gray-700">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Want the whole-kitchen picture instead of just counters? Run the numbers
        in our{" "}
        <Link href="/tools/kitchen-remodel-cost-calculator">
          kitchen remodel cost calculator
        </Link>{" "}
        or read the full{" "}
        <Link href="/blog/kitchen-remodel-cost-minneapolis">
          Minneapolis kitchen remodel cost guide
        </Link>
        .
      </p>

      <h2>Daily Living: What Each Material Is Like to Own</h2>
      <p>
        Spec sheets don&apos;t tell you what a countertop feels like five years
        in. Here&apos;s what we hear back from Twin Cities homeowners.
      </p>
      <p>
        <strong>Quartz</strong> is the &quot;forget about it&quot; surface. No
        sealing, wipe with soap and water, and it shrugs off the red-wine and
        turmeric spills that terrify granite owners. The two real-world
        cautions: don&apos;t set a screaming-hot cast-iron pan straight from the
        burner onto it (the resin can scorch or discolor &mdash; always use a
        trivet), and direct sun on a south-facing window over years can fade
        some darker pigments, which is why quartz can&apos;t go in a
        three-season porch.
      </p>
      <p>
        <strong>Granite</strong> rewards a little ritual. Once or twice a year
        you wipe on a sealer &mdash; ten minutes for a whole kitchen &mdash; and
        in exchange you get a surface you can pull a roast straight out of the
        oven onto. The honest downside is the porous corners: an unsealed
        granite top near the coffee station will eventually show a faint ring
        from a leaky travel mug. Seal it and that disappears.
      </p>

      <h2>Edge Profiles &amp; Thickness</h2>
      <p>
        The edge you pick changes both the price and the feel of the kitchen.
        In the Twin Cities right now the clear favorite is a clean{" "}
        <strong>eased or square (&quot;mitered&quot;) edge</strong> on a
        thick-looking slab, which reads modern and is what photographs well for
        resale. Bullnose and ogee edges still suit traditional and
        Victorian-era homes in Summit Avenue or Linden Hills, but they date a
        contemporary kitchen quickly.
      </p>
      <ul>
        <li>
          <strong>Standard 3 cm slab, eased edge:</strong> included in most
          quotes &mdash; the safe default.
        </li>
        <li>
          <strong>Mitered edge (built up to 2&quot;&ndash;4&quot; apron):</strong>{" "}
          adds roughly $20&ndash;$40/linear foot but gives a high-end waterfall
          or thick-counter look without paying for a thicker slab.
        </li>
        <li>
          <strong>Waterfall island sides:</strong> stunning in quartz (the
          pattern matches seamlessly); budget an extra $900&ndash;$2,000
          depending on slab.
        </li>
      </ul>

      <h2>What About Sintered Stone &amp; Porcelain Slab?</h2>
      <p>
        A fourth option worth knowing about: ultra-compact sintered surfaces
        like <strong>Dekton</strong> and porcelain slabs. They&apos;re fully
        UV-stable (so they <em>can</em> go in an outdoor or porch kitchen),
        nearly indestructible against heat and scratches, and increasingly
        common in modern Edina and Wayzata builds. The trade-offs are cost
        ($90&ndash;$150/sq ft installed) and the fact that fewer local
        fabricators cut them well &mdash; ask to see a finished edge before you
        commit.
      </p>

      <h2>Resale Impact in Minneapolis</h2>
      <p>
        From a resale perspective in the Twin Cities market, both quartz and
        granite are clearly &quot;updated&quot; finishes — buyers will respond
        well to either. <strong>Laminate</strong> is the only material that
        actively hurts resale at any price point above $400K.
      </p>
      <p>
        For kitchens you&apos;re planning to sell within 5 years, white or
        light-grey quartz is the safest bet — it photographs beautifully for
        listing photos and matches the broadest range of buyer tastes.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        For most Minneapolis kitchens, quartz wins on practical grounds: no
        maintenance, consistent pattern, hundreds of color options, and a
        Minnesota-made option (Cambria) that&apos;s often cost-competitive
        with imported brands.
      </p>
      <p>
        Granite wins for natural-stone lovers, hot-pot cooks, and outdoor
        kitchens. Quartzite splits the difference for marble-look kitchens.
      </p>
      <p>
        For more on what counters cost in a complete remodel, see our{" "}
        <Link href="/blog/kitchen-remodel-cost-minneapolis">
          Minneapolis kitchen remodel cost guide
        </Link>{" "}
        — and our{" "}
        <Link href="/services/countertops">countertop installation page</Link>{" "}
        for our process.
      </p>
    </>
  );
}
