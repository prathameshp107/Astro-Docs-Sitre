---
title: "Case Study 4 — Design YouTube"
description: "HLD case study: Design YouTube — video upload, transcoding, global distribution, search, and recommendation."
sidebar:
  order: 4
---

## Case Study 4 — Design YouTube

**Problem:** Design a video-sharing platform like YouTube supporting 2B+ users, 500+ hours of video uploaded per minute, and global streaming with search and recommendations.

---

### Requirements

| Type | Requirement |
|------|-------------|
| **Functional** | Upload video, transcode, stream, search, comment, like/dislike, subscribe, channel, playlists |
| **Non-Functional** | < 2s playback startup, 99.99% availability, 500+ hours/min upload, 1B+ hours watched daily |

---

### Capacity Estimation

| Metric | Value |
|--------|-------|
| **Monthly active users** | 2B+ |
| **Video upload per minute** | 500+ hours |
| **Total video catalog** | 1B+ videos |
| **Daily watch time** | 1B+ hours |
| **Storage per day** | 500 hr/min × 60 × 24 = 720K hours/day × ~500 MB/hour (compressed) |

---

### Architecture Overview

```mermaid
flowchart TB
    subgraph Upload["Upload Path"]
        UserUpload["📤 User Upload"]
        UploadSrv["Upload Service"]
        S3["S3 / Blob Store<br/>Master files"]
    end

    subgraph Process["Processing Path"]
        Queue["Processing Queue"]
        Transcoder["Transcoder Farm"]
        Thumbnail["Thumbnail Generator"]
        QA["Quality Analysis"]
    end

    subgraph Serve["Serving Path"]
        CDN["Google Global Cache CDN"]
        Edge["Edge Servers"]
        API["API Servers"]
    end

    subgraph Storage["Storage"]
        BigTable["BigTable<br/>Video metadata"]
        Index["Search Index<br/>Elasticsearch"]
        Cache["Cache Layer<br/>Popular videos"]
    end

    UserUpload --> UploadSrv --> S3
    S3 --> Queue --> Transcoder
    Transcoder --> CDN
    API --> Cache --> BigTable
    API --> Index

    style Upload fill:#3b82f6,color:#fff
    style Process fill:#7c3aed,color:#fff
    style Serve fill:#059669,color:#fff
    style Storage fill:#f59e0b,color:#fff
```

---

### Key Design Decisions

**1. Upload Service**

```mermaid
sequenceDiagram
    participant User as YouTuber
    participant UpSrv as Upload Service
    participant S3 as Blob Store
    participant Queue as Processing Queue

    User->>UpSrv: Start upload (resumable)
    UpSrv->>UpSrv: Assign video ID
    UpSrv->>S3: Store in chunks
    S3-->>UpSrv: Chunk saved
    UpSrv-->>User: ✅ Chunk received
    
    Note over User,S3: Resumable upload — can pause/resume
    
    User->>UpSrv: Finalize upload
    UpSrv->>S3: Assemble chunks → single file
    UpSrv->>Queue: New video ready for processing
    UpSrv-->>User: 201 Created (processing in background)
```

**2. Transcoding Pipeline**

| Step | Purpose |
|------|---------|
| **Demux** | Split video, audio, subtitles from container |
| **Decode** | Decode video to raw frames |
| **Transcode** | Encode to H.264, VP9, AV1 at various resolutions |
| **Thumbnails** | Extract thumbnails at key points |
| **Quality analysis** | Check for issues (blurry, audio sync) |
| **Package** | Segment into DASH/HLS chunks |

---

### Comparison: YouTube vs Netflix

| Aspect | YouTube | Netflix |
|--------|---------|---------|
| **Content** | User-generated | Professional (studio) |
| **Upload volume** | 500 hr/min | New titles weekly |
| **Processing** | Must process instantly | Can batch process |
| **Recommendation** | Based on watch history + trends | Based on viewing history + ratings |
| **Monetization** | Ads + Premium + Memberships | Subscription only |

---

### Scaling & Trade-offs

| Aspect | Approach | Trade-off |
|--------|----------|-----------|
| **Video processing** | Async (enqueue, process, notify) | Delay from upload to publish |
| **CDN** | Google Global Cache | Massive infrastructure cost |
| **Search** | Elasticsearch + custom ranking | Complex indexing pipeline |
| **Comments** | Separate service, paginated | Hard to moderate at scale |

---

### In Simple Words

- **Upload** = resumable chunked uploads to blob store, then async processing
- **Transcoding** = convert to multiple formats/resolutions (H.264, VP9, AV1)
- **CDN** = Google's global cache network — videos served from nearest edge
- **Search** = Elasticsearch with custom ranking signals (views, engagement, freshness)
- **Recommendation** = deep neural network trained on watch history
- **Comments** = separate service with pagination and moderation pipeline
- **Ad insertion** = server-side ad insertion during streaming (can't be skipped)
