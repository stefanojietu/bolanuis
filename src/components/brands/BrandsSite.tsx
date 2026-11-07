import React, { useState } from 'react';
import { SubdomainId } from '../../types';
import { 
  Sparkles, 
  Printer, 
  Megaphone, 
  TrendingUp, 
  PackageCheck, 
  Globe2, 
  CheckCircle2, 
  ArrowRight, 
  X,
  ExternalLink,
  Eye,
  Sliders
} from 'lucide-react';

interface BrandsSiteProps {
  onNavigate: (target: SubdomainId) => void;
}

export const BrandsSite: React.FC<BrandsSiteProps> = ({ onNavigate }) => {
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [billboardView, setBillboardView] = useState<'branded' | 'blank'>('branded');
  const [activeSolutionModal, setActiveSolutionModal] = useState<any | null>(null);

  const [consultData, setConsultData] = useState({
    name: '',
    company: '',
    email: '',
    service: 'Branding & Identity',
    notes: '',
  });

  // Pexels Blank Billboard image URLs
  const billboardImages = {
    blank: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1600',
    mockup: 'https://images.pexels.com/photos/14780175/pexels-photo-14780175.jpeg?auto=compress&cs=tinysrgb&w=1600',
  };

  // Real web illustrations/photos for "Brand Solutions in Practice" (No generated images)
  const brandSolutions = [
    {
      id: 'sol1',
      title: 'Corporate Brand Identity & Visual Systems',
      category: 'Branding & Visual Design',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Comprehensive brand guidelines, custom logo typography, brand color palettes, and corporate stationery design that establish market presence.',
      deliverables: ['Logo & Wordmark Systems', 'Brand Style Guide & Specifications', 'Business Stationery Kits', 'Typography & Visual Guidelines'],
    },
    {
      id: 'sol2',
      title: 'Commercial Printing & Executive Collateral',
      category: 'Printing Solutions',
      image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Precision offset and digital printing for luxury business cards, company profiles, brochures, folders, and event programs with specialty finishes.',
      deliverables: ['Foil Embossed Business Cards', 'Annual Reports & Corporate Profiles', 'Large-Format Banners & Roll-Ups', 'Custom Presentation Folders'],
    },
    {
      id: 'sol3',
      title: 'Outdoor Billboard Campaigns & Publicity',
      category: 'Advertising & Marketing',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'High-impact outdoor billboard advertising placements, strategic product marketing, brand visibility campaigns, and multimedia public relations.',
      deliverables: ['Highway & Urban Billboard Placements', 'Product Launch Campaign Execution', 'Outdoor Gantry Signage', 'Digital Media Amplification'],
    },
    {
      id: 'sol4',
      title: 'Custom Packaging & Branded Merchandise',
      category: 'Packaging & Supplies',
      image: 'https://images.pexels.com/photos/3774903/pexels-photo-3774903.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Structural package engineering, eco-friendly retail boxes, corporate gift packages, and high-volume promotional merchandise distribution.',
      deliverables: ['Custom Rigid Gift Boxes', 'Retail Product Packaging', 'Branded Corporate Apparel', 'Promotional Event Merchandise'],
    },
    {
      id: 'sol5',
      title: 'Business Advisory & Strategic Planning',
      category: 'Management Consultancy',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Institutional business planning, market feasibility analysis, operational workflow optimization, and organizational growth consulting.',
      deliverables: ['Business Plan Structuring', 'Market Entry Feasibility Studies', 'Operational Workflow Reviews', 'Corporate Growth Strategy Roadmaps'],
    },
    {
      id: 'sol6',
      title: 'Global Trade Logistics & Product Sourcing',
      category: 'Import & Export Trade',
      image: 'https://images.pexels.com/photos/4483775/pexels-photo-4483775.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Cross-border supply chain coordination, direct factory verification in international hubs, customs clearance, and multimodal freight distribution.',
      deliverables: ['International Factory Sourcing', 'Sea & Air Freight Logistics', 'Customs Clearance Coordination', 'Bulk Wholesale Merchandise Distribution'],
    },
  ];

  const services = [
    {
      num: '01',
      title: 'Branding & Identity',
      desc: 'Logo design, corporate identity development, business stationery, brand graphics, and visual communication.',
      icon: Sparkles,
    },
    {
      num: '02',
      title: 'Printing Solutions',
      desc: 'Business cards, flyers, banners, brochures, company profiles, wedding programs, calendars, and commercial printing.',
      icon: Printer,
    },
    {
      num: '03',
      title: 'Advertising & Publicity',
      desc: 'Business advertising, product promotion, event publicity, digital marketing content, and brand awareness campaigns.',
      icon: Megaphone,
    },
    {
      num: '04',
      title: 'Business Consultancy',
      desc: 'Business development advisory, business planning, project advisory, and growth strategies.',
      icon: TrendingUp,
    },
    {
      num: '05',
      title: 'General Contracts & Essential Supplies',
      desc: 'Commercial supply contracts, corporate procurement, and office and household essential goods distribution.',
      icon: PackageCheck,
    },
    {
      num: '06',
      title: 'General Merchandise, Import & Export',
      desc: 'Wholesale and retail trading, international product sourcing, and cross-border import and export coordination.',
      icon: Globe2,
    },
  ];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans">
      {/* Brands Sub-Header */}
      <header className="border-b border-neutral-800 bg-neutral-900 sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              BOLANIUS BRANDS
            </span>
            <span className="hidden sm:inline text-xs text-neutral-400 font-mono">
              / brands.bolaniusprime.com
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-neutral-400">
            <a href="#hero" className="hover:text-white transition-colors">Billboard Display</a>
            <a href="#solutions" className="hover:text-white transition-colors">Brand Solutions</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <button
            type="button"
            onClick={() => setShowConsultModal(true)}
            className="px-4 py-2 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            Consult With Our Team
          </button>
        </div>
      </header>

      {/* 1. Hero Section incorporating Pexels Blank Billboard */}
      <section id="hero" className="py-16 sm:py-20 px-6 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                brands.bolaniusprime.com
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Building Identities. Expanding Global Opportunities.
              </h1>
            </div>

            <p className="text-base text-neutral-300 leading-relaxed">
              Bolanius Brands specializes in corporate branding, commercial printing solutions, advertising campaigns, executive business consultancy, procurement contracts, and international merchandise import/export trade.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setShowConsultModal(true)}
                className="px-6 py-3 rounded bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                CONSULT WITH OUR TEAM
              </button>
              <a
                href="#solutions"
                className="px-6 py-3 rounded bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                VIEW BRAND SOLUTIONS
              </a>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center gap-4 text-xs text-neutral-400">
              <span>Outdoor Advertising</span>
              <span aria-hidden="true">·</span>
              <span>Identity Design</span>
              <span aria-hidden="true">·</span>
              <span>Commercial Print</span>
              <span aria-hidden="true">·</span>
              <span>Global Sourcing</span>
            </div>
          </div>

          {/* Right Column: Pexels Blank Billboard Showcase with Interactive Mockup */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
              <span className="font-medium">Outdoor Advertising Mockup</span>
              <div className="flex items-center gap-2 bg-neutral-800 rounded p-1">
                <button
                  type="button"
                  onClick={() => setBillboardView('branded')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    billboardView === 'branded' ? 'bg-white text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Campaign View
                </button>
                <button
                  type="button"
                  onClick={() => setBillboardView('blank')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    billboardView === 'blank' ? 'bg-white text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Blank Billboard
                </button>
              </div>
            </div>

            {/* Pexels Blank Billboard Container */}
            <div className="relative h-[340px] sm:h-[420px] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group">
              <img
                src={billboardImages.blank}
                alt="Outdoor Blank Billboard Mockup on Pexels"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Realistic Campaign Graphic Overlay when 'branded' is active */}
              {billboardView === 'branded' && (
                <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[1px] flex items-center justify-center p-6 animate-fade-in">
                  <div className="bg-neutral-900/90 border border-neutral-700/80 rounded-lg p-6 max-w-sm text-center shadow-2xl space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                      National Billboard Placement
                    </span>
                    <h3 className="text-xl font-black tracking-tight text-white uppercase">
                      BOLANIUS BRANDS
                    </h3>
                    <p className="text-xs text-neutral-300 italic">
                      &ldquo;Building Identities. Expanding Global Opportunities.&rdquo;
                    </p>
                    <div className="pt-2 text-[11px] font-mono text-neutral-400">
                      brands.bolaniusprime.com
                    </div>
                  </div>
                </div>
              )}

              {/* Pexels attribution tag */}
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                <span>Blank Billboard Photo: Pexels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Solutions in Practice (Web Illustrations & Real Photography) */}
      <section id="solutions" className="py-20 px-6 border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Work & Execution
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Brand Solutions in Practice
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              Authentic visual applications across corporate identity, commercial print, packaging, advertising, and international trade operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandSolutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all shadow-sm group"
              >
                <div>
                  <div className="h-56 overflow-hidden bg-neutral-950 relative">
                    <img
                      src={sol.image}
                      alt={sol.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-[11px] font-mono text-white">
                      {sol.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h4 className="text-base font-bold text-white group-hover:underline">
                      {sol.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {sol.description}
                    </p>

                    <div className="pt-3 border-t border-neutral-800 space-y-1">
                      <p className="text-[11px] font-semibold text-neutral-300">Deliverables:</p>
                      {sol.deliverables.slice(0, 3).map((d, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                          <CheckCircle2 className="w-3 h-3 text-neutral-500 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      setConsultData({ ...consultData, service: sol.title });
                      setShowConsultModal(true);
                    }}
                    className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Request Proposal for this Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The 6 Required Service Modules (Prompt Specified) */}
      <section id="services" className="py-20 px-6 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Our 6 Service Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.num}
                  className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-neutral-500">{srv.num}</span>
                      <Icon className="w-5 h-5 text-neutral-400" />
                    </div>
                    <h4 className="text-base font-bold text-white">{srv.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{srv.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setConsultData({ ...consultData, service: srv.title });
                      setShowConsultModal(true);
                    }}
                    className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-medium transition-colors cursor-pointer"
                  >
                    Inquire on {srv.title}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-950 border border-neutral-800 max-w-lg w-full rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setShowConsultModal(false);
                setConsultSubmitted(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {consultSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Consultation Request Received</h4>
                <p className="text-xs text-neutral-400">
                  Thank you, {consultData.name}. Our brand and trade consulting team will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowConsultModal(false);
                    setConsultSubmitted(false);
                  }}
                  className="mt-4 px-4 py-2 bg-white text-neutral-950 text-xs font-bold rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Consult With Our Team</h3>
                  <p className="text-xs text-neutral-400">Tell us about your brand, printing, or trade needs.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Name *</label>
                    <input
                      type="text"
                      required
                      value={consultData.name}
                      onChange={(e) => setConsultData({ ...consultData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Company Name</label>
                    <input
                      type="text"
                      value={consultData.company}
                      onChange={(e) => setConsultData({ ...consultData, company: e.target.value })}
                      placeholder="Company"
                      className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={consultData.email}
                    onChange={(e) => setConsultData({ ...consultData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300">Service Category</label>
                  <select
                    value={consultData.service}
                    onChange={(e) => setConsultData({ ...consultData, service: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                  >
                    <option value="Branding & Identity">Branding & Identity</option>
                    <option value="Printing Solutions">Printing Solutions</option>
                    <option value="Advertising & Publicity">Advertising & Publicity</option>
                    <option value="Business Consultancy">Business Consultancy</option>
                    <option value="General Contracts & Essential Supplies">General Contracts & Essential Supplies</option>
                    <option value="General Merchandise, Import & Export">General Merchandise, Import & Export</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300">Project Brief / Scope</label>
                  <textarea
                    rows={3}
                    value={consultData.notes}
                    onChange={(e) => setConsultData({ ...consultData, notes: e.target.value })}
                    placeholder="Provide details about quantities, requirements, or timelines..."
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Submit Consultation Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="py-12 px-6 border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <p className="text-white font-bold text-sm tracking-wider">BOLANIUS BRANDS</p>
              <p className="text-neutral-500 text-xs mt-0.5">Building Identities. Expanding Global Opportunities.</p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => onNavigate('parent')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home (Bolanius)
              </button>
              <button
                type="button"
                onClick={() => onNavigate('media')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Bolanius Media Studio
              </button>
              <button
                type="button"
                onClick={() => onNavigate('realestate')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Bolanius Real Estate
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
            <p>&copy; {new Date().getFullYear()} Bolanius Brands · brands.bolaniusprime.com</p>
            <p>Corporate Branding · Commercial Print · International Trade</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
