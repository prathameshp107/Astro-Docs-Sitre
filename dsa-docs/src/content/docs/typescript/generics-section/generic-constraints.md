---
title: "Generic Constraints in TypeScript"
description: "Deep dive into TypeScript generic constraints: extends, keyof, conditional constraints, and real-world constraint patterns."
---

## Generic Constraints in TypeScript

### Basic Constraint

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");   // OK — string has length
logLength([1, 2, 3]); // OK — array has length
// logLength(42);     // ❌ Error: number has no length
```

### keyof Constraint

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@test.com" };
const name = getProperty(user, "name"); // type: string
const age = getProperty(user, "age");   // type: number
```

### Conditional Constraints

```typescript
type ExtractStrings<T> = T extends { [K in keyof T]: T[K] extends string ? T[K] : never }[keyof T] ? T : never;

// Self-referential constraints
interface TreeNode<T extends TreeNode<T>> {
  value: T;
  children: TreeNode<T>[];
}
```

### Real Project Example

```typescript
// Database entity constraint
interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

class Repository<T extends Entity> {
  async getById(id: string): Promise<T | null> {
    return db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
  }
  
  async update(id: string, data: Partial<T>): Promise<T> {
    // Must keep id, createdAt immutable
    const { id: _, createdAt: __, ...updatable } = data as any;
    return db.query(`UPDATE ${this.tableName} SET ... WHERE id = $1`, [updatable, id]);
  }
}
```

### Interview Questions

**Easy:** How do you constrain a generic type parameter?

**Medium:** What does `extends keyof T` do in a generic constraint?

**Hard:** How would you create a self-referential generic constraint?
