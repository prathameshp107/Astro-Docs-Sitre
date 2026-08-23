import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import remarkPracticeLinks from './src/plugins/remark-practice-links.mjs';
import sidebar from './src/config/sidebar.js';

import { fileURLToPath, URL } from 'node:url';

const isVercel = !!process.env.VERCEL;
const isCF = !!process.env.CF_PAGES; // Cloudflare Pages sets this automatically

// Always use the production domain as the canonical URL.
// VERCEL_PROJECT_PRODUCTION_URL is the stable custom domain (interviewpreprationbuddy.in)
// and does NOT change between deployments, unlike VERCEL_URL (which is per-deployment).
const PRODUCTION_DOMAIN = 'https://interviewpreprationbuddy.in';
const site = isVercel
  ? (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : PRODUCTION_DOMAIN)
  : isCF && process.env.CF_PAGES_URL
    ? process.env.CF_PAGES_URL
    : PRODUCTION_DOMAIN;

// Vercel, Cloudflare, and local dev run at root (/); GitHub Pages needs the /repo-name base
const isGH = !!process.env.GITHUB_ACTIONS || !!process.env.GH_PAGES;
const needsBase = isGH && !isVercel && !isCF;

export default defineConfig({
  site,
  ...(needsBase ? { base: '/DSA-Notes-Problems' } : {}),
  server: {
    host: 'localhost',
    port: 4321,
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        clientPort: 4321,
      },
    },
    optimizeDeps: {
      noDiscovery: true,
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'use-sync-external-store/shim/with-selector.js',
        'use-sync-external-store/shim/with-selector',
        'zustand',
        'zustand/traditional',
        '@xyflow/react',
        'framer-motion',
        'lucide-react',
        '@headlessui/react',
        'react-icons',
        'react-icons/si',
        'react-icons/fa6',
      ],
      exclude: ['pyodide', '@babel/standalone'],
    },
  },
  integrations: [starlight({
    title: 'Interview Prep Buddy',
    description: 'Your complete interview preparation platform: DSA, System Design, JavaScript, React, SQL, MongoDB, Docker and more.',
    defaultLocale: 'en',
    components: {
      Sidebar: './src/components/Sidebar.astro',
      Header: './src/components/StarlightHeader.astro',
      Head: './src/components/SEOHead.astro',
    },
    social: [
      {
        icon: 'github',
        label: 'GitHub',
        href: 'https://github.com/prathameshp107/DSA-Notes-Problems',
      },
    ],
    favicon: '/favicon-32x32.png?v=2',
    logo: {
      alt: 'Interview Prep Buddy',
      src: './src/assets/logo.png',
      replacesTitle: false,
    },
    customCss: ['./src/styles/tokens.css', './src/styles/landing.css', './src/styles/custom.css', './src/styles/docs-overview.css'],
    sidebar,
    head: [
      // Favicon & App Icons (PNG & ICO prioritized for universal browser compatibility)
      {
        tag: 'link',
        attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=2' },
      },
      {
        tag: 'link',
        attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=2' },
      },
      {
        tag: 'link',
        attrs: { rel: 'shortcut icon', href: '/favicon.ico?v=2' },
      },
      {
        tag: 'link',
        attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=2' },
      },
      // Grant AI Overviews / Google SGE full snippet access
      {
        tag: 'meta',
        attrs: {
          name: 'robots',
          content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        },
      },
      // Author signal (E-E-A-T)
      {
        tag: 'meta',
        attrs: { name: 'author', content: 'Prathamesh Pawar' },
      },
      // DNS prefetch for fonts performance
      {
        tag: 'link',
        attrs: { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      },
      {
        tag: 'meta',
        attrs: {
          name: 'keywords',
          content: 'DSA interview prep, data structures algorithms, system design interview, JavaScript interview questions, React interview, coding interview preparation, technical interview guide, LeetCode patterns',
        },
      },
      {
        tag: 'script',
        attrs: {
          type: 'module',
        },
        content: `
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.15.0/dist/mermaid.esm.min.mjs';

          let rendering = false;

          async function renderMermaid() {
            if (rendering) return;
            rendering = true;
            try {
            const theme = document.documentElement.getAttribute('data-theme');
            mermaid.initialize({
              startOnLoad: false,
              theme: theme === 'light' ? 'default' : 'dark',
              themeVariables: {
                primaryColor: theme === 'light' ? '#6366f1' : '#8b5cf6',
                primaryTextColor: '#ffffff',
                primaryBorderColor: theme === 'light' ? '#6366f1' : '#8b5cf6',
                lineColor: theme === 'light' ? '#64748b' : '#94a3b8',
                secondaryColor: theme === 'light' ? '#e0e7ff' : '#1e1b4b',
                tertiaryColor: theme === 'light' ? '#f8fafc' : '#0f172a',
              }
            });

            // Find mermaid code blocks in their various HTML wrappers
            // Starlight/expressive-code structures them as: <pre data-language="mermaid"><code>...</code></pre>
            // Regular markdown renders as: <pre><code class="language-mermaid">...</code></pre>
            const blocks = [];

            document.querySelectorAll('pre[data-language="mermaid"]').forEach(el => {
              if (!blocks.includes(el)) blocks.push(el);
            });

            document.querySelectorAll('pre > code.language-mermaid').forEach(el => {
              const pre = el.parentElement;
              if (pre && !blocks.includes(pre)) blocks.push(pre);
            });

            document.querySelectorAll('pre.language-mermaid').forEach(el => {
              if (!blocks.includes(el)) blocks.push(el);
            });

            // Remove old SVG renders before re-rendering
            document.querySelectorAll('.mermaid svg').forEach(svg => svg.remove());

            // Convert each matched block into a .mermaid div
            blocks.forEach(pre => {
              // Skip if already processed
              if (pre.dataset.mermaidProcessed) return;
              pre.dataset.mermaidProcessed = 'true';

              const code = pre.querySelector('code');
              let content;
              if (code) {
                // Expressive Code splits each line into a .ec-line element.
                // textContent joins them with NO newline, breaking mermaid.
                // Rebuild source by joining lines with newlines.
                const lines = code.querySelectorAll('.ec-line');
                content = lines.length
                  ? Array.from(lines).map(l => l.textContent).join('\\n')
                  : code.textContent;
              } else {
                content = pre.textContent;
              }

              const div = document.createElement('div');
              div.className = 'mermaid';
              div.textContent = content;

              pre.parentNode.replaceChild(div, pre);
            });

          // ── Mermaid Image Viewer ─────────────────────────────────────────
          function createMermaidViewer() {
            // ---------- DOM ----------
            const backdrop = document.createElement('div');
            backdrop.className = 'mermaid-modal-backdrop';
            backdrop.setAttribute('role', 'dialog');
            backdrop.setAttribute('aria-modal', 'true');
            backdrop.setAttribute('aria-label', 'Mermaid diagram viewer');

            backdrop.innerHTML =
              '<div class="mermaid-modal" tabindex="-1">' +
                '<div class="mermaid-modal-header">' +
                  '<span class="mermaid-modal-title">⬡ Mermaid Diagram</span>' +
                  '<button class="mermaid-modal-close" data-action="close" aria-label="Close viewer">✕ Close</button>' +
                '</div>' +
                '<div class="mermaid-modal-viewport">' +
                  '<div class="mermaid-modal-svg-wrap"></div>' +
                '</div>' +
                '<div class="mermaid-modal-footer">' +
                  '<div class="mermaid-btn-group">' +
                    '<button class="mermaid-btn" data-action="zoom-out" aria-label="Zoom out">−</button>' +
                    '<span class="mermaid-zoom-label">100%</span>' +
                    '<button class="mermaid-btn" data-action="zoom-in" aria-label="Zoom in">+</button>' +
                  '</div>' +
                  '<div class="mermaid-sep"></div>' +
                  '<button class="mermaid-btn mermaid-btn--sm" data-action="reset" aria-label="Reset view">Reset</button>' +
                  '<button class="mermaid-btn mermaid-btn--sm" data-action="fit" aria-label="Fit diagram">Fit</button>' +
                  '<div class="mermaid-sep"></div>' +
                  '<button class="mermaid-btn mermaid-btn--sm" data-action="download" aria-label="Download PNG">↓ PNG</button>' +
                  '<button class="mermaid-btn mermaid-btn--sm" data-action="copy-svg" aria-label="Copy SVG source">Copy SVG</button>' +
                '</div>' +
              '</div>';

            const modal    = backdrop.querySelector('.mermaid-modal');
            const viewport = backdrop.querySelector('.mermaid-modal-viewport');
            const svgWrap  = backdrop.querySelector('.mermaid-modal-svg-wrap');
            const label    = backdrop.querySelector('.mermaid-zoom-label');

            // ---------- State ----------
            let state = { scale: 1, tx: 0, ty: 0, svgW: 0, svgH: 0 };
            const MIN = 0.25, MAX = 8, STEP = 0.25;
            let dragging = false, startX = 0, startY = 0, startTx = 0, startTy = 0;
            let rafId = null;
            let activeSvg = null;
            let viewerActive = false;
            // touch
            let lastPinchDist = null;

            // ---------- Helpers ----------
            function vpSize() {
              return { w: viewport.clientWidth, h: viewport.clientHeight };
            }

            function clampTx(tx, scale) {
              const { w } = vpSize();
              const sw = state.svgW * scale;
              // SVG fits: center it (tx = 0 means centered)
              if (sw <= w) return 0;
              // Keep at least 60px of diagram visible on each side
              const margin = 60;
              const maxTx = (sw + w) / 2 - margin;
              return Math.min(maxTx, Math.max(-maxTx, tx));
            }

            function clampTy(ty, scale) {
              const { h } = vpSize();
              const sh = state.svgH * scale;
              if (sh <= h) return 0;
              const margin = 60;
              const maxTy = (sh + h) / 2 - margin;
              return Math.min(maxTy, Math.max(-maxTy, ty));
            }

            function applyTransform() {
              if (!activeSvg) return;
              const { w, h } = vpSize();
              // Place scaled SVG centered + offset
              const x = (w - state.svgW * state.scale) / 2 + state.tx;
              const y = (h - state.svgH * state.scale) / 2 + state.ty;
              activeSvg.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + state.scale + ')';
              const pct = Math.round(state.scale * 100) + '%';
              label.textContent = pct;
              label.classList.remove('flash');
              void label.offsetWidth;
              label.classList.add('flash');
            }

            function fitDiagram() {
              if (!activeSvg || !state.svgW || !state.svgH) return;
              const { w, h } = vpSize();
              const pad = 48;
              const s = Math.min((w - pad) / state.svgW, (h - pad) / state.svgH);
              state.scale = Math.min(MAX, Math.max(MIN, s));
              state.tx = 0;
              state.ty = 0;
              applyTransform();
            }

            function resetDiagram() {
              state.scale = 1;
              state.tx = 0;
              state.ty = 0;
              applyTransform();
            }

            function zoomBy(delta, screenCx, screenCy) {
              const { w, h } = vpSize();
              const newScale = Math.min(MAX, Math.max(MIN, state.scale + delta));
              if (screenCx !== undefined && screenCy !== undefined) {
                // Keep point under cursor fixed in diagram space
                const curLeft = (w - state.svgW * state.scale) / 2 + state.tx;
                const curTop  = (h - state.svgH * state.scale) / 2 + state.ty;
                const diagX = (screenCx - curLeft)  / state.scale;
                const diagY = (screenCy - curTop)   / state.scale;
                const newLeft = screenCx - diagX * newScale;
                const newTop  = screenCy - diagY * newScale;
                state.tx = newLeft - (w - state.svgW * newScale) / 2;
                state.ty = newTop  - (h - state.svgH * newScale) / 2;
              }
              state.scale = newScale;
              state.tx = clampTx(state.tx, state.scale);
              state.ty = clampTy(state.ty, state.scale);
              applyTransform();
            }

            // ---------- Events ----------
            function onKeyDown(e) {
              if (e.key === 'Escape') { closeViewer(); return; }
              if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomBy(STEP); }
              if (e.key === '-')                  { e.preventDefault(); zoomBy(-STEP); }
              if (e.key === '0')                  { e.preventDefault(); resetDiagram(); }
            }

            function onWheel(e) {
              e.preventDefault();
              const rect = viewport.getBoundingClientRect();
              const cx = e.clientX - rect.left;
              const cy = e.clientY - rect.top;
              zoomBy(e.deltaY < 0 ? STEP : -STEP, cx, cy);
            }

            function onMouseDown(e) {
              if (e.button !== 0) return;
              dragging = true;
              startX = e.clientX; startY = e.clientY;
              startTx = state.tx; startTy = state.ty;
              e.preventDefault();
            }

            function onMouseMove(e) {
              if (!dragging) return;
              if (rafId) return;
              rafId = requestAnimationFrame(() => {
                rafId = null;
                state.tx = clampTx(startTx + (e.clientX - startX), state.scale);
                state.ty = clampTy(startTy + (e.clientY - startY), state.scale);
                applyTransform();
              });
            }

            function onMouseUp() { dragging = false; }

            function pinchDist(touches) {
              const dx = touches[0].clientX - touches[1].clientX;
              const dy = touches[0].clientY - touches[1].clientY;
              return Math.hypot(dx, dy);
            }

            function onTouchStart(e) {
              if (e.touches.length === 2) {
                lastPinchDist = pinchDist(e.touches);
                e.preventDefault();
              } else if (e.touches.length === 1) {
                dragging = true;
                startX = e.touches[0].clientX; startY = e.touches[0].clientY;
                startTx = state.tx; startTy = state.ty;
              }
            }

            function onTouchMove(e) {
              if (e.touches.length === 2 && lastPinchDist !== null) {
                e.preventDefault();
                const dist = pinchDist(e.touches);
                const ratio = dist / lastPinchDist;
                lastPinchDist = dist;
                state.scale = Math.min(MAX, Math.max(MIN, state.scale * ratio));
                state.tx = clampTx(state.tx, state.scale);
                state.ty = clampTy(state.ty, state.scale);
                applyTransform();
              } else if (e.touches.length === 1 && dragging) {
                if (rafId) return;
                rafId = requestAnimationFrame(() => {
                  rafId = null;
                  state.tx = clampTx(startTx + (e.touches[0].clientX - startX), state.scale);
                  state.ty = clampTy(startTy + (e.touches[0].clientY - startY), state.scale);
                  applyTransform();
                });
              }
            }

            function onTouchEnd(e) {
              if (e.touches.length < 2) lastPinchDist = null;
              if (e.touches.length === 0) dragging = false;
            }

            function onResize() {
              state.tx = clampTx(state.tx, state.scale);
              state.ty = clampTy(state.ty, state.scale);
              applyTransform();
            }

            // ---------- Download / Copy ----------
            function downloadPNG() {
              if (!activeSvg) return;
              const svgEl = activeSvg;
              const svgStr = new XMLSerializer().serializeToString(svgEl);
              const blob = new Blob([svgStr], { type: 'image/svg+xml' });
              const url = URL.createObjectURL(blob);
              const img = new Image();
              img.onload = () => {
                const scale = 2;
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth * scale;
                canvas.height = img.naturalHeight * scale;
                const ctx = canvas.getContext('2d');
                const theme = document.documentElement.getAttribute('data-theme');
                ctx.fillStyle = theme === 'dark' ? '#020617' : '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.scale(scale, scale);
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                const a = document.createElement('a');
                a.download = 'mermaid-diagram.png';
                a.href = canvas.toDataURL('image/png');
                a.click();
              };
              img.src = url;
            }

            function copySVG() {
              if (!activeSvg) return;
              const svgStr = new XMLSerializer().serializeToString(activeSvg);
              navigator.clipboard.writeText(svgStr).then(() => {
                const btn = backdrop.querySelector('[data-action="copy-svg"]');
                if (!btn) return;
                const prev = btn.textContent;
                btn.textContent = '✓ Copied!';
                btn.style.color = 'var(--sl-color-accent)';
                setTimeout(() => { btn.textContent = prev; btn.style.color = ''; }, 1800);
              }).catch(() => {});
            }

            // ---------- Open / Close ----------
            function attachListeners() {
              viewport.addEventListener('wheel', onWheel, { passive: false });
              viewport.addEventListener('mousedown', onMouseDown);
              window.addEventListener('mousemove', onMouseMove);
              window.addEventListener('mouseup', onMouseUp);
              viewport.addEventListener('touchstart', onTouchStart, { passive: false });
              viewport.addEventListener('touchmove', onTouchMove, { passive: false });
              viewport.addEventListener('touchend', onTouchEnd);
              window.addEventListener('resize', onResize);
              document.addEventListener('keydown', onKeyDown);
            }

            function detachListeners() {
              viewport.removeEventListener('wheel', onWheel);
              viewport.removeEventListener('mousedown', onMouseDown);
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
              viewport.removeEventListener('touchstart', onTouchStart);
              viewport.removeEventListener('touchmove', onTouchMove);
              viewport.removeEventListener('touchend', onTouchEnd);
              window.removeEventListener('resize', onResize);
              document.removeEventListener('keydown', onKeyDown);
            }

            function openViewer(sourceSvg) {
              // Cancel any pending close animation state
              backdrop.classList.remove('mv-closing');
              viewerActive = true;

              const clone = sourceSvg.cloneNode(true);
              const originalId = sourceSvg.getAttribute('id') || '';
              const newId = 'mermaid-viewer-' + Math.random().toString(36).slice(2);
              clone.setAttribute('id', newId);
              if (originalId) {
                const styleEl = clone.querySelector('style');
                if (styleEl) {
                  styleEl.textContent = styleEl.textContent.split(originalId).join(newId);
                }
              }
              clone.style.transform = '';
              // measure natural size from viewBox or width/height attrs
              const vb = clone.getAttribute('viewBox');
              if (vb) {
                const parts = vb.split(/[\\s,]+/);
                state.svgW = parseFloat(parts[2]) || clone.getBoundingClientRect().width || 600;
                state.svgH = parseFloat(parts[3]) || clone.getBoundingClientRect().height || 400;
              } else {
                state.svgW = parseFloat(clone.getAttribute('width'))  || 600;
                state.svgH = parseFloat(clone.getAttribute('height')) || 400;
              }
              // ensure SVG fills its natural size
              clone.setAttribute('width',  state.svgW);
              clone.setAttribute('height', state.svgH);

              activeSvg = clone;
              svgWrap.innerHTML = '';
              svgWrap.appendChild(clone);

              state.scale = 1; state.tx = 0; state.ty = 0;
              document.body.appendChild(backdrop);
              document.body.style.overflow = 'hidden';
              attachListeners();
              modal.focus();
              // fit after layout
              requestAnimationFrame(() => requestAnimationFrame(fitDiagram));
            }

            function closeViewer() {
              backdrop.classList.add('mv-closing');
              detachListeners();
              viewerActive = false;
              backdrop.addEventListener('animationend', () => {
                // Guard: if viewer was re-opened before animation finished, don't destroy it
                if (viewerActive) return;
                backdrop.remove();
                document.body.style.overflow = '';
                activeSvg = null;
                svgWrap.innerHTML = '';
              }, { once: true });
            }

            // Toolbar clicks
            backdrop.addEventListener('click', e => {
              const btn = e.target.closest('[data-action]');
              if (!btn) return;
              const a = btn.dataset.action;
              if (a === 'close')      closeViewer();
              if (a === 'zoom-in')    zoomBy(STEP);
              if (a === 'zoom-out')   zoomBy(-STEP);
              if (a === 'reset')      resetDiagram();
              if (a === 'fit')        fitDiagram();
              if (a === 'download')   downloadPNG();
              if (a === 'copy-svg')   copySVG();
            });

            // Click backdrop to close
            backdrop.addEventListener('click', e => {
              if (e.target === backdrop) closeViewer();
            });

            return { openViewer };
          }

          // Singleton viewer instance
          const viewer = createMermaidViewer();

          // ── Render all unrendered .mermaid divs ──────────────────────────
            const nodes = document.querySelectorAll('.mermaid:not([data-rendered])');
            if (nodes.length) {
              nodes.forEach(el => el.dataset.rendered = 'true');
              try {
                await mermaid.run({ nodes: Array.from(nodes) });
              } catch(e) {
                console.error('Mermaid diagram failed:', e);
              }
              // Wrap rendered diagrams with zoom/pan toolbar + Open Image button
              document.querySelectorAll('.mermaid[data-rendered]:not([data-viewer-attached])').forEach(el => {
                el.dataset.viewerAttached = 'true';
                const svg = el.querySelector('svg');
                if (!svg) return;

                // State
                let scale = 1, tx = 0, ty = 0;
                let dragging = false, startX = 0, startY = 0, startTx = 0, startTy = 0;
                const MIN = 0.25, MAX = 5, STEP = 0.25;

                // Build wrapper
                const wrapper = document.createElement('div');
                wrapper.className = 'mermaid-wrapper';

                const toolbar = document.createElement('div');
                toolbar.className = 'mermaid-toolbar';
                toolbar.innerHTML =
                  '<div class="mermaid-btn-group">' +
                    '<button class="mermaid-btn" data-action="zoom-out" aria-label="Zoom out">−</button>' +
                    '<span class="mermaid-zoom-label">100%</span>' +
                    '<button class="mermaid-btn" data-action="zoom-in" aria-label="Zoom in">+</button>' +
                  '</div>' +
                  '<div class="mermaid-sep"></div>' +
                  '<button class="mermaid-btn mermaid-btn--sm" data-action="reset" aria-label="Reset view">Reset</button>' +
                  '<button class="mermaid-btn mermaid-btn--sm" data-action="fit" aria-label="Fit diagram">Fit</button>' +
                  '<div class="mermaid-sep"></div>' +
                  '<button class="mermaid-btn mermaid-btn--sm mermaid-btn--right" data-action="open-image" aria-label="Open in viewer">🖼 Open Image</button>' +
                  '<button class="mermaid-btn mermaid-btn--sm" data-action="fullscreen" aria-label="Fullscreen" style="margin-left:0.25rem;width:30px;padding:0;font-size:1.05rem">⛶</button>';

                const canvas = document.createElement('div');
                canvas.className = 'mermaid-canvas';

                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(toolbar);
                canvas.appendChild(el);
                wrapper.appendChild(canvas);

                const label = toolbar.querySelector('.mermaid-zoom-label');

                function applyTransform() {
                  svg.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
                  label.textContent = Math.round(scale * 100) + '%';
                  label.classList.remove('flash');
                  void label.offsetWidth;
                  label.classList.add('flash');
                }

                function clampScale(s) { return Math.min(MAX, Math.max(MIN, s)); }

                toolbar.addEventListener('click', e => {
                  const btn = e.target.closest('[data-action]');
                  if (!btn) return;
                  const action = btn.dataset.action;
                  if (action === 'zoom-in') { scale = clampScale(scale + STEP); applyTransform(); }
                  else if (action === 'zoom-out') { scale = clampScale(scale - STEP); applyTransform(); }
                  else if (action === 'reset') { scale = 1; tx = 0; ty = 0; applyTransform(); }
                  else if (action === 'fit') {
                    const cw = canvas.clientWidth - 40;
                    const sw = svg.getBBox ? svg.getBBox().width : svg.clientWidth;
                    scale = sw > 0 ? clampScale(cw / sw) : 1;
                    tx = 0; ty = 0; applyTransform();
                  }
                  else if (action === 'open-image') {
                    viewer.openViewer(svg);
                  }
                  else if (action === 'fullscreen') {
                    wrapper.classList.toggle('mermaid-fullscreen');
                    btn.textContent = wrapper.classList.contains('mermaid-fullscreen') ? '✕' : '⛶';
                    btn.title = wrapper.classList.contains('mermaid-fullscreen') ? 'Exit fullscreen' : 'Fullscreen';
                  }
                });

                document.addEventListener('keydown', e => {
                  if (e.key === 'Escape' && wrapper.classList.contains('mermaid-fullscreen')) {
                    wrapper.classList.remove('mermaid-fullscreen');
                    toolbar.querySelector('[data-action="fullscreen"]').textContent = '⛶';
                  }
                });

                canvas.addEventListener('mousedown', e => {
                  if (e.button !== 0) return;
                  dragging = true;
                  startX = e.clientX; startY = e.clientY;
                  startTx = tx; startTy = ty;
                  e.preventDefault();
                });
                window.addEventListener('mousemove', e => {
                  if (!dragging) return;
                  tx = startTx + (e.clientX - startX);
                  ty = startTy + (e.clientY - startY);
                  applyTransform();
                });
                window.addEventListener('mouseup', () => { dragging = false; });

                canvas.addEventListener('wheel', e => {
                  e.preventDefault();
                  const delta = e.deltaY < 0 ? STEP : -STEP;
                  scale = clampScale(scale + delta);
                  applyTransform();
                }, { passive: false });
              });
            }
            } finally {
              rendering = false;
            }
          }

          // Run on initial page load and every Astro client-side navigation
          // astro:page-load fires on initial visit too in Astro 6
          document.addEventListener('astro:page-load', renderMermaid);
          // Module scripts are deferred; page-load may have already fired. Run once now.
          renderMermaid();

          // Re-render on theme change (no page reload)
          const themeObserver = new MutationObserver(() => {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light' || theme === 'dark') {
              renderMermaid();
            }
          });
          themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        `,
      },
    ],
  }), mdx(), react(), sitemap({
    // Exclude private/auth pages from sitemap
    filter: (page) =>
      !page.includes('/auth/') &&
      !page.includes('/u/') &&
      !page.includes('/review/') &&
      !page.includes('/plans/'),
    // Serialize pages with priority/changefreq hints for Google
    serialize(item) {
      // Home and visualizer hub get highest priority
      if (item.url === 'https://interviewpreprationbuddy.in/' ||
          item.url === 'https://interviewpreprationbuddy.in/visualizer/') {
        return { ...item, priority: 1.0, changefreq: 'weekly' };
      }
      // Visualizer pages — high traffic, high priority
      if (item.url.includes('/visualizer/')) {
        return { ...item, priority: 0.9, changefreq: 'weekly' };
      }
      // DSA, system-design, LLD content pages
      if (item.url.includes('/DSA-Notes-Problems/') ||
          item.url.includes('/system-design/') ||
          item.url.includes('/lld/') ||
          item.url.includes('/ai/')) {
        return { ...item, priority: 0.8, changefreq: 'monthly' };
      }
      // Striver / interview pages
      if (item.url.includes('/striver-') ||
          item.url.includes('/interview-')) {
        return { ...item, priority: 0.85, changefreq: 'monthly' };
      }
      return { ...item, priority: 0.7, changefreq: 'monthly' };
    },
  })],
});