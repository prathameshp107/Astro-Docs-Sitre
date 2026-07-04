---
title: "Task Management System"
description: "Design and implement a task management system with real-time updates, queues, and event-driven architecture."
sidebar:
  order: 4
---

# Task Management System

## 📖 Introduction

A task management system (like Trello, Asana, or Jira) manages projects, tasks, and workflows. It requires: CRUD operations, real-time updates when tasks change, drag-and-drop reordering, role-based permissions, and audit trails.

## 🤔 Why Do We Need This?

Task management combines many challenging patterns:
- **Real-time collaboration** — Multiple users see changes instantly
- **Optimistic updates** — UI updates before server confirms
- **Position management** — Ordering items with drag-and-drop
- **Event sourcing** — Full audit trail of all changes

## 💻 Coding Challenge 1: Task Board API

Build a REST API for a task board:
- Boards have lists, lists have cards
- `POST /boards`, `POST /lists`, `POST /cards`
- `PUT /cards/:id/move` — move card between lists
- `GET /boards/:id` — returns boards with nested lists and cards
- Position field determines ordering within a list

## 💻 Coding Challenge 2: Real-Time Collaboration

Add WebSocket real-time updates:
- When a card is moved, all board viewers see the update instantly
- Typing indicators when someone is editing a card title
- Track who is viewing each board (presence)
- Handle concurrent edits with last-write-wins or OT

## 💻 Coding Challenge 3: Audit Trail

Add event sourcing for full audit history:
- Every action stores an event: `CARD_CREATED`, `CARD_MOVED`, `CARD_ARCHIVED`
- `/boards/:id/activity` — shows chronological event feed
- Support undo: revert last N actions
- Show "User X moved card Y from 'To Do' to 'In Progress'"

## 📖 Summary

| Feature | Technology | Approach |
|---------|------------|----------|
| REST API | Express | CRUD for boards, lists, cards |
| Real-time | Socket.IO | Live updates on changes |
| Ordering | Position field | Float between adjacent items |
| Audit | Event store | Append-only event log |
| Presence | Redis | Track online users per board |

## 📝 MCQs

**1. How is card ordering typically implemented in a drag-and-drop task board?**
- A) Array index
- B) Position field (float between adjacent items) ✅
- C) Random ordering
- D) Alphabetically by title

**2. What pattern provides a full audit trail in a task management system?**
- A) CRUD
- B) Event Sourcing ✅
- C) Caching
- D) Database triggers

**3. How are real-time updates typically delivered to all viewers of a board?**
- A) HTTP polling
- B) WebSocket broadcasting to room members ✅
- C) Server-Sent Events per user
- D) Email notifications

**4. What problem does optimistic UI updates solve in collaborative systems?**
- A) Network reliability
- B) Perceived latency — UI updates before server confirms ✅
- C) Database performance
- D) Authentication

**5. How would you track which users are currently viewing a board?**
- A) Database table
- B) Redis set with heartbeat timeout ✅
- C) Socket.IO rooms
- D) File system

**Answer Key:** 1-B, 2-B, 3-B, 4-B, 5-B

## 🔗 Related Topics

- [WebSockets](../web/websockets-realtime) — Real-time updates
- [Event Sourcing](../advanced/event-sourcing) — Audit trail
- [Databases](../data/databases) — Data modeling
