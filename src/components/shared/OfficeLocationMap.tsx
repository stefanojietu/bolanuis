import React, { useEffect, useState } from 'react';
import {
  Map as GoogleMap,
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { OFFICE_CONTACT } from '../../data/ecosystemData';

interface OfficeLocationMapProps {
  variant?: 'dark' | 'light';
}

interface ResolvedPlace {
  position: { lat: number; lng: number };
  formattedAddress?: string;
}

const SEARCH_QUERIES = [
  '1 Tunde Ilufoye Street, Egan, Igando, Lagos, Nigeria',
  'Benson Adu-Fatoki Street, Egan, Igando, Lagos, Nigeria',
  'Egan, Igando, Lagos, Nigeria',
];

const hasMapsApiKey = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

const InteractiveOfficeMap: React.FC<{ variant: 'dark' | 'light' }> = ({ variant }) => {
  const apiStatus = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');
  const [resolvedPlace, setResolvedPlace] = useState<ResolvedPlace | null>(null);
  const [lookupDone, setLookupDone] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const isDark = variant === 'dark';

  useEffect(() => {
    if (!placesLib) return;
    let cancelled = false;

    const resolveOfficeLocation = async () => {
      try {
        for (const query of SEARCH_QUERIES) {
          const { places } = await placesLib.Place.searchByText({
            textQuery: query,
            fields: ['displayName', 'location', 'formattedAddress'],
            language: 'en',
            region: 'NG',
            maxResultCount: 1,
          });

          if (cancelled) return;

          const first = places?.[0];
          if (first?.location) {
            setResolvedPlace({
              position: {
                lat: first.location.lat(),
                lng: first.location.lng(),
              },
              formattedAddress: first.formattedAddress ?? undefined,
            });
            setLookupDone(true);
            return;
          }
        }
        if (!cancelled) {
          setLookupDone(true);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('QuotaExceededError') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        if (!cancelled) {
          setLookupDone(true);
        }
      }
    };

    void resolveOfficeLocation();

    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  const isFailed =
    apiStatus === APILoadingStatus.FAILED || apiStatus === APILoadingStatus.AUTH_FAILURE;

  if (isFailed || (lookupDone && !resolvedPlace)) {
    return (
      <div
        className={`h-80 sm:h-96 w-full flex flex-col items-center justify-center p-6 text-center space-y-4 ${
          isDark ? 'bg-neutral-950 text-neutral-300' : 'bg-neutral-100 text-neutral-700'
        }`}
      >
        <a
          href={OFFICE_CONTACT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open office location on your device"
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 ${
            isDark
              ? 'bg-neutral-800 text-white hover:bg-neutral-700'
              : 'bg-neutral-900 text-white hover:bg-neutral-800'
          }`}
        >
          <MapPin className="w-6 h-6" />
        </a>
        <div className="space-y-1 max-w-md">
          <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            BOLANIUS PRIME LIMITED
          </p>
          <p className="text-xs leading-relaxed">{OFFICE_CONTACT.address}</p>
        </div>
        <a
          href={OFFICE_CONTACT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
            isDark
              ? 'bg-white text-neutral-950 hover:bg-neutral-200'
              : 'bg-neutral-950 text-white hover:bg-neutral-800'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Open in Device Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  if (!resolvedPlace) {
    return (
      <div
        className={`h-80 sm:h-96 w-full flex flex-col items-center justify-center gap-3 ${
          isDark ? 'bg-neutral-950 text-neutral-400' : 'bg-neutral-100 text-neutral-600'
        }`}
      >
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-xs font-medium">Loading map view...</span>
      </div>
    );
  }

  return (
    <div className="h-80 sm:h-96 w-full relative">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={resolvedPlace.position}
        defaultZoom={15}
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={resolvedPlace.position}
          title="BOLANIUS PRIME LIMITED"
          onClick={() => setInfoOpen(true)}
        >
          <Pin background="#171717" borderColor="#ffffff" glyphColor="#ffffff" />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={260}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="text-neutral-900 space-y-1.5 p-0.5">
              <div className="font-bold text-xs">BOLANIUS PRIME LIMITED</div>
              <p className="text-[11px] text-neutral-600 leading-snug">
                {OFFICE_CONTACT.address}
              </p>
              <a
                href={OFFICE_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-900 underline hover:text-neutral-700"
              >
                <MapPin className="w-3 h-3" />
                <span>Open on Device Maps</span>
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export const OfficeLocationMap: React.FC<OfficeLocationMapProps> = ({ variant = 'dark' }) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`rounded-xl overflow-hidden border ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
      }`}
    >
      <div
        className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${
          isDark ? 'border-neutral-800' : 'border-neutral-200'
        }`}
      >
        <div className="flex items-start sm:items-center gap-3">
          <a
            href={OFFICE_CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open office location in your device maps app"
            title="Open location on your device"
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              isDark
                ? 'bg-neutral-800 text-white hover:bg-white hover:text-neutral-950'
                : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
          </a>
          <div className="space-y-0.5">
            <div className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Office Location
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-900'}`}>
              {OFFICE_CONTACT.address}
            </p>
          </div>
        </div>

        <a
          href={OFFICE_CONTACT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-colors shrink-0 ${
            isDark
              ? 'bg-white text-neutral-950 hover:bg-neutral-200'
              : 'bg-neutral-950 text-white hover:bg-neutral-800'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Open on Device</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {hasMapsApiKey ? (
        <InteractiveOfficeMap variant={variant} />
      ) : (
        <div
          className={`h-80 sm:h-96 w-full flex flex-col items-center justify-center p-6 text-center space-y-4 ${
            isDark ? 'bg-neutral-950 text-neutral-300' : 'bg-neutral-100 text-neutral-700'
          }`}
        >
          <a
            href={OFFICE_CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open office location on your device"
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 ${
              isDark
                ? 'bg-neutral-800 text-white hover:bg-neutral-700'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            <MapPin className="w-6 h-6" />
          </a>
          <div className="space-y-1 max-w-md">
            <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              BOLANIUS PRIME LIMITED
            </p>
            <p className="text-xs leading-relaxed">{OFFICE_CONTACT.address}</p>
          </div>
          <a
            href={OFFICE_CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
              isDark
                ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                : 'bg-neutral-950 text-white hover:bg-neutral-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Open in Device Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
};
