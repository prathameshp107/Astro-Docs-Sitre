import { SectionHead } from "./primitives";

/**
 * Visible, crawlable FAQ + platform summary.
 *
 * This section replaces a `clip:rect(0,0,0,0)` / `aria-hidden="true"` block that
 * previously carried the homepage's only keyword-bearing copy. Hidden text is
 * discounted (and risks being read as cloaking), and `aria-hidden` also stripped
 * it from screen readers. The same substance now renders for real users.
 *
 * Native <details>/<summary> is deliberate: the answers sit in the served HTML,
 * so crawlers and AI answer engines read them without executing JS, and keyboard
 * plus screen-reader support comes for free.
 */

export const HOMEPAGE_FAQS: { q: string; a: string }[] = [
  {
    q: "What is Interview Prep Buddy?",
    a: "Interview Prep Buddy is a free, all-in-one technical interview preparation platform for software engineers. It combines DSA pattern cheatsheets, interactive algorithm visualizers, browser-based coding labs, 1400+ interview questions, MCQ practice rounds, and system design guides — so you prepare in one place instead of across a dozen scattered tabs.",
  },
  {
    q: "How do I prepare for a coding interview?",
    a: "Work in four passes. First, learn the 16 core DSA patterns (two pointers, sliding window, binary search, BFS/DFS, dynamic programming, backtracking) rather than memorising individual problems. Second, drill problems by pattern until you can recognise which one a new question needs. Third, study system design fundamentals — caching, sharding, queues, consistency trade-offs. Fourth, review language-specific questions for your stack and rehearse behavioural answers with the STAR method.",
  },
  {
    q: "Are the algorithm visualizers free?",
    a: "Yes. Every algorithm visualizer on Interview Prep Buddy is free and needs no sign-up or payment. That covers sorting, searching, arrays, linked lists, stacks, queues, hash tables, heaps, trees, graphs, recursion, backtracking, dynamic programming, two pointers, and sliding window — each with step-by-step animations, synchronized pseudocode highlighting, and Big-O complexity panels.",
  },
  {
    q: "Which DSA topics should I focus on for FAANG interviews?",
    a: "Arrays and strings, hash maps, two pointers, sliding window, binary search, trees and binary search trees, graphs (BFS, DFS, topological sort), heaps, and dynamic programming account for the large majority of questions at Google, Amazon, Meta, Microsoft, and Apple. Recursion and backtracking appear regularly at the harder end. Bit manipulation and tries show up less often but are worth a pass before onsites.",
  },
  {
    q: "How long does it take to prepare for a technical interview?",
    a: "With consistent daily practice, most engineers need roughly 8 to 12 weeks: about 4 weeks to cover the core DSA patterns, 4 weeks of mixed problem drilling under time pressure, and 2 to 4 weeks on system design and behavioural rounds. If you already write code professionally and just need a refresher, a focused 4 to 6 week pass on patterns and mock problems is usually enough.",
  },
  {
    q: "What is the difference between HLD and LLD interviews?",
    a: "High-level design (HLD) asks you to architect a whole system — choosing databases, caches, queues, and service boundaries, then reasoning about scale, availability, and consistency trade-offs. Low-level design (LLD) narrows to one component and tests object-oriented modelling: classes, interfaces, relationships, and design patterns. HLD rounds reward breadth and trade-off reasoning; LLD rounds reward clean, extensible class design.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="16"
          kicker="Questions"
          title="Interview prep, answered"
          lede="The things engineers ask before they start — what the platform covers, how to sequence your preparation, and what actually shows up in interviews."
        />

        <div className="reveal mt-12 grid gap-3 md:grid-cols-2">
          {HOMEPAGE_FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-border-strong"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-4 text-[15px] font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-[15px] font-medium">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 font-mono text-lg leading-none text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
