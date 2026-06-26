---
title: "Proxy"
description: "Provide a substitute or placeholder for another object to control access to it. Real-world examples with JavaScript and a Mermaid diagram."
sidebar:
  order: 4
---

## Proxy

> **Provide a placeholder for another object to control access to it.**

### Real-World Analogy

> A **credit card** is a proxy for your bank account. You hand the card to the merchant. The merchant doesn't need direct access to your bank account — the card acts as an intermediary.

---

## The Pattern

```mermaid
sequencediagram
    participant Client
    participant Proxy
    participant RealSubject

    Client->>Proxy: request()
    Note over Proxy: Check access /<br/>defer loading /<br/>log request
    Proxy->>RealSubject: request()
    RealSubject-->>Proxy: result
    Proxy-->>Client: result
```

---

## ✅ Example

### Virtual Proxy — Lazy Loading

```js
class HeavyImage {
  constructor(filename) {
    this.filename = filename;
    this.#loadFromDisk();
  }

  #loadFromDisk() {
    console.log(`Loading ${this.filename} from disk... (heavy operation)`);
  }

  display() {
    console.log(`Displaying ${this.filename}`);
  }
}

class ImageProxy {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null; // Not loaded yet!
  }

  display() {
    if (!this.realImage) {
      this.realImage = new HeavyImage(this.filename);
    }
    this.realImage.display();
  }
}

// Usage
const image = new ImageProxy('photo.jpg');
// Nothing loaded yet!

image.display(); // Loads and displays
image.display(); // Only displays (already loaded)
```

### Protection Proxy — Access Control

```js
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. Balance: $${this.balance}`);
    }
  }
}

class AccountProxy {
  constructor(account, user) {
    this.account = account;
    this.user = user;
  }

  withdraw(amount) {
    if (this.user.role !== 'admin') {
      console.log('❌ Access denied');
      return;
    }
    this.account.withdraw(amount);
  }
}

const user = { role: 'viewer' };
const admin = { role: 'admin' };
const account = new AccountProxy(new BankAccount(1000), user);

account.withdraw(100); // "❌ Access denied"

account.user = admin;
account.withdraw(100); // "Withdrew $100. Balance: $900"
```

---

## Proxy vs Decorator

| Aspect | Proxy | Decorator |
|--------|-------|-----------|
| **Purpose** | Control access | Add behavior |
| **Creates** the real object? | Often yes (lazy) | Always receives it |
| **Changes** interface? | Sometimes (protection) | Never — same interface |

---

## When to Use

- **Lazy loading** — defer expensive object creation
- **Access control** — restrict who can call methods
- **Logging** — log all requests to an object
- **Caching** — cache results of expensive operations

## When NOT to Use

- You just need simple access — no proxy needed
- Performance is critical (proxy adds overhead)

---

## In Simple Words

- A **middleman** between the client and the real object
- Can **delay, restrict, or log** access
- The client doesn't know it's talking to a proxy (same interface)
- Useful for **lazy loading, security, caching, logging**
