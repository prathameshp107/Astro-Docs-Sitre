---
title: "AI Integration"
description: "Integrate AI APIs using the Vercel AI SDK with streaming responses."
---

# AI Integration

## Introduction

The Vercel AI SDK simplifies integrating AI models into Next.js. It handles streaming, error handling, and type safety so you can focus on the user experience.

## Setup

```bash
npm install ai @ai-sdk/openai
```

## Environment Variables

```bash
# .env.local
OPENAI_API_KEY=sk-your-key-here
```

## Chat Server Action

```ts
// lib/actions/chat.ts
'use server'

import { openai } from '@ai-sdk/openai'
import { generateText, streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { db } from '@/lib/db'

export async function continueConversation(
  conversationId: string,
  userMessage: string
) {
  const stream = createStreamableValue()

  ;(async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o-mini'),
      prompt: userMessage,
    })

    let fullResponse = ''

    for await (const delta of textStream) {
      fullResponse += delta
      stream.update(delta)
    }

    stream.done()

    // Save messages to database
    await db.message.createMany({
      data: [
        {
          conversationId,
          role: 'user',
          content: userMessage,
        },
        {
          conversationId,
          role: 'assistant',
          content: fullResponse,
        },
      ],
    })
  })()

  return { stream: stream.value }
}
```

**Key points:**
- `streamText` from the AI SDK returns an async iterable of text chunks
- `createStreamableValue` creates a client-consumable stream
- The stream is consumed in a background async function so it doesn't block
- Messages are saved to the database after streaming completes

## Simple Text Generation

For non-streaming responses (e.g., generating summaries):

```ts
export async function generateSummary(text: string) {
  const { text: summary } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: `Summarize this in 3 sentences: ${text}`,
  })

  return summary
}
```

## Best Practices

- Use `gpt-4o-mini` for chat — it's fast and cost-effective
- Handle API errors gracefully with retry logic
- Store messages for conversation context
- Never expose your API key to the client
- Use environment variables for model configuration

## Common Mistakes

- **Blocking the response** — Always use streaming for chat interfaces
- **Not saving messages** — Without persistence, users lose their conversation on refresh
- **Exposing the API key** — Server Actions run on the server, keeping keys safe
- **No error handling** — AI APIs can fail — show a retry button

## Summary

The Vercel AI SDK makes AI integration straightforward. Use `streamText` for streaming chat responses and `generateText` for one-off completions. Always save messages to a database for conversation history.
