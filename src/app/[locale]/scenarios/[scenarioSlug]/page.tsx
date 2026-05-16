import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { tools } from '@/data/tools';
import { ToolCard } from '@/components/home/tool-card';
import type { Tool } from '@/data/types';

type Params = {
  locale: string;
  scenarioSlug: string;
};

const getAllScenarios = (locale: 'en' | 'zh') => {
  const scenarios = new Map<string, { name: string; count: number }>();

  for (const tool of tools) {
    for (const category of tool.categories[locale]) {
      const slug = category.toLowerCase().replace(/\s+/g, '-');
      if (!scenarios.has(slug)) {
        scenarios.set(slug, { name: category, count: 0 });
      }
      const current = scenarios.get(slug)!;
      current.count += 1;
    }
  }

  return Array.from(scenarios.entries())
    .map(([slug, data]) => ({
      slug,
      name: data.name,
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count);
};

const getToolsForScenario = (
  locale: 'en' | 'zh',
  scenarioSlug: string,
): [string, Tool[]] => {
  const allScenarios = getAllScenarios(locale);
  const found = allScenarios.find((s) => s.slug === scenarioSlug);

  if (!found) {
    return [scenarioSlug, []];
  }

  const scenarioName = found.name;
  const matchedTools = tools.filter((tool) => tool.categories[locale].includes(scenarioName));
  return [scenarioName, matchedTools];
};

export async function generateStaticParams() {
  const en = getAllScenarios('en').map((s) => ({
    locale: 'en',
    scenarioSlug: s.slug,
  }));

  const zh = getAllScenarios('zh').map((s) => ({
    locale: 'zh',
    scenarioSlug: s.slug,
  }));

  return [...en, ...zh];
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { scenarioSlug } = await params;
  const locale = await getLocale();
  const safeLocale = locale === 'zh' ? 'zh' : 'en';
  const t = await getTranslations();

  const [scenarioName, matchedTools] = getToolsForScenario(safeLocale, scenarioSlug);

  if (matchedTools.length === 0) {
    notFound();
  }

  const groupedByYear = new Map<number, Tool[]>();
  for (const tool of matchedTools) {
    if (!groupedByYear.has(tool.year)) {
      groupedByYear.set(tool.year, []);
    }
    groupedByYear.get(tool.year)!.push(tool);
  }

  const years = [2025, 2024, 2023] as const;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Link className="text-sm text-cyan-300" href={`/${safeLocale}`}>
          {t('common.backToList')}
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-md md:px-10 md:py-14">
          <p className="text-xs tracking-[0.24em] text-cyan-200/85 uppercase">
            {safeLocale === 'zh' ? '任务场景' : 'Task Scenario'}
          </p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{scenarioName}</h1>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            {safeLocale === 'zh'
              ? `发现 ${matchedTools.length} 个与"${scenarioName}"相关的开源 AI 工具。`
              : `Discover ${matchedTools.length} open-source AI tools related to "${scenarioName}".`}
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {years.map((year) => {
            const yearTools = groupedByYear.get(year) ?? [];
            if (yearTools.length === 0) {
              return null;
            }

            return (
              <section key={year} className="space-y-5">
                <h2 className="text-2xl font-medium text-white/90">
                  {t('common.year')}: {year}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {yearTools.map((tool, index) => (
                    <ToolCard
                      key={tool.slug}
                      tool={tool}
                      locale={safeLocale}
                      index={index}
                      labels={{
                        openDemo: t('common.openDemo'),
                        github: t('common.github'),
                        readMore: t('common.readMore'),
                        stars: t('common.stars'),
                      }}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
