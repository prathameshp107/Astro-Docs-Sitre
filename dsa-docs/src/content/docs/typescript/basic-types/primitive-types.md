---
title: "Primitive Types in TypeScript"
description: "Deep dive into TypeScript primitive types: string, number, boolean with literal types, template literals, and advanced patterns."
---

## Primitive Types in TypeScript

### The string Type

```typescript
let name: string = "Alice";
let greeting: string = `Hello, ${name}!`;
let multiLine: string = `
  Line 1
  Line 2
`;

// Template literal types
type EventName = `on${Capitalize<string>}`;
// "onChange" | "onClick" | "onSubmit" | ...

type Color = "red" | "green" | "blue";
type ColorHex = `#${string}`;
```

### The number Type

```typescript
let decimal: number = 42;
let hex: number = 0xFF;      // 255
let binary: number = 0b1010; // 10
let octal: number = 0o744;   // 484
let float: number = 3.14;
let negative: number = -273;

// BigInt for large integers
let big: bigint = 9007199254740991n;
let anotherBig = BigInt("9999999999999999");
```

### The boolean Type

```typescript
let isActive: boolean = true;
let isComplete: boolean = false;

// Boolean type guards
function processFlag(flag: boolean): string {
  if (flag) return "enabled";
  return "disabled";
}
```

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using `String` instead of `string` | Use lowercase primitive types |
| Forgetting BigInt suffix `n` | Add `n` suffix for BigInt literals |
| Implicit `any` from missing annotation | Enable `strict: true` in tsconfig |

### Interview Questions

**Easy:** What are the primitive types in TypeScript?

**Medium:** How do template literal types work with string literals?

**Hard:** When would you use `bigint` over `number`?
