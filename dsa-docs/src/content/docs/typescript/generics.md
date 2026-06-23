---
title: "Generics in TypeScript"
description: "Complete guide to TypeScript generics: generic functions, constraints, generic interfaces, generic classes, and real-world patterns with reusable type-safe code."
---

## Generics in TypeScript

### What are Generics?

**Generics** allow you to create reusable components that work with any type while maintaining type safety. Instead of working with `any`, generics capture the type as a parameter.

> **Analogy:** A generic function is like a vending machine that works with any product — the mechanics are the same, but the product type varies.

### One Function, Many Types

```mermaid
flowchart LR
    GF[Generic Function<br/>function identity T (arg: T): T] --> C1["identity string ('hello')<br/>T = string → returns string"]
    GF --> C2["identity number (42)<br/>T = number → returns number"]
    GF --> C3["identity boolean (true)<br/>T = boolean → returns boolean"]
    
    style GF fill:#7c3aed,color:#fff
    style C1 fill:#f59e0b,color:#fff
    style C2 fill:#f59e0b,color:#fff
    style C3 fill:#f59e0b,color:#fff
```

> Think of `T` as a placeholder: you call `identity("hello")`, and TypeScript fills in `T = string` automatically. One function body works for any type, and you never lose type information.

### Basic Generic Function

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Type is inferred
const result1 = identity("hello");  // type: string
const result2 = identity(42);       // type: number

// Type can be explicit
const result3 = identity<string>("hello");
```

### Generic Constraints

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");        // OK — string has length
logLength([1, 2, 3]);      // OK — array has length
// logLength(42);          // ❌ Error: number has no length
```

### Generic Interfaces

```typescript
interface Repository<T> {
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// Usage with specific type
interface User {
  id: string;
  name: string;
  email: string;
}

class UserRepository implements Repository<User> {
  async getById(id: string): Promise<User | null> {
    // Implementation
    return null;
  }
  // ... other methods
}
```

### Real Project Example

```typescript
// Generic API client
class ApiClient<T> {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async get(id: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }
  
  async getAll(): Promise<T[]> {
    const response = await fetch(this.baseUrl);
    return response.json();
  }
}

const userClient = new ApiClient<User>("/api/users");
const user = await userClient.get("1");  // type: User
```

### Interview Questions

**Easy:** What is a generic in TypeScript?

**Medium:** How do generic constraints work with `extends`?

**Hard:** How would you create a generic repository pattern?
