---
title: "Common System Design Mistakes"
description: "The most common mistakes candidates make in system design interviews — and how to avoid them."
sidebar:
  order: 2
---

# Common System Design Mistakes

---

## 1. Jumping to a Solution Without Clarifying Requirements

**❌ "Let's design Uber."** Then immediately start drawing servers and databases.

**✅ "What kind of Uber? Ride-sharing, food delivery, freight? How many users? Real-time tracking needed?"**

> **Fix:** Spend the first 2-3 minutes asking questions. The interviewer wants to see you scope the problem.

---

## 2. Ignoring Non-Functional Requirements

**❌** Designing a system without considering scale, latency, or availability.

**✅** "This system needs to handle 10M DAU with < 200ms latency and 99.99% availability."

> **Fix:** Ask about requirements, then explicitly state your assumptions at the start.

---

## 3. Making Up Numbers

**❌** "We'll need 10,000 servers and 5 petabytes of storage." (No reasoning behind it)

**✅** "With 10M DAU and each user storing 10 photos/day at 500KB each... 10M × 10 × 500KB = 50GB/day. Over 3 years that's ~55TB."

> **Fix:** Show your math. Even rough estimates demonstrate engineering judgment.

---

## 4. Over-Engineering

**❌** "We need Kubernetes, 20 microservices, Kafka, Redis Cluster, and a multi-region deployment." (For a URL shortener)

**✅** "A URL shortener is read-heavy. Let's start with a single app server, a relational database, and a cache layer. We can scale later."

> **Fix:** Design for the **stated requirements**, not for Google-scale. You can mention where you'd add complexity.

---

## 5. Not Discussing Trade-offs

**❌** "We'll use Cassandra for the database." (No explanation)

**✅** "I'm choosing Cassandra because we need high write throughput and eventual consistency is acceptable for this use case. The trade-off is that reads might be slightly stale."

> **Fix:** Every choice has trade-offs. Show you understand them.

---

## 6. Forgetting About Failures

**❌** Design assumes everything works perfectly — no servers crash, no network partitions.

**✅** "If the primary database fails, a replica takes over. The cache has a TTL so if Redis goes down, the app still works (slower)."

> **Fix:** Always discuss failure scenarios and redundancy.

---

## 7. Going Too Deep Too Early

**❌** Spending 15 minutes designing the perfect database schema when you haven't drawn the high-level architecture yet.

**✅** Start with the block diagram, then dive deeper on 1-2 components.

> **Fix:** HLD first (80% of your time), deep dives on specific components.

---

## Quick Checklist Before You Finish

- [ ] Did I clarify requirements?
- [ ] Did I estimate scale?
- [ ] Is there a diagram?
- [ ] Did I explain the data flow?
- [ ] Did I discuss trade-offs?
- [ ] Did I cover failure scenarios?
- [ ] Did I suggest improvements?

---

## In Simple Words

- Don't jump to the solution — clarify first.
- Show your math — even rough estimates demonstrate thinking.
- Discuss trade-offs — the interviewer wants to see you weigh options.
- Start simple, add complexity where needed.
