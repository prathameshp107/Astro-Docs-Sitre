---
title: Reading
description: Pasting text and data from the clipboard
sidebar:
  order: 2
---

# Reading from Clipboard

## Introduction

The Clipboard API allows reading text and other data from the system clipboard.

## Read Text

```javascript
const text = await navigator.clipboard.readText();
console.log('Clipboard content:', text);
```

## Read Rich Data

```javascript
const items = await navigator.clipboard.read();
for (const item of items) {
  if (item.types.includes('text/plain')) {
    const blob = await item.getType('text/plain');
    console.log(await blob.text());
  }
}
```

## Paste Handling

```javascript
pasteButton.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    outputElement.textContent = text;
  } catch (err) {
    console.error('Failed to read clipboard:', err);
  }
});
```

## Summary

- `navigator.clipboard.readText()` — read text from clipboard
- `navigator.clipboard.read()` — read multiple data formats
- Requires user permission (read permission is not auto-granted)
- Requires HTTPS and user interaction

## Further Reading

- [MDN: Clipboard.readText](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText)
