---
title: "Generic Patterns in TypeScript"
description: "Deep dive into TypeScript generic design patterns: factory pattern, builder pattern, repository pattern, and type-safe singletons."
---

## Generic Patterns in TypeScript

### Factory Pattern

```typescript
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
```

### Builder Pattern

```typescript
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
    const query = `SELECT * FROM ${this.table} WHERE ${this.conditions.join(" AND ")}`;
    return db.query(query);
  }
}

const users = await new QueryBuilder<User>()
  .where("age > 18")
  .where("active = true")
  .take(10)
  .execute();
```

### Singleton + Registry Pattern

```typescript
class ServiceRegistry {
  private static services = new Map<string, unknown>();
  
  static register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }
  
  static get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) throw new Error(`Service ${name} not found`);
    return service as T;
  }
}
```

### Interview Questions

**Easy:** What is the factory pattern with generics?

**Medium:** How does the builder pattern benefit from generics?

**Hard:** Design a type-safe service locator pattern with generics.
