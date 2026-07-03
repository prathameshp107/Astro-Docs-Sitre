# Feature 13 — PWA & Offline Mode

| | |
|---|---|
| **Tier** | 3 — Growth & Stickiness |
| **Priority** | Medium — small effort, outsized impact for our actual audience |
| **Depends on** | Nothing (better after 01/04 exist so the best surfaces work offline) |
| **Effort** | Small (1 week) |
| **Status** | 📋 Planned |

---

## 1. Why We Need This

### The problem
A huge share of our audience (India, Southeast Asia, commuters everywhere) studies on
phones with intermittent connectivity — the metro ride is prime "grind 20 flashcards"
time. Today a dropped connection means a dead site. And on mobile, a browser-tab
learning site loses to any native app for habit formation: no icon on the home
screen, no full-screen experience.

### The unfair advantage nobody exploits
Our architecture is **accidentally perfect for offline**: the site is static
(Astro), the judge runs in the browser (01), SRS scheduling is client-side (04),
Python runs in WASM (Pyodide), SQL in WASM (SQL.js), and all state is
localStorage-first with background sync (03). LeetCode cannot work offline — their
judge is a server. **Our entire core loop can.** "The interview prep app that works
on the subway" is a real, defensible differentiator that costs us one week.

### Also: engagement mechanics
Installed PWAs get a home-screen icon and full-screen launch. Combined with streaks
(10) and daily reviews (04), installation converts casual visitors into daily-habit
users — install-to-habit is one of the strongest funnels in consumer learning apps.

---

## 2. What to Build

### 2.1 PWA baseline
- **Web app manifest:** name, icons (192/512 + maskable), standalone display,
  theme-color synced to our dark/light tokens, start_url `/dashboard` (or landing if
  logged-out).
- **Install prompt:** custom, non-nagging — a small "Install app" affordance in the
  navbar menu + a one-time contextual toast after a high-intent moment (completed
  review session or 3-day streak). Never on first visit.

### 2.2 Offline strategy (service worker — precise, not "cache everything")

| Surface | Strategy |
|---|---|
| App shell, CSS, JS bundles, fonts | Precache on install (build-manifest driven) |
| Notes/docs pages | Stale-while-revalidate, capped runtime cache (~50 most recent) |
| Judge problems + workers | Precache manifest + worker JS; problem JSONs on first visit, plus **"Download topic pack"** button (arrays / trees / …) for explicit prefetch |
| SRS decks + due cards | Precache subscribed decks (tiny JSON) — reviews ALWAYS work offline |
| Pyodide/SQL.js WASM (~10 MB) | Cache-on-first-use only, never precache (respect data plans) |
| AI features (05/06), community (12), auth | Online-only — show a clear, friendly offline state, never a spinner |
| Progress sync (03) | Already offline-first; SW adds Background Sync retry for queued pushes |

### 2.3 Offline UX rules
- Global connectivity indicator: subtle "Offline — your progress is saved locally"
  banner; disappears on reconnect with a "Synced ✓" pulse.
- Every online-only button (AI review, sign-in, publish) gets a disabled+tooltip
  offline state — no dead clicks, no infinite spinners.
- `/offline` fallback page for uncached routes: lists what IS available offline
  (your due reviews, downloaded topic packs, cached notes) — turn the failure into
  a menu.

### Out of scope for v1
- Push notifications (huge adjacent topic — needs 03 + notification strategy; v2)
- Full site download ("take everything offline") — cache budget abuse; topic packs only
- Offline MCQs/labs beyond what SWR caching naturally provides (v2 if demanded)

---

## 3. How to Build It (in this codebase)

### 3.1 Tooling
Use **`@vite-pwa/astro`** (Workbox under the hood) — integrates with Astro's build to
emit the precache manifest; injectManifest mode so we control the runtime routes:

```js
// astro.config.mjs
AstroPWA({
  strategies: 'injectManifest',
  srcDir: 'src', filename: 'sw.js',
  manifest: { name: 'DSA & Dev Notes', short_name: 'DevPrep',
              display: 'standalone', start_url: '/', theme_color: '…', icons: […] }
})
```

```
src/sw.js                                   ← Workbox routes per the §2.2 table
src/components/pwa/InstallPrompt.jsx        ← captures beforeinstallprompt, custom UI
src/components/pwa/OfflineBanner.jsx        ← online/offline listener + sync pulse
src/components/pwa/TopicPackButton.jsx      ← explicit prefetch of a topic's problem JSONs
src/pages/offline.astro                     ← fallback menu page
public/icons/*                              ← generated icon set incl. maskable
```

### 3.2 Cache-versioning discipline (where PWAs go wrong)
- Workbox precache manifest handles asset revisioning automatically on each build.
- Runtime caches get explicit names + max-entries + max-age; bump names on breaking
  schema changes (problem JSON format changes → new cache name → clean refetch).
- SW update flow: `registerType: 'prompt'` — show "New version available ⟳" toast
  rather than auto-reload (never yank a user mid interview-session or review).
- **Kill switch:** a `sw-disable` flag checked from a tiny always-network-first
  config fetch, so a bad SW deploy can be remotely neutralized.

### 3.3 Build phases

| Phase | Deliverable |
|-------|-------------|
| 1 | Manifest + icons + precache shell; installable passes Lighthouse PWA audit |
| 2 | Runtime caching per table; offline banner; /offline fallback |
| 3 | Topic packs + SRS deck precache; update-prompt flow; kill switch |

---

## 4. Expected Result

### User-visible outcome
Install "DevPrep" from the browser menu → an icon on the phone home screen → open it
in the metro with zero bars → today's 12 flashcards work, the downloaded "Trees"
problem pack judges your code locally, progress saves, and everything syncs the
moment you're back online. The only interview-prep platform where the core loop
genuinely works offline.

### Success metrics
- Lighthouse PWA audit: installable, all checks green
- ≥ 8% of returning mobile users install within 3 months
- Installed users' 30-day retention ≥ 2× mobile-web baseline
- Zero stale-content bug reports after deploys (update flow + versioning working)

### Definition of done / acceptance criteria
- [ ] Installable on Android/Chrome and iOS/Safari (with iOS meta fallbacks)
- [ ] Airplane-mode test passes: SRS review session + downloaded topic pack solve +
      cached notes all fully functional offline
- [ ] Progress made offline syncs correctly on reconnect (03 integration verified)
- [ ] Online-only features show designed offline states — zero infinite spinners
- [ ] SW update prompt appears on new deploy; no auto-reload mid-session
- [ ] Kill switch verified: flag flip neutralizes the SW on next load
- [ ] WASM binaries excluded from precache (verify install payload < 5 MB)

---

## 5. AI Build Prompt (copy-paste to start implementation)

```
Add PWA + offline support to my Astro + Starlight + React 19 site (dsa-docs/). Read
roadmap/tier-3-growth-stickiness/13-pwa-offline.md and implement exactly the §2.2
caching table — do NOT precache Pyodide/SQL.js WASM or any AI/auth routes.

Deliver: (1) @vite-pwa/astro configured in astro.config.mjs with injectManifest,
manifest per the spec (generate the icon set including a maskable icon from the
existing site logo in public/); (2) src/sw.js with Workbox routes: precached app
shell, SWR for /docs pages capped at 50 entries, cache-first for judge problem JSONs
and worker bundles, cache-on-first-use for WASM, network-only with offline fallback
for /api/*; (3) OfflineBanner.jsx wired into the base layout with the reconnect
"Synced ✓" pulse reading syncManager status; (4) InstallPrompt.jsx capturing
beforeinstallprompt, surfaced only from the navbar menu for now; (5) /offline.astro
fallback listing available offline content; (6) the update-prompt toast flow
(registerType: 'prompt'). Verify: run a production build + preview, pass the
Lighthouse PWA audit, then simulate offline in DevTools and complete an SRS review
and a cached problem solve end-to-end.
```
