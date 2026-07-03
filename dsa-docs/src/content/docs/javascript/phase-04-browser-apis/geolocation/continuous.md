---
title: Continuous Location
description: Watching position changes over time
sidebar:
  order: 2
---

# Continuous Location

## Introduction

`watchPosition()` continuously monitors the user's position and calls a callback whenever the position changes.

## Watching Position

```javascript
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    console.log('Position updated:', position.coords);
    // Update map, log movement, etc.
  },
  (error) => console.error(error),
  { enableHighAccuracy: true }
);
```

## Stopping Watch

```javascript
// Stop watching position updates
navigator.geolocation.clearWatch(watchId);
console.log('Stopped watching position');
```

## Use Cases

- Real-time location tracking (maps, delivery tracking)
- Fitness apps (running routes, distance tracking)
- Geofencing (trigger actions when entering/leaving areas)

## Summary

- `watchPosition()` — continuous position updates
- Returns a watch ID for stopping updates
- `clearWatch(id)` — stop watching
- More battery-intensive than one-time requests

## Further Reading

- [MDN: Geolocation.watchPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition)
