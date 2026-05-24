# Next.js Deep Dive — Part 3B
## Sections 13–15: Database Integration · State Management · Forms & Validation

> **Prerequisites:** Basic React knowledge, JavaScript/TypeScript familiarity, Node.js installed  
> **Skill Level:** Beginner → Production  
> **Next.js Version:** 14+ (App Router)

---

# Table of Contents

- [Section 13: Database Integration](#section-13-database-integration)
- [Section 14: State Management](#section-14-state-management)
- [Section 15: Forms and Validation](#section-15-forms-and-validation)
- [Summary & Key Takeaways](#summary)
- [Practice Exercises & Projects](#practice-exercises)
- [Interview Preparation](#interview-preparation)

---

# Section 13: Database Integration

## 13.1 Why Do We Need Databases?

Imagine building a blog. You write posts, users leave comments, and admins manage content. Where does all that data live? In memory? It disappears when the server restarts. In a file? It breaks under concurrent users. This is exactly why **databases** exist.

A **database** is an organized, persistent storage system optimized for:

| Need | What Databases Provide |
|------|------------------------|
| Persistence | Data survives server restarts |
| Concurrency | Multiple users read/write safely |
| Querying | Find exactly what you need fast |
| Integrity | Rules that prevent bad data |
| Scalability | Handle millions of records |
| Security | Role-based access, encryption |

In Next.js (App Router), databases are accessed from **Server Components**, **Route Handlers**, and **Server Actions** — never directly from the browser (that would expose credentials).

---

## 13.2 SQL vs NoSQL — The Great Debate

```
┌─────────────────────────────────────────────────────────────┐
│                     Database Types                          │
│                                                             │
│   SQL (Relational)           NoSQL (Non-Relational)         │
│   ┌─────────────────┐        ┌─────────────────┐           │
│   │  Tables & Rows  │        │  Documents/JSON │           │
│   │  Fixed Schema   │        │  Flexible Schema│           │
│   │  Strong ACID    │        │  Eventual Consist│          │
│   │  JOIN queries   │        │  Horizontal Scale│          │
│   └─────────────────┘        └─────────────────┘           │
│   Examples:                  Examples:                      │
│   • PostgreSQL               • MongoDB                      │
│   • MySQL                    • Redis                        │
│   • SQLite                   • DynamoDB                     │
└─────────────────────────────────────────────────────────────┘
```

### Detailed Comparison

| Feature | SQL | NoSQL |
|---------|-----|-------|
| **Schema** | Fixed, defined upfront | Flexible, can change per document |
| **Relationships** | JOINs between tables | Embedded docs or references |
| **Scaling** | Vertical (bigger server) | Horizontal (more servers) |
| **ACID transactions** | Full support | Varies (MongoDB supports since 4.0) |
| **Query language** | Standard SQL | Database-specific (MongoDB query language, etc.) |
| **Best for** | Banking, ERP, analytics | Social feeds, catalogs, real-time apps |
| **Learning curve** | Moderate | Low (JSON feels natural) |

### When to Choose What

```
Use SQL when:                    Use NoSQL when:
• Data is highly structured      • Schema changes often
• Complex relationships          • Storing JSON-like documents
• Financial/transactional data   • High write throughput needed
• Reporting & analytics          • Hierarchical/nested data
• Team knows SQL well            • Prototyping quickly
```

---

## 13.3 Database Architecture Basics

```svg
<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <!-- Background -->
  <rect width="700" height="420" fill="#0f172a" rx="12"/>
  
  <!-- Title -->
  <text x="350" y="30" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Database Architecture in Next.js</text>

  <!-- Client Browser -->
  <rect x="30" y="55" width="120" height="50" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="90" y="75" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">Browser</text>
  <text x="90" y="92" text-anchor="middle" fill="#64748b" font-size="10">Client Side</text>

  <!-- Arrow 1 -->
  <line x1="150" y1="80" x2="195" y2="80" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="172" y="72" text-anchor="middle" fill="#64748b" font-size="9">HTTP</text>

  <!-- Next.js Server -->
  <rect x="195" y="45" width="150" height="70" rx="8" fill="#1a2e1a" stroke="#22c55e" stroke-width="1.5"/>
  <text x="270" y="68" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">Next.js Server</text>
  <text x="270" y="83" text-anchor="middle" fill="#4ade80" font-size="10">Route Handlers</text>
  <text x="270" y="97" text-anchor="middle" fill="#4ade80" font-size="10">Server Actions</text>

  <!-- Arrow 2 -->
  <line x1="345" y1="80" x2="395" y2="80" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="370" y="72" text-anchor="middle" fill="#64748b" font-size="9">Query</text>

  <!-- ORM Layer -->
  <rect x="395" y="55" width="120" height="50" rx="8" fill="#2d1f4e" stroke="#a855f7" stroke-width="1.5"/>
  <text x="455" y="75" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">ORM Layer</text>
  <text x="455" y="92" text-anchor="middle" fill="#c084fc" font-size="10">Prisma / Drizzle</text>

  <!-- Arrow 3 -->
  <line x1="515" y1="80" x2="560" y2="80" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Database -->
  <ellipse cx="610" cy="80" rx="55" ry="20" fill="#1f2937" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="555" y="80" width="110" height="30" fill="#1f2937" stroke="#f59e0b" stroke-width="1.5" stroke-top="none"/>
  <ellipse cx="610" cy="110" rx="55" ry="20" fill="#1f2937" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="610" y="95" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">Database</text>

  <!-- Connection Pool Box -->
  <rect x="30" y="160" width="640" height="100" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="350" y="183" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Connection Pool</text>
  
  <!-- Pool connections -->
  <rect x="60" y="195" width="80" height="30" rx="5" fill="#0f4c75" stroke="#0284c7" stroke-width="1"/>
  <text x="100" y="215" text-anchor="middle" fill="#7dd3fc" font-size="10">Conn #1</text>
  
  <rect x="160" y="195" width="80" height="30" rx="5" fill="#0f4c75" stroke="#0284c7" stroke-width="1"/>
  <text x="200" y="215" text-anchor="middle" fill="#7dd3fc" font-size="10">Conn #2</text>
  
  <rect x="260" y="195" width="80" height="30" rx="5" fill="#0f4c75" stroke="#0284c7" stroke-width="1"/>
  <text x="300" y="215" text-anchor="middle" fill="#7dd3fc" font-size="10">Conn #3</text>
  
  <rect x="360" y="195" width="80" height="30" rx="5" fill="#1a3a1a" stroke="#16a34a" stroke-width="1"/>
  <text x="400" y="215" text-anchor="middle" fill="#86efac" font-size="10">Conn #4 ✓</text>
  
  <rect x="460" y="195" width="80" height="30" rx="5" fill="#3a1a1a" stroke="#dc2626" stroke-width="1"/>
  <text x="500" y="215" text-anchor="middle" fill="#fca5a5" font-size="10">Conn #5 ✗</text>
  
  <rect x="560" y="195" width="80" height="30" rx="5" fill="#0f4c75" stroke="#0284c7" stroke-width="1"/>
  <text x="600" y="215" text-anchor="middle" fill="#7dd3fc" font-size="10">Conn #6</text>

  <text x="350" y="248" text-anchor="middle" fill="#475569" font-size="10">✓ = Active  ✗ = Idle/Failed  Pool reuses connections instead of creating new ones each request</text>

  <!-- Environment vars box -->
  <rect x="30" y="285" width="300" height="110" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="180" y="305" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Environment Variables</text>
  <text x="50" y="325" fill="#4ade80" font-size="10">.env.local</text>
  <rect x="50" y="333" width="260" height="52" rx="4" fill="#0d1117"/>
  <text x="60" y="350" fill="#fbbf24" font-size="10">DATABASE_URL="postgresql://..."</text>
  <text x="60" y="366" fill="#fbbf24" font-size="10">DB_PASSWORD="secret"</text>
  <text x="60" y="378" fill="#64748b" font-size="10"># Never commit to git!</text>

  <!-- Schema box -->
  <rect x="360" y="285" width="310" height="110" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="515" y="305" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Schema Design Principles</text>
  <text x="380" y="325" fill="#c084fc" font-size="10">• Normalize (avoid data duplication)</text>
  <text x="380" y="343" fill="#c084fc" font-size="10">• Index frequently queried columns</text>
  <text x="380" y="361" fill="#c084fc" font-size="10">• Use appropriate data types</text>
  <text x="380" y="379" fill="#c084fc" font-size="10">• Design for your query patterns</text>

  <!-- Arrow marker -->
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---

## 13.4 Setting Up Environment Variables

Before connecting to any database, store credentials safely:

```bash
# .env.local (never commit this file!)
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/mydb"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="nextjs_app"
DB_USER="postgres"
DB_PASSWORD="supersecret"
```

```typescript
// Access in Next.js server code
const dbUrl = process.env.DATABASE_URL;

// With validation (recommended)
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}
```

> ⚠️ **Critical:** Add `.env.local` to your `.gitignore`. Never expose credentials in client-side code.

---

## 13.5 MongoDB with Mongoose

### What is MongoDB?

MongoDB stores data as **JSON-like documents** (called BSON internally). Instead of rows in tables, you have documents in collections.

```
SQL World          →      MongoDB World
─────────────────────────────────────────
Database           →      Database
Table              →      Collection
Row                →      Document
Column             →      Field
Primary Key        →      _id (auto-generated)
JOIN               →      $lookup or embedded docs
```

### Installation

```bash
npm install mongoose
npm install --save-dev @types/mongoose  # if needed
```

### Connection Setup

```typescript
// lib/mongodb.ts
import mongoose from "mongoose";

// Global variable to cache connection (important in Next.js dev!)
declare global {
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Initialize global cache
let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = {
    conn: null,
    promise: null,
  };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Get URI from environment
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  // Create connection promise if not exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,     // Don't queue commands when disconnected
      maxPoolSize: 10,           // Max 10 concurrent connections
      serverSelectionTimeoutMS: 5000, // Fail fast if can't connect
      socketTimeoutMS: 45000,    // Close sockets after 45s of inactivity
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
```

### Defining Models

```typescript
// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

// TypeScript interface for type safety
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,                           // Creates an index
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      select: false,    // Don't return password by default in queries
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,   // Automatically adds createdAt and updatedAt
  }
);

// Add index for performance
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });

// Prevent model recompilation in Next.js (hot reload issue)
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
```

```typescript
// models/Product.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  isActive: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    stock: { type: Number, default: 0, min: 0 },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Text index for search functionality
ProductSchema.index({ name: "text", description: "text" });

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
```

---

## 13.6 PostgreSQL with Prisma

### What is Prisma?

Prisma is a **next-generation ORM** that gives you type-safe database access with an auto-generated query builder. It works with PostgreSQL, MySQL, SQLite, MongoDB, and more.

```
Without Prisma:              With Prisma:
───────────────────────────────────────────
Raw SQL strings          →   Type-safe API
Manual type casting      →   Auto-generated types
Runtime errors           →   Compile-time errors
Writing migrations       →   `prisma migrate dev`
```

### Installation & Setup

```bash
npm install prisma @prisma/client
npx prisma init   # Creates prisma/schema.prisma and .env
```

### Schema Definition

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User model
model User {
  id        String    @id @default(cuid())
  name      String
  email     String    @unique
  password  String
  role      Role      @default(USER)
  posts     Post[]    // One-to-many relationship
  profile   Profile?  // One-to-one (optional)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([email])
  @@map("users")          // Table name in database
}

// Profile (one-to-one with User)
model Profile {
  id     String  @id @default(cuid())
  bio    String?
  avatar String?
  userId String  @unique
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Post model
model Post {
  id          String     @id @default(cuid())
  title       String
  content     String
  published   Boolean    @default(false)
  authorId    String
  author      User       @relation(fields: [authorId], references: [id])
  tags        Tag[]      // Many-to-many
  comments    Comment[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([authorId])
  @@index([published, createdAt(sort: Desc)])
}

// Tag (many-to-many with Post)
model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]
}

// Comment
model Comment {
  id        String   @id @default(cuid())
  content   String
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorName String
  createdAt  DateTime @default(now())
}

// Todo model
model Todo {
  id          String   @id @default(cuid())
  title       String
  completed   Boolean  @default(false)
  userId      String
  dueDate     DateTime?
  priority    Priority @default(MEDIUM)
  createdAt   DateTime @default(now())
}

enum Role {
  USER
  ADMIN
  MODERATOR
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

### Prisma Client Setup (Next.js Safe)

```typescript
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances in Next.js dev mode
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;  // Cache in development
}

export default prisma;
```

### Migrations

```bash
# Create and apply a migration
npx prisma migrate dev --name init

# Apply migrations in production
npx prisma migrate deploy

# Reset database (dev only!)
npx prisma migrate reset

# View database in browser
npx prisma studio

# Generate Prisma client after schema changes
npx prisma generate
```

---

## 13.7 MySQL with Drizzle ORM

### What is Drizzle?

Drizzle is a **lightweight, TypeScript-first ORM** that uses a SQL-like syntax. It's known for being fast and having zero magic — you can see exactly what SQL it generates.

```bash
npm install drizzle-orm mysql2
npm install -D drizzle-kit
```

```typescript
// db/schema.ts
import {
  mysqlTable,
  varchar,
  int,
  boolean,
  timestamp,
  text,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// Users table
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Posts table
export const posts = mysqlTable("posts", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  published: boolean("published").default(false),
  authorId: int("author_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
```

```typescript
// db/index.ts
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const db = drizzle(connection, { schema });
```

---

## 13.8 CRUD Operations

### API-to-Database Flow

```svg
<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <rect width="700" height="380" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">API → Database Request Lifecycle</text>

  <!-- Steps -->
  <!-- Step 1 -->
  <rect x="20" y="50" width="110" height="55" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="72" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">1. Request</text>
  <text x="75" y="88" text-anchor="middle" fill="#64748b" font-size="9">POST /api/users</text>
  <text x="75" y="100" text-anchor="middle" fill="#64748b" font-size="9">{ name, email }</text>

  <line x1="130" y1="77" x2="160" y2="77" stroke="#334155" stroke-width="1.5" marker-end="url(#a2)"/>

  <!-- Step 2 -->
  <rect x="160" y="50" width="110" height="55" rx="6" fill="#1a2e1a" stroke="#22c55e" stroke-width="1.5"/>
  <text x="215" y="72" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">2. Validate</text>
  <text x="215" y="88" text-anchor="middle" fill="#64748b" font-size="9">Zod schema</text>
  <text x="215" y="100" text-anchor="middle" fill="#64748b" font-size="9">check inputs</text>

  <line x1="270" y1="77" x2="300" y2="77" stroke="#334155" stroke-width="1.5" marker-end="url(#a2)"/>

  <!-- Step 3 -->
  <rect x="300" y="50" width="110" height="55" rx="6" fill="#2d1f4e" stroke="#a855f7" stroke-width="1.5"/>
  <text x="355" y="72" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">3. Auth</text>
  <text x="355" y="88" text-anchor="middle" fill="#64748b" font-size="9">check session</text>
  <text x="355" y="100" text-anchor="middle" fill="#64748b" font-size="9">permissions</text>

  <line x1="410" y1="77" x2="440" y2="77" stroke="#334155" stroke-width="1.5" marker-end="url(#a2)"/>

  <!-- Step 4 -->
  <rect x="440" y="50" width="110" height="55" rx="6" fill="#2d1f0e" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="495" y="72" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">4. Query</text>
  <text x="495" y="88" text-anchor="middle" fill="#64748b" font-size="9">ORM builds SQL</text>
  <text x="495" y="100" text-anchor="middle" fill="#64748b" font-size="9">executes query</text>

  <line x1="550" y1="77" x2="580" y2="77" stroke="#334155" stroke-width="1.5" marker-end="url(#a2)"/>

  <!-- Step 5 -->
  <rect x="580" y="50" width="100" height="55" rx="6" fill="#1f2937" stroke="#10b981" stroke-width="1.5"/>
  <text x="630" y="72" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">5. Return</text>
  <text x="630" y="88" text-anchor="middle" fill="#64748b" font-size="9">JSON response</text>
  <text x="630" y="100" text-anchor="middle" fill="#64748b" font-size="9">201 Created</text>

  <!-- CRUD operations table -->
  <rect x="20" y="130" width="660" height="220" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="350" y="152" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">CRUD Operations Map</text>

  <!-- Headers -->
  <rect x="30" y="160" width="640" height="22" rx="3" fill="#0f172a"/>
  <text x="80" y="175" text-anchor="middle" fill="#64748b" font-size="10" font-weight="bold">Operation</text>
  <text x="200" y="175" text-anchor="middle" fill="#64748b" font-size="10" font-weight="bold">HTTP Method</text>
  <text x="330" y="175" text-anchor="middle" fill="#64748b" font-size="10" font-weight="bold">Prisma</text>
  <text x="480" y="175" text-anchor="middle" fill="#64748b" font-size="10" font-weight="bold">Mongoose</text>
  <text x="620" y="175" text-anchor="middle" fill="#64748b" font-size="10" font-weight="bold">Status</text>

  <!-- Rows -->
  <text x="80" y="198" text-anchor="middle" fill="#f87171" font-size="10">CREATE</text>
  <text x="200" y="198" text-anchor="middle" fill="#93c5fd" font-size="10">POST</text>
  <text x="330" y="198" text-anchor="middle" fill="#c084fc" font-size="10">prisma.user.create()</text>
  <text x="480" y="198" text-anchor="middle" fill="#4ade80" font-size="10">User.create()</text>
  <text x="620" y="198" text-anchor="middle" fill="#86efac" font-size="10">201 Created</text>

  <text x="80" y="220" text-anchor="middle" fill="#fbbf24" font-size="10">READ (one)</text>
  <text x="200" y="220" text-anchor="middle" fill="#93c5fd" font-size="10">GET</text>
  <text x="330" y="220" text-anchor="middle" fill="#c084fc" font-size="10">prisma.user.findUnique()</text>
  <text x="480" y="220" text-anchor="middle" fill="#4ade80" font-size="10">User.findById()</text>
  <text x="620" y="220" text-anchor="middle" fill="#86efac" font-size="10">200 OK</text>

  <text x="80" y="242" text-anchor="middle" fill="#fbbf24" font-size="10">READ (many)</text>
  <text x="200" y="242" text-anchor="middle" fill="#93c5fd" font-size="10">GET</text>
  <text x="330" y="242" text-anchor="middle" fill="#c084fc" font-size="10">prisma.user.findMany()</text>
  <text x="480" y="242" text-anchor="middle" fill="#4ade80" font-size="10">User.find()</text>
  <text x="620" y="242" text-anchor="middle" fill="#86efac" font-size="10">200 OK</text>

  <text x="80" y="264" text-anchor="middle" fill="#60a5fa" font-size="10">UPDATE</text>
  <text x="200" y="264" text-anchor="middle" fill="#93c5fd" font-size="10">PUT / PATCH</text>
  <text x="330" y="264" text-anchor="middle" fill="#c084fc" font-size="10">prisma.user.update()</text>
  <text x="480" y="264" text-anchor="middle" fill="#4ade80" font-size="10">User.findByIdAndUpdate()</text>
  <text x="620" y="264" text-anchor="middle" fill="#86efac" font-size="10">200 OK</text>

  <text x="80" y="286" text-anchor="middle" fill="#f87171" font-size="10">DELETE</text>
  <text x="200" y="286" text-anchor="middle" fill="#93c5fd" font-size="10">DELETE</text>
  <text x="330" y="286" text-anchor="middle" fill="#c084fc" font-size="10">prisma.user.delete()</text>
  <text x="480" y="286" text-anchor="middle" fill="#4ade80" font-size="10">User.findByIdAndDelete()</text>
  <text x="620" y="286" text-anchor="middle" fill="#86efac" font-size="10">200 OK</text>

  <text x="80" y="308" text-anchor="middle" fill="#a78bfa" font-size="10">UPSERT</text>
  <text x="200" y="308" text-anchor="middle" fill="#93c5fd" font-size="10">POST / PUT</text>
  <text x="330" y="308" text-anchor="middle" fill="#c084fc" font-size="10">prisma.user.upsert()</text>
  <text x="480" y="308" text-anchor="middle" fill="#4ade80" font-size="10">User.findOneAndUpdate({upsert})</text>
  <text x="620" y="308" text-anchor="middle" fill="#86efac" font-size="10">200/201</text>

  <defs>
    <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
</svg>
```

### CRUD with Prisma — Practical Examples

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Validation schema
const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

// CREATE — POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validated = createUserSchema.parse(body);

    // Hash password (in real app, use bcrypt)
    // const hashedPassword = await bcrypt.hash(validated.password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: validated.password, // use hashedPassword in production
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        // password: false  — excluded for security
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// READ ALL — GET /api/users
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";

  const skip = (page - 1) * limit;

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.user.count({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  return NextResponse.json({
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
```

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// READ ONE — GET /api/users/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      posts: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 5,  // Only last 5 posts
      },
      profile: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// UPDATE — PATCH /api/users/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const user = await prisma.user.update({
    where: { id: params.id },
    data: body,  // Only updates provided fields
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json(user);
}

// DELETE — DELETE /api/users/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.user.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "User deleted successfully" });
}
```

---

## 13.9 Relationships in Databases

### Types of Relationships

| Relationship | Example | Prisma | Mongoose |
|---|---|---|---|
| One-to-One | User → Profile | `@relation` + `@unique` | `ref` field |
| One-to-Many | User → Posts | Array field | `ref` array |
| Many-to-Many | Posts ↔ Tags | Implicit join table | Array of refs |
| Self-referential | User → Manager | `self` relation | Same model ref |

```typescript
// Querying with relationships in Prisma
const userWithPosts = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    posts: {
      include: {
        tags: true,       // Include tags for each post
        comments: {
          take: 3,        // Only first 3 comments
          orderBy: { createdAt: "desc" },
        },
      },
    },
    profile: true,
  },
});

// Nested create (create user and profile together)
const newUser = await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@example.com",
    password: "hashed",
    profile: {
      create: {          // Create related profile in one query
        bio: "Developer",
        avatar: "https://example.com/avatar.jpg",
      },
    },
  },
  include: { profile: true },
});
```

```typescript
// Mongoose population (similar to JOIN)
const user = await User.findById(userId)
  .populate({
    path: "posts",
    select: "title createdAt",
    populate: {
      path: "comments",
      select: "content author",
    },
  })
  .lean();  // Returns plain JS object instead of Mongoose document (faster)
```

---

## 13.10 Transactions

Transactions ensure multiple operations either **all succeed** or **all fail** — critical for financial or multi-step operations.

```typescript
// Prisma interactive transaction
const result = await prisma.$transaction(async (tx) => {
  // Deduct from sender
  const sender = await tx.account.update({
    where: { id: senderId },
    data: { balance: { decrement: amount } },
  });

  // Ensure balance doesn't go negative
  if (sender.balance < 0) {
    throw new Error("Insufficient funds");  // Rolls back entire transaction
  }

  // Add to receiver
  const receiver = await tx.account.update({
    where: { id: receiverId },
    data: { balance: { increment: amount } },
  });

  // Log the transaction
  const log = await tx.transactionLog.create({
    data: {
      senderId,
      receiverId,
      amount,
      type: "TRANSFER",
    },
  });

  return { sender, receiver, log };
});
```

---

## 13.11 Database Seeding

Seeding populates the database with initial or test data.

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashed_password",
      role: "ADMIN",
    },
  });

  // Create sample posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: "Getting Started with Next.js",
        content: "Next.js is a React framework...",
        published: true,
        authorId: admin.id,
        tags: {
          connectOrCreate: [
            { where: { name: "nextjs" }, create: { name: "nextjs" } },
            { where: { name: "react" }, create: { name: "react" } },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Seeded ${posts.length} posts`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

```json
// package.json — add seed script
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

```bash
npx prisma db seed
```

---

## 13.12 Database Optimization

### Indexing Strategy

```prisma
// In Prisma schema — add indexes for frequently queried fields
model Post {
  id        String   @id
  title     String
  published Boolean
  authorId  String
  createdAt DateTime @default(now())

  // Composite index — optimizes: findMany where published=true orderBy createdAt
  @@index([published, createdAt(sort: Desc)])
  
  // Single field index
  @@index([authorId])
  
  // Full-text search (PostgreSQL)
  @@index([title], type: BTree)
}
```

### Query Optimization Tips

```typescript
// ❌ N+1 Problem — fetches each user's posts separately
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { authorId: user.id } });
}

// ✅ Single query with include
const users = await prisma.user.findMany({
  include: { posts: true },  // JOIN in one query
});

// ✅ Select only needed fields (less data transfer)
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    // Don't select password, createdAt, etc. if not needed
  },
});

// ✅ Pagination (never fetch all records!)
const posts = await prisma.post.findMany({
  take: 20,
  skip: (page - 1) * 20,
  orderBy: { createdAt: "desc" },
});
```

---

## 13.13 Security Best Practices

```typescript
// ✅ Use parameterized queries (ORM handles this automatically)
// Prisma is safe by default against SQL injection

// ❌ Never build raw SQL from user input
// const result = await prisma.$queryRaw(`SELECT * FROM users WHERE id = ${userId}`);

// ✅ Safe raw query with parameters
const result = await prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}`;

// ✅ Sanitize and validate all input before database operations
const safeInput = z.object({
  name: z.string().max(100).trim(),
  email: z.string().email().toLowerCase(),
}).parse(rawInput);

// ✅ Limit returned fields (never return passwords)
const user = await prisma.user.findUnique({
  where: { email },
  select: { id: true, name: true, role: true },
  // password is NOT in select — never returned
});
```

---

## 13.14 Best Practices

| # | Practice | Why |
|---|----------|-----|
| 1 | Use a singleton Prisma/Mongoose client | Prevent connection exhaustion |
| 2 | Always use environment variables | Never hardcode credentials |
| 3 | Validate input before database calls | Prevent bad data and injection |
| 4 | Use transactions for multi-step operations | Data consistency |
| 5 | Index frequently queried columns | Query performance |
| 6 | Paginate all list queries | Prevent memory issues |
| 7 | Select only needed fields | Reduce data transfer |
| 8 | Use connection pooling | Handle concurrent requests |
| 9 | Log slow queries in development | Find performance bottlenecks |
| 10 | Run migrations in CI/CD, not application start | Prevent race conditions |

---

## 13.15 Common Mistakes

```typescript
// ❌ MISTAKE 1: Creating new PrismaClient on every request
export async function GET() {
  const prisma = new PrismaClient();  // Don't do this!
  // ...
}

// ✅ Import singleton instance
import prisma from "@/lib/prisma";

// ❌ MISTAKE 2: Not handling database errors
const user = await prisma.user.findUnique({ where: { id } });
console.log(user.name);  // Crashes if user is null!

// ✅ Check for null
if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

// ❌ MISTAKE 3: Fetching all records without pagination
const allUsers = await prisma.user.findMany();  // Could be millions!

// ✅ Always paginate
const users = await prisma.user.findMany({ take: 20, skip: 0 });

// ❌ MISTAKE 4: Not using .lean() in Mongoose
const user = await User.findById(id);  // Returns heavy Mongoose document

// ✅ Use lean for read-only operations
const user = await User.findById(id).lean();  // Plain JS object, faster

// ❌ MISTAKE 5: Not indexing foreign keys
// Querying posts by authorId without an index = full table scan
```

---

## 13.16 Interview Questions — Database Integration

| Level | Question | Key Points |
|-------|----------|------------|
| 🟢 Beginner | What is an ORM? | Abstraction over raw SQL, type safety |
| 🟢 Beginner | SQL vs NoSQL differences? | Schema, scaling, use cases |
| 🟡 Intermediate | What is connection pooling? | Reuse connections, limit overhead |
| 🟡 Intermediate | How do you prevent SQL injection? | Parameterized queries, ORMs |
| 🟡 Intermediate | Explain N+1 query problem | Loading relations one by one vs JOIN |
| 🔴 Advanced | How do database transactions work? | ACID, rollback on failure |
| 🔴 Advanced | How would you design a schema for a Twitter-like app? | Users, Tweets, Follows, Likes, indexes |
| 🔴 Advanced | Strategies for database optimization? | Indexing, caching, read replicas, sharding |

---

# Section 14: State Management

## 14.1 What Is State Management?

**State** is any data that can change over time in your application. Think of it as the app's "memory."

```
Examples of State:
─────────────────────────────────────────────
✅ Is the user logged in?        → Auth state
✅ Items in shopping cart        → Cart state
✅ Current theme (dark/light)    → UI state  
✅ List of fetched blog posts     → Server state
✅ Form input values             → Form state
✅ Active tab in navigation      → Navigation state
```

### Local vs Global State

```
Local State:                    Global State:
───────────────────────────────────────────────
Lives in one component          Shared across many components
Managed with useState           Managed with Context/Redux/Zustand
Dies when component unmounts    Persists across navigation
Example: dropdown open/closed   Example: user authentication
```

---

## 14.2 State Flow Diagram

```svg
<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <rect width="700" height="400" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">State Management Options in React/Next.js</text>

  <!-- Local State -->
  <rect x="20" y="50" width="150" height="140" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="95" y="72" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">Local State</text>
  <text x="95" y="90" text-anchor="middle" fill="#64748b" font-size="9">Component-scoped</text>
  <rect x="35" y="98" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="95" y="113" text-anchor="middle" fill="#4ade80" font-size="10">useState()</text>
  <rect x="35" y="125" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="95" y="140" text-anchor="middle" fill="#4ade80" font-size="10">useReducer()</text>
  <rect x="35" y="152" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="95" y="167" text-anchor="middle" fill="#4ade80" font-size="10">useRef()</text>

  <!-- Global State -->
  <rect x="190" y="50" width="150" height="140" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
  <text x="265" y="72" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">Global State</text>
  <text x="265" y="90" text-anchor="middle" fill="#64748b" font-size="9">Cross-component</text>
  <rect x="205" y="98" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="265" y="113" text-anchor="middle" fill="#c084fc" font-size="10">Context API</text>
  <rect x="205" y="125" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="265" y="140" text-anchor="middle" fill="#c084fc" font-size="10">Redux Toolkit</text>
  <rect x="205" y="152" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="265" y="167" text-anchor="middle" fill="#c084fc" font-size="10">Zustand</text>

  <!-- Server State -->
  <rect x="360" y="50" width="150" height="140" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="435" y="72" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">Server State</text>
  <text x="435" y="90" text-anchor="middle" fill="#64748b" font-size="9">Remote/async data</text>
  <rect x="375" y="98" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="435" y="113" text-anchor="middle" fill="#fbbf24" font-size="10">TanStack Query</text>
  <rect x="375" y="125" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="435" y="140" text-anchor="middle" fill="#fbbf24" font-size="10">SWR</text>
  <rect x="375" y="152" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="435" y="167" text-anchor="middle" fill="#fbbf24" font-size="10">Apollo (GraphQL)</text>

  <!-- URL State -->
  <rect x="530" y="50" width="150" height="140" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
  <text x="605" y="72" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">URL State</text>
  <text x="605" y="90" text-anchor="middle" fill="#64748b" font-size="9">In URL params</text>
  <rect x="545" y="98" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="605" y="113" text-anchor="middle" fill="#4ade80" font-size="10">useSearchParams()</text>
  <rect x="545" y="125" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="605" y="140" text-anchor="middle" fill="#4ade80" font-size="10">useRouter()</text>
  <rect x="545" y="152" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="605" y="167" text-anchor="middle" fill="#4ade80" font-size="10">usePathname()</text>

  <!-- Decision guide -->
  <rect x="20" y="215" width="660" height="160" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="350" y="237" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">When to Use What?</text>

  <text x="40" y="260" fill="#3b82f6" font-size="11" font-weight="bold">useState</text>
  <text x="130" y="260" fill="#64748b" font-size="10">→ Toggle, counter, single component form input</text>

  <text x="40" y="282" fill="#a855f7" font-size="11" font-weight="bold">useReducer</text>
  <text x="130" y="282" fill="#64748b" font-size="10">→ Complex state with multiple actions (like cart)</text>

  <text x="40" y="304" fill="#6366f1" font-size="11" font-weight="bold">Context API</text>
  <text x="130" y="304" fill="#64748b" font-size="10">→ Theme, auth, small-medium global state</text>

  <text x="40" y="326" fill="#f59e0b" font-size="11" font-weight="bold">Redux / Zustand</text>
  <text x="130" y="326" fill="#64748b" font-size="10">→ Large-scale app, many slices of state, team project</text>

  <text x="40" y="348" fill="#10b981" font-size="11" font-weight="bold">TanStack Query</text>
  <text x="130" y="348" fill="#64748b" font-size="10">→ API data fetching, caching, refetching, mutations</text>
  <text x="40" y="366" fill="#64748b" font-size="10">→ Any server-side data that needs to stay in sync</text>
</svg>
```

---

## 14.3 useState — The Foundation

```tsx
"use client";

import { useState } from "react";

// Basic counter
export function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Object state
interface User {
  name: string;
  email: string;
  age: number;
}

export function UserForm() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    age: 0,
  });

  // Update a single field without losing others
  const updateField = (field: keyof User, value: string | number) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => updateField("name", e.target.value)}
      />
      {/* Other fields */}
    </form>
  );
}
```

---

## 14.4 useReducer — Complex State Logic

```tsx
"use client";

import { useReducer } from "react";

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

// Actions (discriminated union for type safety)
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

// Reducer — pure function: (state, action) => newState
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      
      if (existing) {
        // Increase quantity if already in cart
        const items = state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        return { items, total: calculateTotal(items) };
      }
      
      const items = [...state.items, { ...action.payload, quantity: 1 }];
      return { items, total: calculateTotal(items) };
    }

    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload.id);
      return { items, total: calculateTotal(items) };
    }

    case "UPDATE_QUANTITY": {
      const items = state.items.map((i) =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
      return { items, total: calculateTotal(items) };
    }

    case "CLEAR_CART":
      return { items: [], total: 0 };

    default:
      return state;
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Usage in component
export function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: { id } });

  return (
    <div>
      <p>Items: {cart.items.length} | Total: ${cart.total.toFixed(2)}</p>
      {cart.items.map((item) => (
        <div key={item.id}>
          <span>{item.name} × {item.quantity}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

---

## 14.5 Context API — Sharing State Without Prop Drilling

```svg
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <rect width="700" height="340" fill="#0f172a" rx="12"/>
  <text x="350" y="26" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Prop Drilling vs Context API</text>

  <!-- Without Context (Prop Drilling) -->
  <text x="175" y="52" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">❌ Prop Drilling</text>
  
  <rect x="125" y="60" width="100" height="30" rx="5" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
  <text x="175" y="79" text-anchor="middle" fill="#93c5fd" font-size="10">App (has theme)</text>

  <line x1="175" y1="90" x2="175" y2="110" stroke="#ef4444" stroke-width="1.5"/>
  <text x="190" y="104" fill="#ef4444" font-size="9">theme↓</text>
  
  <rect x="100" y="110" width="150" height="30" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="175" y="129" text-anchor="middle" fill="#94a3b8" font-size="10">Layout (passes theme)</text>

  <line x1="175" y1="140" x2="175" y2="160" stroke="#ef4444" stroke-width="1.5"/>
  <text x="190" y="154" fill="#ef4444" font-size="9">theme↓</text>

  <rect x="100" y="160" width="150" height="30" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="175" y="179" text-anchor="middle" fill="#94a3b8" font-size="10">Page (passes theme)</text>

  <line x1="175" y1="190" x2="175" y2="210" stroke="#ef4444" stroke-width="1.5"/>
  <text x="190" y="204" fill="#ef4444" font-size="9">theme↓</text>

  <rect x="100" y="210" width="150" height="30" rx="5" fill="#3a1a1a" stroke="#dc2626" stroke-width="1"/>
  <text x="175" y="229" text-anchor="middle" fill="#fca5a5" font-size="10">Button (uses theme)</text>

  <text x="175" y="265" text-anchor="middle" fill="#ef4444" font-size="9">Passes through every level</text>
  <text x="175" y="280" text-anchor="middle" fill="#ef4444" font-size="9">even if not used!</text>

  <!-- With Context -->
  <text x="525" y="52" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">✅ Context API</text>

  <!-- Context provider wrapper -->
  <rect x="400" y="60" width="250" height="240" rx="8" fill="#0f2a1f" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="525" y="78" text-anchor="middle" fill="#4ade80" font-size="10">ThemeContext.Provider</text>

  <rect x="425" y="88" width="200" height="28" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="525" y="106" text-anchor="middle" fill="#94a3b8" font-size="10">App</text>

  <rect x="425" y="128" width="200" height="28" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="525" y="146" text-anchor="middle" fill="#94a3b8" font-size="10">Layout (no theme prop)</text>

  <rect x="425" y="168" width="200" height="28" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="525" y="186" text-anchor="middle" fill="#94a3b8" font-size="10">Page (no theme prop)</text>

  <!-- Context direct line -->
  <line x1="650" y1="90" x2="650" y2="207" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="650" y1="207" x2="625" y2="207" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ag)"/>

  <rect x="425" y="196" width="200" height="28" rx="5" fill="#1a3a1a" stroke="#22c55e" stroke-width="1.5"/>
  <text x="525" y="214" text-anchor="middle" fill="#86efac" font-size="10">Button (useContext!)</text>

  <text x="660" y="148" fill="#22c55e" font-size="9" writing-mode="vertical-lr">useContext</text>

  <text x="525" y="260" text-anchor="middle" fill="#4ade80" font-size="9">Accesses theme directly</text>
  <text x="525" y="275" text-anchor="middle" fill="#4ade80" font-size="9">without passing through!</text>
  <text x="525" y="292" text-anchor="middle" fill="#64748b" font-size="9">No prop drilling needed</text>

  <defs>
    <marker id="ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#22c55e"/>
    </marker>
  </defs>
</svg>
```

### Implementing Context API

```tsx
// context/ThemeContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// Create context with default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — much cleaner than useContext(ThemeContext) everywhere
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
```

```tsx
// app/layout.tsx — wrap the app
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// Any deeply nested component
"use client";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();  // Direct access!

  return (
    <button
      onClick={toggleTheme}
      className={isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
    >
      {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
```

---

## 14.6 Redux Toolkit

### Redux Architecture

```svg
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <rect width="700" height="320" fill="#0f172a" rx="12"/>
  <text x="350" y="26" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Redux Data Flow (Unidirectional)</text>

  <!-- Component -->
  <rect x="30" y="120" width="130" height="70" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="95" y="148" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">React Component</text>
  <text x="95" y="165" text-anchor="middle" fill="#64748b" font-size="9">dispatch(action)</text>
  <text x="95" y="180" text-anchor="middle" fill="#64748b" font-size="9">useSelector(state)</text>

  <!-- Arrow: Component → Dispatch -->
  <line x1="160" y1="155" x2="205" y2="155" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ar1)"/>
  <text x="182" y="146" text-anchor="middle" fill="#3b82f6" font-size="9">dispatch</text>

  <!-- Action -->
  <rect x="205" y="125" width="120" height="60" rx="8" fill="#1a2e1a" stroke="#22c55e" stroke-width="1.5"/>
  <text x="265" y="148" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">Action</text>
  <text x="265" y="162" text-anchor="middle" fill="#4ade80" font-size="9">{ type: 'cart/add'</text>
  <text x="265" y="175" text-anchor="middle" fill="#4ade80" font-size="9">  payload: item }</text>

  <!-- Arrow: Action → Reducer -->
  <line x1="325" y1="155" x2="370" y2="155" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ar1)"/>

  <!-- Reducer -->
  <rect x="370" y="125" width="120" height="60" rx="8" fill="#2d1f4e" stroke="#a855f7" stroke-width="1.5"/>
  <text x="430" y="148" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">Reducer</text>
  <text x="430" y="162" text-anchor="middle" fill="#c084fc" font-size="9">pure function</text>
  <text x="430" y="175" text-anchor="middle" fill="#c084fc" font-size="9">(state, action) ⇒ newState</text>

  <!-- Arrow: Reducer → Store -->
  <line x1="490" y1="155" x2="540" y2="155" stroke="#a855f7" stroke-width="1.5" marker-end="url(#ar1)"/>

  <!-- Store -->
  <rect x="540" y="115" width="130" height="80" rx="8" fill="#2d1f0e" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="605" y="140" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">Redux Store</text>
  <text x="605" y="158" text-anchor="middle" fill="#fbbf24" font-size="9">Single source of truth</text>
  <text x="605" y="172" text-anchor="middle" fill="#fbbf24" font-size="9">{ cart, auth, theme }</text>
  <text x="605" y="185" text-anchor="middle" fill="#fbbf24" font-size="9">immutable updates</text>

  <!-- Arrow: Store back to Component (curved bottom) -->
  <path d="M605,195 Q605,265 350,265 Q95,265 95,190" fill="none" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#ar2)" stroke-dasharray="5,3"/>
  <text x="350" y="285" text-anchor="middle" fill="#f59e0b" font-size="10">State update triggers re-render (useSelector)</text>

  <!-- Middleware label -->
  <rect x="250" y="55" width="200" height="30" rx="5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="350" y="74" text-anchor="middle" fill="#64748b" font-size="10">Middleware (Redux Thunk / RTK Query)</text>
  <line x1="350" y1="85" x2="350" y2="125" stroke="#334155" stroke-width="1" stroke-dasharray="3,2"/>

  <defs>
    <marker id="ar1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
    <marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
    </marker>
  </defs>
</svg>
```

### Redux Toolkit Setup

```bash
npm install @reduxjs/toolkit react-redux
```

```typescript
// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",                    // Action type prefix
  initialState,
  reducers: {
    // Redux Toolkit uses Immer — you can "mutate" state directly!
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;   // Immer handles immutability
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Auto-generated action creators
export const { addItem, removeItem, updateQuantity, clearCart, toggleCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
```

```typescript
// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    // Add more slices here
  },
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks (use these instead of plain useSelector/useDispatch)
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

```tsx
// providers/ReduxProvider.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "@/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

```tsx
// Using Redux in a component
"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { addItem, selectCartCount } from "@/store/slices/cartSlice";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => dispatch(addItem(product))}>
        Add to Cart ({cartCount})
      </button>
    </div>
  );
}
```

---

## 14.7 Zustand — Lightweight Alternative

```bash
npm install zustand
```

```typescript
// store/useCartStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  devtools(                        // Redux DevTools support
    persist(                       // Persist to localStorage
      (set, get) => ({
        items: [],

        addItem: (item) => {
          set((state) => {
            const existing = state.items.find((i) => i.id === item.id);
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              };
            }
            return { items: [...state.items, { ...item, quantity: 1 }] };
          });
        },

        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((i) => i.id !== id),
          })),

        clearCart: () => set({ items: [] }),

        // Derived state as a function
        total: () =>
          get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      }),
      { name: "cart-storage" }     // localStorage key
    )
  )
);

// Usage — no Provider needed!
export function CartIcon() {
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return <span>🛒 {count}</span>;
}
```

---

## 14.8 TanStack Query (React Query)

For server state — data fetching, caching, synchronization.

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

```tsx
// providers/QueryProvider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,    // Data fresh for 1 minute
            retry: 2,                 // Retry failed queries twice
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

```tsx
// hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API functions
const fetchPosts = async (page: number) => {
  const res = await fetch(`/api/posts?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const createPost = async (data: { title: string; content: string }) => {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};

// Custom query hook
export function usePosts(page: number) {
  return useQuery({
    queryKey: ["posts", page],         // Cache key — unique per page
    queryFn: () => fetchPosts(page),
    placeholderData: (prev) => prev,   // Keep old data while fetching new
  });
}

// Custom mutation hook
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts after creating
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Failed to create post:", error);
    },
  });
}

// In a component
export function PostsList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = usePosts(page);
  const createPost = useCreatePost();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.posts.map((post: any) => (
        <article key={post.id}>{post.title}</article>
      ))}
      <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}
```

---

## 14.9 Comparison Tables

### Context API vs Redux vs Zustand

| Feature | Context API | Redux Toolkit | Zustand |
|---------|-------------|---------------|---------|
| **Bundle size** | 0 (built-in) | ~11KB | ~1KB |
| **Boilerplate** | Medium | Low (RTK) | Very Low |
| **DevTools** | No | Yes (Redux DevTools) | Yes |
| **Persistence** | Manual | Need middleware | Built-in |
| **Performance** | Re-renders context consumers | Optimized selectors | Selector-based |
| **Learning curve** | Low | Medium | Very Low |
| **Best for** | Small apps, theme/auth | Large teams, complex state | Medium apps, simple API |
| **TypeScript** | Good | Excellent | Good |
| **Async actions** | Manual | createAsyncThunk / RTK Query | Simple with set |

### React Query vs Redux for Server State

| Aspect | TanStack Query | Redux + Thunks |
|--------|---------------|----------------|
| **Caching** | Automatic, time-based | Manual |
| **Refetching** | On focus, interval, mount | Manual |
| **Loading states** | Built-in | Manual |
| **Deduplication** | Automatic | Manual |
| **Optimistic updates** | Built-in helpers | Manual |
| **Code volume** | ~5 lines | ~30+ lines |
| **Background updates** | Yes | Manual |
| **Best for** | API/server data | Client-only state |

---

## 14.10 Performance Optimization

```tsx
// ❌ BAD: Context causes ALL consumers to re-render
const AppContext = createContext({ user, theme, cart, notifications });
// Any change re-renders ALL consumers!

// ✅ GOOD: Split contexts by update frequency
const AuthContext = createContext({ user });           // Changes rarely
const ThemeContext = createContext({ theme });         // Changes sometimes
const CartContext = createContext({ cart });           // Changes often

// ✅ GOOD: Memoize context value
const value = useMemo(() => ({ user, login, logout }), [user]);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

// ✅ GOOD: Use selectors to prevent unnecessary re-renders with Redux
// BAD - re-renders whenever ANY state changes
const state = useAppSelector((s) => s);

// GOOD - only re-renders when cart items change
const items = useAppSelector((s) => s.cart.items);
const total = useAppSelector(selectCartTotal);  // Memoized selector

// ✅ GOOD: Memoized selectors with createSelector (Reselect)
import { createSelector } from "@reduxjs/toolkit";
const selectExpensiveItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => items.filter((i) => i.price > 100)  // Only recomputes when items change
);
```

---

## 14.11 Best Practices

| # | Practice | Why |
|---|----------|-----|
| 1 | Co-locate state with components that use it | Simpler, faster |
| 2 | Use Context for infrequently-changing global state | Avoid unnecessary re-renders |
| 3 | Use TanStack Query for all server/async data | Built-in caching, deduplication |
| 4 | Use Zustand or Redux for complex client state | Better DevTools, time-travel |
| 5 | Create typed custom hooks (useCart, useAuth) | Cleaner API, easier refactoring |
| 6 | Use memoized selectors | Performance |
| 7 | Normalize complex state shapes | Avoid nested updates |
| 8 | Don't put everything in global state | Local state is fine for UI |

---

## 14.12 Common Mistakes

```tsx
// ❌ MISTAKE 1: Putting everything in global state
// Form input state, modal open/close, tooltip visible — these are LOCAL!

// ❌ MISTAKE 2: Not using selectors
const everything = useAppSelector((s) => s);  // Subscribes to everything!

// ❌ MISTAKE 3: Creating Context without a custom hook
const value = useContext(ThemeContext);  // No error if used outside Provider!
// ✅ Create a custom hook that throws a clear error

// ❌ MISTAKE 4: Not memoizing context value
<MyContext.Provider value={{ user, login }}>
// Creates new object on every render — all consumers re-render!
// ✅ value={useMemo(() => ({ user, login }), [user])}

// ❌ MISTAKE 5: Using Redux for server state
// Don't fetch API data and store it in Redux — use TanStack Query!
```

---

## 14.13 Interview Questions — State Management

| Level | Question | Key Points |
|-------|----------|------------|
| 🟢 Beginner | What is the difference between props and state? | Props passed down, state internal |
| 🟢 Beginner | When would you use useReducer over useState? | Complex state with many actions |
| 🟡 Intermediate | What is prop drilling and how do you solve it? | Context, state management libs |
| 🟡 Intermediate | What problem does Redux solve? | Predictable, centralized state |
| 🟡 Intermediate | Context API vs Redux — when to use which? | Size, DevTools, performance needs |
| 🔴 Advanced | How does Redux prevent unnecessary re-renders? | Selectors, shallow equality checks |
| 🔴 Advanced | What is state normalization? | Flat structure, IDs as references |
| 🔴 Advanced | How would you handle optimistic updates? | Update UI first, rollback on error |

---

# Section 15: Forms and Validation

## 15.1 Controlled vs Uncontrolled Forms

### The Two Approaches

```
Controlled Forms:                 Uncontrolled Forms:
─────────────────────────────────────────────────────
React controls the value         DOM controls the value
State updates on every keystroke Read value only on submit
Good for: dynamic validation     Good for: file inputs, simple forms
More re-renders                  Fewer re-renders
```

```tsx
// Controlled — React owns the value
export function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}                           // React controls this
      onChange={(e) => setValue(e.target.value)}  // Must update on change
    />
  );
}

// Uncontrolled — DOM owns the value
export function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log(inputRef.current?.value);     // Read when needed
  };

  return <input ref={inputRef} defaultValue="initial" />;
}
```

---

## 15.2 Form Lifecycle

```svg
<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <rect width="700" height="360" fill="#0f172a" rx="12"/>
  <text x="350" y="26" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Form Submission Lifecycle</text>

  <!-- Step 1: Render -->
  <rect x="30" y="50" width="110" height="55" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="85" y="72" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">1. Render</text>
  <text x="85" y="88" text-anchor="middle" fill="#64748b" font-size="9">Register fields</text>
  <text x="85" y="100" text-anchor="middle" fill="#64748b" font-size="9">Set defaults</text>

  <line x1="140" y1="77" x2="170" y2="77" stroke="#334155" stroke-width="1.5" marker-end="url(#af)"/>

  <!-- Step 2: Input -->
  <rect x="170" y="50" width="110" height="55" rx="6" fill="#1a2e1a" stroke="#22c55e" stroke-width="1.5"/>
  <text x="225" y="72" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">2. User Input</text>
  <text x="225" y="88" text-anchor="middle" fill="#64748b" font-size="9">onChange events</text>
  <text x="225" y="100" text-anchor="middle" fill="#64748b" font-size="9">Live validation</text>

  <line x1="280" y1="77" x2="310" y2="77" stroke="#334155" stroke-width="1.5" marker-end="url(#af)"/>

  <!-- Step 3: Validate -->
  <rect x="310" y="50" width="110" height="55" rx="6" fill="#2d1f4e" stroke="#a855f7" stroke-width="1.5"/>
  <text x="365" y="72" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">3. Validate</text>
  <text x="365" y="88" text-anchor="middle" fill="#64748b" font-size="9">Zod / Yup</text>
  <text x="365" y="100" text-anchor="middle" fill="#64748b" font-size="9">Custom rules</text>

  <line x1="420" y1="77" x2="450" y2="77" stroke="#334155" stroke-width="1.5" marker-end="url(#af)"/>

  <!-- Step 4: Submit -->
  <rect x="450" y="50" width="110" height="55" rx="6" fill="#2d1f0e" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="505" y="72" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">4. Submit</text>
  <text x="505" y="88" text-anchor="middle" fill="#64748b" font-size="9">handleSubmit()</text>
  <text x="505" y="100" text-anchor="middle" fill="#64748b" font-size="9">Prevent default</text>

  <line x1="560" y1="77" x2="595" y2="77" stroke="#334155" stroke-width="1.5" marker-end="url(#af)"/>

  <!-- Step 5: API -->
  <rect x="595" y="50" width="85" height="55" rx="6" fill="#1f2937" stroke="#10b981" stroke-width="1.5"/>
  <text x="637" y="72" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">5. API Call</text>
  <text x="637" y="88" text-anchor="middle" fill="#64748b" font-size="9">fetch/axios</text>
  <text x="637" y="100" text-anchor="middle" fill="#64748b" font-size="9">Server Action</text>

  <!-- Validation failure branch -->
  <path d="M365,105 Q365,145 225,145 Q170,145 170,105" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#aferr)"/>
  <text x="270" y="162" text-anchor="middle" fill="#ef4444" font-size="9">Validation fails → show errors → user re-inputs</text>

  <!-- Success branch -->
  <path d="M637,105 Q637,195 350,195" fill="none" stroke="#22c55e" stroke-width="1.5" marker-end="url(#af)"/>
  <rect x="250" y="195" width="200" height="30" rx="5" fill="#1a3a1a" stroke="#22c55e" stroke-width="1"/>
  <text x="350" y="214" text-anchor="middle" fill="#86efac" font-size="10">Success → redirect / toast notification</text>

  <!-- Error branch -->
  <path d="M637,105 Q670,180 637,220" fill="none" stroke="#ef4444" stroke-width="1.5" marker-end="url(#aferr)"/>
  <rect x="530" y="220" width="150" height="30" rx="5" fill="#3a1a1a" stroke="#ef4444" stroke-width="1"/>
  <text x="605" y="239" text-anchor="middle" fill="#fca5a5" font-size="10">API error → show error message</text>

  <!-- Loading state -->
  <rect x="30" y="270" width="640" height="70" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="350" y="292" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">Form States</text>
  <rect x="50" y="300" width="85" height="24" rx="4" fill="#0f172a"/>
  <text x="92" y="315" text-anchor="middle" fill="#64748b" font-size="10">idle</text>
  <rect x="155" y="300" width="85" height="24" rx="4" fill="#0f172a"/>
  <text x="197" y="315" text-anchor="middle" fill="#fbbf24" font-size="10">loading</text>
  <rect x="260" y="300" width="85" height="24" rx="4" fill="#0f172a"/>
  <text x="302" y="315" text-anchor="middle" fill="#ef4444" font-size="10">error</text>
  <rect x="365" y="300" width="85" height="24" rx="4" fill="#0f172a"/>
  <text x="407" y="315" text-anchor="middle" fill="#22c55e" font-size="10">success</text>
  <rect x="470" y="300" width="85" height="24" rx="4" fill="#0f172a"/>
  <text x="512" y="315" text-anchor="middle" fill="#a855f7" font-size="10">submitting</text>
  <rect x="570" y="300" width="85" height="24" rx="4" fill="#0f172a"/>
  <text x="612" y="315" text-anchor="middle" fill="#3b82f6" font-size="10">validating</text>

  <defs>
    <marker id="af" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
    <marker id="aferr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#ef4444"/>
    </marker>
  </defs>
</svg>
```

---

## 15.3 React Hook Form

React Hook Form is the industry standard for form management in React. It uses uncontrolled inputs internally for maximum performance.

```bash
npm install react-hook-form @hookform/resolvers zod
```

### Basic Login Form

```tsx
// components/forms/LoginForm.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

// TypeScript type inferred from schema
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,          // Connect inputs to RHF
    handleSubmit,      // Wrap your submit handler
    formState: {
      errors,          // Validation errors
      isSubmitting,    // true while submit is processing
      isValid,         // true if all fields pass validation
    },
    reset,             // Reset form to initial state
    watch,             // Watch field values reactively
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),  // Use Zod for validation
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setServerError(null);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        setServerError(error.message || "Login failed");
        return;
      }

      const result = await response.json();
      // Redirect or update auth state
      window.location.href = "/dashboard";
    } catch (error) {
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          {...register("email")}   // Registers input with RHF
        />
        {errors.email && (
          <p id="email-error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p role="alert">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input id="rememberMe" type="checkbox" {...register("rememberMe")} />
        <label htmlFor="rememberMe">Remember me</label>
      </div>

      {serverError && (
        <div role="alert" style={{ color: "red" }}>
          {serverError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
```

---

## 15.4 Zod — Schema Validation

```typescript
// lib/validations.ts
import { z } from "zod";

// Registration schema
export const registrationSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters"),

    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

    confirmPassword: z.string(),

    age: z.coerce               // Coerce string → number (from form input)
      .number()
      .int()
      .min(18, "You must be at least 18 years old")
      .max(120),

    role: z.enum(["user", "moderator"]),

    website: z.string().url("Invalid URL").optional().or(z.literal("")),

    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],  // Field to attach error to
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Product schema
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description too short"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().int().min(0),
  images: z.array(z.string().url()).min(1, "At least one image required"),
  isActive: z.boolean().default(true),
});

// Server-side validation (in API routes)
export async function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ data: T } | { error: z.ZodError }> {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { error: result.error };
  }
  return { data: result.data };
}
```

---

## 15.5 Registration Form

```tsx
// components/forms/RegistrationForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationFormData } from "@/lib/validations";

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const password = watch("password");  // Watch for password match indicator

  const onSubmit = async (data: RegistrationFormData) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // Handle response...
  };

  const passwordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = passwordStrength(password || "");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name">Full Name</label>
        <input id="name" type="text" {...register("name")} />
        {errors.name && <span role="alert">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && <span role="alert">{errors.email.message}</span>}
      </div>

      {/* Password with strength indicator */}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
        {/* Strength bar */}
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              style={{
                height: 4,
                flex: 1,
                borderRadius: 2,
                backgroundColor:
                  strength >= level
                    ? level <= 1 ? "red" : level <= 2 ? "orange" : level <= 3 ? "yellow" : "green"
                    : "#e5e7eb",
              }}
            />
          ))}
        </div>
        {errors.password && <span role="alert">{errors.password.message}</span>}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <span role="alert">{errors.confirmPassword.message}</span>
        )}
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register("role")}>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </select>
        {errors.role && <span role="alert">{errors.role.message}</span>}
      </div>

      {/* Terms */}
      <div>
        <input id="agreeToTerms" type="checkbox" {...register("agreeToTerms")} />
        <label htmlFor="agreeToTerms">I agree to the Terms of Service</label>
        {errors.agreeToTerms && (
          <span role="alert">{errors.agreeToTerms.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
```

---

## 15.6 Multi-Step Form

```tsx
// components/forms/MultiStepForm.tsx
"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Combined schema
const multiStepSchema = z.object({
  // Step 1: Personal
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email(),

  // Step 2: Account
  username: z.string().min(3, "At least 3 characters"),
  password: z.string().min(8),

  // Step 3: Preferences
  newsletter: z.boolean().default(false),
  plan: z.enum(["free", "pro", "enterprise"]),
});

type MultiStepData = z.infer<typeof multiStepSchema>;

// Step components use useFormContext
function Step1() {
  const { register, formState: { errors } } = useFormContext<MultiStepData>();
  return (
    <div>
      <h2>Personal Information</h2>
      <input placeholder="First Name" {...register("firstName")} />
      {errors.firstName && <span>{errors.firstName.message}</span>}
      <input placeholder="Last Name" {...register("lastName")} />
      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
    </div>
  );
}

function Step2() {
  const { register, formState: { errors } } = useFormContext<MultiStepData>();
  return (
    <div>
      <h2>Account Setup</h2>
      <input placeholder="Username" {...register("username")} />
      {errors.username && <span>{errors.username.message}</span>}
      <input type="password" placeholder="Password" {...register("password")} />
    </div>
  );
}

function Step3() {
  const { register } = useFormContext<MultiStepData>();
  return (
    <div>
      <h2>Preferences</h2>
      <label>
        <input type="checkbox" {...register("newsletter")} />
        Subscribe to newsletter
      </label>
      <select {...register("plan")}>
        <option value="free">Free</option>
        <option value="pro">Pro ($9/mo)</option>
        <option value="enterprise">Enterprise (Custom)</option>
      </select>
    </div>
  );
}

const STEPS = [
  { title: "Personal", component: <Step1 /> },
  { title: "Account", component: <Step2 /> },
  { title: "Preferences", component: <Step3 /> },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const methods = useForm<MultiStepData>({
    resolver: zodResolver(multiStepSchema),
    mode: "onChange",
  });

  const { trigger, handleSubmit } = methods;

  const next = async () => {
    // Validate only current step's fields
    const fieldsToValidate: (keyof MultiStepData)[][] = [
      ["firstName", "lastName", "email"],
      ["username", "password"],
      ["plan"],
    ];
    
    const valid = await trigger(fieldsToValidate[currentStep]);
    if (valid) setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (data: MultiStepData) => {
    console.log("Submitting:", data);
    // API call here
  };

  return (
    <FormProvider {...methods}>
      {/* Progress */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            style={{
              padding: "4px 12px",
              borderRadius: 4,
              background: i === currentStep ? "#3b82f6" : i < currentStep ? "#22c55e" : "#e5e7eb",
              color: i <= currentStep ? "white" : "#6b7280",
            }}
          >
            {i < currentStep ? "✓ " : ""}{step.title}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {STEPS[currentStep].component}

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          {currentStep > 0 && (
            <button type="button" onClick={() => setCurrentStep((s) => s - 1)}>
              Back
            </button>
          )}
          {currentStep < STEPS.length - 1 ? (
            <button type="button" onClick={next}>
              Next
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
```

---

## 15.7 Server-Side Validation with Server Actions

```tsx
// app/actions/contactAction.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
});

// Action result type
type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // Parse FormData
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Validate with Zod
  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Send email, save to DB, etc.
  try {
    await saveContactMessage(result.data);
    return { success: true, message: "Message sent successfully!" };
  } catch {
    return { success: false, message: "Failed to send message. Try again." };
  }
}
```

```tsx
// app/contact/page.tsx — using useActionState
"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contactAction";

const initialState = { success: false, message: "", errors: {} };

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
        {state.errors?.name && (
          <span role="alert">{state.errors.name[0]}</span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
        {state.errors?.email && (
          <span role="alert">{state.errors.email[0]}</span>
        )}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
        {state.errors?.message && (
          <span role="alert">{state.errors.message[0]}</span>
        )}
      </div>

      {state.message && (
        <div
          role="alert"
          style={{ color: state.success ? "green" : "red" }}
        >
          {state.message}
        </div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

---

## 15.8 File Uploads

```tsx
// components/forms/FileUploadForm.tsx
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const uploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Please select a file")
    .refine(
      (files) => files[0]?.size <= 5 * 1024 * 1024,
      "File must be under 5MB"
    )
    .refine(
      (files) => ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
      "Only JPG, PNG, or WebP images allowed"
    ),
});

type UploadData = z.infer<typeof uploadSchema>;

export function FileUploadForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm<UploadData>({
    resolver: zodResolver(uploadSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UploadData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("file", data.file[0]);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,  // Don't set Content-Type — browser sets boundary automatically
    });

    const result = await response.json();
    console.log("Uploaded:", result.url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Image title" {...register("title")} />
      {errors.title && <span>{errors.title.message}</span>}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        {...register("file", {
          onChange: handleFileChange,
        })}
      />
      {errors.file && <span>{errors.file.message as string}</span>}

      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: 200 }} />
      )}

      <button type="submit">Upload</button>
    </form>
  );
}
```

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type on server (don't trust client!)
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Convert to buffer and save
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate safe filename
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
  const filePath = path.join(process.cwd(), "public/uploads", filename);

  await writeFile(filePath, buffer);

  return NextResponse.json({
    url: `/uploads/${filename}`,
    title,
  });
}
```

---

## 15.9 Validation Workflow

```svg
<svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <rect width="700" height="310" fill="#0f172a" rx="12"/>
  <text x="350" y="26" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Client + Server Validation Strategy</text>

  <!-- Client side -->
  <rect x="20" y="45" width="310" height="230" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="175" y="68" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">Client-Side Validation</text>
  <text x="175" y="84" text-anchor="middle" fill="#64748b" font-size="10">Immediate feedback — no network needed</text>

  <rect x="40" y="95" width="270" height="28" rx="5" fill="#0f172a"/>
  <text x="175" y="113" text-anchor="middle" fill="#4ade80" font-size="10">1. HTML5 built-in: required, type, min, max</text>

  <rect x="40" y="130" width="270" height="28" rx="5" fill="#0f172a"/>
  <text x="175" y="148" text-anchor="middle" fill="#4ade80" font-size="10">2. React Hook Form: register() validation</text>

  <rect x="40" y="165" width="270" height="28" rx="5" fill="#0f172a"/>
  <text x="175" y="183" text-anchor="middle" fill="#4ade80" font-size="10">3. Zod schema: zodResolver(schema)</text>

  <rect x="40" y="200" width="270" height="28" rx="5" fill="#0f172a"/>
  <text x="175" y="218" text-anchor="middle" fill="#4ade80" font-size="10">4. Custom: validate field in register()</text>

  <text x="175" y="258" text-anchor="middle" fill="#64748b" font-size="9">✅ Fast UX  ⚠️ Can be bypassed!</text>

  <!-- Arrow between -->
  <line x1="330" y1="160" x2="370" y2="160" stroke="#334155" stroke-width="1.5" marker-end="url(#av)"/>
  <text x="350" y="152" text-anchor="middle" fill="#475569" font-size="9">always</text>
  <text x="350" y="175" text-anchor="middle" fill="#475569" font-size="9">validate</text>
  <text x="350" y="188" text-anchor="middle" fill="#475569" font-size="9">both!</text>

  <!-- Server side -->
  <rect x="370" y="45" width="310" height="230" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="1.5"/>
  <text x="525" y="68" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold">Server-Side Validation</text>
  <text x="525" y="84" text-anchor="middle" fill="#64748b" font-size="10">The real security layer</text>

  <rect x="390" y="95" width="270" height="28" rx="5" fill="#0f172a"/>
  <text x="525" y="113" text-anchor="middle" fill="#4ade80" font-size="10">1. Re-validate with same Zod schema</text>

  <rect x="390" y="130" width="270" height="28" rx="5" fill="#0f172a"/>
  <text x="525" y="148" text-anchor="middle" fill="#4ade80" font-size="10">2. Check business rules (email unique?)</text>

  <rect x="390" y="165" width="270" height="28" rx="5" fill="#0f172a"/>
  <text x="525" y="183" text-anchor="middle" fill="#4ade80" font-size="10">3. Sanitize input (trim, escape HTML)</text>

  <rect x="390" y="200" width="270" height="28" rx="5" fill="#0f172a"/>
  <text x="525" y="218" text-anchor="middle" fill="#4ade80" font-size="10">4. Rate limit form submissions</text>

  <text x="525" y="258" text-anchor="middle" fill="#64748b" font-size="9">✅ Secure  ✅ Cannot be bypassed!</text>

  <defs>
    <marker id="av" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
</svg>
```

---

## 15.10 Form Accessibility

```tsx
// Accessible form patterns
export function AccessibleForm() {
  const { register, formState: { errors } } = useForm();
  
  return (
    <form noValidate>
      {/* Always associate labels with inputs */}
      <div>
        <label htmlFor="username">
          Username
          <span aria-hidden="true" style={{ color: "red" }}>*</span>
        </label>
        <input
          id="username"
          type="text"
          aria-required="true"
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? "username-error" : "username-hint"}
          autoComplete="username"
          {...register("username")}
        />
        <p id="username-hint" style={{ fontSize: 12, color: "#6b7280" }}>
          3-20 characters, letters and numbers only
        </p>
        {errors.username && (
          <p id="username-error" role="alert" style={{ color: "red" }}>
            {errors.username.message as string}
          </p>
        )}
      </div>

      {/* Group related fields with fieldset + legend */}
      <fieldset>
        <legend>Contact Preferences</legend>
        <label>
          <input type="radio" value="email" {...register("contactPref")} />
          Email
        </label>
        <label>
          <input type="radio" value="phone" {...register("contactPref")} />
          Phone
        </label>
      </fieldset>

      {/* Loading state announcement */}
      <button
        type="submit"
        aria-busy={false}       // Set to true when submitting
        aria-live="polite"
      >
        Submit
      </button>

      {/* Live region for form-level messages */}
      <div role="status" aria-live="polite" aria-atomic="true">
        {/* Success/error messages announced to screen readers */}
      </div>
    </form>
  );
}
```

---

## 15.11 Best Practices

| # | Practice | Why |
|---|----------|-----|
| 1 | Always validate on server even if validated client-side | Security — clients can be tampered |
| 2 | Use `noValidate` on `<form>` with RHF | Let React handle validation, not HTML5 |
| 3 | Show inline errors, not just form-level alerts | Better UX — user knows which field |
| 4 | Use `aria-invalid` and `aria-describedby` | Accessibility for screen readers |
| 5 | Disable submit while submitting | Prevent double-submission |
| 6 | Use `mode: "onBlur"` for validation | Validate when user leaves field, not every keystroke |
| 7 | Share Zod schemas between client and server | Single source of truth for validation |
| 8 | Preserve form values on validation error | Don't make users re-enter data |
| 9 | Rate-limit form submissions | Prevent spam/brute force |
| 10 | Use autocomplete attributes | Better UX, accessibility |

---

## 15.12 Common Mistakes

```tsx
// ❌ MISTAKE 1: Not validating on server
// Client validation can be bypassed with curl/Postman!

// ❌ MISTAKE 2: Using <form> action for JS-driven forms
// Use onSubmit={handleSubmit(onSubmit)} instead

// ❌ MISTAKE 3: Forgetting noValidate
<form>  {/* HTML5 validation fights with RHF */}
// ✅
<form noValidate>

// ❌ MISTAKE 4: Not using zodResolver correctly
const { register } = useForm({
  resolver: zodResolver(schema),  // ✅ This is correct
  // resolver: (data) => zodResolver(schema)(data)  ❌ Wrong
});

// ❌ MISTAKE 5: Accessing errors before checking
const errorMessage = errors.email.message;  // Crashes if no email error!
// ✅
const errorMessage = errors.email?.message;

// ❌ MISTAKE 6: Setting Content-Type with FormData
fetch("/api/upload", {
  method: "POST",
  headers: { "Content-Type": "multipart/form-data" },  // WRONG!
  body: formData,
});
// ✅ Let browser set Content-Type with boundary automatically
fetch("/api/upload", { method: "POST", body: formData });
```

---

## 15.13 Interview Questions — Forms & Validation

| Level | Question | Key Points |
|-------|----------|------------|
| 🟢 Beginner | Controlled vs uncontrolled components? | State vs ref, when to use each |
| 🟢 Beginner | What is React Hook Form? Why use it? | Performance, less re-renders, DX |
| 🟡 Intermediate | How does Zod differ from Yup? | TypeScript-first, better inference |
| 🟡 Intermediate | How do you handle server-side validation errors in RHF? | setError() method |
| 🟡 Intermediate | How do you build a multi-step form? | FormProvider, step-wise trigger() |
| 🔴 Advanced | How do you handle file uploads securely? | Validate type/size both sides, signed URLs |
| 🔴 Advanced | How do you implement optimistic form updates? | Update UI, rollback on failure |
| 🔴 Advanced | How do Server Actions differ from API routes for forms? | Direct server calls, no API route needed, useActionState |

---

# Summary

## Key Takeaways

### Section 13 — Database Integration
- Next.js accesses databases **only from the server** (Server Components, Route Handlers, Server Actions)
- Use **Prisma** for type-safe relational databases (PostgreSQL, MySQL); use **Mongoose** for MongoDB; use **Drizzle** for lightweight SQL
- Always use a **singleton client** — never instantiate `PrismaClient` per request
- **Store credentials** in `.env.local`, never in code
- Use **transactions** for operations that must succeed or fail together
- **Index** columns you filter or sort by frequently
- Always **paginate** queries — never fetch all records

### Section 14 — State Management
- **Local state** (`useState`, `useReducer`) for component-level concerns
- **Context API** for small-medium global state (theme, auth) — but split contexts by update frequency
- **Redux Toolkit** for large-scale apps needing DevTools, time-travel, and team-friendly patterns
- **Zustand** for simple, boilerplate-free global state
- **TanStack Query** for all server/async data — it handles caching, deduplication, background refetching automatically
- Don't put server data in Redux — use TanStack Query instead

### Section 15 — Forms & Validation
- **React Hook Form** + **Zod** is the modern standard for form handling in Next.js
- Always **validate on both client AND server**
- Share Zod schemas between client and server for a single source of truth
- Use **Server Actions** with `useActionState` for progressive enhancement
- Never trust client-provided file types — validate on the server
- Always consider **accessibility** (labels, aria-*, role="alert")

---

# Practice Exercises

## Beginner
1. Build a contact form with React Hook Form + Zod validation (name, email, message)
2. Create a theme switcher using Context API (light/dark)
3. Connect to MongoDB and create a User model with Mongoose
4. Build a simple Todo CRUD with Prisma + PostgreSQL

## Intermediate
1. Build a shopping cart with Zustand that persists to localStorage
2. Create a paginated list of blog posts fetched with TanStack Query
3. Build a multi-step registration form (3 steps) with React Hook Form
4. Implement file upload with validation (type + size) on both client and server

## Advanced
1. Build an authentication system with JWT + Prisma (login, register, refresh tokens)
2. Implement optimistic updates in a todo app with TanStack Query
3. Create a normalized Redux state for a social feed (users, posts, likes)
4. Build a product management form with image upload, tags (many-to-many), and full server-side validation

---

# Mini Project Ideas

## 1. Blog Application
**Covers:** Prisma + PostgreSQL, TanStack Query, React Hook Form

- User auth (login/register)
- Create/edit/delete posts (rich text)
- Tags (many-to-many relationship)
- Comments with nested replies
- Pagination and search
- Admin dashboard for content moderation

## 2. Task Management App
**Covers:** Zustand or Redux Toolkit, Prisma, Multi-step forms

- Drag-and-drop Kanban board
- Task CRUD with priorities and due dates
- Team collaboration (share boards)
- File attachments
- Real-time updates with TanStack Query polling
- Statistics dashboard

## 3. E-Commerce Backend
**Covers:** PostgreSQL + Prisma, complex schema design, transactions

- Product catalog with categories and variants
- Inventory management
- Shopping cart with Zustand
- Order processing with database transactions
- Payment webhook handling
- Admin product management forms with image upload

## 4. Admin Dashboard
**Covers:** All three sections combined

- Data tables with server-side pagination/sorting/filtering
- Charts with TanStack Query for live data
- Role-based access control (RBAC) with Prisma
- Bulk operations with transactions
- Export (CSV/PDF) functionality
- Complex filter forms with many fields

---

# Interview Preparation

## Beginner Questions
1. What is an ORM and why would you use one?
2. What is the difference between `useState` and `useReducer`?
3. What is controlled vs uncontrolled form input in React?
4. How do you connect a Next.js app to MongoDB?
5. What is Context API and when would you use it?
6. What is Zod and how does it help with validation?
7. Why should you validate form data on the server?

## Intermediate Questions
1. Explain the N+1 query problem and how to solve it with Prisma
2. How does Redux Toolkit differ from traditional Redux?
3. What is connection pooling and why is it important?
4. How do React Hook Form and Zod work together?
5. When would you choose TanStack Query over Redux for data fetching?
6. Explain database transactions and give an example use case
7. How do you implement pagination in Prisma?
8. What is `persist` middleware in Zustand?

## Advanced Questions
1. How would you design a scalable database schema for a multi-tenant SaaS app?
2. What are the tradeoffs between Context API and state management libraries?
3. How do you prevent race conditions in concurrent form submissions?
4. Explain database indexing strategies and their performance implications
5. How would you implement real-time data sync in a Next.js + database app?
6. Describe how you'd handle optimistic UI updates with rollback on error
7. How do Server Actions change the way we handle forms compared to API routes?
8. What is state normalization and when is it necessary?
9. How would you design an audit log system using database transactions?
10. Explain how TanStack Query handles cache invalidation and stale data

---

> **Next Up:** Part 4 — Authentication, Deployment, Performance Optimization, and Testing  
> **Previous:** Part 3A — API Routes, Middleware, and Authentication Basics

---

*Documentation by Next.js Deep Dive Series | Last updated: 2024 | Next.js 14+ App Router*
