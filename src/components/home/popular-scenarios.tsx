'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Tool } from '@/data/types';
import { toScenarioSlug } from '@/data/scenario-slug';

type PopularScenariosProps = {
  locale: 'en' | 'zh';
  tools: Tool[];
  labels: {
    title: string;
    subtitle: string;
  };
};

type ScenarioCard = {
  slug: string;
  name: string;
  count: number;
};

export function PopularScenarios({ locale, tools, labels }: PopularScenariosProps) {
  const scenarios: ScenarioCard[] = [];
  const scenarioMap = new Map<string, { name: string; count: number }>();

  for (const tool of tools) {
    for (const category of tool.categories[locale]) {
      const slug = toScenarioSlug(category);
      if (!scenarioMap.has(slug)) {
        scenarioMap.set(slug, { name: category, count: 0 });
      }
      const current = scenarioMap.get(slug)!;
      current.count += 1;
    }
  }

  for (const [slug, data] of scenarioMap.entries()) {
    scenarios.push({ slug, name: data.name, count: data.count });
  }

  scenarios.sort((a, b) => b.count - a.count);
  const topScenarios = scenarios.slice(0, 6);

  return (
    <section className="mt-10 space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-white">{labels.title}</h2>
        <p className="mt-2 text-sm text-white/75 md:text-base">{labels.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {topScenarios.map((scenario, index) => (
          <motion.div
            key={scenario.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              href={`/${locale}/scenarios/${scenario.slug}`}
              className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/60 hover:bg-white/[0.08]"
            >
              <h3 className="font-medium text-white group-hover:text-cyan-100">{scenario.name}</h3>
              <p className="mt-2 text-sm text-white/70">
                {scenario.count} {locale === 'zh' ? '个工具' : 'tools'}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
