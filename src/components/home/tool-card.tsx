'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import type { Tool } from '@/data/types';
import { ExternalLinkPill } from '@/components/shared/external-link-pill';

type ToolCardProps = {
  tool: Tool;
  locale: 'en' | 'zh';
  index: number;
  highlightQuery?: string;
  matchHints?: string[];
  labels: {
    openDemo: string;
    github: string;
    readMore: string;
    stars: string;
  };
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text: string, query?: string) {
  const q = (query ?? '').trim();
  if (!q) {
    return text;
  }

  const regex = new RegExp(`(${escapeRegExp(q)})`, 'ig');
  const parts = text.split(regex);
  return parts.map((part, idx) => {
    const isMatch = part.toLowerCase() === q.toLowerCase();
    if (!isMatch) {
      return <Fragment key={`${part}-${idx}`}>{part}</Fragment>;
    }

    return (
      <mark
        key={`${part}-${idx}`}
        className="rounded bg-cyan-300/30 px-1 text-cyan-100"
      >
        {part}
      </mark>
    );
  });
}

const yearTheme: Record<Tool['year'], string> = {
  2023: 'from-sky-500/45 to-cyan-400/35',
  2024: 'from-violet-500/45 to-fuchsia-400/35',
  2025: 'from-orange-500/45 to-amber-400/35',
};

export function ToolCard({ tool, locale, index, highlightQuery, matchHints = [], labels }: ToolCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-200/55"
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 blur-md transition group-hover:opacity-80 group-hover:duration-300" />
      <div className="relative">
        <span
          className={`inline-flex rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium text-white ${yearTheme[tool.year]}`}
        >
          {tool.year}
        </span>
        <h3 className="mt-4 text-xl font-medium">{highlightText(tool.name, highlightQuery)}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/70">
          {highlightText(tool.tagline[locale], highlightQuery)}
        </p>

        {matchHints.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {matchHints.map((hint) => (
              <span
                key={hint}
                className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-2 py-0.5 text-[10px] text-cyan-100"
              >
                {hint}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {tool.categories[locale].slice(0, 2).map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[11px] tracking-wide text-white/70 uppercase"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-4 text-xs text-white/65">
          {labels.stars}: {tool.stars}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <ExternalLinkPill href={tool.demoUrl}>{labels.openDemo}</ExternalLinkPill>
          <ExternalLinkPill href={tool.githubUrl}>{labels.github}</ExternalLinkPill>
        </div>

        <Link
          href={`/${locale}/tool/${tool.slug}`}
          className="mt-5 inline-block text-sm text-white/90 underline underline-offset-4 hover:text-cyan-200"
        >
          {labels.readMore}
        </Link>
      </div>
    </motion.article>
  );
}
