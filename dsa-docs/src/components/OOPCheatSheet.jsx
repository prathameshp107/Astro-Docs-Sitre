import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

/* ─── Mini Icons (inline SVG so no deps needed) ─── */
const icons = {
  chevron: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
  lock:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  eye:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  layer:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>,
  codes:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  star:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  puzzle: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15h3v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3h3a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3V2a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z"/></svg>,
  book:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  bulb:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  thumbs: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>,
  globe:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
};

/* ─── Data ─── */
const SECTIONS = [
  {
    id: 'pillars',
    title: 'The Four Pillars',
    icon: icons.star,
    accent: 'from-purple-500 to-pink-500',
    content: {
      type: 'table',
      headers: ['Pillar', 'Purpose', 'Implementation'],
      rows: [
        ['Encapsulation', 'Data hiding + bundling', 'Private fields, public getters/setters'],
        ['Abstraction', 'Hide complexity, show essentials', 'Abstract classes, interfaces'],
        ['Inheritance', 'Code reuse via parent-child', 'extends keyword'],
        ['Polymorphism', 'Many forms, same interface', 'Method overriding, interfaces'],
      ],
    },
  },
  {
    id: 'class-object',
    title: 'Class & Object',
    icon: icons.codes,
    accent: 'from-blue-500 to-cyan-500',
    content: {
      type: 'code',
      label: 'JavaScript',
      code: `class ClassName {
  constructor(params) {
    // Initialize properties
    this.property = params;
  }

  method() {
    // Behavior
    return this.property;
  }

  get computed() {
    return this.property * 2;  // Getter
  }

  set computed(val) {
    this.property = val / 2;   // Setter
  }

  static utility() {
    return 'Class-level method';
  }
}

const obj = new ClassName('value');
obj.method();            // 'value'
ClassName.utility();     // 'Class-level method'`,
    },
  },
  {
    id: 'access',
    title: 'Access Modifiers',
    icon: icons.lock,
    accent: 'from-amber-500 to-orange-500',
    content: {
      type: 'table',
      headers: ['Modifier', 'Class', 'Subclass', 'External'],
      rows: [
        ['public', '✅', '✅', '✅'],
        ['protected', '✅', '✅', '❌'],
        ['private', '✅', '❌', '❌'],
      ],
      highlight: true,
    },
  },
  {
    id: 'relationships',
    title: 'Object Relationships',
    icon: icons.layer,
    accent: 'from-emerald-500 to-teal-500',
    content: {
      type: 'cards',
      items: [
        {
          title: 'Association',
          uml: '→',
          desc: 'Objects know each other. Independent lifetimes.',
          example: 'Teacher ↔ Student',
          color: 'border-blue-500/30 bg-blue-500/5',
          text: 'text-blue-400',
        },
        {
          title: 'Aggregation',
          uml: '◇',
          desc: 'Weak "has-a". Part can exist without whole.',
          example: 'Department → Teachers',
          color: 'border-amber-500/30 bg-amber-500/5',
          text: 'text-amber-400',
        },
        {
          title: 'Composition',
          uml: '◆',
          desc: 'Strong "has-a". Part dies with whole.',
          example: 'House → Rooms',
          color: 'border-red-500/30 bg-red-500/5',
          text: 'text-red-400',
        },
        {
          title: 'Dependency',
          uml: '⇢',
          desc: 'Temporary use. Weakest relationship.',
          example: 'OrderService ⇢ PaymentService',
          color: 'border-purple-500/30 bg-purple-500/5',
          text: 'text-purple-400',
        },
      ],
    },
  },
  {
    id: 'solid',
    title: 'SOLID Principles',
    icon: icons.star,
    accent: 'from-violet-500 to-indigo-500',
    content: {
      type: 'expandable-cards',
      items: [
        {
          title: 'S — Single Responsibility',
          desc: 'A class should have only one reason to change.',
          good: 'Report class only generates reports',
          bad: 'Report class generates, prints, emails, saves',
        },
        {
          title: 'O — Open/Closed',
          desc: 'Open for extension, closed for modification.',
          good: 'Shape.area() — add new shapes without changing calculator',
          bad: 'if (shape === "circle") else if (shape === "rectangle")',
        },
        {
          title: 'L — Liskov Substitution',
          desc: 'Subtypes must be substitutable for their base types.',
          good: 'Rectangle and Square as separate classes',
          bad: 'Square extends Rectangle (breaks setWidth/setHeight)',
        },
        {
          title: 'I — Interface Segregation',
          desc: 'Many specific interfaces > one general interface.',
          good: 'Printer interface, Scanner interface',
          bad: 'MultiFunctionDevice with print + scan + fax + email',
        },
        {
          title: 'D — Dependency Inversion',
          desc: 'Depend on abstractions, not concrete implementations.',
          good: 'Database interface → MySQL, PostgreSQL implementations',
          bad: 'class UserService { constructor() { this.db = new MySQL() } }',
        },
      ],
    },
  },
  {
    id: 'vs',
    title: 'Abstract Class vs Interface',
    icon: icons.puzzle,
    accent: 'from-rose-500 to-pink-500',
    content: {
      type: 'table',
      headers: ['Aspect', 'Abstract Class', 'Interface'],
      rows: [
        ['Has implementation?', 'Yes', 'No (traditionally)'],
        ['Has state (fields)?', 'Yes', 'No'],
        ['Multiple inheritance?', 'No (extends one)', 'Yes (implements many)'],
        ['Use when', 'Related classes with shared code', 'Unrelated classes with shared capability'],
      ],
      highlight: true,
    },
  },
  {
    id: 'snippets',
    title: 'Key Code Snippets',
    icon: icons.codes,
    accent: 'from-sky-500 to-blue-500',
    content: {
      type: 'code-tabs',
      tabs: [
        {
          label: 'Inheritance',
          code: `class Child extends Parent {
  constructor(params) {
    super(params);  // Must call parent constructor first
  }
  method() {
    return super.method() + ' extended';
  }
}`,
        },
        {
          label: 'Private Fields',
          code: `class BankAccount {
  #balance = 0;  // Private (ES2020+)
  getBalance() { return this.#balance; }
  #log(msg) {    // Private method
    console.log(msg);
  }
}`,
        },
        {
          label: 'Override',
          code: `class Animal {
  speak() { return 'sound'; }
}
class Dog extends Animal {
  speak() { return 'Woof!'; }  // Override
}`,
        },
        {
          label: 'Static',
          code: `class MathUtils {
  static PI = 3.14159;
  static square(x) { return x * x; }
}
MathUtils.PI;      // 3.14159
MathUtils.square(5); // 25`,
        },
        {
          label: 'Duck Typing',
          code: `// Any object with the right methods works
class ConsoleLogger {
  log(msg) { console.log(msg); }
}
function process(logger) {
  logger.log('works');
}
process(new ConsoleLogger());`,
        },
      ],
    },
  },
  {
    id: 'principles',
    title: 'Design Principles',
    icon: icons.bulb,
    accent: 'from-green-500 to-emerald-500',
    content: {
      type: 'grid-cards',
      items: [
        { label: 'DRY', title: 'Don\'t Repeat Yourself', desc: 'Extract duplication into shared code' },
        { label: 'KISS', title: 'Keep It Simple', desc: 'Simplest solution that works' },
        { label: 'YAGNI', title: 'You Ain\'t Gonna Need It', desc: 'Don\'t build for the unknown future' },
        { label: 'Composition', title: 'Favor HAS-A over IS-A', desc: 'Compose from small parts' },
        { label: 'Program to Interface', title: 'Depend on Abstractions', desc: 'Loose coupling via interfaces' },
        { label: 'Law of Demeter', title: 'Don\'t Talk to Strangers', desc: 'Only interact with immediate dependencies' },
      ],
    },
  },
  {
    id: 'mistakes',
    title: 'Common Mistakes',
    icon: icons.thumbs,
    accent: 'from-red-500 to-rose-500',
    content: {
      type: 'table',
      headers: ['Mistake', 'Fix'],
      rows: [
        ['God class (does everything)', 'Split into focused classes (SRP)'],
        ['Deep inheritance (5+ levels)', 'Use composition instead'],
        ['Public fields everywhere', 'Make private, expose via methods'],
        ['Type-checking with if/switch', 'Use polymorphism'],
        ['Creating deps inside class', 'Use dependency injection'],
        ['Forgetting super() in constructor', 'Always call parent constructor'],
      ],
    },
  },
  {
    id: 'language',
    title: 'Language Comparison',
    icon: icons.globe,
    accent: 'from-cyan-500 to-blue-500',
    content: {
      type: 'table',
      headers: ['Concept', 'JavaScript', 'TypeScript', 'Python', 'Java'],
      rows: [
        ['Class', 'class C {}', 'class C {}', 'class C:', 'class C {}'],
        ['Constructor', 'constructor()', 'constructor()', '__init__(self)', 'ClassName()'],
        ['Private', '#field', 'private', '__field', 'private'],
        ['Parent call', 'super()', 'super()', 'super().__init__()', 'super()'],
        ['Abstract', 'Simulated', 'abstract', '@abstractmethod', 'abstract'],
        ['Interface', 'Duck typing', 'interface', 'ABC', 'interface'],
        ['Static', 'static', 'static', '@staticmethod', 'static'],
      ],
    },
  },
  {
    id: 'decision',
    title: 'Quick Decision Guide',
    icon: icons.book,
    accent: 'from-fuchsia-500 to-purple-500',
    content: {
      type: 'decision',
      items: [
        { question: 'Need multiple instances with shared behavior?', answer: '→ Use a Class' },
        { question: 'Related classes share code but differ in some methods?', answer: '→ Use an Abstract Class' },
        { question: 'Unrelated classes need to fulfill the same contract?', answer: '→ Use an Interface' },
        { question: 'Utility function without instance state?', answer: '→ Use a Static Method' },
        { question: 'Genuine IS-A relationship?', answer: '→ Use Inheritance' },
        { question: 'HAS-A relationship?', answer: '→ Use Composition' },
      ],
    },
  },
];

/* ─── Sub-components ─── */

function CollapsibleSection({ section, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = section.id;

  // Sync when parent toggles expandAll
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="oop-section mb-4 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-white/15">
      <button
        onClick={handleToggle}
        className="oop-section-btn w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
        aria-expanded={open}
        aria-controls={`section-content-${id}`}
      >
        <span className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${section.accent} flex items-center justify-center text-white shadow-lg`}>
            {section.icon}
          </span>
          <span className="text-base font-semibold text-white">{section.title}</span>
        </span>
        <span className={`text-white/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          {icons.chevron}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`section-content-${id}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-white/5">
              <SectionContent content={section.content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionContent({ content }) {
  switch (content.type) {
    case 'table':
      return <InteractiveTable headers={content.headers} rows={content.rows} highlight={content.highlight} />;
    case 'code':
      return <CodeBlock label={content.label} code={content.code} />;
    case 'cards':
      return <RelationshipCards items={content.items} />;
    case 'expandable-cards':
      return <ExpandableCards items={content.items} />;
    case 'code-tabs':
      return <CodeTabs tabs={content.tabs} />;
    case 'grid-cards':
      return <GridCards items={content.items} />;
    case 'decision':
      return <DecisionGuide items={content.items} />;
    default:
      return null;
  }
}

function InteractiveTable({ headers, rows, highlight }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="oop-table w-full text-sm">
        <thead>
          <tr className="bg-white/5">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 ${
                  ci === 0 && highlight ? 'font-semibold text-white' : 'text-white/70'
                } ${ci === 0 ? 'whitespace-nowrap' : ''}`}>
                  <code className={ci === 0 ? 'text-sm text-amber-300' : ''}>{cell}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeBlock({ label, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(code);
    } catch {
      // Fallback for non-HTTPS contexts (localhost)
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#161b22]">
        <span className="text-xs font-medium text-white/40">{label}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>✓ Copied</>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 m-0 text-sm font-mono leading-relaxed overflow-x-auto text-[#e6edf3]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function RelationshipCards({ items }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`p-4 rounded-xl border ${item.color}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-white">{item.uml}</span>
            <span className={`text-xs font-semibold ${item.text}`}>{item.title}</span>
          </div>
          <p className="text-xs text-white/60 mb-2">{item.desc}</p>
          <p className="text-xs text-white/40 font-mono">{item.example}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ExpandableCards({ items }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
          >
            <span className="text-sm font-medium text-white">{item.title}</span>
            <span className={`text-white/30 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}>
              {icons.chevron}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2 border-t border-white/5 pt-3">
                  <p className="text-xs text-white/70 leading-relaxed">{item.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <span className="text-[0.6rem] font-semibold text-emerald-400 uppercase tracking-wider">✅ Good</span>
                      <p className="text-xs text-white/60 mt-1">{item.good}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/10">
                      <span className="text-[0.6rem] font-semibold text-red-400 uppercase tracking-wider">❌ Bad</span>
                      <p className="text-xs text-white/60 mt-1">{item.bad}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function CodeTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden">
      <div className="flex border-b border-white/5 bg-[#161b22] overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === i
                ? 'text-white border-b-2 border-blue-400 bg-white/5'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="p-4 m-0 text-sm font-mono leading-relaxed overflow-x-auto text-[#e6edf3]">
        <code>{tabs[activeTab].code}</code>
      </pre>
    </div>
  );
}

function GridCards({ items }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
        >
          <span className="inline-block px-1.5 py-0.5 rounded text-[0.55rem] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 mb-1.5">
            {item.label}
          </span>
          <p className="text-xs font-semibold text-white mb-0.5">{item.title}</p>
          <p className="text-[0.65rem] text-white/50 leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

function DecisionGuide({ items }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const [q, a] = [item.question, item.answer];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-[0.6rem] font-bold text-blue-400">
              {i + 1}
            </span>
            <div>
              <p className="text-sm text-white/80 font-medium mb-0.5">{q}</p>
              <p className="text-sm text-amber-400 font-semibold">{a}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Search Bar ─── */
function SearchBar({ query, setQuery }) {
  return (
    <div className="relative mb-6">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      >
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search OOP concepts..."
        aria-label="Search OOP concepts"
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400/40 focus:ring-1 focus:ring-blue-400/20 transition-all"
      />
    </div>
  );
}

/* ─── Main Component ─── */
export default function OOPCheatSheet() {
  const [query, setQuery] = useState('');
  const [expandedAll, setExpandedAll] = useState(false);

  const handleToggleAll = () => {
    setExpandedAll(!expandedAll);
  };

  // Filter sections based on search
  const displaySections = query.trim()
    ? SECTIONS.filter(s => {
        const searchStr = query.toLowerCase();
        // Check section title
        if (s.title.toLowerCase().includes(searchStr)) return true;
        // Check table rows
        if (s.content.rows) {
          return s.content.rows.some(row =>
            row.some(cell => cell.toLowerCase().includes(searchStr))
          );
        }
        // Check cards
        if (s.content.items) {
          return s.content.items.some(item =>
            item.title?.toLowerCase().includes(searchStr) ||
            item.desc?.toLowerCase().includes(searchStr) ||
            item.example?.toLowerCase().includes(searchStr)
          );
        }
        return false;
      })
    : SECTIONS;

  return (
    <div className="oop-cheatsheet max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400 text-[0.6rem] font-semibold uppercase tracking-wider mb-3">
          🚀 Interactive Reference
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          OOP Cheat Sheet
        </h1>
        <p className="text-sm text-white/50 max-w-md mx-auto">
          Everything you need to know about Object-Oriented Programming — at your fingertips.
        </p>
      </div>

      {/* Search + Toggle */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
        <button
          onClick={handleToggleAll}
          className="flex-shrink-0 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-xs font-medium text-white/60 hover:text-white/80 hover:bg-white/10 transition-all"
        >
          {expandedAll ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Results count */}
      {query && (
        <p className="text-xs text-white/40 mb-4">
          {displaySections.length} section{displaySections.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Sections */}
      {displaySections.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm text-white/40">No sections match "{query}"</p>
          <button
            onClick={() => setQuery('')}
            className="mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear search
          </button>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {displaySections.map((section) => (
            <motion.div
              key={section.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CollapsibleSection
                section={section}
                defaultOpen={expandedAll}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-white/30">
          💡 Click any section to expand. Use search to find specific topics.
        </p>
        <p className="text-xs text-white/20 mt-1">
          <a href="/DSA-Notes-Problems/oops/30-oops-cheatsheet" className="hover:text-white/40 transition-colors">
            View printable version →
          </a>
        </p>
      </div>
    </div>
  );
}
