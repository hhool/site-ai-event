# 发布运行手册

本文定义 `hhool/site-ai-event` 的标准发布流程。

## 适用范围

- 仓库：`hhool/site-ai-event`
- 默认分支：`main`
- 版本策略：语义化标签（`vX.Y.Z`）

## 角色分工

- 发布负责人：创建标签并验证发布结果
- 复核人：检查流程与线上行为
- 事件响应人：处理回滚与对外同步

## 发布前检查

- [ ] `main` 与远端同步且工作区干净
- [ ] 最新提交的 CI 全绿
- [ ] 核心工作流状态正常：
  - [ ] CI
  - [ ] CodeQL
  - [ ] Commitlint
  - [ ] PR 描述校验
- [ ] 已检查 Release Drafter 草稿说明
- [ ] 无阻塞级问题或重大故障

## 发布步骤

1. 拉取最新 `main`
2. 确认目标提交 SHA
3. 创建标签：
   - `git tag vX.Y.Z`
4. 推送标签：
   - `git push origin vX.Y.Z`
5. 验证 GitHub Actions：
   - `.github/workflows/release.yml` 已触发
   - Release 产物已生成
6. 验证 Release 页面：
   - 标签存在
   - 说明已生成
   - 附件可下载

## 发布后验证

- [ ] 首页可访问（`/en`、`/zh`）
- [ ] 任意详情页可访问
- [ ] 关键链接可打开（demo/github/官网）
- [ ] 监控/日志无严重错误

## 回滚流程

若本次发布存在严重问题：

1. 确认最近稳定版本（如 `v0.1.0`）
2. 在团队渠道同步故障状态
3. 执行以下之一：
   - 平台侧快速回滚（优先）
   - 从修复提交发补丁版本（`vX.Y.(Z+1)`）
4. 验证恢复检查项
5. 发布事故总结与根因说明

## 热修复流程

1. 基于稳定提交或 `main` 建立修复分支
2. 仅提交最小必要修复
3. 发起 PR 并添加 `bug` 标签
4. 必过检查通过后合并
5. 打补丁标签（如 `v0.1.2`）

## 对外同步模板

### 发布公告

- Version：`vX.Y.Z`
- Scope：简要变更范围
- Risk level：low/medium/high
- Rollback plan：稳定标签引用

### 事故更新

- Status：investigating/mitigated/resolved
- Impact：影响范围
- ETA：预计恢复时间
- Next update：下次同步时间

## 相关文档

- [Branch Protection Guide](../governance/branch-protection.md)
- [Rulesets Setup Guide](../governance/rulesets-setup.zh.md)
- [Repository Settings Baseline](../governance/repository-settings-baseline.zh.md)
