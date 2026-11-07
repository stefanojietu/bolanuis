import React, { useState } from 'react';
import { SubdomainId } from '../../types';
import { MapPin, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface RealEstateSiteProps {
  onNavigate: (target: SubdomainId) => void;
}

interface Property {
  id: string;
  title: string;
  type: 'sale' | 'lease' | 'land';
  badge: 'For Sale' | 'For Lease';
  price: string;
  location: string;
  beds?: number;
  baths?: number;
  sqft: string;
  image: string;
  description: string;
  features: string[];
}

export const RealEstateSite: React.FC<RealEstateSiteProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'sale' | 'lease' | 'land'>('all');
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyTitle: '',
    preferredDate: '',
    notes: '',
  });

  const properties: Property[] = [
    {
      id: 'p1',
      title: 'The Sovereign Crest Waterfront Villa',
      type: 'sale',
      badge: 'For Sale',
      price: '$2,850,000',
      location: 'Victoria Island Waterfront, Lagos',
      beds: 5,
      baths: 6,
      sqft: '6,400 sq.ft',
      image: '/src/assets/images/realestate_luxury_property_1794079392405.jpg',
      description: 'Architectural contemporary cantilever residence with floor-to-ceiling glass, private infinity pool, travertine terraces, and private waterfront dock.',
      features: ['Private Infinity Pool', 'Smart Home Automation', '24/7 Gated Security', 'Private Marina Slip', 'Chef Kitchen'],
    },
    {
      id: 'p2',
      title: 'Bolanius Prime Commercial Center',
      type: 'lease',
      badge: 'For Lease',
      price: '$45 / sq.ft / year',
      location: 'Central Business District, Abuja',
      sqft: '42,000 sq.ft Total',
      image: '/src/assets/images/hero_parent_corporate_1794079391856.jpg',
      description: 'Grade-A corporate office complex designed for multinational headquarters, featuring modern glass facades, central HVAC, and basement parking.',
      features: ['Dual Power Generators', 'Central HVAC', '120 Parking Bays', 'High-Speed Elevators', 'Auditorium'],
    },
    {
      id: 'p3',
      title: 'Eden Heights Contemporary Terraces',
      type: 'sale',
      badge: 'For Sale',
      price: '$920,000',
      location: 'Ikoyi Enclave',
      beds: 4,
      baths: 5,
      sqft: '4,100 sq.ft',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: 'Spacious luxury terrace home with private courtyard, rooftop terrace, fully fitted kitchen, and en-suite bedrooms throughout.',
      features: ['Private Courtyard', 'Rooftop Terrace', 'Clubhouse & Gym', 'Gated Community', 'Integrated Security'],
    },
    {
      id: 'p4',
      title: 'Epe Industrial & Logistics Land Parcel',
      type: 'land',
      badge: 'For Sale',
      price: '$4,200,000',
      location: 'Epe Express Corridor',
      sqft: '25 Hectares (C of O)',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      description: 'Prime industrial zoning land with verified Certificate of Occupancy, direct highway access, and proximity to major commercial shipping routes.',
      features: ['Certificate of Occupancy', 'Perimeter Fencing', 'Heavy Vehicle Road Access', 'Power Grid Adjacent'],
    },
    {
      id: 'p5',
      title: 'Atlantic View Oceanfront Estate Plot',
      type: 'land',
      badge: 'For Sale',
      price: '$350,000 / Plot',
      location: 'Coastal Highway, Lekki',
      sqft: '1,200 sq.m per plot',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      description: 'Beachfront residential estate plot with clear land title, paved access roads, and unencumbered boundary documentation.',
      features: ['Governor Consent Title', 'Beachfront Proximity', 'Underground Utilities', 'Paved Boulevards'],
    },
    {
      id: 'p6',
      title: 'The Grand Atrium Medical & Office Suites',
      type: 'lease',
      badge: 'For Lease',
      price: '$38 / sq.ft / year',
      location: 'Lekki Phase 1 Commercial Spine',
      sqft: '28,000 sq.ft Available',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      description: 'Modern commercial plaza suites tailored for medical clinics, financial services, and corporate headquarters with ample customer parking.',
      features: ['Medical Waste Compliant', 'Valet Parking', 'Dual Back-Up Generators', '24/7 Concierge'],
    },
  ];

  const filteredProperties = filter === 'all'
    ? properties
    : properties.filter((p) => p.type === filter);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Real Estate Hero */}
      <section className="py-20 px-6 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs font-mono text-neutral-400">realestate.bolaniusprime.com</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Connecting People to Properties. Delivering Projects with Purpose.
            </h1>
            <p className="text-base text-neutral-300">
              Browse our verified luxury residences, commercial office leases, and strategic land acquisitions across prime locations.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="#properties-grid"
              className="px-6 py-3 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs transition-colors"
            >
              VIEW PROPERTIES
            </a>
            <button
              type="button"
              onClick={() => {
                setInquiryData({ ...inquiryData, propertyTitle: 'General Property Consultation' });
                setShowInquiryModal(true);
              }}
              className="px-6 py-3 rounded-md bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              SCHEDULE A CONSULTATION
            </button>
          </div>
        </div>
      </section>

      {/* Property Showcase (Core focus) */}
      <section id="properties-grid" className="py-20 px-6 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                Properties For Sale & Lease
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Available Real Estate Listings
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-md">
              {[
                { id: 'all', label: 'All Properties' },
                { id: 'sale', label: 'For Sale' },
                { id: 'lease', label: 'For Lease' },
                { id: 'land', label: 'Land & Plots' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                    filter === tab.id
                      ? 'bg-white text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-neutral-950">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setActiveProperty(prop)}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-xs font-mono font-bold text-white">
                      {prop.badge}
                    </div>
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 text-sm font-bold text-white">
                      {prop.price}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1 text-xs text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{prop.location}</span>
                    </div>

                    <h4
                      onClick={() => setActiveProperty(prop)}
                      className="text-base font-bold text-white hover:underline cursor-pointer line-clamp-1"
                    >
                      {prop.title}
                    </h4>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>

                    <div className="pt-2 flex items-center gap-3 text-xs text-neutral-300 font-mono border-t border-neutral-800">
                      {prop.beds && <span>{prop.beds} Beds</span>}
                      {prop.baths && <span>{prop.baths} Baths</span>}
                      <span>{prop.sqft}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveProperty(prop)}
                    className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>View Property Details & Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Details Modal */}
      {activeProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-950 border border-neutral-800 max-w-2xl w-full rounded-xl overflow-hidden relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <span className="text-xs font-mono text-neutral-400">{activeProperty.badge}</span>
              <button
                type="button"
                onClick={() => setActiveProperty(null)}
                className="text-neutral-400 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-neutral-900 h-64 sm:h-80">
                <img
                  src={activeProperty.image}
                  alt={activeProperty.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded bg-black/80 text-lg font-bold text-white">
                  {activeProperty.price}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{activeProperty.title}</h3>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeProperty.location}</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed pt-2">
                  {activeProperty.description}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase">Property Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeProperty.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setActiveProperty(null)}
                  className="px-4 py-2 bg-neutral-800 text-white text-xs rounded hover:bg-neutral-700 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInquiryData({ ...inquiryData, propertyTitle: activeProperty.title });
                    setActiveProperty(null);
                    setShowInquiryModal(true);
                  }}
                  className="px-5 py-2 bg-white text-neutral-950 font-bold text-xs rounded hover:bg-neutral-200 cursor-pointer"
                >
                  Schedule Site Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Overview: Real Estate Services & Project Management */}
      <section className="py-20 px-6 border-b border-neutral-800 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Services & Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Real Estate Services & Project Management
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
              <h4 className="text-lg font-bold text-white">1. Real Estate Services</h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Residential & Commercial property sales and marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Land sales and strategic sourcing with verified titles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Property management, tenant relations, and lease governance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Real estate investment support & consultancy</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
              <h4 className="text-lg font-bold text-white">2. Project Management</h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>End-to-end project planning, coordination, and resource allocation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>On-site project supervision, quality control, and work scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Project monitoring and commercial contract execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Turnkey fit-outs and client commissioning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry / Viewing Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-950 border border-neutral-800 max-w-lg w-full rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setShowInquiryModal(false);
                setInquirySubmitted(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-neutral-400">
                  Thank you, {inquiryData.name}. Our real estate team will call you to arrange the inspection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowInquiryModal(false);
                    setInquirySubmitted(false);
                  }}
                  className="mt-4 px-4 py-2 bg-white text-neutral-950 text-xs font-bold rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Schedule Inspection / Consultation</h3>
                  <p className="text-xs text-neutral-400">Connect with our property sales & project team.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300">Property / Subject</label>
                  <input
                    type="text"
                    value={inquiryData.propertyTitle}
                    onChange={(e) => setInquiryData({ ...inquiryData, propertyTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Name *</label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Preferred Tour Date</label>
                    <input
                      type="date"
                      value={inquiryData.preferredDate}
                      onChange={(e) => setInquiryData({ ...inquiryData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300">Specific Requirements</label>
                  <textarea
                    rows={3}
                    value={inquiryData.notes}
                    onChange={(e) => setInquiryData({ ...inquiryData, notes: e.target.value })}
                    placeholder="Budget, questions regarding title or payment plans..."
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Send Inspection Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} Bolanius Real Estate · realestate.bolaniusprime.com</p>
        <button
          type="button"
          onClick={() => onNavigate('parent')}
          className="mt-2 text-neutral-400 hover:text-white underline cursor-pointer"
        >
          Return to Home (Bolanius)
        </button>
      </footer>
    </div>
  );
};
