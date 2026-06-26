---
title: "OOP Cheat Sheet"
description: "One-page quick reference summary of all key Object-Oriented Programming concepts."
sidebar:
  order: 30
---

# OOP Cheat Sheet

> 🚀 **Prefer an interactive version?** Check out the [Interactive OOP Cheat Sheet](/DSA-Notes-Problems/oops/cheatsheet) — collapsible sections, search, and live code examples!

---

## The Four Pillars

| Pillar | Pronunciation | Purpose | Implementation |
|--------|--------------|---------|--------------|
| **Encapsulation** | en-cap-su-la-tion | Data hiding + bundling | Private fields, public getters/setters |
| **Abstraction** | ab-strac-tion | Hide complexity, show essentials | Abstract classes, interfaces |
| **Inheritance** | in-her-i-tance | Code reuse via parent-child | `extends` keyword |
| **Polymorphism** | po-ly-mor-phism | Many forms, same interface | Method overriding, interfaces |

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

## Relationships

| Type | UML | Lifetime | Example |
|------|-----|----------|---------|
| **Association** | Simple arrow | Independent | Teacher → Student |
| **Aggregation** | Empty diamond ◊ | Independent | Department → Teachers |
| **Composition** | Filled diamond ◆ | Dependent | House → Rooms |
| **Dependency** | Dashed arrow | Temporary | OrderService → PaymentService |

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

## Abstract Class vs Interface

| Aspect | Abstract Class | Interface |
|--------|---------------|-----------|
| **Can have implementation?** | Yes | No (traditionally) |
| **Can have state?** | Yes | No |
| **Multiple inheritance?** | No (extends one) | Yes (implements many) |
| **Use when** | Related classes with shared code | Unrelated classes with shared capability |

---

## Relationships Comparison

```mermaid
graph TD
    A[Class A] --o|Aggregation<br/>Weak has-a| B[Part B]
    A --*|Composition<br/>Strong has-a| C[Part C]
    A -.->|Dependency<br/>Uses temporarily| D[Service D]
    A -->|Association<br/>Knows about| E[Related E]
```

---

## Key Code Snippets

### Inheritance & super
```javascript
class Child extends Parent {
  constructor(params) {
    super(params); // Call parent constructor
  }
  method() {
    return super.method() + " extended"; // Call parent method
  }
}
```

### Private Fields (ES2020+)
```javascript
class BankAccount {
  #balance = 0;
  getBalance() { return this.#balance; }
}
```

### Method Overriding
```javascript
class Animal { speak() { return "sound"; } }
class Dog extends Animal {
  speak() { return "Woof!"; } // Override
}
```

### Interface Pattern (Duck Typing)
```javascript
class ConsoleLogger {
  log(msg) { console.log(msg); }
}
function process(logger) {
  logger.log("works"); // Any object with log() method
}
```

### Static Members
```javascript
class MathUtils {
  static PI = 3.14159;
  static square(x) { return x * x; }
}
MathUtils.PI; // 3.14159
```

---

## Design Principles

| Principle | Meaning |
|-----------|---------|
| **DRY** | Don't Repeat Yourself |
| **KISS** | Keep It Simple, Stupid |
| **YAGNI** | You Ain't Gonna Need It |
| **Composition** | Favor HAS-A over IS-A |
| **Program to Interface** | Depend on abstractions |
| **Law of Demeter** | Don't talk to strangers |

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| God class (does everything) | Split into focused classes (SRP) |
| Deep inheritance (5+ levels) | Use composition instead |
| Public fields everywhere | Make private, expose via methods |
| Type-checking with if/switch | Use polymorphism |
| Creating dependencies inside class | Use dependency injection |
| Forgetting `super()` in constructor | Always call parent constructor |

---

## Language Cheat Sheet

| Concept | JavaScript | TypeScript | Python | Java |
|---------|-----------|------------|--------|------|
| Class creation | `class C {}` | `class C {}` | `class C:` | `class C {}` |
| Constructor | `constructor()` | `constructor()` | `__init__(self)` | `ClassName()` |
| Private field | `#field` | `private` | `__field` | `private` |
| Parent call | `super()` | `super()` | `super().__init__()` | `super()` |
| Abstract | Simulated | `abstract` | `@abstractmethod` | `abstract` |
| Interface | Duck typing | `interface` | `ABC` | `interface` |
| Static | `static` | `static` | `@staticmethod` | `static` |

---

## Quick Decision Guide

**When should I use...**

- **Class?** — Need multiple instances with shared behavior
- **Abstract class?** — Related classes share code but differ in some methods
- **Interface?** — Unrelated classes need to fulfill the same contract
- **Static method?** — Utility function that doesn't need instance state
- **Private field?** — Internal implementation detail
- **Inheritance?** — Genuine IS-A relationship (a Dog IS-A Animal)
- **Composition?** — HAS-A relationship (a Car HAS-A Engine)
- **SOLID?** — Always strive for it, but pragmatism over perfection

---

## In Simple Words

> **Class** = Blueprint | **Object** = Instance | **Encapsulation** = Hide data | **Abstraction** = Hide complexity
> **Inheritance** = Reuse code | **Polymorphism** = Same interface, different behavior
> **SOLID** = Guidelines for maintainable code | **Composition** = Prefer HAS-A over IS-A

---

**Previous Topic:** [Interview Questions →](/DSA-Notes-Problems/oops/29-interview-questions)
**Next Topic:** Course Complete! 🎉
**Related Topics:** [All OOP Topics](/DSA-Notes-Problems/oops/01-what-is-oops)
