import { useState } from 'react';
import '../styles/sketch-visualizer.css';

const REPO_URL = 'https://github.com/prathameshp107/Astro-Docs-Sitre';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const title = `Message from ${name || 'a visitor'}`;
    const body = [
      message.trim(),
      '',
      '---',
      email ? `Reply-to: ${email}` : null,
    ].filter(Boolean).join('\n');

    const issueUrl = `${REPO_URL}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    window.open(issueUrl, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <div className="font-sketch max-w-3xl mx-auto px-4 py-10">
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-10 rounded-3xl mb-8 border-2 border-[var(--sketch-border)] shadow-2xl text-center">
        <span className="inline-block sketch-border-soft px-3 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full mb-4">
          ✉️ GET IN TOUCH
        </span>
        <h1 className="font-header font-bold text-3xl md:text-4xl text-[var(--sketch-text)] mb-3">
          Found a bug? Have a suggestion?
        </h1>
        <p className="text-[var(--sketch-text-muted)] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          This is an open-source project — there's no support inbox, but every message below opens directly as a
          GitHub issue on the repo, so it's tracked and visible instead of disappearing into an inbox.
        </p>
      </section>

      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 md:p-8 rounded-3xl border-2 border-[var(--sketch-border)] shadow-xl mb-8">
        {sent ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="font-header font-bold text-xl text-[var(--sketch-text)] mb-2">Opened in a new tab</h2>
            <p className="text-[var(--sketch-text-muted)] text-sm mb-5">
              Review the pre-filled issue on GitHub and click "Submit new issue" there to send it.
            </p>
            <button
              type="button"
              onClick={() => { setSent(false); setMessage(''); }}
              className="sketch-button text-sm font-bold px-5 py-2 rounded-xl"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-amber-500 uppercase tracking-wider mb-1.5">
                Name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full sketch-border bg-[var(--sketch-bg)] text-[var(--sketch-text)] border border-[var(--sketch-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-amber-500 uppercase tracking-wider mb-1.5">
                Email (optional — only if you want a reply)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full sketch-border bg-[var(--sketch-bg)] text-[var(--sketch-text)] border border-[var(--sketch-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-amber-500 uppercase tracking-wider mb-1.5">
                Message *
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Found a typo in the DP visualizer / a broken link / a feature idea..."
                className="w-full sketch-border bg-[var(--sketch-bg)] text-[var(--sketch-text)] border border-[var(--sketch-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 resize-y"
              />
            </div>
            <button
              type="submit"
              className="sketch-button w-full flex items-center justify-center gap-2 text-sm font-bold text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 px-5 py-3 rounded-xl"
            >
              🐙 Open as GitHub Issue
            </button>
          </form>
        )}
      </section>

      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl border border-[var(--sketch-border)] text-center">
        <p className="text-[var(--sketch-text-muted)] text-sm mb-3">Prefer to go straight to GitHub?</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sketch-button text-sm font-bold px-5 py-2 rounded-xl"
          >
            View Repository
          </a>
          <a
            href={`${REPO_URL}/issues/new`}
            target="_blank"
            rel="noopener noreferrer"
            className="sketch-button text-sm font-bold px-5 py-2 rounded-xl"
          >
            Open a Blank Issue
          </a>
        </div>
      </section>
    </div>
  );
}
