# Protecting Routes

## Introduction

Protecting routes ensures only authenticated users can access certain pages and API endpoints. Next.js provides multiple layers for this: middleware, server-side session checks, and API route guards.

## Why This Matters

Route protection is how you control access to sensitive data and functionality. Without it, anyone who knows a URL can access protected content.

## Topics Covered

1. Middleware — Edge-level route protection
2. Protected Pages — Server-side checks with `getServerSession`
3. Protected API Routes — Authenticating Route Handler requests
4. Role-Based Access — Controllng access by user role

## Learning Outcomes

- Protect routes with middleware
- Check authentication in Server Components
- Secure API Route Handlers
- Implement role-based access control

## Related Topics

- [Auth.js Module](../authjs/)
- [Authentication Basics](../authentication/)
