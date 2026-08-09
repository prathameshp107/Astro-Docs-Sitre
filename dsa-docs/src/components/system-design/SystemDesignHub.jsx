import { useState, useEffect, useMemo } from 'react';
import EstimationCalculator from './EstimationCalculator';
import DatabaseAdvisor from './DatabaseAdvisor';
import BrandIcon from './BrandIcon.jsx';
import { CategoryIcon } from '../mcq/CategoryIcons.jsx';
import { CASE_STUDIES, DIFFICULTY_COLORS, WRITTEN_GUIDES_COUNT, TOPICS, DIFFICULTY_XP } from '../../data/system-design/caseStudies.js';
import '../../styles/sketch-visualizer.css';

const PROGRESS_KEY = 'system-design-progress-v1';

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || [];
  } catch {
    return [];
  }
}

function caseStudyHref(base, c) {
  return c.interactive
    ? `${base}/system-design/case/${c.slug}`
    : `${base}/system-design/11-case-studies/design-${c.slug}`;
}

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
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');
  const [sortBy, setSortBy] = useState('path'); // 'path' | 'difficulty' | 'alpha'
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setCompleted(readProgress());
  }, []);

  const toggleCompleted = (slug) => {
    setCompleted((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const interactiveCount = useMemo(() => CASE_STUDIES.filter((c) => c.interactive).length, []);

  const totalXP = useMemo(() => {
    return completed.reduce((sum, slug) => {
      const c = CASE_STUDIES.find((cs) => cs.slug === slug);
      return sum + (c ? DIFFICULTY_XP[c.difficulty] || 0 : 0);
    }, 0);
  }, [completed]);

  const DIFFICULTY_ORDER = { Easy: 0, Medium: 1, Hard: 2 };

  const filteredCaseStudies = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = CASE_STUDIES.filter((c) => {
      const matchesQuery = !q
        || c.title.toLowerCase().includes(q)
        || c.desc.toLowerCase().includes(q)
        || (c.companies || []).some((co) => co.toLowerCase().includes(q));
      const matchesDifficulty = difficultyFilter === 'All' || c.difficulty === difficultyFilter;
      const matchesTopic = topicFilter === 'All' || (c.topics || []).includes(topicFilter);
      return matchesQuery && matchesDifficulty && matchesTopic;
    });

    const sorted = [...filtered];
    if (sortBy === 'alpha') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'difficulty') {
      sorted.sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] || a.title.localeCompare(b.title));
    } else {
      // 'path': curated learning order first, then the rest by difficulty
      sorted.sort((a, b) => {
        const ao = a.recommendedOrder ?? Infinity;
        const bo = b.recommendedOrder ?? Infinity;
        if (ao !== bo) return ao - bo;
        return DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] || a.title.localeCompare(b.title);
      });
    }
    return sorted;
  }, [search, difficultyFilter, topicFilter, sortBy]);

  const base = (import.meta.env.BASE_URL && import.meta.env.BASE_URL !== '/')
    ? import.meta.env.BASE_URL.replace(/\/$/, '')
    : '/DSA-Notes-Problems';

  return (
    <div className="sys-hub-container font-sketch max-w-6xl mx-auto px-4 py-8">
      {/* Top Cross-Hub Navigation Header (Outside & Above Hero Section) */}
      <nav className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--sketch-border)]">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`${base}/system-design`}
            className="sketch-button flex items-center gap-1.5 text-xs font-bold text-amber-400 border-amber-500/50 bg-amber-500/10 py-1.5 px-3.5 rounded-xl shadow-sm"
          >
            🏗️ System Design (HLD)
          </a>
          <a
            href={`${base}/lld`}
            className="sketch-button flex items-center gap-1.5 text-xs font-bold text-[var(--sketch-text-muted)] hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 py-1.5 px-3.5 rounded-xl transition-all"
          >
            ⚙️ Low-Level (LLD Hub) →
          </a>
          <a
            href={`${base}/ood`}
            className="sketch-button flex items-center gap-1.5 text-xs font-bold text-[var(--sketch-text-muted)] hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 py-1.5 px-3.5 rounded-xl transition-all"
          >
            🧩 Object-Oriented (OOD Hub) →
          </a>
        </div>

        <span className="sketch-border-soft px-3 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          ⚡ ARCHITECTURE & SYSTEM DESIGN HUB
        </span>
      </nav>

      {/* Redesigned Chalkboard Hero Header Section */}
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl mb-10 border-2 border-[var(--sketch-border)] shadow-2xl relative font-sketch">
        {/* Top Control & Quick Launcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--sketch-border)] mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[var(--sketch-text-muted)]">
              Interactive System Architecture Studio
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
                  window.location.href = `${base}/system-design/case/${e.target.value}`;
                }
              }}
              defaultValue=""
              className="sketch-button bg-[var(--sketch-bg)] text-[var(--sketch-text)] text-xs md:text-sm font-bold font-sketch border-2 border-[var(--sketch-border)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer shadow-md"
            >
              <option value="" disabled>Choose a Case Study ({interactiveCount})...</option>
              {CASE_STUDIES.filter((c) => c.interactive).map((c) => (
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
              { slug: 'chat-system', icon: 'whatsapp', name: 'WhatsApp' },
              { slug: 'video-streaming', icon: 'youtube', name: 'YouTube' },
              { slug: 'ride-sharing', icon: 'uber', name: 'Uber' },
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
                href={`${base}/system-design/case/${item.slug}`}
                className="sketch-button group inline-flex items-center gap-2 text-xs font-bold text-[var(--sketch-text)] bg-[var(--sketch-bg)] hover:bg-amber-500/10 hover:border-amber-500 px-3 py-1.5 rounded-xl border border-[var(--sketch-border)] transition-all shadow-sm"
              >
                <BrandIcon slug={item.icon || item.slug} size={18} />
                <span className="group-hover:text-amber-400 font-sketch">{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[var(--sketch-border)] max-w-4xl mx-auto">
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-amber-500 block">{interactiveCount}</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">Interactive Diagrams</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-emerald-400 block">{WRITTEN_GUIDES_COUNT}</span>
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

      {/* Chalkboard Mode Tabs & Standalone Hub Links */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 font-sketch">
        <button 
          className={`sketch-button text-base font-bold flex items-center gap-2 transition-all ${activeTab === 'case-studies' ? 'bg-amber-500/20 border-amber-500 text-amber-500 shadow-lg' : ''}`}
          onClick={() => setActiveTab('case-studies')}
        >
          <span>📂</span> HLD Case Studies
        </button>
        <a 
          href={`${base}/lld`}
          className="sketch-button text-base font-bold flex items-center gap-2 text-emerald-400 border-emerald-500/60 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all shadow-md"
        >
          <span>⚙️</span> Low-Level Design Hub (LLD) →
        </a>
        <a 
          href={`${base}/ood`}
          className="sketch-button text-base font-bold flex items-center gap-2 text-cyan-400 border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all shadow-md"
        >
          <span>🧩</span> Object-Oriented Design (OOD) →
        </a>
        <button 
          className={`sketch-button text-base font-bold flex items-center gap-2 transition-all ${activeTab === 'calculator' ? 'bg-amber-500/20 border-amber-500 text-amber-500 shadow-lg' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <span>🧮</span> Capacity Calculator
        </button>
        <button 
          className={`sketch-button text-base font-bold flex items-center gap-2 transition-all ${activeTab === 'advisor' ? 'bg-amber-500/20 border-amber-500 text-amber-500 shadow-lg' : ''}`}
          onClick={() => setActiveTab('advisor')}
        >
          <span>🤖</span> DB Advisor
        </button>
      </div>

      {/* Tab Panels */}
      <div id="case-studies" className="sys-hub-content mb-16">
        {/* PANEL: Case Studies */}
        {activeTab === 'case-studies' && (
          <div className="sys-hub-panel space-y-8">
            <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl border-2 border-[var(--sketch-border)]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-1">
                <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)]">Architectural Case Studies</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                    ✅ {completed.length} / {CASE_STUDIES.length} completed
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                    🏆 {totalXP} XP
                  </span>
                </div>
              </div>
              <p className="text-[var(--sketch-text-muted)] text-sm font-sketch">Step-by-step scaling patterns from real-world products.</p>
            </div>

            {/* Search & Difficulty Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="case-search" className="sr-only">Search case studies</label>
              <input
                id="case-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={'🔍 Search by name, technique, or company (e.g. "Uber", "CRDT")...'}
                className="flex-1 min-w-[220px] sketch-button bg-[var(--sketch-bg)] text-[var(--sketch-text)] text-sm font-sketch border-2 border-[var(--sketch-border)] rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
              />
              <div className="flex items-center gap-2" role="group" aria-label="Filter by difficulty">
                {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficultyFilter(d)}
                    aria-pressed={difficultyFilter === d}
                    className={`sketch-button text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
                      difficultyFilter === d
                        ? d === 'All'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                          : `${DIFFICULTY_COLORS[d].bg} ${DIFFICULTY_COLORS[d].border} ${DIFFICULTY_COLORS[d].text}`
                        : ''
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Filter & Sort Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 -mt-2">
              <div className="flex items-center gap-2">
                <label htmlFor="topic-filter" className="text-xs font-mono font-bold text-[var(--sketch-text-muted)] uppercase tracking-wider">
                  Technique:
                </label>
                <select
                  id="topic-filter"
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="sketch-button bg-[var(--sketch-bg)] text-[var(--sketch-text)] text-xs font-bold border-2 border-[var(--sketch-border)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer capitalize"
                >
                  <option value="All">All Techniques</option>
                  {TOPICS.map((t) => (
                    <option key={t} value={t} className="bg-slate-900 text-slate-100">{t.replace(/-/g, ' ')}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-xs font-mono font-bold text-[var(--sketch-text-muted)] uppercase tracking-wider">
                  Sort:
                </label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sketch-button bg-[var(--sketch-bg)] text-[var(--sketch-text)] text-xs font-bold border-2 border-[var(--sketch-border)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="path">🎓 Suggested Learning Path</option>
                  <option value="difficulty">Difficulty (Easy → Hard)</option>
                  <option value="alpha">Alphabetical (A → Z)</option>
                </select>
              </div>
            </div>

            <p className="text-xs font-mono text-[var(--sketch-text-muted)] -mt-4">
              Showing {filteredCaseStudies.length} of {CASE_STUDIES.length} case studies
              {sortBy === 'path' && ' — numbered badges below mark the curated 1-12 starter path'}
            </p>

            {filteredCaseStudies.length === 0 ? (
              <div className="sketch-border bg-[var(--sketch-bg-dim)] p-10 rounded-2xl border-2 border-[var(--sketch-border)] text-center">
                <p className="text-[var(--sketch-text-muted)] text-sm">No case studies match "{search}". Try a different search or difficulty filter.</p>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((c) => {
                const diff = DIFFICULTY_COLORS[c.difficulty] || DIFFICULTY_COLORS.Medium;
                const isDone = completed.includes(c.slug);
                return (
                <div key={c.slug} className={`sketch-panel-box sketch-border group flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl bg-[var(--sketch-bg-dim)] cursor-pointer relative ${isDone ? 'ring-2 ring-emerald-500/40' : ''}`}>
                  <button
                    onClick={() => toggleCompleted(c.slug)}
                    title={isDone ? 'Mark as unread' : 'Mark as read'}
                    aria-label={isDone ? `Mark ${c.title} as unread` : `Mark ${c.title} as read`}
                    aria-pressed={isDone}
                    className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      isDone
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-[var(--sketch-bg)] border-[var(--sketch-border)] text-[var(--sketch-text-muted)] hover:border-emerald-500 hover:text-emerald-400'
                    }`}
                  >
                    {isDone ? '✓' : ''}
                  </button>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3 pr-8">
                      {c.recommendedOrder && (
                        <span className="inline-flex items-center justify-center w-6 h-6 text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-full" title="Suggested learning path step">
                          {c.recommendedOrder}
                        </span>
                      )}
                      {c.interactive && (
                        <span className="inline-block sketch-border-soft px-3 py-1 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full animate-pulse">
                          ⚡ Interactive
                        </span>
                      )}
                      <span className={`inline-block sketch-border-soft px-3 py-1 text-[10px] font-mono font-bold rounded-full ${diff.bg} ${diff.border} ${diff.text}`}>
                        {c.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <BrandIcon slug={c.slug} size={28} />
                      <h3 className="font-header font-bold text-xl text-[var(--sketch-text)] group-hover:text-amber-500 transition-colors">
                        {c.title}
                      </h3>
                    </div>
                    <p className="text-[var(--sketch-text-muted)] text-sm leading-relaxed mb-3 font-sketch">
                      {c.desc}
                    </p>
                    {c.topics && c.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {c.topics.map((t) => (
                          <button
                            key={t}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTopicFilter(t); }}
                            className="text-[9px] font-mono font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[var(--sketch-bg)] border border-[var(--sketch-border)] text-[var(--sketch-text-muted)] hover:border-cyan-500 hover:text-cyan-400 transition-colors capitalize"
                          >
                            {t.replace(/-/g, ' ')}
                          </button>
                        ))}
                      </div>
                    )}
                    {c.companies && c.companies.length > 0 && (
                      <p className="text-[10px] font-mono text-[var(--sketch-text-muted)] mb-4">
                        Real-world parallel: <span className="text-cyan-400">{c.companies.join(', ')}</span>
                      </p>
                    )}
                  </div>
                  <div className="pt-4 border-t border-[var(--sketch-border)]">
                    {c.interactive ? (
                      <a
                        href={caseStudyHref(base, c)}
                        className="sketch-button flex items-center justify-center gap-2 text-sm font-bold text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 w-full text-center"
                      >
                        Launch Visualizer →
                      </a>
                    ) : (
                      <a href={caseStudyHref(base, c)} className="sketch-button flex items-center justify-center gap-2 text-sm font-bold w-full text-center">
                        Read Guide
                      </a>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
            )}

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
                <a href={`${base}/system-design/case/url-shortener`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> TinyURL Shortener
                </a>
              </li>
              <li>
                <a href={`${base}/system-design/case/ride-sharing`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Uber Ride Matching
                </a>
              </li>
              <li>
                <a href={`${base}/system-design/case/chat-system`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> WhatsApp Chat Service
                </a>
              </li>
              <li>
                <a href={`${base}/system-design/case/video-streaming`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
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
