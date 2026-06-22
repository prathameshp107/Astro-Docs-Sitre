---
title: "Property Modifiers in TypeScript"
description: "Deep dive into TypeScript property modifiers: optional, readonly, brand types, and advanced property patterns."
---

## Property Modifiers in TypeScript

### Optional Properties

```typescript
interface Config {
  url: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

// Usage
const config: Config = { url: "https://api.example.com" };
```

### Readonly Properties

```typescript
interface User {
  readonly id: string;
  readonly createdAt: Date;
  name: string;
}

const user: User = { id: "1", createdAt: new Date(), name: "Alice" };
// user.id = "2"; // ❌ Error
```

### Branded Types (Nominal Typing)

```typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function getUser(id: UserId): User { /* ... */ }
function getOrder(id: OrderId): Order { /* ... */ }

const userId = "abc" as UserId;
const orderId = "xyz" as OrderId;

getUser(userId);  // OK
getUser(orderId); // ❌ Error even though both are strings!
```

### Interview Questions

**Easy:** What does the `?` after a property name mean?

**Medium:** How does `readonly` differ from `const`?

**Hard:** What are branded types and when would you use them?
