# GitHub Rulesets 配置指南

本文给出 `hhool/site-ai-event` 的 GitHub Rulesets 实用基线配置。

## 为什么使用 Rulesets

相较传统 Branch Protection，Rulesets 提供：

- 更精细的目标范围（分支、标签、推送规则）
- 更易复用的策略结构
- 更清晰的审计可追踪性

## 推荐结构

建议配置两个 Ruleset：

1. `main` 分支规则
2. 发布标签规则（`v*`）

## 1）分支规则（main）

进入：

- `Settings` -> `Rules` -> `Rulesets` -> `New ruleset` -> `New branch ruleset`

建议值：

- Name: `main-protection`
- Enforcement status: `Active`
- Target branches: `main`

建议启用：

- Require a pull request before merging
- Required approvals: `1`
- Dismiss stale approvals
- Require conversation resolution
- Require status checks to pass
- Require branch to be up to date before merging
- Block force pushes
- Block branch deletion

必过检查项（从历史检查中勾选）：

- `quality / quality`
- `Analyze / Analyze (javascript-typescript)`
- `commitlint / commitlint`
- `validate-pr-description / validate-pr-description`

## 2）标签规则（release tags）

进入：

- `Settings` -> `Rules` -> `Rulesets` -> `New ruleset` -> `New tag ruleset`

建议值：

- Name: `release-tag-policy`
- Enforcement status: `Active`
- Target tags: `v*`

建议启用：

- 仅维护者可创建/更新/删除标签
- 禁止删除发布标签

## 与现有工作流配合

- `release.yml` 在推送 `v1.0.0` 这类标签时触发。
- `release-drafter.yml` 会根据已合并 PR 自动维护发布说明草稿。

## 验证清单

- [ ] Rulesets 状态为 Active
- [ ] 测试 PR 未通过必过检查时无法合并
- [ ] 非管理员无法直接推送 `main`
- [ ] 标签创建符合 `v*` 规则
- [ ] 推送标签后可触发 Release 工作流

## 相关文档

- [Branch Protection Guide](branch-protection.md)
- [Branch Protection Checklist](branch-protection-checklist.md)
