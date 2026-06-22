import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function InlineCta({
  heading,
  subheading,
  buttonLabel = "Request a Free Quote",
  href = "/contact",
}: {
  heading: string;
  subheading?: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <div className="not-prose my-10 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-800 px-8 py-10 text-center shadow-lg shadow-teal-900/15">
      <h2 className="font-display text-2xl font-semibold text-white mb-3">
        {heading}
      </h2>
      {subheading && (
        <p className="text-teal-100 mb-6 max-w-xl mx-auto">{subheading}</p>
      )}
      <Link
        href={href}
        className="inline-flex items-center gap-2 bg-white text-teal-800 font-semibold px-8 py-3.5 rounded-xl hover:bg-teal-50 transition-colors"
      >
        {buttonLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
