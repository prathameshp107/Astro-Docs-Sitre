import React from 'react';
import {
  SiWhatsapp,
  SiYoutube,
  SiNetflix,
  SiUber,
  SiCloudflare,
  SiInstagram,
  SiFirebase,
  SiGoogle,
  SiElasticsearch,
  SiRedis,
  SiGoogledrive,
  SiGoogledocs,
  SiStripe,
  SiTicketmaster,
  SiYelp,
  SiApachekafka,
  SiApacheflink,
  SiDropbox,
  SiLinktree,
  SiX,
  SiTiktok,
  SiDiscord,
  SiAirbnb,
  SiPrometheus,
} from 'react-icons/si';
import { FaAmazon } from 'react-icons/fa6';

/**
 * Official Brand Icons & Color Tokens for System Design Case Studies
 */
const BRAND_ICON_MAP = {
  'whatsapp': { Icon: SiWhatsapp, color: '#25D366', bg: 'rgba(37, 211, 102, 0.15)' },
  'chat-system': { Icon: SiWhatsapp, color: '#25D366', bg: 'rgba(37, 211, 102, 0.15)' },
  
  'youtube': { Icon: SiYoutube, color: '#FF0000', bg: 'rgba(255, 0, 0, 0.15)' },
  'video-streaming': { Icon: SiYoutube, color: '#FF0000', bg: 'rgba(255, 0, 0, 0.15)' },
  'netflix': { Icon: SiNetflix, color: '#E50914', bg: 'rgba(229, 9, 20, 0.15)' },
  
  'uber': { Icon: SiUber, color: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.12)' },
  'ride-sharing': { Icon: SiUber, color: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.12)' },
  
  'tiktok': { Icon: SiTiktok, color: '#25F4EE', bg: 'rgba(37, 244, 238, 0.15)' },
  
  'discord': { Icon: SiDiscord, color: '#5865F2', bg: 'rgba(88, 101, 242, 0.15)' },
  
  'airbnb': { Icon: SiAirbnb, color: '#FF5A5F', bg: 'rgba(255, 90, 95, 0.15)' },
  
  'metrics-monitoring': { Icon: SiPrometheus, color: '#E6522C', bg: 'rgba(230, 82, 44, 0.15)' },
  
  'distributed-message-queue': { Icon: SiApachekafka, color: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.12)' },

  'rate-limiter': { Icon: SiCloudflare, color: '#F38020', bg: 'rgba(243, 128, 32, 0.15)' },
  
  'news-feed': { Icon: SiInstagram, color: '#E4405F', bg: 'rgba(228, 64, 95, 0.15)' },
  'twitter': { Icon: SiX, color: '#1DA1F2', bg: 'rgba(29, 161, 242, 0.15)' },
  
  'notification-system': { Icon: SiFirebase, color: '#FFCA28', bg: 'rgba(255, 202, 40, 0.15)' },
  
  'web-crawler': { Icon: SiGoogle, color: '#4285F4', bg: 'rgba(66, 133, 244, 0.15)' },
  
  'search-autocomplete': { Icon: SiElasticsearch, color: '#005555', bg: 'rgba(0, 85, 85, 0.2)' },
  
  'distributed-cache': { Icon: SiRedis, color: '#DC382D', bg: 'rgba(220, 56, 45, 0.15)' },
  
  'file-storage': { Icon: SiGoogledrive, color: '#FFD04B', bg: 'rgba(255, 208, 75, 0.15)' },
  'google-drive': { Icon: SiGoogledrive, color: '#FFD04B', bg: 'rgba(255, 208, 75, 0.15)' },
  'dropbox': { Icon: SiDropbox, color: '#0061FE', bg: 'rgba(0, 97, 254, 0.15)' },
  
  'payment-system': { Icon: SiStripe, color: '#635BFF', bg: 'rgba(99, 91, 255, 0.15)' },
  
  'ticket-booking-system': { Icon: SiTicketmaster, color: '#026CD1', bg: 'rgba(2, 108, 209, 0.15)' },
  
  'ecommerce-order-system': { Icon: FaAmazon, color: '#FF9900', bg: 'rgba(255, 153, 0, 0.15)' },
  'amazon': { Icon: FaAmazon, color: '#FF9900', bg: 'rgba(255, 153, 0, 0.15)' },
  
  'distributed-key-value-store': { Icon: SiRedis, color: '#DC382D', bg: 'rgba(220, 56, 45, 0.15)' },
  
  'proximity-service': { Icon: SiYelp, color: '#FF1A1A', bg: 'rgba(255, 26, 26, 0.15)' },
  
  'collaborative-editor': { Icon: SiGoogledocs, color: '#4285F4', bg: 'rgba(66, 133, 244, 0.15)' },
  
  'distributed-job-scheduler': { Icon: SiApachekafka, color: '#231F20', bg: 'rgba(255, 255, 255, 0.1)' },
  
  'ad-click-aggregation': { Icon: SiApacheflink, color: '#E6526F', bg: 'rgba(230, 82, 111, 0.15)' },
  
  'distributed-lock-service': { Icon: SiRedis, color: '#DC382D', bg: 'rgba(220, 56, 45, 0.15)' },
  
  'url-shortener': { Icon: SiLinktree, color: '#50E3C2', bg: 'rgba(80, 227, 194, 0.15)' },

  'twitter-timeline': { Icon: SiX, color: '#1DA1F2', bg: 'rgba(29, 161, 242, 0.15)' },
  'photo-sharing-app': { Icon: SiInstagram, color: '#E4405F', bg: 'rgba(228, 64, 95, 0.15)' },
  'distributed-search-engine': { Icon: SiElasticsearch, color: '#005555', bg: 'rgba(0, 85, 85, 0.2)' },
  'api-gateway': { Icon: SiCloudflare, color: '#F38020', bg: 'rgba(243, 128, 32, 0.15)' },
};

export default function BrandIcon({ slug, size = 24, className = '' }) {
  const brand = BRAND_ICON_MAP[slug] || { Icon: SiLinktree, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' };
  const { Icon, color } = brand;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl p-1.5 transition-transform duration-200 hover:scale-110 ${className}`}
      style={{
        backgroundColor: brand.bg,
        border: `1px solid ${color}40`,
        boxShadow: `0 0 12px ${color}30`,
      }}
    >
      <Icon style={{ color: color, width: size, height: size }} />
    </span>
  );
}
