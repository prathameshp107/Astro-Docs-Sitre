---
title: "Chat Interface"
description: "Build the chat UI with message list, input, and streaming display."
---

# Chat Interface

## Introduction

The chat interface is where users interact with the AI. It needs to feel responsive, show messages as they stream in, and maintain scroll position automatically.

## Chat Page

```tsx
// app/chat/page.tsx
import ChatContainer from '@/components/chat/chat-container'

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col max-w-4xl mx-auto">
      <ChatContainer />
    </div>
  )
}
```

## Chat Container (Client)

```tsx
// components/chat/chat-container.tsx
'use client'

import { useState } from 'react'
import { readStreamValue } from 'ai/rsc'
import { continueConversation } from '@/lib/actions/chat'
import MessageList from './message-list'
import ChatInput from './chat-input'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)

  async function sendMessage() {
    if (!input.trim() || streaming) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setStreaming(true)

    const { stream } = await continueConversation(
      'new-conversation',
      input
    )

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
    }

    setMessages(prev => [...prev, assistantMessage])

    for await (const chunk of readStreamValue(stream)) {
      setMessages(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        updated[updated.length - 1] = {
          ...last,
          content: last.content + (chunk ?? ''),
        }
        return updated
      })
    }

    setStreaming(false)
  }

  return (
    <>
      <MessageList messages={messages} streaming={streaming} />
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={sendMessage}
        disabled={streaming}
      />
    </>
  )
}
```

**Key points:**
- `readStreamValue` consumes the server stream on the client
- Each chunk is appended to the last message's content
- The assistant message is created immediately with empty content
- Auto-scrolling happens naturally as the message grows

## Message List

```tsx
// components/chat/message-list.tsx
import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function MessageList({
  messages,
  streaming,
}: {
  messages: Message[]
  streaming: boolean
}) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100'
            }`}
          >
            {msg.role === 'assistant' ? (
              <ReactMarkdown
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-gray-200 rounded px-1" {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {msg.content}
              </ReactMarkdown>
            ) : (
              <p>{msg.content}</p>
            )}
          </div>
        </div>
      ))}

      {streaming && messages[messages.length - 1]?.content === '' && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg p-4">
            <span className="animate-pulse">Thinking...</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
```

## Chat Input

```tsx
// components/chat/chat-input.tsx
'use client'

import { FormEvent } from 'react'

export default function ChatInput({
  input,
  setInput,
  onSend,
  disabled,
}: {
  input: string
  setInput: (value: string) => void
  onSend: () => void
  disabled: boolean
}) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSend()
  }

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg
                     hover:bg-blue-700 disabled:opacity-50 transition"
        >
          Send
        </button>
      </div>
    </form>
  )
}
```

## Best Practices

- Show a typing indicator while waiting for the first stream chunk
- Auto-scroll to the bottom as new content arrives
- Use `useRef` for scroll management — DOM manipulation is acceptable here
- Format AI responses with Markdown for rich output

## Common Mistakes

- **Not handling empty state** — Show a welcome message when there are no messages
- **Scrolling issues** — Auto-scroll should be smooth, not jumpy
- **Missing loading indicator** — Users need feedback that the AI is responding
- **No error recovery** — Add a retry button when streaming fails

## Summary

The chat interface combines Client Components for interactivity with Server Actions for AI integration. Use `readStreamValue` to consume the stream on the client, auto-scroll for a natural chat feel, and Markdown rendering for rich AI responses.
