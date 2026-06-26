---
title: "Type Aliases in TypeScript"
description: "Complete guide to TypeScript type aliases: creating reusable types, union types, intersection types, primitive aliases, and choosing between type and interface."
---

## Type Aliases in TypeScript

### What are Type Aliases?

A **type alias** creates a new name for a type. Unlike interfaces, type aliases can represent any type — not just objects.

---

### Basic Type Alias

```typescript
// Object type
type User = {
  id: number;
  name: string;
  email: string;
};

// Primitive alias
type UserId = string;
type Age = number;

// Union type
type Status = "active" | "inactive" | "pending";

// Function type
type Callback = (error: Error | null, result?: unknown) => void;

// Tuple type
type Pair = [string, number];
```

---

### Type Alias Usage

```typescript
// Union types (not possible with interfaces)
type Result<T> = { success: true; data: T } | { success: false; error: string };

// Mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Conditional types
type IsString<T> = T extends string ? true : false;

// Template literal types
type EventName = `on${Capitalize<string>}`;
```

---

### Differences from Interfaces

| Feature | Type Alias | Interface |
|---------|-----------|-----------|
| Object shapes | ✅ | ✅ |
| Union types | ✅ | ❌ |
| Intersection types | ✅ (`&`) | ✅ (`extends`) |
| Declaration merging | ❌ | ✅ |
| Computed properties | ✅ | ❌ |
| Mapped types | ✅ | ❌ |
| Extends classes | ❌ | ✅ |

---

### Real Project Example

```typescript
// API response with discriminated union
type ApiResponse<T> = {
  success: true;
  data: T;
  pagination?: { page: number; total: number };
} | {
  success: false;
  error: { code: string; message: string };
};

// Utility types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

---

### Interview Questions

**Easy:** What is a type alias?

**Medium:** Can type aliases represent union types? How?

**Hard:** Why can't type aliases do declaration merging?
