export interface Grant {
  id: string;
  organization: string;
  amount: number;
  year: number;
  purpose: string;
  location?: {
    city?: string;
    state?: string;
  };
  participantCount?: number;
  eventDays?: number;
  estimatedGoodDays?: number;
  category?: 'social' | 'treatment' | 'community' | 'other';
}

export interface RideYear {
  year: number;
  location: string;
  theme?: string;
  shirtImage?: string;
  photos: string[];
  description?: string;
}

export interface Testimonial {
  id: string;
  name?: string;
  organization?: string;
  quote: string;
  photo?: string;
}

export interface SiteMetrics {
  totalGranted: number;
  totalGrantees: number;
  estimatedGoodDays: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface Asset {
  type: 'image' | 'video' | 'document';
  url: string;
  alt?: string;
  caption?: string;
  category?: string;
}