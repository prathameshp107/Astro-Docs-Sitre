---
title: "Map & Set Patterns"
description: "When to use Map vs Object, Set patterns, frequency counter, and hash map patterns with examples."
sidebar:
  order: 3
---

# Map & Set Patterns

## Use Map When:

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Frequency counter** | Count occurrences of elements | Character frequency in a string |
| **Index lookup** | Store element→index mappings | Two Sum problem |
| **Pair problems** | Find complement pairs | Pair with given sum |
| **Caching / Memoization** | Cache computed results | Fibonacci memoization |
| **Grouping** | Group elements by property | Group anagrams |

## Use Set When:

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Remove duplicates** | Filter unique values | Remove duplicates from array |
| **Membership check** | Check if element exists | Contains duplicate |
| **Uniqueness problems** | Ensure all elements are unique | Longest substring without repeats |
| **Cycle detection** | Detect cycles in linked lists | Linked list cycle detection |
| **Intersection / Difference** | Set operations | Intersection of two arrays |

## Map vs Object

| Feature | Map | Object |
|---------|-----|--------|
| **Key types** | Any type (objects, functions, primitives) | Only strings and symbols |
| **Order** | Insertion order preserved | Integer keys ordered, others insertion order |
| **Size** | `.size` property | Manual tracking needed |
| **Performance** | Optimized for frequent add/delete | Good for static data |
| **Iteration** | Directly iterable (`for...of`) | Need `Object.keys()` or `Object.entries()` |
| **Prototype** | No prototype chain | Has inherited properties |

```javascript
// Map — use for dynamic data
const map = new Map();
map.set('key', 'value');
map.get('key');        // 'value'
map.has('key');        // true
map.delete('key');     // Remove
map.size;             // Get size

// Object — use for static data / JSON
const obj = { key: 'value' };
obj.key;              // 'value'
'key' in obj;         // true
Object.keys(obj);     // ['key']
```

## Common Interview Patterns

### Frequency Counter with Map

```javascript
function characterFrequency(str) {
    const freq = new Map();

    for (const ch of str) {
        freq.set(ch, (freq.get(ch) || 0) + 1);
    }

    return freq;
}
// 'hello' → {'h':1, 'e':1, 'l':2, 'o':1}
```

### Two Sum with Map

```javascript
function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }

    return [-1, -1];
}
// [2, 7, 11, 15], target=9 → [0, 1]
```

### Contains Duplicate with Set

```javascript
function containsDuplicate(nums) {
    const set = new Set(nums);
    return set.size !== nums.length;
}
// [1,2,3,1] → true (1 appears twice)
```

### Intersection of Two Arrays

```javascript
function intersection(nums1, nums2) {
    const set1 = new Set(nums1);
    const result = new Set();

    for (const num of nums2) {
        if (set1.has(num)) {
            result.add(num);
        }
    }

    return [...result];
}
// [1,2,2,1], [2,2] → [2]
```

### First Non-Repeating Character

```javascript
function firstUniqueChar(s) {
    const freq = new Map();

    for (const ch of s) {
        freq.set(ch, (freq.get(ch) || 0) + 1);
    }

    for (let i = 0; i < s.length; i++) {
        if (freq.get(s[i]) === 1) return i;
    }

    return -1;
}
// 'leetcode' → 0 ('l' is first unique)
```

---

**Next:** [Two Pointer Technique](/DSA-Notes-Problems/data-structures/interview-prep/03-two-pointer) →
