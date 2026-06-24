---
title: "Availability & SLAs"
description: "The 'nines' of uptime, SLA/SLO/SLI, and how to design for a target availability."
sidebar:
  order: 1
---

# Availability & SLAs

> **Availability** = the percentage of time a system is operational. **SLA** (Service Level Agreement) = the contract that promises a certain availability.

---

## The Nines

| Uptime % | Downtime/year | Downtime/month | Downtime/week |
|:--------:|:-------------:|:--------------:|:-------------:|
| 99% (2 nines) | 3.65 days | 7.31 hours | 1.68 hours |
| 99.9% (3 nines) | 8.76 hours | 43.8 minutes | 10.1 minutes |
| 99.99% (4 nines) | 52.6 minutes | 4.38 minutes | 1.01 minutes |
| 99.999% (5 nines) | 5.26 minutes | 26.3 seconds | 6.05 seconds |
| 99.9999% (6 nines) | 31.5 seconds | 2.63 seconds | 0.6 seconds |

> **Each additional "nine" is 10× harder (and more expensive) to achieve.**

---

## SLA vs SLO vs SLI

| Term | Stands For | What It Is |
|:----:|------------|------------|
| **SLI** | Service Level Indicator | A metric (e.g., latency p99 = 200ms) |
| **SLO** | Service Level Objective | A target (e.g., p99 < 300ms this quarter) |
| **SLA** | Service Level Agreement | A contract with consequences (e.g., if p99 > 500ms for 5 min, refund 10%) |

**Example:**
- SLI = API request latency p99 = 180ms
- SLO = Keep p99 latency under 200ms for 99.9% of requests
- SLA = If SLO is breached for >5 consecutive minutes, customer gets a 5% credit

---

## Designing for Availability

| Target | Strategy |
|:------:|----------|
| 99% | Single server, daily backups |
| 99.9% | Active-passive failover, replicated database |
| 99.99% | Active-active, multi-AZ, load balancers, health checks |
| 99.999% | Multi-region, real-time replication, chaos engineering |

**Key principle:** Every dependency (database, cache, third-party API) must have redundancy. The weakest link determines your availability.

---

## Common Availability Mistakes

| Mistake | Problem |
|---------|---------|
| Single server for critical service | SPOF — if it dies, the system is down |
| No redundancy for the database | Database is often the hardest to recover |
| Ignoring dependencies | A third-party API going down takes your system down |
| No graceful degradation | A non-critical service failure takes down the entire site |

---

## Trade-offs

- 99.9% is achievable with reasonable effort. 99.999% requires significant investment.
- Higher availability = more complexity (replication, failover, monitoring).
- The cost of downtime vs the cost of availability must justify each other.

---

## In Simple Words

- The "nines" measure uptime: 99.9% = 9 hours downtime/year, 99.99% = 53 minutes/year.
- SLA = the promise. SLO = the target. SLI = the actual measurement.
- Every extra "nine" costs about 10× more.
