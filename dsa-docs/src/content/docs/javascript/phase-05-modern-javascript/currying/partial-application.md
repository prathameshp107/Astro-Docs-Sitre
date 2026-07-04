---
title: Partial Application
description: Pre-setting arguments to create specialized functions from curried functions
sidebar:
  order: 2
---

# Partial Application

## Introduction

**Partial application** pre-sets some arguments of a function, returning a new function that expects the remaining arguments. Currying makes partial application natural and powerful.

## Basic Partial Application

```javascript
const multiply = a => b => a * b;

// Partially apply `a = 2`
const double = multiply(2);
double(5);  // 10
double(10); // 20

// Partially apply `a = 3`
const triple = multiply(3);
triple(5);  // 15
```

## Real-World Examples

### Configuring API Clients

```javascript
const apiRequest = baseUrl => endpoint => fetch(`${baseUrl}${endpoint}`).then(r => r.json());

// Create a specialized GitHub API client
const github = apiRequest('https://api.github.com');
const gitlab = apiRequest('https://gitlab.com/api/v4');

github('/users/octocat');
gitlab('/projects');
```

### Logging with Levels

```javascript
const log = level => message => console.log(`[${level}] ${message}`);

const info = log('INFO');
const warn = log('WARN');
const error = log('ERROR');

info('Server started');  // [INFO] Server started
warn('Disk space low');  // [WARN] Disk space low
error('Crash!');         // [ERROR] Crash!
```

### Event Formatting

```javascript
const formatWith = locale => date => new Intl.DateTimeFormat(locale).format(date);

const formatUS = formatWith('en-US');
const formatDE = formatWith('de-DE');
const formatJP = formatWith('ja-JP');

formatUS(new Date('2024-01-15')); // 1/15/2024
formatDE(new Date('2024-01-15')); // 15.1.2024
```

## Partial Application vs Currying

While related, they're different:

- **Currying**: transforms `fn(a, b, c)` → `fn(a)(b)(c)`
- **Partial Application**: pre-fills arguments: `partial(fn, a, b)` → `fn(c)`

```javascript
// Generic partial application (not currying-specific)
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
const sayGoodbye = partial(greet, 'Goodbye');

sayHello('Alice');  // 'Hello, Alice!'
sayGoodbye('Bob');  // 'Goodbye, Bob!'
```

## With .bind()

JavaScript's `.bind()` also enables partial application:

```javascript
function greet(greeting, punctuation, name) {
  return `${greeting}, ${name}${punctuation}`;
}

const sayHello = greet.bind(null, 'Hello');
sayHello('!', 'Alice'); // 'Hello, Alice!'

const sayHelloExclamation = greet.bind(null, 'Hello', '!');
sayHelloExclamation('Alice'); // 'Hello, Alice!'
```

## Summary

- Partial application pre-sets arguments, returning a function for the rest
- Currying makes partial application seamless
- `.bind()` can also partially apply arguments
- Powerful for creating specialized functions from general ones

## Further Reading

- [MDN: Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
