"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const TIERS = {
  Budget: 200,
  "Mid-range": 400,
  "High-end": 800,
  Luxury: 1200,
} as const;

type Tier = keyof typeof TIERS;

const SCOPE_ITEMS: { key: string; label: string; cost: number }[] = [
  { key: "tileShower", label: "Tile Shower", cost: 6500 },
  { key: "freestandingTub", label: "Freestanding Tub", cost: 3800 },
  { key: "doubleVanity", label: "Double Vanity", cost: 4200 },
  { key: "heatedFloors", label: "Heated Floors", cost: 2800 },
  { key: "framelessGlass", label: "Frameless Glass Enclosure", cost: 3500 },
  { key: "plumbing", label: "Plumbing Relocation", cost: 4500 },
  { key: "structural", label: "Structural Changes", cost: 8500 },
  { key: "customTile", label: "Custom Tile Work", cost: 5200 },
  { key: "tubToShower", label: "Tub-to-Shower Conversion", cost: 5800 },
];

const LOCATIONS: { name: string; mult: number }[] = [
  { name: "Minneapolis", mult: 1.0 },
  { name: "Saint Paul", mult: 1.0 },
  { name: "Edina", mult: 1.2 },
  { name: "Wayzata", mult: 1.2 },
  { name: "Minnetonka", mult: 0.95 },
  { name: "Eden Prairie", mult: 0.95 },
  { name: "Bloomington", mult: 0.95 },
  { name: "Plymouth", mult: 0.95 },
  { name: "Maple Grove", mult: 0.95 },
  { name: "Eagan", mult: 0.95 },
  { name: "Burnsville", mult: 0.95 },
  { name: "Richfield", mult: 0.95 },
];

const FAQS = [
  {
    q: "How accurate is this bathroom remodel cost calculator?",
    a: "This estimate lands within roughly 20 percent of a real Twin Cities project for the scope you select. Final pricing depends on tile selection, vanity brand, plumbing fixture grade, and any surprises behind the walls. Treat it as a starting point, not a contract.",
  },
  {
    q: "What is included in the Budget, Mid-range, High-end, and Luxury tiers?",
    a: "Budget assumes builder-grade fixtures, stock vanity, and basic ceramic tile. Mid-range covers semi-custom vanity, porcelain tile, and name-brand fixtures. High-end is custom vanity, large-format tile, and designer plumbing. Luxury covers full custom millwork, stone slab walls, smart toilets, and steam shower systems.",
  },
  {
    q: "Why do Edina and Wayzata cost more?",
    a: "Permit timelines, HOA requirements, and the typical finish level in those neighborhoods push project costs up. Homeowners there usually want higher-end materials, which compounds the base rate.",
  },
  {
    q: "Does this include design fees and permits?",
    a: "The estimate folds in standard permit costs and basic design time for a Twin Cities full-service bathroom remodel. It does not include structural engineering stamps, custom millwork drawings, or third-party interior design retainers.",
  },
  {
    q: "How do I turn this into a real fixed-price quote?",
    a: "Send us the estimate, your address, and a few photos of the current bathroom. We&apos;ll do an in-home walkthrough, confirm scope, and come back with a line-item fixed-price proposal within a week.",
  },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function Calculator() {
  const [sqft, setSqft] = useState(60);
  const [tier, setTier] = useState<Tier>("Mid-range");
  const [scope, setScope] = useState<Record<string, boolean>>({
    tileShower: true,
    freestandingTub: false,
    doubleVanity: false,
    heatedFloors: false,
    framelessGlass: true,
    plumbing: false,
    structural: false,
    customTile: false,
    tubToShower: false,
  });
  const [location, setLocation] = useState(LOCATIONS[0].name);

  const calc = useMemo(() => {
    const baseRate = TIERS[tier];
    const baseCost = baseRate * sqft;
    const scopeBreakdown = SCOPE_ITEMS.filter((s) => scope[s.key]).map((s) => ({
      label: s.label,
      cost: s.cost,
    }));
    const scopeTotal = scopeBreakdown.reduce((a, b) => a + b.cost, 0);
    const subtotal = baseCost + scopeTotal;
    const mult = LOCATIONS.find((l) => l.name === location)?.mult ?? 1;
    const mid = subtotal * mult;
    const low = mid * 0.85;
    const high = mid * 1.2;
    return { baseCost, scopeBreakdown, scopeTotal, subtotal, mult, low, mid, high };
  }, [sqft, tier, scope, location]);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <nav className="mb-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <span>Tools</span>
          <span className="mx-2">/</span>
          <span className="text-gray-200">Bathroom Remodel Cost Calculator</span>
        </nav>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Bathroom Remodel Cost Calculator
        </h1>
        <p className="mt-3 text-lg text-blue-400">Twin Cities pricing, built from real local jobs.</p>

        <section className="prose prose-invert mt-8 max-w-none">
          <p>
            A bathroom remodel cost calculator is only useful if the numbers come from real local
            projects. This one is built from full bathroom renovations we&apos;ve completed across
            Minneapolis, Saint Paul, and the surrounding west and south metro. In the Twin Cities,
            the four biggest drivers of bathroom remodel cost are bathroom size in square feet,
            finish tier, scope of work, and your specific city. A 40 square foot powder room refresh
            in Richfield with a new vanity and toilet sits in a completely different price range
            than a 120 square foot primary bath in Edina with a freestanding tub, frameless glass,
            heated floors, and a custom double vanity.
          </p>
          <p>
            Labor in the Minneapolis and Saint Paul market has climbed steadily since 2022, and
            tile setters in particular book out weeks in advance. Tile work and shower waterproofing
            are usually the largest single line items in a bathroom, followed by vanity and counter,
            plumbing rough-in, and electrical for fans, lighting, and heated floors. Permit costs
            vary by city. Edina and Wayzata typically run higher because of finish-level
            expectations and local permitting overhead. South and west suburbs like Bloomington,
            Plymouth, Maple Grove, and Eagan tend to come in slightly under city core pricing on
            identical scope. Tub-to-shower conversions and any plumbing relocation add real cost
            because they touch waste lines, venting, and waterproofing all at once.
          </p>
          <p>
            Use the calculator below to ballpark your project. Pick your bathroom size, choose a
            finish tier, check the scope items you actually want, and select your city. You&apos;ll
            get a low, mid, and high estimate plus a category breakdown. When you&apos;re ready for
            a real number, request a fixed-price quote and we&apos;ll walk your bathroom in person.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-gray-800 bg-gray-950/60 p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Bathroom size: <span className="text-blue-400">{sqft} sq ft</span>
              </label>
              <input
                type="range"
                min={25}
                max={200}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="mt-3 w-full accent-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                aria-label="Bathroom size in square feet"
                aria-valuetext={`${sqft} square feet`}
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>25</span>
                <span>200</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Finish tier</label>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {(Object.keys(TIERS) as Tier[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTier(t)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                      tier === t
                        ? "border-blue-500 bg-blue-500/20 text-blue-300"
                        : "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Scope of work</label>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SCOPE_ITEMS.map((item) => (
                  <label
                    key={item.key}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 hover:border-gray-700"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!scope[item.key]}
                        onChange={(e) =>
                          setScope((s) => ({ ...s, [item.key]: e.target.checked }))
                        }
                        className="h-4 w-4 accent-blue-500"
                      />
                      <span className="text-sm text-gray-200">{item.label}</span>
                    </span>
                    <span className="text-xs text-gray-500">+{fmt(item.cost)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">City</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-3 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:border-blue-500 focus:outline-none"
              >
                {LOCATIONS.map((l) => (
                  <option key={l.name} value={l.name}>
                    {l.name} ({l.mult}x)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section
          className="mt-8 grid gap-4 sm:grid-cols-3"
          aria-live="polite"
          aria-label="Estimated bathroom remodel cost"
        >
          <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-5">
            <div className="text-xs uppercase tracking-wide text-gray-500">Low estimate</div>
            <div className="mt-2 text-3xl font-bold text-gray-100">{fmt(calc.low)}</div>
          </div>
          <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 p-5">
            <div className="text-xs uppercase tracking-wide text-blue-300">Most likely</div>
            <div className="mt-2 text-3xl font-bold text-blue-200">{fmt(calc.mid)}</div>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-5">
            <div className="text-xs uppercase tracking-wide text-gray-500">High estimate</div>
            <div className="mt-2 text-3xl font-bold text-gray-100">{fmt(calc.high)}</div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-800 bg-gray-950/60 p-6">
          <h2 className="text-lg font-semibold text-gray-100">Cost breakdown</h2>
          <ul className="mt-4 divide-y divide-gray-800 text-sm">
            <li className="flex justify-between py-2">
              <span className="text-gray-300">
                Base build ({sqft} sq ft &times; {fmt(TIERS[tier])}/sqft, {tier})
              </span>
              <span className="text-gray-100">{fmt(calc.baseCost)}</span>
            </li>
            {calc.scopeBreakdown.map((s) => (
              <li key={s.label} className="flex justify-between py-2">
                <span className="text-gray-300">{s.label}</span>
                <span className="text-gray-100">{fmt(s.cost)}</span>
              </li>
            ))}
            <li className="flex justify-between py-2">
              <span className="text-gray-300">Subtotal</span>
              <span className="text-gray-100">{fmt(calc.subtotal)}</span>
            </li>
            <li className="flex justify-between py-2">
              <span className="text-gray-300">
                Location adjustment ({location}, {calc.mult}x)
              </span>
              <span className="text-gray-100">{fmt(calc.mid - calc.subtotal)}</span>
            </li>
            <li className="flex justify-between py-2 font-semibold">
              <span className="text-gray-200">Most likely total</span>
              <span className="text-blue-300">{fmt(calc.mid)}</span>
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-blue-500/40 bg-blue-500/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-100">
            Want a real fixed-price quote?
          </h2>
          <p className="mt-2 text-gray-300">
            We&apos;ll walk your bathroom, confirm scope, and send a line-item proposal within a week.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-400"
          >
            Get a real fixed-price quote
          </Link>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-100">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-gray-800 bg-gray-950/60 p-5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-gray-100">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
