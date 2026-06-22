import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "white";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-teal-700 text-white hover:bg-teal-800 shadow-lg shadow-teal-700/20",
  secondary:
    "bg-white text-stone-800 border border-stone-200 hover:border-stone-300 hover:bg-stone-50",
  white: "bg-white text-teal-800 hover:bg-teal-50",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold transition-colors ${variantClasses[variant]} ${className}`}
    >
      {children}
      {showArrow && <ArrowRight className="w-4 h-4" />}
    </Link>
  );
}
