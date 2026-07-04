# 02 — Auth.js (NextAuth.js)

## Introduction
Auth.js (formerly NextAuth.js) is a complete open-source authentication solution for Next.js applications. It provides a flexible, secure, and easy-to-use authentication system that supports various providers (OAuth, email, credentials) and adapters (databases).

## Why we need Auth.js
Building authentication from scratch is complex and error-prone. Auth.js handles the intricate details of session management, token handling, CSRF protection, and provider integrations, allowing developers to focus on building features rather than reinventing authentication.

## Learning objectives
- Understand how Auth.js integrates with Next.js
- Configure authentication providers (Credentials, Google, GitHub, etc.)
- Set up database adapters (Prisma, MongoDB, etc.)
- Customize callbacks, session, and JWT behavior
- Implement production-ready authentication with security best practices

## Prerequisites
- Basic understanding of Next.js App Router
- Familiarity with React and TypeScript/JavaScript
- Knowledge of OAuth 2.0 and OpenID Connect concepts
- Node.js >=18 installed

## Topics covered
1. Introduction to Auth.js
2. Installation and setup
3. Configuring providers
4. Credentials provider (email/password)
5. OAuth providers (Google, GitHub)
6. Session management
7. Callbacks and events
8. Adapters (database integration)
9. Production setup and deployment

## Authentication roadmap with Auth.js
```
Setup → Providers → Callbacks → Adapter → Customization → Production
```

## Real-world applications
- SaaS applications with multi-tenancy
- E-commerce platforms with user accounts
- Content management systems with role-based access
- Internal tools requiring SSO via SAML or LDAP
- Mobile backends using JWT API routes

## Estimated learning time
8-12 hours including hands-on exercises

## Practice exercises
- Set up Auth.js with Credentials provider
- Add Google and GitHub OAuth providers
- Connect to PostgreSQL using Prisma adapter
- Customize session and JWT callbacks
- Implement role-based access control
- Deploy to Vercel with environment variables

## Mini project
Build a full-stack blog platform with:
- User authentication (email/password + social login)
- Role-based access (admin, editor, viewer)
- Protected API routes for creating/editing posts
- User profile management
- Email verification (using Email provider)
- Password reset functionality

## Related modules
- 03-login-registration: Building custom auth flows
- 04-authorization: Role-based and permission-based access
- 05-security: Advanced security practices (CSRF, XSS, etc.)
- 06-third-party-auth: Alternative auth providers (Clerk, Supabase, Firebase)
- 07-production-auth: Scaling, monitoring, and enterprise patterns