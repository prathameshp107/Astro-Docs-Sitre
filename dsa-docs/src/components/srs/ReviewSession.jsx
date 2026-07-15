import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSrsStore } from '../../store/srsStore';
import { CategoryIcon } from '../mcq/CategoryIcons';
import { MCQ_CATEGORIES } from '../mcq/MCQData.js';
import jsCoreDeck from '../../data/srs/decks/js-core.json';
import reactDeck from '../../data/srs/decks/react.json';
import sqlDeck from '../../data/srs/decks/sql.json';

// Simple markdown bold/code parser
function renderMarkdown(text) {
  if (!text) return '';
  // Match code blocks ```js ... ```
  const parts = text.split(/(```[a-z]*\n[\s\S]*?\n```)/g);

  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const code = part.replace(/^```[a-z]*\n/, '').replace(/\n```$/, '');
      return (
        <div key={i} className="mcq-code-block" style={{ marginTop: '12px', marginBottom: '12px' }}>
          <div className="mcq-code-header">
            <span className="mcq-code-dot" style={{ background: '#ef4444' }} />
            <span className="mcq-code-dot" style={{ background: '#f59e0b' }} />
            <span className="mcq-code-dot" style={{ background: '#22c55e' }} />
          </div>
          <pre className="mcq-code-pre">{code}</pre>
        </div>
      );
    }

    // Bold replacement (**text**), line breaks (\n)
    const subParts = part.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i} style={{ margin: '0 0 10px', lineHeight: 1.6, fontSize: '0.88rem' }}>
        {subParts.map((sub, j) => {
          if (sub.startsWith('**') && sub.endsWith('**')) {
            return <strong key={j} style={{ color: 'var(--mcq-text-primary)' }}>{sub.slice(2, -2)}</strong>;
          }
          // Inline code `code`
          const codeParts = sub.split(/(`.*?`)/g);
          return codeParts.map((c, k) => {
            if (c.startsWith('`') && c.endsWith('`')) {
              return <code key={k} style={{
                background: 'var(--mcq-surface-20)', border: '1px solid var(--mcq-border)',
                borderRadius: 4, padding: '1px 5px', fontSize: '0.8rem', color: '#e06c75', fontFamily: 'var(--font-mono)'
              }}>{c.slice(1, -1)}</code>;
            }
            return c;
          });
        })}
      </p>
    );
  });
}

export default function ReviewSession() {
  const [sessionQueue, setSessionQueue] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);

  const subscribeDeck = useSrsStore(state => state.subscribeDeck);
  const subscribeDecksList = useSrsStore(state => state.decks);
  const getQueue = useSrsStore(state => state.getQueue);
  const gradeCard = useSrsStore(state => state.gradeCard);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  // Load the queue
  const reloadQueue = useCallback(() => {
    // Collect all decks data
    const allDecks = [jsCoreDeck, reactDeck, sqlDeck];
    const { queue } = getQueue(allDecks);
    setSessionQueue(queue);
    setCurrentIdx(0);
    setIsFlipped(false);
    setSessionFinished(queue.length === 0);
  }, [getQueue]);

  useEffect(() => {
    // Subscribes JS Core by default if nothing is subscribed so they see content immediately
    if (subscribeDecksList.length === 0) {
      subscribeDeck('js-core');
    }
    reloadQueue();
  }, [subscribeDecksList, subscribeDeck, reloadQueue]);

  const activeCard = sessionQueue[currentIdx];

  const categoryId = useMemo(() => {
    if (!activeCard) return null;
    if (activeCard.categoryId) return activeCard.categoryId;
    if (activeCard.deckId === 'js-core') return 'javascript';
    if (activeCard.deckId === 'react-core') return 'react';
    if (activeCard.deckId === 'sql-core') return 'sql';
    return null;
  }, [activeCard]);

  const category = useMemo(() => {
    if (!categoryId) return null;
    return MCQ_CATEGORIES.find(c => c.id === categoryId);
  }, [categoryId]);

  // Handlers
  const handleFlip = useCallback(() => {
    setIsFlipped(p => !p);
  }, []);

  const handleGrade = useCallback((score) => {
    if (!activeCard) return;
    gradeCard(activeCard.id, score);

    if (currentIdx + 1 >= sessionQueue.length) {
      setSessionFinished(true);
    } else {
      setCurrentIdx(p => p + 1);
      setIsFlipped(false);
    }
  }, [activeCard, currentIdx, sessionQueue.length, gradeCard]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (sessionFinished || sessionQueue.length === 0) return;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        handleFlip();
      } else if (isFlipped && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        // maps '1'->0 (Again), '2'->1 (Hard), '3'->2 (Good), '4'->3 (Easy)
        handleGrade(parseInt(e.key) - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFlipped, handleFlip, handleGrade, sessionFinished, sessionQueue.length]);

  if (sessionFinished) {
    return (
      <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center', color: 'var(--mcq-text)', padding: '60px 20px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🏆</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--mcq-text-primary)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
            All Caught Up!
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--mcq-text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
            You've completed your reviews for today. Come back tomorrow to continue training your memory!
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={reloadQueue} className="mcq-btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem' }}>
              Check Queue Again
            </button>
            <a href={`${base}mcq`} className="mcq-btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem' }}>
              Solve MCQs
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  if (sessionQueue.length === 0) {
    return (
      <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center', color: 'var(--mcq-text)', padding: '60px 20px' }}>
        <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '16px' }}>📭</span>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--mcq-text-primary)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
          No Reviews Due
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--mcq-text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
          Subscribe to more decks or complete new quizzes to generate study cards.
        </p>
        <a href={`${base}review/decks`} className="mcq-btn-primary" style={{ fontSize: '0.78rem' }}>
          Browse Decks
        </a>
      </div>
    );
  }

  // Progress percentage
  const progressPct = ((currentIdx) / sessionQueue.length) * 100;

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--mcq-text)' }}>
      {/* Session Progress Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontSize: '0.7rem', color: 'var(--mcq-text-muted)', fontWeight: 600 }}>
        <span>Deck: <strong style={{ color: 'var(--mcq-text-primary)' }}>{activeCard.deckTitle}</strong></span>
        <span>{currentIdx + 1} / {sessionQueue.length} cards</span>
      </div>

      <div style={{ height: 4, background: 'var(--mcq-border)', borderRadius: 999, overflow: 'hidden', marginBottom: '32px' }}>
        <div style={{ height: '100%', background: '#fbbf24', width: `${progressPct}%`, transition: 'width 0.3s ease' }} />
      </div>

      {/* Card Arena */}
      <div style={{ perspective: 1000, marginBottom: '28px' }}>
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            transformStyle: 'preserve-3d',
            position: 'relative',
            minHeight: '280px',
            cursor: 'pointer'
          }}
          onClick={handleFlip}
        >
          {/* Front Face */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              borderRadius: 20,
              border: '1.5px solid var(--mcq-border-strong)',
              background: 'var(--mcq-surface)',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              position: 'relative'
            }}
          >
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.08em', position: 'absolute', top: 18, left: 20 }}>
              Question
            </span>

            {category && (
              <div style={{
                position: 'absolute', top: 14, right: 20,
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 999,
                background: 'var(--mcq-surface-20)', border: '1px solid var(--mcq-border)',
                fontSize: '0.62rem', fontWeight: 700, color: 'var(--mcq-text-primary)'
              }}>
                <CategoryIcon categoryId={category.id} size={11} />
                <span>{category.name}</span>
              </div>
            )}

            <div style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 700, color: 'var(--mcq-text-primary)', lineHeight: 1.5, fontFamily: 'var(--font-display)' }}>
              {renderMarkdown(activeCard.front)}
            </div>
            <span style={{ fontSize: '0.62rem', color: 'var(--mcq-text-muted)', marginTop: '24px', fontStyle: 'italic' }}>
              Click card or press Space to reveal answer
            </span>
          </div>

          {/* Back Face */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: 20,
              border: '1.5px solid var(--mcq-border-strong)',
              background: 'var(--mcq-surface-20)',
              padding: '32px 24px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflowY: 'auto'
            }}
          >
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.08em', position: 'absolute', top: 18, left: 20 }}>
              Answer
            </span>

            {category && (
              <div style={{
                position: 'absolute', top: 14, right: 20,
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 999,
                background: 'var(--mcq-surface)', border: '1px solid var(--mcq-border)',
                fontSize: '0.62rem', fontWeight: 700, color: 'var(--mcq-text-primary)'
              }}>
                <CategoryIcon categoryId={category.id} size={11} />
                <span>{category.name}</span>
              </div>
            )}

            <div style={{ color: 'var(--mcq-text-body)' }}>
              {renderMarkdown(activeCard.back)}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Control Area */}
      <div style={{ minHeight: '80px' }}>
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="flip-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ textAlign: 'center' }}
            >
              <button onClick={handleFlip} className="mcq-btn-primary" style={{ padding: '12px 32px', fontSize: '0.85rem' }}>
                Reveal Answer
              </button>
              <div style={{ fontSize: '0.62rem', color: 'var(--mcq-text-muted)', marginTop: '8px' }}>
                or press <kbd className="mcq-kbd">Space</kbd>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grade-btns"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, width: '100%' }}>
                {[
                  { score: 0, label: 'Again', desc: '10m', color: '#ef4444', hoverBg: 'rgba(239,68,68,0.1)' },
                  { score: 1, label: 'Hard', desc: '3d', color: '#f59e0b', hoverBg: 'rgba(245,158,11,0.1)' },
                  { score: 2, label: 'Good', desc: '8d', color: '#60a5fa', hoverBg: 'rgba(96,165,250,0.1)' },
                  { score: 3, label: 'Easy', desc: '15d', color: '#22c55e', hoverBg: 'rgba(34,197,94,0.1)' },
                ].map((item, idx) => (
                  <button
                    key={item.label}
                    onClick={() => handleGrade(item.score)}
                    className="mcq-option-btn"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px 8px',
                      borderRadius: 12,
                      borderColor: item.color,
                      background: 'var(--mcq-surface-20)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: item.color }}>{item.label}</span>
                    <span style={{ fontSize: '0.58rem', color: 'var(--mcq-text-muted)', marginTop: '2px' }}>{item.desc}</span>
                    <span style={{ fontSize: '0.52rem', color: 'var(--mcq-text-muted)', border: '1px solid var(--mcq-border)', borderRadius: 3, padding: '1px 3px', marginTop: '6px', fontFamily: 'monospace' }}>
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '0.62rem', color: 'var(--mcq-text-muted)' }}>
                Press <kbd className="mcq-kbd">1</kbd> to <kbd className="mcq-kbd">4</kbd> to grade, or <kbd className="mcq-kbd">Space</kbd> to flip back
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
