/**
 * MCQ image-post settings.
 *
 * Posts are rendered as a 2-slide carousel per question:
 *   slide 1 — question + options, no answer  (creates the "wait, which one?" beat)
 *   slide 2 — correct option highlighted + explanation
 *
 * That split is the point: a single image giving away the answer gets scrolled
 * past, whereas a question people answer in their head earns the swipe, and the
 * swipe is what Instagram rewards.
 */

export const RENDER = {
  // 1080x1350 is Instagram's 4:5 portrait — the largest feed footprint on a
  // phone. Square (1080x1080) also works if you prefer a uniform grid.
  width: 1080,
  height: 1350,
  // 1, not 2. 1080x1350 already IS Instagram's native upload size, so rendering
  // at 2x only produces files Instagram immediately downscales — and across the
  // full 1,760-question bank that is ~2.1 GB instead of ~0.6 GB.
  deviceScaleFactor: 1,
  format: 'png',
};

/**
 * Which questions to render.
 *
 * Default is EVERY question in the bank — 1,760 across 15 technologies and 231
 * topics, so 3,520 images. Run with `--limit=N` to sample, or narrow by
 * technology on the command line while testing.
 *
 * Entry shape (all optional except `technology`):
 *   { technology: 'javascript', difficulty: 'medium', count: 5, ids: ['js-1'] }
 */
export const ALL_TECHNOLOGIES = [
  'javascript', 'typescript', 'react', 'angular', 'nodejs',
  'python', 'sql', 'mongodb', 'html', 'css', 'git',
  'data-structures', 'algorithms', 'oops', 'system-design',
];

export const POSTS = ALL_TECHNOLOGIES.map((technology) => ({ technology }));

/**
 * Output folder name per technology. Everything not listed uses its own name,
 * so `data-structures` stays `data-structures`.
 */
export const TECH_DIR = {
  javascript: 'js',
  typescript: 'ts',
  nodejs: 'node',
  'system-design': 'system-design',
};

/**
 * Palette.
 *
 * Kin to the site's chalkboard visualizers rather than a fresh scheme, so a post
 * is recognisably from this brand. Two deliberate constraints:
 *
 *   - `accent` (amber) carries STRUCTURE only — eyebrow, code rule, the ask.
 *   - `correct` (emerald) is reserved exclusively for the answer reveal. Nothing
 *     else on either slide may use it, which is what makes the reveal land.
 *
 * `bg` is a warm near-black rather than neutral #000: the graph-paper wash and
 * the amber read as ink on board against it, and pure black crushes on phone
 * screens set to low brightness.
 */
export const THEME = {
  bg: '#131110',
  bgPanel: '#1B1815',
  code: '#0C0B0A',
  border: '#3A342D',
  text: '#F6F2EA',
  textMuted: '#9C948A',
  accent: '#F0A83C',
  correct: '#34D399',
  brand: 'interviewpreprationbuddy.in',
  site: 'https://interviewpreprationbuddy.in/',
};
