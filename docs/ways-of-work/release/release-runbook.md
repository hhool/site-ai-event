# Release Runbook

This runbook defines the standard process for releasing `hhool/site-ai-event`.

## Scope

- Repository: `hhool/site-ai-event`
- Default branch: `main`
- Versioning: semantic tags (`vX.Y.Z`)

## Roles

- Release owner: creates release tag and validates deployment
- Reviewer: verifies checks and production behavior
- Incident responder: handles rollback and communication

## Pre-Release Checklist

- [ ] `main` is synced with remote and clean
- [ ] CI checks are green on latest commit
- [ ] Required workflows are healthy:
  - [ ] CI
  - [ ] CodeQL
  - [ ] Commitlint
  - [ ] PR description validation
- [ ] Release notes draft reviewed (Release Drafter)
- [ ] No open blockers or critical incidents

## Release Steps

1. Pull latest `main`.
2. Confirm target commit SHA.
3. Create tag:
   - `git tag vX.Y.Z`
4. Push tag:
   - `git push origin vX.Y.Z`
5. Verify GitHub Actions:
   - `.github/workflows/release.yml` triggered
   - Release artifact generated
6. Verify release page:
   - Tag exists
   - Notes generated
   - Asset attached

## Post-Release Verification

- [ ] Homepage loads (`/en`, `/zh`)
- [ ] At least one detail page loads
- [ ] Key links open (demo/github/official site)
- [ ] No critical errors in logs/monitoring

## Rollback Procedure

If release is bad:

1. Identify last stable tag (for example `v0.1.0`).
2. Communicate incident in team channel.
3. Apply one of these options:
   - Fast rollback at platform level (preferred)
   - New hotfix release (`vX.Y.(Z+1)`) from fixed commit
4. Confirm recovery checks pass.
5. Publish incident summary and root cause.

## Hotfix Flow

1. Branch from latest stable commit or `main`.
2. Implement minimal fix.
3. Open PR with `bug` label.
4. Merge after required checks pass.
5. Tag new patch release (for example `v0.1.2`).

## Communication Template

### Release Announcement

- Version: `vX.Y.Z`
- Scope: short summary
- Risk level: low/medium/high
- Rollback plan: stable tag reference

### Incident Update

- Status: investigating/mitigated/resolved
- Impact: affected pages/users
- ETA: expected recovery time
- Next update: timestamp

## Related Docs

- [Branch Protection Guide](../governance/branch-protection.md)
- [Rulesets Setup Guide](../governance/rulesets-setup.md)
- [Repository Settings Baseline](../governance/repository-settings-baseline.md)
