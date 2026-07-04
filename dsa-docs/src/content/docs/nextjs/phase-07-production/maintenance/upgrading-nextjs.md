# Upgrading Next.js

## Introduction

Next.js releases major versions with new features, performance improvements, and breaking changes. Upgrading requires planning and testing.

## Why Do We Need This?

Each new version of Next.js includes performance improvements, new features, and security patches. Staying current gives you access to the latest capabilities.

## Checking Your Version

```bash
# Check installed version
npx next --version

# Check what's available
npm show next version     # Latest stable
npm show next versions    # All versions
```

## Upgrade Steps

### 1. Read the Migration Guide

```bash
# Every major release has an upgrade guide
# https://nextjs.org/docs/app/building-your-application/upgrading
```

### 2. Check for Deprecations

```bash
# Run the build to see deprecation warnings
npm run build

# Check for deprecated APIs in your code
```

### 3. Update the Package

```bash
# Install the latest version
npm install next@latest

# Update related packages (react, react-dom)
npm install react@latest react-dom@latest
```

### 4. Resolve Breaking Changes

Common breaking changes include:

- API changes (e.g., `getServerSideProps` → Server Components)
- Configuration changes (`next.config.js` options)
- Dependency updates (Node.js version requirements)
- Image component changes

### 5. Test Thoroughly

```bash
# Build and check for errors
npm run build

# Run tests
npm test

# Start production server and check manually
npm start
```

## Upgrade Checklist

- [ ] Read the official migration guide
- [ ] Check Node.js version requirements
- [ ] Update `next` and related packages
- [ ] Resolve any TypeScript errors
- [ ] Run the full test suite
- [ ] Test in a preview deployment
- [ ] Monitor after production deployment

## Common Mistakes

- **Skipping versions** — Upgrade one major version at a time. Skipping versions (e.g., 12 → 14) makes migration much harder.
- **Not checking the changelog** — Each major version has specific breaking changes. Read the migration guide.
- **Upgrading before testing** — Always test the upgrade in a development or preview environment first.

## Best Practices

- Upgrade one major version at a time (e.g., 13 → 14, not 12 → 14)
- Read the official migration guide for each version
- Run the full test suite after upgrading
- Test in a preview deployment before production
- Update `react` and `react-dom` at the same time

## Summary

Upgrading Next.js requires planning. Read the migration guide, upgrade one major version at a time, and test thoroughly. Use preview deployments to verify before deploying to production.

## Related Topics

- [Updating Dependencies](./updating-dependencies.md)
- [Security Updates](./security-updates.md)
- [Maintenance Checklist](./maintenance-checklist.md)
