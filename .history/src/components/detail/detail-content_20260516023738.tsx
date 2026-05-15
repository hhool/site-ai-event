'use client';

import { motion } from 'framer-motion';
import type { ToolDetail } from '@/data/types';

type DetailContentProps = {
  detail: ToolDetail;
  headings: {
    highlights: string;
    community: string;
    audience: string;
  };
};

export function DetailContent({ detail, headings }: DetailContentProps) {
  return (
    <article className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
        className="leading-8 text-white/85"
      >
        {detail.background}
      </motion.p>

      <h2 className="mt-10 text-2xl font-medium">{headings.highlights}</h2>
      <ul className="mt-4 space-y-4">
        {detail.highlights.map((item, index) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.28, delay: index * 0.04 }}
          >
            <p className="font-medium text-white">{item.title}</p>
            <p className="text-white/75">{item.desc}</p>
          </motion.li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl font-medium">{headings.community}</h2>
      <p className="mt-3 text-white/75">{detail.community}</p>

      <h2 className="mt-10 text-2xl font-medium">{headings.audience}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {detail.audience.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm font-medium text-cyan-100">{item.label}</p>
            <p className="mt-2 text-sm text-white/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
