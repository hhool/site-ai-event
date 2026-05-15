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

## Repository Automation

- Dependabot config: [.github/dependabot.yml](.github/dependabot.yml)
  - Weekly npm and GitHub Actions dependency updates
- Code scanning workflow: [.github/workflows/codeql.yml](.github/workflows/codeql.yml)
  - Runs on push, pull request, and weekly schedule
- Code owners: [.github/CODEOWNERS](.github/CODEOWNERS)
  - Defines default reviewers for source and CI changes

## Collaboration Templates

- Bug report template: [.github/ISSUE_TEMPLATE/bug_report.yml](.github/ISSUE_TEMPLATE/bug_report.yml)
- Feature request template: [.github/ISSUE_TEMPLATE/feature_request.yml](.github/ISSUE_TEMPLATE/feature_request.yml)
- Pull request template: [.github/pull_request_template.md](.github/pull_request_template.md)

## Release Automation

- Workflow file: [.github/workflows/release.yml](.github/workflows/release.yml)
- Trigger: push a tag like `v1.0.0`
- Output: automatic GitHub Release with generated notes and source archive artifact

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
