'use client';

import { useMemo, useState } from 'react';
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
    toolsMatched: string;
    noResults: string;
  };
};

type ScenarioOption = {
  name: string;
  count: number;
};

export function ScenarioBrowser({ locale, tools, years, labels }: ScenarioBrowserProps) {
  const [activeScenario, setActiveScenario] = useState<string>('all');

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

  const filteredTools = useMemo(() => {
    if (activeScenario === 'all') {
      return tools;
    }

    return tools.filter((tool) => tool.categories[locale].includes(activeScenario));
  }, [activeScenario, locale, tools]);

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

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveScenario('all')}
            className={`rounded-full border px-3 py-1.5 text-xs transition md:text-sm ${
              activeScenario === 'all'
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
              onClick={() => setActiveScenario(scenario.name)}
              className={`rounded-full border px-3 py-1.5 text-xs transition md:text-sm ${
                activeScenario === scenario.name
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
