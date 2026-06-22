---
title: "Functions"
description: "Function declarations vs expressions, arrow functions, parameters, IIFE, hoisting differences, and first-class functions."
sidebar:
  order: 8
---

## Functions

Functions are reusable blocks of code. JavaScript treats them as **first-class citizens** — they can be assigned to variables, passed as arguments, and returned from other functions.

### Function Declaration

Hoisted fully — you can call it before its definition.

```javascript
greet("Alice"); // ✅ works — function is hoisted

function greet(name) {
  return `Hello, ${name}!`;
}
// Output: Hello, Alice!
```

### Function Expression

Not hoisted — `fn` is hoisted as `undefined` (it's a `var`), causing a `TypeError`.

```javascript
hello(); // ❌ TypeError: hello is not a function

var hello = function(name) {
  return `Hi, ${name}!`;
};
```

### Arrow Functions

Shorter syntax, no own `this`, no `arguments` object.

```javascript
// Single parameter — parentheses optional
const double = n => n * 2;

// Multiple parameters
const add = (a, b) => a + b;

// No parameters
const greet = () => "Hello!";

// Block body — needs explicit return
const sum = (a, b) => {
  const result = a + b;
  return result;
};
```

### Parameters: Default, Rest, Arguments

```javascript
// Default parameters
function greet(name = "World") {
  return `Hello, ${name}!`;
}
greet();        // "Hello, World!"
greet("Alice"); // "Hello, Alice!"

// Rest parameters (...)
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10

// arguments object (arrow functions don't have it)
function showArgs() {
  console.log(arguments); // array-like object
}
showArgs(1, 2, 3);
// Output: [Arguments] { '0': 1, '1': 2, '2': 3 }
```

### IIFE (Immediately Invoked Function Expression)

```javascript
// Classic
(function() {
  const private = "I'm isolated";
  console.log(private);
})();

// Arrow IIFE
(() => {
  console.log("Runs immediately");
})();
```

### First-Class Functions

Functions can be passed around like any other value.

```javascript
function operate(a, b, fn) {
  return fn(a, b);
}

const result = operate(10, 5, (x, y) => x / y);
console.log(result); // 2
```

> For a deeper dive into first-class functions, closures, and callbacks, see the [Namaste JavaScript notes](/DSA-Notes-Problems/namaste-js/season-1/first-class-functions-ft-anonymous-functions).

### Hoisting Differences

```javascript
// Function declaration — fully hoisted
fnDeclaration(); // ✅ "works"
function fnDeclaration() { console.log("works"); }

// var function expression — variable hoisted, not assignment
fnExpression(); // ❌ TypeError
var fnExpression = function() { console.log("nope"); };

// let/const function expression — TDZ error
fnLet(); // ❌ ReferenceError
let fnLet = () => console.log("nope");
```

### Key Takeaways

- Function declarations are fully hoisted; function expressions are not
- Arrow functions inherit `this` from their enclosing scope — no own `this`
- Use default parameters instead of manual `||` fallbacks
- Rest parameters (`...`) collect remaining arguments into a real array
- Functions are first-class — they can be assigned, passed, and returned
- IIFEs create isolated scopes (less relevant since ES modules)
