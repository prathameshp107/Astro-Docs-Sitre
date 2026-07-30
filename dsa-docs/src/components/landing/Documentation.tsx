import { useState } from "react";
import { ChevronRight, FileCode2, Folder, Search, CheckCircle, BookOpen, HelpCircle } from "lucide-react";
import { Code, SectionHead, Window, tok } from "./primitives";

/* Official Brand Tech Stack Logos */
const simpleIconMap: Record<string, string> = {
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  React: "https://cdn.simpleicons.org/react/61DAFB",
  Angular: "https://cdn.simpleicons.org/angular/DD0031",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/5FA04E",
  Python: "https://cdn.simpleicons.org/python/3776AB",
  SQL: "https://cdn.simpleicons.org/postgresql/4169E1",
  MongoDB: "https://cdn.simpleicons.org/mongodb/47A248",
  Git: "https://cdn.simpleicons.org/git/F05032",
};

function StackLogo({ name }: { name: string }) {
  if (simpleIconMap[name]) {
    return (
      <img
        src={simpleIconMap[name]}
        alt={`${name} logo`}
        className="h-4 w-4 shrink-0 object-contain"
        loading="lazy"
      />
    );
  }

  switch (name) {
    case "Next.js":
      return (
        <svg className="h-4 w-4 shrink-0 text-foreground" viewBox="0 0 180 180" fill="none">
          <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="#FFF" />
          </mask>
          <g mask="url(#next-mask)">
            <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="8" />
            <path d="M149.5 159.2L73.8 62.5H61.2V117.5H72.4V78.7L139.7 165C143.2 163.3 146.4 161.3 149.5 159.2Z" fill="currentColor" />
            <rect x="115" y="62.5" width="11.2" height="55" fill="currentColor" />
          </g>
        </svg>
      );
    case "AI":
      return (
        <svg className="h-4 w-4 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" fill="currentColor" fillOpacity="0.2" />
          <circle cx="19" cy="5" r="2" fill="currentColor" />
        </svg>
      );
    case "Prompt Eng.":
      return (
        <svg className="h-4 w-4 shrink-0 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case "System Design":
      return (
        <svg className="h-4 w-4 shrink-0 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="3" width="7" height="7" rx="1.5" />
          <rect x="15" y="3" width="7" height="7" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
          <path d="M5.5 10v2h13v-2" />
          <line x1="12" y1="12" x2="12" y2="14" />
        </svg>
      );
    case "HLD":
      return (
        <svg className="h-4 w-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor" fillOpacity="0.15" />
        </svg>
      );
    case "LLD":
      return (
        <svg className="h-4 w-4 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    default:
      return <FileCode2 className="h-4 w-4 text-accent" />;
  }
}

const docArticles = [
  {
    id: "control-flow.mdx",
    folder: "javascript",
    title: "Sequential Control Flow",
    path: "docs / javascript / control-flow",
    desc: "An await inside a loop serialises work on purpose. Reach for it when order matters — and for Promise.all when it doesn't.",
    snippet: [
      [
        { t: "for ", c: tok.kw },
        { t: "(", c: tok.punc },
        { t: "const ", c: tok.kw },
        { t: "task ", c: "" },
        { t: "of ", c: tok.kw },
        { t: "queue) {", c: tok.punc },
      ],
      [
        { t: "  await ", c: tok.kw },
        { t: "run", c: tok.fn },
        { t: "(task); ", c: tok.punc },
        { t: "// sequential execution by design", c: tok.com },
      ],
      [{ t: "}", c: tok.punc }],
    ],
    progress: "68%",
  },
  {
    id: "event-loop.mdx",
    folder: "javascript",
    title: "Event Loop & Microtask Queue",
    path: "docs / javascript / event-loop",
    desc: "Understand the call stack, Web APIs, task queue, and microtask queue. Microtasks (Promise.then) drain completely before the next task tick.",
    snippet: [
      [
        { t: "console.", c: "" },
        { t: "log", c: tok.fn },
        { t: "(", c: tok.punc },
        { t: "'1. Script start'", c: tok.num },
        { t: ");", c: tok.punc },
      ],
      [
        { t: "Promise.", c: "" },
        { t: "resolve", c: tok.fn },
        { t: "().", c: tok.punc },
        { t: "then", c: tok.fn },
        { t: "(() => ", c: tok.punc },
        { t: "console.", c: "" },
        { t: "log", c: tok.fn },
        { t: "(", c: tok.punc },
        { t: "'2. Microtask'", c: tok.num },
        { t: "));", c: tok.punc },
      ],
      [
        { t: "console.", c: "" },
        { t: "log", c: tok.fn },
        { t: "(", c: tok.punc },
        { t: "'3. Script end'", c: tok.num },
        { t: ");", c: tok.punc },
      ],
    ],
    progress: "92%",
  },
  {
    id: "closures.mdx",
    folder: "javascript",
    title: "Closures & Lexical Scope",
    path: "docs / javascript / closures",
    desc: "A closure gives an inner function access to its outer function's scope even after the outer function has returned. Essential for module patterns and data privacy.",
    snippet: [
      [
        { t: "function ", c: tok.kw },
        { t: "createCounter", c: tok.fn },
        { t: "() {", c: tok.punc },
      ],
      [
        { t: "  let ", c: tok.kw },
        { t: "count = ", c: "" },
        { t: "0", c: tok.num },
        { t: ";", c: tok.punc },
      ],
      [
        { t: "  return ", c: tok.kw },
        { t: "() => ++count;", c: tok.punc },
      ],
      [{ t: "}", c: tok.punc }],
    ],
    progress: "45%",
  },
  {
    id: "rate-limiter.mdx",
    folder: "system-design",
    title: "Token Bucket Rate Limiter",
    path: "docs / system-design / rate-limiter",
    desc: "Implement request rate limiting using the token bucket algorithm. Refill tokens at a fixed interval and consume tokens atomically via Redis Lua scripts.",
    snippet: [
      [
        { t: "const ", c: tok.kw },
        { t: "allowed = ", c: "" },
        { t: "await ", c: tok.kw },
        { t: "redis.", c: "" },
        { t: "eval", c: tok.fn },
        { t: "(luaScript, [key], [capacity, refillRate]);", c: tok.punc },
      ],
      [
        { t: "if ", c: tok.kw },
        { t: "(!allowed) ", c: tok.punc },
        { t: "throw ", c: tok.kw },
        { t: "new ", c: tok.kw },
        { t: "TooManyRequestsError", c: tok.fn },
        { t: "();", c: tok.punc },
      ],
    ],
    progress: "81%",
  },
];

const treeStructure = [
  { name: "javascript", isFolder: true },
  { name: "control-flow.mdx", isFolder: false, parent: "javascript" },
  { name: "event-loop.mdx", isFolder: false, parent: "javascript" },
  { name: "closures.mdx", isFolder: false, parent: "javascript" },
  { name: "system-design", isFolder: true },
  { name: "rate-limiter.mdx", isFolder: false, parent: "system-design" },
];

const coveredStacks = [
  { name: "JavaScript", category: "Core CS" },
  { name: "React", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Next.js", category: "Fullstack" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Language" },
  { name: "SQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Git", category: "Tools" },
  { name: "AI", category: "ML/AI" },
  { name: "Prompt Eng.", category: "ML/AI" },
  { name: "System Design", category: "Architecture" },
  { name: "HLD", category: "Architecture" },
  { name: "LLD", category: "Architecture" },
];

export function Documentation() {
  const [activeDocId, setActiveDocId] = useState("control-flow.mdx");
  const [searchQuery, setSearchQuery] = useState("");
  const [tabIndex, setTabIndex] = useState<"Guide" | "Examples" | "Quiz">("Guide");
  const [quizSelected, setQuizSelected] = useState<number | null>(null);

  const currentDoc = docArticles.find((d) => d.id === activeDocId) || docArticles[0];

  const filteredTree = treeStructure.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="documentation" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="02"
          kicker="Documentation"
          title="Reference material written like a product, not a wiki"
          lede="Explorer, folder tree, breadcrumbs, Mermaid diagrams, runnable snippets, tabbed examples and per-page progress. Everything is searchable with ⌘K and remembers where you left off."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Main Interactive Docs Workspace */}
          <div className="reveal lg:col-span-8">
            <Window
              label={`docs / ${currentDoc.folder} / ${currentDoc.id.replace(".mdx", "")}`}
              tabs={["Guide", "Examples", "Quiz"]}
              activeTab={["Guide", "Examples", "Quiz"].indexOf(tabIndex)}
              onTabChange={(t) => setTabIndex(t as "Guide" | "Examples" | "Quiz")}
            >
              <div className="grid grid-cols-12">
                {/* Sidebar Navigation */}
                <aside className="col-span-5 border-r border-border/80 bg-surface/70 p-3 sm:col-span-4">
                  <div className="mb-3 flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 shadow-inner">
                    <Search className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Search docs ⌘K"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent font-mono text-[10px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>

                  <ul className="space-y-1">
                    {filteredTree.map((n) => {
                      if (n.isFolder) {
                        return (
                          <li
                            key={n.name}
                            className="flex items-center gap-1.5 pt-2 pb-1 font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
                          >
                            <Folder className="h-3 w-3 text-accent" aria-hidden="true" />
                            {n.name}
                          </li>
                        );
                      }
                      const isSelected = n.name === activeDocId;
                      return (
                        <li key={n.name}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDocId(n.name);
                              setQuizSelected(null);
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 font-mono text-[11px] transition-all duration-200 ${
                              isSelected
                                ? "border-l-2 border-accent bg-card text-foreground font-semibold shadow-sm"
                                : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                            }`}
                            style={{ paddingLeft: "14px" }}
                          >
                            <FileCode2 className={`h-3.5 w-3.5 shrink-0 ${isSelected ? "text-accent" : "text-muted-foreground/70"}`} aria-hidden="true" />
                            <span className="truncate">{n.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </aside>

                {/* Reader Pane */}
                <div className="col-span-7 p-5 sm:col-span-8">
                  {tabIndex === "Guide" && (
                    <>
                      <p className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                        {currentDoc.path.split(" / ").map((part, idx, arr) => (
                          <span key={idx} className="flex items-center gap-1">
                            {part}
                            {idx < arr.length - 1 ? (
                              <ChevronRight className="h-3 w-3 text-muted-foreground/60" aria-hidden="true" />
                            ) : null}
                          </span>
                        ))}
                      </p>
                      <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                        {currentDoc.title}
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {currentDoc.desc}
                      </p>

                      <div className="mt-4 overflow-hidden rounded-lg border border-border/80 bg-surface/80">
                        <Code lines={currentDoc.snippet} />
                      </div>

                      {/* Mermaid Architectural Flow Diagram */}
                      {currentDoc.id === "control-flow.mdx" && (
                        <div className="mt-4 rounded-xl border border-border/80 bg-surface/90 p-3.5">
                          <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-3">
                            <span className="font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                              Mermaid Flowchart · Sequential Execution
                            </span>
                            <span className="font-mono text-[9px] text-muted-foreground">Order Enforced</span>
                          </div>
                          <div className="flex items-center justify-between gap-1.5 font-mono text-[10px]">
                            <div className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-center text-foreground font-medium">
                              Queue [Tasks]
                            </div>
                            <span className="text-accent font-bold">→</span>
                            <div className="rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1.5 text-center text-accent font-semibold">
                              await run(t1)
                            </div>
                            <span className="text-accent font-bold">→</span>
                            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1.5 text-center text-emerald-400 font-semibold">
                              t1 Complete
                            </div>
                            <span className="text-accent font-bold">→</span>
                            <div className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-center text-foreground font-medium">
                              await run(t2)
                            </div>
                          </div>
                        </div>
                      )}

                      {currentDoc.id === "event-loop.mdx" && (
                        <div className="mt-4 rounded-xl border border-border/80 bg-surface/90 p-3.5">
                          <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-3">
                            <span className="font-mono text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                              Mermaid Flowchart · Event Loop Priority
                            </span>
                            <span className="font-mono text-[9px] text-muted-foreground">Microtasks Drain First</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
                            <div className="rounded-lg border border-border bg-card p-2 text-center text-foreground">
                              1. Call Stack
                            </div>
                            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-2 text-center text-emerald-400 font-medium">
                              2. Microtasks
                            </div>
                            <div className="rounded-lg border border-border bg-card p-2 text-center text-muted-foreground">
                              3. Macrotasks
                            </div>
                            <div className="rounded-lg border border-accent/40 bg-accent/10 p-2 text-center text-accent font-medium">
                              4. Render
                            </div>
                          </div>
                        </div>
                      )}

                      {currentDoc.id === "closures.mdx" && (
                        <div className="mt-4 rounded-xl border border-border/80 bg-surface/90 p-3.5">
                          <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-3">
                            <span className="font-mono text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                              Mermaid Diagram · Lexical Scope Binding
                            </span>
                            <span className="font-mono text-[9px] text-muted-foreground">Enclosed Context</span>
                          </div>
                          <div className="flex items-center justify-around gap-2 font-mono text-[10px]">
                            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-center text-amber-300">
                              Outer Function Scope <br /><span className="text-[9px] text-muted-foreground">let count = 0</span>
                            </div>
                            <span className="text-amber-400 font-bold">⇄</span>
                            <div className="rounded-lg border border-border bg-card px-3 py-2 text-center text-foreground">
                              Inner Closure Function <br /><span className="text-[9px] text-emerald-400">++count preserved</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentDoc.id === "rate-limiter.mdx" && (
                        <div className="mt-4 rounded-xl border border-border/80 bg-surface/90 p-3.5">
                          <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-3">
                            <span className="font-mono text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                              Mermaid Flowchart · Redis Rate Limiter
                            </span>
                            <span className="font-mono text-[9px] text-muted-foreground">Atomic Lua Script</span>
                          </div>
                          <div className="flex items-center justify-between gap-1.5 font-mono text-[10px]">
                            <div className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-center text-foreground">
                              HTTP Request
                            </div>
                            <span className="text-blue-400 font-bold">→</span>
                            <div className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-2.5 py-1.5 text-center text-blue-300">
                              Lua Evaluation
                            </div>
                            <span className="text-blue-400 font-bold">→</span>
                            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2 py-1.5 text-center text-emerald-400">
                              Token Available? (200 OK)
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Progress Bar */}
                      <div className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
                            style={{ width: currentDoc.progress }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground font-medium">
                          {currentDoc.progress} read
                        </span>
                      </div>
                    </>
                  )}

                  {tabIndex === "Examples" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-accent">
                        <BookOpen className="h-4 w-4" /> Production Best Practices
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        In production microservices, use sequential iteration when state dependencies require strict order. For independent network fetches, swap to Promise.all or concurrency pools.
                      </p>
                      <div className="rounded-lg border border-border bg-card p-3 font-mono text-[11px]">
                        <p className="text-emerald-400">// Pattern: Concurrency Limited Worker Pool</p>
                        <p className="text-muted-foreground mt-1">const results = await pMap(urls, fetchUrl, &#123; concurrency: 5 &#125;);</p>
                      </div>
                    </div>
                  )}

                  {tabIndex === "Quiz" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-accent">
                        <HelpCircle className="h-4 w-4" /> Rapid Recall Quiz
                      </div>
                      <p className="text-xs font-semibold text-foreground">
                        What happens when `await` is executed inside a `for...of` loop?
                      </p>
                      <div className="space-y-2">
                        {[
                          "Iterates sequentially, waiting for each promise to resolve before starting the next.",
                          "Executes all iterations in parallel instantly.",
                          "Throws a SyntaxError in strict mode.",
                        ].map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setQuizSelected(i)}
                            className={`flex w-full items-center justify-between rounded-lg border p-2.5 text-left font-mono text-[10px] transition-colors ${
                              quizSelected === i
                                ? i === 0
                                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                                  : "border-rose-500/50 bg-rose-500/10 text-rose-300"
                                : "border-border/70 bg-card text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            <span>{opt}</span>
                            {quizSelected === i && i === 0 ? (
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            ) : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Window>
          </div>

          {/* Right Side: Covered Stacks List with Real Tech SVG Logos */}
          <div className="reveal lg:col-span-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold tracking-wide uppercase text-foreground">
                Covered tracks
              </h3>
              <span className="font-mono text-[10px] text-accent font-semibold">14 Tracks</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Maintained by senior staff engineers who interview candidates at top tech companies.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {coveredStacks.map((t, i) => (
                <li
                  key={t.name}
                  className="card-lift flex items-center gap-2.5 rounded-lg border border-border/80 bg-card px-3 py-2.5 transition-colors hover:border-accent/40 hover:bg-elevated"
                  style={{ transitionDelay: `${i * 12}ms` }}
                >
                  <StackLogo name={t.name} />
                  <span className="truncate text-xs font-medium text-foreground">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
