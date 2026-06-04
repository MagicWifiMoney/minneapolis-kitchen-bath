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
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-blue-50 p-8 rounded-xl border border-blue-200 text-center">
        <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Check your inbox!</h3>
        <p className="text-slate-600">The 2026 Remodel Cost Guide is on its way.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border border-slate-100">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Get the 2026 Cost Guide</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-200"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Download Guide
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
      <p className="text-[10px] text-slate-400 mt-4 text-center uppercase font-bold tracking-widest">
        Local Data • 2026 Edition
      </p>
    </div>
  );
}
