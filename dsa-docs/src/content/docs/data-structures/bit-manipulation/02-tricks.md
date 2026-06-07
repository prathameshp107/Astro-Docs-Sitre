---
title: "Bit Manipulation Tricks"
description: "15+ essential bit tricks in JavaScript: check even/odd, power of two, get/set/clear/toggle bits, Brian Kernighan, XOR swap, and more."
sidebar:
  order: 2
---

# 🪄 Bit Manipulation Tricks

These are the **high-frequency tricks** that appear in interviews and competitive programming. Memorize the pattern, understand the *why*, and you will be able to derive variations on the fly.

---

## 🔹 Trick 1 — Check Even / Odd

**Pattern:** `n & 1`

The least significant bit (bit 0) is 1 for odd numbers and 0 for even numbers.

```
  4 = 100  → last bit 0 → even
  5 = 101  → last bit 1 → odd
  6 = 110  → last bit 0 → even
  7 = 111  → last bit 1 → odd
```

```javascript
function isOdd(n) {
    return (n & 1) === 1;
}

function isEven(n) {
    return (n & 1) === 0;
}

isOdd(7)   // true
isOdd(8)   // false
isEven(12) // true
isEven(13) // false
```

> **Interview tip:** Faster than `n % 2` because it avoids division. Works correctly for negative odd numbers too (`-3 & 1 === 1`).

---

## 🔹 Trick 2 — Check if Power of Two

**Pattern:** `n > 0 && (n & (n - 1)) === 0`

A power of two in binary has exactly **one set bit**:

```
  1 = 0001    2 = 0010    4 = 0100    8 = 1000

  Subtracting 1 from a power of two flips that bit and sets all lower bits:
  8 = 1000
  7 = 0111
  8 & 7 = 0000  ← always 0 for powers of two
```

```javascript
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

isPowerOfTwo(1)   // true   (2⁰)
isPowerOfTwo(16)  // true   (2⁴)
isPowerOfTwo(0)   // false  (special case, guard needed)
isPowerOfTwo(6)   // false  (110 & 101 = 100 ≠ 0)
isPowerOfTwo(-4)  // false  (n > 0 guards negatives)
```

> **Why `n > 0`?** `0 & (0-1) = 0 & -1 = 0`, which would incorrectly pass without the guard.

---

## 🔹 Trick 3 — Get the i-th Bit

**Pattern:** `(n >> i) & 1`

Shift bit `i` down to position 0, then mask with 1 to read it.

```
  n = 13 = 1101
  Get bit 2:  13 >> 2 = 0011,  0011 & 0001 = 1  → bit 2 is SET

  n = 13 = 1101
  Get bit 1:  13 >> 1 = 0110,  0110 & 0001 = 0  → bit 1 is CLEAR
```

```javascript
function getBit(n, i) {
    return (n >> i) & 1;
}

getBit(13, 0)  // 1   (13 = 1101, bit 0 = 1)
getBit(13, 1)  // 0   (13 = 1101, bit 1 = 0)
getBit(13, 2)  // 1   (13 = 1101, bit 2 = 1)
getBit(13, 3)  // 1   (13 = 1101, bit 3 = 1)
```

---

## 🔹 Trick 4 — Set the i-th Bit

**Pattern:** `n | (1 << i)`

Create a mask with only bit `i` set, then OR it in. OR can only turn bits ON, never off.

```
  n = 1010 (10)
  Set bit 0:  1 << 0 = 0001
              1010 | 0001 = 1011  = 11
```

```javascript
function setBit(n, i) {
    return n | (1 << i);
}

setBit(10, 0)  // 11   (1010 | 0001 = 1011)
setBit(10, 2)  // 14   (1010 | 0100 = 1110)
setBit(0, 5)   // 32   (set bit 5 in 0 = 100000)
```

---

## 🔹 Trick 5 — Clear the i-th Bit

**Pattern:** `n & ~(1 << i)`

Create a mask with only bit `i` set, then NOT it (all 1s except position `i`), then AND to force that bit to 0.

```
  n = 1111 (15)
  Clear bit 2:
    1 << 2  = 0100
    ~(0100) = ...1111 1011  (all 1s except bit 2)
    1111 & 1011 = 1011  = 11
```

```javascript
function clearBit(n, i) {
    return n & ~(1 << i);
}

clearBit(15, 2)  // 11   (1111 & ~0100 = 1111 & 1011 = 1011)
clearBit(7, 1)   // 5    (0111 & ~0010 = 0111 & 1101 = 0101)
clearBit(8, 3)   // 0    (1000 & ~1000 = 0000)
```

---

## 🔹 Trick 6 — Toggle the i-th Bit

**Pattern:** `n ^ (1 << i)`

XOR with a mask that has only bit `i` set. XOR with 1 flips a bit; XOR with 0 leaves it unchanged.

```
  n = 1010 (10)
  Toggle bit 0:  1010 ^ 0001 = 1011 = 11
  Toggle bit 1:  1010 ^ 0010 = 1000 = 8
  Toggle bit 3:  1010 ^ 1000 = 0010 = 2
```

```javascript
function toggleBit(n, i) {
    return n ^ (1 << i);
}

toggleBit(10, 0)  // 11   (flip bit 0: 1010 → 1011)
toggleBit(10, 1)  // 8    (flip bit 1: 1010 → 1000)
toggleBit(10, 3)  // 2    (flip bit 3: 1010 → 0010)

// Toggling twice returns original
toggleBit(toggleBit(10, 2), 2)  // 10
```

---

## 🔹 Trick 7 — Clear the Lowest Set Bit

**Pattern:** `n & (n - 1)`

Subtracting 1 from `n` flips the lowest set bit to 0 and all lower bits to 1. ANDing then clears that bit.

```
  n = 1100 (12)
  n-1 = 1011 (11)
  1100 & 1011 = 1000  = 8  (lowest set bit removed)

  n = 1000 (8)
  n-1 = 0111 (7)
  1000 & 0111 = 0000  = 0  (only bit cleared)
```

```javascript
function clearLowestSetBit(n) {
    return n & (n - 1);
}

clearLowestSetBit(12)  // 8    (1100 → 1000)
clearLowestSetBit(8)   // 0    (1000 → 0000)
clearLowestSetBit(7)   // 6    (0111 → 0110)
clearLowestSetBit(6)   // 4    (0110 → 0100)
```

**Critical application:** Count set bits (Brian Kernighan) — each call removes one set bit, so the number of iterations = number of set bits.

---

## 🔹 Trick 8 — Isolate the Lowest Set Bit

**Pattern:** `n & (-n)`

`-n` in two's complement is `~n + 1`. When you AND `n` with its negation, only the lowest set bit survives.

```
  n = 1100 (12)
  -n = 0100 (two's complement of 12)

  Proof:
    12 =  0000 1100
   ~12 =  1111 0011
  ~12+1=  1111 0100   = -12
   12 & (-12) = 0000 0100 = 4  (the lowest set bit)
```

```javascript
function lowestSetBit(n) {
    return n & (-n);
}

lowestSetBit(12)   // 4    (1100 → isolates rightmost 1 = 0100)
lowestSetBit(10)   // 2    (1010 → isolates rightmost 1 = 0010)
lowestSetBit(8)    // 8    (1000 → only one bit, returns itself)
lowestSetBit(7)    // 1    (0111 → rightmost 1 is bit 0)
```

---

## 🔹 Trick 9 — Count Set Bits (Brian Kernighan's Algorithm)

**Pattern:** Repeatedly apply `n & (n-1)` until `n === 0`. Count iterations.

Each iteration removes exactly one set bit. The loop runs exactly as many times as there are set bits.

```
  n = 13 = 1101  (3 set bits)

  Iteration 1:  13 & 12 = 1101 & 1100 = 1100 = 12  count=1
  Iteration 2:  12 & 11 = 1100 & 1011 = 1000 = 8   count=2
  Iteration 3:   8 &  7 = 1000 & 0111 = 0000 = 0   count=3
  Loop ends (n === 0)
```

```javascript
function countSetBits(n) {
    let count = 0;
    while (n !== 0) {
        n = n & (n - 1);   // remove lowest set bit
        count++;
    }
    return count;
}

countSetBits(0)   // 0
countSetBits(1)   // 1
countSetBits(7)   // 3   (111)
countSetBits(13)  // 3   (1101)
countSetBits(255) // 8   (11111111)
```

**Time complexity:** O(number of set bits) — better than O(32) naive loop in practice.

**Alternative (naive loop for comparison):**

```javascript
function countSetBitsNaive(n) {
    let count = 0;
    while (n !== 0) {
        count += n & 1;  // check last bit
        n >>= 1;         // shift right
    }
    return count;
}
```

---

## 🔹 Trick 10 — Swap Two Numbers with XOR

**Pattern:** `a ^= b; b ^= a; a ^= b;`

XOR-based swap without a temporary variable.

```
  a = 5 (0101),  b = 3 (0011)

  Step 1: a ^= b   →  a = 0101 ^ 0011 = 0110  (a now holds a XOR b)
  Step 2: b ^= a   →  b = 0011 ^ 0110 = 0101  (b now holds original a)
  Step 3: a ^= b   →  a = 0110 ^ 0101 = 0011  (a now holds original b)

  Result: a = 3, b = 5  ✓
```

```javascript
function xorSwap(a, b) {
    console.log(`Before: a=${a}, b=${b}`);
    a ^= b;
    b ^= a;
    a ^= b;
    console.log(`After:  a=${a}, b=${b}`);
    return [a, b];
}

xorSwap(5, 3)   // Before: a=5, b=3 | After: a=3, b=5
xorSwap(10, 7)  // Before: a=10, b=7 | After: a=7, b=10
```

> **Warning:** If `a` and `b` refer to the same memory location, XOR swap will zero them out. Use `[a, b] = [b, a]` destructuring in modern JS for safety.

---

## 🔹 Trick 11 — Multiply / Divide by Power of 2

**Patterns:**
- Multiply by 2ⁿ: `n << k`
- Divide by 2ⁿ (floor): `n >> k`

```javascript
// Multiply
5 << 1    // 10    (5 * 2)
5 << 2    // 20    (5 * 4)
5 << 3    // 40    (5 * 8)
3 << 4    // 48    (3 * 16)

// Divide (integer, rounds toward negative infinity for negatives)
20 >> 1   // 10    (20 / 2)
20 >> 2   // 5     (20 / 4)
-8 >> 1   // -4    (-8 / 2, sign preserved)
7 >> 1    // 3     (floor(7 / 2) = 3)
```

**Practical use: find middle index without overflow**

```javascript
// Safer than Math.floor((left + right) / 2) (avoids integer overflow in other langs)
function mid(left, right) {
    return left + ((right - left) >> 1);
}
```

---

## 🔹 Trick 12 — Absolute Value Without Branching

**Pattern:**

```javascript
function abs(n) {
    const mask = n >> 31;       // all 0s if positive, all 1s (-1) if negative
    return (n + mask) ^ mask;
}
```

```
  n = -5:
    mask = -5 >> 31 = -1 = 1111...1111
    n + mask = -5 + (-1) = -6 = 1111...1010
    (n + mask) ^ mask = 1111...1010 ^ 1111...1111 = 0000...0101 = 5  ✓

  n = 5:
    mask = 5 >> 31 = 0 = 0000...0000
    n + mask = 5 + 0 = 5
    (n + mask) ^ mask = 5 ^ 0 = 5  ✓
```

```javascript
abs(-5)   // 5
abs(5)    // 5
abs(-100) // 100
abs(0)    // 0
```

---

## 🔹 Trick 13 — Check if Two Numbers Have Opposite Signs

**Pattern:** `(a ^ b) < 0`

The sign bit (bit 31) is 1 for negatives, 0 for positives. XOR of two sign bits is 1 (i.e., negative) only when signs differ.

```javascript
function oppositeSigns(a, b) {
    return (a ^ b) < 0;
}

oppositeSigns(5, -3)   // true
oppositeSigns(-7, -2)  // false (both negative)
oppositeSigns(3, 8)    // false (both positive)
oppositeSigns(0, -5)   // false (0 is not negative)
```

---

## 🔹 Trick 14 — Turn Off Rightmost Consecutive 1-Bits

**Pattern:** `((n | (n - 1)) + 1) & n` — not commonly asked, but variants appear.

More commonly tested: **check if n has all 1s from position 0 to some k**.

```javascript
// Check if lower k bits are all set
function lowerKBitsAllSet(n, k) {
    const mask = (1 << k) - 1;  // k ones in a row
    return (n & mask) === mask;
}

lowerKBitsAllSet(7, 3)    // true   (0111, lower 3 bits all 1)
lowerKBitsAllSet(15, 4)   // true   (1111, lower 4 bits all 1)
lowerKBitsAllSet(6, 3)    // false  (0110, bit 0 is 0)
```

---

## 🔹 Trick 15 — Bitmask for Subset Enumeration

**Pattern:** Iterate from `0` to `(1 << n) - 1`. Each integer represents a subset.

For an array of `n` elements, there are `2ⁿ` subsets. Each integer from 0 to 2ⁿ−1 encodes which elements are included (bit `i` = 1 means element `i` is included).

```
  arr = [a, b, c]  (n=3, so 2³=8 subsets)

  mask = 000 → {} (empty)
  mask = 001 → {a}
  mask = 010 → {b}
  mask = 011 → {a, b}
  mask = 100 → {c}
  mask = 101 → {a, c}
  mask = 110 → {b, c}
  mask = 111 → {a, b, c}
```

```javascript
function getAllSubsets(arr) {
    const n = arr.length;
    const subsets = [];

    for (let mask = 0; mask < (1 << n); mask++) {
        const subset = [];
        for (let i = 0; i < n; i++) {
            if ((mask >> i) & 1) {   // is bit i set in mask?
                subset.push(arr[i]);
            }
        }
        subsets.push(subset);
    }

    return subsets;
}

getAllSubsets([1, 2, 3]);
// [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
```

---

## 🔹 Summary Table

| Trick | Pattern | Time |
|-------|---------|------|
| Check odd | `n & 1` | O(1) |
| Power of two | `n > 0 && (n & (n-1)) === 0` | O(1) |
| Get bit i | `(n >> i) & 1` | O(1) |
| Set bit i | `n \| (1 << i)` | O(1) |
| Clear bit i | `n & ~(1 << i)` | O(1) |
| Toggle bit i | `n ^ (1 << i)` | O(1) |
| Clear lowest set bit | `n & (n - 1)` | O(1) |
| Isolate lowest set bit | `n & (-n)` | O(1) |
| Count set bits (Kernighan) | loop `n &= n-1` | O(set bits) |
| XOR swap | `a^=b; b^=a; a^=b` | O(1) |
| Multiply by 2ⁿ | `n << k` | O(1) |
| Divide by 2ⁿ | `n >> k` | O(1) |
| Absolute value | `(n + mask) ^ mask` | O(1) |
| Opposite signs | `(a ^ b) < 0` | O(1) |
| All subsets | loop `0` to `1<<n` | O(2ⁿ × n) |

---

**Next:** [XOR Patterns](/DSA-Notes-Problems/data-structures/bit-manipulation/03-xor-patterns) →
