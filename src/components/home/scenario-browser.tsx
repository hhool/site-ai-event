'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Tool } from '@/data/types';
import { ToolCard } from '@/components/home/tool-card';
import { AdvancedFilters, useAdvancedFilters } from '@/components/home/advanced-filters';
import { TagCloud } from '@/components/home/tag-cloud';
import { ComparePanel } from '@/components/home/compare-panel';
import { useFavorites } from '@/hooks/use-favorites';
import { getTagDisplay } from '@/data/tag-labels';

type ScenarioBrowserProps = {
  locale: 'en' | 'zh';
  tools: Tool[];
  years: readonly (2023 | 2024 | 2025)[];
  labels: {
    openDemo: string;
    github: string;
    readMore: string;
    stars: string;
    year: string;
    scenarioTitle: string;
    scenarioSubtitle: string;
    allScenarios: string;
    selectedScenarios: string;
    clearFilters: string;
    matchAny: string;
    matchAll: string;
    toolsMatched: string;
    noResults: string;
    advancedFilters: string;
    filterDifficulty: string;
    filterCommunity: string;
    filterTags: string;
    filterClearAll: string;
    filterAny: string;
    filterBeginner: string;
    filterIntermediate: string;
    filterAdvanced: string;
    filterSmall: string;
    filterMedium: string;
    filterLarge: string;
    activeFilters: string;
    showFilters: string;
    hideFilters: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchClear: string;
    yearStatsTitle: string;
    yearShare: string;
    noResultHints: string;
    nextBatch: string;
    matchInTitle: string;
    matchInTagline: string;
    matchInBackground: string;
    matchInHighlights: string;
    recommendBecause: string;
    recommendFallback: string;
    recommendSourceTools: string;
    relevanceScore: string;
    relevanceHigh: string;
    relevanceMedium: string;
    relevanceLow: string;
    resetSuggestions: string;
    tagCloudTitle: string;
    favoritesOnly: string;
    noFavorites: string;
    favoriteAdd: string;
    compareTitle: string;
    compareClear: string;
    compareAdd: string;
    quickFlowTitle: string;
    quickFlowBody: string;
    proFlowTitle: string;
    proFlowBody: string;
  };
};

type ScenarioOption = {
  name: string;
  count: number;
};
type RecommendedTag = {
  tag: string;
  score: number;
  reasons: string[];
  reasonPcts: number[];
  contributors: string[];
};

export function ScenarioBrowser({ locale, tools, years, labels }: ScenarioBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [suggestionBatch, setSuggestionBatch] = useState(0);
  const [recentSuggestionSignatures, setRecentSuggestionSignatures] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [comparedSlugs, setComparedSlugs] = useState<string[]>([]);
  const { favorites, toggle: toggleFavorite } = useFavorites();

  const scenarios = useMemo<ScenarioOption[]>(() => {
    const counts = new Map<string, number>();
    for (const tool of tools) {
      for (const category of tool.categories[locale]) {
        counts.set(category, (counts.get(category) ?? 0) + 1);
      }
    }

    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [locale, tools]);

  const scenarioNames = useMemo(() => new Set(scenarios.map((scenario) => scenario.name)), [scenarios]);

  const selectedScenarios = useMemo(() => {
    const raw = searchParams.get('scenarios');
    if (!raw) {
      return [] as string[];
    }

    return raw
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name.length > 0 && scenarioNames.has(name));
  }, [scenarioNames, searchParams]);

  const matchMode = searchParams.get('mode') === 'all' ? 'all' : 'any';
  const searchQuery = searchParams.get('q') ?? '';

  const updateFilters = (nextScenarios: string[], nextMode: 'any' | 'all' = matchMode) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextScenarios.length === 0) {
      params.delete('scenarios');
    } else {
      params.set('scenarios', [...nextScenarios].sort((a, b) => a.localeCompare(b)).join(','));
    }

    if (nextMode === 'all') {
      params.set('mode', 'all');
    } else {
      params.delete('mode');
    }

    const query = params.toString();
    router.replace(query.length > 0 ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const toggleScenario = (scenarioName: string) => {
    if (selectedScenarios.includes(scenarioName)) {
      updateFilters(selectedScenarios.filter((name) => name !== scenarioName));
      return;
    }

    updateFilters([...selectedScenarios, scenarioName]);
  };

  const updateSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      params.delete('q');
    } else {
      params.set('q', trimmed);
    }

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const updateSearchWithReset = (query: string) => {
    setSuggestionBatch(0);
    setRecentSuggestionSignatures([]);
    updateSearch(query);
  };

  // Apply scenario filter first
  const scenarioFilteredTools = useMemo(() => {
    if (selectedScenarios.length === 0) {
      return tools;
    }

    return tools.filter((tool) => {
      const categories = tool.categories[locale];
      if (matchMode === 'all') {
        return selectedScenarios.every((scenario) => categories.includes(scenario));
      }

      return selectedScenarios.some((scenario) => categories.includes(scenario));
    });
  }, [locale, matchMode, selectedScenarios, tools]);

  // Then apply advanced filters (difficulty, communitySize, tags)
  const advancedFilteredTools = useAdvancedFilters(scenarioFilteredTools);

  // Apply favorites-only filter (local state, not URL)
  const preSearchTools = useMemo(
    () =>
      showFavoritesOnly ? advancedFilteredTools.filter((tool) => favorites.has(tool.slug)) : advancedFilteredTools,
    [advancedFilteredTools, favorites, showFavoritesOnly],
  );

  // Finally apply full-text keyword search with hit-strength ranking.
  const searchEvaluation = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return {
        tools: preSearchTools,
        hitMap: new Map<string, string[]>(),
        scoreMap: new Map<string, number>(),
      };
    }

    const hitMap = new Map<string, string[]>();
    const scoreMap = new Map<string, number>();
    const ranked = preSearchTools
      .map((tool) => {
        let score = 0;
        const hits: string[] = [];

        if (tool.name.toLowerCase().includes(q)) {
          score += 12;
          hits.push(labels.matchInTitle);
        }
        if (tool.tagline[locale].toLowerCase().includes(q)) {
          score += 7;
          hits.push(labels.matchInTagline);
        }
        if (tool.detail[locale].background.toLowerCase().includes(q)) {
          score += 2;
          hits.push(labels.matchInBackground);
        }

        const highlightJoined = tool.detail[locale].highlights
          .map((h) => `${h.title} ${h.desc}`)
          .join(' ')
          .toLowerCase();
        if (highlightJoined.includes(q)) {
          score += 4;
          hits.push(labels.matchInHighlights);
        }

        const normalizedScore = score > 0 ? Math.min(100, Math.round((score / 25) * 100)) : 0;
        if (hits.length > 0) {
          hitMap.set(tool.slug, hits);
          scoreMap.set(tool.slug, normalizedScore);
        }

        return { tool, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name));

    return {
      tools: ranked.map((item) => item.tool),
      hitMap,
      scoreMap,
    };
  }, [preSearchTools, labels.matchInBackground, labels.matchInHighlights, labels.matchInTagline, labels.matchInTitle, locale, searchQuery]);

  const filteredTools = searchEvaluation.tools;
  const searchHitMap = searchEvaluation.hitMap;
  const searchScoreMap = searchEvaluation.scoreMap;

  const groupedByYear = useMemo(() => {
    const grouped = new Map<number, Tool[]>();
    for (const year of years) {
      grouped.set(year, filteredTools.filter((tool) => tool.year === year));
    }
    return grouped;
  }, [filteredTools, years]);

  const yearStats = useMemo(() => {
    const total = filteredTools.length;
    return years.map((year) => {
      const count = filteredTools.filter((tool) => tool.year === year).length;
      const ratio = total > 0 ? Math.round((count / total) * 100) : 0;
      return { year, count, ratio };
    });
  }, [filteredTools, years]);

  const recommendedTags = useMemo<RecommendedTag[]>(() => {
    if (filteredTools.length > 0) {
      return [];
    }

    const pool =
      advancedFilteredTools.length > 0
        ? advancedFilteredTools
        : scenarioFilteredTools.length > 0
          ? scenarioFilteredTools
          : tools;
    const scored = new Map<
      string,
      { score: number; scenarioScores: Map<string, number>; contributors: Set<string> }
    >();
    const active = new Set((searchParams.get('tags') ?? '').split(',').filter(Boolean));

    for (const tool of pool) {
      const matchedScenarios = selectedScenarios.filter((scenario) =>
        tool.categories[locale].includes(scenario),
      );
      const scenarioMatchCount = matchedScenarios.length;
      const scenarioWeight = scenarioMatchCount > 0 ? 1 + scenarioMatchCount * 2 : 1;
      const perScenarioWeight = scenarioMatchCount > 0 ? scenarioWeight / scenarioMatchCount : 0;

      for (const tag of tool.tags) {
        if (!active.has(tag)) {
          const current = scored.get(tag) ?? {
            score: 0,
            scenarioScores: new Map<string, number>(),
            contributors: new Set<string>(),
          };
          current.score += scenarioWeight;
          matchedScenarios.forEach((scenario) => {
            current.scenarioScores.set(
              scenario,
              (current.scenarioScores.get(scenario) ?? 0) + perScenarioWeight,
            );
          });
          current.contributors.add(tool.name);
          scored.set(tag, current);
        }
      }
    }

    return [...scored.entries()]
      .sort((a, b) => b[1].score - a[1].score || a[0].localeCompare(b[0]))
      .map(([tag, value]) => {
        const scenarioEntries = [...value.scenarioScores.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 2);
        const totalScenarioScore = [...value.scenarioScores.values()].reduce((a, b) => a + b, 0);
        return {
          tag,
          score: value.score,
          reasons: scenarioEntries.map(([s]) => s),
          reasonPcts: scenarioEntries.map(([, s]) =>
            totalScenarioScore > 0 ? Math.round((s / totalScenarioScore) * 100) : 0,
          ),
          contributors: [...value.contributors].slice(0, 3),
        };
      });
  }, [advancedFilteredTools, filteredTools.length, locale, scenarioFilteredTools, searchParams, selectedScenarios, tools]);

  const visibleRecommendedTags = useMemo<RecommendedTag[]>(() => {
    if (recommendedTags.length === 0) {
      return [];
    }

    const batchSize = 6;
    const start = suggestionBatch % recommendedTags.length;
    const ordered = [...recommendedTags.slice(start), ...recommendedTags.slice(0, start)];
    return ordered.slice(0, Math.min(batchSize, recommendedTags.length));
  }, [recommendedTags, suggestionBatch]);

  const rotateSuggestionBatch = () => {
    if (recommendedTags.length <= 1) {
      return;
    }

    const batchSize = Math.min(6, recommendedTags.length);
    const getBatchSignature = (start: number) => {
      const ordered = [...recommendedTags.slice(start), ...recommendedTags.slice(0, start)];
      return ordered
        .slice(0, batchSize)
        .map((item) => item.tag)
        .join('|');
    };

    const recent = new Set(recentSuggestionSignatures);
    const unseenCandidates: Array<{ cursor: number; signature: string }> = [];
    for (let step = 1; step <= recommendedTags.length; step += 1) {
      const cursor = (suggestionBatch + step) % recommendedTags.length;
      const signature = getBatchSignature(cursor);
      if (!recent.has(signature)) {
        unseenCandidates.push({ cursor, signature });
      }
    }

    const fallbackCursor = (suggestionBatch + 1) % recommendedTags.length;
    const fallbackSignature = getBatchSignature(fallbackCursor);
    const chosen =
      unseenCandidates.length > 0
        ? unseenCandidates[Math.floor(Math.random() * unseenCandidates.length)]
        : { cursor: fallbackCursor, signature: fallbackSignature };

    if (unseenCandidates.length === 0) {
      setRecentSuggestionSignatures([chosen.signature]);
    } else {
      setRecentSuggestionSignatures((prev) => [...prev, chosen.signature].slice(-8));
    }
    setSuggestionBatch(chosen.cursor);
  };

  const addRecommendedTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = (params.get('tags') ?? '').split(',').filter(Boolean);
    if (!current.includes(tag)) {
      params.set('tags', [...current, tag].join(','));
    }
    params.delete('q');
    const qs = params.toString();
    setSuggestionBatch(0);
    setRecentSuggestionSignatures([]);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <section className="mt-12 space-y-8">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-4">
          <p className="text-xs tracking-[0.22em] text-cyan-100/80 uppercase">{labels.quickFlowTitle}</p>
          <p className="mt-2 text-sm leading-7 text-white/80">{labels.quickFlowBody}</p>
        </div>
        <div className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-4">
          <p className="text-xs tracking-[0.22em] text-violet-100/80 uppercase">{labels.proFlowTitle}</p>
          <p className="mt-2 text-sm leading-7 text-white/80">{labels.proFlowBody}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {yearStats.map((stat) => (
          <div
            key={stat.year}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-4"
          >
            <p className="text-xs tracking-widest text-white/55 uppercase">{labels.yearStatsTitle}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{stat.year}</p>
            <p className="mt-2 text-sm text-white/80">
              {labels.toolsMatched}: {stat.count}
            </p>
            <p className="text-xs text-cyan-200/90">
              {labels.yearShare}: {stat.ratio}%
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <h2 className="text-2xl font-semibold text-white">{labels.scenarioTitle}</h2>
        <p className="mt-2 text-sm text-white/75 md:text-base">{labels.scenarioSubtitle}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <button
            type="button"
            onClick={() => updateFilters(selectedScenarios, 'any')}
            className={`rounded-full border px-3 py-1.5 transition ${
              matchMode === 'any'
                ? 'border-cyan-300/60 bg-cyan-400/20 text-cyan-100'
                : 'border-white/20 bg-black/20 text-white/75 hover:border-white/40 hover:text-white'
            }`}
          >
            {labels.matchAny}
          </button>
          <button
            type="button"
            onClick={() => updateFilters(selectedScenarios, 'all')}
            className={`rounded-full border px-3 py-1.5 transition ${
              matchMode === 'all'
                ? 'border-cyan-300/60 bg-cyan-400/20 text-cyan-100'
                : 'border-white/20 bg-black/20 text-white/75 hover:border-white/40 hover:text-white'
            }`}
          >
            {labels.matchAll}
          </button>
          <span className="ml-1 text-white/70">
            {labels.selectedScenarios}: {selectedScenarios.length}
          </span>
          {selectedScenarios.length > 0 ? (
            <button
              type="button"
              onClick={() => updateFilters([])}
              className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-white/75 transition hover:border-white/40 hover:text-white"
            >
              {labels.clearFilters}
            </button>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => updateFilters([])}
            className={`rounded-full border px-3 py-1.5 text-xs transition md:text-sm ${
              selectedScenarios.length === 0
                ? 'border-cyan-300/60 bg-cyan-400/20 text-cyan-100'
                : 'border-white/20 bg-black/20 text-white/75 hover:border-white/40 hover:text-white'
            }`}
          >
            {labels.allScenarios} ({tools.length})
          </button>

          {scenarios.map((scenario) => (
            <button
              key={scenario.name}
              type="button"
              onClick={() => toggleScenario(scenario.name)}
              className={`rounded-full border px-3 py-1.5 text-xs transition md:text-sm ${
                selectedScenarios.includes(scenario.name)
                  ? 'border-cyan-300/60 bg-cyan-400/20 text-cyan-100'
                  : 'border-white/20 bg-black/20 text-white/75 hover:border-white/40 hover:text-white'
              }`}
            >
              {scenario.name} ({scenario.count})
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AdvancedFilters
        locale={locale}
        tools={tools}
        labels={{
          title: labels.advancedFilters,
          activeFilters: labels.activeFilters,
          showFilters: labels.showFilters,
          hideFilters: labels.hideFilters,
          difficultyLabel: labels.filterDifficulty,
          communitySizeLabel: labels.filterCommunity,
          tagsLabel: labels.filterTags,
          clearAll: labels.filterClearAll,
          any: labels.filterAny,
          beginner: labels.filterBeginner,
          intermediate: labels.filterIntermediate,
          advanced: labels.filterAdvanced,
          small: labels.filterSmall,
          medium: labels.filterMedium,
          large: labels.filterLarge,
        }}
      />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <label className="mb-2 block text-xs tracking-widest text-white/60 uppercase">
          {labels.searchLabel}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => updateSearchWithReset(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-cyan-300/60"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => updateSearchWithReset('')}
              className="rounded-xl border border-white/20 px-3 py-2 text-xs text-white/75 transition hover:border-white/40 hover:text-white"
            >
              {labels.searchClear}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setShowFavoritesOnly((prev) => !prev)}
            className={`shrink-0 rounded-xl border px-3 py-2 text-xs transition ${
              showFavoritesOnly
                ? 'border-amber-300/50 bg-amber-300/10 text-amber-200'
                : 'border-white/20 text-white/55 hover:border-white/40 hover:text-white'
            }`}
            title={labels.favoritesOnly}
          >
            {showFavoritesOnly ? '★' : '☆'}
          </button>
        </div>
      </div>

      <TagCloud
        tools={advancedFilteredTools.length > 0 ? advancedFilteredTools : tools}
        locale={locale}
        activeTags={(searchParams.get('tags') ?? '').split(',').filter(Boolean)}
        onTagClick={(tag) => {
          const params = new URLSearchParams(searchParams.toString());
          const current = (params.get('tags') ?? '').split(',').filter(Boolean);
          if (current.includes(tag)) {
            const next = current.filter((t) => t !== tag);
            if (next.length > 0) {
              params.set('tags', next.join(','));
            } else {
              params.delete('tags');
            }
          } else {
            params.set('tags', [...current, tag].join(','));
          }
          const qs = params.toString();
          router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        }}
        labels={{ title: labels.tagCloudTitle }}
      />

      <p className="text-sm text-white/70">
        {labels.toolsMatched}: {filteredTools.length}
        {showFavoritesOnly && favorites.size > 0 ? (
          <span className="ml-2 text-amber-300/80">★ {favorites.size}</span>
        ) : null}
      </p>

      {showFavoritesOnly && filteredTools.length === 0 && favorites.size === 0 ? (
        <p className="rounded-2xl border border-dashed border-amber-300/20 bg-amber-300/5 p-6 text-center text-sm text-amber-200/60">
          {labels.noFavorites}
        </p>
      ) : null}

      <div className="space-y-12">
        {years.map((year) => {
          const items = groupedByYear.get(year) ?? [];
          if (items.length === 0) {
            return null;
          }

          return (
            <section key={year} className="space-y-5">
              <h3 className="text-2xl font-medium text-white/90">
                {labels.year}: {year}
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tool, index) => (
                  <ToolCard
                    key={tool.slug}
                    tool={tool}
                    locale={locale}
                    index={index}
                    highlightQuery={searchQuery}
                    matchHints={searchHitMap.get(tool.slug) ?? []}
                    relevanceScore={searchScoreMap.get(tool.slug)}
                    isFavorite={favorites.has(tool.slug)}
                    onToggleFavorite={() => toggleFavorite(tool.slug)}
                    isComparing={comparedSlugs.includes(tool.slug)}
                    onToggleCompare={() => {
                      setComparedSlugs((prev) =>
                        prev.includes(tool.slug)
                          ? prev.filter((s) => s !== tool.slug)
                          : prev.length < 3
                            ? [...prev, tool.slug]
                            : prev,
                      );
                    }}
                    labels={{
                      openDemo: labels.openDemo,
                      github: labels.github,
                      readMore: labels.readMore,
                      stars: labels.stars,
                      relevanceScore: labels.relevanceScore,
                      relevanceHigh: labels.relevanceHigh,
                      relevanceMedium: labels.relevanceMedium,
                      relevanceLow: labels.relevanceLow,
                      favorite: labels.favoriteAdd,
                      addCompare: labels.compareAdd,
                    }}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {filteredTools.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-6 text-center text-sm text-white/70">
          <p>{labels.noResults}</p>
          {visibleRecommendedTags.length > 0 ? (
            <div className="mt-4">
              <p className="mb-2 text-xs tracking-widest text-white/55 uppercase">{labels.noResultHints}</p>
              <div className="mb-3 flex justify-center gap-2">
                {recommendedTags.length > visibleRecommendedTags.length ? (
                  <button
                    type="button"
                    onClick={rotateSuggestionBatch}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/75 transition hover:border-white/40 hover:text-white"
                  >
                    {labels.nextBatch}
                  </button>
                ) : null}
                {recentSuggestionSignatures.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setRecentSuggestionSignatures([]);
                      setSuggestionBatch(0);
                    }}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/50 transition hover:border-white/35 hover:text-white/75"
                  >
                    {labels.resetSuggestions}
                  </button>
                ) : null}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {visibleRecommendedTags.map((item) => (
                  <div key={item.tag} className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-2">
                    <button
                      type="button"
                      onClick={() => addRecommendedTag(item.tag)}
                      className="rounded-full border border-cyan-400/45 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200 transition hover:border-cyan-300/70 hover:bg-cyan-300/15"
                    >
                      {getTagDisplay(item.tag, locale)}
                    </button>
                    <p className="mt-1 max-w-56 text-[11px] text-white/55">
                      {item.reasons.length > 0
                        ? `${labels.recommendBecause} ${item.reasons
                            .map((r, i) => (item.reasonPcts[i] < 100 ? `${r} (${item.reasonPcts[i]}%)` : r))
                            .join(' + ')}`
                        : labels.recommendFallback}
                    </p>
                    {item.contributors.length > 0 ? (
                      <p
                        className="mt-1 max-w-56 truncate text-[10px] text-white/45"
                        title={`${labels.recommendSourceTools}: ${item.contributors.join(', ')}`}
                      >
                        {labels.recommendSourceTools}: {item.contributors.join(', ')}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <ComparePanel
        tools={tools}
        slugs={comparedSlugs}
        locale={locale}
        onRemove={(slug) => setComparedSlugs((prev) => prev.filter((s) => s !== slug))}
        onClear={() => setComparedSlugs([])}
        labels={{
          title: labels.compareTitle,
          clear: labels.compareClear,
          stars: labels.stars,
          maxReached: labels.compareAdd,
        }}
      />
    </section>
  );
}
