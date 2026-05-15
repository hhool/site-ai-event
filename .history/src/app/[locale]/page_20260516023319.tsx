import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { getToolsByYear, years } from '@/data/tools';

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">AI Event</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
          {t('site.title')}
        </h1>
        <p className="mt-6 max-w-3xl text-base text-white/70 md:text-lg">
          {t('site.subtitle')}
        </p>

        <div className="mt-12 space-y-12">
          {years.map((year) => {
            const items = getToolsByYear(year);
            return (
              <section key={year} className="space-y-5">
                <h2 className="text-2xl font-medium text-white/90">{year}</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => (
                    <article
                      key={tool.slug}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                    >
                      <h3 className="text-xl font-medium">{tool.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-white/70">
                        {tool.tagline[locale as 'en' | 'zh']}
                      </p>
                      <div className="mt-5 flex gap-3 text-xs text-cyan-300">
                        <a href={tool.demoUrl} target="_blank" rel="noreferrer">
                          {t('common.openDemo')}
                        </a>
                        <a href={tool.githubUrl} target="_blank" rel="noreferrer">
                          {t('common.github')}
                        </a>
                      </div>
                      <Link
                        className="mt-5 inline-block text-sm text-white/90 underline underline-offset-4"
                        href={`/${locale}/tool/${tool.slug}`}
                      >
                        {t('common.readMore')}
                      </Link>
                    </article>
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
