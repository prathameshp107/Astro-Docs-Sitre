# Connecting to Databases

## Introduction

Next.js runs in serverless and edge environments where database connections behave differently than traditional servers. This topic covers how to configure database connections for reliability and performance.

## Why Do We Need This?

In serverless environments, each request may run on a different server instance. Creating a new database connection per request is slow and can exhaust connection limits. Connection pooling and proper connection management are essential.

## Connection Pooling

```mermaid
flowchart LR
    R1[Request 1] --> P[Connection Pool]
    R2[Request 2] --> P
    R3[Request 3] --> P
    P --> C1[(Connection 1)]
    P --> C2[(Connection 2)]
    P --> C3[(Connection 3)]
    P --> CN[(Connection N)]
    C1 --> DB[(Database)]
    C2 --> DB
    C3 --> DB
```

The pool maintains a set of persistent connections. Each request borrows a connection, uses it, and returns it.

## Global Singleton Pattern

The standard pattern is to create the database client once and reuse it across requests:

```ts
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

This works because:
- In development, the module is hot-reloaded — storing on `globalThis` prevents creating new instances on every reload
- In production, the singleton is cached in the module scope

## Environment Variables

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

```ts
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
```

## Serverless Connection Pooling

For serverless deployments (Vercel, Netlify), use a connection pooler:

### Prisma with PgBouncer

```bash
# .env
# Use the pooler URL instead of the direct connection
DATABASE_URL="postgresql://user:password@pooler.example.com:6543/mydb?pgbouncer=true"
```

```ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})
```

### Prisma Accelerate

Prisma Accelerate provides global caching and connection pooling:

```bash
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_KEY"
```

```ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/extension-accelerate'

const db = new PrismaClient().$extends(accelerate)
```

## Connection Management in Server Actions

```ts
// app/actions/users.ts
"use server"

import { db } from '@/lib/db'

export async function getUsers() {
  // db is reused — no new connection created per request
  return db.user.findMany({ take: 10 })
}
```

## Database Types

| Database | Connection | Best for |
|----------|-----------|----------|
| **PostgreSQL** | `pg` + `@prisma/client` | Production apps, complex queries |
| **MySQL** | `mysql2` + `@prisma/client` | MySQL-compatible hosts (PlanetScale) |
| **SQLite** | Native Prisma support | Development, prototyping |
| **MongoDB** | `mongoose` or Prisma | Document data models |
| **Turso (libsql)** | `@libsql/client` | Edge-compatible SQLite |

## Common Mistakes

- **Creating new PrismaClient per request** — Exhausts connection limits. Always use the singleton pattern.
- **Hardcoding connection strings** — Use environment variables. Never commit secrets.
- **Ignoring connection limits** — Serverless databases have connection limits. Use a pooler.
- **Not using connection timeouts** — Slow queries can hold connections indefinitely.

## Best Practices

- Use the global singleton pattern for database clients
- Always use environment variables for connection strings
- Use a connection pooler for serverless deployments
- Enable query logging only in development
- Set connection timeouts to prevent hung connections
- Use `prisma generate` after schema changes

## Summary

Database connection management in Next.js requires the singleton pattern for reliability and connection pooling for serverless environments. The global `PrismaClient` pattern ensures you don't exhaust connections while keeping queries fast.

## Related Topics

- [Prisma with Next.js](./topic-2-prisma-with-nextjs.md)
- [Drizzle ORM with Next.js](./topic-3-drizzle-orm-with-nextjs.md)
- [Database Patterns](./topic-4-database-patterns.md)
