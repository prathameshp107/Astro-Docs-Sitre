---
title: "Template Literal Types in TypeScript"
description: "Deep dive into TypeScript template literal types: string literal unions, pattern matching, intrinsic types, and advanced patterns."
---

## Template Literal Types in TypeScript

### Basic Syntax

```typescript
type Color = "red" | "green" | "blue";
type Size = "sm" | "md" | "lg";

// Combine literals
type ColorSize = `${Color}-${Size}`;
// "red-sm" | "red-md" | "red-lg" | "green-sm" | ...
```

### Intrinsic String Types

```typescript
type EventName = `on${Capitalize<string>}`;
// Matches onChange, onClick, onSubmit, etc.

type Greeting = Lowercase<"HELLO">; // "hello"
type Shout = Uppercase<"hello">;    // "HELLO"
type Title = Capitalize<"hello">;  // "Hello"
type Uncap = Uncapitalize<"Hello">; // "hello"
```

### Key Remapping with Template Literals

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User { name: string; age: number; }
type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }
```

### Interview Questions

**Easy:** What are template literal types?

**Medium:** How do Capitalize, Uppercase, and Lowercase work?

**Hard:** How would you create a type that converts object keys to getter names?
