---
title: every()
description: Using every() to verify all elements meet a condition
sidebar:
  order: 9
---

# every()

*(Covered in the some & every section — see above)*

## Quick Reference

```javascript
[1, 2, 3].every(x => x > 0);  // true
[1, 2, 3].every(x => x > 1);  // false
```

`every()` returns `true` only if the callback returns truthy for **every element**. It stops (short-circuits) as soon as it finds a falsy result.

## Further Reading

- [MDN: Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
