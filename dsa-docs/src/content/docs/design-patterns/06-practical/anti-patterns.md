---
title: "Anti-Patterns"
description: "Common coding mistakes and anti-patterns to avoid — god objects, spaghetti code, over-engineering, and premature abstraction."
sidebar:
  order: 2
---

## Anti-Patterns

> **Anti-patterns** are common solutions that seem like a good idea but cause problems later.

Real-world patterns → good. Anti-patterns → bad. Here's what to avoid.

---

## 1. God Object 👹

> **A single class that knows/does too much.**

```js
// ❌ God Object
class Application {
  constructor() {
    this.users = [];
    this.orders = [];
    this.inventory = [];
    this.logger = null;
    this.emailer = null;
  }

  processOrder(order) { /* ... */ }
  sendEmail(user) { /* ... */ }
  generateReport() { /* ... */ }
  connectDatabase() { /* ... */ }
  renderUI() { /* ... */ }
  handlePayment() { /* ... */ }
  // ... 50 more methods
}
```

**Why it hurts:** Hard to understand, test, or change. One bug crashes everything.

**Fix:** Split into focused classes (Single Responsibility).

---

## 2. Spaghetti Code 🍝

> **Code with no clear structure — everything depends on everything.**

```js
// ❌ Spaghetti
let globalState = {};

function init() {
  globalState.user = getUser();
  document.getElementById('btn').onclick = function() {
    if (globalState.user.role === 'admin') {
      updateStuff();
    }
  };
}

function updateStuff() {
  fetch('/api/data').then(r => r.json()).then(data => {
    globalState.data = data;
    render();
    checkSomething();
  });
}

function checkSomething() {
  if (globalState.data.length > 0) {
    document.getElementById('output').innerHTML = globalState.data
      .map(d => `<div>${d.name}</div>`)
      .join('');
  }
}
```

**Fix:** Separate concerns. Use modules, clear data flow, avoid global mutable state.

---

## 3. Over-Engineering 🏗️

> **Adding complex patterns where they're not needed.**

```js
// ❌ Over-engineered — just need a simple greeting function
interface GreetingStrategy {
  greet(name: string): string;
}

class EnglishGreeting implements GreetingStrategy {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}

class GreetingFactory {
  static create(lang: string): GreetingStrategy {
    switch(lang) {
      case 'en': return new EnglishGreeting();
      default: return new EnglishGreeting();
    }
  }
}

class GreetingService {
  constructor(private strategy: GreetingStrategy) {}
  greet(name: string) {
    return this.strategy.greet(name);
  }
}

// ✅ Simple — just do this
function greet(name) {
  return `Hello, ${name}!`;
}
```

**Fix:** "You aren't gonna need it" (YAGNI). Start simple. Add patterns when the complexity demands it.

---

## 4. Premature Abstraction 🔮

> **Abstracting everything because "we might need it later."**

```js
// ❌ Premature abstraction
interface Saveable {
  save(): void;
}
interface Exportable {
  export(format: string): void;
}
interface Loggable {
  log(): void;
}
// ... for what is currently just a simple todo app
```

**Fix:** Don't abstract until you have at least **2-3 concrete cases** that actually need it.

---

## 5. Copy-Paste Programming 📋

> **Repeating the same code everywhere instead of reusing.**

**Fix:** Extract repeated code into functions/classes. DRY (Don't Repeat Yourself).

---

## 6. Magic Numbers & Strings

```js
// ❌ Bad
if (status === 3) { /* ... */ }

// ✅ Good
const ORDER_SHIPPED = 3;
if (status === ORDER_SHIPPED) { /* ... */ }
```

---

## Summary — Good vs Bad

| Good Practice | Anti-Pattern |
|---------------|-------------|
| Single Responsibility | God Object |
| Clean structure | Spaghetti Code |
| Start simple, add patterns later | Over-Engineering |
| Abstract when needed (2+ cases) | Premature Abstraction |
| Reuse code | Copy-Paste |
| Named constants | Magic Numbers |

---

## In Simple Words

- **Anti-patterns** are common mistakes that look like solutions
- **God objects** — a class that does everything (don't)
- **Over-engineering** — adding patterns before they're needed
- **YAGNI**: "You Aren't Gonna Need It" — build for today
- **Start simple. Refactor when the pain is real.**
