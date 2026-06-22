---
title: "The satisfies Operator in TypeScript"
description: "Deep dive into TypeScript's satisfies operator: type validation while preserving literal types, patterns, and use cases."
---

## The satisfies Operator

### What is satisfies?

Introduced in TypeScript 4.9, `satisfies` lets you **validate** that an expression matches a type **without changing** its inferred type.

### Basic Usage

```typescript
// Without satisfies — type widens
const palette = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
};
// palette.red is number[] — lost tuple type

// With satisfies — validates + preserves literal type
const palette = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
} satisfies Record<string, [number, number, number]>;
// palette.red is [number, number, number] — preserved!
```

### Real Project Example

```typescript
// Color palette with validation
const colors = {
  primary: "#6366f1",
  secondary: "#a78bfa",
  success: "#22c55e",
  danger: "#ef4444",
} satisfies Record<string, `#${string}`>;

// All values validated as hex colors
// But each key still has its literal type
```

### Interview Questions

**Easy:** What does the `satisfies` operator do?

**Medium:** How is `satisfies` different from a type annotation?

**Hard:** When would you choose `satisfies` over a type assertion?
