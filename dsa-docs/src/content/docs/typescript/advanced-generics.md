---
title: "Advanced Generics in TypeScript"
description: "Deep dive into advanced generics: generic constraints with keyof, conditional types in generics, infer keyword, variadic tuples, and factory patterns."
---

## Advanced Generics in TypeScript

### Generic Constraints with keyof

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@test.com" };
const name = getProperty(user, "name");   // type: string
const age = getProperty(user, "age");     // type: number
```

### Conditional Generic Return Types

```typescript
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"
```

### The infer Keyword

```typescript
type Unpack<T> = T extends Array<infer U> ? U : T;

type StringArr = string[];
type ElementType = Unpack<StringArr>;  // string
```

### Real Project Example

```typescript
// Type-safe event emitter
type EventMap = {
  userCreated: { id: string; name: string };
  userDeleted: { id: string };
  error: { message: string; code: number };
};

class TypedEventEmitter<T extends Record<string, unknown>> {
  emit<K extends keyof T>(event: K, data: T[K]): void {
    console.log(`Event: ${String(event)}`, data);
  }
  
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    // Register handler
  }
}

const emitter = new TypedEventEmitter<EventMap>();
emitter.emit("userCreated", { id: "1", name: "Alice" });
```

### Interview Questions

**Easy:** What is `keyof` used for with generics?

**Medium:** How does the `infer` keyword work?

**Hard:** Design a type-safe event emitter using generics.
