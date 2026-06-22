export type FAQ = { question: string; answer: string };

export function FAQSection({
  faqs,
  heading = "Frequently Asked Questions",
  withSchema = true,
}: {
  faqs: FAQ[];
  heading?: string;
  withSchema?: boolean;
}) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-stone-200/60">
      <div className="max-w-3xl mx-auto">
        {withSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
            FAQ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
            {heading}
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((q) => (
            <details
              key={q.question}
              className="group rounded-2xl border border-stone-200/80 bg-stone-50/50 open:bg-white open:shadow-sm open:shadow-stone-100 transition-all"
            >
              <summary className="font-semibold text-stone-900 cursor-pointer list-none flex items-start justify-between gap-4 px-6 py-5">
                <span>{q.question}</span>
                <span
                  className="text-teal-600 mt-0.5 group-open:rotate-45 transition-transform text-xl leading-none shrink-0"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-stone-600 leading-relaxed">{q.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
