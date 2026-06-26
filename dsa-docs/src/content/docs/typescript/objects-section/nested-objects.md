---
title: "Nested Objects in TypeScript"
description: "Deep dive into TypeScript nested objects: deep typing, recursive types, optional chaining, and real-world patterns."
---

## Nested Objects in TypeScript

### Basic Nested Types

```typescript
interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface Employee {
  id: number;
  name: string;
  address: Address;
  department: {
    id: number;
    name: string;
  };
}
```

### Optional Nesting with Optional Chaining

```typescript
interface Company {
  name: string;
  headquarters?: {
    address?: {
      street?: string;
      city?: string;
    };
    phone?: string;
  };
}

function getCity(company: Company): string | undefined {
  return company.headquarters?.address?.city;
}
```

### Recursive Types

```typescript
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

interface Comment {
  id: string;
  text: string;
  replies: Comment[];
}
```

### Interview Questions

**Easy:** How do you type nested objects?

**Medium:** How does optional chaining work with nested types?

**Hard:** How would you create a recursive type for a tree structure?
