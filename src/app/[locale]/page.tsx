import { getLocale, getTranslations } from 'next-intl/server';
import { tools, years } from '@/data/tools';
import { HomeHero } from '@/components/home/hero';
import { PopularScenarios } from '@/components/home/popular-scenarios';
import { ScenarioBrowser } from '@/components/home/scenario-browser';

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
          }}
        />
      </section>
    </main>
  );
}
