'use client';

import { useJsApiLoader } from '@react-google-maps/api';

import { GOOGLE_MAPS, LIBRARIES } from '@/constants/googleMaps';

export type GoogleMapsApiReturn = {
  isLoaded: boolean;
  loadError?: Error;
};

export default function useGoogleMapsApi(): GoogleMapsApiReturn {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS.API_KEY,
    libraries: LIBRARIES
  });

  return { isLoaded, loadError };
}
