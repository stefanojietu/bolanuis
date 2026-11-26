import {
  SubdomainMeta,
  MediaPortfolioItem,
  BrandServiceItem,
  PropertyItem,
} from '../types';

export const OFFICE_CONTACT = {
  phones: [
    { display: '08028089959', tel: '+2348028089959', wa: '2348028089959' },
    { display: '08034804090', tel: '+2348034804090', wa: '2348034804090' },
  ],
  address: '1, Tunde Ilufoye Street, Off Benson Adu-Fatoki, Egan, Igando, Lagos.',
  email: 'bolaniusprimelimited@gmail.com',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=1+Tunde+Ilufoye+Street%2C+Off+Benson+Adu-Fatoki%2C+Egan%2C+Igando%2C+Lagos%2C+Nigeria',
};

export const SUBDOMAINS: Record<string, SubdomainMeta> = {
  parent: {
    id: 'parent',
    name: 'BOLANIUS PRIME LIMITED',
    domain: 'www.bolaniusprime.com',
    badge: 'Parent Corporate Hub',
    tagline: 'One Vision. Multiple Solutions. Endless Possibilities.',
    description: 'Parent holding company uniting our flagship photography studio with strategic, emerging ventures in brand identity and property advisory.',
    accentColor: '#3B82F6',
    themeStyle: 'corporate-dark',
  },
  media: {
    id: 'media',
    name: 'Bolanius Media Studio',
    domain: 'media.bolaniusprime.com',
    badge: 'Flagship Core Business',
    tagline: 'Capturing Moments. Creating Visual Impact.',
    description: 'Our established flagship studio specializing in portraiture, wedding documentation, and high-end image enhancement.',
    accentColor: '#F59E0B',
    themeStyle: 'cinematic-dark',
  },
  brands: {
    id: 'brands',
    name: 'Bolanius Brands',
    domain: 'brands.bolaniusprime.com',
    badge: 'Emerging Creative Venture',
    tagline: 'Building Identities. Quality Print & Promotion.',
    description: 'Focused brand solutions delivering custom visual identities, commercial printing, and outdoor billboard publicity.',
    accentColor: '#2563EB',
    themeStyle: 'tech-modern',
  },
  realestate: {
    id: 'realestate',
    name: 'Bolanius Real Estate',
    domain: 'realestate.bolaniusprime.com',
    badge: 'Emerging Property Venture',
    tagline: 'Connecting People to Verified Properties.',
    description: 'Curated residential sales, commercial leasing, and dependable property advisory backed by thorough title verification.',
    accentColor: '#D97706',
    themeStyle: 'architectural-luxury',
  },
};

export const CORE_VALUES = [
  {
    name: 'Excellence in Craft',
    desc: 'Focusing on a select few services and executing each one to the highest creative and professional standard.',
  },
  {
    name: 'Integrity & Transparency',
    desc: 'No exaggerated claims or unrealistic promises. We communicate clearly and deliver exactly what we commit to.',
  },
  {
    name: 'Disciplined Execution',
    desc: 'Punctuality, clear turnaround timelines, and reliable attention to detail from the first meeting to final delivery.',
  },
  {
    name: 'Client Partnership',
    desc: 'Listening closely to our clients to understand their genuine vision and crafting solutions that exceed expectations.',
  },
];

// 3 Core Services for Media Studio (The Flagship Business)
export const MEDIA_FOCUSED_SERVICES = [
  {
    num: '01',
    title: 'Portrait & Studio Photography',
    subtitle: 'Studio & Outdoor Sessions',
    description: 'Personal portraits, milestone birthdays, corporate executive headshots, and creative beauty sessions in our calibrated studios.',
    highlights: ['Air-conditioned studio with Profoto lighting', 'Wardrobe & styling guidance', 'Same-week proof review'],
  },
  {
    num: '02',
    title: 'Weddings & Celebrations',
    subtitle: 'Timeless Storytelling',
    description: 'Full-day wedding photography, traditional engagement ceremonies, and private celebratory gatherings captured with emotional intimacy.',
    highlights: ['Multi-camera documentary coverage', 'Comprehensive couple & family portraits', 'High-resolution digital archive'],
  },
  {
    num: '03',
    title: 'High-End Retouching & Framing',
    subtitle: 'Artisan Post-Production',
    description: 'Magazine-grade skin retouching, natural color grading, canvas printing, and premium archival framing built to last generations.',
    highlights: ['Natural texture preservation', 'Custom color calibration', 'Museum-quality canvas & frame delivery'],
  },
];

// 3 Focused Services for Bolanius Brands (New Venture - Realistic, no false claims)
export const BRANDS_FOCUSED_SERVICES: BrandServiceItem[] = [
  {
    id: 'b1',
    num: '01',
    title: 'Brand Identity Design',
    subtitle: 'Visual Identity & Guidelines',
    description: 'Clean logo wordmarks, brand guidelines, color palettes, and executive stationery kits tailored for ambitious businesses.',
    deliverables: ['Custom Logo & Wordmark', 'Brand Specification Guide', 'Executive Business Cards', 'Stationery & Letterhead'],
    icon: 'Sparkles',
  },
  {
    id: 'b2',
    num: '02',
    title: 'Commercial & Promotional Printing',
    subtitle: 'Precision Physical Collateral',
    description: 'Dependable offset and digital printing for business cards, flyers, company profiles, brochures, roll-up banners, and event booklets.',
    deliverables: ['Premium Business Cards', 'Corporate Profile Booklets', 'Roll-Up & Mesh Banners', 'Event Programs & Flyers'],
    icon: 'Printer',
  },
  {
    id: 'b3',
    num: '03',
    title: 'Outdoor & Promotional Display',
    subtitle: 'Billboard & Visibility Placements',
    description: 'High-visibility billboard creative mockups, outdoor gantry advertising design, and tactical print displays for strategic exposure.',
    deliverables: ['Billboard Display Design', 'Outdoor Campaign Creatives', 'Location Sourcing Assistance', 'Print Production Supervision'],
    icon: 'Megaphone',
  },
];

// 3 Focused Services for Bolanius Real Estate (New Venture - Realistic, grounded)
export const REALESTATE_FOCUSED_SERVICES = [
  {
    num: '01',
    title: 'Verified Property Sales',
    subtitle: 'Residential & Land Sourcing',
    description: 'Guiding buyers through vetted residential terrace homes, modern apartments, and verified land parcels with clean title documentation.',
    points: ['Title & documentation screening', 'Transparent pricing negotiations', 'Seamless handover coordination'],
  },
  {
    num: '02',
    title: 'Leasing & Rental Advisory',
    subtitle: 'Residential & Commercial Spaces',
    description: 'Connecting individuals, families, and businesses to quality rental homes, serviced flats, and functional office spaces.',
    points: ['Curated rental listings', 'Tenancy agreement support', 'Move-in inspection governance'],
  },
  {
    num: '03',
    title: 'Site Inspection & Advisory',
    subtitle: 'Independent Property Due Diligence',
    description: 'Personalized accompaniment for on-site inspections, neighborhood evaluations, and renovation planning advice before you commit.',
    points: ['Physical site accompaniment', 'Zoning & neighborhood evaluation', 'Refurbishment scope assistance'],
  },
];

export const PROPERTIES: PropertyItem[] = [
  {
    id: 'p1',
    title: 'Contemporary 4-Bedroom Terrace Home',
    type: 'residential',
    status: 'For Sale',
    price: '$450,000',
    rawPrice: 450000,
    location: 'Lekki Phase 1, Lagos',
    specs: {
      beds: 4,
      baths: 4,
      sqft: '3,800 sq.ft',
      parking: '2 Dedicated Spaces',
    },
    imageUrl: '/src/assets/images/realestate_modern_terrace_1794490990804.jpg',
    featured: true,
    description: 'Contemporary multi-level terrace residence with private parking, modern fitted kitchen, ensuite bedrooms, and 24/7 power backup in a secure gated community.',
    amenities: ['Fitted Kitchen', '24/7 Gated Security', 'Private Parking', 'Ensuite Bedrooms', 'Treated Water Supply'],
  },
  {
    id: 'p2',
    title: 'Prime Commercial Office Floor',
    type: 'commercial',
    status: 'For Lease',
    price: '$35 / sq.ft / year',
    rawPrice: 35,
    location: 'Victoria Island, Lagos',
    specs: {
      sqft: '3,200 sq.ft Open Plan',
      parking: '6 Dedicated Bays',
    },
    imageUrl: '/src/assets/images/hero_parent_corporate_1794079391856.jpg',
    featured: true,
    description: 'Well-appointed commercial office suite with glass partitioning, meeting rooms, dual generator backup, and high-speed fiber internet access.',
    amenities: ['Dual Generator Backup', 'Fiber Internet Ready', 'Meeting Room Suite', 'Dedicated Parking', '24/7 Access'],
  },
  {
    id: 'p3',
    title: 'Scenic Residential Estate Land Plot',
    type: 'land',
    status: 'For Sale',
    price: '$120,000',
    rawPrice: 120000,
    location: 'Coastal Corridor, Lekki',
    specs: {
      lotSize: '650 sq.m (Prime Title: Governor’s Consent)',
      sqft: '6,996 sq.ft',
    },
    imageUrl: '/src/assets/images/realestate_estate_land_1794490991219.jpg',
    featured: false,
    description: 'Dry, cleared residential plot within a master-planned estate featuring paved access roads, perimeter fencing, and verified Governor’s Consent documentation.',
    amenities: ['Governor’s Consent Title', 'Paved Access Road', 'Perimeter Fenced', 'Electricity Infrastructure', 'Ready to Build'],
  },
];
