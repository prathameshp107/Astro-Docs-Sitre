---
title: "String Basics"
description: "String immutability, common operations (charAt, substring, split, join), char codes, and JavaScript string quirks."
sidebar:
  order: 1
---

# 🔤 String Basics

## 🎯 What Is a String?

A **string** is a sequence of characters. In JavaScript, strings are **immutable** — once created, you cannot change a character. Any operation that appears to modify a string actually creates a **new string**.

```javascript
let s = "hello";
s[0] = "H";    // ❌ Does NOT work — strings are immutable
s = "H" + s.slice(1);  // ✅ Creates a new string "Hello"
```

**Analogy:** A string is like a **printed business card**. You can't erase and rewrite on it — you print a new card.

---

## 🔹 Common String Operations

| Operation | Method | Example | Result |
|-----------|--------|---------|--------|
| Length | `s.length` | `"hello".length` | `5` |
| Char at index | `s.charAt(i)` or `s[i]` | `"hello"[1]` | `"e"` |
| Substring | `s.slice(start, end)` | `"hello".slice(1, 4)` | `"ell"` |
| Substring (alt) | `s.substring(start, end)` | `"hello".substring(1, 4)` | `"ell"` |
| Split | `s.split(delimiter)` | `"a,b,c".split(",")` | `["a","b","c"]` |
| Join | `arr.join(separator)` | `["a","b"].join("-")` | `"a-b"` |
| Upper case | `s.toUpperCase()` | `"hello".toUpperCase()` | `"HELLO"` |
| Lower case | `s.toLowerCase()` | `"Hello".toLowerCase()` | `"hello"` |
| Includes | `s.includes(sub)` | `"hello".includes("ell")` | `true` |
| Index of | `s.indexOf(sub)` | `"hello".indexOf("l")` | `2` |
| Replace | `s.replace(old, new)` | `"hello".replace("l", "x")` | `"hexlo"` |
| Trim | `s.trim()` | `"  hi  ".trim()` | `"hi"` |
| Repeat | `s.repeat(n)` | `"ha".repeat(3)` | `"hahaha"` |
| Pad start | `s.padStart(n, ch)` | `"5".padStart(3, "0")` | `"005"` |

---

## 🔹 Char Codes

Every character has a numeric code (Unicode). Useful for alphabet cycling, case conversion, and validation.

```javascript
// Get char code
"a".charCodeAt(0);     // 97
"A".charCodeAt(0);     // 65
"z".charCodeAt(0);     // 122
"0".charCodeAt(0);     // 48

// Get character from code
String.fromCharCode(97);  // "a"
String.fromCharCode(65);  // "A"

// Useful ranges
// 'a'–'z': 97–122
// 'A'–'Z': 65–90
// '0'–'9': 48–57

// Check if character is lowercase
function isLowerCase(ch) {
  return ch >= "a" && ch <= "z";
}

// Convert lowercase to uppercase (without toUpperCase)
function toUpper(ch) {
  return String.fromCharCode(ch.charCodeAt(0) - 32);
}
```

---

## 🔹 Immutability in Practice

Because strings are immutable, operations that "build" strings character by character are **O(n²)** if done with `+`:

```javascript
// ❌ O(n²) — creates a new string each iteration
let s = "";
for (let i = 0; i < 10000; i++) {
  s += "x";  // Copies entire string each time!
}

// ✅ O(n) — use array join
const arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push("x");
}
s = arr.join("");  // Single copy at the end
```

**Analogy:** Using `+=` in a loop is like rewriting a shopping list from scratch every time you add an item. Using an array + `join` is like jotting items on sticky notes, then taping them together at the end.

---

## 🔹 JS String Quirks

```javascript
// Quirk 1: typeof is "string"
typeof "hello";            // "string"

// Quirk 2: Strings are primitive, but have methods (auto-boxing)
"hello".toUpperCase();     // Works — JS temporarily wraps it

// Quirk 3: Comparison is lexicographic (dictionary order)
"a" < "b";                 // true
"apple" < "banana";        // true
"2" > "10";                // true! (lexicographic: "2" > "1")

// Quirk 4: Template literals for interpolation
const name = "World";
`Hello ${name}!`;           // "Hello World!"

// Quirk 5: s[i] vs s.charAt(i)
"hello"[10];               // undefined
"hello".charAt(10);        // "" (empty string)
```

---

## 🔹 String → Array Conversions

```javascript
// String to array of characters
"hello".split("");         // ["h","e","l","l","o"]
[... "hello"];             // ["h","e","l","l","o"]
Array.from("hello");       // ["h","e","l","l","o"]

// Array of characters back to string
["h","e","l","l","o"].join("");  // "hello"

// String to array of words
"the quick brown fox".split(" "); // ["the","quick","brown","fox"]
```

---

## 🔹 Frequency Map (Letter Counting)

Most common string pattern in interviews:

```javascript
function charFrequency(s) {
  const freq = {};
  for (const ch of s) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  return freq;
}

charFrequency("hello");
// { h: 1, e: 1, l: 2, o: 1 }
```

For lowercase letters only, use an array of size 26 for O(1) space:

```javascript
function freqArray(s) {
  const freq = new Array(26).fill(0);
  for (const ch of s) {
    freq[ch.charCodeAt(0) - 97]++;
  }
  return freq;
}
```

---

## ✅ In Simple Words

- Strings are **immutable** — every operation creates a new string.
- Use `s.length`, `s[i]`, `s.slice()`, `s.split()`, `arr.join("")` most often.
- Building a string in a loop with `+=` is **O(n²)** — use array + `join` instead.
- Character codes (`charCodeAt`, `fromCharCode`) are key for alphabet cycling problems.
- Frequency maps (`object` or `array[26]`) are the #1 string interview pattern.
