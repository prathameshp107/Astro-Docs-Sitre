---
title: "Tuples in TypeScript"
description: "Complete guide to TypeScript tuples: fixed-length arrays with specific types, optional elements, labeled tuples, rest elements, readonly tuples, and real-world patterns."
---

## Tuples in TypeScript

### What are Tuples?

A **tuple** is an array with a fixed number of elements, where each element has a specific type. Unlike regular arrays, the position of each element matters.

> **Analogy:** A tuple is like a form with specific fields in a specific order — field 1 is always "name," field 2 is always "age," etc.

---

### Basic Tuple Syntax

```typescript
// A tuple with a string followed by a number
let person: [string, number] = ["Alice", 30];

// Access by index — types are preserved
console.log(person[0].toUpperCase()); // "ALICE" — string methods OK
console.log(person[1].toFixed(2));    // "30.00" — number methods OK

// Wrong order
person = [30, "Alice"]; // ❌ Error: number is not assignable to string

// Wrong length  
person = ["Alice"];     // ❌ Error: Source has 1 element(s) but target requires 2
person = ["Alice", 30, "extra"]; // ❌ Error: Source has 3 element(s) but target requires 2
```

---

### Optional Tuple Elements

```typescript
// Optional elements come after required ones
type Coordinate = [number, number, number?];

let pos2d: Coordinate = [10, 20];       // OK — 3rd is optional
let pos3d: Coordinate = [10, 20, 30];   // OK
// let invalid: Coordinate = [10];       // ❌ Error: too few elements
```

---

### Labeled Tuples

```typescript
// Labels make tuples self-documenting
type Range = [start: number, end: number];
type HttpResponse = [status: number, data: unknown, headers?: Record<string, string>];

function getRange(): Range {
  return [0, 100];
}

const [start, end] = getRange();
console.log(start); // 0
console.log(end);   // 100
```

---

### Rest Elements in Tuples

```typescript
// Rest elements allow variable-length tuples
type StringNumberBooleans = [string, number, ...boolean[]];

let a: StringNumberBooleans = ["hello", 1];               // OK
let b: StringNumberBooleans = ["hello", 1, true];         // OK
let c: StringNumberBooleans = ["hello", 1, true, false];  // OK

// Minimum 1 string, then any number of numbers
type AtLeastOneString = [string, ...number[]];
let d: AtLeastOneString = ["first"];          // OK
let e: AtLeastOneString = ["first", 1, 2, 3]; // OK
```

---

### Readonly Tuples

```typescript
// Prevent mutation
type Point = readonly [number, number];

const origin: Point = [0, 0];
// origin[0] = 5;  // ❌ Error: Cannot assign to '0' because it is a read-only property

// as const creates readonly tuples automatically
const config = ["localhost", 3000] as const;
// Type: readonly ["localhost", 3000]
```

---

### Tuple Destructuring

```typescript
type ApiResponse = [status: number, body: string, headers: Record<string, string>];

function fetchApi(url: string): ApiResponse {
  // Simulated response
  return [200, JSON.stringify({ id: 1 }), { "content-type": "application/json" }];
}

// Destructure with type safety
const [status, body, headers] = fetchApi("/api/users");
// status is number
// body is string
// headers is Record<string, string>

// Ignore elements with underscore
const [status, , headers] = fetchApi("/api/users");
```

---

### Real Project Example

```typescript
// CSV row parsing
type CsvRow = [id: number, name: string, email: string, age: number];

function parseCsvRow(row: string): CsvRow {
  const [id, name, email, age] = row.split(",");
  return [Number(id), name, email, Number(age)];
}

// React useState (tuple pattern)
type UseStateReturn<T> = [state: T, setState: (value: T) => void];

function useState<T>(initial: T): UseStateReturn<T> {
  let state = initial;
  const setState = (value: T) => { state = value; };
  return [state, setState];
}

// Destructuring React hooks
const [count, setCount] = useState(0);
// count: number
// setCount: (value: number) => void
```

---

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using tuples when an interface would be clearer | Use objects for more than 3 elements |
| Forgetting readonly — allowing mutation | Use `readonly [type, type]` |
| Push/pop on tuples — breaks length guarantee | Use readonly tuples to prevent this |

---

### Interview Questions

**Easy:** What is a tuple in TypeScript and how is it different from an array?

**Medium:** How do you create a tuple with optional elements?

**Hard:** Explain how labeled tuples work and why they're useful in larger codebases.
