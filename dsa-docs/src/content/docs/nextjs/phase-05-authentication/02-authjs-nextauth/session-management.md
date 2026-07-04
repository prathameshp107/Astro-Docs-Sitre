---
title: "Session Management"
description: "Database Strategy: Login → Create random session ID → Store {id, userData, expires} in DB → Send session ID to client → Client sends ID with requests → Loo"
---

# Session Management

## Introduction
Session management in Auth.js handles how user authentication state is maintained between requests. Auth.js supports two primary strategies: JSON Web Tokens (JWT) and database sessions, each with different trade-offs for security, performance, and scalability.

## Why we need session management
HTTP is stateless; web applications need a mechanism to remember authenticated users across requests. Proper session management ensures security (preventing hijacking), privacy (minimizing data exposure), and performance (efficient state lookup).

## Problem statement
How do we securely maintain user authentication state in a Next.js application using Auth.js, choosing between JWT and database strategies, implementing proper expiration, handling renewal, and securing session storage?

## Real-world story
A financial trading platform initially used JWT sessions for simplicity but later switched to database sessions when they needed to implement immediate session revocation for security incidents and compliance with financial regulations requiring audit trails of all sessions.

## Real-world analogy
**Session management**: Like a coat check at a restaurant - you give your coat (credentials) and get a token (session ID). The coat check can either:
- Store your coat in a numbered cubby (database session) - can retrieve specific coat, lose it if needed
- Give you a special tag that encodes your coat description in a barcode (JWT) - stateless but can't recall individual coats without breaking the seal

## Visual explanation
```
JWT Strategy:
Login → Create signed JWT containing user data → Send to client → 
Client stores JWT → Send JWT with requests → Verify signature & claims → Extract user

Database Strategy:
Login → Create random session ID → Store {id, userData, expires} in DB → 
Send session ID to client → Client sends ID with requests → 
Lookup session in DB → Validate expiration → Return user data
```

## Mermaid Diagram 1: Session Strategies
```mermaid
graph TD
    A[Login] --> B{Strategy}
    B -->|JWT| C[Sign JWT with user data]
    B -->|Database| D[Create session record]
    C --> E[Send token to client]
    D --> F[Send session ID to client]
    E --> G[Client stores token]
    F --> H[Client stores session ID]
    G --> I[Request with token]
    H --> J[Request with session ID]
    I --> K{Verify signature & claims}
    J --> K{Lookup session in DB}
    K -->|Valid| L[Extract user data]
    K -->|Invalid| M[Reject request]
    L --> N[Process request]
    M --> N
```

## Internal working
**JWT Strategy**:
1. After successful authentication, Auth.js creates a JWT containing user data (sub, name, email, etc.)
2. JWT is signed with `NEXTAUTH_SECRET` using HS256 (default)
3. Encrypted JWT is sent to client in cookie: `next-auth.session-token`
4. On each request, middleware:
   - Extracts and decrypts the cookie
   - Verifies JWT signature
   - Validates standard claims (exp, nbf, iat)
   - Extracts user data from payload
   - Calls `session` callback to customize session object
5. Token is rotated periodically based on configuration

**Database Strategy**:
1. After successful authentication, Auth.js creates a session record in database
2. Record contains: session token (random), user ID, expires, session data
3. Session token sent to client in cookie: `next-auth.session-token`
4. On each request, middleware:
   - Extracts session token from cookie
   - Looks up session in database by token
   - Validates expiration time
   - Optionally updates last accessed time (sliding expiration)
   - Returns session data
   - Calls `session` callback to customize session object
5. Session can be invalidated immediately by deleting from database

## Session lifecycle
```
Create → Store → Send → Receive → Validate → Use → Refresh/Renew → Expire/Invalidate → Delete
```

## Session token structure
**JWT cookie** (name: `next-auth.session-token`):
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```
Decoded payload example:
```json
{
  "jti": "unique-id",
  "sub": "user-id",
  "name": "John Doe",
  "email": "user@example.com",
  "iat": 1516239022,
  "exp": 1832007022,
  "atl": "jwt" // auth token type
}
```

**Database session** (table: `sessions`):
| Column | Type | Description |
|--------|------|-------------|
| sessionToken | varchar(255) | Unique session identifier (primary key) |
| userId | varchar(255) | Foreign key to users table |
| expires | timestamp | When session expires |
| sessionData | text | Encrypted session data (JSON) |

## Implementation
### JWT Strategy (default)
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const { GET, POST } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  session: {
    strategy: "jwt",
    // Optional: JWT-specific settings
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update every 24 hours
  },
  jwt: {
    // Optional: JWT signing/encryption settings
    secret: process.env.JWT_SECRET, // Defaults to NEXTAUTH_SECRET
    // maxAge: 60 * 60 * 24 * 30, // 30 days
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {}
  }
})
```

### Database Strategy
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const { GET, POST } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  session: {
    strategy: "database",
    // Database-specific settings
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  }
})
```

### Custom session handling
```typescript
// app/api/auth/[...nextauth]/route.ts
export const { GET, POST } = NextAuth({
  // ... providers, adapter, etc.
  events: {
    // Create session
    createSession: async ({ session, user, isNewUser }) => {
      // Custom logic when session is created
      // e.g., log session creation, set initial preferences
    },
    // Update session
    updateSession: async ({ session, user, token, profile, account, isNewUser }) => {
      // Custom logic when session is updated
      // e.g., update last seen IP, refresh tokens
    }
  },
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token", // __Secure-prefix
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true, // requires HTTPS
        // domain: ".example.com", // optional
        // priority: "high"
      }
    }
  }
})
```

## Refreshing and rotating sessions
### Automatic token rotation (JWT)
```typescript
// app/api/auth/[...nextauth]/route.ts
export const { GET, POST } = NextAuth({
  // ...
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update after 24 hours
  },
  // Rotate token on every request if desired (security vs performance tradeoff)
  // updateAge: false // Disable automatic updates - token valid for full maxAge
})
```

### Manual session invalidation
```typescript
// lib/auth.ts
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function invalidateAllUserSessions(userId: string) {
  // For database strategy: delete sessions
  await prisma.session.deleteMany({
    where: { userId }
  })
  
  // For JWT strategy: change secret or implement token versioning
  // Option 1: Change NEXTAUTH_SECRET (invalidates ALL tokens - nuclear option)
  // Option 2: Implement token version in user entity
  // Option 3: Use deny list (blacklist) of token jti values
}
```

### Session renewal/refresh
```typescript
// Middleware or route handler example
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function refreshSessionIfNeeded() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    const now = Math.floor(Date.now() / 1000)
    const expires = new Date(session.expires).getTime() / 1000
    
    // Refresh if less than 1 hour remaining
    if (expires - now < 3600) {
      // Trigger session update by making a request to auth endpoint
      // or simply redirect to refresh
    }
  }
}
```

## Session storage considerations
### JWT Store
- **Pros**: Stateless, no database lookup, excellent for CDN/serverless
- **Cons**: Larger cookie size, immediate revocation difficult, token theft valid until expiry
- **Best for**: SPA, mobile backends, stateless architectures, high traffic

### Database Store
- **Pros**: Immediate revocation, smaller cookie, server-side control
- **Cons**: Database lookup on each request, storage overhead
- **Best for**: Traditional web apps, when immediate revocation needed, compliance requirements

## Implementation in Next.js
### Using session in components
```tsx
// app/dashboard/page.tsx
import { useSession, signIn, signOut } from "next-auth/react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <SignInButton />
  
  return (
    <div>
      <h1>Welcome, {session.user.name}!</p>
      <p>Email: {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
```

### Using session in API routes
```typescript
// app/api/protected/route.ts
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    })
  }
  
  // Access session data
  const userId = session.user.id
  const userEmail = session.user.email
  
  return Response.json({ message: `Hello ${userEmail}` })
}
```

### Using session in server components
```typescript
// app/dashboard/layout.tsx
import { auth } from "@/auth"

export default async function DashboardLayout(
  { children }: { children: React.ReactNode }
) {
  const session = await auth()
  
  if (!session) {
    // Redirect to login
    // In server components, use redirect or notFound
    redirect("/signin")
  }
  
  return (
    <section>
      <h1>Dashboard</h1>
      {children}
    </section>
  )
}
```

## Special session types
### Temporary/Ephemeral sessions
```typescript
// For sensitive operations (password change, payment)
export const { GET, POST } = NextAuth({
  // ...
  pages: {
    verifyRequest: "/auth/verify-request" // Custom email verification page
  },
  // Create short-lived session for verification
  callbacks: {
    async session({ session, token, user }) {
      // Set short expiration for sensitive operations
      if (token.action === "verify-email") {
        return {
          ...session,
          expires: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
        }
      }
      return session
    }
  }
})
```

### Remember Me / Extended sessions
```typescript
// In credentials provider authorize function
async authorize(credentials) {
  const user = await validateCredentials(credentials)
  
  if (user) {
    // Check if "remember me" was checked
    if (credentials.rememberMe) {
      // Return session token with longer expiry
      // This would require custom JWT handling or database session maxAge override
    }
    return user
  }
  return null
}
```

## Session security best practices
**Token protection**:
- Use `HttpOnly` cookies to prevent XSS access
- Use `Secure` flag in production (requires HTTPS)
- Use `SameSite=Lax` or `Strict` to mitigate CSSF
- Consider `__Host-` cookie prefix for extra security
- Encrypt session data (JWT encryption or database encryption)
- Implement proper cookie path and domain settings

**Session lifecycle**:
- Set appropriate `maxAge` (typically 15-30 minutes for high security, 1-4 weeks for convenience)
- Implement `updateAge` for sliding expiration (refreshes session on activity)
- Consider absolute timeout regardless of activity
- Invalidate sessions on password change, email change, role change
- Provide "log out of all sessions" functionality
- Implement session locking after suspicious activity

**Detection and prevention**:
- Log session creation, access, and termination
- Monitor for concurrent sessions from distant locations
- Implement device fingerprinting for step-up authentication
- Require re-authentication for sensitive operations
- Consider IP address binding (with caveats for mobile/users behind NAT)
- Monitor for session fixation attempts

## Performance considerations
**Database strategy**:
- Use connection pooling for session lookup
- Index session token column for O(log n) lookup
- Consider partitioning session table by expiration time
- Implement background cleanup of expired sessions
- Use read replicas for session lookups if read-heavy
- Cache frequent session lookups (with caution for consistency)
- Consider Redis instead of relational DB for session store

**JWT strategy**:
- Minimize claims in JWT to reduce cookie size
- Use efficient JWT library (node-jose, jose)
- Consider asymmetric signing (RS256) for distributed verification
- Implement JWT blocklist for immediate revocation (with caveats)
- Cache public keys for JWKS validation (if using OIDC)
- Consider token compression for large payloads

## Session cleanup
### Automatic expiration
Both strategies automatically remove expired sessions:
- JWT: Tokens become invalid after `exp` claim passes
- Database: Expired entries removed via background job or TTL index

### Manual cleanup strategies
```typescript
// Scheduled cleanup (e.g., cron job)
async function cleanupExpiredSessions() {
  // Database strategy
  await prisma.session.deleteMany({
    where: { expires: { lt: new Date() } }
  })
  
  // For JWT with deny list: clean old entries
  await prisma.tokenBlacklist.deleteMany({
    where: { expiresAt: { lt: new Date() } }
  })
}

// Or use database TTL (PostgreSQL example)
// CREATE TABLE sessions (
//   ..., 
//   expires TIMESTAMPTZ,
//   EXCLUDE USING GIST (tsrange(created_at, expires, '[)') WITH =)
// );
// SELECT expire_sessions(); -- periodic cleanup
```

## Special use cases
### Multiple concurrent sessions
```typescript
// Allow multiple sessions per user (default)
// To limit to one session:
// 1. On login, delete existing sessions for user
// 2. Or store session ID in user record and validate match
```

### Cross-tab synchronization
```typescript
// Use BroadcastChannel or localStorage events to sync state
// when user logs in/out in another tab
useEffect(() => {
  const channel = new BroadcastHelper("auth-session")
  return () => {
    // Cleanup
  }
}, [])
```

### Offline-first / PWAs
```typescript
// Consider:
// - IndexedDB for offline session storage
// - Background sync for pending actions
// - Service worker middleware to handle auth
// - Background fetch for token refresh
```

## Integration with Next.js features
### Middleware
```typescript
// middleware.ts
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }
  
  return NextResponse.next()
}
```

### Edge runtime
```typescript
// edge-config.js
export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"]
}

// In route handlers:
import { getToken } from "next-auth/jwt"

// Works in edge with limitations:
// - No database adapter (use JWT strategy)
// - Limited cookie options
// - No custom OAuth flow handling
```

## Monitoring and analytics
**Session metrics to track**:
- Active session count
- Session creation rate
- Average session duration
- Geographic distribution of sessions
- Device/browser breakdown
- Concurrent sessions per user
- Session renewal frequency
- Failed session validation attempts

**Alerting conditions**:
- Sudden spike in session creation (possible credential stuffing)
- Sessions from impossible travel locations
- High frequency of session invalidation
- Unusual user-agent patterns
- Multiple failed session validations from same IP

## Interview questions
1. What are the two main session strategies in Auth.js?
2. How does JWT session strategy differ from database strategy?
3. How do you invalidate a session immediately with JWT strategy?
4. What is the purpose of the `updateAge` setting in session configuration?
5. How do you secure session cookies against XSS and CSRF?
6. Where is session data stored in each strategy?
7. How would you implement "remember me" functionality?
8. What is session fixation and how do you prevent it?
9. How do you handle session expiration in a distributed system?
10. What metrics would you monitor for session health?

## MCQs
1. Which cookie name does Auth.js use for session tokens by default?
   a) next-auth.session-token
   b) next-auth-token
   c) session-token
   d) auth-session
   Answer: a

2. Which session strategy allows immediate revocation?
   a) JWT
   b) Database
   c) Both
   d) Neither
   Answer: b

3. What does the `session.maxAge` setting control?
   a) How often to update the session
   b) How long until session expires
   c) Size of session data in bytes
   d) Number of sessions per user
   Answer: b

4. Which of the following is NOT a suitable strategy for immediate session invalidation with JWT?
   a) Changing the signing secret
   b) Using a token version field in user record
   c) Implementing a token blacklist/denylist
   d) Reducing the maxAge to 1 second
   Answer: d (too disruptive, affects all users)

5. What is the purpose of the `session.updateAge` setting?
   a) How often to extend session on activity
   b) How often to rotate encryption keys
   c) How often to check for session conflicts
   d) How often to sync with database
   Answer: a

## Practice exercise
Implement session management with:
1. JWT strategy with 15-minute inactive timeout
2. Session renewal when less than 5 minutes remain
3. Immediate logout on password change
4. "Remember me" checkbox that extends session to 30 days
5. Session invalidation on IP address change (optional)
6. Session history page showing active sessions
7. "Log out of all other sessions" button
8. Audit logging of session creation/access/termination
9. Protection against session fixation
10. Testing session behavior across tabs and windows

## Debugging experience
"Invalid session token" error after login.
Check:
1. Cookie settings (Secure, SameSite, Domain, Path)
2. Whether you're mixing HTTP and HTTPS
3. Incorrect secret between signing and verification
4. Token expiration (check system clock/timezone)
5. Corrupted cookie (size limits, special characters)
6. Middleware not calling next() after verification
7. Incorrect cookie name or parsing logic
8. Proxy stripping or modifying Cookie headers
9. Serverless function timeout during verification
10. Missing `next-auth/jwt` import or incorrect usage

## Real-world scenario
Healthcare portal (HIPAA compliance):
- Session timeout: 15 minutes of inactivity
- Automatic logout on screen lock (via Page Visibility API)
- Session binding to IP address and user agent
- Audit log: login, logout, access to PHI, session termination
- Concurrent session limit: 2 (one mobile, one desktop)
- Required re-authentication for accessing medical records
- Session encryption at rest and in transit
- Backup and recovery of session logs for 6 years

## Mini project
Build a session management dashboard that shows:
- Current session details (IP, user agent, login time, last activity)
- List of all active sessions with location and device info
- Ability to terminate individual sessions
- "Log out of everywhere except current" button
- Session lifecycle timeline (created, last used, expires)
- Security events (failed attempts, IP changes, etc.)
- Geographic map of session origins
- Integration with authentication logs for full audit trail
- Export functionality for compliance reporting