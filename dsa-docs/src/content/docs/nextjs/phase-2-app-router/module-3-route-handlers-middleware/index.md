---
title: "Module 3: Route Handlers & Middleware"
description: "- API endpoints to serve data to client components, mobile apps, or third-party services - Authentication checks that run before protected pages load - Req"
---

# Module 3: Route Handlers & Middleware

## Introduction
Route Handlers and Middleware are the server-side pillars of the App Router. Route Handlers allow you to create custom API endpoints within your `app/` directory using the `route.ts` file convention. Middleware runs at the Edge before a request is processed, enabling authentication checks, redirects, URL rewrites, and more. Together, they give you full control over the server-side behavior of your application.

## Why do we need this?
Modern full-stack applications need more than just page rendering. You need:

- **API endpoints** to serve data to client components, mobile apps, or third-party services
- **Authentication checks** that run before protected pages load
- **Request modification** (redirects, rewrites, headers) at the edge
- **Dynamic API behavior** based on route parameters and HTTP methods
- **Geolocation and A/B testing** based on request metadata

Route Handlers and Middleware provide these capabilities within the App Router architecture.

## Learning objectives
By the end of this module, you will be able to:
- Create Route Handlers using the `route.ts` file convention
- Handle different HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Access dynamic route parameters in API routes
- Implement middleware for authentication and redirects
- Configure middleware matching for specific routes
- Use middleware for A/B testing, geolocation, and request modification

## Prerequisites
- Completed Module 1 and Module 2 of Phase 2
- Understanding of HTTP methods and REST API concepts
- Basic knowledge of request/response patterns
- Familiarity with dynamic routes

## Learning roadmap
1. What are Route Handlers?
2. HTTP Methods & Dynamic Routes in Route Handlers
3. Middleware Basics
4. Advanced Middleware Patterns

## Topics covered
- Route Handler file convention (`route.ts`)
- Supported HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
- Request body parsing (JSON, FormData)
- Response patterns (JSON, redirect, streaming)
- Dynamic route parameters in Route Handlers
- Middleware file location and structure
- Middleware matcher configuration
- Authentication checks in middleware
- Redirect and rewrite patterns
- Geolocation, cookies, and headers in middleware
- Edge runtime considerations

## Estimated learning time
12-15 hours to complete all topics and exercises.

## Real-world applications
- Building a REST API for client components
- Creating webhook endpoints for third-party services
- Implementing authentication guards at the edge
- Setting up internationalization redirects
- Running A/B tests with middleware-based routing
- Building rate-limiting and bot protection

## Practice exercises
- Build a CRUD API for a resource (e.g., todos, products)
- Implement auth middleware for protected routes
- Create a geolocation-based redirect system
- Build a webhook handler with signature verification

## Mini Projects
- **REST API Backend**: Build a complete REST API with CRUD operations, validation, and error handling
- **Auth System**: Implement middleware-based authentication with route protection and redirects

## Related Topics
- Data Fetching (Phase 3)
- Authentication (Phase 5)
- Server Actions (Phase 4)
- Edge Runtime
