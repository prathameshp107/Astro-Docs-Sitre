---
title: "What are Containers"
description: "A container is a lightweight, isolated unit that packages your application's code together with all its dependencies — libraries, runtime, config — into a"
sidebar:
  order: 2
---

## 2. What are Containers

### 📦 What is a Container?

A **container** is a lightweight, isolated unit that packages your application's code together with all its dependencies — libraries, runtime, config — into a single runnable object.

**Real-world analogy:** Think of a container like a **lunchbox**:
- The lunchbox has everything you need for lunch (food, fork, napkin).
- You can carry it anywhere.
- No matter where you eat — office, park, home — the lunch is the same.

A Docker container has everything an app needs to run. No matter where it runs, the behavior is identical.

---

### ⚡ Container vs Virtual Machine

This is one of the most important concepts in Docker.

| Feature | Virtual Machine | Docker Container |
|---------|----------------|-----------------|
| Size | Several GB | A few MB |
| Boot time | Minutes | Milliseconds |
| OS | Runs full OS | Shares host OS kernel |
| Isolation | Strong (hardware level) | Strong (process level) |
| Portability | Low | Very High |
| Performance | Overhead | Near-native |
| Resource usage | Heavy | Very lightweight |

---

### 🏛️ VM vs Container Architecture

```xml
<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">

  <!-- Background -->
  <rect width="760" height="400" fill="#f8f9fa" rx="12"/>
  <text x="380" y="28" text-anchor="middle" font-size="15" font-weight="bold" fill="#333">Virtual Machines vs Docker Containers</text>

  <!-- ===== VM Side ===== -->
  <text x="190" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#1565c0">Virtual Machines</text>

  <!-- Hardware -->
  <rect x="30" y="340" width="320" height="40" rx="6" fill="#b0bec5" stroke="#607d8b" stroke-width="1.5"/>
  <text x="190" y="365" text-anchor="middle" font-size="12" fill="#222">🖥️ Physical Hardware (CPU, RAM, Disk)</text>

  <!-- Host OS -->
  <rect x="30" y="295" width="320" height="38" rx="6" fill="#90caf9" stroke="#1565c0" stroke-width="1.5"/>
  <text x="190" y="319" text-anchor="middle" font-size="12" fill="#0d47a1">Host Operating System</text>

  <!-- Hypervisor -->
  <rect x="30" y="250" width="320" height="38" rx="6" fill="#ef9a9a" stroke="#c62828" stroke-width="1.5"/>
  <text x="190" y="274" text-anchor="middle" font-size="12" fill="#7f0000">Hypervisor (VMware / VirtualBox)</text>

  <!-- VM 1 -->
  <rect x="30" y="65" width="145" height="180" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="102" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">VM 1</text>
  <rect x="42" y="92" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="102" y="111" text-anchor="middle" font-size="10" fill="#333">Guest OS (Linux)</text>
  <rect x="42" y="126" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="102" y="145" text-anchor="middle" font-size="10" fill="#333">Runtime/Libs</text>
  <rect x="42" y="160" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="102" y="179" text-anchor="middle" font-size="10" fill="#333">App A</text>

  <!-- VM 2 -->
  <rect x="205" y="65" width="145" height="180" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="277" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#1565c0">VM 2</text>
  <rect x="217" y="92" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="277" y="111" text-anchor="middle" font-size="10" fill="#333">Guest OS (Windows)</text>
  <rect x="217" y="126" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="277" y="145" text-anchor="middle" font-size="10" fill="#333">Runtime/Libs</text>
  <rect x="217" y="160" width="121" height="28" rx="4" fill="#bbdefb"/>
  <text x="277" y="179" text-anchor="middle" font-size="10" fill="#333">App B</text>

  <!-- ===== Docker Side ===== -->
  <text x="570" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">Docker Containers</text>

  <!-- Hardware -->
  <rect x="410" y="340" width="320" height="40" rx="6" fill="#b0bec5" stroke="#607d8b" stroke-width="1.5"/>
  <text x="570" y="365" text-anchor="middle" font-size="12" fill="#222">🖥️ Physical Hardware (CPU, RAM, Disk)</text>

  <!-- Host OS -->
  <rect x="410" y="295" width="320" height="38" rx="6" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="570" y="319" text-anchor="middle" font-size="12" fill="#1b5e20">Host OS + Docker Engine (Shared Kernel)</text>

  <!-- Container 1 -->
  <rect x="410" y="65" width="145" height="225" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="482" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#2e7d32">Container 1</text>
  <rect x="422" y="92" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="482" y="111" text-anchor="middle" font-size="10" fill="#333">Libs only (no OS)</text>
  <rect x="422" y="126" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="482" y="145" text-anchor="middle" font-size="10" fill="#333">Runtime</text>
  <rect x="422" y="160" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="482" y="179" text-anchor="middle" font-size="10" fill="#333">App A</text>
  <text x="482" y="270" text-anchor="middle" font-size="9" fill="#555">~50MB</text>

  <!-- Container 2 -->
  <rect x="585" y="65" width="145" height="225" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="657" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#2e7d32">Container 2</text>
  <rect x="597" y="92" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="657" y="111" text-anchor="middle" font-size="10" fill="#333">Libs only (no OS)</text>
  <rect x="597" y="126" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="657" y="145" text-anchor="middle" font-size="10" fill="#333">Runtime</text>
  <rect x="597" y="160" width="121" height="28" rx="4" fill="#c8e6c9"/>
  <text x="657" y="179" text-anchor="middle" font-size="10" fill="#333">App B</text>
  <text x="657" y="270" text-anchor="middle" font-size="9" fill="#555">~50MB</text>

  <!-- Size labels -->
  <text x="102" y="260" text-anchor="middle" font-size="9" fill="#888">~2-10 GB each</text>
  <text x="277" y="260" text-anchor="middle" font-size="9" fill="#888">~2-10 GB each</text>
</svg>
```

---

### 🔄 Container Lifecycle

```
Created → Running → Paused → Stopped → Removed
```

| State | Description |
|-------|-------------|
| `Created` | Container is created but not started |
| `Running` | Container is active and processes are executing |
| `Paused` | Container processes are suspended |
| `Stopped` | Container is stopped; filesystem still exists |
| `Removed` | Container is deleted permanently |

---
