---
title: Use Cases
description: Practical applications of Mutation Observer
sidebar:
  order: 2
---

# Use Cases

## Introduction

Mutation Observer is useful for detecting DOM changes made by third-party scripts, libraries, or dynamic UI updates.

## Common Use Cases

- Detecting when content is loaded dynamically
- Syncing external state with DOM changes
- Implementing custom reactivity systems
- Monitoring third-party widget modifications

## Example: Detect Dynamic Content

```javascript
// Watch for new comments added to a page
const commentSection = document.getElementById('comments');

const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.matches('.comment')) {
        console.log('New comment added:', node.textContent);
        highlightNewComment(node);
      }
    });
  });
});

observer.observe(commentSection, {
  childList: true,
  subtree: true
});
```

## Summary

- Detects DOM mutations made by any code (including third-party)
- More efficient than polling/setInterval
- Great for debugging and monitoring
- Useful for extending libraries that don't provide callbacks

## Further Reading

- [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
