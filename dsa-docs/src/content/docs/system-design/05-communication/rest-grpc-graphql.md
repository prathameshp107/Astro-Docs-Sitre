---
title: "REST vs gRPC vs GraphQL"
description: "Three API paradigms compared — when to use each for service communication."
sidebar:
  order: 2
---

# REST vs gRPC vs GraphQL

> **REST** uses HTTP verbs with resources. **gRPC** uses protobufs and HTTP/2. **GraphQL** lets clients request exactly the data they need.

---

## Quick Comparison

| Aspect | REST | gRPC | GraphQL |
|--------|:----:|:----:|:-------:|
| **Data format** | JSON (usually) | **Protobuf** (binary) | JSON (query) |
| **Transport** | HTTP/1.1 | HTTP/2 | HTTP/1.1 or 2 |
| **Schema** | OpenAPI / Swagger | `.proto` file | SDL (Schema Definition Language) |
| **Client control** | Server decides response shape | Server defines service contract | ✅ Client picks fields |
| **Streaming** | ❌ No | ✅ Bidirectional | Partial (subscriptions) |
| **Human-readable** | ✅ Yes | ❌ Binary | ✅ Yes |
| **Performance** | Good | ⚡ Excellent (binary, multiplexed) | Good (but complex queries) |

---

## REST

**The standard:** `GET /users/123` → returns user data.

```json
GET /users/123
→ { "id": 123, "name": "Alice", "email": "alice@example.com" }
```

**Pros:** Simple, universal, cached easily, human-readable.
**Cons:** Fixed response shape (over-fetching/under-fetching), no type safety.

---

## gRPC

**The high-performer:** Define services in a `.proto` file. Generate clients.

```protobuf
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
}

message GetUserRequest { int64 id = 1; }
message User { int64 id = 1; string name = 2; string email = 3; }
```

**Pros:** Blazing fast (binary protobuf), type-safe, streaming, multi-language.
**Cons:** Not human-readable, harder to debug, no browser support (needs gRPC-web).

---

## GraphQL

**The flex option:** Clients write queries to get exactly what they need.

```graphql
query {
  user(id: 123) {
    name
    email  # Only request the fields you want
  }
}
```

**Pros:** No over-fetching, single endpoint, strong typing, great developer tools.
**Cons:** Complex queries can overload the server, caching is harder, N+1 problem.

---

## When to Use Which

| Scenario | Best Choice |
|----------|-------------|
| **Public API** (external developers) | REST — universal, simple, cached by CDN |
| **Microservice-to-microservice** | gRPC — fast, type-safe, streaming |
| **Complex UIs with varied data needs** | GraphQL — flexible, single endpoint |
| **Mobile apps (low bandwidth)** | gRPC (binary) or GraphQL (select fields) |
| **Simple CRUD** | REST — KISS principle |

---

## Trade-offs

- REST is the safest default. Use it unless you have a specific reason for gRPC or GraphQL.
- gRPC adds performance but requires code generation and protobuf tooling.
- GraphQL gives frontend teams independence but shifts complexity to the backend.
- Many systems use **REST for external APIs + gRPC for internal services**.

---

## In Simple Words

- REST = simple HTTP endpoints. The standard. Start here.
- gRPC = fast binary protocol. Great for internal service-to-service calls.
- GraphQL = clients ask for exactly what they need. Great for complex frontends.
