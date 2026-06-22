---
title: "Regular Expressions"
description: "Pattern matching with RegExp, regex methods (test, exec, match, replace, split), flags, character classes, and common patterns."
sidebar:
  order: 5
---

## Regular Expressions

Regular expressions are patterns used to match character combinations in strings. They're powerful for validation, searching, and text manipulation.

### Creating a Regex

```javascript
// Literal (preferred — no escaping needed for backslashes)
const regex = /hello/;

// Constructor (useful for dynamic patterns)
const pattern = "hello";
const regex2 = new RegExp(pattern, "i");
```

### Flags

```javascript
/hello/g  // global — find all matches
/hello/i  // case-insensitive
/hello/m  // multiline — ^ and $ match line boundaries
/hello/s  // dotAll — . matches newlines
/hello/u  // unicode — enable Unicode features
/hello/y  // sticky — match from lastIndex position
```

### Testing & Executing

```javascript
const str = "Hello, World!";

// test — returns boolean
/World/.test(str);         // true
/world/i.test(str);        // true (case-insensitive)

// exec — returns match details or null
const result = /l{2}/.exec(str);
result[0];                 // "ll"
result.index;              // 2
```

### String Methods with Regex

```javascript
const str = "The quick brown fox jumps over the lazy dog.";

// match — returns array of matches
str.match(/the/gi);        // ["The", "the"]

// matchAll — iterator of all match groups
[...str.matchAll(/the/gi)];

// search — returns index of first match
str.search(/quick/);       // 4

// replace — replaces first match (or all with /g)
str.replace(/the/gi, "a"); // "a quick brown fox jumps over a lazy dog."

// split — splits by pattern
str.split(/\s+/);          // ["The", "quick", "brown", ...]
```

### Character Classes

```javascript
/\d/    // digit [0-9]
/\w/    // word char [a-zA-Z0-9_]
/\s/    // whitespace [ \t\n\r\f]
/\D/    // non-digit
/\W/    // non-word
/\S/    // non-whitespace
/./     // any char except newline (with /s flag: including newline)
```

### Quantifiers & Anchors

```javascript
/a*/    // zero or more
/a+/    // one or more
/a?/    // zero or one
/a{3}/  // exactly 3
/a{3,}/ // 3 or more
/a{3,5}/ // 3 to 5

/^/     // start of string (or line with /m)
/$/     // end of string (or line with /m)
/\b/    // word boundary
/\B/    // non-word boundary
```

### Groups & Ranges

```javascript
/[abc]/    // a, b, or c
/[a-z]/    // range a to z
/[^abc]/   // NOT a, b, or c
/(abc)/    // capturing group
/(?:abc)/  // non-capturing group
/a|b/      // alternation — a or b
```

### Common Patterns

```javascript
// Email (simple)
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
email.test("user@example.com"); // true

// Phone (US): (123) 456-7890
const phone = /^\(\d{3}\)\s\d{3}-\d{4}$/;
phone.test("(555) 123-4567"); // true

// URL
const url = /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]*$/;
url.test("https://example.com"); // true

// Extract hashtags
"Hello #world #js".match(/#\w+/g); // ["#world", "#js"]

// Replace extra whitespace
"a   b    c".replace(/\s+/g, " "); // "a b c"
```

### 🚨 Common Gotchas

```javascript
// Forgetting the g flag — replace only replaces first match
"banana".replace(/a/, "o");     // "bonana"
"banana".replace(/a/g, "o");    // "bonono"

// Special chars need escaping: . + * ? [ ] { } ( ) ^ $ | \
/example\.com/.test("example.com"); // need to escape the dot
/\(555\)/.test("(555)");            // need to escape parens

// Using new RegExp with strings — double-escape backslashes!
new RegExp("\\d+", "g"); // same as /\d+/g
```

### Key Takeaways

- Use literal syntax `/pattern/flags` for static patterns; `new RegExp()` for dynamic ones
- `test()` returns boolean, `exec()` returns match details
- Always use the `g` flag with `replace()` to replace all occurrences
- Special characters (`.`, `*`, `+`, `?`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `$`, `|`, `\`) need escaping with `\`
- Use `matchAll()` instead of `match()` with `g` when you need capture groups
- Practice common patterns: email, phone, URL, whitespace normalization
