# Folder Structure

## Introduction

A well-organized folder structure makes your codebase predictable. New team members should be able to find any file by guessing where it lives.

## Recommended Structure

```
src/
├── app/                    # App Router pages and layouts
│   ├── (marketing)/        # Route groups for organization
│   │   ├── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   └── api/
│       └── posts/
│           └── route.ts
├── components/             # Shared components
│   ├── ui/                 # Design system primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   └── layout/             # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── features/               # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── actions.ts
│   ├── posts/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── actions.ts
│   └── billing/
│       ├── components/
│       ├── hooks/
│       └── actions.ts
├── hooks/                  # Shared custom hooks
│   ├── use-user.ts
│   ├── use-fetch.ts
│   └── use-local-storage.ts
├── lib/                    # Utilities and services
│   ├── db.ts
│   ├── auth.ts
│   ├── api-client.ts
│   └── utils.ts
├── types/                  # TypeScript type definitions
│   ├── index.ts
│   ├── post.ts
│   └── user.ts
└── config/                 # Application configuration
    ├── site.ts
    ├── navigation.ts
    └── constants.ts
```

## Structure Explanation

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js App Router pages, layouts, and API routes |
| `components/` | Shared UI and layout components used across features |
| `features/` | Feature-specific components, hooks, and actions |
| `hooks/` | Shared custom React hooks |
| `lib/` | Utilities, database clients, auth config |
| `types/` | Shared TypeScript types and interfaces |
| `config/` | Site configuration, navigation menus, constants |

## Choosing Between `app` and `features`

- Put **page-specific** content in `app/`
- Put **feature-specific** components in `features/`
- Put **shared** components in `components/`

```tsx
// app/dashboard/page.tsx — imports from features
import { DashboardStats } from '@/features/dashboard/components'
import { RecentPosts } from '@/features/posts/components'
```

## Common Mistakes

- **Putting everything in `app/`** — Keep `app/` focused on routing. Place component logic in `features/` or `components/`.
- **Deep nesting** — Nesting folders more than 3-4 levels deep makes files hard to find.
- **Mixed concerns in one folder** — Don't mix components, hooks, and utilities in the same folder without clear sub-folders.

## Best Practices

- Keep `app/` focused on routing — page components should be thin
- Group by feature, not by file type (not `components/`, `hooks/` — instead use `features/posts/`)
- Use consistent naming conventions across the project
- Keep the structure flat where possible — deep nesting is harder to navigate

## Summary

A good folder structure separates routing (app), features, shared components, and utilities. Group by feature for larger applications. Keep `app/` focused on routing, and place business logic in feature folders.

## Related Topics

- [Feature-Based Architecture](./feature-based-architecture.md)
- [Naming Conventions](./naming-conventions.md)
- [Shared Components](./shared-components.md)
