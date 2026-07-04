---
title: Images & Media Lazy Loading
description: Native lazy loading and IntersectionObserver for images
sidebar:
  order: 1
---

# Images & Media Lazy Loading

## Introduction

Images are often the heaviest resources on a page. Lazy loading defers off-screen images to improve initial load time and save bandwidth.

## Native Lazy Loading

The simplest approach — use the `loading` attribute:

```html
<img src="large-photo.jpg" loading="lazy" alt="A large photo">
<iframe src="widget.html" loading="lazy"></iframe>
```

Browser support: Chrome, Firefox, Safari 16.4+, Edge.

## IntersectionObserver for Images

More control over when images load:

```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
}, {
  rootMargin: '200px', // Start loading 200px before visible
  threshold: 0.01      // Trigger when just 1% visible
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

## HTML Setup with data-src

```html
<!-- Use data-src instead of src for lazy images -->
<img
  data-src="real-image.jpg"
  src="placeholder.jpg"  <!-- small blurry placeholder or transparent gif -->
  alt="Description"
  class="lazy"
  width="800"
  height="600"
>

<!-- With srcset for responsive images -->
<img
  data-src="image-800.jpg"
  data-srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  data-sizes="(max-width: 600px) 400px, 800px"
  alt="Responsive image"
  class="lazy"
>
```

## Background Images

```css
/* Lazy load background images by applying class */
.lazy-bg {
  background-image: none;
  background-color: #f0f0f0; /* placeholder color */
}

.lazy-bg.loaded {
  background-image: url('background.jpg');
  transition: opacity 0.3s;
}
```

## Summary

- Use `loading="lazy"` for simple cases
- `IntersectionObserver` gives more control
- Use `data-src` pattern for custom implementations
- Always provide width/height to prevent layout shifts
- Consider placeholder images for better UX

## Further Reading

- [Web.dev: Lazy Loading Images](https://web.dev/articles/lazy-loading-images)
