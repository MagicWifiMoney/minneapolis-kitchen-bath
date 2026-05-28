import Link from "next/link";

export default function Body() {
  return (
    <>
      <p>
        Almost every kitchen or bathroom remodel in the Twin Cities metro
        requires a permit. The exact rules vary slightly by city, but the
        general principle is the same: any project that touches plumbing,
        electrical, gas, or structural elements — or that exceeds a dollar
        threshold (usually $1,000–$5,000) — needs a building permit and
        related trade permits.
      </p>
      <p>
        Here&apos;s a straightforward breakdown for the metro&apos;s biggest
        cities.
      </p>

      <h2>What Triggers a Permit</h2>
      <p>You almost certainly need a permit if your project includes:</p>
      <ul>
        <li>Moving plumbing fixtures (sink, dishwasher, toilet location changes)</li>
        <li>Running new electrical circuits (new outlets, lighting, dedicated appliance circuits)</li>
        <li>Removing or moving walls (load-bearing or not)</li>
        <li>Adding or relocating gas appliances</li>
        <li>Replacing windows or doors (sometimes)</li>
        <li>Total project cost exceeding the city&apos;s threshold (typically $1,000–$5,000)</li>
      </ul>
      <p>
        Cosmetic-only work — painting, swapping a faucet or vanity in the
        same footprint, replacing a dishwasher, swapping cabinets without
        plumbing or electrical changes — usually does <em>not</em> require a
        permit. When in doubt, call the city.
      </p>

      <h2>Minneapolis</h2>
      <p>
        Handled by <strong>Community Planning and Economic Development
        (CPED)</strong>, with the actual permit window run through{" "}
        <a
          href="https://www2.minneapolismn.gov/business-services/permits/"
          target="_blank"
          rel="noopener nofollow"
        >
          Minneapolis Development Review
        </a>
        . Most kitchen and bath remodels require:
      </p>
      <ul>
        <li>Building permit (covers structural and overall scope)</li>
        <li>Plumbing permit (sink, dishwasher, ice maker)</li>
        <li>Electrical permit (outlets, circuits, fixtures)</li>
        <li>Mechanical permit (range hood, gas line)</li>
      </ul>
      <p>
        Typical Minneapolis permit fees for a $50,000 kitchen remodel run
        $600–$1,200 combined. Lead time is usually 1–3 weeks for review.
      </p>

      <h2>Saint Paul</h2>
      <p>
        Handled by the{" "}
        <a
          href="https://www.stpaul.gov/departments/safety-inspections"
          target="_blank"
          rel="noopener nofollow"
        >
          Department of Safety and Inspections (DSI)
        </a>
        . Same general permit categories as Minneapolis. If you&apos;re in a
        designated <strong>Heritage Preservation district</strong> — Summit
        Hill, Mac-Groveland, Cathedral Hill, Crocus Hill — exterior-visible
        work also requires Heritage Preservation Commission (HPC) review.
        That adds 2–6 weeks. Interior-only remodels usually don&apos;t
        trigger HPC.
      </p>

      <h2>Edina, Bloomington, Plymouth, Eden Prairie</h2>
      <p>
        Each suburb runs its own permit process through Building Inspections
        or Community Development. Online applications are now standard.
        Permit fees in higher-value suburbs like Edina are calculated as a
        percentage of valuation and tend to be 20–40% higher than
        Minneapolis. Lead time is generally 1–2 weeks.
      </p>

      <h2>Who Pulls the Permit?</h2>
      <p>
        Almost always your contractor — and you should expect them to. The
        permit holder is legally responsible for the work, and a contractor
        who won&apos;t pull permits is a red flag. (It usually means they
        aren&apos;t licensed.)
      </p>
      <p>
        Homeowners can pull their own permits in most cities, but if anything
        goes wrong, you&apos;re on the hook. Don&apos;t do it.
      </p>

      <h2>Permits and Resale</h2>
      <p>
        When you sell your house, unpermitted work can absolutely come back
        to bite you. Buyers&apos; inspectors check for permit history. If
        major work was done without permits, lenders may not finance the
        sale until permits are pulled retroactively — which often requires
        opening up walls and re-doing work to current code. We see this on
        DIY kitchen remodels from 10–15 years ago all the time.
      </p>

      <h2>What Inspections Look At</h2>
      <ul>
        <li>
          <strong>Rough-in inspection:</strong> Plumbing and electrical
          rough work before drywall. Inspector verifies pipe sizing,
          fittings, vents, wire gauge, box fill, circuit count.
        </li>
        <li>
          <strong>Building rough inspection:</strong> Framing, structural
          changes, beam sizing, insulation.
        </li>
        <li>
          <strong>Final inspections:</strong> All trades verify finish work
          (fixtures, GFCIs, range exhaust, smoke/CO detectors).
        </li>
      </ul>

      <h2>Common Permit Mistakes</h2>
      <ul>
        <li>
          <strong>Skipping the permit because &quot;it&apos;s a small
          job.&quot;</strong> If you&apos;re moving any plumbing or electric,
          pull it.
        </li>
        <li>
          <strong>Hiring a contractor without a Minnesota license.</strong>{" "}
          Verify at{" "}
          <a
            href="https://www.dli.mn.gov/license-lookup"
            target="_blank"
            rel="noopener nofollow"
          >
            mn.gov license lookup
          </a>
          . Required for any project over $15,000.
        </li>
        <li>
          <strong>Letting the permit expire.</strong> Most cities give you
          6–12 months. If the contractor takes longer, renewal fees apply.
        </li>
      </ul>

      <p>
        See our{" "}
        <Link href="/blog/kitchen-remodel-timeline-twin-cities">
          Twin Cities remodel timeline guide
        </Link>{" "}
        for where permits fit in the overall schedule, or{" "}
        <Link href="/contact">get a quote</Link> — we pull every permit and
        manage every inspection.
      </p>
    </>
  );
}
