---
title: "Association"
description: "Understanding association — a relationship where objects know about and interact with each other."
sidebar:
  order: 2
---

# Association

## Introduction

**Association** is a relationship between two classes where one class **knows about** or is **connected to** another class. It represents a "uses-a" relationship where objects can communicate with each other.

### Why Does It Exist?
- Models real-world relationships where entities interact with each other
- Enables collaboration between objects
- Forms the basis for more specific relationships (aggregation, composition)

---

## Real-World Analogy: Teacher and Student

A teacher and a student have an association:
- They **know about** each other
- They **interact** (teacher teaches, student learns)
- They have **independent lifetimes** — a teacher exists without a specific student
- The relationship can be **one-way** (student knows their teacher) or **two-way**

---

## Types of Association

### 1. Unidirectional (One-Way)
One class knows about the other, but not vice versa.

```javascript
class Order {
  constructor(id, customer) {
    this.id = id;
    this.customer = customer; // Order knows about Customer
  }
}

class Customer {
  constructor(name) { this.name = name; }
}
```

### 2. Bidirectional (Two-Way)
Both classes know about each other.

```javascript
class Doctor {
  constructor(name) {
    this.name = name;
    this.patients = [];
  }
  addPatient(patient) {
    this.patients.push(patient);
    patient.addDoctor(this);
  }
}

class Patient {
  constructor(name) {
    this.name = name;
    this.doctors = [];
  }
  addDoctor(doctor) { this.doctors.push(doctor); }
}
```

### 3. Cardinality

| Type | Description | Example |
|------|-------------|---------|
| **One-to-One** | One object maps to one other | Person → Passport |
| **One-to-Many** | One object maps to many others | Department → Employees |
| **Many-to-Many** | Many objects map to many others | Students → Courses |

---

## Summary

| Concept | Key Point |
|---------|-----------|
| **Association** | Relationship between objects (uses-a) |
| **Unidirectional** | One-way knowledge |
| **Bidirectional** | Two-way knowledge |
| **Cardinality** | 1:1, 1:N, N:M |
| **Lifetime** | Objects have independent lifetimes |

---

**Previous Topic:** [Object Relationships →](/DSA-Notes-Problems/oops/04-object-relationships/)
**Next Topic:** [Aggregation →](/DSA-Notes-Problems/oops/04-object-relationships/aggregation)
