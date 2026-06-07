---
title: "Bit Manipulation — Introduction"
description: "Binary representation, two's complement, all 6 bitwise operators with truth tables, and JavaScript-specific notes."
sidebar:
  order: 1
---

# 🔢 Bit Manipulation — Introduction

## 🎯 What Is Bit Manipulation?

Every number in a computer is stored as a sequence of **bits** (binary digits — 0 or 1). Bit manipulation means operating directly on those bits using special operators, instead of going through the normal arithmetic pathway.

```
Decimal  12  →  Binary  0000 1100
Decimal   7  →  Binary  0000 0111
```

Bit operations work at the **hardware level**, making them extremely fast — a single CPU instruction rather than a multi-step arithmetic operation.

---

## 🔹 Binary Representation

### Positive Integers

To convert a decimal number to binary, repeatedly divide by 2 and track remainders:

```
25 ÷ 2 = 12 remainder 1   ← least significant bit
12 ÷ 2 =  6 remainder 0
 6 ÷ 2 =  3 remainder 0
 3 ÷ 2 =  1 remainder 1
 1 ÷ 2 =  0 remainder 1   ← most significant bit

Reading remainders bottom-to-top:  25 = 1 1 0 0 1  =  11001 in binary
```

### Bit Positions (Zero-Indexed from the Right)

```
Bit position:  7   6   5   4   3   2   1   0
               ┌───┬───┬───┬───┬───┬───┬───┬───┐
  Value (25):  │ 0 │ 0 │ 0 │ 1 │ 1 │ 0 │ 0 │ 1 │
               └───┴───┴───┴───┴───┴───┴───┴───┘
Place value:  128  64  32  16   8   4   2   1

  16 + 8 + 1 = 25  ✓
```

### Quick Powers of 2

| Power | Value |
|-------|-------|
| 2⁰ | 1 |
| 2¹ | 2 |
| 2² | 4 |
| 2³ | 8 |
| 2⁴ | 16 |
| 2⁵ | 32 |
| 2⁶ | 64 |
| 2⁷ | 128 |
| 2⁸ | 256 |
| 2¹⁰ | 1024 (~1K) |
| 2²⁰ | 1,048,576 (~1M) |
| 2³⁰ | 1,073,741,824 (~1B) |

---

## 🔹 Two's Complement (Negative Numbers)

JavaScript's bitwise operators work on **signed 32-bit integers**. Negative numbers are stored using **two's complement**:

### How to Find Two's Complement of -n

```
Step 1: Write the binary of the positive number
Step 2: Flip all bits (one's complement)
Step 3: Add 1

Example: represent -5 in 8-bit two's complement
  +5  =  0000 0101
  Flip:  1111 1010   (one's complement)
  +1:    1111 1011   (two's complement = -5)
```

### Why Two's Complement?

```
  5 + (-5) should = 0:
    0000 0101
  + 1111 1011
  ──────────
  1 0000 0000   ← overflow bit discarded → 0000 0000 = 0  ✓
```

### Important Consequence: `~n = -(n + 1)`

```javascript
~0   // -1
~1   // -2
~5   // -6
~(-1) // 0
```

This is because `~n` flips all bits (one's complement), and adding 1 gives the two's complement negative — so `~n = -n - 1`.

---

## 🔹 The Six Bitwise Operators in JavaScript

### 1. AND (`&`)

Both bits must be 1 for the result to be 1.

```
Truth table:
  A | B | A & B
  0 | 0 |   0
  0 | 1 |   0
  1 | 0 |   0
  1 | 1 |   1
```

```
  5 & 3:
  5 = 0101
  3 = 0011
      ────
      0001  = 1
```

```javascript
5 & 3   // 1
12 & 10 // 8    (1100 & 1010 = 1000)
7 & 7   // 7    (any number AND itself = itself)
7 & 0   // 0    (any number AND 0 = 0)
```

**Use cases:** Masking bits, checking individual bits, clearing bits.

---

### 2. OR (`|`)

At least one bit must be 1 for the result to be 1.

```
Truth table:
  A | B | A | B
  0 | 0 |   0
  0 | 1 |   1
  1 | 0 |   1
  1 | 1 |   1
```

```
  5 | 3:
  5 = 0101
  3 = 0011
      ────
      0111  = 7
```

```javascript
5 | 3   // 7
12 | 3  // 15   (1100 | 0011 = 1111)
7 | 0   // 7    (any number OR 0 = itself)
```

**Use cases:** Setting bits, combining flags.

---

### 3. XOR (`^`)

Bits must be **different** for the result to be 1.

```
Truth table:
  A | B | A ^ B
  0 | 0 |   0
  0 | 1 |   1
  1 | 0 |   1
  1 | 1 |   0    ← same bits cancel out
```

```
  5 ^ 3:
  5 = 0101
  3 = 0011
      ────
      0110  = 6
```

```javascript
5 ^ 3   // 6
5 ^ 5   // 0    (any number XOR itself = 0)
5 ^ 0   // 5    (any number XOR 0 = itself)
```

**Key properties (crucial for interviews):**
```
a ^ a = 0           (self-cancellation)
a ^ 0 = a           (identity)
a ^ b = b ^ a       (commutative)
(a ^ b) ^ c = a ^ (b ^ c)  (associative)
```

**Use cases:** Toggling bits, finding unique elements, swapping values.

---

### 4. NOT (`~`)

Flips every bit (bitwise complement).

```
Truth table:
  A | ~A
  0 |  1
  1 |  0
```

```
  ~5:
  5 = 0000 0101
  ~5= 1111 1010  = -6  (in two's complement)
```

```javascript
~5    // -6
~0    // -1
~(-1) // 0
~n    // always equals -(n + 1)
```

**Important:** `~` is a unary operator — it operates on ONE number, not two.

---

### 5. Left Shift (`<<`)

Shifts bits to the left, filling with zeros on the right. Equivalent to **multiplying by 2** for each shift position.

```
  5 << 1:
  5  = 0000 0101
  <<1= 0000 1010  = 10   (5 × 2¹ = 10)

  5 << 2:
  5  = 0000 0101
  <<2= 0001 0100  = 20   (5 × 2² = 20)
```

```javascript
5 << 1   // 10   (5 * 2)
5 << 2   // 20   (5 * 4)
5 << 3   // 40   (5 * 8)
1 << 4   // 16   (creates a mask for bit position 4)
```

**Overflow note:** In JS, bitwise ops work on 32-bit integers. Shifting a 1 into the sign bit creates a negative number.

---

### 6. Right Shift (`>>` and `>>>`)

#### Signed Right Shift (`>>`)

Shifts bits to the right. The **sign bit is preserved** (arithmetic shift — fills left with the sign bit).

```
  20 >> 2:
  20 = 0001 0100
  >>2= 0000 0101  = 5   (20 / 2² = 5)

  -8 >> 1:
  -8 = 1111 1000
  >>1= 1111 1100  = -4  (sign bit 1 is copied in)
```

```javascript
20 >> 2    // 5    (20 / 4)
-8 >> 1    // -4   (preserves sign)
100 >> 3   // 12   (100 / 8 = 12, integer division)
```

#### Unsigned Right Shift (`>>>`)

Shifts bits to the right. **Always fills left with zeros**, regardless of sign. Treats the number as an unsigned 32-bit integer.

```javascript
-1 >>> 0    // 4294967295  (all 32 bits become visible as positive)
-1 >>> 1    // 2147483647
5 >>> 1     // 2            (same as >> for positive numbers)
```

**Key difference: `>>` vs `>>>`**

| Expression | Result | Reason |
|-----------|--------|--------|
| `-8 >> 1` | `-4` | Sign bit preserved, stays negative |
| `-8 >>> 1` | `2147483644` | Zero filled, treated as huge positive |
| `5 >> 1` | `2` | Same for positive numbers |
| `5 >>> 1` | `2` | Same for positive numbers |

---

## 🔹 Visual Comparison Table

Operations on 5 (= `0101`) and 3 (= `0011`):

```
  Decimal  │  Binary    Operation  Result Binary  Result Decimal
  ─────────┼──────────────────────────────────────────────────────
    5 & 3   │  0101 & 0011  →  0001  →  1
    5 | 3   │  0101 | 0011  →  0111  →  7
    5 ^ 3   │  0101 ^ 0011  →  0110  →  6
      ~5    │       ~0101   →  ...1111 1010  →  -6
    5 << 1  │    0101 << 1  →  1010  →  10
    5 >> 1  │    0101 >> 1  →  0010  →  2
```

---

## 🔹 JavaScript-Specific Notes

### 32-Bit Integer Conversion

JavaScript numbers are 64-bit floating point (IEEE 754), but **all bitwise operators convert operands to signed 32-bit integers** before operating:

```javascript
// This means numbers outside the 32-bit range get truncated
2147483648 | 0   // -2147483648  (overflows into sign bit)
0.7 | 0          // 0            (float truncated to integer)
```

**Trick:** `n | 0` is a fast way to truncate a float to integer in JS.

### The `>>>` Use Case

`>>>` is useful when you need to work with the raw bit pattern of a negative number as if it were a positive integer:

```javascript
function toUnsigned(n) {
    return n >>> 0;
}
toUnsigned(-1)  // 4294967295 (0xFFFFFFFF)
```

### Precedence Warning

Bitwise operators have **lower precedence** than comparison operators (`==`, `<`, etc.). Always use parentheses:

```javascript
// WRONG — & runs after === comparison
if (n & 1 === 0)    // parsed as: n & (1 === 0) = n & false = 0

// CORRECT
if ((n & 1) === 0)  // even number check
```

---

## 🔹 Reading Binary in JavaScript

```javascript
// Convert decimal to binary string
(5).toString(2)      // "101"
(255).toString(2)    // "11111111"
(-1).toString(2)     // "-1" (JS shows sign, not raw bits)

// Convert binary string to decimal
parseInt("101", 2)   // 5
parseInt("11111111", 2) // 255

// View as 32-bit padded binary
function toBin32(n) {
    return (n >>> 0).toString(2).padStart(32, '0');
}
toBin32(5)   // "00000000000000000000000000000101"
toBin32(-1)  // "11111111111111111111111111111111"
toBin32(-8)  // "11111111111111111111111111111000"
```

---

## 🔹 Summary

| Operator | Symbol | Effect | Key Use |
|----------|--------|--------|---------|
| AND | `&` | 1 only if both 1 | Masking, checking bits |
| OR | `\|` | 1 if either is 1 | Setting bits |
| XOR | `^` | 1 if bits differ | Toggling, finding uniques |
| NOT | `~` | Flip all bits | Complement, `~n = -(n+1)` |
| Left Shift | `<<` | Shift left, fill 0s | Multiply by 2ⁿ |
| Signed Right Shift | `>>` | Shift right, copy sign | Divide by 2ⁿ |
| Unsigned Right Shift | `>>>` | Shift right, fill 0s | Unsigned 32-bit view |

---

**Next:** [Bit Manipulation Tricks](/DSA-Notes-Problems/data-structures/bit-manipulation/02-tricks) →
