import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

// Gracefully handle missing environment variables to support running without Supabase config
export const hasSupabaseConfig = !!(supabaseUrl && supabaseAnonKey);

const createMockSupabaseClient = () => {
  console.warn(
    '[Supabase] Warning: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are not configured. ' +
    'Auth and progress sync features will run in local-only mock mode.'
  );

  const mockQuery = {
    select: () => mockQuery,
    insert: () => mockQuery,
    upsert: () => mockQuery,
    delete: () => mockQuery,
    eq: () => mockQuery,
    single: () => mockQuery,
    then: (resolve) => resolve({ data: [], error: null }),
  };

  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      }),
      signInWithOAuth: async () => {
        alert('Supabase Auth is not configured. Please add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY to your .env file to enable.');
        return { error: null };
      },
      signOut: async () => ({ error: null }),
    },
    from: () => mockQuery,
  };
};

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient();
