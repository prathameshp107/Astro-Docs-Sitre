---
title: Measuring Impact
description: Analyzing bundle size reductions from tree shaking and code splitting
sidebar:
  order: 3
---

# Measuring Impact

## Introduction

Measuring the actual impact of tree shaking and code splitting helps you track progress and identify further optimization opportunities.

## Bundle Analysis Tools

```bash
# Webpack Bundle Analyzer
npm install --save-dev webpack-bundle-analyzer

# Vite Bundle Visualizer
npm install --save-dev rollup-plugin-visualizer

# Source Map Explorer
npm install --save-dev source-map-explorer
```

## Webpack Configuration

```javascript
// webpack.config.js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false
    })
  ]
};
```

## Tracking Bundle Size

```javascript
// Using webpack's performance hints
module.exports = {
  performance: {
    maxAssetSize: 244000,    // 244KB
    maxEntrypointSize: 400000, // 400KB
    hints: 'warning'
  }
};

// Programmatic check
console.log(`Initial bundle: ${bundleSize / 1024}KB`);
console.log(`Lazy loaded chunk: ${chunkSize / 1024}KB`);

// Before optimization: 200KB total
// After optimization: 50KB initial + 50KB lazy = 75% reduction 🚀
```

## Key Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Initial bundle | 200KB | 50KB | 75% |
| Parse time | 800ms | 200ms | 75% |
| Time to Interactive | 3.2s | 1.5s | 53% |

## Summary

- Use `webpack-bundle-analyzer` or `rollup-plugin-visualizer`
- Track initial vs lazy chunks separately
- Monitor Time to Interactive improvements
- Aim for initial bundle < 100KB (compressed)

## Further Reading

- [Webpack: Bundle Analysis](https://webpack.js.org/guides/code-splitting/#bundle-analysis)
