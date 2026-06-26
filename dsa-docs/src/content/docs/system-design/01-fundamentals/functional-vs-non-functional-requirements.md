---
title: "Functional vs Non-Functional Requirements"
description: "Functional requirements describe what the system does. Non-functional describe how well it does it."
sidebar:
  order: 3
---

# Functional vs Non-Functional Requirements

> **Functional requirements** = features (what). **Non-functional requirements** = quality attributes (how well).

---

## Functional Requirements

These are the **features** the system must support. Written as "The system shall..."

**Example — URL Shortener:**
- Generate a short code for a given URL
- Redirect to the original URL when the short code is accessed
- Track click count per short URL
- Allow custom short codes (optional)

**Example — Chat App:**
- Send a message to a user
- Receive messages from other users in real-time
- Show online/offline status

---

## Non-Functional Requirements (The "ilities")

These define **how well** the system works. They're often the hardest part of system design.

### Scalability

The ability to handle growing load by adding resources.

| Type | How It Works | Analogy |
|------|-------------|---------|
| **Vertical scaling** (scale up) | Bigger machine | Move to a bigger house |
| **Horizontal scaling** (scale out) | More machines | Buy more houses |

### Availability

The percentage of time the system is operational.

| Nines | Uptime | Downtime/year |
|:-----:|:------:|:-------------:|
| 99% (two nines) | 3.65 days | 87.6 hours |
| 99.9% (three nines) | ~8.7 hours | 8.76 hours |
| 99.99% (four nines) | ~52 minutes | 52.6 minutes |
| 99.999% (five nines) | ~5 minutes | 5.26 minutes |

### Latency vs Throughput

| Term | Definition | Analogy |
|------|-----------|---------|
| **Latency** | Time for one request to complete | How long one pizza takes to bake |
| **Throughput** | Requests processed per second | How many pizzas per hour |

### Consistency

Do all users see the same data at the same time?

- **Strong consistency** — everyone sees the latest write (slower but safe)
- **Eventual consistency** — updates propagate over time (faster but stale reads)

### Durability

Data is safe once written — even if a server catches fire. Achieved via replication and backups.

---

## Trade-offs

> **You can't optimize everything.** The famous CAP theorem says: under a network partition, you choose between consistency and availability.

| Scenario | Prioritize | Sacrifice |
|----------|-----------|-----------|
| Banking | Consistency | Latency |
| Social feed | Availability | Consistency (stale is OK) |
| Video streaming | Throughput | Latency (buffering is OK) |

---

## In Simple Words

- Functional = features (what the user can do).
- Non-functional = quality (fast, reliable, always up).
- You can't have all qualities at once — pick what matters for your system.
