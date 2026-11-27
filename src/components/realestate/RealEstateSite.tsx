import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SubdomainId } from '../../types';
import { MapPin, CheckCircle2, ArrowRight, ArrowLeft, X, Building2, Key, Search, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { OFFICE_CONTACT } from '../../data/ecosystemData';
import { OfficeLocationMap } from '../shared/OfficeLocationMap';
import { sendEnquiryToEmail, buildMailtoHref } from '../../utils/sendEnquiry';

interface RealEstateSiteProps {
  onNavigate: (target: SubdomainId) => void;
}

export const RealEstateSite: React.FC<RealEstateSiteProps> = ({ onNavigate }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
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
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyTitle: '',
    preferredDate: '',
    notes: '',
  });

  const inquirySubject = `[Bolanius Real Estate] Property Inquiry - ${inquiryData.propertyTitle || 'General'}`;

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitError(null);

    const result = await sendEnquiryToEmail({
      subject: inquirySubject,
      name: inquiryData.name,
      email: inquiryData.email,
      fields: {
        Subject: inquiryData.propertyTitle || 'General Property Inquiry',
        Phone: inquiryData.phone,
        'Preferred Date': inquiryData.preferredDate || 'Not specified',
        Notes: inquiryData.notes || 'None',
      },
    });

    setSending(false);
    if (result.ok) {
      setInquirySubmitted(true);
    } else {
      setSubmitError(result.error || 'Could not send inspection request.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f4ef] paper-canvas dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-stone-300/60 dark:selection:bg-neutral-800 transition-colors">
      {/* Real Estate Sub-Header */}
      <header className="border-b border-stone-200/90 dark:border-neutral-800 bg-[#f9f7f2]/92 backdrop-blur-md dark:bg-neutral-950 sticky top-0 z-30 shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:shadow-none transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('parent')}
              title="Back to Bolanius Prime"
              aria-label="Back to Bolanius Prime"
              className="p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-[#efece4] dark:hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              BOLANIUS REAL ESTATE
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400">
            <a href="#services" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Services</a>
            <a href="#properties-grid" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Contact Us</a>
            <a href="#contact" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Office Info</a>
          </nav>

          <AnimatePresence>
            {scrolledPastHero && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={() => {
                  setInquiryData({ ...inquiryData, propertyTitle: 'General Property Consultation' });
                  setShowInquiryModal(true);
                }}
                className="px-4 py-2 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer shrink-0"
              >
                Schedule Inspection
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[480px] sm:min-h-[560px] flex items-end pt-36 pb-16 sm:pb-24 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-950">
        <img
          src="https://framerusercontent.com/images/qAiNcohC0fIeyIc6Rd5eLX21B70.png?scale-down-to=1024&width=4032&height=2268"
          alt="Bolanius Real Estate Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/55 to-neutral-950/20" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Find Good Properties Across Lagos &amp; Nigeria.
            </h1>
            <p className="text-base text-neutral-200 leading-relaxed">
              Verified residential and commercial properties.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="#properties-grid"
              className="px-6 py-3 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Contact Us
            </a>
            <motion.button
              type="button"
              animate={{ opacity: scrolledPastHero ? 0.15 : 1, y: scrolledPastHero ? -8 : 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={() => {
                setInquiryData({ ...inquiryData, propertyTitle: 'General Property Consultation' });
                setShowInquiryModal(true);
              }}
              className="px-6 py-3 rounded-md bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Book Inspection
            </motion.button>
          </div>
        </div>
      </section>

      {/* 2. The 3 Focused Real Estate Services */}
      <section id="services" className="py-20 px-6 border-b border-stone-200/90 dark:border-neutral-800 bg-[#efece4]/70 dark:bg-neutral-900/30 transition-colors">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
              Focused Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Our 3 Real Estate Services
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Clear scope, realistic promises, and rigorous title screening to protect your investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tile 1: Sell */}
            <button
              type="button"
              onClick={() => {
                setInquiryData({ ...inquiryData, propertyTitle: 'Property Purchase & Sales Inquiry' });
                setShowInquiryModal(true);
              }}
              className="group relative overflow-hidden min-h-[220px] p-8 rounded-xl bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex items-end justify-between text-left transition-all cursor-pointer shadow-sm"
            >
              <img
                src="/src/assets/images/realestate_modern_terrace_1794490990804.jpg"
                alt="Sell"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/45 to-neutral-950/25" />

              <div className="relative z-10 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-white" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Sell</h3>
              </div>
              <ArrowRight className="relative z-10 w-5 h-5 text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>

            {/* Tile 2: Lease */}
            <button
              type="button"
              onClick={() => {
                setInquiryData({ ...inquiryData, propertyTitle: 'Rental & Lease Advisory' });
                setShowInquiryModal(true);
              }}
              className="group relative overflow-hidden min-h-[220px] p-8 rounded-xl bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex items-end justify-between text-left transition-all cursor-pointer shadow-sm"
            >
              <img
                src="/src/assets/images/hero_parent_corporate_1794079391856.jpg"
                alt="Lease"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/45 to-neutral-950/25" />

              <div className="relative z-10 flex items-center gap-3">
                <Key className="w-5 h-5 text-white" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Lease</h3>
              </div>
              <ArrowRight className="relative z-10 w-5 h-5 text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>

            {/* Tile 3: Inspect */}
            <button
              type="button"
              onClick={() => {
                setInquiryData({ ...inquiryData, propertyTitle: 'Site Inspection Booking' });
                setShowInquiryModal(true);
              }}
              className="group relative overflow-hidden min-h-[220px] p-8 rounded-xl bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 flex items-end justify-between text-left transition-all cursor-pointer shadow-sm"
            >
              <img
                src="/src/assets/images/realestate_estate_land_1794490991219.jpg"
                alt="Inspect"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/45 to-neutral-950/25" />

              <div className="relative z-10 flex items-center gap-3">
                <Search className="w-5 h-5 text-white" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Inspect</h3>
              </div>
              <ArrowRight className="relative z-10 w-5 h-5 text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Direct Contact & Property Requests */}
      <section id="properties-grid" className="py-20 px-6 border-b border-stone-200/90 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
              Property Requests &amp; Advisory
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Contact Us Today
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Reach out directly to our Lagos property desk for verified available options, pricing, and private site inspections tailored to your budget and preferred location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#fcfbf7] dark:bg-neutral-900 border border-stone-200/90 dark:border-neutral-800 shadow-[0_2px_8px_rgba(28,25,23,0.04)] dark:shadow-none space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <Phone className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span>Call / WhatsApp</span>
              </div>
              <div className="space-y-2 text-sm text-neutral-900 dark:text-white font-medium">
                {OFFICE_CONTACT.phones.map((phone) => (
                  <div key={phone.display} className="flex items-center justify-between gap-2">
                    <a href={`tel:${phone.tel}`} className="hover:underline">
                      {phone.display}
                    </a>
                    <a
                      href={`https://wa.me/${phone.wa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#fcfbf7] dark:bg-neutral-900 border border-stone-200/90 dark:border-neutral-800 shadow-[0_2px_8px_rgba(28,25,23,0.04)] dark:shadow-none space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <a
                    href={OFFICE_CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open office location on your device"
                    title="Open location on your device"
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#efece4] dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-950 dark:hover:bg-white hover:text-white dark:hover:text-neutral-950 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                  <span>Visit Our Office</span>
                </div>
                <a
                  href={OFFICE_CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white underline"
                >
                  <span>Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                {OFFICE_CONTACT.address}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#fcfbf7] dark:bg-neutral-900 border border-stone-200/90 dark:border-neutral-800 shadow-[0_2px_8px_rgba(28,25,23,0.04)] dark:shadow-none space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <Mail className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span>Email Us</span>
              </div>
              <a
                href={`mailto:${OFFICE_CONTACT.email}`}
                className="text-sm text-neutral-900 dark:text-white font-medium hover:underline break-all inline-block"
              >
                {OFFICE_CONTACT.email}
              </a>
            </div>
          </div>

          <OfficeLocationMap />

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setInquiryData({ ...inquiryData, propertyTitle: 'General Property Inquiry' });
                setShowInquiryModal(true);
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Send Property Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Inquiry / Viewing Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 dark:bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fcfbf7] dark:bg-neutral-950 border border-stone-200/90 dark:border-neutral-800 max-w-lg w-full rounded-xl p-6 text-neutral-900 dark:text-neutral-100 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setShowInquiryModal(false);
                setInquirySubmitted(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Inspection Request Received</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Thank you, {inquiryData.name}. Our property advisor will contact you to coordinate the date and time.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowInquiryModal(false);
                    setInquirySubmitted(false);
                  }}
                  className="mt-4 px-4 py-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Schedule Inspection / Consultation</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Connect with our verified property advisory desk.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Property / Inquiry Subject</label>
                  <input
                    type="text"
                    value={inquiryData.propertyTitle}
                    onChange={(e) => setInquiryData({ ...inquiryData, propertyTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Name *</label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Preferred Inspection Date</label>
                    <input
                      type="date"
                      value={inquiryData.preferredDate}
                      onChange={(e) => setInquiryData({ ...inquiryData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Requirements or Questions</label>
                  <textarea
                    rows={3}
                    value={inquiryData.notes}
                    onChange={(e) => setInquiryData({ ...inquiryData, notes: e.target.value })}
                    placeholder="Specific questions regarding title, access, or payment terms..."
                    className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500 resize-none"
                  />
                </div>

                {submitError && (
                  <div className="p-3 rounded bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-200 space-y-2">
                    <p>{submitError}</p>
                    <a
                      href={buildMailtoHref(inquirySubject, {
                        Subject: inquiryData.propertyTitle || 'General Property Inquiry',
                        Name: inquiryData.name,
                        Phone: inquiryData.phone,
                        Email: inquiryData.email,
                        'Preferred Date': inquiryData.preferredDate || 'Not specified',
                        Notes: inquiryData.notes || 'None',
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
                  {sending ? 'Sending...' : 'Send Inspection Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="py-8 px-6 text-center text-xs text-neutral-500 bg-[#ece8df]/85 dark:bg-transparent border-t border-stone-200/90 dark:border-neutral-800 space-y-1.5">
        <p>&copy; {new Date().getFullYear()} Bolanius Real Estate · realestate.bolaniusprime.com</p>
        <p>{OFFICE_CONTACT.address}</p>
        <p>
          Call / WhatsApp: {OFFICE_CONTACT.phones.map((p) => p.display).join(', ')} ·{' '}
          <a href={`mailto:${OFFICE_CONTACT.email}`} className="hover:text-neutral-900 dark:hover:text-neutral-300 underline">
            {OFFICE_CONTACT.email}
          </a>
        </p>
        <button
          type="button"
          onClick={() => onNavigate('parent')}
          className="mt-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white underline cursor-pointer"
        >
          Return to Home (Bolanius)
        </button>
      </footer>
    </div>
  );
};
