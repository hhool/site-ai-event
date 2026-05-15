# Repository Settings 基线配置

本文定义 `hhool/site-ai-event` 仓库在 GitHub 中的推荐配置基线。

## 适用范围

- 仓库：`hhool/site-ai-event`
- 目标：协作稳定、安全默认、质量门禁可执行

## 1）General

进入 `Settings` -> `General`。

### 仓库名称与可见性

- 仓库名称保持稳定
- 可见性按项目策略保持（public/private）

### Features

- Issues：开启
- Projects：可选
- Wiki：建议关闭（除非确实在用）
- Discussions：建议开启（用于问答）

### Pull Requests

- Allow squash merging：开启
- Allow merge commits：关闭
- Allow rebase merging：可选（通常建议关闭以保持历史整洁）
- Automatically delete head branches：开启

## 2）Branches / Rules

优先使用 Rulesets 管理规则。

- `main` 规则：见 [rulesets-setup.zh.md](rulesets-setup.zh.md)
- 传统 Branch Protection 兜底：见 [branch-protection.md](branch-protection.md)

## 3）Actions

进入 `Settings` -> `Actions` -> `General`。

### Actions 权限

- Allow all actions and reusable workflows：开启（如有合规要求可改白名单）
- Workflow permissions：`Read and write permissions`
- Allow GitHub Actions to create and approve pull requests：非必要关闭

### 产物与日志保留

- 无特殊合规要求时保持默认

## 4）Code Security and Analysis

进入 `Settings` -> `Security` / `Code security and analysis`。

建议开启：

- Dependency graph
- Dependabot alerts
- Dependabot security updates
- Secret scanning（如套餐支持）
- Push protection for secrets（如套餐支持）
- Code scanning alerts（CodeQL）

## 5）Secrets and Variables

进入 `Settings` -> `Secrets and variables`。

- 最小化仓库级 secrets
- 部署类敏感信息优先放在 environment secrets
- 定期轮换 token

## 6）Webhooks 与集成

- 仅保留必要 webhook/集成
- 清理不用的集成
- 对 GitHub App 权限执行最小权限原则

## 7）通知与团队协作

- 关键路径建议结合 CODEOWNERS 参与评审
- 保持 stale 自动化，避免 backlog 积压
- 保持 Issue/PR 模板启用

## 8）必过检查策略

在 Rulesets 中确保以下检查为 required：

- `quality / quality`
- `Analyze / Analyze (javascript-typescript)`
- `commitlint / commitlint`
- `validate-pr-description / validate-pr-description`

## 9）落地检查清单

- [ ] General 推荐项完成
- [ ] `main` Rulesets 已激活
- [ ] 安全能力已启用
- [ ] required checks 已绑定
- [ ] 合并策略已确认
- [ ] 团队/管理员权限已复核

## 相关文档

- [Branch Protection Guide](branch-protection.md)
- [Branch Protection Checklist](branch-protection-checklist.zh.md)
- [Rulesets Setup Guide](rulesets-setup.zh.md)
