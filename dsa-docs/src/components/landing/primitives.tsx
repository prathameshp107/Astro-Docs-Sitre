import type { ReactNode } from "react";

/** Small mono eyebrow used to number and name each chapter of the story. */
export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs tracking-widest text-accent uppercase">
      <span className="text-muted-foreground/70">{index}</span>
      <span className="h-px w-6 bg-border-strong" />
      {children}
    </p>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  lede,
  aside,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <Eyebrow index={index}>{kicker}</Eyebrow>
        <h2 className="mt-5 text-3xl leading-[1.08] font-semibold text-balance md:text-[2.75rem]">
          {title}
        </h2>
        {lede ? (
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{lede}</p>
        ) : null}
      </div>
      {aside}
    </div>
  );
}

/** A convincing app-window frame: traffic lights, path label, hairline chrome. */
export function Window({
  label,
  children,
  className = "",
  tabs,
  activeTab = 0,
  onTabChange,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  tabs?: string[];
  activeTab?: number;
  onTabChange?: (tab: string, index: number) => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_70px_-40px_rgba(0,0,0,0.55)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">{label}</span>
        {tabs ? (
          <div className="ml-auto hidden gap-1 sm:flex">
            {tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                onClick={() => onTabChange?.(t, i)}
                className={`rounded-md px-2 py-1 font-mono text-[10px] transition-colors ${
                  i === activeTab
                    ? "bg-elevated text-foreground font-medium"
                    : "text-muted-foreground/70 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/** Syntax-flavoured code line. Tokens are pre-split so no runtime highlighter is needed. */
export function Code({
  lines,
  start = 1,
  className = "",
}: {
  lines: { t: string; c?: string }[][];
  start?: number;
  className?: string;
}) {
  return (
    <pre className={`overflow-x-auto p-4 font-mono text-[12px] leading-[1.75] ${className}`}>
      <code>
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-5 shrink-0 text-right text-muted-foreground/40 select-none">
              {start + i}
            </span>
            <span className="whitespace-pre">
              {line.map((tok, j) => (
                <span key={j} className={tok.c ?? "text-foreground/85"}>
                  {tok.t}
                </span>
              ))}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
}

export const tok = {
  kw: "text-accent",
  fn: "text-info",
  str: "text-success",
  num: "text-warning",
  com: "text-muted-foreground/60 italic",
  punc: "text-muted-foreground",
};

export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    muted: "border-border bg-surface text-muted-foreground",
    accent: "border-accent/40 bg-accent-soft text-accent",
    success: "border-success/30 text-success",
    warning: "border-warning/30 text-warning",
    info: "border-info/30 text-info",
    danger: "border-destructive/30 text-destructive",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
