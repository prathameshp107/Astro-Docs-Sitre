---
title: "useOptimistic (React 19)"
description: "useOptimistic lets you show the result of an action immediately — before the server confirms — then correct if needed."
sidebar:
  order: 2
---

# useOptimistic

## Simple Words First 🟡

> **Analogy:** 👉 When you "like" a post on social media, the heart turns red instantly — you don't wait for the server. If the server fails, it reverts. That's **optimistic UI** — assuming success and showing the result right away. `useOptimistic` is React's built-in way to do this.

## Example — Optimistic Like Button

```jsx
import { useOptimistic, useRef } from 'react';

function LikeButton({ initialLikes }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes, // Current value
    (state, newLikeCount) => state + 1 // How to optimistically update
  );
  const formRef = useRef(null);

  async function submitLike(formData) {
    // 1️⃣ Immediately show the optimisic update
    addOptimisticLike();
    // 2️⃣ Send the real request
    const result = await fetch('/api/likes', {
      method: 'POST',
      body: formData,
    });
    // 3️⃣ If it fails, useOptimistic reverts automatically
    if (!result.ok) throw new Error('Failed to like');
  }

  return (
    <form action={submitLike} ref={formRef}>
      <button type="submit">❤️ {optimisticLikes} likes</button>
    </form>
  );
}
```

## Example — Optimistic Message List

```jsx
function ChatRoom({ messages, sendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, {
      id: Date.now(),
      text: newMessage,
      sending: true, // Show a "sending" state
    }]
  );

  async function formAction(formData) {
    const text = formData.get('message');
    addOptimisticMessage(text); // Show instantly
    await sendMessage(text);    // Real save
  }

  return (
    <div>
      <form action={formAction}>
        <input name="message" required />
        <button type="submit">Send</button>
      </form>
      <ul>
        {optimisticMessages.map(msg => (
          <li key={msg.id} className={msg.sending ? 'sending' : ''}>
            {msg.text}
            {msg.sending && <span> ⏳ sending...</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## In Simple Words 🧠

- `useOptimistic(state, updateFn)` shows **instant feedback** before the server responds
- The `updateFn` defines how to optimistically update the state
- If the actual action **fails**, the state **automatically reverts** to the real value
- Perfect for: likes, sends, adds, deletes — anything where speed feels better than accuracy
- Use with `<form action>` or standalone with Actions for maximum effect
