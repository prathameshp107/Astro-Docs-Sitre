---
title: Well-Known Symbols
description: JavaScript's built-in Symbol values that customize object behavior
sidebar:
  order: 2
---

# Well-Known Symbols

## Introduction

**Well-known symbols** are built-in Symbol values that let you customize how objects interact with JavaScript's internal operations.

## Symbol.iterator

Makes objects iterable (used by `for...of`, spread, destructuring):

```javascript
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end 
          ? { value: current++, done: false } 
          : { done: true };
      }
    };
  }
}

for (const n of new Range(1, 5)) console.log(n); // 1 2 3 4 5
```

## Symbol.toPrimitive

Controls how objects are converted to primitive values:

```javascript
const temperature = {
  value: 100,
  unit: 'C',
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.value;
    if (hint === 'string') return `${this.value}°${this.unit}`;
    return this.value;
  }
};

console.log(+temperature);      // 100 (number hint)
console.log(`${temperature}`);  // '100°C' (string hint)
console.log(temperature + '');  // '100°C' (default hint → string)
```

## Symbol.toStringTag

Customizes `Object.prototype.toString` output:

```javascript
class MyCollection {
  get [Symbol.toStringTag]() {
    return 'MyCollection';
  }
}

const mc = new MyCollection();
console.log(Object.prototype.toString.call(mc)); 
// '[object MyCollection]'
```

## Symbol.hasInstance

Customizes `instanceof` behavior:

```javascript
class Range {
  static [Symbol.hasInstance](instance) {
    return instance >= 0 && instance <= 100;
  }
}

console.log(50 instanceof Range);  // true
console.log(200 instanceof Range); // false
```

## Other Well-Known Symbols

| Symbol | Purpose |
|--------|---------|
| `Symbol.iterator` | Make objects iterable |
| `Symbol.asyncIterator` | Make objects async iterable |
| `Symbol.toPrimitive` | Custom type conversion |
| `Symbol.toStringTag` | Custom Object.prototype.toString |
| `Symbol.hasInstance` | Custom instanceof |
| `Symbol.species` | Constructor for derived objects |
| `Symbol.match` | Custom RegExp matching |
| `Symbol.replace` | Custom string replacement |
| `Symbol.search` | Custom string search |
| `Symbol.split` | Custom string splitting |
| `Symbol.unscopables` | Exclude keys from `with` binding |

## Summary

- Well-known symbols customize internal JavaScript behavior
- Most common: Symbol.iterator, Symbol.toPrimitive, Symbol.toStringTag
- They're part of the ECMAScript specification
- Enable metaprogramming patterns

## Further Reading

- [MDN: Well-Known Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols)
- [Previous: Creating Symbols](./creating-symbols)
