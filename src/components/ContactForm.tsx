"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

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
      // Honeypot: real users leave this empty; bots tend to fill every field.
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("success");
        form.reset();
        return;
      }
      // Differentiate so the user knows whether to fix input or just retry.
      if (res.status === 400) {
        // Surface the API's specific validation reason (e.g. invalid email).
        const data = await res.json().catch(() => ({}));
        setError(
          data.error || "Please check your entries and try again.",
        );
      } else {
        setError(
          "Our system couldn't send your message right now. Please try again in a moment or call us directly.",
        );
      }
      setState("error");
    } catch {
      // Thrown for network/offline failures only.
      setError(
        "We couldn't reach the server. Check your connection and try again, or call us directly.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-green-800 font-medium text-lg">Message sent!</p>
        <p className="text-green-700 mt-2">
          We&apos;ll be in touch within one business day.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-sm font-medium text-green-800 underline hover:text-green-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Doe"
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(612) 555-0123"
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-slate-700 mb-1">
          Project Type *
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          defaultValue=""
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a project type
          </option>
          <option value="kitchen">Kitchen Remodel</option>
          <option value="bathroom">Bathroom Remodel</option>
          <option value="cabinetry">Custom Cabinetry</option>
          <option value="countertops">Countertops</option>
          <option value="tile">Tile &amp; Flooring</option>
          <option value="full-gut">Full Gut Renovation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={2000}
          placeholder="Size of the space, what you'd like done, rough timeline and budget…"
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
