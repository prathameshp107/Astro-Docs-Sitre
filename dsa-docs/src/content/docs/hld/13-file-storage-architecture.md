---
title: "13 — File Storage Architecture"
description: "Object, block, and file storage — S3 architecture, CDN integration, file upload patterns, and large-scale media storage design."
sidebar:
  order: 13
---

## 13 — File Storage Architecture

**File storage architecture** handles how files (images, videos, documents) are uploaded, stored, processed, and served. A well-designed storage system is scalable, cost-effective, and fast.

> **Analogy:** File storage is like a library. Object storage (S3) is the main bookshelves where books live. Block storage (EBS) is a book on your desk that you're actively editing. File storage (EFS) is a shared reading table where multiple people can access the same book.

---

### Problem Statement

Poor file storage design leads to:
- **Storage running out** — no capacity planning for growing data
- **Slow uploads/downloads** — single server bottleneck
- **Data loss** — no redundancy or backup strategy
- **High costs** — storing everything in expensive hot storage
- **CDN misses** — origin server overloaded serving files

---

### Storage Types Comparison

```mermaid
flowchart TB
    Storage["File Storage Types"] --> Object["Object Storage<br/>S3, GCS, Azure Blob<br/>Unlimited scale<br/>HTTP API access"]
    Storage --> Block["Block Storage<br/>EBS, SSD, HDD<br/>Fast, low-latency<br/>Attached to servers"]
    Storage --> File["File Storage<br/>EFS, NFS, NAS<br/>Shared access<br/>POSIX compatible"]

    Object --> ObjectUse["Use: Images, videos, backups, static assets"]
    Block --> BlockUse["Use: Database storage, OS volumes, temp files"]
    File --> FileUse["Use: Shared configs, home directories, logs"]

    style Storage fill:#7c3aed,color:#fff
    style Object fill:#3b82f6,color:#fff
    style Block fill:#f59e0b,color:#fff
    style File fill:#059669,color:#fff
```

| Feature | Object Storage (S3) | Block Storage (EBS) | File Storage (EFS) |
|---------|-------------------|---------------------|---------------------|
| **API** | HTTP (REST) | Block device (mounted) | File system (NFS) |
| **Scale** | Virtually unlimited | Limited by volume size | Up to petabytes |
| **Speed** | Moderate (ms) | Very fast (μs) | Fast (ms) |
| **Access** | From anywhere | Single server | Multiple servers |
| **Cost** | Low per GB | Higher | Medium |
| **Use case** | Static assets, backups | DB storage, app data | Shared files, logs |

---

### S3 Architecture

```mermaid
flowchart TB
    subgraph S3["Amazon S3 (Object Storage)"]
        Bucket["📦 Bucket<br/>Globally unique name"]
        Objects["📄 Objects (files)<br/>Key: path/to/file.jpg<br/>Value: binary data<br/>Metadata: content-type, size"]
        Bucket --> Objects
    end

    subgraph Access["Access Patterns"]
        HTTP["HTTP REST API<br/>PUT / GET / DELETE"]
        SDK["AWS SDK / CLI<br/>s3 cp, s3 sync"]
        CDN["CloudFront CDN<br/>Global distribution"]
    end

    Objects --> HTTP & SDK & CDN

    subgraph Security["Security"]
        BP["Bucket Policies"]
        IAM["IAM Permissions"]
        Enc["Encryption (SSE)"]
    end

    style S3 fill:#7c3aed,color:#fff
    style Access fill:#3b82f6,color:#fff
    style Security fill:#059669,color:#fff
```

---

### File Upload Architecture

```mermaid
sequenceDiagram
    participant User as User Browser
    participant App as Application
    participant S3 as S3 / Object Store
    participant CDN as CDN
    participant Worker as Processing Worker

    User->>App: Request upload URL
    App->>App: Generate presigned URL
    App-->>User: Presigned PUT URL (expires in 15 min)
    
    User->>S3: PUT directly to S3 (via presigned URL)
    S3-->>User: Upload complete ✅
    
    Note over S3: S3 event notification triggers
    
    S3->>Worker: File uploaded event
    Worker->>S3: Download file
    Worker->>Worker: Process (resize, compress, thumbnail)
    Worker->>S3: Save processed versions
    
    User->>App: Request file
    App-->>User: CDN URL
    
    User->>CDN: GET /images/photo.jpg
    CDN-->>User: Cached file (or fetch from S3)
```

---

### Storage Lifecycle

Data moves through storage tiers as it ages — **hot → warm → cold → archive**:

```mermaid
flowchart LR
    Upload["📤 Upload"] --> Hot["Hot Storage<br/>S3 Standard<br/>💰 $$$<br/>Instant access"]
    Hot -->|"30-90 days"| Warm["Warm Storage<br/>S3 Standard-IA<br/>💰 $$<br/>Instant access"]
    Warm -->|"90-365 days"| Cold["Cold Storage<br/>S3 Glacier<br/>💰 $<br/>Min. retrieval"]
    Cold -->|"> 365 days"| Archive["Archive<br/>Glacier Deep Archive<br/>💰 ¢<br/>12hr retrieval"]

    style Hot fill:#3b82f6,color:#fff
    style Warm fill:#059669,color:#fff
    style Cold fill:#f59e0b,color:#fff
    style Archive fill:#ef4444,color:#fff
```

| Tier | S3 Class | Cost/GB/mo | Retrieval | Retention |
|------|----------|-----------|-----------|-----------|
| **Hot** | Standard | $0.023 | Instant | 0-30 days |
| **Warm** | Standard-IA | $0.0125 | Instant | 30-90 days |
| **Cold** | Glacier | $0.004 | 1-5 min | 90-365 days |
| **Archive** | Deep Archive | $0.001 | 12 hours | 1+ years |

---

### CDN + Storage Integration

```mermaid
flowchart TB
    subgraph Upload["Upload Path"]
        User["User Device"] -->|Upload| UploadAPI["Upload API"]
        UploadAPI -->|Store| S3["S3 Bucket<br/>Original files"]
    end

    subgraph Process["Processing Path"]
        S3 -->|Event| Worker["Processing Worker<br/>Resize, compress, thumbnail"]
        Worker -->|Store| Processed["S3 Bucket<br/>Processed files"]
    end

    subgraph Serve["Serving Path"]
        Processed --> CDN["CloudFront CDN<br/>Edge caching"]
        CDN -->|Serve| User
    end

    style Upload fill:#3b82f6,color:#fff
    style Process fill:#7c3aed,color:#fff
    style Serve fill:#059669,color:#fff
```

---

### File Storage Design Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Direct Upload (Presigned URL)** | Client uploads directly to S3 | Scalable uploads, no server bottleneck |
| **Transcoding Pipeline** | Upload triggers processing workflow | Video/image processing |
| **CDN + Origin Shield** | CDN caches files, shield protects S3 | Global media delivery |
| **Multi-tier Storage** | Automatic lifecycle transitions | Cost optimization |
| **Versioned Storage** | Keep all file versions | Documents, collaborative editing |
| **Geo-redundant Storage** | Replicate across regions | Disaster recovery, global access |

---

### Trade-offs

| Decision | Pros | Cons |
|----------|------|------|
| **Object storage** | Scalable, cheap, global access | No POSIX, slower than block |
| **Direct upload** | No server bottleneck | More client-side complexity |
| **Server-side upload** | Full control, validation | Server bottleneck for large files |
| **All hot storage** | Fast, simple | Expensive |
| **Lifecycle policies** | Cost-optimized | Retrieval delays for old data |

---

### Scaling Strategies

| Strategy | Description |
|----------|-------------|
| **Presigned URLs** | Clients upload directly to S3 — servers don't handle file data |
| **S3 event notifications** | Trigger processing asynchronously on upload |
| **CDN with origin shield** | Reduce origin load, protect S3 from traffic storms |
| **Multipart upload** | Large files uploaded in parallel chunks |
| **Storage classes + lifecycle** | Auto-move old data to cheaper storage |
| **Replication across regions** | Disaster recovery, lower global latency |

---

### Interview Questions

1. **What's the difference between object, block, and file storage?**
2. **How does a presigned URL work and why is it useful?**
3. **How would you design a system that supports 1M file uploads per day?**
4. **How do you optimize storage costs for user-generated content?**
5. **What happens when you need to serve files to users worldwide?**

---

### Real-World Examples

| System | Storage Architecture |
|--------|---------------------|
| **Netflix** | S3 for master files, CloudFront CDN for streaming |
| **Google Drive** | Google File System (GFS) — distributed, replicated blocks |
| **Dropbox** | Custom block storage, deduplication, delta sync |
| **Instagram** | S3 for photos, CDN for serving, lifecycle to Glacier for old content |

---

### In Simple Words

- **Object storage (S3)** = store any files, any size — scalable, HTTP API, great for static assets
- **Block storage (EBS)** = fast drive attached to a server — for databases, app data
- **File storage (EFS)** = shared network drive — multiple servers access the same files
- **Presigned URLs** let clients upload directly to S3 — servers don't handle file data
- **CDN + storage** = files served globally from edge caches, origin storage protected
- Use **lifecycle policies** to move old data to cheaper storage automatically
- For video/images, use **transcoding pipelines** that process uploads asynchronously
