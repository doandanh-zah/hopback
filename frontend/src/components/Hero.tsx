"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-6xl px-6 pt-14"
    >
      <div className="mb-4 flex items-center gap-2">
        <p className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-1 text-xs uppercase tracking-widest text-violet-200">
          <Sparkles size={13} /> $hopback
        </p>
        <p className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-wider text-cyan-200">Affiliate Ops Dashboard</p>
      </div>
      <h1 className="text-4xl font-bold leading-tight md:text-6xl">
        Build, optimize and monitor <span className="gradient-text">Shopee affiliate campaigns</span>
      </h1>
      <p className="mt-4 max-w-3xl text-zinc-300">From raw product links to production-ready redirect URLs, campaign tags, conversion snapshots and operator workflows in one polished control room.</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button onClick={onDemo} className="pill-btn gap-2">Open studio <ArrowRight size={18} /></button>
        <button className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900/60">View campaign insights</button>
      </div>
    </motion.section>
  );
}
