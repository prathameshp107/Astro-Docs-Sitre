---
title: Anonymous Functions
description: JavaScript anonymous functions — functions without names
sidebar:
  order: 4
---

# Anonymous Functions

## Introduction

Anonymous functions are functions **without a name**. They are used as arguments to other functions or assigned to variables.

## Example

```javascript
document.addEventListener('click', function() {
  console.log('Clicked!');
});
```

## Usage

```javascript
// As callbacks
[1, 2, 3].map(function(x) { return x * 2; });

// In IIFE
(function() {
  console.log('Runs immediately');
})();

// In event handlers
button.onclick = function() { alert('Hi!'); };
```

## Anonymous vs Named

```javascript
// Anonymous — stack trace shows 'anonymous'
setTimeout(function() { }, 100);

// Named — stack trace shows 'myCallback'
setTimeout(function myCallback() { }, 100);
```

## Summary

- Functions without a name
- Common as callbacks and IIFEs
- Consider named expressions for better debugging

## Further Reading

- [MDN: Anonymous Function](https://developer.mozilla.org/en-US/docs/Glossary/Anonymous_function)
