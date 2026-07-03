---
title: Decorator Pattern
description: Adding behavior to objects dynamically
sidebar:
  order: 7
---

# Decorator Pattern

## Introduction

The Decorator pattern lets you **add behavior** to objects dynamically without affecting other objects of the same class.

## Implementation

```javascript
class Coffee {
  cost() { return 5; }
  description() { return 'Coffee'; }
}

// Decorators
function withMilk(coffee) {
  return {
    cost: () => coffee.cost() + 1.5,
    description: () => coffee.description() + ' + Milk'
  };
}

function withSugar(coffee) {
  return {
    cost: () => coffee.cost() + 0.5,
    description: () => coffee.description() + ' + Sugar'
  };
}

function withWhippedCream(coffee) {
  return {
    cost: () => coffee.cost() + 2,
    description: () => coffee.description() + ' + Whipped Cream'
  };
}

let myCoffee = new Coffee();
myCoffee = withMilk(myCoffee);
myCoffee = withSugar(myCoffee);

console.log(myCoffee.description()); // 'Coffee + Milk + Sugar'
console.log(myCoffee.cost());        // 7
```

## Summary

- Adds behavior dynamically without subclassing
- Wraps objects with additional functionality
- More flexible than inheritance

## Further Reading

- [Refactoring Guru: Decorator](https://refactoring.guru/design-patterns/decorator)
