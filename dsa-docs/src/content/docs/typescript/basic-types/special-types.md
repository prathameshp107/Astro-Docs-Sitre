---
title: "Special Types in TypeScript"
description: "Deep dive into TypeScript special types: any, unknown, void, never, null, undefined with type safety patterns."
---

## Special Types in TypeScript

### The any Type — Opt-Out of Checking

```typescript
let value: any = 42;
value = "Hello";
value = true;
value.doSomething(); // No error — but likely runtime crash

// When any is dangerous:
const users: any[] = [{ id: 1 }, { id: 2 }];
users[0].name.toUpperCase(); // Runtime error! name is undefined
```

### The unknown Type — Type-Safe Any

```typescript
let value: unknown = 42;
value = "Hello";

// Cannot use without narrowing:
// value.toUpperCase(); // ❌ Error

if (typeof value === "string") {
  value.toUpperCase(); // OK — narrowed
}

// Parse JSON safely
function safeParse(json: string): unknown {
  return JSON.parse(json);
}

const data = safeParse('{"name":"Alice"}');
if (data && typeof data === "object" && "name" in data) {
  console.log((data as { name: string }).name);
}
```

### The void Type — No Return Value

```typescript
function log(message: string): void {
  console.log(message);
}

const result = log("test"); // result is void

// void vs undefined:
function returnsUndefined(): undefined { return undefined; }
function returnsVoid(): void { }
// void allows both undefined and null returns
```

### The never Type — Impossible Values

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// Exhaustive checking
type Shape = Circle | Square;
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side * shape.side;
    default: return assertNever(shape);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}
```

### null and undefined

```typescript
let nothing: null = null;
let notDefined: undefined = undefined;

// Strict null checks (recommended)
// tsconfig: "strictNullChecks": true

function greet(name: string | null): string {
  if (name === null) return "Hello, Guest";
  return `Hello, ${name}`;
}

// Optional chaining with null
const user = { profile: { name: "Alice" } };
const name = user?.profile?.name; // string | undefined
```

### Interview Questions

**Easy:** What's the difference between `any` and `unknown`?

**Medium:** When does `never` occur in TypeScript?

**Hard:** How does `void` differ from `undefined`?
