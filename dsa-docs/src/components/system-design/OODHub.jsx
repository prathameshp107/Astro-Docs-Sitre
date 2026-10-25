import React, { useState, useMemo } from 'react';
import '../../styles/sketch-visualizer.css';

const SOLID_PRINCIPLES = [
  {
    letter: 'S',
    title: 'Single Responsibility Principle (SRP)',
    summary: 'A class should have one, and only one, reason to change.',
    violation: 'Mixing database access, business rules, and HTML rendering inside a single Order class.',
    solution: 'Separate into Order, OrderRepository, and OrderInvoiceRenderer classes.',
    codeSnippet: 'class OrderRepository {\n  save(order: Order): void { ... }\n}',
  },
  {
    letter: 'O',
    title: 'Open/Closed Principle (OCP)',
    summary: 'Software entities should be open for extension, but closed for modification.',
    violation: 'Using massive if-else or switch blocks whenever adding a new payment method.',
    solution: 'Define a PaymentStrategy interface; add new payment classes without editing existing code.',
    codeSnippet: 'interface PaymentStrategy {\n  pay(amount: number): void;\n}',
  },
  {
    letter: 'L',
    title: 'Liskov Substitution Principle (LSP)',
    summary: 'Subtypes must be substitutable for their base types without breaking application behavior.',
    violation: 'Ostrich inheriting from Bird and throwing UnsupportedOperationException on fly().',
    solution: 'Split interfaces into FlyingBird and NonFlyingBird to maintain LSP contracts.',
    codeSnippet: 'interface FlyingBird extends Bird {\n  fly(): void;\n}',
  },
  {
    letter: 'I',
    title: 'Interface Segregation Principle (ISP)',
    summary: 'Clients should not be forced to depend on interfaces they do not use.',
    violation: 'Creating a bloated MultiFunctionPrinter interface with print(), scan(), and fax().',
    solution: 'Split into smaller, focused interfaces: Printer, Scanner, FaxMachine.',
    codeSnippet: 'interface Printer {\n  print(doc: Document): void;\n}',
  },
  {
    letter: 'D',
    title: 'Dependency Inversion Principle (DIP)',
    summary: 'High-level modules should not depend on low-level modules. Both should depend on abstractions.',
    violation: 'NotificationService directly instantiating SendGridApi with `new SendGridApi()`.',
    solution: 'Inject a MessageSender interface into NotificationService constructor.',
    codeSnippet: 'constructor(private sender: MessageSender) {}',
  },
];

const DESIGN_PATTERNS = [
  // Creational
  { name: 'Factory Method', category: 'Creational', docSlug: '03-creational/factory-method', desc: 'Defines an interface for creating objects, but lets subclasses decide which class to instantiate.', useCase: 'Payment processor creation (Stripe/PayPal/Razorpay)' },
  { name: 'Abstract Factory', category: 'Creational', docSlug: '03-creational/abstract-factory', desc: 'Provides an interface for creating families of related or dependent objects without specifying concrete classes.', useCase: 'Cross-platform UI widgets (Mac vs Windows buttons)' },
  { name: 'Builder Pattern', category: 'Creational', docSlug: '03-creational/builder', desc: 'Separates the construction of a complex object from its representation, enabling step-by-step construction.', useCase: 'HTTP Request / Database Query builder' },
  { name: 'Singleton Pattern', category: 'Creational', docSlug: '03-creational/singleton', desc: 'Ensures a class has only one instance while providing a global access point to this instance.', useCase: 'Thread pool manager, Database connection pool' },
  { name: 'Prototype Pattern', category: 'Creational', docSlug: '03-creational/prototype', desc: 'Creates new objects by copying an existing instance (cloning) to save expensive initialization.', useCase: 'Game character cloning, Document templates' },

  // Structural
  { name: 'Adapter Pattern', category: 'Structural', docSlug: '04-structural/adapter', desc: 'Allows objects with incompatible interfaces to collaborate by converting one interface into another.', useCase: 'Integrating third-party Analytics SDKs' },
  { name: 'Decorator Pattern', category: 'Structural', docSlug: '04-structural/decorator', desc: 'Attaches new behaviors to objects dynamically by placing them inside special wrapper objects.', useCase: 'Coffee add-ons (Milk, Sugar), Stream encryption wrappers' },
  { name: 'Facade Pattern', category: 'Structural', docSlug: '04-structural/facade', desc: 'Provides a simplified interface to a library, a framework, or any other complex set of classes.', useCase: 'One-click checkout hiding Inventory, Payment, and Shipping' },
  { name: 'Composite Pattern', category: 'Structural', docSlug: '04-structural/composite', desc: 'Composes objects into tree structures to represent part-whole hierarchies cleanly.', useCase: 'File system folders/files, Organization org chart' },
  { name: 'Proxy Pattern', category: 'Structural', docSlug: '04-structural/proxy', desc: 'Provides a surrogate or placeholder for another object to control access, lazy load, or log.', useCase: 'Hibernate lazy loading, Rate-limiting proxy' },
  { name: 'Bridge Pattern', category: 'Structural', docSlug: '04-structural/bridge', desc: 'Decouples an abstraction from its implementation so that the two can vary independently.', useCase: 'Remote Control (Abstraction) vs TV Device (Implementation)' },
  { name: 'Flyweight Pattern', category: 'Structural', docSlug: '04-structural/flyweight', desc: 'Fits more objects into available RAM by sharing common parts of state among multiple objects.', useCase: 'Text editor character rendering, Game particle effects' },

  // Behavioral
  { name: 'Strategy Pattern', category: 'Behavioral', docSlug: '05-behavioral/strategy', desc: 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.', useCase: 'Sorting algorithms, Route calculation (Shortest, Fastest)' },
  { name: 'Observer Pattern', category: 'Behavioral', docSlug: '05-behavioral/observer', desc: 'Defines a subscription mechanism to notify multiple subscriber objects about events.', useCase: 'Pub/Sub events, YouTube channel subscription' },
  { name: 'State Pattern', category: 'Behavioral', docSlug: '05-behavioral/state', desc: 'Allows an object to alter its behavior when its internal state changes, appearing to change its class.', useCase: 'Vending machine states, Order fulfillment workflow' },
  { name: 'Command Pattern', category: 'Behavioral', docSlug: '05-behavioral/command', desc: 'Encapsulates a request as a standalone object containing all information about the request.', useCase: 'Undo/Redo history, Job queue task execution' },
  { name: 'Chain of Responsibility', category: 'Behavioral', docSlug: '05-behavioral/chain-of-responsibility', desc: 'Passes requests along a chain of handlers until one of the handlers processes the request.', useCase: 'Middleware authentication pipeline, Support ticket routing' },
  { name: 'Template Method', category: 'Behavioral', docSlug: '05-behavioral/template-method', desc: 'Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps.', useCase: 'Data parser (CSV, JSON, XML) framework' },
  { name: 'Iterator Pattern', category: 'Behavioral', docSlug: '05-behavioral/iterator', desc: 'Accesses elements of an aggregate object sequentially without exposing its underlying representation.', useCase: 'Traversing Binary Tree / Custom Collection' },
  { name: 'Mediator Pattern', category: 'Behavioral', docSlug: '05-behavioral/mediator', desc: 'Reduces chaotic dependencies between objects by restricting direct communications to a mediator.', useCase: 'Air Traffic Control tower, Chat room server' },
  { name: 'Memento Pattern', category: 'Behavioral', docSlug: '05-behavioral/memento', desc: 'Saves and restores the previous state of an object without revealing the details of its implementation.', useCase: 'Text editor undo snapshots, Game save state' },
  { name: 'Visitor Pattern', category: 'Behavioral', docSlug: '05-behavioral/visitor', desc: 'Separates algorithms from the objects on which they operate by adding visitor operations.', useCase: 'Compiler AST syntax tree evaluation' },
  { name: 'Interpreter Pattern', category: 'Behavioral', docSlug: '05-behavioral/command', desc: 'Evaluates sentences in a language by defining a grammatical representation.', useCase: 'SQL query parser, Regular expression engine' },
];

export default function OODHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  const categories = ['All', 'Creational', 'Structural', 'Behavioral'];

  const filteredPatterns = useMemo(() => {
    return DESIGN_PATTERNS.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()) ||
        p.useCase.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="ood-hub-container font-sketch max-w-6xl mx-auto px-4 py-8">
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
            href={`${base}/lld`}
            className="sketch-button flex items-center gap-1.5 text-xs font-bold text-[var(--sketch-text-muted)] hover:text-amber-400 py-1.5 px-3"
          >
            ⚙️ Low-Level (LLD) Hub →
          </a>
        </div>

        <span className="sketch-border-soft px-3 py-1 text-xs font-mono font-bold bg-cyan-500/20 text-cyan-400 border-cyan-500/40 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          🧩 OBJECT-ORIENTED DESIGN & GOF PATTERNS
        </span>
      </nav>

      {/* Hero Blackboard Header */}
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl mb-10 border-2 border-[var(--sketch-border)] shadow-2xl relative font-sketch text-center">
        <h1 className="font-header font-bold text-3xl md:text-5xl text-[var(--sketch-text)] mb-3 leading-tight">
          Object-Oriented Design & GoF Patterns Hub
        </h1>
        <p className="text-[var(--sketch-text-muted)] text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-6 font-sketch">
          Master the foundations of clean software architecture. Explore SOLID Principles, 23 Gang-of-Four Design Patterns, UML Class Relationships, and Refactoring Best Practices.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[var(--sketch-border)] max-w-4xl mx-auto">
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-amber-500 block">5</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">SOLID Principles</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-emerald-400 block">23</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">GoF Patterns</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-cyan-400 block">4</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">OOP Pillars</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 text-center rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)]">
            <span className="font-header text-2xl md:text-3xl font-bold text-rose-400 block">100%</span>
            <span className="text-[10px] md:text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider">Production-Ready</span>
          </div>
        </div>
      </section>

      {/* SOLID Principles Section */}
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl mb-12 border-2 border-[var(--sketch-border)] shadow-xl font-sketch">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--sketch-border)]">
          <span className="text-2xl">🏛️</span>
          <div>
            <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)]">
              The SOLID Principles Cheat-Sheet
            </h2>
            <p className="text-xs text-[var(--sketch-text-muted)]">5 core guidelines for maintainable and scalable Object-Oriented software.</p>
          </div>
        </div>

        <div className="space-y-4">
          {SOLID_PRINCIPLES.map((sp) => (
            <div key={sp.letter} className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-2xl border border-[var(--sketch-border)] shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0">
                    {sp.letter}
                  </span>
                  <h3 className="font-header font-bold text-lg text-[var(--sketch-text)]">
                    {sp.title}
                  </h3>
                </div>
                <code className="text-[10px] font-mono bg-slate-900 text-amber-300 px-2.5 py-1 rounded border border-slate-700 font-bold self-start md:self-auto">
                  {sp.codeSnippet}
                </code>
              </div>

              <p className="text-xs md:text-sm font-bold text-amber-400 mb-2 pl-11">
                "{sp.summary}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-11 text-xs font-sketch">
                <div className="bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-xl text-rose-300">
                  <span className="font-mono font-bold block mb-1">❌ Violation:</span>
                  {sp.violation}
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl text-emerald-300">
                  <span className="font-mono font-bold block mb-1">✅ SOLID Fix:</span>
                  {sp.solution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GoF Design Patterns Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)]">
              23 Gang-of-Four Design Patterns ({filteredPatterns.length})
            </h2>
            <p className="text-xs text-[var(--sketch-text-muted)]">Reusable solutions to common object-oriented design challenges.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex items-center gap-1 bg-[var(--sketch-bg-dim)] p-1 rounded-xl border border-[var(--sketch-border)]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                    activeCategory === cat
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                      : 'text-[var(--sketch-text-muted)] hover:text-[var(--sketch-text)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Filter patterns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sketch-button bg-[var(--sketch-bg)] text-[var(--sketch-text)] text-xs font-sketch border-2 border-[var(--sketch-border)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatterns.map((pat) => (
            <div
              key={pat.name}
              className="sketch-panel-box sketch-border group flex flex-col justify-between p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-2xl bg-[var(--sketch-bg-dim)] border-2 border-[var(--sketch-border)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`sketch-border-soft px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full ${
                    pat.category === 'Creational' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    pat.category === 'Structural' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {pat.category}
                  </span>
                </div>

                <h3 className="font-header font-bold text-xl text-[var(--sketch-text)] group-hover:text-cyan-400 transition-colors mb-2">
                  {pat.name}
                </h3>

                <p className="text-[var(--sketch-text-muted)] text-xs md:text-sm leading-relaxed mb-4 font-sketch">
                  {pat.desc}
                </p>

                <div className="sketch-border bg-[var(--sketch-bg)] p-3 rounded-xl border border-[var(--sketch-border)]">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    💡 Typical Production Use-Case:
                  </span>
                  <span className="text-xs text-[var(--sketch-text)] font-sketch">
                    {pat.useCase}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--sketch-border)] mt-4">
                <a
                  href={`${base}/design-patterns/${pat.docSlug}`}
                  className="sketch-button flex items-center justify-center gap-1.5 text-xs font-bold text-cyan-400 border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20 w-full text-center py-2 rounded-xl"
                >
                  Explore Code Implementation →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl text-center text-xs font-mono text-[var(--sketch-text-muted)]">
        © {new Date().getFullYear()} Object-Oriented Design & GoF Patterns Studio · Form follows function.
      </footer>
    </div>
  );
}
