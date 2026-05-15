# On-Call Handover Template

Use this template during shift handover.

## 1) Handover Meta

- Date:
- From (outgoing):
- To (incoming):
- Time window:

## 2) Current System Status

- Production status: Healthy / Degraded / Incident
- Active incidents:
- Monitoring alerts status:
- Recent deployments/tags:

## 3) Open Incidents and Risks

| ID      | Severity | Summary | Owner | Current Status | Next Action | ETA |
| ------- | -------- | ------- | ----- | -------------- | ----------- | --- |
| INC-001 | SEV-2    |         |       |                |             |     |

## 4) Pending Tasks

| ID      | Task | Priority | Owner | Due Date   | Blocker |
| ------- | ---- | -------- | ----- | ---------- | ------- |
| OPS-001 |      | P1       |       | YYYY-MM-DD |         |

## 5) Alerts and Dashboards to Watch

- Key dashboards:
- Alert rules currently noisy:
- Temporary suppressions or mutes:

## 6) Release and Change Notes

- Last release tag:
- Change risk notes:
- Rollback candidate:

## 7) Communication Notes

- Stakeholders already informed:
- Next update due at:
- Escalation path if condition worsens:

## 8) Incoming Owner Acknowledgement

- [ ] I reviewed all open incidents
- [ ] I understand current risks and next actions
- [ ] I have access to required dashboards/logs
- Name:
- Time:

## Related Docs

- [On-Call Playbook](oncall-playbook.md)
- [Postmortem Template](postmortem-template.md)
- [Release Runbook](../release/release-runbook.md)
