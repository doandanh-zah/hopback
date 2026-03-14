"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl px-6 pt-14"
    >
      <p className="mb-3 inline-block rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-1 text-xs uppercase tracking-widest text-violet-200">$hopback</p>
      <h1 className="text-4xl font-bold leading-tight md:text-6xl">
        Shopee Affiliate Link Studio with <span className="text-cyan-300">smooth UX</span>
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-300">Paste link → generate affiliate redirect → track events. Fast, clean, no clutter.</p>
      <button onClick={onDemo} className="pill-btn mt-7 gap-2">Try demo <ArrowRight size={18} /></button>
    </motion.section>
  );
}
