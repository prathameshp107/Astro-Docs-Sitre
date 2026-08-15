---
title: "Real-World Binary Search Problems"
description: "Advanced binary search problems — Painter's Partition, Aggressive Cows, Magnetic Force Between Balls, Minimum Time to Complete Trips."
sidebar:
  order: 4
practice:
  visualizer: /visualizer/searching
---

# Real-World Binary Search Problems

---

## 🎯 Problem 1 — Painter's Partition Problem

**Problem:** Given `k` painters and an array of board lengths, each painter paints **contiguous** boards. Each painter takes `boardLength * unitTime` time. Find the **minimum time** to paint all boards.

```
Boards: [5, 10, 30, 20, 15], Painters: 3
Output: 35

Optimal:
  Painter 1: [5, 10] → 15
  Painter 2: [30]    → 30
  Painter 3: [20, 15] → 35
  Max time = 35 (minimized)
```

### Solution

```javascript
function minTimeToPaint(boards, k) {
  function canPaint(maxTime) {
    let painters = 1;
    let currentTime = 0;

    for (const board of boards) {
      if (currentTime + board > maxTime) {
        painters++;
        currentTime = 0;
      }
      currentTime += board;
    }

    return painters <= k;
  }

  let lo = Math.max(...boards);   // Must paint the largest board
  let hi = boards.reduce((a, b) => a + b, 0); // One painter does all
  let result = hi;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canPaint(mid)) {
      result = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return result;
}

console.log(minTimeToPaint([5, 10, 30, 20, 15], 3)); // 35
```

---

## 🎯 Problem 2 — Aggressive Cows

**Problem:** Place `k` cows in `n` stalls such that the **minimum distance** between any two cows is **maximized**.

```
Stall positions: [1, 2, 4, 8, 9], Cows: 3
Output: 3

Place cows at positions 1, 4, 8 → distances: 3, 4 → min distance = 3
Can we do better? 1, 4, 9 → distances: 3, 5 → min is still 3
```

### Solution

```javascript
function aggressiveCows(stalls, k) {
  stalls.sort((a, b) => a - b); // Must be sorted

  function canPlace(minDist) {
    let count = 1;
    let lastPos = stalls[0];

    for (let i = 1; i < stalls.length; i++) {
      if (stalls[i] - lastPos >= minDist) {
        count++;
        lastPos = stalls[i];
      }
    }

    return count >= k;
  }

  let lo = 1; // Minimum possible distance
  let hi = stalls[stalls.length - 1] - stalls[0]; // Maximum possible distance
  let result = lo;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canPlace(mid)) {
      result = mid; // Distance mid works — try larger
      lo = mid + 1;
    } else {
      hi = mid - 1; // Distance mid too large — try smaller
    }
  }

  return result;
}

console.log(aggressiveCows([1, 2, 4, 8, 9], 3)); // 3
console.log(aggressiveCows([1, 2, 4, 8, 9], 2)); // 8
```

---

## 🎯 Problem 3 — Magnetic Force Between Two Balls

**LeetCode 1552** | Same pattern as Aggressive Cows:

```javascript
function maxDistance(position, m) {
  position.sort((a, b) => a - b);

  function canPlace(minForce) {
    let count = 1;
    let lastPos = position[0];

    for (let i = 1; i < position.length; i++) {
      if (position[i] - lastPos >= minForce) {
        count++;
        lastPos = position[i];
      }
    }

    return count >= m;
  }

  let lo = 1;
  let hi = position[position.length - 1] - position[0];
  let result = lo;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canPlace(mid)) {
      result = mid;
      lo = mid + 1; // Try larger distance
    } else {
      hi = mid - 1;
    }
  }

  return result;
}
```

---

## 🎯 Problem 4 — Minimum Time to Complete Trips

**LeetCode 2187** | Another Pattern 3 (Answer Space) problem:

```javascript
function minimumTime(time, totalTrips) {
  function canComplete(givenTime) {
    let trips = 0;
    for (const t of time) {
      trips += Math.floor(givenTime / t);
      if (trips >= totalTrips) return true; // Early exit
    }
    return trips >= totalTrips;
  }

  let lo = 1;
  let hi = Math.min(...time) * totalTrips; // Upper bound
  let result = hi;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canComplete(mid)) {
      result = mid;
      hi = mid - 1; // Try less time
    } else {
      lo = mid + 1; // Need more time
    }
  }

  return result;
}

console.log(minimumTime([1, 2, 3], 5)); // 3
console.log(minimumTime([2], 1));       // 2
```

---

## 📋 Pattern Summary

| Problem | Search Space | Condition | Goal |
|---------|-------------|-----------|------|
| Painter's Partition | `max(boards)` to `sum(boards)` | `paintersNeeded ≤ k` | Minimize max time |
| Aggressive Cows | `1` to `(max-min)` | `cowsPlaced ≥ k` | Maximize min distance |
| Magnetic Force | `1` to `(max-min)` | `ballsPlaced ≥ m` | Maximize min force |
| Minimum Time | `1` to `min(time)×totalTrips` | `tripsCompleted ≥ totalTrips` | Minimize max time |

---

## 🔑 Key Takeaways

- **All 4 problems use Pattern 3** — binary search on answer space
- **Two types of monotonic functions:**
  - **Minimize max** (Painter, Ship, Time) → `condition(mid) ? hi=mid-1 : lo=mid+1`
  - **Maximize min** (Cows, Force) → `condition(mid) ? lo=mid+1 : hi=mid-1`
- The check function is **greedy** — simulate the process and count
- These problems are **muscle memory** — once you recognize the pattern, the solution is mechanical

---

## 🔗 Related

- [Back to Advanced Index](/DSA-Notes-Problems/data-structures/binary-search/04-advanced)
- [Pattern 3 — Search on Answer](/DSA-Notes-Problems/data-structures/binary-search/02-patterns/03-search-on-answer)
- [Problems — Koko Bananas](/DSA-Notes-Problems/data-structures/binary-search/03-problems/05-koko-bananas)
