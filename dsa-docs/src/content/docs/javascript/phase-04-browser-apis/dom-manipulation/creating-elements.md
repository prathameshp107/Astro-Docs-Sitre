---
title: Creating Elements
description: Using createElement and setting element properties
sidebar:
  order: 1
---

# Creating Elements

## Introduction

Use `document.createElement()` to create new DOM elements, then configure them with properties.

## Basic Creation

```javascript
const div = document.createElement('div');
div.textContent = 'Hello World';
div.className = 'card';
div.id = 'card-1';
div.setAttribute('data-index', '0');
```

## Creating Complex Elements

```javascript
function createCard(title, content) {
  const card = document.createElement('div');
  card.className = 'card';

  const heading = document.createElement('h3');
  heading.textContent = title;

  const body = document.createElement('p');
  body.textContent = content;

  card.appendChild(heading);
  card.appendChild(body);

  return card;
}

document.body.appendChild(createCard('Hello', 'World'));
```

## innerHTML Alternative

```javascript
// Using innerHTML (faster but XSS risk with user data)
const container = document.createElement('div');
container.innerHTML = '<h3>Title</h3><p>Content</p>';

// Using createElement (safer, more flexible)
const container = document.createElement('div');
const h3 = document.createElement('h3');
h3.textContent = 'Title';
container.appendChild(h3);
```

## Summary

- `document.createElement(tagName)` creates a new element
- Set properties: textContent, className, id, setAttribute
- Build complex structures with createElement + appendChild
- Prefer createElement over innerHTML when handling user data

## Further Reading

- [MDN: Document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
