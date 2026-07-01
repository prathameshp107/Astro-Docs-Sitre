---
title: "10. Building a Complete RAG Pipeline"
description: "Bringing everything together — end-to-end RAG architecture from document upload to answer generation, with production considerations."
sidebar:
  order: 10
---

## Introduction

> **This is the final document in the RAG fundamentals series. Everything you've learned — embeddings, vector databases, chunking, ingestion, retrievers — comes together here into a complete, production-ready RAG pipeline.**

By the end of this document, you'll understand how systems like ChatPDF, NotebookLM, Cursor, and Perplexity work under the hood. And you'll know how to build one yourself.

---

## Why This Concept Exists

### The Story

You've learned the individual ingredients:
- Embeddings (how meaning becomes vectors)
- Vector databases (where vectors live)
- Chunking (how documents are split)
- Ingestion (how documents enter the system)
- Retrievers (how relevant chunks are found)
- RAG (how retrieval + LLM work together)

Now it's time to see the **full recipe** — how all these ingredients combine into a complete system that can answer questions about any document.

---

## Architecture Overview

```mermaid
flowchart TD
    subgraph INGESTION["🔄 Ingestion Pipeline"]
        A["Raw Document\n(PDF, DOCX, Website)"] --> B["Extract + Clean\n(PyMuPDF, Unstructured)"]
        B --> C["Chunk\n(256-512 tokens, 20% overlap)"]
        C --> D["Embed\n(text-embedding-3-small)"]
        D --> E[(Vector Database\nPinecone / Qdrant)]
        C --> F[(Metadata Store\nPostgreSQL / MongoDB)]
    end

    subgraph QUERY["💬 Query Pipeline"]
        G["User Question"] --> H["Embed\n(same model as ingestion)"]
        H --> I["🔍 Retriever\n(hybrid search)"]
        I --> J["Filter\n(metadata: date, category, access)"]
        J --> E
        E --> K["Top K Chunks\n(5-10 most relevant)"]
        K --> L["Reranker\n(cross-encoder)"]
        L --> M["📝 Prompt Builder\n(context + question)"]
        M --> N["🧠 LLM\n(GPT-4o-mini / Claude)"]
        N --> O["✅ Final Answer"]
    end

    INGESTION --> QUERY

    style INGESTION fill:#3b82f6,color:#fff
    style QUERY fill:#22c55e,color:#fff
    style E fill:#f59e0b,color:#fff
```

---

## Real-World Analogy

### The Complete Restaurant

A RAG pipeline is like a restaurant:

| Component | Analogy | Role |
|-----------|---------|------|
| **Raw documents** | Ingredients in storage | Unprocessed data |
| **Extraction** | Washing and chopping | Preparing data |
| **Chunking** | Portioning into servings | Creating searchable units |
| **Embedding** | Labeling each portion | Making it findable |
| **Vector DB** | The organized pantry | Fast storage and retrieval |
| **Retriever** | The chef's order system | Finding the right ingredients |
| **Reranker** | Taste-testing | Ensuring quality |
| **LLM** | The head chef | Creating the final dish |
| **Answer** | The plated meal | The final output |

---

## Step-by-Step Full Pipeline

### Step 1: User Uploads a Document

```mermaid
flowchart LR
    UPLOAD["👤 User uploads\n100-page PDF"] --> EXTRACT["📄 Extract text\n(200,000 words)"]
    EXTRACT --> CHUNK["✂️ Split into 400 chunks\n(500 tokens each)"]
    CHUNK --> EMBED["🔢 Generate 400 embeddings\n(1536 dimensions each)"]
    EMBED --> STORE["💾 Store in\nVector Database"]

    style UPLOAD fill:#3b82f6,color:#fff
    style STORE fill:#22c55e,color:#fff
```

1. User uploads a PDF (or Word doc, or website URL)
2. The system extracts text content from the file
3. Text is cleaned (remove headers, footers, artifacts)
4. Cleaned text is chunked into pieces (400 chunks for a 100-page PDF)
5. Each chunk is embedded into a vector
6. All vectors + metadata are stored in a vector database

### Step 2: User Asks a Question

```mermaid
flowchart LR
    Q["👤 'What was the\nQ3 budget?'"] --> Q_EMBED["🔢 Embed question\n→ vector"]
    Q_EMBED --> SEARCH["🔍 Search Vector DB\n(fix nearest neighbors)"]
    SEARCH --> TOP["Top 5 chunks\n+ metadata"]
    TOP --> BUILD["📝 Build prompt:\n'Answer using\nthis context...'"]
    BUILD --> LLM["🧠 LLM generates\nanswer"]
    LLM --> ANS["✅ 'The Q3 budget\nwas $2.4M'"]

    style Q fill:#3b82f6,color:#fff
    style LLM fill:#f59e0b,color:#fff
    style ANS fill:#22c55e,color:#fff
```

1. User asks a question
2. Question is embedded with the same embedding model
3. Vector database finds the nearest neighbor chunks
4. Retrieved chunks are combined with the original question in a prompt
5. LLM reads the prompt and generates a grounded answer

---

## Production Architecture

```mermaid
flowchart TD
    subgraph FRONTEND["Frontend Layer"]
        UI["Web App / API"]
    end

    subgraph API["API Layer"]
        GATEWAY["API Gateway\n(auth, rate limiting)"]
        ORCH["Orchestrator\n(routing, caching)"]
    end

    subgraph RETRIEVAL["Retrieval Layer"]
        RET["Retriever\n(hybrid search)"]
        RERANK["Reranker\n(cross-encoder)"]
        FILTER["Metadata Filter"]
    end

    subgraph STORAGE["Storage Layer"]
        VDB[(Vector DB\nQdrant / Pinecone)]
        MDB[(Metadata DB\nPostgreSQL)]
        OBJ[(Object Store\nS3 / GCS)]
    end

    subgraph LLM_LAYER["Generation Layer"]
        PROMPT["Prompt Builder\n(templating)"]
        LLM["LLM API\n(OpenAI / Anthropic)"]
        GUARD["Guardrails\n(content filtering)"]
    end

    UI --> GATEWAY --> ORCH
    ORCH --> RET
    RET --> VDB
    RET --> MDB
    RET --> RERANK
    RERANK --> FILTER
    FILTER --> PROMPT
    PROMPT --> LLM
    LLM --> GUARD
    GUARD --> UI

    style FRONTEND fill:#3b82f6,color:#fff
    style API fill:#8b5cf6,color:#fff
    style RETRIEVAL fill:#f59e0b,color:#fff
    style STORAGE fill:#22c55e,color:#fff
    style LLM_LAYER fill:#ef4444,color:#fff
```

---

## How Real Products Use RAG

```mermaid
flowchart TD
    subgraph PRODUCTS["Real RAG Applications"]
        CHATPDF["ChatPDF\nYour documents → Q&A"]
        NOTEBOOK["NotebookLM\nYour notes → Research"]
        CURSOR["Cursor\nYour codebase → Coding"]
        PERPLEXITY["Perplexity\nWeb search → Answers"]
        COPILOT["GitHub Copilot\nYour repo → Code completion"]
    end

    PRODUCTS --> COMMON["Common RAG Pattern:\nIndex → Retrieve → Generate"]

    style PRODUCTS fill:#3b82f6,color:#fff
    style COMMON fill:#22c55e,color:#fff
```

| Product | What It Indexes | How It Retrieves | What It Generates |
|---------|----------------|------------------|-------------------|
| **ChatPDF** | Your uploaded PDFs | Semantic search on chunks | Answers about document content |
| **NotebookLM** | Your notes, sources | Semantic + keyword hybrid | Research insights, summaries |
| **Cursor** | Your entire codebase | Code-aware embeddings | Code completions, edits |
| **Perplexity** | Live web pages | Web search → rerank | Answers with citations |
| **GitHub Copilot** | Your repository | Context-aware retrieval | Code suggestions |
| **Claude Projects** | Your uploaded files | Semantic search | Project-specific answers |

---

## Production Considerations

### Latency

| Component | Typical Time | Optimization |
|-----------|-------------|--------------|
| Embedding the query | 50-100ms | Cache frequent queries |
| Vector search | 10-50ms | Optimize HNSW parameters |
| Reranking | 20-100ms | Only rerank top 20-50 |
| LLM generation | 500-2000ms | Use smaller model when possible |
| **Total** | **~600-2250ms** | Streaming for faster perceived time |

### Cost

| Component | Cost Driver | Saving Strategy |
|-----------|-------------|-----------------|
| Embedding | Per-query API costs | Self-host open-source models |
| Vector DB | Storage + compute | Proper index tuning, tiered storage |
| LLM | Token generation | Caching, smaller models, prompt compression |

### Security

- **Access control** — Filter retrieval by user permissions (only retrieve documents the user can see)
- **PII detection** — Scan documents for personal information before ingestion
- **Prompt injection** — Validate that user queries don't try to override the system prompt
- **Audit logging** — Log every retrieval and generation for compliance

### Monitoring

| Metric | What It Tracks | Target |
|--------|---------------|--------|
| **Retrieval precision** | % of relevant chunks in top-K | >80% |
| **Hallucination rate** | % of answers not grounded in context | <5% |
| **Latency p95** | Response time for 95th percentile | <3s |
| **User feedback** | Thumbs up/down rate | >90% positive |

---

## Comparison Tables

### RAG vs Fine-Tuning

| Aspect | RAG | Fine-Tuning |
|--------|-----|-------------|
| **Goal** | Add knowledge at query time | Change model behavior |
| **Cost** | Low (per-query) | High (training) |
| **Update speed** | Instant (add documents) | Slow (retrain) |
| **Knowledge type** | Specific, private, recent | Behavioral, format, style |
| **Best for** | Q&A on your data | Tone, output format, role-play |
| **Can be combined?** | ✅ Yes — RAG + fine-tuned model together | ✅ Yes |

### Retriever vs Vector Database

| Aspect | Retriever | Vector Database |
|--------|-----------|-----------------|
| **Role** | Search strategy | Storage + index |
| **Examples** | Hybrid retriever, BM25 retriever | Pinecone, Qdrant, Weaviate |
| **Decides** | How to search, what to filter | Where to search, how fast |
| **Output** | Top-K chunks + scores | Raw nearest neighbors |

### Chunking Strategies

| Strategy | Quality | Speed | Best For |
|----------|---------|-------|----------|
| Fixed size | Medium | Fastest | Simple documents |
| Recursive | Good | Fast | General RAG |
| Semantic | Best | Slowest | Long-form content |
| Sentence | Medium | Fast | Factual Q&A |

### Keyword vs Semantic Search

| Aspect | Keyword (BM25) | Semantic (Vector) |
|--------|---------------|-------------------|
| **Matches** | Exact words | Meaning |
| **Synonyms** | ❌ Misses | ✅ Finds |
| **Typos** | ❌ Misses | ✅ Handles |
| **Speed** | ⚡ Very fast | 🐢 Slower |
| **Best for** | Product codes, names | Natural language queries |

---

## Common Mistakes

| Mistake | Why It's Wrong |
|---------|----------------|
| ❌ "I'll use the same model for embedding and generation" | Embedding models and generation models serve different purposes. Use specialized models for each (e.g., text-embedding-3-small for embedding, GPT-4o-mini for generation) |
| ❌ "RAG is a set-it-and-forget-it system" | RAG requires ongoing monitoring — retrieval quality degrades as documents are added, user queries change, and embedding models are updated |
| ❌ "I don't need a reranker if my retriever is good" | Retrievers find *semantically similar* chunks. Rerankers find *factually relevant* chunks. They optimize for different things. Rerankers consistently improve top-K quality by 10-20% |
| ❌ "I'll deploy RAG without testing retrieval quality" | Test retrieval quality BEFORE building the full pipeline. Bad retrieval = bad answers. Use metrics like recall@K and MRR to validate |

---

## Interview Questions

### Easy

**Q: Walk through the complete RAG pipeline from document upload to answer.**

> (1) Upload document → (2) Extract + clean text → (3) Chunk into pieces → (4) Embed each chunk → (5) Store in vector DB → (6) User asks question → (7) Embed question → (8) Search vector DB for nearest neighbors → (9) Retrieve top-K chunks → (10) Build prompt with chunks + question → (11) LLM generates answer → (12) Return answer to user.

### Intermediate

**Q: Compare RAG with fine-tuning. When would you use each?**

> Use RAG when you need to inject specific, private, or frequently updated knowledge into the model. It's cheap, fast, and doesn't require training. Use fine-tuning when you need to change the model's behavior — its tone, output format, or ability to follow specific patterns. They're complementary: you can fine-tune a model for behavior and use RAG for knowledge.

### Senior - Architecture

**Q: Design a complete RAG system for a multinational company with 500,000 documents across 20 languages, serving 50,000 employees. Consider retrieval quality, cost, latency, and access control.**

> Architecture: (1) **Ingestion** — multilingual embedding model (Voyage-multilingual or BGE-m3), recursive chunking at 512 tokens with 20% overlap. (2) **Storage** — Qdrant or Milvus for vector storage, partitioned by language and department. (3) **Retrieval** — hybrid search (BM25 + vector) with language-specific preprocessing. Top-K = 10, reranked with cross-encoder (rerank-multilingual-v2). (4) **Access control** — metadata-based filtering on document access level + user role. (5) **Caching** — two-tier cache: in-memory for frequent queries, Redis for medium-frequency. (6) **Cost optimization** — GPT-4o-mini for 80% of queries (simple lookup), GPT-4o for 20% (complex reasoning). (7) **Monitoring** — track retrieval precision by language, user satisfaction by department, cost per query.

---

## What You've Learned

### Chunk 1 (Documents 01-05)
- ✅ Why Retrieval Systems exist
- ✅ What embeddings are
- ✅ How vector space works
- ✅ How similarity search works
- ✅ What vector databases are

### Chunk 2 (Documents 06-10)
- ✅ What RAG is and why it exists
- ✅ How document chunking works
- ✅ How the ingestion pipeline works
- ✅ What retrievers do
- ✅ How a complete RAG pipeline is built

### Ready for Chunk 3
You're now ready for **Advanced Retrieval** — hybrid search, reranking, context compression, parent-child retrieval, multi-query retrieval, GraphRAG, and agentic RAG.

---

## Summary

| Component | Purpose | Key Decision |
|-----------|---------|--------------|
| **Ingestion** | Convert documents to searchable vectors | Chunking strategy, embedding model |
| **Storage** | Store vectors + metadata | Vector DB choice, index type |
| **Retrieval** | Find relevant chunks | Top-K, hybrid vs pure, threshold |
| **Reranking** | Improve result quality | Cross-encoder model |
| **Generation** | Produce final answer | LLM model, prompt template |
| **Production** | Deploy reliably | Caching, monitoring, access control |

---

## Navigation

**Previous:** [09 — Retrievers →](./09-retrievers)

**Next:** Coming soon — **Chunk 3: Advanced Retrieval** (Hybrid Search, Reranking, Context Compression, GraphRAG) →
