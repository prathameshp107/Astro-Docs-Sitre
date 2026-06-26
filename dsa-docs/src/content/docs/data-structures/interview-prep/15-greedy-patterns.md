---
title: "Greedy Patterns"
description: "When to spot greedy problems and how to prove they work — with classic examples."
sidebar:
  order: 15
---

# Greedy Patterns

> A **greedy** algorithm picks the best choice **right now**, hoping it leads to the global best answer. It's the simplest approach when it works — but it only works for specific problem types.

---

## When to Spot Greedy

**Signs a greedy approach might work:**
- **Local decisions** that do not depend on future choices
- **Sorting** then picking the best at each step
- **"You can rearrange"** — problems where order can be changed
- **"Maximum/minimum number of something"** — interval scheduling, coin change with canonical coins
- **No future look-ahead needed** — the best choice now is always safe

---

## Classic Greedy Problems

### 1. Activity Selection (Maximum Non-Overlapping Tasks)

**Problem:** Given start/end times, pick the maximum number of non-overlapping tasks.

**Greedy choice:** Always pick the task that **ends earliest** — leaves the most room for others.

```javascript
function activitySelection(activities) {
  // Sort by end time
  activities.sort((a, b) => a.end - b.end);

  let count = 1;
  let lastEnd = activities[0].end;

  for (let i = 1; i < activities.length; i++) {
    if (activities[i].start >= lastEnd) {
      count++;
      lastEnd = activities[i].end;
    }
  }

  return count;
}

// activities = [{s:1,e:3}, {s:2,e:5}, {s:3,e:6}, {s:5,e:7}, {s:6,e:8}]
// Sorted by end: [1-3, 2-5, 3-6, 5-7, 6-8]
// Pick [1-3], skip [2-5], pick [3-6]? No, 3<3 → skip, pick [5-7], pick [6-8]? No
// Result: 3 ([1-3], [5-7], [6-8]) — wait, [6-8] overlaps with [5-7]!
// Correct: pick [1-3], skip [2-5], skip [3-6], pick [5-7], skip [6-8]
// Result: 2
```

**Time:** O(N log N) · **Space:** O(1)

### 2. Jump Game

**Problem:** Can you reach the last index? Each element is the maximum jump length from that position.

**Greedy choice:** Track the **farthest reachable index** as you walk.

```javascript
function canJump(nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false; // can't reach this index
    farthest = Math.max(farthest, i + nums[i]);
  }

  return true; // reached the end
}

// nums = [2, 3, 1, 1, 4]
// i=0: farthest=2
// i=1: farthest=4 (1+3)
// i=2: farthest=4
// i=3: farthest=4
// i=4: farthest=8 → ✅ reachable
```

**Time:** O(N) · **Space:** O(1)

### 3. Gas Station

**Problem:** A circular route with gas stations. Each station has gas[i] and cost to next station. Find starting station to complete the circuit.

```javascript
function canCompleteCircuit(gas, cost) {
  let total = 0, current = 0, start = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    current += diff;

    if (current < 0) {
      // Can't start from 'start', try next station
      start = i + 1;
      current = 0;
    }
  }

  return total >= 0 ? start : -1;
}

// gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]
// total = -2 + -2 + -2 + 3 + 3 = 0 → possible
// start=0, current=1-3=-2 → reset start=1
// start=1, current=2-4=-2 → reset start=2
// start=2, current=3-5=-2 → reset start=3
// start=3, current=4-1=3 → OK!
// Result: 3
```

**Time:** O(N) · **Space:** O(1)

---

## Greedy vs DP

| Aspect | Greedy | Dynamic Programming |
|--------|:------:|:------------------:|
| Decision | Best local choice | Evaluate all choices |
| State | None / minimal | Full state table |
| Proof needed | ✅ Greedy choice property | ✅ Optimal substructure |
| Example | Activity selection | 0/1 Knapsack |
| Speed | Fast (O(N log N)) | Slower (O(N²) or more) |

**When greedy fails:** If a local best choice might block a better global solution. E.g., coin change with denominations [1, 3, 4] and amount 6: greedy picks 4+1+1 (3 coins), but optimal is 3+3 (2 coins).

---

## In Simple Words

- Greedy = pick the best option right now without worrying about the future.
- Works when the problem has the "greedy choice property" — the best local choice is always part of the global best.
- Sort + iterate is the most common greedy pattern.
- If greedy fails for a problem, try DP instead.
