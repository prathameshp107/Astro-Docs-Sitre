---
title: "Composition"
description: "Understanding composition — a strong 'has-a' relationship where parts cannot exist without the whole."
sidebar:
  order: 4
---

# Composition

## Introduction

**Composition** is a specialized form of association that represents a **strong "has-a"** relationship where one class (the whole/composite) **owns** objects of another class (the part), and the parts **cannot exist independently** of the whole.

---

## Real-World Analogy: House and Rooms

A **House** contains **Rooms**:
- If the house is destroyed, the rooms are destroyed too
- A room cannot exist independently without a house
- Rooms are not shared across houses
- The house **owns** the rooms

---

## Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Relationship** | "Part-of" (strong ownership) |
| **Lifetime** | Part depends on whole (same lifecycle) |
| **Sharing** | Parts cannot be shared |
| **Destroy parent** | Child objects are destroyed too |
| **UML** | Filled diamond (◆) |

---

## Code Example

```javascript
class Engine {
  constructor(type, horsepower) {
    this.type = type;
    this.horsepower = horsepower;
    this.isRunning = false;
  }
  start() { this.isRunning = true; }
  stop() { this.isRunning = false; }
}

class Wheel {
  constructor(position) {
    this.position = position;
    this.pressure = 32;
  }
}

class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
    // Composition: Car creates and owns these components
    this.engine = new Engine("V6", 300);
    this.wheels = [
      new Wheel("Front-Left"),
      new Wheel("Front-Right"),
      new Wheel("Rear-Left"),
      new Wheel("Rear-Right")
    ];
  }

  start() {
    this.engine.start();
    console.log(`${this.make} ${this.model} started`);
  }
}
```

---

## Composition vs Aggregation

| Aspect | Composition | Aggregation |
|--------|-------------|-------------|
| **Ownership** | Strong (parent owns child) | Weak (parent contains child) |
| **Lifetime** | Same lifecycle | Independent lifecycles |
| **Sharing** | Not shared | Can be shared |
| **UML** | Filled diamond (◆) | Empty diamond (◊) |
| **Child dies with parent?** | Yes | No |
| **Example** | House has Rooms | Department has Teachers |

---

**Previous Topic:** [Aggregation →](/DSA-Notes-Problems/oops/04-object-relationships/aggregation)
**Next Topic:** [Dependency →](/DSA-Notes-Problems/oops/04-object-relationships/dependency)
