import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapboxMap = dynamic(() => import('./TeachersSearchMap/MapboxMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg" />
});

const LazyMapbox = (props) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg" />;
  }

  return <MapboxMap {...props} />;
};

export default LazyMapbox;