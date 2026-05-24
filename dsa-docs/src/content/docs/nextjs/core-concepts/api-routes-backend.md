---
title: "API Routes and Backend"
description: "Next.js lets you build a full backend API inside your Next.js project. No separate Node.js server needed."
---

# Section 10: API Routes and Backend

## 10.1 What Are API Routes?

Next.js lets you build a **full backend API** inside your Next.js project. No separate Node.js server needed.

**Analogy:** Your Next.js app is a restaurant. The frontend (pages) is the dining room, and the API routes are the kitchen — handling orders (requests) and sending back food (responses).

API routes live in `app/api/` and are defined as `route.ts` files.

---

## 10.2 Route Handlers Basics

```tsx
// app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests to /api/hello
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Hello from Next.js API!",
    timestamp: new Date().toISOString(),
  });
}

// Handle POST requests to /api/hello
export async function POST(request: NextRequest) {
  const body = await request.json(); // Parse JSON body

  return NextResponse.json({
    received: body,
    success: true,
  }, { status: 201 }); // 201 Created
}
```

---

## 10.3 All HTTP Methods

```tsx
// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

// GET /api/products/123 — Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await db.product.findById(params.id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/products/123 — Replace entire product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const updated = await db.product.replace(params.id, body);
  return NextResponse.json(updated);
}

// PATCH /api/products/123 — Update part of product
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const updated = await db.product.update(params.id, body); // Partial update
  return NextResponse.json(updated);
}

// DELETE /api/products/123 — Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.product.delete(params.id);
  return NextResponse.json({ deleted: true }, { status: 200 });
}
```

---

## 10.4 API Request/Response Lifecycle

```txt
<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="720" height="320" fill="#0f1117" rx="12"/>
  <text x="360" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">API Route Request Lifecycle</text>

  <!-- Client -->
  <rect x="20" y="55" width="100" height="60" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="70" y="80" text-anchor="middle" fill="#93c5fd" font-weight="bold">Client</text>
  <text x="70" y="96" text-anchor="middle" fill="#bfdbfe" font-size="10">Browser /</text>
  <text x="70" y="110" text-anchor="middle" fill="#bfdbfe" font-size="10">Mobile App</text>

  <!-- Arrow -->
  <line x1="120" y1="85" x2="155" y2="85" stroke="#3b82f6" stroke-width="2"/>
  <polygon points="153,81 163,85 153,89" fill="#3b82f6"/>
  <text x="138" y="77" fill="#3b82f6" font-size="10">HTTP</text>

  <!-- Middleware -->
  <rect x="163" y="55" width="100" height="60" fill="#3b1f00" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="213" y="80" text-anchor="middle" fill="#fcd34d" font-weight="bold">Middleware</text>
  <text x="213" y="96" text-anchor="middle" fill="#fde68a" font-size="10">Auth check</text>
  <text x="213" y="110" text-anchor="middle" fill="#fde68a" font-size="10">Rate limit</text>

  <line x1="263" y1="85" x2="298" y2="85" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="296,81 306,85 296,89" fill="#f59e0b"/>

  <!-- Route Handler -->
  <rect x="306" y="55" width="110" height="60" fill="#14532d" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="361" y="77" text-anchor="middle" fill="#86efac" font-weight="bold">Route</text>
  <text x="361" y="93" text-anchor="middle" fill="#86efac" font-weight="bold">Handler</text>
  <text x="361" y="109" text-anchor="middle" fill="#bbf7d0" font-size="10">route.ts</text>

  <line x1="416" y1="85" x2="451" y2="85" stroke="#22c55e" stroke-width="2"/>
  <polygon points="449,81 459,85 449,89" fill="#22c55e"/>

  <!-- DB / API -->
  <rect x="459" y="55" width="100" height="60" fill="#2d1057" rx="8" stroke="#a855f7" stroke-width="1.5"/>
  <text x="509" y="80" text-anchor="middle" fill="#d8b4fe" font-weight="bold">Database</text>
  <text x="509" y="96" text-anchor="middle" fill="#e9d5ff" font-size="10">MongoDB</text>
  <text x="509" y="110" text-anchor="middle" fill="#e9d5ff" font-size="10">MySQL etc.</text>

  <line x1="559" y1="85" x2="594" y2="85" stroke="#a855f7" stroke-width="2"/>
  <polygon points="592,81 602,85 592,89" fill="#a855f7"/>

  <!-- Response -->
  <rect x="602" y="55" width="95" height="60" fill="#1e293b" rx="8" stroke="#64748b" stroke-width="1.5"/>
  <text x="650" y="80" text-anchor="middle" fill="#94a3b8" font-weight="bold">Response</text>
  <text x="650" y="96" text-anchor="middle" fill="#64748b" font-size="10">JSON data</text>
  <text x="650" y="110" text-anchor="middle" fill="#64748b" font-size="10">Status code</text>

  <!-- Return arrow -->
  <line x1="650" y1="115" x2="650" y2="160" stroke="#475569" stroke-width="1.5" stroke-dasharray="4"/>
  <line x1="650" y1="160" x2="70" y2="160" stroke="#475569" stroke-width="1.5" stroke-dasharray="4"/>
  <line x1="70" y1="160" x2="70" y2="115" stroke="#475569" stroke-width="1.5" stroke-dasharray="4"/>
  <polygon points="66,117 70,107 74,117" fill="#475569"/>
  <text x="360" y="155" text-anchor="middle" fill="#475569" font-size="11">← Response travels back to client</text>

  <!-- Status codes reference -->
  <rect x="20" y="185" width="680" height="115" fill="#1e293b" rx="8"/>
  <text x="360" y="205" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="12">Common HTTP Status Codes</text>
  <text x="36" y="225" fill="#86efac" font-size="11">200 OK — Request succeeded    201 Created — Resource created    204 No Content — Success, nothing to return</text>
  <text x="36" y="243" fill="#fcd34d" font-size="11">400 Bad Request — Invalid input    401 Unauthorized — Not logged in    403 Forbidden — No permission</text>
  <text x="36" y="261" fill="#fca5a5" font-size="11">404 Not Found — Resource missing    409 Conflict — Duplicate resource</text>
  <text x="36" y="279" fill="#f87171" font-size="11">500 Internal Server Error — Server crashed    503 Service Unavailable — Server busy</text>
</svg>
```

---

## 10.5 Complete CRUD API Example — Products

```tsx
// app/api/products/route.ts

import { NextRequest, NextResponse } from "next/server";

// Simulated database (replace with real DB)
let products = [
  { id: 1, name: "Laptop", price: 75000, stock: 10 },
  { id: 2, name: "Phone", price: 25000, stock: 50 },
];

// GET /api/products — List all products
export async function GET(request: NextRequest) {
  // Support query params: /api/products?search=laptop
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const filtered = search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return NextResponse.json({ products: filtered, total: filtered.length });
}

// POST /api/products — Create new product
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validation
  if (!body.name || !body.price) {
    return NextResponse.json(
      { error: "name and price are required" },
      { status: 400 }
    );
  }

  const newProduct = {
    id: Date.now(),
    name: body.name,
    price: body.price,
    stock: body.stock ?? 0,
  };

  products.push(newProduct);

  return NextResponse.json(newProduct, { status: 201 });
}
```

```tsx
// app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";

// GET /api/products/1
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// DELETE /api/products/1
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  products.splice(index, 1);
  return NextResponse.json({ message: "Deleted successfully" });
}
```

---

## 10.6 Authentication API

```tsx
// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose"; // JWT library

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // 1. Validate input
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  // 2. Find user (in real app: query database)
  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // 3. Create JWT token
  const token = await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  // 4. Set HTTP-only cookie (more secure than localStorage)
  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email },
    message: "Login successful",
  });

  response.cookies.set("auth_token", token, {
    httpOnly: true,   // JS cannot access — prevents XSS
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

// Placeholder functions — implement with bcrypt and your DB
async function findUserByEmail(email: string) {
  return null; // Replace with actual DB query
}

async function verifyPassword(password: string, hash: string) {
  return false; // Replace with bcrypt.compare()
}
```

---

## 10.7 MongoDB API Integration

```tsx
// lib/mongodb.ts — Connection helper
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Reuse connection in development (hot reload creates new connections)
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Fresh connection in production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

```tsx
// app/api/users/route.ts — MongoDB CRUD
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("myapp");

  const users = await db.collection("users").find({}).toArray();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("myapp");

  const result = await db.collection("users").insertOne({
    ...body,
    createdAt: new Date(),
  });

  return NextResponse.json(
    { insertedId: result.insertedId },
    { status: 201 }
  );
}
```

---

## 10.8 MySQL API Integration

```tsx
// lib/mysql.ts — MySQL connection pool
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
```

```tsx
// app/api/orders/route.ts — MySQL example
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2";

interface Order extends RowDataPacket {
  id: number;
  product_name: string;
  quantity: number;
  total_price: number;
}

export async function GET() {
  const [rows] = await pool.execute<Order[]>(
    "SELECT * FROM orders ORDER BY created_at DESC LIMIT 50"
  );
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const { productId, quantity, userId } = await request.json();

  const [result] = await pool.execute(
    "INSERT INTO orders (product_id, quantity, user_id, created_at) VALUES (?, ?, ?, NOW())",
    [productId, quantity, userId]
  );

  return NextResponse.json({ success: true, result }, { status: 201 });
}
```

---

## 10.9 File Uploads

```tsx
// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save to /public/uploads
  const filename = `${Date.now()}-${file.name}`;
  const uploadPath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(uploadPath, buffer);

  return NextResponse.json({
    url: `/uploads/${filename}`,
    filename,
  });
}
```

---

## 10.10 Middleware Integration

```tsx
// middleware.ts — runs before every request
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Protected routes pattern
const protectedRoutes = ["/dashboard", "/profile", "/api/user"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this route needs protection
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next(); // Allow through
  }

  // Get token from cookie
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    // Redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify JWT
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next(); // Allow through
  } catch {
    // Invalid token
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Apply middleware to these paths
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/api/user/:path*"],
};
```

---

## 10.11 Environment Variables

```bash
# .env.local — Never commit this file!

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/myapp
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=myapp

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# API Keys
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_live_...

# Public vars (exposed to browser — safe to expose)
NEXT_PUBLIC_APP_URL=https://myapp.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

```tsx
// Using env vars in API routes
const dbUri = process.env.MONGODB_URI; // Server-only
const appUrl = process.env.NEXT_PUBLIC_APP_URL; // Available everywhere

// ❌ Never do this in client code
const secret = process.env.JWT_SECRET; // Undefined in browser — stays server-only
```

> **Rule:** Only vars prefixed with `NEXT_PUBLIC_` are available in the browser. All others are server-only.

---

## 10.12 API Validation with Zod

```tsx
// app/api/users/route.ts — with Zod validation
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

// Define schema
const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().int().min(18, "Must be 18 or older").optional(),
  role: z.enum(["admin", "user", "moderator"]).default("user"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate with Zod
  const result = CreateUserSchema.safeParse(body);

  if (!result.success) {
    // Return detailed validation errors
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // result.data is fully typed and validated
  const { name, email, role } = result.data;

  // Create user in DB...
  return NextResponse.json({ name, email, role }, { status: 201 });
}
```

---

## 10.13 Security Best Practices

| Practice | Implementation |
|----------|---------------|
| Input validation | Use Zod or Joi for all inputs |
| SQL injection prevention | Parameterized queries (never string concat) |
| XSS prevention | `httpOnly` cookies, sanitize HTML output |
| CORS headers | Set `Access-Control-Allow-Origin` explicitly |
| Rate limiting | Use `upstash/ratelimit` or middleware |
| Secrets management | `.env.local`, never commit secrets |
| HTTPS only | `secure: true` on cookies in production |
| Authentication | Verify JWT on every protected route |

---

## 10.14 API Rate Limiting

```tsx
// middleware.ts — Basic rate limiting with Upstash Redis
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
  analytics: true,
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 } // 429 Too Many Requests
    );
  }

  return NextResponse.next();
}
```

---

## 10.15 Common Mistakes in API Routes

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| No input validation | Always validate with Zod or manual checks |
| Returning passwords in response | Never include sensitive fields |
| Hardcoding secrets | Use `.env.local` |
| No error handling | Wrap in try/catch, return proper status codes |
| No authentication on protected routes | Use middleware |
| Using GET for state-changing operations | GET = read, POST/PUT/DELETE = write |
| Returning 200 for errors | Use correct status codes (400, 401, 404, 500) |

---

## 10.16 Interview Questions — API Routes

1. **What is a Route Handler in Next.js? How is it different from a page?**
2. **What is `NextRequest` and how is it different from the native `Request`?**
3. **How do you read query parameters in a Route Handler?**
4. **What is the difference between PUT and PATCH?**
5. **How do you protect an API route with authentication?**
6. **What is CORS and how do you handle it in Next.js?**
7. **How do you handle file uploads in a Next.js API route?**
8. **What is middleware in Next.js? Where does it run?**
9. **What is the difference between `NEXT_PUBLIC_` env vars and regular ones?**
10. **How would you implement rate limiting in a Next.js API?**

---
