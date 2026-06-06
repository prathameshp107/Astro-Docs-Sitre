---
title: "Objects, Prototypes & Classes — Interview Questions"
description: "JavaScript interview questions on objects, prototypes, prototype chain, classes, inheritance, and OOP concepts."
sidebar:
  order: 3
---

# 🟡 Objects, Prototypes & Classes

---

## Q1. What is the Prototype Chain?

**Answer:**
Every JavaScript object has a hidden `[[Prototype]]` link. When a property is accessed, JS walks up the chain until found or `null` is reached.

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

const dog = new Dog("Rex");
dog.bark();   // "Rex barks!" (own)
dog.speak();  // "Rex makes a sound" (inherited)
```

---

## Q2. What are ES6 Classes?

**Answer:**

```js
class Animal {
  #sound; // Private field (ES2022)

  constructor(name, sound) {
    this.name = name;
    this.#sound = sound;
  }

  speak() {
    return `${this.name} says ${this.#sound}`;
  }

  static create(name, sound) {
    return new Animal(name, sound);
  }

  get info() { return `${this.name}`; }
  set info(val) { this.name = val; }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "woof");
  }

  fetch() { return `${this.name} fetches the ball!`; }
}

const dog = new Dog("Rex");
dog.speak();  // "Rex says woof"
dog.fetch();  // "Rex fetches the ball!"
```

---

## Q3. Explain `Object.create()` and prototypal inheritance.

**Answer:**

```js
const animal = {
  speak() { return `${this.name} speaks`; },
  eat() { return `${this.name} eats`; }
};

// Create object with animal as prototype
const dog = Object.create(animal);
dog.name = "Rex";
dog.bark = function() { return `${this.name} barks`; };

dog.bark();   // "Rex barks" (own)
dog.speak();  // "Rex speaks" (inherited from animal)

// Check prototype chain
Object.getPrototypeOf(dog) === animal; // true

// Object.create(null) — no prototype (pure dictionary)
const dict = Object.create(null);
// No toString, hasOwnProperty, etc.
```

---

## Q4. What is `Object.assign`?

**Answer:**

```js
const target = { a: 1 };
const source = { b: 2, c: 3 };

Object.assign(target, source);
// target is now { a: 1, b: 2, c: 3 }

// Shallow clone
const clone = Object.assign({}, target);

// Merge multiple objects
const merged = Object.assign({}, obj1, obj2, obj3);

// Note: Object.assign does SHALLOW copy
const original = { a: { x: 1 } };
const copy = Object.assign({}, original);
copy.a.x = 99;
console.log(original.a.x); // 99 ← shared reference!
```

---

## Q5. What are `getter` and `setter` in JavaScript?

**Answer:**

```js
class Temperature {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  get fahrenheit() {
    return this.#celsius * 9/5 + 32;
  }

  set fahrenheit(value) {
    this.#celsius = (value - 32) * 5/9;
  }

  get celsius() { return this.#celsius; }
  set celsius(value) {
    if (value < -273.15) throw new RangeError("Below absolute zero!");
    this.#celsius = value;
  }
}

const temp = new Temperature(0);
temp.fahrenheit; // 32
temp.fahrenheit = 212;
temp.celsius; // 100
```

---

## Q6. What is the difference between deep copy and shallow copy?

**Answer:**

```js
const obj = { a: 1, b: { c: 2 } };

// Shallow copy — nested objects share reference
const shallow = { ...obj };
shallow.b.c = 99;
console.log(obj.b.c); // 99 ← mutated!

// Deep copy methods:

// 1. JSON (simple but limited — no functions/undefined)
const deep = JSON.parse(JSON.stringify(obj));

// 2. structuredClone (modern, recommended)
const deep2 = structuredClone(obj);

// 3. Lodash
import _ from "lodash";
const deep3 = _.cloneDeep(obj);
```

---

## Q7. What is `structuredClone()`?

**Answer:**

```js
// Modern deep clone (no need for JSON tricks or lodash)
const original = {
  name: "Alice",
  address: { city: "Mumbai" },
  hobbies: ["reading", "coding"],
  date: new Date(),
  set: new Set([1, 2, 3]),
  map: new Map([["key", "value"]])
};

const clone = structuredClone(original);
clone.address.city = "Delhi";

console.log(original.address.city); // "Mumbai" ✅ not affected

// Supports: Date, Set, Map, ArrayBuffer, RegExp, etc.
// Does NOT support: functions, DOM nodes, class instances
```

---

## Q8. What are property descriptors in JavaScript?

**Answer:**

```js
const obj = { name: "Alice" };
Object.getOwnPropertyDescriptor(obj, "name");
// {
//   value: "Alice",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

// Making properties immutable
Object.defineProperty(obj, "ID", {
  value: 12345,
  writable: false,
  enumerable: false,
  configurable: false
});

// Copy with descriptors (unlike spread which loses accessors)
const copy = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
```

---

## Q9. What is the difference between `Object.freeze()` and `Object.seal()`?

**Answer:**

```js
// Object.freeze() — read-only, cannot modify/add/delete
const frozen = Object.freeze({ name: "Alice", age: 30 });
frozen.name = "Bob";   // ❌ silently fails (or throws in strict)
frozen.city = "NYC";   // ❌ cannot add
delete frozen.age;     // ❌ cannot delete

// Object.seal() — can modify existing, but cannot add/delete
const sealed = Object.seal({ name: "Alice", age: 30 });
sealed.name = "Bob";   // ✅ modification allowed
sealed.city = "NYC";   // ❌ cannot add
delete sealed.age;     // ❌ cannot delete

// Check
Object.isFrozen(frozen); // true
Object.isSealed(sealed); // true

// ⚠️ Both are SHALLOW — nested objects are NOT frozen/sealed
```

---

## Q10. Implement a deep clone function from scratch.

**Answer:**

```js
function deepClone(value, visited = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;

  // Handle circular references
  if (visited.has(value)) return visited.get(value);

  // Handle special types
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Set) {
    const clone = new Set();
    visited.set(value, clone);
    value.forEach(item => clone.add(deepClone(item, visited)));
    return clone;
  }
  if (value instanceof Map) {
    const clone = new Map();
    visited.set(value, clone);
    value.forEach((v, k) => clone.set(deepClone(k, visited), deepClone(v, visited)));
    return clone;
  }

  // Handle arrays and objects
  const clone = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  visited.set(value, clone);

  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key], visited);
  }

  return clone;
}
```
