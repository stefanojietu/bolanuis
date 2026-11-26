import React, { useState, useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { SubdomainId } from './types';
import { SUBDOMAINS } from './data/ecosystemData';
import { EcosystemBanner } from './components/navigation/EcosystemBanner';
import { ParentHub } from './components/parent/ParentHub';
import { MediaStudioSite } from './components/media/MediaStudioSite';
import { BrandsSite } from './components/brands/BrandsSite';
import { RealEstateSite } from './components/realestate/RealEstateSite';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export default function App() {
  const [currentSubdomain, setCurrentSubdomain] = useState<SubdomainId>('parent');
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);

  // Listen for Google Maps Platform quota exceeded events
  useEffect(() => {
    const handleQuotaExceeded = () => setGmpQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

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

  const content = (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Global Ecosystem Top Navigation shown only on the main page */}
      {currentSubdomain === 'parent' && (
        <EcosystemBanner
          currentSubdomain={currentSubdomain}
          onNavigate={handleNavigate}
        />
      )}

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

  if (GOOGLE_MAPS_API_KEY) {
    return (
      <APIProvider
        apiKey={GOOGLE_MAPS_API_KEY}
        libraries={['places', 'marker']}
        language="en"
        region="NG"
      >
        {content}
      </APIProvider>
    );
  }

  return content;
}
