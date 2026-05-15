# On-Call Playbook

This playbook defines incident response expectations for `hhool/site-ai-event`.

## Purpose

- Reduce response time for production issues
- Standardize escalation and communication
- Ensure every incident has clear ownership and closure

## Severity Levels

### SEV-1 (Critical)

- Complete outage or core flow unavailable
- Example: homepage and detail pages both unreachable
- First response: within 10 minutes
- Update frequency: every 15 minutes

### SEV-2 (High)

- Major feature degradation with user impact
- Example: only one locale path unavailable, release workflow broken
- First response: within 30 minutes
- Update frequency: every 30 minutes

### SEV-3 (Medium)

- Limited impact or workaround available
- Example: formatting/automation checks flaky, non-critical API timeout
- First response: within 4 hours
- Update frequency: every 2 hours

### SEV-4 (Low)

- Cosmetic issues or minor process problems
- Example: typo in docs, non-blocking automation warning
- First response: next business day
- Update frequency: daily

## Incident Workflow

1. Detect and acknowledge incident
2. Assign incident commander
3. Classify severity (SEV-1..SEV-4)
4. Mitigate impact (rollback, feature toggle, temporary fix)
5. Communicate updates on schedule
6. Verify recovery
7. Publish postmortem

## Escalation Matrix

- Primary: on-call engineer
- Secondary: release owner
- Tertiary: repository admin / maintainer

Escalate immediately when:

- No mitigation path in first 30 minutes (SEV-1/2)
- Impact broadens across core routes
- Security risk suspected

## First 15 Minutes Checklist

- [ ] Confirm issue is reproducible
- [ ] Capture failing URL, logs, and timestamp
- [ ] Verify latest deployment/tag
- [ ] Decide rollback vs hotfix path
- [ ] Post first status update

## Communication Templates

### Initial Alert

- Incident: short title
- Severity: SEV-X
- Impact: affected pages/users
- Owner: name
- Next update: timestamp

### Mitigation Update

- Current status: investigating/mitigating/monitoring
- Action taken: rollback/hotfix/check rerun
- Result: improved/unchanged
- Next update: timestamp

### Resolution Update

- Status: resolved
- Root cause summary
- Duration
- Follow-up actions and owners

## Postmortem Checklist

- [ ] Root cause identified
- [ ] Timeline documented
- [ ] Detection and response gaps listed
- [ ] Preventive tasks created in backlog
- [ ] Owners and due dates assigned

## Related Docs

- [Release Runbook](../release/release-runbook.md)
- [Repository Settings Baseline](../governance/repository-settings-baseline.md)
- [Branch Protection Guide](../governance/branch-protection.md)
