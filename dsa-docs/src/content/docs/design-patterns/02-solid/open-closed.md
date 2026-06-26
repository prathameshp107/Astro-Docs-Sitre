---
title: "O — Open/Closed"
description: "Classes should be open for extension but closed for modification. Real-world examples with JavaScript."
sidebar:
  order: 2
---

## O — Open/Closed Principle

> **Classes should be open for extension, closed for modification.**

Add new behavior by **extending**, not by changing existing code.

### Real-World Analogy

> A power outlet is **closed for modification** — you don't rewire it. But it's **open for extension** — you plug in new devices.

---

## ❌ Bad Example

```js
class PaymentProcessor {
  process(method, amount) {
    if (method === 'credit') {
      this.#processCredit(amount);
    } else if (method === 'debit') {
      this.#processDebit(amount);
    }
    // ❌ Every new payment type = modify this class
  }

  #processCredit(amount) { /* ... */ }
  #processDebit(amount) { /* ... */ }
}
```

**Why it hurts:** To add PayPal, you must **modify** `PaymentProcessor`. This risks breaking existing payments.

---

## ✅ Fixed Example

```js
// Closed for modification
class PaymentProcessor {
  process(paymentMethod, amount) {
    paymentMethod.pay(amount);
  }
}

// Open for extension — just add new classes
class CreditCard {
  pay(amount) {
    console.log(`Paid $${amount} with Credit Card`);
  }
}

class DebitCard {
  pay(amount) {
    console.log(`Paid $${amount} with Debit Card`);
  }
}

class PayPal {
  pay(amount) {
    console.log(`Paid $${amount} with PayPal`);
  }
}

// Usage
const processor = new PaymentProcessor();
processor.process(new PayPal(), 100); // "Paid $100 with PayPal"
```

Add a new payment method? Just create a new class. **No existing code changes.**

---

## How to Spot Violations

- `switch` / `if-else` chains checking a "type" field
- Adding a new feature means editing existing files
- "I need to add one more case here..."

## When It's OK to Modify

- **Bug fixes** in existing behavior
- **Refactoring** to improve internal structure (same external behavior)

---

## In Simple Words

- Write code that you can **add to** without **changing**
- Use **polymorphism** instead of conditionals
- New features = new classes, not new `if` statements
- Protects existing, working code from breaking
