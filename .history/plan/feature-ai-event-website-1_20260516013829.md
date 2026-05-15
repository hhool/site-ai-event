---
id: feature-ai-event-website-1
title: 年度现象级开源 AI 工具集网站
version: 1.0
status: ready
created: 2026-05-16
---

# Implementation Plan: feature-ai-event-website-1

## Phase 0 — Documentation (COMPLETED)

| ID | Task | Output | Status |
|---|---|---|---|
| TASK-001 | Generate Epic PRD | `docs/ways-of-work/plan/ai-event/epic.md` | ✅ |
| TASK-002 | Generate Architecture Spec | `docs/ways-of-work/plan/ai-event/arch.md` | ✅ |

---

## Phase 1 — Project Initialization

**Completion Criteria:** `pnpm dev` starts successfully, no TypeScript errors, Tailwind styles apply.

| ID | Task | Command / File | Dependencies |
|---|---|---|---|
| TASK-101 | Init Next.js 15 project | `pnpm create next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"` | none |
| TASK-102 | Install runtime deps | `pnpm add next-intl framer-motion lucide-react` | TASK-101 |
| TASK-103 | Install dev deps | `pnpm add -D @types/node` | TASK-101 |
| TASK-104 | Clean boilerplate | Remove `src/app/page.tsx` default content, clear `globals.css` except Tailwind directives | TASK-101 |

---

## Phase 2 — Data Layer

**Completion Criteria:** `import { tools } from '@/data/tools'` resolves with full TypeScript types, all 30 entries present.

| ID | Task | File | Dependencies |
|---|---|---|---|
| TASK-201 | Define Tool TypeScript interface | `src/data/types.ts` | TASK-101 |
| TASK-202 | Create tools data (2023 · 10 tools) | `src/data/tools.ts` | TASK-201 |
| TASK-203 | Create tools data (2024 · 10 tools) | `src/data/tools.ts` | TASK-201 |
| TASK-204 | Create tools data (2025 · 10 tools) | `src/data/tools.ts` | TASK-201 |
| TASK-205 | Export helper functions | `src/data/tools.ts` — `getToolBySlug()`, `getToolsByYear()`, `getAllSlugs()` | TASK-202–204 |

---

## Phase 3 — Internationalization

**Completion Criteria:** `/zh` redirects to zh locale, `/en` to en locale; `useTranslations()` returns correct strings in both locales.

| ID | Task | File | Dependencies |
|---|---|---|---|
| TASK-301 | Create zh UI copy | `src/i18n/zh.json` | TASK-101 |
| TASK-302 | Create en UI copy | `src/i18n/en.json` | TASK-101 |
| TASK-303 | Configure next-intl | `src/i18n/request.ts`, `src/i18n/routing.ts` | TASK-301–302 |
| TASK-304 | Create middleware | `src/middleware.ts` | TASK-303 |
| TASK-305 | Update next.config | `next.config.ts` — add `createNextIntlPlugin` | TASK-303 |

---

## Phase 4 — Shared Components (Parallelizable)

**Completion Criteria:** All components render without errors in isolation; TypeScript strict mode passes.

| ID | Task | File | Dependencies |
|---|---|---|---|
| TASK-401 | Header + LangSwitcher | `src/components/Header.tsx` | TASK-303 |
| TASK-402 | Footer | `src/components/Footer.tsx` | TASK-303 |
| TASK-403 | YearTabs | `src/components/YearTabs.tsx` | TASK-303 |
| TASK-404 | CategoryFilter | `src/components/CategoryFilter.tsx` | TASK-303 |
| TASK-405 | ToolCard | `src/components/ToolCard.tsx` | TASK-201 |
| TASK-406 | BackButton | `src/components/BackButton.tsx` | TASK-303 |

---

## Phase 5 — Detail Page Components (Parallelizable)

**Completion Criteria:** All detail components render with mock Tool data; layout matches spec.

| ID | Task | File | Dependencies |
|---|---|---|---|
| TASK-501 | ToolDetailHero | `src/components/detail/ToolDetailHero.tsx` | TASK-201 |
| TASK-502 | HighlightGrid | `src/components/detail/HighlightGrid.tsx` | TASK-201 |
| TASK-503 | CommunityQuote | `src/components/detail/CommunityQuote.tsx` | TASK-201 |
| TASK-504 | AudienceCards | `src/components/detail/AudienceCards.tsx` | TASK-201 |
| TASK-505 | RelatedTools | `src/components/detail/RelatedTools.tsx` | TASK-201 |

---

## Phase 6 — Pages

**Completion Criteria:** All routes resolve; static generation produces HTML for all 60+ pages (2 locales × 30 tools + index pages).

| ID | Task | File | Dependencies |
|---|---|---|---|
| TASK-601 | Root layout | `src/app/[locale]/layout.tsx` | TASK-303, TASK-401, TASK-402 |
| TASK-602 | List page | `src/app/[locale]/page.tsx` | TASK-403, TASK-404, TASK-405 |
| TASK-603 | Tool detail page | `src/app/[locale]/tool/[slug]/page.tsx` | TASK-501–505, TASK-205 |
| TASK-604 | generateStaticParams (detail) | inside `[slug]/page.tsx` | TASK-205 |
| TASK-605 | Root redirect | `src/app/page.tsx` — redirect to `/zh` | TASK-304 |

---

## Phase 7 — Visual Polish

**Completion Criteria:** Lighthouse Performance ≥ 85; Hero animation plays smoothly; card hover effects visible on Chrome + Safari.

| ID | Task | File | Notes |
|---|---|---|---|
| TASK-701 | Global CSS (dark theme, grid bg, glow) | `src/app/globals.css` | CSS custom properties |
| TASK-702 | Hero section (glow + large type) | inside `[locale]/page.tsx` Hero block | Framer Motion |
| TASK-703 | Card stagger animation | `ToolCard.tsx` + list page | `framer-motion` AnimatePresence |
| TASK-704 | Detail page section scroll-in | detail components | Framer Motion `whileInView` |
| TASK-705 | Year badge gradient colors | `ToolCard.tsx`, `ToolDetailHero.tsx` | 2023=blue, 2024=purple, 2025=orange |

---

## Phase 8 — Deployment

**Completion Criteria:** Vercel Preview URL accessible; all pages load; no build errors.

| ID | Task | Notes |
|---|---|---|
| TASK-801 | `next build` — verify 0 errors | Run locally first |
| TASK-802 | Push to GitHub repo | New repo: `ai-event` |
| TASK-803 | Vercel import + deploy | Framework: Next.js, auto-detected |

---

## Validation Checklist

- [ ] REQ-001: 30 工具数据完整，每条含 `demoUrl`（必填）
- [ ] REQ-002: `/zh` 和 `/en` 路由均可访问
- [ ] REQ-003: 语言切换后所有文案同步切换
- [ ] REQ-004: 所有 `demoUrl` 外链有效（手动验证）
- [ ] REQ-005: `next build` 零报错，静态页面数量 = 2×(1+30) = 62
- [ ] REQ-006: Lighthouse Performance ≥ 85, SEO ≥ 90, Accessibility ≥ 85
- [ ] REQ-007: 所有外链含 `rel="noopener noreferrer"`
- [ ] REQ-008: Vercel 部署成功，Preview URL 可访问
