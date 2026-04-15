import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">Minneapolis Kitchen & Bath</h3>
            <p className="text-sm leading-relaxed">
              Trusted remodeling contractors serving the Twin Cities metro. Kitchen and bathroom
              renovations done right.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/service-areas", label: "Service Areas" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Minneapolis, MN 55401</li>
              <li>
                <a href="tel:+16125550000" className="hover:text-white transition-colors">
                  (612) 555-0000
                </a>
              </li>
              <li>
                <a href="mailto:hello@minneapoliskitchenandbath.com" className="hover:text-white transition-colors">
                  hello@minneapoliskitchenandbath.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
          © {year} Minneapolis Kitchen & Bath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
