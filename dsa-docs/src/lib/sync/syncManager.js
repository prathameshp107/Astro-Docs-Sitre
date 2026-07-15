import { supabase } from '../supabase';
import { useAuthStore } from '../../store/authStore';
import { useJudgeStore } from '../../store/judgeStore';
import { usePlanStore } from '../../store/planStore';
import { getInitialProgress, saveProgress, subscribeMCQ } from '../../components/mcq/MCQStore';
import { useSrsStore } from '../../store/srsStore';
import { mergeJudge, mergePlans, mergeMcq, mergeSrs } from './merges';

class SyncManager {
  constructor() {
    this.userId = null;
    this.queuedPushes = {}; // storeName -> timeoutId
    this.stores = {};
    this.isSyncingOnAuthChange = false;

    // Define store registrations
    this.registerStore('judge', {
      get: () => {
        const state = useJudgeStore.getState();
        return {
          solved: state.solved,
          drafts: state.drafts,
          submissions: state.submissions
        };
      },
      set: (data) => useJudgeStore.setState(data),
      subscribe: (cb) => useJudgeStore.subscribe(cb),
      merge: mergeJudge
    });

    this.registerStore('plans', {
      get: () => {
        const state = usePlanStore.getState();
        return {
          active: state.active,
          progress: state.progress
        };
      },
      set: (data) => usePlanStore.setState(data),
      subscribe: (cb) => usePlanStore.subscribe(cb),
      merge: mergePlans
    });

    this.registerStore('mcq', {
      get: () => getInitialProgress(),
      set: (data) => saveProgress(data),
      subscribe: (cb) => subscribeMCQ(cb),
      merge: mergeMcq
    });

    this.registerStore('srs', {
      get: () => {
        const state = useSrsStore.getState();
        return {
          decks: state.decks,
          cards: state.cards,
          autoCards: state.autoCards,
          logs: state.logs,
          dailyCaps: state.dailyCaps
        };
      },
      set: (data) => useSrsStore.setState(data),
      subscribe: (cb) => useSrsStore.subscribe(cb),
      merge: mergeSrs
    });
  }

  registerStore(name, config) {
    this.stores[name] = config;
  }

  // Hooked to visibilitychange and pagehide
  init() {
    if (typeof window === 'undefined') return;

    // Flush any pending pushes on page exit/visibility changes
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flushAll();
      }
    });

    window.addEventListener('pagehide', () => {
      this.flushAll();
    });

    // Custom event listener for triggering auth changes in components
    window.addEventListener('dsa-auth-sync', (e) => {
      this.handleAuthChange(e.detail);
    });
  }

  handleAuthChange(userId) {
    this.userId = userId;

    if (userId) {
      // 1. Authenticated: pull remote state, merge, and start subscriptions
      this.pullAndSync();
      this.startSubscriptions();
    } else {
      // 2. Logged out: stop subscriptions, clear queued timeouts
      this.stopSubscriptions();
      this.userId = null;
    }
  }

  startSubscriptions() {
    this.stopSubscriptions(); // Avoid double subscriptions

    this.unsubscribes = Object.entries(this.stores).map(([name, store]) => {
      return store.subscribe(() => {
        // Trigger push queue on changes
        this.queuePush(name);
      });
    });
  }

  stopSubscriptions() {
    if (this.unsubscribes) {
      this.unsubscribes.forEach(unsub => unsub());
      this.unsubscribes = null;
    }
    // Clear timeouts
    Object.entries(this.queuedPushes).forEach(([name, timeoutId]) => {
      clearTimeout(timeoutId);
      delete this.queuedPushes[name];
    });
  }

  queuePush(storeName) {
    if (!this.userId) return;

    useAuthStore.getState().setSyncStatus('syncing');

    if (this.queuedPushes[storeName]) {
      clearTimeout(this.queuedPushes[storeName]);
    }

    this.queuedPushes[storeName] = setTimeout(() => {
      this.performPush(storeName);
    }, 3000); // 3 seconds debounce
  }

  async performPush(storeName) {
    if (!this.userId) return;
    delete this.queuedPushes[storeName];

    const store = this.stores[storeName];
    if (!store) return;

    try {
      const data = store.get();
      const { error } = await supabase
        .from('progress')
        .upsert({
          user_id: this.userId,
          store: storeName,
          data: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,store' });

      if (error) throw error;

      // If no other pushes are currently queued, mark status as synced
      if (Object.keys(this.queuedPushes).length === 0) {
        useAuthStore.getState().setSyncStatus('synced');
      }
    } catch (err) {
      console.error(`SyncManager push error [${storeName}]:`, err);
      useAuthStore.getState().setSyncStatus('error');
    }
  }

  flushAll() {
    if (!this.userId) return;

    Object.keys(this.queuedPushes).forEach((name) => {
      clearTimeout(this.queuedPushes[name]);
      // Synchronous-like trigger
      this.performPush(name);
    });
  }

  async pullAndSync() {
    if (!this.userId || this.isSyncingOnAuthChange) return;

    this.isSyncingOnAuthChange = true;
    useAuthStore.getState().setSyncStatus('syncing');

    try {
      // Fetch all progress stores for this user
      const { data: remoteRows, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', this.userId);

      if (error) throw error;

      const remoteDataMap = {};
      if (remoteRows) {
        remoteRows.forEach(row => {
          remoteDataMap[row.store] = row.data;
        });
      }

      // Loop over our registered stores and run merge logic
      for (const [name, store] of Object.entries(this.stores)) {
        const local = store.get();
        const remote = remoteDataMap[name];

        if (remote) {
          // Both local and remote exist -> merge
          const merged = store.merge(remote, local);
          
          // Save merged data back locally
          store.set(merged);

          // If local wasn't identical to the merged state, push it back
          if (JSON.stringify(merged) !== JSON.stringify(remote)) {
            await this.performPushDirect(name, merged);
          }
        } else {
          // Remote is empty, push local store up to populate remote
          await this.performPushDirect(name, local);
        }
      }

      useAuthStore.getState().setSyncStatus('synced');
    } catch (err) {
      console.error('SyncManager pullAndSync error:', err);
      useAuthStore.getState().setSyncStatus('error');
    } finally {
      this.isSyncingOnAuthChange = false;
    }
  }

  // Direct, non-debounced push helper used during load/merge initialization
  async performPushDirect(storeName, data) {
    if (!this.userId) return;
    try {
      const { error } = await supabase
        .from('progress')
        .upsert({
          user_id: this.userId,
          store: storeName,
          data: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,store' });

      if (error) throw error;
    } catch (err) {
      console.error(`SyncManager pushDirect error [${storeName}]:`, err);
    }
  }
}

export const syncManager = new SyncManager();
if (typeof window !== 'undefined') {
  syncManager.init();
}
