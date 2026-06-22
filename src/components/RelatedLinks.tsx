import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedLink = {
  href: string;
  title: string;
  description?: string;
};

export function RelatedLinks({
  heading = "Related",
  links,
  columns = 3,
}: {
  heading?: string;
  links: RelatedLink[];
  columns?: 2 | 3 | 4;
}) {
  if (!links || links.length === 0) return null;
  const grid =
    columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : columns === 3
        ? "md:grid-cols-2 lg:grid-cols-3"
        : "md:grid-cols-2";

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200/60">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-2xl font-semibold text-stone-900 mb-6">
          {heading}
        </h2>
        <div className={`grid grid-cols-1 ${grid} gap-4`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group block p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-teal-200 hover:shadow-lg hover:shadow-stone-200/50 transition-all"
            >
              <div className="font-semibold text-stone-900 group-hover:text-teal-800 transition-colors">
                {l.title}
              </div>
              {l.description && (
                <div className="text-sm text-stone-500 mt-1 leading-relaxed">
                  {l.description}
                </div>
              )}
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-teal-700">
                Read more
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
