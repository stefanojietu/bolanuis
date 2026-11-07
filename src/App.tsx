import React, { useState, useEffect } from 'react';
import { SubdomainId } from './types';
import { SUBDOMAINS } from './data/ecosystemData';
import { EcosystemBanner } from './components/navigation/EcosystemBanner';
import { ParentHub } from './components/parent/ParentHub';
import { MediaStudioSite } from './components/media/MediaStudioSite';
import { BrandsSite } from './components/brands/BrandsSite';
import { RealEstateSite } from './components/realestate/RealEstateSite';

export default function App() {
  const [currentSubdomain, setCurrentSubdomain] = useState<SubdomainId>('parent');

  // Sync with URL hash for realistic multi-domain testing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'media' || hash === 'brands' || hash === 'realestate' || hash === 'parent') {
        setCurrentSubdomain(hash as SubdomainId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (target: SubdomainId) => {
    setCurrentSubdomain(target);
    window.location.hash = target === 'parent' ? '' : target;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title dynamically based on active subdomain
    const meta = SUBDOMAINS[target];
    if (meta) {
      document.title = `${meta.name} | ${meta.tagline}`;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Global Ecosystem Top Navigation Standard across ALL subdomains */}
      <EcosystemBanner
        currentSubdomain={currentSubdomain}
        onNavigate={handleNavigate}
      />

      {/* Main Subdomain Content Rendering */}
      <main className="flex-1">
        {currentSubdomain === 'parent' && (
          <ParentHub onNavigate={handleNavigate} />
        )}
        {currentSubdomain === 'media' && (
          <MediaStudioSite onNavigate={handleNavigate} />
        )}
        {currentSubdomain === 'brands' && (
          <BrandsSite onNavigate={handleNavigate} />
        )}
        {currentSubdomain === 'realestate' && (
          <RealEstateSite onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
}
