# Epic 架构规格：年度现象级开源 AI 工具集网站

> English version: [arch.md](arch.md)

## 1. 架构概述

本项目采用 **Next.js 15 App Router 纯静态生成（SSG）** 方案。所有页面在构建期预渲染，部署产物为静态文件，托管于 Vercel。数据层为 TypeScript 对象文件（无数据库），国际化通过 `next-intl` 实现 `/zh/` 和 `/en/` 路由分离，视觉层采用 TailwindCSS + Framer Motion 构建深色科技风格 UI。

---

## 2. 系统架构图

```mermaid
graph TB
    subgraph User["用户层"]
        Browser["Web 浏览器（桌面 / 移动端）"]
    end
    subgraph CDN["CDN / 边缘节点（Vercel）"]
        Edge["Vercel 边缘网络 — 静态资源分发"]
    end
    subgraph App["应用层（Next.js 15 SSG）"]
        Middleware["next-intl 中间件 — 语言检测与重定向"]
        ListPage["app/[locale]/page.tsx — 主列表页"]
        DetailPage["app/[locale]/tool/[slug]/page.tsx — 工具详情页"]
        Layout["app/[locale]/layout.tsx — SEO Metadata + lang 属性"]
    end
    subgraph Components["组件层"]
        Header["Header + 语言切换器"]
        YearTabs["年份 Tab"]
        CategoryFilter["分类筛选器"]
        ToolCard["工具卡片"]
        ToolDetailHero["详情页 Hero"]
        HighlightGrid["技术亮点网格"]
        CommunityQuote["社区反响引用块"]
        AudienceCards["适用人群卡片"]
        RelatedTools["同年推荐"]
    end
    subgraph Data["数据层（静态 TypeScript）"]
        ToolsTS["src/data/tools.ts — 30 款工具 · 双语 · 完整详情"]
        I18nZH["src/i18n/zh.json — 中文 UI 文案"]
        I18nEN["src/i18n/en.json — 英文 UI 文案"]
    end
    subgraph External["外部链接（新标签页打开）"]
        DemoURL["官方 Demo 入口"]
        GithubURL["GitHub 仓库"]
        WebsiteURL["官网"]
    end
    Browser -->|HTTPS 请求| Edge
    Edge --> Middleware
    Middleware -->|/zh/* 或 /en/*| ListPage
    Middleware -->|/zh/tool/[slug] 或 /en/tool/[slug]| DetailPage
    ListPage --> YearTabs & CategoryFilter & ToolCard
    DetailPage --> ToolDetailHero & HighlightGrid & CommunityQuote & AudienceCards & RelatedTools
    ToolsTS --> ListPage & DetailPage
    I18nZH & I18nEN --> Layout
    ToolCard & ToolDetailHero -->|demoUrl| DemoURL
    ToolCard -->|githubUrl| GithubURL
```

---

## 3. 高层功能与技术支撑

### 功能特性

| # | 功能 | 描述 |
|---|---|---|
| F1 | 主列表页 | 年份 Tab + 分类筛选 + 工具卡片网格（3列/2列/1列响应式）|
| F2 | 工具详情页 | 4 节系列化内容 + 双语 + SEO metadata + 底部同年推荐 |
| F3 | 中英双语 | `/zh/` & `/en/` 路由分离，`next-intl` 驱动，ZH/EN 切换按钮 |
| F4 | 大气视觉系统 | 深黑底色 + 光晕 Hero + 毛玻璃卡片 + Framer Motion stagger |
| F5 | SEO 完整覆盖 | 每页独立 metadata、hreflang、og:image、lang 属性 |

### 技术支撑项

| 支撑项 | 用途 |
|---|---|
| `next-intl` | App Router 深度集成国际化，middleware 路由分发 |
| `framer-motion` | 卡片 stagger 入场、Tab 切换、详情页 section 滚动触发 |
| `lucide-react` | GitHub / 外链 / 星标等 SVG 图标 |
| `next/font` | Geist + Inter 字体本地加载，避免外部 CDN |
| `generateStaticParams()` | 预生成所有 `/tool/[slug]` 静态页，零运行时 |

---

## 4. 技术栈

| 层级 | 技术 | 版本 |
|---|---|---|
| 框架 | Next.js | 15.x (App Router) |
| 语言 | TypeScript | 5.x |
| 样式 | TailwindCSS | 3.x |
| 国际化 | next-intl | 3.x |
| 动效 | framer-motion | 11.x |
| 图标 | lucide-react | latest |
| 字体 | next/font (Geist + Inter) | built-in |
| 部署 | Vercel | 静态导出 / ISR |
| 包管理器 | pnpm | 9.x |

---

## 5. 技术价值

**高** — 纯静态方案无运行时成本，数据层扩展极低摩擦（追加 TypeScript 对象），`next-intl` App Router 集成是当前最佳中英文 Next.js 国际化实践，Vercel 部署零配置。

---

## 6. 规模估算（T-Shirt）

| 领域 | 规模 | 备注 |
|---|---|---|
| 数据填充（30 工具双语详情）| XL | 内容量最大，AI 辅助生成 |
| 主列表页开发 | M | 标准卡片网格 + 筛选逻辑 |
| 详情页开发 | M | 4 节组件 + 路由 + SEO |
| 国际化配置 | S | next-intl 标准配置 |
| 视觉系统（Hero + 动效）| M | CSS + Framer Motion |
| **总计** | **L** | — |
