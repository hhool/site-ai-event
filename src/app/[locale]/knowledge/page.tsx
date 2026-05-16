import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import {
  crossDisciplineTopics,
  industryApplications,
  knowledgeDomains,
  knowledgeTerms,
} from '@/data/knowledge';

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

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">{t('knowledge.termsTitle')}</h2>
          <p className="mt-2 text-sm text-white/70">{t('knowledge.termsSubtitle')}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {knowledgeTerms.map((term) => (
              <article key={term.slug} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs tracking-widest text-cyan-100/80 uppercase">{term.category[locale]}</p>
                <h3 className="mt-2 text-lg font-medium">
                  {term.term[locale]}
                  {term.abbreviation ? (
                    <span className="ml-2 text-sm font-normal text-white/60">({term.abbreviation})</span>
                  ) : null}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/80">{term.definition[locale]}</p>
                <p className="mt-3 text-xs leading-6 text-amber-200/90">{t('knowledge.misconception')}: {term.misconception[locale]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">{t('knowledge.domainTitle')}</h2>
            <p className="mt-2 text-sm text-white/70">{t('knowledge.domainSubtitle')}</p>
            <div className="mt-5 space-y-4">
              {knowledgeDomains.map((domain) => (
                <article key={domain.slug} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <h3 className="text-lg font-medium">{domain.name[locale]}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/80">{domain.description[locale]}</p>
                  <ul className="mt-3 space-y-2">
                    {domain.keyAbilities.map((ability) => (
                      <li key={ability.en} className="flex gap-2 text-sm text-white/75">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{ability[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{t('knowledge.industryTitle')}</h2>
            <p className="mt-2 text-sm text-white/70">{t('knowledge.industrySubtitle')}</p>
            <div className="mt-5 space-y-4">
              {industryApplications.map((item) => (
                <article key={item.slug} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <h3 className="text-lg font-medium">{item.industry[locale]}</h3>
                  <p className="mt-2 text-sm text-white/80">{t('knowledge.painPoint')}: {item.painPoint[locale]}</p>
                  <p className="mt-2 text-sm text-white/80">{t('knowledge.mapping')}: {item.aigcMapping[locale]}</p>
                  <ul className="mt-3 space-y-2">
                    {item.representativeCases.map((example) => (
                      <li key={example.en} className="text-sm text-cyan-100/85">• {example[locale]}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">{t('knowledge.crossDisciplineTitle')}</h2>
          <p className="mt-2 text-sm text-white/70">{t('knowledge.crossDisciplineSubtitle')}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {crossDisciplineTopics.map((topic) => (
              <article key={topic.slug} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <h3 className="text-lg font-medium">{topic.name[locale]}</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">{topic.relevance[locale]}</p>
                <ul className="mt-3 space-y-2">
                  {topic.commonMethods.map((method) => (
                    <li key={method.en} className="text-sm text-white/75">• {method[locale]}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
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
