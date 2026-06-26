---
title: "HTTP Caching"
description: "HTTP caching stores copies of responses to serve them faster — Cache-Control, ETag, If-Modified-Since, and validation strategies."
sidebar:
  order: 6
---

## HTTP Caching

### 🤔 What is HTTP Caching?

HTTP caching stores a copy of a server response so future requests can be served faster — without hitting the server again.

Think of it like **storing leftovers in the fridge**:
- First time: Cook a meal (fetch from server) — takes time
- Subsequent times: Reheat leftovers (serve from cache) — instant

```mermaid
flowchart TB
    subgraph NoCache[Without Cache]
        NC1[Browser] -->|"Request 1: GET /style.css"| NC2[Server]
        NC2 -->|"Response: style.css (200)"| NC1
        NC1 -->|"Request 2: GET /style.css"| NC2
        NC2 -->|"Response: style.css (200)"| NC1
        NC3["2 requests = 2 round trips"]
    end
    
    subgraph WithCache[With Cache]
        WC1[Browser] -->|"Request 1: GET /style.css"| WC2[Cache]
        WC2 -->|"Cache miss → fetch"| WC3[Server]
        WC3 -->|"Response + Cache-Control"| WC2
        WC2 -->|"Response ✅"| WC1
        WC4["Cache saves style.css"]
        WC1 -->|"Request 2: GET /style.css"| WC5[Cache]
        WC5 -->|"Cache hit! 🎉 Instant!"| WC1
        WC6["0 round trips to server"]
    end
    
    style NoCache fill:#ef4444,color:#fff
    style WithCache fill:#10b981,color:#fff
```

---

### ⏱️ Cache-Control Directives

The `Cache-Control` header is the primary way to control caching:

```http
# Fresh for 1 hour (max-age in seconds)
Cache-Control: public, max-age=3600

# Never cache (always go to server)
Cache-Control: no-cache, no-store, must-revalidate

# Cache but check with server before using
Cache-Control: no-cache

# Cache for 1 year - for versioned static files
Cache-Control: public, max-age=31536000, immutable

# Private - only cache in browser (not CDN/proxy)
Cache-Control: private, max-age=3600
```

| Directive | Meaning |
|-----------|---------|
| `public` | Anyone can cache (browser, CDN, proxies) |
| `private` | Only the browser can cache |
| `no-cache` | Must check with server every time before using cache |
| `no-store` | Never store a copy at all |
| `max-age=N` | Response is fresh for N seconds |
| `immutable` | The content will never change (for versioned files) |
| `must-revalidate` | Must obey freshness info, no stale responses |

---

### ✅ Validation (ETag & If-Modified-Since)

When a cached resource expires, the browser can **validate** if it changed — without re-downloading the whole thing.

```mermaid
sequenceDiagram
    participant Browser as Browser
    participant Cache as Local Cache
    participant Server as Server
    
    Note over Browser,Server: First Request
    Browser->>Server: GET /style.css
    Server-->>Browser: 200 OK<br/>ETag: "abc123"<br/>Last-Modified: Mon, 10 Jan 2025<br/>Cache-Control: max-age=3600
    Browser->>Cache: Store: style.css (fresh for 1 hour)
    
    Note over Browser,Server: 1 Hour Later - Cache Expired
    Browser->>Cache: Is style.css still valid?
    Cache-->>Browser: Expired! Validate with server.
    
    Browser->>Server: GET /style.css<br/>If-None-Match: "abc123"<br/>If-Modified-Since: Mon, 10 Jan 2025
    Server-->>Browser: 304 Not Modified<br/>(No body - empty response!)
    Browser->>Cache: style.css is still fresh, extend expiry
    
    Note over Browser: Uses the cached copy ✅
```

**Validation headers:**

| Request Header | Server checks | Response |
|---------------|---------------|----------|
| `If-None-Match: "abc123"` | Does the ETag match? | 304 (not changed) or 200 (new content) |
| `If-Modified-Since: date` | Has the file changed since this date? | 304 (not changed) or 200 (new content) |

> **Result:** A 304 response has **no body** — just headers. This saves bandwidth!

---

### 🧪 Cache Strategy Decision Flow

```mermaid
flowchart TB
    Start[What type of content?] --> Static
    Start --> API
    Start --> Auth
    
    Static[Static file?<br/>CSS, JS, images, fonts] --> StaticY[✅ Yes]
    StaticY --> CacheAggressively["Cache-Control:<br/>public, max-age=31536000, immutable<br/>Cache for 1 year"]
    
    API[API response?] --> APIQ[Changes often?]
    APIQ -->|Yes - live data| APILow["Cache-Control:<br/>no-cache or max-age=10<br/>Revalidate often"]
    APIQ -->|No - reference data| APIHigh["Cache-Control:<br/>public, max-age=3600<br/>Cache for 1 hour"]
    
    Auth[Authentication data?<br/>Tokens, cookies] --> AuthN["Cache-Control:<br/>no-store<br/>NEVER cache"]
    
    style Static fill:#10b981,color:#fff
    style API fill:#3b82f6,color:#fff
    style Auth fill:#ef4444,color:#fff
    style CacheAggressively fill:#10b981,color:#fff
    style APILow fill:#f59e0b,color:#fff
    style APIHigh fill:#059669,color:#fff
    style AuthN fill:#ef4444,color:#fff
```

**Recommended strategy by content type:**
| Content | Cache-Control | Why |
|---------|--------------|-----|
| Versioned CSS/JS | `max-age=31536000, immutable` | Never changes (filename changes on update) |
| Images | `max-age=86400` (1 day) | Seldom changes |
| API (reference) | `max-age=60` (1 min) | Fresh enough, reduces server load |
| API (live) | `no-cache` + ETag | Always fresh, ETag saves bandwidth |
| Auth/Personal | `no-store` | Never cache sensitive data |

---

### In Simple Words

- **Caching** stores server responses so future requests are faster
- **Cache-Control: max-age=N** sets how long the cache is fresh
- **ETag** / **If-Modified-Since** let the browser ask "Has this changed?" without re-downloading
- A **304 Not Modified** response means "Use your cached copy" — no body, fast!
- **Static files** (CSS, JS, images) should be cached aggressively; **auth data** should never be cached
