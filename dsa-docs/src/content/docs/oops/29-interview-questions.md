---
title: "OOP Interview Questions"
description: "Comprehensive collection of OOP interview questions from beginner to advanced levels."
sidebar:
  order: 29
---

# OOP Interview Questions

## Introduction

This page contains **100+ interview questions** covering all OOP topics. Questions are categorized by difficulty (Easy, Medium, Advanced) and topic.

---


## Topic 1: Fundamentals

### Easy
1. **What is Object-Oriented Programming?** — A paradigm that organizes code around objects containing data and behavior.
2. **What are the four pillars of OOP?** — Encapsulation, Abstraction, Inheritance, Polymorphism.
3. **What is the difference between a class and an object?** — A class is a blueprint; an object is an instance of a class.
4. **What is a constructor?** — A special method called when an object is created to initialize its state.
5. **What is the `this` keyword?** — A reference to the current object instance.

### Medium
6. **What's the difference between procedural and OOP programming?** — Procedural uses functions operating on separate data; OOP bundles data and behavior in objects.
7. **What is the difference between method overloading and overriding?** — Overloading: same name, different params (compile-time). Overriding: child redefines parent method (run-time).
8. **What is the difference between static and instance members?** — Static belongs to the class; instance belongs to the object.
9. **What is a default constructor?** — A no-argument constructor provided automatically if no constructor is defined.
10. **What is constructor chaining?** — Calling one constructor from another (using `this()` or `super()`).

### Advanced
11. **How does JavaScript implement OOP compared to Java?** — JavaScript uses prototypal inheritance; Java uses classical inheritance with classes.
12. **Explain the `new` keyword's internal workings.** — Creates new object, sets prototype, calls constructor with `this` bound to new object.
13. **What is the difference between `__init__` and `__new__` in Python?** — `__new__` creates the object (returns instance), `__init__` initializes it (sets state).
14. **What is the expression problem and how does OOP address it?** — Adding new types vs operations. OOP makes adding types easy (new subclass) but adding operations harder.

---

## Topic 2: Encapsulation

### Easy
15. **What is encapsulation?** — Bundling data and methods within a class, hiding internal state.
16. **What are access modifiers?** — Keywords controlling visibility: public, private, protected.
17. **Why use getters and setters?** — To control access and add validation logic.

### Medium
18. **How is encapsulation implemented in JavaScript?** — Using `#` private fields, closures, or WeakMap.
19. **What's the difference between data hiding and encapsulation?** — Data hiding specifically refers to making fields private; encapsulation is the broader concept of bundling.
20. **How does encapsulation improve maintainability?** — Changes to internal implementation don't affect external code.

### Advanced
21. **What's the difference between JavaScript's `#private` and TypeScript's `private`?** — `#` is truly private at runtime; TS `private` is only enforced at compile time.
22. **How do you encapsulate internal collections safely?** — Return copies or immutable wrappers instead of direct references.
23. **When is it appropriate to break encapsulation?** — Sometimes for performance (e.g., caching internal state is acceptable).

---

## Topic 3: Abstraction

### Easy
24. **What is abstraction?** — Hiding complex implementation details and showing only essential features.
25. **What is an abstract class?** — A class that can't be instantiated; may contain abstract methods.
26. **What is an interface?** — A contract defining methods that implementing classes must provide.

### Medium
27. **How is abstraction different from encapsulation?** — Abstraction hides *implementation*; encapsulation hides *data*.
28. **What's the difference between abstract class and interface?** — Abstract classes can have state and concrete methods; interfaces are pure contracts (traditionally).
29. **When would you use an abstract class vs an interface?** — Abstract class for shared code among related classes; interface for capabilities across unrelated classes.

### Advanced
30. **How do interfaces enable loose coupling?** — Code depends on the interface, not concrete implementation — swap implementations freely.
31. **Explain the Template Method pattern.** — Abstract class defines algorithm skeleton; subclasses implement specific steps.
32. **What is Duck Typing?** — "If it walks like a duck and quacks like a duck..." — objects are identified by their methods, not their type.

---

## Topic 4: Inheritance

### Easy
33. **What is inheritance?** — A mechanism where a child class inherits properties and methods from a parent class.
34. **What is the `super` keyword?** — Used to call parent class constructors and methods.
35. **What is method overriding?** — Child class providing its own implementation of a parent method.

### Medium
36. **What are the different types of inheritance?** — Single, Multilevel, Hierarchical, Multiple (not supported in Java/JS), Hybrid.
37. **What is the diamond problem?** — Ambiguity when a class inherits from two classes that both inherit from the same grandparent.
38. **What is Liskov Substitution Principle?** — Subtypes must be substitutable for their base types without altering program correctness.

### Advanced
39. **How does JavaScript prototypal inheritance work?** — Objects inherit from other objects through prototype chain; no classes (before ES6).
40. **What's the difference between `extends` and `implements`?** — `extends` inherits implementation; `implements` fulfills a contract.
41. **Why is composition preferred over inheritance?** — More flexible, less coupling, easier to change at runtime.
42. **What is the fragile base class problem?** — Changes in the base class can break derived classes unexpectedly.

---

## Topic 5: Polymorphism

### Easy
43. **What is polymorphism?** — "Many forms" — objects of different types respond to the same method call differently.
44. **What's the difference between compile-time and run-time polymorphism?** — Compile-time (overloading) resolved during compilation; run-time (overriding) resolved during execution.

### Medium
45. **What is dynamic dispatch?** — The mechanism by which the correct overridden method is called at runtime.
46. **How does polymorphism support the Open/Closed Principle?** — New types can be added without modifying existing code.
47. **What is a virtual method?** — A method that can be overridden (default in many languages, requires `virtual` keyword in C++).

### Advanced
48. **How do virtual tables (vtables) work?** — Each class has a table of function pointers; objects have a pointer to their class's vtable.
49. **What is the difference between structural and nominal typing for polymorphism?** — Structural typing checks shape (TypeScript); nominal typing checks explicit type name (Java).
50. **Explain covariance and contravariance in method overriding.** — Covariant: return type can be a subtype. Contravariant: parameter types can be supertypes.

---

## Topic 6: SOLID Principles

### Easy
51. **What does SOLID stand for?** — Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
52. **What is the Single Responsibility Principle?** — A class should have only one reason to change.
53. **What is the Open/Closed Principle?** — Classes should be open for extension but closed for modification.

### Medium
54. **Give an example of violating LSP.** — A `Square` extending `Rectangle` where setting width also changes height.
55. **What is Interface Segregation Principle?** — Many specific interfaces are better than one general interface.
56. **What is Dependency Inversion Principle?** — Depend on abstractions, not concrete implementations.

### Advanced
57. **How does SRP relate to the concept of "actor"?** — SRP says each class should serve one actor (user role) that would request changes.
58. **How do you detect LSP violations?** — If substituting a subtype breaks code that works with the base type.
59. **What's the relationship between DIP and Dependency Injection?** — DIP is the principle; DI is a technique that implements it.

---

## Topic 7: Relationships (Association, Aggregation, Composition)

### Easy
60. **What is association?** — A relationship where objects know about each other.
61. **What is aggregation?** — A "has-a" relationship with weak ownership (child can exist without parent).
62. **What is composition?** — A "has-a" relationship with strong ownership (child cannot exist without parent).

### Medium
63. **How do you represent aggregation vs composition in UML?** — Aggregation: empty diamond (◊). Composition: filled diamond (◆).
64. **What is the difference between association and dependency?** — Association is a structural relationship; dependency is a weaker temporary relationship (used as parameter).

### Advanced
65. **How does composition affect garbage collection?** — When the parent is collected, child components are also eligible for GC.
66. **When would you use a bidirectional vs unidirectional association?** — Unidirectional is simpler; bidirectional is needed when both sides need to navigate.

---

## Topic 8: Memory & Lifecycle

### Easy
67. **What is stack memory?** — Stores primitives and references; fast, LIFO, automatic cleanup.
68. **What is heap memory?** — Stores objects; managed by garbage collector.
69. **What is garbage collection?** — Automatic process of reclaiming memory from unreachable objects.

### Medium
70. **How does pass-by-reference work for objects?** — Variable holds a reference (pointer) to the object, not the object itself.
71. **What causes memory leaks in OOP?** — Forgotten references, uncleared timers, unremoved event listeners.
72. **What is the mark-and-sweep algorithm?** — GC marks reachable objects from roots, then sweeps (frees) unmarked objects.

### Advanced
73. **What are weak references and when to use them?** — References that don't prevent GC; useful for caches and listeners.
74. **How do closures create memory leaks?** — Inner function holds reference to outer scope variables, preventing GC.
75. **What is object pooling and when is it useful?** — Reusing objects instead of creating/destroying; useful for expensive objects.

---

## Topic 9: Design Principles

### Easy
76. **What is DRY?** — Don't Repeat Yourself — avoid code duplication.
77. **What is KISS?** — Keep It Simple, Stupid — favor simple solutions.
78. **What is YAGNI?** — You Ain't Gonna Need It — don't add features before they're needed.

### Medium
79. **Why is "favor composition over inheritance" a good practice?** — More flexible, less coupling, runtime behavior changes.
80. **What does "program to an interface, not an implementation" mean?** — Depend on abstractions to reduce coupling.
81. **When would you violate DRY intentionally?** — When the wrong abstraction is worse than duplication.

### Advanced
82. **How do design principles relate to each other?** — SRP supports high cohesion; DIP reduces coupling; DRY reduces duplication.
83. **What is the Law of Demeter?** — "Don't talk to strangers" — only interact with immediate dependencies.
84. **How do you balance YAGNI with good design?** — Build for what you know; don't build for what you speculate.

---

## Topic 10: Language-Specific

### JavaScript
85. **How does prototypal inheritance work?** — Objects inherit from objects through `__proto__` chain.
86. **What's the difference between `class` and function constructors?** — `class` is syntactic sugar over prototype-based inheritance.
87. **How does `this` work in arrow functions vs regular functions?** — Arrow functions inherit `this` from surrounding scope; regular functions have their own `this`.

### TypeScript
88. **What TypeScript features support OOP?** — Interfaces, generics, access modifiers, abstract classes, decorators.
89. **How do `private` and `#private` differ?** — TS `private` is compile-time only; `#private` is a native JS runtime private field.

### Python
90. **What is `self` in Python?** — The first parameter of instance methods, referring to the instance itself.
91. **How does Python handle multiple inheritance?** — Through MRO (Method Resolution Order) — C3 linearization algorithm.
92. **What are `@classmethod` and `@staticmethod`?** — `@classmethod` receives the class as first argument; `@staticmethod` receives nothing.

### Java
93. **What is the `final` keyword in Java?** — On class: prevents inheritance. On method: prevents overriding. On variable: makes it constant.
94. **What is the difference between `abstract class` and `interface` in Java?** — Abstract class can have fields and concrete methods; interface is a pure contract (before Java 8).
95. **What are default methods in Java 8+ interfaces?** — Methods with default implementation in interfaces.

---

## Quick Answer Tips

| Question | Key Answer |
|----------|------------|
| **OOP vs procedural** | OOP bundles data + behavior; procedural separates them |
| **Encapsulation** | Hide data, expose methods |
| **Abstraction** | Hide implementation, show interface |
| **Inheritance** | IS-A relationship, code reuse |
| **Polymorphism** | Same interface, different behavior |
| **SOLID** | Principles for maintainable OOP |
| **Composition** | HAS-A over IS-A |

---

## Summary

Master these questions by understanding the **why** behind each concept, not just the definitions. Practice implementing small OOP systems (Parking Lot, Library, ATM) to solidify understanding.

---

**Previous Topic:** [Machine Coding →](/DSA-Notes-Problems/oops/28-machine-coding)
**Next Topic:** [OOP Cheat Sheet →](/DSA-Notes-Problems/oops/30-oops-cheatsheet)
**Related Topics:** [All OOP Topics](/DSA-Notes-Problems/oops/01-what-is-oops)
