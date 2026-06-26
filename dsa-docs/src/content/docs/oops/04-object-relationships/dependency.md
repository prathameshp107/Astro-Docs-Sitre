---
title: "Dependency"
description: "Understanding dependency — when one class relies on another class to function."
sidebar:
  order: 5
---

# Dependency

## Introduction

**Dependency** is a relationship where one class (the client) **depends on** another class (the supplier) because it uses that class in some way. If the supplier changes, the client may need to change too.

Dependency is the **weakest** form of relationship between classes.

---

## Real-World Analogy: Ordering Food

A **Customer** depends on a **Restaurant**:
- Customer calls the restaurant to place an order
- Customer doesn't own the restaurant
- Customer just needs the restaurant's service temporarily

If the restaurant changes its menu, the customer may need to change their order.

---

## Types of Dependencies

| Type | Description | Example |
|------|-------------|---------|
| **Method parameter** | Passed into a method | `function process(paymentService)` |
| **Local variable** | Created inside a method | `const email = new EmailService()` |
| **Return type** | Method returns an instance | `getDatabase(): Database` |
| **Static method call** | Calling static methods | `Logger.log("message")` |

---

## Dependency Injection (DI)

**Dependency Injection** is a technique where dependencies are "injected" into a class from outside.

### Without DI (Tight Coupling)
```javascript
class OrderService {
  constructor() {
    this.logger = new Logger();
    this.emailService = new EmailService();
    this.paymentService = new PaymentService();
  }
}
```

### With DI (Loose Coupling)
```javascript
class OrderService {
  constructor(logger, emailService, paymentService) {
    this.logger = logger;
    this.emailService = emailService;
    this.paymentService = paymentService;
  }
}
```

---

## Best Practices

- **Depend on abstractions**, not concrete implementations (DIP)
- **Use dependency injection** for loose coupling
- **Minimize dependencies** — each class should have few dependencies
- **Don't create dependencies inside constructors** — inject them

---

**Previous Topic:** [Composition →](/DSA-Notes-Problems/oops/04-object-relationships/composition)
**Next Topic:** [Coupling vs Cohesion →](/DSA-Notes-Problems/oops/04-object-relationships/coupling-vs-cohesion)
