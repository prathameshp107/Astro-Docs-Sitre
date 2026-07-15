import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * storyStore — STAR story bank for Behavioral Interview Prep (Feature 08).
 *
 * Stories are personal data: private, localStorage-first (never public,
 * never included in shared/public profile views). Synced to an account
 * later is a Feature 03 integration point — not implemented in Phase 1+2.
 *
 * Story shape:
 * {
 *   id: string,
 *   title: string,
 *   situation: string,
 *   task: string,
 *   action: string,
 *   result: string,
 *   tags: string[],       // category ids from categories.json this story can answer
 *   createdAt: number,
 *   updatedAt: number
 * }
 */

const genId = () =>
  `story-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useStoryStore = create(
  persist(
    (set, get) => ({
      stories: [],

      addStory: (story) =>
        set((state) => {
          const now = Date.now();
          const newStory = {
            id: genId(),
            title: story.title || 'Untitled story',
            situation: story.situation || '',
            task: story.task || '',
            action: story.action || '',
            result: story.result || '',
            tags: story.tags || [],
            createdAt: now,
            updatedAt: now,
          };
          return { stories: [...state.stories, newStory] };
        }),

      updateStory: (id, updates) =>
        set((state) => ({
          stories: state.stories.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s
          ),
        })),

      deleteStory: (id) =>
        set((state) => ({
          stories: state.stories.filter((s) => s.id !== id),
        })),

      getStory: (id) => get().stories.find((s) => s.id === id),

      /** categoryId -> array of stories tagged with it */
      getStoriesForCategory: (categoryId) =>
        get().stories.filter((s) => s.tags.includes(categoryId)),

      /** categoryIds with zero stories tagged */
      getGapCategories: (allCategoryIds) => {
        const { stories } = get();
        const covered = new Set(stories.flatMap((s) => s.tags));
        return allCategoryIds.filter((id) => !covered.has(id));
      },
    }),
    {
      name: 'dsa-behavioral-stories',
      partialize: (state) => ({ stories: state.stories }),
    }
  )
);
