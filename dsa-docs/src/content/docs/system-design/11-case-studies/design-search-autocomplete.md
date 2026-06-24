---
title: "Design Search Autocomplete"
description: "Designing a real-time typeahead suggestion system like Google Search autocomplete."
sidebar:
  order: 9
---

# Case Study: Design Search Autocomplete

> Autocomplete provides search suggestions as the user types — like Google's "Did you mean...?" or search bar suggestions.

---

## Requirements

**Functional:**
- As user types, show top 5 query suggestions
- Suggestions update as user types more characters
- Popular queries ranked higher
- (Optional) Personalized suggestions

**Non-functional:**
- Response in <100ms (every keystroke!)
- Support 100M DAU
- Handle 100K QPS

---

## Estimation

| Metric | Value |
|--------|-------|
| DAU | 100M |
| Searches/user/day | 5 |
| Characters typed per search | 10 (each triggers a request) |
| QPS | 100M × 5 × 10 / 86,400 ≈ **58K QPS** |
| Storage (top 5M queries) | 5M × (query 50B + freq 8B) ≈ **300 MB** |

Fits in memory! This is a cache-friendly problem.

---

## High-Level Design

```mermaid
flowchart LR
    Client["📱 Type 'app'"] --> LB["Load Balancer"]
    LB --> App["API Server"]
    App --> Cache[("Redis<br/>Prefix → top 5")]
    App --> Trie[("Trie<br/>(Optional, for<br/>new prefix lookups)")]

    style Client fill:#7c3aed,color:#fff
    style LB fill:#4f46e5,color:#fff
    style App fill:#6366f1,color:#fff
    style Cache fill:#059669,color:#fff
```

---

## Deep Dive: Data Structure

**Approach 1: Trie (Prefix Tree)**

A trie stores all query prefixes. Each node contains the top 10 suggestions under that prefix.

```
               root
            /   |   \
          a     b     c
         / \    |     |
        ap  ar  ba    ca
        |   |   |     |
       app art  bat   cat
       ↓   ↓    ↓     ↓
     ["app", "apple", "application", ...]
```

**Time:** O(L) to find prefix, O(1) to return top K.

**Approach 2: Precomputed Prefix Map (Simpler)**

Precompute all prefixes and store in Redis:

```json
{
  "a": ["apple", "amazon", "airbnb", ...],
  "ap": ["apple", "application", "app", ...],
  "app": ["apple", "application", "app", ...],
  "appl": ["apple", "application", ...],
  ...
}
```

**Our choice:** Precomputed prefix map with Redis. Simpler, faster for reads.

---

## Deep Dive: Building the Prefix Map

```javascript
// Offline job — runs daily
function buildPrefixMap() {
  const queries = getTopQueries(5_000_000); // Top 5M queries by frequency
  const prefixMap = {};

  for (const { query, freq } of queries) {
    // Generate all prefixes of this query
    for (let i = 1; i <= query.length; i++) {
      const prefix = query.substring(0, i);
      if (!prefixMap[prefix]) prefixMap[prefix] = [];

      prefixMap[prefix].push({ query, freq });
    }
  }

  // Sort each prefix's suggestions by frequency, keep top 5
  for (const prefix in prefixMap) {
    prefixMap[prefix].sort((a, b) => b.freq - a.freq);
    prefixMap[prefix] = prefixMap[prefix].slice(0, 5);
  }

  // Load into Redis
  for (const [prefix, suggestions] of Object.entries(prefixMap)) {
    redis.set(`autocomplete:${prefix}`, JSON.stringify(suggestions));
    redis.expire(`autocomplete:${prefix}`, 86400); // TTL = 1 day
  }
}
```

---

## Bottlenecks & Trade-offs

| Bottleneck | Solution |
|-----------|----------|
| **Memory for all prefixes** | Only store top 5M queries, 300MB total |
| **Stale suggestions** | Rebuild prefix map daily (offline job) |
| **Personalization** | Store personalized suggestions per user (more storage) |
| **Spelling correction** | Use Levenshtein distance or a BK-tree for "Did you mean?" |

---

## In Simple Words

- Autocomplete = as user types, show top 5 suggestions for that prefix.
- Precompute all prefix → suggestions mappings offline, store in Redis.
- Reads are O(1) (direct Redis lookup). Update daily.
