import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { tools } from '@/data/tools';
import { ToolCard } from '@/components/home/tool-card';
import { getTagDisplay } from '@/data/tag-labels';
import type { Tool } from '@/data/types';

type Params = {
  locale: string;
  scenarioSlug: string;
};

const toScenarioSlug = (value: string) => value.trim().toLowerCase().replace(/\s+/g, '-');

const normalizeScenarioSlug = (value: string) => {
  try {
    return toScenarioSlug(decodeURIComponent(value));
  } catch {
    return toScenarioSlug(value);
  }
};

const getAllScenarios = (locale: 'en' | 'zh') => {
  const scenarios = new Map<string, { name: string; count: number }>();

  for (const tool of tools) {
    for (const category of tool.categories[locale]) {
      const slug = toScenarioSlug(category);
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
  const normalizedScenarioSlug = normalizeScenarioSlug(scenarioSlug);
  const found = allScenarios.find((s) => s.slug === normalizedScenarioSlug);

  if (!found) {
    return [normalizedScenarioSlug, []];
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

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { scenarioSlug } = await params;
  const locale = (await getLocale()) as 'en' | 'zh';
  const safeLocale = locale === 'zh' ? 'zh' : 'en';

  const [scenarioName, matchedTools] = getToolsForScenario(safeLocale, scenarioSlug);

  if (matchedTools.length === 0) {
    return {
      title: 'Scenario Not Found',
      description: 'The requested scenario was not found.',
    };
  }

  const title =
    safeLocale === 'zh'
      ? `${scenarioName} - AI 工具集合`
      : `${scenarioName} - AI Tools Directory`;

  const description =
    safeLocale === 'zh'
      ? `发现 ${matchedTools.length} 个与"${scenarioName}"相关的开源 AI 工具。浏览最新的 AI 技术。`
      : `Discover ${matchedTools.length} open-source AI tools related to "${scenarioName}". Browse the latest AI technology.`;

  const url = `https://site-ai-event.vercel.app/${safeLocale}/scenarios/${scenarioSlug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'AI Event',
      locale: safeLocale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://site-ai-event.vercel.app/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://site-ai-event.vercel.app/og-image.png'],
    },
  };
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

  const difficultyRank: Record<Tool['difficulty'], number> = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
  };

  for (const tool of matchedTools) {
    difficultyRank[tool.difficulty] += 1;
  }

  const difficultySummary = (['beginner', 'intermediate', 'advanced'] as const).map((key) => {
    const count = difficultyRank[key];
    const ratio = matchedTools.length > 0 ? Math.round((count / matchedTools.length) * 100) : 0;
    const label =
      key === 'beginner'
        ? t('common.filterBeginner')
        : key === 'intermediate'
          ? t('common.filterIntermediate')
          : t('common.filterAdvanced');

    return { key, label, count, ratio };
  });

  const topTags = (() => {
    const tagMap = new Map<string, number>();
    for (const tool of matchedTools) {
      for (const tag of tool.tags) {
        tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
      }
    }

    return [...tagMap.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 6);
  })();

  // Generate JSON-LD structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: scenarioName,
    description:
      safeLocale === 'zh'
        ? `发现 ${matchedTools.length} 个与"${scenarioName}"相关的开源 AI 工具。`
        : `Discover ${matchedTools.length} open-source AI tools related to "${scenarioName}".`,
    url: `https://site-ai-event.vercel.app/${safeLocale}/scenarios/${scenarioSlug}`,
    isPartOf: {
      '@type': 'Website',
      name: 'AI Event',
      url: `https://site-ai-event.vercel.app/${safeLocale}`,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: matchedTools.slice(0, 10).map((tool, index) => ({
        '@type': 'SoftwareApplication',
        position: index + 1,
        name: tool.name,
        description: tool.tagline[safeLocale],
        url: `https://site-ai-event.vercel.app/${safeLocale}/tool/${tool.slug}`,
        applicationCategory: 'Multimedia',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
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

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-4">
              <p className="text-xs tracking-[0.22em] text-cyan-100/80 uppercase">
                {safeLocale === 'zh' ? '小白入口' : 'Simple Entry'}
              </p>
              <ol className="mt-2 space-y-1 text-sm leading-7 text-white/80">
                <li>
                  {safeLocale === 'zh'
                    ? '1. 先浏览年份分区，看看这个场景在近三年的工具分布变化。'
                    : '1. Scan year sections to understand how this scenario evolved across three years.'}
                </li>
                <li>
                  {safeLocale === 'zh'
                    ? '2. 选 1-2 个你听过名字的工具，点击深度解读。'
                    : '2. Pick 1-2 familiar tools and open their deep-dive pages.'}
                </li>
                <li>
                  {safeLocale === 'zh'
                    ? '3. 先看一句话理解和典型场景，再决定是否尝试 Demo。'
                    : '3. Start with plain summary and use cases, then decide whether to try the demo.'}
                </li>
              </ol>
            </div>
            <div className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-4">
              <p className="text-xs tracking-[0.22em] text-violet-100/80 uppercase">
                {safeLocale === 'zh' ? '专业评估' : 'Professional Review'}
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-7 text-white/80">
                <li>
                  {safeLocale === 'zh'
                    ? '优先比较难度分布，判断团队当前能力是否能快速落地。'
                    : 'Check difficulty mix first to see if your team can deliver quickly.'}
                </li>
                <li>
                  {safeLocale === 'zh'
                    ? '再看高频标签，确认该场景主流技术路线。'
                    : 'Review top tags to identify mainstream technical routes.'}
                </li>
                <li>
                  {safeLocale === 'zh'
                    ? '最后进入详情页，用评估清单确认 PoC 顺序与风险。'
                    : 'Use deep-dive checklists to prioritize PoCs and identify risks.'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs tracking-widest text-white/55 uppercase">
              {safeLocale === 'zh' ? '场景规模' : 'Scenario Scale'}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{matchedTools.length}</p>
            <p className="mt-1 text-sm text-white/70">
              {safeLocale === 'zh' ? '个可浏览工具' : 'tools available'}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
            <p className="text-xs tracking-widest text-white/55 uppercase">
              {safeLocale === 'zh' ? '难度分布信号' : 'Difficulty Signals'}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {difficultySummary.map((item) => (
                <span
                  key={item.key}
                  className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs text-white/80"
                >
                  {item.label}: {item.count} ({item.ratio}%)
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs tracking-widest text-white/55 uppercase">
            {safeLocale === 'zh' ? '高频技术标签' : 'Top Technical Tags'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {topTags.map(([tag, count]) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100"
              >
                {getTagDisplay(tag, safeLocale)} x {count}
              </span>
            ))}
          </div>
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
