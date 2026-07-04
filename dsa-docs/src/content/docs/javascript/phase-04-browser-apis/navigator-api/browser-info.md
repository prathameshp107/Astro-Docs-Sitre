---
title: Browser Information
description: User agent, platform, language, and online status
sidebar:
  order: 1
---

# Browser Information

## Introduction

The `navigator` object provides information about the browser, platform, and user's language preferences.

## Key Properties

```javascript
navigator.userAgent;      // Browser user agent string
navigator.platform;       // Platform (e.g., 'Win32', 'MacIntel')
navigator.language;       // Browser language (e.g., 'en-US')
navigator.languages;      // Array of preferred languages
navigator.onLine;          // Online status (boolean)
```

## Online/Offline Detection

```javascript
// Check current status
if (navigator.onLine) {
  console.log('User is online');
} else {
  console.log('User is offline');
}

// Listen for changes
window.addEventListener('online', () => console.log('Back online'));
window.addEventListener('offline', () => console.log('Went offline'));
```

## Summary

- `navigator.userAgent` — browser identification (use with caution)
- `navigator.language` — preferred language
- `navigator.onLine` — online/offline status
- Listen for `online`/`offline` events for real-time connectivity

## Further Reading

- [MDN: Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
