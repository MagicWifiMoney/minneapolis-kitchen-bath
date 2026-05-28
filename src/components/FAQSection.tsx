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
    <section className="py-12 px-4 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        {withSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          {heading}
        </h2>
        <div className="space-y-4">
          {faqs.map((q) => (
            <details
              key={q.question}
              className="group border border-slate-200 rounded-lg p-5 open:bg-slate-50"
            >
              <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-start justify-between gap-4">
                <span>{q.question}</span>
                <span className="text-blue-600 mt-1 group-open:rotate-45 transition-transform text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-700 leading-relaxed">{q.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
