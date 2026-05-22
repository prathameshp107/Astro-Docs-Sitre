---
title: "Real-World Project Architecture"
description: "Microservices architecture, API Gateway design, and service communication patterns in Node.js."
---

# Section 15: Real-World Project Architecture

## 🏢 Microservices Architecture

A typical e-commerce microservices architecture:

- **API Gateway** — Auth, Rate Limit, Routing, Load Balance
- **Auth Service** — JWT, OAuth2 (Port 3001)
- **User Service** — Profile, Preferences (Port 3002)
- **Product Service** — Catalog, Search (Port 3003)
- **Order Service** — Cart, Orders (Port 3004)
- **Payment Service** — Stripe/Razorpay (Port 3005)

### Communication: Message Bus (RabbitMQ / Kafka)

Event-driven communication between services:
- `OrderPlaced` → triggers Payment
- `PaymentConfirmed` → triggers Notification
- `EmailTrigger` → sends email

### Shared Infrastructure

| Service | Purpose |
|---------|---------|
| Redis Cluster | Shared Cache, Rate Limiting, Sessions |
| Notification Service | Email (SendGrid), SMS, Push |
| Monitoring | Grafana, Prometheus, Jaeger |

### Database per Service

| Service | Database |
|---------|----------|
| Auth Service | PostgreSQL (Users + Sessions) |
| User Service | PostgreSQL (Profiles) |
| Product Service | MongoDB (Catalog) |
| Order Service | PostgreSQL (Transactions) |
| Payment Service | PostgreSQL (Transactions) |

### Key Benefits of Microservices

- **Independent scaling** — Scale only the services that need it
- **Isolated failures** — One service crashing doesn't take down the entire app
- **Technology diversity** — Choose the best tech for each service
- **Team autonomy** — Teams can develop and deploy independently
- **Faster deployments** — Smaller codebases = faster CI/CD
