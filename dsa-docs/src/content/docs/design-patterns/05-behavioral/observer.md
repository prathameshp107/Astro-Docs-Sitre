---
title: "Observer"
description: "Define a one-to-many dependency so when one object changes state, all its dependents are notified and updated automatically."
sidebar:
  order: 1
---

## Observer

> **When one object changes state, all its dependents get notified automatically.**

### Real-World Analogy

> A **YouTube channel**: You subscribe to a channel. When the creator uploads a new video, **all subscribers** get a notification automatically. You don't keep checking manually.

---

## The Pattern

```mermaid
sequencediagram
    participant Subject
    participant Observer1
    participant Observer2
    participant Observer3

    Subject->>Subject: changeState()
    Subject->>Observer1: notify()
    Subject->>Observer2: notify()
    Subject->>Observer3: notify()
    Observer1-->>Subject: updated
    Observer2-->>Subject: updated
    Observer3-->>Subject: updated
```

---

## ✅ Example

```js
// Subject (Observable)
class NewsAgency {
  constructor() {
    this.subscribers = [];
    this.news = '';
  }

  subscribe(observer) {
    this.subscribers.push(observer);
  }

  unsubscribe(observer) {
    this.subscribers = this.subscribers.filter(s => s !== observer);
  }

  publishNews(news) {
    this.news = news;
    this.#notifyAll();
  }

  #notifyAll() {
    this.subscribers.forEach(sub => sub.update(this.news));
  }
}

// Observers
class EmailSubscriber {
  constructor(name) {
    this.name = name;
  }

  update(news) {
    console.log(`📧 ${this.name} received email: ${news}`);
  }
}

class SMSSubscriber {
  constructor(phone) {
    this.phone = phone;
  }

  update(news) {
    console.log(`📱 SMS to ${this.phone}: ${news}`);
  }
}

class PushSubscriber {
  update(news) {
    console.log(`🔔 Push notification: ${news}`);
  }
}

// Usage
const agency = new NewsAgency();

const alice = new EmailSubscriber('Alice');
const bob = new SMSSubscriber('555-0100');
const push = new PushSubscriber();

agency.subscribe(alice);
agency.subscribe(bob);
agency.subscribe(push);

agency.publishNews('Breaking: TypeScript 6.0 released!');
// 📧 Alice received email: Breaking: TypeScript 6.0 released!
// 📱 SMS to 555-0100: Breaking: TypeScript 6.0 released!
// 🔔 Push notification: Breaking: TypeScript 6.0 released!

agency.unsubscribe(alice);
agency.publishNews('Node.js 24 released!');
// Only SMS and Push get notified — Alice unsubscribed
```

---

## Real-World Examples

| Technology | Observer Usage |
|-----------|---------------|
| **DOM Events** | `element.addEventListener('click', handler)` |
| **RxJS** | `observable.subscribe(observer)` |
| **Vue.js** | Reactive data — components re-render on state change |
| **Redux / Zustand** | Store notifies subscribers when state changes |

---

## When to Use

- **One-to-many** relationship between objects
- Changes in one object should **automatically update** others
- You don't know how many objects need to be notified ahead of time

## When NOT to Use

- Simple one-to-one communication — just call a function
- Too many observers (performance concerns)
- Subscribers need to unsubscribe frequently (memory leaks)

---

## In Simple Words

- An object (subject) **notifies many observers** when something changes
- Observers **subscribe** to get updates; they can **unsubscribe** anytime
- The subject doesn't know who the observers are — **loose coupling**
- Great for event handling, real-time updates, and reactive programming
