import { ArrowRight } from "lucide-react";

const GithubIcon = ({ className = "h-3.5 w-3.5" }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ className = "h-3.5 w-3.5" }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className = "h-3.5 w-3.5" }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

const groups = [
  {
    title: "Learn",
    links: [
      { label: "Documentation", get href() { return `${base}overview/`; } },
      { label: "Interactive Labs", get href() { return `${base}labs`; } },
      { label: "DSA Playground", get href() { return `${base}dsa/problems`; } },
      { label: "Algorithm Visualizers", get href() { return `${base}visualizer`; } },
    ],
  },
  {
    title: "Prepare",
    links: [
      { label: "Interview Preparation", get href() { return `${base}interview-questions`; } },
      { label: "MCQ Hub", get href() { return `${base}mcq`; } },
      { label: "Guided Roadmaps", get href() { return `${base}plans`; } },
      { label: "Company Prep", get href() { return `${base}companies`; } },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Community & Achievements", get href() { return `${base}review`; } },
      { label: "Progress & XP", get href() { return `${base}review`; } },
      { label: "GitHub", href: "https://github.com/prathameshp107/DSA-Notes-Problems" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Newsletter", href: "#newsletter" },
      { label: "Changelog", href: "#" },
      { label: "Public Roadmap", get href() { return `${base}plans`; } },
      { label: "Contribute", href: "https://github.com/prathameshp107/DSA-Notes-Problems" },
    ],
  },
];

const socials = [
  { label: "GitHub", icon: GithubIcon },
  { label: "X", icon: TwitterIcon },
  { label: "LinkedIn", icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <img
                src={`${base}logo-icon.png`}
                alt="Interview Prep Buddy Logo"
                width="28"
                height="28"
                className="h-7 w-7 object-contain"
                loading="lazy"
              />
              <span className="font-display text-[15px] font-bold">Interview Prep <span className="text-primary">Buddy</span></span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A Developer Learning Operating System — from first line of code to signed offer.
            </p>

            <form
              id="newsletter"
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 max-w-xs scroll-mt-24"
            >
              <label
                htmlFor="footer-email"
                className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase"
              >
                newsletter · weekly build log
              </label>
              <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-border bg-card p-1.5 transition-colors focus-within:border-border-strong">
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@domain.dev"
                  className="min-w-0 flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to the newsletter"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                New labs, visualizers and question banks. No noise.
              </p>
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {groups.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <h2 className="text-xs font-semibold tracking-wide uppercase">{g.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Interview Prep Buddy</p>
          <div className="flex items-center gap-3">
            {socials.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#top"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card transition-colors hover:border-border-strong hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              </a>
            ))}
          </div>
          <p>Built with React, TanStack Start and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
