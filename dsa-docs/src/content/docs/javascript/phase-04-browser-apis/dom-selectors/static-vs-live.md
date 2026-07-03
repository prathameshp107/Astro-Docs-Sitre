---
title: Static vs Live
description: querySelectorAll vs getElementsBy — understanding the difference
sidebar:
  order: 3
---

# Static vs Live

## Introduction

`querySelectorAll()` returns a **static** NodeList (snapshot), while `getElementsByClassName()` and `getElementsByTagName()` return **live** collections that update automatically.

## Static Collections

```javascript
// querySelectorAll — static (snapshot, not live)
const items = document.querySelectorAll('.item');
console.log(items.length); // 3

// If a new .item is added later:
document.body.appendChild(document.createElement('div').classList.add('item'));

console.log(items.length); // Still 3 — snapshot doesn't update
```

## Live Collections

```javascript
// getElementsByClassName — live (updates automatically)
const liveItems = document.getElementsByClassName('item');
console.log(liveItems.length); // 3

// If a new .item is added:
document.body.querySelector('.items').appendChild(
  Object.assign(document.createElement('div'), { className: 'item' })
);

console.log(liveItems.length); // 4 — updated automatically!
```

## Summary

| Method | Collection Type | Updates Automatically |
|--------|----------------|----------------------|
| `querySelectorAll()` | Static NodeList | ❌ No |
| `getElementsByClassName()` | Live HTMLCollection | ✅ Yes |
| `getElementsByTagName()` | Live HTMLCollection | ✅ Yes |

## Further Reading

- [MDN: NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
