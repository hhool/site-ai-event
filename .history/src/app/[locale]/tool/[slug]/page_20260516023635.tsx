import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getToolBySlug, tools } from '@/data/tools';

export function generateStaticParams() {
  return tools.flatMap((tool) => [{ locale: 'en', slug: tool.slug }, { locale: 'zh', slug: tool.slug }]);
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations();
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const detail = tool.detail[locale as 'en' | 'zh'];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <Link className="text-sm text-cyan-300" href={`/${locale}`}>
          {t('common.backToList')}
        </Link>

        <h1 className="mt-5 text-4xl font-semibold">{tool.name}</h1>
        <p className="mt-4 text-white/75">{tool.tagline[locale as 'en' | 'zh']}</p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm text-cyan-200">
          <a href={tool.demoUrl} target="_blank" rel="noreferrer">
            {t('common.openDemo')}
          </a>
          <a href={tool.githubUrl} target="_blank" rel="noreferrer">
            {t('common.github')}
          </a>
          <a href={tool.websiteUrl} target="_blank" rel="noreferrer">
            {t('common.officialSite')}
          </a>
        </div>

        <article className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="leading-8 text-white/85">{detail.background}</p>

          <h2 className="mt-8 text-2xl font-medium">Highlights</h2>
          <ul className="mt-4 space-y-4">
            {detail.highlights.map((item) => (
              <li key={item.title}>
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-white/75">{item.desc}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-2xl font-medium">Community</h2>
          <p className="mt-3 text-white/75">{detail.community}</p>
        </article>
      </section>
    </main>
  );
}
