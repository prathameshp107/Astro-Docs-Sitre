---
title: "Numbers, Math & Dates"
description: "Number methods, Math object, Date formatting and manipulation, and common gotchas."
sidebar:
  order: 3
---

## Numbers, Math & Dates

Working with numbers, performing math, and handling dates are everyday tasks in JavaScript. Each has its own set of built-in objects and quirks.

### Number Basics

```javascript
const integer = 42;
const float = 3.14;
const scientific = 1.5e6; // 1,500,000
const hex = 0xFF;          // 255
const octal = 0o77;        // 63
const binary = 0b1010;     // 10
```

### Number Methods & Properties

```javascript
Number.isInteger(42);       // true
Number.isInteger(3.14);     // false

Number.isNaN(NaN);          // true (reliable — unlike global isNaN)
Number.isFinite(Infinity);  // false

Number.parseFloat("3.14px"); // 3.14
Number.parseInt("42px", 10); // 42

(3.14159).toFixed(2);       // "3.14"
(255).toString(16);         // "ff" (hex)
(123).toPrecision(3);       // "123"

Number.MAX_VALUE;   // ~1.79e+308
Number.MIN_VALUE;   // ~5e-324
Number.EPSILON;     // ~2.22e-16
```

### 🚨 Floating-Point Precision

```javascript
0.1 + 0.2;                // 0.30000000000000004
0.1 + 0.2 === 0.3;        // false

// Fix: use a tolerance
Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON; // true

// For precise decimal math, consider multiplying first
(0.1 * 10 + 0.2 * 10) / 10; // 0.3
```

### The Math Object

```javascript
Math.round(4.7);     // 5
Math.ceil(4.2);      // 5
Math.floor(4.9);     // 4
Math.trunc(4.9);     // 4 (removes fractional part)

Math.random();       // random float between 0 (inclusive) and 1 (exclusive)
Math.max(1, 5, 3);   // 5
Math.min(1, 5, 3);   // 1
Math.abs(-5);        // 5
Math.pow(2, 10);     // 1024
Math.sqrt(144);      // 12
Math.floor(Math.random() * 6) + 1; // random integer 1–6 (like a die)
```

### Working with Dates

```javascript
// Creating dates
const now = new Date();
const specific = new Date(2026, 5, 22);   // Jun 22, 2026 (months are 0-indexed!)
const fromString = new Date("2026-06-22");
const fromTimestamp = new Date(1760000000000);

// ⚠️ Months are 0-indexed: 0 = Jan, 1 = Feb, ..., 11 = Dec
new Date(2026, 0, 1);  // Jan 1, 2026
new Date(2026, 11, 31); // Dec 31, 2026
```

### Date Getters & Setters

```javascript
const d = new Date("2026-06-22T14:30:00");

d.getFullYear();     // 2026
d.getMonth();        // 5 (June — 0-indexed!)
d.getDate();         // 22
d.getDay();          // 1 (Monday — 0=Sun, 1=Mon...)
d.getHours();        // 14
d.getMinutes();      // 30
d.getSeconds();      // 0
d.getTime();         // timestamp in ms since epoch

// UTC versions
d.getUTCFullYear();  // same but in UTC
d.getUTCMonth();

// Setters
d.setFullYear(2027);
d.setMonth(11);      // December
```

### Formatting Dates

```javascript
const d = new Date("2026-06-22");

d.toISOString();        // "2026-06-22T00:00:00.000Z"
d.toDateString();       // "Mon Jun 22 2026"
d.toLocaleDateString(); // "6/22/2026" (locale-dependent)
d.toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}); // "Monday, June 22, 2026"
```

### Common Date Pitfalls

```javascript
// Months are 0-indexed (most common gotcha!)
new Date(2026, 5, 22); // June 22 — NOT May 22!

// Date arithmetic works in milliseconds
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// Comparing dates: convert to timestamp
const d1 = new Date("2026-01-01");
const d2 = new Date("2026-06-22");
d1.getTime() < d2.getTime(); // true

// Date.parse behavior varies across browsers — avoid it
```

### Key Takeaways

- Use `Number.isNaN()` instead of global `isNaN()` for reliable NaN checks
- Floating-point math is imprecise — use `Number.EPSILON` for comparisons
- `Math.random()` returns 0–1; multiply and `Math.floor()` for integer ranges
- Date months are 0-indexed (0 = January, 11 = December) — this catches everyone
- `toLocaleDateString()` with options gives human-readable formatted dates
- For date arithmetic, work with timestamps (`getTime()`) or use libraries like `date-fns`
