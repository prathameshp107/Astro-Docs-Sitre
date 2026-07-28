import heroApp from "@/assets/hero-app.jpg";
import labEditor from "@/assets/lab-editor.jpg";
import dsaVisualizer from "@/assets/dsa-visualizer.jpg";
import progressDashboard from "@/assets/progress-dashboard.jpg";
import { SectionHead } from "./primitives";
import { MacBook, Monitor } from "./devices";
import { Layer, LayerHead, Stack } from "./LayeredShot";

export function Showcase() {
  return (
    <section id="showcase" className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-40"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHead
          index="02"
          kicker="The product"
          title="One workspace, on every desk you own"
          lede="Not screenshots side by side — the real surfaces, layered the way they stack in use: the editor behind, the console, the tests and the reward floating over it."
        />

        {/* ---- Documentation composition ---- */}
        <div className="reveal mt-16 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] tracking-wide text-accent uppercase">
              documentation
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-[2rem]">
              Explorer, search, diagram, preview — one surface
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Open a concept and the whole reading environment assembles: the tree on the left,
              command search over the top, the architecture diagram inline and an assistant that
              answers from the page you're on.
            </p>
          </div>

          <div className="lg:col-span-8">
            <Stack className="pt-10 pb-20">
              <Monitor
                src={heroApp}
                alt="Interview Prep Docs documentation workspace on a desktop display"
                label="interviewprepdocs.dev/docs/react/reconciliation"
              />


            

              <Layer
                at={{ bottom: "2%", right: "-4%" }}
                width="46%"
                depth={150}
                delay={480}
                from="right"
              >
                <LayerHead>preview · code</LayerHead>
                <pre className="overflow-hidden px-3.5 py-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
                  <code>{`<ul>
  {items.map(i => (
    <Row key={i.id} {...i} />
  ))}
</ul>`}</code>
                </pre>
              </Layer>

            </Stack>
          </div>
        </div>

        {/* ---- Labs composition ---- */}
        <div className="reveal mt-24 grid items-center gap-12 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-8">
            <Stack className="pt-12 pb-16">
              <MacBook src={labEditor} alt="Interactive lab editor open on a laptop" />

             

              <Layer at={{ top: "-3%", right: "2%" }} width="38%" depth={150} delay={300}>
                <LayerHead dot="var(--color-success)">tests · 4 / 4 passing</LayerHead>
                <ul className="px-3.5 py-2.5">
                  {["empty input", "single node", "cycle detected", "large graph"].map((t) => (
                    <li
                      key={t}
                      className="flex items-center justify-between py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      <span>✓ {t}</span>
                      <span className="text-success">pass</span>
                    </li>
                  ))}
                </ul>
              </Layer>

              <Layer
                at={{ bottom: "6%", right: "-6%" }}
                width="32%"
                depth={200}
                delay={460}
                from="right"
              >
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground">xp earned</p>
                    <p className="font-display text-xl font-semibold text-accent">+120</p>
                  </div>
                  <span className="rounded-full border border-success/40 bg-success/10 px-2.5 py-1 font-mono text-[10px] text-success">
                    Accepted
                  </span>
                </div>
              </Layer>

              <Layer
                at={{ bottom: "-4%", left: "12%" }}
                width="40%"
                depth={240}
                delay={620}
                className="hidden sm:block"
              >
                <div className="flex items-center gap-4 px-4 py-3">
                  <span className="font-mono text-[10px] text-muted-foreground">streak</span>
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                    <span className="block h-full w-[72%] bg-accent" />
                  </span>
                  <span className="font-mono text-[10px] text-foreground">18d</span>
                </div>
              </Layer>
            </Stack>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-4">
            <p className="font-mono text-[10px] tracking-wide text-accent uppercase">
              programming labs
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-[2rem]">
              Built for the late-night laptop session
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Editor, console, tests, verdict and reward stack in one frame — the whole loop fits on
              a 13-inch screen without a single collapsed panel.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
              {[
                ["4", "language runtimes"],
                ["41ms", "median run time"],
                ["0", "context switches"],
                ["100%", "keyboard driven"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-xl font-semibold">{n}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ---- Practice composition ---- */}
        <div className="reveal mt-24">
          <Stack className="mx-auto max-w-4xl pt-8 pb-14">
            <div className="overflow-hidden rounded-xl border border-border-strong bg-card shadow-[0_60px_100px_-60px_rgba(0,0,0,0.7)]">
              <img
                src={typeof dsaVisualizer === "string" ? dsaVisualizer : dsaVisualizer.src}
                alt="Algorithm visualizer running a traversal"
                loading="lazy"
                className="block w-full object-cover"
              />
            </div>

            {/* <Layer
              at={{ bottom: "8%", left: "-2%" }}
              width="36%"
              depth={140}
              delay={200}
              from="left"
            >
              <LayerHead>progress · this week</LayerHead>
              <img
                src={progressDashboard}
                alt="Progress and XP dashboard"
                loading="lazy"
                className="block w-full object-cover"
              />
            </Layer> */}

          </Stack>
        </div>
      </div>
    </section>
  );
}
