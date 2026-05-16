'use client';

import type { Tool } from '@/data/types';
import { getTagDisplay } from '@/data/tag-labels';

type TagCloudProps = {
  tools: Tool[];
  locale: 'en' | 'zh';
  activeTags: string[];
  onTagClick: (tag: string) => void;
  labels: { title: string };
};

export function TagCloud({ tools, locale, activeTags, onTagClick, labels }: TagCloudProps) {
  const tagCounts = new Map<string, number>();
  for (const tool of tools) {
    for (const tag of tool.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const sorted = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] ?? 1;

  const sizeClass = (count: number) => {
    const ratio = count / max;
    if (ratio >= 0.6) return 'text-sm font-medium';
    if (ratio >= 0.3) return 'text-xs';
    return 'text-[11px]';
  };

  const opacityClass = (count: number, active: boolean) => {
    if (active) return '';
    const ratio = count / max;
    if (ratio >= 0.6) return 'opacity-90';
    if (ratio >= 0.3) return 'opacity-65';
    return 'opacity-40';
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="mb-3 text-xs tracking-widest text-white/50 uppercase">{labels.title}</p>
      <div className="flex flex-wrap gap-1.5">
        {sorted.map(([tag, count]) => {
          const active = activeTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onTagClick(tag)}
              title={String(count)}
              className={`rounded-full border px-2.5 py-0.5 transition ${sizeClass(count)} ${opacityClass(count, active)} ${
                active
                  ? 'border-cyan-300/60 bg-cyan-400/20 text-cyan-100'
                  : 'border-white/15 bg-black/20 text-white/80 hover:border-white/35 hover:text-white hover:opacity-100'
              }`}
            >
              {getTagDisplay(tag, locale)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
