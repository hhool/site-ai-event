# Repository Settings Baseline

This baseline defines recommended GitHub repository settings for `hhool/site-ai-event`.

## Scope

- Repository: `hhool/site-ai-event`
- Objective: stable collaboration, secure defaults, and enforceable quality gates

## 1) General

Go to `Settings` -> `General`.

### Repository name and visibility

- Keep repository name stable
- Keep visibility as intended by project policy (public/private)

### Features

- Issues: Enabled
- Projects: Optional
- Wiki: Disabled (unless actively used)
- Discussions: Enabled (recommended for Q&A)

### Pull Requests

- Allow squash merging: Enabled
- Allow merge commits: Disabled
- Allow rebase merging: Optional (usually disabled for cleaner history)
- Automatically delete head branches: Enabled

## 2) Branches / Rules

Use Rulesets as primary enforcement.

- Main branch policy: see [rulesets-setup.md](rulesets-setup.md)
- Fallback classic rule: see [branch-protection.md](branch-protection.md)

## 3) Actions

Go to `Settings` -> `Actions` -> `General`.

### Actions permissions

- Allow all actions and reusable workflows: Enabled (or a curated allowlist if required)
- Workflow permissions: `Read and write permissions`
- Allow GitHub Actions to create and approve pull requests: Disabled unless needed

### Artifact and log retention

- Keep default retention unless legal/compliance requires custom values

## 4) Code Security and Analysis

Go to `Settings` -> `Security` / `Code security and analysis`.

Enable:

- Dependency graph
- Dependabot alerts
- Dependabot security updates
- Secret scanning (if available)
- Push protection for secrets (if available)
- Code scanning alerts (CodeQL)

## 5) Secrets and Variables

Go to `Settings` -> `Secrets and variables`.

- Keep repository secrets minimal
- Prefer environment-scoped secrets for deployment workflows
- Rotate sensitive tokens periodically

## 6) Webhooks and Integrations

- Keep only required webhooks/integrations
- Remove unused integrations
- Validate least-privilege scopes for installed GitHub Apps

## 7) Notifications and Team Hygiene

- Require CODEOWNERS review participation where applicable
- Keep stale automation enabled to prevent backlog drift
- Keep issue and PR templates enabled

## 8) Required Checks Policy

Ensure these required checks are enforced in Rulesets:

- `quality / quality`
- `Analyze / Analyze (javascript-typescript)`
- `commitlint / commitlint`
- `validate-pr-description / validate-pr-description`

## 9) Operational Checklist

- [ ] All recommended General settings applied
- [ ] Rulesets active for `main`
- [ ] Security and analysis features enabled
- [ ] Required checks enforced
- [ ] Merge strategy policy confirmed
- [ ] Team/admin permissions reviewed

## Related Docs

- [Branch Protection Guide](branch-protection.md)
- [Branch Protection Checklist](branch-protection-checklist.md)
- [Rulesets Setup Guide](rulesets-setup.md)
