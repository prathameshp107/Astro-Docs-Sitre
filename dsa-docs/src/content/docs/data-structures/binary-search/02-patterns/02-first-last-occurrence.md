---
title: "Pattern 2 — First / Last Occurrence"
description: "Binary search pattern for finding the leftmost or rightmost occurrence of a target in a sorted array with duplicates."
sidebar:
  order: 2
---

# Pattern 2 — Find First / Last Occurrence

## 🎯 When to Use

The array has **duplicates** and you need the **first** (leftmost) or **last** (rightmost) index of a target value.

```
Array:  [1, 2, 2, 2, 2, 3, 4, 5]
Target: 2
First occurrence → index 1
Last occurrence  → index 4
Count occurrences → 4 (4 - 1 + 1)
```

---

## 🧠 The Key Insight

In classic search, we return `mid` immediately on finding a match. In this pattern, when we find a match:

- **First occurrence:** Record the match, then **search left** (`hi = mid - 1`) for an earlier one
- **Last occurrence:** Record the match, then **search right** (`lo = mid + 1`) for a later one

```text
Arr: [1, 2, 2, 2, 2, 3, 4, 5]
      0  1  2  3  4  5  6  7
      
      ←←←← hi = mid-1 (search left for earlier 2s)
              
      [1, 2, 2, 2, 2, 3, 4, 5]
         ↑mid=2 → match → record=2, go left
         
      Actually:
      mid=3 → match → record=3, go left
      mid=1 → match → record=1, go left
      lo=0, hi=0 → arr[0]=1 ≠ 2 → lo=1, loop exits
      result=1 ✅
```

---

## 💻 Template — First Occurrence (Leftmost)

```javascript
function findFirst(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (arr[mid] === target) {
      result = mid;   // Record this match...
      hi = mid - 1;  // ...but keep searching LEFT for an earlier one
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return result;
}
```

## 💻 Template — Last Occurrence (Rightmost)

```javascript
function findLast(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (arr[mid] === target) {
      result = mid;   // Record this match...
      lo = mid + 1;  // ...but keep searching RIGHT for a later one
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return result;
}
```

---

## 🧪 Complete Example

```javascript
function findFirst(arr, target) {
  let lo = 0, hi = arr.length - 1, result = -1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) { result = mid; hi = mid - 1; }
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return result;
}

function findLast(arr, target) {
  let lo = 0, hi = arr.length - 1, result = -1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) { result = mid; lo = mid + 1; }
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return result;
}

function countOccurrences(arr, target) {
  const first = findFirst(arr, target);
  if (first === -1) return 0;
  return findLast(arr, target) - first + 1;
}

// Test
const arr = [1, 2, 2, 2, 2, 3, 4, 5];
console.log(findFirst(arr, 2));          // 1
console.log(findLast(arr, 2));           // 4
console.log(countOccurrences(arr, 2));   // 4
console.log(findFirst(arr, 6));          // -1
```

---

## 📊 Walkthrough — Finding First Occurrence

```
Array: [1, 2, 2, 2, 2, 3, 4, 5], Target: 2
Index:  0  1  2  3  4  5  6  7

Step 1: lo=0, hi=7, mid=3 → arr[3]=2 === target
        result=3, hi=2 (search left)

Step 2: lo=0, hi=2, mid=1 → arr[1]=2 === target
        result=1, hi=0 (search left)

Step 3: lo=0, hi=0, mid=0 → arr[0]=1 < 2
        lo=1, loop exits (lo=1 > hi=0)

Return: result=1 ✅
```

---

## 📊 Complexity

| Operation | Time | Space |
|-----------|------|-------|
| findFirst | O(log n) | O(1) |
| findLast | O(log n) | O(1) |
| countOccurrences | O(log n) | O(1) |

---

## 🎯 Common Variations

### Variation: Find Insertion Point (where would target go?)

```javascript
function searchInsert(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return lo; // Insertion point when not found
}

console.log(searchInsert([1, 3, 5, 6], 5)); // 2
console.log(searchInsert([1, 3, 5, 6], 2)); // 1
console.log(searchInsert([1, 3, 5, 6], 7)); // 4
```

### Variation: Ceiling (smallest element ≥ target)

```javascript
function findCeiling(arr, target) {
  let lo = 0, hi = arr.length - 1, result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] >= target) {
      result = mid;  // Mid is a candidate ceiling
      hi = mid - 1;  // Try to find a smaller ceiling
    } else {
      lo = mid + 1;
    }
  }

  return result; // -1 if no ceiling exists
}

console.log(findCeiling([1, 3, 5, 6], 4)); // 2 (value 5)
console.log(findCeiling([1, 3, 5, 6], 7)); // -1
```

---

## 🔑 Key Takeaways

- **Don't return immediately on match** — record and keep searching
- **Search left** (`hi = mid - 1`) for first occurrence
- **Search right** (`lo = mid + 1`) for last occurrence
- **Same O(log n) time** as classic search — we're still halving the range
- This pattern is the foundation for **Pattern 3 (Answer Space)** and **Pattern 5 (Boundary)**

---

## 🔗 Related

- [Pattern 1 — Classic Search](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/01-classic-search)
- [Pattern 3 — Search on Answer →](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer)
- [Back to Patterns Index](/DSA-Notes-Problems/data-structures/binary-search/02-patterns)
