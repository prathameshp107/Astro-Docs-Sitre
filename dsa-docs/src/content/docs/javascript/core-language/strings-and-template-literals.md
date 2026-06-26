---
title: "Strings & Template Literals"
description: "String immutability, common methods (slice, split, replace, includes), template literals, multiline, and tagged templates."
sidebar:
  order: 4
---

## Strings & Template Literals

Strings represent textual data. In JavaScript, they're **immutable** — once created, a string can never be changed. Every method returns a new string.

### Immutability

```javascript
let str = "hello";
str.toUpperCase();
console.log(str); // "hello" — unchanged!

str = str.toUpperCase(); // must reassign
console.log(str); // "HELLO"
```

### Common String Methods

```javascript
const str = "  Hello, World!  ";

str.trim();               // "Hello, World!"
str.toLowerCase();        // "  hello, world!  "
str.toUpperCase();        // "  HELLO, WORLD!  "
str.includes("World");    // true
str.startsWith("Hello");  // false (has leading spaces)
str.endsWith("!");        // false (has trailing spaces)
str.indexOf("o");         // 6
str.slice(2, 7);          // "Hello"
str.substring(2, 7);      // "Hello"
str.replace("World", "JS");  // "  Hello, JS!  "
str.replaceAll("o", "0");    // "  Hell0, W0rld!  "
str.split(", ");          // ["  Hello", "World!  "]
"abc".repeat(3);          // "abcabcabc"
"42".padStart(5, "0");    // "00042"
"42".padEnd(5, "*");      // "42***"
```

### Template Literals

Template literals use backticks `` ` `` and support **interpolation**, **multiline**, and **tagging**.

```javascript
const name = "Alice";
const age = 30;

// Interpolation
const greeting = `Hello, ${name}! You are ${age}.`;
// "Hello, Alice! You are 30."

// Expressions
console.log(`2 + 2 = ${2 + 2}`); // "2 + 2 = 4"

// Multiline
const message = `
  Dear ${name},
  Welcome to the team!
  - The Manager
`;
```

### Tagged Templates

A tag function receives the string parts and interpolated values separately.

```javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `**${values[i]}**` : "");
  }, "");
}

const item = "apple";
const price = 1.5;
highlight`The ${item} costs $${price}.`;
// "The **apple** costs $**1.5**."
```

### String vs Template Literal

```javascript
const name = "Alice";

// Old way (concatenation)
const msg = "Hello, " + name + "!";

// Template literal (cleaner)
const msg2 = `Hello, ${name}!`;
```

### Common Pitfalls

```javascript
// Numbers become strings with + when one operand is a string
"2" + 2;          // "22" (not 4)
"2" - 2;          // 0   (- coerces to numbers)

// replace only replaces first match by default
"banana".replace("a", "o");  // "bonana"
"banana".replaceAll("a", "o"); // "bonono"

// split with empty string
"abc".split("");  // ["a", "b", "c"]
```

### Key Takeaways

- Strings are immutable — methods always return new strings
- Template literals with `${}` are cleaner than concatenation
- Use `.includes()`, `.startsWith()`, `.endsWith()` for substring checks
- `.replace()` replaces only the first match; use `.replaceAll()` for all
- `.trim()` removes whitespace from both ends
- Tagged templates give you fine-grained control over string interpolation
