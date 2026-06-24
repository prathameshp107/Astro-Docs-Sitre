---
title: "Interview Questions"
description: "Common design pattern and SOLID interview questions with concise answers and code examples."
sidebar:
  order: 1
---

## Interview Questions — Design Patterns & SOLID

Common questions asked in interviews, with concise answers.

---

## SOLID Principles

### Q: What is the Single Responsibility Principle?

> A class should have **one reason to change**. One class = one job.

**Example:** Don't put `User`, `EmailService`, and `DatabaseRepository` in one class. Separate them.

### Q: How do you apply the Open/Closed Principle?

> Classes should be **open for extension, closed for modification**.

**Example:** Use interfaces/abstract classes. Add new payment methods as new classes instead of adding `if/else` to `PaymentProcessor`.

### Q: Explain Liskov Substitution with an example.

> Subtypes must be **substitutable** for their base types.

**Common violation:** `Square extends Rectangle` while changing width/height logic. A `Bird` class shouldn't have `fly()` if `Penguin` can't fly.

### Q: What is Interface Segregation?

> **No client should be forced to depend on methods it doesn't use.**

**Bad:** One fat interface `Worker` with `work()`, `eat()`, `sleep()` where `Robot` doesn't eat or sleep.

**Good:** Separate into `Workable`, `Eatable`, `Sleepable`.

### Q: Explain Dependency Inversion.

> **Depend on abstractions, not concretions.**

**Bad:** `new EmailSender()` inside `NotificationService`.

**Good:** Inject `MessageSender` into constructor. Swap Email/SMS/Push without changing `NotificationService`.

---

## General Pattern Questions

### Q: What are the three categories of design patterns?

1. **Creational** — how objects are created (Singleton, Factory, Builder)
2. **Structural** — how objects are composed (Adapter, Decorator, Facade)
3. **Behavioral** — how objects communicate (Observer, Strategy, State)

### Q: What's the difference between Factory Method and Abstract Factory?

| | Factory Method | Abstract Factory |
|---|---|---|
| Creates | **One** product | **Families** of related products |
| Implementation | One method | Multiple methods |
| Example | `createLogger()` | `createButton()` + `createCheckbox()` for same OS theme |

### Q: How is the Decorator pattern different from inheritance?

| | Inheritance | Decorator |
|---|---|---|
| Compile-time | Runtime |
| Fixed behavior | Dynamic additions |
| Class explosion with combos | Flexible combinations |
| Adds to the **type** | Adds to the **instance** |

### Q: Explain the Observer pattern with a real-world example.

**Analogy:** YouTube subscription — you subscribe, you get notified of new videos.

**Code:** `Subject` has subscriber list. On state change, it calls `update()` on all subscribers. Used in React (hooks), RxJS, DOM events.

### Q: When would you use the Strategy pattern vs the State pattern?

| | Strategy | State |
|---|---|---|
| **Purpose** | Swap algorithms | Change behavior based on state |
| **Who decides** | Client | Object itself |
| **States know** each other? | No | Often yes (transitions) |

---

## Common Interview Questions

### Q: Name a pattern that's built into JavaScript.

- **Observer** — EventEmitter, DOM events, Promises
- **Iterator** — `for...of`, `[Symbol.iterator]()`
- **Singleton** — ES6 modules are singletons
- **Prototype** — prototypal inheritance (`Object.create`)

### Q: What's the difference between Proxy and Decorator?

| | Proxy | Decorator |
|---|---|---|
| **Purpose** | Control access | Add behavior |
| **Creates** the real object? | Often (lazy loading) | Never — receives it |
| **May restrict** access? | Yes (protection proxy) | Never — same interface |

### Q: How does Express.js middleware use design patterns?

**Chain of Responsibility** — each middleware decides to process or pass to `next()`.

```js
app.use(logger);      // logs request, calls next()
app.use(auth);        // checks auth, calls next() or rejects
app.use(router);      // handles the route
```

### Q: What pattern does Redux use?

**Command pattern** — actions are command objects describing state changes.

```js
const action = { type: 'INCREMENT', payload: 1 };
dispatch(action); // Execute command
```

### Q: What's an anti-pattern you've encountered?

Common ones:
- **God Object** — one class doing everything
- **Spaghetti Code** — unstructured, tangled logic
- **Premature Abstraction** — abstracting before you need it
- **Copy-Paste Programming** — not reusing code

### Q: Describe a time you used a design pattern in a real project.

Be honest! Talk about:
- **What problem** you were solving
- **Which pattern** you used
- **How** it helped (or didn't)
- **What you learned**

### Q: What's the most important SOLID principle in your opinion?

Many say **Single Responsibility** because it leads naturally to the others. When each class has one job, you automatically get more testable, maintainable code.

---

## Quick Answers

| Question | Short Answer |
|----------|-------------|
| What's a Singleton? | One global instance |
| What's a Factory? | Creates objects without exposing creation logic |
| Differences between Abstract Factory and Builder? | AF creates families; Builder creates one complex object step by step |
| What's an Adapter? | Makes incompatible interfaces work together |
| What's a Facade? | Simplified API over a complex system |
| When to use Template Method? | Same algorithm skeleton, varying steps |
| When to use Command? | Need undo/redo, queuing, or logging |

---

## In Simple Words

- SOLID = 5 principles for **clean, maintainable** code
- 23 classic patterns = **proven solutions** to common problems
- Patterns are **not rules** — use them when they genuinely help
- **Real-world examples** (React, Angular, Node) make patterns easier to remember
- In interviews, explain **the problem first**, then the pattern as the solution
