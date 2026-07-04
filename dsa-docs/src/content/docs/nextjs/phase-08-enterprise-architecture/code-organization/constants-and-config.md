---
title: "Constants and Config"
description: "Centralizing constants and configuration makes your application easier to maintain. When a value changes — an API endpoint, a pagination limit, a feature f"
---

# Constants and Config

## Introduction

Centralizing constants and configuration makes your application easier to maintain. When a value changes — an API endpoint, a pagination limit, a feature flag — you change it in one place.

## Why Do We Need This?

Hardcoding values everywhere creates maintenance problems. When the API URL changes, you need to find and update every reference. Centralized config ensures consistency and makes changes safe.

## Application Constants

```ts
// config/constants.ts
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
}

export const UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
}

export const AUTH = {
  SESSION_MAX_AGE: 30 * 24 * 60 * 60, // 30 days
  PASSWORD_MIN_LENGTH: 8,
  RATE_LIMIT_ATTEMPTS: 5,
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
}
```

## Site Configuration

```ts
// config/site.ts
export const siteConfig = {
  name: 'My App',
  description: 'A Next.js application.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/myapp',
    github: 'https://github.com/myapp',
  },
}
```

## Navigation Configuration

```ts
// config/navigation.ts
export interface NavItem {
  title: string
  href: string
  icon?: string
  items?: NavItem[]
}

export const mainNav: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
  { title: 'About', href: '/about' },
]

export const sidebarNav: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    items: [
      { title: 'Overview', href: '/dashboard' },
      { title: 'Posts', href: '/dashboard/posts' },
      { title: 'Settings', href: '/dashboard/settings' },
    ],
  },
]
```

## Feature Flags

```ts
// config/features.ts
export const features = {
  NEW_ONBOARDING: process.env.NEXT_PUBLIC_FEATURE_NEW_ONBOARDING === 'true',
  AI_SUGGESTIONS: process.env.NEXT_PUBLIC_FEATURE_AI_SUGGESTIONS === 'true',
  DARK_MODE: true, // Always enabled
}
```

## Common Mistakes

- **Hardcoding values in components** — API endpoints, pagination sizes, and limits should be config constants.
- **Mixing environment variables with constants** — Constants are compile-time, env vars are runtime. Know the difference.
- **No default values** — Always provide fallbacks for environment variables.

## Best Practices

- Centralize all constants in a `config/` folder
- Use TypeScript for autocomplete and type safety
- Group related constants into objects
- Provide default values for environment variables
- Use feature flags for gradual rollouts

## Summary

Centralize constants in a `config/` folder. Group by concern (pagination, upload, auth, navigation). Use TypeScript for discoverability and provide defaults for environment-dependent values.

## Related Topics

- [Environment Management](./environment-management.md)
- [Reusable Utilities](./reusable-utilities.md)
- [API Layer](./api-layer.md)
