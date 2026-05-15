# Annual Open-Source AI Event

![CI](https://github.com/hhool/site-ai-event/actions/workflows/ci.yml/badge.svg)

A bilingual website that records phenomenon-level open-source AI tools by year.

## Overview

- A curated yearly archive of phenomenon-level open-source AI tools (up to 10 tools per year).
- Each tool includes deep descriptions and official demo links.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- next-intl
- Framer Motion
- lucide-react
- pnpm

## Routing

- Default locale: `/` redirects to `/en`
- English list page: `/en`
- Chinese list page: `/zh`
- Tool detail page: `/{locale}/tool/{slug}`

## Development

```bash
pnpm install
pnpm dev
```

Lint and build:

```bash
pnpm lint
pnpm build
```

E2E smoke tests:

```bash
pnpm test:e2e
```

## CI

- Workflow file: [.github/workflows/ci.yml](.github/workflows/ci.yml)
- Trigger: push to main and pull requests targeting main
- Checks: lint, build, Playwright smoke tests

## Content Convention

- English markdown: `*.md`
- Chinese markdown: `*.zh.md`

## Deploy to Vercel

The project includes [vercel.json](vercel.json) with standard pnpm commands.

Quick deploy steps:

1. Push repository to GitHub.
2. Import the repository in Vercel.
3. Use default detected settings (Framework: Next.js).
4. Deploy.

Environment variables are not required for the current static content version.
