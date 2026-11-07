import React, { useState } from 'react';
import { SubdomainId } from '../../types';
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';

interface ParentHubProps {
  onNavigate: (target: SubdomainId) => void;
}

export const ParentHub: React.FC<ParentHubProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    division: 'General Corporate',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const coreValues = [
    { title: 'Excellence', desc: 'Delivering exceptional standards and precision across all operations.' },
    { title: 'Integrity', desc: 'Conducting every business relationship with honesty, transparency, and ethics.' },
    { title: 'Innovation', desc: 'Embracing forward-thinking creative methods and modern industry technologies.' },
    { title: 'Creativity', desc: 'Inspiring visual storytelling and distinctive design solutions.' },
    { title: 'Professionalism', desc: 'Upholding strict punctuality, disciplined execution, and clear communication.' },
    { title: 'Reliability', desc: 'Consistently fulfilling commitments and delivering dependable results.' },
    { title: 'Customer Satisfaction', desc: 'Aligning closely with client goals to exceed expectations in every engagement.' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Hero Section */}
      <section className="border-b border-neutral-800 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
            www.bolaniusprime.com
          </p>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            WELCOME TO BOLANIUS PRIME LIMITED
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto font-normal">
            Your World of Creativity, Business, and Professional Solutions
          </p>

          <div className="inline-block py-2 px-4 rounded-md bg-neutral-900 border border-neutral-800 text-sm text-neutral-300 italic">
            &ldquo;One Vision. Multiple Solutions. Endless Possibilities.&rdquo;
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#divisions"
              className="px-6 py-3 rounded-md bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-200 transition-colors"
            >
              EXPLORE OUR DIVISIONS
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-md bg-neutral-900 border border-neutral-700 text-white font-semibold text-sm hover:bg-neutral-800 transition-colors"
            >
              CONTACT BOLANIUS
            </a>
          </div>
        </div>
      </section>

      {/* Corporate Overview Section */}
      <section className="py-16 px-6 border-b border-neutral-800 bg-neutral-900/40">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            About The Company
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            A Multi-Sector Enterprise Built for Specialized Excellence
          </h3>
          <p className="text-base text-neutral-300 leading-relaxed text-left sm:text-center">
            BOLANIUS PRIME LIMITED is a multi-sector corporate enterprise operating across visual media, brand development, commercial trade, real estate acquisitions, and project execution. Bolanius guides three autonomous business divisions, ensuring every client receives tailored industry expertise backed by corporate dependability.
          </p>
        </div>
      </section>

      {/* Division Selector Cards (Leading to the other 3 sites) */}
      <section id="divisions" className="py-20 px-6 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Our Businesses
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Specialized Sub-Brand Divisions
            </h3>
            <p className="text-sm text-neutral-400">
              Select a division below to enter its dedicated web portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Bolanius Media Studio */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all">
              <div className="h-48 overflow-hidden bg-neutral-950">
                <img
                  src="https://ijeworks.com/wp-content/uploads/2023/05/Home-Banner-1.jpg"
                  alt="Bolanius Media Studio"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-neutral-400">media.bolaniusprime.com</div>
                  <h4 className="text-xl font-bold text-white">Bolanius Media Studio</h4>
                  <p className="text-xs text-neutral-400 italic">
                    &ldquo;Capturing Moments. Creating Visual Impact.&rdquo;
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Visual storytelling, photography, videography, media production, content creation, and professional image retouching.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('media')}
                  className="w-full py-2.5 px-4 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Open Media Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Bolanius Brands */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all">
              <div className="h-48 overflow-hidden bg-neutral-950">
                <img
                  src="https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Bolanius Brands Billboard & Advertising"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-neutral-400">brands.bolaniusprime.com</div>
                  <h4 className="text-xl font-bold text-white">Bolanius Brands</h4>
                  <p className="text-xs text-neutral-400 italic">
                    &ldquo;Building Identities. Expanding Global Opportunities.&rdquo;
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Corporate branding, printing solutions, advertising campaigns, business consultancy, general contracts, and import/export trade.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('brands')}
                  className="w-full py-2.5 px-4 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Open Bolanius Brands</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Bolanius Real Estate */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all">
              <div className="h-48 overflow-hidden bg-neutral-950">
                <img
                  src="/src/assets/images/realestate_luxury_property_1794079392405.jpg"
                  alt="Bolanius Real Estate"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-neutral-400">realestate.bolaniusprime.com</div>
                  <h4 className="text-xl font-bold text-white">Bolanius Real Estate</h4>
                  <p className="text-xs text-neutral-400 italic">
                    &ldquo;Connecting People to Properties. Delivering Projects with Purpose.&rdquo;
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Property sales, land acquisition, property management, real estate investment, and commercial project management.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('realestate')}
                  className="w-full py-2.5 px-4 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Open Real Estate Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Identity Section: Mission, Vision, Values */}
      <section className="py-20 px-6 border-b border-neutral-800 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Corporate Identity
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Mission, Vision & Core Values
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
              <h4 className="text-lg font-bold text-white">Our Mission</h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                To deliver innovative, dependable, and high-quality products and services that create value, solve problems, and exceed customer expectations across different industries.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
              <h4 className="text-lg font-bold text-white">Our Vision</h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                To become a leading and internationally recognized multi-sector company known for excellence, innovation, integrity, and outstanding business solutions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-bold text-white text-center">Core Values</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {coreValues.map((val) => (
                <div key={val.title} className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
                  <div className="text-sm font-semibold text-white">{val.title}</div>
                  <div className="text-xs text-neutral-400 leading-relaxed">{val.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-b border-neutral-800">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Get in Touch
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Contact Bolanius
            </h3>
            <p className="text-sm text-neutral-400">
              Have an inquiry or corporate proposal? Send a message directly to Bolanius headquarters.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Sent</h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Thank you for contacting BOLANIUS PRIME LIMITED. Our team will review your message and reply promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', division: 'General Corporate', message: '' });
                  }}
                  className="mt-4 px-4 py-2 rounded bg-neutral-800 text-xs text-white hover:bg-neutral-700 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300">Division of Interest</label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-500"
                  >
                    <option value="General Corporate">General Corporate Inquiry</option>
                    <option value="Bolanius Media Studio">Bolanius Media Studio</option>
                    <option value="Bolanius Brands">Bolanius Brands</option>
                    <option value="Bolanius Real Estate">Bolanius Real Estate</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry..."
                    className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Send Inquiry to Bolanius
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="py-8 px-6 text-center text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} BOLANIUS PRIME LIMITED. All rights reserved.</p>
        <p className="mt-1">One Vision. Multiple Solutions. Endless Possibilities.</p>
      </footer>
    </div>
  );
};
