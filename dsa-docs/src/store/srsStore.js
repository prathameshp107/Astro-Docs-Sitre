import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { schedule } from '../lib/srs/sm2';

export const useSrsStore = create(
  persist(
    (set, get) => ({
      decks: [],              // Array of subscribed deck IDs (e.g. ['js-core'])
      cards: {},              // cardId -> { reps, ease, intervalDays, dueTs, lapses, addedTs }
      autoCards: {},          // cardId -> { id, type, front, back, categoryId, mcqRef, addedTs }
      logs: [],               // Array of { ts, cardId, grade }
      dailyCaps: {
        reviews: 20,
        new: 10
      },

      subscribeDeck: (deckId) =>
        set((state) => {
          if (state.decks.includes(deckId)) return state;
          return { decks: [...state.decks, deckId] };
        }),

      unsubscribeDeck: (deckId) =>
        set((state) => {
          const decks = state.decks.filter(id => id !== deckId);
          // Delete card states matching the unsubscribed deck
          const cards = { ...state.cards };
          Object.keys(cards).forEach(cardId => {
            if (cardId.startsWith(deckId + '-')) {
              delete cards[cardId];
            }
          });
          return { decks, cards };
        }),

      addAutoCard: (card) =>
        set((state) => {
          const cards = { ...state.cards };
          // If already has review history, reset its dueTs so it appears immediately
          cards[card.id] = {
            reps: 0,
            ease: 2.5,
            intervalDays: 0,
            dueTs: 0,
            lapses: cards[card.id]?.lapses || 0,
            addedTs: cards[card.id]?.addedTs || Date.now()
          };

          return {
            autoCards: {
              ...state.autoCards,
              [card.id]: {
                ...card,
                addedTs: Date.now()
              }
            },
            cards
          };
        }),

      gradeCard: (cardId, grade, now = Date.now()) =>
        set((state) => {
          const cardState = state.cards[cardId];
          const updatedCard = schedule(cardState, grade, now);

          return {
            cards: {
              ...state.cards,
              [cardId]: {
                ...updatedCard,
                addedTs: cardState?.addedTs || now
              }
            },
            logs: [
              ...state.logs,
              { ts: now, cardId, grade }
            ]
          };
        }),

      // Helper logic to build active study queue for a deck session
      getQueue: (allDecks, now = Date.now()) => {
        const state = get();
        const activeDecks = allDecks.filter(d => state.decks.includes(d.id));

        // 1. Gather all study items (prebuilt + wrong MCQs autoCards)
        const allItems = [];

        // Prebuilt deck items
        activeDecks.forEach(deck => {
          (deck.cards || []).forEach(card => {
            allItems.push({
              ...card,
              deckId: deck.id,
              deckTitle: deck.title
            });
          });
        });

        // Wrong MCQs items
        Object.values(state.autoCards).forEach(card => {
          allItems.push({
            ...card,
            deckId: 'wrong-mcqs',
            deckTitle: 'Wrong Answers Retry'
          });
        });

        // 2. Map items with current schedule status
        const mapped = allItems.map(item => {
          const s = state.cards[item.id] || {
            reps: 0,
            ease: 2.5,
            intervalDays: 0,
            dueTs: 0,
            lapses: 0
          };
          return {
            ...item,
            schedule: s,
            isNew: s.reps === 0
          };
        });

        // 3. Filter only due items
        const dueItems = mapped.filter(item => item.schedule.dueTs <= now);

        // 4. Implement daily review/new study caps per calendar day
        // To find how many new/review cards were studied today:
        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);
        const todayStartTs = todayStart.getTime();

        const todayLogs = state.logs.filter(l => l.ts >= todayStartTs);
        const studiedIds = new Set(todayLogs.map(l => l.cardId));

        // Identify new vs reviews studied today
        let newStudiedToday = 0;
        let reviewsStudiedToday = 0;

        studiedIds.forEach(id => {
          const cardState = state.cards[id];
          if (cardState) {
            // If the card has been studied today, check if it was new at start of day
            const logsBeforeToday = state.logs.filter(l => l.cardId === id && l.ts < todayStartTs);
            if (logsBeforeToday.length === 0) {
              newStudiedToday++;
            } else {
              reviewsStudiedToday++;
            }
          }
        });

        const newRemainingCap = Math.max(0, state.dailyCaps.new - newStudiedToday);
        const reviewRemainingCap = Math.max(0, state.dailyCaps.reviews - reviewsStudiedToday);

        // 5. Partition queue, sort, and slice according to caps
        // Wrong MCQ cards bypass the cap so they show up immediately on failures!
        const autoCardsDue = dueItems.filter(i => i.deckId === 'wrong-mcqs');
        const prebuiltDue = dueItems.filter(i => i.deckId !== 'wrong-mcqs');

        const prebuiltReviews = prebuiltDue.filter(i => !i.isNew);
        const prebuiltNew = prebuiltDue.filter(i => i.isNew);

        // Sort reviews by due date (oldest first)
        prebuiltReviews.sort((a, b) => a.schedule.dueTs - b.schedule.dueTs);

        // Sort new cards by added time (or sequence)
        prebuiltNew.sort((a, b) => (a.addedTs || 0) - (b.addedTs || 0));

        const slicedReviews = prebuiltReviews.slice(0, reviewRemainingCap);
        const slicedNew = prebuiltNew.slice(0, newRemainingCap);

        const finalQueue = [...autoCardsDue, ...slicedReviews, ...slicedNew];

        return {
          queue: finalQueue,
          counts: {
            dueReviews: dueItems.filter(i => !i.isNew).length,
            dueNew: dueItems.filter(i => i.isNew).length,
            remainingReviews: slicedReviews.length + autoCardsDue.filter(i => !i.isNew).length,
            remainingNew: slicedNew.length + autoCardsDue.filter(i => i.isNew).length
          }
        };
      }
    }),
    {
      name: 'dsa-srs-store',
      partialize: (state) => ({
        decks: state.decks,
        cards: state.cards,
        autoCards: state.autoCards,
        logs: state.logs,
        dailyCaps: state.dailyCaps
      })
    }
  )
);
