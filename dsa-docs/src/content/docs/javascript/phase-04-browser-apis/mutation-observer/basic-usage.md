---
title: Basic Usage
description: Creating and configuring a Mutation Observer
sidebar:
  order: 1
---

# Basic Usage

## Introduction

Create a Mutation Observer with a callback, configure which changes to observe, and start watching a target element.

## Basic Setup

```javascript
const targetNode = document.getElementById('observable');
const config = {
  childList: true,    // Watch for child element changes
  attributes: true,   // Watch for attribute changes
  subtree: true,      // Watch all descendants
  characterData: true // Watch text content changes
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      console.log('Nodes added:', mutation.addedNodes);
      console.log('Nodes removed:', mutation.removedNodes);
    }
    if (mutation.type === 'attributes') {
      console.log(`Attribute "${mutation.attributeName}" changed`);
    }
  });
});

observer.observe(targetNode, config);

// Stop observing
observer.disconnect();
```

## Configuration Options

| Option | Default | Watches For |
|--------|---------|-------------|
| `childList` | `false` | Direct child additions/removals |
| `attributes` | `false` | Attribute changes |
| `subtree` | `false` | All descendants (not just direct) |
| `characterData` | `false` | Text content changes |

## Summary

- Create with `new MutationObserver(callback)`
- Callback receives array of MutationRecord objects
- Configure what to observe with `config` object
- `observer.disconnect()` stops all observation

## Further Reading

- [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
