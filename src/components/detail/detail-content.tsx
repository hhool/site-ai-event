'use client';

import { motion } from 'framer-motion';
import type { ToolDetail } from '@/data/types';

type DetailContentProps = {
  detail: ToolDetail;
  headings: {
    plainSummary: string;
    background: string;
    highlights: string;
    useCases: string;
    community: string;
    audience: string;
    developerGuide: string;
    evaluationChecklist: string;
  };
};

export function DetailContent({ detail, headings }: DetailContentProps) {
  return (
    <article className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
      <div className="grid gap-4 md:grid-cols-5">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-5 md:col-span-3"
        >
          <p className="text-xs tracking-[0.24em] text-cyan-100/80 uppercase">{headings.plainSummary}</p>
          <p className="mt-3 leading-8 text-white/90">{detail.plainSummary}</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-5 md:col-span-2"
        >
          <p className="text-xs tracking-[0.24em] text-violet-100/80 uppercase">{headings.developerGuide}</p>
          <ul className="mt-3 space-y-3 text-sm text-white/78">
            {detail.developerTips.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-200" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, delay: 0.04 }}
        className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5"
      >
        <p className="text-xs tracking-[0.24em] text-white/55 uppercase">{headings.background}</p>
        <p className="mt-3 leading-8 text-white/85">{detail.background}</p>
      </motion.section>

      <h2 className="mt-10 text-2xl font-medium">{headings.highlights}</h2>
      <ul className="mt-4 space-y-4">
        {detail.highlights.map((item, index) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.28, delay: index * 0.04 }}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <p className="font-medium text-white">{item.title}</p>
            <p className="mt-1 text-white/75">{item.desc}</p>
          </motion.li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl font-medium">{headings.useCases}</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {detail.useCases.map((item) => (
          <li key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/80">
            {item}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl font-medium">{headings.community}</h2>
      <p className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 leading-8 text-white/80">
        {detail.community}
      </p>

      <h2 className="mt-10 text-2xl font-medium">{headings.audience}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {detail.audience.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm font-medium text-cyan-100">{item.label}</p>
            <p className="mt-2 text-sm text-white/70">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-medium">{headings.evaluationChecklist}</h2>
      <ul className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
        {detail.evaluationChecklist.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-7 text-white/78">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
