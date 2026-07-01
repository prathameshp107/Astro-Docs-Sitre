---
title: "08. Build an AI Meeting Assistant"
description: "Build an AI meeting assistant that transcribes meetings, generates summaries, extracts action items, and integrates with calendars."
sidebar:
  order: 8
---

## Introduction

> **Build an AI meeting assistant that joins meetings, transcribes speech in real-time, generates meeting summaries, extracts action items, and integrates with calendars and messaging platforms.**

Meeting overload is a top productivity drain. An AI meeting assistant captures every discussion, generates concise summaries, and tracks action items — so teams never miss a detail.

---

## Problem Statement

Teams spend 15+ hours/week in meetings. Notes are incomplete, action items get lost, and absent team members miss context. An AI meeting assistant should:
- Join and transcribe meetings in real-time
- Generate structured meeting summaries
- Extract action items with owners
- Integrate with calendars (Google, Outlook) and messaging (Slack)

### Business Use Case

A remote-first company with 200 employees needs an AI meeting assistant that transcribes all meetings, generates summaries for absent members, and tracks action items across teams.

---

## Requirements

### Functional Requirements

| # | Feature | Description |
|---|---------|-------------|
| FR1 | Meeting transcription | Real-time speech-to-text |
| FR2 | Speaker diarization | Identify who said what |
| FR3 | Meeting summary | Auto-generated meeting notes |
| FR4 | Action item extraction | Tasks with owners and deadlines |
| FR5 | Calendar integration | Auto-join meetings from calendar |
| FR6 | Slack integration | Post summaries to channels |
| FR7 | Search past meetings | Full-text search over transcripts |
| FR8 | Video recording | Optional recording with transcription |

### Non-Functional Requirements

| # | Requirement | Target |
|---|-------------|--------|
| NFR1 | Transcription latency | < 2s real-time delay |
| NFR2 | Accuracy | > 95% WER (word error rate) |
| NFR3 | Speaker accuracy | > 90% correct speaker identification |
| NFR4 | Processing time | Summary generated within 1 min of meeting end |
| NFR5 | Scalability | Support 100 concurrent meetings |

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js + Tailwind | Dashboard, transcript viewer |
| **Backend** | FastAPI (Python) | API server, WebSocket management |
| **Speech-to-text** | Whisper (OpenAI) / Deepgram | Real-time transcription |
| **AI** | GPT-4o / Claude | Summarization, action extraction |
| **Database** | PostgreSQL | Meeting records, transcripts |
| **Vector DB** | pgvector | Transcript search |
| **Queue** | Celery + Redis | Async processing |
| **Calendar** | Google Calendar API, Outlook API | Meeting scheduling |
| **Messaging** | Slack API, Teams API | Summary distribution |

---

## Architecture

```mermaid
flowchart TD
    subgraph INPUT["Input Sources"]
        MIC["Microphone\nBot joins meeting"]
        CAL["Calendar\nAuto-detect meetings"]
        REC["Recording\nUploaded audio/video"]
    end
    subgraph PROCESS["Processing"]
        STT["Speech-to-Text\nWhisper/Deepgram"]
        DIARIZE["Speaker Diarization\nIdentify speakers"]
        TRANSCRIBE["Live Transcript\nReal-time stream"]
    end
    subgraph AI["AI Services"]
        SUMM["Summarization\nMeeting summary"]
        ACTION["Action Items\nTask extraction"]
        HIGHLIGHTS["Key Moments\nImportant clips"]
    end
    subgraph OUTPUT["Output"]
        NOTES["Meeting Notes\nStructured summary"]
        TASKS["Action Items\nWith owners"]
        SEARCH["Searchable Archive"]
        INTEGRATE["Slack/Email\nDistribution"]
    end
    
    MIC --> STT
    CAL --> STT
    REC --> STT
    STT --> DIARIZE
    DIARIZE --> TRANSCRIBE
    TRANSCRIBE --> SUMM
    TRANSCRIBE --> ACTION
    TRANSCRIBE --> HIGHLIGHTS
    SUMM --> NOTES
    ACTION --> TASKS
    HIGHLIGHTS --> NOTES
    TRANSCRIBE --> SEARCH
    NOTES --> INTEGRATE
    
    style INPUT fill:#3b82f6,color:#fff
    style PROCESS fill:#f59e0b,color:#fff
    style AI fill:#8b5cf6,color:#fff
    style OUTPUT fill:#22c55e,color:#fff
```

---

## Meeting Lifecycle

```mermaid
sequenceDiagram
    participant Bot as Meeting Bot
    participant STT as Speech-to-Text
    participant AI as AI Service
    participant Store as Database
    participant Slack as Slack
    
    Note over Bot: Before Meeting
    Bot->>Bot: Read calendar, join meeting link
    
    Note over Bot,STT: During Meeting
    Bot->>STT: Stream audio
    STT->>STT: Real-time transcription
    STT-->>Bot: Text with speaker labels
    Bot->>Store: Store live transcript
    
    Note over AI: After Meeting
    Bot->>AI: Process full transcript
    AI->>AI: Generate summary
    AI->>AI: Extract action items
    AI->>AI: Identify key decisions
    
    AI-->>Bot: Summary + Actions + Decisions
    
    Bot->>Store: Save meeting record
    Bot->>Slack: Post summary to channel
    
    Note over Bot: Done in < 60s after meeting
```

---

## API Design

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/meetings/join` | Bot joins a meeting |
| POST | `/api/meetings/schedule` | Schedule bot for future meeting |
| GET | `/api/meetings` | List past meetings |
| GET | `/api/meetings/{id}` | Get meeting details |
| GET | `/api/meetings/{id}/transcript` | Get full transcript |
| GET | `/api/meetings/{id}/summary` | Get AI summary |
| GET | `/api/meetings/{id}/actions` | Get action items |
| GET | `/api/search?q=` | Search across meetings |
| POST | `/api/integrations/slack` | Configure Slack integration |
| POST | `/api/integrations/calendar` | Configure calendar |

---

## Deployment

```mermaid
flowchart TD
    subgraph BOT["Bot Service"]
        JOINER["Meeting Joiner\nPuppeteer/API"]
        AUDIO["Audio Stream\nWebSocket"]
    end
    subgraph PROCESSING["Processing"]
        STT_WORKERS["STT Workers\nGPU-enabled"]
        SUMMARY_WORKERS["Summary Workers"]
    end
    subgraph STORE["Storage"]
        DB["PostgreSQL"]
        S3["Audio Recordings"]
    end
    
    BOT --> PROCESSING
    PROCESSING --> STORE
    
    style BOT fill:#3b82f6,color:#fff
    style PROCESSING fill:#8b5cf6,color:#fff
    style STORE fill:#f59e0b,color:#fff
```

---

## Evaluation

| Metric | Method | Target |
|--------|--------|--------|
| Transcription accuracy | WER | < 5% |
| Speaker identification | % correct labels | > 90% |
| Summary quality | Human rating | > 4.0/5 |
| Action item recall | % of actual action items captured | > 80% |
| Processing time | Time from meeting end to summary | < 60s |

---

## Security

| Concern | Implementation |
|---------|---------------|
| **Meeting privacy** | Bot only joins meetings it's invited to |
| **Data retention** | Transcripts auto-deleted after 30/60/90 days |
| **Compliance** | GDPR — right to delete meeting data |
| **Access control** | Per-meeting access permissions |
| **Encryption** | TLS for all data, encryption at rest |

---

## Interview Questions

**Q: Design the real-time transcription pipeline for 1000+ concurrent meetings.**

> Pipeline: (1) **Audio ingestion** — WebSocket per meeting sending audio chunks to a Kafka topic, (2) **STT workers** — GPU pool running Whisper/Deepgram, each handling multiple streams, (3) **Speaker diarization** — Separate model clusters speakers, (4) **Live transcript** — Stream to frontend via WebSocket, (5) **Recording** — Save audio to S3 for post-processing.

---

## Summary

| Feature | Implementation |
|---------|---------------|
| **Transcription** | Whisper/Deepgram real-time STT |
| **Speaker ID** | Diarization model |
| **Summary** | GPT-4o post-meeting processing |
| **Action items** | LLM extraction with owner detection |
| **Calendar** | Google/Outlook API |
| **Distribution** | Slack/Teams/Email |

---

## Navigation

**Previous:** [07 — Build an AI Document Assistant](/ai/phase-10-ai-projects/07-ai-document-assistant)

**Next:** [09 — Build an AI Email Assistant](/ai/phase-10-ai-projects/09-ai-email-assistant)

**Related Projects:**
- [AI Research Agent](/ai/phase-10-ai-projects/10-ai-research-agent)
- [AI CRM Assistant](/ai/phase-10-ai-projects/12-ai-crm-assistant)
- [AI System Design](/ai/phase-10-ai-projects/13-ai-system-design)
