---
title: "OOP Cheat Sheet"
description: "One-page quick reference summary of all key Object-Oriented Programming concepts."
sidebar:
  order: 5
---

# OOP Cheat Sheet

## The Four Pillars

| Pillar | Purpose | Implementation |
|--------|---------|--------------|
| **Encapsulation** | Data hiding + bundling | Private fields, public getters/setters |
| **Abstraction** | Hide complexity, show essentials | Abstract classes, interfaces |
| **Inheritance** | Code reuse via parent-child | `extends` keyword |
| **Polymorphism** | Many forms, same interface | Method overriding, interfaces |

---

## Class & Object

```javascript
class ClassName {
  constructor(params) { /* initialize */ }
  method() { /* behavior */ }
  get property() { /* getter */ }
  set property(val) { /* setter */ }
  static staticMethod() { /* class-level */ }
}
const obj = new ClassName(args);
```

---

## Access Modifiers

| Modifier | Same Class | Subclass | External |
|----------|-----------|----------|----------|
| `public` | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ❌ |
| `private` | ✅ | ❌ | ❌ |

---

## SOLID Principles

| Letter | Name | One-Liner |
|--------|------|-----------|
| **S** | **Single Responsibility** | One class = one job |
| **O** | **Open/Closed** | Extend without modifying |
| **L** | **Liskov Substitution** | Child must work as parent |
| **I** | **Interface Segregation** | Small, focused interfaces |
| **D** | **Dependency Inversion** | Depend on abstractions |

---

## Relationships

| Type | UML | Lifetime | Example |
|------|-----|----------|---------|
| **Association** | Simple arrow | Independent | Teacher → Student |
| **Aggregation** | Empty diamond ◊ | Independent | Department → Teachers |
| **Composition** | Filled diamond ◆ | Dependent | House → Rooms |
| **Dependency** | Dashed arrow | Temporary | OrderService → PaymentService |

---

## Abstract Class vs Interface

| Aspect | Abstract Class | Interface |
|--------|---------------|-----------|
| **Can have implementation?** | Yes | No (traditionally) |
| **Can have state?** | Yes | No |
| **Multiple inheritance?** | No (extends one) | Yes (implements many) |

---

## Design Principles

| Principle | Meaning |
|-----------|---------|
| **DRY** | Don't Repeat Yourself |
| **KISS** | Keep It Simple, Stupid |
| **YAGNI** | You Ain't Gonna Need It |
| **Composition** | Favor HAS-A over IS-A |
| **Program to Interface** | Depend on abstractions |

---

## Key Code Snippets

### Inheritance & super
```javascript
class Child extends Parent {
  constructor(params) { super(params); }
  method() { return super.method() + " extended"; }
}
```

### Private Fields
```javascript
class BankAccount { #balance = 0; getBalance() { return this.#balance; } }
```

### Static Members
```javascript
class MathUtils { static PI = 3.14159; static square(x) { return x * x; } }
MathUtils.PI; // 3.14159
```

---

**Previous Topic:** [Interview Questions →](/DSA-Notes-Problems/oops/07-practice/interview-questions)
**Next Topic:** Course Complete! 🎉
