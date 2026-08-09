// Shared case-study metadata for the /system-design hub grid and the
// clean-URL interactive routes (src/pages/system-design/case/[slug].astro).
// `interactive: true` entries MUST have a matching DIAGRAM_MAP entry in
// InteractiveCaseStudy.jsx, or the clean route will silently fall back to
// the URL-shortener diagram.
//
// `hasGuide: false` means this slug has no dedicated doc under
// src/content/docs/system-design/11-case-studies/ — it's an interactive-only
// hub extra that piggybacks on a related written guide (see ARTICLE_SLUG_MAP
// in InteractiveCaseStudy.jsx). Keep this in sync with that map.

export const DIFFICULTY_COLORS = {
  Easy: { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/40' },
  Medium: { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/40' },
  Hard: { text: 'text-rose-400', bg: 'bg-rose-500/15', border: 'border-rose-500/40' },
};

// XP awarded per completed case study, mirroring the DSA playground's
// per-problem `xp` field (src/data/dsa-problems.js) — difficulty-scaled here
// instead of per-entry since every case study in a tier is roughly comparable
// effort to work through.
export const DIFFICULTY_XP = { Easy: 50, Medium: 100, Hard: 150 };

// Filterable technique tags — keep small and reusable across case studies
// rather than one-off per-entry phrasing.
export const TOPICS = [
  'caching', 'sharding', 'consistent-hashing', 'rate-limiting', 'websockets',
  'fan-out', 'message-queue', 'geospatial', 'locking', 'transactions',
  'consensus', 'crdt', 'storage', 'cdn', 'streaming', 'ranking',
  'search', 'inverted-index', 'batch-processing', 'idempotency', 'security',
];

export const CASE_STUDIES = [
  { slug: 'url-shortener', title: 'Design URL Shortener (TinyURL)', desc: 'Key generation, redirection, caching, and database scaling.', interactive: true, hasGuide: true, difficulty: 'Easy', companies: ['Google', 'Bitly'], topics: ['caching', 'sharding'], recommendedOrder: 1 },
  { slug: 'rate-limiter', title: 'Design a Rate Limiter', desc: 'Token bucket in Redis for fair, distributed API request limiting.', interactive: true, hasGuide: true, difficulty: 'Easy', companies: ['Cloudflare', 'Stripe'], topics: ['rate-limiting', 'caching'], recommendedOrder: 2 },
  { slug: 'distributed-cache', title: 'Design a Distributed Cache', desc: 'Consistent hashing, replication, and failover like Redis or Memcached.', interactive: true, hasGuide: true, difficulty: 'Medium', companies: ['Redis', 'Meta'], topics: ['caching', 'consistent-hashing'], recommendedOrder: 3 },
  { slug: 'chat-system', title: 'Design Chat App (WhatsApp)', desc: 'WebSocket servers, message queuing, delivery status checks, and presence store.', interactive: true, hasGuide: true, difficulty: 'Medium', companies: ['Meta', 'WhatsApp'], topics: ['websockets', 'fan-out'], recommendedOrder: 4 },
  { slug: 'news-feed', title: 'Design a News Feed (Twitter/Instagram)', desc: 'Fan-out write/read paths, feed caching, media storage, and scaling read paths.', interactive: true, hasGuide: true, difficulty: 'Medium', companies: ['Meta', 'Twitter/X'], topics: ['fan-out', 'caching', 'ranking'], recommendedOrder: 5 },
  { slug: 'web-crawler', title: 'Design a Web Crawler', desc: 'Frontier, politeness, deduplication, and storage at Googlebot scale.', interactive: true, hasGuide: true, difficulty: 'Medium', companies: ['Google'], topics: ['storage', 'batch-processing'], recommendedOrder: 6 },
  { slug: 'proximity-service', title: 'Design a Proximity Service (Yelp)', desc: 'Geohashing and quadtrees for fast nearby-places search at scale.', interactive: true, hasGuide: true, difficulty: 'Medium', companies: ['Yelp', 'Google Maps'], topics: ['geospatial', 'sharding'], recommendedOrder: 7 },
  { slug: 'ticket-booking-system', title: 'Design a Ticket Booking System (BookMyShow)', desc: 'Seat-hold locking to prevent double-booking and flash-sale traffic spikes.', interactive: true, hasGuide: true, difficulty: 'Medium', companies: ['BookMyShow', 'Ticketmaster'], topics: ['locking', 'transactions'], recommendedOrder: 8 },
  { slug: 'distributed-key-value-store', title: 'Design a Distributed Key-Value Store (DynamoDB)', desc: 'Quorum reads/writes, vector clocks, hinted handoff, and LSM-trees.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Amazon DynamoDB'], topics: ['consensus', 'sharding', 'storage'], recommendedOrder: 9 },
  { slug: 'distributed-lock-service', title: 'Design a Distributed Lock Service', desc: 'Leases, fencing tokens, and consensus-backed mutual exclusion.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['ZooKeeper', 'Google Chubby'], topics: ['consensus', 'locking'], recommendedOrder: 10 },
  { slug: 'payment-system', title: 'Design a Payment System', desc: 'Idempotent transactions, reconciliation loops, and ledger architecture.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Stripe', 'PayPal'], topics: ['transactions', 'idempotency'], recommendedOrder: 11 },
  { slug: 'collaborative-editor', title: 'Design a Collaborative Editor (Google Docs)', desc: 'Operational Transformation, CRDTs, and live multi-user presence.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Google Docs', 'Figma'], topics: ['crdt', 'websockets'], recommendedOrder: 12 },

  { slug: 'notification-system', title: 'Design a Notification System', desc: 'Batching, delivery, and multi-channel (push, email, SMS) fan-out.', interactive: true, hasGuide: true, difficulty: 'Medium', companies: ['Amazon', 'Uber'], topics: ['fan-out', 'message-queue'] },
  { slug: 'search-autocomplete', title: 'Design Search Autocomplete', desc: 'Real-time typeahead suggestions like Google Search autocomplete.', interactive: true, hasGuide: true, difficulty: 'Medium', companies: ['Google', 'Amazon'], topics: ['search', 'caching'] },
  { slug: 'distributed-job-scheduler', title: 'Design a Distributed Job Scheduler', desc: 'Leader election, exactly-once triggers, and DAG dependencies.', interactive: true, hasGuide: true, difficulty: 'Medium', companies: ['Airbnb', 'LinkedIn'], topics: ['consensus', 'message-queue'] },
  { slug: 'api-gateway', title: 'Design an API Gateway', desc: 'Routing, auth, request aggregation, and per-dependency circuit breaking.', interactive: false, hasGuide: true, difficulty: 'Medium', companies: ['Netflix', 'Kong'], topics: ['rate-limiting', 'security'] },
  { slug: 'photo-sharing-app', title: 'Design Instagram', desc: 'Async image processing pipeline, TTL-based ephemeral Stories, and embedding-based discovery feed.', interactive: false, hasGuide: true, difficulty: 'Medium', companies: ['Instagram', 'Meta'], topics: ['storage', 'cdn', 'fan-out'] },
  { slug: 'ride-sharing', title: 'Design Ride-Sharing (Uber)', desc: 'Geospatial indexing (Geohash), WebSocket connections, and matching service.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Uber', 'Lyft'], topics: ['geospatial', 'websockets'] },
  { slug: 'video-streaming', title: 'Design Video Streaming (YouTube/Netflix)', desc: 'Transcoding pipelines, CDN delivery, view counters, and upload flow.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['YouTube', 'Netflix'], topics: ['cdn', 'streaming'] },
  { slug: 'tiktok', title: 'Design Short Video Platform (TikTok/Reels)', desc: 'Parallel chunk uploads, HLS transcoding, recommendation feed ranker, and Flink analytics.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['TikTok', 'ByteDance'], topics: ['streaming', 'ranking', 'cdn'] },
  { slug: 'discord', title: 'Design Real-Time Chat & Voice (Discord/Slack)', desc: 'Elixir WS gateway, ScyllaDB channel logs, WebRTC SFUs, and presence aggregation.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Discord', 'Slack'], topics: ['websockets', 'fan-out'] },
  { slug: 'airbnb', title: 'Design Property & Hotel Booking (Airbnb)', desc: '365-day availability bitmaps, 15-min SETNX reservation holds, and Quadtree search.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Airbnb', 'Booking.com'], topics: ['locking', 'geospatial'] },
  { slug: 'file-storage', title: 'Design Cloud Storage (Google Drive)', desc: 'Chunking uploads, sync conflict resolution, and metadata sharding.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Dropbox', 'Google'], topics: ['storage', 'sharding'] },
  { slug: 'ecommerce-order-system', title: 'Design an E-commerce Order System (Amazon)', desc: 'Inventory reservation, order state machine, and saga-coordinated checkout.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Amazon', 'Walmart'], topics: ['transactions', 'locking'] },
  { slug: 'metrics-monitoring', title: 'Design Metrics & Monitoring System (Prometheus)', desc: 'Pull metrics scraper, Gorilla XOR TSDB compression, and rollup downsampling.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Datadog', 'Prometheus'], topics: ['storage', 'batch-processing'] },
  { slug: 'distributed-message-queue', title: 'Design Distributed Message Queue (Kafka)', desc: 'Partitioned commit logs, consumer groups, OS zero-copy (sendfile), and ISR replicas.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['LinkedIn', 'Confluent'], topics: ['message-queue', 'storage'] },
  { slug: 'ad-click-aggregation', title: 'Design an Ad Click Aggregation System', desc: 'Streaming aggregation, HyperLogLog counting, and fraud dedup.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['Google Ads', 'Meta Ads'], topics: ['streaming', 'batch-processing'] },
  { slug: 'twitter-timeline', title: 'Design Twitter/X', desc: 'Retweet fan-out amplification and real-time trending topics via Count-Min Sketch.', interactive: false, hasGuide: true, difficulty: 'Hard', companies: ['Twitter/X'], topics: ['fan-out', 'ranking'] },
  { slug: 'distributed-search-engine', title: 'Design a Distributed Search Engine', desc: 'Sharded inverted index, scatter-gather queries, and BM25 relevance ranking.', interactive: false, hasGuide: true, difficulty: 'Hard', companies: ['Elastic', 'Google'], topics: ['search', 'inverted-index', 'sharding'] },
  { slug: 'upi-payment-system', title: 'Design UPI', desc: 'VPA resolution, switch-coordinated interbank debit/credit, and deferred net settlement.', interactive: true, hasGuide: true, difficulty: 'Hard', companies: ['NPCI', 'Google Pay', 'PhonePe'], topics: ['transactions', 'consensus'] },
];

// Written guides live at src/content/docs/system-design/11-case-studies/*.md —
// keep in sync with that folder's file count (see STRUCTURE_OVERVIEW.md there).
export const WRITTEN_GUIDES_COUNT = 30;
