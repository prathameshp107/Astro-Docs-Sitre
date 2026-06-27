---
title: "Real-World OOP Examples"
description: "Complete real-world examples demonstrating OOP principles in action across different domains."
sidebar:
  order: 2
---

# Real-World OOP Examples

## 1. E-Commerce System

Demonstrates classes, inheritance, polymorphism, and composition.

```javascript
class User {
  constructor(id, name, email) {
    this.id = id; this.name = name; this.email = email;
  }
  login() { console.log(`${this.name} logged in`); }
}

class Customer extends User {
  constructor(id, name, email) {
    super(id, name, email);
    this.cart = new ShoppingCart();
  }
  addToCart(product, quantity = 1) { this.cart.addItem(product, quantity); }
  placeOrder() {
    const order = new Order(this, this.cart.getItems());
    this.cart.clear();
    return order;
  }
}

class Product {
  constructor(id, name, price, stock) {
    this.id = id; this.name = name; this.price = price; this.stock = stock;
  }
}

class ShoppingCart {
  constructor() { this.items = []; }
  addItem(product, quantity = 1) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) existing.quantity += quantity;
    else this.items.push({ product, quantity });
  }
  getTotal() { return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0); }
  clear() { this.items = []; }
  getItems() { return [...this.items]; }
}

class Order {
  constructor(customer, items) {
    this.id = Date.now();
    this.customer = customer;
    this.items = items;
    this.status = "pending";
    this.total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }
  processPayment() { this.status = "paid"; }
}
```

---

## 2. Library Management System

```javascript
class Book {
  constructor(isbn, title, author) {
    this.isbn = isbn; this.title = title; this.author = author;
    this.isBorrowed = false;
  }
}

class Member {
  constructor(id, name) {
    this.id = id; this.name = name; this.borrowedBooks = [];
  }
  borrowBook(book) {
    if (book.isBorrowed) throw new Error(`'${book.title}' is already borrowed`);
    if (this.borrowedBooks.length >= 5) throw new Error("Borrowing limit reached");
    book.isBorrowed = true;
    this.borrowedBooks.push(book);
  }
  returnBook(book) {
    const index = this.borrowedBooks.findIndex(b => b.isbn === book.isbn);
    book.isBorrowed = false;
    this.borrowedBooks.splice(index, 1);
  }
}

class Library {
  constructor(name) { this.name = name; this.books = []; this.members = []; }
  addBook(book) { this.books.push(book); }
  addMember(member) { this.members.push(member); }
}
```

---

## 3. Banking System

```javascript
class Account {
  constructor(accountNumber, holderName) {
    this.accountNumber = accountNumber;
    this.holderName = holderName;
    this.balance = 0;
    this.transactions = [];
  }
  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
    this.transactions.push({ type: "deposit", amount, date: new Date(), balance: this.balance });
  }
  withdraw(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
    this.transactions.push({ type: "withdrawal", amount, date: new Date(), balance: this.balance });
  }
}

class SavingsAccount extends Account {
  constructor(accountNumber, holderName, interestRate = 0.02) {
    super(accountNumber, holderName);
    this.interestRate = interestRate;
    this.minimumBalance = 500;
  }
  withdraw(amount) {
    if (this.balance - amount < this.minimumBalance)
      throw new Error(`Must maintain minimum balance of $${this.minimumBalance}`);
    super.withdraw(amount);
  }
  applyInterest() {
    const interest = this.balance * this.interestRate;
    this.deposit(interest);
  }
}
```

---

## 4. Notification System (Polymorphism)

```javascript
class EmailChannel {
  send(recipient, message) { console.log(`📧 Email to ${recipient}: ${message}`); }
}
class SMSChannel {
  send(recipient, message) { console.log(`📱 SMS to ${recipient}: ${message}`); }
}
class PushChannel {
  send(recipient, message) { console.log(`🔔 Push to ${recipient}: ${message}`); }
}

class NotificationService {
  constructor() { this.channels = new Map(); }
  registerChannel(name, channel) { this.channels.set(name, channel); }
  send(channelName, recipient, message) {
    const channel = this.channels.get(channelName);
    channel.send(recipient, message);
  }
}
```

---

**Previous Topic:** [Practice →](/DSA-Notes-Problems/oops/07-practice/)
**Next Topic:** [Machine Coding →](/DSA-Notes-Problems/oops/07-practice/machine-coding)
