---
title: "Monotonic Stack Pattern"
description: "Maintain a stack with increasing/decreasing order to solve next greater/smaller element problems."
sidebar:
  order: 14
---

# Monotonic Stack (Interview Pattern)

> A **monotonic stack** keeps elements in sorted order as you push. When a new element breaks the order, you pop until the order is restored. This helps find the "next greater" or "next smaller" element efficiently.

---

## When to Spot This Pattern

- "Next greater element"
- "Largest rectangle in histogram"
- "Daily temperatures" (days until warmer)
- "Stock span" (consecutive days with lower price)
- "Trapping rain water"

---

## Pattern Template

```javascript
function monotonicStack(nums) {
  const stack = [];
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Pop while stack top breaks the monotonic order
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop();
      result[idx] = nums[i]; // or i - idx for distance
    }
    stack.push(i); // store indices
  }

  // Remaining elements have no "next greater"
  while (stack.length) {
    result[stack.pop()] = -1;
  }

  return result;
}
```

---

## Example: Daily Temperatures

**Problem:** For each day, how many days until a warmer temperature?

```javascript
function dailyTemperatures(temps) {
  const n = temps.length;
  const result = new Array(n).fill(0);
  const stack = []; // stores indices, decreasing temperatures

  for (let i = 0; i < n; i++) {
    while (stack.length && temps[stack[stack.length - 1]] < temps[i]) {
      const prevIdx = stack.pop();
      result[prevIdx] = i - prevIdx; // days until warmer
    }
    stack.push(i);
  }

  return result;
}

// temps = [73, 74, 75, 71, 69, 72, 76, 73]
// Output: [1, 1, 4, 2, 1, 1, 0, 0]
```

**Time:** O(N) · **Space:** O(N)

---

## Example: Largest Rectangle in Histogram

**Problem:** Find the largest rectangle in a histogram (heights array).

```javascript
function largestRectangleArea(heights) {
  const stack = []; // increasing stack of indices
  let maxArea = 0;
  heights.push(0); // sentinel

  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      const h = heights[stack.pop()];
      const left = stack.length ? stack[stack.length - 1] : -1;
      const width = i - left - 1;
      maxArea = Math.max(maxArea, h * width);
    }
    stack.push(i);
  }

  return maxArea;
}

// heights = [2, 1, 5, 6, 2, 3]
// Max area = 10 (5×2 from heights 5 and 6)
```

**Time:** O(N) · **Space:** O(N)

---

## Summary of Monotonic Stack Problems

| Problem | Stack Direction | What We Pop |
|---------|:--------------:|-------------|
| Next Greater | Decreasing | Smaller elements |
| Previous Greater | Decreasing (left→right) | Smaller elements |
| Next Smaller | Increasing | Larger elements |
| Largest Histogram | Increasing | Taller bars |
| Stock Span | Decreasing | Lower prices (store index diff) |

---

## In Simple Words

- Monotonic stack = elements stay sorted. Break order? Pop until fixed.
- Walking left→right with a decreasing stack finds "next greater element" on the right.
- Walking left→right with an increasing stack finds "next smaller element."
- Each element is pushed and popped at most once → O(N) total.
