---
title: "Machine Coding (OOP)"
description: "Applying OOP principles to design common machine coding problems with class diagrams."
sidebar:
  order: 3
---

# Machine Coding — OOP Design Problems

## Introduction

**Machine coding** rounds test your ability to design and implement OOP systems. You're given a problem and expected to create a clean, extensible class design with proper OOP principles.

---

## General Approach

1. **Understand Requirements** — What are the core features?
2. **Identify Key Entities** — Nouns = potential classes
3. **Define Relationships** — IS-A (inheritance), HAS-A (composition/aggregation)
4. **Create Class Diagram** — Properties, Methods, Relationships
5. **Write Code** — Implement with proper OOP principles
6. **Test with Scenarios** — Verify main use cases

---

## Example: Parking Lot System

### Key Classes
- `ParkingLot` — Manages floors and tickets
- `ParkingFloor` — Contains parking spots
- `ParkingSpot` — Individual spot (Small/Medium/Large)
- `Vehicle` — Bike, Car, Truck
- `Ticket` — Records entry/exit and calculates fee

---

## Example: ATM Machine

### Key Classes
- `ATM` — Machine with card reader and cash dispenser
- `BankAccount` — Encapsulated balance
- `Session` — Tracks authentication
- `Transaction` — Records operations

---

## Tips for Machine Coding

| Tip | Description |
|-----|-------------|
| **Start with entities** | Identify nouns as potential classes |
| **Define relationships** | IS-A, HAS-A associations |
| **Use encapsulation** | Private fields, public methods |
| **Think extensibility** | Can you add new types without modifying core? |
| **Handle errors** | Invalid inputs, edge cases |

---

**Previous Topic:** [Real-World Examples →](/DSA-Notes-Problems/oops/07-practice/real-world-examples)
**Next Topic:** [Interview Questions →](/DSA-Notes-Problems/oops/07-practice/interview-questions)
