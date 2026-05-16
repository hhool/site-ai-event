import type { ReactNode } from 'react';

type ExternalLinkPillProps = {
  href: string;
  children: ReactNode;
};

export function ExternalLinkPill({ href, children }: ExternalLinkPillProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
    >
      {children}
    </a>
  );
}
