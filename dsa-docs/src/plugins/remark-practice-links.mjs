/**
 * remark-practice-links
 * --------------------------------------------------------------------------
 * Injects a "Practice this concept" callout at the bottom of any doc that
 * declares a `practice:` block in its frontmatter. This is what bridges the
 * four pillars of the site (Docs ↔ Visualizer ↔ MCQ ↔ Labs/Playground) so a
 * reader never hits a dead-end.
 *
 * Usage in a doc's frontmatter (every key optional):
 *
 *   practice:
 *     visualizer: /visualizer/sorting
 *     mcq: /mcq/algorithms
 *     lab: /labs
 *     playground: /playground
 *
 * Works on plain `.md` files — no per-page component import or `.mdx`
 * conversion needed, which matters across 900+ docs.
 */

const META = {
  visualizer: { icon: '🎬', label: 'Visualize it', sub: 'Watch it run step by step' },
  mcq: { icon: '📝', label: 'Quiz yourself', sub: 'Test your understanding' },
  lab: { icon: '💻', label: 'Practice in the lab', sub: 'Solve hands-on tasks' },
  playground: { icon: '⚡', label: 'Open playground', sub: 'Try the code live' },
};

// Render order, independent of the order keys appear in frontmatter.
const ORDER = ['visualizer', 'mcq', 'lab', 'playground'];

const TOPIC_NAMES = {
  dp: 'dynamic programming',
  mcq: 'MCQ',
  oops: 'OOP',
};

const linkLabel = (key, href) => {
  const slug = href.split(/[?#]/, 1)[0].replace(/\/$/, '').split('/').pop();
  const topic = TOPIC_NAMES[slug] || slug.replace(/-/g, ' ');
  if (key === 'visualizer') return `Explore the ${topic} visualizer`;
  if (key === 'mcq') return `Take the ${topic} quiz`;
  return META[key].label;
};

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export default function remarkPracticeLinks(options = {}) {
  const base = String(options.base || '').replace(/\/$/, '');

  return (tree, file) => {
    const practice = file?.data?.astro?.frontmatter?.practice;
    if (!practice || typeof practice !== 'object') return;

    const links = ORDER.filter((key) => practice[key])
      .map((key) => {
        const meta = META[key];
        let href = String(practice[key]);
        if (href.startsWith('/')) href = base + href; // respect Astro `base`
        return `<a class="practice-link practice-link--${key}" href="${escapeAttr(href)}">` +
          `<span class="practice-link__icon" aria-hidden="true">${meta.icon}</span>` +
          `<span class="practice-link__text">` +
          `<span class="practice-link__label">${escapeAttr(linkLabel(key, String(practice[key])))}</span>` +
          `<span class="practice-link__sub">${meta.sub}</span>` +
          `</span>` +
          `<span class="practice-link__arrow" aria-hidden="true">→</span>` +
          `</a>`;
      });

    if (!links.length) return;

    const html =
      `<aside class="practice-box not-content" aria-label="Practice this concept">` +
      `<p class="practice-box__title">` +
      `<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>` +
      ` Practice this concept` +
      `</p>` +
      `<div class="practice-box__links">${links.join('')}</div>` +
      `</aside>`;

    tree.children.push({ type: 'html', value: html });
  };
}
