"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Surface the error for the browser console / any attached reporting.
    console.error(error);
  }, [error]);

  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-3">
          Something went wrong
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          We hit an unexpected error
        </h1>
        <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          Sorry about that. You can try again, or call us at{" "}
          <a href="tel:+16125550000" className="underline hover:text-white">
            (612) 555-0000
          </a>{" "}
          and we&apos;ll help you directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => unstable_retry()}
            className="bg-blue-600 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-white/10 text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-white/20 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
