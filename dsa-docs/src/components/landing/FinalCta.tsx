import { ArrowRight, Code2, Sparkles, Terminal } from "lucide-react";

const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

export function FinalCta() {
  return (
    <section id="start" className="relative overflow-hidden border-b border-border bg-surface py-28 md:py-36">
      {/* Background Gradients & Grid */}
      <div className="pointer-events-none absolute inset-0 grid-fine opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        {/* Kicker Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-[11px] font-semibold text-accent uppercase tracking-wider shadow-xs mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>12 · Code to Mastery</span>
        </div>

        <h2 className="mx-auto text-4xl leading-[1.08] font-bold text-foreground text-balance md:text-6xl tracking-tight">
          This is not another video platform.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          It's an entire developer operating system. Free to start — no credit card, no drip-fed course emails. Just the real docs, Monaco labs, algorithm visualizers, and the loop.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`${base}dsa/problems`}
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
          >
            <span>Start Learning Free</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={`${base}overview/`}
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-border hover:bg-elevated"
          >
            <Code2 className="h-4 w-4 text-accent" />
            <span>Explore the Docs</span>
          </a>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] text-muted-foreground">
          <span>✓ Instant Access</span>
          <span>✓ No Credit Card Needed</span>
          <span>✓ 150+ Interactive Problems</span>
        </div>
      </div>
    </section>
  );
}
