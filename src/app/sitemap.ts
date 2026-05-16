import type { MetadataRoute } from 'next';
import { tools } from '@/data/tools';
import { toScenarioSlug } from '@/data/scenario-slug';

const getAllScenarios = (locale: 'en' | 'zh') => {
  const scenarios = new Map<string, { name: string; count: number }>();

  for (const tool of tools) {
    for (const category of tool.categories[locale]) {
      const slug = toScenarioSlug(category);
      if (!scenarios.has(slug)) {
        scenarios.set(slug, { name: category, count: 0 });
      }
      const current = scenarios.get(slug)!;
      current.count += 1;
    }
  }

  return Array.from(scenarios.entries())
    .map(([slug]) => slug)
    .sort();
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://site-ai-event.vercel.app';
  const locales = ['en', 'zh'] as const;
  const urls: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  locales.forEach((locale) => {
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  // Tool detail pages for each locale
  tools.forEach((tool) => {
    locales.forEach((locale) => {
      urls.push({
        url: `${baseUrl}/${locale}/tool/${tool.slug}`,
        lastModified: new Date(tool.year, 0, 1),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  // Scenario pages for each locale
  locales.forEach((locale) => {
    const scenarios = getAllScenarios(locale);
    scenarios.forEach((scenarioSlug) => {
      urls.push({
        url: `${baseUrl}/${locale}/scenarios/${scenarioSlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return urls;
}
