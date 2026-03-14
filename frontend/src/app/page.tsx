"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [subId, setSubId] = useState('addlivetag-hopback');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canSubmit = useMemo(() => /^https?:\/\//.test(url), [url]);

  const generate = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API}/api/links/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceUrl: url, subId })
      });
      const data = await res.json();
      setResult(data.affiliateUrl || 'No result');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pb-20">
      <Hero onDemo={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} />
      <motion.section id="generator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mx-auto mt-12 max-w-5xl px-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold">Generate affiliate link</h2>
          <div className="mt-4 grid gap-3">
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://shopee.vn/..." className="rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400" />
            <input value={subId} onChange={(e) => setSubId(e.target.value)} placeholder="sub_id" className="rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400" />
            <button onClick={generate} disabled={!canSubmit || loading} className="pill-btn disabled:opacity-40">{loading ? 'Generating…' : 'Generate link'}</button>
          </div>
          {loading && <div className="mt-4 h-1 w-full overflow-hidden rounded bg-zinc-800"><div className="h-full w-1/3 animate-pulse bg-cyan-400" /></div>}
          {result && (
            <div className="mt-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-sm text-cyan-100 break-all">
              {result}
            </div>
          )}
        </div>
      </motion.section>
    </main>
  );
}
