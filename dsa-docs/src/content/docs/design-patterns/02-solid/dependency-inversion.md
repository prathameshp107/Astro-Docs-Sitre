---
title: "D — Dependency Inversion"
description: "Depend on abstractions, not concretions. Real-world examples with JavaScript and Mermaid diagram."
sidebar:
  order: 5
---

## D — Dependency Inversion Principle

> **High-level modules should not depend on low-level modules. Both should depend on abstractions.**
>
> **Abstractions should not depend on details. Details should depend on abstractions.**

### Real-World Analogy

> A lamp doesn't care which power plant generates electricity. It depends on the **abstraction** (the electrical socket), not the specific power source.

---

## The Problem — Direct Dependencies

```mermaid
flowchart LR
    A[NotificationService] --> B[EmailSender]
    style A fill:#ef4444,color:#fff
    style B fill:#f59e0b,color:#fff
```

High-level code depends directly on low-level code. Changes ripple upward.

## The Solution — Invert the Dependency

```mermaid
flowchart LR
    A[NotificationService] --> C[Messaging Interface<br/>send()]
    B[EmailSender] -.-> C
    D[SMSsender] -.-> C
    E[PushSender] -.-> C
    style A fill:#7c3aed,color:#fff
    style B fill:#059669,color:#fff
    style C fill:#3b82f6,color:#fff
    style D fill:#059669,color:#fff
    style E fill:#059669,color:#fff
```

Both high-level and low-level modules depend on the **abstraction**.

---

## ❌ Bad Example

```js
class EmailSender {
  sendEmail(message) {
    console.log(`Email sent: ${message}`);
  }
}

class NotificationService {
  constructor() {
    this.sender = new EmailSender(); // ❌ Direct dependency
  }

  notify(message) {
    this.sender.sendEmail(message);
  }
}
```

**Why it hurts:** `NotificationService` is **tightly coupled** to `EmailSender`. Switching to SMS means rewriting `NotificationService`.

---

## ✅ Fixed Example

```js
// Abstraction (interface)
class MessageSender {
  send(message) {
    throw new Error('Override this method');
  }
}

// Low-level implementations
class EmailSender extends MessageSender {
  send(message) {
    console.log(`Email sent: ${message}`);
  }
}

class SMSSender extends MessageSender {
  send(message) {
    console.log(`SMS sent: ${message}`);
  }
}

class PushSender extends MessageSender {
  send(message) {
    console.log(`Push notification: ${message}`);
  }
}

// High-level module — depends on abstraction
class NotificationService {
  constructor(sender) {
    this.sender = sender; // ✅ Abstraction injected
  }

  notify(message) {
    this.sender.send(message);
  }
}

// Usage
const email = new EmailSender();
const sms = new SMSSender();

const notifier = new NotificationService(email);
notifier.notify('Hello!'); // "Email sent: Hello!"

const notifier2 = new NotificationService(sms);
notifier2.notify('Hello!'); // "SMS sent: Hello!"
```

---

## Dependency Injection (DI)

The most common way to apply DIP is **Dependency Injection** — pass dependencies in via constructor:

```js
// Instead of:
class OrderService {
  constructor() {
    this.db = new MySQLDatabase(); // ❌ Hard-coded
  }
}

// Do:
class OrderService {
  constructor(database) {
    this.db = database; // ✅ Injected
  }
}
```

---

## When to Apply

- **Swappable implementations** — databases, payment gateways, email providers
- **Testing** — inject mock dependencies instead of real ones
- **Frequent changes** — isolate what changes behind an abstraction

---

## In Simple Words

- Don't "new up" dependencies inside a class — **inject them**
- Both high-level and low-level code should depend on **interfaces/abstract classes**
- Makes code **testable, flexible, and loosely coupled**
- When the email provider changes, you add a class — **not edit** the notification service
