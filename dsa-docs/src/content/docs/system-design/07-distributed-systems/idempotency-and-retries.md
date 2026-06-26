---
title: "Idempotency & Retries"
description: "Designing operations so they can be safely retried without causing duplicates or corruption."
sidebar:
  order: 3
---

# Idempotency & Retries

> An operation is **idempotent** if performing it multiple times has the same effect as doing it once. This is critical when network failures cause retries.

**Analogy — Hotel checkout:**
- Charging your card once = correct
- Charging your card 5 times because the clerk clicked "Process" multiple times = disaster
- Idempotency prevents the second scenario

---

## Idempotent vs Non-Idempotent Operations

| Operation | Idempotent? | Why |
|-----------|:-----------:|-----|
| `GET /users/123` | ✅ Yes | Reading is always safe |
| `PUT /users/123` (full update) | ✅ Yes | Same input → same result |
| `DELETE /users/123` | ✅ Yes | Delete once = delete twice (same result) |
| `POST /orders` (create) | ❌ No | Each call creates a new order |

---

## Making POST Operations Idempotent

Use an **idempotency key** — a unique identifier the client generates once and sends with each retry.

```javascript
// Client sends
POST /api/charges
{
  "idempotency_key": "abc-123-def-456",
  "amount": 1000,
  "currency": "usd"
}

// Server logic
function handleCharge(req) {
  // Check if this key was already processed
  const existing = cache.get(req.idempotency_key);
  if (existing) return existing; // Return same result, don't charge again

  const result = paymentGateway.charge(req.amount);
  cache.set(req.idempotency_key, result, { ttl: 86400 });
  return result;
}
```

---

## Retry Strategies

| Strategy | How It Works | Best For |
|----------|-------------|----------|
| **Immediate retry** | Try again right away | Transient errors (connection timeout) |
| **Fixed backoff** | Wait N seconds between retries | Simple, predictable |
| **Exponential backoff** | Wait N, 2N, 4N, 8N... | Network throttling, rate limits |
| **Jitter** | Add randomness to backoff | Avoid thundering herd (all clients retry simultaneously) |

---

## Safety Rules for Retries

1. **Always use idempotency keys** for mutating operations (POST, PATCH)
2. **Set a max retry limit** (3-5 retries, then give up)
3. **Exponential backoff + jitter** prevents self-inflicted DDoS
4. **Log every retry** for debugging
5. **Graceful degradation** — if retries fail, queue the request for manual processing

---

## Trade-offs

- Storing idempotency keys consumes memory (set a TTL to auto-clean).
- Too many retries can overload an already-struggling service.
- No retry at all means failed requests for users.

---

## In Simple Words

- Idempotency = doing the same thing twice gives the same result as doing it once.
- Use an idempotency key (unique per request) to safely retry failed operations.
- Retry with exponential backoff + jitter — don't hammer the server.
