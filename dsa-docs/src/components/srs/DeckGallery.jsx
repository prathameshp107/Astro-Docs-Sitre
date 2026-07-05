import { useState, useEffect } from 'react';
import { useSrsStore } from '../../store/srsStore';
import { CategoryIcon } from '../mcq/CategoryIcons';
import jsCoreDeck from '../../data/srs/decks/js-core.json';
import reactDeck from '../../data/srs/decks/react.json';
import sqlDeck from '../../data/srs/decks/sql.json';

const PREBUILT_DECKS = [
  {
    ...jsCoreDeck,
    icon: 'javascript', // category ID for icon
    tags: ['Core JS', 'Interview Prep'],
    difficulty: 'Intermediate',
    color: '#f7df1e'
  },
  {
    ...reactDeck,
    icon: 'react',
    tags: ['React Hooks', 'DOM Rendering'],
    difficulty: 'Intermediate',
    color: '#61dafb'
  },
  {
    ...sqlDeck,
    icon: 'sql',
    tags: ['Queries', 'Database ACID'],
    difficulty: 'Beginner',
    color: '#f59e0b'
  }
];

export default function DeckGallery() {
  const subscribedDecks = useSrsStore(state => state.decks);
  const subscribeDeck = useSrsStore(state => state.subscribeDeck);
  const unsubscribeDeck = useSrsStore(state => state.unsubscribeDeck);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', color: 'var(--mcq-text)' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--mcq-text-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
            🗂️ Prebuilt Study Decks
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--mcq-text-secondary)', marginTop: '2px' }}>
            Subscribe to decks to add their cards into your daily review pool
          </p>
        </div>
        <a href={`${base}review`} className="mcq-btn-primary" style={{ fontSize: '0.78rem', padding: '8px 16px' }}>
          Start Reviewing →
        </a>
      </div>

      {/* Grid */}
      <div className="mcq-bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {PREBUILT_DECKS.map(deck => {
          const isSubscribed = subscribedDecks.includes(deck.id);
          const cardCount = deck.cards?.length || 0;

          return (
            <div
              key={deck.id}
              className="mcq-bento-card"
              style={{
                '--card-color': deck.color,
                '--card-color-border': `${deck.color}40`,
                '--card-color-bg': `${deck.color}14`,
                '--card-color-glow': `${deck.color}0a`,
                minHeight: '210px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header */}
                <div className="mcq-bento-header" style={{ marginBottom: '10px' }}>
                  <div className="mcq-bento-icon-wrap" style={{ background: `${deck.color}24`, borderColor: `${deck.color}40` }}>
                    <CategoryIcon categoryId={deck.icon} size={22} />
                  </div>
                  <span style={{
                    padding: '2px 8px', borderRadius: 999, fontSize: '0.58rem', fontWeight: 700,
                    background: 'var(--mcq-surface-20)', color: 'var(--mcq-text-muted)', border: '1px solid var(--mcq-border)'
                  }}>{deck.difficulty}</span>
                </div>

                {/* Content */}
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--mcq-text-primary)', fontFamily: 'var(--font-display)', margin: '0 0 4px' }}>
                  {deck.title}
                </h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--mcq-text-secondary)', lineHeight: 1.5, margin: '0 0 12px' }}>
                  {deck.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                  {deck.tags.map(t => (
                    <span key={t} style={{
                      padding: '2px 6px', borderRadius: 4, fontSize: '0.55rem', fontWeight: 600,
                      background: 'var(--mcq-surface-20)', color: 'var(--mcq-text-muted)'
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--mcq-border)', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--mcq-text-muted)', fontWeight: 600 }}>
                  📄 {cardCount} cards
                </span>
                
                {isSubscribed ? (
                  <button
                    onClick={() => unsubscribeDeck(deck.id)}
                    className="mcq-btn-secondary"
                    style={{
                      fontSize: '0.68rem', padding: '5px 12px', border: '1px solid rgba(239,68,68,0.2)',
                      background: 'rgba(239,68,68,0.04)', color: '#f87171'
                    }}
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    onClick={() => subscribeDeck(deck.id)}
                    className="mcq-btn-primary"
                    style={{ fontSize: '0.68rem', padding: '5px 12px' }}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
