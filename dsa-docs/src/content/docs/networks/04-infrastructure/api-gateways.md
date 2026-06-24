---
title: "API Gateways & WAF"
description: "API gateways sit at the edge of your system — routing, rate limiting, authentication, and Web Application Firewalls (WAF) for security."
sidebar:
  order: 4
---

## API Gateways & WAF

### 🤔 What is an API Gateway?

An **API Gateway** is a single entry point for all client requests. Think of it like a **reception desk at a company**:

- All visitors (clients) first go to the reception desk
- The receptionist (gateway) checks who they are, directs them to the right office (service)
- Some requests are handled right at the desk (authentication, rate limiting)

```mermaid
flowchart TB
    subgraph Clients
        C1[Web Browser]
        C2[Mobile App]
        C3[Third Party API]
    end
    
    subgraph Gateway[API Gateway]
        Auth[Authentication<br/>Verify JWT / API Key]
        Rate[Rate Limiting<br/>100 req/min per user]
        Route[Routing<br/>Path → Service]
        Cache[Response Cache<br/>Frequently accessed data]
        Log[Logging & Monitoring<br/>Track all requests]
    end
    
    subgraph Services[Backend Services]
        S1[Users Service<br/>/api/users/*]
        S2[Orders Service<br/>/api/orders/*]
        S3[Payments Service<br/>/api/payments/*]
        S4[Notifications<br/>/api/notifications/*]
    end
    
    C1 --> Gateway
    C2 --> Gateway
    C3 --> Gateway
    
    Auth --> Rate --> Route --> Cache --> Log
    Log --> S1
    Log --> S2
    Log --> S3
    Log --> S4
    
    style Clients fill:#3b82f6,color:#fff
    style Gateway fill:#7c3aed,color:#fff
    style Services fill:#10b981,color:#fff
```

---

### 📋 What an API Gateway Does

| Feature | What it does | Why it matters |
|---------|-------------|----------------|
| **Routing** | Directs requests to the right backend service | Clients only need one URL |
| **Authentication** | Verifies API keys, JWT tokens | Centralized security |
| **Rate Limiting** | Limits requests per user/IP | Prevents abuse and DDoS |
| **Caching** | Caches frequent responses | Reduces backend load |
| **SSL Termination** | Handles HTTPS encryption | Less work for backend servers |
| **Request/Response Transform** | Modifies headers, formats data | Clients and services don't need to match exactly |
| **Monitoring** | Logs all API traffic | Debugging, analytics, billing |

---

### 🛡️ Web Application Firewall (WAF)

A WAF sits **in front of your web application** and filters malicious traffic:

```mermaid
flowchart LR
    subgraph Internet
        Good[Legitimate User]
        Bad[Hacker<br/>SQL Injection]
        Bot[Bot / Scraper]
    end
    
    subgraph WAF[Web Application Firewall]
        Rule1[Rule: Block SQL Injection patterns]
        Rule2[Rule: Block XSS attempts]
        Rule3[Rule: Rate limit per IP]
        Rule4[Rule: Block known bot IPs]
    end
    
    subgraph Server[Your Web Server]
        App[Application<br/>Safe traffic only ✅]
    end
    
    Good --> WAF
    Bad --> WAF
    Bot --> WAF
    
    WAF -->|"✅ Allowed"| App
    WAF -->|"❌ Blocked"| Blocked["🚫 Request dropped"]
    WAF -->|"❌ Blocked"| Blocked
    
    style Internet fill:#3b82f6,color:#fff
    style WAF fill:#f59e0b,color:#fff
    style Server fill:#10b981,color:#fff
    style Good fill:#10b981,color:#fff
    style Bad fill:#ef4444,color:#fff
    style Bot fill:#ef4444,color:#fff
    style Blocked fill:#991b1b,color:#fff
```

**Common WAF rules:**
- Block **SQL injection** patterns (`' OR 1=1 --`)
- Block **XSS** attempts (`<script>alert('xss')</script>`)
- Block **path traversal** (`../../../etc/passwd`)
- **Rate limit** — max 1000 requests/minute per IP
- **Geo-blocking** — block traffic from unexpected countries
- **IP blacklisting** — block known malicious IPs

---

### 🔄 API Gateway vs Load Balancer

| Feature | Load Balancer | API Gateway |
|---------|--------------|-------------|
| **Layer** | L4/L7 (Transport/Application) | L7 (Application) |
| **Routing** | By IP + port | By URL path + headers |
| **Auth** | ❌ No | ✅ Yes |
| **Rate Limiting** | Limited | ✅ Deep (per user, per endpoint) |
| **Caching** | ❌ No | ✅ Yes |
| **Protocol translation** | ❌ No | ✅ REST → gRPC, etc. |
| **Example** | HAProxy, Nginx | Kong, AWS API Gateway, Apigee |

Many modern setups use **both**: Load balancer → API Gateway → Services.

---

### 🚀 Popular API Gateways

| Tool | Description |
|------|-------------|
| **Kong** | Open-source, plugin-based (auth, rate limiting, logging) |
| **AWS API Gateway** | Serverless, integrates with Lambda |
| **Apigee** | Enterprise, analytics, monetization |
| **Traefik** | Cloud-native, auto-discovers services |
| **Nginx + Lua** | Custom gateway logic using Nginx |

---

### In Simple Words

- An **API Gateway** is a single entry point that routes, authenticates, rate-limits, and caches API requests
- A **WAF** filters malicious traffic (SQL injection, XSS) before it reaches your server
- **API Gateways** understand HTTP (URL paths, headers); **Load Balancers** work at lower levels (IP, port)
- Gateways simplify clients — they only need one URL instead of many service URLs
- Popular gateways: Kong, AWS API Gateway, Traefik
