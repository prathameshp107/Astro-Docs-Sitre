---
title: "Design a News Feed (Twitter/Instagram)"
description: "Designing a social media feed — fan-out, ranking, and real-time delivery for millions of users."
sidebar:
  order: 3
---

# Case Study: Design a News Feed

> A news feed shows users the latest posts from people they follow. Think Twitter, Instagram, Facebook.

---

## Requirements

**Functional:**
- User can create a post (text, image, video)
- User sees a feed of posts from people they follow
- Feed is sorted by recency/relevance
- User can like, comment, share posts

**Non-functional:**
- Feed loads in <500ms
- Support 100M DAU
- Handle write spikes (celebrity posts)

---

## Estimation

| Metric | Value |
|--------|-------|
| DAU | 100M |
| Posts/user/day | 0.5 (50M posts/day, ~600 QPS) |
| Feed reads/user/day | 10 (1,000M reads/day, ~11,500 QPS) |
| Storage (5 years) | 50M posts × 1KB = 50 GB/day → **~90 TB** |
| Images | 50M × 200KB = 10 TB/day → CDN |

---

## API Design

```json
POST /post
{ "text": "Hello world!", "media_ids": ["img_123"] }
→ { "post_id": "post_456", "created_at": "..." }

GET /feed?limit=20
→ { "posts": [ { "post_id": "...", "author": "...", "text": "..." }, ... ] }
```

---

## High-Level Design

```mermaid
flowchart LR
    Client["📱 Client"] --> LB["Load Balancer"]
    LB --> App["Web Server"]
    App --> PostDB[("Post DB<br/>PostgreSQL")]
    App --> FeedCache[("Feed Cache<br/>Redis")]
    App --> Fanout["Fan-Out Service"]
    Fanout --> Queue["Message Queue"]
    Queue --> Workers["Feed Workers"]
    Workers --> FeedCache

    style Client fill:#7c3aed,color:#fff
    style LB fill:#4f46e5,color:#fff
    style App fill:#6366f1,color:#fff
    style FeedCache fill:#8b5cf6,color:#fff
    style Fanout fill:#059669,color:#fff
    style Workers fill:#059669,color:#fff
```

---

## Deep Dive: Fan-Out

**Two approaches for building feeds:**

| Approach | How It Works | Pros | Cons |
|----------|-------------|------|------|
| **Push (Fan-out on write)** | When Alice posts, pre-compute feed for all followers | ✅ Feed read is O(1) | ❌ Writes are expensive for celebs |
| **Pull (Fan-out on read)** | When Bob reads feed, query all followed users' posts | ✅ Writes are O(1) | ❌ Reads are expensive |

**Our approach: Hybrid**

- **Regular users (fewer than 5K followers):** Push — pre-compute feed on write.
- **Celebrities (>5K followers):** Pull — merge celebrity posts into feed on read.

```javascript
function fanOut(post, authorId) {
  const followerCount = getFollowerCount(authorId);

  if (followerCount < 5000) {
    // Push: add post to all followers' feed caches
    const followers = getFollowers(authorId);
    for (const followerId of followers) {
      redis.lpush(`feed:${followerId}`, post.id);
      redis.ltrim(`feed:${followerId}`, 0, 500); // keep latest 500
    }
  } else {
    // Celebrity: store post, merge on read
    redis.lpush(`celebrity_posts:${authorId}`, post.id);
  }
}
```

---

## Deep Dive: Feed Ranking

After fetching candidate posts, rank them:

```
score = recency_score × 0.5 + affinity_score × 0.3 + engagement_score × 0.2
```

- **Recency:** time since post (newer = higher)
- **Affinity:** how often user interacts with this author
- **Engagement:** likes + comments + shares on the post

---

## Bottlenecks & Trade-offs

| Bottleneck | Solution |
|-----------|----------|
| **Celebrity post fan-out** | Pull model for celebrities — merge on read |
| **Feed load time** | Pre-compute + cache, then paginate |
| **Storage growth** | Archive old posts to cold storage (S3) |
| **Real-time updates** | WebSocket push for new posts in feed |

---

## Follow-up Questions

**Q: What happens to a regular user who crosses the 5,000-follower threshold overnight?**
The fan-out strategy needs to flip from push to pull for that author without a service interruption — on crossing the threshold, stop pushing new posts to follower feed caches and start writing to `celebrity_posts`, while leaving already-pushed posts in followers' caches to age out naturally (they're bounded by the `ltrim` to 500 anyway).

**Q: How do you backfill a brand-new user's feed when they haven't followed anyone yet?**
There's no push history to pull from, so cold-start with a pull-based query against a "trending" or "popular in your region/interests" set (onboarding-suggested accounts, globally popular posts) until they build a follow graph, then transition to the normal push/pull hybrid once they have follows.

**Q: The ranking formula weighs recency, affinity, and engagement — how do you avoid engagement-optimization turning the feed into all viral content and no recent updates from close friends?**
Cap the engagement term's influence (e.g., diminishing returns via log(likes) instead of raw counts) and consider serving distinct candidate pools — one recency-heavy for close friends/affinity, one engagement-heavy for discovery — then interleave them rather than letting one global score dominate.

**Q: If a celebrity's post is deleted after millions of pull-merge reads have already served it, how do you avoid stale cached copies?**
Because celebrity posts are merged on read rather than pushed, a delete just needs to remove/tombstone the post_id from `celebrity_posts` and post DB — no fan-out cache invalidation needed. For regular users' push-fanned posts already sitting in follower feed caches, you need an async cleanup job or a soft-delete flag checked at render time.

**Q: How do you keep a user's feed scroll position consistent if they check the feed on phone, then desktop, then phone again?**
Paginate with a stable cursor (e.g., timestamp or post_id boundary) rather than offset-based pagination, and persist last-seen cursor per user server-side so switching devices resumes from the same point instead of an offset that shifts as new posts arrive.

---

## In Simple Words

- News feed = blend of posts from people you follow, sorted by relevance.
- Push fan-out is fast for reads but expensive for celebrity posts.
- Hybrid approach: push for regular users, pull + merge for celebrities.
