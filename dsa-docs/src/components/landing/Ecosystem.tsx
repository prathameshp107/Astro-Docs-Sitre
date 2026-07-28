import { useState } from "react";
import {
  BookText,
  Braces,
  Binary,
  Building2,
  Compass,
  Flame,
  ListChecks,
  MessagesSquare,
  PlayCircle,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { spotlightHandlers } from "@/hooks/use-theme";
import { SectionHead } from "./primitives";

const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

const categories = [
  { id: "all", label: "All Surfaces" },
  { id: "core", label: "Core Practice" },
  { id: "interview", label: "Interview Prep" },
  { id: "growth", label: "Growth & XP" },
];

const products = [
  {
    icon: BookText,
    name: "Documentation",
    category: "core",
    what: "Depth-first written guides, not video transcripts.",
    why: "Reading is faster than watching when you already know 60% of a topic.",
    stat: "40+ guides",
    get href() { return `${base}overview/`; },
    span: "md:col-span-3 lg:col-span-4",
  },
  {
    icon: Braces,
    name: "Interactive Labs",
    category: "core",
    what: "A real editor and test suite inside every lesson.",
    why: "Concepts stick when the suite goes green with your code.",
    stat: "180 labs",
    get href() { return `${base}labs`; },
    span: "md:col-span-3 lg:col-span-4",
  },
  {
    icon: Binary,
    name: "DSA Playground",
    category: "core",
    what: "Curated problems with hints, editorials and submissions.",
    why: "Pattern coverage beats random problem grinding.",
    stat: "150 problems",
    get href() { return `${base}dsa/problems`; },
    span: "md:col-span-6 lg:col-span-4",
  },
  {
    icon: PlayCircle,
    name: "Algorithm Visualizers",
    category: "core",
    what: "Frame-by-frame animation with the matching pseudocode line.",
    why: "You cannot debug what you cannot picture.",
    stat: "22 algorithms",
    get href() { return `${base}visualizer`; },
    span: "md:col-span-3 lg:col-span-3",
  },
  {
    icon: MessagesSquare,
    name: "Interview Preparation",
    category: "interview",
    what: "Question banks per round: coding, design, behavioral.",
    why: "Rehearsal removes the surprise from the real loop.",
    stat: "650+ questions",
    get href() { return `${base}interview-questions`; },
    span: "md:col-span-3 lg:col-span-3",
  },
  {
    icon: ListChecks,
    name: "MCQ Hub",
    category: "interview",
    what: "Timed rapid-fire rounds with instant explanations.",
    why: "Screening rounds are won on fundamentals under a clock.",
    stat: "1,200 MCQs",
    get href() { return `${base}mcq`; },
    span: "md:col-span-3 lg:col-span-3",
  },
  {
    icon: Compass,
    name: "Guided Roadmaps",
    category: "growth",
    what: "Week-by-week plans that chain every surface together.",
    why: "A finite path beats an infinite content library.",
    stat: "6 tracks",
    get href() { return `${base}plans`; },
    span: "md:col-span-3 lg:col-span-3",
  },
  {
    icon: Building2,
    name: "Company Preparation",
    category: "interview",
    what: "Banks tuned to how each company actually interviews.",
    why: "Google's bar is not Stripe's bar.",
    stat: "12 companies",
    get href() { return `${base}companies`; },
    span: "md:col-span-3 lg:col-span-3",
  },
  {
    icon: TrendingUp,
    name: "Progress Tracking",
    category: "growth",
    what: "Topic-level readiness, not a vanity completion bar.",
    why: "Identify exact weaknesses before entering real loops.",
    stat: "live",
    get href() { return `${base}review`; },
    span: "md:col-span-3 lg:col-span-3",
  },
  {
    icon: Sparkles,
    name: "XP System",
    category: "growth",
    what: "Every solved case, lab and quiz earns weighted XP.",
    why: "Gamified retention backed by persistent telemetry.",
    stat: "8,420 avg",
    get href() { return `${base}review`; },
    span: "md:col-span-3 lg:col-span-3",
  },
  {
    icon: Flame,
    name: "Daily Streaks",
    category: "growth",
    what: "One problem a day keeps the plan alive.",
    why: "Daily momentum compounds over 18-week roadmaps.",
    stat: "12 days",
    get href() { return `${base}review`; },
    span: "md:col-span-3 lg:col-span-3",
  },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="01"
          kicker="What we have"
          title="Fourteen surfaces. One operating system."
          lede="Every part of the platform hands off to the next one. Read a concept, practice it in a lab, watch it run, drill it in a quiz, then defend it in a mock interview round."
          aside={
            <a
              href={`${base}overview/`}
              className="rounded-lg border border-border-strong bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-elevated"
            >
              Open platform
            </a>
          }
        />

        {/* Surface Grid */}
        <div className="mt-14 grid gap-4 md:grid-cols-6 lg:grid-cols-12">
          {products.map(({ icon: Icon, ...p }) => (
            <a
              key={p.name}
              href={p.href}
              {...spotlightHandlers()}
              className={`reveal spotlight card-lift group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-xl ${p.span}`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="rounded-md border border-border/60 bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {p.stat}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-base font-semibold text-foreground">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.what}</p>
                {p.why ? (
                  <p className="mt-3 border-t border-border/70 pt-3 font-mono text-[11px] leading-relaxed text-muted-foreground/80">
                    {p.why}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex items-center gap-1.5 font-mono text-xs font-medium text-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explore surface
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
