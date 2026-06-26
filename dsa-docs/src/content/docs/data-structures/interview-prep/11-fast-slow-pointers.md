---
title: "Fast & Slow Pointers Pattern"
description: "Two pointers moving at different speeds to detect cycles and find middle elements."
sidebar:
  order: 11
---

# Fast & Slow Pointers (Tortoise & Hare)

> Two pointers move through a sequence at different speeds. The "slow" moves one step, the "fast" moves two. This pattern detects cycles and finds the middle of a linked list.

---

## When to Spot This Pattern

- "Detect cycle in linked list"
- "Find middle of linked list"
- "Find start of cycle"
- "Happy number" (cycle detection in a state machine)
- "Find duplicate number" (treat array indices as linked list)

---

## Core Idea

```
Slow:  1 step at a time
Fast:  2 steps at a time

If there's a cycle → Fast and Slow will meet inside the cycle.
If no cycle → Fast reaches the end first.
```

---

## Implementation

### Detect Cycle in Linked List

```javascript
function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;       // move 1 step
    fast = fast.next.next;  // move 2 steps

    if (slow === fast) return true; // they met → cycle!
  }

  return false; // fast reached end → no cycle
}
```

**Time:** O(N) · **Space:** O(1)

### Find Middle of Linked List

```javascript
function middleNode(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow; // slow is now at the middle
}
```

### Find Start of Cycle

```javascript
function detectCycleStart(head) {
  let slow = head, fast = head;

  // Phase 1: Find meeting point
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (!fast || !fast.next) return null; // no cycle

  // Phase 2: Reset one pointer to head, both move 1 step
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow; // start of cycle
}
```

---

## Find Duplicate Number

**Problem:** An array of N+1 integers in range [1, N]. One number is duplicated. Find it without extra space.

**Idea:** Treat `nums[i]` as a linked list pointer → fast & slow cycle detection.

```javascript
function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];

  // Phase 1: Find meeting point
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: Find cycle start (duplicate)
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}
```

**Time:** O(N) · **Space:** O(1)

---

## In Simple Words

- Two pointers: slow moves 1, fast moves 2 — if they meet, there's a cycle.
- After detecting a cycle, reset one pointer to start, move both at 1 — their meeting point is the cycle start.
- Also great for finding the middle of a linked list (slow is at middle when fast reaches end).
