---
title: "Pattern 3 — Binary Search on Answer Space"
description: "Binary search pattern for finding the minimum or maximum feasible value — used when the answer itself is the search space."
sidebar:
  order: 3
---

# Pattern 3 — Binary Search on Answer Space

## 🎯 When to Use

The problem asks for the **minimum or maximum value** that satisfies some condition. The **answer itself** is what you binary search over — not the array indices.

### Recognition Signals

- "Find the **minimum X** such that ..."
- "Find the **maximum X** such that ..."
- "Is it possible to achieve X?"
- The answer has a clear **lower bound** and **upper bound**
- There is a **monotonic condition**: if X works, X+1 also works (or vice versa)

---

## 🧠 The Key Insight

Unlike Patterns 1 and 2 which search **within an array**, Pattern 3 searches **within a range of possible answers**.

```text
Example: Find minimum eating speed for Koko

Answer range:  1 ... max(piles)
               ↑              ↑
         Minimum speed    Maximum speed needed
         (1 banana/hr)    (eat biggest pile in 1 hr)

Check function: canFinish(speed) → true/false
                false false false | true true true true
                1     2     3     4    5     6     7
                                   ↑
                              Minimum feasible speed = 4
```

### The Monotonic Property

For this pattern to work, the feasibility condition must be **monotonic**:

```text
Condition(speed) = "Can Koko finish at speed X?"

speed=1 → false (too slow)
speed=2 → false
speed=3 → false
speed=4 → true  ← threshold!

If speed=X works, then speed=X+1 also works ✓
If speed=X fails, then speed=X-1 also fails ✓
```

---

## 💻 Template — Find Minimum Feasible Answer

```javascript
function binarySearchOnAnswer(lo, hi, isConditionMet) {
  // lo = minimum possible answer
  // hi = maximum possible answer

  let result = hi; // default: worst case

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (isConditionMet(mid)) {
      result = mid;   // mid works — record it, try smaller
      hi = mid - 1;
    } else {
      lo = mid + 1;   // mid doesn't work — try larger
    }
  }

  return result;
}
```

## 💻 Template — Find Maximum Feasible Answer

```javascript
function binarySearchMaxFeasible(lo, hi, isConditionMet) {
  let result = lo; // default: worst case

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (isConditionMet(mid)) {
      result = mid;   // mid works — record it, try larger
      lo = mid + 1;
    } else {
      hi = mid - 1;   // mid doesn't work — try smaller
    }
  }

  return result;
}
```

---

## 🧪 Complete Example — Koko Eating Bananas

```javascript
function minEatingSpeed(piles, h) {
  // Can Koko finish all piles at rate k within h hours?
  function canFinish(k) {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / k);
    }
    return hours <= h;
  }

  // Define the answer space
  let lo = 1;                 // Minimum: 1 banana/hour
  let hi = Math.max(...piles); // Maximum: eat biggest pile in 1 hour
  let result = hi;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (canFinish(mid)) {
      result = mid; // Speed mid works — try slower
      hi = mid - 1;
    } else {
      lo = mid + 1; // Speed mid too slow — try faster
    }
  }

  return result;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8)); // 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30
```

---

## 🧪 Example — Ship Packages Within D Days

```javascript
function shipWithinDays(weights, days) {
  function canShip(capacity) {
    let daysNeeded = 1;
    let currentLoad = 0;

    for (const w of weights) {
      if (currentLoad + w > capacity) {
        daysNeeded++;
        currentLoad = 0;
      }
      currentLoad += w;
    }

    return daysNeeded <= days;
  }

  let lo = Math.max(...weights);  // Min: must carry heaviest package
  let hi = weights.reduce((a, b) => a + b, 0); // Max: carry all at once
  let result = hi;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canShip(mid)) {
      result = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return result;
}

console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); // 15
```

---

## 📊 Complexity

| Component | Cost |
|-----------|------|
| Binary search iterations | O(log(range)) |
| Condition check function | O(n) per check |
| **Total** | **O(n × log(range))** |

Where `range = hi - lo` (the answer space). Each iteration calls the `canShip`/`canFinish` helper, which typically takes O(n) time.

---

## 📋 Common Problems Using This Pattern

| Problem | Answer Range (lo ... hi) | Condition |
|---------|--------------------------|-----------|
| Koko Eating Bananas | 1 ... max(piles) | canFinish(rate) ≤ h hours |
| Ship Packages | max(weights) ... sum(weights) | daysNeeded(capacity) ≤ days |
| Split Array Largest Sum | max(nums) ... sum(nums) | subarrays(maxSum) ≤ k |
| Find Sqrt(x) | 1 ... x/2 | mid² ≤ x |
| Minimum Time to Complete Trips | 1 ... min(time)×totalTrips | tripsCompleted(time) ≥ totalTrips |
| Capacity To Ship | max(weights) ... sum(weights) | canShip(capacity) ≤ days |
| Minimize Max Distance (Gas Station) | 0 ... maxDistance | canAddStations(distance) ≤ k |

---

## 🔑 Key Takeaways

- **Search space = possible answers**, not the array itself
- **Define lo and hi** as the min and max possible answers
- **Define the monotonic condition** function — it must return false for all values below threshold and true above (or vice versa)
- **Same O(log n) binary search** on the answer range
- **Result variable** tracks the best valid answer found

---

## 🔗 Related

- [Pattern 2 — First/Last Occurrence](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/02-first-last-occurrence)
- [Pattern 5 — Monotonic Function →](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/05-monotonic-function)
- [Back to Patterns Index](/DSA-Notes-Problems/data-structures/binary-search/02-patterns)
- [Problems — Koko Bananas](/DSA-Notes-Problems/data-structures/binary-search/03-problems/05-koko-bananas)
