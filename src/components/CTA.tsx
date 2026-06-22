import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA({
  heading,
  subheading,
  buttonLabel = "Get a Free Quote",
  href = "/contact",
  variant = "teal",
}: {
  heading: string;
  subheading?: string;
  buttonLabel?: string;
  href?: string;
  variant?: "teal" | "light" | "white";
}) {
  if (variant === "white") {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-stone-200/60">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 to-teal-800 px-8 py-14 sm:px-12 text-center shadow-xl shadow-teal-900/20">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3">
                {heading}
              </h2>
              {subheading && (
                <p className="text-teal-100 mb-8 text-lg max-w-xl mx-auto">
                  {subheading}
                </p>
              )}
              <Link
                href={href}
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-800 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-teal-50 transition-colors"
              >
                {buttonLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const styles = {
    teal: {
      section: "bg-stone-50 border-t border-stone-200/60",
      card: "bg-gradient-to-br from-teal-700 to-teal-800 text-white shadow-xl shadow-teal-900/20",
      sub: "text-teal-100",
      button: "bg-white text-teal-800 hover:bg-teal-50",
    },
    light: {
      section: "bg-white border-y border-stone-200/60",
      card: "bg-stone-50 border border-stone-200/80 text-stone-900",
      sub: "text-stone-600",
      button: "bg-teal-700 text-white hover:bg-teal-800 shadow-lg shadow-teal-700/20",
    },
  }[variant === "light" ? "light" : "teal"];

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${styles.section}`}>
      <div
        className={`max-w-3xl mx-auto text-center rounded-3xl px-8 py-12 sm:py-14 ${styles.card}`}
      >
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
          {heading}
        </h2>
        {subheading && (
          <p className={`text-lg mb-8 ${styles.sub}`}>{subheading}</p>
        )}
        <Link
          href={href}
          className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-colors ${styles.button}`}
        >
          {buttonLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
