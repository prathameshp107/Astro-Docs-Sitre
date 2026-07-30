import { useState } from "react";
import { Building2, Check, Network, Target } from "lucide-react";
import { Pill, SectionHead, Window } from "./primitives";
import { CompanyLogo } from "./CompanyLogo";

type Company = {
  name: string;
  domain: string;
  level: "Hard" | "Medium";
  rounds: string;
  problems: number;
  questions: number;
  design: number;
  behavioral: number;
  progress: number;
  acceptance: number;
  focus: string;
  topProblems: { title: string; diff: "Easy" | "Medium" | "Hard"; freq: string; solved: boolean }[];
  topQuestions: string[];
  designPrompts: string[];
};

const companies: Company[] = [
  {
    name: "Google",
    domain: "google.com",
    level: "Hard",
    rounds: "5 rounds · 2 coding, 1 design, 1 behavioral, 1 googleyness",
    problems: 182,
    questions: 94,
    design: 12,
    behavioral: 38,
    progress: 64,
    acceptance: 38,
    focus: "Graphs, DP, clean complexity narration",
    topProblems: [
      { title: "Number of Islands", diff: "Medium", freq: "asked 41×", solved: true },
      { title: "Word Ladder II", diff: "Hard", freq: "asked 28×", solved: true },
      { title: "Longest Increasing Path", diff: "Hard", freq: "asked 22×", solved: false },
      { title: "Meeting Rooms II", diff: "Medium", freq: "asked 19×", solved: false },
    ],
    topQuestions: [
      "Walk me through a decision you made with incomplete data.",
      "How do you pick between a heap and a sorted structure here?",
      "Describe a system you owned end to end.",
    ],
    designPrompts: ["Design Google Docs collaboration", "Design a global rate limiter"],
  },
  {
    name: "Meta",
    domain: "meta.com",
    level: "Hard",
    rounds: "4 rounds · 2 coding, 1 design, 1 behavioral",
    problems: 164,
    questions: 88,
    design: 10,
    behavioral: 34,
    progress: 52,
    acceptance: 41,
    focus: "Speed, arrays and strings, product sense",
    topProblems: [
      { title: "Valid Palindrome II", diff: "Easy", freq: "asked 46×", solved: true },
      { title: "Binary Tree Vertical Order", diff: "Medium", freq: "asked 31×", solved: true },
      { title: "Random Pick with Weight", diff: "Medium", freq: "asked 27×", solved: false },
      { title: "Alien Dictionary", diff: "Hard", freq: "asked 18×", solved: false },
    ],
    topQuestions: [
      "Tell me about a time you moved fast and broke something.",
      "Two solutions in 35 minutes — how do you triage?",
      "How do you measure impact of a feature you shipped?",
    ],
    designPrompts: ["Design the News Feed ranking service", "Design a live comments system"],
  },
  {
    name: "Amazon",
    domain: "amazon.com",
    level: "Medium",
    rounds: "5 rounds · 2 coding, 1 design, 2 leadership principles",
    problems: 210,
    questions: 120,
    design: 14,
    behavioral: 46,
    progress: 71,
    acceptance: 47,
    focus: "Leadership principles, OOP design, BFS/DFS",
    topProblems: [
      { title: "LRU Cache", diff: "Medium", freq: "asked 52×", solved: true },
      { title: "Rotting Oranges", diff: "Medium", freq: "asked 38×", solved: true },
      { title: "Merge K Sorted Lists", diff: "Hard", freq: "asked 25×", solved: true },
      { title: "Critical Connections", diff: "Hard", freq: "asked 17×", solved: false },
    ],
    topQuestions: [
      "Tell me about a time you disagreed and committed.",
      "Describe the highest-ownership thing you've done.",
      "When did you dive deep into a problem nobody else would?",
    ],
    designPrompts: ["Design an order fulfilment pipeline", "Design a package tracking system"],
  },
  {
    name: "Microsoft",
    domain: "microsoft.com",
    level: "Medium",
    rounds: "4 rounds · 2 coding, 1 design, 1 as-appropriate",
    problems: 158,
    questions: 76,
    design: 11,
    behavioral: 29,
    progress: 44,
    acceptance: 52,
    focus: "Trees, linked lists, pragmatic trade-offs",
    topProblems: [
      { title: "Reverse Linked List", diff: "Easy", freq: "asked 44×", solved: true },
      { title: "Serialize/Deserialize Tree", diff: "Hard", freq: "asked 24×", solved: false },
      { title: "Spiral Matrix", diff: "Medium", freq: "asked 21×", solved: true },
      { title: "Copy List with Random Ptr", diff: "Medium", freq: "asked 16×", solved: false },
    ],
    topQuestions: [
      "How do you mentor engineers less experienced than you?",
      "Explain a trade-off you made for maintainability.",
      "Walk me through debugging a production incident.",
    ],
    designPrompts: ["Design a telemetry ingestion service", "Design a feature flag platform"],
  },
  {
    name: "Netflix",
    domain: "netflix.com",
    level: "Hard",
    rounds: "4 rounds · 1 coding, 2 design, 1 culture",
    problems: 96,
    questions: 54,
    design: 9,
    behavioral: 21,
    progress: 28,
    acceptance: 33,
    focus: "Streaming architecture, senior-level judgment",
    topProblems: [
      { title: "Design Hit Counter", diff: "Medium", freq: "asked 19×", solved: false },
      { title: "Task Scheduler", diff: "Medium", freq: "asked 15×", solved: true },
      { title: "Sliding Window Maximum", diff: "Hard", freq: "asked 12×", solved: false },
      { title: "Time Based Key-Value Store", diff: "Medium", freq: "asked 11×", solved: false },
    ],
    topQuestions: [
      "Where have you given painfully direct feedback?",
      "What context did you need before making a call alone?",
      "Describe a system you deliberately kept simple.",
    ],
    designPrompts: ["Design an adaptive bitrate pipeline", "Design a CDN cache invalidation flow"],
  },
  {
    name: "Stripe",
    domain: "stripe.com",
    level: "Hard",
    rounds: "4 rounds · 2 practical coding, 1 design, 1 debugging",
    problems: 118,
    questions: 66,
    design: 8,
    behavioral: 26,
    progress: 36,
    acceptance: 35,
    focus: "Real codebases, API design, idempotency",
    topProblems: [
      { title: "Rate Limiter Implementation", diff: "Medium", freq: "asked 23×", solved: true },
      { title: "Parse & Replay Webhooks", diff: "Medium", freq: "asked 18×", solved: false },
      { title: "Bank Ledger Consistency", diff: "Hard", freq: "asked 14×", solved: false },
      { title: "Retry with Backoff", diff: "Easy", freq: "asked 12×", solved: true },
    ],
    topQuestions: [
      "How would you version a public API without breaking users?",
      "Explain idempotency keys to a non-engineer.",
      "Where do you draw the line on test coverage?",
    ],
    designPrompts: ["Design a payments ledger", "Design a webhook delivery service"],
  },
  {
    name: "Adobe",
    domain: "adobe.com",
    level: "Medium",
    rounds: "4 rounds · 2 coding, 1 object design, 1 manager round",
    problems: 142,
    questions: 62,
    design: 8,
    behavioral: 24,
    progress: 48,
    acceptance: 45,
    focus: "Arrays, string manipulation, Canvas/UI trees, OOP patterns",
    topProblems: [
      { title: "LRU Cache", diff: "Medium", freq: "asked 34×", solved: true },
      { title: "Insert Delete GetRandom O(1)", diff: "Medium", freq: "asked 25×", solved: true },
      { title: "Trapping Rain Water", diff: "Hard", freq: "asked 18×", solved: false },
      { title: "Group Anagrams", diff: "Medium", freq: "asked 15×", solved: true },
    ],
    topQuestions: [
      "How do you handle memory optimization in high-resolution canvas rendering?",
      "Describe how you'd design a plugin architecture for extensible software.",
      "Tell me about a time you had to balance feature delivery with tech debt.",
    ],
    designPrompts: ["Design a document collaboration system", "Design a cloud asset management pipeline"],
  },
  {
    name: "Bloomberg",
    domain: "bloomberg.com",
    level: "Hard",
    rounds: "4 rounds · 2 financial tech coding, 1 system design, 1 HR/Manager",
    problems: 176,
    questions: 82,
    design: 12,
    behavioral: 30,
    progress: 58,
    acceptance: 37,
    focus: "Doubly linked lists, maps, priority queues, low-latency data",
    topProblems: [
      { title: "Design Underground System", diff: "Medium", freq: "asked 48×", solved: true },
      { title: "Invalid Transactions", diff: "Medium", freq: "asked 36×", solved: true },
      { title: "Flatten Multilevel Doubly List", diff: "Medium", freq: "asked 29×", solved: false },
      { title: "All O(1) Data Structure", diff: "Hard", freq: "asked 22×", solved: false },
    ],
    topQuestions: [
      "Why Bloomberg and how do you operate under market-closing pressure?",
      "Explain how you optimize for sub-millisecond query responses.",
      "Describe an occasion where you disagreed with product specs and proposed a better alternative.",
    ],
    designPrompts: ["Design a real-time stock ticker aggregator", "Design an order matching engine"],
  },
  {
    name: "Apple",
    domain: "apple.com",
    level: "Hard",
    rounds: "5 rounds · 2 coding, 1 system architecture, 1 domain deep-dive, 1 behavioral",
    problems: 135,
    questions: 70,
    design: 10,
    behavioral: 28,
    progress: 38,
    acceptance: 32,
    focus: "Core CS fundamentals, OS & memory management, crisp execution",
    topProblems: [
      { title: "Product of Array Except Self", diff: "Medium", freq: "asked 39×", solved: true },
      { title: "Number of Islands", diff: "Medium", freq: "asked 27×", solved: true },
      { title: "Basic Calculator II", diff: "Medium", freq: "asked 21×", solved: false },
      { title: "Median of Two Sorted Arrays", diff: "Hard", freq: "asked 16×", solved: false },
    ],
    topQuestions: [
      "Tell me about a hardware constraint that influenced your software design.",
      "How do you enforce privacy-first telemetry in client applications?",
      "Describe a situation where attention to micro-details improved user experience.",
    ],
    designPrompts: ["Design iCloud Photo Sync engine", "Design a local push notification queue"],
  },
  {
    name: "Uber",
    domain: "uber.com",
    level: "Hard",
    rounds: "4 rounds · 2 algorithmic coding, 1 geospatial design, 1 behavioral",
    problems: 150,
    questions: 78,
    design: 13,
    behavioral: 32,
    progress: 42,
    acceptance: 34,
    focus: "Graph algorithms, spatial indexing (H3/Quadtree), high concurrency",
    topProblems: [
      { title: "Bus Routes", diff: "Hard", freq: "asked 31×", solved: false },
      { title: "Evaluate Division", diff: "Medium", freq: "asked 24×", solved: true },
      { title: "Text Justification", diff: "Hard", freq: "asked 19×", solved: false },
      { title: "Reconstruct Itinerary", diff: "Hard", freq: "asked 17×", solved: true },
    ],
    topQuestions: [
      "How do you handle microservice failures during high surge traffic?",
      "Tell me about a time you resolved cross-team technical friction.",
      "How would you model dynamic pricing under rapidly changing supply/demand?",
    ],
    designPrompts: ["Design a real-time driver location tracking platform", "Design Uber Eats dispatch system"],
  },
  {
    name: "NVIDIA",
    domain: "nvidia.com",
    level: "Hard",
    rounds: "4 rounds · 2 low-level/algo coding, 1 GPU/Systems design, 1 culture",
    problems: 128,
    questions: 58,
    design: 9,
    behavioral: 22,
    progress: 30,
    acceptance: 36,
    focus: "CUDA, parallel processing, memory layout optimization, matrix math",
    topProblems: [
      { title: "Matrix Block Sum", diff: "Medium", freq: "asked 26×", solved: true },
      { title: "Kth Largest Element in Array", diff: "Medium", freq: "asked 22×", solved: true },
      { title: "Maximal Square", diff: "Medium", freq: "asked 18×", solved: false },
      { title: "Sliding Window Maximum", diff: "Hard", freq: "asked 14×", solved: false },
    ],
    topQuestions: [
      "Explain cache coherence and memory hierarchy in GPU architectures.",
      "How do you profile and eliminate memory bottlenecks in high-throughput pipelines?",
      "Tell me about a project where parallel execution gave massive performance gains.",
    ],
    designPrompts: ["Design a distributed AI cluster job scheduler", "Design a video streaming decoder pipeline"],
  },
  {
    name: "Atlassian",
    domain: "atlassian.com",
    level: "Medium",
    rounds: "4 rounds · 2 practical code design, 1 system architecture, 1 values interview",
    problems: 112,
    questions: 52,
    design: 7,
    behavioral: 25,
    progress: 50,
    acceptance: 48,
    focus: "Clean code structure, state machine design, collaboration tools",
    topProblems: [
      { title: "Design Snake Game", diff: "Medium", freq: "asked 28×", solved: true },
      { title: "File System Search", diff: "Medium", freq: "asked 22×", solved: true },
      { title: "Rate Limiter", diff: "Medium", freq: "asked 19×", solved: false },
      { title: "Rank Teams by Votes", diff: "Medium", freq: "asked 15×", solved: true },
    ],
    topQuestions: [
      "How do you live the value 'Open company, no bullshit' in engineering feedback?",
      "Explain how you approach refactoring legacy code without breaking current users.",
      "Describe how you design data structures for real-time rich document collaboration.",
    ],
    designPrompts: ["Design a Jira issue workflow engine", "Design a Confluence permission service"],
  },
  {
    name: "OpenAI",
    domain: "openai.com",
    level: "Hard",
    rounds: "5 rounds · 2 deep algorithm/python coding, 1 AI systems architecture, 1 research, 1 culture",
    problems: 105,
    questions: 64,
    design: 11,
    behavioral: 20,
    progress: 25,
    acceptance: 28,
    focus: "Tokenization, KV-caching, distributed training clusters, agent execution",
    topProblems: [
      { title: "LRU / LFU Cache", diff: "Hard", freq: "asked 27×", solved: true },
      { title: "Prefix Tree (Trie) Search", diff: "Medium", freq: "asked 23×", solved: true },
      { title: "Stream Top-K Frequent Words", diff: "Medium", freq: "asked 19×", solved: false },
      { title: "Shortest Path in Binary Matrix", diff: "Medium", freq: "asked 15×", solved: false },
    ],
    topQuestions: [
      "How do you optimize inference latency for streaming tokens at scale?",
      "Describe how you debug non-deterministic behavior in complex asynchronous networks.",
      "What is your approach to safety and guardrails in autonomous tool execution?",
    ],
    designPrompts: ["Design ChatGPT streaming API infrastructure", "Design an AI agent tool-execution sandbox"],
  },
  {
    name: "Databricks",
    domain: "databricks.com",
    level: "Hard",
    rounds: "4 rounds · 2 distributed systems coding, 1 architecture, 1 manager round",
    problems: 138,
    questions: 72,
    design: 10,
    behavioral: 24,
    progress: 34,
    acceptance: 31,
    focus: "Spark internals, distributed query processing, tree traversals, indexing",
    topProblems: [
      { title: "Design Distributed File System", diff: "Hard", freq: "asked 32×", solved: true },
      { title: "Range Sum Query 2D", diff: "Medium", freq: "asked 24×", solved: true },
      { title: "Sliding Window Median", diff: "Hard", freq: "asked 19×", solved: false },
      { title: "Lowest Common Ancestor", diff: "Medium", freq: "asked 16×", solved: true },
    ],
    topQuestions: [
      "How do you handle data skew across worker nodes in distributed joins?",
      "Explain how Delta Lake guarantees ACID transactions over object storage.",
      "Tell me about a time you diagnosed a silent performance degradation in production.",
    ],
    designPrompts: ["Design a distributed query execution engine", "Design a real-time event streaming pipeline"],
  },
  {
    name: "Palantir",
    domain: "palantir.com",
    level: "Hard",
    rounds: "4 rounds · 1 decomp/problem solving, 1 coding, 1 system design, 1 culture",
    problems: 146,
    questions: 76,
    design: 11,
    behavioral: 28,
    progress: 40,
    acceptance: 30,
    focus: "Graph databases, complex data modeling, decomp challenges, high ownership",
    topProblems: [
      { title: "Word Search II", diff: "Hard", freq: "asked 35×", solved: true },
      { title: "Find All Anagrams in a String", diff: "Medium", freq: "asked 26×", solved: true },
      { title: "Design In-Memory File System", diff: "Hard", freq: "asked 21×", solved: false },
      { title: "Course Schedule II", diff: "Medium", freq: "asked 18×", solved: true },
    ],
    topQuestions: [
      "How do you model multi-tenant data access security across graph relationships?",
      "Describe how you break down ambiguous requirements into concrete software modules.",
      "Tell me about a project where you took end-to-end ownership under high uncertainty.",
    ],
    designPrompts: ["Design an enterprise graph search platform", "Design an audit logging system for sensitive data"],
  },
];

const diffTone: Record<string, string> = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger",
};

export function Companies() {
  const [active, setActive] = useState(0);
  const [tabIndex, setTabIndex] = useState<"Problems" | "Interview questions" | "System design">("Problems");
  const c = companies[active];

  return (
    <section id="companies" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="09"
          kicker="Company preparation"
          title="Pick a company, get its entire interview shape"
          lede="Not a logo wall. Select a company and the bank rewrites itself — its real problem set, the questions its panels ask, the design prompts it favours, your progress and the acceptance rate you're tracking against."
        />

        <div
          role="tablist"
          aria-label="Companies"
          className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {companies.map((co, i) => (
            <CompanyCard
              key={co.name}
              company={co}
              selected={i === active}
              onSelect={() => setActive(i)}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <Window
              label={`prep / companies / ${c.name.toLowerCase()}`}
              tabs={["Problems", "Interview questions", "System design"]}
              activeTab={["Problems", "Interview questions", "System design"].indexOf(tabIndex)}
              onTabChange={(t) => setTabIndex(t as any)}
            >
              <div className="border-b border-border/80 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={c.level === "Hard" ? "danger" : "warning"}>{c.level} bar</Pill>
                  <Pill tone="info">{c.problems} problems</Pill>
                  <Pill>{c.focus}</Pill>
                </div>
                <p className="mt-4 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                  loop structure
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground font-medium">{c.rounds}</p>
              </div>

              {tabIndex === "Problems" && (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                      most asked problems
                    </p>
                  </div>
                  <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border/80">
                    {c.topProblems.map((p) => (
                      <li
                        key={p.title}
                        className="flex items-center justify-between gap-3 bg-card px-4 py-2.5 transition-colors hover:bg-elevated"
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                              p.solved
                                ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                                : "border-border text-muted-foreground"
                            }`}
                          >
                            {p.solved ? <Check className="h-2.5 w-2.5" aria-hidden="true" /> : null}
                          </span>
                          <span className="truncate text-sm font-medium text-foreground">{p.title}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-3">
                          <span className="font-mono text-[10px] text-muted-foreground font-medium">
                            {p.freq}
                          </span>
                          <Pill tone={diffTone[p.diff]}>{p.diff}</Pill>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tabIndex === "Interview questions" && (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                      panel interview questions
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {c.topQuestions.map((q) => (
                      <li key={q} className="rounded-lg border border-border/70 bg-card p-3 text-xs leading-relaxed text-foreground font-medium">
                        → {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tabIndex === "System design" && (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Network className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                      system design prompts ({c.design} total)
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {c.designPrompts.map((d) => (
                      <li
                        key={d}
                        className="rounded-lg border border-border/80 bg-surface/90 px-3.5 py-3 text-xs font-semibold text-foreground flex items-center justify-between"
                      >
                        <span>{d}</span>
                        <span className="font-mono text-[9px] text-accent">High Frequency</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Window>
          </div>

          <div className="reveal grid content-start gap-4 lg:col-span-5">
            <article className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface">
                    <CompanyLogo name={c.name} domain={c.domain} size={22} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{c.name}</h3>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      difficulty · {c.level}
                    </p>
                  </div>
                </div>
                <span className="font-display text-2xl font-semibold tabular-nums">
                  {c.progress}%
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>your progress</span>
                  <span>
                    {Math.round((c.problems * c.progress) / 100)}/{c.problems} problems
                  </span>
                </div>
                <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full bg-accent transition-[width] duration-700 ease-out"
                    style={{ width: `${c.progress}%` }}
                  />
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>acceptance rate</span>
                  <span className="text-success">{c.acceptance}%</span>
                </div>
                <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full bg-success transition-[width] duration-700 ease-out"
                    style={{ width: `${c.acceptance}%` }}
                  />
                </span>
              </div>

              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 font-mono text-[10px] text-muted-foreground">
                <div>
                  <dt>problems</dt>
                  <dd className="mt-1 font-display text-sm font-semibold text-foreground tabular-nums">
                    {c.problems}
                  </dd>
                </div>
                <div>
                  <dt>questions</dt>
                  <dd className="mt-1 font-display text-sm font-semibold text-foreground tabular-nums">
                    {c.questions}
                  </dd>
                </div>
                <div>
                  <dt>design</dt>
                  <dd className="mt-1 font-display text-sm font-semibold text-foreground tabular-nums">
                    {c.design}
                  </dd>
                </div>
              </dl>
            </article>

            <div className="grid max-h-[460px] gap-px overflow-y-auto rounded-xl border border-border bg-border">
              {companies.map((co, i) => (
                <button
                  key={co.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex items-center justify-between gap-3 px-5 py-3 text-left transition-colors ${
                    i === active ? "bg-elevated" : "bg-card hover:bg-elevated"
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-sm">
                    <CompanyLogo name={co.name} domain={co.domain} size={16} />
                    {co.name}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden h-1 w-20 overflow-hidden rounded-full bg-muted sm:block">
                      <span className="block h-full bg-accent" style={{ width: `${co.progress}%` }} />
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                      {co.progress}%
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyCard({
  company: co,
  selected,
  onSelect,
}: {
  company: Company;
  selected: boolean;
  onSelect: () => void;
}) {
  const stats = [
    { label: "problems", value: co.problems },
    { label: "questions", value: co.questions },
    { label: "design", value: co.design },
    { label: "behavioral", value: co.behavioral },
  ];

  return (
    <button
      role="tab"
      type="button"
      aria-selected={selected}
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      className={`group relative flex flex-col items-stretch justify-start overflow-hidden p-5 text-left transition-colors duration-300 ${
        selected ? "bg-elevated" : "bg-card hover:bg-elevated"
      }`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-px origin-left bg-accent transition-transform duration-500 ${
          selected ? "scale-x-100" : "scale-x-0"
        }`}
        aria-hidden="true"
      />

      <span className="flex items-center gap-3">
        <span
          className={`flex shrink-0 items-center justify-center rounded-lg border border-border bg-surface transition-all duration-300 ease-out ${
            selected ? "h-12 w-12" : "h-9 w-9"
          }`}
        >
          <CompanyLogo name={co.name} domain={co.domain} size={selected ? 26 : 18} />
        </span>
        <span className="min-w-0">
          <span
            className={`block truncate font-display font-semibold transition-all duration-300 ${
              selected ? "text-base text-foreground" : "text-sm text-muted-foreground"
            }`}
          >
            {co.name}
          </span>
          <span className="mt-0.5 block font-mono text-[10px] text-muted-foreground">
            {co.level} bar · {co.acceptance}% acceptance
          </span>
        </span>
      </span>

      <span
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
        style={{ gridTemplateRows: selected ? "1fr" : "0fr", opacity: selected ? 1 : 0 }}
        aria-hidden={!selected}
      >
        <span className="overflow-hidden">
          <span className="mt-4 grid grid-cols-4 gap-2 border-t border-border pt-4">
            {stats.map((s) => (
              <span key={s.label} className="block">
                <span className="block font-display text-base font-semibold tabular-nums">
                  {s.value}
                </span>
                <span className="mt-0.5 block font-mono text-[9px] tracking-wide text-muted-foreground uppercase">
                  {s.label}
                </span>
              </span>
            ))}
          </span>
          <span className="mt-4 block">
            <span className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>your progress</span>
              <span className="tabular-nums">{co.progress}%</span>
            </span>
            <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full bg-accent transition-[width] duration-700 ease-out"
                style={{ width: selected ? `${co.progress}%` : "0%" }}
              />
            </span>
          </span>
        </span>
      </span>

      <span
        className={`mt-3 block font-mono text-[10px] text-muted-foreground transition-opacity duration-300 ${
          selected ? "opacity-0" : "opacity-100"
        }`}
      >
        {co.problems} problems · hover to expand
      </span>
    </button>
  );
}
