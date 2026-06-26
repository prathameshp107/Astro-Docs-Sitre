---
title: "Extending Interfaces in TypeScript"
description: "Deep dive into interface extension: extends keyword, multiple inheritance, interface intersection, and design patterns."
---

## Extending Interfaces in TypeScript

### Basic Extension

```typescript
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
```

### Multiple Inheritance

```typescript
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

// Conflict resolution
interface A { shared: string; a(): void }
interface B { shared: string; b(): void }
interface C extends A, B { } // OK: shared is compatible
```

### Overriding Properties

```typescript
interface Base {
  id: string;
  value: unknown;
}

interface Detailed extends Base {
  value: { name: string; count: number }; // Narrowing
  description: string;
}
```

### Real Project Example

```typescript
// API response hierarchy
interface ApiResponse {
  status: number;
  timestamp: string;
}

interface SuccessResponse<T> extends ApiResponse {
  success: true;
  data: T;
}

interface ErrorResponse extends ApiResponse {
  success: false;
  error: { code: string; message: string };
}

type UserResponse = SuccessResponse<User> | ErrorResponse;
```

### Interview Questions

**Easy:** How do you extend an interface?

**Medium:** Can an interface extend multiple interfaces?

**Hard:** How are property conflicts resolved when extending multiple interfaces?
