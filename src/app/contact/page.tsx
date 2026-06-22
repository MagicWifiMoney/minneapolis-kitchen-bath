import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get a free quote from Minneapolis Kitchen & Bath. We respond to all inquiries within one business day.",
  alternates: { canonical: "https://minneapoliskitchenandbath.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get a Free Quote"
        subtitle="Tell us about your project and we'll be in touch within one business day."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact" },
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-8">
            <ContactForm />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-stone-900 mb-6">
              Contact Info
            </h2>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                  <Phone className="w-4 h-4" strokeWidth={2.25} />
                </div>
                <div>
                  <span className="font-medium text-stone-900 block text-sm mb-0.5">Phone</span>
                  <a
                    href="tel:+16126882413"
                    className="text-stone-600 hover:text-teal-700 transition-colors"
                  >
                    (612) 688-2413
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                  <Mail className="w-4 h-4" strokeWidth={2.25} />
                </div>
                <div>
                  <span className="font-medium text-stone-900 block text-sm mb-0.5">Email</span>
                  <a
                    href="mailto:hello@minneapoliskitchenandbath.com"
                    className="text-stone-600 hover:text-teal-700 transition-colors"
                  >
                    hello@minneapoliskitchenandbath.com
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                  <MapPin className="w-4 h-4" strokeWidth={2.25} />
                </div>
                <div>
                  <span className="font-medium text-stone-900 block text-sm mb-0.5">Location</span>
                  <span className="text-stone-600">Minneapolis, MN 55401</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                  <Clock className="w-4 h-4" strokeWidth={2.25} />
                </div>
                <div>
                  <span className="font-medium text-stone-900 block text-sm mb-0.5">Hours</span>
                  <span className="text-stone-600">Monday – Friday, 8am – 6pm</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
