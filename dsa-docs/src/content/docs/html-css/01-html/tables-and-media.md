---
title: "Tables & Media"
description: "HTML tables for structured data, audio/video elements for media, and iframes for embedding external content."
sidebar:
  order: 5
---

## Tables & Media

### 🤔 HTML Tables

Tables organize data into rows and columns. Think of a spreadsheet:

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>25</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>30</td>
      <td>London</td>
    </tr>
  </tbody>
</table>
```

| Tag | Meaning |
|-----|---------|
| `<table>` | The table container |
| `<thead>` | Table header section |
| `<tbody>` | Table body section |
| `<tr>` | Table row |
| `<th>` | Header cell (bold + centered) |
| `<td>` | Data cell |

> **Result:** A neat table with a header row (bold) and data rows below it.

---

### 🔗 Colspan & Rowspan

Sometimes a cell needs to span multiple columns or rows:

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th colspan="2">Contact</th> <!-- Spans 2 columns -->
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>alice@email.com</td>
      <td>+1 234 567</td>
    </tr>
  </tbody>
</table>
```

> **Result:** The "Contact" header spans both email and phone columns.

---

### 🎵 Audio

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  Your browser does not support audio.
</audio>
```

| Attribute | What it does |
|-----------|-------------|
| `controls` | Shows play/pause/volume buttons |
| `autoplay` | Starts playing automatically |
| `loop` | Repeats when finished |
| `muted` | Starts muted |

> **Result:** An audio player with play/pause, seek bar, and volume control.

---

### 🎬 Video

```html
<video controls width="640">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  Your browser does not support video.
</video>
```

| Attribute | What it does |
|-----------|-------------|
| `controls` | Shows play/pause, volume, fullscreen |
| `autoplay` | Starts playing automatically |
| `loop` | Repeats when finished |
| `muted` | Starts muted (required for autoplay) |
| `poster` | Thumbnail image before play |

> **Result:** A video player with controls — users can play, pause, seek, and go fullscreen.

---

### 🖼️ Iframes

An iframe embeds another webpage inside your page:

```html
<iframe 
  src="https://www.google.com/maps/embed?pb=..."
  width="600" 
  height="450"
  title="Map location"
  allowfullscreen>
</iframe>
```

Common uses:
- Embedding **YouTube videos**
- Embedding **Google Maps**
- Embedding **external content** (forms, widgets)

```html
<!-- YouTube video embed -->
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video"
  allowfullscreen>
</iframe>
```

> **Result:** An embedded map or video that the user can interact with inside your page.

---

### In Simple Words

- `<table>` organizes data in rows (`<tr>`) and cells (`<td>` or `<th>`)
- Use `<thead>` for headers, `<tbody>` for body data
- `<audio>` and `<video>` embed media with `controls` for play/pause
- Provide multiple `<source>` formats so the browser picks what it supports
- `<iframe>` embeds another webpage — YouTube, Maps, or external content
