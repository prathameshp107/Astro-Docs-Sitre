import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ProfileCard from './ProfileCard.jsx';
import Skeleton from '../Skeleton.jsx';

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null);
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract username from query param ?username=... or fallback to path /u/username
  const getUsernameFromPath = () => {
    if (typeof window === 'undefined') return '';
    
    // 1. Try to read from query parameter "?username=..."
    const params = new URLSearchParams(window.location.search);
    const queryUser = params.get('username');
    if (queryUser) return queryUser;

    // 2. Fallback to path "/u/username"
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2] || '';
  };

  useEffect(() => {
    const username = getUsernameFromPath();
    if (!username) {
      setError('No username provided.');
      setLoading(false);
      return;
    }

    async function fetchProfileAndProgress() {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch user profile
        const { data: prof, error: profErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username.toLowerCase())
          .single();

        if (profErr) {
          if (profErr.code === 'PGRST116') {
            throw new Error('User not found.');
          }
          throw profErr;
        }

        setProfile(prof);

        // If the profile is private and it's not the owner, we won't be able to query progress
        if (!prof.is_public) {
          // Check if current user is the owner
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.id !== prof.id) {
            throw new Error('This profile is set to private.');
          }
        }

        // 2. Fetch progress rows
        const { data: progRows, error: progErr } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', prof.id);

        if (progErr) throw progErr;

        const dataMap = {};
        if (progRows) {
          progRows.forEach(row => {
            dataMap[row.store] = row.data;
          });
        }

        setProgressData(dataMap);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    }

    fetchProfileAndProgress();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="p-6 rounded-2xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)] flex items-center gap-6">
          <Skeleton variant="avatar" size="80px" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="180px" height="28px" />
            <Skeleton variant="text" width="120px" height="16px" />
          </div>
        </div>
        
        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)]/50 h-52 flex flex-col justify-between">
            <Skeleton variant="text" width="40%" height="16px" />
            <div className="space-y-3">
              <Skeleton variant="text" width="100%" height="8px" />
              <Skeleton variant="text" width="100%" height="8px" />
              <Skeleton variant="text" width="100%" height="8px" />
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)]/50 h-52 flex flex-col justify-between">
            <Skeleton variant="text" width="40%" height="16px" />
            <div className="flex gap-4">
              <Skeleton variant="badge" width="45%" height="40px" />
              <Skeleton variant="badge" width="45%" height="40px" />
            </div>
            <Skeleton variant="text" width="60%" height="12px" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-8 rounded-2xl border border-red-500/10 bg-red-500/5 text-center space-y-3">
        <span className="text-3xl block">🚫</span>
        <h3 className="text-base font-bold text-red-400">Profile Error</h3>
        <p className="text-xs text-[var(--mcq-text-secondary)] leading-relaxed">{error}</p>
        <a href="/" className="inline-block mt-4 text-xs font-semibold text-blue-400 hover:underline">
          Back to Home
        </a>
      </div>
    );
  }

  return <ProfileCard profile={profile} progressData={progressData} />;
}
