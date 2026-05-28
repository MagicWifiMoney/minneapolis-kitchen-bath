import Link from "next/link";

export function CTA({
  heading,
  subheading,
  buttonLabel = "Get a Free Quote",
  href = "/contact",
  variant = "blue",
}: {
  heading: string;
  subheading?: string;
  buttonLabel?: string;
  href?: string;
  variant?: "blue" | "dark" | "white";
}) {
  const styles = {
    blue: {
      section: "bg-blue-600 text-white",
      sub: "text-blue-100",
      button:
        "bg-white text-blue-700 hover:bg-blue-50",
    },
    dark: {
      section: "bg-slate-900 text-white",
      sub: "text-slate-300",
      button:
        "bg-blue-600 text-white hover:bg-blue-700",
    },
    white: {
      section: "bg-white border-y border-slate-200 text-slate-900",
      sub: "text-slate-600",
      button: "bg-blue-600 text-white hover:bg-blue-700",
    },
  }[variant];

  return (
    <section className={`py-14 px-4 ${styles.section}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{heading}</h2>
        {subheading && (
          <p className={`text-lg mb-6 ${styles.sub}`}>{subheading}</p>
        )}
        <Link
          href={href}
          className={`inline-block px-8 py-3 rounded-md text-base md:text-lg font-medium transition-colors ${styles.button}`}
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
