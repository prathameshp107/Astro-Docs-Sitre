import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import GlobalSearch from "../GlobalSearch.jsx";
import AuthProvider from "../auth/AuthProvider.jsx";
import AuthButton from "../auth/AuthButton.jsx";
import { CompanyIcon } from "../companies/CompanyIcons.jsx";
import {
  BookOpen,
  Activity,
  Code,
  FlaskConical,
  Network,
  Lightbulb,
  ListChecks,
  CalendarCheck,
  Building2,
  ChevronDown,
  Users,
  Sparkles,
  ArrowUpDown,
  Search,
  LayoutGrid,
  Link,
  Layers,
  Hash,
  GitFork,
  Workflow,
  Boxes,
  Cpu,
  Server,
  FileCode,
  Database,
  Zap,
  Globe,
  Scale,
  Layout,
  Target,
  Award,
  Clock,
  Menu as MenuIcon,
  X,
  Mail,
  FileText,
} from "lucide-react";

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

const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

const labsSubItems = [
  { label: "HTML Labs", href: `${base}labs/html`, icon: DiHtml5, color: "#fb923c" },
  { label: "CSS Labs", href: `${base}labs/css`, icon: DiCss3, color: "#60a5fa" },
  { label: "JS Interview Lab", href: `${base}labs/js-lab`, icon: DiJavascript1, color: "#f7df1e" },
  { label: "React Practice Lab", href: `${base}labs/react-lab`, icon: DiReact, color: "#61dafb" },
  { label: "DSA Problem Lab", href: `${base}dsa/problems`, icon: DiDatabase, color: "#6366f1" },
  { label: "DSA Patterns Guide", href: `${base}dsa/patterns`, icon: Zap, color: "#a78bfa" },
  { label: "SQL Query Lab", href: `${base}labs/mysql`, icon: DiMysql, color: "#f59e0b" },
  { label: "Python Labs", href: `${base}labs/python`, icon: DiPython, color: "#3776AB" },
  { label: "MongoDB Lab", href: `${base}labs/mongodb`, icon: DiMongodb, color: "#13aa52" },
  { label: "Git & GitHub Labs", href: `${base}labs/git`, icon: DiGitBranch, color: "#f59e0b" },
  { label: "Tailwind CSS Playground", href: `${base}labs/tailwind-lab`, icon: SiTailwindcss, color: "#38bdf8" },
];

const interviewSubItems = [
  { label: "3,100+ Tech Interview Questions", href: `${base}interview-questions`, icon: Lightbulb, color: "#eab308" },
  { label: "AI, LLM & RAG Interview Prep", href: `${base}interview-questions?tab=ai`, icon: Sparkles, color: "#10b981" },
  { label: "Tricky JavaScript Outputs", href: `${base}interview-questions?tab=js-tricky`, icon: Code, color: "#f59e0b" },
  { label: "Behavioural Questions", href: `${base}behavioral`, icon: Users, color: "#3b82f6" },
];

const visualizerSubItems = [
  { label: "Visualizers Hub", href: `${base}visualizer`, icon: Sparkles, color: "#8b5cf6" },
  { label: "Two Pointers Visualizer", href: `${base}visualizer/two-pointers`, icon: ArrowUpDown, color: "#f59e0b" },
  { label: "Sliding Window Visualizer", href: `${base}visualizer/sliding-window`, icon: LayoutGrid, color: "#10b981" },
  { label: "Backtracking Visualizer", href: `${base}visualizer/backtracking`, icon: Workflow, color: "#ec4899" },
  { label: "Sorting Visualizer", href: `${base}visualizer/sorting`, icon: ArrowUpDown, color: "#ec4899" },
  { label: "Searching Visualizer", href: `${base}visualizer/searching`, icon: Search, color: "#3b82f6" },
  { label: "Arrays Visualizer", href: `${base}visualizer/arrays`, icon: LayoutGrid, color: "#10b981" },
  { label: "Linked List Visualizer", href: `${base}visualizer/linked-list`, icon: Link, color: "#f59e0b" },
  { label: "Stack & Queue", href: `${base}visualizer/stack`, icon: Layers, color: "#6366f1" },
  { label: "Hash Tables", href: `${base}visualizer/hash-table`, icon: Hash, color: "#06b6d4" },
  { label: "Trees Visualizer", href: `${base}visualizer/trees`, icon: GitFork, color: "#84cc16" },
  { label: "Trie (Prefix Tree)", href: `${base}visualizer/trie`, icon: Network, color: "#10b981" },
  { label: "Graphs Visualizer", href: `${base}visualizer/graphs`, icon: Workflow, color: "#a855f7" },
  { label: "Heaps Visualizer", href: `${base}visualizer/heaps`, icon: Boxes, color: "#f97316" },
  { label: "Dynamic Programming", href: `${base}visualizer/dp`, icon: Cpu, color: "#ef4444" },
];

const systemDesignSubItems = [
  { label: "System Design Hub (HLD)", href: `${base}system-design`, icon: Network, color: "#f59e0b" },
  { label: "Low-Level Design Hub (LLD)", href: `${base}lld`, icon: Layers, color: "#10b981" },
  { label: "Object-Oriented Design (OOD)", href: `${base}ood`, icon: Boxes, color: "#06b6d4" },
  { label: "Design URL Shortener (TinyURL)", href: `${base}system-design/case/url-shortener`, icon: Link, color: "#ec4899" },
  { label: "Design Ride-Sharing (Uber)", href: `${base}system-design/case/ride-sharing`, companyId: "uber", color: "#3b82f6" },
  { label: "Design Chat App (WhatsApp)", href: `${base}system-design/case/chat-system`, companyId: "whatsapp", color: "#25d366" },
];

const roadmapSubItems = [
  { label: "Roadmaps Overview", href: `${base}plans`, icon: CalendarCheck, color: "#6366f1" },
  { label: "Blind 75 Guided Plan", href: `${base}plans/blind-75-guided`, icon: Target, color: "#ec4899" },
  { label: "30-Day DSA Bootcamp", href: `${base}plans/30-day-dsa-bootcamp`, icon: Zap, color: "#f59e0b" },
  { label: "Frontend Interview (21 Days)", href: `${base}plans/frontend-interview-21-days`, icon: Code, color: "#60a5fa" },
  { label: "Striver's Blind 75", href: `${base}plans/striver-blind-75`, icon: Award, color: "#a855f7" },
  { label: "JavaScript Mastery Plan", href: `${base}plans/javascript-mastery`, icon: DiJavascript1, color: "#f7df1e" },
  { label: "SQL in 7 Days", href: `${base}plans/sql-in-7-days`, icon: DiMysql, color: "#06b6d4" },
  { label: "Last-Minute Revision", href: `${base}plans/last-minute-revision`, icon: Clock, color: "#ef4444" },
  { label: "Amazon Interview Plan", href: `${base}plans/company-amazon`, companyId: "amazon", color: "#ff9900" },
  { label: "Google Interview Plan", href: `${base}plans/company-google`, companyId: "google", color: "#4285f4" },
];

const companiesSubItems = [
  { label: "Companies Overview", href: `${base}companies`, icon: Building2, color: "#6366f1" },
  { label: "Google", href: `${base}companies/google`, companyId: "google", color: "#4285f4" },
  { label: "Amazon", href: `${base}companies/amazon`, companyId: "amazon", color: "#ff9900" },
  { label: "Meta", href: `${base}companies/meta`, companyId: "meta", color: "#0668e1" },
  { label: "Microsoft", href: `${base}companies/microsoft`, companyId: "microsoft", color: "#00a4ef" },
  { label: "Apple", href: `${base}companies/apple`, companyId: "apple", color: "#f3f4f6" },
  { label: "Netflix", href: `${base}companies/netflix`, companyId: "netflix", color: "#e50914" },
  { label: "Uber", href: `${base}companies/uber`, companyId: "uber", color: "#ffffff" },
  { label: "Flipkart", href: `${base}companies/flipkart`, companyId: "flipkart", color: "#2874f0" },
  { label: "Swiggy", href: `${base}companies/swiggy`, companyId: "swiggy", color: "#fc8019" },
];

const notesSubItems = [
  { label: "Study Notes Hub (76 PDFs)", href: `${base}notes`, icon: BookOpen, color: "#6366f1" },
  { label: "Complete DSA Master Handbook", href: `${base}notes?doc=dsa-complete-handbook`, icon: Sparkles, color: "#8b5cf6" },
  { label: "System Design Blueprints", href: `${base}notes?doc=system-design-main-concepts`, icon: Network, color: "#f59e0b" },
  { label: "LLM & AI Interview Handbook", href: `${base}notes?doc=llm-questions-handbook`, icon: Cpu, color: "#10b981" },
  { label: "Docker Handwritten Notes", href: `${base}notes?doc=docker-handwritten-handbook`, icon: Server, color: "#0284c7" },
  { label: "Backend 300 Q&A Handbook", href: `${base}notes?doc=backend-300-questions-handbook`, icon: Database, color: "#6366f1" },
  { label: "Blinkit System Design Case Study", href: `${base}notes?doc=system-design-blinkit-case-study`, icon: Zap, color: "#eab308" },
  { label: "WhatsApp Architecture Case Study", href: `${base}notes?doc=system-design-whatsapp`, icon: Layers, color: "#22c55e" },
];

const links = [
  { label: "Docs", href: `${base}overview/`, icon: BookOpen },
  { label: "Notes", href: `${base}notes`, icon: FileText, hasDropdown: true, subItems: notesSubItems, dropdownTitle: "PDF Notes & Handbooks" },
  { label: "Visualizers", href: `${base}visualizer`, icon: Activity, hasDropdown: true, subItems: visualizerSubItems, dropdownTitle: "Algorithm Visualizers" },
  { label: "DSA Playground", href: `${base}dsa/problems`, icon: Code },
  { label: "Labs", href: `${base}labs`, icon: FlaskConical, hasDropdown: true, subItems: labsSubItems, dropdownTitle: "Practice Labs" },
  { label: "System Design", href: `${base}system-design`, icon: Network, hasDropdown: true, subItems: systemDesignSubItems, dropdownTitle: "System Architecture" },
  { label: "Interview Questions", href: `${base}interview-questions`, icon: Lightbulb, hasDropdown: true, subItems: interviewSubItems, dropdownTitle: "Interview Preparation" },
  { label: "MCQ Hub", href: `${base}mcq`, icon: ListChecks },
  { label: "Roadmaps", href: `${base}plans`, icon: CalendarCheck, hasDropdown: true, subItems: roadmapSubItems, dropdownTitle: "Study & Prep Roadmaps" },
  { label: "Companies", href: `${base}companies`, icon: Building2, hasDropdown: true, subItems: companiesSubItems, dropdownTitle: "Company Interview Prep" },
  { label: "Contact", href: `${base}contact`, icon: Mail },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AuthProvider>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          solid ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] w-full items-center justify-between px-3 sm:px-6 gap-2 sm:gap-6">
          <a href={base} className="flex items-center gap-2 sm:gap-2.5 shrink-0 group min-w-0" aria-label="Interview Prep Buddy Home">
            <span className="flex shrink-0 items-center justify-center h-8 w-8 rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <img
                src={`${base}logo-icon.png`}
                alt="Interview Prep Buddy Logo"
                width="32"
                height="32"
                className="h-8 w-8 object-contain"
                loading="eager"
              />
            </span>
            <span className="font-display text-[13.5px] sm:text-[15px] font-bold tracking-tight text-foreground truncate">
              Interview Prep <span className="text-primary">Buddy</span>
            </span>
          </a>
          <nav aria-label="Primary" className="hidden flex-1 items-center justify-evenly gap-3 lg:flex mx-2">
            {links.map((l) => {
              const Icon = l.icon;

              if (l.hasDropdown && l.subItems) {
                return (
                  <div key={l.href} className="relative group py-2">
                    <a
                      href={l.href}
                      className="relative inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon size={14} className="shrink-0 opacity-75" />
                      <span>{l.label}</span>
                      <ChevronDown size={12} className="shrink-0 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
                    </a>

                    {/* Minimal Hover Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 hidden group-hover:block z-50 w-64">
                      <div className="rounded-xl border border-border/80 bg-background/95 backdrop-blur-2xl p-1.5 shadow-2xl ring-1 ring-black/5">
                        {l.dropdownTitle && (
                          <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 mb-1">
                            {l.dropdownTitle}
                          </div>
                        )}
                        <div className="grid grid-cols-1 gap-0.5">
                          {l.subItems.map((sub: any) => {
                            const SubIcon = sub.icon;
                            return (
                              <a
                                key={sub.href}
                                href={sub.href}
                                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-muted/80 hover:text-foreground"
                              >
                                <span className="text-sm shrink-0 flex items-center justify-center" style={{ color: sub.color }}>
                                  {sub.companyId ? (
                                    <CompanyIcon companyId={sub.companyId} size={15} />
                                  ) : SubIcon ? (
                                    <SubIcon />
                                  ) : null}
                                </span>
                                <span className="truncate">{sub.label}</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="relative inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-foreground hover:after:origin-left hover:after:scale-x-100"
                >
                  <Icon size={14} className="shrink-0 opacity-75" />
                  <span>{l.label}</span>
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <GlobalSearch />
            <div className="hidden sm:block">
              <AuthButton />
            </div>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/50 text-foreground transition-colors hover:bg-muted lg:hidden shrink-0"
            >
              {mobileOpen ? <X size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="border-b border-border bg-background/98 backdrop-blur-2xl px-4 py-4 lg:hidden max-h-[85vh] overflow-y-auto space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="pb-3 mb-2 border-b border-border/60 sm:hidden">
              <AuthButton />
            </div>
            {links.map((l) => {
              const Icon = l.icon;
              const isExpanded = expandedSection === l.label;

              if (l.hasDropdown && l.subItems) {
                return (
                  <div key={l.href} className="border-b border-border/40 pb-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setExpandedSection(isExpanded ? null : l.label)}
                      className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className="text-muted-foreground" />
                        <span>{l.label}</span>
                      </div>
                      <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-3">
                        {l.subItems.map((sub: any) => {
                          const SubIcon = sub.icon;
                          return (
                            <a
                              key={sub.href}
                              href={sub.href}
                              className="flex items-center gap-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                            >
                              <span className="text-sm shrink-0 flex items-center justify-center" style={{ color: sub.color }}>
                                {sub.companyId ? (
                                  <CompanyIcon companyId={sub.companyId} size={15} />
                                ) : SubIcon ? (
                                  <SubIcon />
                                ) : null}
                              </span>
                              <span className="truncate">{sub.label}</span>
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
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2.5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border-b border-border/40"
                >
                  <Icon size={16} />
                  <span>{l.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </header>
    </AuthProvider>
  );
}
