'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Tool } from '@/data/types';

type ComparePanelProps = {
  tools: Tool[];
  slugs: string[];
  locale: 'en' | 'zh';
  onRemove: (slug: string) => void;
  onClear: () => void;
  labels: {
    title: string;
    clear: string;
    stars: string;
    maxReached: string;
  };
};

export function ComparePanel({
  tools,
  slugs,
  locale,
  onRemove,
  onClear,
  labels,
}: ComparePanelProps) {
  const selected = slugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean) as Tool[];

  return (
    <AnimatePresence>
      {selected.length >= 1 ? (
        <motion.div
          key="compare-panel"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 bg-[#08080f]/92 px-4 py-3 backdrop-blur-xl md:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-medium tracking-widest text-white/55 uppercase">
                {labels.title} ({selected.length}/3)
              </p>
              <button
                type="button"
                onClick={onClear}
                className="rounded-full border border-white/20 px-3 py-0.5 text-[11px] text-white/55 transition hover:border-white/40 hover:text-white"
              >
                {labels.clear}
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {selected.map((tool) => (
                <div
                  key={tool.slug}
                  className="flex items-start justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{tool.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-white/50">
                      {tool.tagline[locale]}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <span className="rounded-full border border-white/15 px-1.5 py-0.5 text-[10px] text-white/55">
                        {tool.year}
                      </span>
                      <span className="rounded-full border border-white/15 px-1.5 py-0.5 text-[10px] text-white/55">
                        {labels.stars}: {tool.stars}
                      </span>
                      <span className="rounded-full border border-white/15 px-1.5 py-0.5 text-[10px] text-white/55">
                        {tool.difficulty}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {tool.categories[locale].slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/65"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(tool.slug)}
                    className="mt-0.5 shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/45 transition hover:border-red-300/40 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
