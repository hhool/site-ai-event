'use client';

import { useMemo, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Tool } from '@/data/types';

type AdvancedFiltersProps = {
  locale: 'en' | 'zh';
  tools: Tool[];
  labels: {
    title: string;
    difficultyLabel: string;
    communitySizeLabel: string;
    tagsLabel: string;
    clearAll: string;
    any: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    small: string;
    medium: string;
    large: string;
  };
};

const DIFFICULTY_COLORS = {
  beginner: 'border-emerald-500/60 text-emerald-300 bg-emerald-500/10',
  intermediate: 'border-amber-500/60 text-amber-300 bg-amber-500/10',
  advanced: 'border-red-500/60 text-red-300 bg-red-500/10',
} as const;

const COMMUNITY_COLORS = {
  small: 'border-slate-500/60 text-slate-300 bg-slate-500/10',
  medium: 'border-blue-500/60 text-blue-300 bg-blue-500/10',
  large: 'border-violet-500/60 text-violet-300 bg-violet-500/10',
} as const;

export function AdvancedFilters({ locale: _locale, tools, labels }: AdvancedFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const difficulty = searchParams.get('difficulty') ?? 'any';
  const communitySize = searchParams.get('communitySize') ?? 'any';
  const activeTags = useMemo(() => {
    const raw = searchParams.get('tags');
    return raw ? raw.split(',').filter(Boolean) : ([] as string[]);
  }, [searchParams]);

  // Compute all unique tags from tools
  const allTags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    for (const tool of tools) {
      for (const tag of tool.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
      }
    }
    return [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [tools]);

  const hasFilters = difficulty !== 'any' || communitySize !== 'any' || activeTags.length > 0;

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === 'any') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const toggleTag = useCallback(
    (tag: string) => {
      const next = activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag];
      updateParam('tags', next.length ? next.join(',') : null);
    },
    [activeTags, updateParam],
  );

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('difficulty');
    params.delete('communitySize');
    params.delete('tags');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [searchParams, pathname, router]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wider text-white/70 uppercase">
          {labels.title}
        </h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {labels.clearAll}
          </button>
        )}
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <p className="mb-2 text-xs text-white/50 uppercase tracking-widest">
          {labels.difficultyLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {(['any', 'beginner', 'intermediate', 'advanced'] as const).map((level) => {
            const isActive = difficulty === level;
            const colorClass =
              level === 'any'
                ? isActive
                  ? 'border-white/60 text-white bg-white/15'
                  : 'border-white/20 text-white/50'
                : isActive
                  ? DIFFICULTY_COLORS[level]
                  : `border-white/10 text-white/40 hover:${DIFFICULTY_COLORS[level]}`;

            return (
              <button
                key={level}
                onClick={() => updateParam('difficulty', level)}
                className={`rounded-full border px-3 py-1 text-xs transition-all ${colorClass} cursor-pointer`}
              >
                {labels[level as keyof typeof labels] as string}
              </button>
            );
          })}
        </div>
      </div>

      {/* Community Size */}
      <div className="mb-4">
        <p className="mb-2 text-xs text-white/50 uppercase tracking-widest">
          {labels.communitySizeLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {(['any', 'small', 'medium', 'large'] as const).map((size) => {
            const isActive = communitySize === size;
            const colorClass =
              size === 'any'
                ? isActive
                  ? 'border-white/60 text-white bg-white/15'
                  : 'border-white/20 text-white/50'
                : isActive
                  ? COMMUNITY_COLORS[size]
                  : 'border-white/10 text-white/40';

            return (
              <button
                key={size}
                onClick={() => updateParam('communitySize', size)}
                className={`rounded-full border px-3 py-1 text-xs transition-all ${colorClass} cursor-pointer`}
              >
                {labels[size as keyof typeof labels] as string}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <div>
        <p className="mb-2 text-xs text-white/50 uppercase tracking-widest">{labels.tagsLabel}</p>
        <div className="flex flex-wrap gap-2">
          {allTags.map(({ tag, count }) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-300'
                    : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/60'
                }`}
              >
                {tag}
                <span className="ml-1 opacity-50">({count})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Hook: apply advanced filters to a tools list
export function useAdvancedFilters(tools: Tool[]) {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const difficulty = searchParams.get('difficulty') ?? 'any';
    const communitySize = searchParams.get('communitySize') ?? 'any';
    const tags = (searchParams.get('tags') ?? '').split(',').filter(Boolean);

    return tools.filter((tool) => {
      if (difficulty !== 'any' && tool.difficulty !== difficulty) return false;
      if (communitySize !== 'any' && tool.communitySize !== communitySize) return false;
      if (tags.length > 0 && !tags.some((tag) => tool.tags.includes(tag))) return false;
      return true;
    });
  }, [tools, searchParams]);
}
