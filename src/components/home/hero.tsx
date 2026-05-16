import Link from 'next/link';

type HomeHeroProps = {
  title: string;
  subtitle: string;
  locale: 'en' | 'zh';
  labels: {
    quickStartTitle: string;
    quickStartBody: string;
    builderTitle: string;
    builderBody: string;
    knowledgeEntry: string;
  };
};

export function HomeHero({ title, subtitle, locale, labels }: HomeHeroProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-md md:px-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(20,184,166,0.25),transparent_35%),radial-gradient(circle_at_88%_6%,rgba(96,165,250,0.22),transparent_32%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.24em] text-cyan-200/85 uppercase">AI Event Chronicle</p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-tight font-semibold md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base text-white/80 md:text-lg">{subtitle}</p>
        </div>
        <nav className="flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-black/35 p-1">
          <Link
            href="/en"
            className={`rounded-full px-3 py-1 text-sm transition ${
              locale === 'en' ? 'bg-cyan-400/25 text-cyan-100' : 'text-white/70 hover:text-white'
            }`}
          >
            EN
          </Link>
          <Link
            href="/zh"
            className={`rounded-full px-3 py-1 text-sm transition ${
              locale === 'zh' ? 'bg-cyan-400/25 text-cyan-100' : 'text-white/70 hover:text-white'
            }`}
          >
            中文
          </Link>
        </nav>
      </div>

      <div className="relative mt-8 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs tracking-[0.24em] text-cyan-100/80 uppercase">{labels.quickStartTitle}</p>
          <p className="mt-2 text-sm leading-7 text-white/78">{labels.quickStartBody}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs tracking-[0.24em] text-violet-100/80 uppercase">{labels.builderTitle}</p>
          <p className="mt-2 text-sm leading-7 text-white/78">{labels.builderBody}</p>
        </div>
      </div>

      <div className="relative mt-4">
        <Link
          href={`/${locale}/knowledge`}
          className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
        >
          {labels.knowledgeEntry}
        </Link>
      </div>
    </header>
  );
}
