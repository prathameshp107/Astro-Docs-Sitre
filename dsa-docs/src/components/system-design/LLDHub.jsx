import React, { useState, useMemo } from 'react';
import BrandIcon from './BrandIcon.jsx';
import '../../styles/sketch-visualizer.css';

const LLD_PROJECTS = [
  {
    slug: 'parking-lot',
    title: 'Design a Parking Lot System',
    category: 'Infrastructure LLD',
    difficulty: 'Medium',
    patterns: ['Singleton', 'Factory', 'Strategy', 'Observer'],
    desc: 'Multi-floor parking lot supporting different vehicle types (Compact, SUV, EV, Motorcycle), automated billing, and spot allocation strategies.',
    keyEntities: ['ParkingLot', 'ParkingFloor', 'ParkingSpot', 'Vehicle', 'Ticket', 'PaymentGate'],
    docLink: '/lld/projects/design-parking-lot',
  },
  {
    slug: 'cache-system',
    title: 'Design an In-Memory Cache (LRU/LFU)',
    category: 'Infrastructure LLD',
    difficulty: 'Hard',
    patterns: ['Strategy', 'Doubly LinkedList', 'HashMap', 'ReadWriteLock'],
    desc: 'High-concurrency in-memory Key-Value cache with configurable eviction policies (LRU, LFU, FIFO) and thread-safe operations.',
    keyEntities: ['Cache', 'EvictionPolicy', 'DoublyLinkedList', 'Node', 'ConcurrentHashMap'],
    docLink: '/lld/projects/design-cache-system',
  },
  {
    slug: 'rate-limiter',
    title: 'Design a Distributed Rate Limiter',
    category: 'Infrastructure LLD',
    difficulty: 'Hard',
    patterns: ['Token Bucket', 'Sliding Window Log', 'Decorator'],
    desc: 'Rate limiting library for API endpoints supporting Token Bucket and Leaky Bucket algorithms with sub-millisecond thread safety.',
    keyEntities: ['RateLimiter', 'TokenBucket', 'SlidingWindow', 'RequestRules'],
    docLink: '/lld/projects/design-rate-limiter',
  },
  {
    slug: 'elevator-system',
    title: 'Design an Elevator Control System',
    category: 'Machine Coding',
    difficulty: 'Medium',
    patterns: ['State', 'Strategy', 'Dispatcher', 'Observer'],
    desc: 'Multi-elevator scheduling algorithm handling internal/external requests, floor direction states, and dispatching strategies (LOOK/SCAN).',
    keyEntities: ['ElevatorController', 'ElevatorCar', 'InternalButton', 'ExternalButton', 'DispatchStrategy'],
    docLink: '/lld/projects/design-elevator-system',
  },
  {
    slug: 'splitwise',
    title: 'Design Expense Sharing (Splitwise)',
    category: 'Financial/Booking',
    difficulty: 'Medium',
    patterns: ['Composite', 'Observer', 'Min-Cost Graph Flow'],
    desc: 'Group expense tracking system supporting exact amounts, percentages, and bill simplification algorithms to minimize net transactions.',
    keyEntities: ['User', 'Group', 'Expense', 'Split', 'BalanceSheet', 'SimplificationEngine'],
    docLink: '/lld/projects/design-splitwise',
  },
  {
    slug: 'bookmyshow',
    title: 'Design Movie Ticket Booking (BookMyShow)',
    category: 'Financial/Booking',
    difficulty: 'Hard',
    patterns: ['Command', 'Concurrency Locks', 'Factory', 'State'],
    desc: 'Cinema ticketing platform supporting theater layouts, seat reservation holds, concurrent booking locks, and payment timeouts.',
    keyEntities: ['Cinema', 'Screen', 'Seat', 'Show', 'Booking', 'PaymentProcessor'],
    docLink: '/lld/projects/design-bookmyshow',
  },
  {
    slug: 'snake-and-ladder',
    title: 'Design Snake and Ladder Game',
    category: 'Game Systems',
    difficulty: 'Easy',
    patterns: ['Command', 'Singleton', 'Strategy'],
    desc: 'Multiplayer board game supporting customizable board sizes, multiple dice, snakes, ladders, and win condition evaluation.',
    keyEntities: ['Board', 'Cell', 'Snake', 'Ladder', 'Dice', 'Player', 'GameEngine'],
    docLink: '/lld/projects/design-snake-and-ladder',
  },
  {
    slug: 'tic-tac-toe',
    title: 'Design Tic-Tac-Toe Game (N x N)',
    category: 'Game Systems',
    difficulty: 'Easy',
    patterns: ['Strategy', 'Observer', 'State'],
    desc: 'Scalable N x N Tic-Tac-Toe supporting dynamic board size, win evaluation in O(1) time per move, and bot players.',
    keyEntities: ['Board', 'Piece (X/O)', 'Player', 'Game', 'WinConditionChecker'],
    docLink: '/lld/projects/design-tic-tac-toe',
  },
  {
    slug: 'vending-machine',
    title: 'Design a Vending Machine',
    category: 'Machine Coding',
    difficulty: 'Medium',
    patterns: ['State Pattern', 'Chain of Responsibility', 'Inventory'],
    desc: 'State-driven vending machine handling Ready, Idle, CoinInserted, Dispensing, and OutOfStock state transitions cleanly.',
    keyEntities: ['VendingMachine', 'State', 'Inventory', 'Item', 'Coin', 'ChangeCalculator'],
    docLink: '/lld/projects/design-vending-machine',
  },
  {
    slug: 'atm',
    title: 'Design an ATM System',
    category: 'Financial/Booking',
    difficulty: 'Medium',
    patterns: ['State', 'Chain of Responsibility', 'Decorator'],
    desc: 'ATM banking interface with cash dispenser chain of responsibility ($100, $50, $20 notes), PIN authentication, and card reader.',
    keyEntities: ['ATM', 'Card', 'Account', 'CashDispenser', 'Transaction', 'BankServer'],
    docLink: '/lld/projects/design-atm',
  },
  {
    slug: 'chess-game',
    title: 'Design a Chess Game',
    category: 'Game Systems',
    difficulty: 'Hard',
    patterns: ['Command', 'Factory', 'Strategy', 'Observer'],
    desc: 'Object-oriented Chess game with Piece movement validation (Pawn, Knight, Rook, Queen, King), Check/Checkmate logic, and move undo history.',
    keyEntities: ['ChessBoard', 'Piece', 'Move', 'Player', 'GameStatus', 'MoveHistory'],
    docLink: '/lld/projects/design-chess-game',
  },
  {
    slug: 'hotel-management',
    title: 'Design Hotel Room Management System',
    category: 'Financial/Booking',
    difficulty: 'Medium',
    patterns: ['Factory', 'State', 'Strategy'],
    desc: 'Hotel booking platform managing room types (Deluxe, Suite), housekeeping status, guest reservations, and checkout invoicing.',
    keyEntities: ['Hotel', 'Room', 'Guest', 'Reservation', 'Invoice', 'HousekeepingState'],
    docLink: '/lld/projects/design-hotel-management',
  },
  {
    slug: 'library-management',
    title: 'Design Library Management System',
    category: 'Infrastructure LLD',
    difficulty: 'Easy',
    patterns: ['Observer', 'Factory', 'Strategy'],
    desc: 'Book inventory management supporting barcode scanning, member reservations, fine calculations, and overdue notifications.',
    keyEntities: ['Library', 'Book', 'BookItem', 'Member', 'Librarian', 'FineCalculator'],
    docLink: '/lld/projects/design-library-management',
  },
  {
    slug: 'logging-framework',
    title: 'Design a Custom Logging Framework',
    category: 'Infrastructure LLD',
    difficulty: 'Medium',
    patterns: ['Chain of Responsibility', 'Singleton', 'Adapter'],
    desc: 'Logger framework supporting log levels (DEBUG, INFO, ERROR), chain of handlers (Console, File, Cloud), and async buffer flushes.',
    keyEntities: ['Logger', 'LogLevel', 'LogHandler', 'ConsoleAppender', 'FileAppender', 'LogMessage'],
    docLink: '/lld/projects/design-logging-framework',
  },
  {
    slug: 'notification-service',
    title: 'Design a Low-Level Notification Library',
    category: 'Infrastructure LLD',
    difficulty: 'Medium',
    patterns: ['Observer', 'Factory', 'Strategy', 'Decorator'],
    desc: 'Notification engine delivering messages via Push, SMS, and Email with template interpolation, retry mechanisms, and rate limits.',
    keyEntities: ['NotificationService', 'ChannelStrategy', 'TemplateEngine', 'UserPreference', 'DeliveryStatus'],
    docLink: '/lld/projects/design-notification-service',
  },
];

export default function LLDHub() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  const categories = ['All', 'Machine Coding', 'Infrastructure LLD', 'Game Systems', 'Financial/Booking'];

  const filteredProjects = useMemo(() => {
    return LLD_PROJECTS.filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()) ||
        p.patterns.some((pat) => pat.toLowerCase().includes(search.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="lld-hub-container font-sketch max-w-6xl mx-auto px-4 py-8">
      {/* Top Cross-Hub Navigation Header */}
      <nav className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--sketch-border)]">
        <div className="flex items-center gap-2">
          <a
            href={`${base}/system-design`}
            className="sketch-button flex items-center gap-1.5 text-xs font-bold text-[var(--sketch-text-muted)] hover:text-amber-500 py-1.5 px-3"
          >
            ← System Design (HLD)
          </a>
          <a
            href={`${base}/ood`}
            className="sketch-button flex items-center gap-1.5 text-xs font-bold text-[var(--sketch-text-muted)] hover:text-cyan-400 py-1.5 px-3"
          >
            🧩 OOD & Design Patterns →
          </a>
        </div>

        <span className="sketch-border-soft px-3 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          ⚙️ LOW-LEVEL MACHINE CODING HUB
        </span>
      </nav>

      {/* Hero Blackboard Header */}
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl mb-10 border-2 border-[var(--sketch-border)] shadow-2xl relative font-sketch text-center">
        <h1 className="font-header font-bold text-3xl md:text-5xl text-[var(--sketch-text)] mb-3 leading-tight">
          Low-Level Design & Machine Coding Hub
        </h1>
        <p className="text-[var(--sketch-text-muted)] text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-6 font-sketch">
          Ace Machine Coding rounds at top tech companies. Master production-grade class structures, concurrency synchronization, SOLID principles, and design patterns.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[var(--sketch-border)] max-w-4xl mx-auto mb-6">
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-amber-500 block">15</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">Machine Code Projects</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-emerald-400 block">10</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">Core LLD Guides</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-cyan-400 block">23</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">Design Patterns</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-rose-400 block">45 Min</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">Interview Time Target</span>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--sketch-border)]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`sketch-button text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${selectedCategory === cat
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-md'
                    : 'bg-[var(--sketch-bg)] text-[var(--sketch-text-muted)] hover:border-amber-500/50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search LLD projects or patterns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sketch-button w-full bg-[var(--sketch-bg)] text-[var(--sketch-text)] text-xs font-sketch border-2 border-[var(--sketch-border)] rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </section>

      {/* LLD Machine Coding Framework Blueprint Card */}
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl mb-10 border-2 border-[var(--sketch-border)] shadow-xl font-sketch">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)]">
            Machine Coding Interview Strategy (45-Minute Playbook)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="sketch-border bg-[var(--sketch-bg)] p-3 rounded-2xl border border-[var(--sketch-border)]">
            <span className="font-mono text-xs text-amber-400 font-bold block mb-1">01. Clarify (5m)</span>
            <p className="text-xs text-[var(--sketch-text-muted)] leading-relaxed">
              Confirm functional scope, edge cases, input formats, and in-scope vs out-of-scope constraints.
            </p>
          </div>
          <div className="sketch-border bg-[var(--sketch-bg)] p-3 rounded-2xl border border-[var(--sketch-border)]">
            <span className="font-mono text-xs text-amber-400 font-bold block mb-1">02. Class Model (10m)</span>
            <p className="text-xs text-[var(--sketch-text-muted)] leading-relaxed">
              Define core entities, attributes, enums, interfaces, and relationships (Composition &gt; Inheritance).
            </p>
          </div>
          <div className="sketch-border bg-[var(--sketch-bg)] p-3 rounded-2xl border border-[var(--sketch-border)]">
            <span className="font-mono text-xs text-amber-400 font-bold block mb-1">03. Patterns (10m)</span>
            <p className="text-xs text-[var(--sketch-text-muted)] leading-relaxed">
              Apply Strategy for algorithms, Factory for object creation, and State for lifecycle transitions.
            </p>
          </div>
          <div className="sketch-border bg-[var(--sketch-bg)] p-3 rounded-2xl border border-[var(--sketch-border)]">
            <span className="font-mono text-xs text-amber-400 font-bold block mb-1">04. Implementation (15m)</span>
            <p className="text-xs text-[var(--sketch-text-muted)] leading-relaxed">
              Write clean, extensible, modular code with clear method signatures and zero magic numbers.
            </p>
          </div>
          <div className="sketch-border bg-[var(--sketch-bg)] p-3 rounded-2xl border border-[var(--sketch-border)]">
            <span className="font-mono text-xs text-amber-400 font-bold block mb-1">05. Concurrency (5m)</span>
            <p className="text-xs text-[var(--sketch-text-muted)] leading-relaxed">
              Add thread safety using `ReentrantLock`, `ConcurrentHashMap`, or `AtomicInteger`.
            </p>
          </div>
        </div>
      </section>

      {/* LLD Projects Cards Grid */}
      <section className="mb-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)]">
            Machine Coding Projects ({filteredProjects.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.slug}
              className="sketch-panel-box sketch-border group flex flex-col justify-between p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-2xl bg-[var(--sketch-bg-dim)] border-2 border-[var(--sketch-border)]"
            >
              <div>
                {/* Category & Difficulty Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="sketch-border-soft px-2.5 py-0.5 text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border-amber-500/30 rounded-full">
                    {p.category}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${p.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                      p.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-rose-500/20 text-rose-300'
                    }`}>
                    {p.difficulty}
                  </span>
                </div>

                {/* Title */}
                <div className="flex items-center gap-3 mb-2">
                  <BrandIcon slug={p.slug} size={24} />
                  <h3 className="font-header font-bold text-xl text-[var(--sketch-text)] group-hover:text-amber-400 transition-colors">
                    {p.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[var(--sketch-text-muted)] text-xs md:text-sm leading-relaxed mb-4 font-sketch">
                  {p.desc}
                </p>

                {/* Key Design Patterns */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider block mb-1.5">
                    ⚙️ Key Design Patterns:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.patterns.map((pat) => (
                      <span key={pat} className="text-[10px] font-mono bg-[var(--sketch-bg)] text-[var(--sketch-text)] px-2 py-0.5 rounded border border-[var(--sketch-border)]">
                        {pat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Classes */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    📦 Key Class Entities:
                  </span>
                  <div className="text-xs font-mono text-[var(--sketch-text-muted)] truncate">
                    {p.keyEntities.join(' · ')}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[var(--sketch-border)]">
                <a
                  href={`${base}/lld/projects/design-${p.slug}`}
                  className="sketch-button flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 w-full text-center py-2 rounded-xl"
                >
                  View Machine Coding Guide →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl text-center text-xs font-mono text-[var(--sketch-text-muted)]">
        © {new Date().getFullYear()} Low-Level Design & Machine Coding Studio · Pair-programmed for FAANG interview mastery.
      </footer>
    </div>
  );
}
