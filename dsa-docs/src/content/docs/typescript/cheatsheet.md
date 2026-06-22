---
title: "TypeScript Cheatsheet — One-Page Quick Reference"
description: "Comprehensive one-page TypeScript cheatsheet: primitive types, utility types, mapped types, conditional types, generics, type guards, and common patterns with concise examples."
---

## TypeScript Cheatsheet

> **One-page quick reference** for TypeScript developers. Bookmark this page for daily use.

---

## 1. Primitive & Special Types

```typescript
const str: string     = "hello";                  // String
const num: number     = 42;                       // Number (float, int, hex, binary, octal)
const bool: boolean   = true;                     // Boolean
const big: bigint     = 9007199254740993n;         // BigInt (ES2020)
const sym: symbol     = Symbol("id");              // Symbol (unique)
const und: undefined  = undefined;                // Not yet assigned
const nul: null       = null;                     // Intentional absence
const v: void         = undefined;                // No return value
const nvr: never      = throw Error();            // Never occurs

// Special types
let anyType: any      = 42;   anyType = "x";     // Opt-out of checking (avoid!)
let unk: unknown      = 42;                       // Type-safe any (must narrow)
```

---

## 2. Type Annotations & Inference

```typescript
// Variable annotations
const name: string = "Alice";                     // Explicit
const age = 25;                                   // Inferred: number
let items = [1, 2, 3];                           // Inferred: number[]

// Function annotations
function add(a: number, b: number): number { return a + b; }
const multiply = (a: number, b: number): number => a * b;

// Contextual typing (inferred from context)
[1, 2, 3].map((n) => n.toFixed(2));             // n inferred as number
document.addEventListener("click", (e) => e.clientX); // e inferred as MouseEvent
```

---

## 3. Object Types

```typescript
// Interface (preferred for public API shapes)
interface User {
  readonly id: string;                            // Readonly
  name: string;
  email: string;
  age?: number;                                   // Optional
}

// Type alias
type Point = { x: number; y: number };

// Index signatures
type Dict = { [key: string]: unknown };
interface StringDict { [key: string]: string; length: number; }

// Excess property checks (only on object literals)
// const u: User = { name: "A", email: "a@b", extra: true }; // ❌ Error
const userData = { name: "A", email: "a@b", extra: true };
const u: User = userData; // ✅ OK (structural)
```

---

## 4. Arrays & Tuples

```typescript
// Arrays
const a1: number[] = [1, 2, 3];
const a2: Array<string> = ["a", "b"];
const a3: readonly number[] = [1, 2, 3];         // Immutable
const a4: (string | number)[] = [1, "x"];

// Tuples (fixed-length, typed positions)
const t1: [string, number] = ["age", 25];
const t2: [string, number?] = ["hello"];         // Optional elements
const t3: [start: number, end: number];           // Labeled tuples (TS 4.0+)

// Variadic tuples
type Head = [string, ...number[]];                // string then N numbers
type Tail = [...number[], string];                // N numbers then string (TS 4.2+)
type Both = [string, ...number[], boolean];        // Mixed

// Real-world: React useState
type UseStateResult<T> = [T, (value: T) => void];
```

---

## 5. Functions

```typescript
// Parameter & return types
function greet(name: string, greeting?: string): string {}
function create(name: string, role: string = "user"): User {}
function sum(...nums: number[]): number {}

// Function type expressions
type Callback = (error: Error | null, result?: unknown) => void;
type MathOp = (a: number, b: number) => number;

// Overloads
function parse(input: string): string[];
function parse(input: number): number;
function parse(input: string | number): string[] | number {
  return typeof input === "string" ? input.split(",") : input * 2;
}

// Call signatures (callable + properties)
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

// Construct signatures
type Ctor = new (name: string) => Animal;
```

---

## 6. Union & Intersection Types

```typescript
// Union — "either/or"
type Status = "active" | "inactive" | "pending";
type ID = string | number;
type Result = string | number | boolean;

// Intersection — "all combined"
type Admin = User & { role: "admin"; permissions: string[] };
type NamedPoint = { name: string } & Point;

// Narrowing techniques
if (typeof x === "string") {}                     // typeof
if (x instanceof Date) {}                         // instanceof
if ("fly" in animal) {}                           // in operator
if (x === null) {}                                // Equality
if (x) {}                                         // Truthiness

// Discriminated union (most powerful pattern)
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };
function getArea(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "square": return s.side * s.side;
  }
}
```

---

## 7. Type Operators

```typescript
// keyof — get keys as union
type UserKeys = keyof User;                       // "id" | "name" | "email"

// typeof — get value's type (used with ReturnType etc.)
const config = { url: "https://api.com" };
type Config = typeof config;                      // { url: string }

// Indexed access — T[K]
type UserName = User["name"];                     // string
type NameOrAge = User["name" | "age"];            // string | number
type AllValues = User[keyof User];                // string | number | undefined

// as const — preserve literal types
const Colors = { red: "#ff0000", blue: "#0000ff" } as const;
// Colors.red is "#ff0000" (literal), not string

// satisfies — validate type + preserve literal (TS 4.9+)
const palette = { red: [255, 0, 0] } satisfies Record<string, [number, number, number]>;
```

---

## 8. Interfaces

```typescript
// Extending
interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

// Multiple inheritance
interface Duck extends Flyable, Swimmable { quack(): void; }

// Declaration merging (interfaces only!)
interface User { name: string; }
interface User { age: number; }                  // Merged: User has name + age

// Interface vs Type
interface                                          type
─────────────────────────────────                  ────────────────────────────────
✅ Declaration merging                             ❌ No merging
✅ Extends (extend keyword)                        ✅ Intersection (&)
❌ Union types                                     ✅ Union types (|)
❌ Mapped/conditional types                         ✅ Mapped/conditional types
❌ Primitive aliases                                ✅ Primitive aliases
❌ Tuple types                                      ✅ Tuple types
```

---

## 9. Generics

```typescript
// Generic function
function identity<T>(arg: T): T { return arg; }
const str = identity("hello");                     // inferred: string
const num = identity<number>(42);                  // explicit: number

// Generic constraints
interface HasLength { length: number; }
function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length); return arg;
}

// keyof constraint
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic interface
interface Repository<T> {
  get(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(data: Omit<T, "id">): Promise<T>;
}

// Generic class
class ApiRepo<T extends { id: string }> implements Repository<T> {
  async get(id: string): Promise<T | null> { /* ... */ }
}

// Multiple type parameters
function pair<A, B>(a: A, b: B): [A, B] { return [a, b]; }
```

---

## 10. Mapped Types

```typescript
// Basic mapped type
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Modifiers
type Required<T>  = { [K in keyof T]-?: T[K] };           // Remove optional
type NonReadonly<T> = { -readonly [K in keyof T]: T[K] }; // Remove readonly

// Key remapping with `as` (TS 4.1+)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// Filtering keys
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Template literal keys
type Events<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (data: T[K]) => void;
};

// Homomorphic (preserves modifiers)
// { [K in keyof T]: ... } — preserves readonly/optional
// { [P in K]: ... } — doesn't preserve modifiers (K is any key union)
```

---

## 11. Conditional Types

```typescript
// Basic syntax
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">;                        // true
type B = IsString<42>;                             // false

// Filtering with never (removed from unions)
type NonNullable<T> = T extends null | undefined ? never : T;
type C = NonNullable<string | null>;                // string

// infer keyword — extract types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type D = ReturnType<() => string>;                  // string

type ElementType<T> = T extends (infer U)[] ? U : never;
type E = ElementType<string[]>;                     // string

type UnwrapPromise<T> = T extends Promise<infer U> ? UnwrapPromise<U> : T;
type F = UnwrapPromise<Promise<Promise<string>>>;   // string

type FirstParam<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;
type G = FirstParam<(name: string, age: number) => void>; // string

// Distributive conditional types
// T extends U ? X : Y distributes over unions of T
type ToArray<T> = T extends any ? T[] : never;
type H = ToArray<string | number>;                  // string[] | number[]
// To prevent distribution, wrap in [T]:
type ToArray2<T> = [T] extends [any] ? T[] : never;
type I = ToArray2<string | number>;                 // (string | number)[]
```

---

## 12. Utility Types (Complete Reference)

```typescript
interface User { id: string; name: string; email: string; age: number; }

// ─── Object Transformations ───
type P = Partial<User>;                            // All optional
type R = Required<User>;                           // All required
type Ro = Readonly<User>;                          // All readonly
type Pi = Pick<User, "id" | "name">;               // { id: string; name: string }
type O = Omit<User, "email">;                      // { id: string; name: string; age: number }

// ─── Dictionary ───
type Rec = Record<"a" | "b", string>;              // { a: string; b: string }

// ─── Union Manipulation ───
type Ex = Exclude<"a" | "b" | "c", "a">;           // "b" | "c"
type Ext = Extract<"a" | "b" | "c", "a" | "c">;    // "a" | "c"
type NN = NonNullable<string | null | undefined>;  // string

// ─── Function Introspection ───
function fn(name: string, age: number): User { return {} as User; }
type RT = ReturnType<typeof fn>;                   // User
type P2 = Parameters<typeof fn>;                   // [name: string, age: number]
type CP = ConstructorParameters<new (n: string) => User>; // [n: string]
type IT = InstanceType<new (n: string) => User>;   // User

// ─── `this` Introspection ───
type TPT = ThisParameterType<(this: Window, x: number) => void>; // Window
type OPT = OmitThisParameter<(this: Window, x: number) => void>; // (x: number) => void

// ─── Promise ───
type Aw = Awaited<Promise<Promise<string>>>;       // string
```

---

## 13. Type Guards & Narrowing

```typescript
// Built-in guards
typeof x === "string" | "number" | "boolean" | "bigint" | "symbol" | "undefined" | "function" | "object"
x instanceof Date | Array | RegExp | Map | Set
"property" in obj
Array.isArray(x)
x === null / x === undefined
x ?? "default"                                     // Nullish coalescing (null/undefined only)

// User-defined type guard
function isUser(x: unknown): x is User {
  return !!x && typeof x === "object" && "name" in x;
}

// Assertion function (throws on failure)
function assertIsString(v: unknown): asserts v is string {
  if (typeof v !== "string") throw new Error("Not a string");
}

// Generic assertion
function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}

// Exhaustiveness check
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`);
}
```

---

## 14. Template Literal Types

```typescript
// Basic combination
type Color = "red" | "green" | "blue";
type Size = "sm" | "md" | "lg";
type ColorSize = `${Color}-${Size}`;               // "red-sm" | "red-md" | ... | "blue-lg"

// Intrinsic string types
type Cap   = Capitalize<"hello">;                  // "Hello"
type Uncap = Uncapitalize<"Hello">;                // "hello"
type Up    = Uppercase<"hello">;                   // "HELLO"
type Low   = Lowercase<"HELLO">;                   // "hello"

// Pattern matching with infer
type ExtractRoute<T> = T extends `/api/${infer R}` ? R : never;
type R = ExtractRoute<"/api/users">;                // "users"

// CSS values
type CSSVal = `${number}${"px" | "rem" | "em" | "%"}`; // "10px" | "2rem" | ...

// Key remapping utility
type EventName = `on${Capitalize<string>}`;        // "onChange" | "onClick" | ...
```

---

## 15. Branded (Nominal) Types

```typescript
// Simple brand (compile-time only)
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<string, "UserId">;
type PostId = Brand<string, "PostId">;
function getUser(id: UserId): void {}
function getPost(id: PostId): void {}
getUser("abc" as UserId);                          // ✅
getUser("xyz" as PostId);                          // ❌ Compile error!

// Opaque type (safer brand with unique symbol)
declare const _brand: unique symbol;
type Opaque<T, B> = T & { readonly [_brand]: B };
type Email = Opaque<string, "Email">;
function createEmail(s: string): Email {
  if (!s.includes("@")) throw new Error("Invalid email");
  return s as Email;
}
```

---

## 16. Common Patterns

```typescript
// ─── Discriminated Union + API Result ───
type ApiResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string }
  | { status: "loading" };

function handleResult<T>(r: ApiResult<T>) {
  switch (r.status) {
    case "success": return r.data;
    case "error":   return r.error;
    case "loading": return "Loading...";
  }
}

// ─── Result Type (Rust-style) ───
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// ─── Deep Partial ───
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// ─── Deep Readonly ───
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepReadonly<T[K]>
    : T[K];
};

// ─── Type-safe Event Emitter ───
type EventMap = {
  userCreated: { id: string; name: string };
  error: { message: string; code: number };
};
class Emitter<T extends Record<string, unknown>> {
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {}
  emit<K extends keyof T>(event: K, data: T[K]): void {}
}

// ─── Singleton Pattern ───
class ServiceRegistry {
  private static services = new Map<string, unknown>();
  static register<T>(name: string, service: T): void { this.services.set(name, service); }
  static get<T>(name: string): T { return this.services.get(name) as T; }
}

// ─── Fluent Builder ───
class QueryBuilder<T> {
  private conditions: string[] = [];
  where(c: string): this { this.conditions.push(c); return this; }
  limit(n: number): this { /* ... */ return this; }
  execute(): Promise<T[]> { /* ... */ return [] as any; }
}

// ─── Enum Alternative (union of literals) ───
type Direction = "north" | "south" | "east" | "west";
const Direction = {
  North: "north" as const,
  South: "south" as const,
  East: "east" as const,
  West: "west" as const,
};

// ─── Type-safe Object.keys ───
function typedKeys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

// ─── Custom Error Classes ───
class AppError extends Error {
  constructor(message: string, public code: string, public statusCode: number = 500) {
    super(message);
    this.name = "AppError";
  }
}
```

---

## 17. tsconfig Quick Reference

```json
{
  "compilerOptions": {
    "strict": true,              // Enable ALL strict checks (recommended)
    "target": "ES2022",          // JS output version
    "module": "ESNext",          // Module system
    "moduleResolution": "bundler", // Module resolution strategy
    "outDir": "./dist",          // Output directory
    "rootDir": "./src",          // Source directory
    "esModuleInterop": true,     // CJS/ESM compatibility
    "skipLibCheck": true,        // Skip node_modules type checks (faster)
    "declaration": true,         // Generate .d.ts files
    "sourceMap": true            // Debugging support
  }
}
```

**Strict mode enables:** `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitAny`, `noImplicitThis`, `alwaysStrict`

---

> **Pro Tip:** Bookmark this page. Use `Ctrl+F` / `Cmd+F` to quickly find any concept. For deeper explanations, visit the individual TypeScript doc pages in the sidebar.
