import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const values = [2, 7, 11, 15];
const steps = [
  { title: "Find two numbers that add up to 9", description: "We need two different indices. A hash map remembers each number and its index as we scan the array.", current: -1, stored: false, found: false, calculation: "target = 9", map: "empty" },
  { title: "Read 2 at index 0", description: "The complement is 9 − 2 = 7. The map is empty, so we have not seen a matching number yet.", current: 0, stored: false, found: false, calculation: "9 − 2 = 7 · not found", map: "empty" },
  { title: "Remember 2 and its index", description: "Store 2 → 0 in the map. Check for a complement before storing the current number so we never reuse the same element.", current: 0, stored: true, found: false, calculation: "store value 2 at index 0", map: "2 → index 0" },
  { title: "Read 7 at index 1", description: "Now we need 9 − 7 = 2. The map already contains 2 at index 0, so we have found our pair.", current: 1, stored: true, found: true, calculation: "9 − 7 = 2 · found at index 0", map: "2 → index 0" },
  { title: "Return indices [0, 1]", description: "2 + 7 = 9. We can stop without visiting 11 or 15. Across an array of n numbers, this approach takes O(n) expected time and O(n) extra space.", current: 1, stored: true, found: true, calculation: "nums[0] + nums[1] = 9", map: "2 → index 0" },
];

export function Hero() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-14 md:pt-20 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="mb-5 font-mono text-xs tracking-wide text-accent">Interview Prep Buddy · Learn by doing</p>
            <h1 className="text-[2.5rem] font-bold leading-[1.08] tracking-[-0.04em] text-balance sm:text-5xl md:text-[3.8rem]">
              Coding interview prep you can <span className="font-serif font-normal italic text-accent">see and practice.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              Understand DSA with step-by-step visualizers. Practice coding problems,
              check your knowledge with quizzes, and work through system design and
              frontend interview guides at your own pace.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href={`${base}plans/`} className={`inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 ${focus}`}>
                Choose a study plan <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={`${base}visualizer/`} className={`inline-flex items-center gap-2 rounded-lg px-1 py-3 text-sm font-semibold text-foreground underline decoration-border-strong underline-offset-4 hover:text-accent ${focus}`}>Explore DSA visualizers</a>
            </div>
            <nav aria-label="Choose your interview practice" className="mt-8 border-t border-border pt-5">
              <p className="mb-3 text-xs text-muted-foreground">Already know what you need?</p>
              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
                <a href={`${base}dsa/problems/`} className={`hover:text-accent ${focus}`}>Coding problems <span aria-hidden="true">↗</span></a>
                <a href={`${base}mcq/`} className={`hover:text-accent ${focus}`}>Interview quizzes <span aria-hidden="true">↗</span></a>
                <a href={`${base}system-design/`} className={`hover:text-accent ${focus}`}>System design <span aria-hidden="true">↗</span></a>
              </div>
            </nav>
          </div>
          <div className="min-w-0 lg:col-span-6">
            <section aria-label="Interactive Two Sum walkthrough" className="overflow-hidden rounded-2xl border border-border-strong bg-card">
              <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface px-5 py-4">
                <div><p className="text-xs text-muted-foreground">Try a visual explanation</p><h2 className="mt-1 text-lg font-semibold tracking-tight">Two Sum, one step at a time</h2></div>
                <span className="rounded border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground">Hash map</span>
              </header>
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground"><span>nums = [2, 7, 11, 15]</span><span>target: 9</span></div>
                <ol aria-label="Array values and indices" className="my-6 grid grid-cols-4 gap-2 sm:gap-3">
                  {values.map((value, index) => {
                    const matched = step.found && index < 2;
                    const current = step.current === index;
                    return (
                      <li key={index} className="min-w-0 text-center">
                        <span className="mb-2 block font-mono text-[11px] text-muted-foreground">index {index}</span>
                        <span className={`flex h-14 items-center justify-center rounded-lg border-2 font-mono text-xl font-semibold ${matched || current ? "border-accent bg-accent/10 text-foreground" : "border-border bg-surface text-muted-foreground"}`}>{value}</span>
                        <span className="mt-2 block h-4 text-[10px] font-medium text-accent">{matched ? "Pair found" : current ? "Current" : step.stored && index === 0 ? "In map" : ""}</span>
                      </li>
                    );
                  })}
                </ol>
                <div className="rounded-lg bg-surface px-4 py-3 font-mono text-xs leading-relaxed">
                  <p className="text-muted-foreground">seen: <span className="text-foreground">{step.map}</span></p><p className="mt-1 text-foreground">{step.calculation}</p>
                </div>
                <div aria-live="polite" aria-atomic="true" className="min-h-[160px] pt-5 sm:min-h-[145px]">
                  <p className="text-xs font-medium text-accent">Step {stepIndex + 1} of {steps.length}</p><h3 className="mt-2 text-base font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <button type="button" aria-label="Restart Two Sum walkthrough" onClick={() => setStepIndex(0)} disabled={stepIndex === 0} className={`rounded-md p-2 text-muted-foreground hover:bg-surface disabled:opacity-40 ${focus}`}><RotateCcw className="h-4 w-4" aria-hidden="true" /></button>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setStepIndex((i) => Math.max(0, i - 1))} disabled={stepIndex === 0} className={`inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface disabled:opacity-40 ${focus}`}><ChevronLeft className="h-4 w-4" aria-hidden="true" />Back</button>
                    <button type="button" onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))} disabled={stepIndex === steps.length - 1} className={`inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-40 ${focus}`}>Next step<ChevronRight className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                </div>
              </div>
              <a href={`${base}visualizer/hash-table/?track=two-sum-hash`} className={`flex items-center justify-between gap-3 border-t border-border bg-surface px-5 py-4 text-xs font-semibold hover:text-accent ${focus}`}>Explore the full hash table visualizer <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a>
            </section>
            <p className="mt-3 text-center text-xs text-muted-foreground">Follow the reasoning. Then solve it yourself.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
