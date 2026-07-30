import { useState } from 'react';
import EstimationCalculator from './EstimationCalculator';
import DatabaseAdvisor from './DatabaseAdvisor';
import BrandIcon from './BrandIcon.jsx';
import { CategoryIcon } from '../mcq/CategoryIcons.jsx';
import '../../styles/sketch-visualizer.css';

const CASE_STUDIES = [
  { slug: 'url-shortener', title: 'Design URL Shortener (TinyURL)', desc: 'Key generation, redirection, caching, and database scaling.', interactive: true },
  { slug: 'ride-sharing', title: 'Design Ride-Sharing (Uber)', desc: 'Geospatial indexing (Geohash), WebSocket connections, and matching service.', interactive: true },
  { slug: 'chat-system', title: 'Design Chat App (WhatsApp)', desc: 'WebSocket servers, message queuing, delivery status checks, and presence store.', interactive: true },
  { slug: 'rate-limiter', title: 'Design a Rate Limiter', desc: 'Token bucket in Redis for fair, distributed API request limiting.', interactive: true },
  { slug: 'news-feed', title: 'Design a News Feed (Twitter/Instagram)', desc: 'Fan-out write/read paths, feed caching, media storage, and scaling read paths.', interactive: true },
  { slug: 'video-streaming', title: 'Design Video Streaming (YouTube/Netflix)', desc: 'Transcoding pipelines, CDN delivery, view counters, and upload flow.', interactive: true },
  { slug: 'tiktok', title: 'Design Short Video Platform (TikTok/Reels)', desc: 'Parallel chunk uploads, HLS transcoding, recommendation feed ranker, and Flink analytics.', interactive: true },
  { slug: 'discord', title: 'Design Real-Time Chat & Voice (Discord/Slack)', desc: 'Elixir WS gateway, ScyllaDB channel logs, WebRTC SFUs, and presence aggregation.', interactive: true },
  { slug: 'airbnb', title: 'Design Property & Hotel Booking (Airbnb)', desc: '365-day availability bitmaps, 15-min SETNX reservation holds, and Quadtree search.', interactive: true },
  { slug: 'notification-system', title: 'Design a Notification System', desc: 'Batching, delivery, and multi-channel (push, email, SMS) fan-out.', interactive: true },
  { slug: 'web-crawler', title: 'Design a Web Crawler', desc: 'Frontier, politeness, deduplication, and storage at Googlebot scale.', interactive: true },
  { slug: 'search-autocomplete', title: 'Design Search Autocomplete', desc: 'Real-time typeahead suggestions like Google Search autocomplete.', interactive: true },
  { slug: 'distributed-cache', title: 'Design a Distributed Cache', desc: 'Consistent hashing, replication, and failover like Redis or Memcached.', interactive: true },
  { slug: 'file-storage', title: 'Design Cloud Storage (Google Drive)', desc: 'Chunking uploads, sync conflict resolution, and metadata sharding.', interactive: true },
  { slug: 'payment-system', title: 'Design a Payment System', desc: 'Idempotent transactions, reconciliation loops, and ledger architecture.', interactive: true },
  { slug: 'ticket-booking-system', title: 'Design a Ticket Booking System (BookMyShow)', desc: 'Seat-hold locking to prevent double-booking and flash-sale traffic spikes.', interactive: true },
  { slug: 'ecommerce-order-system', title: 'Design an E-commerce Order System (Amazon)', desc: 'Inventory reservation, order state machine, and saga-coordinated checkout.', interactive: true },
  { slug: 'distributed-key-value-store', title: 'Design a Distributed Key-Value Store (DynamoDB)', desc: 'Quorum reads/writes, vector clocks, hinted handoff, and LSM-trees.', interactive: true },
  { slug: 'proximity-service', title: 'Design a Proximity Service (Yelp)', desc: 'Geohashing and quadtrees for fast nearby-places search at scale.', interactive: true },
  { slug: 'collaborative-editor', title: 'Design a Collaborative Editor (Google Docs)', desc: 'Operational Transformation, CRDTs, and live multi-user presence.', interactive: true },
  { slug: 'distributed-job-scheduler', title: 'Design a Distributed Job Scheduler', desc: 'Leader election, exactly-once triggers, and DAG dependencies.', interactive: true },
  { slug: 'metrics-monitoring', title: 'Design Metrics & Monitoring System (Prometheus)', desc: 'Pull metrics scraper, Gorilla XOR TSDB compression, and rollup downsampling.', interactive: true },
  { slug: 'distributed-message-queue', title: 'Design Distributed Message Queue (Kafka)', desc: 'Partitioned commit logs, consumer groups, OS zero-copy (sendfile), and ISR replicas.', interactive: true },
  { slug: 'ad-click-aggregation', title: 'Design an Ad Click Aggregation System', desc: 'Streaming aggregation, HyperLogLog counting, and fraud dedup.', interactive: true },
  { slug: 'distributed-lock-service', title: 'Design a Distributed Lock Service', desc: 'Leases, fencing tokens, and consensus-backed mutual exclusion.', interactive: true },
];

const LLD_PROJECTS = [
  { slug: 'parking-lot', title: 'Parking Lot Design', patterns: 'Singleton, Factory, Command', diagram: true },
  { slug: 'cache-system', title: 'In-Memory Cache (LRU/LFU)', patterns: 'Strategy, Doubly Linked List', diagram: true },
  { slug: 'rate-limiter', title: 'Distributed Rate Limiter', patterns: 'Token Bucket, Sliding Log', diagram: true },
  { slug: 'elevator-system', title: 'Elevator Control System', patterns: 'State, Strategy, Dispatcher', diagram: false },
  { slug: 'splitwise', title: 'Expense Sharing (Splitwise)', patterns: 'Composite, Observer, Simplification', diagram: false },
  { slug: 'bookmyshow', title: 'Movie Ticket Booking', patterns: 'Concurrency Locks, Strategy', diagram: false },
];

const HLD_TOPICS = [
  { title: 'Scaling Fundamentals', slug: '01-introduction-to-hld' },
  { title: 'Capacity Estimation', slug: '03-capacity-estimation' },
  { title: 'Load Balancers', slug: '05-load-balancers' },
  { title: 'API Gateways', slug: '06-api-gateway' },
  { title: 'Caching Strategies', slug: '07-caching-strategies' },
  { title: 'Database Selection', slug: '08-database-selection' },
  { title: 'Message Queues', slug: '09-message-queues' },
  { title: 'CDN Architectures', slug: '11-cdn-design' },
];

export default function SystemDesignHub() {
  const [activeTab, setActiveTab] = useState('case-studies');

  const base = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';

  return (
    <div className="sys-hub-container font-sketch max-w-6xl mx-auto px-4 py-8">
      {/* Redesigned Chalkboard Hero Header Section */}
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl mb-10 border-2 border-[var(--sketch-border)] shadow-2xl relative font-sketch">
        {/* Top Control & Quick Launcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--sketch-border)] mb-6">
          <div className="flex items-center gap-2">
            <span className="sketch-border-soft px-3 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              ⚡ ARCHITECTURE & SYSTEM DESIGN HUB
            </span>
          </div>

          {/* Quick Case Launcher Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="hub-case-select" className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider hidden sm:inline">
              🚀 Launch Visualizer:
            </label>
            <select
              id="hub-case-select"
              onChange={(e) => {
                if (e.target.value) {
                  const targetSlug = e.target.value;
                  window.location.href = targetSlug === 'url-shortener'
                    ? `${base}/system-design/url-shortener`
                    : `${base}/system-design/url-shortener?case=${targetSlug}`;
                }
              }}
              defaultValue=""
              className="sketch-button bg-[var(--sketch-bg)] text-[var(--sketch-text)] text-xs md:text-sm font-bold font-sketch border-2 border-[var(--sketch-border)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer shadow-md"
            >
              <option value="" disabled>Choose a Case Study (25)...</option>
              {CASE_STUDIES.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-slate-900 text-slate-100">
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="font-header font-bold text-3xl md:text-5xl text-[var(--sketch-text)] mb-3 leading-tight">
            System Design Studio & Interactive Visualizers
          </h1>
          <p className="text-[var(--sketch-text-muted)] text-sm md:text-base leading-relaxed font-sketch">
            Master High-Level Design (HLD) and Low-Level Design (LLD) from single-server monoliths to global-scale distributed systems handling billions of users.
          </p>
        </div>

        {/* Featured Brand Icon Launchpad Pills */}
        <div className="mb-6 pt-2">
          <div className="text-center text-xs font-mono font-bold text-[var(--sketch-text-muted)] uppercase tracking-wider mb-3">
            🔥 Featured Interactive Architectures
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {[
              { slug: 'whatsapp', name: 'WhatsApp' },
              { slug: 'youtube', name: 'YouTube' },
              { slug: 'uber', name: 'Uber' },
              { slug: 'tiktok', name: 'TikTok/Reels' },
              { slug: 'discord', name: 'Discord/Slack' },
              { slug: 'airbnb', name: 'Airbnb' },
              { slug: 'url-shortener', name: 'TinyURL' },
              { slug: 'rate-limiter', name: 'Rate Limiter' },
              { slug: 'web-crawler', name: 'Googlebot' },
              { slug: 'distributed-message-queue', name: 'Kafka Queue' },
            ].map((item) => (
              <a
                key={item.slug}
                href={item.slug === 'url-shortener'
                  ? `${base}/system-design/url-shortener`
                  : `${base}/system-design/url-shortener?case=${item.slug}`
                }
                className="sketch-button group inline-flex items-center gap-2 text-xs font-bold text-[var(--sketch-text)] bg-[var(--sketch-bg)] hover:bg-amber-500/10 hover:border-amber-500 px-3 py-1.5 rounded-xl border border-[var(--sketch-border)] transition-all shadow-sm"
              >
                <BrandIcon slug={item.slug} size={18} />
                <span className="group-hover:text-amber-400 font-sketch">{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[var(--sketch-border)] max-w-4xl mx-auto">
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-amber-500 block">25</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">Interactive Diagrams</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-emerald-400 block">20</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">HLD Written Guides</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-cyan-400 block">15</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">LLD Machine Coding</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-rose-400 block">100%</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">Free & Hands-On</span>
          </div>
        </div>
      </section>

      {/* Chalkboard Mode Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 font-sketch">
        <button 
          className={`sketch-button text-base font-bold flex items-center gap-2 transition-all ${activeTab === 'case-studies' ? 'bg-amber-500/20 border-amber-500 text-amber-500 shadow-lg' : ''}`}
          onClick={() => setActiveTab('case-studies')}
        >
          <span>📂</span> Case Studies
        </button>
        <button 
          className={`sketch-button text-base font-bold flex items-center gap-2 transition-all ${activeTab === 'calculator' ? 'bg-amber-500/20 border-amber-500 text-amber-500 shadow-lg' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <span>🧮</span> Capacity Calculator
        </button>
        <button 
          className={`sketch-button text-base font-bold flex items-center gap-2 transition-all ${activeTab === 'lld' ? 'bg-amber-500/20 border-amber-500 text-amber-500 shadow-lg' : ''}`}
          onClick={() => setActiveTab('lld')}
        >
          <span>⚙️</span> LLD / OOP Design
        </button>
        <button 
          className={`sketch-button text-base font-bold flex items-center gap-2 transition-all ${activeTab === 'advisor' ? 'bg-amber-500/20 border-amber-500 text-amber-500 shadow-lg' : ''}`}
          onClick={() => setActiveTab('advisor')}
        >
          <span>🤖</span> DB Advisor
        </button>
      </div>

      {/* Tab Panels */}
      <div className="sys-hub-content mb-16">
        {/* PANEL: Case Studies */}
        {activeTab === 'case-studies' && (
          <div className="sys-hub-panel space-y-8">
            <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl border-2 border-[var(--sketch-border)]">
              <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)] mb-1">Architectural Case Studies</h2>
              <p className="text-[var(--sketch-text-muted)] text-sm font-sketch">Step-by-step scaling patterns from real-world products.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CASE_STUDIES.map((c) => (
                <div key={c.slug} className="sketch-panel-box sketch-border group flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl bg-[var(--sketch-bg-dim)] cursor-pointer">
                  <div>
                    {c.interactive && (
                      <span className="inline-block sketch-border-soft px-3 py-1 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full mb-3 animate-pulse">
                        ⚡ Interactive Visualizer
                      </span>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <BrandIcon slug={c.slug} size={28} />
                      <h3 className="font-header font-bold text-xl text-[var(--sketch-text)] group-hover:text-amber-500 transition-colors">
                        {c.title}
                      </h3>
                    </div>
                    <p className="text-[var(--sketch-text-muted)] text-sm leading-relaxed mb-6 font-sketch">
                      {c.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[var(--sketch-border)]">
                    {c.interactive ? (
                      <a 
                        href={c.slug === 'url-shortener' 
                          ? `${base}/system-design/url-shortener` 
                          : `${base}/system-design/url-shortener?case=${c.slug}`
                        } 
                        className="sketch-button flex items-center justify-center gap-2 text-sm font-bold text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 w-full text-center"
                      >
                        Launch Visualizer →
                      </a>
                    ) : (
                      <a href={`${base}/system-design/11-case-studies/design-${c.slug}`} className="sketch-button flex items-center justify-center gap-2 text-sm font-bold w-full text-center">
                        Read Guide
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick HLD Course Links */}
            <div className="sketch-border bg-[var(--sketch-bg-dim)] p-8 rounded-2xl border-2 border-[var(--sketch-border)] shadow-xl">
              <h3 className="font-header font-bold text-2xl text-[var(--sketch-text)] mb-2 flex items-center gap-2">
                <span>📚</span> HLD Fundamentals Course
              </h3>
              <p className="text-[var(--sketch-text-muted)] text-sm mb-6 font-sketch">Master the building blocks of distributed systems before diving into case studies.</p>
              <div className="flex flex-wrap gap-3">
                {HLD_TOPICS.map((topic, i) => (
                  <a key={i} href={`${base}/hld/${topic.slug}`} className="sketch-button text-sm font-bold text-[var(--sketch-text)] hover:text-amber-500 hover:border-amber-500">
                    {topic.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PANEL: Calculator */}
        {activeTab === 'calculator' && (
          <div className="sys-hub-panel space-y-8">
            <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl border-2 border-[var(--sketch-border)]">
              <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)] mb-1">Back-of-the-Envelope Calculator</h2>
              <p className="text-[var(--sketch-text-muted)] text-sm font-sketch">Estimate QPS, bandwidth, and database storage needs in seconds.</p>
            </div>
            <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl border-2 border-[var(--sketch-border)] shadow-xl">
              <EstimationCalculator />
            </div>

            {/* Quick Cheat Sheet / Reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Latency */}
              <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl border-2 border-[var(--sketch-border)]">
                <h4 className="font-header font-bold text-lg text-amber-500 mb-4 flex items-center gap-2">
                  ⏱️ Latencies Engineers Should Know
                </h4>
                <div className="overflow-x-auto font-mono text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--sketch-border)] text-[var(--sketch-text-muted)]">
                        <th className="pb-2">Operation</th>
                        <th className="pb-2">Latency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--sketch-border)] text-[var(--sketch-text)]">
                      <tr><td className="py-2">L1 Cache reference</td><td className="text-amber-400 font-bold">0.5 ns</td></tr>
                      <tr><td className="py-2">L2 Cache reference</td><td className="text-amber-400 font-bold">7 ns</td></tr>
                      <tr><td className="py-2">Main memory reference</td><td className="text-amber-400 font-bold">100 ns</td></tr>
                      <tr><td className="py-2">Send 2KB over 1 Gbps network</td><td className="text-amber-400 font-bold">20 µs</td></tr>
                      <tr><td className="py-2">Read 1MB sequentially from SSD</td><td className="text-amber-400 font-bold">1 ms</td></tr>
                      <tr><td className="py-2">Disk seek (HDD)</td><td className="text-amber-400 font-bold">10 ms</td></tr>
                      <tr><td className="py-2">Round trip within same DC</td><td className="text-amber-400 font-bold">500 µs</td></tr>
                      <tr><td className="py-2">WAN Round trip (SF to NY)</td><td className="text-amber-400 font-bold">45 ms</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card 2: SLA */}
              <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl border-2 border-[var(--sketch-border)]">
                <h4 className="font-header font-bold text-lg text-amber-500 mb-4 flex items-center gap-2">
                  🎯 SLA / Availability Limits
                </h4>
                <div className="overflow-x-auto font-mono text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--sketch-border)] text-[var(--sketch-text-muted)]">
                        <th className="pb-2">SLA %</th>
                        <th className="pb-2">Downtime/Year</th>
                        <th className="pb-2">Downtime/Day</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--sketch-border)] text-[var(--sketch-text)]">
                      <tr><td className="py-2 font-bold">99%</td><td>3.65 days</td><td>14.4 mins</td></tr>
                      <tr><td className="py-2 font-bold">99.9%</td><td>8.77 hours</td><td>1.44 mins</td></tr>
                      <tr><td className="py-2 font-bold text-emerald-400">99.99%</td><td className="text-emerald-400">52.56 mins</td><td className="text-emerald-400">8.6 secs</td></tr>
                      <tr><td className="py-2 font-bold text-amber-400">99.999%</td><td className="text-amber-400">5.26 mins</td><td className="text-amber-400">864 ms</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: LLD */}
        {activeTab === 'lld' && (
          <div className="sys-hub-panel space-y-8">
            <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl border-2 border-[var(--sketch-border)]">
              <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)] mb-1">Low-Level & Object-Oriented Design</h2>
              <p className="text-[var(--sketch-text-muted)] text-sm font-sketch">Master machine coding, SOLID principles, and object-oriented design patterns.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LLD_PROJECTS.map((p) => (
                <div key={p.slug} className="sketch-panel-box sketch-border group flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl bg-[var(--sketch-bg-dim)] cursor-pointer">
                  <div>
                    {p.diagram && (
                      <span className="inline-block sketch-border-soft px-3 py-1 text-[10px] font-mono font-bold bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40 rounded-full mb-3">
                        UML Class Schema
                      </span>
                    )}
                    <h3 className="font-header font-bold text-xl text-[var(--sketch-text)] group-hover:text-amber-500 transition-colors mb-2">
                      {p.title}
                    </h3>
                    <p className="text-[var(--sketch-text-muted)] text-sm font-sketch mb-4">
                      Patterns: <code className="font-mono text-amber-400">{p.patterns}</code>
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[var(--sketch-border)]">
                    {p.diagram ? (
                      <a href={`${base}/lld/projects/design-${p.slug}`} className="sketch-button flex items-center justify-center gap-2 text-sm font-bold text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 w-full text-center">
                        View Class Schema →
                      </a>
                    ) : (
                      <a href={`${base}/lld/projects/design-${p.slug}`} className="sketch-button flex items-center justify-center gap-2 text-sm font-bold w-full text-center">
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* LLD theory links */}
            <div className="sketch-border bg-[var(--sketch-bg-dim)] p-8 rounded-2xl border-2 border-[var(--sketch-border)] shadow-xl">
              <h3 className="font-header font-bold text-2xl text-[var(--sketch-text)] mb-2 flex items-center gap-2">
                <span>🛠️</span> LLD & OOP Principles
              </h3>
              <div className="flex flex-wrap gap-3">
                <a href={`${base}/lld/01-oop-fundamentals`} className="sketch-button text-sm font-bold">OOP Fundamentals</a>
                <a href={`${base}/lld/02-solid-principles`} className="sketch-button text-sm font-bold">SOLID Principles</a>
                <a href={`${base}/lld/04-class-diagrams`} className="sketch-button text-sm font-bold">Class Diagrams (UML)</a>
                <a href={`${base}/lld/05-object-relationships`} className="sketch-button text-sm font-bold">Object Relationships</a>
                <a href={`${base}/lld/07-dependency-injection`} className="sketch-button text-sm font-bold">Dependency Injection</a>
                <a href={`${base}/lld/09-machine-coding-approach`} className="sketch-button text-sm font-bold">Machine Coding Strategy</a>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: Advisor */}
        {activeTab === 'advisor' && (
          <div className="sys-hub-panel space-y-8">
            <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl border-2 border-[var(--sketch-border)]">
              <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)] mb-1">Interactive Database Advisor</h2>
              <p className="text-[var(--sketch-text-muted)] text-sm font-sketch">Determine the optimal database technology for your application requirements.</p>
            </div>
            <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl border-2 border-[var(--sketch-border)] shadow-xl">
              <DatabaseAdvisor />
            </div>
          </div>
        )}
      </div>

      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-2xl font-sketch shadow-xl mt-16 max-w-6xl mx-auto mb-10">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏗️</span>
              <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                System Design Studio
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-sm max-w-2xl leading-relaxed font-sketch">
              Master High-Level & Low-Level System Design for FAANG & top tech companies with interactive diagram visualizers, estimation tools, and case studies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-button flex items-center gap-2 text-sm font-bold bg-amber-500/20 border-amber-500"
            >
              <span>⭐ Star on GitHub</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="sketch-button flex items-center gap-1.5 text-sm font-bold"
              title="Back to top"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        {/* 4-Column Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[var(--sketch-border)]">
          {/* Column 1: HLD Case Studies */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>📐</span> HLD Case Studies
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}/system-design/url-shortener`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> TinyURL Shortener
                </a>
              </li>
              <li>
                <a href={`${base}/system-design/url-shortener?case=uber`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Uber Ride Matching
                </a>
              </li>
              <li>
                <a href={`${base}/system-design/url-shortener?case=whatsapp`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> WhatsApp Chat Service
                </a>
              </li>
              <li>
                <a href={`${base}/system-design/11-case-studies/design-video-streaming`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> YouTube Streaming
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: LLD Projects */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>⚙️</span> LLD Machine Coding
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
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
              <li>
                <a href={`${base}/lld/02-solid-principles`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> SOLID Principles
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Interactive Tools */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🧮</span> Design Tools
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5 text-left">
                  <span>•</span> Capacity Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('advisor')} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5 text-left">
                  <span>•</span> DB Advisor Tool
                </button>
              </li>
              <li>
                <a href={`${base}/hld/03-capacity-estimation`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Estimation Sheet
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🚀</span> Explore Hubs
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
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
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--sketch-text-muted)]">
          <div>
            © {new Date().getFullYear()} System Design Studio · Hand-crafted Blackboard UI.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              HLD & LLD Modules Loaded
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
