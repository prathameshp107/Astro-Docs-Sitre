import { useState, useEffect, useMemo } from 'react';
import StagedArchitectureDiagram from './StagedArchitectureDiagram.jsx';
import PracticeMode from './PracticeMode.jsx';
import BrandIcon from './BrandIcon.jsx';
import { CASE_STUDIES } from '../../data/system-design/caseStudies.js';

// Perf: diagram JSON is loaded lazily per-slug via dynamic import() instead of
// eagerly importing all ~27 files into this component's bundle — previously
// every single case-study page shipped every OTHER case study's diagram data
// too, just to render one. Each entry below code-splits into its own chunk.
const DIAGRAM_LOADERS = {
  'url-shortener': () => import('../../data/system-design/diagrams/url-shortener.json'),
  'uber': () => import('../../data/system-design/diagrams/uber.json'),
  'ride-sharing': () => import('../../data/system-design/diagrams/uber.json'),
  'whatsapp': () => import('../../data/system-design/diagrams/whatsapp.json'),
  'chat-system': () => import('../../data/system-design/diagrams/whatsapp.json'),
  'rate-limiter': () => import('../../data/system-design/diagrams/rate-limiter.json'),
  'news-feed': () => import('../../data/system-design/diagrams/news-feed.json'),
  'video-streaming': () => import('../../data/system-design/diagrams/video-streaming.json'),
  'notification-system': () => import('../../data/system-design/diagrams/notification-system.json'),
  'web-crawler': () => import('../../data/system-design/diagrams/web-crawler.json'),
  'search-autocomplete': () => import('../../data/system-design/diagrams/search-autocomplete.json'),
  'distributed-cache': () => import('../../data/system-design/diagrams/distributed-cache.json'),
  'file-storage': () => import('../../data/system-design/diagrams/file-storage.json'),
  'payment-system': () => import('../../data/system-design/diagrams/payment-system.json'),
  'ticket-booking-system': () => import('../../data/system-design/diagrams/ticket-booking-system.json'),
  'ecommerce-order-system': () => import('../../data/system-design/diagrams/ecommerce-order-system.json'),
  'distributed-key-value-store': () => import('../../data/system-design/diagrams/distributed-key-value-store.json'),
  'proximity-service': () => import('../../data/system-design/diagrams/proximity-service.json'),
  'collaborative-editor': () => import('../../data/system-design/diagrams/collaborative-editor.json'),
  'distributed-job-scheduler': () => import('../../data/system-design/diagrams/distributed-job-scheduler.json'),
  'ad-click-aggregation': () => import('../../data/system-design/diagrams/ad-click-aggregation.json'),
  'distributed-lock-service': () => import('../../data/system-design/diagrams/distributed-lock-service.json'),
  'tiktok': () => import('../../data/system-design/diagrams/tiktok.json'),
  'discord': () => import('../../data/system-design/diagrams/discord.json'),
  'airbnb': () => import('../../data/system-design/diagrams/airbnb.json'),
  'metrics-monitoring': () => import('../../data/system-design/diagrams/metrics-monitoring.json'),
  'distributed-message-queue': () => import('../../data/system-design/diagrams/distributed-message-queue.json'),
  'upi-payment-system': () => import('../../data/system-design/diagrams/upi-payment-system.json'),
};

import '../../styles/sketch-visualizer.css';

// This page's slug vocabulary has a couple of legacy aliases (uber/whatsapp)
// that don't exist as canonical slugs in caseStudies.js — map them so
// metadata lookups (hasGuide, topics, related links) still resolve.
const ALIAS_TO_CANONICAL = { uber: 'ride-sharing', whatsapp: 'chat-system' };

function getSlugTitle(s) {
  const canonical = ALIAS_TO_CANONICAL[s] || s;
  return CASE_STUDIES.find((c) => c.slug === canonical)?.title || s;
}

const ALL_CASE_STUDIES = [
  { slug: 'url-shortener', title: 'Design URL Shortener (TinyURL)' },
  { slug: 'ride-sharing', title: 'Design Ride-Sharing (Uber)' },
  { slug: 'chat-system', title: 'Design Chat App (WhatsApp)' },
  { slug: 'rate-limiter', title: 'Design a Rate Limiter' },
  { slug: 'news-feed', title: 'Design a News Feed (Twitter/Instagram)' },
  { slug: 'video-streaming', title: 'Design Video Streaming (YouTube/Netflix)' },
  { slug: 'tiktok', title: 'Design Short Video Platform (TikTok/Reels)' },
  { slug: 'discord', title: 'Design Real-Time Chat & Voice (Discord/Slack)' },
  { slug: 'airbnb', title: 'Design Property & Hotel Booking (Airbnb)' },
  { slug: 'notification-system', title: 'Design a Notification System' },
  { slug: 'web-crawler', title: 'Design a Web Crawler' },
  { slug: 'search-autocomplete', title: 'Design Search Autocomplete' },
  { slug: 'distributed-cache', title: 'Design a Distributed Cache' },
  { slug: 'file-storage', title: 'Design Cloud Storage (Google Drive)' },
  { slug: 'payment-system', title: 'Design a Payment System' },
  { slug: 'ticket-booking-system', title: 'Design a Ticket Booking System (BookMyShow)' },
  { slug: 'ecommerce-order-system', title: 'Design an E-commerce Order System (Amazon)' },
  { slug: 'distributed-key-value-store', title: 'Design a Distributed Key-Value Store (DynamoDB)' },
  { slug: 'proximity-service', title: 'Design a Proximity Service (Yelp)' },
  { slug: 'collaborative-editor', title: 'Design a Collaborative Editor (Google Docs)' },
  { slug: 'distributed-job-scheduler', title: 'Design a Distributed Job Scheduler' },
  { slug: 'metrics-monitoring', title: 'Design Metrics & Monitoring System (Prometheus)' },
  { slug: 'distributed-message-queue', title: 'Design Distributed Message Queue (Kafka)' },
  { slug: 'ad-click-aggregation', title: 'Design an Ad Click Aggregation System' },
  { slug: 'distributed-lock-service', title: 'Design a Distributed Lock Service' },
  { slug: 'upi-payment-system', title: 'Design UPI (Unified Payments Interface)' },
];

const ARTICLE_SLUG_MAP = {
  'url-shortener': 'design-url-shortener',
  'uber': 'design-ride-sharing',
  'ride-sharing': 'design-ride-sharing',
  'whatsapp': 'design-chat-system',
  'chat-system': 'design-chat-system',
  'rate-limiter': 'design-rate-limiter',
  'news-feed': 'design-news-feed',
  'video-streaming': 'design-video-streaming',
  'tiktok': 'design-short-video-platform',
  'discord': 'design-realtime-chat-voice',
  'airbnb': 'design-property-booking',
  'notification-system': 'design-notification-system',
  'web-crawler': 'design-web-crawler',
  'search-autocomplete': 'design-search-autocomplete',
  'distributed-cache': 'design-distributed-cache',
  'file-storage': 'design-file-storage',
  'payment-system': 'design-payment-system',
  'ticket-booking-system': 'design-ticket-booking-system',
  'ecommerce-order-system': 'design-ecommerce-order-system',
  'distributed-key-value-store': 'design-distributed-key-value-store',
  'proximity-service': 'design-proximity-service',
  'collaborative-editor': 'design-collaborative-editor',
  'distributed-job-scheduler': 'design-distributed-job-scheduler',
  'metrics-monitoring': 'design-metrics-monitoring',
  'distributed-message-queue': 'design-distributed-message-queue',
  'ad-click-aggregation': 'design-ad-click-aggregation',
  'distributed-lock-service': 'design-distributed-lock-service',
  'upi-payment-system': 'design-upi-payment-system',
};

const CASE_STUDY_EXTRAS = {
  'tiktok': {
    targetScale: '1 Billion Monthly Active Users & 500 Million Daily Video Views',
    primaryBottleneck: 'Real-time video feed recommendation scoring & CDN bandwidth egress costs',
    keyPattern: 'Adaptive Bitrate HLS + Redis User Feature Timelines + Deep Learning Ranker',
    components: [
      { name: 'S3 Multipart Uploader', desc: 'Allows mobile clients to upload 5MB raw video chunks directly to object storage in parallel.' },
      { name: 'FFmpeg Transcoder Pool', desc: 'Splits raw videos into 10s HLS chunks (.ts) across resolutions (1080p, 720p, 480p, 360p).' },
      { name: 'Recommendation Ranker', desc: 'Scores candidate videos dynamically based on user watch duration vectors and engagement history.' },
      { name: 'Flink Stream Analytics', desc: 'Aggregates 30s watch pings from Kafka to filter bot views before updating ClickHouse DB.' },
    ],
    faqs: [
      { q: 'How does TikTok stream videos so instantly without buffering?', a: 'App pre-fetches the first 3 seconds of the next 3 recommended videos into local device RAM while current video plays.' },
      { q: 'Why use HLS (HTTP Live Streaming) instead of a single MP4 file?', a: 'HLS breaks video into 10s chunks with a manifest (.m3u8), enabling seamless quality switching based on mobile network speed.' },
      { q: 'How does the feed engine avoid showing duplicate videos?', a: 'Redis stores a Bloom filter / bitset of seen video_ids per user, filtering out watched videos during candidate generation.' },
    ]
  },
  'discord': {
    targetScale: '200 Million Monthly Active Users & 4 Billion Messages / Day',
    primaryBottleneck: 'Low-latency message fan-out to 100K+ concurrent members in a single server (Guild)',
    keyPattern: 'Elixir Erlang Actor Model + ScyllaDB Channel Partitioning + WebRTC SFUs',
    components: [
      { name: 'Elixir Gateway Cluster', desc: 'Maintains millions of concurrent WebSocket connections using lightweight BEAM processes.' },
      { name: 'Guild Router Service', desc: 'Dispatches incoming chat messages to active WebSocket sessions for all online channel members.' },
      { name: 'ScyllaDB Message Store', desc: 'High-speed NoSQL database sharded by channel_id + Snowflake ID order for fast sequential writes.' },
      { name: 'Selective Forwarding Unit (SFU)', desc: 'Routes UDP audio streams across voice channels without expensive server-side audio mixing.' },
    ],
    faqs: [
      { q: 'Why did Discord migrate from MongoDB to ScyllaDB/Cassandra?', a: 'MongoDB indexes suffered under high write traffic. ScyllaDB LSM trees store channel messages sequentially on disk.' },
      { q: 'How does Discord handle voice calls with 50+ users without lag?', a: 'WebRTC SFUs forward single UDP audio streams directly between users, bypassing server-side audio decoding/re-encoding.' },
      { q: 'What is a Snowflake ID and why is it used?', a: '64-bit k-sortable unique integer encoding timestamp (41 bits), worker ID (10 bits), and sequence (12 bits).' },
    ]
  },
  'airbnb': {
    targetScale: '10 Million Property Listings & 100,000 Search Queries / Second',
    primaryBottleneck: 'Slow SQL date-range queries & double-booking under concurrent reservation attempts',
    keyPattern: 'Redis 365-Day Availability Bitmaps + 15-Minute SETNX Hold Locks + Quadtrees',
    components: [
      { name: 'Geohash / Quadtree Index', desc: 'Indexes listing coordinates into spatial grids for sub-10ms location bounding-box searches.' },
      { name: 'Date Bitmap Cache', desc: 'Stores 365 days of availability as a 365-bit vector per listing for fast bitwise AND date range checks.' },
      { name: 'Reservation Engine', desc: 'Acquires 15-minute temporary holds (SETNX listing_date_range user_id EX 900) before payment.' },
      { name: 'Elasticsearch Engine', desc: 'Indexes property attributes (Pool, Wi-Fi, Beachfront) for multi-filter search queries.' },
    ],
    faqs: [
      { q: 'How to check listing date availability in sub-millisecond time?', a: 'Store 365 calendar days as a 365-bit array in Redis. Querying July 1-7 checks if bits 182-188 are all 1 using BITOP.' },
      { q: 'How to prevent two users from booking the exact same dates at the exact same millisecond?', a: 'Use atomic Redis SETNX lock key on listing_id:date_range. Only 1 user acquires the 15-minute reservation hold.' },
      { q: 'How does Dynamic Pricing calculate nightly rates?', a: 'An ML model scores local demand surge, seasonality, competitor rates, and booking lead time to suggest optimal pricing.' },
    ]
  },
  'metrics-monitoring': {
    targetScale: '100,000 Microservices & 10 Million Metric Points / Second',
    primaryBottleneck: 'Database table bloat & payload size when querying 1-year historical charts',
    keyPattern: 'Prometheus Pull Scraper + Gorilla XOR TSDB Compression + Metric Rollup Downsampling',
    components: [
      { name: 'Prometheus Scraper', desc: 'Pulls /metrics endpoints from registered application instances every 15 seconds.' },
      { name: 'TSDB Storage Engine', desc: 'Compresses metric float values using Gorilla XOR encoding down to 1.37 bytes per data point.' },
      { name: 'PromQL Gateway', desc: 'Evaluates time-series queries and filters aggregations across metrics shards.' },
      { name: 'Alertmanager', desc: 'Evaluates threshold rules (e.g. CPU > 90% for 5m) and triggers PagerDuty / Slack notifications.' },
    ],
    faqs: [
      { q: 'What is the difference between Pull-based (Prometheus) and Push-based (StatsD) monitoring?', a: 'Pull prevents crashing monitoring servers during traffic spikes (server controls rate). Push simplifies ephemeral batch jobs.' },
      { q: 'How does Gorilla XOR Compression save 90% disk space for timestamps and values?', a: 'Timestamps are stored as delta-of-deltas. Floating point values XORed against previous values contain mostly zero bits.' },
      { q: 'How does Downsampling speed up rendering 1-year historical graphs?', a: '15-second raw points are aggregated into 1-minute averages after 7 days, and 1-hour averages after 30 days.' },
    ]
  },
  'distributed-message-queue': {
    targetScale: '10 Million Messages / Second with Sub-10ms End-to-End Latency',
    primaryBottleneck: 'Disk IOPS limits & CPU memory copy overhead during message delivery',
    keyPattern: 'Partitioned Commit Logs + OS Zero-Copy (sendfile) + In-Sync Replicas (ISR)',
    components: [
      { name: 'Partition Log Segment', desc: 'Appends incoming topic messages to sequential disk files with 64-bit monotonically increasing offsets.' },
      { name: 'Consumer Group Coordinator', desc: 'Assigns topic partitions to consumer group workers and handles rebalancing on worker failure.' },
      { name: 'Zero-Copy OS Engine', desc: 'Uses OS sendfile() to transfer bytes directly from Page Cache to Network Card DMA buffer.' },
      { name: 'ISR Replication Engine', desc: 'Replicates committed partition offsets across Follower brokers for high availability.' },
    ],
    faqs: [
      { q: 'Why are Kafka sequential disk writes faster than random RAM access in some cases?', a: 'Sequential disk I/O avoids disk head seek times. Combined with OS Page Cache, write throughput exceeds 100MB/s per disk.' },
      { q: 'What is OS Zero-Copy and how does it improve throughput by 4x?', a: 'Traditional transfer copies data 4 times between kernel and user space. sendfile() moves data directly inside kernel space.' },
      { q: 'How does a Consumer Group guarantee message ordering without bottlenecking?', a: 'Ordering is strictly guaranteed WITHIN a partition. Messages with the same key hash route to the exact same partition.' },
    ]
  },
  'web-crawler': {
    targetScale: '1 Billion Web Pages / Month (~400 pages/sec)',
    primaryBottleneck: 'Politeness enforcement per domain & infinite loop traps',
    keyPattern: 'URL Frontier + Bloom Filter + SimHash Deduplication',
    components: [
      { name: 'URL Frontier', desc: 'Maintains priority queues (PageRank) and politeness queues (delay timer per domain host).' },
      { name: 'DNS Resolver Cache', desc: 'Caches IP lookups locally to eliminate DNS resolution latency during high-speed crawls.' },
      { name: 'Bloom Filter', desc: 'Probabilistic in-memory set that checks if a URL was already visited in <1 microsecond.' },
      { name: 'SimHash Engine', desc: 'Fingerprints page DOM text to detect and discard near-duplicate mirror pages.' },
    ],
    faqs: [
      { q: 'How do you prevent overloading target servers (Politeness)?', a: 'Assign 1 queue per domain host. Maintain a delay timer (e.g. 1s) between consecutive requests to the same host.' },
      { q: 'How to handle spider traps and infinite URL loops?', a: 'Enforce maximum URL depth limits, limit query parameter length, and cap max pages fetched per domain.' },
      { q: 'Why use a Bloom Filter instead of a HashSet for seen URLs?', a: 'At 1B URLs, a HashSet consumes ~50GB RAM. A Bloom Filter uses only ~1.2GB RAM with 99.9% accuracy.' },
    ]
  },
  'url-shortener': {
    targetScale: '100 Million URLs / Month (100:1 Read-to-Write Ratio)',
    primaryBottleneck: 'Database read throughput under 10K+ redirects/sec',
    keyPattern: 'Base62 Key Gen Service + Redis LRU Cache',
    components: [
      { name: 'Key Gen Service (KGS)', desc: 'Pre-generates unique 7-character Base62 keys in batches to keep write latency flat.' },
      { name: 'Redis Cache', desc: 'Caches hot 20% of short-to-long URL mappings in memory for sub-millisecond 302 redirects.' },
      { name: 'Base62 Encoder', desc: 'Converts auto-increment IDs to 7-character strings ([a-z, A-Z, 0-9]) yielding 3.5T unique keys.' },
      { name: 'Read Replicas', desc: 'Offloads 99% of redirect lookup queries away from the primary SQL write database.' },
    ],
    faqs: [
      { q: 'Why 302 Found instead of 301 Moved Permanently?', a: '302 forces client browsers to ping the server on every click, allowing accurate analytics tracking.' },
      { q: 'How to guarantee key uniqueness across app servers?', a: 'Use Zookeeper to assign non-overlapping ID ranges (e.g. Server 1 gets 1–1M, Server 2 gets 1M–2M).' },
      { q: 'How much storage is needed for 5 years?', a: '100M URLs/month * 60 months = 6B URLs. At 500 bytes per mapping, total DB storage is ~3 TB.' },
    ]
  },
  'ride-sharing': {
    targetScale: '1 Million Active Drivers & 100K Concurrent Matches',
    primaryBottleneck: 'O(N) SQL spatial queries on driver pings every 4 seconds',
    keyPattern: 'Geohash Indexing + Redis GEO + City Sharding',
    components: [
      { name: 'Geo Service', desc: 'Indexes driver pings into Geohash grid keys (e.g. 9q9hv) in Redis for sub-10ms spatial queries.' },
      { name: 'Match Service', desc: 'Fetches nearby drivers, calculates ETA via routing graph, and offers rides asynchronously.' },
      { name: 'WebSocket Gateway', desc: 'Maintains persistent bi-directional connections for real-time driver/rider location pings.' },
      { name: 'Kafka Stream', desc: 'Streams location pings to multiple consumers (Matching, ETAs, Map rendering, Fraud detection).' },
    ],
    faqs: [
      { q: 'Why shard geospatial driver index by City ID?', a: 'Drivers and riders only interact within the same metropolitan area. City sharding isolates fault domains.' },
      { q: 'How to handle the Geohash boundary edge problem?', a: 'Query the center Geohash grid cell plus all 8 surrounding neighbor grid cells to avoid border misses.' },
      { q: 'How do you handle driver ride rejection?', a: 'Place ride offers in a queue. If Driver 1 rejects/times out (15s), pop next candidate driver instantly.' },
    ]
  },
  'uber': {
    targetScale: '1 Million Active Drivers & 100K Concurrent Matches',
    primaryBottleneck: 'O(N) SQL spatial queries on driver pings every 4 seconds',
    keyPattern: 'Geohash Indexing + Redis GEO + City Sharding',
    components: [
      { name: 'Geo Service', desc: 'Indexes driver pings into Geohash grid keys (e.g. 9q9hv) in Redis for sub-10ms spatial queries.' },
      { name: 'Match Service', desc: 'Fetches nearby drivers, calculates ETA via routing graph, and offers rides asynchronously.' },
      { name: 'WebSocket Gateway', desc: 'Maintains persistent bi-directional connections for real-time driver/rider location pings.' },
      { name: 'Kafka Stream', desc: 'Streams location pings to multiple consumers (Matching, ETAs, Map rendering, Fraud detection).' },
    ],
    faqs: [
      { q: 'Why shard geospatial driver index by City ID?', a: 'Drivers and riders only interact within the same metropolitan area. City sharding isolates fault domains.' },
      { q: 'How to handle the Geohash boundary edge problem?', a: 'Query the center Geohash grid cell plus all 8 surrounding neighbor grid cells to avoid border misses.' },
      { q: 'How do you handle driver ride rejection?', a: 'Place ride offers in a queue. If Driver 1 rejects/times out (15s), pop next candidate driver instantly.' },
    ]
  },
  'chat-system': {
    targetScale: '500 Million Daily Active Users & 10 Billion Messages/Day',
    primaryBottleneck: 'Maintaining persistent connections & offline message buffering',
    keyPattern: 'WebSocket Gateway + Redis Sessions + Sharded Cassandra',
    components: [
      { name: 'WebSocket Gateway', desc: 'Maintains long-lived TCP connections for instant duplex message delivery.' },
      { name: 'Session Service', desc: 'Maps user_id -> active WS server host ID in Redis so routers know where to dispatch.' },
      { name: 'Cassandra Store', desc: 'NoSQL wide-column database sharded by chat_id for high-throughput sequential message archiving.' },
      { name: 'Presence Service', desc: 'Aggregates user heartbeats every 30s in Redis KV to manage Online/Last Seen status.' },
    ],
    faqs: [
      { q: 'Why choose Cassandra over MySQL for chat history?', a: 'Cassandra provides sequential disk writes (LSM trees) and easy horizontal sharding by chat_id.' },
      { q: 'How do single (✓), double (✓✓), and blue checkmarks work?', a: 'Sent = ACK from server. Delivered = ACK from recipient WS. Read = Recipient opens chat window.' },
      { q: 'How are group chats with 1,000 members handled?', a: 'Message is published to a group channel topic. Workers fan-out to active member WebSocket servers.' },
    ]
  },
  'whatsapp': {
    targetScale: '500 Million Daily Active Users & 10 Billion Messages/Day',
    primaryBottleneck: 'Maintaining persistent connections & offline message buffering',
    keyPattern: 'WebSocket Gateway + Redis Sessions + Sharded Cassandra',
    components: [
      { name: 'WebSocket Gateway', desc: 'Maintains long-lived TCP connections for instant duplex message delivery.' },
      { name: 'Session Service', desc: 'Maps user_id -> active WS server host ID in Redis so routers know where to dispatch.' },
      { name: 'Cassandra Store', desc: 'NoSQL wide-column database sharded by chat_id for high-throughput sequential message archiving.' },
      { name: 'Presence Service', desc: 'Aggregates user heartbeats every 30s in Redis KV to manage Online/Last Seen status.' },
    ],
    faqs: [
      { q: 'Why choose Cassandra over MySQL for chat history?', a: 'Cassandra provides sequential disk writes (LSM trees) and easy horizontal sharding by chat_id.' },
      { q: 'How do single (✓), double (✓✓), and blue checkmarks work?', a: 'Sent = ACK from server. Delivered = ACK from recipient WS. Read = Recipient opens chat window.' },
      { q: 'How are group chats with 1,000 members handled?', a: 'Message is published to a group channel topic. Workers fan-out to active member WebSocket servers.' },
    ]
  },
  'rate-limiter': {
    targetScale: '100,000 API Requests / Second across Global Clusters',
    primaryBottleneck: 'Race conditions & window boundary traffic bursts',
    keyPattern: 'Token Bucket + Redis ZSET Sliding Log + Edge Limiters',
    components: [
      { name: 'API Gateway Filter', desc: 'Intercepts incoming HTTP requests to evaluate rate limits before reaching microservices.' },
      { name: 'Redis ZSET Store', desc: 'Stores request timestamps as scores in sorted sets to enforce smooth sliding window logs.' },
      { name: 'Rules Engine', desc: 'Loads tier limits (e.g. Free: 60/min, Pro: 1000/min) dynamically from config DB.' },
      { name: 'Edge Limiter', desc: 'Deploys rate checks at CDN edge locations (Cloudflare) to block malicious DDoS traffic early.' },
    ],
    faqs: [
      { q: 'Why is Fixed Window counter flawed?', a: 'A user can send 100 requests at 1:00:59 and 100 at 1:01:01, bursting 200 requests in 2 seconds.' },
      { q: 'How to handle Redis race conditions in multi-server setup?', a: 'Use Lua scripts executed atomically inside Redis so read, increment, and expire happen in 1 step.' },
      { q: 'What HTTP response headers should a rate limiter return?', a: 'Return `429 Too Many Requests` with `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After`.' },
    ]
  },
  'news-feed': {
    targetScale: '200 Million DAU & 50,000 Posts / Second',
    primaryBottleneck: 'Celebrity fan-out write amplification (Celebrity Problem)',
    keyPattern: 'Hybrid Push/Pull Model + Redis Timelines + Vector ML Ranker',
    components: [
      { name: 'Fan-out Worker', desc: 'Pushes post_ids directly into follower Redis timeline lists for regular users.' },
      { name: 'Redis Timeline Cache', desc: 'Stores ordered lists of post_ids (64-bit integers) per user for sub-millisecond feed fetching.' },
      { name: 'Post Hydrator', desc: 'Fetches full post objects (text, image URLs, author profile) in a single multi-get batch.' },
      { name: 'ML Feed Ranker', desc: 'Scores candidate posts based on user engagement history, recency, and affinity vectors.' },
    ],
    faqs: [
      { q: 'What is the Fan-out on Write (Push) vs Fan-out on Read (Pull) trade-off?', a: 'Push makes reading feeds instantaneous but breaks on celebrities. Pull saves write load but makes reads slower.' },
      { q: 'How does the Hybrid approach solve the Celebrity Problem?', a: 'Regular users (<10K followers) use Push. Celebrities (>10K followers) use Pull — merged on user feed fetch.' },
      { q: 'Why store only post_ids in Redis timelines instead of full posts?', a: 'Storing post_ids reduces memory by 95%. Post payloads are shared and cached separately in object cache.' },
    ]
  },
  'video-streaming': {
    targetScale: '1 Billion Hours Watched / Day & 500 Hours Uploaded / Min',
    primaryBottleneck: 'Heavy transcoding compute & origin egress bandwidth cost',
    keyPattern: 'Direct S3 Upload + HLS Chunk Transcoding + Multi-CDN',
    components: [
      { name: 'Upload Presigned URL', desc: 'Allows creators to stream video chunks directly to S3 without overloading app servers.' },
      { name: 'Transcoding Pipeline', desc: 'Splits raw videos into 10s HLS chunks (.ts) across resolutions (1080p, 720p, 480p, 360p).' },
      { name: 'Multi-CDN Edge', desc: 'Caches adaptive bitrate segments near viewers, serving 99%+ of stream bandwidth.' },
      { name: 'Flink View Counter', desc: 'Deduplicates watch heartbeats via streaming windows before writing view counts to DB.' },
    ],
    faqs: [
      { q: 'How does Adaptive Bitrate (ABR) streaming work?', a: 'The `.m3u8` master manifest lists video chunk URLs for multiple resolutions. Player dynamically switches based on network.' },
      { q: 'How do you prevent duplicate view counts from bot loops?', a: 'Stream heartbeats into Kafka. Flink windowing requires 30s continuous watch time per unique user/IP.' },
      { q: 'Why use Object Storage (S3) instead of traditional file servers?', a: 'S3 provides 99.999999999% durability, unlimited horizontal scale, and native multi-part parallel uploads.' },
    ]
  },
  'notification-system': {
    targetScale: '10 Million Notifications / Hour across Push, Email, and SMS',
    primaryBottleneck: 'Third-party vendor API latency (SendGrid, APNs, FCM, Twilio)',
    keyPattern: 'Decoupled Channel Queues + Redis Idempotency + Priority DLQs',
    components: [
      { name: 'Notification Gateway', desc: 'Validates payload, checks idempotency keys, and routes events to priority queues.' },
      { name: 'Channel Workers', desc: 'Dedicated worker pools handling vendor-specific rate limits and API retries.' },
      { name: 'Preference & Opt-Out DB', desc: 'Stores user channel preferences, quiet hours, and unsubscribe settings.' },
      { name: 'Dead Letter Queue (DLQ)', desc: 'Captures failed notifications after max retries for manual inspection and replay.' },
    ],
    faqs: [
      { q: 'How do you prevent sending duplicate notifications to users?', a: 'Client/Service sends a unique `event_id`. Redis sets an idempotency key (`SETNX`) with 24-hour expiration.' },
      { q: 'How do priority queues differentiate OTPs from marketing emails?', a: 'OTPs use high-priority dedicated queues with zero wait time. Marketing broadcasts use low-priority throttled queues.' },
      { q: 'How to handle third-party vendor downtime (e.g. SendGrid outage)?', a: 'Workers catch 5xx errors, trigger exponential backoff retry, and automatically failover to secondary vendor (SES).' },
    ]
  },
  'search-autocomplete': {
    targetScale: '50,000 Typeahead Queries / Second at <30ms Latency',
    primaryBottleneck: 'Traversing deep Trie structures & dynamic top-K sorting on live traffic',
    keyPattern: 'Trie Prefix Tree + Pre-computed Top 5 + Redis Cache',
    components: [
      { name: 'Trie Prefix Engine', desc: 'Stores search query histories in character tree nodes for fast prefix matching.' },
      { name: 'Pre-computed Node Caches', desc: 'Each Trie node stores its top 5 most popular completion strings directly in node memory.' },
      { name: 'Redis Top-5 Cache', desc: 'Caches high-frequency 1-2 character prefixes (e.g. "m", "ma") for instant lookup.' },
      { name: 'Spark Offline Pipeline', desc: 'Aggregates search logs weekly to update query frequencies and rebuild Trie snapshots.' },
    ],
    faqs: [
      { q: 'Why store pre-computed Top 5 strings directly at each Trie node?', a: 'Without pre-computation, finding top results requires traversing all child branches and sorting — `O(P + N log K)`. Pre-computation makes it `O(1)`!' },
      { q: 'How do you filter out inappropriate or trending search queries?', a: 'An offline sanitization pipeline filters profanity/copyright terms before building and hot-swapping the new Trie snapshot.' },
      { q: 'How to handle real-time trending spikes (e.g. Breaking News)?', a: 'Combine the static main Trie with a small real-time Redis ZSET buffer for queries trending in the last 15 minutes.' },
    ]
  },
  'distributed-cache': {
    targetScale: '10 Million Ops / Second & Terabytes of In-Memory Storage',
    primaryBottleneck: 'Cache stampedes & key remapping during node failures',
    keyPattern: 'Consistent Hashing + Virtual Nodes + Master-Replica Sentinel',
    components: [
      { name: 'Consistent Hash Ring', desc: 'Maps keys and nodes onto a 32-bit integer ring to minimize remapping on node changes.' },
      { name: 'Virtual Nodes', desc: 'Maps each physical machine to 200+ ring points to prevent load hotspots.' },
      { name: 'Twemproxy / Envoy', desc: 'Proxy layer that routes incoming client GET/SET requests to target cache shards.' },
      { name: 'Redis Sentinel', desc: 'Monitors primary cache nodes and automatically promotes replicas on primary failure.' },
    ],
    faqs: [
      { q: 'What happens when a cache node crashes in Modulo (`key % N`) vs Consistent Hashing?', a: 'Modulo invalidates ~100% of keys triggering a DB crash. Consistent Hashing invalidates only `1/N` of total keys!' },
      { q: 'How do you prevent a Cache Stampede (Dogpiling) when a hot key expires?', a: 'Use Mutex Locking (only 1 thread rebuilds cache while others wait) or Probabilistic Early Expiration (XFetch).' },
      { q: 'What is the LRU eviction policy memory mechanics?', a: 'HashMap for `O(1)` key lookup combined with a Doubly Linked List to move accessed items to head and evict tail.' },
    ]
  },
  'file-storage': {
    targetScale: '500 Million Users & Exabytes of Personal File Storage',
    primaryBottleneck: 'Re-uploading large modified files & storing duplicate file blocks',
    keyPattern: '4MB Block Chunking + Content Hashing (SHA-256) + Delta Sync',
    components: [
      { name: 'Block Splitter', desc: 'Splits files locally into 4MB immutable chunks before calculating content hashes.' },
      { name: 'Metadata Service', desc: 'Stores folder hierarchies, file versions, block lists, and user permissions in NoSQL.' },
      { name: 'Block Storage (S3)', desc: 'Stores unique encrypted 4MB file chunks indexed by their SHA-256 checksums.' },
      { name: 'WebSocket Sync Notifier', desc: 'Pushes delta update signals to user devices when a shared file is modified.' },
    ],
    faqs: [
      { q: 'How does global deduplication save storage across users?', a: 'If User A and User B upload the same 1GB movie, SHA-256 block matching detects duplicate blocks and stores them only ONCE in S3.' },
      { q: 'How does Delta Sync speed up editing a 500MB document?', a: 'Editing 1 page modifies only one 4MB block. The client uploads ONLY that 1 modified block instead of 500MB.' },
      { q: 'How are file version conflicts resolved when two users edit offline?', a: 'The system creates a conflicting copy (e.g., `Document (User B Conflict).docx`) and lets the user merge changes.' },
    ]
  },
  'payment-system': {
    targetScale: '99.999% Availability & Zero Lost Financial Transactions',
    primaryBottleneck: 'Double-charging users & ledger data corruption under network timeouts',
    keyPattern: 'Idempotency Keys + Double-Entry Bookkeeping + Reconciliation Loop',
    components: [
      { name: 'Idempotency Lock', desc: 'Uses Redis `SETNX` on `Idempotency-Key` header to block duplicate payment requests.' },
      { name: 'Payment Executor', desc: 'Coordinates gateway transactions and maintains atomic state machine steps.' },
      { name: 'Double-Entry Ledger DB', desc: 'Immutable ledger recording equal debit and credit entries (`sum(debits) - sum(credits) == 0`).' },
      { name: 'Reconciliation Engine', desc: 'Compares bank settlement files (SFTP CSVs) against internal ledger to catch discrepancies.' },
    ],
    faqs: [
      { q: 'Why is Double-Entry Bookkeeping mandatory in payment systems?', a: 'Money cannot be created or destroyed. Every transaction must record both source (debit) and destination (credit).' },
      { q: 'What happens if payment gateway call times out?', a: 'Do NOT retry blindly. Poll the PSP status API with the idempotency key to verify if the charge succeeded.' },
      { q: 'How does night reconciliation handle mismatched amounts?', a: 'Discrepancies are flagged in an audit table for automated retry or human finance team resolution.' },
    ]
  },
  'ticket-booking-system': {
    targetScale: '100,000 Flash-Sale Ticket Buyers Concurrent on Seat Selection',
    primaryBottleneck: 'Double booking seats under extreme concurrency (Coldplay ticket sale)',
    keyPattern: 'Redis SETNX Distributed Seat Lock (10-min TTL) + Virtual Queue',
    components: [
      { name: 'Virtual Waiting Room', desc: 'Throttles traffic influx using fair queue tokens before fans enter seat maps.' },
      { name: 'Redis Seat Reservation', desc: 'Acquires 10-minute temporary seat locks (`SETNX seat_id user_id EX 600`).' },
      { name: 'Booking Engine', desc: 'Converts temporary seat holds into confirmed DB tickets upon payment approval.' },
      { name: 'PostgreSQL Ledger', desc: 'Stores finalized tickets and seat manifests with strict transactional guarantees.' },
    ],
    faqs: [
      { q: 'How do you prevent two users from booking seat A1 at the exact same millisecond?', a: 'Use atomic Redis `SETNX` (Set if Not Exists). Only 1 user successfully writes the key; all others fail instantly.' },
      { q: 'What happens if a user holds 4 seats and closes their browser without paying?', a: 'The Redis key TTL (10 mins) automatically expires, instantly releasing the 4 seats back into the available pool.' },
      { q: 'Why not use SQL row locks (`SELECT FOR UPDATE`) for seat selection?', a: 'Under 100K concurrent buyers, SQL row locking causes connection pool starvation and database deadlocks.' },
    ]
  },
  'ecommerce-order-system': {
    targetScale: '1,000 Orders / Second with Multi-Warehouse Fulfillment',
    primaryBottleneck: 'Distributed inventory overselling & multi-service failures',
    keyPattern: 'Saga Orchestration Pattern + Event-Driven Kafka Checkout',
    components: [
      { name: 'Saga Orchestrator', desc: 'Executes checkout steps sequentially and triggers compensating actions on failure.' },
      { name: 'Inventory Service', desc: 'Reserves item stock in warehouse databases before payment execution.' },
      { name: 'Payment Service', desc: 'Charges payment methods idempotently via payment service providers.' },
      { name: 'Kafka Order Events', desc: 'Publishes `ORDER_PLACED`, `STOCK_RESERVED`, and `ORDER_CANCELLED` events.' },
    ],
    faqs: [
      { q: 'Why use Saga Orchestration over Two-Phase Commit (2PC)?', a: '2PC locks microservice database tables across network calls. Saga uses local transactions with compensating rollbacks.' },
      { q: 'What is a Compensating Transaction in a Saga?', a: 'If payment fails after inventory reservation, the Saga triggers `Release Stock` to undo the previous step.' },
      { q: 'How do you handle flash sale inventory reservation?', a: 'Pre-load item stock count into Redis. Atomically decrement (`DECRBY`) stock in Redis before creating DB orders.' },
    ]
  },
  'distributed-key-value-store': {
    targetScale: 'Petabytes of Unstructured Data & Millions of Reads/Writes per Sec',
    primaryBottleneck: 'Disk write I/O bottlenecks & cross-region data divergence',
    keyPattern: 'LSM Trees + Consistent Hashing Ring + Quorum Consensus (R+W > N)',
    components: [
      { name: 'MemTable & WAL', desc: 'Buffers writes in-memory (SkipList) while appending to sequential WAL for instant speed and durability.' },
      { name: 'SSTables on Disk', desc: 'Immutable sorted string tables on disk compacted periodically via background merge.' },
      { name: 'Consistent Hash Ring', desc: 'Partitions keys across cluster nodes with virtual node replicas.' },
      { name: 'Merkle Trees', desc: 'Hierarchical hash trees used by background anti-entropy processes to detect out-of-sync data.' },
    ],
    faqs: [
      { q: 'Why are LSM Trees faster for writes than B+ Trees?', a: 'B+ Trees do random disk writes. LSM Trees do sequential in-memory writes and background sequential flushes.' },
      { q: 'How does Quorum Consensus (`R + W > N`) guarantee read consistency?', a: 'With replication factor N=3, Write W=2, Read R=2: R+W=4 > 3, ensuring at least 1 node in read quorum has latest write.' },
      { q: 'How do Vector Clocks resolve concurrent write conflicts?', a: 'Each update attaches node version vectors (`[NodeA:1, NodeB:2]`). Causal relationships are preserved; conflicts trigger app-level merge.' },
    ]
  },
  'proximity-service': {
    targetScale: '100 Million Mostly-Static POIs & 100,000 Nearby Searches / Sec',
    primaryBottleneck: '2D spatial coordinate range scanning on large database tables',
    keyPattern: 'Geohash Grid Indexing + Quadtrees + Edge CDN Map Tiles',
    components: [
      { name: 'Proximity API', desc: 'Receives `(lat, lng, radius, category)` and converts coordinates into target Geohashes.' },
      { name: 'Spatial Quadtree', desc: 'In-memory 2D spatial tree that recursively splits dense city areas into smaller sub-quadrants.' },
      { name: 'Redis Geo Index', desc: 'Indexes business locations in Redis zsets for sub-10ms `GEORADIUS` queries.' },
      { name: 'Place Metadata Store', desc: 'Read replicas storing business details (name, hours, photos, ratings).' },
    ],
    faqs: [
      { q: 'Why is Proximity Service different from Ride-Sharing (Uber)?', a: 'Businesses rarely change location (mostly-static read dataset). Uber drivers ping location every 3s (heavy write dataset).' },
      { q: 'How does a Quadtree optimize dense vs sparse regions?', a: 'Sparse rural areas remain large quadrants. Dense downtown areas split into hundreds of small sub-quadrants, capping node count to 100.' },
      { q: 'Why cache search result tiles at CDN Edge?', a: 'Top searches (e.g. "Coffee in Manhattan") are identical for thousands of users. Pre-rendered map tiles serve 80%+ traffic from CDN.' },
    ]
  },
  'collaborative-editor': {
    targetScale: '100 Concurrent Active Editors per Document with Real-time Cursors',
    primaryBottleneck: 'Character index shifts and race conditions during simultaneous typing',
    keyPattern: 'Operational Transformation (OT) / CRDTs + WebSocket Presence',
    components: [
      { name: 'CRDT / OT Engine', desc: 'Resolves character insertion/deletion order without document locking.' },
      { name: 'WebSocket Server', desc: 'Broadcasts character deltas and cursor position coordinates across active client sessions.' },
      { name: 'Redis Presence Store', desc: 'Tracks active user socket connections, selection ranges, and user avatar colors.' },
      { name: 'Cassandra Operations Log', desc: 'Appends granular edit operations for complete revision history and time-travel undo.' },
    ],
    faqs: [
      { q: 'What is the core difference between Operational Transformation (OT) and CRDTs?', a: 'OT relies on a central server to transform character indexes (`T(opA, opB)`). CRDTs use unique fractional IDs so edits merge P2P without central server transformation.' },
      { q: 'How do you handle offline editing and reconnecting?', a: 'Edits made offline are stored as local CRDT state vectors. On reconnect, the client sends its state vector and merges deltas smoothly.' },
      { q: 'How do live cursor position updates work?', a: 'Cursor coordinates are ephemeral. They stream over WebSockets to Redis Presence KV and bypass the database operation log.' },
    ]
  },
  'distributed-job-scheduler': {
    targetScale: '1 Million Scheduled Tasks / Day with Exactly-Once Execution',
    primaryBottleneck: 'Single point of failure in cron servers & worker crash during task execution',
    keyPattern: 'Raft Master Leader Election + Redis Delayed ZSET Queue + DAG Engine',
    components: [
      { name: 'Leader Coordinator', desc: 'Elected master node via Raft/ZooKeeper that scans cron schedules and enqueues due tasks.' },
      { name: 'Delayed Task Queue', desc: 'Redis ZSET with score = `execute_at` timestamp. Workers poll tasks where `score <= now()`.' },
      { name: 'Worker Pool', desc: 'Stateless task execution nodes that execute jobs, emit heartbeats, and report status.' },
      { name: 'DAG Dependency Engine', desc: 'Coordinates multi-step workflow graphs (Task C executes only after Task A & B succeed).' },
    ],
    faqs: [
      { q: 'How do you guarantee a scheduled task is executed by exactly 1 worker?', a: 'Workers use Redis atomic pop / lease lock (`SETNX task_id worker_id EX 300`). Only the lock winner executes the task.' },
      { q: 'What happens if a worker node crashes mid-task?', a: 'If worker heartbeat stops, the master detects lock lease expiration and re-queues the task for another worker to execute.' },
      { q: 'How does the Delayed Queue work using Redis ZSETs?', a: 'Tasks are added with `ZADD delay_queue <timestamp> <task_json>`. Workers poll using `ZRANGEBYSCORE delay_queue 0 <current_timestamp>`.' },
    ]
  },
  'ad-click-aggregation': {
    targetScale: '100,000 Ad Clicks / Second & Sub-second Click Fraud Filtering',
    primaryBottleneck: 'Database write hot-spots & memory overhead of unique user counting',
    keyPattern: 'Kafka Event Ingestion + Apache Flink Tumbling Windows + Redis HyperLogLog',
    components: [
      { name: 'Click Collector API', desc: 'High-throughput ingress server that receives ad click payloads and appends to Kafka.' },
      { name: 'Kafka Click Topic', desc: 'Partitioned message stream sharded by `ad_id` for parallel processing.' },
      { name: 'Apache Flink', desc: 'Stream processor that aggregates clicks in 1-minute tumbling windows before writing to ClickHouse.' },
      { name: 'HyperLogLog Counter', desc: 'Redis probabilistic datastructure that counts unique user clicks using only 12KB RAM per ad.' },
    ],
    faqs: [
      { q: 'Why aggregate click counts in Flink instead of updating SQL DB directly?', a: 'Updating SQL on 100K clicks/sec locks DB rows. Flink aggregates 100K clicks into 1 bulk update per minute!' },
      { q: 'How does HyperLogLog count unique clickers with 12KB memory?', a: 'HLL uses probabilistic cardinality estimation based on leading zeros of hashed user IDs, using fixed 12KB memory with 99% accuracy.' },
      { q: 'How do you catch Click Fraud botnets?', a: 'Flink stream filters detect IP/User-Agent velocity spikes (e.g. 50 clicks in 5s from 1 IP) and drop fraudulent events before billing.' },
    ]
  },
  'distributed-lock-service': {
    targetScale: 'Sub-millisecond Mutual Exclusion Locks across Thousands of Microservices',
    primaryBottleneck: 'Split-brain lock ownership caused by process GC pauses & network partitions',
    keyPattern: 'Redlock Multi-Master Algorithm + Fencing Tokens + ZooKeeper Watchers',
    components: [
      { name: 'Redlock Engine', desc: 'Acquires locks across majority (`N/2 + 1`) independent Redis masters for fault tolerance.' },
      { name: 'Fencing Token Generator', desc: 'Emits monotonically increasing integer tokens (`101, 102`) with every granted lock.' },
      { name: 'ZooKeeper Ensemble', desc: 'Uses ephemeral sequential nodes to implement thundering-herd-free queue locking.' },
      { name: 'Guarded Storage', desc: 'Backend storage that rejects commands carrying fencing tokens lower than the last observed token.' },
    ],
    faqs: [
      { q: 'What is a Fencing Token and why is it mandatory?', a: 'If Process A pauses (GC pause) and loses its lock lease, Process B acquires the lock with Token 102. When Process A wakes up, storage rejects Process A’s Token 101!' },
      { q: 'Why is a single Redis instance insufficient for distributed locking?', a: 'If Redis master grants a lock and crashes before replicating to slave, slave is promoted without the lock, causing 2 nodes to hold the lock.' },
      { q: 'How does ZooKeeper prevent the Thundering Herd problem?', a: 'Each client watches ONLY the znode immediately preceding its own sequence number (`node-002` watches `node-001`), so only 1 client wakes up when a lock releases.' },
    ]
  },
  'upi-payment-system': {
    targetScale: '10+ Billion Transactions / Month across 500+ Participating Banks',
    primaryBottleneck: 'Making a transfer feel atomic across two independently-owned bank ledgers with no shared database transaction',
    keyPattern: 'NPCI Central Switch + VPA Resolution + Debit-First-Then-Credit with Compensating Reversal + Deferred Net Settlement',
    components: [
      { name: 'NPCI Switch', desc: 'Central router every bank integrates with exactly once; coordinates the debit and credit legs across two independent banks using a shared `txn_ref`.' },
      { name: 'VPA Mapper', desc: 'Resolves a human-readable payment address (`name@bank`) to a real account number + IFSC before any money moves.' },
      { name: 'Remitter / Beneficiary Bank APIs', desc: "Each bank's own core banking system executes its local debit or credit independently and reports success/failure back to the switch." },
      { name: 'Deferred Net Settlement Ledger', desc: 'Nets out what each bank pair owes each other and settles only the periodic difference, instead of one real interbank wire per transaction.' },
    ],
    faqs: [
      { q: 'What happens if the credit leg fails after the debit already succeeded?', a: 'The switch triggers a compensating reversal on the remitter bank, keyed by the same `txn_ref`, so a retried reversal is never double-applied and the payer is made whole.' },
      { q: 'Why route through a central switch instead of direct bank-to-bank integration?', a: 'Direct integration is O(N²) — every bank would need its own connection to every other bank. The switch collapses this to O(N): each bank integrates once, with the switch.' },
      { q: 'Why not settle every transaction between banks immediately?', a: 'Users already get instant, final-feeling confirmation because the switch coordinates both legs in real time — the actual interbank wire only needs to true up the periodic net difference, far cheaper than millions of tiny wires a day.' },
    ]
  }
};

/**
 * Compact wrapper page that dynamically loads diagram JSON (URL shortener, Uber, WhatsApp, Rate limiter, etc.)
 * based on the '?case' query parameter or quick dropdown selector, and renders the StagedArchitectureDiagram.
 */
export default function InteractiveCaseStudy({ caseStudySlug: initialSlug }) {
  const [slug, setSlug] = useState(initialSlug || 'url-shortener');
  const [practiceMode, setPracticeMode] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false); // switching case studies always starts a fresh attempt
  }, [slug]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const caseParam = params.get('case');
      if (caseParam && DIAGRAM_LOADERS[caseParam]) {
        setSlug(caseParam);
      }
    }
  }, []);

  const handleCaseChange = (e) => {
    const newSlug = e.target.value;
    setSlug(newSlug);
    if (typeof window !== 'undefined') {
      if (window.location.pathname.includes('/system-design/case/')) {
        // Clean-URL route: swap the last path segment, e.g. /system-design/case/uber
        const newPath = window.location.pathname.replace(/\/case\/[^/]+$/, `/case/${newSlug}`);
        window.history.pushState({}, '', newPath);
        document.title = `${getSlugTitle(newSlug)} — Interactive Architecture Walkthrough`;
      } else {
        // Legacy url-shortener.astro route: keep the ?case= query param scheme
        const url = new URL(window.location.href);
        if (newSlug === 'url-shortener') {
          url.searchParams.delete('case');
        } else {
          url.searchParams.set('case', newSlug);
        }
        window.history.pushState({}, '', url.toString());
      }
    }
  };

  const [diagramData, setDiagramData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setDiagramData(null); // show the loading skeleton immediately on slug switch
    const loader = DIAGRAM_LOADERS[slug] || DIAGRAM_LOADERS['url-shortener'];
    loader().then((mod) => {
      if (!cancelled) setDiagramData(mod.default || mod);
    });
    return () => { cancelled = true; };
  }, [slug]);

  const extras = useMemo(() => {
    return CASE_STUDY_EXTRAS[slug] || CASE_STUDY_EXTRAS['url-shortener'];
  }, [slug]);

  const articleDocSlug = ARTICLE_SLUG_MAP[slug] || (slug.startsWith('design-') ? slug : `design-${slug}`);

  const caseMeta = useMemo(() => {
    const canonicalSlug = ALIAS_TO_CANONICAL[slug] || slug;
    return CASE_STUDIES.find((c) => c.slug === canonicalSlug);
  }, [slug]);

  const relatedCases = useMemo(() => {
    const canonicalSlug = ALIAS_TO_CANONICAL[slug] || slug;
    const myTopics = caseMeta?.topics || [];
    const candidates = CASE_STUDIES.filter((c) => c.interactive && c.slug !== canonicalSlug);

    const scored = candidates
      .map((c) => ({ c, shared: (c.topics || []).filter((t) => myTopics.includes(t)).length }))
      .sort((a, b) => b.shared - a.shared);

    return scored.slice(0, 3).map((s) => s.c);
  }, [slug, caseMeta]);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  return (
    <div className="case-study-interactive-page font-sketch max-w-6xl mx-auto px-4 py-6">
      {/* Compact Chalkboard Header Section */}
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-4 md:p-6 rounded-2xl mb-6 border-2 border-[var(--sketch-border)] shadow-xl relative font-sketch">
        {/* Navigation & Case Switcher Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[var(--sketch-border)]">
          <a
            href={`${base}/system-design`}
            className="sketch-button inline-flex items-center gap-1.5 text-xs font-bold text-[var(--sketch-text-muted)] hover:text-amber-500 py-1.5 px-3"
          >
            ← Back to System Design Hub
          </a>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => { setPracticeMode((p) => !p); setRevealed(false); }}
              aria-pressed={practiceMode}
              className={`sketch-button text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                practiceMode ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : ''
              }`}
            >
              {practiceMode ? '🎯 Exit Practice Mode' : '🎯 Practice Mode'}
            </button>
            <label htmlFor="case-study-select" className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider hidden sm:inline">
              Switch Case Study:
            </label>
            <select
              id="case-study-select"
              value={slug}
              onChange={handleCaseChange}
              className="sketch-button bg-[var(--sketch-bg)] text-[var(--sketch-text)] text-xs md:text-sm font-bold font-sketch border-2 border-[var(--sketch-border)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer shadow-md"
            >
              {ALL_CASE_STUDIES.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-slate-900 text-slate-100">
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Compact Title & Subtitle */}
        <div className="text-center pt-3 pb-2">
          <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
            <BrandIcon slug={slug} size={32} />
            <h1 className="font-header font-bold text-2xl md:text-3xl text-[var(--sketch-text)]">
              {diagramData?.title || caseMeta?.title || slug}
            </h1>
          </div>
          <p className="text-[var(--sketch-text-muted)] text-xs md:text-sm max-w-2xl mx-auto leading-relaxed mb-3">
            {diagramData?.subtitle || caseMeta?.desc || ''}
          </p>

          {/* Quick Badges */}
          <div className="flex items-center justify-center gap-3 text-xs font-mono">
            <span className="sketch-border-soft px-3 py-1 bg-amber-500/10 text-amber-400 border-amber-500/30 rounded-full font-bold">
              📐 {diagramData ? `${diagramData.stages?.length || 0} Evolutionary Stages` : 'Loading stages…'}
            </span>
            <span className="sketch-border-soft px-3 py-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/30 rounded-full font-bold">
              ⏱️ ~5 Min Walkthrough
            </span>
          </div>
        </div>
      </section>

      {practiceMode && !revealed ? (
        <PracticeMode
          slug={slug}
          caseTitle={diagramData?.title || caseMeta?.title || slug}
          onReveal={() => setRevealed(true)}
        />
      ) : (
      <>
      {/* Diagram Canvas Box */}
      <div className="case-study-diagram-wrap sketch-border bg-[var(--sketch-bg-dim)] p-4 md:p-6 rounded-3xl border-2 border-[var(--sketch-border)] shadow-2xl mb-8">
        {diagramData?.stages?.length > 0 ? (
          <StagedArchitectureDiagram key={slug} diagramData={diagramData} />
        ) : (
          <div className="flex items-center justify-center h-[420px] animate-pulse">
            <span className="text-sm font-mono text-[var(--sketch-text-muted)]">📐 Loading architecture diagram…</span>
          </div>
        )}
      </div>

      {/* ── System Design Architecture Spec Sheet & Deep Dive ── */}
      {extras && (
        <section className="case-study-extras sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl border-2 border-[var(--sketch-border)] shadow-2xl mb-8 font-sketch">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--sketch-border)] mb-6">
            <div>
              <div className="inline-block sketch-border-soft px-3 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full mb-2">
                ⚡ SYSTEM ARCHITECTURE CORE SPEC SHEET
              </div>
              <h2 className="font-header font-bold text-2xl md:text-3xl text-[var(--sketch-text)] flex items-center gap-3 flex-wrap">
                <BrandIcon slug={slug} size={28} />
                <span>{diagramData?.title || caseMeta?.title || slug} — Key Trade-offs & Specs</span>
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Interview High-Yield Prep
            </span>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-2xl border border-[var(--sketch-border)] shadow-md">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block mb-1">
                🎯 Target Scale & Capacity
              </span>
              <p className="text-sm font-bold text-[var(--sketch-text)] leading-snug">
                {extras.targetScale}
              </p>
            </div>

            <div className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-2xl border border-[var(--sketch-border)] shadow-md">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                ⚠️ Primary Bottleneck Solved
              </span>
              <p className="text-sm font-bold text-[var(--sketch-text)] leading-snug">
                {extras.primaryBottleneck}
              </p>
            </div>

            <div className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-2xl border border-[var(--sketch-border)] shadow-md">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                🏆 Winning Architectural Pattern
              </span>
              <p className="text-sm font-bold text-[var(--sketch-text)] leading-snug">
                {extras.keyPattern}
              </p>
            </div>
          </div>

          {/* 4 System Building Blocks */}
          {extras.components && extras.components.length > 0 && (
            <div className="mb-6">
              <h3 className="font-header font-bold text-xl text-[var(--sketch-text)] mb-3 flex items-center gap-2">
                <span>⚙️</span> Core Component Responsibilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extras.components.map((comp, i) => (
                  <div key={i} className="sketch-panel-box sketch-border p-4 rounded-2xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
                    <div className="font-bold text-amber-400 text-base font-header mb-1 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      {comp.name}
                    </div>
                    <p className="text-xs md:text-sm text-[var(--sketch-text-muted)] leading-relaxed font-sketch">
                      {comp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interviewer FAQs & Deep-Dive */}
          {extras.faqs && extras.faqs.length > 0 && (
            <div>
              <h3 className="font-header font-bold text-xl text-[var(--sketch-text)] mb-3 flex items-center gap-2">
                <span>💡</span> Top Interview Questions & Technical Trade-Offs
              </h3>
              <div className="space-y-3">
                {extras.faqs.map((faq, i) => (
                  <div key={i} className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-2xl border border-[var(--sketch-border)] shadow-md">
                    <div className="text-sm font-bold text-emerald-400 mb-1 flex items-start gap-2">
                      <span className="font-mono text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 flex-shrink-0">
                        Q{i + 1}
                      </span>
                      <span>{faq.q}</span>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--sketch-text-muted)] leading-relaxed pl-8 font-sketch">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Back to written docs link */}
      <div className="text-center mb-12">
        <a
          href={`${base}/system-design/11-case-studies/${articleDocSlug}`}
          className="sketch-button inline-flex items-center gap-2 text-sm font-bold text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 px-6 py-2.5 rounded-xl shadow-lg"
        >
          {caseMeta && caseMeta.hasGuide === false
            ? '📖 Read Closest Written Guide (no dedicated article for this one yet) →'
            : '📖 Read Full Written HLD Article →'}
        </a>
      </div>
      </>
      )}

      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-2xl font-sketch shadow-xl mt-12 max-w-6xl mx-auto mb-10">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏗️</span>
              <h3 className="text-xl font-bold font-header text-[var(--sketch-text)]">
                {diagramData?.title || caseMeta?.title || slug} Interactive Walkthrough
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-xs md:text-sm max-w-2xl leading-relaxed font-sketch">
              Evolve system architecture stage by stage with interactive request-path tracing, bottleneck analysis, and capacity metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-button flex items-center gap-2 text-xs font-bold bg-amber-500/20 border-amber-500"
            >
              <span>⭐ Star on GitHub</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="sketch-button flex items-center gap-1.5 text-xs font-bold"
              title="Back to top"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        {/* 4-Column Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-[var(--sketch-border)]">
          {/* Column 1: Related Case Studies — dynamic, based on shared technique tags */}
          <div>
            <h4 className="font-header font-bold text-sm text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>📐</span> Related Case Studies
            </h4>
            <ul className="space-y-2 text-xs text-[var(--sketch-text-muted)] font-sketch">
              {relatedCases.map((rc) => (
                <li key={rc.slug}>
                  <a href={`${base}/system-design/case/${rc.slug}`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                    <span>•</span> {rc.title.replace(/^Design /, '')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: LLD Machine Coding */}
          <div>
            <h4 className="font-header font-bold text-sm text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>⚙️</span> LLD Projects
            </h4>
            <ul className="space-y-2 text-xs text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}/lld/projects/design-parking-lot`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Parking Lot System
                </a>
              </li>
              <li>
                <a href={`${base}/lld/projects/design-cache-system`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> LRU/LFU Cache
                </a>
              </li>
              <li>
                <a href={`${base}/lld/projects/design-rate-limiter`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Distributed Rate Limiter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Design Studio Navigation */}
          <div>
            <h4 className="font-header font-bold text-sm text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🚀</span> Design Hubs
            </h4>
            <ul className="space-y-2 text-xs text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}/system-design`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> System Design Hub
                </a>
              </li>
              <li>
                <a href={`${base}/visualizer`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Visualizer Studio
                </a>
              </li>
              <li>
                <a href={`${base}/mcq`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> MCQ Quiz Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Interview Prep */}
          <div>
            <h4 className="font-header font-bold text-sm text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>💡</span> Interview Prep
            </h4>
            <ul className="space-y-2 text-xs text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}/interview-questions`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Interview Questions
                </a>
              </li>
              <li>
                <a href={`${base}/labs`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Practice Labs Hub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Design Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--sketch-text-muted)]">
          <div>
            © {new Date().getFullYear()} System Design Studio · Hand-crafted Blackboard UI.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {diagramData?.title || caseMeta?.title || slug} Visualizer Active
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
