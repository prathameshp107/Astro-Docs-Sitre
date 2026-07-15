import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { syncManager } from '../../lib/sync/syncManager';

export default function AuthProvider({ children }) {
  const { setSession, setProfile, setShowUsernameModal } = useAuthStore();

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSession = async (session) => {
    setSession(session);
    if (!session?.user) {
      setProfile(null);
      syncManager.handleAuthChange(null);
      return;
    }

    // Fetch user profile from Supabase
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }

      if (data) {
        setProfile(data);
        syncManager.handleAuthChange(session.user.id);
      } else {
        // Authenticated but no profile created yet (i.e. first sign-in)
        setShowUsernameModal(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return <>{children}</>;
}
