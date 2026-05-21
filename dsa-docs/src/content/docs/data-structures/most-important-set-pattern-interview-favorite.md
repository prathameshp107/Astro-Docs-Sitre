---
title: "Most Important Set Pattern (Interview Favorite)"
description: "console.log(unique); // [1, 2, 3, 4]"
sidebar:
  order: 30
---

# Most Important Set Pattern (Interview Favorite)

## Remove duplicates from array

```javascript
const nums = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(nums)];

console.log(unique);
// [1, 2, 3, 4]
```

**Time:** O(n)
VERY COMMON INTERVIEW QUESTION

---