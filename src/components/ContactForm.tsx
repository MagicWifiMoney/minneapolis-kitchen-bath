"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-stone-200 bg-stone-50/50 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-colors";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setState("success");
      form.reset();
    } catch {
      setState("error");
      setError("Something went wrong. Please try again or call us directly.");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-8 text-center">
        <p className="text-teal-900 font-semibold text-lg">Message sent!</p>
        <p className="text-teal-800 mt-2">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
          Name *
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
          Email *
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1.5">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-stone-700 mb-1.5">
          Project Type *
        </label>
        <select id="projectType" name="projectType" required className={inputClass}>
          <option value="">Select a project type</option>
          <option value="kitchen">Kitchen Remodel</option>
          <option value="bathroom">Bathroom Remodel</option>
          <option value="cabinetry">Custom Cabinetry</option>
          <option value="countertops">Countertops</option>
          <option value="tile">Tile & Flooring</option>
          <option value="full-gut">Full Gut Renovation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full bg-teal-700 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20"
      >
        {state === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
