import { useState, useEffect, useRef, useCallback } from 'react';
import { MCQ_CATEGORIES, CATEGORY_TOPICS } from './MCQData.js';
import { CategoryIcon } from './CategoryIcons.jsx';

function buildSearchIndex(base) {
  const items = [];
  // Categories
  MCQ_CATEGORIES.forEach(cat => {
    items.push({
      type: 'category',
      id: cat.id,
      title: cat.name,
      subtitle: `${cat.description.slice(0, 50)}...`,
      icon: cat.icon,
      color: cat.color,
      href: `${base}mcq/${cat.id}`,
    });
    // Topics
    const topics = CATEGORY_TOPICS[cat.id] || [];
    topics.forEach(topic => {
      items.push({
        type: 'topic',
        id: `${cat.id}-${topic.name}`,
        categoryId: cat.id,          // needed for CategoryIcon lookup
        title: topic.name,
        subtitle: `${cat.name} · ${topic.count} questions`,
        icon: topic.icon,
        color: cat.color,
        href: `${base}mcq/quiz/${cat.id}?topic=${encodeURIComponent(topic.name)}`,
      });
    });
  });
  // Quick actions
  items.push({ type: 'action', id: 'dashboard', title: 'View Dashboard', subtitle: 'Track your progress and achievements', icon: '📊', color: '#6366f1', href: `${base}mcq/dashboard` });
  items.push({ type: 'action', id: 'all-cats', title: 'All Categories', subtitle: 'Browse everything', icon: '🗂️', color: '#6366f1', href: `${base}mcq` });
  return items;
}

function fuzzyMatch(haystack, needle) {
  if (!needle) return true;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  if (h.includes(n)) return true;
  // Simple character-order match
  let hi = 0;
  for (let ni = 0; ni < n.length; ni++) {
    const found = h.indexOf(n[ni], hi);
    if (found === -1) return false;
    hi = found + 1;
  }
  return true;
}

export default function CommandPalette({ base, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const allItems = buildSearchIndex(base);
  const filtered = query.trim()
    ? allItems.filter(item => fuzzyMatch(item.title, query) || fuzzyMatch(item.subtitle, query))
    : allItems.filter(i => i.type === 'action' || i.type === 'category');

  // Group results
  const categories = filtered.filter(i => i.type === 'category');
  const topics = filtered.filter(i => i.type === 'topic');
  const actions = filtered.filter(i => i.type === 'action');
  const grouped = [
    ...(actions.length ? [{ label: 'Quick Actions', items: actions }] : []),
    ...(categories.length ? [{ label: 'Categories', items: categories }] : []),
    ...(topics.length ? [{ label: 'Topics', items: topics.slice(0, 12) }] : []),
  ];
  const flatItems = grouped.flatMap(g => g.items);

  useEffect(() => {
    setActiveIdx(0);
    inputRef.current?.focus();
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      const item = flatItems[activeIdx];
      if (item) { window.location.href = item.href; onClose(); }
    }
  }, [flatItems, activeIdx, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Scroll active into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  let flatIdx = 0;

  return (
    <div className="mcq-cmd-overlay" onClick={onClose}>
      <div className="mcq-cmd-box" onClick={e => e.stopPropagation()}>
        {/* Input */}
        <div className="mcq-cmd-input-wrap">
          <svg className="mcq-cmd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            className="mcq-cmd-input"
            placeholder="Search categories, topics, actions..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="mcq-cmd-key">Esc</span>
        </div>

        {/* Results */}
        <div className="mcq-cmd-results" ref={listRef}>
          {flatItems.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--mcq-text-muted)', fontSize: '0.8rem' }}>
              No results for "{query}"
            </div>
          ) : (
            grouped.map(group => (
              <div key={group.label}>
                <div className="mcq-cmd-section-label">{group.label}</div>
                {group.items.map(item => {
                  const myIdx = flatIdx++;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`mcq-cmd-item ${myIdx === activeIdx ? 'active' : ''}`}
                      data-idx={myIdx}
                      onClick={onClose}
                      onMouseEnter={() => setActiveIdx(myIdx)}
                    >
                      <div className="mcq-cmd-item-icon" style={{ background: `${item.color}18` }}>
                        {item.type === 'category' || item.type === 'topic'
                          ? <CategoryIcon categoryId={item.categoryId || item.id} size={15} />
                          : item.icon
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="mcq-cmd-item-title">{item.title}</div>
                        <div className="mcq-cmd-item-sub">{item.subtitle}</div>
                      </div>
                      {item.type === 'topic' && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--mcq-text-muted)', flexShrink: 0 }}>
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      )}
                    </a>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mcq-cmd-footer">
          <span className="mcq-cmd-hint"><span className="mcq-cmd-key">↑↓</span> navigate</span>
          <span className="mcq-cmd-hint"><span className="mcq-cmd-key">↵</span> open</span>
          <span className="mcq-cmd-hint"><span className="mcq-cmd-key">Esc</span> close</span>
        </div>
      </div>
    </div>
  );
}
