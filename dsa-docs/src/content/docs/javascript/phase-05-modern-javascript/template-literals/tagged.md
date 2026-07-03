---
title: Tagged Templates
description: Custom string processing with tag functions
sidebar:
  order: 3
---

# Tagged Templates

## Introduction

Tagged templates allow you to process template literals with a custom function, enabling domain-specific string processing.

## Basic Tag Function

```javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
  }, '');
}

const name = 'Alice';
const age = 25;
const result = highlight`Name: ${name}, Age: ${age}`;
// Output: "Name: <strong>Alice</strong>, Age: <strong>25</strong>"
```

## How Tags Work

```javascript
function tag(strings, ...values) {
  console.log(strings); // Array of string parts
  console.log(values);  // Array of interpolated values
  return 'Processed string';
}

const x = 10;
tag`Value is ${x} and doubled is ${x * 2}`;
// strings: ['Value is ', ' and doubled is ', '']
// values: [10, 20]
```

## Summary

- Tag functions receive string parts and interpolated values
- Use for custom formatting, sanitization, or DSLs
- Popular libraries use tags: `styled-components`, `graphql-tag`
- The tag function can return any value (not just strings)

## Further Reading

- [MDN: Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
