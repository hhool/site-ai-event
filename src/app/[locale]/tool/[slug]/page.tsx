import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getToolBySlug } from '@/data/tools';
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
