---
title: Strategy Implementation
description: Interchangeable algorithm families with the Strategy pattern
sidebar:
  order: 1
---

# Strategy Implementation

## Introduction

The Strategy pattern defines a family of interchangeable algorithms and lets you choose which one to use at runtime.

## Basic Strategy Pattern

```javascript
const strategies = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

function calculate(strategy, a, b) {
  if (!strategies[strategy]) throw new Error('Unknown strategy');
  return strategies[strategy](a, b);
}

calculate('add', 5, 3);      // 8
calculate('multiply', 5, 3); // 15
```

## Strategy with Classes

```javascript
class SortingStrategy {
  sort(data) { throw new Error('Must implement sort()'); }
}

class BubbleSort extends SortingStrategy {
  sort(data) {
    const arr = [...data];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    return arr;
  }
}

class QuickSort extends SortingStrategy {
  sort(data) {
    if (data.length <= 1) return data;
    const pivot = data[0];
    const left = data.slice(1).filter(x => x < pivot);
    const right = data.slice(1).filter(x => x >= pivot);
    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}

const sorter = new QuickSort();
sorter.sort([3, 1, 4, 1, 5]); // [1, 1, 3, 4, 5]
```

## Summary

- Define a family of algorithms as interchangeable strategies
- Context delegates to the selected strategy
- New strategies can be added without changing existing code
- Each strategy is independently testable

## Further Reading

- [Refactoring Guru: Strategy](https://refactoring.guru/design-patterns/strategy)
