---
title: "08. Document Ingestion Pipeline"
description: "What happens after you upload a document — extracting text, cleaning, chunking, embedding, and storing in a vector database."
sidebar:
  order: 8
---

## Introduction

> **The ingestion pipeline is the process that converts raw documents into searchable vectors. Every time you upload a PDF to ChatGPT, a document goes through this pipeline before you can ask questions about it.**

Ingestion happens *before* anyone asks a question. It's the "indexing" phase — preparing your knowledge base so that retrieval is fast and accurate when queries arrive.

---

## Why This Concept Exists

### The Story

You upload a 50-page PDF to ChatGPT. What happens inside?

You click "upload." A few seconds later, you can ask questions. But between those two moments, an entire pipeline runs — extracting text from the PDF, splitting it into chunks, converting each chunk to an embedding vector, and storing everything in a vector database.

If you understand this pipeline, you understand how every RAG system works.

```mermaid
flowchart TD
    subgraph INGESTION["📤 Ingestion Pipeline"]
        RAW["Raw Document\n(PDF, Word, Website)"] --> EXTRACT["📄 Extract Text\n(parse format)"]
        EXTRACT --> CLEAN["🧹 Clean Text\n(remove artifacts)"]
        CLEAN --> CHUNK["✂️ Chunk\n(split into pieces)"]
        CHUNK --> EMBED["🔢 Embed\n(text → vector)"]
        EMBED --> STORE["💾 Store in\nVector Database"]
    end

    subgraph QUERY["💬 Query Pipeline"]
        QUESTION["User Question"] --> Q_EMBED["Embed question"]
        Q_EMBED --> SEARCH["Search index"]
        SEARCH --> ANSWER["LLM answers"]
    end

    STORE -.-> SEARCH

    style INGESTION fill:#3b82f6,color:#fff
    style QUERY fill:#22c55e,color:#fff
```

---

## Real-World Analogy

### The Library Cataloging System

When a library receives a new book, it doesn't just throw it on a shelf. It goes through a process:

1. **Catalog the book** — register its title, author, ISBN (like extracting text from PDF)
2. **Clean the record** — fix typos, standardize formatting (like cleaning text)
3. **Create index cards** — write summary cards for each chapter (like chunking)
4. **File the cards** — organize in the card catalog by topic (like embedding and storing)

When you later ask a librarian a question, they go to the card catalog, find the relevant cards, and retrieve the books. The cataloging happened *before* you asked.

**That's the ingestion pipeline.**

---

## Step-by-Step Pipeline

### Step 1: Extract Text

Documents come in many formats. Each needs a different extraction method:

| Format | Extraction Method | Example Tools |
|--------|------------------|---------------|
| **PDF** | Parse pages, extract text + metadata | PyMuPDF, pdfplumber, Unstructured |
| **Word (.docx)** | Read XML-based document structure | python-docx |
| **PowerPoint** | Extract text from slides | python-pptx |
| **Excel** | Read cell values | openpyxl |
| **Website** | Crawl and scrape content | BeautifulSoup, Trafilatura |
| **Markdown** | Read raw markdown | Built-in parsers |
| **GitHub Repo** | Clone and read source files | GitPython |
| **Database** | Run SQL queries | SQL connectors |
| **Email** | Parse .eml or .msg files | extract_msg |

```mermaid
flowchart LR
    subgraph INPUTS["Document Sources"]
        PDF["📕 PDF"]
        DOCX["📘 Word"]
        PPT["📙 PowerPoint"]
        HTML["🌐 Website"]
        MD["📝 Markdown"]
        DB["🗄️ Database"]
    end

    INPUTS --> PARSER["📋 Universal Parser\n(extract text + metadata)"]
    PARSER --> CLEAN_TEXT["Clean Text"]

    style INPUTS fill:#3b82f6,color:#fff
    style PARSER fill:#8b5cf6,color:#fff
```

### Step 2: Clean Text

Raw extracted text often contains artifacts that hurt retrieval quality:

- **Headers and footers** — "Page 23 of 150" repeated on every chunk
- **Navigation menus** — "Home | Products | About Us" from web scraping
- **Special characters** — broken Unicode, emojis, non-printable characters
- **Extra whitespace** — double spaces, line breaks in the middle of sentences
- **OCR errors** — especially in scanned PDFs ("c1ear" instead of "clear")

**Cleaning transforms:**
```
"Page 23 of 150\n\nHome | Products | About Us\n\nThe Eiffel Tower was\ncompleted in 1889..."
```

Into:
```
"The Eiffel Tower was completed in 1889..."
```

### Step 3: Chunk

#### Document Processing States

```mermaid
flowchart TD
    subgraph STATES["Document Lifecycle During Ingestion"]
        S0["📄 Raw Document
(uploaded by user)"] --> S1["📋 Extracted
(text extracted)"]
        S1 --> S2["🧹 Cleaned
(artifacts removed)"]
        S2 --> S3["✂️ Chunked
(split into pieces)"]
        S3 --> S4a["🔢 Chunk 1 → Vector 1
🔢 Chunk 2 → Vector 2
🔢 Chunk 3 → Vector 3"]
        S4a --> S5["💾 Stored + Indexed
(ready for search)"]
    end

    subgraph FAILURE["Failure States"]
        ERR1["❌ Unsupported Format
(cannot extract)"]
        ERR2["❌ Corrupted File
(garbage text)"]
        ERR3["❌ Embedding Error
(API failure)"]
    end

    S0 -.-> ERR1
    S1 -.-> ERR2
    S4a -.-> ERR3

    style S0 fill:#3b82f6,color:#fff
    style S5 fill:#22c55e,color:#fff
    style FAILURE fill:#ef4444,color:#fff
```

Split the cleaned text into pieces. This is covered in detail in [Document 07](./07-document-chunking). Each chunk should be:

- Self-contained (makes sense on its own)
- Correctly sized (256-512 tokens)
- Properly overlapped (10-20% overlap)

### Step 4: Embed

Convert each chunk into a vector using an embedding model. This creates the numerical representation that enables similarity search.

```
Chunk → Embedding Model → [0.45, -0.12, 0.78, ..., 0.33]
                           (768 or 1536 numbers)
```

### Step 5: Store

Store the vectors in a vector database, along with metadata:

```
Vector DB Entry:
{
  vector: [0.45, -0.12, 0.78, ..., 0.33],  // The embedding
  metadata: {
    chunk_id: "doc-042-chunk-07",
    document_id: "q3-report-2024.pdf",
    source: "internal-drive/finance/Q3_2024.pdf",
    page: 12,
    author: "John Smith",
    date: "2024-09-30",
    category: "finance",
    tags: ["quarterly", "revenue", "projections"]
  },
  text: "Q3 revenue reached $12.4M, up 18% year over year..."
}
```

---

## Metadata: Why It Matters

Metadata is structured data attached to each chunk. It enables filtering *during* retrieval, so you can search within specific subsets of your knowledge base.

```mermaid
sequenceDiagram
    participant App
    participant VDB as Vector DB

    App->>VDB: Search(query_vector, filter={category: "finance", year: 2024})
    VDB->>VDB: 1. Only consider chunks with category="finance" AND year=2024
    VDB->>VDB: 2. Run ANN search within filtered subset
    VDB-->>App: Top 5 finance chunks from 2024
```

**Common metadata fields:**

| Field | Example | Use |
|-------|---------|-----|
| `document_id` | "doc-042" | Link back to source document |
| `source` | "https://example.com/page" | URL or file path |
| `page` | 12 | Page number in PDF |
| `author` | "John Smith" | Document author |
| `date` | "2024-09-30" | For temporal filtering |
| `category` | "finance" | Topic/department |
| `tags` | ["urgent", "approved"] | Custom labels |
| `access_level` | "internal" | Access control |

---

## Production Ingestion Pipeline

```mermaid
flowchart TD
    subgraph SOURCES["Document Sources"]
        A["📁 Shared Drive\n(PDFs, Docs)"]
        B["🌐 Confluence Wiki"]
        C["💬 Slack Messages"]
        D["📧 Email System"]
        E["🗄️ Database Tables"]
    end

    subgraph PROCESS["Processing Layer"]
        F["🔄 Document Connector\n(poll/watch for changes)"]
        G["📋 Parser\n(format-specific)"]
        H["🧹 Cleaner\n(remove noise)"]
        I["✂️ Chunker\n(strategy-based)"]
        J["🔢 Embedding Service\n(API or local model)"]
    end

    subgraph STORAGE["Storage Layer"]
        K["💾 Vector Database\n(index + metadata)"]
        L["📦 Object Storage\n(original files)"]
    end

    A --> F
    B --> F
    C --> F
    D --> F
    E --> F
    F --> G --> H --> I --> J --> K
    K -.-> L

    style SOURCES fill:#3b82f6,color:#fff
    style PROCESS fill:#8b5cf6,color:#fff
    style STORAGE fill:#22c55e,color:#fff
```

---

## Common Mistakes

| Mistake | Why It's Wrong |
|---------|----------------|
| ❌ "I'll re-ingest everything every time" | Incremental updates are critical. Re-ingesting 1M documents daily is expensive. Track what changed and only update those |
| ❌ "Metadata doesn't matter for search" | Metadata is essential for filtering, access control, and provenance tracking. Without it, every search searches *everything* |
| ❌ "I'll store original files in the vector DB" | Vector databases are not blob storage. Store vectors + metadata in the vector DB, and original files in object storage (S3, GCS) |
| ❌ "Text extraction always works perfectly" | Scanned PDFs, complex layouts, and non-standard fonts frequently produce garbage text. Always inspect a sample of extracted output |

---

## Interview Questions

### Easy

**Q: What are the five steps of a document ingestion pipeline?**

> (1) Extract text from raw document, (2) Clean the extracted text, (3) Chunk into pieces, (4) Embed each chunk into a vector, (5) Store vectors + metadata in a vector database.

### Intermediate

**Q: Why do we store metadata alongside vectors in the database?**

> Metadata enables filtering during retrieval (search only within a date range, category, or access level). It also provides provenance — linking each chunk back to its source document for citation and debugging.

### Senior - Architecture

**Q: Design an ingestion pipeline that handles 10,000 new documents per day with incremental updates.**

> Architecture: (1) **Event-driven triggers** — watch file system / S3 bucket / webhook for new or modified documents. (2) **Message queue** (RabbitMQ/SQS) to decouple ingestion from document arrival. (3) **Worker pool** — scalable workers that process documents: extract → clean → chunk → embed → store. (4) **Change tracking** — store document hash to detect modifications. (5) **Incremental indexing** — only re-index changed documents. (6) **Failure handling** — dead letter queue for failed documents with retry logic. (7) **Monitoring** — track ingestion throughput, error rate, and indexing delay.

---

## Summary

| Step | What Happens | Why It Matters |
|------|-------------|----------------|
| **Extract** | Parse document format | Different formats need different parsers |
| **Clean** | Remove artifacts | Dirty text = bad embeddings = bad retrieval |
| **Chunk** | Split into pieces | Right chunk size is critical |
| **Embed** | Convert to vector | Enables similarity search |
| **Store** | Save in vector DB | Fast retrieval at scale |

---

## Navigation

**Previous:** [07 — Document Chunking →](./07-document-chunking)

**Next:** [09 — Retrievers →](./09-retrievers)
