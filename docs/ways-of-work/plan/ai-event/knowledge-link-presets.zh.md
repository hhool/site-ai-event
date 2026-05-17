# 知识页到工具页预设映射

> English version: [knowledge-link-presets.md](knowledge-link-presets.md)

## 目标

说明知识页术语链接如何映射到“带预设筛选条件”的工具列表页，便于产品、运营和研发统一维护策略。

## 规则来源

- 运行时配置：`src/data/knowledge-tool-presets.ts`
- 消费组件：`src/components/knowledge/knowledge-explorer.tsx`
- 跳转目标：`/{locale}?q=...&tags=...&difficulty=...`

## 映射表

| 术语 key             | 查询 (`q`)    | 标签 (`tags`)                 | 难度           | 优先级 | 策略意图                               |
| -------------------- | ------------- | ----------------------------- | -------------- | ------ | -------------------------------------- |
| `llm`                | `llm`         | `language-model,generative`   | -              | 1      | 优先引导用户查看基础大模型选型。       |
| `multimodal`         | `multimodal`  | `multimodal`                  | -              | 2      | 聚焦多模态生成与理解能力相关工具。     |
| `prompt-engineering` | `prompt`      | `workflow`                    | -              | 3      | 把提示工程连接到工作流类实用工具。     |
| `rag`                | `rag`         | `retrieval,workflow`          | `intermediate` | 4      | 推荐中等门槛的检索与编排方案。         |
| `agent`              | `agent`       | `ai-agent,workflow`           | `advanced`     | 5      | 把用户导向高阶智能体与自主流程系统。   |
| `diffusion`          | `diffusion`   | `image-generation,generative` | -              | 6      | 突出图像生成工具，支持视觉内容创作。   |
| `fine-tuning`        | `fine tuning` | `instruction-tuned`           | `advanced`     | 7      | 引导到更专业的模型微调与适配路径。     |
| `inference`          | `inference`   | `serving,inference-engine`    | -              | 8      | 强调推理服务与部署运行能力。           |
| `benchmark`          | `benchmark`   | `monitoring,reasoning`        | -              | 9      | 将评测概念连接到可观测与效果评估工具。 |

## 更新检查清单

1. `tags` 必须来自 `src/data/tools.ts` 已存在标签。
2. `q` 建议使用短关键词，兼顾召回率与可读性。
3. 仅在概念天然对应学习门槛时设置 `difficulty`。
4. 每次调整映射后，更新 `tests/smoke.spec.ts` 对应端到端断言。
