# Epic Architecture Specification: Annual Phenomenon-Level Open Source AI Tools Website

> Chinese version: [arch.zh.md](arch.zh.md)

## 1. Epic Architecture Overview

This project uses **Next.js 15 App Router with full Static Site Generation (SSG)**. All pages are pre-rendered at build time; the deployment artifact is pure static files hosted on Vercel. The data layer is a TypeScript object file (no database). Internationalization is handled by `next-intl` with `/zh/` and `/en/` route separation. The visual layer uses TailwindCSS + Framer Motion for a dark, tech-style UI.

---

## 2. System Architecture Diagram

```mermaid
graph TB
    subgraph User["User Layer"]
        Browser["Web Browser (Desktop / Mobile)"]
    end
    subgraph CDN["CDN / Edge (Vercel)"]
        Edge["Vercel Edge Network — Static Asset Delivery"]
    end
    subgraph App["Application Layer (Next.js 15 SSG)"]
        Middleware["next-intl Middleware — Locale Detection & Redirect"]
        ListPage["app/[locale]/page.tsx — List Page"]
        DetailPage["app/[locale]/tool/[slug]/page.tsx — Tool Detail Page"]
        Layout["app/[locale]/layout.tsx — SEO Metadata + lang attr"]
    end
    subgraph Components["Component Layer"]
        Header["Header + LangSwitcher"]
        YearTabs["YearTabs"]
        CategoryFilter["CategoryFilter"]
        ToolCard["ToolCard"]
        ToolDetailHero["ToolDetailHero"]
        HighlightGrid["HighlightGrid"]
        CommunityQuote["CommunityQuote"]
        AudienceCards["AudienceCards"]
        RelatedTools["RelatedTools"]
    end
    subgraph Data["Data Layer (Static TypeScript)"]
        ToolsTS["src/data/tools.ts — 30 Tools · Bilingual · Full Detail"]
        I18nZH["src/i18n/zh.json — Chinese UI Copy"]
        I18nEN["src/i18n/en.json — English UI Copy"]
    end
    subgraph External["External Links (Open in New Tab)"]
        DemoURL["Official Demo URLs"]
        GithubURL["GitHub Repositories"]
        WebsiteURL["Official Websites"]
    end
    Browser -->|HTTPS Request| Edge
    Edge --> Middleware
    Middleware -->|/zh/* or /en/*| ListPage
    Middleware -->|/zh/tool/[slug] or /en/tool/[slug]| DetailPage
    ListPage --> YearTabs & CategoryFilter & ToolCard
    DetailPage --> ToolDetailHero & HighlightGrid & CommunityQuote & AudienceCards & RelatedTools
    Header --> LangSwitcher
    ToolsTS --> ListPage & DetailPage
    I18nZH & I18nEN --> Layout
    ToolCard & ToolDetailHero -->|demoUrl| DemoURL
    ToolCard -->|githubUrl| GithubURL
```

---

## 3. High-Level Features & Technical Enablers

### Features

| # | Feature | Description |
|---|---|---|
| F1 | List Page | Year tabs + category filter + tool card grid (3-col / 2-col / 1-col responsive) |
| F2 | Tool Detail Page | 4 series sections + bilingual + SEO metadata + related tools at bottom |
| F3 | Chinese/English Bilingual | `/zh/` & `/en/` route separation, `next-intl` driven, ZH/EN switcher |
| F4 | Grand Visual System | Deep black background + glow Hero + frosted-glass cards + Framer Motion stagger |
| F5 | Full SEO Coverage | Per-page metadata, hreflang, og:image, lang attribute |

### Technical Enablers

| Enabler | Purpose |
|---|---|
| `next-intl` | App Router i18n with middleware-based route dispatch |
| `framer-motion` | Card stagger entry, tab transitions, detail page section scroll-in |
| `lucide-react` | GitHub / external link / star SVG icons |
| `next/font` | Geist + Inter fonts loaded locally, avoiding external CDN |
| `generateStaticParams()` | Pre-generate all `/tool/[slug]` static pages, zero runtime |

---

## 4. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 15.x (App Router) |
| Language | TypeScript | 5.x |
| Styling | TailwindCSS | 3.x |
| Internationalization | next-intl | 3.x |
| Animation | framer-motion | 11.x |
| Icons | lucide-react | latest |
| Font | next/font (Geist + Inter) | built-in |
| Deployment | Vercel | Static Export / ISR |
| Package Manager | pnpm | 9.x |

---

## 5. Technical Value

**High** — Pure static approach with zero runtime cost. Data layer has minimal friction for extension (append TypeScript objects). `next-intl` App Router integration is the current best practice for Chinese + English Next.js internationalisation. Vercel deployment requires zero configuration.

---

## 6. T-Shirt Size Estimate

| Area | Size | Notes |
|---|---|---|
| Data population (30 tools, bilingual full detail) | XL | Largest content volume, AI-assisted |
| List page development | M | Standard card grid + filter logic |
| Detail page development | M | 4-section components + routing + SEO |
| Internationalisation setup | S | Standard next-intl configuration |
| Visual system (Hero + animations) | M | CSS + Framer Motion |
| **Total** | **L** | — |
