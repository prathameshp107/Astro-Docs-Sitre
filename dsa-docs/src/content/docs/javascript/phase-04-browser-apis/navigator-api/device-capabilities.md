---
title: Device Capabilities
description: Media devices, storage, and connection info
sidebar:
  order: 2
---

# Device Capabilities

## Introduction

The `navigator` object provides access to device features like cameras, storage, and network information.

## Media Devices

```javascript
navigator.cookieEnabled;  // Are cookies enabled?

// Access camera/microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    videoElement.srcObject = stream;
  })
  .catch(err => console.error('Camera access denied:', err));
```

## Storage and Connection

```javascript
// Storage estimates
const storage = await navigator.storage.estimate();
console.log('Used:', storage.usage, 'Quota:', storage.quota);

// Connection info (Chrome only)
const connection = navigator.connection;
if (connection) {
  console.log('Connection type:', connection.effectiveType); // '4g', '3g', etc.
  console.log('Round-trip time:', connection.rtt, 'ms');

  connection.addEventListener('change', () => {
    console.log('Connection changed to:', connection.effectiveType);
  });
}
```

## Summary

- `navigator.mediaDevices.getUserMedia()` — camera/microphone access
- `navigator.storage.estimate()` — storage quota information
- `navigator.connection` — network type and speed
- Always handle permission denials gracefully

## Further Reading

- [MDN: Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
