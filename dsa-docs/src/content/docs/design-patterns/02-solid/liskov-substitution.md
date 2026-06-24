---
title: "L — Liskov Substitution"
description: "Subtypes must be substitutable for their base types. Real-world examples with JavaScript."
sidebar:
  order: 3
---

## L — Liskov Substitution Principle

> **If you have a base class, you should be able to use any of its subclasses without breaking the program.**

A subclass should **extend** behavior, not **break** it.

### Real-World Analogy

> If a vending machine accepts any coin (₹1, ₹2, ₹5, ₹10), then each coin type must work the same way — insert, recognize, add value. If a ₹10 coin crashes the machine, it violates LSP.

---

## ❌ Bad Example

```js
class Bird {
  fly() {
    return 'I can fly!';
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly!");
  }
}

function makeBirdFly(bird) {
  console.log(bird.fly());
}

const sparrow = new Bird();
makeBirdFly(sparrow); // "I can fly!"

const penguin = new Penguin();
makeBirdFly(penguin); // 💥 Error! Breaks the program
```

**Why it hurts:** The program assumes all `Bird` instances can fly. `Penguin` breaks that assumption, causing runtime errors.

---

## ✅ Fixed Example

```js
class Bird {
  // Common bird behavior
}

class FlyingBird extends Bird {
  fly() {
    return 'I can fly!';
  }
}

class NonFlyingBird extends Bird {
  // No fly method — doesn't break anything
}

class Sparrow extends FlyingBird {}
class Penguin extends NonFlyingBird {}

function makeBirdFly(bird) {
  if (bird instanceof FlyingBird) {
    console.log(bird.fly());
  } else {
    console.log('This bird cannot fly.');
  }
}

makeBirdFly(new Sparrow()); // "I can fly!"
makeBirdFly(new Penguin()); // "This bird cannot fly."
```

---

## The Rectangle-Square Problem

A classic LSP violation:

```js
class Rectangle {
  setWidth(w) { this.width = w; }
  setHeight(h) { this.height = h; }
  getArea() { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(w) {
    this.width = w;
    this.height = w; // 😬 Side effect!
  }
  setHeight(h) {
    this.width = h;
    this.height = h;
  }
}

function resize(rect) {
  rect.setWidth(5);
  rect.setHeight(10);
  console.log(rect.getArea()); // Expect 50
}

resize(new Rectangle()); // 50 ✅
resize(new Square());    // 100 ❌ Broken!
```

**Solution:** Don't force inheritance where the contract differs. Use composition instead.

---

## Signs of LSP Violation

- Subclass overrides a method to throw an error
- Subclass has methods that do nothing
- Client code checks `instanceof` before using a method
- Subclass changes the expected behavior of a base method

---

## In Simple Words

- Subclasses should **do what the parent promised**
- If a subclass **breaks** the parent's behavior, it's not a true "is-a" relationship
- Don't throw errors for methods the parent defined
- Prefer **composition** over inheritance when behavior differs
