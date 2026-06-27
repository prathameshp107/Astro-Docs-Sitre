---
title: "Aggregation"
description: "Understanding aggregation — a 'has-a' relationship where the child can exist independently of the parent."
sidebar:
  order: 3
---

# Aggregation

## Introduction

**Aggregation** is a specialized form of association that represents a **"has-a"** relationship where one class contains a collection of other classes, but the contained classes can exist **independently** of the container.

Think of it as a **weak** ownership — the parent holds a reference to the child, but the child can exist on its own.

---

## Real-World Analogy: Department and Teachers

A **Department** contains **Teachers**:
- If the department is closed, the teachers **still exist**
- Teachers can work in multiple departments
- Teachers have their own identity (employee ID)

---

## Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Relationship** | "Has-a" (weak ownership) |
| **Lifetime** | Parent and child have independent lifetimes |
| **Sharing** | Child can be shared across multiple parents |
| **Destroy parent** | Child objects continue to exist |
| **UML** | Empty diamond (◊) |

---

## Example

```javascript
class Player {
  constructor(name, skill) {
    this.name = name;
    this.skill = skill;
  }
}

class Team {
  constructor(name) {
    this.name = name;
    this.players = [];
  }
  addPlayer(player) {
    this.players.push(player); // Aggregation
  }
}

// Players exist independently
const messi = new Player("Messi", 99);
const ronaldo = new Player("Ronaldo", 98);

// Players are added to a team
const dreamTeam = new Team("Dream Team");
dreamTeam.addPlayer(messi);
dreamTeam.addPlayer(ronaldo);

// But players still exist even without the team!
console.log(messi.name); // Works!
```

---

**Previous Topic:** [Association →](/DSA-Notes-Problems/oops/04-object-relationships/association)
**Next Topic:** [Composition →](/DSA-Notes-Problems/oops/04-object-relationships/composition)
