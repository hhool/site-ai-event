import { getLocale, getTranslations } from 'next-intl/server';
import { getToolsByYear, years } from '@/data/tools';
import { HomeHero } from '@/components/home/hero';
import { ToolCard } from '@/components/home/tool-card';

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const safeLocale = locale === 'zh' ? 'zh' : 'en';

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <HomeHero title={t('site.title')} subtitle={t('site.subtitle')} locale={safeLocale} />

        <div className="mt-12 space-y-12">
          {years.map((year) => {
            const items = getToolsByYear(year);
            return (
              <section key={year} className="space-y-5">
                <h2 className="text-2xl font-medium text-white/90">
                  {t('common.year')}: {year}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool, index) => (
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
