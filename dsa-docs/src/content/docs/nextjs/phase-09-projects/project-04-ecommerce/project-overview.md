---
title: "Project Overview"
description: "What you'll build and learn with the e-commerce store project."
---

# Project Overview

## What You'll Build

A complete e-commerce store where users can browse products, add them to a cart, and check out. The store has a product catalog, shopping cart, checkout flow, and order history.

## Key Features

### 1. Product Catalog
- Product grid with images, prices, and categories
- Search and filter by category/price
- Individual product detail pages

### 2. Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (localStorage or server-side)
- Cart summary with total

### 3. Checkout Flow
- Shipping address form with validation
- Order summary review
- Payment with Stripe (or mock)

### 4. Order Management
- Order confirmation page
- Order history for logged-in users
- Admin order dashboard (optional)

## Pages

| Route | Purpose |
|-------|---------|
| `/products` | Product listing with filters |
| `/products/[id]` | Product detail |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/orders` | Order history |
| `/orders/[id]` | Order confirmation |

## Learning Objectives

- Manage complex state (shopping cart) with Zustand
- Build a multi-step checkout flow
- Integrate Stripe for payments (using Payment Intents)
- Handle database transactions for orders
