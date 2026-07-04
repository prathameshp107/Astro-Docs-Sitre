---
title: "Updating Dependencies"
description: "Dependencies in your package.json need regular updates to receive bug fixes, security patches, and new features."
---

# Updating Dependencies

## Introduction

Dependencies in your `package.json` need regular updates to receive bug fixes, security patches, and new features.

## Why Do We Need This?

Outdated dependencies accumulate technical debt. Security vulnerabilities are discovered over time. Regular updates keep your application healthy and secure.

## Checking for Updates

```bash
# Check which packages have newer versions
npm outdated

# See the diff
Package        Current  Wanted  Latest  Location
next           13.5.0   14.0.0  14.2.0  my-app
react          18.2.0   18.3.0  19.0.0  my-app
typescript      5.2.0    5.4.0   5.5.0  my-app
```

## Safe Update Strategy

### 1. Patch Updates (1.0.x → 1.0.y)

Safe to apply automatically — bug fixes only:

```bash
npm update
```

### 2. Minor Updates (1.x → 1.y)

Check changelog, then update:

```bash
npm install next@14 minor
```

### 3. Major Updates (1.x → 2.x)

Requires planning and migration:

```bash
# Read the migration guide first
npm install next@latest
```

## Version Pinning

```json
{
  "dependencies": {
    "next": "^14.2.0",   // Allows minor and patch updates
    "react": "18.3.0",   // Exact version — no automatic updates
    "typescript": "~5.4.0" // Allows only patch updates
  }
}
```

| Prefix | Allows | Risk |
|--------|--------|------|
| `^14.2.0` | Minor + patch | Low |
| `~5.4.0` | Patch only | Very low |
| `18.3.0` | Exact version | None |
| `*` | Any version | High |

## Update Workflow

1. Check `npm outdated` to see what's available
2. Review changelogs for breaking changes
3. Update one package at a time for major versions
4. Run tests after each update
5. Deploy to preview environment for testing
6. Monitor for issues after production deployment

## Common Mistakes

- **Updating everything at once** — If something breaks, you won't know which update caused it.
- **Not reading changelogs** — Major version changes often have breaking changes that require code updates.
- **Staying on very old versions** — The longer you wait, the harder the upgrade. Update regularly.

## Best Practices

- Review changelogs before updating, especially for major versions
- Update one major dependency at a time
- Run your full test suite after updates
- Use automated tools (Renovate, Dependabot) for minor and patch updates
- Schedule regular maintenance time for dependency updates

## Summary

Update dependencies regularly to receive bug fixes and security patches. Review changelogs for major versions and update one at a time. Use automated tools for minor updates and run your test suite after every change.

## Related Topics

- [Upgrading Next.js](./upgrading-nextjs.md)
- [Security Updates](./security-updates.md)
- [Maintenance Checklist](./maintenance-checklist.md)
