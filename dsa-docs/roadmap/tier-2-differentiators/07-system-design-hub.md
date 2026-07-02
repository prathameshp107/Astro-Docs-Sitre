# Feature 07 — System Design Hub (HLD + LLD)

| | |
|---|---|
| **Tier** | 2 — Differentiator |
| **Priority** | ⭐ High — our single biggest CONTENT gap |
| **Depends on** | Nothing (content + visualization); AI walkthroughs reuse Feature 05 infra later |
| **Effort** | Large (content-heavy; 4–6 weeks for launch set, then ongoing) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
For mid-level and senior candidates, **system design is 40–60% of the interview loop**
— often the round that decides the level/offer. Our platform currently has **zero**
system design content. We cover a fresher's interview completely and abandon everyone
with 2+ years of experience. That caps our audience at the least valuable segment
(juniors churn; seniors return for every job switch and pay for tools).

### Competitive context
- **Alex Xu's books / ByteByteGo:** the content gold standard — but static text +
  images behind a paywall.
- **DesignGurus (Grokking):** the classic course — text-heavy, dated UI, paywalled.
- **Excalidraw + YouTube:** what people actually do — fragmented, no structure.
- **Our wedge:** we already ship **React Flow and D3** for visualizers. Nobody offers
  *interactive* system design — diagrams you can click through stage by stage, watching
  the architecture evolve from 1 server → 100M users, with a request-path animation at
  each stage. That's our visualizer DNA applied to our biggest content gap.

### Why now
It's independent of all other features (pure content + components), so it can be built
in parallel with Tier 1. And it feeds Feature 05 v2 (AI system design interviews need
this question bank) and SEO ("design a url shortener" = massive search volume).

---

## 2. What to Build

### 2.1 Three content pillars

**A. Fundamentals course (`/system-design/fundamentals/`)** — ~20 MDX notes in
Starlight, same style as existing tracks:
Scaling (vertical/horizontal) · Load balancers · Caching (+ our Redis notes cross-link)
· CDNs · Databases: SQL vs NoSQL, replication, sharding, partitioning · Consistency &
CAP · Message queues · Rate limiting · Consistent hashing · WebSockets/polling/SSE ·
Microservices vs monolith · API design (REST/GraphQL/gRPC) · Idempotency ·
Back-of-envelope estimation (with an **interactive calculator component**: QPS,
storage, bandwidth from user inputs).

**B. Interactive case studies (`/system-design/problems/`)** — the flagship. Launch
set of 8, each a **staged walkthrough**:

| Case study | Key concepts exercised |
|---|---|
| URL shortener | hashing, key-gen service, cache, redirects, analytics |
| Rate limiter | token bucket vs sliding window, distributed counters, Redis |
| Chat app (WhatsApp) | WebSockets, fan-out, presence, message queues, delivery receipts |
| News feed (Instagram/Twitter) | fan-out on write/read, ranking, celebrity problem |
| Video platform (YouTube) | upload pipeline, transcoding, CDN, view counting |
| Ride sharing (Uber) | geo-indexing (quadtree/geohash), matching, real-time location |
| Notification system | multi-channel, dedup, rate limits, priority queues |
| Web crawler | frontier queue, politeness, dedup at scale, DNS |

Each case study page structure:
1. **Requirements** — functional + non-functional, with a "what to clarify in the
   interview" checklist
2. **Estimation** — using the interactive calculator, pre-filled
3. **Staged architecture diagram** (the core component): a React Flow diagram with a
   stage slider — *Stage 1: single server → Stage 2: split DB → Stage 3: add cache →
   Stage 4: LB + replicas → Stage 5: shard + queue + CDN*. Each stage transition
   animates the delta, highlights the bottleneck that forced it, and shows a
   **request-path animation** (a dot tracing client → LB → app → cache → DB).
4. **Deep dives** — the 2–3 hard sub-problems (e.g. unique-ID generation), collapsible
5. **Interview walkthrough** — how to present this in 35 minutes, phase by phase
6. **Trade-off table** + common follow-up questions

**C. LLD / OOP design (`/system-design/lld/`)** — 6 classics for the India-market
machine-coding round: Parking lot · Elevator · Snake & Ladders · Splitwise · Cache
(LRU/LFU) · Rate limiter class. Each: requirements → class diagram (React Flow) →
key design patterns used → reference implementation (collapsible, JS + Python).

### 2.2 The `StagedArchitectureDiagram` component (reusable, the crown jewel)

```jsonc
// src/data/system-design/diagrams/url-shortener.json
{
  "stages": [
    {
      "title": "Stage 1 — Just ship it",
      "bottleneck": "Single point of failure; DB does everything",
      "nodes": [ { "id": "client", "type": "client" }, { "id": "app", "type": "server" },
                 { "id": "db", "type": "database" } ],
      "edges": [ { "from": "client", "to": "app" }, { "from": "app", "to": "db" } ],
      "requestPath": ["client", "app", "db", "app", "client"],
      "narrative": "…markdown explaining this stage…"
    }
    // stages 2..N: nodes/edges added or replaced; component animates the diff
  ]
}
```

Custom React Flow node types with consistent iconography: `client, server, lb, cache,
database, replica, shard, queue, cdn, storage, service`. Framer Motion for node
enter/exit; the request-path dot animates along edges on demand.

### Out of scope for v1
- AI-driven design interview (Feature 05 v2 — but author case studies with a
  machine-readable rubric section so they're ready)
- User-drawn diagrams / Excalidraw-style editor (v3, maybe never — scope trap)

---

## 3. How to Build It (in this codebase)

### 3.1 Files to create

```
src/content/docs/system-design/fundamentals/*.mdx     ← pillar A (Starlight handles nav)
src/content/docs/system-design/problems/*.mdx         ← pillar B pages (embed components)
src/content/docs/system-design/lld/*.mdx              ← pillar C
src/data/system-design/diagrams/*.json                ← staged diagram specs
src/components/system-design/StagedArchitectureDiagram.jsx
src/components/system-design/ArchNode.jsx             ← custom React Flow node types
src/components/system-design/RequestPathAnimator.jsx
src/components/system-design/EstimationCalculator.jsx ← QPS/storage/bandwidth widget
src/components/system-design/TradeoffTable.jsx
src/components/system-design/ClassDiagram.jsx         ← LLD class boxes + relations
```

Register the new sidebar section in `astro.config.mjs` (Starlight sidebar config),
matching how existing tracks (react/, nodejs/, …) are wired.

### 3.2 Content authoring standards
- Every case study follows the SAME 6-section template (predictability = learnability).
- Estimation numbers must be defensible and shown with their arithmetic.
- Cross-link aggressively into existing notes (Redis, SQL, MongoDB, Docker tracks
  already cover many fundamentals — link, don't duplicate).
- Each case study ends with "Practice: explain this design in 5 minutes" + link to
  record themselves (v1: just guidance; v2: AI interview integration).

### 3.3 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 (wk 1–2) | `StagedArchitectureDiagram` + node library + request animator, driven by the URL-shortener JSON |
| 2 (wk 2–3) | URL shortener + rate limiter case studies complete (template proven) |
| 3 (wk 3–4) | 10 fundamentals notes + EstimationCalculator |
| 4 (wk 5–6) | Remaining 6 case studies + 10 more fundamentals + 3 LLD problems |
| ongoing | 1 new case study / 2 weeks (also feeds SEO) |

---

## 4. Expected Result

### User-visible outcome
A "System Design" track that makes static books feel obsolete: slide a stage slider
and *watch* the URL shortener grow from one box to a sharded, cached, CDN-fronted
architecture — with the bottleneck that forced each step spelled out, and a glowing
dot showing exactly how a request flows at every stage.

### Success metrics
- System design pages reach top-10 Google for ≥ 3 "design X system" queries in 6 months
- Avg time-on-page ≥ 6 min for case studies (vs ~2 min typical for notes)
- ≥ 25% of case-study visitors interact with the stage slider (event-track it)
- Senior-audience share of traffic measurably increases (analytics, Feature 11)

### Definition of done / acceptance criteria
- [ ] `StagedArchitectureDiagram` renders any conforming JSON; stage transitions animate
      the diff; request-path animation works per stage; keyboard + touch friendly
- [ ] 8 case studies + 20 fundamentals + 6 LLD problems live, all following templates
- [ ] EstimationCalculator embedded and functional in every case study
- [ ] Sidebar/navigation integrated into Starlight like existing tracks
- [ ] All pages statically rendered, meta-tagged, cross-linked to existing notes
- [ ] Diagrams legible in dark AND light themes and on mobile (pinch-zoom/pan)

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Build Phase 1+2 of the System Design Hub for my Astro + Starlight + React 19 site
(dsa-docs/). Read roadmap/tier-2-differentiators/07-system-design-hub.md and follow
the diagram JSON schema and page template exactly. We already use @xyflow/react and
framer-motion — reuse them.

Deliver: (1) StagedArchitectureDiagram.jsx — takes a diagram JSON, renders custom
ArchNode types (client, server, lb, cache, database, replica, shard, queue, cdn,
storage, service) with distinct icons, a stage slider that animates node/edge diffs
between stages with Framer Motion, a narrative panel per stage, and a "trace request"
button that animates a dot along the requestPath; (2) the complete URL-shortener
diagram JSON with 5 stages per the spec; (3) the full URL-shortener case study MDX at
src/content/docs/system-design/problems/url-shortener.mdx following the 6-section
template (requirements, estimation, staged diagram, deep dives incl. unique-ID
generation, interview walkthrough, trade-off table) — write expert-level content;
(4) EstimationCalculator.jsx (inputs: DAU, reads/writes per user, object size →
outputs: QPS avg/peak, storage/yr, bandwidth); (5) Starlight sidebar registration in
astro.config.mjs. Verify in dev: slide through all 5 stages, run the request trace,
and check both themes.
```
