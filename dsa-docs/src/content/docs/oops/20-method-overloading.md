---
title: "Method Overloading"
description: "Understanding method overloading — multiple methods with the same name but different parameters."
sidebar:
  order: 20
---

# Method Overloading

## Introduction

**Method overloading** is a feature that allows a class to have multiple methods with the **same name** but **different parameters** (different number or types of parameters). It's a form of **compile-time polymorphism**.

### Why Does It Exist?
- To provide **convenience** — different ways to call the same operation
- To make code more **intuitive** — same operation, different inputs
- To implement **compile-time polymorphism** (static polymorphism)

### Why Do Developers Use It?
- To create flexible APIs with multiple call patterns
- To provide default behaviors for optional parameters
- To handle different types of inputs for the same operation

---

## Real-World Analogy: Ordering Coffee

"Order coffee" could mean:
- `order()` — Just coffee (default)
- `order("Latte")` — Specify type
- `order("Latte", "Large")` — Type and size
- `order("Latte", "Large", "Oat Milk")` — Type, size, and milk

Same operation, different ways to call it. That's overloading.

---

## Definition

**Method overloading** is defining multiple methods with the same name in the same class, but with different parameter lists (different number, type, or order of parameters).

---

## Why Do We Need It?

Without overloading:

```javascript
// ❌ Without overloading — different names for similar operations
class Logger {
  logMessage(message) { /* default level */ }
  logWarning(message) { /* warning level */ }
  logError(message) { /* error level */ }
  logWithLevel(level, message) { /* specific level */ }
}

// Messy API — user must remember multiple names
```

With overloading (in languages that support it):

```java
// ✅ With overloading — one name, multiple forms
class Logger {
    void log(String message) { /* default */ }
    void log(String level, String message) { /* with level */ }
    void log(String level, String message, Exception e) { /* with exception */ }
}

// Clean API — one method name for logging
```

**Note:** JavaScript doesn't support true method overloading, but can simulate it.

---

## Code Examples

### JavaScript (Simulated Overloading)

```javascript
class Calculator {
  // Simulate overloading with default parameters
  add(a, b, c) {
    if (c !== undefined) {
      return a + b + c; // 3 parameters
    }
    return a + b; // 2 parameters
  }

  // Simulate overloading with typeof checks
  format(input) {
    if (typeof input === "number") {
      return input.toFixed(2);
    } else if (typeof input === "string") {
      return input.trim();
    } else if (input instanceof Date) {
      return input.toISOString();
    }
    return String(input);
  }

  // Using rest parameters
  sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
  }
}

const calc = new Calculator();
console.log(calc.add(2, 3));      // 5
console.log(calc.add(2, 3, 4));   // 9
console.log(calc.sum(1, 2, 3, 4, 5)); // 15
console.log(calc.format(42.567));      // "42.57"
console.log(calc.format("  hello  ")); // "hello"
```

### TypeScript

```typescript
class Calculator {
  // Method overload signatures (TypeScript only)
  add(a: number, b: number): number;
  add(a: number, b: number, c: number): number;
  add(a: string, b: string): string;

  // Implementation (must be compatible with all signatures)
  add(a: number | string, b: number | string, c?: number): number | string {
    if (typeof a === "string" && typeof b === "string") {
      return a + b; // String concatenation
    }
    if (c !== undefined) {
      return (a as number) + (b as number) + c; // Three numbers
    }
    return (a as number) + (b as number); // Two numbers
  }
}

const calc = new Calculator();
console.log(calc.add(2, 3));       // 5
console.log(calc.add(2, 3, 4));    // 9
console.log(calc.add("Hello", " World")); // "Hello World"
```

### Java (True Overloading)

```java
public class Printer {
    // Different parameter types
    public void print(int value) {
        System.out.println("Integer: " + value);
    }

    public void print(double value) {
        System.out.println("Double: " + value);
    }

    public void print(String value) {
        System.out.println("String: " + value);
    }

    // Different number of parameters
    public void print(String message, int times) {
        for (int i = 0; i < times; i++) {
            System.out.println(message);
        }
    }

    // Different order of parameters (not just names!)
    public void print(int id, String name) {
        System.out.println(id + ": " + name);
    }

    public void print(String name, int id) {
        System.out.println(name + " has ID " + id);
    }
}

// Usage
Printer p = new Printer();
p.print(42);              // "Integer: 42"
p.print(3.14);            // "Double: 3.14"
p.print("Hello");         // "String: Hello"
p.print("Hi", 3);         // Prints "Hi" three times
p.print(1, "Alice");      // "1: Alice"
p.print("Bob", 2);        // "Bob has ID 2"
```

### Python (No Overloading — Uses Default Parameters)

```python
class Display:
    # Python doesn't support method overloading
    # Instead, use default parameters and type checking
    
    def show(self, a, b=None, c=None):
        if b is None and c is None:
            return f"One parameter: {a}"
        elif c is None:
            return f"Two parameters: {a}, {b}"
        else:
            return f"Three parameters: {a}, {b}, {c}"

d = Display()
print(d.show(1))          # "One parameter: 1"
print(d.show(1, 2))       # "Two parameters: 1, 2"
print(d.show(1, 2, 3))    # "Three parameters: 1, 2, 3"
```

---

## Constructor Overloading

Multiple constructors with different parameters:

```java
public class Message {
    private String text;
    private String sender;
    private long timestamp;

    // No-arg constructor
    public Message() {
        this("", "System"); // Calls the 2-param constructor
    }

    // One parameter
    public Message(String text) {
        this(text, "Anonymous");
    }

    // Two parameters
    public Message(String text, String sender) {
        this.text = text;
        this.sender = sender;
        this.timestamp = System.currentTimeMillis();
    }
}
```

---

## Method Overloading vs Default Parameters

| Aspect | Method Overloading | Default Parameters |
|--------|-------------------|-------------------|
| **Languages** | Java, C++, C# | JavaScript, Python, TypeScript |
| **Mechanism** | Multiple method definitions | Single method with defaults |
| **Flexibility** | Different logic per overload | Same logic, varying defaults |
| **Type safety** | Type-safe (static typing) | Varies by language |
| **Maintenance** | More code (multiple methods) | Less code |

---

## Best Practices

- Use overloading for **related operations** with different inputs
- Keep overloaded methods **consistent** (same behavior, different inputs)
- Avoid **too many overloads** — more than 3-4 becomes confusing
- Consider **default parameters** where supported
- Use **descriptive parameter names** to clarify each overload

---

## Common Mistakes

- **Overloading with same number/type of parameters** — not valid
- **Confusing overloading with overriding** — overloading is same class, different params; overriding is subclass, same signature
- **Too many overloads** — confusing API
- **Inconsistent behavior** across overloads (different overloads do different things)

---

## Interview Questions

**Easy:**
1. What is method overloading?
2. How is overloading different from overriding?

**Medium:**
3. Can you overload methods by changing only the return type?
4. Why doesn't JavaScript support true method overloading?

**Advanced:**
5. How does Java resolve which overloaded method to call?
6. How do default parameters provide an alternative to overloading?

---

## Summary

| Concept | Key Point |
|---------|-----------|
| **Overloading** | Same name, different parameters |
| **Type** | Compile-time polymorphism |
| **Resolution** | Based on parameter count, types, order |
| **Return type** | NOT considered for overloading |
| **Languages** | Java yes, JavaScript no (uses defaults) |
| **Purpose** | Convenience, intuitive APIs |

---

**Previous Topic:** [Static Members →](/DSA-Notes-Problems/oops/19-static-members)
**Next Topic:** [Method Overriding →](/DSA-Notes-Problems/oops/21-method-overriding)
**Related Topics:** [Polymorphism](/DSA-Notes-Problems/oops/11-polymorphism)
