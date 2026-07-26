import {
  SiGoogle,
  SiAmazon,
  SiMeta,
  SiApple,
  SiNetflix,
  SiUber,
  SiWhatsapp,
} from 'react-icons/si';

// Official Microsoft 4-Color Logo SVG
function MicrosoftIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8.5" height="8.5" fill="#f25022" />
      <rect x="12.5" y="3" width="8.5" height="8.5" fill="#7fba00" />
      <rect x="3" y="12.5" width="8.5" height="8.5" fill="#00a4ef" />
      <rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#ffb900" />
    </svg>
  );
}

// Custom clean SVG logos for regional/custom companies
function FlipkartIcon({ size = 24, color = '#2874f0' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16v16H4z" fill={color} opacity="0.15" rx="4" />
      <path d="M7 7h10v3H10v3h6v3H10v4H7V7z" fill={color} />
    </svg>
  );
}

function SwiggyIcon({ size = 24, color = '#fc8019' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} opacity="0.15" />
      <path d="M12 4a8 8 0 00-8 8c0 4.42 3.58 8 8 8s8-3.58 8-8a8 8 0 00-8-8zm0 3a3 3 0 013 3c0 2-3 5-3 5s-3-3-3-5a3 3 0 013-3z" fill={color} />
    </svg>
  );
}

function ZomatoIcon({ size = 24, color = '#cb202d' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} opacity="0.15" />
      <path d="M7 8h10l-6 8h6v2H7l6-8H7V8z" fill={color} />
    </svg>
  );
}

function RazorpayIcon({ size = 24, color = '#0b49c5' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13.5 2L5 13h6l-2 9 10-11h-6.5l3-9z" fill={color} />
    </svg>
  );
}

function TCSIcon({ size = 24, color = '#38bdf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="3" fill={color} fillOpacity="0.15" />
      <path d="M7 8h10M12 8v8" />
    </svg>
  );
}

function InfosysIcon({ size = 24, color = '#007cc3' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="3" fill={color} fillOpacity="0.15" />
      <path d="M8 8v8M12 8v8M16 8v8" />
    </svg>
  );
}

export const COMPANY_ICONS = {
  google:    { Component: SiGoogle,      color: '#4285f4' },
  amazon:    { Component: SiAmazon,      color: '#ff9900' },
  meta:      { Component: SiMeta,        color: '#0668e1' },
  microsoft: { Component: MicrosoftIcon, color: '#00a4ef' },
  apple:     { Component: SiApple,       color: '#f3f4f6' },
  netflix:   { Component: SiNetflix,     color: '#e50914' },
  uber:      { Component: SiUber,        color: '#ffffff' },
  whatsapp:  { Component: SiWhatsapp,    color: '#25d366' },
  flipkart:  { Component: FlipkartIcon, color: '#2874f0' },
  swiggy:    { Component: SwiggyIcon,   color: '#fc8019' },
  zomato:    { Component: ZomatoIcon,   color: '#cb202d' },
  razorpay:  { Component: RazorpayIcon, color: '#0b49c5' },
  tcs:       { Component: TCSIcon,      color: '#38bdf8' },
  infosys:   { Component: InfosysIcon,  color: '#007cc3' },
};

export function CompanyIcon({ companyId, size = 28, className = '' }) {
  const entry = COMPANY_ICONS[companyId];
  if (!entry) return <span className="text-2xl">🏢</span>;

  const { Component, color } = entry;
  return (
    <Component
      size={size}
      style={{ color }}
      className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${className}`}
      aria-hidden="true"
    />
  );
}
