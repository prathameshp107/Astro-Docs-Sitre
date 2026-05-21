---
title: "Two Sum Problem"
description: "---"
sort: 35
---

# Two Sum Problem

## Brute Force O(n²)

```javascript
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target)
      return [i, j];
  }
}
```

---

## Optimal O(n)

```javascript
function twoSum(nums, target) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map[complement] !== undefined)
      return [map[complement], i];

    map[nums[i]] = i;
  }
}
```

---

<a id="recommended-next-topics"></a>