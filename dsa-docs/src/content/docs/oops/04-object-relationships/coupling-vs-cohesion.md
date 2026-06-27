---
title: "Coupling vs Cohesion"
description: "Understanding coupling and cohesion — two key principles for measuring code quality and design."
sidebar:
  order: 6
---

# Coupling vs Cohesion

## Introduction

**Coupling** and **Cohesion** are two fundamental concepts for measuring the quality of software design. They are inversely related — good design has **high cohesion** and **low coupling**.

- **Cohesion** — How focused is a single module/class? (internal)
- **Coupling** — How dependent are modules/classes on each other? (external)

---

## Cohesion

**Cohesion** refers to how closely related the responsibilities of a single module/class are.

### High Cohesion (Good) ✅
- Class has a **single, well-defined purpose**
- All methods relate to that purpose
- Easy to understand and maintain

### Low Cohesion (Bad) ❌
- Class does **unrelated things**
- Methods are not related to each other
- Hard to understand, name, and maintain

---

## Coupling

**Coupling** refers to how dependent one module/class is on another.

### Low Coupling (Good) ✅
- Classes interact through **well-defined interfaces**
- Changes in one class rarely affect others

### High Coupling (Bad) ❌
- Classes know **too much** about each other
- Changes in one class **ripple** through the system

---

## Guidelines

| Goal | Description |
|------|-------------|
| **Aim for High Cohesion** | Each class should have one clear responsibility |
| **Aim for Low Coupling** | Classes should communicate through minimal interfaces |
| **Use DI** | Reduces coupling significantly |
| **Program to Interfaces** | Reduces implementation coupling |
| **Single Responsibility** | Naturally leads to high cohesion |

---

## Summary

| Concept | Good Design | Bad Design |
|---------|-------------|------------|
| **Cohesion (internal)** | High (focused purpose) | Low (does everything) |
| **Coupling (external)** | Low (loosely connected) | High (tightly connected) |
| **Goal** | High Cohesion + Low Coupling | |

---

**Previous Topic:** [Dependency →](/DSA-Notes-Problems/oops/04-object-relationships/dependency)
**Next Topic:** [Advanced Concepts →](/DSA-Notes-Problems/oops/05-advanced-concepts/)
