'use client';

import { useMemo, useState } from 'react';
import type {
  CrossDisciplineTopic,
  IndustryApplication,
  KnowledgeDomain,
  KnowledgeTerm,
} from '@/data/knowledge';

type KnowledgeExplorerProps = {
  locale: 'en' | 'zh';
  terms: KnowledgeTerm[];
  domains: KnowledgeDomain[];
  industries: IndustryApplication[];
  crossTopics: CrossDisciplineTopic[];
  labels: {
    termsTitle: string;
    termsSubtitle: string;
    misconception: string;
    domainTitle: string;
    domainSubtitle: string;
    industryTitle: string;
    industrySubtitle: string;
    painPoint: string;
    mapping: string;
    crossDisciplineTitle: string;
    crossDisciplineSubtitle: string;
    searchPlaceholder: string;
    categoryAll: string;
    resetFilters: string;
    matchedResults: string;
    noMatches: string;
  };
};

function includesNormalized(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

export function KnowledgeExplorer({
  locale,
  terms,
  domains,
  industries,
  crossTopics,
  labels,
}: KnowledgeExplorerProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(labels.categoryAll);

  const categories = useMemo(() => {
    return [
      labels.categoryAll,
      ...new Set(terms.map((term) => term.category[locale])),
    ];
  }, [labels.categoryAll, locale, terms]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const categoryMatch = activeCategory === labels.categoryAll || term.category[locale] === activeCategory;
      if (!categoryMatch) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      return [
        term.term[locale],
        term.category[locale],
        term.definition[locale],
        term.misconception[locale],
      ].some((text) => includesNormalized(text, normalizedQuery));
    });
  }, [activeCategory, labels.categoryAll, locale, normalizedQuery, terms]);

  const filteredDomains = useMemo(() => {
    if (!normalizedQuery) {
      return domains;
    }
    return domains.filter((domain) => {
      const source = [
        domain.name[locale],
        domain.description[locale],
        ...domain.keyAbilities.map((ability) => ability[locale]),
      ].join(' ');
      return includesNormalized(source, normalizedQuery);
    });
  }, [domains, locale, normalizedQuery]);

  const filteredIndustries = useMemo(() => {
    if (!normalizedQuery) {
      return industries;
    }
    return industries.filter((item) => {
      const source = [
        item.industry[locale],
        item.painPoint[locale],
        item.aigcMapping[locale],
        ...item.representativeCases.map((example) => example[locale]),
      ].join(' ');
      return includesNormalized(source, normalizedQuery);
    });
  }, [industries, locale, normalizedQuery]);

  const filteredCrossTopics = useMemo(() => {
    if (!normalizedQuery) {
      return crossTopics;
    }
    return crossTopics.filter((topic) => {
      const source = [
        topic.name[locale],
        topic.relevance[locale],
        ...topic.commonMethods.map((method) => method[locale]),
      ].join(' ');
      return includesNormalized(source, normalizedQuery);
    });
  }, [crossTopics, locale, normalizedQuery]);

  const totalMatches =
    filteredTerms.length + filteredDomains.length + filteredIndustries.length + filteredCrossTopics.length;

  const hasActiveFilters = normalizedQuery.length > 0 || activeCategory !== labels.categoryAll;

  return (
    <>
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/4 p-5 md:p-6">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-xl border border-white/14 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300/60"
            aria-label={labels.searchPlaceholder}
          />
          <div className="flex items-center gap-3 md:justify-end">
            <p className="text-sm text-cyan-100/80">
              {labels.matchedResults}: {totalMatches}
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveCategory(labels.categoryAll);
                }}
                className="rounded-lg border border-cyan-300/35 px-3 py-2 text-xs text-cyan-100 transition hover:border-cyan-200"
              >
                {labels.resetFilters}
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  active
                    ? 'border-cyan-200 bg-cyan-300/20 text-cyan-100'
                    : 'border-white/18 bg-white/4 text-white/70 hover:border-white/35'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{labels.termsTitle}</h2>
        <p className="mt-2 text-sm text-white/70">{labels.termsSubtitle}</p>
        {filteredTerms.length > 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredTerms.map((term) => (
              <article key={term.slug} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs tracking-widest text-cyan-100/80 uppercase">{term.category[locale]}</p>
                <h3 className="mt-2 text-lg font-medium">
                  {term.term[locale]}
                  {term.abbreviation ? (
                    <span className="ml-2 text-sm font-normal text-white/60">({term.abbreviation})</span>
                  ) : null}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/80">{term.definition[locale]}</p>
                <p className="mt-3 text-xs leading-6 text-amber-200/90">
                  {labels.misconception}: {term.misconception[locale]}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-3 text-sm text-white/70">
            {labels.noMatches}
          </p>
        )}
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">{labels.domainTitle}</h2>
          <p className="mt-2 text-sm text-white/70">{labels.domainSubtitle}</p>
          {filteredDomains.length > 0 ? (
            <div className="mt-5 space-y-4">
              {filteredDomains.map((domain) => (
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
          ) : (
            <p className="mt-5 rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-3 text-sm text-white/70">
              {labels.noMatches}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{labels.industryTitle}</h2>
          <p className="mt-2 text-sm text-white/70">{labels.industrySubtitle}</p>
          {filteredIndustries.length > 0 ? (
            <div className="mt-5 space-y-4">
              {filteredIndustries.map((item) => (
                <article key={item.slug} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <h3 className="text-lg font-medium">{item.industry[locale]}</h3>
                  <p className="mt-2 text-sm text-white/80">
                    {labels.painPoint}: {item.painPoint[locale]}
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    {labels.mapping}: {item.aigcMapping[locale]}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {item.representativeCases.map((example) => (
                      <li key={example.en} className="text-sm text-cyan-100/85">
                        • {example[locale]}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-3 text-sm text-white/70">
              {labels.noMatches}
            </p>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{labels.crossDisciplineTitle}</h2>
        <p className="mt-2 text-sm text-white/70">{labels.crossDisciplineSubtitle}</p>
        {filteredCrossTopics.length > 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {filteredCrossTopics.map((topic) => (
              <article key={topic.slug} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <h3 className="text-lg font-medium">{topic.name[locale]}</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">{topic.relevance[locale]}</p>
                <ul className="mt-3 space-y-2">
                  {topic.commonMethods.map((method) => (
                    <li key={method.en} className="text-sm text-white/75">
                      • {method[locale]}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-3 text-sm text-white/70">
            {labels.noMatches}
          </p>
        )}
      </section>
    </>
  );
}
