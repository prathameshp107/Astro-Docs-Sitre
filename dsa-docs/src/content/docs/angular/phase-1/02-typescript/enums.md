---
title: "Enums in TypeScript"
description: "Enums let you define a set of named constants for cleaner, more readable code."
sidebar:
  order: 12
---

## Introduction
Enums (enumerations) allow you to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

## Why do we need it?
Enums help make your code more readable and less error-prone by allowing you to work with named constants instead of hard-coded numbers or strings.

## Real-world analogy
Think of an enum like a menu atraffic light: instead of remembering that "0" means stop, "1" means slow down, and "2" means go, you can use the names Red, Yellow, and Green.

## Visual Explanation
![enum diagram](https://via.placeholder.com/400x200?text=Enum+Example)

## Mermaid Diagram
```mermaid
graph TD
    A[Enum: Color] --> B[Red: 0]
    A --> C[Green: 1]
    A --> D[Blue: 2]
    E[Enum: Direction] --> F[Up: "UP"]
    E --> G[Down: "DOWN"]
    E --> H[Left: "LEFT"]
    E --> I[Right: "RIGHT"]
```

## Deep Explanation
TypeScript enums are a way to give more friendly names to sets of numeric values.

### Numeric Enums
By default, enums start numbering their members at 0.

```typescript
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}
```

You can also set the first value explicitly:

```typescript
enum Direction {
  Up = 1,    // 1
  Down,      // 2
  Left,      // 3
  Right      // 4
}
```

### String Enums
In a string enum, each member has to be constant-initialized with a string literal, or with another string enum member.

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

### Heterogeneous Enums
Enums can mix string and numeric members, but it's not recommended unless you really need to take advantage of the JavaScript runtime behavior.

```typescript
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```

### Computed and Constant Members
Each enum member can be either constant or computed:
- Constant members are those that don't need runtime code to initialize (e.g., enum members with literal values)
- Computed members require runtime initialization

```typescript
enum FileAccess {
  // constant members
  None = 0,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = 1 << 3,
  // computed member
  G = "123".length
}
```

### Reverse Mappings
Numeric enum members also get a reverse mapping from enum values to enum names.

```typescript
enum Enum {
  A
}
let a = Enum.A;
let nameOfA = Enum[A]; // "A"
```

## Code Example
```typescript
// Numeric enum
enum Priority {
  Low,
  Medium,
  High
}

// String enum
enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR"
}

// Using enums
function logMessage(level: LogLevel, message: string) {
  console.log(`[${level}] ${message}`);
}

logMessage(LogLevel.Info, "Application started");

// Enum in interfaces
interface Task {
  id: number;
  name: string;
  priority: Priority;
}

// Iterating over enum values
const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
```

## Best Practices
- Prefer string enums over numeric enums when the enum value is used in error messages, logs, or serializers
- Keep enums in a dedicated file or namespace if they're used across multiple modules
- Use const enums if you don't need the reverse mapping and want to save space (they are inlined)
- Avoid heterogeneous enums (mixing string and numeric members) unless necessary
- Always initialize enum members if you're not relying on the default numbering

## Common Mistakes
- Forgetting that numeric enums have reverse mappings, which can increase bundle size
- Assuming string enums have automatic reverse mapping (they don't)
- Using enums for complex objects (consider using interfaces or types instead)
- Not realizing that const enums are completely removed at compile time

## Interview Questions
1. What is the difference between a const enum and a regular enum?
2. How do numeric enums differ from string enums in terms of reverse mapping?
3. When would you use an enum instead of a union of string literals?

## Summary
Enums in TypeScript provide a way to define a set of named constants, making code more readable and maintainable. They come in numeric and string flavors, each with their own use cases and considerations.