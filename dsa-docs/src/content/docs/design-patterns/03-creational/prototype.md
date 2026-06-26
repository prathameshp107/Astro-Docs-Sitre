---
title: "Prototype"
description: "Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype."
sidebar:
  order: 5
---

## Prototype

> **Create new objects by cloning an existing object (the prototype) instead of calling `new`.**

### Real-World Analogy

> In a **document template** — instead of creating a new resume from scratch each time, make a copy of your existing resume and edit the details.

---

## The Pattern

```mermaid
flowchart LR
    Original["Original Object<br/>🧬 Prototype"] -->|clone\(\)| Clone1["Clone 1"]
    Original -->|clone\(\)| Clone2["Clone 2"]
    Original -->|clone\(\)| Clone3["Clone 3"]
    
    Clone1 -->|modify| C1["🚗 Car: Tesla"]
    Clone2 -->|modify| C2["🚗 Car: BMW"]
    Clone3 -->|modify| C3["🚗 Car: Audi"]

    style Original fill:#7c3aed,color:#fff
    style Clone1 fill:#3b82f6,color:#fff
    style Clone2 fill:#3b82f6,color:#fff
    style Clone3 fill:#3b82f6,color:#fff
    style C1 fill:#059669,color:#fff
    style C2 fill:#f59e0b,color:#fff
    style C3 fill:#ef4444,color:#fff
```

---

## ✅ Example — JavaScript's Built-in Prototype

JavaScript has prototypal inheritance built-in:

```js
const carPrototype = {
  start() {
    console.log(`${this.model} started!`);
  },
  stop() {
    console.log(`${this.model} stopped!`);
  },
};

// Clone using Object.create
const car1 = Object.create(carPrototype);
car1.model = 'Tesla';
car1.start(); // "Tesla started!"

const car2 = Object.create(carPrototype);
car2.model = 'BMW';
car2.start(); // "BMW started!"
```

### With a class-based approach:

```js
class Shape {
  constructor() {
    this.color = 'red';
  }

  clone() {
    return Object.create(this);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.type = 'circle';
    this.radius = radius;
  }

  clone() {
    const cloned = Object.create(this);
    // Custom clone logic if needed
    return cloned;
  }
}

// Usage
const originalCircle = new Circle(10);
console.log(originalCircle.radius); // 10

const clonedCircle = originalCircle.clone();
clonedCircle.radius = 20;

console.log(originalCircle.radius); // 10 (unchanged)
console.log(clonedCircle.radius);   // 20
```

### Using JSON for deep cloning

```js
const user = {
  name: 'Alice',
  address: { city: 'NYC', zip: '10001' },
};

// Deep clone
const clonedUser = JSON.parse(JSON.stringify(user));
clonedUser.address.city = 'LA';

console.log(user.address.city);        // "NYC" (unchanged)
console.log(clonedUser.address.city);  // "LA"
```

---

## When to Use

| Use | Don't Use |
|-----|-----------|
| Creating many similar objects | Simple creation with `new` |
| Object creation is expensive (e.g., DB call or complex setup) | When you need a different type |
| You want to avoid subclassing factories | |

## When NOT to Use

- For simple objects — `new` is clearer
- When circular references exist (JSON clone fails)
- Deep cloning complex objects with functions is tricky

---

## In Simple Words

- **Clone existing objects** instead of creating from scratch
- Useful when creating an object is **expensive**
- JavaScript's **prototypal inheritance** is naturally a prototype pattern
- Use `Object.create()` or `JSON.parse(JSON.stringify())` for cloning
