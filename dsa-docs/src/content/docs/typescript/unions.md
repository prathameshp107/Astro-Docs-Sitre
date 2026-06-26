---
title: "Union Types in TypeScript"
description: "Complete guide to TypeScript union types: syntax, type narrowing, discriminated unions, and real-world patterns for modeling values that can be one of several types."
---

## Union Types in TypeScript

### What are Union Types?

A **union type** describes a value that can be one of several types. It's created using the pipe (`|`) operator and is one of TypeScript's most powerful features for modeling flexible data.

> **Analogy:** A union type is like a parking spot that can hold either a car OR a motorcycle OR a bicycle — you know it's one of those, but you need to check which one before driving away.

```mermaid
flowchart TB
    subgraph Union[Union Type A | B | C]
        direction LR
        A[Type A<br/>string] --- B[Type B<br/>number] --- C[Type C<br/>boolean]
    end
    
    subgraph Intersection[Intersection Type A & B]
        direction LR
        AB[Has ALL properties<br/>of A AND B]
    end
    
    Union -->|Value can be ONE of| Example1["id: string | number<br/>-> 'abc' OR 42"]
    Intersection -->|Value must have ALL| Example2["Admin = User & Permissions<br/>-> has name, email, role, permissions"]
    
    style Union fill:#7c3aed,color:#fff
    style Intersection fill:#3b82f6,color:#fff
    style A fill:#f59e0b,color:#fff
    style B fill:#f59e0b,color:#fff
    style C fill:#f59e0b,color:#fff
    style AB fill:#059669,color:#fff
    style Example1 fill:#7c3aed,color:#fff
    style Example2 fill:#3b82f6,color:#fff
```

> **Venn diagram thinking:** A union (`|`) is like the **OR** area — the value can be in circle A OR circle B. An intersection (`&`) is like the **AND** area — the value must be in both circles at once.

---

### Basic Union Syntax

```typescript
// A variable that can be a string OR a number
let id: string | number;
id = "abc-123";      // OK
id = 42;             // OK
// id = true;        // ❌ Error: Type 'boolean' is not assignable

// Function parameter with union type
function formatInput(input: string | number): string {
  return `Input: ${input}`;
}

formatInput("hello");   // OK
formatInput(42);        // OK
// formatInput(true);   // ❌ Error
```

---

### Type Narrowing with Unions

To use a union type safely, you need to **narrow** it to a specific type:

```typescript
function processValue(value: string | number) {
  // typeof narrowing
  if (typeof value === "string") {
    // Here, value is string
    return value.toUpperCase();
  }
  // Here, value is number
  return value.toFixed(2);
}

// Truthiness narrowing
function getLength(value: string | null): number {
  if (value) {
    return value.length;  // value is string here
  }
  return 0;               // value is null here
}

// Equality narrowing
function compare(a: string | number, b: string | boolean) {
  if (a === b) {
    // Both a and b are string here (the only overlapping type)
    console.log(a.toUpperCase());
  }
}
```

---

### Union Types with Literal Types

Literal types create unions of specific values:

```typescript
type Direction = "left" | "right" | "up" | "down";
type Status = "idle" | "loading" | "success" | "error";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}

move("left");   // OK
// move("back"); // ❌ Error: Type '"back"' is not assignable

function rollDice(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}
```

---

### Discriminated Unions

A **discriminated union** uses a common property (the discriminant) to distinguish between variants:

```typescript
// Each variant has a 'kind' property that acts as the discriminant
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  // TypeScript narrows based on the discriminant
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}
```

---

### Union Types with Arrays

```typescript
// Array of strings OR numbers (not mixed)
let arr: string[] | number[];
arr = ["a", "b", "c"];   // OK
arr = [1, 2, 3];         // OK
// arr = ["a", 1];       // ❌ Error

// Array with mixed types
let mixed: (string | number)[];
mixed = ["a", 1, "b", 2]; // OK

// Tuple-like arrays
let pair: [string, number];
pair = ["age", 25];       // OK
// pair = [25, "age"];    // ❌ Error: wrong order
```

---

### Nullable Types

`null` and `undefined` are often part of unions:

```typescript
type MaybeString = string | null;
type OptionalNumber = number | undefined;

function findUser(id: string): User | null {
  const user = database.find(id);
  return user || null;
}

// With strictNullChecks, optional parameters are unions
function greet(name?: string): string {
  // name is string | undefined
  return `Hello, ${name ?? "Guest"}`;
}
```

---

### Real Project Example

```typescript
// API response states
type ApiState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

// React component usage
function UserProfile() {
  const [state, setState] = useState<ApiState<User>>({ status: "idle" });

  if (state.status === "loading") return <Spinner />;
  if (state.status === "error") return <Error message={state.error} />;
  if (state.status === "success") return <Profile user={state.data} />;
  return <Button onClick={fetchUser}>Load Profile</Button>;
}
```

---

### Common Mistakes

| Mistake | Why It's Wrong | Fix |
|---------|---------------|-----|
| Forgetting to narrow union types | Can't access type-specific properties | Use `typeof`, `instanceof`, or discriminant checks |
| Using `|` with too many types | Hard to maintain | Consider interfaces or discriminated unions |
| Not handling all union members | Runtime errors from unhandled cases | Use exhaustive checks with `never` |
| Mixing up `|` in arrays vs union of arrays | `(string\|number)[]` vs `string[]\|number[]` | Add parentheses appropriately |

---

### Interview Questions

**Easy:** What is a union type in TypeScript? How do you create one?

**Medium:** Explain discriminated unions with an example. Why are they useful?

**Hard:** How does TypeScript narrow types in a discriminated union within a switch statement? What happens if you add a new variant?
