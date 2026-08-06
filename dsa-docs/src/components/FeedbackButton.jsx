import { useState, useEffect, useRef } from 'react';

// ── CONFIG ─────────────────────────────────────────────────────────────────
// Environment variable read from .env (PUBLIC_FEEDBACK_EMAIL or PUBLIC_FORMSUBMIT_EMAIL)
// Uses FormSubmit (https://formsubmit.co) — free & unlimited.
const FORMSUBMIT_EMAIL =
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.PUBLIC_FEEDBACK_EMAIL || import.meta.env.PUBLIC_FORMSUBMIT_EMAIL))
  || 'YOUR_EMAIL@example.com';
// ───────────────────────────────────────────────────────────────────────────

const CSS = `
  /* ── Floating wrapper ── */
  .fb-root {
    position: fixed;
    bottom: 26px;
    right: 26px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    pointer-events: none;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  /* ── FAB trigger button ── */
  .fb-fab {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
    box-shadow:
      0 4px 24px rgba(99,102,241,0.50),
      0 1px 4px rgba(0,0,0,0.30),
      inset 0 1px 0 rgba(255,255,255,0.20);
    pointer-events: all;
    position: relative;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.25s ease;
    outline: none;
    flex-shrink: 0;
    transform: scale(0) rotate(-20deg);
    opacity: 0;
  }
  .fb-fab.fb-visible {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  .fb-fab:hover {
    transform: scale(1.10) rotate(0deg) !important;
    box-shadow:
      0 8px 32px rgba(99,102,241,0.65),
      0 2px 8px rgba(0,0,0,0.35),
      inset 0 1px 0 rgba(255,255,255,0.25);
  }
  .fb-fab:active {
    transform: scale(0.95) !important;
  }
  /* Pulse ring */
  .fb-fab::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid rgba(139,92,246,0.5);
    animation: fb-pulse 2.8s ease-out infinite;
    pointer-events: none;
  }
  .fb-fab.fb-open::before,
  .fb-fab:hover::before {
    animation: none;
    opacity: 0;
  }
  @keyframes fb-pulse {
    0%   { transform: scale(1);   opacity: 0.7; }
    65%  { transform: scale(1.55); opacity: 0; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  .fb-fab svg {
    width: 22px;
    height: 22px;
    color: #fff;
    position: relative;
    z-index: 1;
    transition: transform 0.25s ease;
  }
  .fb-fab.fb-open svg {
    transform: rotate(45deg) scale(0.9);
  }

  /* ── Hover label pill ── */
  .fb-label-pill {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(12,12,18,0.93);
    border: 1px solid rgba(99,102,241,0.35);
    backdrop-filter: blur(14px);
    border-radius: 22px;
    padding: 6px 14px 6px 10px;
    pointer-events: none;
    opacity: 0;
    transform: translateX(8px) scale(0.95);
    transition: opacity 0.2s ease, transform 0.2s ease;
    white-space: nowrap;
    position: absolute;
    right: 60px;
    bottom: 4px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  }
  .fb-fab:hover .fb-label-pill {
    opacity: 1;
    transform: translateX(0) scale(1);
    pointer-events: none;
  }
  .fb-label-pill-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #6366f1;
    flex-shrink: 0;
    animation: fb-dot-blink 1.8s ease-in-out infinite;
  }
  @keyframes fb-dot-blink {
    0%,100% { opacity:1; } 50% { opacity:0.4; }
  }
  .fb-label-pill-text {
    font-size: 12.5px;
    font-weight: 600;
    color: rgba(255,255,255,0.88);
    letter-spacing: 0.01em;
  }

  /* ── Hide chip ── */
  .fb-hide-chip {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(12,12,18,0.88);
    border: 1px solid rgba(255,255,255,0.09);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    padding: 4px 11px 4px 8px;
    cursor: pointer;
    pointer-events: all;
    color: rgba(255,255,255,0.40);
    font-size: 10.5px;
    font-family: 'JetBrains Mono', 'Fira Mono', monospace;
    font-weight: 500;
    letter-spacing: 0.04em;
    transition: all 0.2s ease;
    opacity: 0;
    transform: translateY(6px);
    user-select: none;
    white-space: nowrap;
  }
  .fb-root.fb-hovered .fb-hide-chip {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
  .fb-hide-chip:hover {
    color: rgba(255,80,80,0.85);
    border-color: rgba(255,80,80,0.25);
    background: rgba(20,10,10,0.95);
  }
  .fb-hide-x {
    font-size: 13px;
    line-height: 1;
    opacity: 0.7;
  }

  /* ── Modal backdrop ── */
  .fb-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(6px);
    z-index: 99998;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 90px 88px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  .fb-backdrop.fb-backdrop-open {
    pointer-events: all;
    opacity: 1;
  }

  /* ── Modal card ── */
  .fb-modal {
    width: 380px;
    max-width: calc(100vw - 32px);
    background: linear-gradient(145deg, rgba(18,16,28,0.98) 0%, rgba(22,18,35,0.98) 100%);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 22px;
    box-shadow:
      0 20px 80px rgba(0,0,0,0.7),
      0 4px 20px rgba(99,102,241,0.15),
      inset 0 1px 0 rgba(255,255,255,0.07);
    overflow: hidden;
    transform: translateY(18px) scale(0.97);
    transition: transform 0.3s cubic-bezier(0.34,1.3,0.64,1);
  }
  .fb-backdrop.fb-backdrop-open .fb-modal {
    transform: translateY(0) scale(1);
  }

  /* Modal header */
  .fb-modal-header {
    padding: 20px 22px 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .fb-modal-title-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .fb-modal-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #6366f1, #7c3aed);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(99,102,241,0.4);
  }
  .fb-modal-icon svg {
    width: 18px;
    height: 18px;
    color: #fff;
  }
  .fb-modal-title {
    font-size: 15px;
    font-weight: 700;
    color: rgba(255,255,255,0.95);
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  .fb-modal-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.40);
    margin-top: 2px;
    font-weight: 400;
  }
  .fb-modal-close {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.45);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 1;
    transition: all 0.15s ease;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .fb-modal-close:hover {
    background: rgba(255,255,255,0.10);
    color: rgba(255,255,255,0.85);
    border-color: rgba(255,255,255,0.2);
  }

  /* Divider */
  .fb-modal-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent);
    margin: 16px 0 0;
  }

  /* Form body */
  .fb-form {
    padding: 18px 22px 22px;
    display: flex;
    flex-direction: column;
    gap: 13px;
  }

  /* Type selector */
  .fb-type-row {
    display: flex;
    gap: 7px;
  }
  .fb-type-btn {
    flex: 1;
    padding: 7px 6px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.45);
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-family: inherit;
  }
  .fb-type-btn:hover {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.7);
  }
  .fb-type-btn.fb-type-active {
    background: rgba(99,102,241,0.18);
    border-color: rgba(99,102,241,0.45);
    color: #a5b4fc;
  }

  /* Input fields */
  .fb-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .fb-label-text {
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.40);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .fb-input {
    width: 100%;
    box-sizing: border-box;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 11px;
    padding: 10px 13px;
    font-size: 13.5px;
    color: rgba(255,255,255,0.88);
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s ease, background 0.15s ease;
    resize: none;
  }
  .fb-input::placeholder {
    color: rgba(255,255,255,0.22);
  }
  .fb-input:focus {
    border-color: rgba(99,102,241,0.55);
    background: rgba(99,102,241,0.06);
  }

  /* Rating row */
  .fb-rating-row {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .fb-star {
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.1s ease;
    line-height: 1;
    user-select: none;
    filter: grayscale(1) opacity(0.35);
  }
  .fb-star.fb-star-active {
    filter: none;
  }
  .fb-star:hover {
    transform: scale(1.25);
  }
  .fb-rating-label {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    margin-left: 6px;
  }

  /* Submit button */
  .fb-submit {
    width: 100%;
    padding: 11px 0;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
    color: #fff;
    font-size: 13.5px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: all 0.2s ease;
    box-shadow: 0 4px 18px rgba(99,102,241,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 2px;
  }
  .fb-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 7px 24px rgba(99,102,241,0.55);
  }
  .fb-submit:active:not(:disabled) {
    transform: translateY(1px);
  }
  .fb-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .fb-submit svg {
    width: 16px;
    height: 16px;
  }

  /* Spinner */
  .fb-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: fb-spin 0.7s linear infinite;
  }
  @keyframes fb-spin { to { transform: rotate(360deg); } }

  /* Status */
  .fb-status {
    font-size: 12px;
    text-align: center;
    padding: 8px 12px;
    border-radius: 9px;
    font-weight: 500;
  }
  .fb-status-success {
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.25);
    color: #86efac;
  }
  .fb-status-error {
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.25);
    color: #fca5a5;
  }

  /* Success screen */
  .fb-success-screen {
    padding: 32px 22px 28px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .fb-success-icon {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.15));
    border: 1px solid rgba(34,197,94,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    margin-bottom: 4px;
  }
  .fb-success-title {
    font-size: 16px;
    font-weight: 700;
    color: rgba(255,255,255,0.92);
  }
  .fb-success-sub {
    font-size: 12.5px;
    color: rgba(255,255,255,0.42);
    line-height: 1.5;
    max-width: 280px;
  }
  .fb-success-btn {
    margin-top: 8px;
    padding: 8px 20px;
    border-radius: 10px;
    border: 1px solid rgba(99,102,241,0.35);
    background: rgba(99,102,241,0.12);
    color: #a5b4fc;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s ease;
  }
  .fb-success-btn:hover {
    background: rgba(99,102,241,0.22);
  }

  /* Responsive */
  @media (max-width: 480px) {
    .fb-root { bottom: 16px; right: 16px; }
    .fb-backdrop { padding: 0; align-items: flex-end; justify-content: center; }
    .fb-modal { width: 100vw; border-radius: 20px 20px 0 0; }
  }
`;

const TYPES = [
  { id: 'bug',        emoji: '🐛', label: 'Bug' },
  { id: 'idea',       emoji: '💡', label: 'Idea' },
  { id: 'praise',     emoji: '⭐', label: 'Praise' },
  { id: 'other',      emoji: '💬', label: 'Other' },
];

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="12" y2="14" />
    </svg>
  );
}

export default function FeedbackButton() {
  const [visible, setVisible]     = useState(false);
  const [hovered, setHovered]     = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [open, setOpen]           = useState(false);
  const [type, setType]           = useState('idea');
  const [rating, setRating]       = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage]     = useState('');
  const [email, setEmail]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [status, setStatus]       = useState(null); // null | 'success' | 'error'
  const [errMsg, setErrMsg]       = useState('');
  const [done, setDone]           = useState(false);

  const backdropRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) closeModal();
  };

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape' && open) closeModal(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open]);

  const openModal  = () => { setOpen(true);  setStatus(null); };
  const closeModal = () => { setOpen(false); };

  const reset = () => {
    setMessage(''); setEmail(''); setRating(0); setType('idea');
    setStatus(null); setErrMsg(''); setDone(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Dev-mode guard — shows fake success so you can test the UI
    if (FORMSUBMIT_EMAIL === 'YOUR_EMAIL@example.com') {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1200));
      setLoading(false);
      setDone(true);
      return;
    }

    setLoading(true);
    setStatus(null);

    const typeLabel  = TYPES.find(t => t.id === type)?.label ?? type;
    const ratingText = rating ? `${rating}/5 — ${RATING_LABELS[rating]}` : 'Not rated';
    const page       = typeof window !== 'undefined' ? window.location.href : '';

    // FormSubmit AJAX — no redirect, returns JSON { success: 'true' }
    // Docs: https://formsubmit.co/documentation
    const payload = new FormData();
    payload.append('_subject',  `[Feedback] ${typeLabel} — DSA Dev Notes`);
    payload.append('_template', 'table');          // nicely formatted table email
    payload.append('_captcha',  'false');          // disable captcha
    payload.append('_replyto',  email || '');      // reply-to header
    payload.append('Type',      typeLabel);
    payload.append('Rating',    ratingText);
    payload.append('Page',      page);
    payload.append('Email',     email || '(not provided)');
    payload.append('Message',   message.trim());

    try {
      const res  = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method:  'POST',
        headers: { Accept: 'application/json' },
        body:    payload,
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        setDone(true);
      } else {
        setStatus('error');
        setErrMsg(data.message ?? 'Submission failed — please try again.');
      }
    } catch {
      setStatus('error');
      setErrMsg('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (hidden) return null;

  const displayRating = hoverRating || rating;

  return (
    <>
      <style>{CSS}</style>

      {/* ── Backdrop + Modal ── */}
      <div
        ref={backdropRef}
        className={`fb-backdrop ${open ? 'fb-backdrop-open' : ''}`}
        onClick={handleBackdropClick}
        aria-modal="true"
        role="dialog"
        aria-label="Share Feedback"
      >
        <div className="fb-modal">
          {done ? (
            /* Success screen */
            <div className="fb-success-screen">
              <div className="fb-success-icon">🎉</div>
              <div className="fb-success-title">Thank you!</div>
              <div className="fb-success-sub">
                Your feedback has been sent. We read every message and use it to make this platform better.
              </div>
              <button className="fb-success-btn" onClick={() => { reset(); closeModal(); }}>
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="fb-modal-header">
                <div className="fb-modal-title-group">
                  <div className="fb-modal-icon">
                    <MessageIcon />
                  </div>
                  <div>
                    <div className="fb-modal-title">Share Feedback</div>
                    <div className="fb-modal-sub">Help us improve this platform</div>
                  </div>
                </div>
                <button className="fb-modal-close" onClick={closeModal} aria-label="Close">✕</button>
              </div>
              <div className="fb-modal-divider" />

              {/* Form */}
              <form className="fb-form" onSubmit={handleSubmit}>

                {/* Type picker */}
                <div className="fb-type-row">
                  {TYPES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      className={`fb-type-btn ${type === t.id ? 'fb-type-active' : ''}`}
                      onClick={() => setType(t.id)}
                    >
                      <span>{t.emoji}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Message */}
                <div className="fb-field">
                  <label className="fb-label-text">Your Message *</label>
                  <textarea
                    className="fb-input"
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={
                      type === 'bug'    ? "Describe the bug — what happened, what you expected..." :
                      type === 'idea'   ? "Share your idea — what feature would help you most?" :
                      type === 'praise' ? "Tell us what you love about the platform!" :
                                          "Anything on your mind..."
                    }
                  />
                </div>

                {/* Rating */}
                <div className="fb-field">
                  <label className="fb-label-text">How's your experience?</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <div className="fb-rating-row">
                      {[1,2,3,4,5].map(n => (
                        <span
                          key={n}
                          className={`fb-star ${displayRating >= n ? 'fb-star-active' : ''}`}
                          onClick={() => setRating(n)}
                          onMouseEnter={() => setHoverRating(n)}
                          onMouseLeave={() => setHoverRating(0)}
                          role="button"
                          aria-label={`Rate ${n} star`}
                        >⭐</span>
                      ))}
                    </div>
                    {displayRating > 0 && (
                      <span className="fb-rating-label">{RATING_LABELS[displayRating]}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="fb-field">
                  <label className="fb-label-text">Email <span style={{fontWeight:400,opacity:0.6}}>(optional — for reply)</span></label>
                  <input
                    type="email"
                    className="fb-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Status */}
                {status === 'error' && (
                  <div className="fb-status fb-status-error">⚠ {errMsg}</div>
                )}

                {/* Submit */}
                <button type="submit" className="fb-submit" disabled={loading || !message.trim()}>
                  {loading ? (
                    <><div className="fb-spinner" /> Sending…</>
                  ) : (
                    <><SendIcon /> Send Feedback</>
                  )}
                </button>

              </form>
            </>
          )}
        </div>
      </div>

      {/* ── FAB wrapper (hover state) ── */}
      <div
        className={`fb-root ${hovered ? 'fb-hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hide chip */}
        <button
          className="fb-hide-chip"
          onClick={() => setHidden(true)}
          title="Hide feedback button"
          aria-label="Hide feedback widget"
        >
          <span className="fb-hide-x">✕</span>
          <span>hide</span>
        </button>

        {/* FAB */}
        <button
          className={`fb-fab ${visible ? 'fb-visible' : ''} ${open ? 'fb-open' : ''}`}
          onClick={() => open ? closeModal() : openModal()}
          aria-label="Share Feedback"
          title="Share Feedback"
        >
          {/* Hover label pill — sits left of the button */}
          <span className="fb-label-pill">
            <span className="fb-label-pill-dot" />
            <span className="fb-label-pill-text">Share Feedback</span>
          </span>
          {/* Icon: message when closed, X when open */}
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <MessageIcon />
          )}
        </button>
      </div>
    </>
  );
}
