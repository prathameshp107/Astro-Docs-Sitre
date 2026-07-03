---
title: "HTTP Caching"
description: "Cache HTTP responses for better performance."
sidebar:
  order: 4
---

## Introduction
HTTP caching reduces network requests and improves perceived performance.

## Strategies

1. **In-memory**: shareReplay(1) for same-page caching
2. **Interceptor cache**: Map<url, CachedResponse> with TTL
3. **Browser cache**: ETag/Last-Modified headers
4. **Service Worker**: PWA offline caching

## Summary
Combine multiple caching strategies for optimal performance."
