---
title: Multiline Strings
description: Creating multi-line strings without concatenation
sidebar:
  order: 2
---

# Multiline Strings

## Introduction

Template literals preserve whitespace and line breaks, making multi-line strings much easier to create.

## Basic Multiline

```javascript
// Old way — manual concatenation with \n
const html = '<div>\n' +
  '<h1>Title</h1>\n' +
  '</div>';

// Template literal — natural line breaks
const html2 = `
<div>
  <h1>Title</h1>
</div>`;
```

## HTML Templates

```javascript
const name = 'Alice';
const items = ['Apple', 'Banana', 'Cherry'];

const list = `
<ul>
  ${items.map(item => `  <li>${item}</li>`).join('\n')}
</ul>`;

console.log(list);
// Output:
// <ul>
//   <li>Apple</li>
//   <li>Banana</li>
//   <li>Cherry</li>
// </ul>
```

## Summary

- Line breaks in template literals are preserved in the output
- No more `\n` or string concatenation for multi-line strings
- Whitespace is preserved (including indentation)
- Perfect for HTML templates, SQL queries, or any formatted text

## Further Reading

- [MDN: Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
