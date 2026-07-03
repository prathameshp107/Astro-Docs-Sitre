---
title: One-Time Location
description: Getting the user's current position
sidebar:
  order: 1
---

# One-Time Location

## Introduction

`getCurrentPosition()` requests the user's location once. It requires user permission and works only over HTTPS.

## Basic Usage

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log('Latitude:', position.coords.latitude);
    console.log('Longitude:', position.coords.longitude);
    console.log('Accuracy:', position.coords.accuracy, 'meters');
    console.log('Altitude:', position.coords.altitude);
    console.log('Speed:', position.coords.speed);
  },
  (error) => {
    console.error('Location error:', error.message);
  },
  {
    enableHighAccuracy: true,   // Use GPS if available
    timeout: 5000,              // Max wait time
    maximumAge: 300000          // Cache location (5 min)
  }
);
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `enableHighAccuracy` | `false` | Use GPS for better accuracy |
| `timeout` | Infinity | Max time (ms) to wait for position |
| `maximumAge` | `0` | Accept cached position up to (ms) old |

## Summary

- One-time position request with `getCurrentPosition()`
- Returns latitude, longitude, accuracy, altitude, speed
- Configure with options for accuracy and timeout
- Always handle the error callback

## Further Reading

- [MDN: Geolocation.getCurrentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)
