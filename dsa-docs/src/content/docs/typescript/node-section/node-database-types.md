---
title: "Database Access Patterns in TypeScript"
description: "Complete guide to typing database access: repository pattern, query builders, Prisma types, and raw SQL typing."
---

## Database Access Patterns in TypeScript

### Repository Pattern

```typescript
interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    return db.query('SELECT * FROM users WHERE id = $1', [id]);
  }
  async findAll(): Promise<User[]> {
    return db.query('SELECT * FROM users');
  }
  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [data.name, data.email]
    );
    return result.rows[0];
  }
  async update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> { /* ... */ }
  async delete(id: string): Promise<boolean> { /* ... */ }
}
```

### Interview Questions

**Easy:** How does the repository pattern use generics?

**Medium:** How do you type SQL query results?

**Hard:** Design a type-safe query builder using generics.
