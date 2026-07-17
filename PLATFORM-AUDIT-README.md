# Platform Audit — Performance / Accessibility / SEO / Code Quality & Security

> Extracted from `UX-CX-AUDIT.md` §9–§10 (broader technical sweep, not AI-related). Read-only findings — nothing here has been implemented yet.

## Performance

- **Every heavy hub hydrates eagerly.** All `.astro` pages use only `client:load` (~65×) or `client:only="react"` (~15×) — **zero** uses of `client:idle`/`client:visible`/`client:media` anywhere. `MCQHub`, `LabHub`, `DSAVisualizerHub`, `DSAProblemList`, `CompanyDirectory`, `ReviewSession`, `InterviewQuestionHub` etc. all block/hydrate immediately even though none are above-the-fold-critical.
  - **Fix:** switch these to `client:visible` (hydrate when scrolled into view) or at minimum `client:idle`. Reserve `client:load` for `AppNav` only (it's genuinely needed immediately on every page).
- **`client:only="react"` Labs platforms render nothing until JS loads** (no SSR fallback) — combined with Monaco/Pyodide/sql.js this is a blank-page flash on every lab visit.
  - **Fix:** add a lightweight static skeleton/loading shell in the `.astro` file itself (plain HTML, no hydration) so there's paint before the island mounts.
- **No resource hints for the CDN runtimes** actually fetched at runtime — `unpkg.com` (React UMD for the in-iframe React runner, `src/components/labs/react/runner/reactRunner.js:41-42`) and `cdn.jsdelivr.net` (Pyodide, `src/workers/py-judge.worker.js`, `python-lab.astro`). Only Google Fonts origins get `preconnect`.
  - **Fix:** add `<link rel="preconnect" href="https://unpkg.com">` / `https://cdn.jsdelivr.net` to the React/Python lab pages specifically (not sitewide — no need to pay the connection cost on pages that don't use them).
- **Font `<head>` block is copy-pasted into 51 separate `.astro` files** (same 3-family Google Fonts `<link>` + inline theme-detection script) because **no shared `Layout.astro`/`BaseHead.astro` exists**.
  - **Fix:** extract a `src/layouts/BaseHead.astro` with the fonts/theme-script block; import it in every page. One-time refactor, then font/theme changes are a single-file edit forever after.
- **Unoptimized images:** no `astro:assets`/`<Image>` usage anywhere; several 1.2–1.6MB GIFs served raw from `public/assets/js/` (`microtask3.gif`, `microtask.gif`, `microtask5.gif`, `microtask6.gif`, `microtask2.gif`).
  - **Fix:** convert those GIFs to optimized video (`<video autoplay loop muted>`) or WebP/APNG, and route future doc images through `astro:assets` for automatic sizing/format.
- **No `manualChunks` / vendor splitting** in `astro.config.mjs`, and each `client:only` lab imports its own copies of heavy deps (Monaco, Babel-standalone, D3, `@xyflow/react`) — likely duplicated vendor code across per-lab bundles.
  - **Fix:** add `vite.build.rollupOptions.output.manualChunks` grouping shared heavy deps (Monaco, D3) into one chunk reused across labs that need them.
- **No service worker / PWA manifest exists** — confirmed absent (no `sw.js`, no `manifest.json`/`site.webmanifest`, no `navigator.serviceWorker.register`). Matches the companion Labs plan's "offline breaks" flag; noted here as a platform-wide gap, not just a Labs one.

## Accessibility

- **No focus trap / `role="dialog"` on the command palette** (`LabCommandPalette.jsx`) — Tab can escape behind the overlay.
  - **Fix:** add `role="dialog"` `aria-modal="true"`, and trap focus (headlessui's `Dialog`, already a project dependency via `@headlessui/react`, does this for free).
- **Resizable panel handles are mouse-only** (`LabResizableHandle.jsx`) — a plain `<div>` with `mousedown`/`mousemove`, no `tabIndex`, `role="separator"`, `aria-valuenow`, or keyboard handler. Panels cannot be resized via keyboard at all.
  - **Fix:** add `role="separator"` `tabIndex={0}` `aria-orientation` and arrow-key resize handling.
- **29 occurrences of `focus:outline-none` with no replacement focus ring**, concentrated in `AuthButton.jsx` (10 instances alone) across 11 files — keyboard focus becomes invisible on many controls.
  - **Fix:** replace with a visible `focus-visible:ring-2` (Tailwind) or an explicit `:focus-visible` CSS rule using the existing token palette.
- **Decorative icon `aria-hidden` pattern from `AppNav.jsx` isn't followed elsewhere** — zero `aria-hidden` usage across the entire `components/labs/**` tree (30+ files using `react-icons`) and in `AuthButton.jsx`; `MCQHub.jsx` inline SVGs (lines 135/144/153/245) also lack it.
  - **Fix:** sweep decorative icons in those files and add `aria-hidden="true"`, matching the existing `AppNav` convention.
- **Heading-level skips:** `LabHub.jsx` (`h1` → `h3`, skips `h2`) and `DSAVisualizerHub.jsx` (`h2` → `h4`, skips `h3`).
  - **Fix:** renumber to sequential levels; no visual change needed if font-size classes are decoupled from the semantic tag.
- **14 `<div onClick>` "fake buttons"** without `role="button"`/keydown handling across `StoryBuilder.jsx`, `MiniApps.jsx`, `FixBug.jsx`, `GitLanding.jsx` and similar.
  - **Fix:** convert to real `<button>` elements where visually feasible (removes the need for manual `role`/`tabIndex`/keydown shims).
- **Reduced-motion respected in only ~5 places**, not honored in all 11 visualizers, `MCQQuiz.jsx`'s confetti/XP-flyout, `MCQHub.jsx`, `MCQCategory.jsx`, `MCQDashboard.jsx`, `ReviewSession.jsx`.
  - **Fix:** centralize a `usePrefersReducedMotion()` hook (one already informs `LabHub`/palette) and gate the animation-heavy code paths in the listed components behind it.
- **Auth form labeling gaps:** username input's `<label>` isn't linked via `htmlFor`/`id`; the email magic-link input has no `<label>` at all (placeholder only); `modalError` isn't `aria-live`, so screen readers won't announce auth errors.
  - **Fix:** wire `htmlFor`/`id` pairs, add a (visually-hideable) `<label>` for the email field, add `aria-live="polite"` to the error region.

## SEO / Metadata

- **Title collision:** `/labs/css` and `/labs/css-lab` share the identical `<title>` ("CSS Labs — Interactive CSS Learning Platform") while both are live, indexed routes.
  - **Fix:** resolved automatically once the IA fix (`/labs/css` → `/labs/css-lab` redirect) ships — only one indexable URL remains.
- **No `<link rel="canonical">` emitted anywhere**, even though `SEOHead.astro:21` already computes `canonicalUrl` (it's only used for `og:url` and JSON-LD, line 45/100) — confirmed zero real canonical tags in built `dist/*.html`, and `dist/sitemap-0.xml` (2,313 URLs) includes both `/labs/css/` and `/labs/css-lab/`.
  - **Fix:** in `SEOHead.astro`, add `<link rel="canonical" href={canonicalUrl} />` next to the existing `og:url` line — one-line addition, reuses a value that's already computed.
- **Open Graph / Twitter cards only exist on Starlight docs pages** (via `SEOHead.astro`, wired as the Starlight `Head` override) — every standalone `src/pages/**/*.astro` (labs, mcq, visualizer, companies except `[slug]`, plans) has no `og:`/`twitter:` tags, so link shares from those pages render with no preview.
  - **Fix:** extract `SEOHead.astro`'s OG/Twitter block into a small reusable partial and import it in the standalone pages' `<head>` (natural to combine with the `BaseHead.astro` extraction above).
- **Several pages render their `<h1>` client-side only** (inside the hydrated React island, invisible to crawlers pre-hydration): `labs/css.astro`, `labs/css-lab.astro`, `mcq/index.astro`, `mcq/[category].astro`, `visualizer/arrays.astro`, `plans/[slug].astro`.
  - **Fix:** move a static `<h1>` into the `.astro` shell itself (as `dsa/problems.astro` and `problems/index.astro` already do), even if the island re-renders its own heading below/instead — crawlers and no-JS visibility need one in the initial HTML.
- **No `@astrojs/sitemap` integration** — sitemap comes from Starlight's bundled default, which is why non-doc routes' duplicate-content issue reaches the sitemap unfiltered. Structured data (JSON-LD) exists for docs (`SEOHead.astro`) and company pages (`companies/[slug].astro`) but nowhere else — acceptable, not every page needs it.

## Code Quality & Security

- **Leftover duplicate/forked content dirs beyond the already-known `JavaScript/javascript` case-dupe:** `src/content/docs/nextjs/phase-1-fundamentals/module-1-settingup/` vs `module-1-setting-up/` (near-identical, one copy corrupted — `import Button from '../components/BGUTTON'`, "Custom Forks" instead of "Custom Hooks"); and in `phase-05-authentication/`, `01-authentication-basics/` vs `authentication/` and `02-authjs-nextauth/` vs `authjs/` are drifted duplicate forks of the same lessons.
  - **Fix:** diff each pair, keep the non-corrupted/most complete version, delete the other, fix any internal links pointing at the deleted path.
- **Minor XSS-adjacent issue, low real severity:** `src/components/labs/react/runner/reactRunner.js:66-77` builds sandboxed-iframe `srcdoc` HTML and interpolates `err.message` unescaped into it. Since the iframe already runs arbitrary user-authored code (`sandbox="allow-scripts"`), this is self-XSS, not a real escalation — but still worth escaping on principle/lint-cleanliness.
  - **Fix:** HTML-escape `err.message` before interpolation (or render it via `textContent` instead of a raw template string).
- **No hardcoded secrets found** — Supabase URL/anon key are correctly read via `import.meta.env.PUBLIC_SUPABASE_*` with a safe mock fallback (`src/lib/supabase.js:3-4`). Good as-is, no action needed.
- **Tests exist but are unwired:** `src/lib/srs/sm2.test.js` and `src/lib/sync/merges.test.js` are real vitest files, but `package.json` has no `"test"` script and no `vitest.config.*` — so in practice they never run (corrects the companion plan's "zero developer tests" claim to "tests exist, but nothing executes them").
  - **Fix:** add `"test": "vitest run"` to `package.json` scripts (and ideally a CI workflow that runs it on PRs) — near-zero effort to reactivate coverage that already exists.
- **No ESLint configured at all** (no config file, no `eslint` dependency) — `tsconfig.json` extends `astro/tsconfigs/strict` but nothing (no CI) actually runs `tsc`/`astro check` against it, so the strict config is aspirational only.
  - **Fix:** add a baseline ESLint config (`eslint-plugin-astro` + `eslint-plugin-jsx-a11y` would directly catch several accessibility issues above going forward) and a CI workflow running lint + `astro check` + `vitest run` on PRs.
- **`console.log` volume (689 hits/40 files) is mostly benign** — the large majority are lesson/quiz content strings or default editor placeholder code shown to learners (`ReactPlayground.jsx`, `MonacoPlayground.jsx`, `OOPCheatSheet.jsx`), not leftover debug statements. No `debugger;` statements found anywhere. No action needed beyond the `reactRunner.js` item above.
- **No TODO/FIXME/HACK debt in real source** — the 26 files matched are either teaching content discussing TODOs conceptually, or intentional `// TODO` exercise placeholders in lab data files for learners to fix. Not real dev debt; no action needed.

## Combined Fix Priority List

| # | Change | Effort | Impact | Area |
|---|---|---|---|---|
| 1 | Add `"test": "vitest run"` to `package.json`; reactivate existing test files | XS | Medium — free coverage that already exists | Code quality |
| 2 | Add `<link rel="canonical">` in `SEOHead.astro` (value already computed) | XS | Medium — prevents duplicate-content indexing | SEO |
| 3 | Switch non-critical hub islands from `client:load` to `client:visible`/`client:idle` | S | High — real, sitewide load-time win | Performance |
| 4 | Extract `src/layouts/BaseHead.astro` (fonts + theme script + OG/canonical tags) | S–M | Medium — kills 51-file duplication, unlocks OG tags everywhere in one shot | Perf + SEO |
| 5 | Add focus trap (`role="dialog"`/`aria-modal`) to command palette; fix `focus:outline-none` instances | S–M | Medium — keyboard users currently lose focus visibility/containment | Accessibility |
| 6 | Add baseline ESLint (+ `jsx-a11y`, `eslint-plugin-astro`) and a CI workflow (lint + `astro check` + `vitest run`) | M | Medium-High — turns every other fix here into an enforced standard, not a one-time cleanup | Code quality |
| 7 | Fix heading-level skips (`LabHub.jsx`, `DSAVisualizerHub.jsx`) and add static `<h1>`s to client-rendered-only pages | S | Medium — accessibility + crawlability | A11y + SEO |
| 8 | Make resizable panel handles keyboard-operable (`role="separator"`, arrow keys) | S | Medium | Accessibility |
| 9 | Compress/replace the five 1.2–1.6MB GIFs under `public/assets/js/` | XS | Low-Medium — easy page-weight win on the pages embedding them | Performance |
| 10 | Delete/repair the drifted duplicate Next.js doc-content forks (`module-1-settingup` vs `-setting-up`, `authjs` vs `02-authjs-nextauth`, etc.) | S | Low-Medium — content quality/trust (one copy has visibly broken text) | Code quality |
| 11 | Escape `err.message` before interpolation in `reactRunner.js` sandbox HTML | XS | Low (self-XSS in an already-sandboxed iframe) but easy | Security |
| 12 | Centralize `usePrefersReducedMotion()` and gate the ~17 animated components currently ignoring it | M | Medium — accessibility + matches an already-partially-adopted pattern | Accessibility |
