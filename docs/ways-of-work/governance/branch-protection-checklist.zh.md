# 分支保护检查清单

使用本清单为 `main` 分支配置保护规则。

## 前置检查

- [ ] 仓库为 `hhool/site-ai-event`
- [ ] 目标分支规则为 `main`
- [ ] 以下工作流至少在 `main` 跑过一次：
  - [ ] `.github/workflows/ci.yml`
  - [ ] `.github/workflows/codeql.yml`
  - [ ] `.github/workflows/commitlint.yml`
  - [ ] `.github/workflows/pr-body-check.yml`

## 必选保护开关

- [ ] Require a pull request before merging
- [ ] Require approvals = 1
- [ ] Dismiss stale approvals when new commits are pushed
- [ ] Require conversation resolution before merging
- [ ] Require status checks to pass before merging
- [ ] Require branches to be up to date before merging
- [ ] Do not allow bypassing the above settings

## 必过状态检查

- [ ] quality / quality
- [ ] Analyze / Analyze (javascript-typescript)
- [ ] commitlint / commitlint
- [ ] validate-pr-description / validate-pr-description

## 可选加固

- [ ] Require signed commits
- [ ] Require linear history
- [ ] 禁止非管理员强推
- [ ] 禁止非管理员删除分支

## 合并策略

- [ ] 启用 Squash merge
- [ ] 关闭 Merge commit
- [ ] 提交标题使用 Conventional Commit 规范

## 验证项

- [ ] 创建测试 PR，验证检查失败时不可合并
- [ ] 验证仅在所有 required checks 通过后可合并
- [ ] 验证非管理员不可直接推送到 `main`

## 相关文档

- [Branch Protection Guide](branch-protection.md)
