---
title: "Project Scaling"
description: "As your Next.js application grows from a few pages to dozens of features and multiple team members, you need patterns that scale."
---

# Project Scaling

## Introduction

As your Next.js application grows from a few pages to dozens of features and multiple team members, you need patterns that scale.

## Signs You Need to Scale

- Finding files takes more than a few seconds
- Multiple people edit the same files frequently
- Tests take more than a few minutes to run
- Build times creep past 5 minutes
- Components have 300+ lines

## Scaling Strategies

### 1. Split into Features

When a single `components/` folder has 50+ files, grouping by feature makes things manageable:

```
# Before: Flat by type
components/
├── Button.tsx
├── PostList.tsx
├── PostCard.tsx
├── CommentList.tsx
├── CommentForm.tsx
├── UserAvatar.tsx
├── UserMenu.tsx
# ... 40 more files

# After: Grouped by feature
features/
├── posts/
│   ├── components/PostList.tsx
│   └── components/PostCard.tsx
├── comments/
│   ├── components/CommentList.tsx
│   └── components/CommentForm.tsx
└── users/
    ├── components/UserAvatar.tsx
    └── components/UserMenu.tsx
```

### 2. Extract Shared Code

When 3+ features use the same logic, extract it:

```ts
// Before: Duplicated in features/auth and features/users
function formatDate(date: Date) { ... }

// After: Extracted to shared utility
// lib/utils/format.ts
export function formatDate(date: Date) { ... }
```

### 3. Enforce Module Boundaries

Features should not import directly from other features:

```ts
// ❌ Bad — feature imports from another feature
import { PostCard } from '@/features/posts/components'

// ✅ Good — shared components live in components/
import { PostCard } from '@/components/shared/PostCard'
```

## Scaling by Team

For larger teams, consider splitting into separate packages (monorepo):

```
apps/
├── web/          # Main Next.js app
├── admin/        # Admin dashboard (separate app)
└── docs/         # Documentation site
packages/
├── ui/           # Shared component library
├── shared/       # Shared types and utilities
└── database/     # Database client and schema
```

## Common Mistakes

- **Architecting for scale too early** — Premature abstraction adds complexity. Wait until you see the problem.
- **No boundaries between features** — When features freely import from each other, you can't change one without risking breaking another.
- **One giant `utils.ts`** — A 500-line utility file is as bad as scattered code. Split into focused modules.

## Best Practices

- Start simple and extract patterns when you see duplication
- Enforce module boundaries — features shouldn't import from other features
- Use monorepo tools (Turborepo, Nx) only when you need them
- Regularly refactor to keep the codebase healthy

## Summary

Scaling is about managing complexity. Group code by feature, extract shared utilities, and enforce module boundaries. Start simple and refactor when patterns emerge. Don't over-engineer for scale you don't have yet.

## Related Topics

- [Module Organization](./module-organization.md)
- [Code Splitting](./code-splitting.md)
- [Feature-Based Architecture](../project-structure/feature-based-architecture.md)
