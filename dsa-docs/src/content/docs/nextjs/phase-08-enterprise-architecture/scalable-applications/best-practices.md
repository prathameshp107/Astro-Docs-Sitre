---
title: "Best Practices"
description: "This topic summarizes the key practices for building scalable Next.js applications."
---

# Best Practices

## Introduction

This topic summarizes the key practices for building scalable Next.js applications.

## Scalability Checklist

### Organization
- [ ] Code is grouped by feature, not by file type
- [ ] Each module has a clear public API (barrel file)
- [ ] Features don't import directly from other features
- [ ] Shared code is extracted to `components/` or `lib/`

### Performance
- [ ] Route splitting is automatic (no configuration needed)
- [ ] Heavy components use dynamic imports
- [ ] Bundle size is monitored regularly
- [ ] Performance budgets are set

### Team
- [ ] Naming conventions are documented and followed
- [ ] Code review process is established
- [ ] Documentation is kept up to date
- [ ] CI runs tests and linting

### Maintenance
- [ ] Unused code is regularly cleaned up
- [ ] Dependencies are updated regularly
- [ ] Architecture decisions are documented
- [ ] Refactoring is scheduled, not reactive

## When to Apply These Patterns

| Team Size | Focus |
|-----------|-------|
| 1 developer | Keep it simple. Extract patterns when you see duplication. |
| 2-3 developers | Adopt feature-based architecture. Enforce naming conventions. |
| 4+ developers | Use monorepo for shared packages. Enforce module boundaries. |

## Common Mistakes

- **Over-engineering early** — Don't build a monorepo with 20 packages for a single-developer project. Scale your architecture as your team scales.
- **No enforcement** — Without linting rules and code review, conventions drift and become meaningless.
- **Ignoring build time** — As the project grows, build time grows too. Invest in build optimization early.

## Summary

Scalable architecture is about managing complexity. Organize by feature, extract shared code, and enforce module boundaries. Apply patterns proportionally to your team size. Monitor build times and bundle sizes as you scale.

## Related Topics

- [Project Scaling](./project-scaling.md)
- [Module Organization](./module-organization.md)
- [Code Splitting](./code-splitting.md)
