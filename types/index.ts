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

export interface ProcessedGrant {
  grantee: string;
  date: string;
  amount: number;
  year: number;
  participants?: number;
  days?: number;
  goodDays: number;
  costPerGD: number;
  tags: string[];
  description?: string;
}

export interface GrantsData {
  updatedAt: string;
  totals: {
    dollars: number;
    goodDays: number;
    costPerGD: number;
  };
  byYear: Array<{
    year: number;
    dollars: number;
    goodDays: number;
  }>;
  byTag: Array<{
    tag: string;
    dollars: number;
    goodDays: number;
  }>;
  top: Array<{
    grantee: string;
    goodDays: number;
    costPerGD: number;
    description: string;
    amount: number;
  }>;
  costStats: {
    min: number;
    median: number;
    max: number;
  };
  rows: ProcessedGrant[];
}