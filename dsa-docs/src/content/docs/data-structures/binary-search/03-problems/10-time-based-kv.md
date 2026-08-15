---
title: "Problem 10 — Time-Based Key-Value Store"
description: "LeetCode 981 — Design a key-value store with timestamps that supports fetching the value with the largest timestamp ≤ query timestamp."
sidebar:
  order: 10
practice:
  visualizer: /visualizer/searching
---

# Problem 10 — Time-Based Key-Value Store

**LeetCode 981** | Difficulty: 🟡 Medium

---

## 🎯 Problem Statement

Design a time-based key-value data structure that supports:

- **`set(key, value, timestamp)`** — Store the key with value at the given timestamp
- **`get(key, timestamp)`** — Return the value with the **largest timestamp ≤ query timestamp**. If no such value, return `""`

```
Input:
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]

Output:
[null, null, "bar", "bar", null, "bar2", "bar2"]
```

---

## 🧠 Pattern: Classic Binary Search (Pattern 1)

Store each key's data as pairs of `[timestamp, value]` in a list. Since timestamps are **strictly increasing** for each key, the list stays sorted — perfect for binary search.

---

## 💻 Solution

```javascript
class TimeMap {
  constructor() {
    this.store = new Map(); // key → [[timestamp, value], ...]
  }

  set(key, value, timestamp) {
    if (!this.store.has(key)) {
      this.store.set(key, []);
    }
    this.store.get(key).push([timestamp, value]);
    // Timestamps are guaranteed to be strictly increasing
  }

  get(key, timestamp) {
    if (!this.store.has(key)) return "";

    const entries = this.store.get(key);
    let lo = 0, hi = entries.length - 1;
    let result = "";

    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      const [t, v] = entries[mid];

      if (t === timestamp) {
        return v; // Exact match — best case
      } else if (t < timestamp) {
        result = v; // This timestamp works — look for a later one
        lo = mid + 1;
      } else {
        hi = mid - 1; // This timestamp is too new
      }
    }

    return result; // Largest t ≤ timestamp, or "" if none
  }
}

// Test
const tm = new TimeMap();
tm.set("foo", "bar", 1);
tm.set("foo", "bar2", 4);

console.log(tm.get("foo", 4)); // "bar2"  (exact match at t=4)
console.log(tm.get("foo", 3)); // "bar"   (largest t ≤ 3 is t=1)
console.log(tm.get("foo", 5)); // "bar2"  (largest t ≤ 5 is t=4)
console.log(tm.get("foo", 0)); // ""      (no t ≤ 0)
console.log(tm.get("bar", 1)); // ""      (key doesn't exist)
```

---

## 🧪 Walkthrough

```
get("foo", 3):
  entries = [[1, "bar"], [4, "bar2"]]
  
Step 1: lo=0, hi=1, mid=0 → t=1 < 3
  result="bar", lo=1
  
Step 2: lo=1, hi=1, mid=1 → t=4 > 3
  hi=0
  
Step 3: lo=1 > hi=0 → loop exits

Return: "bar" ✓
```

---

## 📊 Complexity

| Operation | Time | Space |
|-----------|------|-------|
| `set()` | **O(1)** — just append | O(n) per key |
| `get()` | **O(log n)** — binary search on entries | O(1) |

---

## 🎯 Design Discussion

### Memory Optimization

For large-scale systems, consider:

1. **Compaction** — If old values are rarely queried, periodically remove entries
2. **Snapshot isolation** — Use separate storage for recent vs. historical data
3. **B-tree** — For non-monotonic timestamps, consider a balanced BST

### Alternative: Use Object Instead of Map

```javascript
class TimeMap {
  constructor() {
    this.store = {};
  }
  
  set(key, value, timestamp) {
    if (!this.store[key]) this.store[key] = [];
    this.store[key].push([timestamp, value]);
  }
  
  get(key, timestamp) {
    const entries = this.store[key];
    if (!entries) return "";
    
    let lo = 0, hi = entries.length - 1, result = "";
    
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      const [t, v] = entries[mid];
      if (t <= timestamp) { result = v; lo = mid + 1; }
      else hi = mid - 1;
    }
    
    return result;
  }
}
```

---

## 🔑 Key Takeaways

- **System design + binary search** — this problem combines data structure design with classic BS
- **Timestamps are strictly increasing** — guarantee means we don't need to sort
- **Standard BS with result tracking** — find the largest timestamp ≤ query
- **Return `""`** as the "not found" sentinel (not `-1`)

---

## 🔗 Related

- [Pattern 1 — Classic Search](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search)
- [Back to Problems Index](/DSA-Notes-Problems/data-structures/binary-search/03-problems)
