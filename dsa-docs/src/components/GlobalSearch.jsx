import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Search as SearchIcon, X } from 'lucide-react';

const TYPE_META = {
  doc: { label: 'Docs', color: '#818cf8' },
  problem: { label: 'DSA Problem', color: '#34d399' },
  interview: { label: 'Interview Q', color: '#fbbf24' },
  mcq: { label: 'MCQ', color: '#f472b6' },
};

let indexCache = null;
let indexPromise = null;

function loadIndex(base) {
  if (indexCache) return Promise.resolve(indexCache);
  if (!indexPromise) {
    indexPromise = fetch(`${base}search-index.json`)
      .then((r) => r.json())
      .then((data) => {
        indexCache = data;
        return data;
      })
      .catch(() => {
        indexPromise = null;
        return [];
      });
  }
  return indexPromise;
}

function scoreItem(item, q) {
  const title = item.title.toLowerCase();
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  const sub = (item.subtitle || '').toLowerCase();
  if (sub.includes(q)) return 40;
  if ((item.tags || []).some((t) => t.toLowerCase().includes(q))) return 30;
  return 0;
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const baseHref = base.replace(/\/$/, '');

  const openSearch = useCallback(() => {
    setOpen(true);
    loadIndex(base).then(setItems);
  }, [base]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onOpenEvent = () => openSearch();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('dsa-open-search', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('dsa-open-search', onOpenEvent);
    };
  }, [openSearch]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const q = query.trim().toLowerCase();
  const results = q
    ? items
        .map((item) => ({ item, score: scoreItem(item, q) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
        .slice(0, 50)
        .map((r) => r.item)
    : [];

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const go = (item) => {
    setOpen(false);
    window.location.href = `${baseHref}${item.url}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) go(results[activeIndex]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="app-nav-link app-nav-link-icon app-nav-search-trigger"
        title="Search (Ctrl+K)"
        aria-label="Open search"
      >
        <SearchIcon size={16} />
        <span className="app-nav-search-kbd">Ctrl K</span>
      </button>
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[999] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-[12vh]"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0D1326] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <SearchIcon size={18} className="text-white/40 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search docs, problems, interview Qs, MCQs..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="text-white/40 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto py-2">
                {!q && (
                  <p className="px-4 py-6 text-center text-sm text-white/40">
                    Start typing to search across the whole app.
                  </p>
                )}
                {q && results.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm text-white/40">
                    No results for &ldquo;{query}&rdquo;.
                  </p>
                )}
                {results.map((item, i) => {
                  const meta = TYPE_META[item.type] || { label: item.type, color: '#94a3b8' };
                  return (
                    <button
                      key={`${item.type}-${item.url}-${i}`}
                      onClick={() => go(item)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-start gap-3 px-4 py-2.5 text-left ${
                        i === activeIndex ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <span
                        className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                        style={{ color: meta.color, backgroundColor: `${meta.color}1a` }}
                      >
                        {meta.label}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-white/90">{item.title}</span>
                        {item.subtitle && (
                          <span className="block truncate text-xs text-white/40">{item.subtitle}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2 text-[11px] text-white/30">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
