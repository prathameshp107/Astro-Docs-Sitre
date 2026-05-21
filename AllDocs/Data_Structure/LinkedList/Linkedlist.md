# 🔗 Linked Lists: A Beginner-Friendly Complete Guide

---

## 📑 Table of Contents

1. [What is a Linked List?](#1-what-is-a-linked-list)
2. [Types of Linked Lists](#2-types-of-linked-lists)
3. [Time and Space Complexity](#3-time-and-space-complexity)
4. [Core Operations (Step by Step)](#4-core-operations-step-by-step)
5. [Important Patterns (Made Simple)](#5-important-patterns-made-simple)
6. [Key Algorithms](#6-key-algorithms)
7. [Problem-Solving Approach](#7-problem-solving-approach)
8. [Code Examples](#8-code-examples)
9. [Must-Do Interview Questions](#9-must-do-interview-questions)
10. [Tips and Common Mistakes](#10-tips-and-common-mistakes)

---

## 1. What is a Linked List?

### 🎯 Simple Real-Life Analogy

Imagine a **treasure hunt** 🗺️:
- You find clue #1 in your mailbox. It says: *"Go check under the doormat."*
- Under the doormat is clue #2: *"Look in the kitchen drawer."*
- In the kitchen drawer is clue #3: *"Treasure is in the garage!"*

Each clue **holds a value AND tells you where to go next**. That's exactly a Linked List!

### 🔹 Definition

A **Linked List** is a chain of **nodes**, where each node has:
1. **Data** — the value (like the clue)
2. **Next** — the address of the next node (like "go to kitchen")

```
HEAD
 │
 ▼
┌─────┬───┐    ┌─────┬───┐    ┌─────┬───┐    ┌─────┬──────┐
│  10 │ ●─┼──▶ │  20 │ ●─┼──▶│  30 │ ●─┼──▶ │  40 │ NULL │
└─────┴───┘    └─────┴───┘    └─────┴───┘    └─────┴──────┘
  Node 1         Node 2         Node 3         Node 4
```

- **HEAD** = pointer to the first node (entry point)
- **NULL** = means "end of list" (no next node)

### 🤔 Why Not Just Use Arrays?

Think of an **array** like a row of seats in a movie theater — all glued together. If you want to add a seat in the middle, you have to **move everyone**.

A **linked list** is like friends holding hands in a line. To add someone in the middle, two people just **let go and grab the new person's hand**. Nobody else moves!

### 🔹 Arrays vs Linked Lists (Simple Table)

| What you want to do | Array | Linked List |
|---------------------|-------|-------------|
| Get the 5th item | ⚡ Instant (O(1)) | 🐢 Walk to it (O(n)) |
| Add item at start | 🐢 Shift everyone (O(n)) | ⚡ Instant (O(1)) |
| Add item at end | ⚡ Fast | 🐢 Walk to end |
| Memory used | Less | More (extra "next" pointer) |
| Fixed size? | Often yes | No, grows freely |

### 🔹 How It Looks in Memory

**Array** — items sit next to each other:
```
[10][20][30][40]   ← all in one block
```

**Linked List** — items can be anywhere in memory, connected by arrows:
```
[10] ──▶ (somewhere far) [20] ──▶ (another place) [30] ──▶ NULL
```

---

## 2. Types of Linked Lists

### 🔸 2.1 Singly Linked List (One-Way Street) ➡️

Each node points only to the **next** node. You can only move forward.

```
HEAD ──▶ [10|●] ──▶ [20|●] ──▶ [30|●] ──▶ NULL
```

```js
class Node {
  constructor(val) {
    this.val = val;     // the data
    this.next = null;   // arrow to next node
  }
}
```

**Think of it as:** A one-way street 🚗 — you can only drive forward.

---

### 🔸 2.2 Doubly Linked List (Two-Way Street) ⬅️➡️

Each node points to **both** the next AND the previous node.

```
NULL ◀── [●|10|●] ⇄ [●|20|●] ⇄ [●|30|●] ──▶ NULL
```

```js
class DNode {
  constructor(val) {
    this.val = val;
    this.prev = null;   // arrow to previous
    this.next = null;   // arrow to next
  }
}
```

**Think of it as:** A two-way street 🚗↔️ — drive forward OR backward.

✅ **Good:** Easy to go backward, easy to delete a node.
❌ **Bad:** Uses more memory (extra `prev` pointer).

---

### 🔸 2.3 Circular Linked List (Loop) 🔄

The last node points back to the **first** node, forming a circle.

```
   ┌──────────────────────────────┐
   ▼                              │
[10|●] ──▶ [20|●] ──▶ [30|●] ─────┘
 HEAD
```

**Think of it as:** A merry-go-round 🎠 — keeps going round and round.

**Used in:** Music playlists on repeat 🎵, turn-based games 🎮, round-robin scheduling.

---

## 3. Time and Space Complexity

### 🔹 Quick Reference Table

| Operation | Singly LL | Why? |
|-----------|----------|------|
| Get the Nth item | **O(n)** | Must walk from head |
| Search for value | **O(n)** | Must check each node |
| Insert at start | **O(1)** | Just rewire head |
| Insert at end | **O(n)** | Walk to last node |
| Delete from start | **O(1)** | Just move head forward |
| Delete from end | **O(n)** | Walk to find 2nd last |

**Memory:** O(n) for n nodes.

### 🔹 When to Use Which?

| Use **Linked List** when... | Use **Array** when... |
|-----------------------------|----------------------|
| You add/remove at the start a lot | You need fast random access (`arr[5]`) |
| You don't know how big it'll get | Memory matters (cache friendly) |
| You're building stacks/queues | You do lots of math/range queries |

---

## 4. Core Operations (Step by Step)

Let's build a Linked List from scratch — **slowly and clearly**.

### 🏗️ The Setup

```js
// A single node = one box with value + arrow
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// The Linked List itself = just remembers the HEAD
class LinkedList {
  constructor() {
    this.head = null;  // empty list to start
  }
}
```

---

### 🔸 4.1 Insertion

#### ➕ Insert at the Beginning (Easy! O(1))

**Goal:** Add `5` to the start of `10 → 20 → 30`.

**Steps:**
1. Make a new node with value `5`.
2. Point new node's `next` to current head (`10`).
3. Update head to point to new node.

```
Before:        HEAD ──▶ [10] ──▶ [20] ──▶ [30] ──▶ NULL

Step 1:        [5|?]                                       (new node, ? = unknown)
Step 2: [5|●]──▶[10] ──▶ [20] ──▶ [30] ──▶ NULL            (point to old head)
Step 3: HEAD ──▶ [5] ──▶ [10] ──▶ [20] ──▶ [30] ──▶ NULL   (move head)
```

```js
insertAtHead(val) {
  const node = new Node(val);  // Step 1: create node
  node.next = this.head;       // Step 2: point to old head
  this.head = node;            // Step 3: head is now the new node
}
```

---

#### ➕ Insert at the End (O(n))

**Goal:** Add `40` to end of `10 → 20 → 30`.

**Steps:**
1. Walk all the way to the **last node**.
2. Make last node's `next` point to the new node.

```
HEAD ──▶ [10] ──▶ [20] ──▶ [30] ──▶ NULL
                              │
                              ▼
                        ──▶ [40] ──▶ NULL
```

```js
insertAtTail(val) {
  const node = new Node(val);
  if (!this.head) {              // empty list? new node IS the list
    this.head = node;
    return;
  }
  let curr = this.head;
  while (curr.next) {            // walk until last node
    curr = curr.next;
  }
  curr.next = node;              // attach new node
}
```

---

#### ➕ Insert in the Middle

**Goal:** Insert `25` between `20` and `30`.

**Steps:**
1. Walk to the node **just before** where you want to insert (i.e., `20`).
2. Make new node point to `prev.next` (which is `30`).
3. Make `prev.next` point to the new node.

```
Before:  [10] ──▶ [20] ──▶ [30] ──▶ NULL
                   prev

After:   [10] ──▶ [20] ──▶ [25] ──▶ [30] ──▶ NULL
```

```js
insertAt(val, idx) {
  if (idx === 0) return this.insertAtHead(val);

  const node = new Node(val);
  let prev = this.head;
  for (let i = 0; i < idx - 1; i++) prev = prev.next;

  node.next = prev.next;   // new node points to what prev pointed to
  prev.next = node;        // prev now points to new node
}
```

> ⚠️ **The Golden Rule:** Always set the new node's `next` **FIRST**, then change `prev.next`. If you do it the other way, you lose the rest of the list!

---

### 🔸 4.2 Deletion

#### ➖ Delete from Beginning (Easy! O(1))

Just move the head one step forward.

```
Before: HEAD ──▶ [10] ──▶ [20] ──▶ [30]
After:           [10]    HEAD ──▶ [20] ──▶ [30]   (10 is forgotten)
```

```js
deleteHead() {
  if (!this.head) return;
  this.head = this.head.next;
}
```

---

#### ➖ Delete a Specific Value

**Goal:** Delete `20` from `10 → 20 → 30`.

**Steps:**
1. Find the node **just before** `20` (which is `10`).
2. Skip `20` by pointing `10.next` directly to `30`.

```
Before:  [10] ──▶ [20] ──▶ [30] ──▶ NULL
          prev    target

After:   [10] ──────────▶ [30] ──▶ NULL
                  ↑
              [20] is now orphaned (garbage collected)
```

```js
deleteByValue(val) {
  if (!this.head) return;

  // Special case: deleting the head itself
  if (this.head.val === val) {
    this.head = this.head.next;
    return;
  }

  let curr = this.head;
  while (curr.next && curr.next.val !== val) {
    curr = curr.next;       // walk until next node has the target
  }

  if (curr.next) {
    curr.next = curr.next.next;  // skip the target
  }
}
```

---

### 🔸 4.3 Traversal (Walking the List)

Just like reading a treasure hunt, follow each clue until NULL.

```js
print() {
  let curr = this.head;
  while (curr) {
    process.stdout.write(curr.val + " -> ");
    curr = curr.next;
  }
  console.log("NULL");
}
// Output: 10 -> 20 -> 30 -> NULL
```

---

### 🔸 4.4 Searching

Walk and check each node.

```js
search(val) {
  let curr = this.head, idx = 0;
  while (curr) {
    if (curr.val === val) return idx;
    curr = curr.next;
    idx++;
  }
  return -1;  // not found
}
```

---

## 5. Important Patterns (Made Simple)

These are **tricks** that solve 90% of linked list problems. Learn them well!

---

### 🐢🐰 5.1 Fast & Slow Pointer (The Tortoise and the Hare)

**The Trick:** Use two pointers — one moves **1 step**, the other moves **2 steps** at a time.

**Why it works:**
- Fast reaches the end **twice as quickly**.
- When fast is at the end, slow is at the **middle**.
- If there's a **loop**, fast will eventually **lap** slow and meet it.

```
Start:    [1] [2] [3] [4] [5]
           ↑
          slow, fast

Step 1:   [1] [2] [3] [4] [5]
               ↑   ↑
              slow fast

Step 2:   [1] [2] [3] [4] [5]
                   ↑       ↑
                  slow    fast  ← fast at end, slow at middle!
```

**Use it for:**
- Finding the middle ✅
- Detecting loops ✅
- Finding the Nth node from the end ✅

---

### 🔄 5.2 Reversing a Linked List

**The Trick:** Walk through and **flip each arrow backward**.

You need 3 helpers: `prev`, `curr`, `next`.

```
Goal: 1 → 2 → 3 → NULL  becomes  NULL ← 1 ← 2 ← 3
```

**Step by step:**
```
Initial:  prev=NULL, curr=1
          NULL    [1] → [2] → [3] → NULL

Step 1:   Save next (2), flip 1's arrow to NULL
          NULL ← [1]    [2] → [3] → NULL
                 prev   curr

Step 2:   Save next (3), flip 2's arrow to 1
          NULL ← [1] ← [2]    [3] → NULL
                       prev   curr

Step 3:   Save next (NULL), flip 3's arrow to 2
          NULL ← [1] ← [2] ← [3]
                              prev (new head!)
```

We'll see the code in Section 6.

---

### 📍 5.3 Finding the Middle

Just use **fast & slow pointers** (see 5.1). When fast hits the end, slow is at the middle. **Easy!**

---

### 🔁 5.4 Detecting a Loop

If a linked list has a cycle (loops back), how do we detect it?

**Floyd's Algorithm:**
- Move slow 1 step, fast 2 steps.
- If they ever **meet**, there's a loop.
- If fast reaches NULL, there's no loop.

```
        ┌─────────────┐
        ▼             │
[1] → [2] → [3] → [4] → (back to 2)

slow & fast both start at 1.
Eventually they meet inside the loop. 🎯
```

---

### 🔀 5.5 Merging Two Sorted Lists

**The Trick:** Like zipping a zipper 🤐. Compare the heads of both lists, attach the smaller one, repeat.

```
List A: 1 → 3 → 5
List B: 2 → 4 → 6

Step 1: 1 < 2, take 1.   Result: 1
Step 2: 3 > 2, take 2.   Result: 1 → 2
Step 3: 3 < 4, take 3.   Result: 1 → 2 → 3
... and so on.

Final: 1 → 2 → 3 → 4 → 5 → 6
```

---

### 🪞 5.6 Palindrome Check

A palindrome reads the same forward and backward (e.g., `1 → 2 → 2 → 1`).

**The Trick:**
1. Find the middle.
2. Reverse the second half.
3. Compare both halves node by node.

---

### ✂️ 5.7 Intersection of Two Lists

Two lists merge at some node. Find that node.

**The Magic Trick:**
- Pointer A walks list A, then jumps to list B.
- Pointer B walks list B, then jumps to list A.
- They will **meet at the intersection** (or both reach NULL).

**Why?** Both pointers travel the same total distance, syncing up at the meeting point.

---

## 6. Key Algorithms

### 🔄 Reverse Linked List (Iterative)

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

### 🔄 Reverse Linked List (Recursive)

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

### 🐢🐰 Cycle Detection

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

### 🔀 Merge Two Sorted Lists

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

## 7. Problem-Solving Approach

### 🔍 How to Spot a Linked List Pattern

| Problem says... | Use... |
|-----------------|--------|
| "Find the middle" or "Nth from end" | 🐢🐰 Fast & Slow Pointer |
| "Has a cycle?" | 🐢🐰 Floyd's Algorithm |
| "Reverse" or "Reorder" | 🔄 3-Pointer Reversal |
| "Merge" or "Sort" | 🪄 Dummy Node + Two Pointers |
| "Palindrome" | Find Middle + Reverse + Compare |
| "Intersection of two lists" | Two-Pointer Length Sync |

---

### 🛠️ Pointer Manipulation Rules

1. **ALWAYS save `next` before changing it.** Otherwise, you lose the rest of the list.
2. **Use a dummy node** when the head might change.
3. **Draw it on paper.** Pointer problems are 10x easier to visualize.
4. **Use 3 pointers** (`prev`, `curr`, `next`) for most reversal-type problems.

---

### ⚠️ Edge Cases to Always Test

- ✅ Empty list (`head = null`)
- ✅ Single node
- ✅ Two nodes
- ✅ Operating on head or tail
- ✅ List with a cycle (if not guaranteed acyclic)

---

## 8. Code Examples

### Example 1: Find the Middle 🎯

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

### Example 2: Remove Nth Node from End

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

### Example 3: Palindrome Check 🪞

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

### Example 4: Intersection of Two Lists ✂️

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

## 9. Must-Do Interview Questions

### 🟢 Easy (Start Here!)
1. Reverse a Linked List
2. Find the Middle of Linked List
3. Detect a Cycle
4. Merge Two Sorted Lists
5. Remove Duplicates from Sorted List
6. Palindrome Linked List
7. Intersection of Two Linked Lists
8. Delete Node (given only that node)

### 🟡 Medium
1. Add Two Numbers (digits as linked list)
2. Remove Nth Node from End
3. Find Cycle Start (Floyd's Phase 2)
4. Reorder List
5. Odd Even Linked List
6. Swap Nodes in Pairs
7. Rotate List
8. Copy List with Random Pointer
9. Sort List (merge sort)

### 🔴 Hard
1. Reverse Nodes in k-Group
2. Merge k Sorted Lists
3. LRU Cache (Doubly Linked List + HashMap)
4. LFU Cache

---

## 10. Tips and Common Mistakes

### ✅ Pro Tips

- 📝 **Draw on paper** before coding. Seriously.
- 🪄 **Use a dummy node** when head changes — it removes annoying special cases.
- 🐢🐰 **Master fast & slow pointers** — they unlock so many problems.
- 🧩 **Combine techniques**: Hard problems = "find middle" + "reverse" + "merge".
- 🧪 **Test 4 cases**: empty, 1 node, 2 nodes, normal case.

### ❌ Common Mistakes

- 🔴 **Losing the rest of the list** — forgot to save `next` before changing pointers.
- 🔴 **Forgetting to update head** when inserting/deleting at start.
- 🔴 **Null pointer crash** — accessed `node.next` without checking `node` first.
- 🔴 **Infinite loop** — forgot `curr = curr.next` inside `while`.
- 🔴 **Dangling cycle** — when reversing, forgot to set the old head's `next = null`.

### 🧠 Final Mental Model

> Think of a linked list as a **paper chain** 📎 made of links.
> - To **add** a link, cut one connection, slip in the new piece, reconnect.
> - To **remove** a link, unhook it and reconnect the two neighbors.
> - To **reverse**, flip every link's direction one by one.
>
> Always hold onto the **next link** before you cut, or you'll drop the rest of the chain on the floor!

