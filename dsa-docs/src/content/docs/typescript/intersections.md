---
title: "Intersection Types in TypeScript"
description: "Complete guide to TypeScript intersection types: combining multiple types into one, use cases with API responses, mixins, and comparison with union types."
---

## Intersection Types in TypeScript

### What are Intersection Types?

An **intersection type** combines multiple types into one. A value of an intersection type must satisfy **all** constituent types simultaneously. Created using the ampersand (`&`) operator.

> **Analogy:** An intersection type is like a person who is both a Developer AND a Designer — they have all the properties of both roles.

```mermaid
flowchart TB
    subgraph Union[Union: A | B — Either/Or]
        direction LR
        U1[Type A] --- U2[Type B]
    end
    
    subgraph Intersection[Intersection: A & B — Both/And]
        direction LR
        I1[Type A] --- I2[Both A & B] --- I3[Type B]
    end
    
    Union -->|Value is ONE of| UEx["string | number<br/>→ 'hello' OR 42"]
    Intersection -->|Value has ALL of| IEx["Person & Employee<br/>→ has name, age, employeeId, department"]
    
    style Union fill:#ef4444,color:#fff
    style Intersection fill:#7c3aed,color:#fff
    style UEx fill:#ef4444,color:#fff
    style IEx fill:#7c3aed,color:#fff
    style I2 fill:#059669,color:#fff
```

> **Analogy:** Union is like a parking spot that fits a car OR a bike. Intersection is like a multi-tool that has a blade AND scissors AND a file.

---

### Basic Intersection Syntax

```typescript
// Combine two interfaces
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

// An employee is both a Person AND an Employee
type StaffMember = Person & Employee;

const alice: StaffMember = {
  name: "Alice",
  age: 30,
  employeeId: "EMP001",
  department: "Engineering",
};
```

---

### Intersections vs Unions

| Feature | Union (`\|`) | Intersection (`&`) |
|---------|-------------|-------------------|
| Meaning | Either A OR B | Both A AND B |
| Properties | Must satisfy at least one | Must satisfy all |
| Common use | Optional/variant data | Combining concerns |
| Analogy | Parking spot (car OR bike) | Swiss Army knife (blade AND scissors AND file) |

---

### Adding Properties with Intersections

```typescript
// Base type
interface User {
  id: string;
  name: string;
  email: string;
}

// Extended with intersection
type AdminUser = User & {
  role: "admin";
  permissions: string[];
  lastLogin: Date;
};

const admin: AdminUser = {
  id: "1",
  name: "Alice",
  email: "alice@admin.com",
  role: "admin",
  permissions: ["read", "write", "delete"],
  lastLogin: new Date(),
};
```

---

### Intersections with Conflicting Properties

When intersected types have the **same property** with different types, the property becomes `never` or the intersection of both:

```typescript
interface A {
  value: string;
}

interface B {
  value: number;
}

// Type C = { value: string & number } → { value: never }
type C = A & B;
// value can never be both string and number, so it becomes 'never'
```

---

### Mixin Pattern with Intersections

```typescript
// Mixin functions
type WithTimestamp = { createdAt: Date; updatedAt: Date };
type WithSoftDelete = { deletedAt: Date | null; deletedBy: string | null };

function addTimestamps<T extends object>(obj: T): T & WithTimestamp {
  const now = new Date();
  return { ...obj, createdAt: now, updatedAt: now };
}

function addSoftDelete<T extends object>(obj: T): T & WithSoftDelete {
  return { ...obj, deletedAt: null, deletedBy: null };
}

// Usage
const user = { id: "1", name: "Alice" };
const trackedUser = addTimestamps(addSoftDelete(user));
// Type: { id: string; name: string } & WithTimestamp & WithSoftDelete
```

---

### Intersection with Generics

```typescript
// Combine generic constraints
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const person = { name: "Alice", age: 30 };
const contact = { email: "alice@example.com", phone: "123-456-7890" };

const employee = merge(person, contact);
// employee has all properties: name, age, email, phone
```

---

### Real Project Example

```typescript
// API request with authentication and pagination
interface BaseRequest {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

interface AuthHeaders {
  authorization: string;
  apiKey: string;
}

interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
}

// API call configuration combines all concerns
type ApiConfig = BaseRequest & AuthHeaders & PaginationParams;

function makeRequest(config: ApiConfig): Promise<Response> {
  const headers = {
    Authorization: `Bearer ${config.authorization}`,
    "X-API-Key": config.apiKey,
  };
  
  const url = `${config.endpoint}?page=${config.page}&limit=${config.limit}`;
  
  return fetch(url, {
    method: config.method,
    headers,
  });
}
```

---

### Common Mistakes

| Mistake | Why It's Wrong | Fix |
|---------|---------------|-----|
| Using `&` when you should use `extends` | Intersections merge, interfaces extend | Use `extends` for class/interface inheritance |
| Conflicting property types | Creates `never` type | Ensure shared properties have compatible types |
| Overusing intersections for large types | Hard to debug type errors | Prefer interface `extends` for readability |

---

### Interview Questions

**Easy:** What is an intersection type? How is it different from a union type?

**Medium:** What happens when you intersect two types that have the same property with different types?

**Hard:** Explain how you'd use intersection types with generics to create a type-safe `merge` function.
