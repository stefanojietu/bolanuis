import React, { useState } from 'react';
import { SubdomainId } from '../../types';
import { 
  Camera, 
  Video, 
  Wand2, 
  Film, 
  Share2, 
  CalendarDays, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface MediaStudioSiteProps {
  onNavigate: (target: SubdomainId) => void;
}

interface PortfolioPhoto {
  id: string;
  title: string;
  category: 'portraits' | 'weddings' | 'family' | 'events' | 'videos';
  categoryLabel: string;
  imageUrl: string;
  location?: string;
}

export const MediaStudioSite: React.FC<MediaStudioSiteProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioPhoto | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Portrait Session',
    studioLocation: 'Island Studio (Lekki Phase 1)',
    date: '',
    notes: '',
  });

  // Direct image links from ijeworks.com
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
      location: 'Lagos Wedding',
    },
    {
      id: 'p3',
      title: 'Generational Family Portrait',
      category: 'family',
      categoryLabel: 'Family',
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
      location: 'Celebration',
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
      categoryLabel: 'Family',
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
      title: 'Corporate Brand & Event Session',
      category: 'events',
      categoryLabel: 'Brands & Events',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-23.jpg',
      location: 'Event Coverage',
    },
    {
      id: 'p12',
      title: 'Maternity & New Beginnings',
      category: 'family',
      categoryLabel: 'Family',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Family-4.jpg',
      location: 'Studio Maternity',
    },
    {
      id: 'p13',
      title: 'Sculptural Lighting Monochrome',
      category: 'portraits',
      categoryLabel: 'Portrait Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-6.jpg',
      location: 'Monochrome',
    },
    {
      id: 'p14',
      title: 'Cinematography & Broadcast Film',
      category: 'videos',
      categoryLabel: 'Videos & Cinematography',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-21.jpg',
      location: 'Production Stage',
    },
    {
      id: 'p15',
      title: 'Editorial Creative Direction',
      category: 'portraits',
      categoryLabel: 'Portrait Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-22.jpg',
      location: 'Creative Direction',
    },
    {
      id: 'p16',
      title: 'Contemporary Studio Glamour',
      category: 'portraits',
      categoryLabel: 'Portrait Session',
      imageUrl: 'https://ijeworks.com/wp-content/uploads/2023/05/Portrait-15.jpg',
      location: 'Studio Glamour',
    },
  ];

  // Client brand logos directly from ijeworks.com
  const clientLogos = [
    { name: 'Pepsi', logo: 'https://ijeworks.com/wp-content/uploads/2023/05/PEPSI-400x284.jpg' },
    { name: 'Google', logo: 'https://ijeworks.com/wp-content/uploads/2023/05/GOOGLE-400x284.jpg' },
    { name: 'Netflix', logo: 'https://ijeworks.com/wp-content/uploads/2023/05/NETFLIX-400x284.jpg' },
    { name: 'Paystack', logo: 'https://ijeworks.com/wp-content/uploads/2023/05/paystack-400x284.jpg' },
    { name: 'Techpoint', logo: 'https://ijeworks.com/wp-content/uploads/2023/05/TECHPOINT-400x284.jpg' },
    { name: 'Lagos Business School', logo: 'https://ijeworks.com/wp-content/uploads/2023/05/LBS-400x284.jpg' },
  ];

  // Testimonials with real photos from ijeworks.com
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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-200">
      {/* Studio Sub-Header (Ijeworks Style) */}
      <header className="border-b border-neutral-100 bg-white sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-neutral-900">
              BOLANIUS MEDIA STUDIO
            </span>
            <span className="hidden sm:inline text-xs text-neutral-400 font-mono">
              / media.bolaniusprime.com
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-neutral-600">
            <a href="#pictures" className="hover:text-neutral-950 transition-colors">Pictures</a>
            <a href="#services" className="hover:text-neutral-950 transition-colors">Services</a>
            <a href="#clients" className="hover:text-neutral-950 transition-colors">Clients</a>
            <a href="#testimonials" className="hover:text-neutral-950 transition-colors">Testimonials</a>
            <a href="#studios" className="hover:text-neutral-950 transition-colors">Studios</a>
          </nav>

          <button
            type="button"
            onClick={() => setShowBookingModal(true)}
            className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            Book A Session
          </button>
        </div>
      </header>

      {/* 1. Hero Banner (Ijeworks Style High-Impact Visual Banner) */}
      <section className="relative h-[550px] sm:h-[620px] bg-neutral-950 overflow-hidden">
        <img
          src="https://ijeworks.com/wp-content/uploads/2023/05/Home-Banner-1.jpg"
          alt="Bolanius Media Studio Gallery"
          className="w-full h-full object-cover object-center opacity-85"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold">
              Visual Storytelling & Portrait Studio
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Capturing Moments. Creating Visual Impact.
            </h1>
            <p className="text-sm sm:text-base text-neutral-200 max-w-xl mx-auto font-light leading-relaxed">
              We tell stories through intentional portraits, cinematic love stories, luxury weddings, and commercial imaging for leading brands.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setShowBookingModal(true)}
                className="px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                BOOK A SESSION / GET A QUOTE
              </button>
              <a
                href="#pictures"
                className="px-6 py-3 bg-black/60 hover:bg-black/80 border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                EXPLORE GALLERY
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Highlights (Portrait Sessions, Weddings, Family Cards - Ijeworks Layout) */}
      <section className="py-16 px-6 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              Core Categories
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              What We Love To Document
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Portrait Sessions */}
            <div 
              onClick={() => {
                setActiveTab('portraits');
                document.getElementById('pictures')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-96 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src="https://ijeworks.com/wp-content/uploads/2023/05/Portrait-11.jpg"
                alt="Portrait Sessions"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-neutral-300 font-mono">01. Studio & Outdoor</span>
                <h4 className="text-xl font-bold">PORTRAIT SESSIONS</h4>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  Personal portraits, milestone birthdays, corporate branding headshots, and creative beauty sessions.
                </p>
                <div className="pt-2 text-xs font-semibold flex items-center gap-1 text-white">
                  <span>View Portraits</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 2: Weddings */}
            <div 
              onClick={() => {
                setActiveTab('weddings');
                document.getElementById('pictures')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-96 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src="https://ijeworks.com/wp-content/uploads/2023/05/Wedding-3.jpg"
                alt="Weddings"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-neutral-300 font-mono">02. Love Stories</span>
                <h4 className="text-xl font-bold">WEDDINGS</h4>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  Documenting traditional ceremonies, wedding vows, emotional tears, and unforgettable ballroom receptions.
                </p>
                <div className="pt-2 text-xs font-semibold flex items-center gap-1 text-white">
                  <span>View Weddings</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 3: Family */}
            <div 
              onClick={() => {
                setActiveTab('family');
                document.getElementById('pictures')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-96 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src="https://ijeworks.com/wp-content/uploads/2023/05/Family-Home.jpg"
                alt="Family"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-neutral-300 font-mono">03. Generations</span>
                <h4 className="text-xl font-bold">FAMILY SESSIONS</h4>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  Celebrating milestones, maternity bumps, generational families, and timeless family joy.
                </p>
                <div className="pt-2 text-xs font-semibold flex items-center gap-1 text-white">
                  <span>View Family Work</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filterable Pictures / Gallery Grid (Clean Ijeworks Grid) */}
      <section id="pictures" className="py-20 px-6 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                Our Gallery
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Pictures & Selected Stories
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-lg">
              {[
                { id: 'all', label: 'All Pictures' },
                { id: 'portraits', label: 'Portraits' },
                { id: 'weddings', label: 'Weddings' },
                { id: 'family', label: 'Family' },
                { id: 'events', label: 'Brands & Events' },
                { id: 'videos', label: 'Cinematography' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-neutral-950 text-white font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
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
                className="group relative h-72 sm:h-84 rounded-lg overflow-hidden bg-neutral-100 cursor-pointer shadow-sm hover:shadow-md transition-all"
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

      {/* 4. Our 6 Services Modules (Prompt Specified) */}
      <section id="services" className="py-20 px-6 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Our 6 Media Services
            </h3>
            <p className="text-sm text-neutral-600">
              Comprehensive visual production, storytelling, and professional studio capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1 */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">
                1. Photography & Professional Imaging
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Weddings, engagements, birthdays, studio portraits, corporate/commercial, school, outdoor, lifestyle, and documentary photography.
              </p>
            </div>

            {/* 2 */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">
                2. Videography & Cinematography
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Weddings, corporate events, promotional/commercial videos, documentaries, music videos, interviews, and product videos.
              </p>
            </div>

            {/* 3 */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Wand2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">
                3. Photo Editing & Image Enhancement
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Professional retouching, color correction, background removal/replacement, portrait enhancement, old photo restoration, and print-ready preparation.
              </p>
            </div>

            {/* 4 */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Film className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">
                4. Media Production
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Audio-visual production, corporate documentaries, commercial productions, and creative storytelling.
              </p>
            </div>

            {/* 5 */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">
                5. Digital Content Creation
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Social media video/graphics, short-form video production, and digital promotional campaigns.
              </p>
            </div>

            {/* 6 */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <CalendarDays className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">
                6. Event Coverage
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Full photo and video coverage for corporate, social, religious, educational, and public events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Awesome Clients Strip (Ijeworks Style) */}
      <section id="clients" className="py-16 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              Trusted By
            </h2>
            <h3 className="text-xl font-bold text-neutral-900">
              OUR AWESOME CLIENTS
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {clientLogos.map((client, idx) => (
              <div key={idx} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-center h-20 grayscale hover:grayscale-0 transition-all">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section (Ijeworks Style) */}
      <section id="testimonials" className="py-20 px-6 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-1">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              Words From Our Clients
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              TESTIMONIALS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-white border border-neutral-200 space-y-4 shadow-sm flex flex-col justify-between">
                <p className="text-xs text-neutral-600 leading-relaxed italic">
                  &ldquo;{test.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">{test.name}</h4>
                    <p className="text-[11px] text-neutral-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Studio Locations & Direct Booking CTA (Ijeworks Style) */}
      <section id="studios" className="py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                Visit Us
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Our Studio Locations
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Step into our fully air-conditioned, acoustically treated studio spaces equipped with calibrated Profoto lighting and changing suites.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <MapPin className="w-4 h-4 text-neutral-700" />
                  <span>Island Studio (Lekki Phase 1)</span>
                </div>
                <p className="text-xs text-neutral-600 pl-6">
                  Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                </p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <MapPin className="w-4 h-4 text-neutral-700" />
                  <span>Mainland Studio (Ogudu)</span>
                </div>
                <p className="text-xs text-neutral-600 pl-6">
                  Ogudu GRA, Lagos Mainland, Lagos, Nigeria
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowBookingModal(true)}
                className="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                BOOK YOUR STUDIO SESSION
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
      </section>

      {/* Booking Form Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-neutral-200 max-w-lg w-full rounded-xl p-6 text-neutral-900 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setShowBookingModal(false);
                setBookingSuccess(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-neutral-900">Session Request Dispatched</h4>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Thank you, {formData.name}. Our studio booking manager has received your shoot details for {formData.studioLocation} and will respond within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingModal(false);
                    setBookingSuccess(false);
                  }}
                  className="mt-4 px-6 py-2 bg-neutral-950 text-white text-xs font-bold uppercase rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-neutral-900">BOOK A SESSION / GET A QUOTE</h3>
                  <p className="text-xs text-neutral-500">
                    Schedule a photo or video shoot with Bolanius Media Studio.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 rounded border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full px-3 py-2 rounded border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700">Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950"
                    >
                      <option value="Portrait Session">Portrait Session (Personal / Birthday)</option>
                      <option value="Weddings">Wedding & Engagement</option>
                      <option value="Family Session">Family & Maternity</option>
                      <option value="Corporate Headshots">Corporate & Headshots</option>
                      <option value="Videography & Cinema">Videography & Cinematography</option>
                      <option value="Event Coverage">Event Coverage</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700">Studio Location</label>
                    <select
                      value={formData.studioLocation}
                      onChange={(e) => setFormData({ ...formData, studioLocation: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950"
                    >
                      <option value="Island Studio (Lekki Phase 1)">Island Studio (Lekki Phase 1)</option>
                      <option value="Mainland Studio (Ogudu)">Mainland Studio (Ogudu)</option>
                      <option value="On-Location Shoot">On-Location Shoot</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700">Shoot Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about the occasion, outfit changes, or desired theme..."
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-xs text-neutral-900 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Send Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer (Ijeworks Style) */}
      <footer className="py-12 px-6 bg-neutral-950 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <p className="text-white font-bold text-sm tracking-wider">BOLANIUS MEDIA STUDIO</p>
              <p className="text-neutral-500 text-xs mt-0.5">Capturing Moments. Creating Visual Impact.</p>
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
                onClick={() => onNavigate('brands')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Bolanius Brands
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
            <p>&copy; {new Date().getFullYear()} Bolanius Media Studio · media.bolaniusprime.com</p>
            <p>Lagos Studio · Island & Mainland</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
