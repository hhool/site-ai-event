# GitHub Rulesets Setup Guide

This guide provides a practical baseline for configuring GitHub Rulesets for `hhool/site-ai-event`.

## Why Rulesets

Rulesets are a newer governance model than classic branch protection rules and support:

- Better targeting (branches, tags, and push rules)
- Reusable policy logic
- Cleaner auditability

## Recommended Ruleset Structure

Create two rulesets:

1. Branch ruleset for `main`
2. Tag ruleset for release tags (`v*`)

## 1) Branch Ruleset (main)

Go to:

- `Settings` -> `Rules` -> `Rulesets` -> `New ruleset` -> `New branch ruleset`

Use these values:

- Name: `main-protection`
- Enforcement status: `Active`
- Target branches: `main`

Enable these rules:

- Require a pull request before merging
- Required approvals: `1`
- Dismiss stale approvals
- Require conversation resolution
- Require status checks to pass
- Require branch to be up to date before merging
- Block force pushes
- Block branch deletion

Required status checks (select from completed checks list):

- `quality / quality`
- `Analyze / Analyze (javascript-typescript)`
- `commitlint / commitlint`
- `validate-pr-description / validate-pr-description`

## 2) Tag Ruleset (release tags)

Go to:

- `Settings` -> `Rules` -> `Rulesets` -> `New ruleset` -> `New tag ruleset`

Use these values:

- Name: `release-tag-policy`
- Enforcement status: `Active`
- Target tags: `v*`

Recommended rules:

- Restrict tag creation/update/deletion to maintainers
- Prevent deletion of release tags

## Integration Notes

- `release.yml` runs when tags like `v1.0.0` are pushed.
- `release-drafter.yml` keeps release notes draft updated from merged PRs.

## Validation Checklist

- [ ] Rulesets are active
- [ ] A test PR to `main` is blocked until required checks pass
- [ ] Direct push to `main` is blocked for non-admin users
- [ ] Tag creation follows `v*` policy
- [ ] Release workflow triggers on tag push

## Related Docs

- [Branch Protection Guide](branch-protection.md)
- [Branch Protection Checklist](branch-protection-checklist.md)
- [Repository Settings Baseline](repository-settings-baseline.md)
