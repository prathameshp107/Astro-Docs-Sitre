---
title: Error Handling
description: Handling permission and location errors
sidebar:
  order: 3
---

# Error Handling

## Introduction

Geolocation requests can fail for several reasons — user denial, unavailable position, or timeout.

## Error Codes

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => { /* success */ },
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('User denied location access');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('Location unavailable');
        break;
      case error.TIMEOUT:
        console.log('Location request timed out');
        break;
    }
    console.log('Error message:', error.message);
  }
);
```

## Fallback Strategy

```javascript
function getLocationWithFallback() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ error: 'Geolocation not supported' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => {
        // Try with lower accuracy on timeout
        if (error.code === error.TIMEOUT) {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            () => resolve({ error: 'Could not get location' }),
            { enableHighAccuracy: false, timeout: 10000 }
          );
        } else {
          resolve({ error: error.message });
        }
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  });
}
```

## Summary

- Always provide an error callback for geolocation
- Handle PERMISSION_DENIED, POSITION_UNAVAILABLE, and TIMEOUT
- Consider fallback with lower accuracy on timeout
- Check for browser support before calling the API

## Further Reading

- [MDN: Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
