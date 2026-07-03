---
title: DOM vs HTML
description: The difference between the HTML source and the live DOM
sidebar:
  order: 2
---

# DOM vs HTML

## Introduction

The DOM is a **live representation** of the HTML. When JavaScript modifies the DOM, the browser re-renders accordingly — but the HTML file itself never changes.

## Key Concept

```javascript
// When you modify the DOM, the page updates
document.body.innerHTML = '<h1>New Content</h1>';
// The HTML file is NOT changed, but the page renders differently
```

## HTML vs DOM

| Aspect | HTML | DOM |
|--------|------|-----|
| Location | On disk (file) | In memory (browser) |
| Updates | Requires page reload | Live, updates instantly |
| Dynamic content | Static | Can be changed dynamically |
| Errors | Browser parses forgivingly | DOM is already parsed |

## How Changes Work

1. Browser loads HTML file
2. Parses HTML → creates DOM tree
3. JavaScript modifies DOM nodes
4. Browser re-renders based on DOM changes
5. Original HTML file remains unchanged

## Summary

- DOM is the live, in-memory representation of the page
- Modifying the DOM updates what the user sees
- The original HTML file is never modified
- DOM manipulation is how JavaScript creates interactivity

## Further Reading

- [MDN: How the DOM is built](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
