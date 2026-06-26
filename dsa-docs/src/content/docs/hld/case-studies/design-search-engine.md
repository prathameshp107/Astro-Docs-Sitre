---
title: "Case Study 10 — Design Search Engine"
description: "HLD case study: Design a web search engine like Google — crawling, indexing, ranking, and query processing at web scale."
sidebar:
  order: 10
---

## Case Study 10 — Design Search Engine

**Problem:** Design a web search engine like Google that crawls billions of web pages, indexes them, and returns relevant results in milliseconds.

---

### Requirements

| Type | Requirement |
|------|-------------|
| **Functional** | Crawl web pages, build search index, rank results by relevance, handle user queries, handle typos/stemming/synonyms |
| **Non-Functional** | < 200ms query latency (P99), index 100B+ pages, handle 100K+ queries/sec, 99.99% availability |

---

### Architecture Overview

```mermaid
flowchart TB
    subgraph Crawling["Crawling Pipeline"]
        URL["URL Frontier"]
        Crawler["Distributed Crawlers"]
        Parser["HTML Parser"]
        Link["Link Extractor"]
    end

    subgraph Indexing["Indexing Pipeline"]
        Content["Content Analysis"]
        Inverted["Inverted Index Builder"]
        Meta["Metadata Index"]
        Rank["Ranking Model"]
    end

    subgraph Serving["Query Serving"]
        QParser["Query Parser"]
        Search["Search across shards"]
        Merge["Merge + Rank"]
        Results["Results Page"]
    end

    subgraph Storage["Storage"]
        Raw["Raw HTML Store<br/>HDFS / BigTable"]
        Index["Index Shards<br/>(100s of nodes)"]
        Cache["Query Cache<br/>Redis / Memcached"]
    end

    Web["🌐 Web"] --> URL --> Crawler --> Parser --> Link
    Link --> URL
    Parser --> Content --> Inverted --> Index
    Content --> Meta --> Index
    Inverted --> Rank
    
    User["User Query"] --> QParser --> Cache
    Cache -->|Cache Miss| Search --> Merge --> Index
    Merge --> Results

    style Crawling fill:#3b82f6,color:#fff
    style Indexing fill:#7c3aed,color:#fff
    style Serving fill:#059669,color:#fff
    style Storage fill:#f59e0b,color:#fff
```

---

### Crawling Flow

```mermaid
sequenceDiagram
    participant Frontier as URL Frontier
    participant Crawler as Crawler
    participant Parser as Parser
    participant Store as Raw HTML Store
    participant Index as Indexer

    Frontier->>Crawler: Next URL batch (100 URLs)
    Crawler->>Crawler: Check robots.txt (politeness)
    Crawler->>Web: Fetch page
    Web-->>Crawler: HTML response
    
    Crawler->>Parser: Send HTML for parsing
    Parser->>Parser: Extract title, text, meta
    
    Parser->>Link: Extract links
    Link->>Link: Normalize URLs
    Link->>Frontier: Add to frontier (prioritized)

    Parser->>Store: Save raw HTML (for re-crawl)
    Parser->>Index: Send parsed content for indexing
    
    Note over Crawler,Crawler: Respect crawl-delay,<br/>deduplicate URLs,<br/>handle errors gracefully
```

---

### How Search Ranking Works (PageRank Simplified)

```mermaid
flowchart TB
    Query["User Query"] --> Parse["Parse & Normalize<br/>Lowercase, stem, synonyms"]
    Parse --> Find["Find documents matching query<br/>(look up inverted index)"]
    Find --> Score["Score each document"]
    
    Score --> TFIDF["TF-IDF Score<br/>How relevant is page<br/>to this query?"]
    Score --> PageRank["PageRank<br/>How many quality<br/>pages link here?"]
    Score --> Freshness["Freshness<br/>How recent is<br/>the content?"]
    Score --> Location["Location/Proximity<br/>Are query terms<br/>close together?"]
    Score --> User["User Signals<br/>Did users click<br/>this result?"]
    
    TFIDF & PageRank & Freshness & Location & User --> Combine["Combine Scores<br/>(weighted formula)"]
    Combine --> Top["Top 10 Results"]
    Top --> Snippet["Generate snippets<br/>with highlights"]

    style Query fill:#f59e0b,color:#fff
    style Score fill:#7c3aed,color:#fff
    style Combine fill:#059669,color:#fff
    style Top fill:#3b82f6,color:#fff
```

---

### Key Design Decisions

| Decision | Approach | Why |
|----------|----------|-----|
| **Inverted Index** | Map term → list of doc IDs with positions | Fast full-text search — O(1) per term |
| **Index Sharding** | Shard by keyword range (document-based) | Parallel search across shards |
| **PageRank** | Link analysis algorithm | Measures page importance by incoming links |
| **Query Cache** | Cache frequent query results | Skewed queries — top 10% of queries = 90% of traffic |
| **Spell correction** | Bloom filter + edit distance | Handle typos gracefully |

---

### In Simple Words

- **Crawling** = systematically fetching web pages, respecting politeness (robots.txt, crawl-delay)
- **URL Frontier** prioritizes which pages to crawl next (fresh important pages first)
- **Inverted Index** = the core data structure — maps every word to the list of documents containing it
- **PageRank** = a page is important if many important pages link to it (link analysis)
- **Ranking** combines many signals: TF-IDF, PageRank, freshness, proximity, user engagement
- **Sharding** the index across hundreds of machines for parallel search
- **Query caching** serves 90% of traffic from cache (highly skewed query distribution)
- **Google processes** billions of queries per day in < 200ms — a marvel of distributed systems
