import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SubdomainId } from '../../types';
import { 
  Sparkles, 
  Printer, 
  Megaphone, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  X,
  Mail,
} from 'lucide-react';
import { BRANDS_FOCUSED_SERVICES, OFFICE_CONTACT } from '../../data/ecosystemData';
import { sendEnquiryToEmail, buildMailtoHref } from '../../utils/sendEnquiry';

interface BrandsSiteProps {
  onNavigate: (target: SubdomainId) => void;
}

export const BrandsSite: React.FC<BrandsSiteProps> = ({ onNavigate }) => {
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolledPastHero(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-64px 0px 0px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [consultData, setConsultData] = useState({
    name: '',
    company: '',
    email: '',
    service: 'Brand Identity Design',
    notes: '',
  });

  // 3 Focused Visual Applications
  const brandPillars = [
    {
      id: 'pillar1',
      title: 'Brand Identity & Visual Systems',
      subtitle: '01. Identity Design',
      image: '/src/assets/images/brands_stationery_identity_1794490992255.jpg',
      description: 'Strategic logo design, refined typography palettes, brand specification manuals, and premium executive stationery that command respect.',
      deliverables: ['Custom Logo & Wordmark Design', 'Visual Brand Guidelines & Color Specs', 'Luxury Embossed Business Cards', 'Corporate Letterhead & Stationery'],
    },
    {
      id: 'pillar2',
      title: 'Commercial & Marketing Print',
      subtitle: '02. Precision Printing',
      image: '/src/assets/images/brands_commercial_printing_1794490992577.jpg',
      description: 'Dependable offset and digital printing for corporate profiles, product brochures, exhibition roll-ups, marketing flyers, and specialty packaging.',
      deliverables: ['Company Profiles & Annual Reports', 'Large-Format Roll-Up & Mesh Banners', 'Foil Stamped & Spot UV Cards', 'Event Programs & Marketing Flyers'],
    },
    {
      id: 'pillar3',
      title: 'Outdoor Billboard & Display Creatives',
      subtitle: '03. Promotional Display',
      image: '/src/assets/images/brands_billboard_mockup_1794490992707.jpg',
      description: 'High-impact outdoor billboard creatives, gantry signage mockups, and strategic street-level visibility assets designed for instant recognition.',
      deliverables: ['Outdoor Highway Billboard Creatives', 'Digital Signage & Display Formats', 'Site Mockups & Dimensional Prep', 'Campaign Production Supervision'],
    },
  ];

  const consultSubject = `[Bolanius Brands] Consultation Request - ${consultData.service}`;

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitError(null);

    const result = await sendEnquiryToEmail({
      subject: consultSubject,
      name: consultData.name,
      email: consultData.email,
      fields: {
        Company: consultData.company || 'Not specified',
        Service: consultData.service,
        Details: consultData.notes || 'None',
      },
    });

    setSending(false);
    if (result.ok) {
      setConsultSubmitted(true);
    } else {
      setSubmitError(result.error || 'Could not send consultation request.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f4ef] paper-canvas dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-stone-300/60 dark:selection:bg-neutral-800 transition-colors">
      {/* Brands Sub-Header */}
      <header className="border-b border-stone-200/90 dark:border-neutral-800 bg-[#f9f7f2]/92 backdrop-blur-md dark:bg-neutral-900 sticky top-0 z-30 shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:shadow-none transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('parent')}
              title="Back to Bolanius Prime"
              aria-label="Back to Bolanius Prime"
              className="p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-[#efece4] dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              BOLANIUS BRANDS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400">
            <a href="#services" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Visual Work</a>
            <a href="#contact" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Inquire</a>
          </nav>

          <AnimatePresence>
            {scrolledPastHero && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={() => setShowConsultModal(true)}
                className="px-4 py-2 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer shrink-0"
              >
                Consult With Us
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[460px] sm:min-h-[540px] flex items-end pt-32 pb-16 sm:pb-24 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-950">
        <img
          src="https://images.squarespace-cdn.com/content/v1/629e3bad3644967181ca70d7/c6835389-ceb2-43e1-999e-a1f2d5743a85/branding-for-interior-designers-dan-rak-design-branding-studio-chicago6.jpg"
          alt="Bolanius Brands Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/60 to-neutral-950/25" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Building Identities. Quality Print &amp; Adverts.
            </h1>
            <p className="text-base text-neutral-200 leading-relaxed">
              Design, commercial printing, and outdoor advertising for businesses.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              animate={{ opacity: scrolledPastHero ? 0.15 : 1, y: scrolledPastHero ? -8 : 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={() => setShowConsultModal(true)}
              className="px-6 py-3 rounded bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Request Consultation
            </motion.button>
            <a
              href="#services"
              className="px-6 py-3 rounded bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* 2. Focused 3 Services */}
      <section id="services" className="py-20 px-6 border-b border-stone-200/90 dark:border-neutral-800 bg-[#efece4]/70 dark:bg-neutral-950 transition-colors">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
              Focused Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Our 3 Brand Services
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Clear scope, realistic promises, and meticulous execution across every deliverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Design */}
            <button
              type="button"
              onClick={() => {
                setConsultData({ ...consultData, service: 'Brand Identity Design' });
                setShowConsultModal(true);
              }}
              className="group relative overflow-hidden min-h-[240px] p-8 rounded-xl bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex items-end justify-between text-left transition-all cursor-pointer shadow-sm"
            >
              <img
                src="https://i.ytimg.com/vi/GyBpRLRzbmY/maxresdefault.jpg"
                alt="Design"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/45 to-neutral-950/20" />

              <div className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-white" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Design</h3>
              </div>
              <ArrowRight className="relative z-10 w-5 h-5 text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>

            {/* Service 2: Printing */}
            <button
              type="button"
              onClick={() => {
                setConsultData({ ...consultData, service: 'Commercial & Promotional Printing' });
                setShowConsultModal(true);
              }}
              className="group relative overflow-hidden min-h-[240px] p-8 rounded-xl bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex items-end justify-between text-left transition-all cursor-pointer shadow-sm"
            >
              <img
                src="https://www.printindustry.com/blog/wp-content/uploads/2022/07/online-document-printing-services.png"
                alt="Printing"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/45 to-neutral-950/20" />

              <div className="relative z-10 flex items-center gap-3">
                <Printer className="w-5 h-5 text-white" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Printing</h3>
              </div>
              <ArrowRight className="relative z-10 w-5 h-5 text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>

            {/* Service 3: Adverts */}
            <button
              type="button"
              onClick={() => {
                setConsultData({ ...consultData, service: 'Outdoor & Billboard Display' });
                setShowConsultModal(true);
              }}
              className="group relative overflow-hidden min-h-[240px] p-8 rounded-xl bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex items-end justify-between text-left transition-all cursor-pointer shadow-sm"
            >
              <img
                src="https://stokelyoutdoor.com/wp-content/uploads/2018/03/billboard-advertising-advantages.jpg"
                alt="Adverts"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/45 to-neutral-950/20" />

              <div className="relative z-10 flex items-center gap-3">
                <Megaphone className="w-5 h-5 text-white" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Adverts</h3>
              </div>
              <ArrowRight className="relative z-10 w-5 h-5 text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Visual Work in Practice */}
      <section id="work" className="py-20 px-6 border-b border-stone-200/90 dark:border-neutral-800 bg-[#f6f4ef] paper-canvas dark:bg-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
              Quality in Execution
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Visual Solutions in Practice
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              Concrete examples of our craft across brand identities, print workshops, and outdoor displays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-[#fcfbf7] dark:bg-neutral-900 border border-stone-200/90 dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-stone-300 dark:hover:border-neutral-700 transition-all shadow-[0_2px_10px_rgba(28,25,23,0.05),0_1px_2px_rgba(28,25,23,0.04)] dark:shadow-sm"
              >
                <div>
                  <div className="h-56 overflow-hidden bg-stone-200/60 dark:bg-neutral-950">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">{pillar.subtitle}</span>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="pt-3 border-t border-stone-200/80 dark:border-neutral-800 space-y-1">
                      {pillar.deliverables.map((d, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-3 h-3 text-neutral-400 dark:text-neutral-500 shrink-0" />
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
                      setConsultData({ ...consultData, service: pillar.title });
                      setShowConsultModal(true);
                    }}
                    className="w-full py-2 bg-neutral-950 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 dark:bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fcfbf7] dark:bg-neutral-950 border border-stone-200/90 dark:border-neutral-800 max-w-lg w-full rounded-xl p-6 text-neutral-900 dark:text-neutral-100 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setShowConsultModal(false);
                setConsultSubmitted(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {consultSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Consultation Request Dispatched</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Thank you, {consultData.name}. Our brand team will review your specifications and contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowConsultModal(false);
                    setConsultSubmitted(false);
                  }}
                  className="mt-4 px-4 py-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Consult With Bolanius Brands</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Tell us about your brand identity, print, or billboard project.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Name *</label>
                    <input
                      type="text"
                      required
                      value={consultData.name}
                      onChange={(e) => setConsultData({ ...consultData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Company Name</label>
                    <input
                      type="text"
                      value={consultData.company}
                      onChange={(e) => setConsultData({ ...consultData, company: e.target.value })}
                      placeholder="Business Name"
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={consultData.email}
                    onChange={(e) => setConsultData({ ...consultData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Service Category</label>
                  <select
                    value={consultData.service}
                    onChange={(e) => setConsultData({ ...consultData, service: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                  >
                    <option value="Brand Identity Design">Brand Identity Design</option>
                    <option value="Commercial & Promotional Printing">Commercial & Promotional Printing</option>
                    <option value="Outdoor & Billboard Display">Outdoor & Billboard Display</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Project Scope / Details</label>
                  <textarea
                    rows={3}
                    value={consultData.notes}
                    onChange={(e) => setConsultData({ ...consultData, notes: e.target.value })}
                    placeholder="Provide details about requirements, quantities, or timelines..."
                    className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500 resize-none"
                  />
                </div>

                {submitError && (
                  <div className="p-3 rounded bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-200 space-y-2">
                    <p>{submitError}</p>
                    <a
                      href={buildMailtoHref(consultSubject, {
                        Name: consultData.name,
                        Company: consultData.company || 'Not specified',
                        Email: consultData.email,
                        Service: consultData.service,
                        Details: consultData.notes || 'None',
                      })}
                      className="inline-flex items-center gap-1.5 underline font-semibold text-red-950 dark:text-white dark:hover:text-neutral-200"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via your Email App instead</span>
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-2.5 rounded bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-60 text-white dark:text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {sending ? 'Sending...' : 'Submit Consultation Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="py-12 px-6 border-t border-stone-200/90 dark:border-neutral-800 bg-[#ece8df]/85 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 text-xs transition-colors">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-stone-300/70 dark:border-neutral-800">
            <div>
              <p className="text-neutral-900 dark:text-white font-bold text-sm tracking-wider">BOLANIUS BRANDS</p>
              <p className="text-neutral-500 text-xs mt-0.5">Building Identities. Quality Print & Promotion.</p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => onNavigate('parent')}
                className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                Home (Bolanius)
              </button>
              <button
                type="button"
                onClick={() => onNavigate('media')}
                className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                Bolanius Media Studio
              </button>
              <button
                type="button"
                onClick={() => onNavigate('realestate')}
                className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                Bolanius Real Estate
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
            <p>&copy; {new Date().getFullYear()} Bolanius Brands · brands.bolaniusprime.com</p>
            <p>
              {OFFICE_CONTACT.address} · Call/WhatsApp: {OFFICE_CONTACT.phones.map((p) => p.display).join(', ')} ·{' '}
              <a href={`mailto:${OFFICE_CONTACT.email}`} className="hover:text-neutral-900 dark:hover:text-neutral-300 underline">
                {OFFICE_CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
