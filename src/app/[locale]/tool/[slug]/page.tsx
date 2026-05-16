import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getToolBySlug } from '@/data/tools';
import { getTagDisplay } from '@/data/tag-labels';
import { ExternalLinkPill } from '@/components/shared/external-link-pill';
import { DetailContent } from '@/components/detail/detail-content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as 'en' | 'zh';
  const safeLocale = locale === 'zh' ? 'zh' : 'en';

  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool was not found.',
    };
  }

  const title = `${tool.name} - AI Event`;
  const description = tool.tagline[safeLocale];
  const url = `https://site-ai-event.vercel.app/${safeLocale}/tool/${slug}`;

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
          url: tool.logoUrl || 'https://site-ai-event.vercel.app/og-image.png',
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [tool.logoUrl || 'https://site-ai-event.vercel.app/og-image.png'],
    },
  };
}

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

  const difficultyMap = {
    beginner: t('common.filterBeginner'),
    intermediate: t('common.filterIntermediate'),
    advanced: t('common.filterAdvanced'),
  } as const;

  const communityMap = {
    small: t('common.filterSmall'),
    medium: t('common.filterMedium'),
    large: t('common.filterLarge'),
  } as const;

  const difficultyColorMap = {
    beginner: 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200',
    intermediate: 'border-amber-500/60 bg-amber-500/15 text-amber-200',
    advanced: 'border-red-500/60 bg-red-500/15 text-red-200',
  } as const;

  const communityColorMap = {
    small: 'border-slate-500/60 bg-slate-500/15 text-slate-200',
    medium: 'border-blue-500/60 bg-blue-500/15 text-blue-200',
    large: 'border-violet-500/60 bg-violet-500/15 text-violet-200',
  } as const;

  // Generate JSON-LD structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.tagline[safeLocale],
    applicationCategory: 'Multimedia',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `https://site-ai-event.vercel.app/${safeLocale}/tool/${slug}`,
    image: tool.logoUrl,
    codeRepository: tool.githubUrl,
    softwareVersion: tool.year.toString(),
    creator: {
      '@type': 'Organization',
      name: 'AI Event',
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
      <section className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <Link className="text-sm text-cyan-300" href={`/${safeLocale}`}>
          {t('common.backToList')}
        </Link>

        <h1 className="mt-5 text-4xl font-semibold">{tool.name}</h1>
        <p className="mt-4 text-white/75">{tool.tagline[safeLocale]}</p>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <h2 className="text-xs tracking-widest text-white/60 uppercase">{t('common.toolMeta')}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs text-white/80">
              {t('common.year')}: {tool.year}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs ${difficultyColorMap[tool.difficulty]}`}
            >
              {t('common.filterDifficulty')}: {difficultyMap[tool.difficulty]}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs ${communityColorMap[tool.communitySize]}`}
            >
              {t('common.filterCommunity')}: {communityMap[tool.communitySize]}
            </span>
          </div>

          <p className="mt-3 text-xs tracking-widest text-white/55 uppercase">{t('common.filterTags')}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-[11px] text-cyan-200"
              >
                {getTagDisplay(tag, safeLocale)}
              </span>
            ))}
          </div>
        </section>

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
