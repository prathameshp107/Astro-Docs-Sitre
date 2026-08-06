import {
  SiGoogle,
  SiMeta,
  SiApple,
  SiNetflix,
  SiUber,
  SiWhatsapp,
} from 'react-icons/si';
import { FaAmazon } from 'react-icons/fa';

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

function BloombergIcon({ size = 24, color = '#ffbb00' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill={color} fillOpacity="0.15" />
      <text x="12" y="16" textAnchor="middle" fill={color} fontSize="13" fontWeight="900" fontFamily="sans-serif">B</text>
    </svg>
  );
}

function AdobeIcon({ size = 24, color = '#ff0000' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill={color} fillOpacity="0.15" />
      <path d="M7 18L12 6L17 18H14.5L12 11.5L9.5 18H7Z" fill={color} />
    </svg>
  );
}

function LinkedinIcon({ size = 24, color = '#0a66c2' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill={color} fillOpacity="0.15" />
      <text x="12" y="16.5" textAnchor="middle" fill={color} fontSize="12" fontWeight="900" fontFamily="sans-serif">in</text>
    </svg>
  );
}

function YahooIcon({ size = 24, color = '#6001d2' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill={color} fillOpacity="0.15" />
      <text x="12" y="16" textAnchor="middle" fill={color} fontSize="12" fontWeight="900" fontFamily="sans-serif">Y!</text>
    </svg>
  );
}

function AirbnbIcon({ size = 24, color = '#ff5a5f' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3C8.5 3 6 6.5 6 10.5C6 15 12 21 12 21C12 21 18 15 18 10.5C18 6.5 15.5 3 12 3ZM12 13C10.6 13 9.5 11.9 9.5 10.5C9.5 9.1 10.6 8 12 8C13.4 8 14.5 9.1 14.5 10.5C14.5 11.9 13.4 13 12 13Z" fill={color} />
    </svg>
  );
}

function StripeIcon({ size = 24, color = '#635bfc' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill={color} fillOpacity="0.15" />
      <text x="12" y="16.5" textAnchor="middle" fill={color} fontSize="14" fontWeight="900" fontFamily="sans-serif">S</text>
    </svg>
  );
}

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
  google:    { Component: SiGoogle,      color: '#4285f4', name: 'Google' },
  amazon:    { Component: FaAmazon,      color: '#ff9900', name: 'Amazon' },
  meta:      { Component: SiMeta,        color: '#0668e1', name: 'Meta' },
  facebook:  { Component: SiMeta,        color: '#0668e1', name: 'Meta' },
  microsoft: { Component: MicrosoftIcon, color: '#00a4ef', name: 'Microsoft' },
  apple:     { Component: SiApple,       color: '#f3f4f6', name: 'Apple' },
  netflix:   { Component: SiNetflix,     color: '#e50914', name: 'Netflix' },
  uber:      { Component: SiUber,        color: '#ffffff', name: 'Uber' },
  adobe:     { Component: AdobeIcon,     color: '#ff0000', name: 'Adobe' },
  bloomberg: { Component: BloombergIcon, color: '#ffbb00', name: 'Bloomberg' },
  linkedin:  { Component: LinkedinIcon,  color: '#0a66c2', name: 'LinkedIn' },
  yahoo:     { Component: YahooIcon,     color: '#6001d2', name: 'Yahoo' },
  airbnb:    { Component: AirbnbIcon,    color: '#ff5a5f', name: 'Airbnb' },
  stripe:    { Component: StripeIcon,    color: '#635bfc', name: 'Stripe' },
  whatsapp:  { Component: SiWhatsapp,    color: '#25d366', name: 'WhatsApp' },
  flipkart:  { Component: FlipkartIcon, color: '#2874f0', name: 'Flipkart' },
  swiggy:    { Component: SwiggyIcon,   color: '#fc8019', name: 'Swiggy' },
  zomato:    { Component: ZomatoIcon,   color: '#cb202d', name: 'Zomato' },
  razorpay:  { Component: RazorpayIcon, color: '#0b49c5', name: 'Razorpay' },
  tcs:       { Component: TCSIcon,      color: '#38bdf8', name: 'TCS' },
  infosys:   { Component: InfosysIcon,  color: '#007cc3', name: 'Infosys' },
};

export function getCompanyId(name) {
  if (!name) return '';
  const key = name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  if (key === 'meta' || key === 'facebook') return 'meta';
  return key;
}

export function CompanyIcon({ companyId, size = 28, className = '' }) {
  const normalizedKey = getCompanyId(companyId);
  const entry = COMPANY_ICONS[normalizedKey] || COMPANY_ICONS[companyId];
  if (!entry) {
    return (
      <span
        className={`inline-flex items-center justify-center font-bold rounded px-1 text-[10px] bg-white/10 text-white/80 ${className}`}
        style={{ width: size, height: size }}
        title={companyId}
      >
        {String(companyId).substring(0, 2).toUpperCase()}
      </span>
    );
  }

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
