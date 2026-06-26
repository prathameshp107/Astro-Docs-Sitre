---
title: "Case Study 6 — Design Instagram"
description: "HLD case study: Design Instagram — feed generation, media storage, social graph, stories, and engagement features."
sidebar:
  order: 6
---

## Case Study 6 — Design Instagram

**Problem:** Design a photo/video sharing social network like Instagram supporting 1B+ users with feed, stories, explore, reels, and direct messaging.

---

### Requirements

| Type | Requirement |
|------|-------------|
| **Functional** | Upload media, feed (chronological + algorithmic), stories (24h), explore/search, likes/comments, follow, reels |
| **Non-Functional** | < 200ms feed load, 99.9%+ availability, 1B+ users, 100M+ daily uploads |

---

### Architecture Overview

```mermaid
flowchart TB
    subgraph Client["Clients"]
        Mobile["📱 Mobile App"]
        Web["Web App"]
    end

    subgraph Services["Services"]
        Feed["Feed Service<br/>Fanout / generation"]
        Media["Media Service<br/>Upload + resize"]
        Social["Social Graph<br/>Follow, friends"]
        Story["Story Service<br/>24h expiry"]
        Explore["Explore/Search<br/>Discovery"]
    end

    subgraph Storage["Storage & Data"]
        S3["S3 / GCS<br/>Photos + Videos"]
        Redis["Redis<br/>Feed cache, sessions"]
        PG["PostgreSQL<br/>Users, metadata"]
        Cassandra["Cassandra<br/>Feed, activity"]
        ES["Elasticsearch<br/>Explore, search"]
    end

    Client --> Feed & Media & Social & Story & Explore
    Media --> S3
    Feed --> Redis & Cassandra
    Social --> PG
    Story --> Redis & S3
    Explore --> ES

    style Client fill:#f59e0b,color:#fff
    style Services fill:#7c3aed,color:#fff
    style Storage fill:#3b82f6,color:#fff
```

---

### Feed Generation — Fanout on Write

```mermaid
flowchart TB
    subgraph Fanout["Fanout on Write (Celebrity)"]
        UserCeleb["Celebrity User<br/>100M followers"] --> FeedCeleb["Don't fanout<br/>Store in celebrity's timeline<br/>Pull on read"]
        Followers["Followers"] --> Pull["Read: Merge<br/>celebrity timeline<br/>+ user feed cache"]
    end

    subgraph Fanout2["Fanout on Write (Normal)"]
        UserNormal["Normal User<br/>1,000 followers"] --> FanoutNormal["Fanout to all followers'<br/>feed caches<br/>(Redis lists)"]
        FanoutNormal --> Followers2["Each follower sees<br/>post immediately"]
    end

    style Fanout fill:#3b82f6,color:#fff
    style Fanout2 fill:#059669,color:#fff
```

| Approach | Used For | How It Works |
|----------|----------|-------------|
| **Fanout on write** | Normal users (< 10K followers) | Push post to all followers' feed caches immediately |
| **Fanout on read** | Celebrities (> 10K followers) | Store in timeline, pull + merge on read |

---

### Key Design Decisions

**1. Feed Generation**

Instagram uses a **hybrid approach**:
- Regular users: fanout on write (push to ~1K followers' feed caches)
- Celebrities: fanout on read (pull from timeline when follower loads feed)

**2. Media Processing Pipeline**

Upload → Resize (multiple resolutions) → Apply filters → Store in CDN → Done.

**3. Stories (Ephemeral Content)**

Stories expire after 24 hours. Stored as individual frames, compiled on client side. Viewed in order, auto-advance.

---

### In Simple Words

- **Feed** uses hybrid fanout — push for regular users, pull for celebrities
- **Media** stored in blob storage, served via CDN
- **Social graph** (follows) is a directed graph in PostgreSQL
- **Stories** = temporary content (24h TTL), viewed as slideshow
- **Explore/Search** uses Elasticsearch for content discovery
- **Reels** = short-form video, similar to TikTok — heavy on recommendation ML
