import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { tools, years } from '@/data/tools';
import { HomeHero } from '@/components/home/hero';
import { PopularScenarios } from '@/components/home/popular-scenarios';
import { ScenarioBrowser } from '@/components/home/scenario-browser';

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as 'en' | 'zh';
  const t = await getTranslations();

  const title = locale === 'zh' ? t('site.title') : 'Annual Open-Source AI Event';
  const description =
    locale === 'zh'
      ? '记录年度现象级开源AI工具。浏览2023-2025年最热门的开源AI工具集合，按任务场景探索。'
      : 'Record annual phenomenon-level open-source AI tools. Browse the most popular open-source AI tools from 2023-2025, explore by task scenario.';

  const url = `https://site-ai-event.vercel.app/${locale}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'AI Event',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
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

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const safeLocale = locale === 'zh' ? 'zh' : 'en';

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <HomeHero title={t('site.title')} subtitle={t('site.subtitle')} locale={safeLocale} />
        <PopularScenarios
          locale={safeLocale}
          tools={tools}
          labels={{
            title: t('common.scenariosTitle'),
            subtitle: t('common.scenariosSubtitle'),
          }}
        />
        <ScenarioBrowser
          locale={safeLocale}
          tools={tools}
          years={years}
          labels={{
            openDemo: t('common.openDemo'),
            github: t('common.github'),
            readMore: t('common.readMore'),
            stars: t('common.stars'),
            year: t('common.year'),
            scenarioTitle: t('common.scenarioTitle'),
            scenarioSubtitle: t('common.scenarioSubtitle'),
            allScenarios: t('common.allScenarios'),
            selectedScenarios: t('common.selectedScenarios'),
            clearFilters: t('common.clearFilters'),
            matchAny: t('common.matchAny'),
            matchAll: t('common.matchAll'),
            toolsMatched: t('common.toolsMatched'),
            noResults: t('common.noResults'),
            advancedFilters: t('common.advancedFilters'),
            filterDifficulty: t('common.filterDifficulty'),
            filterCommunity: t('common.filterCommunity'),
            filterTags: t('common.filterTags'),
            filterClearAll: t('common.filterClearAll'),
            filterAny: t('common.filterAny'),
            filterBeginner: t('common.filterBeginner'),
            filterIntermediate: t('common.filterIntermediate'),
            filterAdvanced: t('common.filterAdvanced'),
            filterSmall: t('common.filterSmall'),
            filterMedium: t('common.filterMedium'),
            filterLarge: t('common.filterLarge'),
          }}
        />
      </section>
    </main>
  );
}
