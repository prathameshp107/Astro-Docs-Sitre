---
title: "Reusable Utilities"
description: "Utility functions are small, focused helpers that perform common operations — formatting dates, parsing data, validating inputs. They're the most reusable"
---

# Reusable Utilities

## Introduction

Utility functions are small, focused helpers that perform common operations — formatting dates, parsing data, validating inputs. They're the most reusable form of code.

## Why Do We Need This?

Without central utilities, the same logic gets duplicated across components and services. A single well-tested utility function is better than five slightly different implementations scattered across the codebase.

## Common Utility Categories

### Formatting

```ts
// lib/utils/format.ts
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date, style: 'short' | 'long' = 'short'): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: style,
  }).format(date)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '...'
}
```

### Validation

```ts
// lib/utils/validation.ts
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidUrl(str: string): boolean {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}
```

### Data Helpers

```ts
// lib/utils/data.ts
export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const group = String(item[key])
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(items: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...items].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
}
```

## Organization

```
lib/utils/
├── format.ts
├── validation.ts
├── data.ts
├── api.ts
└── index.ts          # Barrel exports
```

## Common Mistakes

- **Creating utility functions too early** — Wait until you see duplication (3+ uses) before extracting.
- **No TypeScript types** — Utility functions should have well-typed inputs and outputs.
- **Side effects in utility functions** — Utility functions should be pure (same input → same output).
- **Too many tiny files** — One utility per file is ideal; one function per file is excessive.

## Best Practices

- Keep utility functions pure (no side effects)
- Type them with TypeScript generics for maximum reusability
- Test utility functions (they're the easiest to test)
- Name them descriptively — `formatCurrency` not `fmtCur`
- Export them through barrel files

## Summary

Utility functions are the foundation of reusable code. Keep them pure, well-typed, and tested. Extract them when you see duplication. Organize by category (formatting, validation, data).

## Related Topics

- [Separating Concerns](./separating-concerns.md)
- [Constants and Config](./constants-and-config.md)
- [API Layer](./api-layer.md)
