import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getToolBySlug } from '@/data/tools';
import { ExternalLinkPill } from '@/components/shared/external-link-pill';
import { DetailContent } from '@/components/detail/detail-content';

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const safeLocale = locale === 'zh' ? 'zh' : 'en';
  const t = await getTranslations();
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const detail = tool.detail[safeLocale];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <Link className="text-sm text-cyan-300" href={`/${safeLocale}`}>
          {t('common.backToList')}
        </Link>

        <h1 className="mt-5 text-4xl font-semibold">{tool.name}</h1>
        <p className="mt-4 text-white/75">{tool.tagline[safeLocale]}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          <ExternalLinkPill href={tool.demoUrl}>{t('common.openDemo')}</ExternalLinkPill>
          <ExternalLinkPill href={tool.githubUrl}>{t('common.github')}</ExternalLinkPill>
          <ExternalLinkPill href={tool.websiteUrl}>{t('common.officialSite')}</ExternalLinkPill>
        </div>

        <DetailContent
          detail={detail}
          headings={{
            highlights: t('common.highlights'),
            community: t('common.community'),
            audience: t('common.audience'),
          }}
        />
      </section>
    </main>
  );
}
