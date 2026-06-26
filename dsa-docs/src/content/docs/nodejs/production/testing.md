---
title: "Testing Node.js Applications"
description: "Unit testing with Jest and integration testing with Supertest in Node.js."
sidebar:
  order: 8
---

# Testing

## 🧪 Why Testing?

Testing ensures your code works correctly and prevents regressions when you make changes.

### Unit Testing with Jest

```javascript
// services/cart.service.js
class CartService {
  calculateTotal(items) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  applyDiscount(total, discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error('Invalid discount percentage');
    }
    return total * (1 - discountPercent / 100);
  }
}

// tests/unit/cart.service.test.js
const CartService = require('../../services/cart.service');

describe('CartService', () => {
  let service;
  
  beforeEach(() => {
    service = new CartService();
  });
  
  describe('calculateTotal', () => {
    test('calculates total for multiple items', () => {
      const items = [
        { price: 100, quantity: 2 },
        { price: 50, quantity: 1 }
      ];
      expect(service.calculateTotal(items)).toBe(250);
    });
    
    test('returns 0 for empty cart', () => {
      expect(service.calculateTotal([])).toBe(0);
    });
  });
  
  describe('applyDiscount', () => {
    test('applies 10% discount correctly', () => {
      expect(service.applyDiscount(100, 10)).toBe(90);
    });
    
    test('throws error for invalid discount', () => {
      expect(() => service.applyDiscount(100, -5)).toThrow('Invalid discount percentage');
      expect(() => service.applyDiscount(100, 150)).toThrow('Invalid discount percentage');
    });
  });
});
```

### Integration Testing with Supertest

```javascript
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

describe('POST /auth/login', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URL);
    await User.create({ email: 'test@test.com', password: await bcrypt.hash('password123', 10) });
  });
  
  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });
  
  test('returns JWT on valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password123' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
  
  test('returns 401 on invalid password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'wrongpassword' });
    
    expect(response.status).toBe(401);
  });
});
```
