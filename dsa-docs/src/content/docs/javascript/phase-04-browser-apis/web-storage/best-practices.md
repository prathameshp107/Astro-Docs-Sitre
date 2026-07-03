---
title: Best Practices
description: Tips for using Web Storage effectively
sidebar:
  order: 4
---

# Best Practices

## Introduction

Follow these best practices to use Web Storage safely and efficiently.

## Guidelines

```javascript
// Always use JSON.stringify/parse for non-string values
localStorage.setItem('user', JSON.stringify({ name: 'Alice', id: 1 }));
const user = JSON.parse(localStorage.getItem('user'));

// Handle missing keys (returns null)
const data = JSON.parse(localStorage.getItem('missing') || 'null');

// Don't store sensitive data (passwords, tokens, credit cards)
// Web Storage is accessible via JavaScript (XSS vulnerable)

// Limit frequent writes (debounce saves)
const saveSettings = debounce(() => {
  localStorage.setItem('settings', JSON.stringify(settings));
}, 500);

// Catch quota exceeded errors
try {
  localStorage.setItem('key', 'large data...');
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    console.error('Storage full — clear old data');
  }
}
```

## Summary

| Do | Don't |
|----|-------|
| Use JSON for objects | Store sensitive data |
| Handle null returns | Store large blobs/files |
| Debounce frequent writes | Assume it's available (private browsing may block) |
| Catch quota errors | Store JWTs (use httpOnly cookies) |

## Further Reading

- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
