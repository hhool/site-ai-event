# Knowledge To Tool Preset Mapping

> Chinese version: [knowledge-link-presets.zh.md](knowledge-link-presets.zh.md)

## Purpose

This document explains how concept links on the knowledge page map users to pre-filtered tool-list views.

## Rule Source

- Runtime config: `src/data/knowledge-tool-presets.ts`
- Consumer: `src/components/knowledge/knowledge-explorer.tsx`
- URL target: `/{locale}?q=...&tags=...&difficulty=...`

## Mapping Table

| Term key             | Query (`q`)   | Tags (`tags`)                 | Difficulty     | Priority | Intent                                                      |
| -------------------- | ------------- | ----------------------------- | -------------- | -------- | ----------------------------------------------------------- |
| `llm`                | `llm`         | `language-model,generative`   | -              | 1        | Guide users to foundational language-model choices first.   |
| `multimodal`         | `multimodal`  | `multimodal`                  | -              | 2        | Focus on cross-modal generation and understanding tools.    |
| `prompt-engineering` | `prompt`      | `workflow`                    | -              | 3        | Map prompt design to workflow-oriented practical tools.     |
| `rag`                | `rag`         | `retrieval,workflow`          | `intermediate` | 4        | Recommend mid-level retrieval and orchestration options.    |
| `agent`              | `agent`       | `ai-agent,workflow`           | `advanced`     | 5        | Route users to advanced autonomous workflow systems.        |
| `diffusion`          | `diffusion`   | `image-generation,generative` | -              | 6        | Surface image-generation tools for visual-content creation. |
| `fine-tuning`        | `fine tuning` | `instruction-tuned`           | `advanced`     | 7        | Direct users toward specialized model adaptation paths.     |
| `inference`          | `inference`   | `serving,inference-engine`    | -              | 8        | Highlight runtime serving and deployment capabilities.      |
| `benchmark`          | `benchmark`   | `monitoring,reasoning`        | -              | 9        | Connect evaluation concepts with observability tooling.     |

## Update Checklist

1. Only use tags that already exist in `src/data/tools.ts`.
2. Keep query terms short and broad enough for fuzzy matching.
3. Use `difficulty` only when a concept naturally implies learning complexity.
4. Add or update an E2E assertion in `tests/smoke.spec.ts` when changing mappings.
