---
title: "Deployment"
description: "Deploy your AI chat application with streaming support."
---

# Deployment

## Introduction

Deploying an AI application requires the same steps as other Next.js apps, plus configuration for streaming support and API keys.

## Environment Variables

```
OPENAI_API_KEY=sk-your-key-here
DATABASE_URL=your_production_db_url
```

Get your OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys).

## Streaming on Vercel

Vercel supports streaming responses out of the box. No additional configuration is needed for the AI SDK. The Server Action streaming pattern works automatically.

## Rate Limiting

Consider adding rate limiting to prevent abuse:

```ts
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '10 m'),
})

export async function checkRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier)
  if (!success) {
    throw new Error('Rate limit exceeded')
  }
}
```

## Deployment Checklist

- [ ] AI API key is configured as an environment variable
- [ ] Streaming works in production
- [ ] Error handling shows user-friendly messages
- [ ] Rate limiting is configured
- [ ] Messages are persisted to the database
- [ ] Abort/cancel functionality works
- [ ] Build passes with no TypeScript errors

## Summary

Deploying an AI app is similar to any Next.js app. The key difference is configuring the AI API key and ensuring streaming works in production. Add rate limiting to protect your API usage.
