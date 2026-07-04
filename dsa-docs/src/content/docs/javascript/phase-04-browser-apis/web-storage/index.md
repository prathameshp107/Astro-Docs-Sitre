---
title: Web Storage
description: Client-side storage with localStorage and sessionStorage
sidebar:
  order: 9
---

# Web Storage

## Introduction

**Web Storage** provides a way to store key-value pairs in the browser. `localStorage` persists across sessions; `sessionStorage` is cleared when the tab closes.

## Topics Covered

- [localStorage](./localStorage) — Persistent storage across sessions
- [sessionStorage](./sessionStorage) — Storage cleared on tab close
- [Storage Event](./storage-event) — Syncing storage changes across tabs
- [Best Practices](./best-practices) — Tips for using Web Storage effectively

## Summary

`localStorage` persists until cleared. `sessionStorage` cleared on tab close. Both use string key-value pairs (~5-10MB). `storage` event syncs across tabs.

## Further Reading

- [MDN: Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
