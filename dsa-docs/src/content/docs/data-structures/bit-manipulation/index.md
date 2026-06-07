---
title: "Bit Manipulation"
description: "Master bit manipulation — from binary basics to advanced interview patterns in JavaScript."
sidebar:
  order: 0
---

# 🔢 Bit Manipulation

Welcome to the **Bit Manipulation** section. This module covers everything from reading binary numbers to advanced bitmask techniques that appear in competitive programming and technical interviews.

---

## 🧠 Why Bit Manipulation Matters

Bit manipulation is one of those topics that separates candidates who "know DSA" from candidates who truly understand how computers work. Interviewers at FAANG and top-tier companies regularly ask bit manipulation problems because they test:

- **Low-level thinking** — do you understand how data is stored?
- **Optimization instinct** — can you replace expensive operations with O(1) bit tricks?
- **Pattern recognition** — XOR patterns, bitmask DP, subset enumeration

```
Speed comparison for common operations:
  n % 2 === 0   (mod)    → check even/odd   [slower]
  (n & 1) === 0 (bit)    → check even/odd   [faster, O(1) at hardware level]

  Math.floor(n / 2)      → divide by 2      [slower]
  n >> 1                 → divide by 2      [single CPU instruction]
```

---

## 📖 Topics Covered

### 🎯 Foundations
- [Introduction](/DSA-Notes-Problems/data-structures/bit-manipulation/01-introduction) — Binary representation, two's complement, all 6 bitwise operators with truth tables
- [Bit Tricks](/DSA-Notes-Problems/data-structures/bit-manipulation/02-tricks) — 15+ essential tricks: check even/odd, power of two, get/set/clear/toggle bits, Brian Kernighan's algorithm

### 💡 Patterns
- [XOR Patterns](/DSA-Notes-Problems/data-structures/bit-manipulation/03-xor-patterns) — The XOR identity laws and 7 classic XOR-based problem patterns

### 🧩 Problem Solving
- [Practice Problems](/DSA-Notes-Problems/data-structures/bit-manipulation/04-problems) — 10 fully solved problems: Hamming Weight, Reverse Bits, Counting Bits, Gray Code, UTF-8 Validation, and more
- [Interview Questions](/DSA-Notes-Problems/data-structures/bit-manipulation/05-interview-questions) — 12+ Q&A covering every trick an interviewer is likely to ask

---

## 📚 Recommended Learning Path

| Step | Focus | Topic |
|------|-------|-------|
| 1 | **Understand** | Start with [Introduction](/DSA-Notes-Problems/data-structures/bit-manipulation/01-introduction) — learn the operators |
| 2 | **Memorize Tricks** | Study [Bit Tricks](/DSA-Notes-Problems/data-structures/bit-manipulation/02-tricks) — these recur constantly |
| 3 | **Master XOR** | Read [XOR Patterns](/DSA-Notes-Problems/data-structures/bit-manipulation/03-xor-patterns) — XOR is the most interview-tested operator |
| 4 | **Solve Problems** | Work through [Practice Problems](/DSA-Notes-Problems/data-structures/bit-manipulation/04-problems) one by one |
| 5 | **Interview Prep** | Drill [Interview Questions](/DSA-Notes-Problems/data-structures/bit-manipulation/05-interview-questions) until answers are instant |

---

## ⚡ Quick Reference Card

```
OPERATOR   SYMBOL   EXAMPLE         RESULT   USE CASE
AND          &       5 & 3           1        Mask / check bits
OR           |       5 | 3           7        Set bits
XOR          ^       5 ^ 3           6        Toggle / find unique
NOT          ~       ~5             -6        Complement
Left Shift   <<      5 << 1         10        Multiply by 2ⁿ
Right Shift  >>      5 >> 1          2        Divide by 2ⁿ (signed)
Unsigned >>  >>>     -1 >>> 0  4294967295     Treat as unsigned 32-bit
```

---

## 🔥 Top Interview Tricks at a Glance

| Trick | Code |
|-------|------|
| Is odd? | `n & 1` |
| Is power of two? | `n > 0 && (n & (n-1)) === 0` |
| Get i-th bit | `(n >> i) & 1` |
| Set i-th bit | `n \| (1 << i)` |
| Clear i-th bit | `n & ~(1 << i)` |
| Toggle i-th bit | `n ^ (1 << i)` |
| Clear lowest set bit | `n & (n - 1)` |
| Isolate lowest set bit | `n & (-n)` |
| Count set bits | Brian Kernighan's algorithm |
| Swap without temp | `a ^= b; b ^= a; a ^= b` |

---

## 🔗 Related Topics

- [Recursion & Backtracking](/DSA-Notes-Problems/data-structures/recursion) — Subset enumeration via bitmask pairs well with recursive subset generation
- [Arrays](/DSA-Notes-Problems/data-structures/arrays/arrays) — Many bitmask tricks apply directly to array problems
- [Dynamic Programming](/DSA-Notes-Problems/data-structures/interview-prep) — Bitmask DP is a powerful technique for state compression
