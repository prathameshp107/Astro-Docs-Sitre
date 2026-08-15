import { useState } from 'react';
import { getVisualizerContent } from '../../data/visualizers/visualizerContent.js';

/**
 * Reference article rendered beneath each visualizer, inside the page's scroll
 * column (the outer shell is h-screen/overflow-hidden, so anything appended
 * after <DSAVisualizerPage> in the .astro file would be unreachable).
 *
 * Rendered as ordinary visible markup — not a clipped, aria-hidden block — so it
 * is readable by users, screen readers and crawlers alike. Styling follows the
 * chalkboard/sketch system used by Section and ComplexityTable: font-header for
 * headings, font-sketch for body, sketch-border cards, and the same colour-coded
 * complexity badges so the table reads as part of the same board.
 */

/** Same colour scale as ComplexityTable, so Big-O reads consistently sitewide. */
const badge = (val) => {
  const v = String(val).toLowerCase();
  if (v.includes('o(n²') || v.includes('o(n^2') || v.includes('o(n!') || v.includes('o(2') || v.includes('o(9'))
    return 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/40';
  if (v.includes('log'))
    return 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40';
  if (v.includes('o(1)'))
    return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40';
  if (v.includes('o(') || v.includes('θ('))
    return 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40';
  return null;
};

const isComplexity = (s) => /^(o|θ)\(|^—$/i.test(String(s).trim());

function Heading({ icon, children }) {
  return (
    <h3 className="text-xl md:text-2xl font-bold font-header text-[var(--sketch-accent-orange)] mt-8 mb-4 flex items-center gap-2">
      <span aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </h3>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sketch-border bg-[var(--sketch-bg-dim)] rounded-2xl overflow-hidden shadow-sm transition-all hover:scale-[1.005]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 text-left px-5 py-4"
      >
        <span className="font-header font-bold text-base md:text-lg text-[var(--sketch-text)]">{q}</span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-xl leading-none text-[var(--sketch-accent-orange)] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      {/*
        Always rendered, collapsed with CSS rather than `{open && ...}`.
        Conditional rendering would keep the answers out of the server-rendered
        HTML, which would both lose the crawlable text and break the rule that
        FAQPage schema must match visible on-page content.
      */}
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 -mt-1 text-[var(--sketch-text-muted)] text-base leading-relaxed font-sketch">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VisualizerArticle({ topicId }) {
  const content = getVisualizerContent(topicId);
  if (!content) return null;

  const { heading, intro, complexityHead, complexity, howTo, faqs, related } = content;

  return (
    <article className="sketch-border bg-[var(--sketch-bg-dim)] mt-10 mb-6 rounded-2xl p-5 md:p-8 font-sketch shadow-xl">
      <h2 className="text-2xl md:text-3xl font-bold font-header text-[var(--sketch-text)] mb-5 flex items-center gap-3">
        <span aria-hidden="true">📚</span>
        <span>{heading}</span>
      </h2>

      {intro.map((p) => (
        <p key={p.slice(0, 40)} className="mb-4 text-base md:text-lg leading-relaxed text-[var(--sketch-text-muted)] max-w-[80ch]">
          {p}
        </p>
      ))}

      <Heading icon="⚡">Time and space complexity</Heading>
      <div className="sketch-border bg-[var(--sketch-bg)] p-4 md:p-5 rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse select-none">
          <thead>
            <tr className="border-b-2 border-[var(--sketch-border)] font-header text-sm md:text-base text-[var(--sketch-accent-orange)]">
              {complexityHead.map((h) => (
                <th key={h} className="py-3 px-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--sketch-border)] text-sm">
            {complexity.map((row) => (
              <tr key={row[0]} className="hover:bg-white/5 transition-colors">
                {row.map((cell, i) => {
                  if (i === 0) {
                    return (
                      <td key={i} className="py-3 px-3 font-bold font-header text-base text-[var(--sketch-text)] whitespace-nowrap">
                        {cell}
                      </td>
                    );
                  }
                  const tone = isComplexity(cell) ? badge(cell) : null;
                  return (
                    <td key={i} className="py-3 px-3 whitespace-nowrap">
                      {tone ? (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-mono font-bold border shadow-sm ${tone}`}>
                          {cell}
                        </span>
                      ) : (
                        <span className="text-[var(--sketch-text-muted)]">{cell}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Heading icon="🎮">How to use this visualizer</Heading>
      <div className="grid gap-3 md:grid-cols-2">
        {howTo.map((step, i) => (
          <div
            key={step}
            className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-2xl flex items-start gap-3 shadow-sm hover:scale-[1.01] transition-transform"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 font-header font-bold flex items-center justify-center border border-amber-500/40">
              {i + 1}
            </span>
            <p className="text-[var(--sketch-text)] text-base leading-relaxed pt-0.5">{step}</p>
          </div>
        ))}
      </div>

      <Heading icon="🎯">Frequently asked questions</Heading>
      <div className="space-y-3">
        {faqs.map((f) => (
          <Faq key={f.q} q={f.q} a={f.a} />
        ))}
      </div>

      <Heading icon="🔗">Related visualizers</Heading>
      <div className="flex flex-wrap gap-2">
        {related.map((r) => (
          <a
            key={r.href}
            href={r.href}
            className="sketch-button inline-flex items-center gap-2 px-4 py-2 font-hand text-lg text-[var(--sketch-text)] hover:bg-white/5 transition-colors rounded-xl"
          >
            {r.label} <span aria-hidden="true">→</span>
          </a>
        ))}
        <a
          href="/visualizer/"
          className="sketch-button inline-flex items-center gap-2 px-4 py-2 font-hand text-lg bg-amber-500/20 border-amber-500 text-[var(--sketch-text)] hover:bg-amber-500/30 transition-colors rounded-xl"
        >
          All algorithm visualizers <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
