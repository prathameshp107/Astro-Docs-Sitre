---
title: DOM Manipulation
description: Creating, modifying, and removing DOM elements
sidebar:
  order: 4
---

# DOM Manipulation

## Introduction

DOM manipulation refers to creating, modifying, or removing elements from the DOM. This is how JavaScript updates the visual page dynamically.

## Topics Covered

- [Creating Elements](./creating-elements) — Using createElement and setting properties
- [Inserting Elements](./inserting) — appendChild, append, prepend, and more
- [Modifying Elements](./modifying) — Changing content, attributes, classes, and styles
- [Removing Elements](./removing) — element.remove() and other removal methods
- [Performance: Batch Updates](./batch-updates) — Using DocumentFragment for efficiency

## Summary

Use `createElement` + `appendChild`/`append` for adding. `textContent` for safe text. `classList` API for classes. `DocumentFragment` for batch insertions. `element.remove()` to delete.

## Further Reading

- [MDN: DOM Manipulation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
