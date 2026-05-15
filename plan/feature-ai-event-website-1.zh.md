---
id: feature-ai-event-website-1
title: 年度现象级开源 AI 工具集网站
version: 1.0
status: ready
created: 2026-05-16
---

# 执行计划：feature-ai-event-website-1

> English version: [feature-ai-event-website-1.md](feature-ai-event-website-1.md)

## Phase 0 — 文档（已完成）

| ID       | 任务          | 输出文件                                  | 状态 |
| -------- | ------------- | ----------------------------------------- | ---- |
| TASK-001 | 生成 Epic PRD | `docs/ways-of-work/plan/ai-event/epic.md` | ✅   |
| TASK-002 | 生成架构规格  | `docs/ways-of-work/plan/ai-event/arch.md` | ✅   |

---

## Phase 1 — 项目初始化

**完成标准：** `pnpm dev` 启动成功，无 TypeScript 报错，Tailwind 样式生效。

| ID       | 任务                   | 命令 / 文件                                                                                           | 依赖     |
| -------- | ---------------------- | ----------------------------------------------------------------------------------------------------- | -------- |
| TASK-101 | 初始化 Next.js 15 项目 | `pnpm create next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"` | 无       |
| TASK-102 | 安装运行时依赖         | `pnpm add next-intl framer-motion lucide-react`                                                       | TASK-101 |
| TASK-103 | 安装开发依赖           | `pnpm add -D @types/node`                                                                             | TASK-101 |
| TASK-104 | 清理样板代码           | 清空 `src/app/page.tsx` 默认内容，`globals.css` 只保留 Tailwind 指令                                  | TASK-101 |

---

## Phase 2 — 数据层

**完成标准：** `import { tools } from '@/data/tools'` 正常解析，TypeScript 类型完整，30 条数据全部存在。

| ID       | 任务                          | 文件                                                                         | 依赖         |
| -------- | ----------------------------- | ---------------------------------------------------------------------------- | ------------ |
| TASK-201 | 定义 Tool TypeScript 接口     | `src/data/types.ts`                                                          | TASK-101     |
| TASK-202 | 填充 2023 年工具数据（10 条） | `src/data/tools.ts`                                                          | TASK-201     |
| TASK-203 | 填充 2024 年工具数据（10 条） | `src/data/tools.ts`                                                          | TASK-201     |
| TASK-204 | 填充 2025 年工具数据（10 条） | `src/data/tools.ts`                                                          | TASK-201     |
| TASK-205 | 导出辅助函数                  | `src/data/tools.ts` — `getToolBySlug()`、`getToolsByYear()`、`getAllSlugs()` | TASK-202–204 |

---

## Phase 3 — 国际化

**完成标准：** `/zh` 正确重定向至 zh locale，`/en` 至 en locale；`useTranslations()` 在两种语言下均返回正确字符串。

| ID       | 任务             | 文件                                           | 依赖         |
| -------- | ---------------- | ---------------------------------------------- | ------------ |
| TASK-301 | 创建中文 UI 文案 | `src/i18n/zh.json`                             | TASK-101     |
| TASK-302 | 创建英文 UI 文案 | `src/i18n/en.json`                             | TASK-101     |
| TASK-303 | 配置 next-intl   | `src/i18n/request.ts`、`src/i18n/routing.ts`   | TASK-301–302 |
| TASK-304 | 创建 middleware  | `src/middleware.ts`                            | TASK-303     |
| TASK-305 | 更新 next.config | `next.config.ts` — 添加 `createNextIntlPlugin` | TASK-303     |

---

## Phase 4 — 共用组件（可并行）

**完成标准：** 所有组件独立渲染无报错；TypeScript strict 模式通过。

| ID       | 任务                | 文件                                | 依赖     |
| -------- | ------------------- | ----------------------------------- | -------- |
| TASK-401 | Header + 语言切换器 | `src/components/Header.tsx`         | TASK-303 |
| TASK-402 | Footer              | `src/components/Footer.tsx`         | TASK-303 |
| TASK-403 | YearTabs            | `src/components/YearTabs.tsx`       | TASK-303 |
| TASK-404 | CategoryFilter      | `src/components/CategoryFilter.tsx` | TASK-303 |
| TASK-405 | ToolCard            | `src/components/ToolCard.tsx`       | TASK-201 |
| TASK-406 | BackButton          | `src/components/BackButton.tsx`     | TASK-303 |

---

## Phase 5 — 详情页组件（可并行）

**完成标准：** 所有详情组件用模拟 Tool 数据正常渲染；布局符合规格。

| ID       | 任务           | 文件                                       | 依赖     |
| -------- | -------------- | ------------------------------------------ | -------- |
| TASK-501 | ToolDetailHero | `src/components/detail/ToolDetailHero.tsx` | TASK-201 |
| TASK-502 | HighlightGrid  | `src/components/detail/HighlightGrid.tsx`  | TASK-201 |
| TASK-503 | CommunityQuote | `src/components/detail/CommunityQuote.tsx` | TASK-201 |
| TASK-504 | AudienceCards  | `src/components/detail/AudienceCards.tsx`  | TASK-201 |
| TASK-505 | RelatedTools   | `src/components/detail/RelatedTools.tsx`   | TASK-201 |

---

## Phase 6 — 页面路由

**完成标准：** 所有路由正常解析；静态生成 HTML 总数 = 62 页（2 locale × 31 页）。

| ID       | 任务                         | 文件                                    | 依赖                         |
| -------- | ---------------------------- | --------------------------------------- | ---------------------------- |
| TASK-601 | 根布局                       | `src/app/[locale]/layout.tsx`           | TASK-303, TASK-401, TASK-402 |
| TASK-602 | 主列表页                     | `src/app/[locale]/page.tsx`             | TASK-403, TASK-404, TASK-405 |
| TASK-603 | 工具详情页                   | `src/app/[locale]/tool/[slug]/page.tsx` | TASK-501–505, TASK-205       |
| TASK-604 | generateStaticParams（详情） | `[slug]/page.tsx` 内                    | TASK-205                     |
| TASK-605 | 根路由重定向                 | `src/app/page.tsx` — 重定向至 `/en`     | TASK-304                     |

---

## Phase 7 — 视觉精调

**完成标准：** Lighthouse Performance ≥ 85；Hero 动画流畅；卡片 hover 效果在 Chrome + Safari 均可见。

| ID       | 任务                                 | 文件                                 | 备注                            |
| -------- | ------------------------------------ | ------------------------------------ | ------------------------------- |
| TASK-701 | 全局 CSS（暗色主题、网格背景、光晕） | `src/app/globals.css`                | CSS 自定义属性                  |
| TASK-702 | Hero 区域（光晕 + 超大字）           | `[locale]/page.tsx` Hero 区块        | Framer Motion                   |
| TASK-703 | 卡片 stagger 动画                    | `ToolCard.tsx` + 列表页              | `framer-motion` AnimatePresence |
| TASK-704 | 详情页 section 滚动入场              | 详情组件                             | Framer Motion `whileInView`     |
| TASK-705 | 年份 badge 渐变色                    | `ToolCard.tsx`、`ToolDetailHero.tsx` | 2023=蓝，2024=紫，2025=橙       |

---

## Phase 8 — 部署

**完成标准：** Vercel Preview URL 可访问；所有页面正常加载；构建无报错。

| ID       | 任务                      | 备注                    |
| -------- | ------------------------- | ----------------------- |
| TASK-801 | `next build` — 验证零报错 | 先本地执行              |
| TASK-802 | 推送至 GitHub 仓库        | 新建仓库：`ai-event`    |
| TASK-803 | Vercel 导入 + 部署        | 框架：Next.js，自动检测 |

---

## 验证清单

- [ ] REQ-001：30 条工具数据完整，每条含 `demoUrl`（必填）
- [ ] REQ-002：`/zh` 和 `/en` 路由均可正常访问
- [ ] REQ-003：语言切换后所有文案同步切换
- [ ] REQ-004：所有 `demoUrl` 外链有效（手动逐一验证）
- [ ] REQ-005：`next build` 零报错，静态页面数 = 2 × (1 + 30) = 62
- [ ] REQ-006：Lighthouse Performance ≥ 85，SEO ≥ 90，Accessibility ≥ 85
- [ ] REQ-007：所有外链含 `rel="noopener noreferrer"`
- [ ] REQ-008：Vercel 部署成功，Preview URL 可访问
- [ ] REQ-009：默认语言为英文（`/` 重定向至 `/en`）
