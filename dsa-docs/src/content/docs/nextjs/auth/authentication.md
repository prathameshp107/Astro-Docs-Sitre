---
title: "Authentication"
description: "Authentication answers the question: \"Who are you?\""
---

# Section 12: Authentication

## What is Authentication?

**Authentication** answers the question: **"Who are you?"**

It is the process of verifying a user's identity before granting them access to a system.

```
User says: "I am Alice"
System asks: "Prove it"
User provides: password / fingerprint / token
System checks: ✓ Verified — welcome, Alice!
```

**Why it matters:**
- Without authentication, anyone could access any user's data
- Prevents unauthorized access to private resources
- Forms the foundation of every secure web application

---

## Authentication vs Authorization

These two concepts are often confused but are very different:

| | Authentication | Authorization |
|---|---|---|
| Question | "Who are you?" | "What can you do?" |
| When | On login | After login, on every request |
| Example | Entering a password | An admin can delete users; a regular user cannot |
| Failure result | 401 Unauthorized | 403 Forbidden |

```txt
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <rect width="680" height="220" fill="#0f172a" rx="12"/>
  <text x="340" y="28" fill="#e2e8f0" font-size="13" font-weight="700" text-anchor="middle">Authentication vs Authorization</text>

  <!-- User -->
  <circle cx="60" cy="110" r="30" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="60" y="106" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle">User</text>
  <text x="60" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">Alice</text>

  <!-- Arrow 1 -->
  <line x1="92" y1="110" x2="145" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#a2)"/>
  <text x="118" y="104" fill="#94a3b8" font-size="9" text-anchor="middle">login</text>

  <!-- AuthN box -->
  <rect x="145" y="78" width="160" height="64" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="225" y="99" fill="#93c5fd" font-size="12" font-weight="700" text-anchor="middle">Authentication</text>
  <text x="225" y="114" fill="#94a3b8" font-size="10" text-anchor="middle">"Who are you?"</text>
  <text x="225" y="128" fill="#64748b" font-size="9" text-anchor="middle">verify password / token</text>

  <!-- Arrow 2 -->
  <line x1="305" y1="110" x2="360" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#a2)"/>
  <text x="332" y="104" fill="#4ade80" font-size="9" text-anchor="middle">✓ identity</text>

  <!-- AuthZ box -->
  <rect x="360" y="78" width="160" height="64" rx="8" fill="#1a2e1a" stroke="#4ade80" stroke-width="2"/>
  <text x="440" y="99" fill="#4ade80" font-size="12" font-weight="700" text-anchor="middle">Authorization</text>
  <text x="440" y="114" fill="#94a3b8" font-size="10" text-anchor="middle">"What can you do?"</text>
  <text x="440" y="128" fill="#64748b" font-size="9" text-anchor="middle">check role / permissions</text>

  <!-- Arrow 3 -->
  <line x1="520" y1="110" x2="575" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#a2)"/>
  <text x="547" y="104" fill="#94a3b8" font-size="9" text-anchor="middle">access</text>

  <!-- Resource -->
  <rect x="575" y="88" width="80" height="44" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
  <text x="615" y="106" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Protected</text>
  <text x="615" y="120" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Resource</text>

  <!-- Legend -->
  <text x="40" y="175" fill="#64748b" font-size="10">401 Unauthorized → Authentication failed (not logged in)</text>
  <text x="40" y="193" fill="#64748b" font-size="10">403 Forbidden → Authorization failed (logged in, but no permission)</text>

  <defs>
    <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
  </defs>
</svg>
```

---

## Session vs JWT vs OAuth

### Session Authentication

A **session** stores login state on the **server**. The browser only holds a session ID cookie.

```
Login:
  User sends username + password
  Server verifies → creates session in DB
  Server sends session ID cookie to browser

Subsequent requests:
  Browser sends session ID cookie
  Server looks up session ID in DB
  Server confirms user is authenticated
```

**Pros:** Easy to invalidate (just delete the session), secure by default  
**Cons:** Server must store sessions (memory/DB), harder to scale

### JWT (JSON Web Token) Authentication

A **JWT** is a **self-contained token** signed by the server. The server doesn't store anything.

```
Login:
  User sends username + password
  Server verifies → creates signed JWT
  Server sends JWT to browser (cookie or localStorage)

Subsequent requests:
  Browser sends JWT
  Server VERIFIES the signature (no DB lookup needed!)
  Server reads user info from the token payload
```

**Pros:** Stateless, scales easily, works across services  
**Cons:** Cannot be invalidated before expiry (use short expiry + refresh tokens)

### OAuth Authentication

**OAuth** lets users log in with a third-party provider (Google, GitHub, etc.) without sharing their password with your app.

```
1. User clicks "Sign in with Google"
2. Redirect to Google's auth page
3. User logs into Google
4. Google redirects back with an authorization code
5. Your server exchanges code for access token
6. Your server fetches user profile from Google
7. Create or find user in your DB
8. Create your own session/JWT
```

### Comparison Table

| Feature | Session | JWT | OAuth |
|---|---|---|---|
| Storage | Server DB | Client (cookie/localStorage) | Third-party provider |
| Stateless | No | Yes | Depends |
| Invalidation | Easy | Hard (need blocklist) | Provider handles it |
| Scalability | Harder | Easy | Easy |
| Best for | Simple apps | APIs, microservices | Social login |
| Security | High (server-side) | Medium (must expire fast) | High |

---

## Login, Registration & Password Flows

### Login Flow

```
1. User fills login form (email + password)
2. POST /api/auth/login
3. Server: find user by email in DB
4. Server: compare password with bcrypt.compare()
5. If match → create JWT or session
6. Set HttpOnly cookie with token
7. Return 200 + redirect to dashboard
8. If no match → return 401 + error message
```

### Registration Flow

```
1. User fills registration form (name, email, password)
2. POST /api/auth/register
3. Server: check if email already exists
4. If exists → return 409 Conflict
5. Server: hash password with bcrypt.hash(password, 12)
6. Server: save user to DB (with HASHED password, never plain)
7. Optionally send verification email
8. Return 201 Created
```

### Password Hashing

**NEVER store plain-text passwords.** Use `bcrypt`:

```ts
// app/api/auth/register/route.ts
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json()

  // Validate inputs
  if (!email || !password || password.length < 8) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  // Check if user exists
  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
  }

  // Hash password — salt rounds of 12 is recommended for production
  const hashedPassword = await bcrypt.hash(password, 12)

  // Save user — store the HASH, never the plain password
  const user = await db.user.create({
    data: { email, name, password: hashedPassword },
  })

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
}
```

---

## Cookies, Sessions, Access & Refresh Tokens

### Cookies

Cookies store small pieces of data in the browser, automatically sent with every request:

```ts
// Setting a secure HttpOnly cookie in a Next.js API route
import { cookies } from 'next/headers'

// In a Server Action or Route Handler:
const cookieStore = cookies()
cookieStore.set('auth-token', token, {
  httpOnly: true,        // ← JS cannot read this (XSS protection)
  secure: true,          // ← HTTPS only
  sameSite: 'lax',       // ← CSRF protection
  maxAge: 60 * 60 * 24,  // ← 1 day in seconds
  path: '/',
})
```

### Access Tokens vs Refresh Tokens

| | Access Token | Refresh Token |
|---|---|---|
| Purpose | Authenticate API requests | Get a new access token |
| Lifetime | Short (15 min – 1 hour) | Long (7 days – 30 days) |
| Storage | Memory or HttpOnly cookie | HttpOnly cookie only |
| Sent with | Every API request | Only to `/api/auth/refresh` |

```txt
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <rect width="700" height="300" fill="#0f172a" rx="12"/>
  <text x="350" y="28" fill="#e2e8f0" font-size="13" font-weight="700" text-anchor="middle">JWT Lifecycle — Access + Refresh Token Flow</text>

  <defs>
    <marker id="al" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
  </defs>

  <!-- Client -->
  <rect x="20" y="55" width="120" height="200" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="80" y="80" fill="#93c5fd" font-size="12" font-weight="700" text-anchor="middle">Client</text>
  <text x="80" y="96" fill="#64748b" font-size="9" text-anchor="middle">(Browser)</text>
  <line x1="80" y1="105" x2="80" y2="245" stroke="#334155" stroke-width="1" stroke-dasharray="4"/>

  <!-- Server -->
  <rect x="560" y="55" width="120" height="200" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="620" y="80" fill="#6ee7b7" font-size="12" font-weight="700" text-anchor="middle">Server</text>
  <text x="620" y="96" fill="#64748b" font-size="9" text-anchor="middle">(API)</text>
  <line x1="620" y1="105" x2="620" y2="245" stroke="#334155" stroke-width="1" stroke-dasharray="4"/>

  <!-- Step 1: Login -->
  <line x1="80" y1="120" x2="615" y2="120" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="114" fill="#93c5fd" font-size="10" text-anchor="middle">1. POST /login (email + password)</text>

  <!-- Step 2: Tokens returned -->
  <line x1="620" y1="145" x2="85" y2="145" stroke="#10b981" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="140" fill="#6ee7b7" font-size="10" text-anchor="middle">2. Returns access_token (15min) + refresh_token (7d) in HttpOnly cookies</text>

  <!-- Step 3: API call with access token -->
  <line x1="80" y1="175" x2="615" y2="175" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="169" fill="#fcd34d" font-size="10" text-anchor="middle">3. GET /api/data — access_token sent automatically via cookie</text>

  <!-- Step 4: Data returned -->
  <line x1="620" y1="195" x2="85" y2="195" stroke="#4ade80" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="190" fill="#4ade80" font-size="10" text-anchor="middle">4. ✓ Protected data returned</text>

  <!-- Step 5: Token expired -->
  <line x1="80" y1="218" x2="615" y2="218" stroke="#f87171" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="212" fill="#f87171" font-size="10" text-anchor="middle">5. access_token expired → POST /api/auth/refresh (refresh_token in cookie)</text>

  <!-- Step 6: New access token -->
  <line x1="620" y1="240" x2="85" y2="240" stroke="#c084fc" stroke-width="1.5" marker-end="url(#al)"/>
  <text x="350" y="235" fill="#c084fc" font-size="10" text-anchor="middle">6. New access_token issued — user stays logged in seamlessly</text>

  <text x="350" y="272" fill="#475569" font-size="9" text-anchor="middle">Both tokens stored in HttpOnly cookies — invisible to JavaScript</text>
</svg>
```

---

## Protected Routes & RBAC

### Protected Routes in App Router

```tsx
// app/dashboard/layout.tsx — Protect entire dashboard
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // getServerSession checks the session cookie server-side
  const session = await getServerSession(authOptions)

  // If no session, redirect to login
  if (!session) {
    redirect('/login?callbackUrl=/dashboard')
  }

  return (
    <div>
      <nav>Welcome, {session.user?.name}</nav>
      {children}
    </div>
  )
}
```

### Role-Based Access Control (RBAC)

RBAC restricts pages/features based on the user's role (e.g., `admin`, `editor`, `viewer`).

```ts
// types/next-auth.d.ts — Extend the session type to include role
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role: 'admin' | 'editor' | 'user'  // ← Add role here
    }
  }
}
```

```tsx
// app/admin/page.tsx — Admin only page
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // Not logged in
  if (!session) redirect('/login')

  // Logged in but not admin
  if (session.user.role !== 'admin') redirect('/unauthorized')

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Only admins can see this</p>
    </div>
  )
}
```

### Permissions System

For fine-grained control, use a permissions map:

```ts
// lib/permissions.ts
type Role = 'admin' | 'editor' | 'user'
type Permission = 'read:posts' | 'write:posts' | 'delete:posts' | 'manage:users'

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ['read:posts', 'write:posts', 'delete:posts', 'manage:users'],
  editor: ['read:posts', 'write:posts'],
  user: ['read:posts'],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

// Usage in a component or API route:
// if (!hasPermission(session.user.role, 'delete:posts')) throw new Error('Forbidden')
```

---

## NextAuth.js / Auth.js

**NextAuth.js** (rebranded as **Auth.js**) is the most popular authentication library for Next.js. It handles:

- Multiple providers (Google, GitHub, credentials, etc.)
- Session management
- JWT or database sessions
- CSRF protection
- Callbacks for customizing tokens and sessions

### Installation

```bash
npm install next-auth
# or
npm install next-auth@beta  # for Auth.js v5
```

### Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts    ← NextAuth API handler
│   ├── login/
│   │   └── page.tsx
│   └── dashboard/
│       └── page.tsx
├── lib/
│   └── auth.ts                 ← Auth configuration
└── types/
    └── next-auth.d.ts          ← Type extensions
```

---

## Credentials, Google & GitHub Providers

### auth.ts — Full Configuration

```ts
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  // Use Prisma to persist sessions/users in your DB
  adapter: PrismaAdapter(db),

  // Use JWT for session strategy (good for Edge/serverless)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Custom pages (optional — override NextAuth defaults)
  pages: {
    signIn: '/login',       // Custom login page
    error: '/auth/error',   // Auth error page
  },

  // Providers — ways users can log in
  providers: [
    // ─── Credentials (email + password) ──────────────────
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        // Find user in DB
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword) {
          throw new Error('User not found')
        }

        // Compare password with hash
        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),

    // ─── Google OAuth ─────────────────────────────────────
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ─── GitHub OAuth ─────────────────────────────────────
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  // Callbacks — customize JWT and session
  callbacks: {
    // Runs whenever a JWT is created or updated
    async jwt({ token, user }) {
      if (user) {
        // First login — add extra fields to the token
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },

    // Runs whenever a session is checked
    async session({ session, token }) {
      if (token) {
        // Pass JWT fields to the session (available in components)
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  // Secret for signing JWTs — use a strong random string
  secret: process.env.NEXTAUTH_SECRET,
}
```

### API Route Handler

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

// Export for both GET and POST (NextAuth uses both)
export { handler as GET, handler as POST }
```

---

## Core Auth Functions

### signIn()

```tsx
// app/login/page.tsx
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCredentialsLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    // Sign in with credentials
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false, // Handle redirect manually
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password')
      return
    }

    // Redirect to dashboard on success
    router.push('/dashboard')
    router.refresh() // Refresh server components
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      {/* Credentials form */}
      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border rounded-lg"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {/* Google OAuth */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          Sign in with Google
        </button>

        {/* GitHub OAuth */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  )
}
```

### signOut()

```tsx
// components/LogoutButton.tsx
'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: '/login', // Where to redirect after logout
        })
      }
      className="px-4 py-2 bg-red-600 text-white rounded-lg"
    >
      Sign Out
    </button>
  )
}
```

### getServerSession()

Used in **Server Components** and **API Routes** to get the current user session:

```tsx
// app/dashboard/page.tsx — Server Component
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  // Fetch session on the server — no API call, reads from cookie
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name}!</p>
      <p>Email: {session.user?.email}</p>
      <p>Role: {session.user?.role}</p>
    </div>
  )
}
```

```ts
// app/api/protected/route.ts — Protected API Route
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    message: 'Protected data',
    user: session.user,
  })
}
```

### Registration Page

```tsx
// app/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    // Validate password length client-side
    if (data.password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    // Call registration API
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const body = await res.json()
      setError(body.error ?? 'Registration failed')
      setLoading(false)
      return
    }

    // Auto-login after registration
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard',
    })
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input name="name" type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg"/>
        <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded-lg"/>
        <input name="password" type="password" placeholder="Password (min. 8 chars)" required className="w-full p-3 border rounded-lg"/>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="w-full p-3 bg-blue-600 text-white rounded-lg disabled:opacity-50">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}
```

### Protected Dashboard with Role Display

```tsx
// app/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="bg-white border rounded-xl p-6 space-y-3">
        <p><span className="font-semibold">Name:</span> {session.user?.name}</p>
        <p><span className="font-semibold">Email:</span> {session.user?.email}</p>
        <p>
          <span className="font-semibold">Role:</span>{' '}
          <span className={`px-2 py-1 rounded text-sm ${
            session.user?.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {session.user?.role ?? 'user'}
          </span>
        </p>
      </div>

      {/* Admin-only section */}
      {session.user?.role === 'admin' && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="font-bold text-red-700 mb-2">Admin Panel</h2>
          <p className="text-sm text-red-600">This section is only visible to admins.</p>
        </div>
      )}
    </div>
  )
}
```

---

## OAuth Flow Diagram

```txt
<svg viewBox="0 0 720 390" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <rect width="720" height="390" fill="#0f172a" rx="12"/>
  <text x="360" y="28" fill="#e2e8f0" font-size="14" font-weight="700" text-anchor="middle">OAuth 2.0 Flow (e.g., Sign in with Google)</text>

  <defs>
    <marker id="oa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
  </defs>

  <!-- Actors -->
  <rect x="20" y="50" width="100" height="40" rx="7" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="70" y="66" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle">Browser</text>
  <text x="70" y="80" fill="#64748b" font-size="9" text-anchor="middle">(User)</text>
  <line x1="70" y1="90" x2="70" y2="360" stroke="#1e3a5f" stroke-width="1" stroke-dasharray="3"/>

  <rect x="290" y="50" width="140" height="40" rx="7" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="360" y="66" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle">Your Next.js App</text>
  <text x="360" y="80" fill="#64748b" font-size="9" text-anchor="middle">(NextAuth handler)</text>
  <line x1="360" y1="90" x2="360" y2="360" stroke="#1e4a3a" stroke-width="1" stroke-dasharray="3"/>

  <rect x="570" y="50" width="130" height="40" rx="7" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
  <text x="635" y="66" fill="#fcd34d" font-size="11" font-weight="700" text-anchor="middle">Google / GitHub</text>
  <text x="635" y="80" fill="#64748b" font-size="9" text-anchor="middle">(OAuth Provider)</text>
  <line x1="635" y1="90" x2="635" y2="360" stroke="#3d2e00" stroke-width="1" stroke-dasharray="3"/>

  <!-- Steps -->
  <!-- 1 -->
  <line x1="70" y1="115" x2="355" y2="115" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="212" y="110" fill="#93c5fd" font-size="10" text-anchor="middle">1. Click "Sign in with Google"</text>

  <!-- 2 -->
  <line x1="360" y1="140" x2="75" y2="140" stroke="#10b981" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="212" y="135" fill="#6ee7b7" font-size="10" text-anchor="middle">2. Redirect to Google auth URL</text>

  <!-- 3 -->
  <line x1="70" y1="165" x2="630" y2="165" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="350" y="160" fill="#fcd34d" font-size="10" text-anchor="middle">3. Browser goes to Google → user logs into Google</text>

  <!-- 4 -->
  <line x1="635" y1="195" x2="75" y2="195" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="350" y="190" fill="#fcd34d" font-size="10" text-anchor="middle">4. Google redirects back with ?code=AUTH_CODE</text>

  <!-- 5 -->
  <line x1="70" y1="220" x2="355" y2="220" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="212" y="215" fill="#93c5fd" font-size="10" text-anchor="middle">5. Browser hits your callback URL</text>

  <!-- 6 -->
  <line x1="360" y1="248" x2="630" y2="248" stroke="#10b981" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="490" y="243" fill="#6ee7b7" font-size="10" text-anchor="middle">6. Server exchanges code for access_token</text>

  <!-- 7 -->
  <line x1="635" y1="273" x2="365" y2="273" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="490" y="268" fill="#fcd34d" font-size="10" text-anchor="middle">7. Google returns access_token + user profile</text>

  <!-- 8 -->
  <rect x="275" y="285" width="170" height="30" rx="5" fill="#1e3a2f" stroke="#10b981" stroke-width="1"/>
  <text x="360" y="298" fill="#6ee7b7" font-size="10" font-weight="700" text-anchor="middle">8. Create/find user in DB,</text>
  <text x="360" y="310" fill="#6ee7b7" font-size="10" font-weight="700" text-anchor="middle">create your session/JWT</text>

  <!-- 9 -->
  <line x1="360" y1="316" x2="75" y2="316" stroke="#10b981" stroke-width="1.5" marker-end="url(#oa)"/>
  <text x="212" y="311" fill="#6ee7b7" font-size="10" text-anchor="middle">9. Set session cookie → redirect to /dashboard</text>

  <text x="360" y="360" fill="#475569" font-size="9" text-anchor="middle">NextAuth handles steps 2–9 automatically. You only configure providers and callbacks.</text>
</svg>
```

---

## Password Security & Secure Cookies

### Password Security Best Practices

```ts
// ─── Password hashing with bcrypt ───────────────────────
import bcrypt from 'bcryptjs'

// Hashing — always use cost factor 12 or higher in production
const SALT_ROUNDS = 12
const hash = await bcrypt.hash('userPassword123', SALT_ROUNDS)

// Comparing — timing-safe, returns boolean
const isMatch = await bcrypt.compare('userPassword123', hash)

// ─── NEVER DO THESE ─────────────────────────────────────
// ❌ Store plain text passwords
// ❌ Use MD5 or SHA1 for passwords (not designed for passwords)
// ❌ Use a fast hash like SHA256 (too fast = easy to brute force)
// ❌ Use bcrypt cost factor < 10 in production
```

### Secure Cookie Configuration

```ts
// Setting a production-safe auth cookie
import { cookies } from 'next/headers'

function setAuthCookie(token: string) {
  const cookieStore = cookies()

  cookieStore.set('auth-token', token, {
    httpOnly: true,            // JS can't read it (stops XSS)
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'lax',           // Prevents CSRF on cross-site requests
    maxAge: 60 * 60 * 24 * 7,  // 7 days
    path: '/',                 // Available to all routes
  })
}
```

| Cookie Attribute | Purpose | Recommended Value |
|---|---|---|
| `httpOnly` | Prevents JS from reading the cookie | `true` |
| `secure` | HTTPS only | `true` in production |
| `sameSite` | CSRF protection | `lax` (or `strict` for maximum security) |
| `maxAge` | Expiry in seconds | 7 days for refresh, 15 min for access |
| `path` | Which routes send the cookie | `/` |

---

## CSRF Basics

**CSRF (Cross-Site Request Forgery)** is an attack where a malicious website tricks your browser into making a request to your app while you're logged in.

```
Attack flow without protection:
  1. You're logged into bank.com
  2. You visit evil.com
  3. evil.com has a hidden form that posts to bank.com/transfer
  4. Your browser sends the request WITH your bank.com cookie
  5. Bank thinks it's you!
```

**Defenses:**

- `sameSite: 'lax'` on cookies — browser won't send cookie on cross-site POST
- CSRF tokens — server generates a unique token, client must send it in the form
- NextAuth.js **handles CSRF protection automatically** (it generates a CSRF token for every sign-in)

```ts
// NextAuth's built-in CSRF token (used automatically by its sign-in forms)
// GET /api/auth/csrf → returns { csrfToken: "..." }
// You can read it to build custom forms:
import { getCsrfToken } from 'next-auth/react'
const csrfToken = await getCsrfToken()
```

---

## Authentication Workflow Diagram

```txt
<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">
  <rect width="700" height="420" fill="#0f172a" rx="12"/>
  <text x="350" y="28" fill="#e2e8f0" font-size="14" font-weight="700" text-anchor="middle">Full Authentication Workflow</text>

  <defs>
    <marker id="aw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
    <marker id="awg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#4ade80"/>
    </marker>
    <marker id="awr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
  </defs>

  <!-- Registration path -->
  <text x="40" y="58" fill="#c084fc" font-size="11" font-weight="700">REGISTRATION</text>
  <rect x="30" y="65" width="100" height="35" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
  <text x="80" y="80" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">Register</text>
  <text x="80" y="93" fill="#64748b" font-size="9" text-anchor="middle">name/email/pass</text>

  <line x1="130" y1="82" x2="165" y2="82" stroke="#c084fc" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="165" y="65" width="100" height="35" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
  <text x="215" y="80" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">Hash Password</text>
  <text x="215" y="93" fill="#64748b" font-size="9" text-anchor="middle">bcrypt(pass, 12)</text>

  <line x1="265" y1="82" x2="300" y2="82" stroke="#c084fc" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="300" y="65" width="100" height="35" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
  <text x="350" y="80" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">Save to DB</text>
  <text x="350" y="93" fill="#64748b" font-size="9" text-anchor="middle">user + hash</text>

  <line x1="400" y1="82" x2="435" y2="82" stroke="#c084fc" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="435" y="65" width="110" height="35" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
  <text x="490" y="80" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">201 Created</text>
  <text x="490" y="93" fill="#64748b" font-size="9" text-anchor="middle">→ auto sign in</text>

  <!-- Login path -->
  <text x="40" y="138" fill="#3b82f6" font-size="11" font-weight="700">LOGIN</text>
  <rect x="30" y="145" width="100" height="35" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="160" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">Login Form</text>
  <text x="80" y="173" fill="#64748b" font-size="9" text-anchor="middle">email + password</text>

  <line x1="130" y1="162" x2="165" y2="162" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="165" y="145" width="100" height="35" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="215" y="160" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">Find User</text>
  <text x="215" y="173" fill="#64748b" font-size="9" text-anchor="middle">by email in DB</text>

  <line x1="265" y1="162" x2="300" y2="162" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="300" y="145" width="100" height="35" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="350" y="160" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">bcrypt.compare</text>
  <text x="350" y="173" fill="#64748b" font-size="9" text-anchor="middle">pass vs hash</text>

  <!-- Match / No match -->
  <line x1="400" y1="162" x2="435" y2="162" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#aw)"/>

  <polygon points="490,145 540,162 490,179 440,162" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="490" y="158" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">Match?</text>

  <!-- Yes path -->
  <line x1="540" y1="162" x2="575" y2="162" stroke="#4ade80" stroke-width="1.5" marker-end="url(#awg)"/>
  <text x="557" y="156" fill="#4ade80" font-size="9">Yes</text>
  <rect x="575" y="145" width="100" height="35" rx="6" fill="#052e16" stroke="#4ade80" stroke-width="1.5"/>
  <text x="625" y="160" fill="#4ade80" font-size="10" font-weight="700" text-anchor="middle">Issue JWT</text>
  <text x="625" y="173" fill="#64748b" font-size="9" text-anchor="middle">set cookie</text>

  <!-- No path -->
  <line x1="490" y1="179" x2="490" y2="210" stroke="#f87171" stroke-width="1.5" marker-end="url(#awr)"/>
  <text x="505" y="200" fill="#f87171" font-size="9">No</text>
  <rect x="435" y="210" width="110" height="35" rx="6" fill="#450a0a" stroke="#f87171" stroke-width="1.5"/>
  <text x="490" y="225" fill="#f87171" font-size="10" font-weight="700" text-anchor="middle">401 Error</text>
  <text x="490" y="238" fill="#64748b" font-size="9" text-anchor="middle">Invalid credentials</text>

  <!-- Accessing protected route -->
  <text x="40" y="285" fill="#f59e0b" font-size="11" font-weight="700">PROTECTED ROUTE ACCESS</text>
  <rect x="30" y="293" width="110" height="35" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="85" y="308" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Request with</text>
  <text x="85" y="321" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">auth cookie</text>

  <line x1="140" y1="310" x2="175" y2="310" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#aw)"/>

  <rect x="175" y="293" width="110" height="35" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="230" y="308" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Middleware</text>
  <text x="230" y="321" fill="#64748b" font-size="9" text-anchor="middle">verify JWT</text>

  <line x1="285" y1="310" x2="320" y2="310" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#aw)"/>

  <polygon points="375,293 425,310 375,327 325,310" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="375" y="306" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Valid</text>
  <text x="375" y="318" fill="#fcd34d" font-size="10" font-weight="700" text-anchor="middle">Token?</text>

  <!-- Yes allow -->
  <line x1="425" y1="310" x2="460" y2="310" stroke="#4ade80" stroke-width="1.5" marker-end="url(#awg)"/>
  <text x="442" y="304" fill="#4ade80" font-size="9">Yes</text>
  <rect x="460" y="293" width="110" height="35" rx="6" fill="#052e16" stroke="#4ade80" stroke-width="1.5"/>
  <text x="515" y="308" fill="#4ade80" font-size="10" font-weight="700" text-anchor="middle">Render Page</text>
  <text x="515" y="321" fill="#64748b" font-size="9" text-anchor="middle">with session data</text>

  <!-- No block -->
  <line x1="375" y1="327" x2="375" y2="357" stroke="#f87171" stroke-width="1.5" marker-end="url(#awr)"/>
  <rect x="315" y="358" width="120" height="35" rx="6" fill="#450a0a" stroke="#f87171" stroke-width="1.5"/>
  <text x="375" y="373" fill="#f87171" font-size="10" font-weight="700" text-anchor="middle">Redirect /login</text>
  <text x="375" y="386" fill="#64748b" font-size="9" text-anchor="middle">401 / 403</text>
</svg>
```

---

## Best Practices — Authentication

- **Always hash passwords** with `bcrypt` (cost factor 12+). Never store plain text.
- **Use short-lived access tokens** (15–60 minutes) and refresh them silently.
- **Store tokens in HttpOnly cookies**, not `localStorage` (XSS protection).
- **Use `sameSite: 'lax'`** on auth cookies for CSRF protection.
- **Validate sessions server-side** on protected routes — never trust client-side state alone.
- **Implement rate limiting** on login endpoints to prevent brute-force attacks.
- **Send verification emails** for new accounts before allowing access.
- **Use HTTPS in production** — auth tokens are useless if intercepted in plain text.
- **Never log passwords or tokens** — scrub them from logs.
- **Extend NextAuth session types** to include `role` and `id` — don't cast as `any` everywhere.
- **Use `redirect: false`** in `signIn()` to handle errors client-side.
- **Always call `router.refresh()`** after sign-in to update Server Components with the new session.

---

## Common Mistakes — Authentication

- **Storing JWT in localStorage** — vulnerable to XSS. Use HttpOnly cookies.
- **Not verifying the JWT on the server** — only checking the cookie name, not the signature.
- **Long-lived access tokens** — if stolen, attacker has access for a long time. Use 15-minute tokens.
- **Not extending the NextAuth session type** — `session.user.role` shows a TypeScript error or is typed as `any`.
- **Forgetting `NEXTAUTH_SECRET`** in environment variables — NextAuth silently falls back to a weak secret.
- **Fetching session with `useSession()`** in Server Components — use `getServerSession()` instead.
- **Not wrapping the app in `SessionProvider`** — `useSession()` fails in client components.
- **Not calling `router.refresh()`** after sign-in — Server Components still show the logged-out state.
- **Checking auth only in middleware** — still double-check in the page/API route (defense in depth).
- **Sending passwords over HTTP** — always require HTTPS in production.

---

## Interview Questions — Authentication

**Beginner:**
1. What is the difference between authentication and authorization?
2. Why should passwords never be stored in plain text?
3. What is a JWT and what does it contain?
4. What is an HttpOnly cookie, and why is it more secure than localStorage?

**Intermediate:**
5. How does OAuth work? Walk through the flow step by step.
6. What is the difference between access tokens and refresh tokens?
7. How do you protect a page in the Next.js App Router?
8. What is `getServerSession()` and when would you use it?
9. What is CSRF, and how does `sameSite: 'lax'` help prevent it?
10. How would you implement role-based access control in Next.js?

**Advanced:**
11. How do you implement silent token refresh without interrupting the user experience?
12. What are the security tradeoffs between session-based and JWT-based authentication?
13. How does NextAuth.js handle CSRF protection internally?
14. What is token rotation, and why is it important for refresh tokens?
15. How would you securely implement "remember me" functionality?

---
