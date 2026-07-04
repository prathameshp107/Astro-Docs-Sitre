# Data Fetching with Route Handlers

## Introduction
While Server Components can fetch data directly, Route Handlers (`route.ts`) serve as API endpoints for Client Components, mobile apps, and third-party services. They provide a standard REST interface for data access.

## Why do we need this?
Server Components fetch data directly at render time. But Client Components, mobile apps, and external services need API endpoints. Route Handlers fill this gap — they're the bridge between client-side code and server-side data.

## When to Use Route Handlers vs Direct Fetching

| Scenario | Approach | Why |
|----------|----------|-----|
| Server Component needs data | Direct fetch in component | Simplest, cached automatically |
| Client Component needs data | Route Handler + fetch | Client can't fetch DB directly |
| Mobile app needs data | Route Handler | External access via REST |
| Webhook endpoints | Route Handler | POST endpoint for external services |
| Form submission (simple) | Server Action | Less boilerplate |
| Form submission (complex) | Route Handler | More control, custom logic |

## Basic Route Handler

```tsx
// app/api/products/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await db.product.findMany()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const product = await db.product.create({ data: body })
  return NextResponse.json(product, { status: 201 })
}
```

## Consuming from Client Component

```tsx
'use client'
import { useEffect, useState } from 'react'

export function ProductList() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
  }, [])
  
  return <div>{products.length} products</div>
}
```

## Dynamic Route Handlers

```tsx
// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id: params.id }
  })
  
  if (!product) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(product)
}
```

## Caching Route Handlers

```tsx
// GET requests are cached by default
// Opt out with:
export const dynamic = 'force-dynamic'

// Or configure per fetch:
export async function GET() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'  // Never cache this Route Handler
  })
  return NextResponse.json(await data.json())
}
```

## Common Mistakes
- **Not parsing request body** — For POST/PUT, always `await request.json()`
- **Missing error handling** — Wrap in try/catch and return proper status codes
- **Exposing sensitive data** — Route Handlers return data to clients; filter responses
- **Not handling OPTIONS** — CORS preflight fails without an OPTIONS handler

## Best Practices
1. **Use Route Handlers for external APIs** — Mobile apps, webhooks, third-party services
2. **Prefer Server Actions for form mutations** — Less boilerplate, automatic revalidation
3. **Prefetch Route Handlers** — Use `<Link prefetch={true}>` to preload API data
4. **Validate input** — Use Zod or similar for request validation
5. **Return proper status codes** — 200, 201, 400, 404, 500

## Summary
Route Handlers provide API endpoints for client-side and external data access. Use them when direct Server Component fetching isn't possible (Client Components, mobile apps, webhooks). For form mutations, prefer Server Actions.

## Related Topics
- [Server Actions (Module 5)](../module-5-server-actions/)
- [Client-side Data Fetching](./topic-4-client-side-data-fetching-patterns.md)
- [Route Handlers (Phase 2)](../../phase-2-app-router/module-3-route-handlers-middleware/)
