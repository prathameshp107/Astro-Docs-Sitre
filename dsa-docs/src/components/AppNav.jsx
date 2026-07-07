import { useState, useEffect, useRef, useMemo } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import GlobalSearch from './GlobalSearch.jsx';
import { FaGithub } from "react-icons/fa";
import {
  Binary,
  Search,
  BookOpen,
  Activity,
  FlaskConical,
  ListChecks,
  Lightbulb,
  Network,
  Users,
  Building2,
  CalendarCheck,
  RefreshCw,
  Home,
  ChevronDown,
} from "lucide-react";
import AuthProvider from './auth/AuthProvider.jsx';
import AuthButton from './auth/AuthButton.jsx';
import {
  DiHtml5,
  DiCss3,
  DiJavascript1,
  DiReact,
  DiDatabase,
  DiMysql,
  DiPython,
  DiMongodb,
  DiGitBranch,
} from "react-icons/di";
import { SiTailwindcss } from "react-icons/si";
import { useSrsStore } from '../store/srsStore.js';
import jsCoreDeckData from '../data/srs/decks/js-core.json';
import reactDeckData from '../data/srs/decks/react.json';
import sqlDeckData from '../data/srs/decks/sql.json';

// Ordered: learn → practice → interview prep → planning/review
const NAV_SECTIONS = [
  {
    id: 'docs',
    label: 'Docs',
    href: '/overview',
    icon: BookOpen,
  },
  {
    id: 'visualizer',
    label: 'Visualizer',
    href: '/visualizer',
    icon: Activity,
  },
  {
    id: 'labs',
    label: 'Labs',
    href: '/labs',
    icon: FlaskConical,
    hasDropdown: true,
  },
  {
    id: 'mcq',
    label: 'MCQ Hub',
    href: '/mcq',
    icon: ListChecks,
  },
  {
    id: 'interview-questions',
    label: 'Interview Q',
    href: '/interview-questions',
    icon: Lightbulb,
    badge: '300',
  },
  {
    id: 'system-design',
    label: 'Sys Design',
    href: '/system-design',
    icon: Network,
  },
  {
    id: 'behavioral',
    label: 'Behavioral',
    href: '/behavioral',
    icon: Users,
  },
  {
    id: 'companies',
    label: 'Companies',
    href: '/companies',
    icon: Building2,
  },
  {
    id: 'plans',
    label: 'Study Plans',
    href: '/plans',
    icon: CalendarCheck,
  },
  {
    id: 'review',
    label: 'Review',
    href: '/review',
    icon: RefreshCw,
  },
];

const LABS_SUB_ITEMS = [

  {
    id: 'html-lab',
    label: 'HTML Labs',
    href: '/labs/html',
    icon: <DiHtml5 />,
    color: '#fb923c',
  },
  {
    id: 'css-lab',
    label: 'CSS Labs',
    href: '/labs/css',
    icon: <DiCss3 />,
    color: '#60a5fa',
  },
  {
    id: 'js-lab',
    label: 'JS Interview Lab',
    href: '/labs/js-lab',
    icon: <DiJavascript1 />,
    color: '#f7df1e',
  },
  {
    id: 'react-lab',
    label: 'React Practice Lab',
    href: '/labs/react-lab',
    icon: <DiReact />,
    color: '#61dafb',
  },
  {
    id: 'dsa-problems',
    label: 'DSA Problem Lab',
    href: '/dsa/problems',
    icon: <DiDatabase />,
    color: '#6366f1',
  },
  {
    id: 'sql-lab',
    label: 'SQL Query Lab',
    href: '/labs/mysql',
    icon: <DiMysql />,
    color: '#f59e0b',
  },
  {
    id: 'python-lab',
    label: 'Python Labs',
    href: '/labs/python',
    icon: <DiPython />,
    color: '#3776AB',
  },
  {
    id: 'mongodb-lab',
    label: 'MongoDB Lab',
    href: '/labs/mongodb',
    icon: <DiMongodb />,
    color: '#13aa52',
  },
  {
    id: 'git-lab',
    label: 'Git & GitHub Labs',
    href: '/labs/git',
    icon: <DiGitBranch />,
    color: '#f59e0b',
  },
  {
    id: 'tailwind-lab',
    label: 'Tailwind CSS Playground',
    href: '/labs/tailwind-lab',
    icon: <SiTailwindcss />,
    color: '#38bdf8',
  },
];

/**
 * Universal App Navigation Bar
 * @param {Object} props
 * @param {string} props.activeSection - The id of the active section
 * @param {string[]} props.hideSections - Optional array of section ids to hide
 * @param {boolean} props.showOnStarlight - If true, renders minimal version suitable for Starlight docs
 */
export default function AppNav({ activeSection, hideSections = [], showOnStarlight = false, variant = 'landing' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [labsMobileExpanded, setLabsMobileExpanded] = useState(false);
  const menuRef = useRef(null);
  const labsDropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

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

  // Close labs dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (labsDropdownRef.current && !labsDropdownRef.current.contains(e.target)) {
        setLabsDropdownOpen(false);
      }
    };
    if (labsDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [labsDropdownOpen]);

  // Clean up hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [activeSection]);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const baseHref = base.replace(/\/$/, '');

  const srsDecks = useSrsStore(state => state.decks);
  const srsGetQueue = useSrsStore(state => state.getQueue);
  const srsCards = useSrsStore(state => state.cards);
  const srsAutoCards = useSrsStore(state => state.autoCards);

  const [srsDueCount, setSrsDueCount] = useState(0);

  useEffect(() => {
    try {
      const { counts } = srsGetQueue([jsCoreDeckData, reactDeckData, sqlDeckData]);
      setSrsDueCount(counts.remainingReviews + counts.remainingNew);
    } catch {
      setSrsDueCount(0);
    }
  }, [srsGetQueue, srsDecks, srsCards, srsAutoCards]);

  const filteredSections = NAV_SECTIONS.filter(s => !hideSections.includes(s.id)).map(s => {
    if (s.id === 'review') {
      return { ...s, badge: srsDueCount > 0 ? srsDueCount.toString() : undefined };
    }
    return s;
  });

  const renderNavLink = (section) => {
    const isActive = activeSection === section.id;
    const isHighlight = section.highlight;
    const href = `${base}${section.href.replace(/^\//, '')}`;
    const SectionIcon = section.icon;

    if (section.hasDropdown) {
      return (
        <div
          key={section.id}
          className={`app-nav-dropdown ${labsDropdownOpen ? 'app-nav-dropdown-open' : ''}`}
          ref={labsDropdownRef}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = setTimeout(() => setLabsDropdownOpen(true), 700);
          }}
          onMouseLeave={() => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            setLabsDropdownOpen(false);
          }}
        >
          <a
            href={href}
            className={`app-nav-link ${isActive ? 'app-nav-link-active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <SectionIcon size={16} strokeWidth={2} aria-hidden="true" />
            <span className="app-nav-label">{section.label}</span>
          </a>
          <span
            className="app-nav-dropdown-chevron-wrap"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLabsDropdownOpen(!labsDropdownOpen);
            }}
            role="button"
            tabIndex={0}
            aria-label={labsDropdownOpen ? 'Close labs menu' : 'Open labs menu'}
            aria-expanded={labsDropdownOpen}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setLabsDropdownOpen(!labsDropdownOpen); } }}
          >
            <ChevronDown
              className={`app-nav-dropdown-chevron ${labsDropdownOpen ? 'open' : ''}`}
              size={12}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </span>
          <div className={`app-nav-dropdown-menu ${labsDropdownOpen ? 'open' : ''}`}>
            {LABS_SUB_ITEMS.map((item) => {
              const itemHref = `${base}${item.href.replace(/^\//, '')}`;
              const isItemActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={itemHref}
                  className={`app-nav-dropdown-item ${isItemActive ? 'app-nav-dropdown-item-active' : ''}`}
                  onClick={() => setLabsDropdownOpen(false)}
                >
                  <span className="app-nav-dropdown-item-icon" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span className="app-nav-dropdown-item-label">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <a
        key={section.id}
        href={href}
        className={`app-nav-link ${isActive ? 'app-nav-link-active' : ''} ${isHighlight ? 'app-nav-link-highlight' : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        <SectionIcon size={16} strokeWidth={2} aria-hidden="true" />
        <span className="app-nav-label">{section.label}</span>
        {section.badge && (
          <span className="app-nav-badge">{section.badge}</span>
        )}
      </a>
    );
  };

  if (showOnStarlight) {
    // Minimal version for Starlight docs pages (just brand + theme + back link)
    return (
      <AuthProvider>
        <div className={`app-nav-wrapper ${scrolled ? 'app-nav-scrolled' : ''} ${loaded ? 'app-nav-loaded' : ''}`} data-variant={variant}>
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
                  <Home size={16} strokeWidth={2} aria-hidden="true" />
                  <span>Back to App</span>
                </a>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className={`app-nav-wrapper ${scrolled ? 'app-nav-scrolled' : ''} ${loaded ? 'app-nav-loaded' : ''}`} data-variant={variant}>
        <nav className="app-nav" role="navigation" aria-label="Site navigation">
          <div className="app-nav-inner">
            {/* Brand */}
            <a href={base} className="app-nav-brand" aria-label="Home">
              {variant === 'landing' ? (
                <>
                  <div className="app-nav-logo">
                    <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
                      <Binary className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  <span className="app-nav-brand-text sg">DSA & Dev Notes</span>
                </>
              ) : (
                <>
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
                </>
              )}
            </a>

            {/* Desktop Links */}
            <div className="app-nav-desktop-links">
              {filteredSections.map(renderNavLink)}
            </div>

            {/* Desktop Actions */}
            <div className="app-nav-actions">
              <GlobalSearch />
              {variant === 'landing' && activeSection === 'home' && (
                <a href={`${baseHref}/overview`}
                  className="app-nav-cta"
                >
                  Start Learning
                </a>
              )}
              <AuthButton />
              <a
                href="https://github.com/prathameshp107/DSA-Notes-Problems"
                target="_blank"
                rel="noopener noreferrer"
                className="app-nav-link app-nav-link-icon"
                title="GitHub"
                aria-label="GitHub repository"
              >
                <FaGithub size={18} />
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
                const isLabs = section.hasDropdown;
                const SectionIcon = section.icon;

                if (isLabs) {
                  return (
                    <div key={section.id} className="app-nav-mobile-section">
                      <div
                        className={`app-nav-mobile-link ${isActive ? 'app-nav-mobile-link-active' : ''}`}
                        onClick={() => setLabsMobileExpanded(!labsMobileExpanded)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={labsMobileExpanded}
                        onKeyDown={(e) => { if (e.key === 'Enter') setLabsMobileExpanded(!labsMobileExpanded); }}
                      >
                        <SectionIcon size={16} strokeWidth={2} aria-hidden="true" />
                        <span>{section.label}</span>
                        <ChevronDown
                          className={`app-nav-mobile-chevron ${labsMobileExpanded ? 'open' : ''}`}
                          size={14}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </div>
                      {labsMobileExpanded && (
                        <div className="app-nav-mobile-sublist">
                          {LABS_SUB_ITEMS.map((item) => {
                            const itemHref = `${base}${item.href.replace(/^\//, '')}`;
                            const isItemActive = activeSection === item.id;
                            return (
                              <a
                                key={item.id}
                                href={itemHref}
                                className={`app-nav-mobile-sub-link ${isItemActive ? 'app-nav-mobile-link-active' : ''}`}
                                onClick={() => setMobileOpen(false)}
                              >
                                <span className="app-nav-mobile-sub-icon">{item.icon}</span>
                                <span>{item.label}</span>
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={section.id}
                    href={href}
                    className={`app-nav-mobile-link ${isActive ? 'app-nav-mobile-link-active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <SectionIcon size={16} strokeWidth={2} aria-hidden="true" />
                    <span>{section.label}</span>
                    {section.badge && (
                      <span className="app-nav-badge">{section.badge}</span>
                    )}
                    {isActive && <span className="app-nav-mobile-active-indicator" />}
                  </a>
                );
              })}
              <div className="app-nav-mobile-divider" />
              <div className="app-nav-mobile-actions">
                <div className="px-4 py-2 flex justify-start">
                  <AuthButton />
                </div>
                <button
                  type="button"
                  className="app-nav-mobile-link"
                  onClick={() => {
                    setMobileOpen(false);
                    window.dispatchEvent(new CustomEvent('dsa-open-search'));
                  }}
                >
                  <Search size={16} />
                  <span>Search</span>
                </button>
                <a
                  href="https://github.com/prathameshp107/DSA-Notes-Problems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-nav-mobile-link"
                >
                  <FaGithub size={16} />
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
    </AuthProvider>
  );
}
