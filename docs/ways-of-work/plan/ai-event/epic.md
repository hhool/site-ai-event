# Epic PRD: Annual Phenomenon-Level Open Source AI Tools Website

> Chinese version: [epic.zh.md](epic.zh.md)

## 1. Epic Name

**Annual Phenomenon-Level Open Source AI Tools**

---

## 2. Goal

### Problem

As the AI field evolves rapidly, numerous open-source AI tools emerge each year. There is no authoritative annual review platform. Users lack a way to quickly discover the most representative open-source AI tools of a given year, along with deep, series-style product-level introductions.

### Solution

Build a year-centric static website featuring ≤10 phenomenon-level open-source AI tools per year (2023–2025), each with a series-style deep introduction (Background / Technical Highlights / Community Response / Target Audience), official Demo URL, GitHub link, category tags, and full Chinese/English bilingual support.

### Impact

- Become the authoritative annual index for AI practitioners and enthusiasts
- Drive sustained organic search traffic through high-quality SEO content
- Reach both Chinese and English audiences via bilingual content

---

## 3. User Personas

1. **AI Practitioners** — Engineers and researchers seeking a quick overview of the open-source AI ecosystem for a given year
2. **Product Managers / Founders** — Looking for open-source AI tools to integrate or reference
3. **AI Enthusiasts / Learners** — Wanting to understand the technical background and usage of phenomenon-level tools
4. **Content Creators / Media** — Using as a reference source for annual AI roundup content

---

## 4. High-Level User Journeys

**Journey 1: Annual Tool Browsing**

> User lands on homepage → selects year (2023/2024/2025) → browses tool card grid → filters by category → clicks a tool card

**Journey 2: Deep Tool Exploration**

> User clicks tool card → enters detail page → reads Background → Technical Highlights → Community Response → Target Audience → clicks "Try Demo" to enter official demo

**Journey 3: Cross-Language Usage**

> User clicks ZH/EN switcher → all UI copy and tool content switches to target language

---

## 5. Business Requirements

### Functional Requirements

- Homepage supports filtering by year (2023 / 2024 / 2025)
- Homepage supports multi-select category tag filtering
- Each tool has an independent detail page at `/[locale]/tool/[slug]`
- Detail page contains four series sections: Background, Technical Highlights (3–5 items), Community Response, Target Audience (3–4 types)
- Each tool must have a valid official Demo URL (`demoUrl` required field)
- Full site supports Chinese/English bilingual (URL strategy: `/zh/` and `/en/`)
- ZH/EN language switcher in the top-right corner
- All tools must be open-source projects (with GitHub link)
- Tool count: ≤10 per year, across 3 years

### Non-Functional Requirements

- **Performance**: Lighthouse Performance ≥ 85, FCP < 2s
- **SEO**: Per-page `<title>` / `<meta description>` / `hreflang`, Lighthouse SEO ≥ 90
- **Accessibility**: Lighthouse Accessibility ≥ 85
- **Deployment**: Vercel, SSG static output, zero runtime cost
- **Maintainability**: Adding new yearly tools requires only appending to `tools.ts`, no component changes
- **Security**: All external links use `rel="noopener noreferrer"`

---

## 6. Success Metrics

- All 30 tool detail pages generated successfully via SSG
- Both `/zh` and `/en` routes are accessible
- All `demoUrl` links are valid and reachable
- Vercel deployment succeeds with accessible Preview URL
- Lighthouse Performance ≥ 85, SEO ≥ 90, Accessibility ≥ 85

---

## 7. Out of Scope

- User accounts, bookmarks, comments
- Real-time GitHub Star count via API (use static snapshot)
- Tool comparison feature
- Years beyond 2025 (future extension)
- Backend CMS

---

## 8. Business Value

**High** — Fills a gap in authoritative annual AI tool review content, combines SEO value with brand building, bilingual coverage maximises distribution reach.
