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

  const navItems: { id: SubdomainId; label: string }[] = [
    { id: 'parent', label: 'Home' },
    { id: 'media', label: 'Media Studio' },
    { id: 'brands', label: 'Bolanius Brands' },
    { id: 'realestate', label: 'Real Estate' },
  ];

  const handleMobileNav = (id: SubdomainId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f9f7f2]/92 backdrop-blur-md dark:bg-neutral-900 border-b border-stone-200/90 dark:border-neutral-800 shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:shadow-none text-neutral-700 dark:text-neutral-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand identity on left */}
        <button
          type="button"
          onClick={() => {
            onNavigate('parent');
            setMobileMenuOpen(false);
          }}
          className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer text-left shrink-0"
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
                  <span className="text-neutral-300 dark:text-neutral-600 select-none px-1" aria-hidden="true">
                    |
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800'
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
            className="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sandwich Dropdown Menu for Smaller Screens */}
      {mobileMenuOpen && (
        <nav 
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-stone-200/90 dark:border-neutral-800 bg-[#f3f0e8] dark:bg-neutral-950 px-4 py-3 space-y-1 animate-fade-in shadow-xl"
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
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-900'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
