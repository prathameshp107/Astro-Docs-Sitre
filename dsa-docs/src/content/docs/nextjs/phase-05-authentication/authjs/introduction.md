---
title: "Introduction to Auth.js"
description: "Auth.js (formerly NextAuth.js) is the most popular authentication library for Next.js. It handles sessions, providers (Google, GitHub, email, credentials),"
---

# Introduction to Auth.js

## Introduction

Auth.js (formerly NextAuth.js) is the most popular authentication library for Next.js. It handles sessions, providers (Google, GitHub, email, credentials), CSRF protection, and database adapters — so you don't have to build authentication from scratch.

## Why Do We Need This?

Building authentication yourself is complex and error-prone. You need to handle:

- Password hashing and verification
- Session management (JWT or database)
- OAuth flows (Google, GitHub)
- CSRF protection
- Secure cookie management

Auth.js handles all of this with a simple configuration.

## What Auth.js Provides

| Feature | Description |
|---------|-------------|
| Multiple providers | Google, GitHub, credentials, email, and 80+ more |
| Session strategies | JWT (stateless) or database (stateful) sessions |
| Built-in security | CSRF tokens, secure cookies, HTTPS enforcement |
| Database adapters | Prisma, Drizzle, MongoDB, and more |
| TypeScript support | Fully typed session and JWT callbacks |

## Related Topics

- [Installation](./installation.md)
- [Providers](./providers.md)
- [Session Management](./session-management.md)
