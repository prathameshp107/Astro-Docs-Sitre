---
title: "S — Single Responsibility"
description: "A class should have one, and only one, reason to change. Real-world examples with JavaScript."
sidebar:
  order: 1
---

## S — Single Responsibility Principle

> **A class should have only one reason to change.**

Each class should do **one thing** and do it well.

### Real-World Analogy

> A chef cooks food. A waiter serves food. A cashier handles payment. You wouldn't ask the chef to also calculate the bill.

---

## SOLID at a Glance

```mermaid
flowchart LR
    S["S — Single Responsibility<br/>One class = one job"]:::s
    O["O — Open/Closed<br/>Extend, don't modify"]:::o
    L["L — Liskov Substitution<br/>Subtypes replace parents"]:::l
    I["I — Interface Segregation<br/>Many small interfaces"]:::i
    D["D — Dependency Inversion<br/>Depend on abstractions"]:::d

    S --> O --> L --> I --> D

    classDef s fill:#7c3aed,color:#fff
    classDef o fill:#3b82f6,color:#fff
    classDef l fill:#059669,color:#fff
    classDef i fill:#f59e0b,color:#fff
    classDef d fill:#ef4444,color:#fff
```

---

## ❌ Bad Example

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getUser() {
    return { name: this.name, email: this.email };
  }

  saveToDatabase() {
    // Save user to DB
    console.log('Saving to DB...');
  }

  sendEmail() {
    // Send welcome email
    console.log('Sending email...');
  }

  generateReport() {
    // Generate PDF report
    console.log('Generating report...');
  }
}
```

**Why it hurts:** This class does **everything** — user management, database, email, reporting. Change the email service? You modify `User`. Change the database? You modify `User` again.

---

## ✅ Fixed Example

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) {
    // Save user to DB
    console.log('Saving to DB...');
  }
}

class EmailService {
  sendWelcome(user) {
    // Send welcome email
    console.log('Sending email...');
  }
}

class ReportGenerator {
  generateUserReport(user) {
    // Generate PDF report
    console.log('Generating report...');
  }
}
```

Now each class has **one responsibility** and **one reason to change**.

---

## When to Apply

- **Large classes** that seem to do "everything"
- **Frequent changes** — if a class changes for multiple reasons, split it
- **Testing** — SRP classes are easier to test in isolation

## When NOT to Over-Apply

- Don't create a class for every tiny operation — use good judgment
- Some grouping is natural (e.g., a utility class for math helpers)

---

## In Simple Words

- One class = one job
- If a class has many reasons to change, split it
- Makes code **easier to test, maintain, and understand**
- Think: "What is this class responsible for?" — should have one answer
