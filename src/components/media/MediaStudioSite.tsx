import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SubdomainId } from '../../types';
import { 
  Camera, 
  Heart, 
  Sparkles, 
  X, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { MEDIA_FOCUSED_SERVICES, OFFICE_CONTACT } from '../../data/ecosystemData';
import { OfficeLocationMap } from '../shared/OfficeLocationMap';
import { sendEnquiryToEmail, buildMailtoHref } from '../../utils/sendEnquiry';
import mediaFramingImg from '../../assets/images/media_framing_lagos.jpg';

interface MediaStudioSiteProps {
  onNavigate: (target: SubdomainId) => void;
}

interface PortfolioPhoto {
  id: string;
  title: string;
  category: 'portraits' | 'weddings' | 'family';
  categoryLabel: string;
  imageUrl: string;
  location?: string;
}

export const MediaStudioSite: React.FC<MediaStudioSiteProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioPhoto | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);
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

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Portrait Session',
    studioLocation: 'Main Studio (Egan, Igando, Lagos)',
    date: '',
    notes: '',
  });

  // Curated photography showcase from ijeworks
  const photos: PortfolioPhoto[] = [
    {
      id: 'p1',
      title: 'Studio Beauty & Editorial Portrait',
      category: 'portraits',
      categoryLabel: 'Portrait Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-11.jpg',
      location: 'Studio Session',
    },
    {
      id: 'p2',
      title: 'Royal Union & Wedding Moments',
      category: 'weddings',
      categoryLabel: 'Weddings',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Wedding-3.jpg',
      location: 'Wedding Ceremony',
    },
    {
      id: 'p3',
      title: 'Generational Family Portrait',
      category: 'family',
      categoryLabel: 'Family Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Family-Home.jpg',
      location: 'Family Studio',
    },
    {
      id: 'p4',
      title: 'Executive Headshot & Personal Branding',
      category: 'portraits',
      categoryLabel: 'Corporate Headshot',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-16.jpg',
      location: 'Corporate Studio',
    },
    {
      id: 'p5',
      title: 'Traditional Bridal Elegance',
      category: 'weddings',
      categoryLabel: 'Weddings',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Wedding-1.jpg',
      location: 'Traditional Rites',
    },
    {
      id: 'p6',
      title: 'Milestone Birthday & Fine Art',
      category: 'portraits',
      categoryLabel: 'Portrait Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-2.jpg',
      location: 'Studio Milestone',
    },
    {
      id: 'p7',
      title: 'Family Bond & Joyful Moments',
      category: 'family',
      categoryLabel: 'Family Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Family-3.jpg',
      location: 'Outdoor Session',
    },
    {
      id: 'p8',
      title: 'Modern High-Fashion Studio',
      category: 'portraits',
      categoryLabel: 'Portrait Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-17.jpg',
      location: 'Fashion Studio',
    },
    {
      id: 'p9',
      title: 'Timeless Couple Wedding Portrait',
      category: 'weddings',
      categoryLabel: 'Weddings',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Wedding-2.jpg',
      location: 'Reception',
    },
    {
      id: 'p10',
      title: 'Warm Natural Light Beauty',
      category: 'portraits',
      categoryLabel: 'Portrait Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-19.jpg',
      location: 'Ambient Light',
    },
    {
      id: 'p11',
      title: 'Maternity & New Beginnings',
      category: 'family',
      categoryLabel: 'Family Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Family-4.jpg',
      location: 'Studio Maternity',
    },
    {
      id: 'p12',
      title: 'Sculptural Monochrome Portrait',
      category: 'portraits',
      categoryLabel: 'Portrait Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-6.jpg',
      location: 'Monochrome',
    },
  ];

  const testimonials = [
    {
      name: 'Emmanuel Iren',
      avatar: 'https://ijeworks.com/wp-content/uploads/2023/05/Emmanuel-Iren.png',
      role: 'Author & Lead Pastor',
      text: 'Bolanius Media Studio captured our vision with world-class excellence. The lighting, warmth, and attention to detail make every frame look extraordinary.',
    },
    {
      name: 'Pascal Ekeh',
      avatar: 'https://ijeworks.com/wp-content/uploads/2023/05/Pascal.png',
      role: 'Creative Director',
      text: 'The best portrait and storytelling experience we have had. The team makes you comfortable and delivers print-ready masterpieces.',
    },
    {
      name: 'Sarah Kassim',
      avatar: 'https://ijeworks.com/wp-content/uploads/2023/05/Sarah.png',
      role: 'Brand Consultant',
      text: 'Timeless photographs. The studio environment is top notch, and the turnaround time exceeded all expectations.',
    },
  ];

  const filteredPhotos = activeTab === 'all'
    ? photos
    : photos.filter((p) => p.category === activeTab);

  const bookingSubject = `[Bolanius Media Studio] Booking Request - ${formData.service}`;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitError(null);

    const result = await sendEnquiryToEmail({
      subject: bookingSubject,
      name: formData.name,
      email: formData.email,
      fields: {
        Phone: formData.phone,
        Service: formData.service,
        Location: formData.studioLocation,
        'Preferred Date': formData.date || 'Not specified',
        Notes: formData.notes || 'None',
      },
    });

    setSending(false);
    if (result.ok) {
      setBookingSuccess(true);
    } else {
      setSubmitError(result.error || 'Could not send booking request.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f4ef] paper-canvas dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-stone-300/60 dark:selection:bg-neutral-800 transition-colors">
      {/* Studio Sub-Header */}
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
              BOLANIUS MEDIA STUDIO
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400">
            <a href="#services" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Our 3 Services</a>
            <a href="#pictures" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Gallery</a>
            <a href="#testimonials" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Testimonials</a>
            <a href="#studios" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Studios</a>
          </nav>

          <AnimatePresence>
            {scrolledPastHero && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={() => setShowBookingModal(true)}
                className="px-4 py-2 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer shrink-0"
              >
                Book A Session
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* 1. Hero Banner */}
      <section ref={heroRef} className="relative h-[520px] sm:h-[580px] bg-neutral-950 overflow-hidden">
        <img
          src="https://ijeworks.com/wp-content/uploads/2023/05/Home-Banner-1.jpg"
          alt="Bolanius Media Studio Gallery"
          className="w-full h-full object-cover object-center opacity-85"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block px-3 py-1 rounded bg-black/60 border border-white/20 text-neutral-300 text-xs font-mono uppercase tracking-widest">
              Flagship Business · Photography & Portrait Studio
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Capturing Moments. Creating Visual Impact.
            </h1>
            <p className="text-sm sm:text-base text-neutral-200 max-w-xl mx-auto font-light leading-relaxed">
              We focus on what we do best: creating timeless portraits, documenting intimate weddings, and delivering magazine-grade retouching that endures.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <motion.button
                type="button"
                animate={{ opacity: scrolledPastHero ? 0.15 : 1, y: scrolledPastHero ? -8 : 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={() => setShowBookingModal(true)}
                className="px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Book A Session
              </motion.button>
              <a
                href="#pictures"
                className="px-6 py-3 bg-black/60 hover:bg-black/80 border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                View Selected Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Focused 3 Services Section */}
      <section id="services" className="py-20 px-6 border-b border-stone-200/90 dark:border-neutral-800 bg-[#efece4]/70 dark:bg-neutral-900/40 transition-colors">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
              Focused Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Our 3 Core Photography Services
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              We concentrate our energy on 3 signature services to deliver world-class imagery with zero compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Portraits */}
            <div className="group relative overflow-hidden p-8 rounded-xl bg-neutral-950 border border-neutral-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <img
                src="https://ijeworks.com/wp-content/uploads/2023/05/Portrait-11.jpg"
                alt="Portrait & Studio Sessions"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/80 to-neutral-950/65" />

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-300">01. Signature Studio</span>
                  <h3 className="text-lg font-bold text-white mt-1">Portrait & Studio Sessions</h3>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  Personal branding portraits, milestone birthdays, corporate executive headshots, and creative beauty sessions in our calibrated studio environments.
                </p>
                <ul className="space-y-2 pt-2 border-t border-white/15 text-xs text-neutral-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Profoto studio strobe lighting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Outfit changes & styling advice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Private viewing proof gallery</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, service: 'Portrait Session' });
                  setShowBookingModal(true);
                }}
                className="relative z-10 w-full mt-6 py-2.5 rounded bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Book Portrait Session
              </button>
            </div>

            {/* Service 2: Weddings */}
            <div className="group relative overflow-hidden p-8 rounded-xl bg-neutral-950 border border-neutral-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <img
                src="https://ijeworks.com/wp-content/uploads/2023/05/Wedding-3.jpg"
                alt="Weddings & Celebrations"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/80 to-neutral-950/65" />

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-300">02. Love Stories</span>
                  <h3 className="text-lg font-bold text-white mt-1">Weddings & Celebrations</h3>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  Documenting traditional marriage rites, wedding vows, emotional tears, and unforgettable ballroom receptions with candid intimacy.
                </p>
                <ul className="space-y-2 pt-2 border-t border-white/15 text-xs text-neutral-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Traditional & white wedding coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Couple portrait sessions on-site</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>High-resolution master digital archive</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, service: 'Weddings' });
                  setShowBookingModal(true);
                }}
                className="relative z-10 w-full mt-6 py-2.5 rounded bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Inquire on Wedding Date
              </button>
            </div>

            {/* Service 3: Retouching & Framing */}
            <div className="group relative overflow-hidden p-8 rounded-xl bg-neutral-950 border border-neutral-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <img
                src={mediaFramingImg}
                alt="High-End Retouching & Framing"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/80 to-neutral-950/65" />

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-300">03. Post-Production & Craft</span>
                  <h3 className="text-lg font-bold text-white mt-1">High-End Retouching & Framing</h3>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  Magazine-grade skin retouching, color grading that preserves authentic skin tones, and museum-quality canvas and acrylic framing.
                </p>
                <ul className="space-y-2 pt-2 border-t border-white/15 text-xs text-neutral-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Texture-preserving beauty retouching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Old photograph restoration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Premium archival canvas prints & framing</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, service: 'High-End Retouching' });
                  setShowBookingModal(true);
                }}
                className="relative z-10 w-full mt-6 py-2.5 rounded bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Request Retouching
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filterable Pictures / Gallery Grid */}
      <section id="pictures" className="py-20 px-6 border-b border-stone-200/90 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
                Portfolio Showcase
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                Pictures & Selected Stories
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#eae6dc] dark:bg-neutral-900 border border-stone-200/80 dark:border-neutral-800 rounded-lg">
              {[
                { id: 'all', label: 'All Pictures' },
                { id: 'portraits', label: 'Portraits' },
                { id: 'weddings', label: 'Weddings' },
                { id: 'family', label: 'Family & Milestones' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative h-72 sm:h-84 rounded-lg overflow-hidden bg-[#eae6dc] dark:bg-neutral-900 cursor-pointer shadow-[0_2px_8px_rgba(28,25,23,0.06)] hover:shadow-md transition-all"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                    {photo.categoryLabel}
                  </p>
                  <h4 className="text-xs sm:text-sm font-bold truncate">
                    {photo.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-950 border border-neutral-800 max-w-3xl w-full rounded-xl overflow-hidden relative max-h-[90vh] flex flex-col text-white">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <span className="text-xs font-mono uppercase text-neutral-400">
                {selectedPhoto.categoryLabel}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="text-neutral-400 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-black flex items-center justify-center max-h-[500px]">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[500px] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedPhoto.title}</h3>
                  <p className="text-xs text-neutral-400">{selectedPhoto.location}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(null);
                    setShowBookingModal(true);
                  }}
                  className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Book A Session Like This
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 border-b border-stone-200/90 dark:border-neutral-800 bg-[#efece4]/70 dark:bg-neutral-900/30 transition-colors">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
              Client Feedback
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Words From Our Clients
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-[#fcfbf7] dark:bg-neutral-900 border border-stone-200/90 dark:border-neutral-800 space-y-4 shadow-[0_2px_10px_rgba(28,25,23,0.05),0_1px_2px_rgba(28,25,23,0.04)] dark:shadow-sm flex flex-col justify-between">
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                  &ldquo;{test.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-200/70 dark:border-neutral-800">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border border-stone-200 dark:border-neutral-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{test.name}</h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Studio Location & Contact */}
      <section id="studios" className="py-20 px-6 border-b border-stone-200/90 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
                Studio &amp; Office
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                Visit Our Lagos Studio
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Step into our air-conditioned studio space equipped with calibrated Profoto lighting, or contact our booking desk directly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#fcfbf7] dark:bg-neutral-900 border border-stone-200/90 dark:border-neutral-800 shadow-[0_1px_4px_rgba(28,25,23,0.04)] dark:shadow-none space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                    <a
                      href={OFFICE_CONTACT.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open studio location on your device"
                      title="Open location on your device"
                      className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-neutral-900 dark:bg-neutral-800 text-white hover:bg-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 transition-colors shrink-0"
                    >
                      <MapPin className="w-4 h-4" />
                    </a>
                    <span>Office &amp; Studio Address</span>
                  </div>
                  <a
                    href={OFFICE_CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white underline shrink-0"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 pl-9">
                  {OFFICE_CONTACT.address}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#fcfbf7] dark:bg-neutral-900 border border-stone-200/90 dark:border-neutral-800 shadow-[0_1px_4px_rgba(28,25,23,0.04)] dark:shadow-none space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                  <Phone className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0" />
                  <span>Call / WhatsApp</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 pl-6">
                  {OFFICE_CONTACT.phones.map((p, idx) => (
                    <React.Fragment key={p.display}>
                      {idx > 0 && ', '}
                      <a href={`tel:${p.tel}`} className="hover:underline text-neutral-800 dark:text-white font-medium">
                        {p.display}
                      </a>
                    </React.Fragment>
                  ))}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#fcfbf7] dark:bg-neutral-900 border border-stone-200/90 dark:border-neutral-800 shadow-[0_1px_4px_rgba(28,25,23,0.04)] dark:shadow-none space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                  <Mail className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0" />
                  <span>Email</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 pl-6">
                  <a href={`mailto:${OFFICE_CONTACT.email}`} className="hover:underline text-neutral-800 dark:text-white font-medium">
                    {OFFICE_CONTACT.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowBookingModal(true)}
                className="px-6 py-3 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Book Your Studio Session
              </button>
            </div>
          </div>

          <div className="h-80 sm:h-96 rounded-xl overflow-hidden shadow-md">
            <img
              src="https://ijeworks.com/wp-content/uploads/2023/05/Home-Banner-2.jpg"
              alt="Bolanius Media Studio Interior"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10">
          <OfficeLocationMap />
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 dark:bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fcfbf7] dark:bg-neutral-950 border border-stone-200/90 dark:border-neutral-800 max-w-lg w-full rounded-xl p-6 text-neutral-900 dark:text-neutral-100 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setShowBookingModal(false);
                setBookingSuccess(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Session Request Received</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                  Thank you, {formData.name}. Our studio booking manager has received your shoot details for {formData.studioLocation} and will confirm your session shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingModal(false);
                    setBookingSuccess(false);
                  }}
                  className="mt-4 px-6 py-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold uppercase rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">BOOK A STUDIO SESSION</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Schedule a portrait session or inquire about wedding photography.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    >
                      <option value="Portrait Session">Portrait Session (Personal / Birthday)</option>
                      <option value="Weddings">Wedding & Celebration</option>
                      <option value="Corporate Headshots">Corporate & Executive Headshot</option>
                      <option value="High-End Retouching">High-End Retouching & Framing</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Location</label>
                    <select
                      value={formData.studioLocation}
                      onChange={(e) => setFormData({ ...formData, studioLocation: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                    >
                      <option value="Main Studio (Egan, Igando, Lagos)">Main Studio (Egan, Igando, Lagos)</option>
                      <option value="On-Location Shoot">On-Location Shoot</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Shoot Details / Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about the occasion, outfit changes, or desired style..."
                    className="w-full px-3 py-2 rounded bg-[#fffefb] dark:bg-neutral-900 border border-stone-300/90 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-500 resize-none"
                  />
                </div>

                {submitError && (
                  <div className="p-3 rounded bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-200 space-y-2">
                    <p>{submitError}</p>
                    <a
                      href={buildMailtoHref(bookingSubject, {
                        Name: formData.name,
                        Phone: formData.phone,
                        Email: formData.email,
                        Service: formData.service,
                        Location: formData.studioLocation,
                        'Preferred Date': formData.date || 'Not specified',
                        Notes: formData.notes || 'None',
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
                  className="w-full py-3 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-60 text-white dark:text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  {sending ? 'Sending...' : 'Send Booking Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#ece8df]/85 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 text-xs border-t border-stone-200/90 dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-stone-300/70 dark:border-neutral-800">
            <div>
              <p className="text-neutral-900 dark:text-white font-bold text-sm tracking-wider">BOLANIUS MEDIA STUDIO</p>
              <p className="text-neutral-500 text-xs mt-0.5">Capturing Moments. Creating Visual Impact.</p>
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
                onClick={() => onNavigate('brands')}
                className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                Bolanius Brands
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
            <p>&copy; {new Date().getFullYear()} Bolanius Media Studio · media.bolaniusprime.com</p>
            <p>
              {OFFICE_CONTACT.address} · Call/WhatsApp: {OFFICE_CONTACT.phones.map((p) => p.display).join(', ')} · {OFFICE_CONTACT.email}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
