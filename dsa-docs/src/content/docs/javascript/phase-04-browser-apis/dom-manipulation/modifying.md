---
title: Modifying Elements
description: Changing content, attributes, classes, and styles
sidebar:
  order: 3
---

# Modifying Elements

## Introduction

Once you have a reference to a DOM element, you can modify its content, attributes, classes, and styles.

## Content

```javascript
const el = document.querySelector('.target');

el.textContent = 'New text';         // Plain text (safe — no XSS risk)
el.innerHTML = '<b>Bold text</b>';   // HTML (XSS risk with user data!)
el.innerText = 'Visible text';       // Respects CSS visibility (slower)
```

## Attributes

```javascript
el.setAttribute('disabled', '');
el.getAttribute('disabled');  // ''
el.removeAttribute('disabled');
el.hasAttribute('disabled');  // false

// Boolean properties (preferred for known properties)
el.disabled = true;
el.id = 'new-id';
```

## Classes

```javascript
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('visible');
el.classList.contains('active');  // true/false

// Replace one class with another
el.classList.replace('old', 'new');
```

## Styles

```javascript
el.style.color = 'red';
el.style.backgroundColor = '#f0f0f0';
el.style.cssText = 'color: red; background: blue;';
el.style.setProperty('--custom-var', 'value');
```

## Summary

- `textContent` for safe text, avoid `innerHTML` with user data
- `classList` API for class manipulation
- `style` property for inline styles
- Use `setAttribute`/`getAttribute` for data attributes

## Further Reading

- [MDN: Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
