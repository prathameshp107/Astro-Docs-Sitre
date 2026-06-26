---
title: "Assertion Functions in TypeScript"
description: "Deep dive into TypeScript assertion functions: asserts keyword, custom assertion patterns, and real-world validation."
---

## Assertion Functions in TypeScript

### What are Assertion Functions?

Assertion functions narrow types by throwing if a condition isn't met. They tell TypeScript: "if this function returns, the condition is true."

### Basic Assertion

```typescript
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function greet(name: unknown) {
  assert(typeof name === "string", "Name must be a string");
  name.toUpperCase(); // name is now string
}
```

### Type Assertion Functions

```typescript
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new Error("Not a string");
}

function processValue(value: unknown) {
  assertIsString(value);
  value.toUpperCase(); // value is string
}
```

### Real Project Example

```typescript
class UserValidator {
  static assertValidUser(data: unknown): asserts data is User {
    if (!data || typeof data !== "object") throw new Error("Invalid user");
    if (!("name" in data) || typeof (data as any).name !== "string") throw new Error("Name required");
    if (!("email" in data) || typeof (data as any).email !== "string") throw new Error("Email required");
  }
}

function handleRequest(body: unknown) {
  UserValidator.assertValidUser(body);
  body.name.toUpperCase(); // body is now User
}
```

### Interview Questions

**Easy:** What does `asserts` do in TypeScript?

**Medium:** How is `asserts value is Type` different from `value is Type`?

**Hard:** When would you use assertion functions over type guards?
