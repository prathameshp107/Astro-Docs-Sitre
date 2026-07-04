# Logging

## Introduction

Logging captures information about what your application is doing. In production, logs help you debug issues, monitor performance, and understand user behavior.

## Why Do We Need This?

When something breaks in production, you need to know what happened. Logs provide the trail of events leading up to the error.

## Console Logging

The simplest logging is `console.log`. In production, these logs are captured by your hosting platform:

```ts
// app/api/users/route.ts
export async function GET() {
  console.log('[API] Fetching users')
  
  try {
    const users = await db.user.findMany()
    console.log(`[API] Found ${users.length} users`)
    return NextResponse.json({ data: users })
  } catch (error) {
    console.error('[API] Failed to fetch users:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

## Structured Logging

Structured logs include metadata for better searching:

```ts
function log(level: string, message: string, context?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context,
  }
  
  if (level === 'error') {
    console.error(JSON.stringify(entry))
  } else {
    console.log(JSON.stringify(entry))
  }
}

// Usage
log('info', 'User created', { userId: '123', email: 'user@example.com' })
log('error', 'Database connection failed', { error: err.message })
```

## Logging in Server Actions

```ts
"use server"

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string
  
  console.log('[Action] createUser called', { email })
  
  try {
    const user = await db.user.create({ data: { email } })
    console.log('[Action] User created', { userId: user.id })
    return { success: true }
  } catch (error) {
    console.error('[Action] Failed to create user', { email, error })
    return { error: 'Failed to create user' }
  }
}
```

## Log Levels

| Level | When to Use | Example |
|-------|-------------|---------|
| `debug` | Development debugging only | `console.debug('Parsed body:', body)` |
| `info` | Normal operations | `console.log('User logged in:', userId)` |
| `warn` | Unexpected but handled | `console.warn('Rate limit hit:', ip)` |
| `error` | Failures that need attention | `console.error('DB connection failed:', err)` |

## Best Practices

- Include relevant context (user ID, request ID) in every log entry
- Use structured logging (JSON) for better searchability
- Never log sensitive data (passwords, tokens, PII)
- Use appropriate log levels for different types of events
- Aggregate logs with a service like Logtail, Datadog, or your platform's log dashboard

## Common Mistakes

- **Logging sensitive data** — Never log passwords, tokens, or personal information
- **Too much logging in hot paths** — Logging every request can be expensive and noisy
- **No context in log messages** — "Error occurred" is useless without knowing where and why
- **Not logging errors properly** — `console.log(err)` instead of `console.error(err.message, err.stack)`

## Summary

Logging is essential for debugging production issues. Use structured logs with context, appropriate log levels, and never log sensitive data. Aggregate logs in a central service for searching and alerting.

## Related Topics

- [Error Monitoring](./error-monitoring.md)
- [Performance Monitoring](./performance-monitoring.md)
- [Analytics](./analytics.md)
