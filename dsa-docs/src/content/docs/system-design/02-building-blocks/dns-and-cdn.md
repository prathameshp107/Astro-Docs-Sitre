---
title: "DNS & CDN"
description: "How DNS resolves domain names to IPs, and how CDNs serve content fast from edge locations."
sidebar:
  order: 4
---

# DNS & CDN

> **DNS** turns domain names into IP addresses. **CDN** serves static content from servers close to the user.

---

## DNS Resolution

```mermaid
sequenceDiagram
    participant User as 👤 Browser
    participant DNS as 📖 DNS Resolver
    participant Root as 🌐 Root NS
    participant TLD as 🔤 .com NS
    participant Auth as 🏢 example.com NS

    User->>DNS: What's the IP for example.com?
    DNS->>Root: Where's .com?
    Root->>DNS: Ask .com name server
    DNS->>TLD: Where's example.com?
    TLD->>DNS: Ask example.com's name server (e.g., AWS Route 53)
    DNS->>Auth: What's the IP for example.com?
    Auth->>DNS: It's 192.0.2.1
    DNS->>User: It's 192.0.2.1
    User->>Auth: HTTP GET /
```

**Key record types:**
- **A** — maps domain → IPv4 address
- **AAAA** — maps domain → IPv6 address
- **CNAME** — maps domain → another domain (alias)
- **MX** — mail server records

---

## CDN (Content Delivery Network)

A CDN caches static files (images, CSS, JS, videos) at **edge servers** around the world.

```mermaid
flowchart LR
    User1["🇺🇸 User NY"] --> Edge1["CDN Edge<br/>🇺🇸 US East"]
    User2["🇩🇪 User Berlin"] --> Edge2["CDN Edge<br/>🇪🇺 EU Central"]
    User3["🇦🇺 User Sydney"] --> Edge3["CDN Edge<br/>🇦🇺 Australia"]
    Edge1 --> Origin["Origin Server"]
    Edge2 --> Origin
    Edge3 --> Origin

    style User1 fill:#7c3aed,color:#fff
    style User2 fill:#4f46e5,color:#fff
    style User3 fill:#6366f1,color:#fff
    style Edge1 fill:#059669,color:#fff
    style Edge2 fill:#059669,color:#fff
    style Edge3 fill:#059669,color:#fff
    style Origin fill:#dc2626,color:#fff
```

**How a CDN serves a request:**
1. User in Australia requests an image
2. DNS resolves to the **nearest** CDN edge (Australia, not US)
3. If the edge has the image cached → serves instantly (cache hit)
4. If not → edge fetches from origin, caches it, serves it (cache miss)

---

## Why CDNs Matter

| Metric | Without CDN | With CDN |
|--------|:-----------:|:--------:|
| Latency (AU → US) | ~150-200 ms | ~10-20 ms |
| Origin server load | High (all requests hit origin) | Low (only cache misses) |
| Bandwidth costs | High (full bandwidth on origin) | Lower (CDN absorbs traffic) |
| DDoS protection | ❌ | ✅ Many CDNs absorb attacks |

---

## Trade-offs

- CDNs serve **cached** content — not suitable for dynamic personalized data.
- Cache invalidation is hard (users might see stale content).
- CDN cost depends on bandwidth — can be significant for large files.

---

## In Simple Words

- DNS = the phonebook of the internet. It tells your browser where to find a website.
- CDN = copies of your files stored in many locations around the world.
- DNS + CDN = users get content from the nearest server → much faster load times.
