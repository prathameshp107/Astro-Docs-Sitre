import type { ReactNode } from "react";
import { SectionHead } from "./primitives";
import { useScrollScene } from "@/hooks/use-scroll-scene";

/**
 * A chapter that plays instead of scrolls: the wrapper is tall, the stage is
 * pinned, and the reader's scroll advances the beats one by one.
 */
export function Scene({
  id,
  index,
  kicker,
  title,
  lede,
  beats,
  className = "",
  vhPerBeat = 62,
  children,
}: {
  id: string;
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  beats: string[];
  className?: string;
  vhPerBeat?: number;
  children: (stage: number, progress: number) => ReactNode;
}) {
  const { ref, stage, progress } = useScrollScene<HTMLDivElement>(beats.length);

  return (
    <section id={id} className={`border-b border-border ${className}`}>
      <div className="mx-auto max-w-6xl px-5 pt-24 md:pt-28">
        <SectionHead index={index} kicker={kicker} title={title} lede={lede} />
      </div>

      <div ref={ref} className="relative" style={{ height: `${beats.length * vhPerBeat + 110}vh` }}>
        <div className="sticky top-14 pt-8 pb-14">
          <div className="mx-auto max-w-6xl px-5">
            <BeatRail beats={beats} stage={stage} progress={progress} />
            <div className="mt-6">{children(stage, progress)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeatRail({
  beats,
  stage,
  progress,
}: {
  beats: string[];
  stage: number;
  progress: number;
}) {
  return (
    <div>
      <div className="h-px w-full overflow-hidden bg-border">
        <span
          className="block h-full bg-accent transition-[width] duration-200 ease-linear"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <ol className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-wide uppercase">
        {beats.map((b, i) => {
          const done = stage > i + 1;
          const active = stage === i + 1;
          return (
            <li
              key={b}
              className={`flex items-center gap-1.5 transition-colors duration-300 ${
                active
                  ? "text-accent"
                  : done
                    ? "text-foreground/70"
                    : "text-muted-foreground/45"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? "scale-125 bg-accent"
                    : done
                      ? "bg-border-strong"
                      : "bg-border"
                }`}
              />
              {b}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
