'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Tool } from '@/data/types';
import { ToolCard } from '@/components/home/tool-card';

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
  };
};

type ScenarioOption = {
  name: string;
  count: number;
};

export function ScenarioBrowser({ locale, tools, years, labels }: ScenarioBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const filteredTools = useMemo(() => {
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

  const groupedByYear = useMemo(() => {
    const grouped = new Map<number, Tool[]>();
    for (const year of years) {
      grouped.set(year, filteredTools.filter((tool) => tool.year === year));
    }
    return grouped;
  }, [filteredTools, years]);

  return (
    <section className="mt-12 space-y-8">
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

      <p className="text-sm text-white/70">
        {labels.toolsMatched}: {filteredTools.length}
      </p>

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
                    labels={{
                      openDemo: labels.openDemo,
                      github: labels.github,
                      readMore: labels.readMore,
                      stars: labels.stars,
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
          {labels.noResults}
        </div>
      ) : null}
    </section>
  );
}
