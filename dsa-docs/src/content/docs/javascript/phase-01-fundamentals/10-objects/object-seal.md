---
title: Object.seal()
description: Preventing property addition and deletion with Object.seal()
sidebar:
  order: 7
---

# Object.seal()

## Introduction

`Object.seal()` prevents adding or deleting properties but allows **modifying existing properties**. It's less restrictive than `Object.freeze()`.

## Example

```javascript
const user = Object.seal({ name: 'Alice', age: 25 });

user.age = 26;     // ✅ Allowed — modification
user.email = 'a@b.com'; // ❌ Cannot add
delete user.name;  // ❌ Cannot delete
Object.isSealed(user); // true
```

## freeze vs seal

| Feature | freeze | seal |
|---------|--------|------|
| Read properties | ✅ | ✅ |
| Modify properties | ❌ | ✅ |
| Add properties | ❌ | ❌ |
| Delete properties | ❌ | ❌ |

## Summary

- `Object.seal()` prevents add/delete but allows modification
- Use when you want to prevent structural changes but allow value updates
- Check with `Object.isSealed()`

## Further Reading

- [MDN: Object.seal()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
