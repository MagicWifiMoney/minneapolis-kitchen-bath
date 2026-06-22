"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Areas" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-teal-700" />
      <path
        d="M8 14h16v2H8v-2zm0 6h10v2H8v-2z"
        className="fill-white"
      />
      <path
        d="M10 8h12l-1.5 4H11.5L10 8z"
        className="fill-teal-200"
      />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm shadow-stone-200/60 border-b border-stone-200/80"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[4.25rem]">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <LogoMark className="w-9 h-9 transition-transform group-hover:scale-105" />
            <div className="hidden sm:block leading-tight">
              <span className="block text-[15px] font-semibold text-stone-900 tracking-tight">
                Minneapolis Kitchen & Bath
              </span>
              <span className="block text-[11px] font-medium text-stone-500 tracking-wide uppercase">
                Twin Cities Remodeling
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+16126882413"
              className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-semibold text-stone-700 hover:text-teal-700 rounded-lg hover:bg-stone-50 transition-colors"
              aria-label="Call us at (612) 688-2413"
            >
              <Phone className="w-4 h-4 text-teal-600" strokeWidth={2.25} />
              (612) 688-2413
            </a>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-800 transition-colors shadow-sm shadow-teal-700/20"
            >
              Free Quote
            </Link>
            <a
              href="tel:+16126882413"
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 text-teal-700"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4" strokeWidth={2.25} />
            </a>
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-[4.25rem] z-40 bg-white">
          <nav className="px-4 py-6 space-y-1 border-t border-stone-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3.5 text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-stone-100 space-y-3 px-1">
              <a
                href="tel:+16126882413"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-50 text-stone-800 font-semibold"
              >
                <Phone className="w-5 h-5 text-teal-600" />
                (612) 688-2413
              </a>
              <Link
                href="/contact"
                className="block bg-teal-700 text-white px-4 py-3.5 rounded-xl text-base font-semibold text-center hover:bg-teal-800 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Get a Free Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
