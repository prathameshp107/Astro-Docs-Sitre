---
title: Setting Prototypes
description: How to set and get prototypes in JavaScript — Object.create, __proto__, setPrototypeOf
sidebar:
  order: 2
---

# Setting Prototypes

## Introduction

There are several ways to set an object's prototype. The recommended modern approach is `Object.create()`, while `__proto__` and `Object.setPrototypeOf()` are alternatives with trade-offs.

## 1. Object.create() (Recommended)

Creates a new object with the specified prototype:

```javascript
const animal = {
  eat() { return `${this.name} is eating`; }
};

const dog = Object.create(animal);
dog.name = 'Rex';
console.log(dog.eat()); // 'Rex is eating'
console.log(Object.getPrototypeOf(dog) === animal); // true
```

### With Property Descriptors

```javascript
const obj = Object.create(proto, {
  name: {
    value: 'Alice',
    writable: true,
    enumerable: true,
    configurable: true
  }
});
```

## 2. __proto__ (Deprecated but Common)

```javascript
const dog = {
  name: 'Rex',
  __proto__: animal
};

console.log(dog.eat()); // 'Rex is eating'

// Also as a setter:
dog.__proto__ = animal;
```

⚠️ **Deprecated**: Works in all environments but is not recommended for production code.

## 3. Object.setPrototypeOf()

```javascript
const dog = { name: 'Rex' };
Object.setPrototypeOf(dog, animal);
console.log(dog.eat()); // 'Rex is eating'
```

⚠️ **Performance warning**: `setPrototypeOf` can slow down engines — avoid using it after object creation.

## 4. Constructor's prototype Property

```javascript
function Dog(name) {
  this.name = name;
}

// Setting the prototype for all instances
Dog.prototype = animal;

const rex = new Dog('Rex');
console.log(rex.eat()); // 'Rex is eating'
```

## Getting the Prototype

```javascript
// Modern (recommended)
Object.getPrototypeOf(obj);

// Deprecated
obj.__proto__;

// Check if prototype is in chain
animal.isPrototypeOf(dog); // true
```

## Comparison

| Method | Creates New Object | Performance | Modern |
|--------|------------------|-------------|--------|
| `Object.create()` | ✅ Yes | ✅ Best | ✅ Yes |
| `__proto__` | ❌ No (sets) | ✅ Good | ❌ Deprecated |
| `Object.setPrototypeOf()` | ❌ No (sets) | ❌ Slow | ⚠️ Use sparingly |
| Constructor `.prototype` | ❌ No (sets for instances) | ✅ Good | ✅ Yes |

## Best Practices

- Use `Object.create()` for creating objects with specific prototypes
- Set `.prototype` on constructor functions before creating instances
- Avoid `Object.setPrototypeOf()` on hot paths
- Never use `__proto__` in production code

## Summary

- `Object.create()` is the cleanest way to set prototypes
- `__proto__` is deprecated but still widely supported
- `Object.setPrototypeOf()` has performance implications
- Constructor `.prototype` sets the prototype for all `new` instances
- Always use `Object.getPrototypeOf()` for reading

## Further Reading

- [MDN: Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [Previous: Prototype Chain](./prototype-chain)
- [Next: Built-in Prototypes](./built-in-prototypes)
