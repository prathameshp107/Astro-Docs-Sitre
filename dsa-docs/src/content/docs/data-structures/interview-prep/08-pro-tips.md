---
title: "Pro Interview Tips"
description: "When to use Map vs Set, common pitfalls, and interview strategy"
sidebar:
  order: 8
---

# Pro Interview Tips

## When to Use Map

Maps (or objects) are your go-to when you need to associate keys with values. Use Map when:

| Scenario | Example |
|----------|---------|
| **Frequency counter** | Count occurrences of each element |
| **Index lookup** | Store element positions (e.g., Two Sum) |
| **Pair problems** | Match elements that satisfy a condition |
| **Caching / memoization** | Store computed results for reuse |
| **Grouping** | Group elements by a property |

```javascript
// Frequency counter
const freq = new Map();
for (const item of arr) {
  freq.set(item, (freq.get(item) || 0) + 1);
}

// Index lookup
const indexMap = new Map();
arr.forEach((val, i) => indexMap.set(val, i));
```

---

## When to Use Set

Sets are ideal for uniqueness and membership checks. Use Set when:

| Scenario | Example |
|----------|---------|
| **Remove duplicates** | Deduplicate an array |
| **Membership check** | Check if an element exists (O(1)) |
| **Uniqueness problems** | Find unique elements across collections |
| **Cycle detection** | Track visited nodes in graphs |
| **Intersection / union** | Set operations between collections |

```javascript
// Remove duplicates
const unique = [...new Set(arr)];

// Membership check
const set = new Set(collection);
if (set.has(target)) { /* O(1) lookup */ }

// Intersection
const intersection = [...new Set(arr1)].filter(x => set2.has(x));
```

---

## Common Pitfalls

### 1. Map vs Object — When to Choose What

| Feature | Map | Object |
|---------|-----|--------|
| Key types | Any (functions, objects, primitives) | Strings & Symbols only |
| Order | Insertion order guaranteed | Integer keys sorted, otherwise insertion order |
| Size | `map.size` | `Object.keys(obj).length` |
| Iteration | `map.forEach()` or `for...of` | `for...in` (includes prototype) |
| Performance | Optimized for frequent additions/removals | Optimized for static access |

**Rule of thumb:** Use `Map` unless you need JSON serialization or are working with plain data objects.

### 2. Set vs Array for Uniqueness

```javascript
// ❌ Slow — O(n²)
function hasDuplicate(arr) {
  return arr.some((val, i) => arr.indexOf(val) !== i);
}

// ✅ Fast — O(n)
function hasDuplicate(arr) {
  return new Set(arr).size !== arr.length;
}
```

### 3. Mutating vs Non-Mutating Operations

| Method | Mutates Original? | Returns |
|--------|:-:|---------|
| `push`, `pop`, `shift`, `unshift` | ✅ Yes | New length / removed element |
| `splice` | ✅ Yes | Removed elements |
| `reverse`, `sort` | ✅ Yes | Modified array (also returns it) |
| `map`, `filter`, `reduce`, `slice` | ❌ No | New array / value |
| `concat`, `includes`, `find` | ❌ No | New array / boolean / element |

**Interview tip:** Interviewers often ask about mutability. Be clear about which methods mutate and which don't.

---

## Problem-Solving Strategy

1. **Clarify** — Ask about input size, duplicates, edge cases (empty, single element)
2. **Brute force first** — State the obvious O(n²) solution, then optimize
3. **Choose your tool** — Map, Set, or both? Frequency counter or complement lookup?
4. **Walk through** — Trace through a small example before coding
5. **Test edges** — Empty arrays, single elements, all duplicates, no match found

---

## Master Before Moving On

> **Tip:** Master **arrays + hash maps + two pointers** first — they dominate interviews.

After those, study:
- Linked Lists
- Trees
- Graphs
- Recursion & Backtracking
- Sliding Window
- Dynamic Programming

---

<span class="related-topics">**Related:** [Array Methods →](/DSA-Notes-Problems/data-structures/interview-prep/01-array-methods) | [Two Pointer →](/DSA-Notes-Problems/data-structures/interview-prep/03-two-pointer) | [Study Plan →](/DSA-Notes-Problems/data-structures/interview-prep/09-study-plan)</span>
