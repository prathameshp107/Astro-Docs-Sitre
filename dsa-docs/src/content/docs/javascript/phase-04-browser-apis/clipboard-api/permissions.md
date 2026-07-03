---
title: Permissions
description: Security requirements for clipboard access
sidebar:
  order: 3
---

# Permissions

## Introduction

Clipboard access requires user permission and a secure context (HTTPS or localhost).

## Requirements

```javascript
// Clipboard access requires:
// - HTTPS or localhost
// - User interaction (click, keypress, touch)
// - Permission: 'clipboard-write' (auto-granted)
// - Permission: 'clipboard-read' (requires explicit grant)
```

## Checking Permission

```javascript
async function checkClipboardPermission() {
  const result = await navigator.permissions.query({
    name: 'clipboard-read'
  });
  console.log('Clipboard read permission:', result.state);
  // 'granted', 'denied', or 'prompt'
}
```

## Handling Denied Access

```javascript
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers or denied permission
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
```

## Summary

- Write permission is auto-granted (with user interaction)
- Read permission requires explicit user grant
- Fall back to `document.execCommand('copy')` for older browsers
- Always handle permission errors gracefully

## Further Reading

- [MDN: Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)
