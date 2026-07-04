---
title: "Review, Practice & Interview Prep"
description: "Phase 5 covered authentication and authorization in Next.js:"
---

# Review, Practice & Interview Prep

## Phase Summary

Phase 5 covered authentication and authorization in Next.js:

**Authentication Basics**: What authentication is, how it differs from authorization, session vs JWT comparison, cookie security, and the end-to-end authentication flow.

**Auth.js**: Installation, configuration, providers (OAuth, credentials, email), JWT vs database sessions, and a complete working example.

**Protecting Routes**: Middleware for edge-level protection, server-side session checks, API route security, and role-based access control.

**Social Login**: Google OAuth, GitHub OAuth, and custom OAuth provider configuration.

## Practice Tasks

### Authentication Flow
1. Implement a login endpoint that validates credentials, creates a session, and sets a secure cookie
2. Add rate limiting to the login endpoint (5 attempts per minute)
3. Implement a logout that clears the session from both the server and client

### Auth.js
1. Set up Auth.js with Google and GitHub providers
2. Add a credentials provider for email/password login
3. Extend the session to include the user's role
4. Protect a dashboard page with `getServerSession()`

### Route Protection
1. Create middleware that redirects unauthenticated users to login
2. Build an admin-only API route that returns 403 for non-admins
3. Create a permissions system with `hasPermission()` checks

### Social Login
1. Set up Google OAuth from the Google Cloud Console
2. Set up GitHub OAuth from GitHub Developer Settings
3. Add both providers to a single login page

## Common Interview Questions

**Q: What's the difference between authentication and authorization?**
A: Authentication verifies who you are (identity). Authorization determines what you can do (permissions). Authentication comes first — you must know who the user is before you can check their permissions.

**Q: Sessions vs JWT — which should you use?**
A: Sessions are easier to revoke but require server-side storage. JWTs are stateless and scale better but can't be invalidated before expiry. Use sessions for simple apps, JWTs for APIs or microservices.

**Q: How do you protect a page in Next.js App Router?**
A: Use `getServerSession()` from next-auth in the page or layout component. If the session is null, redirect to the login page. Optionally, combine with middleware for edge-level protection.

**Q: How does Auth.js handle session security?**
A: Auth.js uses HttpOnly, Secure, SameSite cookies. CSRF tokens are generated for every sign-in. JWT tokens are signed with a secret. Database sessions are stored securely and validated on each request.

**Q: What are the key cookie flags for authentication?**
A: `HttpOnly` prevents JavaScript access (XSS protection), `Secure` ensures HTTPS-only transmission, `SameSite=Strict/Lax` prevents CSRF attacks, and `Max-Age` controls session duration.

**Q: How would you implement role-based access control?**
A: Define a permissions map for each role in a central file. Check the user's role in middleware (for URL-level access), pages (for content access), and API routes (for data access). Hide UI elements based on role client-side.

## Related Topics

- [Authentication Module](./authentication/)
- [Auth.js Module](./authjs/)
- [Protecting Routes](./protecting-routes/)
- [Social Login](./social-login/)
- [Phase 6: Performance & SEO](../phase-06-performance-seo/)
