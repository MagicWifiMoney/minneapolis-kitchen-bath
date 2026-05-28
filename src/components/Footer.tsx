import Link from "next/link";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

export function Footer() {
  const year = new Date().getFullYear();
  const featuredCities = cities.slice(0, 8);
  const featuredServices = services.slice(0, 6);

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-3">
              Minneapolis Kitchen &amp; Bath
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Trusted remodeling contractors serving the Twin Cities metro.
              Kitchen and bathroom renovations done right — licensed,
              insured, and locally based.
            </p>
            <ul className="space-y-1 text-sm">
              <li>Minneapolis, MN 55401</li>
              <li>
                <a
                  href="tel:+16125550000"
                  className="hover:text-white transition-colors"
                >
                  (612) 555-0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@minneapoliskitchenandbath.com"
                  className="hover:text-white transition-colors"
                >
                  hello@minneapoliskitchenandbath.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              {featuredServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              {featuredCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-areas/${c.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="hover:text-white transition-colors underline"
                >
                  All service areas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/kitchen-remodel-cost-minneapolis"
                  className="hover:text-white transition-colors"
                >
                  Kitchen cost guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/bathroom-remodel-cost-minneapolis"
                  className="hover:text-white transition-colors"
                >
                  Bathroom cost guide
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-sm text-center">
          © {year} Minneapolis Kitchen &amp; Bath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
