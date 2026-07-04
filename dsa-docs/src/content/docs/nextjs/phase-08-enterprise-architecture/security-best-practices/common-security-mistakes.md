# Common Security Mistakes

## Introduction

This topic covers the most common security mistakes in Next.js applications. Avoiding these will prevent the majority of security issues.

## Top Mistakes

### 1. Storing Secrets in Client Code

```tsx
// ❌ WRONG — visible in browser
const API_KEY = 'sk_live_abc123'
fetch(`/api/data?key=${API_KEY}`)

// ✅ CORRECT — server-side only
// app/api/proxy/route.ts
export async function GET() {
  const data = await fetch('https://api.example.com/data', {
    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
  })
}
```

### 2. Trusting User Input Without Validation

```tsx
// ❌ WRONG — vulnerable to injection
app.get('/users', (req, res) => {
  db.query(`SELECT * FROM users WHERE id = ${req.params.id}`)
})

// ✅ CORRECT — parameterized query
db.user.findUnique({ where: { id: req.params.id } })
```

### 3. No Rate Limiting on Auth Endpoints

Without rate limiting, attackers can brute force passwords or abuse API endpoints. Always rate limit login, registration, and public API routes.

### 4. Returning Detailed Error Messages

```ts
// ❌ WRONG — gives away information
return { error: 'User with email test@example.com not found' }
return { error: 'Wrong password for email test@example.com' }

// ✅ CORRECT — generic message
return { error: 'Invalid email or password' }
```

### 5. Missing Security Headers

```ts
// middleware.ts
export function middleware() {
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000')
  
  return response
}
```

### 6. CORS Misconfiguration

```ts
// ❌ WRONG — allows any origin
Access-Control-Allow-Origin: *

// ✅ CORRECT — restrict to your domain
Access-Control-Allow-Origin: https://yourdomain.com
```

### 7. Exposing Stack Traces

```ts
// ❌ WRONG — exposes internal details in production
return NextResponse.json({ error: err.stack }, { status: 500 })

// ✅ CORRECT — log internally, return generic message
console.error('API Error:', err)
return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
```

## Security Checklist

- [ ] No secrets in client code or Git history
- [ ] All user input is validated with Zod
- [ ] Rate limiting is configured on auth endpoints
- [ ] Error messages are generic
- [ ] Security headers are set
- [ ] CORS is restricted to known origins
- [ ] Stack traces are never exposed to clients

## Summary

Most security issues come from a handful of common mistakes — trusting user input, exposing secrets, missing rate limiting, and returning detailed errors. Follow the checklist to avoid the most critical vulnerabilities.

## Related Topics

- [API Security](./api-security.md)
- [Authentication Best Practices](./authentication-best-practices.md)
- [Authorization Best Practices](./authorization-best-practices.md)
