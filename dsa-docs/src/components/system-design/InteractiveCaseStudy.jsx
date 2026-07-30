import { useState, useEffect, useMemo } from 'react';
import StagedArchitectureDiagram from './StagedArchitectureDiagram.jsx';
import urlShortenerData from '../../data/system-design/diagrams/url-shortener.json';
import uberData from '../../data/system-design/diagrams/uber.json';
import whatsappData from '../../data/system-design/diagrams/whatsapp.json';
import { CategoryIcon } from '../mcq/CategoryIcons.jsx';
import '../../styles/sketch-visualizer.css';

/**
 * Wrapper page that dynamically loads diagram JSON (url-shortener, uber, whatsapp)
 * based on the '?case' query parameter, and renders the StagedArchitectureDiagram.
 */
export default function InteractiveCaseStudy({ caseStudySlug: initialSlug }) {
  const [slug, setSlug] = useState(initialSlug || 'url-shortener');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const caseParam = params.get('case');
      if (caseParam === 'uber' || caseParam === 'whatsapp' || caseParam === 'url-shortener') {
        setSlug(caseParam);
      }
    }
  }, []);

  const diagramData = useMemo(() => {
    if (slug === 'uber') return uberData;
    if (slug === 'whatsapp') return whatsappData;
    return urlShortenerData;
  }, [slug]);

  const base = (typeof window !== 'undefined' && window.location.pathname.startsWith('/DSA-Notes-Problems')) 
    ? '/DSA-Notes-Problems' 
    : '';

  return (
    <div className="case-study-interactive-page font-sketch max-w-6xl mx-auto px-4 py-8">
      {/* Chalkboard Hero Section */}
      <section className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-3xl text-center mb-8 border-2 border-[var(--sketch-border)] shadow-2xl relative font-sketch">
        <a
          href={`${base}/system-design`}
          className="inline-flex items-center gap-2 sketch-button text-xs font-bold text-[var(--sketch-text-muted)] hover:text-amber-500 mb-6"
        >
          ← Back to System Design Hub
        </a>

        <div className="block max-w-max mx-auto sketch-border-soft px-4 py-1.5 text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full mb-3 animate-pulse">
          ⚡ INTERACTIVE ARCHITECTURE WALKTHROUGH
        </div>
        
        <h1 className="font-header font-bold text-3xl md:text-5xl text-[var(--sketch-text)] mb-3">
          {diagramData.title}
        </h1>
        <p className="text-[var(--sketch-text-muted)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6 font-sketch">
          {diagramData.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-[var(--sketch-border)] max-w-xl mx-auto">
          <div className="sketch-panel-box sketch-border p-3 px-5 text-center flex items-center gap-2">
            <span className="text-xl">📐</span>
            <span className="font-header text-lg font-bold text-amber-500">{diagramData.stages?.length || 0} Stages</span>
          </div>
          <div className="sketch-panel-box sketch-border p-3 px-5 text-center flex items-center gap-2">
            <span className="text-xl">⏱️</span>
            <span className="font-header text-lg font-bold text-emerald-400">~5 Min Walkthrough</span>
          </div>
        </div>
      </section>

      {/* Diagram Canvas Box */}
      <div className="case-study-diagram-wrap sketch-border bg-[var(--sketch-bg-dim)] p-4 md:p-6 rounded-3xl border-2 border-[var(--sketch-border)] shadow-2xl mb-8">
        <StagedArchitectureDiagram key={slug} diagramData={diagramData} />
      </div>

      {/* Back to written docs link */}
      <div className="text-center mb-16">
        <a
          href={`${base}/hld/case-studies/design-${slug}`}
          className="sketch-button inline-flex items-center gap-2 text-base font-bold text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 px-8 py-3 rounded-xl shadow-lg"
        >
          📖 Read Full Written HLD Article →
        </a>
      </div>

      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-2xl font-sketch shadow-xl mt-16 max-w-6xl mx-auto mb-10">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏗️</span>
              <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                {diagramData.title} Interactive Walkthrough
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-sm max-w-2xl leading-relaxed font-sketch">
              Evolve system architecture stage by stage with interactive request-path tracing, bottleneck analysis, and capacity metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-button flex items-center gap-2 text-sm font-bold bg-amber-500/20 border-amber-500"
            >
              <span>⭐ Star on GitHub</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="sketch-button flex items-center gap-1.5 text-sm font-bold"
              title="Back to top"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        {/* 4-Column Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[var(--sketch-border)]">
          {/* Column 1: Interactive Case Studies */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>📐</span> Case Studies
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}/system-design/url-shortener`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> TinyURL Shortener
                </a>
              </li>
              <li>
                <a href={`${base}/system-design/url-shortener?case=uber`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Uber Ride Matching
                </a>
              </li>
              <li>
                <a href={`${base}/system-design/url-shortener?case=whatsapp`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> WhatsApp Chat App
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: LLD Machine Coding */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>⚙️</span> LLD Projects
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}/lld/projects/design-parking-lot`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Parking Lot System
                </a>
              </li>
              <li>
                <a href={`${base}/lld/projects/design-cache-system`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> LRU/LFU Cache
                </a>
              </li>
              <li>
                <a href={`${base}/lld/projects/design-rate-limiter`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Distributed Rate Limiter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Design Studio Navigation */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🚀</span> Design Hubs
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}/system-design`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> System Design Hub
                </a>
              </li>
              <li>
                <a href={`${base}/visualizer`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Visualizer Studio
                </a>
              </li>
              <li>
                <a href={`${base}/mcq`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> MCQ Quiz Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Interview Prep */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>💡</span> Interview Prep
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}/interview-questions`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Interview Questions
                </a>
              </li>
              <li>
                <a href={`${base}/labs`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Practice Labs Hub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Design Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--sketch-text-muted)]">
          <div>
            © {new Date().getFullYear()} System Design Studio · Hand-crafted Blackboard UI.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {diagramData.title} Visualizer Active
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
