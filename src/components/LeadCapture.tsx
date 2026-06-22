'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function LeadCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage-capture' }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-teal-50 p-8 rounded-2xl border border-teal-100 text-center">
        <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-stone-900 mb-2">Check your inbox!</h3>
        <p className="text-stone-600">The 2026 Remodel Cost Guide is on its way.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-9 rounded-2xl shadow-xl shadow-stone-200/60 border border-stone-200/80">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-stone-900 mb-1">
          Get the 2026 Cost Guide
        </h3>
        <p className="text-sm text-stone-500">
          Twin Cities pricing data, delivered to your inbox.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 text-stone-900 placeholder:text-stone-400 transition-colors"
            />
          </div>
        </div>
        {status === 'error' && (
          <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-teal-700/20"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Download Guide
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
      <p className="text-[11px] text-stone-400 mt-5 text-center uppercase font-semibold tracking-widest">
        Local data · 2026 edition
      </p>
    </div>
  );
}
