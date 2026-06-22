---
title: "Enums in TypeScript"
description: "Complete guide to TypeScript enums: numeric enums, string enums, constant enums, reverse mappings, and when to prefer union types over enums."
---

## Enums in TypeScript

### What are Enums?

**Enums** (enumerations) allow you to define a set of named constants. They make code more readable by grouping related values under a common name.

> **Analogy:** An enum is like a dropdown menu — you can only select from predefined options, which prevents typos and makes the code self-documenting.

---

### Numeric Enums (Default)

```typescript
enum Direction {
  Up = 0,     // Default: 0
  Down = 1,   // Increments by 1
  Left = 2,
  Right = 3,
}

// Access by name
let dir: Direction = Direction.Up;
console.log(dir); // Output: 0

// Access by value (reverse mapping)
console.log(Direction[0]); // Output: "Up"

// Without initializers — auto-increments from 0
enum Status {
  Pending,    // 0
  Approved,   // 1
  Rejected,   // 2
}

// Custom starting value
enum Color {
  Red = 1,
  Green,      // 2
  Blue,       // 3
}
```

---

### String Enums

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// String enums have no reverse mapping
console.log(Direction.Up); // Output: "UP"
console.log(Direction["UP"]); // ❌ Error — no reverse mapping
```

---

### Heterogeneous Enums

```typescript
// Mix of string and number (not recommended)
enum BooleanLike {
  No = 0,
  Yes = "YES",
}
```

---

### Const Enums

`const enum` is inlined at compile time — no JavaScript object is generated:

```typescript
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let dir = Direction.Up;
// Compiles to: let dir = 0;

// Without 'const':
// Compiles to: let dir = 0 /* Direction.Up */;
```

---

### Reverse Mappings

Numeric enums have reverse mappings — you can look up a name by its value:

```typescript
enum Status {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

console.log(Status);
/* Output:
{
  "0": "Pending",
  "1": "Approved",  
  "2": "Rejected",
  "Pending": 0,
  "Approved": 1,
  "Rejected": 2
}
*/
```

---

### When to Prefer Union Types

```typescript
// Instead of enum:
enum Status {
  Pending = "pending",
  Approved = "approved",  
  Rejected = "rejected",
}

// Prefer union type:
type Status = "pending" | "approved" | "rejected";

// Benefits:
// 1. Simpler — no generated code
// 2. Easier to tree-shake
// 3. More flexible — can use string literals directly
// 4. Better type inference with as const
```

---

### Real Project Example

```typescript
// User roles with permissions
enum UserRole {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.Admin]: ["create", "read", "update", "delete", "manage_users"],
  [UserRole.Editor]: ["create", "read", "update"],
  [UserRole.Viewer]: ["read"],
};

function hasPermission(userRole: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[userRole].includes(permission);
}
```

---

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using numeric enums when string enums are clearer | Use string enums for better debugging |
| Relying on reverse mappings in production | Can cause unexpected behavior; string enums don't have them |
| Using enums when a union type would suffice | Union types are simpler and tree-shakeable |

---

### Interview Questions

**Easy:** How do you define an enum in TypeScript?

**Medium:** What's the difference between a const enum and a regular enum?

**Hard:** When would you choose a union type over an enum? Why?
