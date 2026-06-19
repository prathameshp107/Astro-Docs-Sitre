import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle.jsx';

const NAV_SECTIONS = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  },
  {
    id: 'visualizer',
    label: 'Visualizer',
    href: '/visualizer',
    icon: 'M4 19.5A2.5 2.5 0 016.5 17H20',
  },
  {
    id: 'dsa-problems',
    label: 'DSA Lab',
    href: '/dsa/problems',
    icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  },
  {
    id: 'practice',
    label: 'Practice',
    href: '/practice',
    icon: 'M5 3l14 9-14 9V3z',
  },
  {
    id: 'sql',
    label: 'SQL',
    href: '/mysql',
    icon: 'M3 3h18v18H3V3zm0 6h18M9 21V9',
  },
  {
    id: 'python',
    label: 'Python',
    href: '/python',
    icon: 'M5 3l14 9-14 9V3z',
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    href: '/mongodb',
    icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 'mcq',
    label: 'MCQ Hub',
    href: '/mcq',
    icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8 12l3 3 5-5',
  },
  {
    id: 'playground',
    label: 'Playground',
    href: '/playground',
    icon: 'M5 3l14 9-14 9V3z',
    highlight: true,
  },
  {
    id: 'docs',
    label: 'Docs',
    href: '/overview',
    icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z',
  },
];

/**
 * Universal App Navigation Bar
 * @param {Object} props
 * @param {string} props.activeSection - The id of the active section
 * @param {string[]} props.hideSections - Optional array of section ids to hide
 * @param {boolean} props.showOnStarlight - If true, renders minimal version suitable for Starlight docs
 */
export default function AppNav({ activeSection, hideSections = [], showOnStarlight = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [activeSection]);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  const filteredSections = NAV_SECTIONS.filter(s => !hideSections.includes(s.id));

  const renderNavLink = (section) => {
    const isActive = activeSection === section.id;
    const isHighlight = section.highlight;
    const href = `${base}${section.href.replace(/^\//, '')}`;

    return (
      <a
        key={section.id}
        href={href}
        className={`app-nav-link ${isActive ? 'app-nav-link-active' : ''} ${isHighlight ? 'app-nav-link-highlight' : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={section.icon} />
        </svg>
        <span className="app-nav-label">{section.label}</span>
      </a>
    );
  };

  if (showOnStarlight) {
    // Minimal version for Starlight docs pages (just brand + theme + back link)
    return (
      <div className={`app-nav-wrapper ${scrolled ? 'app-nav-scrolled' : ''} ${loaded ? 'app-nav-loaded' : ''}`}>
        <nav className="app-nav" role="navigation" aria-label="Site navigation">
          <div className="app-nav-inner">
            <a href={base} className="app-nav-brand" aria-label="Home">
              <span className="app-nav-logo">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <defs>
                    <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <rect width="32" height="32" rx="10" fill="url(#navLogoGrad)" />
                  <text x="16" y="21" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Inter">D</text>
                </svg>
              </span>
              <span className="app-nav-brand-text">DSA & Dev Notes</span>
            </a>
            <div className="app-nav-links">
              <a href={base} className="app-nav-link app-nav-link-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Back to App</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className={`app-nav-wrapper ${scrolled ? 'app-nav-scrolled' : ''} ${loaded ? 'app-nav-loaded' : ''}`}>
      <nav className="app-nav" role="navigation" aria-label="Site navigation">
        <div className="app-nav-inner">
          {/* Brand */}
          <a href={base} className="app-nav-brand" aria-label="Home">
            <span className="app-nav-logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <defs>
                  <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <rect width="32" height="32" rx="10" fill="url(#navLogoGrad)" />
                <text x="16" y="21" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Inter">D</text>
              </svg>
            </span>
            <span className="app-nav-brand-text">DSA & Dev Notes</span>
          </a>

          {/* Desktop Links */}
          <div className="app-nav-desktop-links">
            {filteredSections.map(renderNavLink)}
          </div>

          {/* Desktop Actions */}
          <div className="app-nav-actions">
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="app-nav-link app-nav-link-icon"
              title="GitHub"
              aria-label="GitHub repository"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="app-nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`app-nav-hamburger-line ${mobileOpen ? 'open' : ''}`} />
            <span className={`app-nav-hamburger-line ${mobileOpen ? 'open' : ''}`} />
            <span className={`app-nav-hamburger-line ${mobileOpen ? 'open' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="app-nav-mobile-menu" ref={menuRef}>
            {filteredSections.map((section) => {
              const isActive = activeSection === section.id;
              const href = `${base}${section.href.replace(/^\//, '')}`;
              return (
                <a
                  key={section.id}
                  href={href}
                  className={`app-nav-mobile-link ${isActive ? 'app-nav-mobile-link-active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={section.icon} />
                  </svg>
                  <span>{section.label}</span>
                  {isActive && <span className="app-nav-mobile-active-indicator" />}
                </a>
              );
            })}
            <div className="app-nav-mobile-divider" />
            <div className="app-nav-mobile-actions">
              <a
                href="https://github.com/prathameshp107/DSA-Notes-Problems"
                target="_blank"
                rel="noopener noreferrer"
                className="app-nav-mobile-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <div className="app-nav-mobile-theme">
                <ThemeToggle showLabel size={16} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
