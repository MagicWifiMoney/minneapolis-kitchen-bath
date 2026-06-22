import Link from "next/link";

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href
        ? { item: `https://minneapoliskitchenandbath.com${c.href}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="text-sm text-stone-500 mb-5" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
              {c.href ? (
                <Link
                  href={c.href}
                  className="hover:text-stone-800 transition-colors"
                >
                  {c.name}
                </Link>
              ) : (
                <span className="text-stone-700 font-medium">{c.name}</span>
              )}
              {i < items.length - 1 && (
                <span className="text-stone-300" aria-hidden>/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
