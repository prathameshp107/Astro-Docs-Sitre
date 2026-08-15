---
title: "Pattern 5 — Binary Search on Monotonic Function"
description: "Binary search pattern for finding the boundary where a monotonic function crosses a threshold — First Bad Version, Find Peak Element."
sidebar:
  order: 5
practice:
  visualizer: /visualizer/searching
---

# Pattern 5 — Binary Search on Monotonic Function

## 🎯 When to Use

There is a function `f(x)` that is **monotonically increasing or decreasing**, and you want to find **where it crosses a threshold** — the first/last x where a condition holds.

### Examples

- `f(x) = x²` — find integer square root
- `f(version) = isBadVersion(version)` — false... false... **true**... true
- `f(index) = nums[index] > nums[index+1]` — find peak element
- `f(days) = totalWeightShipped(days)` — find minimum capacity

---

## 🧠 The Key Insight

Unlike classic search, we don't need an exact match. We converge `lo` and `hi` until they meet at the **boundary** where the condition transitions from false to true (or true to false).

```text
Condition(x):
  false  false  false | true  true  true  true
  lo                   ↑                      hi
                  First true
                  (lo and hi converge here)

Pattern: while (lo < hi) — stop when lo === hi (answer found)
```

---

## 💻 Template — Find First Tru

```javascript
function findBoundary(lo, hi, condition) {
  // Assumes: condition is false for lo..k-1 and true for k..hi
  // Returns: first k where condition(k) is true

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (condition(mid)) {
      hi = mid;      // mid might be the answer — don't exclude it
    } else {
      lo = mid + 1;  // mid is definitely not the answer
    }
  }

  return lo; // lo === hi is the first true position
}
```

### Key Differences from Classic Search

| Aspect | Classic Search (Pattern 1) | Boundary Search (Pattern 5) |
|--------|---------------------------|-----------------------------|
| Loop | `while (lo <= hi)` | `while (lo < hi)` |
| When condition is true | `return mid` | `hi = mid` |
| When condition is false | `lo = mid + 1` | `lo = mid + 1` |
| When condition is false (left side) | `hi = mid - 1` | N/A |
| Return | `mid` or `-1` | `lo` (converged answer) |
| Why | Search for exact match | Converge to boundary point |

---

## 🧪 Example — First Bad Version

```javascript
function solution(isBadVersion) {
  return function firstBadVersion(n) {
    let lo = 1, hi = n;

    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);

      if (isBadVersion(mid)) {
        hi = mid;      // mid could be the first bad version
      } else {
        lo = mid + 1;  // mid is good, first bad is later
      }
    }

    return lo; // lo === hi === first bad version
  };
}

// Simulation
const BAD = 4;
const isBadVersion = (v) => v >= BAD;
const firstBadVersion = solution(isBadVersion);
console.log(firstBadVersion(5)); // 4
console.log(firstBadVersion(10)); // 4
```

### Walkthrough

```
Versions: 1   2   3   4   5   6   7   8
Status:   ✓   ✓   ✓   ✗   ✗   ✗   ✗   ✗
                     ↑ First bad version

Step 1: lo=1, hi=8, mid=4.45 → mid=4
        isBad(4)=true → hi=4

Step 2: lo=1, hi=4, mid=2.5 → mid=2
        isBad(2)=false → lo=3

Step 3: lo=3, hi=4, mid=3.5 → mid=3
        isBad(3)=false → lo=4

Step 4: lo=4, hi=4 → loop exits (lo < hi is false)

Return: lo=4 ✓
```

---

## 🧪 Example — Find Peak Element

```javascript
function findPeakElement(nums) {
  let lo = 0, hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] < nums[mid + 1]) {
      // Peak is to the right (we're climbing up)
      lo = mid + 1;
    } else {
      // Peak is at mid or to the left
      hi = mid;
    }
  }

  return lo; // lo === hi is a peak
}

console.log(findPeakElement([1, 2, 3, 1]));          // 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // 5
```

---

## 🧪 Example — Integer Square Root

```javascript
function mySqrt(x) {
  if (x < 2) return x;

  let lo = 1, hi = Math.floor(x / 2);

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const sq = mid * mid;

    if (sq === x) return mid;
    if (sq < x) {
      lo = mid + 1; // mid might work, try larger
    } else {
      hi = mid - 1; // mid too big
    }
  }

  return hi; // hi is the floor sqrt (largest with square ≤ x)
}
```

---

## 📊 Complexity

| Operation | Time | Space |
|-----------|------|-------|
| First Bad Version | O(log n) | O(1) |
| Find Peak Element | O(log n) | O(1) |
| Integer Square Root | O(log x) | O(1) |

---

## 🧠 Mental Model for Pattern 5

```text
Think of the array as having two "colors":

[false, false, false, true, true, true, true]
  lo                                hi
  
We want the first true.

At mid:
  - If true:  the answer is at mid or to the left → hi = mid
  - If false: the answer is definitely to the right → lo = mid + 1

When lo === hi, that's the boundary point.
```

---

## 🎯 Common Variations

| Problem | Condition | lo | hi |
|---------|-----------|----|----|
| First Bad Version | `isBadVersion(mid)` | 1 | n |
| Find Peak Element | `nums[mid] < nums[mid+1]` | 0 | n-1 |
| Sqrt(x) | `mid*mid <= x` | 1 | x/2 |
| Guess Number | `guess(mid)` result | 1 | n |
| Find Smallest Letter > Target | `letters[mid] > target` | 0 | n-1 |

---

## 🔑 Key Takeaways

- **`lo < hi`** — stop when they converge (answer found)
- **`hi = mid`** — don't exclude mid when condition is true (it might be the answer!)
- **`lo = mid + 1`** — exclude mid when condition is false (definitely not the answer)
- **Returns `lo`** — not -1, because the answer must exist (problem guarantees it)
- Pattern 5 is essentially **Pattern 2 (first occurrence)** with `lo < hi` instead of `lo <= hi`

---

## 🔗 Related

- [Pattern 2 — First/Last Occurrence](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/02-first-last-occurrence)
- [Pattern 3 — Search on Answer](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer)
- [Back to Patterns Index](/DSA-Notes-Problems/data-structures/binary-search/02-patterns)
- [Problems — First Bad Version](/DSA-Notes-Problems/data-structures/binary-search/03-problems/09-first-bad-version)
