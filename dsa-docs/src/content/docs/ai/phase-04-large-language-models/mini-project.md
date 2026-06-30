---
title: "Mini Project: Build a Mini ChatGPT CLI"
description: "Build a command-line chat application powered by an LLM API — apply everything you learned in Phase 4."
sidebar:
  order: 140
---

# Mini Project: Mini ChatGPT CLI

> **Build a functional command-line chat application powered by an LLM API. This project ties together everything you learned in Phase 4 — tokenization, inference, streaming, temperature, and function calling.**

---

## Overview

In this project, you'll build a **Mini ChatGPT CLI** — a terminal-based chat application that connects to an LLM API. The application will:

- Accept user input from the terminal
- Send prompts to an LLM API (OpenAI, Anthropic, or free alternatives)
- Stream responses token by token
- Support configurable temperature, top-k, and top-p
- Track conversation history within the context window
- Report token usage and timing statistics

---

## Learning Objectives

- ✅ Practice calling LLM APIs with streaming
- ✅ Understand token count and context window management
- ✅ Implement configurable decoding parameters
- ✅ Handle errors and rate limits gracefully
- ✅ Build a complete, functional application from scratch

---

## Prerequisites

| Requirement | Level |
|------------|-------|
| Node.js or Python installed | ✅ Required |
| Basic programming knowledge | ✅ Required |
| An LLM API key (free tier works) | ⭐ Required |
| Understanding of streaming (Module 4) | 🔄 Helpful |

---

## Getting an API Key

You can use any of these free/cheap options:

| Provider | Free Tier | Setup |
|----------|-----------|-------|
| **OpenAI** | $5 free credit | [platform.openai.com](https://platform.openai.com) |
| **Anthropic** | $5 free credit | [console.anthropic.com](https://console.anthropic.com) |
| **Groq** | Free tier (no credit card) | [console.groq.com](https://console.groq.com) |
| **OpenRouter** | Free tier with rate limits | [openrouter.ai](https://openrouter.ai) |

---

## Step-by-Step Instructions

### Step 1: Project Setup

Create a new directory and initialize your project:

```bash
# Using Node.js
mkdir mini-chatgpt
cd mini-chatgpt
npm init -y
npm install openai readline dotenv
```

```bash
# Using Python
mkdir mini-chatgpt
cd mini-chatgpt
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install openai python-dotenv
```

### Step 2: Environment Configuration

Create a `.env` file:

```
OPENAI_API_KEY=sk-your-api-key-here
MODEL=gpt-4o-mini
TEMPERATURE=0.7
MAX_TOKENS=1024
```

### Step 3: Basic Chat Implementation

Create `chat.js` (Node.js) or `chat.py` (Python) with:

1. **Configuration loading** — Read from environment variables
2. **API client setup** — Create an OpenAI-compatible client
3. **Message history** — Array of messages within context window
4. **Chat loop** — Read user input, send to API, stream response

Here's a starter template:

```javascript
// chat.js — Node.js
import OpenAI from 'openai';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rl = readline.createInterface({ input, output });

const messages = [
  { role: 'system', content: 'You are a helpful assistant.' }
];

console.log('\n🤖 Mini ChatGPT — Type "exit" to quit, "help" for commands\n');

while (true) {
  const userInput = await rl.question('\n👤 You: ');
  
  if (userInput.toLowerCase() === 'exit') break;
  if (userInput.toLowerCase() === 'help') {
    console.log('\nCommands: /clear, /temp <value>, /stats, /exit');
    continue;
  }
  
  messages.push({ role: 'user', content: userInput });
  
  process.stdout.write('\n🤖 Assistant: ');
  
  const stream = await openai.chat.completions.create({
    model: process.env.MODEL || 'gpt-4o-mini',
    messages,
    temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
    max_tokens: parseInt(process.env.MAX_TOKENS || '1024'),
    stream: true,
  });
  
  let fullResponse = '';
  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content || '';
    if (token) {
      fullResponse += token;
      process.stdout.write(token);
    }
  }
  
  messages.push({ role: 'assistant', content: fullResponse });
  console.log('\n');
}
```

### Step 4: Add Features

Now add these features one by one:

**Feature 1: Token Counting**
- Use `tiktoken` library to count prompt and response tokens
- Display token counts after each response

**Feature 2: Context Window Management**
- When total tokens exceed 80% of the context window, summarize old messages
- Or implement a sliding window that drops the oldest messages

**Feature 3: Temperature Control**
- Support `/temp 0.5` command to change temperature mid-session
- Display current temperature in the prompt

**Feature 4: Streaming Animation**
- Add a subtle cursor animation while waiting for the first token
- Show tokens per second (TPS) at the end of each response

**Feature 5: Error Handling**
- Handle rate limits with exponential backoff
- Handle API errors gracefully
- Handle network disconnection

**Feature 6: Conversation Persistence**
- Save conversations to a JSON file
- Add `/load <filename>` and `/save <filename>` commands
- Show saved conversations list

---

## Stretch Goals

Once you have the basic chat working, try these advanced features:

1. **Function Calling** — Add a `get_weather()` function that the model can call
2. **Multi-model** — Support switching between models with `/model gpt-4o`
3. **Markdown rendering** — Use a library to render formatted output in terminal
4. **Voice input** — Integrate with Whisper API for speech-to-text input
5. **Image analysis** — Support image uploads for multimodal models
6. **System prompt templates** — Pre-built system prompts for different roles

---

## Evaluation Criteria

| Criterion | Excellent | Good | Needs Work |
|-----------|-----------|------|------------|
| **Core chat** | Streaming, error handling, all commands | Streaming works, basic error handling | No streaming, crashes on errors |
| **Parameters** | Configurable temp/top-k/top-p | Only temperature | Hardcoded defaults |
| **Token management** | Dynamic context window, token counting | Basic truncation | No management |
| **UX** | Clear prompts, colored output, help | Basic prompts | Confusing or no output |
| **Code quality** | Modular, commented, error handling | Works but messy | Hard to follow |

---

## Submission

Once complete, you should have:

- A working CLI chat application
- Support for at least 4 of the 6 features
- Clean code with error handling
- A short README with setup instructions

---

## Next Steps

➡️ After completing this project, review the [Phase Summary](./25-phase-summary) and try the [MCQs](./mcqs) to test your knowledge.
