---
title: "useSyncExternalStore"
description: "useSyncExternalStore lets React components subscribe to external data stores (Redux, Zustand, browser APIs)."
sidebar:
  order: 15
---

# useSyncExternalStore -> "Subscribe to outside stores"

> **Simple Explanation:** 👉 Normally React manages its own state. But what if you have data outside React — like browser online status, local storage, or a third-party store? `useSyncExternalStore` is the official React way to subscribe to external data and keep it in sync with your components.

## Built for Libraries (You'll Rarely Use It Directly)

Most of the time, you won't call `useSyncExternalStore` yourself — **Redux, Zustand, and other state libraries use it internally** to connect their stores to React.

But if you're building a custom store or subscribing to browser APIs, here's how it works:

## Example — Online Status

```jsx
import { useSyncExternalStore } from 'react';

function subscribeToOnline(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}

function OnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribeToOnline, // Subscribe function (returns cleanup)
    getOnlineSnapshot, // Get current value on the client
    () => true          // Get snapshot on the server (SSR fallback)
  );

  return (
    <p>
      Status: <span style={{ color: isOnline ? 'green' : 'red' }}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </span>
    </p>
  );
}
```

## Example — Reading from LocalStorage

```jsx
function useLocalStorage(key) {
  const value = useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    },
    () => localStorage.getItem(key),
    () => null // SSR fallback
  );

  return value;
}
```

## In Simple Words 🧠

- `useSyncExternalStore` lets React components subscribe to **external data sources**
- Takes 3 arguments: `subscribe`, `getSnapshot`, and `getServerSnapshot` (for SSR)
- **You'll almost never use it directly** — it's a building block for state management libraries
- Redux, Zustand, and Jotai all use it under the hood
- Ensures **tear-free** reads — you never see inconsistent data during concurrent rendering
