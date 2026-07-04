---
title: JavaScript Cheat Sheet
description: Quick reference for JavaScript syntax and concepts
sidebar:
  order: 1
---

# JavaScript Cheat Sheet

## Variables

```javascript
var x = 1;      // Function-scoped (avoid)
let y = 2;      // Block-scoped, reassignable
const z = 3;    // Block-scoped, constant

// Destructuring
const { name, age } = obj;
const [a, b] = arr;
```

## Functions

```javascript
// Declaration
function fn() {}
// Expression
const fn = function() {};
// Arrow
const fn = () => {};
// Default params
function fn(a = 1) {}
// Rest params
function fn(...args) {}
```

## Arrays

```javascript
arr.map(x => x * 2);
arr.filter(x => x > 2);
arr.reduce((a, b) => a + b, 0);
arr.find(x => x === 2);
arr.some(x => x > 2);
arr.every(x => x > 0);
arr.includes(2);
arr.flat();
arr.sort((a, b) => a - b);
```

## Promises

```javascript
const p = new Promise((res, rej) => {});
p.then(v => {}).catch(e => {}).finally(() => {});

// Async/await
async function fn() {
  try { const r = await fetch(url); }
  catch (e) { console.error(e); }
}

// Promise combinators
Promise.all([p1, p2]);
Promise.race([p1, p2]);
Promise.allSettled([p1, p2]);
Promise.any([p1, p2]);
```

## Objects

```javascript
const obj = { name, age };          // Shorthand
const obj = { [key]: value };       // Computed
const copy = { ...obj };            // Spread
const { name, ...rest } = obj;      // Rest
Object.freeze(obj);
Object.seal(obj);
Object.keys(obj);
Object.values(obj);
Object.entries(obj);
```

## DOM

```javascript
document.querySelector('.class');
document.querySelectorAll('div');
el.textContent = 'text';
el.classList.add('active');
el.addEventListener('click', fn);
el.closest('.parent');
el.remove();
```

## Comparison

| Operator | Meaning |
|----------|---------|
| `===` | Strict equality (prefer) |
| `!==` | Strict inequality |
| `??` | Nullish coalescing |
| `?.` | Optional chaining |
| `&&=` | Logical AND assignment |
| `\|\|=` | Logical OR assignment |
| `??=` | Nullish assignment |
