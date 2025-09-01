import { useEffect } from 'react';

const AsyncCSS = ({ href, media = 'all' }) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    
    const handleLoad = () => {
      link.media = media;
    };
    
    link.addEventListener('load', handleLoad);
    document.head.appendChild(link);
    
    return () => {
      link.removeEventListener('load', handleLoad);
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [href, media]);

  return null;
};

export default AsyncCSS;