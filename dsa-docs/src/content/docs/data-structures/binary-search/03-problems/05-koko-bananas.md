---
title: "Problem 5 — Koko Eating Bananas"
description: "LeetCode 875 — Find the minimum eating speed for Koko to finish all banana piles within h hours."
sidebar:
  order: 5
---

# Problem 5 — Koko Eating Bananas

**LeetCode 875** | Difficulty: 🟡 Medium

---

## 🎯 Problem Statement

Koko loves bananas. There are `piles` of bananas, and the `i-th` pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can eat at speed `k` bananas per hour. If a pile has fewer than `k` bananas, she finishes it and moves on (but **cannot** eat from multiple piles in the same hour).

Find the **minimum integer k** such that Koko can eat all bananas within `h` hours.

```
Input:  piles = [3, 6, 7, 11], h = 8
Output: 4

Input:  piles = [30, 11, 23, 4, 20], h = 5
Output: 30

Input:  piles = [30, 11, 23, 4, 20], h = 6
Output: 23
```

---

## 🧠 Pattern: Answer Space Search (Pattern 3)

**Answer space:** The eating speed `k` ranges from `1` to `max(piles)` (eating the biggest pile in 1 hour).

**Monotonic property:** If Koko can finish at speed `k`, she can also finish at speed `k+1`.

```text
Speed:   1     2     3     4     5     6     7     8 ...
Can finish?    ✗     ✗     ✓     ✓     ✓     ✓     ✓
                           ↑ Minimum feasible speed
```

---

## 💻 Solution

```javascript
function minEatingSpeed(piles, h) {
  function canFinish(k) {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / k);
    }
    return hours <= h;
  }

  let lo = 1;
  let hi = Math.max(...piles);
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

console.log(minEatingSpeed([3, 6, 7, 11], 8));      // 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6)); // 23
```

---

## 🧪 Walkthrough

```
piles = [3, 6, 7, 11], h = 8

lo=1, hi=11 (max of piles)

Step 1: mid=6 →  canFinish(6)=ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 ≤ 8 ✓
          result=6, hi=5 (try slower)

Step 2: mid=3 →  canFinish(3)=ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 > 8 ✗
          lo=4 (try faster)

Step 3: mid=4 →  canFinish(4)=ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 ≤ 8 ✓
          result=4, hi=3 (try slower)

Step 4: lo=4, hi=3 → loop exits

Return: 4 ✓
```

---

## 📊 Complexity

| Metric | Value |
|--------|-------|
| Time | **O(n × log(max(piles)))** — binary search × checking each pile |
| Space | **O(1)** |

---

## 🎯 Variations

### Variation: Return Speed With Minimum Hours

```javascript
function minEatingSpeedWithDetails(piles, h) {
  function canFinish(k) {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / k);
    }
    return { feasible: hours <= h, hours };
  }

  let lo = 1, hi = Math.max(...piles);
  let result = { speed: hi, hours: 0 };

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const { feasible, hours } = canFinish(mid);

    if (feasible) {
      result = { speed: mid, hours };
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return result; // { speed: 4, hours: 8 }
}
```

---

## 🔑 Key Takeaways

- **Classic Pattern 3** — binary search on the answer space
- **Check function is O(n)** — simple, just sum `Math.ceil(pile / k)`
- **Answer range:** `1` to `max(piles)`
- **Result tracking:** record each valid `mid` and keep searching for smaller
- This pattern (min feasible) is the **most common binary search pattern in interviews**

---

## 🔗 Related

- [Problem 6 — Ship Packages →](/DSA-Notes-Problems/data-structures/binary-search/03-problems/06-ship-packages) (same pattern)
- [Pattern 3 — Search on Answer](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer)
- [Back to Problems Index](/DSA-Notes-Problems/data-structures/binary-search/03-problems)
