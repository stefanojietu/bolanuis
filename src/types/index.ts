export type SubdomainId = 'parent' | 'media' | 'brands' | 'realestate';

export interface SubdomainMeta {
  id: SubdomainId;
  name: string;
  domain: string;
  badge: string;
  tagline: string;
  description: string;
  accentColor: string;
  themeStyle: string;
}

export interface MediaPortfolioItem {
  id: string;
  title: string;
  category: 'photography' | 'cinematography' | 'editing' | 'production' | 'events';
  subCategory: string;
  imageUrl: string;
  client: string;
  year: string;
  duration?: string;
  description: string;
  tags: string[];
}

export interface BrandServiceItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  type: 'residential' | 'commercial' | 'land' | 'investment';
  status: 'For Sale' | 'For Lease' | 'Under Development' | 'Sold';
  price: string;
  rawPrice: number;
  location: string;
  specs: {
    beds?: number;
    baths?: number;
    sqft: string;
    lotSize?: string;
    parking?: string;
  };
  imageUrl: string;
  featured: boolean;
  description: string;
  amenities: string[];
}

export interface ProjectMilestone {
  id: string;
  projectName: string;
  type: string;
  client: string;
  status: 'Planning' | 'Active Construction' | 'Finishing Stage' | 'Delivered';
  progress: number;
  completionDate: string;
  budgetScale: string;
  location: string;
  scope: string;
}
