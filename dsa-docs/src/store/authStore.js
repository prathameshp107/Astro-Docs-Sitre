import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  profile: null,
  syncStatus: 'idle', // 'idle' | 'syncing' | 'synced' | 'error'
  showUsernameModal: false,

  setSession: (session) => set({
    session,
    user: session?.user || null
  }),

  setProfile: (profile) => set({ profile }),

  setSyncStatus: (syncStatus) => set({ syncStatus }),

  setShowUsernameModal: (show) => set({ showUsernameModal: show }),

  logout: () => set({
    user: null,
    session: null,
    profile: null,
    syncStatus: 'idle',
    showUsernameModal: false
  })
}));
