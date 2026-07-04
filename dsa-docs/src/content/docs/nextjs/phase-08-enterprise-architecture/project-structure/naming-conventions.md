---
title: "Naming Conventions"
description: "Consistent naming makes code easier to read and find. When every file follows the same pattern, developers can predict where to find things."
---

# Naming Conventions

## Introduction

Consistent naming makes code easier to read and find. When every file follows the same pattern, developers can predict where to find things.

## File Naming

| Convention | Example | When to Use |
|-----------|---------|-------------|
| `kebab-case` | `post-list.tsx` | File names (all files) |
| `PascalCase` | `PostList.tsx` | Component files |
| `camelCase` | `usePosts.ts` | Hook files, utilities |
| `dot notation` | `posts.route.ts` | Next.js special files |

## Recommended Patterns

```
components/
├── ui/
│   ├── button.tsx          # kebab-case
│   ├── post-list.tsx       # kebab-case
│   ├── CreatePostForm.tsx  # PascalCase (component)
│   └── index.ts            # Barrel export
hooks/
├── use-posts.ts            # kebab-case
├── use-user.ts
lib/
├── api-client.ts           # kebab-case
├── utils.ts
```

## Component Naming

```tsx
// ✅ Descriptive component names
export function PostList() { }
export function UserAvatar() { }
export function CreatePostForm() { }

// ❌ Generic names
export function List() { }
export function Avatar() { }
export function Form() { }
```

## Variable & Function Naming

```ts
// ✅ Descriptive
const isLoading = true
const sortedPosts = posts.sort()
async function fetchUser(id: string) { }

// ❌ Unclear
const flag = true
const data = posts.sort()
async function get(id: string) { }
```

## Folder Naming

```
features/
├── auth/            # kebab-case
├── user-profile/    # kebab-case — use full words
├── billing/         # kebab-case
└── src/             # ❌ avoid abbreviations like 'src' in feature folders
```

## Common Mistakes

- **Mixed casing** — Pick one convention and use it everywhere. Mixing `snake_case` and `camelCase` is confusing.
- **Abbreviations** — `usr`, `btn`, `cfg` are unclear. Use full words: `user`, `button`, `config`.
- **Generic names** — `index.tsx` everywhere loses meaning. Use descriptive component names.

## Best Practices

- Use `kebab-case` for all files (except components which are `PascalCase`)
- Use descriptive, full-word names
- Be consistent across the entire project — use linting to enforce
- Group related files with consistent prefixes (`use-` for hooks)

## Summary

Consistent naming conventions make codebases predictable and easy to navigate. Use kebab-case for files, PascalCase for components, and descriptive names everywhere. Enforce conventions with linting.

## Related Topics

- [Folder Structure](./folder-structure.md)
- [Clean Code](../maintainability/clean-code.md)
- [Feature-Based Architecture](./feature-based-architecture.md)
