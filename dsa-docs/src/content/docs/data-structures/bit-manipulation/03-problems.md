---
title: "Bit Manipulation Problems"
description: "Single number, count set bits, power of two, subsets via bitmask, and swap without temp."
sidebar:
  order: 4
---

# Bit Manipulation Problems

---

## 1. Single Number

**Problem:** Every element appears twice except one. Find that one.

**Idea:** `a XOR a = 0`. XOR all numbers — duplicates cancel out, leaving the unique one.

```javascript
function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}

// nums = [4, 1, 2, 1, 2]
// 4 ^ 1 ^ 2 ^ 1 ^ 2
// = 4 ^ (1 ^ 1) ^ (2 ^ 2)
// = 4 ^ 0 ^ 0
// = 4 ✅
```

**Time:** O(N) · **Space:** O(1)

---

## 2. Count Set Bits (Hamming Weight)

**Problem:** Count the number of `1`s in the binary representation of a number.

**Idea:** `n & (n - 1)` clears the **lowest set bit**. Keep doing it until n = 0.

```javascript
function countSetBits(n) {
  let count = 0;
  while (n) {
    n &= (n - 1); // clear lowest set bit
    count++;
  }
  return count;
}

// n = 13  (binary: 1101)
// 13 & 12 = 1101 & 1100 = 1100  → count=1
// 12 & 11 = 1100 & 1011 = 1000  → count=2
// 8 & 7   = 1000 & 0111 = 0000  → count=3
// Result: 3
```

**Time:** O(number of set bits) · **Space:** O(1)

---

## 3. Power of Two

**Problem:** Check if a number is a power of two.

**Idea:** Powers of two have exactly one bit set. `n & (n - 1)` clears that one bit — result should be 0.

```javascript
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

// 16 (10000) → 16 & 15 = 0 ✅
// 6  (00110) → 6 & 5 = 4 ≠ 0 ❌
// 1  (00001) → 1 & 0 = 0 ✅
```

**Time:** O(1) · **Space:** O(1)

---

## 4. Subsets via Bitmask

**Problem:** Generate all subsets of an array using bitmasks.

**Idea:** For N elements, there are 2^N subsets. Each number from 0 to 2^N - 1 is a bitmask where bit `i` says "include element i."

```javascript
function subsets(nums) {
  const n = nums.length;
  const result = [];

  for (let mask = 0; mask < (1 << n); mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        subset.push(nums[i]);
      }
    }
    result.push(subset);
  }
  return result;
}

// nums = [1, 2, 3]
// mask 0 (000) → []
// mask 1 (001) → [1]
// mask 2 (010) → [2]
// mask 3 (011) → [1, 2]
// ... up to mask 7 (111) → [1, 2, 3]
```

**Time:** O(N × 2^N) · **Space:** O(N × 2^N) for output

---

## 5. Swap Without Temp

```javascript
let a = 5, b = 9;

a = a ^ b;  // a = 5 ^ 9 = 12 (1100)
b = a ^ b;  // b = 12 ^ 9 = 5  (0101) ← original a
a = a ^ b;  // a = 12 ^ 5 = 9  (1001) ← original b

console.log(a, b); // 9, 5
```

---

## Quick Reference: Common Bit Tricks

| Trick | Code | Use |
|-------|------|-----|
| Check if bit `i` is set | `n & (1 << i)` | Membership check |
| Set bit `i` | `n \| (1 << i)` | Add flag |
| Clear bit `i` | `n & ~(1 << i)` | Remove flag |
| Toggle bit `i` | `n ^ (1 << i)` | Flip flag |
| Isolate lowest set bit | `n & -n` | Bit tricks |
| Clear lowest set bit | `n & (n - 1)` | Count bits, power of 2 |
| Divide by 2 | `n >> 1` | Faster than `/` (integers) |
| Multiply by 2 | `n << 1` | Faster than `*` |

---

## In Simple Words

- XOR is magical: `a ^ a = 0`, `a ^ 0 = a`. Use it to find the single non-duplicate.
- `n & (n - 1)` clears the lowest `1` bit — great for counting bits and checking power of two.
- Bitmasks from 0 to 2^N - 1 generate all subsets.
