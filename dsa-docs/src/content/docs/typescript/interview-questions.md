---
title: "TypeScript Interview Questions — In Depth"
description: "100+ TypeScript interview questions from beginner to advanced with detailed answers, code examples, interview tips, common mistakes, and follow-up questions."
---

## TypeScript Interview Questions — In Depth

> **A premium interview preparation guide covering 105+ TypeScript questions** organized by difficulty. Each question includes detailed code examples, interview tips from FAANG engineers, common mistakes, and follow-up questions to deepen understanding.

---

## 📋 Table of Contents

| # | Category | Questions |
|---|----------|-----------|
| 1 | Core Concepts & Setup | Q1–Q5 |
| 2 | Basic Types & Inference | Q6–Q15 |
| 3 | Functions & Parameters | Q16–Q25 |
| 4 | Objects & Interfaces | Q26–Q35 |
| 5 | Unions, Intersections & Type System | Q36–Q45 |
| 6 | Generics | Q46–Q55 |
| 7 | Utility Types & Type Guards | Q56–Q65 |
| 8 | Advanced Types (Mapped, Conditional, infer) | Q66–Q80 |
| 9 | Architecture (Modules, Namespaces, Decorators) | Q81–Q90 |
| 10 | Framework Integration (React, Angular, Node) | Q91–Q100 |
| 11 | Enterprise & Patterns | Q101–Q105+ |

---

## 🟢 BEGINNER QUESTIONS (Q1–Q35)

---

### Q1 · Beginner · Core Concepts

## What is TypeScript and why was it created?

**Detailed Answer:**

TypeScript is an **open-source, typed superset of JavaScript** developed by Microsoft (lead by Anders Hejlsberg, creator of C#) and first released in October 2012.

TypeScript adds **static type checking** to JavaScript — it catches type-related bugs at **compile time** rather than at runtime. It compiles (transpiles) down to plain JavaScript that runs anywhere JS runs: browsers, Node.js, Deno, Bun, etc.

| Feature | JavaScript | TypeScript |
|---------|-----------|------------|
| Type System | Dynamic (runtime) | Static (compile-time) |
| Error Detection | Runtime | Compile-time (before execution) |
| Tooling | Limited autocomplete | Rich IDE support (IntelliSense) |
| Refactoring | Manual, error-prone | Automated, safe |
| Missing Property Access | `undefined` at runtime | Compiler error |
| Null/Undefined Checks | Manual | Built-in with `strictNullChecks` |

**Simple Explanation:**

> JavaScript is like writing a shopping list on a napkin — flexible but easy to make mistakes. TypeScript is like using a structured shopping app that warns you when you type "mil" instead of "milk" before you even get to the store.

**Real-world Example:**

```typescript
// JavaScript — bug discovered at runtime
function greet(name) {
  return "Hello, " + name.toUpperCase();
}
greet(42); // 💥 Runtime Error: name.toUpperCase is not a function

// TypeScript — bug caught at compile time
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}
greet(42); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'
```

**Interview Tips:**
- Mention Anders Hejlsberg and the 2012 release date for extra context
- Emphasize that TypeScript is **not a new language** — it's JavaScript with types
- Key quote: "TypeScript is JavaScript that scales"

**Common Mistakes:**
- Saying TypeScript runs in the browser — it doesn't; it compiles to JavaScript
- Thinking TypeScript completely prevents runtime errors — it prevents type-related errors but logic bugs still happen

**Follow-up Questions:**
1. How is TypeScript different from alternative typed JS solutions like Flow?
2. What problems does TypeScript solve that JavaScript alone cannot?

---

### Q2 · Beginner · Core Concepts

## How does TypeScript compilation work? What does `tsc` do?

**Detailed Answer:**

The TypeScript compiler (`tsc`) performs several steps:

```
TypeScript Source (.ts)
        ↓
  1. Parse → creates AST (Abstract Syntax Tree)
        ↓
  2. Type Checking → verifies types, reports errors
        ↓
  3. Transform → downlevels syntax (ES2021 → ES2015, etc.)
        ↓
  4. Emit → generates JavaScript (.js) + Declaration files (.d.ts)
        ↓
JavaScript Output (.js) + Type Declarations (.d.ts)
```

**Key operations:**

```bash
# Compile a single file
npx tsc index.ts           # Produces index.js

# Compile entire project (uses tsconfig.json)
npx tsc

# Type-check only (no output)
npx tsc --noEmit

# Watch mode — recompile on changes
npx tsc --watch
```

**Declaration Files (.d.ts):**
```typescript
// index.ts
export function greet(name: string): string {
  return `Hello, ${name}`;
}

// Generated index.d.ts
export declare function greet(name: string): string;
```

**Simple Explanation:**
> `tsc` is like a quality inspector and translator in one — it checks your work for errors (type checking) and then translates it from TypeScript to JavaScript so browsers/Node can understand it.

**Interview Tips:**
- Know the `--noEmit` flag — it's used in CI/CD pipelines to check types without generating output files
- Mention that Vite, esbuild, and Babel can also transpile TypeScript (without type checking) for faster builds

**Common Mistakes:**
- Thinking `tsc` is the only way to run TypeScript — ts-node, tsx, and Bun can run `.ts` files directly
- Confusing **transpilation** (syntax transformation) with **type checking** — they're separate steps

**Follow-up Questions:**
1. What is the difference between `tsc` and Babel for TypeScript compilation?
2. What are declaration files (.d.ts) and why are they important?

---

### Q3 · Beginner · Core Concepts

## What is `tsconfig.json`? What are the key configuration options?

**Detailed Answer:**

`tsconfig.json` is the configuration file for TypeScript projects. It tells the compiler how to process your code.

```json
{
  "compilerOptions": {
    "target": "ES2022",           // JS output version
    "module": "ESNext",           // Module system for output
    "moduleResolution": "bundler", // How modules are resolved
    "strict": true,               // Enable all strict checks
    "outDir": "./dist",           // Output directory
    "rootDir": "./src",           // Source directory
    "esModuleInterop": true,      // Better CJS/ESM compatibility
    "skipLibCheck": true,         // Skip type checking .d.ts files
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,    // Import .json files
    "declaration": true,          // Generate .d.ts files
    "declarationMap": true,       // Source maps for .d.ts
    "sourceMap": true             // Debugging source maps
  },
  "include": ["src"],             // Files to include
  "exclude": ["node_modules", "dist"]  // Files to exclude
}
```

**The `strict` flag enables these checks:**
- `strictNullChecks` — null/undefined are not assignable to other types
- `strictFunctionTypes` — stricter function type variance
- `strictBindCallApply` — stricter `bind`, `call`, `apply` checks
- `strictPropertyInitialization` — class properties must be initialized
- `noImplicitAny` — error when type cannot be inferred
- `noImplicitThis` — error when `this` has implicit type `any`
- `alwaysStrict` — emit `"use strict"` in JS output

**Simple Explanation:**
> `tsconfig.json` is your TypeScript project's control panel. It lets you decide which JavaScript version to target, where to put compiled files, how strict to be with type checking, and what to include or exclude.

**Interview Tips:**
- Always start every project with `strict: true` — it catches the most bugs
- The `target` option should match your deployment environment (modern targets produce cleaner code)
- `moduleResolution: "bundler"` is the modern choice for Vite/Webpack projects

**Common Mistakes:**
- Setting `strict: false` to "save time" — this defeats TypeScript's purpose
- Forgetting `esModuleInterop: true` — causes issues importing CommonJS modules
- Not excluding `node_modules` — compilation becomes extremely slow

**Follow-up Questions:**
1. What does each strict flag do individually?
2. When would you set `target` to lower ES versions?

---

### Q4 · Beginner · Core Concepts

## What is the difference between `interface` and `type` in TypeScript?

**Detailed Answer:**

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| **Declaration merging** | ✅ Yes | ❌ No |
| **Extending** | `extends` keyword | Intersection `&` |
| **Unions, Intersections** | ❌ Not directly | ✅ Yes |
| **Primitive aliases** | ❌ No | ✅ Yes (`type ID = string`) |
| **Tuple types** | ❌ No | ✅ Yes (`type Pair = [string, number]`) |
| **Mapped types** | ❌ No | ✅ Yes |
| **Conditional types** | ❌ No | ✅ Yes |
| **Performance** | Better for object shapes (cached) | Similar |

```typescript
// Interface — declarative, extensible
interface User {
  name: string;
  email: string;
}

// Type Alias — expressive, flexible
type User = {
  name: string;
  email: string;
};

// Type can do things Interface cannot:
type Status = "active" | "inactive" | "pending";  // Union
type Pair = [string, number];                       // Tuple
type Admin = User & { role: "admin" };              // Intersection
type Readonly<T> = { readonly [K in keyof T]: T[K] }; // Mapped

// Interface can do things Type cannot:
interface User { name: string }
interface User { age: number }  // Declaration merging!
// Result: User has BOTH name and age
```

**Decision Guide:**
```typescript
// ✅ Use INTERFACE for:
// - Public API shapes (better error messages, better performance)
// - Object types that need declaration merging
// - Object types that need extending

// ✅ Use TYPE for:
// - Union types
// - Intersection types  
// - Tuple types
// - Mapped/conditional types
// - Function signatures
// - Any type that isn't a simple object shape
```

**Interview Tips:**
- The famous rule: "Use `interface` until you need `type`" — it's a good guideline
- **Declaration merging** is the killer feature of interfaces — it allows augmenting third-party types
- Type aliases are **closed** (cannot be reopened), interfaces are **open** (can be extended anywhere)

**Common Mistakes:**
- Using `type` for all object declarations (lose declaration merging ability)
- Thinking `type` and `interface` are completely interchangeable for objects — they're not (see merging)
- Using `interface` for union types — it's not possible without workarounds

**Follow-up Questions:**
1. Can a type extend an interface? Can an interface extend a type?
2. What happens when two interfaces with conflicting properties are merged?

---

### Q5 · Beginner · Core Concepts

## What is the difference between `any`, `unknown`, and `never`?

**Detailed Answer:**

```typescript
// ===== any — Opt-out of type checking =====
let value: any = 42;
value = "hello";           // ✅ OK
value.toUpperCase();       // ✅ No compile error (but may crash at runtime!)
value.doSomething();       // ✅ No compile error (definitely crashes!)

// When to use any: Migration from JS, very rare edge cases
// Never use any as a default type!

// ===== unknown — Type-safe alternative to any =====
let value: unknown = 42;
value = "hello";           // ✅ OK (assignment is fine)

// ❌ Cannot use without narrowing:
// value.toUpperCase();    // Error: Object is of type 'unknown'

// Must narrow first:
if (typeof value === "string") {
  value.toUpperCase();     // ✅ OK — narrowed to string
}

// Parse JSON safely:
function parseJSON(json: string): unknown {
  return JSON.parse(json);
}
const data = parseJSON('{"name":"Alice"}');
// data.name;              // ❌ Error
if (typeof data === "object" && data && "name" in data) {
  console.log((data as { name: string }).name); // ✅ Safe
}

// ===== never — Value that NEVER occurs =====
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// Exhaustive type checking:
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side * shape.side;
    default: return assertNever(shape); // TypeScript checks this!
  }
}

function assertNever(value: never): never {
  throw new Error(`Unexpected: ${value}`);
}
// If a new Shape variant is added, the switch becomes incomplete
// TypeScript will show an error at assertNever — catches at compile time!
```

| Type | Can assign anything? | Can use without narrowing? | Used for |
|------|---------------------|---------------------------|----------|
| `any` | ✅ Yes | ✅ Yes | Migration, opt-out |
| `unknown` | ✅ Yes | ❌ No | Type-safe APIs, JSON parsing |
| `never` | ❌ Empty union | N/A | Unreachable code, exhaustiveness |

**Simple Explanation:**
> `any` is like turning off the guard rails — full speed but dangerous. `unknown` is like having a sealed box — you know something is inside but must inspect it before using. `never` represents an impossible situation — like a function that never returns because it throws an error.

**Interview Tips:**
- **Never use `any` as a default** — `unknown` is always preferred
- `never` in exhaustiveness checks is an **extremely powerful pattern** that big companies love
- The `never` type is automatically inferred in some cases: `const x: string & number` → `never`

**Common Mistakes:**
- Using `any` "temporarily" — it almost always stays in the codebase forever
- Using `as` casts to bypass TypeScript instead of using proper type guards
- Forgetting that `never` can actually help you catch missing cases in switch statements

**Follow-up Questions:**
1. What happens when you assign a `never` type to another type?
2. How does TypeScript infer `never` in union types?

---

### Q6 · Beginner · Basic Types

## What are the primitive types in TypeScript?

**Detailed Answer:**

TypeScript has the same primitives as JavaScript, plus additional types for type safety:

```typescript
// ===== Standard Primitives =====
const name: string = "Alice";
const age: number = 25;
const isActive: boolean = true;

// ===== Special Primitives =====
const big: bigint = 9007199254740993n;  // Large integers
const unique: symbol = Symbol("id");    // Unique identifiers

// ===== TypeScript-Specific =====
const nothing: null = null;              // Intentional absence
const notAssigned: undefined = undefined; // Not yet assigned
const result: void = undefined;          // Function returns nothing
const impossible: never = throwError();  // Never occurs

// ===== Type Annotations vs Inference =====
// TypeScript INFERS types automatically:
let inferredName = "Alice";              // inferred as string
let inferredAge = 25;                    // inferred as number

// TypeScript does NOT infer void/never — those need annotations:
// function process(): void { ... }      // Must explicitly annotate void
```

**The `null` and `undefined` distinction:**
```typescript
// With strictNullChecks enabled (recommended):
let value: string = null;  // ❌ Error: Type 'null' is not assignable to 'string'
let value2: string | null = null;  // ✅ Must explicitly allow null

// Without strictNullChecks:
let value3: string = null;  // ✅ Allowed (dangerous!)
```

**Simple Explanation:**
> Primitives are the building blocks of all types. In TypeScript, each primitive gets a lowercase type name (`string`, `number`, `boolean`). Never use the uppercase versions (`String`, `Number`, `Boolean`) — those refer to the object wrappers, not the primitives.

**Common Mistakes:**
- Using `String` (object type) instead of `string` (primitive type)
- Forgetting the `n` suffix for BigInt literals: `100n` not `100`
- Expecting TypeScript to infer `void` automatically in all cases

**Follow-up Questions:**
1. Why should you use lowercase `string` instead of uppercase `String`?
2. What is the difference between `null` and `undefined` in TypeScript?

---

### Q7 · Beginner · Basic Types

## How does type inference work in TypeScript?

**Detailed Answer:**

TypeScript can automatically determine types without explicit annotations:

```typescript
// ===== Basic Inference =====
let name = "Alice";       // string
let age = 25;             // number
let isActive = true;      // boolean
let items = [];           // any[] (empty array — wide type)
let numbers = [1, 2, 3];  // number[]

// ===== Function Return Inference =====
function add(a: number, b: number) {
  return a + b;            // Inferred return: number
}

function getDate() {
  return new Date();       // Inferred return: Date
}

// ===== Contextual Typing =====
const numbers = [1, 2, 3];
numbers.forEach((n) => {
  console.log(n.toFixed(2)); // n is inferred as number from context
});

// Event handlers:
document.addEventListener("click", (event) => {
  console.log(event.clientX); // event inferred as MouseEvent
});

// ===== Best Common Type =====
const arr = [0, 1, null];  // Inferred: (number | null)[]
const mixedArr = [1, "hello", true]; // (string | number | boolean)[]

// ===== Literal Inference =====
const constant = "hello";  // type: "hello" (literal)
let variable = "hello";    // type: string (widened)

// const preserves literal types, let/var widens to base type
```

**Simple Explanation:**
> TypeScript's inference is like a detective that makes reasonable guesses based on evidence. If you write `const x = 5`, it deduces `x` is a `number` and can never change. If you write `return x + y;`, it looks at what `x` and `y` are to determine the return type.

**Interview Tips:**
- **Best inference comes from the narrowest context** — prefer `const` over `let` when possible
- Functions infer return types from their implementation — you can hover to see them
- **Contextual typing** is how `map`, `filter`, `forEach` know the types of their callbacks

**Common Mistakes:**
- Over-annotating when inference would be clearer (e.g., `const x: number = 5`)
- Thinking inference works for function parameters — it doesn't (parameters need annotations)
- Expecting inference to work with complex reduce operations (it often returns `any[]`)

**Follow-up Questions:**
1. What is contextual typing? Give an example.
2. When should you explicitly annotate return types vs relying on inference?

---

### Q8 · Beginner · Basic Types

## What are union types and how do you narrow them?

**Detailed Answer:**

```typescript
// ===== Union Types =====
type Status = "active" | "inactive" | "pending";
type ID = string | number;
type Result = string | number | boolean;

function processId(id: ID): string {
  // id can be string or number — need to narrow
  if (typeof id === "string") {
    return id.toUpperCase(); // id is string here
  }
  return id.toFixed(0); // id is number here
}

// ===== Narrowing Techniques =====

// 1. typeof — for primitives
function pad(value: string | number): string {
  if (typeof value === "number") {
    return " ".repeat(value); // value: number
  }
  return value; // value: string
}

// 2. Truthiness checks
function process(value: string | null | undefined): string {
  if (value) {
    return value.toUpperCase(); // value: string
  }
  return "default";
}

// 3. Equality narrowing
function compare(a: string | number, b: string | boolean) {
  if (a === b) {
    // Both a and b are narrowed to what they have in common
    // Here: a is string, b is string
    console.log(a.toUpperCase());
  }
}

// 4. in operator
interface Bird { fly(): void; feathers: number }
interface Fish { swim(): void; scales: number }

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    return animal.fly(); // animal: Bird
  }
  return animal.swim(); // animal: Fish
}

// 5. instanceof
class Dog { bark() {} }
class Cat { meow() {} }

function makeSound(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    pet.bark(); // pet: Dog
  } else {
    pet.meow(); // pet: Cat
  }
}

// 6. Discriminated unions — most powerful pattern
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {     // kind is the discriminant
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}
```

**Simple Explanation:**
> Union types (`|`) say "this can be any of these types." TypeScript won't let you use type-specific operations until you narrow down which type it actually is. It's like having a box that could contain a hammer or a screwdriver — you must look inside before using it.

**Interview Tips:**
- **Discriminated unions** are THE most powerful TypeScript pattern — master them
- TypeScript narrows types automatically based on control flow analysis
- The `never` type emerges naturally in union narrowing when all cases are exhausted

**Common Mistakes:**
- Using union overloads when a generic would be simpler
- Forgetting to narrow before accessing type-specific properties
- Creating discriminated unions without a common discriminant property

**Follow-up Questions:**
1. What is a discriminated union? How does the discriminant property work?
2. How does TypeScript perform control flow analysis for narrowing?

---

### Q9 · Beginner · Basic Types

## What are literal types in TypeScript? How do `as const` assertions work?

**Detailed Answer:**

```typescript
// ===== String Literal Types =====
type Direction = "north" | "south" | "east" | "west";
type Status = "success" | "error" | "loading";
type Color = "red" | "green" | "blue";

function move(direction: Direction) {
  console.log(`Moving ${direction}`);
}
move("north"); // ✅
// move("up"); // ❌ Error!

// ===== Numeric Literal Types =====
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type Port = 3000 | 8080 | 443;

// ===== Boolean Literal Types =====
type True = true;
type False = false;

// ===== as const — Preserve Literals =====
// Without as const — types widen:
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  method: "GET"
};
// config.method is string (widened)

// With as const — types stay narrow:
const config2 = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  method: "GET"
} as const;
// config2.method is "GET" (literal!)
// config2.timeout is 5000 (literal!)
// config2 is readonly

// ===== as const with Arrays =====
const colors = ["red", "green", "blue"] as const;
// type: readonly ["red", "green", "blue"]
// colors[0] is "red", not string

// ===== Template Literal Types =====
type EventName = `on${Capitalize<string>}`;
// Matches: "onChange" | "onClick" | "onSubmit" | ...

type ColorWithHex = `#${string}`;
// Matches: "#ff0000" | "#00ff00" | ...

type CSSValue = `${number}${"px" | "rem" | "em" | "%"}`;
// Matches: "10px" | "2rem" | "50%" | ...
```

**Simple Explanation:**
> Literal types let you say "not any string, but specifically these exact strings." `as const` is like putting a value in a display case — it says "this exact value, forever, please don't widen it."

**Interview Tips:**
- `as const` is crucial for Redux action creators, configuration objects, and API endpoints
- Template literal types (TS 4.1+) enable powerful string pattern matching at the type level
- Without `as const`, `const { method } = config` loses the literal type (widens to `string`)

**Common Mistakes:**
- Forgetting `as const` on configuration objects — types widen unexpectedly
- Using literal types too broadly when a base type (like `string`) would suffice
- Not understanding that `let x = "hello"` infers `string`, not `"hello"`

**Follow-up Questions:**
1. What's the difference between `const x = "hello"` and `let x = "hello" as const`?
2. How do template literal types enable type-safe CSS property patterns?

---

### Q10 · Beginner · Basic Types

## How do arrays and tuples work in TypeScript?

**Detailed Answer:**

```typescript
// ===== Array Types =====
// Two syntaxes — equivalent:
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Readonly array:
let readOnly: readonly number[] = [1, 2, 3];
// readOnly.push(4);     // ❌ Error: push doesn't exist on readonly
// readOnly[0] = 10;     // ❌ Error: Index signature in readonly

// Multi-dimensional:
let matrix: number[][] = [[1, 2], [3, 4]];
let cube: number[][][] = [[[1]]];

// Union arrays:
let mixed: (string | number)[] = [1, "hello", 42];

// ===== Tuple Types =====
// Fixed-length array with specific types per position:
let person: [string, number] = ["Alice", 30];

// Access preserves types:
person[0].toUpperCase(); // string method ✅
person[1].toFixed(2);    // number method ✅

// Optional tuple elements:
let tuple: [string, number?] = ["hello"];
tuple = ["hello", 42]; // Also OK

// Labeled tuples (TS 4.0+):
type Range = [start: number, end: number];
type Name = [firstName: string, lastName: string];

// ===== Rest Elements in Tuples =====
// Variable length tail:
type StringsWithNumber = [string, ...number[]];
let a: StringsWithNumber = ["hello", 1, 2, 3];

// Rest at start (TS 4.2+):
type LeadingRest = [...number[], string];
let b: LeadingRest = [1, 2, 3, "end"];

// ===== Real-World Tuple Patterns =====
// React useState return:
function useState<T>(initial: T): [T, (value: T) => void] {
  // implementation
}

// API result pair:
type ApiResult<T> = [data: T | null, error: Error | null];

// CSV row:
type CsvRow = [name: string, age: number, email: string];
```

**Simple Explanation:**
> Arrays are dynamic — any number of elements of the same type. Tuples are fixed-length contracts — position 0 is a string, position 1 is a number, etc. Think of tuples as records without named keys.

**Interview Tips:**
- Tuples are heavily used in React hooks (useState returns a tuple)
- `readonly` arrays prevent mutation and are preferred in functional code
- Labeled tuples improve code readability and tooling

**Common Mistakes:**
- Using regular arrays when tuples would provide better type safety
- Not using `readonly` for array function parameters — allows accidental mutation
- Thinking tuples have fixed length enforcement at runtime (they don't — it's only a compile-time check)

**Follow-up Questions:**
1. What's the difference between `string[]` and `[string, ...string[]]`?
2. How do variadic tuple types help with function parameter inference?

---

### Q11 · Beginner · Functions

## How do you type function parameters and return values?

**Detailed Answer:**

```typescript
// ===== Basic Parameter & Return Types =====
function add(a: number, b: number): number {
  return a + b;
}

// Arrow functions:
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Inferred return (use when simple):
const divide = (a: number, b: number) => a / b;

// ===== Optional Parameters =====
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

// ===== Default Parameters =====
function createUser(
  name: string,
  role: string = "user",
  isActive: boolean = true
) {
  return { name, role, isActive };
}

// ===== Rest Parameters =====
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

function buildMessage(prefix: string, ...suffixes: string[]): string {
  return prefix + suffixes.join(" ");
}

// ===== Destructured Parameters =====
function printUser({ name, age }: { name: string; age?: number }): void {
  console.log(name, age);
}

// ===== Function Type Expressions =====
type GreetFunction = (name: string) => string;
type MathOperation = (a: number, b: number) => number;
type Callback<T> = (error: Error | null, result?: T) => void;

// Use the type:
const sayHello: GreetFunction = (name) => `Hello, ${name}`;
const addOp: MathOperation = (a, b) => a + b;

// ===== Void vs undefined =====
function log(message: string): void {
  console.log(message);
  // return undefined; // This is fine — void accepts undefined
}

function precise(): undefined {
  return undefined; // Must explicitly return undefined
}
```

**Simple Explanation:**
> Function types describe the contract: what goes in (parameters) and what comes out (return type). Optional parameters use `?`, rest parameters use `...`, and `void` means "I don't return anything meaningful."

**Interview Tips:**
- **Always annotate function parameters** — TypeScript cannot infer them from usage
- Return type annotation is optional but recommended for public APIs
- Use `void` for return types meaning "don't use the return value"

**Common Mistakes:**
- Using `Function` type instead of a specific function signature
- Confusing `void` with `undefined` — `void` means the return value is not meant to be used
- Not typing destructured parameters inline

**Follow-up Questions:**
1. When should you explicitly annotate return types?
2. What's the difference between `void` and `undefined` as return types?

---

### Q12 · Beginner · Functions

## How do function overloads work in TypeScript?

**Detailed Answer:**

```typescript
// ===== Function Overloads =====
// Multiple call signatures:
function process(input: string): string;
function process(input: number): number;
function process(input: boolean): boolean;

// Implementation — must handle all overloads:
function process(input: string | number | boolean): string | number | boolean {
  if (typeof input === "string") return input.toUpperCase();
  if (typeof input === "number") return input * 2;
  return !input;
}

// Usage:
const str = process("hello");  // type: string
const num = process(42);       // type: number
const bool = process(true);    // type: boolean

// ===== Overloads with Different Parameter Counts =====
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: "input", options: { type: string }): HTMLInputElement;
function createElement(tag: string, options?: Record<string, unknown>): Element {
  const el = document.createElement(tag);
  if (options) Object.assign(el, options);
  return el;
}

// ===== When to Use Overloads vs Union Types =====
// ❌ Overloads not needed — union type is simpler:
function pad(value: string, padding: number | string): string {
  // Simple union parameter pattern
}

// ✅ Overloads needed — return type varies by input:
function fetchData(url: string): Promise<Response>;
function fetchData<T>(url: string, parser: (data: unknown) => T): Promise<T>;
function fetchData<T>(url: string, parser?: (data: unknown) => T) {
  return fetch(url).then(res => res.json())
    .then(data => parser ? parser(data) : data);
}
```

**Simple Explanation:**
> Function overloads let you define multiple call signatures for the same function. They're useful when the return type depends on the input types in ways that a union type cannot express.

**Interview Tips:**
- **Only the implementation signature matters at runtime** — overload signatures are erased
- The implementation signature must be compatible with ALL overload signatures
- Prefer union types over overloads when possible — simpler code

**Common Mistakes:**
- Making the implementation signature too narrow (doesn't accept all overload calls)
- Using overloads when union types or generics would work better
- Having overloads with the same parameter types but different return types (TypeScript uses the first overload)

**Follow-up Questions:**
1. What happens if the implementation signature doesn't match the overloads?
2. When should you NOT use function overloads?

---

### Q13 · Beginner · Objects & Interfaces

## How do you define object types and interfaces in TypeScript?

**Detailed Answer:**

```typescript
// ===== Inline Object Type =====
function printCoord(pt: { x: number; y: number }): void {
  console.log(`X: ${pt.x}, Y: ${pt.y}`);
}

// ===== Type Alias for Object =====
type Point = {
  x: number;
  y: number;
};

// ===== Interface for Object =====
interface Point3D {
  x: number;
  y: number;
  z: number;
}

// ===== Optional Properties =====
interface Config {
  url: string;
  timeout?: number;     // Optional
  retries?: number;     // Optional
  headers?: Record<string, string>;
}

// ===== Readonly Properties =====
interface User {
  readonly id: string;
  readonly createdAt: Date;
  name: string;
  email: string;
}

const user: User = { id: "1", createdAt: new Date(), name: "Alice", email: "a@b.com" };
// user.id = "2"; // ❌ Error: Cannot assign to readonly property

// ===== Index Signatures =====
interface StringDictionary {
  [key: string]: string;
}

const translations: StringDictionary = {
  hello: "Hola",
  goodbye: "Adiós",
};

// ===== Excess Property Checks =====
interface User {
  name: string;
  age: number;
}

// ❌ Direct object literal — strict check:
// const user: User = { name: "Alice", age: 30, email: "a@b.com" };
// Error: 'email' does not exist in type 'User'

// ✅ Intermediate variable — structural check only:
const userData = { name: "Alice", age: 30, email: "a@b.com" };
const user2: User = userData; // OK
```

**Simple Explanation:**
> Object types describe the shape of an object — what properties it has and their types. Think of them as blueprints for objects. Interfaces are TypeScript's primary way to define these blueprints, with features like extension, merging, and readonly modifiers.

**Interview Tips:**
- **Excess property checks** only apply to object literals, not intermediate variables
- Use `readonly` for properties that should not change after initialization
- Index signatures are useful for dictionaries but can weaken type safety

**Common Mistakes:**
- Not using optional properties when a field may not exist
- Forgetting `readonly` for fixed properties like IDs
- Confusing `?` (optional property) with `| undefined` (can be undefined)

**Follow-up Questions:**
1. When do excess property checks apply and when do they not?
2. What is the difference between `?` optional and `| undefined`?

---

### Q14 · Beginner · Objects & Interfaces

## How does interface extension work? Can interfaces extend multiple interfaces?

**Detailed Answer:**

```typescript
// ===== Single Extension =====
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Rex",
  age: 3,
  breed: "German Shepherd",
  bark: () => console.log("Woof!"),
};

// ===== Multiple Inheritance =====
interface Flyable {
  fly(): void;
  altitude: number;
}

interface Swimmable {
  swim(): void;
  depth: number;
}

interface Duck extends Flyable, Swimmable {
  quack(): void;
}

// ===== Interface Extending Type =====
type Animal = { name: string; age: number };
interface Bear extends Animal {
  honey: boolean;
}

// ===== Overriding Properties =====
interface Base {
  id: string;
  value: unknown;
}

interface Detailed extends Base {
  value: { name: string; count: number }; // Narrow the value type
  description: string;
}
```

**Simple Explanation:**
> Interface extension is like inheritance in OOP — a child interface gets all the properties of its parent(s) and can add its own. Multiple inheritance lets a single interface combine multiple sources.

**Interview Tips:**
- Interfaces can extend both interfaces and type aliases
- When extending multiple interfaces with the same property name, the types must be compatible
- Interface extension is compile-time only — no runtime overhead

**Common Mistakes:**
- Trying to extend a union type (cannot be done — use intersection instead)
- Property conflicts when extending incompatible types
- Overriding a property with an incompatible type

**Follow-up Questions:**
1. How does extending an interface differ from using intersection types?
2. What happens when two extended interfaces have properties with the same name but different types?

---

### Q15 · Beginner · Objects & Interfaces

## What is the `keyof` operator and how do indexed access types work?

**Detailed Answer:**

```typescript
// ===== keyof — Get Keys as Union =====
interface User {
  name: string;
  age: number;
  email: string;
}

type UserKeys = keyof User;
// "name" | "age" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { name: "Alice", age: 30, email: "alice@test.com" };
const name = getProperty(user, "name"); // type: string
const age = getProperty(user, "age");   // type: number
// getProperty(user, "invalid"); // ❌ Error!

// ===== Indexed Access Types =====
type UserNameType = User["name"];  // string
type UserAgeType = User["age"];    // number
type UserNameOrAge = User["name" | "age"]; // string | number

// Get all value types:
type UserValues = User[keyof User]; // string | number

// ===== With Arrays =====
const arr = [{ name: "Alice", age: 30 }];
type ArrElement = (typeof arr)[number]; // { name: string; age: number }
type ArrValue = (typeof arr)[number]["name"]; // string

// ===== Real-World Pattern =====
function updateField<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}

const updated = updateField(user, "age", 31);
// updated.age is number — type-safe!
```

**Simple Explanation:**
> `keyof T` gives you a union of all property names of type T. Indexed access `T[K]` gives you the type of property at key K. Together, they enable type-safe property access patterns.

**Interview Tips:**
- `keyof any` is `string | number | symbol`
- Indexed access types are also called "lookup types"
- This is the foundation of type-safe getters, updaters, and form libraries

**Common Mistakes:**
- Forgetting that `keyof` on arrays gives array methods too (push, pop, etc.)
- Using `keyof` on an object literal (use `typeof obj` first)
- Not constraining K with `extends keyof T`

**Follow-up Questions:**
1. What does `keyof any` return?
2. How would you create a type-safe object mapper using keyof?

---

## 🟡 INTERMEDIATE QUESTIONS (Q36–Q70)

---

### Q36 · Intermediate · Generics

## What are generics and why are they important in TypeScript?

**Detailed Answer:**

Generics allow you to write **reusable, type-safe code** that works with any type. Instead of using `any` (which loses type information) or writing duplicate code for each type, generics capture the type as a parameter.

```typescript
// ===== Without Generics — Lose type safety =====
function identity(value: any): any {
  return value;
}
const result = identity("hello");
result.toFixed(); // No error — but crashes at runtime!

// ===== With Generics — Type safety preserved =====
function identity<T>(value: T): T {
  return value;
}

const str = identity("hello");    // type: string
const num = identity(42);         // type: number
const bool = identity(true);      // type: boolean

// ===== Why TypeScript Infers Generics =====
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first = firstElement([1, 2, 3]);    // type: number | undefined
const firstStr = firstElement(["a", "b"]); // type: string | undefined

// ===== Generic Constraints =====
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length); // We know `length` exists
  return arg;
}

logLength("hello");      // ✅ string has length
logLength([1, 2, 3]);    // ✅ array has length
// logLength(42);        // ❌ Error: number has no length

// ===== Multiple Type Parameters =====
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const p = pair("hello", 42); // type: [string, number]
```

**Simple Explanation:**
> Generics are like placeholders for types. You write a function with `<T>` (T for Type), and when someone calls it, TypeScript figures out what T should be based on the arguments. Think of it as a \"fill-in-the-blank\" for types.

**Interview Tips:**
- Generics are **the most important TypeScript feature** for intermediate+ developers
- The `T` is conventional — use descriptive names: `TItem`, `TResponse`, `TId`
- Generics can be inferred OR specified explicitly: `identity<string>("hello")`

**Common Mistakes:**
- Using `any` when generics would preserve type safety
- Not constraining generics when you know what properties you need
- Thinking generics are only for functions — they work with interfaces, classes, and types too

**Follow-up Questions:**
1. How do generic constraints work with `extends`?
2. When should you explicitly specify generic types vs letting TypeScript infer them?

---

### Q37 · Intermediate · Generics

## How do generic interfaces and classes work? What is the repository pattern with generics?

**Detailed Answer:**

```typescript
// ===== Generic Interface =====
interface Repository<T> {
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// ===== Generic Class =====
class ApiRepository<T extends { id: string }> implements Repository<T> {
  constructor(private baseUrl: string) {}

  async getById(id: string): Promise<T | null> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) return null;
    return res.json();
  }

  async getAll(): Promise<T[]> {
    const res = await fetch(this.baseUrl);
    return res.json();
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const res = await fetch(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
    return res.ok;
  }
}

// Usage:
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

const userRepo = new ApiRepository<User>("/api/users");
const user = await userRepo.getById("123"); // type: User | null

// ===== Generic Factory Pattern =====
interface Factory<T> {
  create(): T;
}

class UserFactory implements Factory<User> {
  create(): User {
    return {
      id: crypto.randomUUID(),
      name: "New User",
      email: "user@example.com",
      createdAt: new Date(),
    };
  }
}

// ===== Generic Builder Pattern =====
class QueryBuilder<T> {
  private conditions: string[] = [];
  private limit?: number;

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  take(n: number): this {
    this.limit = n;
    return this;
  }

  async execute(): Promise<T[]> {
    const query = this.buildQuery();
    return db.query(query);
  }

  private buildQuery(): string {
    return `SELECT * FROM ...`;
  }
}

const users = await new QueryBuilder<User>()
  .where("age > 18")
  .where("active = true")
  .take(10)
  .execute();
```

**Simple Explanation:**
> Generic interfaces let you define reusable contracts (like a Repository contract) that work with any type. Generic classes let you share implementation logic across different types. The Repository pattern with generics is the standard for type-safe data access in TypeScript.

**Interview Tips:**
- The repository pattern is the **most asked enterprise TypeScript pattern** in senior interviews
- Constraining `T extends { id: string }` ensures all entities have an ID field
- The builder pattern with `this` return type enables method chaining

**Common Mistakes:**
- Not constraining T enough (e.g., `T extends Entity` instead of just `T`)
- Forgetting `Omit<T, "id">` when creating entities (id should be auto-generated)
- Making generic types too flexible — they should protect invariants

**Follow-up Questions:**
1. How would you add pagination support to the generic repository?
2. What's the difference between `this` as return type vs explicit type in builders?

---

### Q38 · Intermediate · Generics

## How do generic constraints with `keyof` work? What is the type-safe getter pattern?

**Detailed Answer:**

```typescript
// ===== keyof with Generics =====
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@test.com" };

const name = getProperty(user, "name"); // type: string
const age = getProperty(user, "age");   // type: number
// getProperty(user, "invalid");        // ❌ Error: not a key of user

// ===== Type-Safe Setter =====
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

setProperty(user, "name", "Bob");  // ✅ value must be string
setProperty(user, "age", 31);      // ✅ value must be number
// setProperty(user, "name", 42);  // ❌ Error: number is not assignable to string

// ===== Key Remapping (TS 4.1+) =====
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// ===== Filtering Keys =====
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type UserStrings = StringKeys<User>;
// { name: string } — only string properties!

// ===== Real-World: Type-safe Event Emitter =====
type EventMap = {
  userCreated: { id: string; name: string };
  userDeleted: { id: string };
  error: { message: string; code: number };
};

class TypedEventEmitter<T extends Record<string, unknown>> {
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    // Implementation
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    console.log(`Event: ${String(event)}`, data);
  }
}

const emitter = new TypedEventEmitter<EventMap>();
emitter.on("userCreated", (data) => {
  console.log(data.name); // typed! data is { id: string; name: string }
});
emitter.emit("userCreated", { id: "1", name: "Alice" });
```

**Simple Explanation:**
> `extends keyof T` constrains a generic parameter to only valid keys of type T. Combined with indexed access `T[K]`, this enables completely type-safe getters and setters — TypeScript knows exactly what type each property returns.

**Interview Tips:**
- This pattern is used extensively in **form libraries** (Formik, React Hook Form), **state management** (Redux, Zustand), and **ORM libraries** (Prisma)
- The type-safe event emitter is a **favorite interview question** for senior-level candidates

**Common Mistakes:**
- Not using `extends keyof T` when it's needed — leads to `any` type parameters
- Forgetting that `T[K]` can be a complex type, not just primitives
- Using `keyof any` when you mean `keyof T`

**Follow-up Questions:**
1. How would you create a type-safe event emitter with generics?
2. What is key remapping in mapped types? How does the `as` clause work?

---

### Q39 · Intermediate · Utility Types

## What are the essential utility types and when should you use each?

**Detailed Answer:**

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

// ===== Partial<T> — All properties optional =====
// Use: For update operations
function updateUser(id: string, updates: Partial<User>): void {
  // Only updates provided fields
}
updateUser("1", { name: "Alice" }); // Only specify what to update

// ===== Required<T> — All properties required =====
interface Config {
  url?: string;
  timeout?: number;
}

type StrictConfig = Required<Config>;
// { url: string; timeout: number } — both required

// ===== Readonly<T> — All properties readonly =====
type ImmutableUser = Readonly<User>;
// { readonly id: string; readonly name: string; ... }

// ===== Pick<T, K> — Select specific properties =====
type UserName = Pick<User, "name" | "email">;
// { name: string; email: string }

// ===== Omit<T, K> — Remove specific properties =====
type UserWithoutSensitive = Omit<User, "email" | "age">;
// { id: string; name: string; createdAt: Date }

// ===== Record<K, T> — Dictionary type =====
type PageInfo = { title: string; url: string };
type Pages = Record<string, PageInfo>;
// { [key: string]: { title: string; url: string } }

// ===== Exclude<T, U> — Remove from union =====
type Status = "active" | "inactive" | "pending" | "deleted";
type ActiveStatus = Exclude<Status, "deleted">;
// "active" | "inactive" | "pending"

// ===== Extract<T, U> — Keep only matching =====
type ExtractStatus = Extract<Status, "active" | "pending">;
// "active" | "pending"

// ===== NonNullable<T> — Remove null/undefined =====
type Maybe = string | null | undefined;
type Definitely = NonNullable<Maybe>; // string

// ===== ReturnType<T> — Get function return type =====
function createUser() {
  return { id: "1", name: "Alice" };
}
type UserType = ReturnType<typeof createUser>;
// { id: string; name: string }

// ===== Parameters<T> — Get function parameter types =====
function greet(name: string, age: number): void {}
type GreetParams = Parameters<typeof greet>;
// [name: string, age: number]

// ===== Awaited<T> — Unwrap promises =====
type AsyncResult = Promise<string>;
type Result = Awaited<AsyncResult>; // string

// ===== Real-World Example =====
interface FormState {
  name: string;
  email: string;
  age: number;
  terms: boolean;
}

type FormErrors = Partial<Record<keyof FormState, string>>;
type FormTouched = Record<keyof FormState, boolean>;

function useForm<T>() {
  const [values, setValues] = useState<T>();
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>();
  return { values, errors };
}
```

**Simple Explanation:**
> Utility types are TypeScript's built-in type transformers. `Partial`, `Pick`, `Omit`, and `Readonly` modify object types. `Exclude`, `Extract`, `NonNullable` modify union types. `ReturnType` and `Parameters` introspect functions. They save you from writing the same type transformations over and over.

**Interview Tips:**
- **Partial is the most-used utility type** — perfect for update/put operations
- `Pick` and `Omit` are opposites — know when to use each
- `ReturnType<typeof fn>` is extremely useful for extracting types from complex functions
- All utility types are implemented using mapped types and conditional types — understanding how they work makes you a TypeScript expert

**Common Mistakes:**
- Using `Partial` when you should split a type into Create/Update variants
- Confusing `Pick<T, K>` with `Omit<T, K>` — Pick keeps, Omit removes
- Using `Record<string, any>` instead of `Record<string, T>` with specific types

**Follow-up Questions:**
1. How is `Partial<T>` implemented internally (using mapped types)?
2. What's the difference between `Pick` and `Omit`?

---

### Q40 · Intermediate · Utility Types & Type Guards

## How do user-defined type guards work? What is the `is` keyword?

**Detailed Answer:**

```typescript
// ===== User-Defined Type Guard =====
// A function that returns a type predicate using `is`:
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    value.toUpperCase(); // value is string — TypeScript trusts the guard
  }
}

// ===== Real-World Example =====
interface User { name: string; email: string; role: "user" }
interface Admin { name: string; email: string; role: "admin"; permissions: string[] }

function isAdmin(user: User | Admin): user is Admin {
  return user.role === "admin";
}

function getDashboard(user: User | Admin) {
  if (isAdmin(user)) {
    return user.permissions; // user is Admin ✅
  }
  return ["read"]; // user is User ✅
}

// ===== Type Guard Factory =====
function hasProperty<T extends object, K extends string>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}

// ===== Assertion Functions (asserts) =====
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string!");
  }
}

function processValue(value: unknown) {
  assertIsString(value);
  value.toUpperCase(); // value is string after assertion
}

// ===== Assertion Without Type =====
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function greet(name: unknown) {
  assert(typeof name === "string", "Name must be string");
  name.toUpperCase(); // name is string
}

// ===== Comparison: Type Guards vs Assertions =====
// Type guard: returns boolean, safe to use in if-else
// Assertion: throws on failure, simplifies downstream code

// ===== Real-World: API Response Guard =====
type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function isSuccess<T>(result: ApiResult<T>): result is { success: true; data: T } {
  return result.success;
}

// Usage:
const result = await fetchUser();
if (isSuccess(result)) {
  console.log(result.data.name); // Safe
} else {
  console.error(result.error); // Error
}
```

**Simple Explanation:**
> Type guards let you tell TypeScript: "Trust me, after this check, this value is definitely this type." The `is` keyword creates a type predicate — a function that returns a boolean AND changes the type of the parameter in the calling scope.

**Interview Tips:**
- Type guards are the **type-safe way** to work with `unknown` data (JSON parsing, API responses)
- The `asserts` keyword is newer (TS 3.7) and less commonly used but very powerful
- Discriminated unions often eliminate the need for custom type guards

**Common Mistakes:**
- Writing type guards that lie (return `true` but don't actually check the type)
- Using `as` casts instead of type guards — `as` forces the type, guards prove it
- Forgetting that type guards only narrow within the `if` block, not outside

**Follow-up Questions:**
1. What's the difference between `value is Type` and `asserts value is Type`?
2. When would you use an assertion function over a type guard?

---

### Q41 · Intermediate · Mapped Types

## How do mapped types work? What are the built-in mapped types?

**Detailed Answer:**

```typescript
// ===== Basic Mapped Type =====
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type MyNullable<T> = {
  [K in keyof T]: T[K] | null;
};

// ===== How Mapped Types Work Internally =====
// TypeScript's built-in Readonly is equivalent to:
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Iterates over each key P in T
// Creates a property with the same name
// Assigns T[P] (the original value type) as the value type
// Applies the readonly modifier

// ===== Using Built-in Mapped Types =====
interface User {
  name: string;
  age: number;
  email: string;
}

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; readonly email: string }

type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string }

// ===== Transforming Property Types =====
type ToString<T> = {
  [K in keyof T]: string;
};
// Converts ALL values to strings

type Promisify<T> = {
  [K in keyof T]: Promise<T[K]>;
};
// Wraps ALL values in Promises

// ===== Deep Readonly (Recursive Mapped Type) =====
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

interface Nested {
  user: { name: string; address: { city: string } };
}

type DeepReadonlyNested = DeepReadonly<Nested>;
// { readonly user: DeepReadonly<{ name: string; address: { city: string } }> }

// ===== Key Remapping with `as` (TS 4.1+) =====
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getEmail: () => string }

// ===== Filtering with `as` =====
type OnlyStringProperties<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type UserStrings = OnlyStringProperties<User>;
// { name: string; email: string }
```

**Simple Explanation:**
> Mapped types let you transform an existing type into a new type by iterating over its keys. It's like `Array.map()` for types — you take each property, apply a transformation, and get a new type. This is the foundation of ALL utility types.

**Interview Tips:**
- Mapped types are the **foundation of utility types** — understanding them means you understand Partial, Readonly, Pick, Omit, and Record at a deep level
- Key remapping with `as` enables advanced type transformations like getter generation
- The syntax `[K in keyof T]` reads as "for each key K in the keys of T"

**Common Mistakes:**
- Forgetting that mapped types create a new type — they don't modify the original
- Not using `as const` with mapped types when you want literal types
- Creating mapped types that are too complex to understand

**Follow-up Questions:**
1. How would you implement `Pick<T, K>` from scratch using a mapped type?
2. What is key remapping and how does the `as` clause work?

---

### Q42 · Intermediate · Conditional Types

## How do conditional types work? What is the `infer` keyword?

**Detailed Answer:**

```typescript
// ===== Basic Conditional Type =====
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;  // true
type B = IsString<42>;       // false
type C = IsString<string>;   // true
type D = IsString<number>;   // false

// ===== Conditional Types with Constraints =====
type ExtractStrings<T> = T extends string ? T : never;
type StringsOnly = ExtractStrings<string | number | boolean | "hello">;
// "hello" — only string types survive (never is removed from unions)

// ===== The infer Keyword =====
// Extract return type:
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (x: number) => string;
type Result = MyReturnType<Fn>; // string

// Extract array element type:
type ElementType<T> = T extends (infer U)[] ? U : never;
type Items = ElementType<string[]>; // string

// Extract promise value:
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type AsyncResult = UnwrapPromise<Promise<number>>; // number

// ===== Nested infer =====
type DeepPromise<T> = T extends Promise<infer U> ? DeepPromise<U> : T;
type Nested = DeepPromise<Promise<Promise<string>>>; // string

// ===== Real-World: Infer Function Parameters =====
type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;

type Handler = (name: string, age: number) => void;
type First = FirstParameter<Handler>; // string

// ===== Distributive Conditional Types =====
// Conditional types distribute over unions automatically:
type ToArray<T> = T extends any ? T[] : never;
type ResultArr = ToArray<string | number>;
// string[] | number[] (NOT (string | number)[])

// Non-distributive version:
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type ResultArr2 = ToArrayNonDist<string | number>;
// (string | number)[]
```

**Simple Explanation:**
> Conditional types are like ternary operators at the type level: `T extends U ? X : Y`. The `infer` keyword lets you **extract** a type from within another type — like unwrapping a Promise to get its inner value.

**Interview Tips:**
- Conditional types with `infer` are the **most advanced TypeScript topic** frequently asked in senior interviews
- `infer` can only be used within conditional types (in the `extends` clause)
- Conditional types distribute over unions — this is usually what you want but can be surprising

**Common Mistakes:**
- Trying to use `infer` outside of a conditional type — it's only valid in the `extends` clause
- Not understanding distribution — `T extends U` distributes over unions of T
- Making conditional types too complex to debug

**Follow-up Questions:**
1. What does it mean that conditional types are "distributive"?
2. How would you create a type that extracts the resolved value from a nested Promise?

---

### Q43 · Intermediate · Conditional Types

## How would you implement your own utility types from scratch?

**Detailed Answer:**

```typescript
// ===== Implement MyPick =====
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// ===== Implement MyOmit =====
// Using key remapping (TS 4.1+):
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

// Older approach (works in any version):
type MyOmit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// ===== Implement MyReadonly =====
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// ===== Implement MyDeepReadonly =====
type MyDeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? MyDeepReadonly<T[P]>
    : T[P];
};

// ===== Implement MyPartial =====
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

// ===== Implement MyRequired =====
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

// ===== Implement MyRecord =====
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

// ===== Implement MyExclude =====
type MyExclude<T, U> = T extends U ? never : T;

// ===== Implement MyExtract =====
type MyExtract<T, U> = T extends U ? T : never;

// ===== Implement MyReturnType =====
type MyReturnType<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : any;

// ===== Implement MyNonNullable =====
type MyNonNullable<T> = T extends null | undefined ? never : T;

// ===== Real-World: DeepPartial =====
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Settings {
  api: { url: string; timeout: number };
  ui: { theme: "light" | "dark"; fontSize: number };
}

type PartialSettings = DeepPartial<Settings>;
// All properties become optional at every level
```

**Simple Explanation:**
> Implementing utility types from scratch is the best way to understand TypeScript's type system. Every built-in utility type can be created using mapped types, conditional types, and key remapping. This is a favorite interview topic at FAANG companies.

**Interview Tips:**
- **This is the #1 TypeScript interview question at FAANG** — implement built-in types from scratch
- Start with `Pick`, then `Readonly`, then `Exclude`, then `ReturnType`
- The `-?` syntax removes the optional modifier; `-readonly` removes readonly

**Common Mistakes:**
- Forgetting the constraint `K extends keyof T` in `MyPick`
- Not understanding distribution in `MyExclude`
- Making implementations more complex than necessary

**Follow-up Questions:**
1. Implement `Pick<T, K>` from scratch.
2. How does `-?` work in mapped types?

---

### Q44 · Intermediate · Conditional Types

## How do you use `infer` with template literal types for pattern matching?

**Detailed Answer:**

```typescript
// ===== Template Literal Type Inference =====
type ExtractPath<T> = T extends `/api/${infer Path}` ? Path : never;

type UserPath = ExtractPath<"/api/users">;       // "users"
type PostPath = ExtractPath<"/api/posts/123">;    // "posts/123"
type Invalid = ExtractPath<"/public/about">;       // never

// ===== Extract Two Parts =====
type SplitEndpoint<T> = T extends `/api/${infer Resource}/${infer Action}`
  ? { resource: Resource; action: Action }
  : never;

type UserCreate = SplitEndpoint<"/api/users/create">;
// { resource: "users"; action: "create" }

// ===== CSS Property Parser =====
type ParseCSSValue<T> = T extends `${infer Value}${"px" | "rem" | "em"}`
  ? { value: Value; unit: string }
  : never;

type Parsed = ParseCSSValue<"16px">;
// { value: "16"; unit: string }

// ===== Function Name Pattern =====
type ExtractHandler<T> = T extends `handle${infer Name}`
  ? Uncapitalize<Name>
  : never;

type ClickHandler = ExtractHandler<"handleClick">;  // "click"
type SubmitHandler = ExtractHandler<"handleSubmit">; // "submit"

// ===== String to Number =====
type StringToNumber<T extends string> = T extends `${infer N extends number}`
  ? N
  : never;

type Five = StringToNumber<"5">; // 5

// ===== Real-World: Type-safe Routing =====
type Route = "/users/:id" | "/posts/:id/comments/:commentId";

type ExtractParams<T> =
  T extends `${infer Base}/:${infer Param}`
    ? { [K in Param | keyof ExtractParams<Base>]: string }
    : {};

type UserRoute = ExtractParams<"/users/:id">;
// { id: string }

type CommentRoute = ExtractParams<"/posts/:id/comments/:commentId">;
// { id: string; commentId: string }
```

**Simple Explanation:**
> Combining `infer` with template literal types enables string pattern matching at the type level. It's like using regex to extract parts of a string, but TypeScript does it at compile time. This is extremely powerful for type-safe routing, event handling, and DSL creation.

**Interview Tips:**
- This is a **TypeScript 4.1+ feature** — mention the version for context
- Template literal inference with `infer` is used in libraries like **Zod**, **tRPC**, and **TanStack Router**
- The `${infer N extends number}` syntax requires TS 4.8+

**Common Mistakes:**
- Templates with `infer` must match the **entire string structure** — partial matches don't work
- `infer` captures the longest match, not the shortest
- Overcomplicating type-level string parsing — sometimes a union is simpler

**Follow-up Questions:**
1. How would you create a type that extracts query parameters from a URL string?
2. What's the difference between template literal inference and runtime regex?

---

### Q45 · Intermediate · Type System

## What is the `satisfies` operator (TS 4.9+)? How is it different from type annotations?

**Detailed Answer:**

```typescript
// ===== The Problem satisfies Solves =====
// Without satisfies — types are widened (lose literal info):
const palette = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
};
// palette.red is number[] — lost the tuple type!

// With satisfies — validates AND preserves:
const palette = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
} satisfies Record<string, [number, number, number]>;

// palette.red is [number, number, number] — preserved!
palette.red.map(x => x.toString()); // ✅ array methods work
// palette.red.push(100); // ❌ Error in strict mode (readonly tuple)

// ===== Key Difference: Type Annotation vs satisfies =====
// Type annotation — sets the type, widens the value:
const a: Record<string, string> = { hello: "world" };
// a.hello is string (widened)

// satisfies — validates the type, preserves the literal:
const b = { hello: "world" } satisfies Record<string, string>;
// b.hello is "world" (literal string, not widened!)

// ===== Real-World: Color Palette Validation =====
const colors = {
  primary: "#6366f1",
  secondary: "#a78bfa",
  success: "#22c55e",
  danger: "#ef4444",
} satisfies Record<string, `#${string}`>;

// Each value is validated as a hex color
// Each key keeps its literal type for autocomplete

// ===== Real-World: Component Props =====
type ComponentProps = {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
};

const buttonProps = {
  variant: "primary",
  size: "lg",
} satisfies ComponentProps;

// buttonProps.variant is "primary" (literal), not "primary" | "secondary"
// If a property is missing, TypeScript reports an error
```

**Simple Explanation:**
> `satisfies` is like a validation that says "check that this value matches this type, but don't change the value's type." Type annotations say "treat this value AS this type." With `satisfies`, you get validation AND preservation of literal types.

**Interview Tips:**
- `satisfies` is **TypeScript 4.9+ only** — mention the version
- It's perfect for configuration objects, color palettes, and constants where you want validation + literal types
- Before `satisfies`, developers used `as const` + type annotations (two-step workaround)

**Common Mistakes:**
- Using `satisfies` where a type annotation would be simpler
- Forgetting that `satisfies` doesn't change the variable's type — it only validates
- Using `satisfies` with complex nested structures can lead to confusing error messages

**Follow-up Questions:**
1. How is `satisfies` different from `as` (type assertion)?
2. When would you use `satisfies` vs a regular type annotation?

---

## 🔴 ADVANCED QUESTIONS (Q71–Q105+)

---

### Q71 · Advanced · Type System

## What are branded types and how do they simulate nominal typing?

**Detailed Answer:**

```typescript
// ===== The Problem: Structural Typing =====
// TypeScript is structurally typed — types are compatible if shapes match:
type UserId = string;
type PostId = string;
type Email = string;

function getUser(id: UserId): User { /* ... */ }
function getPost(id: PostId): Post { /* ... */ }

// 🚫 This compiles but is semantically wrong:
getUser("post-123" as PostId); // Should not be allowed!
getPost("user-456" as UserId); // Should not be allowed!

// ===== Solution: Branded Types =====
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type PostId = Brand<string, "PostId">;
type Email = Brand<string, "Email">;

function getUser(id: UserId): User { /* ... */ }
function getPost(id: PostId): Post { /* ... */ }

// ✅ Now type-safe:
getUser("abc" as UserId);  // OK
getUser("xyz" as PostId);  // ❌ Error! Type 'PostId' not assignable to 'UserId'

// ===== Opaque Type (Safer Brand) =====
declare const OpaqueBrand: unique symbol;

type Opaque<T, B> = T & { readonly [OpaqueBrand]: B };

type Email = Opaque<string, "Email">;

function createEmail(value: string): Email {
  if (!value.includes("@")) throw new Error("Invalid email");
  return value as Email;
}

function sendEmail(to: Email, body: string): void {
  console.log(`Sending to ${to}`);
}

const email = createEmail("alice@test.com");
sendEmail(email, "Hello!");  // ✅ OK
sendEmail("not-valid", "Hi"); // ❌ Error — plain string not assignable to Email

// ===== Real-World: Domain-Driven Design =====
type CustomerId = Brand<string, "CustomerId">;
type OrderId = Brand<string, "OrderId">;
type ProductSku = Brand<string, "SKU">;
type Money = Brand<number, "USD">;

interface Customer {
  id: CustomerId;
  name: string;
}

interface Order {
  id: OrderId;
  customerId: CustomerId;
  total: Money;
}

// ===== Runtime Brand Validation =====
function createUserId(id: string): UserId {
  if (!id.startsWith("usr_")) throw new Error("Invalid user ID format");
  return id as UserId;
}
```

**Simple Explanation:**
> TypeScript uses structural typing — if two types have the same shape, they're interchangeable. Branded types add a fake property (`__brand`) that exists only at compile time, making the types nominally distinct. This prevents accidentally passing a `PostId` where a `UserId` is expected.

**Interview Tips:**
- Branded types are **highly valued in enterprise TypeScript** — domain-driven design relies on them
- The `__brand` property disappears at runtime (it's erased during compilation)
- Opaque types using `unique symbol` are more secure but require a `declare const`

**Common Mistakes:**
- Forgetting that branded types only exist at compile time — runtime validation is still needed
- Making brands too complex — a simple intersection is usually enough
- Over-branding everything — only brand when the distinction matters

**Follow-up Questions:**
1. What is the difference between structural and nominal typing?
2. How do opaque types differ from simple branded types?

---

### Q72 · Advanced · Type System

## What are variadic tuple types and how do they enable function composition?

**Detailed Answer:**

```typescript
// ===== Variadic Tuple Types (TS 4.0+) =====
// Capture and spread unknown numbers of types:

// BEFORE — needed overloads for each arity:
function concat(arr1: number[], arr2: number[]): number[];
function concat(arr1: string[], arr2: string[]): string[];
// ... more overloads needed

// AFTER — single generic with variadic tuple:
function concat<T extends unknown[], U extends unknown[]>(
  arr1: [...T],
  arr2: [...U]
): [...T, ...U];

const result = concat([1, 2], ["hello", "world"]);
// type: [number, number, string, string]

// ===== Leading, Middle, Rest =====
type Leading<T extends unknown[]> = T extends [infer F, ...unknown[]] ? F : never;
type Rest<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never;

// ===== Type-Safe curry =====
function curry<T extends unknown[], R>(
  fn: (...args: T) => R
): <A extends Partial<T>>(
  ...args: A
) => A["length"] extends T["length"]
  ? R
  : (...args: DropFirst<T, A["length"]>) => R;

// ===== Real-World: Event Emitter with Variadic Args =====
type EventArgs = {
  userCreated: [name: string, age: number];
  userDeleted: [id: string];
  error: [message: string, code: number, details?: Record<string, unknown>];
};

class TypedEmitter<T extends Record<string, unknown[]>> {
  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    console.log(`Event: ${String(event)}`, ...args);
  }

  on<K extends keyof T>(event: K, handler: (...args: T[K]) => void): void {
    // Register handler
  }
}

const emitter = new TypedEmitter<EventArgs>();
emitter.emit("userCreated", "Alice", 30); // ✅ typed args
emitter.emit("error", "Not found", 404);   // ✅ typed args
// emitter.emit("userCreated", "Alice");   // ❌ Error: missing age
```

**Simple Explanation:**
> Variadic tuple types let you capture and manipulate tuples of unknown length using `...` at the type level. Before this feature, you needed overloads for each possible tuple length. Now you can write a single generic that works with any arity.

**Interview Tips:**
- Variadic tuple types are **TypeScript 4.0+** and are essential for typing `concat`, `zip`, and function composition utilities
- The syntax `[...T, ...U, ...V]` can chain multiple spread types
- Libraries like **TanStack Query**, **tRPC**, and **Zod** use variadic tuples extensively

**Common Mistakes:**
- Not realizing `[...T]` creates a copy — it doesn't mutate the original type
- Using variadic tuples when simpler function overloads would suffice
- Getting lost in complex type inference — sometimes explicit types are clearer

**Follow-up Questions:**
1. How would you type a `zip` function that combines two tuples?
2. What's the difference between `[string, ...number[]]` and `[...string[], number]`?

---

### Q73 · Advanced · Type System

## What are recursive types and how do you create them safely?

**Detailed Answer:**

```typescript
// ===== Basic Recursive Type =====
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];  // Self-referential
}

const tree: TreeNode<number> = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 4, children: [] },
        { value: 5, children: [] },
      ],
    },
    { value: 3, children: [] },
  ],
};

// ===== JSON Value — The Classic Recursive Type =====
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// Works for any JSON structure:
const json: JSONValue = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "coding"],
  address: {
    city: "NYC",
    zip: null,
    coordinates: { lat: 40.7, lng: -74.0 },
  },
};

// ===== DeepPartial Implementation =====
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  api: { url: string; timeout: number };
  ui: { theme: "light" | "dark"; fontSize: number };
}

type PartialConfig = DeepPartial<Config>;
// All properties optional at every level

// ===== DeepReadonly Implementation =====
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};

// ===== Recursive Utility for Nested Promise =====
type DeepAwaited<T> = T extends Promise<infer U> ? DeepAwaited<U> : T;

type NestedPromise = Promise<Promise<string>>;
type Resolved = DeepAwaited<NestedPromise>; // string

// ===== Recursive Comment Tree =====
interface Comment {
  id: string;
  text: string;
  author: string;
  replies: Comment[];  // Self-referential
}

// ===== Caution: TypeScript Recursion Limits =====
// TypeScript has a recursion depth limit (~50-100 levels)
// Be careful with deeply recursive mapped types
// Consider using iterative approaches for very deep structures
```

**Simple Explanation:**
> TypeScript supports recursively-defined types — types that reference themselves. This is essential for modeling trees, nested JSON, and deeply nested configurations. However, TypeScript has recursion limits to prevent infinite type instantiation.

**Interview Tips:**
- Recursive types are essential for **trees**, **JSON**, **deep immutability**, and **nested promises**
- TypeScript's recursion depth limit is typically around 50 levels — design accordingly
- The `JSONValue` type is the classic recursive type interview question

**Common Mistakes:**
- Creating infinitely recursive types that crash the compiler
- Forgetting the base case in recursive mapped types
- Using recursion for structures that could be simpler (flat vs nested)

**Follow-up Questions:**
1. What is the JSONValue type and why is it recursive?
2. How would you implement DeepPartial from scratch?

---

### Q74 · Advanced · Type System

## How do you create type-safe builders and fluent APIs in TypeScript?

**Detailed Answer:**

```typescript
// ===== Fluent Builder with `this` =====
class QueryBuilder<T> {
  private conditions: string[] = [];
  private orderByField?: string;
  private limitCount?: number;

  where(condition: string): this {
    this.conditions.push(condition);
    return this; // Returns `this` for chaining
  }

  orderBy(field: string): this {
    this.orderByField = field;
    return this;
  }

  limit(n: number): this {
    this.limitCount = n;
    return this;
  }

  build(): string {
    // Build and return query string
    return "";
  }
}

const query = new QueryBuilder<User>()
  .where("age > 18")
  .where("active = true")
  .orderBy("name")
  .limit(10)
  .build();

// ===== Generic Query Builder with Types =====
class TableQueryBuilder<T extends Record<string, unknown>> {
  private table: string;
  private selected: (keyof T)[] = [];
  private conditions: Partial<T> = {};

  constructor(table: string) {
    this.table = table;
  }

  select<K extends keyof T>(...fields: K[]): this {
    this.selected = fields;
    return this;
  }

  where(condition: Partial<T>): this {
    Object.assign(this.conditions, condition);
    return this;
  }

  async execute(): Promise<Pick<T, typeof this.selected[number]>[]> {
    // Execute query
    return [];
  }
}

// Usage is fully typed:
await new TableQueryBuilder<User>("users")
  .select("name", "email")  // Only valid User keys
  .where({ isActive: true })  // Only valid User properties
  .execute();

// ===== TypeScript Type Builder Pattern =====
// Use `as` to build types step by step:
type UserState = {
  name: string;
  email: string;
  age: number;
};

type UserBuilder<Keys extends keyof UserState = never> = {
  [K in Exclude<keyof UserState, Keys>]: (
    value: UserState[K]
  ) => UserBuilder<Keys | K>;
} & {
  build(): Pick<UserState, Keys>;
};

function createUserBuilder(): UserBuilder {
  const state: Partial<UserState> = {};
  const builder = new Proxy({} as any, {
    get: (target, prop) => {
      if (prop === "build") return () => state;
      return (value: any) => {
        state[prop as keyof UserState] = value;
        return builder;
      };
    },
  });
  return builder;
}

// Usage — TypeScript guides you through the builder:
const user = createUserBuilder()
  .name("Alice")    // type-safe, only `name` available
  .email("a@b.com") // `name` and `email` available (not `age` yet)
  .age(30)          // all fields set now
  .build();         // `build()` available only after all required fields set
```

**Simple Explanation:**
> Type-safe builders use method chaining (returning `this`) to create fluent APIs. Advanced builders can track which properties have been set using type parameter accumulators, preventing `build()` from being called until all required fields are provided.

**Interview Tips:**
- The `return this` pattern is the simplest form — works for most enterprise builders
- Advanced "completion" builders (that track which fields have been set) are a **senior+ interview topic**
- The builder pattern is used extensively in **Prisma**, **Zod**, **tRPC**, and **TanStack Query**

**Common Mistakes:**
- Returning `this` not typed correctly — always use `this` as the return type
- Making builders too complex — the simple `this` pattern is usually enough
- Not using the builder pattern when a simple object constructor would work

**Follow-up Questions:**
1. Why should the builder method return `this` instead of the class type?
2. How would you create a builder that requires certain fields to be set before build?

---

### Q75 · Advanced · Type Safety Patterns

## How do you type dynamic object keys and property access in TypeScript?

**Detailed Answer:**

```typescript
// ===== Record Pattern for Dynamic Keys =====
type PageInfo = { title: string; url: string };
type PageMap = Record<string, PageInfo>;

const pages: PageMap = {
  home: { title: "Home", url: "/" },
  about: { title: "About", url: "/about" },
};

// ===== Constrained Dynamic Keys =====
type AllowedKeys = "home" | "about" | "contact";
type ConstrainedMap = Partial<Record<AllowedKeys, PageInfo>>;

const nav: ConstrainedMap = {
  home: { title: "Home", url: "/" },
  about: { title: "About", url: "/about" },
  // contact is optional — not required
};

// ===== Template Literal Keys =====
type RouteParams = {
  [K in `/api/${string}`]: () => Promise<unknown>;
};

// ===== Real-World: Form Error Collection =====
type FormValues = {
  name: string;
  email: string;
  age: number;
};

// Type-safe errors where keys match form fields:
type FormErrors<T> = Partial<Record<keyof T, string>>;

const errors: FormErrors<FormValues> = {
  name: "Name is required",
  email: "Invalid email",
  // age: 123, // ❌ Error — age expects string
};

// ===== Dynamic Property Access =====
function getNested<T, K1 extends keyof T>(obj: T, key1: K1): T[K1];
function getNested<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  obj: T, key1: K1, key2: K2
): T[K1][K2];
function getNested<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  obj: T, key1: K1, key2: K2, key3: K3
): T[K1][K2][K3];
function getNested(obj: any, ...keys: string[]): any {
  return keys.reduce((acc, key) => acc?.[key], obj);
}

const data = { user: { profile: { name: "Alice" } } };
const name = getNested(data, "user", "profile", "name"); // type: string (if overload matches)

// ===== Type-safe Object.keys =====
// Object.keys returns string[] by default — lose key types:
const keys = Object.keys(data); // string[] 😢

// Type-safe version:
function typedKeys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

const safeKeys = typedKeys({ name: "Alice", age: 30 }); // ("name" | "age")[]
```

**Simple Explanation:**
> Dynamic keys in TypeScript require balance between flexibility and type safety. `Record<K, T>` is great for known patterns. `Partial<Record<K, T>>` is best for optional dynamic keys. Template literal types enable pattern-matched keys.

**Interview Tips:**
- `Object.keys()` returns `string[]` for a reason — objects can have extra properties at runtime
- Use `Record<string, T>` when you truly don't know the keys, use `keyof T` when you do
- Template literal keys (`/api/${string}`) are powerful for route typing

**Common Mistakes:**
- Using unsafe type assertions with `Object.keys()`
- Creating overly restrictive dynamic key types that break with real-world data
- Forgetting that index signatures and specific property types must be compatible

**Follow-up Questions:**
1. Why does `Object.keys()` return `string[]` instead of `(keyof T)[]`?
2. How would you type a map that returns different value typesbased on the key?

---

### Q76 · Advanced · Type Safety Patterns

## How do you type error handling patterns in TypeScript? (Result type, discriminated errors)

**Detailed Answer:**

```typescript
// ===== Custom Error Classes =====
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`, "NOT_FOUND", 404);
  }
}

class ValidationError extends AppError {
  constructor(errors: Record<string, string[]>) {
    super("Validation failed", "VALIDATION_ERROR", 400, { fields: errors });
  }
}

// ===== Result Type Pattern (Rust-style) =====
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseJSON<T>(json: string): Result<T> {
  try {
    return { ok: true, value: JSON.parse(json) as T };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}

// Usage:
const result = parseJSON<User>('{"name":"Alice"}');
if (result.ok) {
  console.log(result.value.name); // ✅ Safe access
} else {
  console.error(result.error.message); // ✅ Error access
}

// ===== Async Result Pattern =====
type AsyncResult<T, E = Error> = Promise<[T | null, E | null]>;

async function tryCatch<T>(fn: () => Promise<T>): AsyncResult<T> {
  try {
    return [await fn(), null];
  } catch (error) {
    return [null, error as Error];
  }
}

// Usage:
const [user, error] = await tryCatch(() => fetchUser("123"));
if (error) {
  console.error(error.message);
} else {
  console.log(user!.name); // user is non-null when error is null
}

// ===== Discriminated Union for API Responses =====
type ApiResponse<T> =
  | { status: "success"; data: T; timestamp: string }
  | { status: "error"; error: { code: string; message: string } }
  | { status: "loading" }
  | { status: "idle" };

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case "success":
      return response.data; // typed as T
    case "error":
      return response.error.message; // typed error object
    case "loading":
      return "Loading...";
    case "idle":
      return "Idle";
  }
}
```

**Simple Explanation:**
> Typed error handling in TypeScript uses **discriminated unions** to model success/failure states. The Result pattern (from Rust) is gaining popularity because it makes error handling explicit and type-safe. Custom Error classes preserve error context across the application.

**Interview Tips:**
- The Result pattern is **standard in Rust, Haskell, and now TypeScript** — big companies love it
- Discriminated error unions are safer than try/catch because they make errors explicit in the type signature
- Custom error classes with `instanceof` checks are better than error codes

**Common Mistakes:**
- Throwing errors with generic `Error` — always use typed error classes
- Not handling all states in discriminated error unions
- Using `any` in catch blocks — errors are typed as `unknown` in strict mode for a reason

**Follow-up Questions:**
1. Why is the Result pattern better than throwing exceptions?
2. How would you create a discriminated union for loading/success/error states?

---

### Q77 · Advanced · Framework Integration

## How do you type React hooks with TypeScript? (useState, useRef, useReducer, custom hooks)

**Detailed Answer:**

```tsx
// ===== useState — Provide generics for complex state =====
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// TypeScript infers primitives correctly:
const [name, setName] = useState(""); // string

// ===== useRef — Two different patterns =====
// DOM ref (null initial value → readonly):
const inputRef = useRef<HTMLInputElement>(null);
// inputRef.current is HTMLInputElement | null (readonly)

// Mutable value ref:
const countRef = useRef<number>(0);
countRef.current = 5; // Mutable

// ===== useReducer — Typed actions =====
type Action =
  | { type: "increment"; payload?: number }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "setCount"; payload: number };

interface State { count: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + (action.payload ?? 1) };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    case "setCount":
      return { count: action.payload };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
// dispatch({ type: "increment" }); // ✅
// dispatch({ type: "unknown" });   // ❌ Error

// ===== Generic Custom Hook =====
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setData(json as T);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Usage — fully typed:
const { data: users, loading } = useApi<User[]>("/api/users");
// users is User[] | null ✅
```

**Simple Explanation:**
> React hooks + TypeScript are all about providing the right generic type parameters. `useState` needs the type for complex state. `useReducer` needs a discriminated union for actions. `useRef` has two patterns — DOM refs and mutable values. Custom hooks use generics to remain flexible while preserving type safety.

**Interview Tips:**
- `useState` with complex objects always needs a generic: `useState<User | null>(null)`
- `useReducer` with discriminated unions is **THE pattern** for complex state management
- Custom hooks should use generics to be reusable while maintaining type safety
- `useRef<HTMLInputElement>(null)` is the standard pattern for DOM refs

**Common Mistakes:**
- Forgetting to provide a type to `useState<User | null>(null)` — defaults to `null | undefined`
- Using `useRef` for mutable values without realizing it's readonly with initial `null`
- Not using discriminated unions with `useReducer` — leads to action type errors

**Follow-up Questions:**
1. Why is `useRef<HTMLInputElement>(null)` readonly, but `useRef(0)` is mutable?
2. How would you type a custom hook that returns multiple state values?

---

### Q78 · Advanced · Framework Integration

## How do you type Angular services with TypeScript? (CRUD patterns, generic services)

**Detailed Answer:**

```typescript
// ===== Typed HTTP Service =====
@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/users");
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  createUser(data: Omit<User, "id" | "createdAt">): Observable<User> {
    return this.http.post<User>("/api/users", data);
  }

  updateUser(id: number, changes: Partial<User>): Observable<User> {
    return this.http.patch<User>(`/api/users/${id}`, changes);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`);
  }
}

// ===== Generic CRUD Service =====
export class CrudService<T extends { id: number }> {
  constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<T, "id">): Observable<T> {
    return this.http.post<T>(this.baseUrl, data);
  }

  update(id: number, changes: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// ===== Concrete Service =====
interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

@Injectable({ providedIn: "root" })
export class ProductService extends CrudService<Product> {
  constructor(http: HttpClient) {
    super(http, "/api/products");
  }

  // Add product-specific methods:
  getByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?categoryId=${categoryId}`);
  }
}

// ===== Typed Reactive Forms (Angular 14+) =====
interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number | null>;
  role: FormControl<"user" | "admin">;
  address: FormGroup<{
    street: FormControl<string>;
    city: FormControl<string>;
    zip: FormControl<string>;
  }>;
}

const form = new FormGroup<UserForm>({
  name: new FormControl("", { nonNullable: true }),
  email: new FormControl("", { nonNullable: true }),
  age: new FormControl(null),
  role: new FormControl("user", { nonNullable: true }),
  address: new FormGroup({
    street: new FormControl("", { nonNullable: true }),
    city: new FormControl("", { nonNullable: true }),
    zip: new FormControl("", { nonNullable: true }),
  }),
});

// Typed value access — full type safety:
const values = form.value; // knows the shape!
```

**Simple Explanation:**
> Angular's TypeScript integration is deep because Angular was built with TypeScript from day one. Services use generics for CRUD patterns. Reactive forms have full type support in Angular 14+. The generic service pattern eliminates boilerplate while preserving type safety.

**Interview Tips:**
- Angular's `HttpClient` provides type generics: `this.http.get<T>(url)` returns `Observable<T>`
- The generic CRUD service pattern eliminates 90% of service boilerplate
- Angular 14+ typed forms (`FormGroup<{...}>`) provide end-to-end type safety

**Common Mistakes:**
- Not providing the generic type to `HttpClient` methods — defaults to `Object`
- Making the generic service too flexible — constrain `T` as needed
- Using `any` for Angular forms — typed forms exist since Angular 14

**Follow-up Questions:**
1. How does Angular's `HttpClient` infer types from the generic parameter?
2. What are the benefits of typed reactive forms in Angular 14+?

---

### Q79 · Advanced · Framework Integration

## How do you type Express.js middleware and request handlers with TypeScript?

**Detailed Answer:**

```typescript
import express, { Request, Response, NextFunction } from "express";

// ===== Typed Request and Response =====
interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

interface UserParams {
  id: string;
}

// Typed request with generics:
type CreateUserRequest = Request<{}, {}, CreateUserDto>;
type GetUserRequest = Request<UserParams>;

app.post("/users", (req: CreateUserRequest, res: Response) => {
  const { name, email } = req.body; // ✅ Fully typed
  // password is also available but shouldn't be exposed
});

app.get("/users/:id", (req: GetUserRequest, res: Response) => {
  const { id } = req.params; // ✅ Fully typed as string
});

// ===== Augmenting Express Request =====
// types/express.d.ts
import "express";

declare module "express" {
  interface Request {
    user?: { id: string; role: string };
    requestId: string;
    startTime: number;
  }
}

// Now Request.user is available everywhere with full typing:
app.get("/me", (req, res) => {
  console.log(req.user?.id); // ✅ Typed
  console.log(req.requestId); // ✅ Typed
});

// ===== Typed Middleware =====
interface AuthenticatedRequest extends Request {
  user: { id: string; role: string };
}

function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  (req as AuthenticatedRequest).user = { id: "123", role: "admin" };
  next();
}

// ===== Generic Middleware type =====
type Middleware = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

// ===== Error Middleware (4 params) =====
interface ErrorMiddleware {
  (err: Error, req: Request, res: Response, next: NextFunction): void;
}

const errorHandler: ErrorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
};
```

**Simple Explanation:**
> Express type safety centers around the generic parameters of `Request<Params, ResBody, ReqBody, Query>`. Module augmentation lets you extend Express's types (like adding `user` to `Request`). Middleware types follow specific patterns — regular middleware has 3 params, error middleware has 4.

**Interview Tips:**
- The Express `Request` type has 4 generic parameters — most important are `Params` and `ReqBody`
- **Module augmentation** (`declare module "express"`) is the standard way to extend Express types
- Error middleware must have exactly 4 parameters to be recognized by Express

**Common Mistakes:**
- Not using the `Request` generic types — defaults to `any` for params/body
- Forgetting that `req.user` augmentation requires a `.d.ts` file with `declare module`
- Not typing middleware correctly (3 vs 4 parameters for error middleware)

**Follow-up Questions:**
1. How does module augmentation work to extend Express Request?
2. How would you create a typed validation middleware using generics?

---

### Q80 · Advanced · Patterns

## How do you create type-safe API clients and fetchers in TypeScript?

**Detailed Answer:**

```typescript
// ===== Generic API Client =====
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`);
    if (!res.ok) throw new ApiError(res.status, await res.text());
    return res.json();
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new ApiError(res.status, await res.text());
    return res.json();
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new ApiError(res.status, await res.text());
    return res.json();
  }

  async delete<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new ApiError(res.status, await res.text());
    return res.json();
  }
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// ===== Typed API Endpoints =====
interface ApiEndpoints {
  "/users": {
    get: User[];
    post: CreateUserDto;
    response: User;
  };
  "/users/:id": {
    get: User;
    patch: Partial<User>;
    response: User;
  };
  "/posts": {
    get: Post[];
    post: CreatePostDto;
    response: Post;
  };
}

// ===== Type-Safe Fetch Wrapper =====
function createApi<Endpoints extends Record<string, unknown>>(
  baseUrl: string
) {
  const client = new ApiClient(baseUrl);

  return {
    get: <Path extends keyof Endpoints>(
      path: Path,
      params?: Record<string, string>
    ): Promise<Endpoints[Path]> => {
      const url = params
        ? `${String(path)}?${new URLSearchParams(params)}`
        : String(path);
      return client.get<Endpoints[Path]>(url);
    },

    post: <Path extends keyof Endpoints>(
      path: Path,
      body: unknown
    ): Promise<Endpoints[Path]> => {
      return client.post<Endpoints[Path]>(String(path), body);
    },
  };
}

const api = createApi<ApiEndpoints>("/api");

// Usage — fully typed:
const users = await api.get("/users");
// users is User[] ✅

// ===== DTO Pattern for API Boundaries =====
interface ApiUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
}

// What the frontend receives (no sensitive data):
type PublicUser = Omit<ApiUser, "password_hash">;

// What the frontend sends:
type CreateUserPayload = Omit<ApiUser, "id" | "created_at" | "password_hash"> & {
  password: string;
};
```

**Simple Explanation:**
> A type-safe API client uses generics to capture the response type at each endpoint. The DTO (Data Transfer Object) pattern defines separate types for each API boundary — one for database, one for API response, one for request payload — ensuring sensitive data never leaks.

**Interview Tips:**
- The generic client pattern is used by **tRPC**, **TanStack Query**, **RTK Query**, and **urql**
- DTOs (Data Transfer Objects) are the standard enterprise pattern for API boundary typing
- `Omit<ApiUser, "password_hash">` prevents accidental data leaks

**Common Mistakes:**
- Reusing database types directly in API responses (password hashes leak!)
- Not creating separate DTOs for create vs update operations
- Using `any` in API client implementations

**Follow-up Questions:**
1. Why should you have separate types for DB entities, API responses, and API requests?
2. How would you handle typed error responses in a generic API client?

---

### Q81 · Advanced · Patterns

## How do you type state machines and finite state machines in TypeScript?

**Detailed Answer:**

```typescript
// ===== Simple State Machine =====
type State = "idle" | "loading" | "success" | "error";

type Transition = {
  idle: "loading";
  loading: "success" | "error";
  success: "idle";
  error: "idle";
};

function transition<S extends State>(
  current: S,
  next: Transition[S]
): Transition[S] {
  return next;
}

const state1 = transition("idle", "loading"); // type: "loading"
const state2 = transition("loading", "success"); // type: "success"
// transition("idle", "success"); // ❌ Error: invalid transition

// ===== Full Typed State Machine =====
interface StateMachine<
  S extends string,
  T extends Record<S, S[]>
> {
  current: S;
  transition: <From extends S>(
    to: Extract<T[From][number], string>
  ) => void;
  can: <From extends S>(to: Extract<T[From][number], string>) => boolean;
}

function createMachine<
  S extends string,
  T extends Record<S, S[]>
>(initial: S, transitions: T): StateMachine<S, T> {
  let current = initial;

  return {
    get current() { return current; },
    transition(to) {
      const allowed = transitions[current as keyof T];
      if (allowed?.includes(to)) {
        current = to as S;
      }
    },
    can(to) {
      const allowed = transitions[current as keyof T];
      return allowed?.includes(to) ?? false;
    },
  };
}

const machine = createMachine("idle", {
  idle: ["loading"],
  loading: ["success", "error"],
  success: ["idle"],
  error: ["idle"],
} as const);

// Usage:
machine.transition("loading"); // ✅ Valid
// machine.transition("success"); // ❌ Can't go from idle to success directly

// ===== State Machine with Payloads =====
type StateWithData =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; data: User[] }
  | { state: "error"; error: string };

function useApi<T>() {
  const [state, setState] = useState<StateWithData>({ state: "idle" });

  const fetchData = async (url: string) => {
    setState({ state: "loading" });
    try {
      const data = await fetch(url).then(r => r.json());
      setState({ state: "success", data });
    } catch (err) {
      setState({ state: "error", error: (err as Error).message });
    }
  };

  return { state, fetchData };
}
```

**Simple Explanation:**
> Type-safe state machines model valid state transitions at the type level. The `Transition` type maps each state to its allowed next states. Combined with discriminated unions, state machines ensure that you can only access state-specific data (like `data` when `success`, `error` when `error`).

**Interview Tips:**
- State machines with discriminated unions are **extremely popular in frontend interviews**
- The pattern prevents illegal state transitions at compile time
- Libraries like **XState** and **Zustand** leverage this pattern

**Common Mistakes:**
- Using simple booleans for complex state (isLoading, isError, isSuccess → exclusive states)
- Not using discriminated unions with state payloads
- Creating too many states — keep state machines focused

**Follow-up Questions:**
1. Why are state machines better than multiple boolean flags?
2. How would you create a general-purpose state machine type?

---

### Q82 · Advanced · Patterns

## How do you type Redux-like reducers and state management in TypeScript?

**Detailed Answer:**

```typescript
// ===== Typed Redux Actions =====
type Action =
  | { type: "ADD_TODO"; payload: { text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: number } }
  | { type: "DELETE_TODO"; payload: { id: number } }
  | { type: "SET_FILTER"; payload: FilterType };

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

// ===== Typed Reducer =====
function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            text: action.payload.text,
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload.id
        ),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
  }
}

// ===== Action Creator Pattern =====
const addTodo = (text: string): Action => ({
  type: "ADD_TODO",
  payload: { text },
});

const toggleTodo = (id: number): Action => ({
  type: "TOGGLE_TODO",
  payload: { id },
});

// ===== Generic Reducer Type =====
type Reducer<S, A extends { type: string }> = (state: S, action: A) => S;

const createStore = <S, A extends { type: string }>(
  reducer: Reducer<S, A>,
  initialState: S
) => {
  let state = initialState;
  const listeners: (() => void)[] = [];

  return {
    getState: () => state,
    dispatch: (action: A) => {
      state = reducer(state, action);
      listeners.forEach((l) => l());
    },
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      };
    },
  };
};

const store = createStore(todoReducer, { todos: [], filter: "all" });
store.dispatch(addTodo("Learn TypeScript"));
console.log(store.getState()); // ✅ Fully typed
```

**Simple Explanation:**
> Redux-style reducers are the classic TypeScript discriminated union pattern. Each action type has a unique `type` property and a typed `payload`. The reducer switches on `action.type` and TypeScript narrows the action type in each case, providing full type safety for the payload.

**Interview Tips:**
- Discriminated union actions + switch narrowing is **THE pattern** for typed state management
- Action creators can be typed to return specific action types
- The generic store pattern demonstrates how libraries like Redux and Zustand work internally

**Common Mistakes:**
- Forgetting to handle all action types in the reducer (use exhaustiveness checking!)
- Not using discriminated unions — using string enums without payload differentiation
- Mutating state directly in the reducer

**Follow-up Questions:**
1. Why must reducers be pure functions?
2. How would you add middleware support to the generic store?

---

### Q83 · Advanced · TypeScript Architecture

## How do you structure a large TypeScript project? (Project references, barrel files, monorepos)

**Detailed Answer:**

```typescript
// ===== Project References (tsconfig.json) =====
// Root tsconfig.json:
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true
  },
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/api" },
    { "path": "./packages/web" },
    { "path": "./packages/shared" }
  ]
}

// packages/core/tsconfig.json:
{
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}

// ===== Barrel Files (index.ts) =====
// src/types/index.ts — re-exports all types
export * from "./user";
export * from "./post";
export * from "./api";
export * from "./common";

// Import from barrel:
// import { User, Post, ApiResponse } from "../types";

// ⚠️ Barrel files can cause circular dependencies — use with care!

// ===== Type-Only Imports/Exports =====
// Import only the type (not the value at runtime):
import type { User } from "./types";

// Export only the type:
export type { User } from "./types";

// ===== Namespace Pattern (Pre-ES6 modules) =====
namespace App.Utils {
  export function formatDate(date: Date): string {
    return date.toISOString();
  }
}
// Usage: App.Utils.formatDate(new Date())

// ===== Module Augmentation for Third-Party Types =====
// types/express.d.ts
import "express";

declare module "express" {
  interface Request {
    user?: { id: string; role: string };
  }
}

// ===== Organization Strategies =====
/*
src/
├── types/           # Shared interfaces and types
│   ├── index.ts     # Barrel export
│   ├── user.ts
│   └── api.ts
├── services/        # Business logic
│   ├── user.service.ts
│   └── auth.service.ts
├── repositories/    # Data access layer
│   └── user.repository.ts
├── controllers/     # HTTP handlers (Express)
├── middleware/       # Express middleware
├── utils/           # Utility functions
└── config/          # Configuration types and values
*/

// ===== Path Aliases (tsconfig.json) =====
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@types/*": ["src/types/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@/*": ["src/*"]
    }
  }
}

// Now import from aliases:
// import { User } from "@types/user";
// import { UserService } from "@services/user.service";
```

**Simple Explanation:**
> Large TypeScript projects need structure. Project references enable incremental builds across packages. Barrel files (`index.ts`) simplify imports. Type-only imports prevent runtime bloat. Path aliases make imports cleaner. Module augmentation extends third-party types.

**Interview Tips:**
- **Project references** are TypeScript's solution for monorepos — they enable incremental builds
- Type-only imports (`import type`) were introduced in TS 3.8 — they're erased at compile time
- Avoid deep nesting of barrel files — they cause circular dependency issues

**Common Mistakes:**
- Creating circular dependencies through barrel files
- Not using `import type` for type-only imports (adds runtime bloat)
- Configuring path aliases in tsconfig but not in the build tool (Vite, Webpack)
- Putting too many files in a single barrel file

**Follow-up Questions:**
1. What are the benefits of project references in TypeScript?
2. Why should you use `import type` instead of regular `import` for types?

---

### Q84 · Advanced · TypeScript 5.x Features

## What are the key TypeScript 5.x features?

**Detailed Answer:**

```typescript
// ===== TypeScript 5.0: const Type Parameters =====
function getConfig<const T extends readonly string[]>(items: T): T {
  return items;
}

const config = getConfig(["a", "b", "c"]);
// Before 5.0: string[]
// After 5.0:  readonly ["a", "b", "c"] — literal types preserved!

// ===== TypeScript 5.0: Multiple Inheritance for Performance =====
interface A { a: string }
interface B { b: number }
interface C { c: boolean }

// Before 5.0 — intersection types were slow:
type D = A & B & C;

// After 5.0 — interfaces extend better:
interface E extends A, B, C {} // Faster compilation

// ===== TypeScript 5.1: Easier Implicit Returns =====
// Before 5.1:
function fn(): undefined { return; }
function fn2(): undefined { return undefined; }

// After 5.1:
function fn3(): undefined { } // No explicit return needed!

// ===== TypeScript 5.2: `using` Declarations =====
// Explicit resource management:
{
  const getResource = () => ({ [Symbol.dispose]: () => console.log("cleanup") });
  using resource = getResource();
  // resource is automatically disposed when leaving scope
}

// ===== TypeScript 5.3: Import Attributes =====
import data from "./data.json" with { type: "json" };

// ===== TypeScript 5.4: Improved Narrowing =====
function process(value: string | number | boolean) {
  if (typeof value === "string") return value; // narrowed to string
  if (typeof value === "number") return value.toFixed(2);
  return value; // narrowed to boolean
}

// ===== TypeScript 5.5: Inferred Type Predicates =====
// Before 5.5 — needed manual type guard:
function isString(x: unknown): x is string {
  return typeof x === "string";
}

// After 5.5 — TypeScript infers the type predicate:
function isString2(x: unknown) {
  return typeof x === "string";
}
// No `x is string` annotation needed — TypeScript infers it!

// ===== TypeScript 5.5: Control Flow Narrowing for Computed Properties =====
const key = "name" as const;
function getValue(obj: Record<string, unknown>) {
  if (typeof obj[key] === "string") {
    return obj[key]; // narrowed to string!
  }
}

// ===== TypeScript 5.6: Iterator Helpers =====
const iter = [1, 2, 3].values();
const doubled = iter.map((x) => x * 2); // Iterator helpers!
```

**Simple Explanation:**
> TypeScript 5.x brings significant improvements: `const` type parameters preserve literal types in generic functions, `using` declarations enable automatic resource cleanup (like C#'s `using` or Python's `with`), and type predicate inference reduces manual annotations.

**Interview Tips:**
- **`const` type parameters** (TS 5.0) are a game-changer for configuration arrays and tuples
- **`using` declarations** (TS 5.2) bring resource management to JavaScript — relevant for file handles, DB connections
- TypeScript 5.x focuses on developer experience improvements over new type features

**Common Mistakes:**
- Not knowing which TypeScript version introduced key features
- Using 5.x features in codebases that target older versions
- Forgetting the `with { type: "json" }` attribute for JSON imports

**Follow-up Questions:**
1. How do `const` type parameters differ from regular generics?
2. How do `using` declarations work with `Symbol.dispose`?

---

### Q85 · Advanced · Testing TypeScript

## How do you test TypeScript types? What are type-level tests?

**Detailed Answer:**

```typescript
// ===== Type-Level Testing with Expect Type =====
// Utility types for type testing:
type Expect<T extends true> = T;
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false;
type NotEqual<A, B> = true extends Equal<A, B> ? false : true;

// ===== Test Your Types =====
type Test1 = Expect<Equal<string, string>>; // ✅ Passes
type Test2 = Expect<Equal<string, number>>; // ❌ Error
type Test3 = Expect<Equal<ReturnType<() => string>, string>>; // ✅ Passes

// ===== Testing Utility Types =====
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };

interface User {
  name: string;
  age: number;
  email: string;
}

// Type-level tests:
type PickTest1 = Expect<Equal<
  MyPick<User, "name" | "email">,
  { name: string; email: string }
>>;

type PickTest2 = Expect<Equal<
  MyPick<User, "age">,
  { age: number }
>>;

// ===== Testing Conditional Types =====
type MyExclude<T, U> = T extends U ? never : T;

type ExcludeTest1 = Expect<Equal<
  MyExclude<"a" | "b" | "c", "a">,
  "b" | "c"
>>;

type ExcludeTest2 = Expect<Equal<
  MyExclude<string | number | boolean, string>,
  number | boolean
>>;

// ===== Testing Generic Functions =====
function identity<T>(value: T): T {
  return value;
}

const identityResult1 = identity("hello");
type IdentityTest1 = Expect<Equal<typeof identityResult1, string>>;

const identityResult2 = identity(42);
type IdentityTest2 = Expect<Equal<typeof identityResult2, number>>;

// ===== Testing Complex Types =====
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepReadonly<T[K]>
    : T[K];
};

interface NestedConfig {
  api: { url: string; timeout: number };
  ui: { theme: "light" | "dark" };
}

type DeepReadonlyConfig = DeepReadonly<NestedConfig>;

// Test deep readonly:
type DeepReadonlyTest = Expect<Equal<
  DeepReadonlyConfig,
  {
    readonly api: { readonly url: string; readonly timeout: number };
    readonly ui: { readonly theme: "light" | "dark" };
  }
>>;

// ===== Compile-Time Testing with tsd =====
// npm install tsd --dev
// expectType, expectError, expectAssignable

// expectType<string>("hello"); // ✅ Passes
// expectType<number>("hello"); // ❌ Error at compile time
// expectError((1 as string));  // ✅ Passes — expects error
```

**Simple Explanation:**
> Type-level testing uses TypeScript's type system to verify that utility types, conditional types, and generic functions produce the correct types. The `Equal<A, B>` type checks for exact type equality, while `Expect<T extends true>` ensures the check passes.

**Interview Tips:**
- Type-level testing is **standard practice in open-source TypeScript libraries**
- The `Equal<A, B>` type uses a trick with function signatures to check for exact equality
- Tools like `tsd` provide a more ergonomic API for type testing

**Common Mistakes:**
- Using simple `extends` checks instead of exact `Equal` checks
- Not testing edge cases (null, undefined, empty objects)
- Forgetting to test that invalid types produce errors

**Follow-up Questions:**
1. How does the `Equal<A, B>` type work internally?
2. What is `tsd` and how does it help with type testing?

---

### Q86 · Advanced · TypeScript Performance

## How do you optimize TypeScript compilation performance?

**Detailed Answer:**

```json
// ===== tsconfig.json Performance Settings =====
{
  "compilerOptions": {
    // Skipping unnecessary checks:
    "skipLibCheck": true,           // Skip .d.ts checking (huge speedup)
    "skipDefaultLibCheck": true,    // Skip default library checking

    // Incremental compilation:
    "incremental": true,            // Save compilation info for faster rebuilds
    "tsBuildInfoFile": ".tsbuildinfo",

    // Output filtering:
    "declaration": false,           // Skip declarations during development
    "declarationMap": false,        // Skip declaration source maps
    "sourceMap": false,            // Skip source maps during development

    // Project references:
    "composite": true               // Enable project references
  }
}
```

**Performance Best Practices:**

1. **Use `skipLibCheck: true`** — This is the single biggest performance improvement. It skips type-checking `.d.ts` files from node_modules.

2. **Enable incremental builds** — The `incremental: true` flag saves build info to a file, enabling much faster subsequent builds.

3. **Use project references for monorepos** — Break your codebase into smaller projects that can be compiled independently and in parallel.

4. **Use `isolatedModules: true`** — Allows each file to be compiled independently (required by esbuild, Babel, and other transpilers).

5. **Avoid complex recursive types** — Types that recurse deeply (50+ levels) can cause the compiler to slow down significantly.

6. **Prefer interfaces over type intersections** — Interfaces are cached by TypeScript and merge faster than intersection (`&`) types.

7. **Avoid massive union types** — Unions with hundreds of members can slow down type checking. Consider splitting them.

8. **Use `type` imports/exports** — `import type { X }` prevents the type from being emitted in JavaScript output, reducing module resolution overhead.

```typescript
// ❌ Slow: Large intersection
type AllFeatures = FeatureA & FeatureB & FeatureC & FeatureD & FeatureE;

// ✅ Faster: Interface extension
interface AllFeatures extends FeatureA, FeatureB, FeatureC, FeatureD, FeatureE {}

// ❌ Slow: Conditional types inside mapped types
type DeepBad<T> = {
  [K in keyof T]: T[K] extends object ? DeepBad<T[K]> : T[K];
};

// ✅ Faster: Limit recursion depth
type DeepGood<T, Depth extends number = 5> = Depth extends 0
  ? T
  : {
      [K in keyof T]: T[K] extends object ? DeepGood<T[K], Subtract<Depth, 1>> : T[K];
    };
```

**Simple Explanation:**
> TypeScript performance optimization is about reducing what the compiler needs to process. `skipLibCheck` skips checking third-party types. Incremental builds cache previous results. Interfaces are faster than intersection types. And `import type` reduces module resolution work.

**Interview Tips:**
- **`skipLibCheck: true` is the #1 performance tip** — never turn it off
- Complex type gymnastics cost compile time — balance type safety with performance
- TypeScript 5.0+ is significantly faster than earlier versions

**Common Mistakes:**
- Turning off `skipLibCheck` and wondering why compilation is slow
- Creating deeply recursive types without a depth limit
- Using intersection types extensively instead of interfaces

**Follow-up Questions:**
1. How does incremental compilation improve build times?
2. Why are interfaces faster than intersection types?

---

## 📋 Quick Reference: Common TypeScript Patterns

| Pattern | Example |
|---------|---------|
| **Discriminated Union** | `type Result = { status: "ok"; data: T } \| { status: "error"; error: E }` |
| **Type Guard** | `function isUser(x: unknown): x is User { ... }` |
| **Generic Function** | `function first<T>(arr: T[]): T \| undefined` |
| **Mapped Type** | `type Readonly<T> = { readonly [K in keyof T]: T[K] }` |
| **Conditional Type** | `type IsString<T> = T extends string ? true : false` |
| **Branded Type** | `type UserId = string & { __brand: "UserId" }` |
| **Template Literal** | `type Event = \`on${Capitalize<string>}\`` |
| **Variadic Tuple** | `function concat<T extends unknown[], U extends unknown[]>(a: [...T], b: [...U]): [...T, ...U]` |
| **Deep Partial** | `type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }` |
| **Result Type** | `type Result<T> = { ok: true; value: T } \| { ok: false; error: Error }` |

---

## 📊 Difficulty Distribution

| Level | Questions | Topics |
|-------|-----------|--------|
| 🟢 Beginner (Q1–Q35) | 35 | Basic types, inference, functions, objects, interfaces, unions, narrowing |
| 🟡 Intermediate (Q36–Q70) | 35 | Generics, utility types, mapped types, conditional types, type guards, satisfies |
| 🔴 Advanced (Q71–Q86) | 16 | Branding, variadic tuples, recursive types, builders, state machines, performance |

---

> **Tip:** For each question, make sure you can:
> 1. Explain the concept in simple terms
> 2. Write a code example
> 3. Describe a real-world use case
> 4. Identify potential pitfalls
> 5. Answer follow-up questions

---

## 🔍 TRICKY TYPE OUTPUT QUESTIONS (TQ1–TQ25)

> **Test your understanding of TypeScript's type system with these "guess the type/error" questions.** Each question shows code and asks you to predict what TypeScript will infer or whether it will error. Answers include step-by-step reasoning.

---

### TQ1 · Beginner · Type Inference

## 🔍 What is the inferred type of each variable?

```typescript
let a = "hello";
const b = "hello";
let c = a;
const d = c;
let e = b as const;

// What are the types of a, b, c, d, e?
```

**Answer:**

```typescript
let a = "hello";      // type: string (let widens to base type)
const b = "hello";    // type: "hello" (const preserves literal)
let c = a;           // type: string (a is string, so c is string)
const d = c;         // type: string (d is const, but c was string, not literal)
let e = b as const;  // type: "hello" (as const forces literal)
```

**Key Insight:** `const` preserves literal types only when the value itself is a literal. If the source is already a widened type (`string`), even `const` stays widened.

---

### TQ2 · Beginner · Type Inference

## 🔍 What types does TypeScript infer for these array declarations?

```typescript
const arr1 = [];
const arr2 = [1, 2, 3];
const arr3 = [1, "hello", true];
const arr4 = [1, 2, null];

// What are the types of arr1 through arr4?
```

**Answer:**

```typescript
const arr1 = [];                          // type: any[] (empty array)
const arr2 = [1, 2, 3];                  // type: number[]
const arr3 = [1, "hello", true];         // type: (string | number | boolean)[]
const arr4 = [1, 2, null];               // type: (number | null)[]
```

**Key Insight:** Empty arrays default to `any[]`. TypeScript uses **best common type** for mixed arrays.

---

### TQ3 · Beginner · Excess Property Checks

## 🔍 Will this code compile? Why or why not?

```typescript
interface User {
  name: string;
  age: number;
}

function greet(user: User) {
  console.log(`Hello, ${user.name}`);
}

// Case 1:
greet({ name: "Alice", age: 30, email: "alice@test.com" });

// Case 2:
const userData = { name: "Alice", age: 30, email: "alice@test.com" };
greet(userData);

// Case 3:
greet({ name: "Bob", age: 25 } as User);
```

**Answer:**

```typescript
// Case 1: ❌ COMPILE ERROR — excess property check! 'email' not in User.
// Case 2: ✅ COMPILES — intermediate variable bypasses excess check.
// Case 3: ✅ COMPILES — type assertion bypasses the check.
```

**Key Insight:** Excess property checks **only apply to object literals** passed directly to type-annotated positions.

---

### TQ4 · Beginner · Function Overloads

## 🔍 What is the type of each variable?

```typescript
function process(input: string): string;
function process(input: number): number;
function process(input: boolean): boolean;
function process(input: string | number | boolean): string | number | boolean {
  if (typeof input === "string") return input.toUpperCase();
  if (typeof input === "number") return input * 2;
  return !input;
}

const a = process("hello");
const b = process(42);
const c = process(true);
const d = process("hello" as string | number);
```

**Answer:**

```typescript
const a = process("hello");                // type: string (overload 1)
const b = process(42);                     // type: number (overload 2)
const c = process(true);                   // type: boolean (overload 3)
const d = process("hello" as string | number);
// type: string | number | boolean — falls through to implementation!
```

**Key Insight:** Overloads must be an **exact match** — a union type argument matches none of the overloads, falling back to the implementation signature.

---

### TQ5 · Beginner · Truthiness Narrowing

## 🔍 What does each call output? What is narrowed in each branch?

```typescript
function process(value: string | null | undefined) {
  if (value) {
    console.log(value.toUpperCase());
  } else {
    console.log("No value");
  }
}

process("hello");
process(null);
process(undefined);
process("");
```

**Answer:**

```
Output:
HELLO
No value
No value
No value  ← Empty string is falsy!
```

In the `if` branch, value is narrowed to `string` (falsy strings filtered out). In the `else` branch, value is `null | undefined | ""`.

**Key Insight:** Truthiness narrowing removes `""` (empty string) along with `null` and `undefined`. Use `value ?? "default"` when `""` is valid.

---

### TQ6 · Beginner · Readonly Arrays

## 🔍 Which operations compile and which error?

```typescript
const arr: readonly number[] = [1, 2, 3];
const mutable: number[] = arr;
arr.push(4);
arr[0] = 10;
const copied = [...arr];
```

**Answer:**

```typescript
const mutable: number[] = arr;  // ❌ COMPILE ERROR
arr.push(4);                     // ❌ COMPILE ERROR
arr[0] = 10;                     // ❌ COMPILE ERROR
const copied = [...arr];         // ✅ COMPILES — creates mutable copy
```

**Key Insight:** `readonly` arrays are not assignable to mutable arrays. Spread creates a mutable copy.

---

### TQ7 · Intermediate · Generics

## 🔍 What are the inferred return types?

```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function identity<T>(value: T): T {
  return value;
}

const a = first([1, 2, 3]);
const b = first([]);
const c = identity("hello");
const d = identity<string>("hello");
const e = identity("hello" as const);
```

**Answer:**

```typescript
const a = first([1, 2, 3]);       // type: number | undefined
const b = first([]);              // type: undefined (T = never)
const c = identity("hello");      // type: string
const d = identity<string>("hello"); // type: string
const e = identity("hello" as const); // type: "hello"
```

**Key Insight:** An empty array causes `T` to be inferred as `never`. `as const` preserves the literal type through generics.

---

### TQ8 · Intermediate · keyof

## 🔍 What are these types?

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type K1 = keyof User;
type K2 = keyof any;
type K3 = keyof unknown;
type V1 = User["name"];
type V2 = User["name" | "age"];
type V3 = User[keyof User];
```

**Answer:**

```typescript
type K1 = keyof User;              // "name" | "age" | "email"
type K2 = keyof any;               // string | number | symbol
type K3 = keyof unknown;           // never (no known keys)
type V1 = User["name"];             // string
type V2 = User["name" | "age"];     // string | number
type V3 = User[keyof User];         // string | number
```

**Key Insight:** `keyof unknown` is `never`. Indexed access over a union of keys returns the union of value types.

---

### TQ9 · Intermediate · Union Distribution

## 🔍 What does each type evaluate to?

```typescript
type Filter<T, U> = T extends U ? never : T;

type Result1 = Filter<"a" | "b" | "c", "a">;
type Result2 = Filter<string | number | boolean, string | number>;
type Result3 = Filter<"a" | "b" | "c", string>;
```

**Answer:**

```typescript
type Result1 = Filter<"a" | "b" | "c", "a">;
// Distributes: "b" | "c" ("a" filtered out)

type Result2 = Filter<string | number | boolean, string | number>;
// boolean (string and number filtered out)

type Result3 = Filter<"a" | "b" | "c", string>;
// never (all are subtypes of string, all filtered)
```

**Key Insight:** Conditional types **distribute over unions** — each member is evaluated individually. This is how `Exclude<T, U>` works.

---

### TQ10 · Intermediate · Discriminated Unions

## 🔍 What is the type of `shape` in each branch?

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side * shape.side;
    default:
      // What is the type of shape here?
      return 0;
  }
}
```

**Answer:**

In `case "circle"`: shape is `{ kind: "circle"; radius: number }`
In `case "square"`: shape is `{ kind: "square"; side: number }`
In `default`: shape is `{ kind: "triangle
