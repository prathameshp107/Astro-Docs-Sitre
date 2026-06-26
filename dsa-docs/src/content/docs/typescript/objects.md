---
title: "Objects in TypeScript"
description: "Complete guide to TypeScript object types: object type syntax, property modifiers, index signatures, nested objects, and practical patterns."
---

## Objects in TypeScript

### Object Type Syntax

```typescript
// Inline object type
function printCoord(pt: { x: number; y: number }): void {
  console.log(`X: ${pt.x}, Y: ${pt.y}`);
}

printCoord({ x: 10, y: 20 });

// Type alias for object
type Point = { x: number; y: number };

// Interface for object
interface Point3D {
  x: number;
  y: number;
  z: number;
}
```

---

### Property Modifiers

```typescript
// Optional properties
interface Config {
  url: string;
  timeout?: number;       // Optional
  retries?: number;       // Optional
}

// Readonly properties
interface User {
  readonly id: string;    // Cannot be changed after creation
  name: string;
  email: string;
}

const user: User = { id: "1", name: "Alice", email: "alice@example.com" };
// user.id = "2"; // ❌ Error: Cannot assign to 'id' because it is a read-only property
```

---

### Index Signatures

```typescript
// Dynamic property names
interface StringDictionary {
  [key: string]: string;
}

const translations: StringDictionary = {
  hello: "Hola",
  goodbye: "Adiós",
};

// Mixed index signatures
interface NumberDictionary {
  [index: string]: number | string;
  length: number;
  name: string;
}
```

---

### Excess Property Checks

```typescript
interface User {
  name: string;
  age: number;
}

// TypeScript checks for extra properties
const user: User = { name: "Alice", age: 30, email: "alice@test.com" };
// ❌ Error: Object literal may only specify known properties

// Workaround: Use intermediate variable
const userData = { name: "Alice", age: 30, email: "alice@test.com" };
const user2: User = userData; // OK — only checks structural compatibility
```

---

### Nested Objects

```typescript
interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface Employee {
  id: number;
  name: string;
  address: Address;          // Nested object
  department: {
    id: number;
    name: string;
  };                         // Inline nested type
}
```

---

### Real Project Example

```typescript
// API response with nested objects
interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

// Strict config object
interface AppConfig {
  readonly appName: string;
  readonly version: string;
  api: {
    baseUrl: string;
    timeout: number;
    headers?: Record<string, string>;
  };
  features: {
    darkMode: boolean;
    analytics: boolean;
    betaFeatures?: string[];
  };
}
```

---

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Object literal excess property errors | Use intermediate variables or spread |
| Not using readonly for fixed properties | Add `readonly` modifier |
| Forgetting optional chaining for nested objects | Use `object?.property?.subProperty` |

---

### Interview Questions

**Easy:** How do you define an object type in TypeScript?

**Medium:** What is excess property checking and when does it occur?

**Hard:** How do index signatures work? When would you use them?
