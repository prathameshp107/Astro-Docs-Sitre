import React from 'react';

/* ══════════════════════════════════════════════════
   Skeleton — Reusable Loading Placeholder
   ══════════════════════════════════════════════════
   Usage:
     <Skeleton variant="text" width="200px" />
     <Skeleton variant="card" height="120px" />
     <Skeleton variant="circle" size="48px" />
     <Skeleton variant="rect" width="100%" height="200px" />
     <Skeleton variant="avatar" size="40px" />
     <Skeleton variant="badge" width="120px" />
     <Skeleton variant="stat" />
     <Skeleton variant="title" />
     <Skeleton variant="paragraph" lines={3} />
*/

export default function Skeleton({ variant = 'text', width, height, lines = 3, style, className = '' }) {
  const baseClass = `skeleton skeleton-${variant} ${className}`.trim();

  if (variant === 'paragraph') {
    return (
      <div className="skeleton-paragraph" style={style}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className="skeleton skeleton-text"
            style={{
              width: i === lines - 1 ? '60%' : '100%',
              height: '14px',
              marginBottom: i < lines - 1 ? '10px' : 0,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'stat') {
    return (
      <div className="skeleton-stat" style={style}>
        <div className="skeleton skeleton-text" style={{ width: '60px', height: '28px', margin: '0 auto 6px' }} />
        <div className="skeleton skeleton-text" style={{ width: '80px', height: '12px', margin: '0 auto' }} />
      </div>
    );
  }

  if (variant === 'title') {
    return (
      <div style={{ marginBottom: '12px', ...style }}>
        <div className="skeleton skeleton-text" style={{ width: width || '240px', height: '24px' }} />
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className="skeleton skeleton-badge" style={{ width: width || '100px', height: '24px', ...style }} />
    );
  }

  if (variant === 'card') {
    return (
      <div className="skeleton skeleton-card" style={{ width, height: height || '160px', ...style }}>
        <div className="skeleton-card-inner">
          <div className="skeleton skeleton-icon" style={{ width: '40px', height: '40px', marginBottom: '12px' }} />
          <div className="skeleton skeleton-text" style={{ width: '70%', height: '16px', marginBottom: '8px' }} />
          <div className="skeleton skeleton-text" style={{ width: '90%', height: '12px' }} />
        </div>
      </div>
    );
  }

  if (variant === 'topic-card') {
    return (
      <div className="skeleton skeleton-card" style={{ width, height: height || '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px' }}>
          <div className="skeleton skeleton-avatar" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton skeleton-text" style={{ width: '60%', height: '14px', marginBottom: '6px' }} />
            <div className="skeleton skeleton-text" style={{ width: '40%', height: '10px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'circle') {
    return (
      <div className="skeleton skeleton-circle" style={{ width: size(width, 40), height: size(width, 40), ...style }} />
    );
  }

  if (variant === 'avatar') {
    return (
      <div className="skeleton skeleton-avatar" style={{ width: size(width, 40), height: size(width, 40), ...style }} />
    );
  }

  // Default: rect or text
  return (
    <div
      className={baseClass}
      style={{
        width: width || (variant === 'rect' ? '100%' : '160px'),
        height: height || (variant === 'rect' ? '120px' : '14px'),
        ...style,
      }}
    />
  );
}

function size(val, def) {
  if (!val) return def;
  if (typeof val === 'number') return val;
  return val;
}

/* ══════════════════════════════════════════════════
   SkeletonGrid — Grid of Skeleton Cards
   ══════════════════════════════════════════════════
   Usage:
     <SkeletonGrid count={6} variant="card" columns={3} />
*/

export function SkeletonGrid({ count = 4, variant = 'card', columns = 3, cardHeight }) {
  return (
    <div
      className="skeleton-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} variant={variant} height={cardHeight} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SkeletonTable — Row Skeletons
   ══════════════════════════════════════════════════
*/

export function SkeletonTable({ rows = 5, columns = 3 }) {
  return (
    <div className="skeleton-table">
      {Array.from({ length: rows }, (_, ri) => (
        <div key={ri} className="skeleton-table-row">
          {Array.from({ length: columns }, (_, ci) => (
            <div
              key={ci}
              className="skeleton skeleton-text"
              style={{
                width: ci === 0 ? '40%' : ci === columns - 1 ? '20%' : '30%',
                height: '12px',
                opacity: 1 - (ri / rows) * 0.3,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SkeletonHero — Full Hero Section Skeleton
   ══════════════════════════════════════════════════
*/

export function SkeletonHero() {
  return (
    <div className="skeleton-hero">
      <div className="skeleton skeleton-badge" style={{ width: '160px', height: '28px', margin: '0 auto 16px' }} />
      <div className="skeleton skeleton-text" style={{ width: '60%', height: '40px', margin: '0 auto 12px' }} />
      <div className="skeleton skeleton-text" style={{ width: '40%', height: '18px', margin: '0 auto 24px' }} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <div className="skeleton skeleton-text" style={{ width: '140px', height: '44px', borderRadius: '12px' }} />
        <div className="skeleton skeleton-text" style={{ width: '140px', height: '44px', borderRadius: '12px' }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SkeletonStats — Stats Bar Skeleton
   ══════════════════════════════════════════════════
*/

export function SkeletonStats({ count = 4 }) {
  return (
    <div className="skeleton-stats-bar">
      {Array.from({ length: count }, (_, i) => (
        <React.Fragment key={i}>
          <div className="skeleton-stat" style={{ padding: '0 16px' }}>
            <div className="skeleton skeleton-text" style={{ width: '50px', height: '24px', margin: '0 auto 4px' }} />
            <div className="skeleton skeleton-text" style={{ width: '70px', height: '10px', margin: '0 auto' }} />
          </div>
          {i < count - 1 && <div className="skeleton-stats-divider" />}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SkeletonLabCard — Lab Card Skeleton
   ══════════════════════════════════════════════════
*/

export function SkeletonLabCard() {
  return (
    <div className="skeleton skeleton-card" style={{ minHeight: '390px' }}>
      <div style={{ padding: '1.4rem' }}>
        <div className="skeleton skeleton-badge" style={{ width: '80px', height: '22px', marginBottom: '16px' }} />
        <div className="skeleton skeleton-avatar" style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '16px' }} />
        <div className="skeleton skeleton-text" style={{ width: '70%', height: '18px', marginBottom: '8px' }} />
        <div className="skeleton skeleton-text" style={{ width: '100%', height: '12px', marginBottom: '4px' }} />
        <div className="skeleton skeleton-text" style={{ width: '80%', height: '12px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          <div className="skeleton skeleton-badge" style={{ width: '60px', height: '20px' }} />
          <div className="skeleton skeleton-badge" style={{ width: '50px', height: '20px' }} />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <div className="skeleton skeleton-text" style={{ width: '70px', height: '20px', borderRadius: '999px' }} />
          <div className="skeleton skeleton-text" style={{ width: '60px', height: '20px', borderRadius: '999px' }} />
          <div className="skeleton skeleton-text" style={{ width: '80px', height: '20px', borderRadius: '999px' }} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SkeletonLabPlatform — Full Lab Platform Skeleton
   ══════════════════════════════════════════════════
*/

export function SkeletonLabPlatform() {
  return (
    <div className="skeleton-lab-platform">
      <div className="skeleton-lab-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="skeleton skeleton-text" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
          <div className="skeleton skeleton-text" style={{ width: '120px', height: '16px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="skeleton skeleton-text" style={{ width: '80px', height: '8px', borderRadius: '999px' }} />
          <div className="skeleton skeleton-text" style={{ width: '30px', height: '14px' }} />
        </div>
      </div>
      <div className="skeleton-lab-body">
        <div className="skeleton-lab-sidebar">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="skeleton skeleton-text" style={{ width: '20px', height: '14px' }} />
              <div className="skeleton skeleton-text" style={{ flex: 1, height: '12px' }} />
            </div>
          ))}
        </div>
        <div className="skeleton-lab-content">
          <div style={{ padding: '20px' }}>
            <div className="skeleton skeleton-badge" style={{ width: '100px', height: '22px', marginBottom: '12px' }} />
            <div className="skeleton skeleton-text" style={{ width: '60%', height: '24px', marginBottom: '16px' }} />
            <div className="skeleton skeleton-text" style={{ width: '100%', height: '12px', marginBottom: '6px' }} />
            <div className="skeleton skeleton-text" style={{ width: '90%', height: '12px', marginBottom: '6px' }} />
            <div className="skeleton skeleton-text" style={{ width: '70%', height: '12px', marginBottom: '20px' }} />
            <div className="skeleton skeleton-text" style={{ width: '100%', height: '120px', borderRadius: '8px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
