---
title: "Credentials Provider"
description: "export const { GET, POST } = NextAuth({ providers: [ CredentialsProvider({ // The name to display on the sign in form (e.g. \"Sign in with...\") name: \"Crede"
---

# Credentials Provider

## Introduction
The Credentials provider in Auth.js allows you to implement custom authentication logic using username/email and password (or any other credentials) while leveraging Auth.js's session management, security features, and frontend helpers.

## Why we need the Credentials provider
Not all authentication scenarios involve third-party providers. Many applications require email/password login, LDAP integration, or custom auth systems. The Credentials provider gives you full control over the verification process while still benefiting from Auth.js's robust session handling.

## Problem statement
How do we implement secure username/password authentication in a Next.js application using Auth.js, including password validation, user lookup, session creation, and security best practices like hashing and rate limiting?

## Real-world story
A banking application needed to integrate with their existing LDAP user store while providing a seamless Next.js frontend. Using the Credentials provider, they implemented LDAP authentication in the `authorize` callback, giving users a familiar login experience without compromising security.

## Real-world analogy
**Credentials provider**: Like a bank teller who verifies your identity using multiple methods (ID check, security questions, signature) but still gives you the same bank card (session) that works at all ATMs and point-of-sale terminals.

## Visual explanation
```
User submits email/password
        ↓
Credentials Provider → authorize() callback
        ↓
Your custom logic (DB lookup, hash verify)
        ↓
Returns user object or null/error
        ↓
Auth.js creates session and sets cookie
```

## Mermaid Diagram 1: Credentials Flow
```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant A as App (Next.js)
    participant Auth as Auth.js
    participant D as Database
    U->>B: Enter email/password
    B->>A: POST /api/auth/credential
    A->>Auth: Credentials object
    Auth->>Credentials: Call authorize(credentials)
    Credentials->>D: Find user by email
    alt User found
        D-->>Credentials: User record
        Credentials->>D: Compare password hash
        hash correct?
        -->|Yes| Credentials->>Auth: Return user object
        -->|No| Credentials-->>Auth: Return null
    else User not found
        Credentials-->>Auth: Return null
    end
    alt User object returned
        Auth->>D: Create/update user record
        Auth->>D: Create session record
        Auth-->>A: Session token
        A-->>B: Set cookie + redirect
    else Null returned
        A-->>B: 401 Unauthorized
    end
```

## Internal working
**Credentials provider specifics**:
- Exposes endpoint: `/api/auth/credential` (POST only)
- Expects JSON body with credential fields (default: `username` and `password`)
- Calls your `authorize(credentials)` function with submitted values
- Expects return of user object (any shape) or `null`/false for failure
- Does **not** automatically handle:
  - Password hashing (you implement this)
  - User lookup (you implement this)
  - Rate limiting (you implement this)
  - Input validation (you implement this)
- Still provides:
  - CSRF protection (via CSRF token in session)
  - Session creation and management
  - JWT handling and encryption
  - Cookie security flags (HttpOnly, Secure, SameSite)
  - Integration with callbacks (signIn, jwt, session)

## Step-by-step flow (detailed)
1. **Request**: `POST /api/auth/credential` with JSON: `{ email: "user@example.com", password: "secret" }`
2. **CSRF check**: Auth.js validates CSRF token from cookie/header
3. **Parameter sanitization**: Basic validation (but you should validate further)
4. **Credentials object**: `{ email: "user@example.com", password: "secret" }` passed to `authorize`
5. **Your logic**:
   - Normalize email (lowercase, trim)
   - Validate format (email regex, length limits)
   - Check rate limit by IP/email
   - Lookup user by email in database
   - If not found: return `null` (use same timing as wrong password to prevent enumeration)
   - If found: verify password hash using bcrypt/scrypt/argon2
   - If hash matches: return user object `{ id, email, name, ... }`
   - If hash fails: return `null`
6. **On success**:
   - Auth.js may call (depending on configuration):
     - `signIn` callback: `{ user, account, profile, credentials }`
     - `jwt` callback: `{ token, user, account, trigger, session }`
     - `session` callback: `{ session, token, user }`
   - Session created (database or JWT)
   - Encrypted cookie set: `next-auth.session-token` or similar
   - Redirect to callback URL (default: `/`)
7. **On failure**:
   - Returns 401 Unauthorized
   - Optional: flash error message via `theme.signIn.signInErrorMessage`

## Implementation
### Basic setup
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { getUserByEmail, createUser } from "@/lib/db"

export const { GET, POST } = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await getUserByEmail(credentials.email.toLowerCase().trim())

        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          return null
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (isValid) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            // Add other user properties as needed
          }
        }

        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  // Optional: configure session strategy
  session: {
    strategy: "jwt" // or "database"
  },
  // Optional: configure pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  }
})
```

### With security enhancements
```typescript
// lib/auth.ts
import jwt from "jsonwebtoken"
import { serialize } from "cookie"

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateSessionToken(): string {
  return jwt.sign(
    { random: Math.random().toString(36).substring(2) },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  )
}

export function setAuthCookie(res: Response, token: string) {
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
  res.headers.append("Set-Cookie", cookie)
}
```

### Advanced: Multi-factor authentication
```typescript
// app/api/auth/[...nextauth]/route.ts
import TwoFactorProvider from "next-auth/providers/2fa"

// In providers array:
// ...
//   CredentialsProvider({ ... }),
//   TwoFactorProvider({ ... })
// ...
```

## Folder structure
```
src/
├── app/
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── validators.ts
├── components/
│   ├── LoginForm.tsx
│   └── LoginWithCredentials.tsx
├── types/
│   └── user.ts
└── middleware/
    └── auth.ts
```

## Best practices
**Password handling**:
- Use strong, adaptive hashing (bcrypt/scrypt/argon2) with cost factor ≥ 12
- Never store plaintext passwords or reversible encryption
- Use a pepper (application-secret) in addition to salt for extra security
- Consider using argon2id for resistance to GPU/ASIC cracking
- Hash passwords client-side? No - still hash server-side to prevent client-side leaks

**User lookup**:
- Normalize identifiers (email: lowercase and trim)
- Use case-insensitive lookup for emails
- Consider username availability and reservation systems
- Implement proper indexing on lookup columns (email, username)

**Input validation**:
- Validate email format with robust regex or library
- Enforce reasonable length limits (email: 254 chars, password: 128+ max)
- Implement password strength requirements (length, complexity) if desired
- Sanitize input to prevent injection (though parameterized queries should handle this)
- Consider using Zod or Yup for schema validation

**Rate limiting**:
- Implement per-IP and per-account rate limiting
- Use exponential backoff or lockout after failed attempts
- Consider CAPTCHA after N failed attempts
- Log failed attempts for monitoring and alerting
- Reset counters on successful login

**Security**:
- Use constant-time comparison for password hashes (bcrypt.compare is constant-time)
- Return same error message for user not found and invalid password
- Implement account lockout after excessive failed attempts
- Require re-authentication for sensitive operations (password change, etc.)
- Log successful and failed logins for audit trail
- Consider device fingerprinting for step-up authentication
- Implement password breach detection (haveibeenpwned API)

**User experience**:
- Provide "show password" toggle
- Implement password strength meter
- Offer "forgot password" flow
- Allow social login alongside credentials
- Remember me functionality (extend session)
- Clear form on login attempt
- Focus first input field on mount
- Enter key submits form

## Common mistakes
- Storing passwords in plaintext or weak hashes (MD5, SHA1)
- Using client-side hashing only (still need server-side hash)
- Logging passwords or sensitive data to console/files
- Returning different error messages for user not found vs wrong password
- Not implementing rate limiting (allows brute force attacks)
- Forgetting to trim/lowercase email before lookup
- Using inconsistent user identifier formats (sometimes email, sometimes username)
- Not updating last login timestamp or IP address
- Forgetting to invalidate existing sessions on password change
- Using low work factor for bcrypt (e.g., cost=4)
- Not setting appropriate password length limits (DoS via huge payloads)
- Missing CSRF protection (though Auth.js provides this by default)
- Not handling password reset flow securely
- Storing session tokens in localStorage (XSS risk) - Auth.js uses HttpOnly cookies
- Forgetting to update dependencies (bcrypt, etc.) for security patches

## Security considerations
**Transport security**:
- Always use HTTPS in production (enforce with HSTS)
- Set Secure flag on session cookies
- Consider using `__Host-` cookie prefix for extra security
- Implement Content Security Policy to mitigate XSS

**Storage security**:
- Use strong, unique salts per password
- Consider using a pepper (application secret) in addition to salt
- Store hashes in dedicated column, not mixed with other user data
- Regularly rotate pepper if used (requires re-hashing on login)
- Monitor database for unauthorized access

**Authentication security**:
- Implement account enumeration prevention (same response timing)
- Use random delays to thwart timing attacks (if needed)
- Consider login anomalies detection (impossible travel, new device)
- Implement geolocation-based restrictions if appropriate
- Require email verification before allowing login
- Implement password expiration policy if required by compliance
- Provide login history and active sessions page for users
- Allow users to log out of all sessions

**Operational security**:
- Use secrets management for database credentials
- Implement database connection pooling with timeouts
- Use prepared statements/ORM to prevent SQL injection
- Regularly audit authentication logs for suspicious patterns
- Have incident response plan for credential compromise
- Conduct regular penetration tests on authentication flow

## Performance notes
**Hashing cost**:
- Balance security vs performance (bcrypt cost 10-12 typical)
- Consider asynchronous hashing to avoid blocking event loop
- Use worker threads for expensive operations in high-traffic apps
- Cache frequent lookups (beware of stale data after password change)
- Consider using Redis for session store to reduce DB load
- Implement connection pooling for database queries
- Use read replicas for user lookups if read-heavy
- Monitor authentication latency and set SLAs

**Database optimization**:
- Index email/username columns for O(log n) lookup
- Consider covering indexes for frequent queries
- Partition large user tables by date or hash if needed
- Archive inactive users to improve performance
- Use read-after-write consistency where required
- Implement caching for static user data (roles, permissions)

## Interview questions
1. How do you prevent user enumeration with the Credentials provider?
2. What password hashing algorithm would you recommend and why?
3. How would you implement rate limiting for login attempts?
4. What security measures should you implement for password reset?
5. How do you handle "remember me" functionality securely?
6. Where does password hashing belong in the authentication flow?
7. How do you test the Credentials provider without a real database?
8. What's the difference between `authorize` returning `null` vs throwing an error?
9. How would you implement multi-factor authentication with Credentials provider?
10. What headers does the Credentials provider expect in the request?

## MCQs
1. Which HTTP method does the Credentials provider use?
   a) GET
   b) POST
   c) PUT
   d) PATCH
   Answer: b

2. What should the `authorize` function return on successful authentication?
   a) A JWT token
   b) A boolean true
   c) A user object (any shape)
   d) A session object
   Answer: c

3. How do you prevent timing attacks during password comparison?
   a) Use a timing-safe comparison function
   b) Add random delays
   c) Use HTTPS only
   d) Hash the password twice
   Answer: a (bcrypt.compare is timing-safe)

4. Which of the following is NOT a responsibility of the Credentials provider?
   a) Password hashing
   b) Session creation
   c) CSRF protection
   d) Cookie settings
   Answer: a

5. What is the default endpoint for the Credentials provider?
   a) /api/auth/login
   b) /api/auth/credentials
   c) /api/auth/signin
   d) /api/auth/credential
   Answer: d

## Practice exercise
Create a secure login form with:
1. Email and password inputs with validation
2. "Show password" toggle
3. Password strength indicator
4. "Remember me" checkbox
5. Forgot password link
6. Loading and error states
7. Submit handler calling credentials provider
8. Redirect on success
9. Clear form after attempt
10. Accessibility labels and keyboard navigation

## Debugging exercise
"CredentialsSignin" error with message "CallbackUrl is invalid".
Check:
1. NextAuth.js version (older versions had this bug)
2. Callback URL configured correctly in provider options
3. NEXTAUTH_URL set correctly in environment variables
4. Not trying to sign in to an external URL without permission
5. Not using relative URLs that don't resolve correctly
6. Pages directory structure matching
7. Not mixing pages and app router incorrectly
8. Clearing cookies after auth configuration changes
9. Using correct provider ID in signIn() call
10. Checking server logs for more detailed error message

## Real-world scenario
Enterprise single sign-on replacement:
- Migrate from legacy LDAP to Azure AD
- Keep existing SQL Server user tables for application data
- Use Credentials provider for fallback/admin access
- Implement just-in-time user provisioning from Azure AD
- Enforce hardware YubiKey for privileged roles
- Separate credential storage for break-glass accounts
- Audit all authentication attempts to SIEM

## Mini project
Build a password strength analyzer that:
- Estimates crack time based on hardware assumptions
- Checks against common password lists (rockyou, etc.)
- Evaluates entropy based on character sets
- Provides feedback on length, variety, patterns
- Suggests improvements to increase strength
- Integrates with signup/form validation
- Works client-side for instant feedback
- Has optional server-side verification for consistency