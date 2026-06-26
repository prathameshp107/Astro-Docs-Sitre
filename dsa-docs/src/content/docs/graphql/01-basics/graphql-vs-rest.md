---
title: "GraphQL vs REST"
description: "A side-by-side comparison of GraphQL and REST APIs with diagrams and use cases."
sidebar:
  order: 2
---

## GraphQL vs REST

Both GraphQL and REST are ways to build APIs. REST has been the standard for decades. GraphQL is a newer alternative that solves specific REST pain points.

> **Analogy:** REST is like ordering from a menu where each item comes as a fixed platter. GraphQL is like a build-your-own-bowl restaurant where you pick exactly the ingredients you want.

---

### Architecture: Many Endpoints vs One Endpoint

```mermaid
flowchart TB
    subgraph REST["REST Architecture"]
        C1[Client] --> E1[/api/users]
        C1 --> E2[/api/users/1]
        C1 --> E3[/api/users/1/posts]
        C1 --> E4[/api/posts/5/comments]
    end

    subgraph GraphQL["GraphQL Architecture"]
        C2[Client] -->|"POST /graphql"| Single[Single Endpoint]
        Single --> Q1["{ user(id:1) { name posts { title } } }"]
        Single --> Q2["{ post(id:5) { title comments { text } } }"]
    end

    style C1 fill:#ef4444,color:#fff
    style C2 fill:#7c3aed,color:#fff
    style Single fill:#7c3aed,color:#fff
    style E1 fill:#fca5a5,color:#333
    style E2 fill:#fca5a5,color:#333
    style E3 fill:#fca5a5,color:#333
    style E4 fill:#fca5a5,color:#333
```

---

### Over-fetching & Under-fetching

**Over-fetching** — Getting more data than you need.
**Under-fetching** — Not getting enough data in one request.

```mermaid
flowchart LR
    subgraph REST_Problems["REST Problems"]
        OF[Over-fetching<br/>Server sends ALL fields] --> Waste[Bandwidth wasted<br/>Extra payload size]
        UF[Under-fetching<br/>Need related data] --> Multi[Multiple requests<br/>N+1 problem]
    end

    subgraph GQL_Solution["GraphQL Solution"]
        Ask[Client asks for<br/>exact fields] --> One[One request<br/>Nested in one go]
        One --> Exact[Response matches<br/>request shape exactly]
    end

    style OF fill:#ef4444,color:#fff
    style UF fill:#f59e0b,color:#fff
    style Ask fill:#059669,color:#fff
    style One fill:#7c3aed,color:#fff
    style Exact fill:#10b981,color:#fff
```

**Example — A dashboard showing user names and post counts:**

```javascript
// REST: GET /api/users — returns ALL user fields (over-fetching)
// Then for each user: GET /api/users/:id/posts (under-fetching, N requests)
[
  { "id": 1, "name": "Alice", "email": "alice@...", "age": 30, "city": "NYC",
    "phone": "...", "avatar": "...", "createdAt": "..." },
  // ... 100 users — each with 10+ fields we don't need
]

// GraphQL: one query, exactly the fields we want
query {
  users {
    name
    postsCount  // computed field, no extra request
  }
}
// Response: [{ "name": "Alice", "postsCount": 5 }, ...]
```

---

### Side-by-Side Comparison

| Aspect | REST | GraphQL |
|--------|------|---------|
| **Endpoint** | Multiple (`/users`, `/users/1/posts`) | Single (`/graphql`) |
| **Data fetching** | Server decides the response shape | Client decides the response shape |
| **Over-fetching** | Common — server sends everything | Never — only requested fields |
| **Under-fetching** | Common — need multiple round-trips | Rare — nested queries in one request |
| **HTTP methods** | GET, POST, PUT, PATCH, DELETE | POST only (queries and mutations) |
| **Caching** | Built-in HTTP caching (GET) | Requires custom caching layer |
| **Versioning** | `/v1/`, `/v2/` or headers | No versioning — evolve schema |
| **Documentation** | Swagger / OpenAPI | Introspection — self-documenting |
| **Tooling** | Postman, curl | GraphiQL, Apollo Studio, GraphQL Playground |
| **File uploads** | Built-in (multipart) | Requires extra setup |
| **Learning curve** | Low | Medium |
| **Performance** | Simple caching, predictable | Complex queries can be expensive |

---

### Request Flow: REST vs GraphQL

```mermaid
sequenceDiagram
    participant C as Client
    participant R as REST API
    participant G as GraphQL API
    participant DB as Database/Data Source

    Note over C,DB: REST — Multiple Round-Trips
    C->>R: GET /api/users
    R->>DB: SELECT * FROM users
    DB-->>R: All users (20 fields each)
    R-->>C: [user1, user2, ...]
    
    C->>R: GET /api/users/1/posts
    R->>DB: SELECT * FROM posts WHERE user_id = 1
    DB-->>R: [post1, post2, ...]
    R-->>C: [post1, post2, ...]

    Note over C,DB: GraphQL — One Request
    C->>G: POST /graphql { query: "{ user(id:1) { name posts { title } } }" }
    G->>DB: Query user + posts (optimized)
    DB-->>G: Data
    G-->>C: { user: { name: "Alice", posts: [{ title: "..." }] } }
```

---

### When to Use Which

| Use GraphQL when... | Use REST when... |
|--------------------|-----------------|
| Multiple client types (web, mobile, IoT) | Single client type |
| Complex data relationships | Simple CRUD operations |
| Rapid iteration (avoid versioning) | Stable, well-known API |
| Client needs flexible data shapes | Fixed responses are fine |
| Real-time features (subscriptions) | Traditional request-response |
| Microservice aggregation layer | Internal service-to-service |

---

### In Simple Words

- REST uses **many endpoints**; GraphQL uses **one endpoint**
- REST can **over-fetch** (too much data) or **under-fetch** (too little data)
- GraphQL lets the client **ask for exactly what it needs**
- REST has **built-in HTTP caching**; GraphQL needs a custom cache
- GraphQL is **great for complex UIs**; REST is **simpler for basic APIs**
- Both can coexist — you can wrap REST APIs with a GraphQL layer
