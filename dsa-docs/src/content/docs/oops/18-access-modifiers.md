---
title: "Access Modifiers"
description: "Understanding access modifiers — controlling visibility and access to class members."
sidebar:
  order: 18
---

# Access Modifiers

## Introduction

**Access modifiers** (also called access specifiers) determine the **visibility** and **accessibility** of class members (properties and methods). They are fundamental to **encapsulation** — they control what parts of a class are exposed to the outside world.

### Why Does It Exist?
- To implement **encapsulation** (data hiding)
- To define a **public API** while hiding internal details
- To enforce **controlled access** to class members

### Why Do Developers Use It?
- To protect internal state from external modification
- To create clear contracts (what's public = what's supported)
- To communicate intent (private = implementation detail)

---

## Real-World Analogy: Building Access

| Access Level | Building Analogy |
|-------------|------------------|
| **Public** | Lobby, reception — anyone can enter |
| **Protected** | Employee offices — employees and managers can enter |
| **Private** | Server room — only authorized personnel |

---

## Common Access Modifiers

| Modifier | Class | Subclass | External |
|----------|-------|----------|----------|
| **public** | ✅ | ✅ | ✅ |
| **protected** | ✅ | ✅ | ❌ |
| **private** | ✅ | ❌ | ❌ |
| **(default)*** | ✅ | Same package only | Same package only |

*Default varies by language (Java: package-private, TypeScript: public)

---

## Code Examples

### JavaScript

```javascript
class BankAccount {
  // Public field
  accountHolder;

  // Private field (ES2020+)
  #balance;
  #transactions;

  constructor(holder, initialBalance) {
    this.accountHolder = holder;  // Public
    this.#balance = initialBalance; // Private
    this.#transactions = [];       // Private
  }

  // Public method
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      this.#addTransaction("deposit", amount);
    }
  }

  // Public method
  getBalance() {
    return this.#balance;
  }

  // Private method
  #addTransaction(type, amount) {
    this.#transactions.push({ type, amount, date: new Date() });
  }
}

const account = new BankAccount("Alice", 1000);
console.log(account.accountHolder); // "Alice"
console.log(account.getBalance());  // 1000
// console.log(account.#balance);   // ❌ SyntaxError: private field
// account.#addTransaction();       // ❌ SyntaxError: private method
```

### TypeScript

```typescript
class Employee {
  // Public — accessible everywhere (default)
  public name: string;

  // Private — only within this class
  private salary: number;

  // Protected — within class and subclasses
  protected department: string;

  // Readonly — can be set only in constructor
  readonly id: number;

  constructor(name: string, salary: number, department: string, id: number) {
    this.name = name;
    this.salary = salary;
    this.department = department;
    this.id = id;
  }

  public getSalary(): number {
    return this.salary; // Private — accessible within class
  }

  private calculateBonus(): number {
    return this.salary * 0.1;
  }
}

class Manager extends Employee {
  constructor(name: string, salary: number, id: number) {
    super(name, salary, "Management", id);
    console.log(this.department); // ✅ Protected — accessible in subclass
    // console.log(this.salary);  // ❌ Private — NOT accessible in subclass
  }
}

const emp = new Employee("Alice", 50000, "Engineering", 1);
console.log(emp.name);            // ✅ Public
console.log(emp.id);              // ✅ Readonly
// console.log(emp.salary);       // ❌ Private
// console.log(emp.department);   // ❌ Protected
```

### Python

```python
class User:
    def __init__(self, username: str, email: str, password: str):
        self.username = username      # Public
        self._email = email           # Protected (convention)
        self.__password = password    # Private (name mangling)

    # Public method
    def login(self, password: str) -> bool:
        return self.__verify_password(password)

    # Private method
    def __verify_password(self, password: str) -> bool:
        return self.__password == password

    # Protected method
    def _hash_password(self) -> str:
        return f"hashed_{self.__password}"


class AdminUser(User):
    def get_email(self) -> str:
        return self._email  # ✅ Protected — accessible in subclass

    def get_password(self) -> str:
        # return self.__password  # ❌ Cannot access private
        return "Not accessible"

# Usage
user = User("alice", "alice@example.com", "secret123")
print(user.username)   # ✅ Public
print(user._email)     # ⚠️ Accessible but by convention protected
# print(user.__password)  # ❌ AttributeError (name mangling)
# print(user.__verify_password("test"))  # ❌ AttributeError
```

### Java

```java
public class Vehicle {
    public String make;           // Accessible everywhere
    private String vin;           // Only within Vehicle
    protected String model;       // Vehicle + subclasses + same package
    int year;                     // Default (package-private)

    public Vehicle(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.vin = generateVIN();
    }

    public String getVIN() {
        return this.vin; // Accessible via public method
    }

    private String generateVIN() {
        return Math.random() + ""; // Only accessible within class
    }
}

public class Car extends Vehicle {
    public Car(String make, String model, int year) {
        super(make, model, year);
        System.out.println(this.model); // ✅ Protected
        // System.out.println(this.vin); // ❌ Private
        // System.out.println(this.generateVIN()); // ❌ Private
    }
}
```

---

## Access Modifiers by Language

| Modifier | JavaScript | TypeScript | Python | Java |
|----------|-----------|------------|--------|------|
| **public** | Default | `public` keyword | Default | `public` keyword |
| **private** | `#field` | `private` keyword | `__field` (name mangling) | `private` keyword |
| **protected** | Not natively | `protected` keyword | `_field` (convention) | `protected` keyword |
| **readonly** | N/A | `readonly` keyword | N/A | `final` keyword |
| **static** | `static` keyword | `static` keyword | `@staticmethod` | `static` keyword |

---

## Best Practices

- **Default to private** — Make fields private; expose only what's needed
- **Use public for API** — Public members are your contract with consumers
- **Use protected sparingly** — Protected creates coupling to subclasses
- **Provide getters/setters** instead of making fields public
- **Don't expose internal collections** — Return copies or immutable wrappers
- **Prefer methods over public fields** for future flexibility

---

## Common Mistakes

- **Making everything public** — Destroys encapsulation
- **Making everything private** — Makes testing and extension difficult
- **Using protected for internal code** — Creates unwanted coupling
- **Exposing mutable internal state** — Return copies of internal arrays/objects
- **Confusing JS `#` with TS `private`** — `#` is truly private, TS `private` is compile-time only

---

## Interview Questions

**Easy:**
1. What are access modifiers and why are they used?
2. What's the difference between public, private, and protected?

**Medium:**
3. How does JavaScript's `#` private field differ from TypeScript's `private`?
4. What's the default access level in different languages?

**Advanced:**
5. How do access modifiers support encapsulation?
6. Why might you choose `protected` over `public` for a method?

---

## Summary

| Modifier | Visibility | Use Case |
|----------|-----------|----------|
| **public** | Everyone | API, interface methods |
| **protected** | Class + subclasses | Shared behavior for inheritance |
| **private** | Only the class | Internal implementation details |
| **Rule of Thumb** | Start private, open up as needed | |

---

**Previous Topic:** [SOLID Principles →](/DSA-Notes-Problems/oops/17-solid-principles)
**Next Topic:** [Static Members →](/DSA-Notes-Problems/oops/19-static-members)
**Related Topics:** [Encapsulation](/DSA-Notes-Problems/oops/08-encapsulation)
