---
title: "Case Study 7 — Design Google Drive"
description: "HLD case study: Design a file storage and sync service like Google Drive — file sync, versioning, conflict resolution, and real-time collaboration."
sidebar:
  order: 7
---

## Case Study 7 — Design Google Drive

**Problem:** Design a cloud file storage and synchronization service like Google Drive or Dropbox — upload, sync, share, versioning, and real-time collaboration.

---

### Requirements

| Type | Requirement |
|------|-------------|
| **Functional** | Upload/download files, folder organization, sync across devices, file versioning, sharing with permissions, real-time collaboration (docs) |
| **Non-Functional** | < 2s sync delay, 99.99% durability, 1B+ users, support any file type/size, delta sync for large files |

---

### Architecture Overview

```mermaid
flowchart TB
    subgraph Clients["Clients"]
        Desktop["💻 Desktop App<br/>Sync client"]
        Mobile["📱 Mobile App"]
        Web["🌐 Web App"]
    end

    subgraph Services["Services"]
        Sync["Sync Service"]
        Meta["Metadata Service"]
        Version["Version Manager"]
        Share["Sharing Service"]
        Collab["Real-Time Collab<br/>(CRDT / OT)"]
    end

    subgraph Storage["Storage Layer"]
        Blob["Blob Store (S3/GCS)<br/>File chunks"]
        PG["PostgreSQL<br/>Metadata, users, permissions"]
        Redis["Redis<br/>Locks, sync state"]
        CRDT["CRDT Store<br/>Collab state"]
    end

    Clients --> Sync & Meta & Version & Share & Collab
    Sync --> Blob
    Meta --> PG
    Sync --> Version --> Blob
    Version --> PG
    Share --> PG
    Collab --> CRDT

    style Clients fill:#3b82f6,color:#fff
    style Services fill:#7c3aed,color:#fff
    style Storage fill:#059669,color:#fff
```

---

### File Sync Flow

```mermaid
sequenceDiagram
    participant User as User
    participant Client as Client App
    participant Sync as Sync Service
    participant Blob as Blob Store
    participant Meta as Metadata DB

    User->>Client: Save file.docx
    Client->>Client: Split into chunks (4MB each)
    Client->>Client: Compute chunk hashes (SHA-256)
    Client->>Sync: Sync request with chunk hashes
    Sync->>Meta: Check which chunks already exist
    Meta-->>Sync: Chunks 1, 3 already stored (dedup)
    
    Note over Client,Blob: Only upload unique chunks (chunk 2)
    Client->>Blob: Upload new chunk 2
    Blob-->>Client: Upload complete ✅
    
    Sync->>Meta: Update file version (v2)
    Sync-->>Client: Sync complete (version: 2)
    Sync->>Version: Record version for history
    
    Note over Client,Meta: Delta sync → only changed chunks uploaded
```

---

### Key Design Decisions

| Decision | Approach | Why |
|----------|----------|-----|
| **File chunking** | Split files into 4MB chunks | Efficient delta sync, dedup at chunk level |
| **Deduplication** | Content-addressed storage (hash as key) | Same file across users/chunks → stored once |
| **Delta sync** | Only upload changed chunks | Huge bandwidth savings for large files |
| **Versioning** | Immutable file versions | Full history, easy rollback |
| **Conflict resolution** | LWW (Last Writer Wins) + manual merge | Two users edit same file simultaneously |

---

### In Simple Words

- Files split into **4MB chunks** — only changed chunks are synced
- **Content-addressed storage** — chunk hash = chunk key (dedup across users)
- **Delta sync** saves bandwidth — editing 1 page of a 100-page doc only uploads the changed chunk
- **Version history** stores immutable snapshots — you can roll back to any version
- **Conflict resolution** = Last Writer Wins for simple conflicts, manual merge for complex ones
- **Real-time collaboration** uses CRDTs (Conflict-Free Replicated Data Types) for Google Docs
- **Encryption** at rest and in transit — files encrypted with user's key
