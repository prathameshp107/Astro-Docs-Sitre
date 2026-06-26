---
title: "Functions in TypeScript"
description: "Complete guide to TypeScript functions: parameter types, return types, optional parameters, default values, overloads, generics, and advanced function patterns."
---

## Functions in TypeScript

### Function Type Annotations

```typescript
// Parameter types and return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function syntax
const multiply = (a: number, b: number): number => {
  return a * b;
};

// TypeScript infers return type when possible
const divide = (a: number, b: number) => a / b;
// Inferred return type: number
```

---

### Optional and Default Parameters

```typescript
// Optional parameter (must come after required)
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

// Default parameter value
function createUser(
  name: string,
  role: string = "user",
  isActive: boolean = true
): User {
  return { name, role, isActive };
}

createUser("Alice");                    // role: "user"
createUser("Bob", "admin");            // role: "admin"
createUser("Charlie", "moderator", false);
```

---

### Rest Parameters

```typescript
// Accept any number of arguments
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4, 5); // 15

// Mixed rest parameters
function buildMessage(prefix: string, ...suffixes: string[]): string {
  return prefix + suffixes.join(" ");
}
```

---

### Function Type Expressions

```typescript
// Declare a function type
type GreetFunction = (name: string) => string;
type MathOperation = (a: number, b: number) => number;
type Callback<T> = (error: Error | null, result?: T) => void;

// Use the function type
const sayHello: GreetFunction = (name) => `Hello, ${name}`;
const add: MathOperation = (a, b) => a + b;

// Function as parameter
function operate(a: number, b: number, op: MathOperation): number {
  return op(a, b);
}
```

---

### Function Overloads

```typescript
// Multiple function signatures
function processInput(input: string): string;
function processInput(input: number): number;
function processInput(input: boolean): boolean;

// Implementation signature — must be compatible with all overloads
function processInput(input: string | number | boolean): string | number | boolean {
  if (typeof input === "string") return input.toUpperCase();
  if (typeof input === "number") return input * 2;
  return !input;
}

processInput("hello");  // string
processInput(42);        // number
processInput(true);      // boolean
```

---

### `this` Parameter

```typescript
// Explicitly type 'this'
interface Button {
  text: string;
  onClick: (this: HTMLElement, event: MouseEvent) => void;
}

const button = document.createElement("button");
button.addEventListener("click", function(this: HTMLElement) {
  console.log(this.textContent); // this is typed as HTMLElement
});
```

---

### Generator Functions

```typescript
function* countdown(start: number): Generator<number, void, unknown> {
  for (let i = start; i >= 0; i--) {
    yield i;
  }
}

const counter = countdown(3);
console.log(counter.next()); // { value: 3, done: false }
console.log(counter.next()); // { value: 2, done: false }
console.log(counter.next()); // { value: 1, done: false }
```

---

### Real Project Example

```typescript
// API request function with overloads
async function fetchData(url: string): Promise<Response>;
async function fetchData<T>(url: string, parser: (data: unknown) => T): Promise<T>;
async function fetchData<T>(
  url: string,
  parser?: (data: unknown) => T
): Promise<Response | T> {
  const response = await fetch(url);
  const data = await response.json();
  return parser ? parser(data) : response;
}

// Usage
const response = await fetchData("/api/users");        // Response
const users = await fetchData("/api/users", (data) => data as User[]); // User[]
```

---

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Not annotating return types | Use explicit return types for complex functions |
| Using `Function` type | Use specific function signatures |
| Forgetting void return | Use `void` for functions that don't return |
| Overloading with incompatible types | Implementation must handle all overloads |

---

### Interview Questions

**Easy:** How do you type a function parameter and return value?

**Medium:** What are function overloads and when would you use them?

**Hard:** Explain how the `this` parameter works in TypeScript functions.
