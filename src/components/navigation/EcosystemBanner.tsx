import React, { useState } from 'react';
import { SubdomainId } from '../../types';
import { Menu, X } from 'lucide-react';

interface EcosystemBannerProps {
  currentSubdomain: SubdomainId;
  onNavigate: (target: SubdomainId) => void;
}

export const EcosystemBanner: React.FC<EcosystemBannerProps> = ({
  currentSubdomain,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: SubdomainId; label: string; domain: string }[] = [
    { id: 'parent', label: 'Home', domain: 'www.bolaniusprime.com' },
    { id: 'media', label: 'Media Studio', domain: 'media.bolaniusprime.com' },
    { id: 'brands', label: 'Bolanius Brands', domain: 'brands.bolaniusprime.com' },
    { id: 'realestate', label: 'Real Estate', domain: 'realestate.bolaniusprime.com' },
  ];

  const handleMobileNav = (id: SubdomainId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800 text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand identity on left */}
        <button
          type="button"
          onClick={() => {
            onNavigate('parent');
            setMobileMenuOpen(false);
          }}
          className="text-sm font-bold tracking-tight text-white hover:text-neutral-300 transition-colors cursor-pointer text-left shrink-0"
        >
          BOLANIUS PRIME LIMITED
        </button>

        {/* Desktop Navigation (visible on md screens and larger) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-xs font-medium py-1">
          {navItems.map((item, index) => {
            const isActive = currentSubdomain === item.id;
            return (
              <React.Fragment key={item.id}>
                {index > 0 && (
                  <span className="text-neutral-600 select-none px-1" aria-hidden="true">
                    |
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-neutral-950 font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {item.label}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Mobile Sandwich (Hamburger) Button (visible on smaller screens) */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sandwich Dropdown Menu for Smaller Screens */}
      {mobileMenuOpen && (
        <nav 
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-3 space-y-1 animate-fade-in shadow-xl"
        >
          {navItems.map((item) => {
            const isActive = currentSubdomain === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMobileNav(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-white text-neutral-950 font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-[10px] font-mono ${isActive ? 'text-neutral-600' : 'text-neutral-500'}`}>
                  {item.domain}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
