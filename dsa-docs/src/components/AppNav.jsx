import { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
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
    label: 'Language Playgrounds',
    href: '/labs',
    icon: FlaskConical,
    hasDropdown: true,
    subItems: 'LABS_SUB_ITEMS',
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
    hasDropdown: true,
    subItems: 'INTERVIEW_SUB_ITEMS',
  },
  {
    id: 'system-design',
    label: 'Sys Design',
    href: '/system-design',
    icon: Network,
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

const INTERVIEW_SUB_ITEMS = [
  {
    id: 'interview-questions-lang',
    label: 'Language wise Interview Questions',
    href: '/interview-questions',
    icon: <Lightbulb size={16} />,
    color: '#eab308',
  },
  {
    id: 'behavioral',
    label: 'Behavioural Questions',
    href: '/behavioral',
    icon: <Users size={16} />,
    color: '#3b82f6',
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
  const [expandedMobile, setExpandedMobile] = useState(null);
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
      const subItemsList = section.subItems === 'INTERVIEW_SUB_ITEMS' ? INTERVIEW_SUB_ITEMS : LABS_SUB_ITEMS;
      return (
        <Menu as="div" key={section.id} className="app-nav-dropdown relative">
          {({ open }) => (
            <>
              <MenuButton
                as="a"
                href={href}
                className={`app-nav-link ${isActive ? 'app-nav-link-active' : ''}`}
              >
                <SectionIcon size={16} strokeWidth={2} aria-hidden="true" />
                <span className="app-nav-label">{section.label}</span>
                <ChevronDown
                  className={`app-nav-dropdown-chevron ${open ? 'open' : ''}`}
                  size={12}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </MenuButton>
              <MenuItems static className={`app-nav-dropdown-menu ${open ? 'open' : ''} focus:outline-none`}>
                {subItemsList.map((item) => {
                  const itemHref = `${base}${item.href.replace(/^\//, '')}`;
                  const isItemActive = activeSection === item.id;
                  return (
                    <MenuItem key={item.id} as="div">
                      <a
                        href={itemHref}
                        className={`app-nav-dropdown-item ${isItemActive ? 'app-nav-dropdown-item-active' : ''}`}
                      >
                        <span className="app-nav-dropdown-item-icon" style={{ color: item.color }}>
                          {item.icon}
                        </span>
                        <span className="app-nav-dropdown-item-label">{item.label}</span>
                      </a>
                    </MenuItem>
                  );
                })}
              </MenuItems>
            </>
          )}
        </Menu>
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
              <GlobalSearch />
              {variant === 'landing' && activeSection === 'home' && (
                <a href={`${baseHref}/overview`}
                  className="px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                >
                  Start Learning →
                </a>
              )}
              <AuthButton />
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
                  const subItemsList = section.subItems === 'INTERVIEW_SUB_ITEMS' ? INTERVIEW_SUB_ITEMS : LABS_SUB_ITEMS;
                  const isExpanded = expandedMobile === section.id;
                  return (
                    <div key={section.id} className="app-nav-mobile-section">
                      <div
                        className={`app-nav-mobile-link ${isActive ? 'app-nav-mobile-link-active' : ''}`}
                        onClick={() => setExpandedMobile(isExpanded ? null : section.id)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        onKeyDown={(e) => { if (e.key === 'Enter') setExpandedMobile(isExpanded ? null : section.id); }}
                      >
                        <SectionIcon size={16} strokeWidth={2} aria-hidden="true" />
                        <span>{section.label}</span>
                        <ChevronDown
                          className={`app-nav-mobile-chevron ${isExpanded ? 'open' : ''}`}
                          size={14}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </div>
                      {isExpanded && (
                        <div className="app-nav-mobile-sublist">
                          {subItemsList.map((item) => {
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
