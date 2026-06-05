import Link from "next/link";

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
    <section className="py-12 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{heading}</h2>
        <div className={`grid grid-cols-1 ${grid} gap-4`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group block p-5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="font-semibold text-slate-900 group-hover:text-blue-700">
                {l.title}
              </div>
              {l.description && (
                <div className="text-sm text-slate-600 mt-1">
                  {l.description}
                </div>
              )}
              <div className="mt-2 text-sm text-blue-600 font-medium">
                Read more →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
