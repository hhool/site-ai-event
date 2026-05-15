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

Production smoke tests:

```bash
pnpm test:e2e:prod
```

Code formatting:

```bash
pnpm format
pnpm format:check
```

## CI

- Workflow file: [.github/workflows/ci.yml](.github/workflows/ci.yml)
- Trigger: push to main and pull requests targeting main
- Checks: format check, lint, build, Playwright smoke tests

## Repository Automation

- Dependabot config: [.github/dependabot.yml](.github/dependabot.yml)
  - Weekly npm and GitHub Actions dependency updates
- Code scanning workflow: [.github/workflows/codeql.yml](.github/workflows/codeql.yml)
  - Runs on push, pull request, and weekly schedule
- Code owners: [.github/CODEOWNERS](.github/CODEOWNERS)
  - Defines default reviewers for source and CI changes
- Branch protection guide: [docs/ways-of-work/governance/branch-protection.md](docs/ways-of-work/governance/branch-protection.md)
  - Ready-to-apply required checks and protection settings for `main`
- Branch protection checklist (EN): [docs/ways-of-work/governance/branch-protection-checklist.md](docs/ways-of-work/governance/branch-protection-checklist.md)
- Branch protection checklist (ZH): [docs/ways-of-work/governance/branch-protection-checklist.zh.md](docs/ways-of-work/governance/branch-protection-checklist.zh.md)
- Rulesets setup guide (EN): [docs/ways-of-work/governance/rulesets-setup.md](docs/ways-of-work/governance/rulesets-setup.md)
- Rulesets setup guide (ZH): [docs/ways-of-work/governance/rulesets-setup.zh.md](docs/ways-of-work/governance/rulesets-setup.zh.md)
- Repository settings baseline (EN): [docs/ways-of-work/governance/repository-settings-baseline.md](docs/ways-of-work/governance/repository-settings-baseline.md)
- Repository settings baseline (ZH): [docs/ways-of-work/governance/repository-settings-baseline.zh.md](docs/ways-of-work/governance/repository-settings-baseline.zh.md)

## Style Conventions

- EditorConfig: [.editorconfig](.editorconfig)
- Prettier config: [.prettierrc.json](.prettierrc.json)
- Prettier ignore: [.prettierignore](.prettierignore)

## Collaboration Templates

- Bug report template: [.github/ISSUE_TEMPLATE/bug_report.yml](.github/ISSUE_TEMPLATE/bug_report.yml)
- Feature request template: [.github/ISSUE_TEMPLATE/feature_request.yml](.github/ISSUE_TEMPLATE/feature_request.yml)
- Issue template config: [.github/ISSUE_TEMPLATE/config.yml](.github/ISSUE_TEMPLATE/config.yml)
  - Disables blank issues and provides guided contact links
- Pull request template: [.github/pull_request_template.md](.github/pull_request_template.md)

## Maintenance Automation

- Stale workflow: [.github/workflows/stale.yml](.github/workflows/stale.yml)
  - Marks inactive issues/PRs as stale after 21 days
  - Closes stale issues/PRs after 7 more days of inactivity
- Commitlint workflow: [.github/workflows/commitlint.yml](.github/workflows/commitlint.yml)
  - Validates commit messages on pull requests
- Commitlint rules: [commitlint.config.cjs](commitlint.config.cjs)
  - Uses Conventional Commits via `@commitlint/config-conventional`
- PR labeler workflow: [.github/workflows/pr-labeler.yml](.github/workflows/pr-labeler.yml)
  - Applies labels automatically based on changed files via [.github/labeler.yml](.github/labeler.yml)
- PR description check workflow: [.github/workflows/pr-body-check.yml](.github/workflows/pr-body-check.yml)
  - Ensures required PR template sections are present
- On-call playbook (EN): [docs/ways-of-work/operations/oncall-playbook.md](docs/ways-of-work/operations/oncall-playbook.md)
- On-call playbook (ZH): [docs/ways-of-work/operations/oncall-playbook.zh.md](docs/ways-of-work/operations/oncall-playbook.zh.md)
- On-call handover template (EN): [docs/ways-of-work/operations/oncall-handover-template.md](docs/ways-of-work/operations/oncall-handover-template.md)
- On-call handover template (ZH): [docs/ways-of-work/operations/oncall-handover-template.zh.md](docs/ways-of-work/operations/oncall-handover-template.zh.md)
- Postmortem template (EN): [docs/ways-of-work/operations/postmortem-template.md](docs/ways-of-work/operations/postmortem-template.md)
- Postmortem template (ZH): [docs/ways-of-work/operations/postmortem-template.zh.md](docs/ways-of-work/operations/postmortem-template.zh.md)
- Weekly ops report template (EN): [docs/ways-of-work/operations/weekly-ops-report-template.md](docs/ways-of-work/operations/weekly-ops-report-template.md)
- Weekly ops report template (ZH): [docs/ways-of-work/operations/weekly-ops-report-template.zh.md](docs/ways-of-work/operations/weekly-ops-report-template.zh.md)
- Post-release 24h checklist (EN): [docs/ways-of-work/operations/post-release-24h-checklist.md](docs/ways-of-work/operations/post-release-24h-checklist.md)
- Post-release 24h checklist (ZH): [docs/ways-of-work/operations/post-release-24h-checklist.zh.md](docs/ways-of-work/operations/post-release-24h-checklist.zh.md)
- Monthly stability report template (EN): [docs/ways-of-work/operations/monthly-stability-report-template.md](docs/ways-of-work/operations/monthly-stability-report-template.md)
- Monthly stability report template (ZH): [docs/ways-of-work/operations/monthly-stability-report-template.zh.md](docs/ways-of-work/operations/monthly-stability-report-template.zh.md)

## Release Automation

- Workflow file: [.github/workflows/release.yml](.github/workflows/release.yml)
- Trigger: push a tag like `v1.0.0`
- Output: automatic GitHub Release with generated notes and source archive artifact
- Draft workflow: [.github/workflows/release-drafter.yml](.github/workflows/release-drafter.yml)
  - Maintains a rolling draft release from merged PRs
- Draft config: [.github/release-drafter.yml](.github/release-drafter.yml)
  - Groups changelog entries by labels (frontend/docs/ci/config/dependencies)
- Release runbook (EN): [docs/ways-of-work/release/release-runbook.md](docs/ways-of-work/release/release-runbook.md)
- Release runbook (ZH): [docs/ways-of-work/release/release-runbook.zh.md](docs/ways-of-work/release/release-runbook.zh.md)

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
