import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import {
  crossDisciplineTopics,
  industryApplications,
  knowledgeDomains,
  knowledgeTerms,
} from '@/data/knowledge';
import { KnowledgeExplorer } from '@/components/knowledge/knowledge-explorer';

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as 'en' | 'zh';
  const t = await getTranslations();

  const title = locale === 'zh' ? t('knowledge.pageTitle') : 'AIGC Knowledge Map';
  const description = t('knowledge.pageDescription');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://site-ai-event.vercel.app/${locale}/knowledge`,
      siteName: 'AI Event',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
  };
}

export default async function KnowledgePage() {
  const locale = (await getLocale()) as 'en' | 'zh';
  const t = await getTranslations();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <Link className="text-sm text-cyan-300" href={`/${locale}`}>
          {t('common.backToList')}
        </Link>

        <header className="mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-md md:px-10 md:py-14">
          <p className="text-xs tracking-[0.24em] text-cyan-200/85 uppercase">{t('knowledge.pageEyebrow')}</p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{t('knowledge.pageTitle')}</h1>
          <p className="mt-4 max-w-4xl text-base leading-8 text-white/80 md:text-lg">
            {t('knowledge.pageDescription')}
          </p>
        </header>

        <div className="mt-10 grid gap-3 md:grid-cols-4">
          <StatCard label={t('knowledge.statsConcepts')} value={knowledgeTerms.length} />
          <StatCard label={t('knowledge.statsDomains')} value={knowledgeDomains.length} />
          <StatCard label={t('knowledge.statsIndustries')} value={industryApplications.length} />
          <StatCard label={t('knowledge.statsCrossDiscipline')} value={crossDisciplineTopics.length} />
        </div>

        <KnowledgeExplorer
          locale={locale}
          terms={knowledgeTerms}
          domains={knowledgeDomains}
          industries={industryApplications}
          crossTopics={crossDisciplineTopics}
          labels={{
            termsTitle: t('knowledge.termsTitle'),
            termsSubtitle: t('knowledge.termsSubtitle'),
            misconception: t('knowledge.misconception'),
            domainTitle: t('knowledge.domainTitle'),
            domainSubtitle: t('knowledge.domainSubtitle'),
            industryTitle: t('knowledge.industryTitle'),
            industrySubtitle: t('knowledge.industrySubtitle'),
            painPoint: t('knowledge.painPoint'),
            mapping: t('knowledge.mapping'),
            crossDisciplineTitle: t('knowledge.crossDisciplineTitle'),
            crossDisciplineSubtitle: t('knowledge.crossDisciplineSubtitle'),
            searchPlaceholder: t('knowledge.searchPlaceholder'),
            categoryAll: t('knowledge.categoryAll'),
            resetFilters: t('knowledge.resetFilters'),
            matchedResults: t('knowledge.matchedResults'),
            noMatches: t('knowledge.noMatches'),
          }}
        />
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/2 p-4">
      <p className="text-xs tracking-widest text-white/55 uppercase">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
