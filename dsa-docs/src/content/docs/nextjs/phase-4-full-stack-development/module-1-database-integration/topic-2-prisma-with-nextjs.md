# Prisma with Next.js

## Introduction

Prisma is the most popular ORM for Next.js applications. It provides type-safe database access, auto-generated queries, and declarative migrations. This topic covers the full workflow from schema design to production queries.

## Why Prisma?

- Type-safe queries with full TypeScript support
- Auto-generated client from your schema
- Declarative migrations with version control
- Visual data browser (Prisma Studio)
- Great serverless support via Prisma Accelerate

## Setup

```bash
npm install @prisma/client
npx prisma init
```

This creates:
```
prisma/
  schema.prisma    # Your data model
.env               # Database connection string
```

## Schema Design

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  bio       String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String    @id @default(cuid())
  title     String
  content   String
  published Boolean   @default(false)
  author    User      @relation(fields: [authorId], references: [id])
  authorId  String
  tags      TagOnPost[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Tag {
  id    String      @id @default(cuid())
  name  String      @unique
  posts TagOnPost[]
}

model TagOnPost {
  postId String
  tagId  String
  post   Post @relation(fields: [postId], references: [id])
  tag    Tag  @relation(fields: [tagId], references: [id])

  @@id([postId, tagId])
}
```

## Running Migrations

```bash
# Create the initial migration
npx prisma migrate dev --name init

# Create migration after schema changes
npx prisma migrate dev --name add-bio-field

# Apply migrations in production
npx prisma migrate deploy

# Generate client after pulling schema
npx prisma generate
```

## CRUD Operations

### Create

```ts
// app/actions/posts.ts
"use server"

import { db } from '@/lib/db'

export async function createPost(formData: FormData) {
  const post = await db.post.create({
    data: {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      authorId: session.user.id,
      tags: {
        create: ['react', 'nextjs'].map(name => ({
          tag: { connectOrCreate: { where: { name }, create: { name } } }
        }))
      }
    },
    include: { author: true, tags: { include: { tag: true } } }
  })
  
  return post
}
```

### Read

```ts
// app/posts/page.tsx (Server Component)
async function getPosts() {
  return db.post.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true, email: true } },
      _count: { select: { tags: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
    skip: 0,
  })
}

export default async function PostsPage() {
  const posts = await getPosts()
  
  return <div>{/* render posts */}</div>
}
```

### Update

```ts
"use server"

export async function updatePost(formData: FormData) {
  await db.post.update({
    where: { id: formData.get('postId') as string },
    data: {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    }
  })
  
  revalidatePath('/posts')
}
```

### Delete

```ts
"use server"

export async function deletePost(formData: FormData) {
  const postId = formData.get('postId') as string
  
  // Cascading delete handles related records
  await db.post.delete({ where: { id: postId } })
  
  revalidatePath('/posts')
}
```

## Relations

```ts
// Eager loading with include
const userWithPosts = await db.user.findUnique({
  where: { id: userId },
  include: {
    posts: {
      include: { tags: { include: { tag: true } } },
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    }
  }
})

// Lazy loading (separate query)
const user = await db.user.findUnique({ where: { id: userId } })
const posts = await db.user.findUnique({ where: { id: userId } }).posts()
```

## Pagination

```ts
async function getPaginatedPosts(page: number) {
  const take = 10
  const skip = (page - 1) * take
  
  const [posts, total] = await Promise.all([
    db.post.findMany({ take, skip, orderBy: { createdAt: 'desc' } }),
    db.post.count()
  ])
  
  return {
    posts,
    totalPages: Math.ceil(total / take),
    currentPage: page,
  }
}
```

## Prisma Studio

```bash
npx prisma studio
```

Opens a visual data browser at `http://localhost:5555` where you can view, create, and edit records.

## Common Mistakes

- **N+1 queries** — Use `include` or `select` to eager-load relations instead of fetching in a loop
- **Selecting all fields** — Use `select` to only fetch the fields you need
- **Forgetting `generate` after schema changes** — The client must be regenerated
- **Not using transactions** — Wrap related mutations in `$transaction`

## Best Practices

- Always generate the Prisma client after schema changes
- Use `select` to limit fetched fields for performance
- Use `include` for eager loading to avoid N+1
- Wrap related mutations in transactions
- Use Prisma Accelerate or PgBouncer for serverless
- Run `npx prisma studio` during development for quick data inspection

## Summary

Prisma provides type-safe database access with auto-generated queries and declarative migrations. Use `include` for eager loading, `select` for field limiting, and `$transaction` for atomic operations. The Prisma client is your type-safe bridge between Next.js and your database.

## Related Topics

- [Connecting to Databases](./topic-1-connecting-to-databases.md)
- [Drizzle ORM with Next.js](./topic-3-drizzle-orm-with-nextjs.md)
- [Database Patterns](./topic-4-database-patterns.md)
- [Server Actions (Phase 3)](../../phase-3-rendering-data-fetching/module-5-server-actions/)
