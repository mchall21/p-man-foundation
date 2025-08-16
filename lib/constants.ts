export const SITE_CONFIG = {
  name: 'The P-Man Foundation',
  tagline: 'One more good day',
  description: 'We fund small, practical grants that create sober social activities. String enough of those together and you change a life.',
  url: 'https://pmanfoundation.org',
  ein: 'XX-XXXXXXX', // TODO: Add actual EIN
  mailingAddress: {
    line1: 'The P-Man Foundation',
    line2: '', // TODO: Add actual address
    city: 'Atlanta',
    state: 'GA',
    zip: ''
  }
};

export const NAVIGATION: NavigationItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: "Patrick's Story", href: '/about/patrick' },
      { label: 'Foundation & Mission', href: '/about/foundation' }
    ]
  },
  { label: 'Impact', href: '/impact' },
  { label: 'Grants', href: '/grants' },
  {
    label: 'Pedal for P-Man',
    href: '/pedal',
    children: [
      { label: 'Event History', href: '/pedal/history' },
      { label: "This Year's Ride", href: '/pedal' },
      { label: 'Pledge-to-Ride', href: '/pedal/pledge' }
    ]
  },
  { label: 'Donate', href: '/donate' },
  { label: 'Contact', href: '/contact' }
];

export const EXTERNAL_LINKS = {
  paypal: 'https://www.paypal.com/donate', // TODO: Update with actual PayPal URL
  grantApplication: 'https://docs.google.com/forms/d/e/1FAIpQLSf2W3xlEOJnvr3X-Lt0IGxeKa3nFGxMZnEyTs3ae3YVyEhzog/viewform',
  grantsSheet: 'https://docs.google.com/spreadsheets/d/1vtqYR9gcFz_xNPAw7tdz_qB7JjIDO_uHrTYW-BoKKcg/edit?gid=0#gid=0',
  eventbrite: '', // TODO: Add current year's Eventbrite URL
  pledgeVendor: '' // TODO: Add when vendor selected
};

export const SOCIAL_LINKS = {
  facebook: '',
  instagram: '',
  twitter: ''
};

// Brand colors based on the content plan
export const COLORS = {
  primary: '#1a365d', // Deep blue
  secondary: '#2563eb', // Bright blue
  accent: '#f59e0b', // Warm amber
  success: '#10b981',
  error: '#ef4444',
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
};

import { NavigationItem } from '@/types';