---
title: "Classes"
description: "Class syntax, constructor, methods, extends/super, getters/setters, static members, and private fields."
sidebar:
  order: 20
---

## Classes

ES6 classes are **syntactic sugar** over JavaScript's existing prototype-based inheritance. They make the pattern cleaner and more familiar for developers coming from class-based languages.

### Basic Class

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

const dog = new Animal("Rex");
dog.speak(); // "Rex makes a sound"
```

### Constructor

The `constructor` method runs automatically when you use `new`. It's where you set up instance properties.

```javascript
class User {
  constructor(name, role = "user") {
    this.name = name;
    this.role = role;
  }
}

const admin = new User("Alice", "admin");
const guest = new User("Bob");
// guest.role → "user"
```

### Instance Methods

Methods on a class are added to the prototype — shared across all instances.

```javascript
class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

const calc = new Calculator();
calc.add(5, 3); // 8
```

### `extends` & `super`

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // call parent constructor
    this.breed = breed;
  }

  speak() {
    return `${super.speak()} — specifically, ${this.name} barks!`;
  }

  fetch() {
    return `${this.name} fetches the ball!`;
  }
}

const rex = new Dog("Rex", "Golden Retriever");
rex.speak(); // "Rex makes a sound — specifically, Rex barks!"
rex.fetch(); // "Rex fetches the ball!"
```

### Getters & Setters

```javascript
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }

  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }

  set fahrenheit(value) {
    this._celsius = (value - 32) * 5/9;
  }

  get celsius() { return this._celsius; }
  set celsius(value) { this._celsius = value; }
}

const temp = new Temperature(0);
temp.fahrenheit; // 32
temp.fahrenheit = 212;
temp.celsius;    // 100
```

### Static Members

Static properties and methods belong to the **class itself**, not instances.

```javascript
class MathUtils {
  static PI = 3.14159;

  static circleArea(radius) {
    return this.PI * radius * radius;
  }

  static #hidden = "private static"; // private static field
}

MathUtils.PI;           // 3.14159
MathUtils.circleArea(5); // 78.53975
```

### Private Fields (`#`)

Private fields are truly private — only accessible within the class.

```javascript
class BankAccount {
  #balance = 0;

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const acct = new BankAccount("Alice");
acct.deposit(1000);
acct.getBalance(); // 1000
acct.#balance; // ❌ SyntaxError — private!
```

### Classes Are Sugar Over Prototypes

```javascript
class Person {
  constructor(name) { this.name = name; }
  greet() { return `Hi, ${this.name}`; }
}

// Roughly equivalent to:
function Person(name) { this.name = name; }
Person.prototype.greet = function() {
  return `Hi, ${this.name}`;
};
```

### Key Takeaways

- Classes are syntactic sugar over prototypes — the inheritance model is the same
- Always call `super()` in a subclass constructor before using `this`
- Getters/setters define computed properties with access control
- `static` members belong to the class, not instances
- Private fields (`#field`) provide true encapsulation
- Use `extends` for inheritance — cleaner than manual prototype chaining
