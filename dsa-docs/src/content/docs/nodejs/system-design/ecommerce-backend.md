---
title: "E-Commerce Backend Design"
description: "Design and implement a scalable e-commerce backend with product catalog, cart, orders, payments, and inventory management."
sidebar:
  order: 5
---

# E-Commerce Backend Design

## 📖 Introduction

An e-commerce backend handles product catalogs, shopping carts, order processing, payment integration, and inventory management. It's one of the most common and complex system design problems — combining CRUD operations, transactional integrity, real-time stock updates, and payment processing.

## 🤔 Why Do We Need This?

E-commerce backends present unique challenges:
- **Transactional integrity** — Money and inventory must be accurate
- **Concurrent access** — Two users buying the last item simultaneously
- **Catalog performance** — Millions of products, fast faceted search
- **Order lifecycle** — Complex state machine with multiple services

## 💻 Coding Challenge 1: Product Catalog API

Build a product catalog API:
- Products have: name, description, price, category, variants (size/color), images
- `GET /products` — paginated list with category filter, price sort, search
- `GET /products/:id` — single product with all variants
- `GET /categories` — category tree
- Add proper indexes for common queries (category, price range)

## 💻 Coding Challenge 2: Cart and Checkout

Build a shopping cart with checkout:
- `POST /cart` — add item (with variant selection)
- `PUT /cart/:itemId` — update quantity
- `DELETE /cart/:itemId` — remove item
- `POST /checkout` — create order, charge payment, clear cart
- Checkout uses a transaction: validate stock → charge → confirm order
- Handle the "last item" race condition

## 💻 Coding Challenge 3: Order Management

Build an order management system:
- Order states: `pending → confirmed → processing → shipped → delivered`
- Orders can be cancelled (before shipped) or returned (after delivery)
- `GET /orders` — user's order history
- `GET /admin/orders` — all orders with filters (by status, date range)
- Admin can update order status
- Event-driven: order status changes trigger email notifications

## 📖 Summary

| Service | Responsibility | Technology |
|---------|---------------|------------|
| Product Service | Catalog, search, categories | MongoDB (flexible schema) |
| Cart Service | Temporary cart management | Redis (fast, TTL-based) |
| Order Service | Order processing, lifecycle | PostgreSQL (ACID) |
| Payment Service | Stripe integration | BullMQ (async, retries) |
| Inventory Service | Stock tracking | PostgreSQL + Redis |
| Notification Service | Emails, SMS | BullMQ worker |

## 📝 MCQs

**1. What database technology is best suited for a product catalog with flexible attributes?**
- A) PostgreSQL (rigid schema)
- B) MongoDB (flexible schema) ✅
- C) Redis
- D) SQLite

**2. How would you handle the "last item in stock" race condition when two users buy simultaneously?**
- A) Optimistic locking with version check ✅
- B) Let both succeed
- C) Use a queue (too slow)
- D) Reject all concurrent purchases

**3. What pattern is ideal for processing order payments asynchronously?**
- A) HTTP callback
- B) Message queue with retries ✅
- C) Polling every second
- D) Inline payment processing

**4. Why is Redis ideal for shopping cart storage?**
- A) Relational queries
- B) Fast reads/writes with TTL-based expiration ✅
- C) Complex join operations
- D) Full-text search

**5. What ensures data integrity during checkout (order creation + payment + inventory deduction)?**
- A) Async processing
- B) Database transactions (ACID) ✅
- C) WebSocket notifications
- D) Redis caching

**Answer Key:** 1-B, 2-A, 3-B, 4-B, 5-B

## 🔗 Related Topics

- [Working with Databases](../data/databases) — Data modeling, transactions
- [Message Queues](../data/message-queues) — Async order processing
- [Authentication](../web/authentication-security) — JWT for user sessions
- [Caching](../data/caching) — Product catalog caching
- [Building REST APIs](../web/building-apis) — API design patterns
