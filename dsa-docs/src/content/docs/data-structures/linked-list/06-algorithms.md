---
title: "Key Algorithms"
description: "Complete code implementations of essential linked list algorithms — reverse, cycle detection, merge."
sidebar:
  order: 6
practice:
  visualizer: /visualizer/linked-list
---

# Key Algorithms

Full code implementations for the most important linked list algorithms.

---

## 🔄 Reverse Linked List (Iterative)

```js
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next;  // 1️⃣ remember next (don't lose it!)
    curr.next = prev;        // 2️⃣ flip arrow backward
    prev = curr;             // 3️⃣ move prev forward
    curr = next;             // 4️⃣ move curr forward
  }

  return prev;  // prev is the new head
}
```

> 💡 **Memory trick:** *Save → Flip → Move → Move*

---

## 🔄 Reverse Linked List (Recursive)

```js
function reverseListRec(head) {
  // Base case: empty or single node
  if (!head || !head.next) return head;

  // Reverse the rest of the list first
  const newHead = reverseListRec(head.next);

  // Make the next node point back to current
  head.next.next = head;
  head.next = null;

  return newHead;
}
```

---

## 🐢🐰 Cycle Detection (Floyd's Algorithm)

```js
function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;          // 1 step
    fast = fast.next.next;     // 2 steps
    if (slow === fast) return true;  // they met = cycle!
  }
  return false;  // fast reached end = no cycle
}
```

---

## 🔀 Merge Two Sorted Lists

```js
function mergeTwoLists(l1, l2) {
  const dummy = new Node(0);   // 🪄 dummy node simplifies code
  let tail = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  tail.next = l1 || l2;  // attach whatever's left
  return dummy.next;     // skip dummy, return real head
}
```

> 💡 **Dummy Node Trick:** A fake starting node makes code cleaner because you don't have to handle "what if the result list is empty?" separately.

---

## 🎯 Find the Middle

```js
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
```

---

## ✂️ Remove Nth Node from End

**Trick:** Use two pointers with a **gap of N** between them.

```js
function removeNthFromEnd(head, n) {
  const dummy = new Node(0);
  dummy.next = head;
  let fast = dummy, slow = dummy;

  // Move fast N+1 steps ahead
  for (let i = 0; i <= n; i++) fast = fast.next;

  // Move both until fast reaches end
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  // Now slow is just before the node to remove
  slow.next = slow.next.next;
  return dummy.next;
}
```

---

## 🪞 Palindrome Check

```js
function isPalindrome(head) {
  // 1. Find middle
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. Reverse second half
  let prev = null, curr = slow;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // 3. Compare both halves
  let left = head, right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}
```

---

## ✂️ Intersection of Two Lists

```js
function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;
  let a = headA, b = headB;

  // Each pointer walks A then B (or B then A)
  // They meet at intersection (or both at null)
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  return a;
}
```

---

## Related

- [Important Patterns](/DSA-Notes-Problems/data-structures/linked-list/05-patterns) — Conceptual overview of these patterns
- [Problem-Solving Approach](/DSA-Notes-Problems/data-structures/linked-list/07-problem-solving) — How to approach linked list problems
- [Interview Questions](/DSA-Notes-Problems/data-structures/linked-list/08-interview-questions) — Practice problems to apply these algorithms
