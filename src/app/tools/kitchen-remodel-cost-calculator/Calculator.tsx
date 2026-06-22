"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const TIERS = {
  Budget: 250,
  "Mid-range": 500,
  "High-end": 1000,
} as const;

type Tier = keyof typeof TIERS;

const SCOPE_ITEMS: { key: string; label: string; cost: number }[] = [
  { key: "cabinets", label: "New Cabinets", cost: 12000 },
  { key: "counters", label: "Countertops (quartz/stone)", cost: 5500 },
  { key: "appliances", label: "Appliance Package", cost: 7500 },
  { key: "flooring", label: "Flooring", cost: 4500 },
  { key: "lighting", label: "Lighting & Electrical", cost: 3200 },
  { key: "plumbing", label: "Plumbing Relocation", cost: 4800 },
  { key: "structural", label: "Structural Changes (wall removal)", cost: 9500 },
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
    q: "How accurate is this kitchen remodel cost calculator?",
    a: "This estimate gets you within roughly 20 percent of a real Twin Cities project for the scope you select. Final pricing depends on cabinet brand, stone slab selection, appliance package, and any surprises behind the walls. We use it as a starting point, not a contract.",
  },
  {
    q: "What is included in the Budget, Mid-range, and High-end tiers?",
    a: "Budget assumes stock cabinetry, laminate or entry quartz counters, and builder-grade fixtures. Mid-range covers semi-custom cabinets, quartz counters, and name-brand appliances. High-end is full custom cabinetry, premium stone, paneled appliances, and designer lighting.",
  },
  {
    q: "Why do Edina and Wayzata cost more?",
    a: "Permitting timelines, HOA requirements, and the typical scope of work in those neighborhoods push project costs up. Homeowners there usually want higher finish levels, which compounds the base rate.",
  },
  {
    q: "Does this include design fees and permits?",
    a: "The estimate folds in standard permit costs and basic design time for a Twin Cities full-service remodel. It does not include structural engineering stamps, custom millwork drawings, or third-party interior design retainers.",
  },
  {
    q: "How do I turn this into a real fixed-price quote?",
    a: "Send us the estimate, your address, and a few photos of the current kitchen. We will do an in-home walkthrough, confirm scope, and come back with a line-item fixed-price proposal within a week.",
  },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function Calculator() {
  const [sqft, setSqft] = useState(150);
  const [tier, setTier] = useState<Tier>("Mid-range");
  const [scope, setScope] = useState<Record<string, boolean>>({
    cabinets: true,
    counters: true,
    appliances: false,
    flooring: true,
    lighting: false,
    plumbing: false,
    structural: false,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Kitchen Remodel Cost Calculator (Twin Cities)",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url: "https://minneapoliskitchenandbath.com/tools/kitchen-remodel-cost-calculator",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://minneapoliskitchenandbath.com" },
          { "@type": "ListItem", position: 2, name: "Tools", item: "https://minneapoliskitchenandbath.com/tools" },
          {
            "@type": "ListItem",
            position: 3,
            name: "Kitchen Remodel Cost Calculator",
            item: "https://minneapoliskitchenandbath.com/tools/kitchen-remodel-cost-calculator",
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-white text-stone-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <nav className="mb-6 text-sm text-stone-500">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-teal-700">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-800">Kitchen Remodel Cost Calculator</span>
        </nav>

        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-stone-900">
          Kitchen Remodel Cost Calculator
        </h1>
        <p className="mt-3 text-lg text-teal-700">Twin Cities pricing, built from real local jobs.</p>

        <section className="prose prose-site mt-8 max-w-none">
          <p>
            A kitchen remodel cost calculator is only as good as the data behind it. This one is
            built from full kitchen renovations we&apos;ve completed across Minneapolis, Saint Paul,
            and the surrounding west and south metro. In the Twin Cities, the four biggest drivers
            of kitchen remodel cost are kitchen size in square feet, cabinet quality tier, scope of
            work, and your specific neighborhood. A 150 square foot galley kitchen in Richfield
            with stock cabinets and a quartz counter swap will land in a completely different price
            range than a 300 square foot open-concept renovation in Edina with custom inset
            cabinetry, a structural wall removal, and a paneled appliance package.
          </p>
          <p>
            Labor in the Minneapolis and Saint Paul market has climbed steadily since 2022, and
            material lead times still push real timelines longer than most homeowners expect. Cabinetry
            is usually the largest single line item, followed by countertops, appliances, and
            plumbing or electrical relocation when the layout changes. Permit costs vary by city.
            Edina and Wayzata typically run higher because of both finish-level expectations and
            local permitting overhead. South and west suburbs like Bloomington, Plymouth, Maple
            Grove, and Eagan tend to come in slightly under city core pricing on identical scope.
          </p>
          <p>
            Use the calculator below to ballpark your project. Pick your kitchen size, choose a
            finish tier, check the scope items you actually want, and select your city. You&apos;ll
            get a low, mid, and high estimate plus a category breakdown. When you&apos;re ready for
            a real number, request a fixed-price quote and we&apos;ll walk your kitchen in person.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-stone-200/80 bg-stone-50 p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Kitchen size: <span className="text-teal-700">{sqft} sq ft</span>
              </label>
              <input
                type="range"
                min={60}
                max={400}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="mt-3 w-full accent-teal-600"
              />
              <div className="mt-1 flex justify-between text-xs text-stone-400">
                <span>60</span>
                <span>400</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">Finish tier</label>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(Object.keys(TIERS) as Tier[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTier(t)}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                      tier === t
                        ? "border-teal-600 bg-teal-50 text-teal-800"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700">Scope of work</label>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SCOPE_ITEMS.map((item) => (
                  <label
                    key={item.key}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-stone-200 bg-white px-3 py-2 hover:border-stone-300"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!scope[item.key]}
                        onChange={(e) =>
                          setScope((s) => ({ ...s, [item.key]: e.target.checked }))
                        }
                        className="h-4 w-4 accent-teal-600"
                      />
                      <span className="text-sm text-stone-800">{item.label}</span>
                    </span>
                    <span className="text-xs text-stone-400">+{fmt(item.cost)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700">City</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-3 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-teal-500 focus:outline-none"
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

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-stone-200/80 bg-stone-50 p-5">
            <div className="text-xs uppercase tracking-wide text-stone-400">Low estimate</div>
            <div className="mt-2 text-3xl font-semibold text-stone-900">{fmt(calc.low)}</div>
          </div>
          <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
            <div className="text-xs uppercase tracking-wide text-teal-700">Most likely</div>
            <div className="mt-2 text-3xl font-semibold text-teal-800">{fmt(calc.mid)}</div>
          </div>
          <div className="rounded-xl border border-stone-200/80 bg-stone-50 p-5">
            <div className="text-xs uppercase tracking-wide text-stone-400">High estimate</div>
            <div className="mt-2 text-3xl font-semibold text-stone-900">{fmt(calc.high)}</div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-stone-200/80 bg-stone-50 p-6">
          <h2 className="text-lg font-semibold text-stone-900">Cost breakdown</h2>
          <ul className="mt-4 divide-y divide-stone-200 text-sm">
            <li className="flex justify-between py-2">
              <span className="text-stone-700">
                Base build ({sqft} sq ft &times; {fmt(TIERS[tier])}/sqft, {tier})
              </span>
              <span className="text-stone-900">{fmt(calc.baseCost)}</span>
            </li>
            {calc.scopeBreakdown.map((s) => (
              <li key={s.label} className="flex justify-between py-2">
                <span className="text-stone-700">{s.label}</span>
                <span className="text-stone-900">{fmt(s.cost)}</span>
              </li>
            ))}
            <li className="flex justify-between py-2">
              <span className="text-stone-700">Subtotal</span>
              <span className="text-stone-900">{fmt(calc.subtotal)}</span>
            </li>
            <li className="flex justify-between py-2">
              <span className="text-stone-700">
                Location adjustment ({location}, {calc.mult}x)
              </span>
              <span className="text-stone-900">{fmt(calc.mid - calc.subtotal)}</span>
            </li>
            <li className="flex justify-between py-2 font-semibold">
              <span className="text-stone-800">Most likely total</span>
              <span className="text-teal-700">{fmt(calc.mid)}</span>
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-stone-900">
            Want a real fixed-price quote?
          </h2>
          <p className="mt-2 text-stone-700">
            We&apos;ll walk your kitchen, confirm scope, and send a line-item proposal within a week.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Get a real fixed-price quote
          </Link>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-stone-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-stone-200/80 bg-stone-50 p-5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-stone-900">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
