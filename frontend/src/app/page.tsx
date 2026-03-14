"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Copy, Link2, Rocket, Timer } from 'lucide-react';
import { Hero } from '@/components/Hero';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const kpis = [
  { label: 'Active campaigns', value: '24', icon: Rocket },
  { label: 'CTR (7d)', value: '4.83%', icon: BarChart3 },
  { label: 'Avg redirect speed', value: '146ms', icon: Timer }
];

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [subId, setSubId] = useState('addlivetag-hopback');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <main className="pb-20">
      <Hero onDemo={() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })} />

      <section className="mx-auto mt-10 grid max-w-6xl gap-4 px-6 md:grid-cols-3">
        {kpis.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="panel p-5"
          >
            <item.icon className="mb-3 text-cyan-300" size={18} />
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-sm text-zinc-400">{item.label}</div>
          </motion.div>
        ))}
      </section>

      <section id="studio" className="mx-auto mt-6 grid max-w-6xl gap-5 px-6 lg:grid-cols-[1.5fr_1fr]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="panel p-6">
          <h2 className="text-xl font-semibold">Affiliate Link Studio</h2>
          <p className="mt-1 text-sm text-zinc-400">Generate tracked Shopee redirect links with campaign-ready tags.</p>

          <div className="mt-5 grid gap-3">
            <label className="text-xs uppercase tracking-wider text-zinc-400">Source link</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://shopee.vn/..."
              className="rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400"
            />

            <label className="mt-2 text-xs uppercase tracking-wider text-zinc-400">Sub ID / campaign tag</label>
            <input
              value={subId}
              onChange={(e) => setSubId(e.target.value)}
              placeholder="addlivetag-hopback"
              className="rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400"
            />

            <div className="mt-2 flex flex-wrap gap-3">
              <button onClick={generate} disabled={!canSubmit || loading} className="pill-btn disabled:opacity-40">
                {loading ? 'Generating…' : 'Generate link'}
              </button>
              <button className="rounded-full border border-zinc-700 px-5 py-3 text-sm text-zinc-200 transition hover:border-zinc-500">Save preset</button>
            </div>
          </div>

          {loading && (
            <div className="mt-4 h-1 w-full overflow-hidden rounded bg-zinc-800">
              <div className="h-full w-1/3 animate-pulse bg-cyan-400" />
            </div>
          )}

          {result && (
            <div className="mt-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
              <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cyan-200"><Link2 size={14} /> Generated URL</p>
              <p className="break-all">{result}</p>
              <button onClick={copyResult} className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-4 py-2 text-xs font-semibold text-cyan-100">
                <Copy size={14} /> {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
          )}
        </motion.div>

        <motion.aside initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="panel p-6">
          <h3 className="text-lg font-semibold">Recent generated links</h3>
          <div className="mt-4 space-y-3 text-sm">
            {[
              'addlivetag-fashion-launch',
              'addlivetag-flashsale-11',
              'addlivetag-tech-gadgets'
            ].map((tag) => (
              <div key={tag} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
                <p className="text-zinc-300">{tag}</p>
                <p className="mt-1 text-xs text-zinc-500">3m ago • 129 clicks</p>
              </div>
            ))}
          </div>
        </motion.aside>
      </section>
    </main>
  );
}
