# Post-Release 24h Observation Checklist

Use this checklist during the first 24 hours after each production release.

## Release Context

- Version/tag:
- Release time (UTC):
- Release owner:
- Risk level: Low / Medium / High

## 0-1 Hour Checks

- [ ] Homepage loads (`/en`, `/zh`)
- [ ] At least one detail page loads
- [ ] Root redirect (`/` -> `/en`) works
- [ ] Key outbound links open (demo/github/official site)
- [ ] Smoke test on production is green (`pnpm test:e2e:prod`)

## 1-6 Hour Checks

- [ ] Error rate stable vs baseline
- [ ] No SEV-1/SEV-2 incidents triggered
- [ ] CI/release workflows completed successfully
- [ ] No sudden increase in failed checks
- [ ] No urgent user-facing complaints reported

## 6-24 Hour Checks

- [ ] Availability meets target
- [ ] No unresolved high-priority regressions
- [ ] Alerts are normal or acknowledged
- [ ] Action items recorded for minor issues
- [ ] Weekly report updated with release outcomes

## Rollback Decision Gates

Trigger rollback or hotfix if any condition is true:

- [ ] Reproducible critical path failure
- [ ] Sustained elevated error rate
- [ ] Broken release automation affecting production delivery
- [ ] Security risk discovered post-release

## Communication Log

- Initial release notice time:
- 1h status update time:
- 6h status update time:
- 24h closeout update time:

## Closeout

- [ ] 24h observation complete
- [ ] Release marked stable
- [ ] Follow-up tasks assigned
- [ ] Incident/postmortem required? Yes / No

## Related Docs

- [Release Runbook](../release/release-runbook.md)
- [On-Call Playbook](oncall-playbook.md)
- [Postmortem Template](postmortem-template.md)
- [Weekly Operations Report Template](weekly-ops-report-template.md)
