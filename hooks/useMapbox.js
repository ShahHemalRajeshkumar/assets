import { useState, useEffect } from 'react';

export const useMapbox = (shouldLoad = false) => {
  const [mapboxLoaded, setMapboxLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad && !mapboxLoaded) {
      import('mapbox-gl')
        .then(() => setMapboxLoaded(true))
        .catch(() => setMapboxLoaded(false));
    }
  }, [shouldLoad, mapboxLoaded]);

  return mapboxLoaded;
};