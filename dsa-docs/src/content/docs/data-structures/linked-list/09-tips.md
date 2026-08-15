---
title: "Tips & Common Mistakes"
description: "Expert tips, common pitfalls, and the final mental model for mastering linked lists."
sidebar:
  order: 9
practice:
  visualizer: /visualizer/linked-list
---

# Tips and Common Mistakes

---

## ✅ Pro Tips

- 📝 **Draw on paper** before coding. Seriously. A quick sketch saves hours of debugging.

- 🪄 **Use a dummy node** when head changes — it removes annoying special cases.

- 🐢🐰 **Master fast & slow pointers** — they unlock so many problems.

- 🧩 **Combine techniques**: Hard problems = "find middle" + "reverse" + "merge".

- 🧪 **Test 4 cases**: empty, 1 node, 2 nodes, normal case.

- 📊 **Trace pointer variables** (`prev`, `curr`, `next`) on paper for each iteration.

---

## ❌ Common Mistakes

| Mistake | Why it's bad | How to avoid |
|---------|-------------|--------------|
| 🔴 **Losing the rest of the list** | Forgot to save `next` before changing pointers | Always save `next` first |
| 🔴 **Forgetting to update head** | Inserting/deleting at start but head still points to old node | Always check if operation affects position 0 |
| 🔴 **Null pointer crash** | Accessed `node.next` without checking if `node` is null | Add null checks before `.next` access |
| 🔴 **Infinite loop** | Forgot `curr = curr.next` inside `while` | Always advance your pointer |
| 🔴 **Dangling cycle** | When reversing, forgot to set old head's `next = null` | After reversal, old head should point to null |
| 🔴 **Off-by-one** | Walked too far or not far enough in insert/delete | Use a simple example and trace step by step |

---

## 🧠 Final Mental Model

> Think of a linked list as a **paper chain** 📎 made of links.
>
> - To **add** a link, cut one connection, slip in the new piece, reconnect.
> - To **remove** a link, unhook it and reconnect the two neighbors.
> - To **reverse**, flip every link's direction one by one.
>
> Always hold onto the **next link** before you cut, or you'll drop the rest of the chain on the floor!

---

## 📚 Summary Cheat Sheet

```
🔗 LINKED LIST CHEAT SHEET

Structure:      Node { val, next }
                HEAD → Node1 → Node2 → ... → NULL

Big O:
  Access:       O(n)
  Search:       O(n)
  Ins at head:  O(1)
  Del at head:  O(1)
  Ins at tail:  O(n)
  Del by val:   O(n)

Key Patterns:
  Fast & Slow   → Middle, Cycle Detection, Nth from End
  3-Pointer     → Reverse (prev, curr, next)
  Dummy Node    → Merge, Remove Nth, anything with head changes
  Combine       → Palindrome = Middle + Reverse + Compare

Golden Rules:
  1. Save next before changing it
  2. Draw it on paper first
  3. Use dummy node for head changes
  4. Test empty, 1 node, 2 nodes
```

---

## Related

- [Core Operations](/DSA-Notes-Problems/data-structures/linked-list/04-operations) — Step-by-step implementations
- [Interview Questions](/DSA-Notes-Problems/data-structures/linked-list/08-interview-questions) — Practice problems
- [Stacks & Queues](/DSA-Notes-Problems/data-structures/stacks-queues/stack-lifo) — Often implemented with linked lists
