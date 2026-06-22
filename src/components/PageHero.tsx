import type { Crumb } from "@/components/Breadcrumbs";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  badge,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  badge?: string;
  actions?: HeroAction[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-hero-pattern border-b border-stone-200/60 py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            {badge}
          </div>
        )}
        <h1
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight mb-4 leading-tight"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
        {actions && actions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            {actions.map((action) => (
              <ButtonLink
                key={action.href}
                href={action.href}
                variant={action.variant === "secondary" ? "secondary" : "primary"}
                showArrow={action.variant !== "secondary"}
              >
                {action.label}
              </ButtonLink>
            ))}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
