# Maintenance Checklist

## Introduction

Regular maintenance keeps your Next.js application healthy. Use this checklist for recurring maintenance tasks.

## Daily

- [ ] Check error monitoring for new issues
- [ ] Verify the app is loading (uptime check)
- [ ] Review critical alerts

## Weekly

- [ ] Review performance metrics (Core Web Vitals)
- [ ] Check for failed user flows in analytics
- [ ] Review server logs for errors

## Monthly

- [ ] Run `npm audit` and review vulnerabilities
- [ ] Check for outdated dependencies (`npm outdated`)
- [ ] Review and rotate secrets if needed
- [ ] Check storage usage (database, file uploads)

## Quarterly

- [ ] Plan dependency upgrades (major versions)
- [ ] Review and update documentation
- [ ] Conduct security review
- [ ] Test backup and restore procedures
- [ ] Review and prune unused code

## Per Release

- [ ] Run full test suite
- [ ] Verify deployment checklist
- [ ] Monitor after deployment for issues
- [ ] Update changelog

## Common Mistakes

- **No regular maintenance schedule** — Without a schedule, maintenance gets deferred indefinitely. Set recurring reminders.
- **Letting dependencies fall too far behind** — Small regular updates are easier than one massive upgrade.
- **Ignoring small issues** — Minor warnings and small errors often grow into bigger problems.

## Summary

Use this checklist for regular maintenance: daily checks for errors and uptime, weekly performance reviews, monthly dependency audits, and quarterly planning for upgrades. Regular small maintenance prevents big problems.

## Related Topics

- [Updating Dependencies](./updating-dependencies.md)
- [Upgrading Next.js](./upgrading-nextjs.md)
- [Security Updates](./security-updates.md)
