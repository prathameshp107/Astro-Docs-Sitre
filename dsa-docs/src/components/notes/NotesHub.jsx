import React, { useState, useMemo, useEffect } from 'react';
import { PDF_NOTES, PDF_CATEGORIES } from '../../data/pdf-notes-data.js';
import ModernPdfViewer from './ModernPdfViewer.jsx';
import PdfCardPreview from './PdfCardPreview.jsx';
import {
  Search,
  BookOpen,
  FileText,
  Download,
  Eye,
  Layers,
  Sparkles,
  ExternalLink,
  Share2,
  Check,
  Grid,
  List,
  Filter,
  ArrowUpDown,
  Zap,
  Bookmark,
  Award,
  Database,
  Cpu,
  Server,
  Code
} from 'lucide-react';

const POPULAR_TAGS = [
  'All',
  'System Design',
  'DSA',
  'AI',
  'LLM',
  'Docker',
  'React',
  'Backend',
  'SQL',
  'Case Study',
  'Handwritten'
];

export default function NotesHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'name', 'size-desc', 'size-asc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [activeNote, setActiveNote] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Check URL query parameter on mount (?doc=id)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const docId = params.get('doc');
      if (docId) {
        const found = PDF_NOTES.find(n => n.id === docId);
        if (found) {
          setActiveNote(found);
        }
      }
    }
  }, []);

  // Filtered and sorted notes
  const filteredNotes = useMemo(() => {
    let result = [...PDF_NOTES];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(n => n.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag !== 'All') {
      const lowerTag = selectedTag.toLowerCase();
      result = result.filter(n => {
        if (lowerTag === 'handwritten') return n.badge?.toLowerCase().includes('handwritten');
        if (lowerTag === 'case study') return n.category === 'case-studies' || n.badge?.toLowerCase().includes('case study');
        return n.tags?.some(t => t.toLowerCase().includes(lowerTag)) ||
               n.title.toLowerCase().includes(lowerTag) ||
               n.description.toLowerCase().includes(lowerTag);
      });
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.categoryLabel.toLowerCase().includes(q) ||
        n.tags?.some(t => t.toLowerCase().includes(q)) ||
        n.badge?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'size-desc') {
        return b.sizeBytes - a.sizeBytes;
      }
      if (sortBy === 'size-asc') {
        return a.sizeBytes - b.sizeBytes;
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  // Featured showcase cards
  const featuredHighlights = useMemo(() => {
    return PDF_NOTES.filter(n => n.featured).slice(0, 4);
  }, []);

  const handleShare = (note, e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/notes?doc=${note.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(note.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-16 border-b border-border/40">
        {/* Ambient Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-indigo-400 animate-pulse" />
            <span>76 Master Handbooks & Visual Architecture Guides</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
            Engineering Handbooks, Case Studies &{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Handwritten Notes
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exhaustive, vector-crisp study guides covering the 600-page complete DSA Master Handbook,
            System Design blueprints, LLM internals, and handwritten architecture case studies.
            Read instantly in our modern browser viewer or download for offline study.
          </p>

          {/* Quick Metrics Banner */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-indigo-400">76</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Master Handbooks</div>
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-purple-400">600+</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">DSA Bible Pages</div>
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-amber-400">1.8 GB</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Vector Knowledge</div>
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Free & Downloadable</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Showcase Bento ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="text-amber-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">Essential Handbooks Spotlight</h2>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">Must-read for tech interviews</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredHighlights.map((feat) => (
            <div
              key={feat.id}
              onClick={() => setActiveNote(feat)}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-card border border-border/70 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                style={{ backgroundColor: feat.color || '#6366f1' }}
              />

              <div>
                {/* Visual Document Preview */}
                <PdfCardPreview note={feat} onOpenFull={setActiveNote} />

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide uppercase bg-muted text-muted-foreground">
                    {feat.categoryLabel}
                  </span>
                  <span className="text-xs font-mono font-bold text-muted-foreground">
                    {feat.sizeFormatted}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-card-foreground group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                  {feat.title}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                  <Sparkles size={12} />
                  <span>{feat.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Read</span>
                  <Eye size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Notes Directory & Interactive Controls ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search Bar & Primary Filters */}
        <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border shadow-sm mb-8 space-y-5">
          {/* Search Input Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword (e.g. B-Trees, Kafka, System Design, Blinkit, Docker, Recursion)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & View Mode */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-background border border-border/80 text-xs text-muted-foreground">
                <ArrowUpDown size={14} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-foreground font-medium text-xs focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="size-desc">Size (Largest)</option>
                  <option value="size-asc">Size (Smallest)</option>
                </select>
              </div>

              {/* View toggle */}
              <div className="flex items-center bg-background rounded-2xl border border-border/80 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-xl transition-all ${
                    viewMode === 'grid' ? 'bg-muted text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Grid View"
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-xl transition-all ${
                    viewMode === 'list' ? 'bg-muted text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="List View"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PDF_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-border/40 text-xs">
            <span className="text-[11px] font-semibold text-muted-foreground mr-1 flex items-center gap-1">
              <Filter size={11} />
              <span>Tags:</span>
            </span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-zinc-800 text-indigo-300 border border-indigo-500/40'
                    : 'bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between mb-5 px-1">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-bold text-foreground font-mono">{filteredNotes.length}</span> of {PDF_NOTES.length} Handbooks
            {searchQuery && (
              <span> for "<span className="text-indigo-400 font-semibold">{searchQuery}</span>"</span>
            )}
          </p>
        </div>

        {/* ── Grid View ── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map((note) => (
              <article
                key={note.id}
                onClick={() => setActiveNote(note)}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-card border border-border/80 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                {/* Accent top stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 group-hover:h-1.5 transition-all duration-300"
                  style={{ backgroundColor: note.color || '#6366f1' }}
                />

                <div>
                  {/* Visual Document Preview */}
                  <PdfCardPreview note={note} onOpenFull={setActiveNote} />

                  {/* Category & Size */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground">
                      {note.categoryLabel}
                    </span>
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      {note.sizeFormatted}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-card-foreground group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                    {note.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {note.description}
                  </p>

                  {/* Badge */}
                  {note.badge && (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <Sparkles size={10} />
                        <span>{note.badge}</span>
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  {note.tags && note.tags.length > 0 && (
                    <div className="mt-3 flex items-center gap-1 flex-wrap">
                      {note.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-muted/60 text-muted-foreground">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleShare(note, e)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Copy link"
                      aria-label="Copy link"
                    >
                      {copiedId === note.id ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                    </button>
                    <a
                      href={encodeURI(note.url)}
                      download={note.fileName}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Download PDF"
                      aria-label="Download"
                    >
                      <Download size={14} />
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveNote(note)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Read Now</span>
                    <Eye size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── List View ── */}
        {viewMode === 'list' && (
          <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border/60">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setActiveNote(note)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/40 transition-colors cursor-pointer gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: note.color || '#6366f1' }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-card-foreground group-hover:text-indigo-400 transition-colors">
                        {note.title}
                      </h3>
                      {note.badge && (
                        <span className="text-[10px] font-semibold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                          {note.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {note.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <span className="text-xs font-mono text-muted-foreground font-semibold">
                    {note.sizeFormatted}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleShare(note, e)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Copy link"
                      aria-label="Copy link"
                    >
                      {copiedId === note.id ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                    </button>
                    <a
                      href={encodeURI(note.url)}
                      download={note.fileName}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Download PDF"
                      aria-label="Download"
                    >
                      <Download size={14} />
                    </a>
                    <button
                      onClick={() => setActiveNote(note)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white text-xs font-semibold transition-all ml-1"
                    >
                      Read
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-16 px-4 rounded-3xl bg-card border border-border">
            <BookOpen size={40} className="mx-auto text-muted-foreground/40 mb-3" />
            <h3 className="text-base font-bold text-foreground">No handbooks found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              No notes matched your search query. Try clearing filters or searching for another keyword.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ── Modern PDF Viewer Overlay ── */}
      {activeNote && (
        <ModernPdfViewer
          note={activeNote}
          allNotes={filteredNotes}
          onClose={() => setActiveNote(null)}
          onSelectNote={(note) => setActiveNote(note)}
        />
      )}
    </div>
  );
}
