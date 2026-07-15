import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { useJudgeStore } from '../../store/judgeStore';
import { usePlanStore } from '../../store/planStore';
import { getInitialProgress, saveProgress } from '../mcq/MCQStore';
import { LogIn, LogOut, User, Download, Trash2, ShieldAlert, Check, X, Loader2 } from 'lucide-react';

export default function AuthButton() {
  const { session, user, profile, setProfile, showUsernameModal, setShowUsernameModal, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [usernameStatus, setUsernameStatus] = useState('idle'); // 'idle' | 'checking' | 'available' | 'taken'
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const dropdownRef = useRef(null);
  const checkTimeoutRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [dropdownOpen]);

  // Username validation check
  useEffect(() => {
    if (!username.trim() || username.length < 3) {
      setUsernameStatus('idle');
      return;
    }

    setUsernameStatus('checking');
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);

    checkTimeoutRef.current = setTimeout(async () => {
      try {
        const cleaned = username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', cleaned);

        if (error) throw error;

        if (data && data.length > 0) {
          setUsernameStatus('taken');
        } else {
          setUsernameStatus('available');
        }
      } catch (err) {
        console.error(err);
        setUsernameStatus('idle');
      }
    }, 500);

    return () => clearTimeout(checkTimeoutRef.current);
  }, [username]);

  const handleSignIn = async (provider) => {
    try {
      const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
      const redirectUrl = `${window.location.origin}${base}auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error('Error signing in:', err.message);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailLoading(true);
    try {
      const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
      const redirectUrl = `${window.location.origin}${base}auth/callback`;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      if (error) throw error;
      setEmailSent(true);
    } catch (err) {
      console.error(err);
      alert('Error sending magic link: ' + err.message);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      logout();
      setDropdownOpen(false);
    } catch (err) {
      console.error('Error signing out:', err.message);
    }
  };

  const handleClaimUsername = async (e) => {
    e.preventDefault();
    if (usernameStatus !== 'available' || !username.trim()) return;

    setModalLoading(true);
    setModalError('');

    try {
      const cleaned = username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
      const avatarUrl = user?.user_metadata?.avatar_url || '';
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: cleaned,
          avatar_url: avatarUrl,
          is_public: true
        })
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      setShowUsernameModal(false);
      // Trigger sync engine pulling/pushing
      window.dispatchEvent(new CustomEvent('dsa-auth-sync', { detail: user.id }));
    } catch (err) {
      console.error(err);
      setModalError(err.message || 'Failed to claim username. Please try again.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleExportData = () => {
    const data = {
      judge: useJudgeStore.getState(),
      plans: usePlanStore.getState(),
      mcq: getInitialProgress()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile?.username || 'dsa'}_progress_export.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = async () => {
    setModalLoading(true);
    try {
      // 1. Delete progress in database (RLS + cascade will handle it, but to be sure we can call API)
      await supabase.from('progress').delete().eq('user_id', user.id);
      
      // 2. Delete profile (cascade on user delete, but profile has user delete policy)
      await supabase.from('profiles').delete().eq('id', user.id);
      
      // 3. Delete local data if desired
      useJudgeStore.setState({ solved: {}, drafts: {}, submissions: {} });
      usePlanStore.setState({ active: [], progress: {} });
      saveProgress({
        totalAnswered: 0,
        totalCorrect: 0,
        totalWrong: 0,
        currentStreak: 0,
        bestStreak: 0,
        xp: 0,
        level: 1,
        answeredQuestions: [],
        categoryProgress: {},
        achievements: [],
        lastActive: null,
      });

      // 4. Sign out
      await handleSignOut();
      setDeleteConfirm(false);
    } catch (err) {
      console.error(err);
      alert('Error deleting account: ' + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  return (
    <div className="relative" ref={dropdownRef}>
      {session ? (
        // Logged In user view
        <div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full border border-[var(--mcq-border)] hover:border-blue-400 bg-[var(--mcq-surface-20)] hover:bg-[var(--mcq-surface-hover)] transition-all focus:outline-none"
            aria-label="User menu"
            aria-expanded={dropdownOpen}
          >
            {profile?.avatar_url || user?.user_metadata?.avatar_url ? (
              <img
                src={profile?.avatar_url || user?.user_metadata?.avatar_url}
                alt={profile?.username || 'User avatar'}
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold font-mono">
                {profile?.username?.slice(0, 2).toUpperCase() || 'U'}
              </div>
            )}
          </button>

          {/* Premium Glassmorphic Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-30)]/90 backdrop-blur-xl shadow-2xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-[var(--mcq-border)]/50 mb-1.5">
                <span className="text-xs text-[var(--mcq-text-muted)] block">Signed in as</span>
                <span className="text-sm font-bold text-[var(--mcq-text-primary)] block truncate">@{profile?.username || 'user'}</span>
              </div>
              
              <a
                href={`${base}u?username=${profile?.username || ''}`}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-[var(--mcq-text)] hover:text-white hover:bg-white/5 transition-all no-underline"
              >
                <User size={14} className="text-[var(--mcq-text-muted)]" /> View Public Profile
              </a>
              
              <button
                onClick={handleExportData}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-xs text-[var(--mcq-text)] hover:text-white hover:bg-white/5 transition-all focus:outline-none"
              >
                <Download size={14} className="text-[var(--mcq-text-muted)]" /> Export Data (JSON)
              </button>

              <button
                onClick={() => setDeleteConfirm(true)}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-xs text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all focus:outline-none"
              >
                <Trash2 size={14} className="text-red-400/60" /> Delete Account
              </button>

              <div className="border-t border-[var(--mcq-border)]/50 my-1.5" />

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-xs text-[var(--mcq-text)] hover:text-white hover:bg-white/5 transition-all focus:outline-none"
              >
                <LogOut size={14} className="text-[var(--mcq-text-muted)]" /> Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        // Logged Out view - Sign In button
        <div className="flex gap-2">
          <button
            onClick={() => setShowSignInModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--mcq-border)] hover:border-blue-400 bg-[var(--mcq-surface-20)] hover:bg-[var(--mcq-surface-hover)] text-xs font-semibold text-[var(--mcq-text)] transition-all focus:outline-none"
          >
            <LogIn size={13} /> Sign In
          </button>
        </div>
      )}

      {/* Username Claim Modal */}
      {mounted && showUsernameModal && createPortal(
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
          <div className="w-full max-w-md bg-[var(--mcq-surface)] rounded-2xl border border-[var(--mcq-border)] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-[var(--mcq-text-primary)] mb-2 flex items-center gap-2">
              <span className="text-blue-400 font-mono">⬡</span> Claim Your Username
            </h3>
            <p className="text-xs text-[var(--mcq-text-muted)] mb-5 leading-relaxed">
              Welcome! To complete your registration, please choose a unique username. This will identify your public profile and progress.
            </p>

            <form onSubmit={handleClaimUsername} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[var(--mcq-text-secondary)] text-xs font-semibold block">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--mcq-text-muted)] font-mono">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                    placeholder="username"
                    maxLength={20}
                    required
                    className="w-full pl-7 pr-10 py-2.5 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-sm text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all font-mono"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {usernameStatus === 'checking' && <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />}
                    {usernameStatus === 'available' && <Check className="w-4 h-4 text-green-400" />}
                    {usernameStatus === 'taken' && <X className="w-4 h-4 text-red-400" />}
                  </div>
                </div>
                
                {usernameStatus === 'available' && (
                  <span className="text-[0.65rem] text-green-400 font-medium block">Username is available!</span>
                )}
                {usernameStatus === 'taken' && (
                  <span className="text-[0.65rem] text-red-400 font-medium block">Username is already taken.</span>
                )}
              </div>

              {modalError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 leading-normal">
                  {modalError}
                </div>
              )}

              <button
                type="submit"
                disabled={usernameStatus !== 'available' || modalLoading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 disabled:from-blue-500/50 disabled:to-indigo-500/50 text-white text-xs font-semibold shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all disabled:cursor-not-allowed focus:outline-none flex items-center justify-center gap-2"
              >
                {modalLoading ? <Loader2 size={13} className="animate-spin" /> : 'Confirm & Sync'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Account Confirmation Modal */}
      {mounted && deleteConfirm && createPortal(
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
          <div className="w-full max-w-sm bg-[var(--mcq-surface)] rounded-2xl border border-red-500/20 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-red-400 mb-2 flex items-center gap-2">
              <ShieldAlert size={18} /> Danger Zone
            </h3>
            <p className="text-xs text-[var(--mcq-text-secondary)] mb-5 leading-relaxed">
              Are you absolutely sure you want to delete your account? This will permanently delete your profile, public stats, and progress snapshots from both Supabase and this device. <strong>This action cannot be undone.</strong>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-[var(--mcq-border)] hover:bg-white/5 text-[var(--mcq-text-secondary)] text-xs font-semibold transition-all focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={modalLoading}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-all focus:outline-none flex items-center justify-center gap-2"
              >
                {modalLoading ? <Loader2 size={13} className="animate-spin" /> : 'Yes, Delete Everything'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Sign In Modal */}
      {mounted && showSignInModal && createPortal(
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
          <div className="w-full max-w-md bg-[var(--mcq-surface)] rounded-2xl border border-[var(--mcq-border)] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[var(--mcq-text-primary)] flex items-center gap-2">
                <span className="text-blue-400 font-mono">⬡</span> Sign In
              </h3>
              <button 
                onClick={() => {
                  setShowSignInModal(false);
                  setEmailSent(false);
                  setEmail('');
                }}
                className="text-[var(--mcq-text-muted)] hover:text-white transition-all focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>
            
            <p className="text-xs text-[var(--mcq-text-muted)] mb-5 leading-relaxed">
              Sign in to sync your progress, solved problems, and study plans across all your devices.
            </p>

            <div className="space-y-3">
              {/* GitHub OAuth */}
              <button
                onClick={() => handleSignIn('github')}
                className="w-full py-2.5 rounded-xl border border-[var(--mcq-border)] hover:border-blue-400 bg-[var(--mcq-surface-20)] hover:bg-[var(--mcq-surface-hover)] text-[var(--mcq-text)] text-xs font-semibold hover:text-white transition-all flex items-center justify-center gap-2 focus:outline-none"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                </svg>
                Sign In with GitHub
              </button>

              {/* Google OAuth */}
              <button
                onClick={() => handleSignIn('google')}
                className="w-full py-2.5 rounded-xl border border-[var(--mcq-border)] hover:border-blue-400 bg-[var(--mcq-surface-20)] hover:bg-[var(--mcq-surface-hover)] text-[var(--mcq-text)] text-xs font-semibold hover:text-white transition-all flex items-center justify-center gap-2 focus:outline-none"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign In with Google
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[var(--mcq-border)]/50"></div>
                <span className="flex-shrink mx-4 text-[10px] text-[var(--mcq-text-muted)] uppercase tracking-wider font-semibold">or email magic link</span>
                <div className="flex-grow border-t border-[var(--mcq-border)]/50"></div>
              </div>

              {/* Email Magic Link Form */}
              {emailSent ? (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-400 text-center leading-normal">
                  ✉️ Magic link sent! Please check your email inbox to complete sign in.
                </div>
              ) : (
                <form onSubmit={handleEmailSignIn} className="space-y-3">
                  <div className="space-y-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[var(--mcq-surface-20)] border border-[var(--mcq-border)] text-xs text-[var(--mcq-text)] placeholder:text-[var(--mcq-text-muted)] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="w-full py-2 rounded-xl bg-blue-500/80 hover:bg-blue-500 text-white text-xs font-semibold transition-all focus:outline-none flex items-center justify-center gap-2"
                  >
                    {emailLoading ? <Loader2 size={13} className="animate-spin" /> : 'Send Magic Link'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
