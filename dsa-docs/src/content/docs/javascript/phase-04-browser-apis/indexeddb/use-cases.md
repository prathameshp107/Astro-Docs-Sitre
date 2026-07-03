---
title: Use Cases
description: When to use IndexedDB
sidebar:
  order: 4
---

# Use Cases

## Introduction

IndexedDB is the most powerful client-side storage option, suited for complex data and offline scenarios.

## Common Use Cases

- **Offline-first apps**: Store data when offline, sync when online
- **PWA caching**: Cache API responses for offline access
- **Large file storage**: Store images, documents, audio
- **Client-side databases**: Full CRUD applications offline

## When to Choose IndexedDB

| Need | Best Storage |
|------|-------------|
| Small key-value data | localStorage/sessionStorage |
| Structured data with queries | IndexedDB |
| Files, blobs, binary data | IndexedDB |
| Auth tokens (auto-sent) | Cookies |
| Offline-first app | IndexedDB |

## Summary

- Use IndexedDB for large, structured, or binary data
- Essential for offline/PWA applications
- Supports indexes, transactions, and cursors for complex queries
- Much larger capacity than Web Storage (up to hundreds of MB)

## Further Reading

- [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
