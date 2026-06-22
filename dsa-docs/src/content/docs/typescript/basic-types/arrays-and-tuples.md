---
title: "Arrays and Tuples in TypeScript"
description: "Deep dive into TypeScript arrays and tuples: syntax variants, readonly arrays, tuple patterns, labeled tuples, rest elements, and advanced patterns."
---

## Arrays and Tuples in TypeScript

### Array Syntax

```typescript
// Two equivalent syntaxes
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Multi-dimensional
let matrix: number[][] = [[1, 2], [3, 4]];
let cube: number[][][] = [[[1]]];

// Union arrays
let mixed: (string | number)[] = ["hello", 42];
```

### Readonly Arrays

```typescript
let readOnly: readonly number[] = [1, 2, 3];
let readOnly2: ReadonlyArray<string> = ["a", "b"];

// readOnly.push(4); // ❌ Error
// readOnly[0] = 10; // ❌ Error

// Readonly prevents mutation methods
```

### Tuple Types

```typescript
// Fixed-length array with specific types
let person: [string, number] = ["Alice", 30];

// Access preserves types
person[0].toUpperCase(); // string method — OK
person[1].toFixed(2);    // number method — OK

// Optional tuple elements
let tuple: [string, number?] = ["hello"];
tuple = ["hello", 42]; // Also OK

// Labeled tuples (TS 4.0+)
type Range = [start: number, end: number];
type Name = [firstName: string, lastName: string];
```

### Rest Elements in Tuples

```typescript
// Variable length with fixed prefix
type StringsWithNumbers = [string, ...number[]];
let a: StringsWithNumbers = ["hello", 1, 2, 3];

// Rest at start
type LeadingRest = [...number[], string];
let b: LeadingRest = [1, 2, 3, "end"];

// Multiple rests (TS 4.2+)
type Mixed = [string, ...number[], boolean];
```

### Real-World Tuple Patterns

```typescript
// React useState return
type UseStateResult<T> = [T, (value: T) => void];

// API response pair
type ApiResult<T> = [T | null, Error | null];

// CSV row
type CsvRow = [name: string, age: number, email: string];
```

### Interview Questions

**Easy:** How do you declare an array of numbers in TypeScript?

**Medium:** What is the difference between `type[]` and `[type, type]`?

**Hard:** How would you type a function that returns a tuple with labeled elements?
