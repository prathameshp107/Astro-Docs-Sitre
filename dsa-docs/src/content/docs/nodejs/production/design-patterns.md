---
title: "Design Patterns in Node.js"
description: "MVC pattern, Repository pattern, and Dependency Injection in Node.js applications."
sidebar:
  order: 5
---

# Design Patterns

## 🏗️ MVC Pattern (Model-View-Controller)

The most common architecture pattern. Separates concerns into three layers.

```
Request → Router → Controller → Service → Model → Database
                       ↓
                   Response
```

```javascript
// Model — data shape + DB interaction
const User = mongoose.model('User', userSchema);
module.exports = User;

// Service — business logic
class UserService {
  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }
  
  async updateProfile(id, updates) {
    if (updates.email) {
      const exists = await User.findOne({ email: updates.email, _id: { $ne: id } });
      if (exists) throw new ConflictError('Email already in use');
    }
    return User.findByIdAndUpdate(id, updates, { new: true });
  }
}

// Controller — handle HTTP layer
class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  
  getUser = async (req, res, next) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }
}
```

---

## 🏭 Repository Pattern

Abstracts database access behind an interface. Swap MongoDB for PostgreSQL without changing business logic.

```javascript
class UserRepository {
  async findById(id) {
    return User.findById(id);
  }
  async findByEmail(email) {
    return User.findOne({ email });
  }
  async create(userData) {
    return User.create(userData);
  }
  async update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return User.findByIdAndDelete(id);
  }
}

class AuthService {
  constructor(userRepository) {
    this.userRepo = userRepository;
  }
  async login(email, password) {
    const user = await this.userRepo.findByEmail(email);
    // business logic
  }
}
```

---

## 💉 Dependency Injection

Instead of creating dependencies inside a class, **inject** them from outside. Makes testing easy.

```javascript
// Without DI ❌ — hard to test
class OrderService {
  async createOrder(data) {
    const db = new MongoDatabase(); // Hardcoded
    const emailer = new SendGridEmailer(); // Hardcoded
  }
}

// With DI ✅ — easy to test
class OrderService {
  constructor(db, emailer, paymentGateway) {
    this.db = db;
    this.emailer = emailer;
    this.payment = paymentGateway;
  }
  
  async createOrder(data) {
    const order = await this.db.create('orders', data);
    await this.payment.charge(data.amount, data.cardToken);
    await this.emailer.send({ to: data.email, template: 'order-confirm' });
    return order;
  }
}

// In tests — inject mocks!
const mockDb = { create: jest.fn().mockResolvedValue({ id: 1 }) };
const mockEmailer = { send: jest.fn() };
const service = new OrderService(mockDb, mockEmailer, mockPayment);
```
