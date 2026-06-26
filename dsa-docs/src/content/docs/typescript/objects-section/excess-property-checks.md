---
title: "Excess Property Checks in TypeScript"
description: "Deep dive into TypeScript excess property checking: strict object literal checking, workarounds, and best practices."
---

## Excess Property Checks in TypeScript

### When Excess Checking Applies

```typescript
interface User {
  name: string;
  age: number;
}

// Direct object literal — checked strictly
const user: User = { name: "Alice", age: 30, email: "alice@test.com" };
// ❌ Error: 'email' does not exist in type 'User'

// Variable assignment — structural checks only
const userData = { name: "Alice", age: 30, email: "alice@test.com" };
const user2: User = userData; // OK — structural compatibility
```

### Common Workarounds

```typescript
// 1. Intermediate variable
const data = { name: "Alice", age: 30, extra: true };
const user: User = data;

// 2. Spread operator
const user: User = { name: "Alice", age: 30, ...{ extra: true } };

// 3. Type assertion (careful!)
const user = { name: "Alice", age: 30, extra: true } as User;

// 4. Index signature for flexibility
interface FlexibleUser {
  name: string;
  age: number;
  [key: string]: unknown;
}
```

### Interview Questions

**Easy:** What is excess property checking?

**Medium:** When does TypeScript perform excess property checking?

**Hard:** How can you allow extra properties on an object type?
