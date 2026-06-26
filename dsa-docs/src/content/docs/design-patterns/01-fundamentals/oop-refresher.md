---
title: "OOP Refresher"
description: "Quick refresher on Object-Oriented Programming: encapsulation, inheritance, polymorphism, and abstraction with JS/TS examples."
sidebar:
  order: 2
---

## OOP Refresher

Most design patterns rely on **Object-Oriented Programming** concepts. Here's a quick refresher with JavaScript examples.

---

## The 4 Pillars of OOP

### 1. Encapsulation 🫖

> **Keep data private. Expose only what's needed.**

Bundle data (properties) and methods together. Hide internal details.

```js
class BankAccount {
  #balance = 0; // private field

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance()); // 100
// acc.#balance // ❌ Error — private!
```

### 2. Inheritance 👪

> **Child classes reuse parent behavior.**

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks!`;
  }
}

const dog = new Dog('Rex');
console.log(dog.speak()); // "Rex barks!"
```

### 3. Polymorphism 🎭

> **Same interface, different behavior.**

```js
class Bird extends Animal {
  speak() {
    return `${this.name} chirps!`;
  }
}

const animals = [new Dog('Rex'), new Bird('Tweety')];
animals.forEach(a => console.log(a.speak()));
// "Rex barks!"
// "Tweety chirps!"
```

### 4. Abstraction 🎛️

> **Hide complexity. Show only the essential.**

```js
class CoffeeMachine {
  // Public interface
  makeCoffee(type) {
    this.#heatWater();
    this.#grindBeans();
    return `☕ ${type} ready!`;
  }

  // Private implementation (hidden)
  #heatWater() { /* complex heating logic */ }
  #grindBeans() { /* complex grinding logic */ }
}

const machine = new CoffeeMachine();
console.log(machine.makeCoffee('Latte')); // ✅
// machine.#heatWater() // ❌ Error!
```

---

## How This Relates to Design Patterns

| OOP Concept | Related Patterns |
|-------------|-----------------|
| **Encapsulation** | Facade, Mediator, Proxy — hide complexity |
| **Inheritance** | Template Method, Factory Method — reuse & override |
| **Polymorphism** | Strategy, State, Visitor — same call, different behavior |
| **Abstraction** | Adapter, Bridge, Abstract Factory — work with interfaces, not concrete classes |

---

## In Simple Words

- **Encapsulation**: Keep internals private, expose only what's needed
- **Inheritance**: Child classes reuse parent code
- **Polymorphism**: Same method name, different implementations
- **Abstraction**: Hide complexity behind a simple interface
- Design patterns **use these OOP features** to solve problems elegantly
