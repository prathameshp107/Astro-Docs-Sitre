import { useState, useEffect, useMemo } from 'react';
import StagedArchitectureDiagram from './StagedArchitectureDiagram';
import urlShortenerData from '../../data/system-design/diagrams/url-shortener.json';
import uberData from '../../data/system-design/diagrams/uber.json';
import whatsappData from '../../data/system-design/diagrams/whatsapp.json';

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
    <div className="case-study-interactive-page">
      {/* Hero */}
      <div className="case-study-hero">
        <div className="case-study-hero-badge">Interactive Case Study</div>
        <h1 className="case-study-hero-title">{diagramData.title}</h1>
        <p className="case-study-hero-subtitle">{diagramData.subtitle}</p>
        <div className="case-study-hero-stats">
          <span className="case-study-stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            {diagramData.stages?.length || 0} Stages
          </span>
          <span className="case-study-stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            ~5 min walkthrough
          </span>
        </div>
      </div>

      {/* Diagram */}
      <div className="case-study-diagram-wrap">
        <StagedArchitectureDiagram key={slug} diagramData={diagramData} />
      </div>

      {/* Back to docs link */}
      <div className="case-study-back-bar">
        <a
          href={`${base}/hld/case-studies/design-${slug}`}
          className="case-study-back-link"
        >
          ← Read the full written guide
        </a>
      </div>
    </div>
  );
}
