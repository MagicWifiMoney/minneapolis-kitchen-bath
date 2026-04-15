import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get a free quote from Minneapolis Kitchen & Bath. We respond to all inquiries within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Get a Free Quote</h1>
          <p className="text-slate-300 text-lg">
            Tell us about your project and we&apos;ll be in touch within one business day.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Info</h2>
            <ul className="space-y-4 text-slate-600">
              <li>
                <span className="font-medium text-slate-900 block">Phone</span>
                <a href="tel:+16125550000" className="hover:text-blue-600 transition-colors">
                  (612) 555-0000
                </a>
              </li>
              <li>
                <span className="font-medium text-slate-900 block">Email</span>
                <a
                  href="mailto:hello@minneapoliskitchenandbath.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  hello@minneapoliskitchenandbath.com
                </a>
              </li>
              <li>
                <span className="font-medium text-slate-900 block">Location</span>
                Minneapolis, MN 55401
              </li>
              <li>
                <span className="font-medium text-slate-900 block">Hours</span>
                Monday – Friday, 8am – 6pm
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
