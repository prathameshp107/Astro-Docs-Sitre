---
title: "Procedural vs OOP"
description: "Detailed comparison between Procedural Programming and Object-Oriented Programming with examples."
sidebar:
  order: 2
---

# Procedural Programming vs Object-Oriented Programming

## Introduction

When building software, developers choose a programming paradigm — a style or approach to organizing code. Two of the most common paradigms are **Procedural Programming** and **Object-Oriented Programming (OOP)**.

Understanding their differences is crucial because it affects how you design, write, test, and maintain code.

---

## Real-World Analogy: A Restaurant Kitchen

### Procedural = Fast Food Kitchen
- There's a fixed sequence of steps: take order → cook → assemble → serve
- Each station (function) does one thing: grill, fry, assemble
- Data (the burger patty, buns, toppings) moves between stations
- If one station changes, the whole workflow might break

### OOP = Fine Dining Kitchen
- Each chef (object) has their own station with tools and ingredients
- A pastry chef knows all about desserts, a saucier knows about sauces
- Chefs communicate by sending tickets (messages) to each other
- If the pastry chef changes their recipe, other stations aren't affected

---

## What is Procedural Programming?

**Procedural Programming** organizes code into sequences of instructions (procedures or functions). The program executes step-by-step, with functions operating on data.

```javascript
// Procedural: Bank Account Management
let accountHolder = "John";
let accountBalance = 1000;
let accountType = "savings";

function deposit(amount) {
  accountBalance += amount;
  console.log(`Deposited ${amount}. Balance: ${accountBalance}`);
}

function withdraw(amount) {
  if (accountBalance >= amount) {
    accountBalance -= amount;
    console.log(`Withdrew ${amount}. Balance: ${accountBalance}`);
  }
}

function applyInterest(rate) {
  if (accountType === "savings") {
    accountBalance += accountBalance * rate;
  }
}

deposit(500);
withdraw(200);
console.log(accountBalance); // 1300
```

### Problems:
- Data (`accountBalance`) is exposed and can be modified from anywhere
- To add a second account, you'd need to duplicate variables or use arrays
- Functions are tightly coupled to global state

---

## What is Object-Oriented Programming?

**OOP** organizes code into objects that combine data (properties) and behavior (methods). Each object is self-contained.

```javascript
// OOP: Bank Account Management
class BankAccount {
  constructor(holder, type, balance = 0) {
    this.holder = holder;
    this.type = type;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}. Balance: ${this.balance}`);
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}. Balance: ${this.balance}`);
    }
  }

  applyInterest(rate) {
    if (this.type === "savings") {
      this.balance += this.balance * rate;
    }
  }
}

const johnAccount = new BankAccount("John", "savings", 1000);
const janeAccount = new BankAccount("Jane", "checking", 2000);

johnAccount.deposit(500);
janeAccount.withdraw(300);
```

### Benefits:
- Data and behavior are bundled together
- Each account is a separate instance with its own state
- Internal details can be hidden (`private` fields)
- Easy to create multiple independent instances

---

## Detailed Comparison Table

| Aspect | Procedural | Object-Oriented |
|--------|-----------|-----------------|
| **Basic Unit** | Functions | Objects |
| **Data & Behavior** | Separate (data passed to functions) | Combined (data + methods in objects) |
| **Approach** | Top-down (break into steps) | Bottom-up (model entities, then interactions) |
| **Code Organization** | By functions | By classes/objects |
| **Data Security** | Low — data is exposed globally | High — data can be private |
| **Reusability** | Low — functions are specific to data | High — classes can be extended |
| **Scalability** | Poor for large systems | Excellent |
| **Maintainability** | Changes can break many functions | Changes are localized to objects |
| **Modelling Reality** | Poor — doesn't match real world | Excellent — objects mirror real entities |
| **Testing** | Harder — global state | Easier — objects are isolated |
| **Performance** | Slightly faster (less abstraction) | Slightly slower (polymorphism overhead) |
| **Learning Curve** | Low | Medium-High |

---

## Visual Comparison

```mermaid
graph LR
    subgraph Procedural["Procedural Programming"]
        D1[Data: balance] --> F1[deposit()]
        D1 --> F2[withdraw()]
        D1 --> F3[applyInterest()]
        F1 --> D1
        F2 --> D1
        F3 --> D1
    end

    subgraph OOP["Object-Oriented Programming"]
        O1[BankAccount Object]
        O1 --> P1[balance: 1000]
        O1 --> M1[deposit()]
        O1 --> M2[withdraw()]
        M1 --> P1
        M2 --> P1
    end
```

---

## When to Use Each

### Use Procedural When:
- Writing small scripts (< 500 lines)
- Building simple data processing pipelines
- Performance-critical code (game engines, embedded systems)
- Doing quick prototypes or one-off scripts
- The problem maps naturally to a sequence of steps

### Use OOP When:
- Building large, complex systems (> 10,000 lines)
- Modeling real-world entities with complex relationships
- Working on a team where code maintainability matters
- Building frameworks, libraries, or APIs
- The application has multiple components that interact

---

## Code Example: Same Problem, Both Approaches

### Problem: Manage a Library

**Procedural:**
```javascript
let books = [];
let members = [];

function addBook(title, author, isbn) {
  books.push({ title, author, isbn, borrowed: false });
}

function addMember(name, id) {
  members.push({ name, id, borrowedBooks: [] });
}

function borrowBook(memberId, isbn) {
  const book = books.find(b => b.isbn === isbn && !b.borrowed);
  const member = members.find(m => m.id === memberId);
  if (book && member) {
    book.borrowed = true;
    member.borrowedBooks.push(isbn);
  }
}

addBook("1984", "Orwell", "123");
addMember("Alice", "M1");
borrowBook("M1", "123");
```

**OOP:**
```javascript
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.borrowed = false;
  }
}

class Member {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.borrowedBooks = [];
  }

  borrow(book) {
    if (!book.borrowed) {
      book.borrowed = true;
      this.borrowedBooks.push(book.isbn);
    }
  }
}

class Library {
  constructor() {
    this.books = [];
    this.members = [];
  }

  addBook(title, author, isbn) {
    this.books.push(new Book(title, author, isbn));
  }

  registerMember(name, id) {
    this.members.push(new Member(name, id));
  }
}

const library = new Library();
library.addBook("1984", "Orwell", "123");
library.registerMember("Alice", "M1");
library.members[0].borrow(library.books[0]);
```

---

## Common Mistakes

- **Using OOP for simple problems** — Not everything needs a class
- **Using procedural for complex systems** — Spaghetti code results
- **Mixing paradigms poorly** — Inconsistent code is hard to maintain
- **Forcing OOP in non-OOP languages** — C doesn't need classes

---

## Interview Questions

**Easy:**
1. What's the main difference between procedural and OOP?
2. Which paradigm is better for large applications and why?

**Medium:**
3. Can you combine procedural and OOP in the same project?
4. How does data security differ between procedural and OOP?

**Advanced:**
5. Explain how procedural programming's global state problem relates to concurrency issues.
6. How would you refactor a large procedural codebase into OOP?

---

## Summary

| Aspect | Procedural | OOP |
|--------|-----------|-----|
| **Focus** | Functions/Steps | Objects/Entities |
| **Data** | Separate from logic | Bundled with methods |
| **Security** | Low (exposed data) | High (encapsulation) |
| **Best for** | Small scripts, simple tasks | Large systems, complex apps |

---

**Previous Topic:** [What is OOP? →](/DSA-Notes-Problems/oops/01-introduction/what-is-oops)
**Next Topic:** [Class →](/DSA-Notes-Problems/oops/02-classes-objects/class)
