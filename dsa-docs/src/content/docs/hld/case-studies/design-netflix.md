---
title: "Case Study 3 — Design Netflix"
description: "HLD case study: Design a video streaming platform like Netflix — CDN, transcoding, recommendation engine, and global distribution."
sidebar:
  order: 3
---

## Case Study 3 — Design Netflix

**Problem:** Design a video streaming service like Netflix supporting 250M+ subscribers, streaming movies/TV shows globally with adaptive bitrate, personalization, and high availability.

---

### Requirements

| Type | Requirement |
|------|-------------|
| **Functional** | Browse catalog, search, play video (adaptive quality), resume from last position, personalized recommendations |
| **Non-Functional** | < 2s startup time, 99.99% availability, 250M+ users, global distribution, 100+ Tbps peak bandwidth |

---

### Architecture Overview

```mermaid
flowchart TB
    subgraph Client["Client Devices"]
        Web["Web Browser"]
        SmartTV["Smart TV"]
        Mobile["Mobile App"]
    end

    CDN["Open Connect CDN<br/>Custom appliances in ISP"]

    subgraph AWS["AWS Cloud"]
        CF["CloudFront CDN"]
        API["API Gateway"]
        Services["Microservices<br/>User, Catalog, Playback,<br/>Recommendation"]
        DB["AWS + Cassandra<br/>S3 for master files"]
        Pipeline["Transcoding Pipeline"]
    end

    Client --> CDN
    Client --> CF
    CF --> API --> Services --> DB
    DB --> Pipeline --> CDN

    style Client fill:#f59e0b,color:#fff
    style CDN fill:#7c3aed,color:#fff
    style AWS fill:#3b82f6,color:#fff
    style Pipeline fill:#059669,color:#fff
```

---

### Video Upload & Transcoding Flow

```mermaid
sequenceDiagram
    participant Studio as Content Studio
    participant S3 as S3 (Master Files)
    participant Pipeline as Transcoding Pipeline
    participant CDN as Open Connect CDN

    Studio->>S3: Upload master file (large, 4K)
    Note over S3: Master file stored in S3
    S3->>Pipeline: Trigger transcoding
    
    par Transcode to formats
        Pipeline->>Pipeline: 4K → 2160p (HDR/SDR)
        Pipeline->>Pipeline: 1080p (various bitrates)
        Pipeline->>Pipeline: 720p, 480p, 360p (lower)
        Pipeline->>Pipeline: Audio tracks (5.1, stereo)
        Pipeline->>Pipeline: Subtitles (VTT)
    end
    
    Pipeline->>Pipeline: Package into segments<br/>(3-5 second chunks)
    Pipeline->>CDN: Push to Open Connect appliances
    Note over CDN: Distributed to ISPs worldwide
```

---

### Key Design Decisions

**1. Open Connect CDN**

Netflix's custom CDN — dedicated caching appliances deployed inside ISP data centers. This handles > 95% of traffic, reducing AWS bandwidth costs dramatically.

**2. Adaptive Bitrate Streaming**

| Quality | Resolution | Bitrate | When Used |
|---------|-----------|---------|-----------|
| **4K UHD** | 3840×2160 | 15-25 Mbps | Fast connection, big screen |
| **1080p** | 1920×1080 | 5-8 Mbps | Standard HD |
| **720p** | 1280×720 | 2-4 Mbps | Medium connection |
| **480p** | 854×480 | 1-2 Mbps | Mobile, slow connection |
| **360p** | 640×360 | 400-800 kbps | Poor connection |

Client requests video in chunks (~3-5 seconds). Each chunk can be at a different quality level — the player switches automatically based on network conditions.

**3. Recommendation Engine**

| Component | Technology |
|-----------|------------|
| **Collaborative filtering** | Matrix factorization (user-item) |
| **Content-based filtering** | Tag/feature similarity |
| **Deep learning** | Neural networks for feature extraction |
| **A/B testing** | Online experimentation platform |

---

### Scaling & Trade-offs

| Aspect | Approach | Trade-off |
|--------|----------|-----------|
| **CDN** | Custom Open Connect appliances | Capital expenditure, ISP partnerships |
| **Microservices** | 700+ microservices | Coordination, deployment complexity |
| **Data storage** | Cassandra for viewing history, S3 for masters | Multi-region data sync |
| **Chaos engineering** | Simian Army (Chaos Monkey) | Accepts that failures will happen |

---

### In Simple Words

- **CDN** is everything — Netflix built its own (Open Connect) to serve 95%+ of traffic
- **Adaptive bitrate** = video split into 3-second chunks at multiple qualities, client chooses per chunk
- **Transcoding pipeline** converts one master file into hundreds of format/quality/audio combinations
- **Recommendation** drives 80%+ of content discovery — it's the core of the product
- **Microservices** architecture with 700+ services managed via chaos engineering
- Global users get content from **local ISP caches** — not from a central server
