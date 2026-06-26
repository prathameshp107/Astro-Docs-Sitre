---
title: "Interface vs Type Alias in TypeScript"
description: "Detailed comparison of interface and type alias in TypeScript: differences, use cases, decision guide, and when to use each."
---

## Interface vs Type Alias

### Key Differences

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Extension | `extends` keyword | Intersection `&` |
| Declaration merging | ✅ Yes | ❌ No |
| Union types | ❌ No | ✅ Yes |
| Primitive aliases | ❌ No | ✅ Yes |
| Tuple types | ❌ No | ✅ Yes |
| Mapped/conditional | ❌ No | ✅ Yes |
| Performance | Better for objects | Similar |

### Decision Guide

```typescript
// Use INTERFACE when:
// 1. Defining public API shapes
interface User { name: string; email: string; }

// 2. Needing declaration merging
interface Request { user?: User }

// 3. Extending other interfaces
interface Admin extends User { role: "admin" }

// Use TYPE when:
// 1. Creating union types
type Status = "active" | "inactive";

// 2. Creating intersection types
type Admin = User & { permissions: string[] };

// 3. Creating mapped/conditional types
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// 4. Creating function types
type Callback = (err: Error | null) => void;

// 5. Creating tuple types
type Pair = [string, number];
```

### Interview Questions

**Easy:** Can you use `type` for object shapes?

**Medium:** What can `type` do that `interface` cannot?

**Hard:** When should you always prefer `interface` over `type`?
