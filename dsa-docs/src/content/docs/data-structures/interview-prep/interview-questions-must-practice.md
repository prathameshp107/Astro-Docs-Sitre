---
title: "Interview Questions (Must Practice)"
description: "---"
sidebar:
  order: 3
---

#  Interview Questions (Must Practice)

---

## Question 1  Two Sum (HashMap)

**Problem:** Return indicesof two numbers that sum to target.

```javascript
function twoSum(nums, targe{
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    coned = target - nums[i];

    if (map.has(need)) {
      return [map.get(need), i];
map.set(nums[i], i);
  }
**Time:** O(n)
**Space:** O(n)

---

## Question 2 Contains Duplicate (Set)

**Problem:** Check if array contains duplicates.

```javascript
function containsDuplicate(nums) {
  const set = new Set(nums);
  return set.size !== nums.length;
}
```

**Time:** O(n)

---

##  Question 3 First Non-Repeating Character

```javascript
function firstUniqueChar(s) {
  const freq = new Map();

  for (let ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }

  return -1;
}
```

---

## Question 4 Intersection of Two Arrays

```javascript
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();

  for (let num of nums2) {
    if (set1.has(num)) {
      result.add(num);
    }
  }

  return [...result];
}
```

---