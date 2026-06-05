import Link from "next/link";

export default function Body() {
  return (
    <>
      <p className="lead">
        <strong>
          In most Twin Cities homes, remodel the kitchen first.
        </strong>{" "}
        The kitchen drives more daily enjoyment and more resale value than any
        other room, so it earns the top of the budget. The two big exceptions:
        fix a <em>failing</em> bathroom first (active leaks or water damage),
        and if you only have one bathroom, handle it before a long kitchen
        project disrupts the house.
      </p>

      <h2>Why the Kitchen Usually Wins</h2>
      <p>
        The kitchen is the room buyers scrutinize most and the room you use
        most. A mid-range kitchen remodel returns roughly 70&ndash;80% of its
        cost at resale in the Minneapolis metro and does the most to make a home
        feel updated. If your budget only stretches to one room this year, the
        kitchen typically delivers the best mix of daily payoff and resale
        protection.
      </p>

      <h2>When to Do the Bathroom First</h2>
      <ul>
        <li>
          <strong>Active water damage.</strong> A leaking shower pan, failing
          waterproofing, or rot behind tile only gets more expensive. Fix it
          before it reaches the framing or the room below.
        </li>
        <li>
          <strong>You have only one bathroom.</strong> Renovate it before a
          6&ndash;12 week kitchen project ties up the house, so you&apos;re not
          living through two disruptions back-to-back.
        </li>
        <li>
          <strong>Aging in place.</strong> A curbless shower, grab bars, and a
          comfort-height vanity can&apos;t wait if mobility is the priority.
        </li>
        <li>
          <strong>Selling soon and the bath is the weak point.</strong> If the
          kitchen already shows well, a dated bathroom may be what&apos;s
          dragging the home.
        </li>
      </ul>

      <h2>Sequencing When You&apos;re Doing Both</h2>
      <p>
        Many homeowners tackle both within a year or two. A few rules of thumb
        we use with Twin Cities clients:
      </p>
      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold border border-gray-200">
                Situation
              </th>
              <th className="text-left p-3 font-semibold border border-gray-200">
                Do first
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Both rooms dated, no urgent damage", "Kitchen"],
              ["Bathroom leaking or water-damaged", "Bathroom"],
              ["Only one bathroom in the home", "Bathroom"],
              ["Selling within a year, kitchen already updated", "Bathroom"],
              ["Staying long-term, want biggest daily payoff", "Kitchen"],
            ].map(([sit, first]) => (
              <tr key={sit} className="border-b border-gray-200">
                <td className="p-3 border border-gray-200 font-medium">{sit}</td>
                <td className="p-3 border border-gray-200 text-gray-700">
                  {first}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        One budgeting caution: stacking a kitchen and multiple baths in the same
        year can push you past the resale-safe ceiling for your neighborhood.
        Our guide to the{" "}
        <Link href="/blog/30-percent-rule-remodeling">
          30% rule for remodeling
        </Link>{" "}
        explains how to keep combined projects in proportion to your home&apos;s
        value.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Remodel the kitchen first unless a bathroom is failing, is your only
        one, or is the specific thing holding back a sale. Either way, see our{" "}
        <Link href="/blog/kitchen-remodel-cost-minneapolis">
          kitchen remodel cost guide
        </Link>{" "}
        and{" "}
        <Link href="/blog/bathroom-remodel-cost-minneapolis">
          bathroom remodel cost guide
        </Link>{" "}
        to plan the budget, or <Link href="/contact">request a free quote</Link>{" "}
        and we&apos;ll help you sequence both.
      </p>
    </>
  );
}
