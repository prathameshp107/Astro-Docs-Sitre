---
title: "Classic Greedy Problems"
description: "Activity selection/interval scheduling, fractional knapsack, jump game, gas station — with dry runs and optimal solutions."
sidebar:
  order: 2
---

# 🏆 Classic Greedy Problems

---

## Problem 1: Activity Selection (Interval Scheduling)

**Problem:** Given start and end times of activities, select the maximum number of non-overlapping activities.

**Greedy choice:** Pick the activity that **ends the earliest** — this leaves the most room for remaining activities.

```javascript
function activitySelection(activities) {
  // Sort by end time (ascending)
  activities.sort((a, b) => a.end - b.end);

  const selected = [activities[0]];
  let lastEnd = activities[0].end;

  for (let i = 1; i < activities.length; i++) {
    if (activities[i].start >= lastEnd) {
      selected.push(activities[i]);
      lastEnd = activities[i].end;
    }
  }

  return selected;
}

const activities = [
  { start: 1, end: 4 },  // Painting
  { start: 3, end: 5 },  // Dancing
  { start: 0, end: 6 },  // Cooking
  { start: 5, end: 7 },  // Reading
  { start: 8, end: 9 },  // Writing
  { start: 5, end: 9 },  // Cleaning
];

activitySelection(activities);
// Returns: [Painting(1-4), Reading(5-7), Writing(8-9)]
```

**Dry run:**
```
Sorted by end: (0-6), (1-4), (3-5), (5-7), (5-9), (8-9)
                ↓ sort
Sorted by end: (1-4), (3-5), (0-6), (5-7), (5-9), (8-9)
                                                   
Pick (1-4):  lastEnd = 4
(3-5): start=3 < 4 → skip
(0-6): start=0 < 4 → skip
(5-7): start=5 ≥ 4 → pick ✅, lastEnd = 7
(5-9): start=5 < 7 → skip
(8-9): start=8 ≥ 7 → pick ✅
Result: [(1-4), (5-7), (8-9)] — 3 activities
```

**Time:** O(n log n) for sorting | **Space:** O(1)

---

## Problem 2: Fractional Knapsack

**Problem:** Fill a knapsack of capacity W with items. You can take fractions of items. Maximize total value.

**Greedy choice:** Take items with the **highest value-to-weight ratio** first.

```javascript
function fractionalKnapsack(items, capacity) {
  // Sort by value/weight ratio (descending)
  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

  let totalValue = 0;
  let remaining = capacity;

  for (const item of items) {
    if (remaining >= item.weight) {
      // Take the whole item
      totalValue += item.value;
      remaining -= item.weight;
    } else {
      // Take a fraction
      totalValue += item.value * (remaining / item.weight);
      break;  // Knapsack is full
    }
  }

  return totalValue;
}

const items = [
  { value: 60, weight: 10 },  // Ratio: 6
  { value: 100, weight: 20 }, // Ratio: 5
  { value: 120, weight: 30 }, // Ratio: 4
];
fractionalKnapsack(items, 50);  // 240
// Take all of item 1 (10), all of item 2 (20), 20/30 of item 3 = 240
```

**Time:** O(n log n) | **Space:** O(1)

> **Contrast with 0/1 Knapsack:** If you can't take fractions, greedy FAILS — use DP instead.

---

## Problem 3: Jump Game

**Problem:** You start at index 0 of an array. Each element is the **maximum jump length** from that position. Can you reach the last index?

**Greedy choice:** Track the **farthest reachable position** — if you can reach it, you can reach everything before it.

```javascript
function canJump(nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;  // Can't reach this position
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true;
  }

  return false;
}

canJump([2, 3, 1, 1, 4]);  // true
canJump([3, 2, 1, 0, 4]);  // false
```

**Dry run on [2, 3, 1, 1, 4]:**
```
i=0: farthest = max(0, 0+2) = 2
i=1: farthest = max(2, 1+3) = 4 → can reach end! ✅
```

**Time:** O(n) | **Space:** O(1)

---

## Problem 4: Gas Station

**Problem:** There are `n` gas stations on a circular route. You have a car with unlimited gas tank. Given `gas[i]` (gas available at station i) and `cost[i]` (gas cost to go from i to i+1), find the starting station that lets you complete the circuit. If impossible, return -1.

**Greedy choice:** If total gas < total cost → impossible. Otherwise, **start after the station where the deficit is largest** (or equivalently, start where running balance is most negative).

```javascript
function canCompleteCircuit(gas, cost) {
  let total = 0;
  let current = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    current += diff;

    // If running balance goes negative, restart from next station
    if (current < 0) {
      start = i + 1;
      current = 0;
    }
  }

  return total >= 0 ? start : -1;
}

canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]);  // 3
canCompleteCircuit([2, 3, 4], [3, 4, 3]);               // -1
```

**Time:** O(n) | **Space:** O(1)

---

## Problem Comparison

| Problem | Greedy Choice | Complexity | Why Greedy Works |
|---------|--------------|------------|-----------------|
| Activity Selection | Pick earliest end time | O(n log n) | Earliest finish leaves max room |
| Fractional Knapsack | Highest value/weight ratio | O(n log n) | Fractions allow perfect greedy |
| Jump Game | Max reachable from current | O(n) | One pass — reachable chain |
| Gas Station | Start after max deficit | O(n) | If total gas ≥ cost, solution exists |
| Huffman Coding | Merge two smallest freq | O(n log n) | Optimal prefix codes |

---

## ✅ In Simple Words

- **Activity selection**: Sort by end time, pick non-overlapping activities.
- **Fractional knapsack**: Sort by value/weight, take the best until full.
- **Jump game**: Track the farthest you can reach — if you can reach a position, the path before it works.
- **Gas station**: If total gas < total cost → impossible. Otherwise, start where the deficit bottomed out.
- All four are O(n log n) or O(n) — greedy is fast because it makes one decision and never looks back.
