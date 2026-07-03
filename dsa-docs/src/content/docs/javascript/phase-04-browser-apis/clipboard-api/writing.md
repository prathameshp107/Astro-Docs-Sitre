---
title: Writing
description: Copying text and data to the clipboard
sidebar:
  order: 1
---

# Writing to Clipboard

## Introduction

The Clipboard API lets you programmatically copy text and other data to the system clipboard.

## Copy Text

```javascript
// Write text to clipboard
await navigator.clipboard.writeText('Text to copy');
console.log('Text copied to clipboard');
```

## Copy Rich Data

```javascript
// Write multiple formats
await navigator.clipboard.write([
  new ClipboardItem({
    'text/plain': new Blob(['Hello'], { type: 'text/plain' }),
    'text/html': new Blob(['<b>Hello</b>'], { type: 'text/html' })
  })
]);
```

## Button Implementation

```javascript
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    copyButton.textContent = 'Copied!';
    setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
});
```

## Summary

- `navigator.clipboard.writeText(text)` — copy text
- `navigator.clipboard.write(items)` — copy rich data
- Returns a Promise
- Requires HTTPS and user interaction

## Further Reading

- [MDN: Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write)
