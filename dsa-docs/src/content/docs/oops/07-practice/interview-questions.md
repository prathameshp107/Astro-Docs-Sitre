---
title: "OOP Interview Questions"
description: "Comprehensive collection of OOP interview questions from beginner to advanced levels."
sidebar:
  order: 4
---

# OOP Interview Questions

## Topic 1: Fundamentals

**Easy:**
1. **What is Object-Oriented Programming?** — A paradigm that organizes code around objects containing data and behavior.
2. **What are the four pillars of OOP?** — Encapsulation, Abstraction, Inheritance, Polymorphism.
3. **What is the difference between a class and an object?** — A class is a blueprint; an object is an instance of a class.
4. **What is a constructor?** — A special method called when an object is created to initialize its state.

**Medium:**
5. **What's the difference between procedural and OOP programming?** — Procedural uses functions operating on separate data; OOP bundles data and behavior in objects.
6. **What is the difference between method overloading and overriding?** — Overloading: same name, different params. Overriding: child redefines parent method.
7. **What is the difference between static and instance members?** — Static belongs to the class; instance belongs to the object.

**Advanced:**
8. **How does JavaScript implement OOP compared to Java?** — JavaScript uses prototypal inheritance; Java uses classical inheritance.
9. **Explain the `new` keyword's internal workings.** — Creates new object, sets prototype, calls constructor with `this` bound to new object.

---

## Topic 2: Encapsulation

**Easy:**
10. **What is encapsulation?** — Bundling data and methods within a class, hiding internal state.
11. **What are access modifiers?** — Keywords controlling visibility: public, private, protected.

**Medium:**
12. **How is encapsulation implemented in JavaScript?** — Using `#` private fields, closures, or WeakMap.
13. **How does encapsulation improve maintainability?** — Changes to internal implementation don't affect external code.

---

## Topic 3: Abstraction

**Easy:**
14. **What is abstraction?** — Hiding complex implementation details and showing only essential features.
15. **What is an abstract class?** — A class that can't be instantiated; may contain abstract methods.
16. **What is an interface?** — A contract defining methods that implementing classes must provide.

**Medium:**
17. **How is abstraction different from encapsulation?** — Abstraction hides *implementation*; encapsulation hides *data*.
18. **What's the difference between abstract class and interface?** — Abstract classes can have state and concrete methods; interfaces are pure contracts.

---

## Topic 4: Inheritance

**Easy:**
19. **What is inheritance?** — A mechanism where a child class inherits properties and methods from a parent class.
20. **What is the `super` keyword?** — Used to call parent class constructors and methods.
21. **What is method overriding?** — Child class providing its own implementation of a parent method.

**Medium:**
22. **What are the different types of inheritance?** — Single, Multilevel, Hierarchical, Multiple, Hybrid.
23. **What is the diamond problem?** — Ambiguity when a class inherits from two classes that share a common ancestor.

**Advanced:**
24. **How does JavaScript prototypal inheritance work?** — Objects inherit from other objects through prototype chain.
25. **Why is composition preferred over inheritance?** — More flexible, less coupling, easier to change at runtime.

---

## Topic 5: Polymorphism

**Easy:**
26. **What is polymorphism?** — "Many forms" — objects of different types respond to the same method call differently.
27. **What's the difference between compile-time and run-time polymorphism?** — Compile-time (overloading), run-time (overriding).

**Medium:**
28. **How does polymorphism support the Open/Closed Principle?** — New types can be added without modifying existing code.

---

## Topic 6: SOLID Principles

**Easy:**
29. **What does SOLID stand for?** — Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
30. **What is the Single Responsibility Principle?** — A class should have only one reason to change.

**Medium:**
31. **Give an example of violating LSP.** — A `Square` extending `Rectangle` where setting width also changes height.
32. **What is Dependency Inversion Principle?** — Depend on abstractions, not concrete implementations.

---

## Topic 7: Relationships

**Easy:**
33. **What is association?** — A relationship where objects know about each other.
34. **What is aggregation?** — A "has-a" relationship with weak ownership.
35. **What is composition?** — A "has-a" relationship with strong ownership.

**Medium:**
36. **How do you represent aggregation vs composition in UML?** — Aggregation: empty diamond. Composition: filled diamond.

---

## Topic 8: Design Principles

**Easy:**
37. **What is DRY?** — Don't Repeat Yourself.
38. **What is KISS?** — Keep It Simple, Stupid.
39. **What is YAGNI?** — You Ain't Gonna Need It.

---

**Previous Topic:** [Machine Coding →](/DSA-Notes-Problems/oops/07-practice/machine-coding)
**Next Topic:** [OOP Cheat Sheet →](/DSA-Notes-Problems/oops/07-practice/cheatsheet)
