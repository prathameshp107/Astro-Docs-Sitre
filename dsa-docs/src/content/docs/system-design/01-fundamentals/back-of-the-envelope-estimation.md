---
title: "Back-of-the-Envelope Estimation"
description: "Quick estimation for QPS, storage, bandwidth, and memory — using powers of 2 and latency numbers."
sidebar:
  order: 4
---

# Back-of-the-Envelope Estimation

> Estimation is the skill of making reasonable guesses with simple math. You don't need exact numbers — you need to be within an order of magnitude.

---

## Powers of 2 Reference

| Power | Value | Approx |
|:-----:|:-----:|:------:|
| 10 | 1,024 | 1 Thousand |
| 20 | 1,048,576 | 1 Million |
| 30 | 1,073,741,824 | 1 Billion |
| 40 | ~1 Trillion | 1 Trillion |

### Data Sizes

| Unit | Bytes |
|------|-------|
| 1 KB | 10³ (1,000) |
| 1 MB | 10⁶ (1,000,000) |
| 1 GB | 10⁹ (1,000,000,000) |
| 1 TB | 10¹² |

---

## Latency Numbers Every Engineer Should Know

| Operation | Time |
|-----------|:----:|
| L1 cache reference | 0.5 ns |
| Branch mispredict | 5 ns |
| L2 cache reference | 7 ns |
| Mutex lock/unlock | 100 ns |
| Main memory reference | 100 ns |
| Compress 1 KB with Zippy | 10,000 ns = 10 μs |
| Send 2 KB over 1 Gbps network | 20,000 ns = 20 μs |
| Read 1 MB sequentially from memory | 250,000 ns = 250 μs |
| Round trip within same datacenter | 500,000 ns = 500 μs |
| Disk seek | 10,000,000 ns = 10 ms |
| Read 1 MB sequentially from network | 10,000,000 ns = 10 ms |
| Read 1 MB sequentially from disk | 30,000,000 ns = 30 ms |
| Send packet CA → Netherlands → CA | 150,000,000 ns = 150 ms |

> **Memory is 1000x faster than disk.** That's why caching is so powerful.

---

## Estimation Examples

### QPS (Queries Per Second)

**Example — Twitter-like system with 500M MAU:**

```
DAU = 50% of MAU = 250M
Assume each user tweets 1/day = 250M tweets/day

QPS = 250,000,000 / 86,400 (seconds in a day)
    ≈ 2,900 QPS average
  
Peak QPS = 2,900 × 5 (peak factor) ≈ 14,500 QPS
```

### Storage

**Example — Storing tweets for 5 years:**

```
Tweet size ≈ 280 chars + metadata ≈ 500 bytes
250M tweets/day × 500 bytes = 125 GB/day
125 GB × 365 × 5 = ~228 TB over 5 years
```

### Bandwidth

```
Ingress = 125 GB/day = ~1.5 MB/s
Egress (serving) = 14,500 QPS peak × 500 bytes = ~7 MB/s peak
```

---

## Common Rules of Thumb

| Metric | Rough Value |
|--------|-------------|
| 1 day | 86,400 seconds |
| DAU | ~30-60% of MAU |
| Peak load | 2-10× average |
| Text data per record | 100-500 bytes |
| Image per item | 100-500 KB |
| Memory cache hit rate | 90-99% for hot data |

---

## Trade-offs

- Estimation guides decisions (do you need 1 server or 100?).
- Round aggressively — 1.4 → 1, 4.7 → 5.
- If you can't estimate a number, state your assumption clearly.

---

## In Simple Words

- Round numbers aggressively — 1.2 million ≈ 1 million.
- Memory is 1000× faster than disk. Disk is 1000× cheaper.
- Peak QPS ≈ average QPS × 5 (for most apps).
