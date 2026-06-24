---
title: "Mediator"
description: "Reduce chaotic dependencies between objects. The mediator centralizes communication between objects instead of allowing objects to communicate directly."
sidebar:
  order: 8
---

## Mediator

> **Reduce chaotic dependencies between objects. The mediator centralizes communication.**

### Real-World Analogy

> An **air traffic control tower** — planes don't talk to each other directly. They all communicate with the tower (mediator). The tower ensures planes land safely without collisions.

---

## The Pattern

```mermaid
sequencediagram
    participant Alice as Alice
    participant Mediator as ChatRoom<br/>Mediator
    participant Bob as Bob
    participant Charlie as Charlie

    Alice->>Mediator: send(Hello, everyone)
    Mediator->>Bob: receive(Hello, from Alice)
    Mediator->>Charlie: receive(Hello, from Alice)

    Bob->>Mediator: send(Hey, Alice)
    Mediator->>Alice: receive(Hey, from Bob)

    Note over Mediator: All communication goes<br/>through the mediator
```

---

## ✅ Example

```js
// Mediator
class ChatRoom {
  constructor() {
    this.users = new Map();
  }

  register(user) {
    this.users.set(user.name, user);
    user.setMediator(this);
  }

  send(message, from, to) {
    if (to) {
      // Private message
      const recipient = this.users.get(to);
      if (recipient) {
        recipient.receive(message, from);
      }
    } else {
      // Broadcast
      this.users.forEach((user) => {
        if (user.name !== from) {
          user.receive(message, from);
        }
      });
    }
  }
}

// Colleague
class User {
  constructor(name) {
    this.name = name;
    this.mediator = null;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  send(message, to) {
    console.log(`\n${this.name} → ${to || 'everyone'}: ${message}`);
    this.mediator.send(message, this.name, to);
  }

  receive(message, from) {
    console.log(`📩 ${this.name} received from ${from}: ${message}`);
  }
}

// Usage
const chatRoom = new ChatRoom();

const alice = new User('Alice');
const bob = new User('Bob');
const charlie = new User('Charlie');

chatRoom.register(alice);
chatRoom.register(bob);
chatRoom.register(charlie);

alice.send('Hello everyone!');
// Alice → everyone: Hello everyone!
// 📩 Bob received from Alice: Hello everyone!
// 📩 Charlie received from Alice: Hello everyone!

bob.send('Hey Alice!', 'Alice');
// Bob → Alice: Hey Alice!
// 📩 Alice received from Bob: Hey Alice!
```

---

## Mediator vs Observer

| Aspect | Mediator | Observer |
|--------|----------|----------|
| **Communication** | Centralized (many-to-many) | Distributed (one-to-many) |
| **Who manages** | Single mediator object | Subject manages its own observers |
| **Use case** | Complex interactions between many objects | Simple notifications |

---

## When to Use

- Many objects **communicate in complex ways**
- You want to **reduce coupling** between components
- Interactions between objects are **hard to understand and maintain**

## When NOT to Use

- Simple one-to-one or one-to-few communication
- The mediator becomes a **god object** (too much logic)

---

## In Simple Words

- A **central hub** that all parts communicate through
- Parts don't talk to each other — they talk to the mediator
- Like **air traffic control** or a **chat room server**
- Reduces chaos but can become a bottleneck
