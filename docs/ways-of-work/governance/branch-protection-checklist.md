# Branch Protection Checklist

Use this quick checklist when configuring protection for the `main` branch.

## Pre-check

- [ ] Confirm repository is `hhool/site-ai-event`
- [ ] Confirm target branch pattern is `main`
- [ ] Ensure these workflows have run at least once:
  - [ ] `.github/workflows/ci.yml`
  - [ ] `.github/workflows/codeql.yml`
  - [ ] `.github/workflows/commitlint.yml`
  - [ ] `.github/workflows/pr-body-check.yml`

## Required Protection Toggles

- [ ] Require a pull request before merging
- [ ] Require approvals = 1
- [ ] Dismiss stale approvals when new commits are pushed
- [ ] Require conversation resolution before merging
- [ ] Require status checks to pass before merging
- [ ] Require branches to be up to date before merging
- [ ] Do not allow bypassing the above settings

## Required Status Checks

- [ ] quality / quality
- [ ] Analyze / Analyze (javascript-typescript)
- [ ] commitlint / commitlint
- [ ] validate-pr-description / validate-pr-description

## Optional Hardening

- [ ] Require signed commits
- [ ] Require linear history
- [ ] Disable force pushes for non-admin users
- [ ] Disable branch deletion for non-admin users

## Merge Strategy

- [ ] Enable Squash merge
- [ ] Disable Merge commit
- [ ] Keep commit titles in Conventional Commit format

## Validation

- [ ] Open a test PR and verify blocked merge when checks fail
- [ ] Verify merge enabled only when all required checks pass
- [ ] Verify direct push to `main` is blocked for non-admin users

## Related Docs

- [Branch Protection Guide](branch-protection.md)
