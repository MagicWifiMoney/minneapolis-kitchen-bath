import Link from "next/link";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

export function Footer() {
  const year = new Date().getFullYear();
  const featuredCities = cities.slice(0, 8);
  const featuredServices = services.slice(0, 6);

  return (
    <footer className="bg-stone-50 border-t border-stone-200 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <h3 className="text-stone-900 font-semibold text-lg mb-3">
              Minneapolis Kitchen &amp; Bath
            </h3>
            <p className="text-sm leading-relaxed mb-5 max-w-sm">
              Trusted remodeling contractors serving the Twin Cities metro.
              Kitchen and bathroom renovations done right — licensed, insured,
              and locally based.
            </p>
            <ul className="space-y-2 text-sm">
              <li>Minneapolis, MN 55401</li>
              <li>
                <a
                  href="tel:+16126882413"
                  className="font-medium text-stone-800 hover:text-teal-700 transition-colors"
                >
                  (612) 688-2413
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@minneapoliskitchenandbath.com"
                  className="hover:text-teal-700 transition-colors"
                >
                  hello@minneapoliskitchenandbath.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-stone-900 font-semibold mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {featuredServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-teal-700 transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-stone-900 font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2.5 text-sm">
              {featuredCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-areas/${c.slug}`}
                    className="hover:text-teal-700 transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="font-medium text-teal-700 hover:text-teal-800 transition-colors"
                >
                  All service areas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-stone-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-teal-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-teal-700 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/kitchen-remodel-cost-minneapolis"
                  className="hover:text-teal-700 transition-colors"
                >
                  Kitchen cost guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/bathroom-remodel-cost-minneapolis"
                  className="hover:text-teal-700 transition-colors"
                >
                  Bathroom cost guide
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-teal-700 transition-colors">
                  Tools &amp; calculators
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-700 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-200 mt-12 pt-8 text-sm text-center text-stone-500">
          © {year} Minneapolis Kitchen &amp; Bath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
