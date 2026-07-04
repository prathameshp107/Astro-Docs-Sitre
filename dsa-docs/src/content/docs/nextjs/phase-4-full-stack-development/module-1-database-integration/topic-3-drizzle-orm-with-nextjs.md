---
title: "Drizzle ORM with Next.js"
description: "Drizzle is a lightweight TypeScript ORM with a SQL-like query syntax. Unlike Prisma's generated client, Drizzle lets you write queries that look like SQL w"
---

# Drizzle ORM with Next.js

## Introduction

Drizzle is a lightweight TypeScript ORM with a SQL-like query syntax. Unlike Prisma's generated client, Drizzle lets you write queries that look like SQL while staying fully type-safe. It's a popular choice for developers who want more control over their queries.

## Why Drizzle?

- SQL-like syntax — queries mirror actual SQL
- No code generation needed for basic usage
- Smaller bundle size than Prisma
- Full TypeScript type safety
- Supports PostgreSQL, MySQL, SQLite, and Turso

## Setup

```bash
npm install drizzle-orm @libsql/client
npm install -D drizzle-kit
```

## Schema Definition

```ts
// db/schema.ts
import { pgTable, serial, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  published: boolean('published').default(false).notNull(),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

## Database Connection

```ts
// db/index.ts
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })
```

## CRUD Queries

### Create

```ts
// app/actions/users.ts
"use server"

import { db } from '@/db'
import { users } from '@/db/schema'

export async function createUser(formData: FormData) {
  const user = await db.insert(users)
    .values({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    })
    .returning()
  
  return user[0]
}
```

### Read

```ts
// Server Component — fetch all published posts
import { db } from '@/db'
import { posts, users } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export default async function PostsPage() {
  const allPosts = await db.select({
    id: posts.id,
    title: posts.title,
    authorName: users.name,
    createdAt: posts.createdAt,
  })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(20)
  
  return <div>{/* render posts */}</div>
}
```

### Update

```ts
"use server"

import { eq } from 'drizzle-orm'

export async function updatePost(formData: FormData) {
  await db.update(posts)
    .set({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    })
    .where(eq(posts.id, Number(formData.get('postId'))))
  
  revalidatePath('/posts')
}
```

### Delete

```ts
"use server"

export async function deletePost(formData: FormData) {
  await db.delete(posts)
    .where(eq(posts.id, Number(formData.get('postId'))))
  
  revalidatePath('/posts')
}
```

## Relations

Drizzle supports both manual joins and relations:

```ts
// Manual join (explicit, SQL-like)
const userPosts = await db.select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId))
  .where(eq(users.id, userId))
```

```ts
// Relations (for nested data)
import { relations } from 'drizzle-orm'

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}))

// Query with relations
const userWithPosts = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: {
    posts: {
      where: eq(posts.published, true),
      limit: 10,
    },
  },
})
```

## Migrations

```bash
# Generate migration from schema changes
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Push schema directly (development only)
npx drizzle-kit push
```

```ts
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

## Edge Compatibility with Turso

```ts
// db/turso.ts
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client)
```

## Prisma vs Drizzle

| Aspect | Prisma | Drizzle |
|--------|--------|---------|
| Query style | Generated client methods | SQL-like functions |
| Code generation | Required | Optional |
| Bundle size | Larger | Smaller |
| Learning curve | Lower (magic-like) | Moderate (SQL knowledge helps) |
| Migration files | Declarative | Generated from schema |
| Edge support | Via Accelerate | Native (Turso, libsql) |

## Common Mistakes

- **Forgetting `.returning()` for INSERT in PostgreSQL** — Without it, the query doesn't return the created row
- **Incorrect type casting** — Drizzle is strict about types. Use `Number()`, `String()` as needed
- **Not using migrations** — Schema changes should be version-controlled through migrations, not direct pushes
- **Missing `$inferSelect` and `$inferInsert`** — Use these to extract types from your schema

## Best Practices

- Use `drizzle-kit generate` + `migrate` for production schema changes
- Use `drizzle-kit push` only in development
- Leverage TypeScript inference — let Drizzle infer types from your schema
- Use relations for nested queries instead of manual joins
- Consider Turso for edge-deployed apps that need SQLite

## Summary

Drizzle offers a SQL-like, type-safe query builder with minimal overhead. It's a great choice if you prefer writing SQL-like queries over using a generated client. Use relations for nested data and migrations for schema management.

## Related Topics

- [Connecting to Databases](./topic-1-connecting-to-databases.md)
- [Prisma with Next.js](./topic-2-prisma-with-nextjs.md)
- [Database Patterns](./topic-4-database-patterns.md)
