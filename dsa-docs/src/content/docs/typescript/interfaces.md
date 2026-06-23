---
title: "Interfaces in TypeScript"
description: "Complete guide to TypeScript interfaces: defining shapes, extending, declaration merging, hybrid types, and interface vs type comparison with real-world patterns."
---

## Interfaces in TypeScript

### What are Interfaces?

An **interface** defines the shape of an object — what properties and methods it must have. Interfaces are the primary way to describe object shapes in TypeScript.

### Structural Typing — "If It Walks Like a Duck…"

```mermaid
flowchart LR
    subgraph Duck[Duck Interface]
        D1[name: string]
        D2[swim(): void]
        D3[quack(): void]
    end
    
    subgraph RealDuck[A Real Duck Object]
        R1[name: "Donald"]
        R2[swim: function]
        R3[quack: function]
        R4[color: "white"]
    end
    
    subgraph Robot[Robot Duck Object]
        B1[name: "Mech"]
        B2[swim: function]
        B3[quack: function]
        B4[battery: 100]
    end
    
    Duck -.->|✅ Matches| RealDuck
    Duck -.->|✅ Matches| Robot
    
    style Duck fill:#7c3aed,color:#fff
    style RealDuck fill:#3b82f6,color:#fff
    style Robot fill:#059669,color:#fff
```

TypeScript uses **structural typing** (also called duck typing): if an object has all the required properties with the right types, it satisfies the interface — regardless of its actual name or origin.

```typescript
interface Duck {
  name: string;
  swim(): void;
  quack(): void;
}

// These all satisfy Duck because they have the right shape:
const realDuck = { name: "Donald", swim() {}, quack() {}, color: "white" };  // ✅
const robotDuck = { name: "Mech", swim() {}, quack() {}, battery: 100 };     // ✅
```

---

### Basic Interface

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;             // Optional
  readonly createdAt: Date;  // Readonly
}

function createUser(user: User): void {
  console.log(`Created user ${user.name}`);
}
```

---

### Extending Interfaces

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

interface Puppy extends Dog {
  training: boolean;
}

// Multiple inheritance
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

interface Duck extends Flyable, Swimmable {
  quack(): void;
}
```

---

### Interface Declaration Merging

```typescript
// First declaration
interface User {
  name: string;
}

// Second declaration — merged with the first
interface User {
  age: number;
}

// Result: User has both name and age
const user: User = { name: "Alice", age: 30 };
```

---

### Interface vs Type Alias

```typescript
// Interface — can be extended
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

// Type — can use unions, intersections
type Animal = { name: string };
type Bear = Animal & { honey: boolean };
type StringOrNumber = string | number;
```

---

### Real Project Example

```typescript
// Express Request Handler
interface Request {
  body: Record<string, unknown>;
  params: Record<string, string>;
  query: Record<string, string>;
  headers: Record<string, string | undefined>;
}

interface Response {
  status(code: number): Response;
  json(data: unknown): void;
  send(data: string): void;
}

interface RequestHandler {
  (req: Request, res: Response, next: () => void): void | Promise<void>;
}
```

---

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using `type` when `interface` would work | Prefer interface for object shapes |
| Not leveraging declaration merging | Use for extending 3rd party types |
| Overcomplicating with too many interfaces | Keep focused on single responsibilities |

---

### Interview Questions

**Easy:** How do you define an interface?

**Medium:** What is declaration merging in interfaces?

**Hard:** When would you choose `interface` over `type` and vice versa?
